// GET ?pathname=<blob-path>&token=<token> -> streams a PRIVATE Vercel Blob.
// Used by <img>/<video> in the gated page, which can't set an Authorization
// header, so the token travels as a query param. Auth is verified right next to
// the get() call (never via middleware) per Vercel's private-storage guidance.
import { Readable } from 'node:stream';
import { get } from '@vercel/blob';
import { applyCors, verifyToken, extractToken } from './_lib.js';

// Only allow paths under this prefix to be served, so a valid token can't be
// used to read unrelated blobs (e.g. the chat-logs/ store).
const ALLOWED_PREFIX = 'digital-twin/';

export default async function handler(req, res) {
  if (applyCors(req, res, 'GET, OPTIONS')) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const secret = process.env.GATE_SIGNING_SECRET;
  if (!secret) {
    console.error('GATE_SIGNING_SECRET missing');
    return res.status(500).json({ error: 'Server not configured' });
  }

  const payload = verifyToken(extractToken(req), secret);
  if (!payload || payload.scope !== 'digital-twin') {
    return res.status(401).send('Unauthorized');
  }

  const pathname = req.query?.pathname;
  if (typeof pathname !== 'string' || !pathname.startsWith(ALLOWED_PREFIX) || pathname.includes('..')) {
    return res.status(400).send('Invalid pathname');
  }

  try {
    const result = await get(pathname, {
      access: 'private',
      ifNoneMatch: req.headers['if-none-match'] ?? undefined,
    });
    if (!result) return res.status(404).send('Not found');

    res.setHeader('ETag', result.blob.etag);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'private, no-cache');

    if (result.statusCode === 304) return res.status(304).end();

    res.setHeader('Content-Type', result.blob.contentType);
    Readable.fromWeb(result.stream).pipe(res);
  } catch (err) {
    console.error('Blob fetch failed:', err);
    res.status(500).send('Failed to load asset');
  }
}
