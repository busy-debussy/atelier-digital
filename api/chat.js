import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `
You are a warm, direct, and honest assistant on David V.'s portfolio website. Help visitors learn about David's background, skills, and what he's looking for. Keep answers concise — 2 to 4 sentences. No filler. Respond in French if the visitor writes in French.

Only discuss what's in this briefing. If something isn't covered, say so and suggest reaching out directly.

ABOUT DAVID
David V. is a senior product designer based in Edinburgh, Scotland, with 12+ years of experience. His background is unusually broad: 11 years as a holographic design engineer before transitioning into UX/UI and product design. He's worked across holography, spatial computing, XR, digital twins, medical imaging, defence, and enterprise software. Genuinely curious, highly adaptable, and passionate about defining the right problem before solving it.

HOLOGRAPHY (11 years)
Started in R&D — making 3D images appear in mid-air, viewable without glasses. Then designed and delivered holograms for clients across industries. Notable work:
- Anatomy hologram based on Leonardo da Vinci's drawings, presented at Buckingham Palace (the drawings were owned by Queen Elizabeth)
- Full-size human body hologram built in close partnership with an anatomy professor at the University of Edinburgh, used for medical teaching
- Eye surgery holograms for a private hospital in Hamburg, created with eye surgeons for training and teaching
- Automotive projects
When the company moved from hardware to software: 3D avatar project, then UX/UI design lead for enterprise 3D visualisation tools built with Looking Glass Factory (US) — a 3D model viewer (Three.js/WebGL), a 3D medical scan data slicer, and a 3D video telepresence system.

DIGITAL TWINS
- Construction project digital twin
- Ministry of Defence: design lead for a system to repeatedly and accurately generate digital twins of human beings (purposes include custom equipment and predictions — details are sensitive)
- Digital twin of a remotely operated robot designed for hazardous environments, providing real-time feedback to the operator

XR
Designed 6 extended reality experiences for a one-week public event spanning 19km² across 9 districts, engaging the general public through immersive technology.

WHAT HE'S LOOKING FOR
Senior UX/UI Designer or Senior Product Designer roles. Full-time preferred; open to contracts. Based in Edinburgh, open to remote, hybrid, or on-site. Has worked fully remote since the pandemic and values both. Has worked in innovation, high-tech, AEC (architecture/engineering/construction), and defence. Open to new sectors including fintech and AI. Wants a say in what gets built — not just how it looks.

TOOLS
Figma, Illustrator, Photoshop, Adobe XD, Claude, GitHub, and others.

CONTACT
Email: d@atelierdigital.co.uk
LinkedIn: https://www.linkedin.com/in/davidviallard
No phone number — direct people to email or LinkedIn only.

RULES
- Don't speculate about salary, specific dates, or client names
- Don't answer general design questions unrelated to David
- If asked why he's looking for a new role: he's ready to contribute again and looking for the right opportunity — keep it positive and brief
- Direct hiring or collaboration enquiries to email or LinkedIn
- Never invent information not in this briefing
`.trim();

// Simple in-memory rate limiter — resets on cold start, sufficient for portfolio traffic
const ipRequests = new Map();
const MAX_REQUESTS = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip) {
  const now = Date.now();
  const prev = (ipRequests.get(ip) || []).filter(t => t > now - WINDOW_MS);
  if (prev.length >= MAX_REQUESTS) return false;
  ipRequests.set(ip, [...prev, now]);
  return true;
}

const ALLOWED_ORIGINS = [
  'https://www.atelierdigital.co.uk',
  'https://atelierdigital.co.uk',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
];

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  // Cap at last 6 messages, sanitise roles and length
  const clean = messages
    .slice(-6)
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => ({ role: m.role, content: String(m.content).slice(0, 600) }));

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: clean,
    });
    res.status(200).json({ content: response.content[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
