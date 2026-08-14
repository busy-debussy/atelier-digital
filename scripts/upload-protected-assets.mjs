// Uploads protected case-study assets — images AND the content.json holding
// the actual case-study text — to PRIVATE Vercel Blob storage.
//
// Paste files into  private-assets/<scope>/  then run:
//   BLOB_READ_WRITE_TOKEN=… node scripts/upload-protected-assets.mjs
//   (or simply `npm run upload:assets` once the token is in your env)
//
// Each file lands at the Blob pathname  <scope>/<filename>  with access:'private'.
// Images are served through /api/protected-asset.js to a valid gate token (prefix
// enforced server-side via ALLOWED_PREFIX); `content.json` is fetched server-side
// only by /api/digital-twin.js and never streamed to the client directly.
//
// Nothing here is committed: private-assets/ is gitignored and the blobs live in
// Vercel, not the repo. This is also the ONLY copy of the real case-study text —
// keep it backed up somewhere outside git (it's the source of truth).
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { put } from '@vercel/blob';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', 'private-assets');

// Args: a bare word = scope; --force re-uploads everything regardless of hash.
const args = process.argv.slice(2);
const FORCE = args.includes('--force');
// Only this scope for now; matches api/protected-asset.js ALLOWED_PREFIX.
const SCOPE = args.find((a) => !a.startsWith('--')) || 'digital-twin';

const CONTENT_TYPES = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.json': 'application/json',
};

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error('Missing BLOB_READ_WRITE_TOKEN. Get it from the Vercel project (Storage → your Blob store → .env.local), then re-run.');
  process.exit(1);
}

// Recursively collect files under a directory.
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    if (e.name.startsWith('.')) continue; // skip .DS_Store etc.
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

const scopeDir = join(ROOT, SCOPE);
let files;
try {
  files = await walk(scopeDir);
} catch {
  console.error(`No folder at private-assets/${SCOPE}/ — create it and paste images in first.`);
  process.exit(1);
}

if (files.length === 0) {
  console.error(`private-assets/${SCOPE}/ is empty — paste images in first.`);
  process.exit(1);
}

// Local manifest of last-uploaded content hashes, so unchanged files are
// skipped (re-uploading everything burns Blob write/bandwidth quota). Lives in
// the scope dir — walk() skips dotfiles, so it's never uploaded, and
// private-assets/ is gitignored.
const manifestPath = join(scopeDir, '.upload-manifest.json');
let manifest = {};
if (!FORCE) {
  try { manifest = JSON.parse(await readFile(manifestPath, 'utf8')); } catch { /* first run */ }
}

console.log(`Syncing ${files.length} file(s) to private Blob under "${SCOPE}/"${FORCE ? ' (forced)' : ''}…\n`);

let uploaded = 0, skipped = 0;
for (const file of files) {
  // Pathname mirrors the local layout: private-assets/digital-twin/x.webp → digital-twin/x.webp
  const pathname = relative(ROOT, file).split('\\').join('/');
  const ext = extname(file).toLowerCase();
  const body = await readFile(file);
  const hash = createHash('sha256').update(body).digest('hex');

  if (!FORCE && manifest[pathname] === hash) {
    skipped++;
    continue; // unchanged — already in the store
  }

  await put(pathname, body, {
    access: 'private',
    addRandomSuffix: false, // stable pathname so the page can reference it directly
    allowOverwrite: true,
    contentType: CONTENT_TYPES[ext] || 'application/octet-stream',
    token,
  });
  manifest[pathname] = hash;
  uploaded++;
  console.log(`  ✓ ${pathname}`);
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');

console.log(`\nDone — ${uploaded} uploaded, ${skipped} unchanged (skipped).`);
if (uploaded) console.log(`Reference them in the page with assetUrl('${SCOPE}/<filename>', token).`);
