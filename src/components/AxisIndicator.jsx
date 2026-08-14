import { useState, forwardRef, useImperativeHandle } from 'react';

// ---------------------------------------------------------------------------
// AxisIndicator — interactive orientation widget for the protected Digital Twin
// case study (second Spatial-transformations prototype). States, all 64×64:
//   idle                              — nothing selected
//   {a}-selected                      — base layout, axis a highlighted (hover)
//   {a}-view                          — camera snapped to axis a (a at centre)
//   {a}-view-{b}-selected             — in a's view, perpendicular axis b hovered
// Positions are % of the viewBox, measured from the artwork.
// ---------------------------------------------------------------------------

// Idle/base layout — the six axis balls (from the -selected art).
const BASE = [
  { key: 'z',       left: 50.0, top: 20.8 },
  { key: 'minus-y', left: 21.1, top: 31.7 },
  { key: 'minus-x', left: 78.6, top: 31.7 },
  { key: 'x',       left: 21.1, top: 69.5 },
  { key: 'y',       left: 78.1, top: 70.3 },
  { key: 'minus-z', left: 50.0, top: 80.2 },
];

// In a snapped view the perpendicular axes sit at the widget's cardinal edges.
// Each ball matches an exported `{view}-view-{key}-selected.svg`.
const VIEWS = {
  'x':       [{ key: 'y', left: 85.9, top: 50.0 }, { key: 'z', left: 50.0, top: 14.1 }],
  'y':       [{ key: 'x', left: 14.1, top: 50.0 }, { key: 'z', left: 50.0, top: 14.1 }],
  'z':       [{ key: 'x', left: 50.0, top: 85.9 }, { key: 'y', left: 85.9, top: 50.0 }],
  'minus-x': [{ key: 'y', left: 14.1, top: 50.0 }, { key: 'z', left: 50.0, top: 14.1 }],
  'minus-y': [{ key: 'x', left: 85.9, top: 50.0 }, { key: 'z', left: 50.0, top: 14.1 }],
  'minus-z': [{ key: 'x', left: 50.0, top: 14.1 }, { key: 'y', left: 85.9, top: 50.0 }],
};

const PRELOAD = [
  ...BASE.flatMap(a => [`axis-indicator-${a.key}-selected.svg`, `axis-indicator-${a.key}-view.svg`]),
  ...Object.entries(VIEWS).flatMap(([v, hs]) => hs.map(h => `axis-indicator-${v}-view-${h.key}-selected.svg`)),
];

const label = (k) => `${k.startsWith('minus-') ? '−' + k.slice(6).toUpperCase() : k.toUpperCase()} axis`;

const AxisIndicator = forwardRef(function AxisIndicator({ idleSrc, resolve, alt, onInteract, onActiveChange, className = '' }, ref) {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState(false); // selected axis: snapped view vs base highlight

  // The parent's Reset button calls reset(); we report active state so it can
  // show the button only when the indicator isn't idle.
  useImperativeHandle(ref, () => ({
    reset: () => { setSelected(null); setView(false); setHovered(null); onActiveChange?.(false); },
  }), [onActiveChange]);

  const inView = Boolean(selected && view);
  const hotspots = inView ? VIEWS[selected] : BASE;

  // Resolve the state image. In a view, hovering a perpendicular axis layers its
  // highlight over the view; otherwise hover highlights the base layout. A click
  // (selected) wins over hover on the same axis so the view shows instantly.
  let name;
  if (inView) {
    name = hovered && hovered !== selected
      ? `axis-indicator-${selected}-view-${hovered}-selected.svg`
      : `axis-indicator-${selected}-view.svg`;
  } else if (selected) {
    name = hovered && hovered !== selected
      ? `axis-indicator-${hovered}-selected.svg`
      : `axis-indicator-${selected}-selected.svg`;
  } else {
    name = hovered ? `axis-indicator-${hovered}-selected.svg` : null;
  }
  const src = name ? resolve(name) : idleSrc;

  const pick = (key) => { setSelected(key); setView(true); setHovered(null); onActiveChange?.(true); };

  return (
    <div className={`relative select-none w-[160px] sm:w-[184px] ${className}`}>
      {/* Preload every state so swaps are instant. */}
      {PRELOAD.map(n => (
        <img key={n} src={resolve(n)} alt="" aria-hidden="true" className="absolute opacity-0 w-0 h-0" />
      ))}

      <img src={src} alt={alt} draggable="false" className="block w-full h-auto pointer-events-none" />

      {hotspots.map(a => (
        <button
          key={a.key}
          type="button"
          aria-label={label(a.key)}
          aria-pressed={selected === a.key}
          onPointerEnter={() => { onInteract?.(); setHovered(a.key); }}
          onPointerLeave={() => setHovered(null)}
          onClick={() => pick(a.key)}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer touch-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white/80"
          style={{ left: `${a.left}%`, top: `${a.top}%`, width: '25%', height: '25%' }}
        />
      ))}

      {/* Centre circle — only while a snapped view is shown; click returns to the
          selected axis's base highlight. */}
      {inView && (
        <button
          type="button"
          aria-label="Return to selection"
          onPointerEnter={() => setHovered(null)}
          onClick={() => { setView(false); setHovered(null); }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer touch-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white/80"
          style={{ width: '25%', height: '25%' }}
        />
      )}
    </div>
  );
});

export default AxisIndicator;
