// GET (Authorization: Bearer <token>) -> the Digital Twin case-study content.
// The copy itself lives ONLY in private Vercel Blob (digital-twin/content.json,
// pushed by `npm run upload:assets` from private-assets/digital-twin/content.json,
// which is gitignored) — never in this source file and never shipped in the
// client bundle, so neither the repo (public) nor an unauthenticated visitor's
// JS download ever contains the real text.
import { get } from '@vercel/blob';
import { applyCors, verifyToken, extractToken } from './_lib.js';

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
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const result = await get('digital-twin/content.json', { access: 'private' });
    if (!result) return res.status(500).json({ error: 'Content not found' });

    const content = await new Response(result.stream).json();
    // Never let an intermediary cache gated content.
    res.setHeader('Cache-Control', 'private, no-store');
    const lang = req.query?.lang === 'fr' ? 'fr' : 'en';
    res.status(200).json(content[lang]);
  } catch (err) {
    console.error('Blob fetch failed:', err);
    res.status(500).json({ error: 'Failed to load content' });
  }
}
