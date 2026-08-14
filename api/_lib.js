// Underscore prefix keeps Vercel from exposing this shared file as an API route.
import { createHmac, timingSafeEqual } from 'node:crypto';

// Mirror api/chat.js — the static site calls this API cross-origin (GitHub Pages).
const ALLOWED_ORIGINS = [
  'https://www.atelierdigital.co.uk',
  'https://atelierdigital.co.uk',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
];

// Returns true when the caller should stop (preflight handled).
export function applyCors(req, res, methods = 'GET, POST, OPTIONS') {
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', methods);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
}

// In-memory rate limiter — resets on cold start, sufficient for portfolio traffic.
const hits = new Map();
export function rateLimit(ip, max, windowMs) {
  const now = Date.now();
  const prev = (hits.get(ip) || []).filter((t) => t > now - windowMs);
  if (prev.length >= max) return false;
  hits.set(ip, [...prev, now]);
  return true;
}

export function clientIp(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
}

const b64url = (buf) =>
  Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

export function signToken(payload, secret, ttlMs) {
  const body = { ...payload, exp: Date.now() + ttlMs };
  const data = b64url(JSON.stringify(body));
  const sig = b64url(createHmac('sha256', secret).update(data).digest());
  return `${data}.${sig}`;
}

export function verifyToken(token, secret) {
  if (typeof token !== 'string' || !token.includes('.')) return null;
  const [data, sig] = token.split('.');
  if (!data || !sig) return null;
  const expected = b64url(createHmac('sha256', secret).update(data).digest());
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(data.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString());
    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

// Token can arrive via Authorization header or ?token= (so <img src> can authenticate).
export function extractToken(req) {
  const auth = req.headers.authorization || '';
  if (auth.startsWith('Bearer ')) return auth.slice(7);
  try {
    return new URL(req.url, 'http://x').searchParams.get('token') || null;
  } catch {
    return null;
  }
}

export function safeEqual(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ba.length !== bb.length) {
    timingSafeEqual(ba, ba); // compare anyway to avoid an early-return timing signal
    return false;
  }
  return timingSafeEqual(ba, bb);
}

export const GATE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
