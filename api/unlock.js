// POST { password } -> { token } when the password matches DIGITAL_TWIN_PASSWORD.
// The token is an HMAC-signed bearer credential the client stores and presents
// to the gated content/asset endpoints.
import { applyCors, rateLimit, clientIp, signToken, safeEqual, GATE_TTL_MS } from './_lib.js';

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const FAIL_DELAY_MS = 750; // delay each wrong attempt to throttle scripted guessing

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(req, res) {
  if (applyCors(req, res, 'POST, OPTIONS')) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const secret = process.env.GATE_SIGNING_SECRET;
  // Trim the configured password: env values pasted into a dashboard often pick
  // up a trailing newline/space, which would otherwise never match user input.
  const expected = (process.env.DIGITAL_TWIN_PASSWORD || '').trim();
  if (!secret || !expected) {
    console.error('Gate env vars missing (GATE_SIGNING_SECRET / DIGITAL_TWIN_PASSWORD)');
    return res.status(500).json({ error: 'Server not configured' });
  }

  // Throttle brute-force attempts per IP.
  if (!rateLimit(`unlock:${clientIp(req)}`, MAX_ATTEMPTS, WINDOW_MS)) {
    return res.status(429).json({ error: 'Too many attempts. Please try again later.' });
  }

  const { password } = req.body || {};
  // Trim to mirror the client (and absorb stray whitespace from autofill/paste);
  // the client trim is bypassable, so this server-side trim is the real guard.
  const submitted = typeof password === 'string' ? password.trim() : password;
  // Reject overly long input before comparing — bounds work and matches the
  // client maxLength (which is bypassable, so this is the real guard).
  if (typeof submitted !== 'string' || submitted.length > 128 || !safeEqual(submitted, expected)) {
    // Fixed delay on every failed attempt slows scripted guessing on top of
    // the per-IP rate limit above.
    await sleep(FAIL_DELAY_MS);
    return res.status(401).json({ error: 'Incorrect password' });
  }

  const token = signToken({ scope: 'digital-twin' }, secret, GATE_TTL_MS);
  res.status(200).json({ token, expiresIn: GATE_TTL_MS });
}
