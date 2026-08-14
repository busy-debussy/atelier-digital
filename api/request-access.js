// POST { name?, email, note? } -> emails the site owner an access request via Resend.
// Lets a visitor ask for the case-study password without leaving the page
// or opening a mail client.
import { applyCors, rateLimit, clientIp } from './_lib.js';

const MAX_ATTEMPTS = 3;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (applyCors(req, res, 'POST, OPTIONS')) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL || 'd@AtelierDigital.co.uk';
  const from = process.env.RESEND_FROM || 'Atelier Digital <onboarding@resend.dev>';
  if (!apiKey) {
    console.error('RESEND_API_KEY missing');
    return res.status(500).json({ error: 'Server not configured' });
  }

  if (!rateLimit(`request-access:${clientIp(req)}`, MAX_ATTEMPTS, WINDOW_MS)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const { name, email, note, scope } = req.body || {};
  const submittedName = typeof name === 'string' ? name.trim().slice(0, 100) : '';
  const submittedEmail = typeof email === 'string' ? email.trim() : '';
  const submittedNote = typeof note === 'string' ? note.trim().slice(0, 500) : '';
  if (!submittedEmail || submittedEmail.length > 254 || !EMAIL_RE.test(submittedEmail)) {
    return res.status(400).json({ error: 'A valid email is required' });
  }

  const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const who = submittedName ? `${escapeHtml(submittedName)} (${escapeHtml(submittedEmail)})` : escapeHtml(submittedEmail);
  const subject = `Case study access request${scope ? ` — ${scope}` : ''}`;
  const html = `
    <p>New access request from <strong>${who}</strong>${scope ? ` (${escapeHtml(String(scope))})` : ''}.</p>
    ${submittedNote ? `<p>${escapeHtml(submittedNote)}</p>` : ''}
  `;

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject, html, reply_to: submittedEmail }),
    });
    if (!resendRes.ok) {
      console.error('Resend error', resendRes.status, await resendRes.text().catch(() => ''));
      return res.status(502).json({ error: 'Failed to send request' });
    }
  } catch (err) {
    console.error('Resend request failed', err);
    return res.status(502).json({ error: 'Failed to send request' });
  }

  res.status(200).json({ ok: true });
}
