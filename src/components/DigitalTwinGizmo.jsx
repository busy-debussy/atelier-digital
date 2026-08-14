import { useState, useRef, forwardRef, useImperativeHandle } from 'react';

// ---------------------------------------------------------------------------
// DigitalTwinGizmo — interactive transform-gizmo prototype for the protected
// Digital Twin case study. Idle shows the full gizmo; hovering a handle shows
// its highlighted SVG; dragging applies the matching transform:
//   • scale     → scales the isolated axis about the origin
//   • translate → slides the isolated axis along its direction
//   • rotate    → a static white ring stays put while the coloured arc spins
// Data-driven — add a row + its SVGs to extend it. Positions are % of the
// 200×200 viewBox (= % of the displayed image).
// ---------------------------------------------------------------------------
const ORIGIN = '49.75% 55.1%'; // gizmo centre (≈ viewBox 99.49, 110.2 — matches rotate rings)

// A rotate ring is a tilted, squashed ellipse. A flat screen-space rotate()
// would slide the coloured arc *off* the ring, so we rotate inside the
// ellipse's own space: G(θ) = Mtilt · D · R(θ) · D⁻¹ · Mtilt⁻¹, applied about
// the ellipse centre — the arc then travels along the ring. Build the params
// for one ring from its SVG `<ellipse cx cy rx ry transform="matrix(a b c d e f)">`.
const mul2 = (A, B) => [
  [A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
  [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]],
];
function ringParams({ m: [a, b, c, d, e, f], cx, cy, rx, ry, vb = 200 }) {
  const det = a * d - c * b;
  const mTilt = [[a, c], [b, d]];
  const mInv = [[d / det, -c / det], [-b / det, a / det]];
  const ox = a * cx + c * cy + e, oy = b * cx + d * cy + f; // ellipse centre (screen)
  return { mTilt, mInv, rxRy: rx / ry, ryRx: ry / rx,
    origin: `${((ox / vb) * 100).toFixed(2)}% ${((oy / vb) * 100).toFixed(2)}%` };
}
function arcMatrix(deg, p) {
  const r = (deg * Math.PI) / 180;
  const c = Math.cos(r), s = Math.sin(r);
  const N = [[c, -p.rxRy * s], [p.ryRx * s, c]]; // D · R(θ) · D⁻¹
  const G = mul2(p.mTilt, mul2(N, p.mInv));
  return `matrix(${G[0][0]}, ${G[1][0]}, ${G[0][1]}, ${G[1][1]}, 0, 0)`;
}
// Y ring: <ellipse cx 40.432 cy 23.8526 rx 40.432 ry 23.8526
//          transform="matrix(0.500153 -0.865937 0.866114 0.499847 58.65 133.173)">
const Y_ROT = ringParams({ m: [0.500153, -0.865937, 0.866114, 0.499847, 58.65, 133.173], cx: 40.432, cy: 23.8526, rx: 40.432, ry: 23.8526 });
// X ring: tilt +60° (mirror of Y). Z ring: rotate(-180) ≈ horizontal ellipse.
const X_ROT = ringParams({ m: [0.5, 0.866025, -0.866025, 0.5, 145.1864, -31.062], cx: 99.4915, cy: 110.204, rx: 40.4444, ry: 23.8453 });
const Z_ROT = ringParams({ m: [-1, 0, 0, -1, 198.983, 220.408], cx: 99.4915, cy: 110.204, rx: 40.4444, ry: 23.8453 });

// Gizmo centre in viewBox units — the origin for the static axis guides.
const CX = 99.49, CY = 110.2;
// Axis guide fades from ~50% near the tool to 0 by FADE units out each side.
const FADE = 180;
// Content box of the idle gizmo as viewBox fractions. Its extremes ARE the
// axis letters: left = X, right = Y, top = Z. Panning keeps these labels ≥ PAD
// px from the window edges; the semi-transparent white axes don't count.
const BODY = { left: 0.167, right: 0.826, top: 0.211, bottom: 0.701 };
const PAD = 8;

const HANDLES = [
  // Hover shows the full gizmo (active); drag shows only the cube (cube-only
  // moving). `pivot` = the cube's own centre, so it scales in place.
  { id: 'x-scale',     left: 38,   top: 62.5, active: 'gizmo-x-scale-active.svg',    moving: 'gizmo-x-scale.svg',     type: 'scale',     ax: -0.866, ay: 0.5, pivot: '35.5% 63.25%', sSign: -1 },
  { id: 'y-scale',     left: 64,   top: 62.5, active: 'gizmo-y-scale-active.svg',    moving: 'gizmo-y-scale.svg',     type: 'scale',     ax: 0.866,  ay: 0.5, pivot: '64.1% 63.25%' },
  { id: 'z-scale',     left: 49.5, top: 38.5, active: 'gizmo-z-scale-active.svg',    moving: 'gizmo-z-scale.svg',     type: 'scale',     ax: 0,      ay: -1, pivot: '49.75% 38.55%' },
  { id: 'scale-all',   left: 65,   top: 36.5, active: 'gizmo-scale-all-active.svg',   moving: 'gizmo-scale-all.svg',   type: 'scale',     ax: 0.708,  ay: -0.706, lineDir: [0.708, -0.706], pivot: '67.5% 37.4%' },
  { id: 'x-translate', left: 28.5, top: 68,   active: 'gizmo-x-translate-active.svg', moving: 'gizmo-x-translate.svg', type: 'translate', ax: -0.866, ay: 0.5 },
  { id: 'y-translate', left: 73.5, top: 68,   active: 'gizmo-y-translate-active.svg', moving: 'gizmo-y-translate.svg', type: 'translate', ax: 0.866,  ay: 0.5 },
  { id: 'z-translate', left: 51,   top: 29,   active: 'gizmo-z-translate-active.svg', moving: 'gizmo-z-translate-moving.svg', type: 'translate', ax: 0,      ay: -1  },
  // Rotate rings + the centre dot sit underneath the plane-pan diamonds in the
  // crowded core of the gizmo (handle centres as little as ~10px apart) — kept
  // ahead of the pans in paint order and given a smaller hitSize so the pans
  // (rendered last, below) win any overlap instead of getting hidden behind them.
  { id: 'y-rotate',    left: 40,   top: 48,   active: 'gizmo-y-rotate-active.svg',    ring: 'gizmo-y-rotate-ring.svg', arc: 'gizmo-y-rotate-arc.svg', type: 'rotate', rot: Y_ROT, hitSize: 18 },
  { id: 'x-rotate',    left: 59,   top: 49.5, active: 'gizmo-x-rotate-active.svg',    ring: 'gizmo-x-rotate-ring.svg', arc: 'gizmo-x-rotate-arc.svg', type: 'rotate', rot: X_ROT, hitSize: 18 },
  { id: 'z-rotate',    left: 49.5, top: 67,   active: 'gizmo-z-rotate-active.svg',    ring: 'gizmo-z-rotate-ring.svg', arc: 'gizmo-z-rotate-arc.svg', type: 'rotate', rot: Z_ROT, rotDir: -1, hitSize: 18 },
  // Centre free-move — drags the whole gizmo in any direction, like a pan.
  { id: 'center',      left: 51,   top: 55,   active: 'gizmo-center-active.svg',      moving: 'gizmo-center.svg',        type: 'center', hitSize: 18 },
  // Plane pans (free 2D drag). NB: the yz/xz export pair has its filenames
  // swapped vs the others — the small isolated diamond is the `-active` file.
  // Rendered last (topmost) and smaller than the rotate/centre handles above
  // so they're reachable instead of being swallowed by their larger neighbours.
  { id: 'xy-pan',      left: 50,   top: 61.5, active: 'gizmo-xy-pan-active.svg',      moving: 'gizmo-xy-pan.svg',        type: 'pan', hitSize: 18, axes: ['X', 'Y'] },
  { id: 'yz-pan',      left: 54.75, top: 52.4, active: 'gizmo-yz-pan.svg',            moving: 'gizmo-yz-pan-active.svg', type: 'pan', hitSize: 18, axes: ['Y', 'Z'] },
  { id: 'xz-pan',      left: 44.4, top: 52.4, active: 'gizmo-xz-pan.svg',             moving: 'gizmo-xz-pan-active.svg', type: 'pan', hitSize: 18, axes: ['X', 'Z'] },
];

const PRELOAD = [...new Set(HANDLES.flatMap(h => [h.active, h.moving, h.ring, h.arc].filter(Boolean)))];

// HUD readout shown while dragging a handle — mirrors the live value overlay
// in pro 3D tools (Blender/Maya-style "D 1.234").
const axisLetter = (id) => id[0].toUpperCase();
const signed = (n) => `${n >= 0 ? '+' : ''}${n}`;
// Same isometric axis directions as the x/y/z-translate handles — reused to
// decompose the centre's free 2D drag into all three world axes for display.
const CENTER_AXES = [
  ['X', HANDLES.find(h => h.id === 'x-translate')],
  ['Y', HANDLES.find(h => h.id === 'y-translate')],
  ['Z', HANDLES.find(h => h.id === 'z-translate')],
];
function formatGizmoValue(h, t) {
  if (h.type === 'scale') return `${axisLetter(h.id)} ${t.scale.toFixed(2)}×`;
  if (h.type === 'translate') return `${axisLetter(h.id)} ${signed(Math.round(t.val ?? 0))}`;
  if (h.type === 'rotate') return `${axisLetter(h.id)} ${signed(Math.round(t.rot))}°`;
  if (h.type === 'center') {
    return CENTER_AXES.map(([letter, ax]) => `${letter} ${signed(Math.round(t.x * ax.ax + t.y * ax.ay))}`).join('  ');
  }
  if (h.type === 'pan') {
    const [a1, a2] = h.axes || ['X', 'Y'];
    return `${a1} ${signed(Math.round(t.x))}  ${a2} ${signed(Math.round(t.y))}`;
  }
  return '';
}

const DigitalTwinGizmo = forwardRef(function DigitalTwinGizmo({ idleSrc, resolve, alt, onInteract, onActiveChange, className = '' }, ref) {
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(null); // id of the handle being dragged
  const [t, setT] = useState({ scale: 1, x: 0, y: 0, rot: 0 });
  const [pan, setPan] = useState({ x: 0, y: 0 }); // committed pan — persists after release

  // The parent's Reset button zeroes the committed pan; we report active state so
  // it shows only once the gizmo has been moved off its origin.
  useImperativeHandle(ref, () => ({
    reset: () => { setPan({ x: 0, y: 0 }); onActiveChange?.(false); },
  }), [onActiveChange]);
  const startRef = useRef(null);
  const rootRef = useRef(null);

  const onDown = (h) => (e) => {
    e.preventDefault();
    onInteract?.();
    setActive(h.id);
    const start = { x: e.clientX, y: e.clientY, h };
    // Measure how far the gizmo can travel inside its backdrop while keeping the
    // X/Y/Z letters (the BODY box) ≥ PAD px from every edge. The white axes run
    // off-window and don't count.
    if ((h.type === 'pan' || h.type === 'center' || h.type === 'translate') && rootRef.current?.parentElement) {
      const pr = rootRef.current.parentElement.getBoundingClientRect();
      const rr = rootRef.current.getBoundingClientRect();
      const bx0 = rr.left + BODY.left * rr.width, bx1 = rr.left + BODY.right * rr.width;
      const by0 = rr.top + BODY.top * rr.height, by1 = rr.top + BODY.bottom * rr.height;
      let minX = pr.left + PAD - bx0, maxX = pr.right - PAD - bx1;
      let minY = pr.top + PAD - by0, maxY = pr.bottom - PAD - by1;
      if (minX > maxX) minX = maxX = 0;
      if (minY > maxY) minY = maxY = 0;
      start.bounds = { minX, maxX, minY, maxY };
    }
    startRef.current = start;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    const s = startRef.current;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (s.h.type === 'scale') {
      const proj = (s.h.sSign ?? 1) * (dx * s.h.ax + dy * s.h.ay);
      setT({ scale: 1 + Math.max(-0.5, Math.min(2.5, proj / 110)), x: 0, y: 0, rot: 0 });
    } else if (s.h.type === 'translate') {
      let proj = dx * s.h.ax + dy * s.h.ay;
      const b = s.bounds;
      if (b) {
        // Limit travel along the axis so x & y both stay inside the backdrop.
        let pMin = -Infinity, pMax = Infinity;
        if (Math.abs(s.h.ax) > 1e-6) { const a = [b.minX / s.h.ax, b.maxX / s.h.ax]; pMin = Math.max(pMin, Math.min(...a)); pMax = Math.min(pMax, Math.max(...a)); }
        if (Math.abs(s.h.ay) > 1e-6) { const a = [b.minY / s.h.ay, b.maxY / s.h.ay]; pMin = Math.max(pMin, Math.min(...a)); pMax = Math.min(pMax, Math.max(...a)); }
        proj = Math.max(pMin, Math.min(pMax, proj));
      } else {
        proj = Math.max(s.h.tMin ?? -44, Math.min(s.h.tMax ?? 48, proj));
      }
      setT({ scale: 1, x: proj * s.h.ax, y: proj * s.h.ay, rot: 0, val: proj });
    } else if (s.h.type === 'pan' || s.h.type === 'center') {
      const b = s.bounds || { minX: -40, maxX: 40, minY: -40, maxY: 40 };
      setT({ scale: 1, x: Math.max(b.minX, Math.min(b.maxX, dx)), y: Math.max(b.minY, Math.min(b.maxY, dy)), rot: 0 });
    } else { // rotate — unbounded, so the arc can travel all the way around.
      setT({ scale: 1, x: 0, y: 0, rot: (s.h.rotDir ?? 1) * dx });
    }
  };
  const onUp = (e) => {
    const s = startRef.current;
    // Moves (pan / translate / centre) relocate the gizmo and stay put on
    // release; scale & rotate spring back.
    if (s && (s.h.type === 'pan' || s.h.type === 'translate' || s.h.type === 'center')) {
      const np = { x: pan.x + t.x, y: pan.y + t.y };
      setPan(np);
      onActiveChange?.(np.x !== 0 || np.y !== 0);
    }
    setActive(null);
    startRef.current = null;
    setT({ scale: 1, x: 0, y: 0, rot: 0 });
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  const dragging = HANDLES.find(h => h.id === active);
  const hoverH = HANDLES.find(h => h.id === hovered);
  const isRotateDrag = dragging?.type === 'rotate';

  const baseSrc = dragging && !isRotateDrag ? resolve(dragging.moving)
                : !dragging && hoverH ? resolve(hoverH.active)
                : idleSrc;
  const transform = dragging && !isRotateDrag
    ? `translate(${t.x}px, ${t.y}px) scale(${t.scale})`
    : undefined;

  // Static white axis guide for scale/translate drags: a line through the gizmo
  // centre along the handle's axis, run far past the viewBox so it spans the
  // whole window (clipped only by the backdrop). It never moves — only the
  // coloured cube/arrow on top of it does.
  const axisH = dragging && (dragging.type === 'scale' || dragging.type === 'translate') ? dragging : null;
  const ld = axisH ? (axisH.lineDir || [axisH.ax, axisH.ay]) : null;

  return (
    <div ref={rootRef} className={`relative select-none w-[220px] sm:w-[260px] ${className}`} style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}>
      {/* Preload every state so swaps are instant. */}
      {PRELOAD.map(n => (
        <img key={n} src={resolve(n)} alt="" aria-hidden="true" className="absolute opacity-0 w-0 h-0" />
      ))}

      {isRotateDrag ? (
        <>
          <img src={resolve(dragging.ring)} alt={alt} draggable="false" className="block w-full h-auto pointer-events-none" />
          <img src={resolve(dragging.arc)} alt="" aria-hidden="true" draggable="false" className="absolute inset-0 w-full h-auto pointer-events-none" style={{ transform: arcMatrix(t.rot, dragging.rot), transformOrigin: dragging.rot.origin }} />
        </>
      ) : (
        <>
          {ld && (
            <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="axisFade" gradientUnits="userSpaceOnUse" x1={CX - ld[0] * FADE} y1={CY - ld[1] * FADE} x2={CX + ld[0] * FADE} y2={CY + ld[1] * FADE}>
                  <stop offset="0" stopColor="white" stopOpacity="0" />
                  <stop offset="0.36" stopColor="white" stopOpacity="0.5" />
                  <stop offset="0.64" stopColor="white" stopOpacity="0.5" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1={CX - ld[0] * 4000} y1={CY - ld[1] * 4000} x2={CX + ld[0] * 4000} y2={CY + ld[1] * 4000} stroke="url(#axisFade)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          )}
          <img src={baseSrc} alt={alt} draggable="false" className="relative block w-full h-auto pointer-events-none" style={transform ? { transform, transformOrigin: (dragging && dragging.pivot) || ORIGIN } : undefined} />
        </>
      )}

      {HANDLES.map(h => (
        <button
          key={h.id}
          type="button"
          aria-label={h.id.replace('-', ' ')}
          onPointerEnter={() => setHovered(h.id)}
          onPointerLeave={() => { if (active !== h.id) setHovered(null); }}
          onPointerDown={onDown(h)}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full cursor-grab active:cursor-grabbing touch-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white/80"
          style={{ left: `${h.left}%`, top: `${h.top}%`, width: h.hitSize ?? 28, height: h.hitSize ?? 28 }}
        />
      ))}

      {dragging && (
        <div
          className="absolute z-10 px-2.5 py-1 rounded-full text-fine-print font-medium tabular-nums whitespace-nowrap text-black/70 dark:text-white/85 bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/30 pointer-events-none"
          style={{ left: `${dragging.left}%`, top: `${dragging.top}%`, transform: 'translate(-50%, calc(-100% - 10px))' }}
        >
          {formatGizmoValue(dragging, t)}
        </div>
      )}
    </div>
  );
});

export default DigitalTwinGizmo;
