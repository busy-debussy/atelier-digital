import StyleDictionary from 'style-dictionary';

// ─── Custom transforms ──────────────────────────────────────────────────────
//
// Semantic and typography tokens carry a mode prefix in their path that we
// strip before generating the CSS variable name, e.g.:
//   ['semantic', 'light', 'bg', 'page']           → bg-page
//   ['typography', 'desktop', 'font-size', 'H1']   → font-size-h1

StyleDictionary.registerTransform({
  name: 'name/strip-mode',
  type: 'name',
  filter: (token) => token.path[0] === 'semantic' || token.path[0] === 'typography',
  transform: (token) =>
    token.path
      .slice(2)
      .join('-')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '-'),
});

// ─── Custom formats ──────────────────────────────────────────────────────────

// Helper: get the resolved value from a token (SD5 DTCG mode uses $value)
const val = (token) => token.$value ?? token.value;

// Single file with :root (light) + .dark {} block
StyleDictionary.registerFormat({
  name: 'css/semantic-modes',
  format: ({ dictionary }) => {
    const light = dictionary.allTokens.filter(t => t.path[1] === 'light');
    const dark  = dictionary.allTokens.filter(t => t.path[1] === 'dark');

    const fmt = (tokens) => tokens.map(t => `  --${t.name}: ${val(t)};`).join('\n');

    return [
      `:root {\n${fmt(light)}\n}`,
      `\n.dark {\n${fmt(dark)}\n}`,
    ].join('\n') + '\n';
  },
});

// Single file: mobile default → tablet → desktop (min-width, mobile-first)
StyleDictionary.registerFormat({
  name: 'css/typography-responsive',
  format: ({ dictionary }) => {
    const byBp = { desktop: [], tablet: [], mobile: [] };
    for (const token of dictionary.allTokens) byBp[token.path[1]]?.push(token);

    const fmt = (tokens, indent = '  ') =>
      tokens.map(t => `${indent}--${t.name}: ${val(t)};`).join('\n');

    return [
      `:root {\n${fmt(byBp.mobile)}\n}`,
      `\n@media (min-width: 640px) {\n  :root {\n${fmt(byBp.tablet, '    ')}\n  }\n}`,
      `\n@media (min-width: 1024px) {\n  :root {\n${fmt(byBp.desktop, '    ')}\n  }\n}`,
    ].join('\n') + '\n';
  },
});

// ES6 named exports — camelCase variable names, resolved values
StyleDictionary.registerFormat({
  name: 'javascript/es6-named',
  format: ({ dictionary }) => {
    const toCamel = (str) => str.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
    const lines = dictionary.allTokens.map(t => {
      const name = toCamel(t.name);
      return `export const ${name} = ${JSON.stringify(val(t))};`;
    });
    return '// Do not edit directly — auto-generated\n\n' + lines.join('\n') + '\n';
  },
});

// ─── Transform chains ────────────────────────────────────────────────────────

// CSS: kebab names for base tokens, stripped names for semantic/typography, px kept as-is
const cssTransforms = ['attribute/cti', 'name/kebab', 'name/strip-mode', 'color/css'];

// JS/JSON: camel names, resolved values
const jsTransforms  = ['attribute/cti', 'name/kebab', 'name/strip-mode', 'name/camel', 'color/css'];

// ─── Config ──────────────────────────────────────────────────────────────────

export default {
  source: ['tokens.json'],
  usesDtcg: true,
  log: { warnings: 'disabled' },

  platforms: {

    // ── CSS: primitives (color, spacing, radius) ───────────────────────────
    'css/base': {
      transforms: cssTransforms,
      buildPath: 'src/tokens/',
      files: [{
        destination: 'base.css',
        format: 'css/variables',
        filter: (token) => !['semantic', 'typography'].includes(token.path[0]),
        options: { selector: ':root', outputReferences: false },
      }],
    },

    // ── CSS: semantic tokens (light + dark in one file) ────────────────────
    'css/semantic': {
      transforms: cssTransforms,
      buildPath: 'src/tokens/',
      files: [{
        destination: 'semantic.css',
        format: 'css/semantic-modes',
        filter: (token) => token.path[0] === 'semantic',
        options: { outputReferences: false },
      }],
    },

    // ── CSS: typography (mobile-first responsive) ──────────────────────────
    'css/typography': {
      transforms: cssTransforms,
      buildPath: 'src/tokens/',
      files: [{
        destination: 'typography.css',
        format: 'css/typography-responsive',
        filter: (token) => token.path[0] === 'typography',
      }],
    },

    // ── JavaScript ES6 named exports ──────────────────────────────────────
    // Semantic → light only; typography → desktop only (avoid name collisions)
    'js': {
      transforms: cssTransforms,
      buildPath: 'src/tokens/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/es6-named',
        filter: (token) =>
          token.path[0] !== 'semantic' && token.path[0] !== 'typography' ||
          (token.path[0] === 'semantic'   && token.path[1] === 'light') ||
          (token.path[0] === 'typography' && token.path[1] === 'desktop'),
        options: { outputReferences: false },
      }],
    },

    // ── Flat JSON ─────────────────────────────────────────────────────────
    // Semantic → light only; typography → desktop only
    'json': {
      transforms: cssTransforms,
      buildPath: 'src/tokens/',
      files: [{
        destination: 'tokens.flat.json',
        format: 'json/flat',
        filter: (token) =>
          token.path[0] !== 'semantic' && token.path[0] !== 'typography' ||
          (token.path[0] === 'semantic'   && token.path[1] === 'light') ||
          (token.path[0] === 'typography' && token.path[1] === 'desktop'),
        options: { outputReferences: false },
      }],
    },

  },
};
