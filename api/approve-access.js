// GET  ?token=<signed>  -> a small confirmation page ("Send password to X?").
// POST ?token=<signed>  -> actually sends the password email to the visitor.
//
// Split into two steps (rather than sending on GET) because this link lives
// inside an email: some mail providers pre-fetch/scan links automatically,
// which would otherwise trigger a real send without a human ever clicking.
// The GET only ever renders a page; only the POST (from the page's own
// button) has a side effect.
import { applyCors, rateLimit, clientIp, verifyToken, extractToken } from './_lib.js';

const MAX_ATTEMPTS = 10;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

const CASE_STUDY_NAMES = {
  'gate:digital-twin': 'Digital Twin',
};
const CASE_STUDY_PASSWORD_ENV = {
  'gate:digital-twin': 'DIGITAL_TWIN_PASSWORD',
};
const CASE_STUDY_PATHS = {
  'gate:digital-twin': '/case-study/digital-twin',
};

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const PAGE_STYLE = `
  body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', Arial, sans-serif; background: #f6f6f6; color: #1f1f1f; margin: 0; padding: 0; }
  .card { max-width: 420px; margin: 64px auto; background: #ffffff; border-radius: 16px; padding: 32px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
  h1 { font-size: 20px; margin: 0 0 12px; }
  p { font-size: 14px; color: #404040; line-height: 1.5; }
  button { margin-top: 20px; padding: 12px 24px; border-radius: 999px; border: none; background: #2563eb; color: #fff; font-size: 14px; font-weight: 500; cursor: pointer; }
  button:hover { background: #1d4ed8; }
`;

function page(bodyHtml) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Atelier Digital</title><style>${PAGE_STYLE}</style></head><body><div class="card">${bodyHtml}</div></body></html>`;
}

export default async function handler(req, res) {
  if (applyCors(req, res, 'GET, POST, OPTIONS')) return;
  if (req.method !== 'GET' && req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const secret = process.env.GATE_SIGNING_SECRET;
  if (!secret) {
    console.error('GATE_SIGNING_SECRET missing');
    return res.status(500).send('Server not configured');
  }

  if (!rateLimit(`approve-access:${clientIp(req)}`, MAX_ATTEMPTS, WINDOW_MS)) {
    return res.status(429).send('Too many attempts. Please try again later.');
  }

  const token = extractToken(req);
  const payload = verifyToken(token, secret);
  if (!payload || payload.action !== 'approve-access' || !payload.email) {
    res.setHeader('Content-Type', 'text/html');
    return res.status(401).send(page('<h1>Link expired</h1><p>This link is no longer valid — it may have already been used or has expired.</p>'));
  }

  const caseStudy = CASE_STUDY_NAMES[payload.scope] || 'Digital Twin';
  const who = payload.name ? `${escapeHtml(payload.name)} (${escapeHtml(payload.email)})` : escapeHtml(payload.email);

  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(page(`
      <h1>Send password to ${who}?</h1>
      <p>This will email the ${escapeHtml(caseStudy)} case-study password directly to ${escapeHtml(payload.email)}.</p>
      <form method="POST" action="${req.url}">
        <button type="submit">Send password</button>
      </form>
    `));
  }

  // POST — the actual send.
  const passwordEnvVar = CASE_STUDY_PASSWORD_ENV[payload.scope];
  const password = passwordEnvVar ? process.env[passwordEnvVar] : null;
  if (!password) {
    console.error(`Password env var missing for scope ${payload.scope}`);
    res.setHeader('Content-Type', 'text/html');
    return res.status(500).send(page('<h1>Something went wrong</h1><p>Could not look up the password server-side.</p>'));
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || 'Atelier Digital <onboarding@resend.dev>';
  if (!apiKey) {
    console.error('RESEND_API_KEY missing');
    res.setHeader('Content-Type', 'text/html');
    return res.status(500).send(page('<h1>Something went wrong</h1><p>Email isn’t configured server-side.</p>'));
  }

  const casePath = CASE_STUDY_PATHS[payload.scope] || '/';
  const caseUrl = `https://www.atelierdigital.co.uk${casePath}`;
  const greeting = payload.name ? `Hi ${escapeHtml(payload.name)},` : 'Hi,';
  const subject = `Your ${caseStudy} case-study password`;
  const html = `
    <p>${greeting}</p>
    <p>Here's the password for the ${escapeHtml(caseStudy)} case study:</p>
    <div style="margin:20px 0;padding:16px;text-align:center;background:#f6f6f6;border:1px solid #e0e0e0;border-radius:8px;">
      <span style="font-family:'SFMono-Regular',Menlo,Consolas,monospace;font-size:22px;font-weight:700;letter-spacing:2px;color:#1f1f1f;">${escapeHtml(password)}</span>
    </div>
    <p><a href="${caseUrl}">${caseUrl}</a></p>
    <p>Best regards,<br>David</p>
  `;
  const text = [
    greeting,
    `Here's the password for the ${caseStudy} case study:`,
    '',
    password,
    '',
    caseUrl,
    '',
    'Best regards,',
    'David',
  ].join('\n');

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: payload.email, subject, html, text }),
    });
    if (!resendRes.ok) {
      console.error('Resend error', resendRes.status, await resendRes.text().catch(() => ''));
      res.setHeader('Content-Type', 'text/html');
      return res.status(502).send(page('<h1>Failed to send</h1><p>The email could not be sent. Check the server logs.</p>'));
    }
  } catch (err) {
    console.error('Resend request failed', err);
    res.setHeader('Content-Type', 'text/html');
    return res.status(502).send(page('<h1>Failed to send</h1><p>The email could not be sent. Check the server logs.</p>'));
  }

  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(page(`<h1>Sent</h1><p>The password was emailed to ${escapeHtml(payload.email)}.</p>`));
}
