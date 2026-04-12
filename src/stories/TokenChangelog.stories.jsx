import changelog from '../tokens/changelog.json';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const isColor = (type, value) =>
  type === 'color' || (typeof value === 'string' && /^(#|rgba?)/.test(value));

function Swatch({ color, label }) {
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <span style={{
        display: 'inline-block',
        width: 32,
        height: 32,
        borderRadius: 6,
        background: color ?? 'transparent',
        border: '1px solid rgba(0,0,0,0.1)',
        flexShrink: 0,
      }} />
      <span style={{ fontSize: 10, color: '#888', maxWidth: 60, textAlign: 'center', wordBreak: 'break-all' }}>
        {label}
      </span>
    </span>
  );
}

function SwatchDiff({ before, after }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      {before !== null && <Swatch color={before} label={before} />}
      {before !== null && after !== null && (
        <span style={{ color: '#aaa', fontSize: 14 }}>→</span>
      )}
      {after !== null && <Swatch color={after} label={after} />}
    </span>
  );
}

const BADGE = {
  added:    { bg: '#dcfce7', color: '#166534', label: 'Added'    },
  modified: { bg: '#fef9c3', color: '#854d0e', label: 'Modified' },
  removed:  { bg: '#fee2e2', color: '#991b1b', label: 'Removed'  },
};

function Badge({ change }) {
  const s = BADGE[change];
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 7px',
      borderRadius: 99,
      fontSize: 11,
      fontWeight: 600,
      background: s.bg,
      color: s.color,
      letterSpacing: '0.02em',
    }}>
      {s.label}
    </span>
  );
}

function ChangeRow({ item }) {
  const showSwatches = isColor(item.type, item.after ?? item.before);
  return (
    <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
      <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontSize: 12, color: '#374151' }}>
        {item.path}
      </td>
      <td style={{ padding: '10px 12px' }}>
        <Badge change={item.change} />
      </td>
      <td style={{ padding: '10px 12px' }}>
        {showSwatches ? (
          <SwatchDiff before={item.before} after={item.after} />
        ) : (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            {item.before !== null && (
              <code style={{ fontSize: 11, background: '#f3f4f6', padding: '2px 5px', borderRadius: 4, color: '#991b1b', textDecoration: 'line-through' }}>
                {String(item.before)}
              </code>
            )}
            {item.before !== null && item.after !== null && (
              <span style={{ color: '#aaa' }}>→</span>
            )}
            {item.after !== null && (
              <code style={{ fontSize: 11, background: '#f3f4f6', padding: '2px 5px', borderRadius: 4, color: '#166534' }}>
                {String(item.after)}
              </code>
            )}
          </span>
        )}
      </td>
    </tr>
  );
}

function ChangelogEntry({ entry, index }) {
  const date = new Date(entry.timestamp);
  const label = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    + ' · ' + date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{ marginBottom: 40 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>
          {index === 0 ? 'Latest sync' : `Sync ${index + 1}`}
        </span>
        <span style={{ fontSize: 12, color: '#888' }}>{label}</span>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#6b7280' }}>
          +{entry.summary.added} &nbsp;~{entry.summary.modified} &nbsp;-{entry.summary.removed}
        </span>
      </div>

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            <th style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#6b7280', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Token</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#6b7280', letterSpacing: '0.05em', textTransform: 'uppercase', width: 100 }}>Change</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#6b7280', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {entry.changes.map((item, i) => <ChangeRow key={i} item={item} />)}
        </tbody>
      </table>
    </div>
  );
}

function ChangelogPage() {
  if (!changelog || changelog.length === 0) {
    return (
      <div style={{ padding: 40, fontFamily: 'sans-serif', color: '#6b7280' }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: '#111', marginBottom: 8 }}>Token Changelog</h2>
        <p>No changes recorded yet. Run <code>npm run tokens</code> to generate the first diff.</p>
      </div>
    );
  }

  const totalChanges = changelog.reduce((n, e) => n + e.changeCount, 0);

  return (
    <div style={{ padding: '32px 40px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: 900 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', margin: 0 }}>Token Changelog</h1>
        <p style={{ fontSize: 14, color: '#6b7280', marginTop: 6 }}>
          {changelog.length} sync{changelog.length !== 1 ? 's' : ''} · {totalChanges} total change{totalChanges !== 1 ? 's' : ''}
        </p>
      </div>
      {changelog.map((entry, i) => <ChangelogEntry key={entry.timestamp} entry={entry} index={i} />)}
    </div>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────────

export default {
  title: 'Design Tokens/Changelog',
  parameters: {
    layout: 'fullscreen',
    docs: { canvas: { sourceState: 'none' } },
  },
};

export const All = {
  name: 'Changelog',
  render: () => <ChangelogPage />,
};
