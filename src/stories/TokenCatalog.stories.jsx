import tokens from '../../tokens.json';

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Resolve a CSS variable to its computed value in the current document
function resolveVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// ─── Primitives ───────────────────────────────────────────────────────────────

function PrimitiveGroup({ name, shades }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div className="text-fg-muted font-semibold" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
        {name}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {Object.entries(shades).map(([shade]) => {
          const varName = `--color-${name.toLowerCase()}-${shade}`;
          return (
            <div key={shade} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div className="border border-border-subtle" style={{
                width: 40, height: 40, borderRadius: 6,
                background: `var(${varName})`,
              }} />
              <span className="text-fg-muted" style={{ fontSize: 10, textAlign: 'center' }}>{shade}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Semantic tokens ──────────────────────────────────────────────────────────

function flattenSemantic(obj, prefix = '') {
  const result = [];
  for (const [key, val] of Object.entries(obj)) {
    const segment = key.toLowerCase().replace(/[\s/]+/g, '-');
    const path = prefix ? `${prefix}-${segment}` : segment;
    if (val && typeof val === 'object' && '$value' in val) {
      result.push(path);
    } else if (val && typeof val === 'object') {
      result.push(...flattenSemantic(val, path));
    }
  }
  return result;
}

function SemanticSection({ group, paths }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div className="text-fg-muted font-semibold" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
        {group}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {paths.map(path => {
          const varName = `--${path}`;
          const value = resolveVar(varName);
          return (
            <div key={path} title={`${varName}\n${value}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 72 }}>
              <div className="border border-border-subtle" style={{
                width: 48, height: 48, borderRadius: 8,
                background: `var(${varName})`,
              }} />
              <span className="text-fg-muted" style={{ fontSize: 9, textAlign: 'center', wordBreak: 'break-all', lineHeight: 1.3 }}>
                {path.replace(/^[^-]+-/, '')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Typography ───────────────────────────────────────────────────────────────

const TYPE_ALIASES = [
  ['display-1',  'Display H1'],
  ['display-2',  'Display H2'],
  ['h1',         'H1'],
  ['h2',         'H2'],
  ['h3',         'H3'],
  ['h4',         'H4'],
  ['h5',         'H5'],
  ['h6',         'H6'],
  ['subheading', 'Subheading'],
  ['copy-m',     'Copy M'],
  ['copy-s',     'Copy S'],
  ['copy-xs',    'Copy XS'],
  ['label-s',    'Label S'],
  ['overline-m', 'Overline M'],
  ['overline-s', 'Overline S'],
  ['legal',      'Legal'],
  ['fine-print', 'Fine Print'],
  ['btn-m',      'Button M'],
  ['btn-s',      'Button S'],
  ['nav-l',      'Nav L'],
  ['nav-m',      'Nav M'],
  ['nav-s',      'Nav S'],
  ['tag-m',      'Tag M'],
  ['tag-s',      'Tag S'],
  ['chip-s',     'Chip S'],
  ['chip-xs',    'Chip XS'],
  ['caption',    'Caption'],
  ['tooltip',    'Tooltip'],
  ['card-m',     'Card M'],
  ['brand-logo', 'Brand Logo'],
];

function TypographyRow({ alias, label }) {
  // short aliases map to canonical vars — resolve the computed size
  const size = resolveVar(`--font-size-${
    alias === 'display-1' ? 'headings-display-h1' :
    alias === 'display-2' ? 'headings-display-h2' :
    alias.match(/^h[1-6]$/) ? `headings-${alias}` :
    alias === 'subheading' ? 'labels-subheading' :
    alias === 'label-s' ? 'labels-label-s' :
    alias === 'legal' ? 'labels-legal' :
    alias === 'fine-print' ? 'labels-fine-print' :
    alias === 'overline-m' ? 'labels-overline-m' :
    alias === 'overline-s' ? 'labels-overline-s' :
    alias.startsWith('copy-') ? `copy-${alias}` :
    alias === 'btn-m' ? 'ui-button-m' :
    alias === 'btn-s' ? 'ui-button-s' :
    alias === 'card-m' ? 'ui-card-m' :
    alias.startsWith('tag-') ? `ui-${alias}` :
    alias.startsWith('chip-') ? `ui-${alias}` :
    alias === 'caption' ? 'ui-caption' :
    alias.startsWith('nav-') ? `ui-${alias}` :
    alias === 'tooltip' ? 'ui-tooltip' :
    alias === 'brand-logo' ? 'brand-logo' :
    alias
  }`);
  return (
    <div className="border-b border-border-subtle" style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '8px 0' }}>
      <span className="text-fg-secondary" style={{ width: 100, fontSize: 11, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: `var(--font-size-headings-h1)`, lineHeight: 1 }}
            className={`text-${alias} text-fg-primary`}>
        Aa
      </span>
      <span className="text-fg-muted font-mono" style={{ fontSize: 10, marginLeft: 'auto' }}>{size || '?'}</span>
    </div>
  );
}

// ─── Spacing ──────────────────────────────────────────────────────────────────

function SpacingRow({ name }) {
  const value = resolveVar(`--spacing-${name}`);
  return (
    <div className="border-b border-border-subtle" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '6px 0' }}>
      <span className="text-fg-secondary font-mono" style={{ width: 80, fontSize: 11 }}>{name}</span>
      <div style={{ height: 8, background: 'var(--accent-bg)', borderRadius: 2, width: `var(--spacing-${name})` }} />
      <span className="text-fg-muted" style={{ fontSize: 10, marginLeft: 'auto' }}>{value}</span>
    </div>
  );
}

// ─── Radius ───────────────────────────────────────────────────────────────────

function RadiusRow({ name }) {
  const value = resolveVar(`--radius-${name}`);
  return (
    <div className="border-b border-border-subtle" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '6px 0' }}>
      <span className="text-fg-secondary font-mono" style={{ width: 100, fontSize: 11 }}>{name}</span>
      <div style={{
        width: 48, height: 48,
        background: 'var(--accent-bg)',
        borderRadius: `var(--radius-${name})`,
      }} />
      <span className="text-fg-muted" style={{ fontSize: 10, marginLeft: 'auto' }}>{value}</span>
    </div>
  );
}

// ─── Shadows ──────────────────────────────────────────────────────────────────

const SHADOWS = ['xs', 's', 's-dark', 'm', 'l'];

function ShadowRow({ name }) {
  const value = resolveVar(`--shadow-${name}`);
  return (
    <div className="border-b border-border-subtle" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 0' }}>
      <span className="text-fg-secondary font-mono" style={{ width: 100, fontSize: 11 }}>shadow-{name}</span>
      <div className="bg-bg-surface" style={{
        width: 48, height: 48, borderRadius: 8,
        boxShadow: `var(--shadow-${name})`,
      }} />
      <span className="text-fg-muted" style={{ fontSize: 10, marginLeft: 'auto', maxWidth: 300, textAlign: 'right', lineHeight: 1.4 }}>{value}</span>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 className="text-fg-primary font-bold" style={{ fontSize: 18, margin: '0 0 20px' }}>{title}</h2>
      {children}
    </div>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function ColorsPage() {
  const semanticPaths = flattenSemantic(tokens.semantic.light);
  const groups = {};
  for (const path of semanticPaths) {
    const group = path.split('-')[0];
    if (!groups[group]) groups[group] = [];
    groups[group].push(path);
  }

  return (
    <div className="bg-bg-page font-sans min-h-screen" style={{ padding: '32px 40px' }}>
      <Section title="Primitive Palettes">
        {Object.entries(tokens.color).map(([name, shades]) => (
          <PrimitiveGroup key={name} name={name} shades={shades} />
        ))}
      </Section>
      <Section title="Semantic Tokens">
        {Object.entries(groups).map(([group, paths]) => (
          <SemanticSection key={group} group={group} paths={paths} />
        ))}
      </Section>
    </div>
  );
}

function TypographyPage() {
  return (
    <div className="bg-bg-page font-sans min-h-screen" style={{ padding: '32px 40px' }}>
      <Section title="Type Scale">
        {TYPE_ALIASES.map(([alias, label]) => (
          <TypographyRow key={alias} alias={alias} label={label} />
        ))}
      </Section>
    </div>
  );
}

function SpacingPage() {
  return (
    <div className="bg-bg-page font-sans min-h-screen" style={{ padding: '32px 40px' }}>
      <Section title="Spacing">
        {Object.keys(tokens.spacing).map(name => (
          <SpacingRow key={name} name={name} />
        ))}
      </Section>
      <Section title="Border Radius">
        {Object.keys(tokens.radius).map(name => (
          <RadiusRow key={name} name={name} />
        ))}
      </Section>
      <Section title="Shadows">
        {SHADOWS.map(name => (
          <ShadowRow key={name} name={name} />
        ))}
      </Section>
    </div>
  );
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export default {
  title: 'Design Tokens/Catalog',
  parameters: {
    layout: 'fullscreen',
    docs: { canvas: { sourceState: 'none' } },
  },
};

export const Colors = { render: () => <ColorsPage /> };
export const Typography = { render: () => <TypographyPage /> };
export const SpacingRadiusShadows = {
  name: 'Spacing, Radius & Shadows',
  render: () => <SpacingPage />,
};
