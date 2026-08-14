// Helper for loading PRIVATE Vercel Blob assets (images/video) inside a gated
// page. The gate token is passed as a query param because <img>/<video> can't
// set an Authorization header; api/protected-asset.js verifies it server-side.
const API_BASE = (import.meta.env.VITE_CHAT_API_URL || '/api/chat').replace(/\/chat$/, '');

// Usage in JSX: <img src={assetUrl('digital-twin/hero.jpg', token)} />
export function assetUrl(pathname, token) {
  // In dev, read straight from private-assets/ via the Vite middleware — no
  // Vercel Blob calls (it has a monthly operations cap). See vite.config.js.
  if (import.meta.env.DEV) return `/__private/${pathname}`;
  return `${API_BASE}/protected-asset?pathname=${encodeURIComponent(pathname)}&token=${encodeURIComponent(token)}`;
}
