// POST { name?, email, note? } -> emails the site owner an access request via Resend.
// Lets a visitor ask for the case-study password without leaving the page
// or opening a mail client.
import { applyCors, rateLimit, clientIp, signToken } from './_lib.js';

const MAX_ATTEMPTS = 3;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const APPROVE_TTL_MS = 3 * 24 * 60 * 60 * 1000; // 3 days — the "send password" link's lifetime

// Maps PasswordGate's `storageKey`/`scope` (e.g. "gate:digital-twin") to a
// human-readable case-study name for the email — add an entry here for each
// new gated case study.
const CASE_STUDY_NAMES = {
  'gate:digital-twin': 'Digital Twin',
};

export default async function handler(req, res) {
  if (applyCors(req, res, 'POST, OPTIONS')) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL || 'd@AtelierDigital.co.uk';
  const from = process.env.RESEND_FROM || 'Atelier Digital <onboarding@resend.dev>';
  const secret = process.env.GATE_SIGNING_SECRET;
  if (!apiKey || !secret) {
    console.error('RESEND_API_KEY or GATE_SIGNING_SECRET missing');
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

  const caseStudy = CASE_STUDY_NAMES[scope] || 'Digital Twin';
  const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const sentAt = new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/London' });
  const subject = `${caseStudy} access request`;

  // A signed, expiring link that (after a confirmation click) emails the
  // password straight to this visitor — see api/approve-access.js. Signed
  // with the same secret as the case-study gate, so it can't be forged.
  const approveToken = signToken(
    { action: 'approve-access', scope: scope || 'gate:digital-twin', email: submittedEmail, name: submittedName || undefined },
    secret,
    APPROVE_TTL_MS
  );
  const proto = req.headers['x-forwarded-proto'] || (req.headers.host?.startsWith('localhost') ? 'http' : 'https');
  const approveUrl = `${proto}://${req.headers.host}/api/approve-access?token=${encodeURIComponent(approveToken)}`;

  const html = `
    <p><strong>Case study:</strong> ${escapeHtml(caseStudy)}</p>
    <p><strong>Name:</strong> ${submittedName ? escapeHtml(submittedName) : 'Not provided'}</p>
    <p><strong>Email:</strong> ${escapeHtml(submittedEmail)}</p>
    <p><strong>Note:</strong> ${submittedNote ? escapeHtml(submittedNote) : 'Not provided'}</p>
    <p><strong>Sent:</strong> ${sentAt} UK time</p>
    <p style="margin-top:20px;"><a href="${approveUrl}">Send password to this visitor</a></p>
  `;
  const text = [
    `Case study: ${caseStudy}`,
    `Name: ${submittedName || 'Not provided'}`,
    `Email: ${submittedEmail}`,
    `Note: ${submittedNote || 'Not provided'}`,
    `Sent: ${sentAt} UK time`,
    '',
    `Send password to this visitor: ${approveUrl}`,
  ].join('\n');

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject, html, text, reply_to: submittedEmail }),
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
