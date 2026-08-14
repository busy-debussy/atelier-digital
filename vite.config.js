/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Dev-only: serve gated assets straight from private-assets/ at /__private/*,
// so localhost never touches Vercel Blob (which has a monthly operations cap).
// Production still serves them via api/protected-asset.js. See src/utils/protectedAsset.js.
const PRIVATE_MIME = {
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.mp4': 'video/mp4', '.webm': 'video/webm',
};
function privateAssetsDev() {
  const base = path.join(dirname, 'private-assets');
  return {
    name: 'private-assets-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__private', (req, res, next) => {
        const rel = decodeURIComponent((req.url || '').split('?')[0]).replace(/^\/+/, '');
        const full = path.resolve(base, rel);
        if (!full.startsWith(base + path.sep) || !fs.existsSync(full)) return next();
        res.setHeader('Content-Type', PRIVATE_MIME[path.extname(full).toLowerCase()] || 'application/octet-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.end(fs.readFileSync(full));
      });
    },
  };
}

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), tailwindcss(), privateAssetsDev()],
  server: {
    // `npm run dev` (this Vite server) has no serverless functions of its own.
    // Run `vercel dev --listen 3000` alongside it (its own frontend on 3000 can
    // be ignored) so /api/* — password unlock, gated content, protected assets —
    // works from the usual localhost:5173 without switching ports.
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});