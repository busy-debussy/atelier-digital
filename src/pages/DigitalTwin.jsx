import { useState, useEffect, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import PasswordGate from '../components/PasswordGate';
import DigitalTwinMenu from '../components/DigitalTwinMenu';
import DigitalTwinGizmo from '../components/DigitalTwinGizmo';
import AxisIndicator from '../components/AxisIndicator';
import ScrollForMore from '../components/ScrollForMore';
import imgArrowRight from '../assets/icons/icon-arrow-right.svg';
import imgChevronUp from '../assets/icons/icon-chevron-up.svg';
import imgChevronLeft  from '../assets/icons/icon-chevron-left.svg';
import imgChevronRight from '../assets/icons/icon-chevron-right.svg';
import { assetUrl } from '../utils/protectedAsset';
import WorldMapDots from '../components/WorldMapDots';
import imgToolFigma       from '../assets/logos/tools/logo-figma.webp';
import imgToolIllustrator from '../assets/logos/tools/logo-adobe-illustrator.webp';
import imgToolBezi        from '../assets/logos/tools/logo-bezi.webp';
import imgToolUnreal  from '../assets/logos/tools/logo-unreal-engine.svg';
import imgToolMiro    from '../assets/logos/tools/logo-miro.webp';
import imgToolTeams       from '../assets/logos/tools/logo-microsoft-teams.webp';
import imgToolJira        from '../assets/logos/tools/logo-atlassian-jira.webp';
import imgToolConfluence  from '../assets/logos/tools/logo-atlassian-confluence.webp';

// ---------------------------------------------------------------------------
// Digital Twin — protected case study.
//
// Real-time Unreal Engine platform for an unbuilt megaproject. Behind the
// password gate; protected images are served from private Vercel Blob via
// assetUrl(...) (never bundled). Mirrors Canap's section anatomy: hero with
// count-up stats, floating secondary nav with scroll-spy, collapsible sections
// built from the Tile vocabulary.
//
// Images: paste into private-assets/digital-twin/, run `npm run upload:assets`,
// then reference with assetUrl('digital-twin/<file>', token).
// ---------------------------------------------------------------------------

// Non-sensitive UI chrome (button labels, generic tool names + local logo
// assets, boilerplate microcopy) — kept local rather than round-tripped
// through the gated API, since none of it is case-study content. Everything
// that IS case-study content (hero title, context/challenge/evolution/users/
// design/impact copy) lives server-side only — see api/digital-twin.js — and
// arrives via the `content` this component receives from PasswordGate.
const LOCAL = {
  en: {
    pageTitle: 'Digital Twin • Case study',
    labels: { problem: 'Problem', solution: 'Solution', outcome: 'Outcome', goal: 'Goal' },
    protoHint: 'This prototype is interactive. Give it a try.',
    toolsLabel: 'Enablers',
    toolCategories: [
      {
        label: 'Design',
        tools: [
          { name: 'Figma',             icon: imgToolFigma },
          { name: 'Bezi',              icon: imgToolBezi },
          { name: 'Adobe Illustrator', icon: imgToolIllustrator },
        ],
      },
      {
        label: 'Dev',
        tools: [
          { name: 'Unreal Engine', icon: imgToolUnreal, darkInvert: true, circle: true },
        ],
      },
      {
        label: 'Project management',
        tools: [
          { name: 'Jira',            icon: imgToolJira },
          { name: 'Confluence',      icon: imgToolConfluence },
          { name: 'Miro',            icon: imgToolMiro },
          { name: 'Microsoft Teams', icon: imgToolTeams, zoom: 1.5 },
        ],
      },
    ],
    outro: 'Back to case studies',
  },

  fr: {
    pageTitle: 'Digital Twin • Étude de cas',
    labels: { problem: 'Problème', solution: 'Solution', outcome: 'Résultat', goal: 'Objectif' },
    protoHint: 'Ce prototype est interactif. Essayez-le.',
    toolsLabel: 'Catalyseurs',
    toolCategories: [
      {
        label: 'Design',
        tools: [
          { name: 'Figma',             icon: imgToolFigma },
          { name: 'Bezi',              icon: imgToolBezi },
          { name: 'Adobe Illustrator', icon: imgToolIllustrator },
        ],
      },
      {
        label: 'Dev',
        tools: [
          { name: 'Unreal Engine', icon: imgToolUnreal, darkInvert: true, circle: true },
        ],
      },
      {
        label: 'Gestion de projet',
        tools: [
          { name: 'Jira',            icon: imgToolJira },
          { name: 'Confluence',      icon: imgToolConfluence },
          { name: 'Miro',            icon: imgToolMiro },
          { name: 'Microsoft Teams', icon: imgToolTeams, zoom: 1.5 },
        ],
      },
    ],
    outro: 'Retour aux études de cas',
  },
};

// Drives the secondary-nav scroll-spy. Flat (no sub-sections); each id is wired
// to a <section> below.
// ─── Redesigned design-system showcase (Figma node 3511:16029) ───────────────
// Dark (surface/base #000) foundations on a single black panel, gold accent
// (#c9a84c) on the scale specimens. Values are the real iOS tokens.
const DS_ACCENT = '#c9a84c';
const DS_PALETTE = [
  { c: '#973286', label: 'purple' },
  { c: '#85E0EF', label: 'cyan' },
  { c: '#30D158', label: 'success' },
  { c: '#FEC700', label: 'accent' },
  { c: '#FF9900', label: 'warning' },
  { c: '#F04040', label: 'danger' },
  { c: '#C73468', label: 'pink' },
];
// Type role grid — 3 columns (base/panel/value contexts), each its own
// typographic hierarchy of Primary→Tertiary-equivalent roles.
const DS_TYPE_COLUMNS = [
  { header: 'base', rows: [
    { t: 'Primary', s: 16, w: 500 },
    { t: 'Secondary', s: 12, w: 400 },
    { t: 'Tertiary', s: 10, w: 400 },
  ] },
  { header: 'panel', rows: [
    { t: 'Title', s: 14, w: 600 },
    { t: 'Section', s: 10, w: 500 },
    { t: 'Sub-section', s: 9, w: 500 },
  ] },
  { header: 'value', rows: [
    { t: 'Display', s: 21, w: 400 },
    { t: 'Default', s: 16, w: 400 },
    { t: 'input', s: 11, w: 400 },
  ] },
];
const DS_SURFACES_RAMP = [
  { n: 'Soft', c: 'rgba(0,0,0,0.02)' },   // surface/soft
  { n: 'Base', c: 'rgba(0,0,0,0.48)' },   // surface/base
  { n: 'Strong', c: '#1C1C1E' },          // surface/strong
  { n: 'Focus', c: '#FFFFFF' },           // surface/focus
];
const DS_RADII_SCALE = [{ v: 8, l: '8' }, { v: 12, l: '12' }, { v: 16, l: '16' }, { v: 24, l: '24' }, { v: 9999, l: 'full' }];
const DS_ICON_SIZES = [{ s: 16, l: 'S 16' }, { s: 24, l: 'M 24' }, { s: 32, l: 'L 32' }, { s: 44, l: 'XL 44' }, { s: 64, l: '2XL 64' }];
const DS_SPACING_SCALE = [2, 4, 6, 8, 10, 12, 16, 24, 32, 40, 64];

// Primitive colours — solid neutral scale. First four (light) get a black
// stroke, the rest (mid-to-dark) a white stroke, matching the source spec.
const DS_GRAY_SCALE = [
  { hex: '#FAFAFA', v: '100', stroke: 'rgba(0,0,0,0.12)' },
  { hex: '#F6F6F6', v: '200', stroke: 'rgba(0,0,0,0.12)' },
  { hex: '#D6D6D6', v: '300', stroke: 'rgba(0,0,0,0.12)' },
  { hex: '#ADADAD', v: '400', stroke: 'rgba(0,0,0,0.12)' },
  { hex: '#98989F', v: '500', stroke: 'rgba(255,255,255,0.24)' },
  { hex: '#5C5C5C', v: '600', stroke: 'rgba(255,255,255,0.24)' },
  { hex: '#39393D', v: '700', stroke: 'rgba(255,255,255,0.24)' },
  { hex: '#2C2C2E', v: '800', stroke: 'rgba(255,255,255,0.24)' },
  { hex: '#1C1C1E', v: '900', stroke: 'rgba(255,255,255,0.24)' },
  { hex: '#000000', v: '950', stroke: 'rgba(255,255,255,0.24)' },
];
// Shared opacity steps for the White / Black transparent scales.
const DS_ALPHA_STEPS = [4, 8, 12, 16, 24, 32, 48, 64, 72, 88];
// Primitive colours — 9-hue × 4-variant matrix. Each cell is encoded exactly
// as its source layers (a base fill plus, for some cells, a semi-transparent
// white/black overlay on top) rather than a flattened hex, since a few hues
// are literal overlay composites rather than a distinct picked colour.
const DS_HUE_MATRIX = [
  { name: 'Red', cells: [
    { fill: '#DD2727' },
    { fill: '#F84646' },
    { fill: '#803232' },
    { fill: '#DD2727', opacity: 0.48 },
  ] },
  { name: 'Orange', cells: [
    { fill: '#FF9C0B' },
    { fill: '#FFBF61', overlay: { color: 'white', opacity: 0.56 } },
    { fill: '#FFBF61', overlay: { color: 'black', opacity: 0.56 } },
    { fill: '#FFBF61', opacity: 0.48 },
  ] },
  { name: 'Gold', cells: [
    { fill: '#B28B31' },
    { fill: '#D6C59F' },
    { fill: '#B28B31', overlay: { color: 'black', opacity: 0.56 } },
    { fill: '#B28B31', opacity: 0.48 },
  ] },
  { name: 'Yellow', cells: [
    { fill: '#F4EC20' },
    { fill: '#F4EC20', overlay: { color: 'white', opacity: 0.56 } },
    { fill: '#F4EC20', overlay: { color: 'black', opacity: 0.56 } },
    { fill: '#F4EC20', opacity: 0.48 },
  ] },
  { name: 'Green', cells: [
    { fill: '#30D158' },
    { fill: '#4EE874', overlay: { color: 'white', opacity: 0.24 } },
    { fill: '#1D662F', overlay: { color: 'black', opacity: 0.56 } },
    { fill: '#30D158', opacity: 0.48 },
  ] },
  { name: 'Blue', cells: [
    { fill: '#0672F0' },
    { fill: '#009CFF' },
    { fill: '#0672F0', overlay: { color: 'black', opacity: 0.56 } },
    { fill: '#0672F0', opacity: 0.48 },
  ] },
  { name: 'Teal', cells: [
    { fill: '#3FE6C7' },
    { fill: '#3FE6C7', overlay: { color: 'white', opacity: 0.56 } },
    { fill: '#3FE6C7', overlay: { color: 'black', opacity: 0.56 } },
    { fill: '#3FE6C7', opacity: 0.48 },
  ] },
  { name: 'Purple', cells: [
    { fill: '#9F2BD9' },
    { fill: '#C66FF9' },
    { fill: '#9F2BD9', overlay: { color: 'black', opacity: 0.56 } },
    { fill: '#9F2BD9', opacity: 0.48 },
  ] },
  { name: 'Pink', cells: [
    { fill: '#E44ADD' },
    { fill: '#E44ADD', overlay: { color: 'white', opacity: 0.56 } },
    { fill: '#F663EF', overlay: { color: 'black', opacity: 0.48 } },
    { fill: '#E44ADD', opacity: 0.48 },
  ] },
];
const DS_HUE_ROWS = ['Base', 'Soft', 'Dark', 'Alpha'];

const DS_TYPE_WEIGHTS = [
  { l: 'Regular', v: 400 }, { l: 'Medium', v: 500 }, { l: 'Semi-bold', v: 600 }, { l: 'Italic', v: '' },
];
const DS_TYPE_SIZE_SCALE = [
  { l: 'XS', v: 8 }, { l: 'S', v: 10 }, { l: 'M', v: 12 }, { l: 'L', v: 14 }, { l: 'XL', v: 16 }, { l: '2XL', v: 20 },
];
const DS_TYPE_LINE_HEIGHT_SCALE = [
  { l: 'XS', v: 8 }, { l: 'S', v: 12 }, { l: 'M', v: 16 }, { l: 'L', v: 20 }, { l: 'XL', v: 24 }, { l: '2XL', v: 32 },
];

function DsLabel({ children, className = '' }) {
  return <p className={`text-copy-m font-semibold text-white mb-4 ${className}`}>{children}</p>;
}

// SquareDashedIcon — SF Symbol `square.dashed` (the icon-sizes specimen): a
// rounded square drawn with a few long rounded dashes. Scales the stroke with
// the size so the dash rhythm matches the glyph at 16 → 64pt.
function SquareDashedIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className="block">
      <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.5" stroke={DS_ACCENT} strokeWidth="2" strokeLinecap="round" strokeDasharray="3.1 2.9" />
    </svg>
  );
}

// IconFocusStates — idle/focus pair for two icons from the real iconography
// set (gear, globe), each split into a dark "idle" half and a white "focus"
// half within one pill, demonstrating that focus is expressed via
// fills/bolder strokes rather than a colour change alone.
function IconFocusStates({ token, copy }) {
  const pairClass = 'flex flex-col items-center gap-2';
  const labelRowClass = 'flex text-fine-print';
  const pillClass = 'flex w-24 h-12 rounded-radius-4 overflow-hidden border border-white/24';
  const halfClass = 'w-1/2 h-full flex items-center justify-center';
  return (
    <div className="mt-8 sm:mt-10">
      <div className="flex justify-center gap-8 sm:gap-10">
        <div className={pairClass}>
          <div className={labelRowClass}>
            <span className="w-12 text-center text-fg-on-dark-opacity-64">{copy.idle}</span>
            <span className="w-12 text-center font-semibold text-fg-on-dark-primary">{copy.focus}</span>
          </div>
          <div data-squircle className={pillClass}>
            <div className={`${halfClass} bg-black`}>
              <img src={assetUrl('digital-twin/design-system.settings.svg', token)} alt="" className="w-6 h-6" draggable="false" />
            </div>
            <div className={`${halfClass} bg-white`}>
              <img src={assetUrl('digital-twin/design-system.settings-active.svg', token)} alt="" className="w-6 h-6" draggable="false" />
            </div>
          </div>
        </div>
        <div className={pairClass}>
          <div className={labelRowClass}>
            <span className="w-12 text-center text-fg-on-dark-opacity-64">{copy.idle}</span>
            <span className="w-12 text-center font-semibold text-fg-on-dark-primary">{copy.focus}</span>
          </div>
          <div data-squircle className={pillClass}>
            <div className={`${halfClass} bg-black`}>
              <img src={assetUrl('digital-twin/design-system.globe.svg', token)} alt="" className="w-9 h-9" draggable="false" />
            </div>
            <div className={`${halfClass} bg-white`}>
              <img src={assetUrl('digital-twin/design-system.globe-active.svg', token)} alt="" className="w-9 h-9" draggable="false" />
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-center text-fine-print text-fg-on-dark-opacity-64">
        {copy.line1} <span className="font-semibold text-fg-on-dark-primary">{copy.focusState}</span><br />
        {copy.line2}
      </p>
    </div>
  );
}

// DsPalette — colour swatches whose token name reveals on hover (desktop) and
// on tap (mobile). Hover/keyboard-focus are pure CSS; a tap calls reveal(i),
// which toggles the label: tapping a swatch shows its name (and auto-hides
// after a delay, since a tap has no natural "leave" event); tapping the same
// swatch again hides it immediately.
function DsPalette({ label }) {
  const [revealed, setRevealed] = useState(null);
  const timerRef = useRef(null);
  const reveal = (i) => {
    clearTimeout(timerRef.current);
    if (revealed === i) {
      setRevealed(null);   // tap again on the same swatch → hide
      return;
    }
    setRevealed(i);
    timerRef.current = setTimeout(() => setRevealed(null), 1600);
  };
  useEffect(() => () => clearTimeout(timerRef.current), []);
  return (
    <div>
      <DsLabel>{label}</DsLabel>
      <div className="flex justify-between items-start max-w-md mx-auto lg:max-w-none lg:mx-0">
        {DS_PALETTE.map(({ c, label: name }, i) => (
          <button
            key={i}
            type="button"
            aria-label={name}
            onClick={() => reveal(i)}
            className="group relative block p-0 leading-none focus:outline-none"
          >
            {/* Mobile (phone): pill only — the tinted container + stroke appear
                just for the selected swatch (revealed/tap) so the row reads as
                spaced pills. Tablet/desktop (md+): container appears on hover
                (and focus) only. Border stays present but transparent off-state
                so toggling tint never shifts layout. */}
            <span
              data-squircle
              className={`flex items-center p-2 rounded-radius-5 border transition-colors duration-150 md:group-hover:bg-[var(--tint)] md:group-hover:border-white/[0.08] group-focus-visible:bg-[var(--tint)] group-focus-visible:border-white/[0.08] ${revealed === i ? 'bg-[var(--tint)] border-white/[0.08]' : 'bg-transparent border-transparent'}`}
              style={{ '--tint': `${c}26` }}
            >
              <span className="block w-6 h-11 rounded-radius-4" style={{ backgroundColor: c }} />
            </span>
            <span
              className={`pointer-events-none absolute left-1/2 top-full -translate-x-1/2 mt-1.5 text-fine-print font-semibold text-white/85 whitespace-nowrap transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 ${revealed === i ? 'opacity-100' : 'opacity-0'}`}
            >
              colour/{name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Swatch — a single static 16px primitive-colour circle (the source's
// literal size). `overlay` paints a second semi-transparent layer on top of
// `fill`, reproducing source cells that are a layered composite rather than
// a single flattened hex.
function Swatch({ fill, opacity, overlay, stroke, label }) {
  return (
    <span role="img" aria-label={label} className="relative block w-4 h-4 rounded-full overflow-hidden shrink-0">
      <span className="absolute inset-0" style={{ backgroundColor: fill, opacity: opacity ?? 1 }} />
      {overlay && <span className="absolute inset-0" style={{ backgroundColor: overlay.color, opacity: overlay.opacity }} />}
      <span className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: `inset 0 0 0 0.5px ${stroke}` }} />
    </span>
  );
}

// PrimitiveColours — Gray/White/Black scales plus the 9-hue × 4-variant
// matrix (Base/Soft/Dark/Alpha), each row a fixed-width label + a tight row
// of 16px swatches (the source's own spacing) so the whole thing sits inside
// a single 320px grid column instead of stretching full-width. The Black
// scale row gets a white pill since black-transparent swatches are
// otherwise invisible on this card's black bg.
function PrimitiveColours({ title, lang }) {
  const rowLabelClass = 'w-10 shrink-0 mt-0.5 text-fine-print leading-none text-fg-on-dark-opacity-64';
  const grayLabel = lang === 'fr' ? 'Gris' : 'Gray';
  const whiteLabel = lang === 'fr' ? 'Blanc' : 'White';
  const blackLabel = lang === 'fr' ? 'Noir' : 'Black';
  return (
    <div>
      <DsLabel>{title}</DsLabel>
      <div className="flex flex-col gap-2 max-w-[300px] mx-auto lg:max-w-none lg:mx-0">
        <div className="flex items-start gap-2">
          <span className={rowLabelClass}>{grayLabel}</span>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-[7px]">
              {DS_GRAY_SCALE.map((g, i) => (
                <Swatch key={i} fill={g.hex} stroke={g.stroke} label={`${grayLabel} ${g.v}`} />
              ))}
            </div>
            <div className="flex items-center gap-[7px]">
              {DS_GRAY_SCALE.map((g, i) => (
                <span key={i} className="w-4 shrink-0 text-center text-[7px] leading-none tabular-nums text-fg-on-dark-opacity-64">{g.v}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2 mt-8">
          <span className={rowLabelClass}>{whiteLabel}</span>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-[7px]">
              {DS_ALPHA_STEPS.map((p, i) => (
                <Swatch key={i} fill="white" opacity={p / 100} stroke="rgba(255,255,255,0.24)" label={`${whiteLabel} ${p}%`} />
              ))}
            </div>
            {/* Empty caption-height spacer — keeps this row's total block
                height equal to Gray/Black's (which have a caption line below
                their swatches), so the shared gap-2.5 reads as one consistent
                rhythm instead of a bigger gap after Gray/Black than after White. */}
            <div className="h-[7px]" aria-hidden="true" />
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className={rowLabelClass}>{blackLabel}</span>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-[7px] -mx-0.5 -my-0.5 rounded-radius-3 bg-white/95 px-0.5 py-0.5">
              {DS_ALPHA_STEPS.map((p, i) => (
                <Swatch key={i} fill="black" opacity={p / 100} stroke="rgba(0,0,0,0.24)" label={`${blackLabel} ${p}%`} />
              ))}
            </div>
            <div className="flex items-center gap-[7px]">
              {DS_ALPHA_STEPS.map((p, i) => (
                <span key={i} className="w-4 shrink-0 text-center text-[7px] leading-none tabular-nums text-fg-on-dark-opacity-64">{p}</span>
              ))}
            </div>
          </div>
        </div>
        {DS_HUE_ROWS.map((rowLabel, r) => (
          <div key={r} className={`flex items-start gap-2 ${r === 0 ? 'mt-8' : ''}`}>
            <span className={rowLabelClass}>{rowLabel}</span>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-[10px]">
                {DS_HUE_MATRIX.map((h, c) => {
                  const cell = h.cells[r];
                  const swatch = <Swatch fill={cell.fill} opacity={cell.opacity} overlay={cell.overlay} stroke="rgba(0,0,0,0.24)" label={`${h.name} · ${rowLabel}`} />;
                  if (rowLabel !== 'Alpha') return <Fragment key={c}>{swatch}</Fragment>;
                  return (
                    <span key={c} className="relative block w-4 h-4 shrink-0">
                      <span aria-hidden="true" className="absolute -inset-x-0.5 top-1/2 -bottom-0.5 rounded-b-radius-3 bg-white/95" />
                      {swatch}
                    </span>
                  );
                })}
              </div>
              {/* Blank spacer matching the caption line under Gray/White/Black
                  so every row shares the same two-line block height — keeps
                  swatch-to-swatch spacing uniform across the whole component. */}
              <div className="h-[7px]" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// TypeBadge — a single pill chip (weight/size/line-height token name).
function TypeBadge({ children, width }) {
  return (
    <span
      data-squircle
      className={`inline-flex items-center justify-center h-[26px] rounded-radius-2 border border-white/48 text-fine-print text-white whitespace-nowrap ${width ? width : 'px-2.5'}`}
    >
      {children}
    </span>
  );
}

// PrimitiveType — font-family, weight, size and line-height primitives.
// Size and line-height share the same XS…2XL badge labels but map to
// different px values, so each gets its own caption row underneath.
function PrimitiveType({ title, className = '' }) {
  const rowLabel = 'block text-fine-print leading-none text-fg-on-dark-opacity-64 mb-2';
  // Fixed pill width so XS…2XL read as a consistent scale rather than each
  // pill hugging its own label length.
  const sizeBadgeWidth = 'w-10';
  // Shared content width — matches what the weight/size/line-height pill
  // groups naturally fill (6×40px + 5×8px gaps, ≈ 4 weight pills + gaps).
  // Centering this fixed box (rather than each row's own content) means
  // every row's left edge lines up, so the single "Inter" pill starts at
  // the same x as "Regular"/"XS" instead of centering around its own width.
  const rowContentClass = 'w-[280px] mx-auto';
  return (
    <div className={className}>
      <DsLabel>{title}</DsLabel>
      <div className="flex flex-col gap-4">
        <div>
          <span className={rowLabel}>font-family</span>
          <div className={`flex ${rowContentClass}`}>
            <div className="flex flex-col items-center gap-1">
              <TypeBadge>Inter</TypeBadge>
              {/* Blank caption — same structure as weight/size/line-height's
                  value line, so every row shares the same block height and
                  the shared gap-4 reads as one consistent rhythm. */}
              <span className="text-fine-print tabular-nums" aria-hidden="true">&nbsp;</span>
            </div>
          </div>
        </div>
        <div>
          <span className={rowLabel}>weight</span>
          <div className={`flex flex-nowrap gap-1.5 ${rowContentClass}`}>
            {DS_TYPE_WEIGHTS.map((w, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <TypeBadge>{w.l}</TypeBadge>
                <span className="text-fine-print tabular-nums text-fg-on-dark-opacity-64">{w.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className={rowLabel}>size</span>
          <div className={`flex gap-2 ${rowContentClass}`}>
            {DS_TYPE_SIZE_SCALE.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <TypeBadge width={sizeBadgeWidth}>{s.l}</TypeBadge>
                <span className="text-fine-print tabular-nums text-fg-on-dark-opacity-64">{s.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className={rowLabel}>line-height</span>
          <div className={`flex gap-2 ${rowContentClass}`}>
            {DS_TYPE_LINE_HEIGHT_SCALE.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <TypeBadge width={sizeBadgeWidth}>{s.l}</TypeBadge>
                <span className="text-fine-print tabular-nums text-fg-on-dark-opacity-64">{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ControllerMapping — protected PlayStation 5 gamepad-mapping SVG for the
// constraint section. Picks the file matching the viewer's layout (desktop vs
// mobile) and renders both themes, switching with CSS so a dark-mode toggle is
// instant. Files are `gamepad.ps5-controller-<lang>-<device>-<theme>.svg` in
// private Blob, so only the matching pair is fetched. Defaults to desktop
// until the media query resolves.
function ControllerMapping({ lang, token, copy, className = '' }) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  const device = isMobile ? 'mobile' : 'desktop';
  const imgClass = 'block w-full h-auto max-w-xl mx-auto';

  return (
    <figure className={className}>
      <figcaption className="mb-5 sm:mb-6">
        <span className={`block ${microLabel}`}>{copy.label}</span>
      </figcaption>
      <img
        src={assetUrl(`digital-twin/gamepad.ps5-controller-${lang}-${device}-light.svg`, token)}
        alt={copy.ps5Alt}
        className={`${imgClass} dark:hidden`}
        draggable="false"
      />
      <img
        src={assetUrl(`digital-twin/gamepad.ps5-controller-${lang}-${device}-dark.svg`, token)}
        alt=""
        aria-hidden="true"
        className={`${imgClass} hidden dark:block`}
        draggable="false"
      />
    </figure>
  );
}

// GamepadImplicationExample — screenshot illustrating a gamepad implication
// (focus state, directional navigation), shown below its bullet. A plain
// <picture> (no light/dark variant needed) so the browser fetches only the
// breakpoint that matches. `name` is the shared file prefix, e.g.
// `gamepad.focus-state` for `gamepad.focus-state.{desktop,tablet,mobile}.webp`.
// `gamepad.directional-navigation` hasn't been re-exported as webp yet, so it
// still resolves against its legacy `{name}-{device}.png` files via `sep`/`ext`.
function GamepadImplicationExample({ token, name, alt, caption, className = '', sep = '-', ext = 'png' }) {
  return (
    <figure className={`flex flex-col gap-2 ${className}`}>
      <picture>
        <source media="(min-width: 1024px)" srcSet={assetUrl(`digital-twin/${name}${sep}desktop.${ext}`, token)} />
        <source media="(min-width: 640px)" srcSet={assetUrl(`digital-twin/${name}${sep}tablet.${ext}`, token)} />
        <img
          src={assetUrl(`digital-twin/${name}${sep}mobile.${ext}`, token)}
          alt={alt}
          className="block w-full h-auto rounded-radius-4 sm:rounded-radius-6"
          draggable="false"
        />
      </picture>
      <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{caption}</figcaption>
    </figure>
  );
}

// FocusStateCycle — animated illustration of the gamepad focus state. A
// black squircle (data-squircle, no illustrated backdrop image) stays
// permanently rendered; all 6 UI elements show a focus ring simultaneously
// and at all times on top of it — elements with only one exported variant
// stay fixed, elements with multiple variants loop through them forever on
// a shared timer. Tablet reuses the desktop layout (same wide single-row
// composition, confirmed against the reference webps), but mobile is a
// genuinely different rearranged two-row composition — not a scaled-down
// desktop layout — so it gets its own base aspect ratio and element
// positions. Positions are % of the base box so they scale with the
// rendered size. Frozen under prefers-reduced-motion.
const FOCUS_LAYOUTS = {
  desktop: {
    baseW: 633, baseH: 208, radiusClass: 'rounded-radius-6',
    elements: [
      { key: 'gizmo', x: 491, y: 57, w: 98, h: 98, variants: [
        'intentional-constraints.gizmo.focus1.desktop.svg',
        'intentional-constraints.gizmo.focus2.desktop.svg',
        'intentional-constraints.gizmo.focus3.desktop.svg',
        'intentional-constraints.gizmo.focus4.desktop.svg',
        'intentional-constraints.gizmo.focus5.desktop.svg',
        'intentional-constraints.gizmo.focus6.desktop.svg',
        'intentional-constraints.gizmo.focus7.desktop.svg',
        'intentional-constraints.gizmo.focus8.desktop.svg',
        'intentional-constraints.gizmo.focus9.desktop.svg',
      ] },
      { key: 'grouped-tool', x: 285, y: 116, w: 56, h: 40, variants: [
        'intentional-constraints.grouped-tool.focus1.desktop.svg',
        'intentional-constraints.grouped-tool.focus2.desktop.svg',
      ] },
      { key: 'settings', x: 32, y: 32, w: 48, h: 144, variants: [
        'intentional-constraints.settings.focus1.desktop.svg',
        'intentional-constraints.settings.focus2.desktop.svg',
        'intentional-constraints.settings.focus3.desktop.svg',
      ] },
      { key: 'slider', x: 335, y: 120, w: 108, h: 32, variants: [
        'intentional-constraints.slider.focus1.desktop.svg',
        'intentional-constraints.slider.focus2.desktop.svg',
      ] },
      { key: 'slicing-object', x: 110, y: 32, w: 134, h: 134, variants: [
        'intentional-constraints.slicing-object.focus1.desktop.svg',
        'intentional-constraints.slicing-object.focus2.desktop.svg',
        'intentional-constraints.slicing-object.focus3.desktop.svg',
        'intentional-constraints.slicing-object.focus4.desktop.svg',
      ] },
      { key: 'item', x: 265, y: 55, w: 180, h: 32, variants: [
        'intentional-constraints.item.focus1.desktop.svg',
        'intentional-constraints.item.focus2.desktop.svg',
        'intentional-constraints.item.focus3.desktop.svg',
        'intentional-constraints.item.focus4.desktop.svg',
      ] },
    ],
  },
  // Rearranged two-row composition (top: settings / slicing-object / gizmo,
  // bottom: grouped-tool / slider / item) — reuses the same desktop SVG
  // exports, just repositioned to match gamepad.focus-state.mobile.webp
  // (486×328). Best-effort from visual inspection of the reference webp —
  // not diff-derived, so treat as a starting point pending visual nudging.
  mobile: {
    baseW: 486, baseH: 328, radiusClass: 'rounded-radius-6',
    elements: [
      { key: 'settings', x: 15, y: 15, w: 80, h: 180, variants: [
        'intentional-constraints.settings.focus1.desktop.svg',
        'intentional-constraints.settings.focus2.desktop.svg',
        'intentional-constraints.settings.focus3.desktop.svg',
      ] },
      { key: 'slicing-object', x: 120, y: 15, w: 158, h: 180, variants: [
        'intentional-constraints.slicing-object.focus1.desktop.svg',
        'intentional-constraints.slicing-object.focus2.desktop.svg',
        'intentional-constraints.slicing-object.focus3.desktop.svg',
        'intentional-constraints.slicing-object.focus4.desktop.svg',
      ] },
      { key: 'gizmo', x: 305, y: 60, w: 160, h: 120, variants: [
        'intentional-constraints.gizmo.focus1.desktop.svg',
        'intentional-constraints.gizmo.focus2.desktop.svg',
        'intentional-constraints.gizmo.focus3.desktop.svg',
        'intentional-constraints.gizmo.focus4.desktop.svg',
        'intentional-constraints.gizmo.focus5.desktop.svg',
        'intentional-constraints.gizmo.focus6.desktop.svg',
        'intentional-constraints.gizmo.focus7.desktop.svg',
        'intentional-constraints.gizmo.focus8.desktop.svg',
        'intentional-constraints.gizmo.focus9.desktop.svg',
      ] },
      { key: 'grouped-tool', x: 15, y: 235, w: 65, h: 65, variants: [
        'intentional-constraints.grouped-tool.focus1.desktop.svg',
        'intentional-constraints.grouped-tool.focus2.desktop.svg',
      ] },
      { key: 'slider', x: 115, y: 250, w: 145, h: 35, variants: [
        'intentional-constraints.slider.focus1.desktop.svg',
        'intentional-constraints.slider.focus2.desktop.svg',
      ] },
      { key: 'item', x: 270, y: 240, w: 195, h: 50, variants: [
        'intentional-constraints.item.focus1.desktop.svg',
        'intentional-constraints.item.focus2.desktop.svg',
        'intentional-constraints.item.focus3.desktop.svg',
        'intentional-constraints.item.focus4.desktop.svg',
      ] },
    ],
  },
};
const pct = (px, total) => `${(px / total) * 100}%`;
const FOCUS_CYCLE_INTERVAL = 900;

function FocusStateCycle({ token, alt, caption, className = '', layout = 'desktop' }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setTick((t) => t + 1), FOCUS_CYCLE_INTERVAL);
    return () => clearInterval(timer);
  }, []);
  const { baseW, baseH, elements, radiusClass } = FOCUS_LAYOUTS[layout];
  return (
    <figure className={`flex flex-col gap-2 ${className}`}>
      <div className="relative" role="img" aria-label={alt}>
        <div data-squircle className={`w-full ${radiusClass} bg-black`} style={{ aspectRatio: `${baseW} / ${baseH}` }} />
        {elements.map((el) => (
          <div
            key={el.key}
            className="absolute"
            style={{ left: pct(el.x, baseW), top: pct(el.y, baseH), width: pct(el.w, baseW), height: pct(el.h, baseH) }}
          >
            <img
              src={assetUrl(`digital-twin/${el.variants[tick % el.variants.length]}`, token)}
              alt=""
              aria-hidden="true"
              className="block w-full h-full object-contain"
              draggable="false"
            />
          </div>
        ))}
      </div>
      <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{caption}</figcaption>
    </figure>
  );
}

function DesignSystemShowcase({ labels, iconsSrc, token, iconFocusCopy, lang }) {
  return (
    // Desktop (lg): a 2-column grid matching the Figma redesign (node
    // 3529:1551). Left column: Primitive colours + Palette + Iconography +
    // Icon sizes, then Spacing. Right column: Surfaces + Primitive type +
    // Typography + Radii. Both cells stretch to the row's full height
    // (items-stretch) and their last item (Spacing / Radii) gets lg:mt-auto
    // so the two bar/square scales land on the same baseline regardless of
    // how much content precedes them in each column. Below lg it collapses
    // to a single centred column in source order.
    <div className="flex flex-col gap-16 sm:gap-20 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16 lg:items-stretch">
      {/* Row 1 · left — Primitive colours + Palette + Iconography (with Icon
          sizes stacked under it), then Spacing pinned to the bottom. */}
      <div className="flex flex-col gap-16 sm:gap-20 lg:gap-12 lg:h-full">
        <PrimitiveColours title={labels.primitiveColours} lang={lang} />
        <DsPalette label={labels.palette} />
        <div>
          <DsLabel>{labels.icons}</DsLabel>
          <img src={iconsSrc} alt={lang === 'fr' ? 'Jeu d’icônes' : 'Iconography set'} className="block w-full h-auto" draggable="false" />
          <IconFocusStates token={token} copy={iconFocusCopy} />
        </div>
        <div>
          <DsLabel>{labels.iconSizes}</DsLabel>
          <div className="flex justify-center lg:justify-between items-end gap-5 sm:gap-7">
            {DS_ICON_SIZES.map((it, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <SquareDashedIcon size={it.s} />
                <span className="text-fine-print text-white/50 whitespace-nowrap">{it.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spacing: bottom-aligned bar scale */}
        <div className="lg:mt-auto">
          <DsLabel>{labels.spacing}</DsLabel>
          <div className="flex justify-center lg:justify-between items-end gap-3.5 sm:gap-4 lg:h-[88px]">
            {DS_SPACING_SCALE.map((v, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="block w-2 rounded-full" style={{ height: `${v}px`, backgroundColor: DS_ACCENT }} />
                <span className="text-fine-print text-white/50 tabular-nums">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 1 · right — Surfaces, then the Type role grid in a section-surface
          card with a fade. */}
      <div className="lg:h-full lg:flex lg:flex-col">
        <div>
          <DsLabel>{labels.surfaces}</DsLabel>
          <div
            data-squircle
            className="max-w-md mx-auto lg:max-w-none lg:mx-0 rounded-radius-8 overflow-hidden border border-white/24"
          >
            {/* Soft/Base are backdrop-blur surfaces (frosted glass), not flat
                alpha tints — on this card's black bg a plain tint would
                composite to indistinguishable black either way, so a checker
                sits behind them as real content for the blur to soften,
                making the effect (and the 2%/48% difference) visible. It's
                scoped to just this relative wrapper, not the outer bordered
                box, so the semi-transparent border never shows checker
                behind Strong/Focus. */}
            <div
              className="relative"
              style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
            >
              {/* Checker + blur applied once to this shared wrapper (not per
                  bar) so there's a single continuous blur with no seam at
                  the Soft/Base boundary. Dark tones (not light/white) so the
                  blurred average still reads as "nearly black" like the
                  card behind it, while still varying enough to tell 2%
                  from 48% apart. */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  backgroundImage: 'conic-gradient(#141414 90deg, #333333 90deg 180deg, #141414 180deg 270deg, #333333 270deg)',
                  backgroundSize: '24px 24px',
                }}
              />
              {DS_SURFACES_RAMP.filter((s) => s.n === 'Soft' || s.n === 'Base').map((s, i) => (
                <div
                  key={i}
                  className="relative h-16 sm:h-[72px] flex items-center px-7 text-copy-m text-white"
                  style={{ backgroundColor: s.c }}
                >
                  {s.n}
                </div>
              ))}
            </div>
            {DS_SURFACES_RAMP.filter((s) => s.n === 'Strong' || s.n === 'Focus').map((s, i) => (
              <div
                key={i}
                className={`h-16 sm:h-[72px] flex items-center px-7 text-copy-m ${s.n === 'Focus' ? 'text-black font-medium' : 'text-white'}`}
                style={{ backgroundColor: s.c }}
              >
                {s.n}
              </div>
            ))}
          </div>
        </div>

        <PrimitiveType title={labels.primitiveType} className="mt-16 sm:mt-20 lg:mt-12" />

        <DsLabel className="mt-16 sm:mt-20 lg:mt-12">{labels.type}</DsLabel>
        <div className="max-w-md mx-auto lg:max-w-none lg:mx-0 lg:flex-1 lg:flex lg:flex-col">
          <div className="grid grid-cols-3 mb-3 px-5 sm:px-6">
            {DS_TYPE_COLUMNS.map((col, i) => (
              <span key={i} className="text-fine-print leading-none text-fg-on-dark-opacity-64">{col.header}</span>
            ))}
          </div>
          <div data-squircle className="relative lg:flex-1 rounded-radius-6 bg-[#1c1c1e] overflow-hidden px-5 py-5 sm:px-6 sm:py-6">
            {/* Row-major grid (not column-major): each role differs in font
                size across columns (16/14/21px on row 1, etc.). Fixed-height
                rows + bottom alignment (rather than items-baseline, whose
                offset shifts with each cell's font metrics) keep the
                row-to-row rhythm even within every column, regardless of the
                other columns' larger/smaller type scale sharing that row. */}
            <div className="grid grid-cols-3 auto-rows-[24px] items-end gap-y-8 lg:h-full lg:content-between">
              {[0, 1, 2].flatMap((ri) =>
                DS_TYPE_COLUMNS.map((col, ci) => {
                  const cell = col.rows[ri];
                  return (
                    <span
                      key={`${ri}-${ci}`}
                      className={`leading-none whitespace-nowrap min-w-0 ${cell.cls || 'text-fg-on-dark-primary'}`}
                      style={{ fontSize: `${cell.s}px`, fontWeight: cell.w }}
                    >
                      {cell.t}
                    </span>
                  );
                })
              )}
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#1c1c1e]" />
          </div>
        </div>

        {/* Radii: gold-outlined squares. Drawn radius is halved (the Figma
            intent) so 16/24 stay visible as rounded squares on the small
            32px swatch instead of collapsing to circles; labels are real. */}
        <div className="mt-16 sm:mt-20 lg:mt-12">
          <DsLabel>{labels.radii}</DsLabel>
          <div className="flex justify-center items-start lg:items-end gap-6 sm:gap-7 lg:gap-8 lg:h-[88px]">
            {DS_RADII_SCALE.map((r, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="block w-8 h-8 border-2" style={{ borderColor: DS_ACCENT, borderRadius: r.v === 9999 ? '9999px' : `${r.v / 2}px` }} />
                <span className="text-fine-print text-white/50">{r.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const SECTIONS = {
  en: [
    { id: 'context', title: 'Context', subsections: [
      { id: 'ctx-origin',   title: 'Origin' },
      { id: 'ctx-team',     title: 'Our team' },
      { id: 'ctx-role',     title: 'My role' },
    ] },
    { id: 'challenge', title: 'Problem', subsections: [
      { id: 'ch-problem', title: 'Question' },
    ] },
    { id: 'users', title: 'Users' },
    { id: 'evolution', title: 'Scope' },
    { id: 'design', title: 'Design', subsections: [
      { id: 'design-gamepad', title: 'Constraint' },
      { id: 'design-system', title: 'System' },
      { id: 'design-menu', title: 'Menu' },
      { id: 'design-spatial', title: 'Spatial' },
    ] },
    { id: 'design-challenges', title: 'Challenges', subsections: [
      { id: 'challenge-1', title: 'Scene tools' },
      { id: 'challenge-2', title: 'Structures' },
      { id: 'challenge-3', title: 'Wayfinding' },
    ] },
    { id: 'impact', title: 'Impact' },
  ],
  fr: [
    { id: 'context', title: 'Contexte', subsections: [
      { id: 'ctx-origin',   title: 'Origine' },
      { id: 'ctx-team',     title: 'Notre équipe' },
      { id: 'ctx-role',     title: 'Mon rôle' },
    ] },
    { id: 'challenge', title: 'Problème', subsections: [
      { id: 'ch-problem', title: 'Question' },
    ] },
    { id: 'users', title: 'Utilisateurs' },
    { id: 'evolution', title: 'Cadre' },
    { id: 'design', title: 'Conception', subsections: [
      { id: 'design-gamepad', title: 'Contrainte' },
      { id: 'design-system', title: 'Système' },
      { id: 'design-menu', title: 'Menu' },
      { id: 'design-spatial', title: 'Spatial' },
    ] },
    { id: 'design-challenges', title: 'Défis', subsections: [
      { id: 'challenge-1', title: 'Échelle ville' },
      { id: 'challenge-2', title: 'Exploration' },
      { id: 'challenge-3', title: 'Orientation' },
    ] },
    { id: 'impact', title: 'Impact' },
  ],
};

const tileBodyText = 'text-copy-m font-normal leading-loose text-fg-secondary [&_strong]:text-fg-primary';

// ── Team map (reuses WorldMapDots from the other case studies) ──
// 8-person team across four countries: UX/UI in Scotland, the Unreal engineer
// and four Unreal artists in Vietnam, the project manager in England, and the
// product manager (AEC domain expert) in the UAE.
const DT_TEAM_DOTS = [
  { label: 'UX/UI',           group: 'design',     country: 'Scotland', color: 'var(--map-country-scotland)' },
  { label: 'Unreal Engine',   group: 'dev',        country: 'Vietnam',  color: 'var(--map-country-vietnam)'  },
  { label: '3D Artists',      group: 'studio',     country: 'Vietnam',  color: 'var(--map-country-vietnam)'  },
  { label: 'Project Manager', group: 'management', country: 'England',  color: 'var(--map-country-england)'  },
  { label: 'Product Manager', group: 'management', country: 'UAE',      color: 'var(--map-country-uae)'      },
];

const DT_LEGEND_GROUPS = [
  { heading: 'Design',      group: 'design' },
  { heading: 'Engineering', group: 'dev' },
  { heading: 'Studio',      group: 'studio' },
  { heading: 'Management',  group: 'management' },
];

const DT_LEGEND_T = {
  en: {
    headings:       { design: 'Design', dev: 'Engineering', studio: 'Studio', management: 'Management' },
    labels:         { 'UX/UI': 'UX/UI Designer', 'Unreal Engine': 'Unreal Engineer', '3D Artists': '3D Artists', 'Project Manager': 'Project Manager', 'Product Manager': 'Product Manager' },
    viewLegend:     'View legend',
    hideLegend:     'Hide legend',
    mapCaption:     'Slide or hover over the map to explore time zones.',
    groupAriaLabel: 'Team members by location',
    mapAriaLabel:   'World map showing team locations. Use left and right arrow keys to explore time zones.',
  },
  fr: {
    headings:       { design: 'Design', dev: 'Ingénierie', studio: 'Studio', management: 'Management' },
    labels:         { 'UX/UI': 'UX/UI Designer', 'Unreal Engine': 'Ingénieur Unreal', '3D Artists': 'Artistes 3D', 'Project Manager': 'Chef de projet', 'Product Manager': 'Product Manager' },
    viewLegend:     'Voir la légende',
    hideLegend:     'Masquer la légende',
    mapCaption:     'Survolez la carte pour explorer les fuseaux horaires.',
    groupAriaLabel: "Membres de l'équipe par localisation",
    mapAriaLabel:   "Carte du monde montrant les localisations de l'équipe. Utilisez les flèches gauche et droite pour explorer les fuseaux horaires.",
  },
};
const microLabel = 'text-label-s font-semibold leading-[1.4] uppercase tracking-wider text-fg-secondary';

function Tile({ children, bgClass = 'bg-bg-surface', className = '' }) {
  return (
    <div
      data-squircle
      className={`pt-p-5 sm:pt-p-10 lg:pt-p-12 px-6 sm:px-12 lg:px-[60px] pb-6 sm:pb-12 lg:pb-[60px] rounded-radius-6 sm:rounded-radius-8 lg:rounded-radius-12 ${bgClass} ${className}`}
    >
      {children}
    </div>
  );
}

function TileEyebrow({ children, id }) {
  return (
    <h3 id={id} className="text-h3 font-semibold text-fg-primary mb-3 scroll-mt-28">
      {children}
    </h3>
  );
}

function TileBody({ children }) {
  return <div className={`space-y-6 ${tileBodyText}`}>{children}</div>;
}

// Dot-bullet list — used by every "Needed to / Design decisions / Solution"
// group on the page.
function BulletList({ items, className = '', bullet = true }) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((it, i) => (
        <li key={i} className={`flex gap-2.5 ${tileBodyText}`}>
          {bullet && <span aria-hidden="true" className="mt-[0.85em] h-1 w-1 shrink-0 rounded-full bg-fg-muted" />}
          <span>{richText(it)}</span>
        </li>
      ))}
    </ul>
  );
}

// Substitutes `{{X}}` markers in copy with a small inline
// `digital-twin/callout-X.svg` icon (X = a single letter, e.g. `{{A}}`) —
// used to reference specific UI controls mid-sentence. `callout-` groups the
// letter icons together in the assets folder instead of scattering them
// among unrelated files that happen to start with the same letter.
// `hiddenOnMobile` lists which letters are desktop/tablet-only (hidden below
// sm) for this particular slide; defaults to `A`, the historical convention
// for keyboard/pointer-only callouts.
// JSON can't carry functions, so carousel-position copy ("Phase {n} of
// {total}") arrives as a template string and gets filled in here.
function formatCardOf(template, n, total) {
  return template.replace('{n}', n).replace('{total}', total);
}

// Server-fetched content is plain-text-only (JSON can't carry JSX), using a
// tiny markup convention: **bold** and literal \n line breaks. This parses
// that markup AND substitutes `{{X}}` inline-icon markers in one pass, so
// every text field coming from the gated API — from a single sentence to a
// walkthrough paragraph — can be rendered the same way. Non-string input
// (nothing should produce this anymore, but kept defensive) passes through
// unchanged.
function richText(text, token, hiddenOnMobile = ['A']) {
  if (typeof text !== 'string') return text;
  return text.split(/\{\{([A-Za-z])\}\}/g).flatMap((part, i) => {
    if (i % 2 === 1) {
      // A wrapping span carries the mobile-responsive visibility (single
      // dimension, no ambiguity); each inner image carries only the
      // light/dark toggle — keeping the two independent avoids two classes
      // both setting `display` at equal specificity on the same element.
      const respClass = hiddenOnMobile.includes(part) ? 'hidden sm:inline-block' : 'inline-block';
      const imgClass = 'h-[1em] w-auto align-text-bottom';
      return [
        <span key={`icon-${i}`} className={`${respClass} ml-1.5 mr-0.5`}>
          <img
            src={assetUrl(`digital-twin/callout-${part}.svg`, token)}
            alt=""
            className={`${imgClass} dark:hidden`}
            draggable="false"
          />
          <img
            src={assetUrl(`digital-twin/callout-${part}-dark.svg`, token)}
            alt=""
            className={`${imgClass} hidden dark:inline-block`}
            draggable="false"
          />
        </span>,
      ];
    }
    return part.split('\n').flatMap((line, li, arr) => {
      const bolded = line.split('**').map((seg, si) =>
        si % 2 === 1
          ? <strong key={`b-${i}-${li}-${si}`} className="font-semibold text-fg-primary">{seg}</strong>
          : seg
      );
      return li < arr.length - 1 ? [...bolded, <br key={`br-${i}-${li}`} />] : bolded;
    });
  });
}

// Micro-label over optional body text + optional bullets — the Problem /
// Solution / Outcome unit, also reused for Goal and the UI-system block.
function LabeledBlock({ label, text, items, className = '', labelClass = microLabel, itemsClass = 'mt-3', itemsBullet = true }) {
  return (
    <div className={className}>
      {label && <p className={labelClass}>{label}</p>}
      {text && (Array.isArray(text)
        ? text.map((t, i) => <p key={i} className={`${tileBodyText} ${i === 0 ? 'mt-1.5' : 'mt-3'}`}>{richText(t)}</p>)
        : <p className={`${tileBodyText} mt-1.5`}>{richText(text)}</p>)}
      {items && <BulletList items={items} className={itemsClass} bullet={itemsBullet} />}
    </div>
  );
}

// Surface card with a heading + a labelled bullet list — used for the
// stakeholder-groups carousel.
function MiniCard({ title, label, items, bgClass = 'bg-bg-surface', number }) {
  return (
    <div data-squircle className={`rounded-radius-10 sm:rounded-radius-12 ${bgClass} p-6 sm:p-7 h-full flex flex-col`}>
      <div className="flex items-baseline gap-3">
        {number && <span className="text-h4 font-semibold text-fg-muted tabular-nums">{number}</span>}
        <h3 className="text-h4 font-semibold text-fg-primary">{title}</h3>
      </div>
      <div className="mt-auto pt-6">
        <div data-squircle className="rounded-radius-4 sm:rounded-radius-5 border border-black/[0.08] dark:border-white/[0.10] p-5">
          <LabeledBlock label={label} items={items} labelClass={`${microLabel} !text-palette-indigo-fg`} itemsClass="mt-3" />
        </div>
      </div>
    </div>
  );
}

// MenuDiagram — protected information-architecture SVG for the primary menu.
// Picks the one source file that matches the viewer's screen (desktop vs mobile
// layout) and the active theme; language comes from the page. The eight files
// are named `menu-diagram.<lang>.<device>.<theme>.svg` in private Blob, so only
// the matching one is ever fetched. Defaults to desktop until the media query
// resolves.
function MenuDiagram({ lang, token, label, alt, className = '' }) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  const device = isMobile ? 'mobile' : 'desktop';
  // Render both theme variants and switch with CSS so toggling dark mode is
  // instant (no re-fetch) — both are cached after the first load.
  const imgClass = 'block w-full h-auto rounded-radius-4 sm:rounded-radius-6 lg:max-w-none lg:w-[calc(100%_+_6rem)] lg:-mx-12';
  return (
    <figure className={className}>
      {label && <figcaption className={`${microLabel} mb-3`}>{label}</figcaption>}
      <img
        src={assetUrl(`digital-twin/menu-diagram.${lang}.${device}.light.svg`, token)}
        alt={alt}
        className={`${imgClass} dark:hidden`}
        draggable="false"
      />
      <img
        src={assetUrl(`digital-twin/menu-diagram.${lang}.${device}.dark.svg`, token)}
        alt=""
        aria-hidden="true"
        className={`${imgClass} hidden dark:block`}
        draggable="false"
      />
    </figure>
  );
}

// ChallengeGraph — protected diagram illustrating a challenge's solution.
// Picks the device variant (desktop vs mobile) and swaps light/dark via CSS,
// mirroring MenuDiagram's asset-naming convention: `<name>.<lang>.<device>.<theme>.svg`.
function ChallengeGraph({ lang, token, name, alt, className = '' }) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  const device = isMobile ? 'mobile' : 'desktop';
  const imgClass = `block w-full h-auto rounded-radius-4 ${className}`;
  return (
    <>
      <img
        src={assetUrl(`digital-twin/${name}.${lang}.${device}.light.svg`, token)}
        alt={alt}
        className={`${imgClass} dark:hidden`}
        draggable="false"
      />
      <img
        src={assetUrl(`digital-twin/${name}.${lang}.${device}.dark.svg`, token)}
        alt=""
        aria-hidden="true"
        className={`${imgClass} hidden dark:block`}
        draggable="false"
      />
    </>
  );
}

// ToolIcon — square (or circle) tool button with a hover/focus tooltip,
// mirroring the Enablers grids on the other case studies. `darkInvert`
// flips SVGs that aren't dark-mode safe; `zoom` scales a too-small logo;
// `contain` constrains an oversized one.
function ToolIcon({ name, icon, darkInvert = false, circle = false, contain = false, zoom }) {
  const [active, setActive] = useState(false);
  const tooltipId = `dt-tip-${name.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className="relative flex flex-col items-center">
      <div
        id={tooltipId}
        role="tooltip"
        className={`absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10 motion-safe:transition-opacity motion-safe:duration-150 ${active ? 'opacity-100' : 'opacity-0'}`}
      >
        <div data-squircle className="bg-tooltip-bg text-fg-primary-inverse text-tooltip font-light leading-[1.2] px-2 py-[4px] rounded-radius-2 whitespace-nowrap ring-1 ring-tooltip-ring">{name}</div>
      </div>
      <button
        aria-label={name}
        aria-describedby={active ? tooltipId : undefined}
        onMouseEnter={() => { if (!window.matchMedia('(pointer: coarse)').matches) setActive(true); }}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onClick={() => setActive(a => !a)}
        className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0 overflow-hidden bg-btn-nav-bg-rest shadow-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f1f1f] dark:focus-visible:outline-[#fafafa] ${circle ? 'rounded-full' : 'rounded-radius-3'}`}
      >
        {icon
          ? <img src={icon} alt="" className={`${contain ? `${contain} object-contain` : 'w-full h-full object-cover'}${darkInvert ? ' dark:invert' : ''}`} style={zoom ? { transform: `scale(${zoom})` } : undefined} />
          : null
        }
      </button>
    </div>
  );
}

// ToolsSection — the "Enablers" card: a bordered squircle surface holding
// tool buttons grouped under per-category headings, matching the other
// case studies. The surface is a layer behind the content so the icon
// tooltips (above the top row) aren't clipped by the squircle clip-path.
function ToolsSection({ label, categories }) {
  return (
    <div className="relative sm:w-fit">
      <div data-squircle aria-hidden="true" className="absolute inset-0 rounded-radius-6 bg-bg-page border border-feedback-neutral-border pointer-events-none" />
      <div className="relative flex flex-col gap-4 px-5 py-4">
        <h2 className="text-label-s font-semibold leading-[1.4] uppercase tracking-wider text-fg-secondary">{label}</h2>
        <div className="flex flex-wrap items-start gap-x-12 gap-y-6">
          {categories.map(cat => (
            <div key={cat.label} className="flex flex-col gap-3">
              <p className="text-overline-s font-medium leading-[1.4] uppercase tracking-wider text-fg-muted">{cat.label}</p>
              <div className="flex flex-wrap gap-5">
                {cat.tools.map(tool => (
                  <ToolIcon key={tool.name} {...tool} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// CarouselNav — the shared control row used by the carousel: a windowed dots
// indicator (up to `maxDots` visible, default 5) + prev/next chevron buttons
// with edge disabled states. `onSelect(index)` drives both the dots and the
// chevrons (the chevrons pass a clamped neighbour index).
// SpatialProto — the two Spatial-transformations prototypes in a simple in-place
// scroll-snap carousel: slide 1 = the transform gizmo, slide 2 = the axis
// indicator. Keeps the section's existing width (not full-bleed).
function SpatialProto({ token, copy }) {
  const trackRef = useRef(null);
  const axisRef = useRef(null);
  const gizmoRef = useRef(null);
  const scrollTimer = useRef(null);
  const [idx, setIdx] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [axisActive, setAxisActive] = useState(false);
  const [gizmoActive, setGizmoActive] = useState(false);
  const resolve = (name) => assetUrl(`digital-twin/${name}`, token);

  const go = (i) => {
    const track = trackRef.current;
    const card = track?.children[i];
    if (card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    setIdx(i);
  };
  // Commit the index only once scrolling settles, so the caption swaps after the
  // slide lands rather than flickering at the swipe's midpoint.
  const onScroll = () => {
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      const track = trackRef.current;
      if (track) setIdx(Math.max(0, Math.min(1, Math.round(track.scrollLeft / track.clientWidth))));
    }, 90);
  };

  const backdrop = 'relative h-full rounded-radius-4 sm:rounded-radius-6 overflow-hidden bg-gradient-to-b from-[#8ea3bc] via-[#a7b1c0] to-[#bdc2cb] dark:from-[#39496a] dark:via-[#946a82] dark:to-[#e2a173] min-h-[340px] flex items-center justify-center p-6';

  const slide = copy.slides[idx] || copy.slides[0];
  const seen = () => setInteracted(true);
  const hint = copy.protoHint && !interacted ? (
    <p className="absolute inset-x-0 bottom-4 px-4 text-center text-fine-print leading-normal text-black/55 dark:text-white/75 pointer-events-none">{copy.protoHint}</p>
  ) : null;
  const resetButton = (show, onReset) => show ? (
    <button
      type="button"
      onClick={onReset}
      className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-full text-fine-print font-medium text-black/70 dark:text-white/85 bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/65 dark:hover:bg-white/20 transition-colors cursor-pointer"
    >
      {copy.resetLabel}
    </button>
  ) : null;

  return (
    <div>
      {/* Caption swaps with the active slide. */}
      <figcaption className="mb-5 sm:mb-6">
        <span className={`block ${microLabel}`}>{slide.label}</span>
        <span className="block mt-1.5 text-copy-m leading-snug text-fg-muted">{slide.sub}</span>
      </figcaption>
      {/* Rounded + overflow-hidden backstop around the scroll track: the
          slides' own squircle clip-path can lag/glitch mid-scroll under fast
          repaint, so a plain CSS border-radius clip on the viewport (cheap,
          reliably composited at any scroll velocity) keeps the corners
          looking rounded throughout the slide transition, not just at rest. */}
      <div className="rounded-radius-4 sm:rounded-radius-6 overflow-hidden">
      <ul ref={trackRef} onScroll={onScroll} className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <li className="shrink-0 w-full snap-center list-none">
          <div data-squircle className={backdrop}>
            <DigitalTwinGizmo ref={gizmoRef} idleSrc={resolve('gizmo-idle.svg')} resolve={resolve} alt={copy.protoAlt} onInteract={seen} onActiveChange={setGizmoActive} />
            {resetButton(gizmoActive, () => gizmoRef.current?.reset())}
            {hint}
          </div>
        </li>
        <li className="shrink-0 w-full snap-center list-none">
          <div data-squircle className={backdrop}>
            <AxisIndicator ref={axisRef} idleSrc={resolve('axis-indicator-idle.svg')} resolve={resolve} alt={copy.axisAlt} onInteract={seen} onActiveChange={setAxisActive} />
            {resetButton(axisActive, () => axisRef.current?.reset())}
            {hint}
          </div>
        </li>
      </ul>
      </div>
      <CarouselNav count={2} activeIndex={idx} copy={copy} onSelect={go} maxDots={2} className="mt-5 sm:mt-6" />
    </div>
  );
}

function CarouselNav({ count, activeIndex, copy, onSelect, maxDots = 5, className = '' }) {
  return (
    <div className={`grid grid-cols-[1fr_auto_1fr] items-center ${className}`}>
      <div />
      <div className="flex items-center">
        {Array.from({ length: count }).map((_, i) => {
          const win = Math.min(maxDots, count);
          // Keep the active dot centred in the window (offset = half the
          // window), then clamp so the window never runs past either end.
          const start = Math.min(Math.max(0, activeIndex - Math.floor((win - 1) / 2)), count - win);
          const inWindow = i >= start && i < start + win;
          const isEdge = inWindow && ((i === start && start > 0) || (i === start + win - 1 && start + win < count));
          return (
            <button
              key={i}
              tabIndex={inWindow ? 0 : -1}
              onClick={() => onSelect(i)}
              aria-label={formatCardOf(copy.cardOf, i + 1, count)}
              aria-current={i === activeIndex ? 'true' : undefined}
              className={`group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg-primary rounded-full motion-safe:transition-all motion-safe:duration-200 ${inWindow ? 'p-2' : 'w-0 overflow-hidden p-0'}`}
            >
              <span className={`block rounded-full motion-safe:transition-all motion-safe:duration-200 ${i === activeIndex ? 'w-4 h-2 bg-fg-dot-active' : isEdge ? 'w-1.5 h-1.5 bg-fg-dot-edge' : 'w-2 h-2 bg-fg-dot-rest group-hover:bg-fg-dot-hover'}`} />
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 justify-self-end">
        <button
          onClick={() => onSelect(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
          data-spring
          aria-label={copy.navPrev}
          className="group p-2 sm:p-2.5 lg:p-3 rounded-full bg-btn-nav-bg-rest-subtle enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
        >
          <img src={imgChevronLeft} alt="" width={20} height={20} className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px] brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter]" />
        </button>
        <button
          onClick={() => onSelect(Math.min(count - 1, activeIndex + 1))}
          disabled={activeIndex === count - 1}
          data-spring
          aria-label={copy.navNext}
          className="group p-2 sm:p-2.5 lg:p-3 rounded-full bg-btn-nav-bg-rest-subtle enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
        >
          <img src={imgChevronRight} alt="" width={20} height={20} className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px] group-enabled:group-hover:brightness-0 group-enabled:group-hover:invert dark:brightness-0 dark:invert dark:group-enabled:group-hover:brightness-100 dark:group-enabled:group-hover:invert-0 transition-[filter]" />
        </button>
      </div>
    </div>
  );
}

// CardCarousel — generic horizontal card carousel (scroll-snap, keyboard
// arrows, windowed dots, prev/next, full aria), mirroring the Canap case
// study. `renderItem(item, i)` draws each `<li>` card; `itemName(item)`
// (optional) feeds the live-region announcement. `caption(item, i)`
// (optional) renders a single line below the track that updates to the
// active card and shifts to stay aligned under it — like the dated cards
// on the resume page.
function CardCarousel({ items, copy, renderItem, itemName, maxDots, caption, label }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardW, setCardW] = useState(0);
  const isProgrammaticRef = useRef(false);
  const scrollTimerRef = useRef(null);

  const getCarouselPl = () => {
    if (typeof window === 'undefined') return '1.5rem';
    const vw = window.innerWidth;
    // Start the first card at the content column's left edge — tracking the
    // Section's `md:max-w-2xl lg:max-w-[52rem]` + `px-6/8/10` column.
    if (window.matchMedia('(min-width: 1024px)').matches)
      return `${Math.max(24, (vw - 832) / 2 + 40)}px`;   // 52rem + px-10
    if (window.matchMedia('(min-width: 768px)').matches)
      return `${Math.max(24, (vw - 672) / 2 + 32)}px`;   // 42rem + px-8
    if (window.matchMedia('(min-width: 640px)').matches)
      return '2rem';                                      // px-8 (column full-width)
    return '1.5rem';                                      // px-6
  };
  const [carouselPl, setCarouselPl] = useState(getCarouselPl);

  useEffect(() => {
    const update = () => {
      setCarouselPl(getCarouselPl());
      const card = trackRef.current?.children[0];
      if (card) setCardW(card.offsetWidth);
    };
    update();
    window.addEventListener('resize', update, { passive: true });
    const mqSm = window.matchMedia('(min-width: 640px)');
    const mqLg = window.matchMedia('(min-width: 1024px)');
    mqSm.addEventListener('change', update);
    mqLg.addEventListener('change', update);
    return () => {
      window.removeEventListener('resize', update);
      mqSm.removeEventListener('change', update);
      mqLg.removeEventListener('change', update);
    };
  }, []);

  // Offset to keep the caption centred under the active card. Middle cards
  // sit at viewport centre (0); the first/last card is clamped to the column
  // edge, so the caption shifts by the card's offset from centre. Mirrors the
  // resume page's date alignment.
  const getCaptionShift = () => {
    if (typeof window === 'undefined' || !cardW) return 0;
    // Below sm the cards are ~full-width and already sit near centre, so keep
    // every caption centred; the edge offset only matters for the fixed-width
    // cards at sm+.
    if (!window.matchMedia('(min-width: 640px)').matches) return 0;
    const n = items.length;
    if (activeIndex !== 0 && activeIndex !== n - 1) return 0;
    const vw = window.innerWidth;
    const pl = parseFloat(carouselPl) || 0;
    return activeIndex === 0 ? pl + cardW / 2 - vw / 2 : vw / 2 - pl - cardW / 2;
  };

  // Horizontal scrolling + snapping is left entirely to the browser (native
  // overflow-x scroll + CSS scroll-snap on the track). Nav buttons/dots drive
  // `scrollToCard`.
  const scrollToCard = (index) => {
    const track = trackRef.current;
    if (!track) return;
    if (track.children[0]) setCardW(track.children[0].offsetWidth);
    const card = track.children[index];
    if (card) {
      const cardLeft = card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
      const scrollLeft = Math.max(0, cardLeft - (track.clientWidth - card.offsetWidth) / 2);
      track.scrollTo({ left: scrollLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
    setActiveIndex(index);
    isProgrammaticRef.current = true;
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => { isProgrammaticRef.current = false; }, 400);
  };

  const handleScroll = () => {
    if (isProgrammaticRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    if (track.children[0]) setCardW(track.children[0].offsetWidth);
    const children = Array.from(track.children);
    const containerRect = track.getBoundingClientRect();
    const viewportCenter = track.scrollLeft + track.clientWidth / 2;
    let closest = 0, minDist = Infinity;
    children.forEach((item, i) => {
      const itemLeft = item.getBoundingClientRect().left - containerRect.left + track.scrollLeft;
      const dist = Math.abs(itemLeft + item.offsetWidth / 2 - viewportCenter);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label || copy.carouselLabel}>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {formatCardOf(copy.cardOf, activeIndex + 1, items.length)}{itemName ? `: ${itemName(items[activeIndex])}` : ''}
      </div>
      <ul
        ref={trackRef}
        role="list"
        aria-label={label || copy.carouselLabel}
        onScroll={handleScroll}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollToCard(Math.max(0, activeIndex - 1)); }
          if (e.key === 'ArrowRight') { e.preventDefault(); scrollToCard(Math.min(items.length - 1, activeIndex + 1)); }
        }}
        className="relative flex gap-6 sm:gap-8 lg:gap-10 overflow-x-auto snap-x snap-mandatory pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus"
        style={{ scrollbarWidth: 'none', paddingLeft: carouselPl, paddingRight: carouselPl, touchAction: 'pan-x pan-y' }}
      >
        {items.map((item, i) => renderItem(item, i))}
      </ul>

      {caption && (
        <p
          className="mt-3 sm:mt-4 text-label-s leading-[1.2] font-medium text-fg-muted text-center transition-transform duration-300"
          style={{ transform: `translateX(${getCaptionShift()}px)` }}
        >
          {caption(items[activeIndex], activeIndex)}
        </p>
      )}

      <CarouselNav
        count={items.length}
        activeIndex={activeIndex}
        copy={copy}
        onSelect={scrollToCard}
        maxDots={maxDots}
        className="mt-4 sm:mt-5 lg:mt-6 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto"
      />
    </div>
  );
}

// One UX challenge → numbered tile with Problem / Solution / Outcome.
// Numbered card header shared by every slide of a challenge carousel.
function ChallengeHeader({ index, title, eyebrow }) {
  return (
    <div>
      {eyebrow && <p className={`${microLabel} mb-2`}>{eyebrow}</p>}
      <div className="flex items-baseline gap-4 sm:gap-5">
        <SlideNumber index={index} />
        <h4 className="text-h4 font-semibold text-fg-primary" aria-label={eyebrow ? `${eyebrow} — ${title}` : undefined}>{title}</h4>
      </div>
    </div>
  );
}

// Bare slide number (no title).
function SlideNumber({ index }) {
  return <span className="text-h3 font-semibold text-fg-muted tabular-nums leading-none shrink-0">{String(index + 1).padStart(2, '0')}</span>;
}

// One UX challenge as a full-bleed carousel: slide 0 is the Problem, slide 1
// is the Solution / Outcome; the rest are the solution walkthrough (one per
// `walkthrough` entry — real title + description, with the supporting image
// still a placeholder until the protected assets are uploaded).
function ChallengeCarousel({ index, item, labels, copy, token, lang, minHeight }) {
  const slides = [{ kind: 'problem' }, { kind: 'solution' }, ...(item.walkthrough || []).map((w) => ({ kind: 'detail', ...w }))];
  return (
    <div id={`challenge-${index + 1}`} className="scroll-mt-28">
      {/* Screen-reader-only group heading — each card's own h4 (Problem,
          Solution, walkthrough step) already covers sighted navigation via
          the visible eyebrow repeated per-card; this gives AT users a single
          h3 per challenge (Scene tools / Understanding structures /
          Wayfinding system) to group those h4s under. */}
      <h3 className="sr-only">{item.title}</h3>
      <div className="mx-[calc(50%-50vw)]">
        <CardCarousel
          items={slides}
          copy={copy}
          label={`${copy.carouselLabel} — ${item.title}`}
          maxDots={slides.length}
          renderItem={(s, i) => (
          <li key={i} className="shrink-0 w-[82vw] sm:w-[560px] lg:w-[640px] snap-center list-none">
            <div data-squircle style={minHeight ? { minHeight } : undefined} className="h-full flex flex-col p-6 sm:p-8 lg:p-10 rounded-radius-6 sm:rounded-radius-8 lg:rounded-radius-12 bg-bg-page">
              {s.kind === 'problem' ? (
                <>
                  <ChallengeHeader index={i} title={labels.problem} eyebrow={item.title} />
                  <div className="mt-auto space-y-6">
                    {Array.isArray(item.problem) && item.problem.length > 1 ? (
                      <div>
                        <p className={tileBodyText}>{richText(item.problem[0])}</p>
                        {item.problemImagePair ? (
                          <div className="flex items-center gap-3 sm:gap-4 mt-6 sm:mt-7">
                            {[item.problemImagePair.left, item.problemImagePair.right].map((img, imgIdx) => (
                              <Fragment key={imgIdx}>
                                {imgIdx === 1 && (
                                  <img
                                    src={assetUrl(`digital-twin/${item.problemImagePair.arrow}`, token)}
                                    alt=""
                                    aria-hidden="true"
                                    className="w-5 sm:w-6 h-auto shrink-0"
                                    draggable="false"
                                  />
                                )}
                                <figure className="flex-1 min-w-0 flex flex-col gap-2">
                                  <div data-squircle className="rounded-radius-4 overflow-hidden bg-bg-surface border border-feedback-neutral-border">
                                    {img.srcMobile ? (
                                      <picture>
                                        <source media="(min-width: 640px)" srcSet={assetUrl(`digital-twin/${img.src}`, token)} />
                                        <img src={assetUrl(`digital-twin/${img.srcMobile}`, token)} alt={img.alt || ''} className="w-full h-auto object-cover" draggable="false" />
                                      </picture>
                                    ) : (
                                      <img src={assetUrl(`digital-twin/${img.src}`, token)} alt={img.alt || ''} className="w-full h-auto object-cover" draggable="false" />
                                    )}
                                  </div>
                                  {img.caption && (
                                    <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{img.caption}</figcaption>
                                  )}
                                </figure>
                              </Fragment>
                            ))}
                          </div>
                        ) : (
                          <figure className="flex flex-col gap-2 mt-6 sm:mt-7">
                            {item.problemImageMobile ? (
                              <picture>
                                <source media="(min-width: 640px)" srcSet={assetUrl(`digital-twin/${item.problemImage}`, token)} />
                                <img
                                  src={assetUrl(`digital-twin/${item.problemImageMobile}`, token)}
                                  alt={item.problemImageAlt || ''}
                                  className="w-4/5 mx-auto h-auto object-cover"
                                  draggable="false"
                                />
                              </picture>
                            ) : (
                              <img
                                src={assetUrl(`digital-twin/${item.problemImage}`, token)}
                                alt={item.problemImageAlt || ''}
                                className="w-4/5 mx-auto h-auto object-cover"
                                draggable="false"
                              />
                            )}
                            {item.problemImageCaption && (
                              <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{item.problemImageCaption}</figcaption>
                            )}
                          </figure>
                        )}
                        {item.problem.slice(1).map((t, tIdx) => (
                          <p key={tIdx} className={`${tileBodyText} mt-6 sm:mt-7`}>{richText(t)}</p>
                        ))}
                      </div>
                    ) : (
                      <>
                        <LabeledBlock text={item.problem} />
                        {item.problemImage && (
                          <figure className="flex flex-col gap-2">
                            <div data-squircle className="rounded-radius-4 overflow-hidden bg-bg-surface border border-feedback-neutral-border">
                              {item.problemImageMobile ? (
                                <picture>
                                  <source media="(min-width: 640px)" srcSet={assetUrl(`digital-twin/${item.problemImage}`, token)} />
                                  <img
                                    src={assetUrl(`digital-twin/${item.problemImageMobile}`, token)}
                                    alt={item.problemImageAlt || ''}
                                    className="w-full h-auto object-cover"
                                    draggable="false"
                                  />
                                </picture>
                              ) : (
                                <img
                                  src={assetUrl(`digital-twin/${item.problemImage}`, token)}
                                  alt={item.problemImageAlt || ''}
                                  className="w-full h-auto object-cover"
                                  draggable="false"
                                />
                              )}
                            </div>
                            <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{item.problemImageCaption}</figcaption>
                          </figure>
                        )}
                      </>
                    )}
                  </div>
                </>
              ) : s.kind === 'solution' ? (
                <>
                  <ChallengeHeader index={i} title={labels.solution} eyebrow={item.title} />
                  <div className="mt-auto space-y-6">
                    {(() => {
                      const sketch = item.solutionSketch && (
                        <figure className="flex flex-col gap-2 sm:max-w-[360px] sm:mx-auto">
                          <div data-squircle className="rounded-radius-4 overflow-hidden bg-bg-surface border border-feedback-neutral-border">
                            <img
                              src={assetUrl(`digital-twin/${item.solutionSketch}`, token)}
                              alt={item.solutionSketchAlt || ''}
                              className="w-full h-auto object-cover"
                              draggable="false"
                            />
                          </div>
                          <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{item.solutionSketchCaption}</figcaption>
                        </figure>
                      );
                      if (sketch && Array.isArray(item.solution) && item.solution.length > 1) {
                        const [firstPara, ...restParas] = item.solution;
                        return (
                          <>
                            <p className={`${tileBodyText} mt-1.5`}>{richText(firstPara)}</p>
                            {sketch}
                            <LabeledBlock text={restParas} items={item.solutionItems} itemsBullet={false} />
                          </>
                        );
                      }
                      return (
                        <>
                          {sketch}
                          <LabeledBlock text={item.solution} items={item.solutionItems} itemsBullet={false} />
                        </>
                      );
                    })()}
                    {item.solutionImage && (
                      <figure className="flex flex-col gap-2 mt-6 sm:mt-7">
                        <div data-squircle className="rounded-radius-4 overflow-hidden bg-bg-surface border border-feedback-neutral-border">
                          {item.solutionImageMobile ? (
                            <picture>
                              <source media="(min-width: 640px)" srcSet={assetUrl(`digital-twin/${item.solutionImage}`, token)} />
                              <img
                                src={assetUrl(`digital-twin/${item.solutionImageMobile}`, token)}
                                alt={item.solutionImageAlt || ''}
                                className="w-full h-auto object-cover"
                                draggable="false"
                              />
                            </picture>
                          ) : (
                            <img
                              src={assetUrl(`digital-twin/${item.solutionImage}`, token)}
                              alt={item.solutionImageAlt || ''}
                              className="w-full h-auto object-cover"
                              draggable="false"
                            />
                          )}
                        </div>
                        <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{item.solutionImageCaption}</figcaption>
                      </figure>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <ChallengeHeader index={i} title={s.title} eyebrow={item.title} />
                  <div className="mt-6 flex-1 flex flex-col gap-4 justify-end">
                    {s.graph && (
                      <figure className="flex flex-col gap-2">
                        <ChallengeGraph lang={lang} token={token} name={s.graph} alt={s.graphAlt || ''} />
                        {s.graphCaption && (
                          <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{s.graphCaption}</figcaption>
                        )}
                      </figure>
                    )}
                    {s.graph && (
                      <div className="mt-3 sm:mt-4">
                        {Array.isArray(s.body)
                          ? s.body.map((t, tIdx) => (
                              <p key={tIdx} className={`${tileBodyText} ${tIdx > 0 ? 'mt-3' : ''}`}>{richText(t, token, s.iconsHiddenOnMobile)}</p>
                            ))
                          : <p className={tileBodyText}>{richText(s.body, token, s.iconsHiddenOnMobile)}</p>}
                        {s.bodyItems && <BulletList items={s.bodyItems.map((it) => richText(it, token, s.iconsHiddenOnMobile))} className="mt-1" />}
                        {s.bodyTrail && <p className={`${tileBodyText} mt-3`}>{richText(s.bodyTrail, token, s.iconsHiddenOnMobile)}</p>}
                      </div>
                    )}
                    {s.bodyLead && (
                      <p className={tileBodyText}>{richText(s.bodyLead, token, s.iconsHiddenOnMobile)}</p>
                    )}
                    {!s.graph && s.imageAfterBody && (
                      <>
                        {Array.isArray(s.body)
                          ? s.body.map((t, tIdx) => (
                              <p key={tIdx} className={`${tileBodyText} ${tIdx > 0 ? 'mt-3' : ''}`}>{richText(t, token, s.iconsHiddenOnMobile)}</p>
                            ))
                          : <p className={tileBodyText}>{richText(s.body, token, s.iconsHiddenOnMobile)}</p>}
                        {s.bodyItems && <BulletList items={s.bodyItems.map((it) => richText(it, token, s.iconsHiddenOnMobile))} className="mt-1" />}
                        {s.bodyTrail && <p className={`${tileBodyText} mt-3`}>{richText(s.bodyTrail, token, s.iconsHiddenOnMobile)}</p>}
                      </>
                    )}
                    <figure className={`flex flex-col gap-2 ${s.graph ? 'mt-3 sm:mt-4' : ''}`}>
                      <div data-squircle className="rounded-radius-4 overflow-hidden bg-bg-surface border border-feedback-neutral-border">
                        <picture>
                          <source media="(min-width: 640px)" srcSet={assetUrl(`digital-twin/${s.imageDesktop}`, token)} />
                          <img
                            src={assetUrl(`digital-twin/${s.imageMobile}`, token)}
                            alt={s.imageAlt || ''}
                            className="w-full h-auto object-cover"
                            draggable="false"
                          />
                        </picture>
                      </div>
                      {s.imageCaption && (
                        <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{s.imageCaption}</figcaption>
                      )}
                    </figure>
                    {!s.graph && !s.imageAfterBody && (
                      <>
                        {Array.isArray(s.body)
                          ? s.body.map((t, tIdx) => (
                              <p key={tIdx} className={`${tileBodyText} ${tIdx > 0 ? 'mt-3' : ''}`}>{richText(t, token, s.iconsHiddenOnMobile)}</p>
                            ))
                          : <p className={tileBodyText}>{richText(s.body, token, s.iconsHiddenOnMobile)}</p>}
                        {s.bodyItems && <BulletList items={s.bodyItems.map((it) => richText(it, token, s.iconsHiddenOnMobile))} className="mt-1" />}
                        {s.bodyTrail && <p className={`${tileBodyText} mt-3`}>{richText(s.bodyTrail, token, s.iconsHiddenOnMobile)}</p>}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </li>
          )}
        />
      </div>
    </div>
  );
}

// ── Count-up hero stat — ticks from zero over ~1.8s once heroReady flips.
// Honours prefers-reduced-motion. ──
function useCountUp(target, duration = 1800, decimals = 0, ready = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!ready) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target, duration, decimals, ready]);
  return count;
}

function AnimatedStat({ prefix, countTo, decimals, suffix, ready }) {
  const value = useCountUp(countTo, 1800, decimals, ready);
  return <span>{prefix}{decimals > 0 ? value.toFixed(decimals) : value}{suffix}</span>;
}

function Hero({ lang, token, content }) {
  const t = content.hero;
  const facts = content.context.facts;
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setHeroReady(true), 600);
    return () => clearTimeout(id);
  }, []);
  return (
    <>
      {heroReady && <ScrollForMore lang={lang} />}
      <section
        aria-labelledby="hero-heading"
        lang={lang}
        className="relative min-h-screen flex flex-col overflow-hidden bg-[#141414]"
      >
      {/* Protected hero image — served from private Blob only to an unlocked
          token (never bundled). Sits behind the vignette below. */}
      <img
        src={assetUrl('digital-twin/hero.digital-twin-hero.webp', token)}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        draggable="false"
      />
      {/* Dark vignette so the title, pill and stats stay readable over the
          image — heavy at top + bottom (the chrome anchor points). */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/95"
      />

      <div className="relative flex-1 flex flex-col justify-end max-w-5xl mx-auto w-full px-6 sm:px-8 lg:px-10 pb-24 sm:pb-28 lg:pb-32 gap-6 sm:gap-8">
        <span
          className="inline-flex self-start items-center text-tag-m uppercase tracking-widest font-semibold text-fg-on-dark-opacity-90 bg-inverted-subtle backdrop-blur-sm border border-inverted-subtle px-4 py-1.5 rounded-full transition-opacity duration-700"
          style={{ opacity: heroReady ? 1 : 0 }}
        >
          {t.category}
        </span>
        <h1
          id="hero-heading"
          className="text-display-2 font-semibold leading-tight text-white max-w-3xl transition-opacity duration-700"
          style={{ textShadow: '0 2px 24px rgba(0, 0, 0, 0.7)', opacity: heroReady ? 1 : 0 }}
        >
          {t.title}
        </h1>

        {t.stats.length > 0 && (
        <ul role="list" className="flex items-start gap-8 sm:gap-12 lg:gap-16 pt-2 list-none transition-opacity duration-700" style={{ opacity: heroReady ? 1 : 0 }}>
          {t.stats.map((s, i) => {
            const finalValue = s.decimals > 0 ? s.countTo.toFixed(s.decimals) : s.countTo;
            return (
              <li key={i} className="flex flex-col gap-1">
                <span className="text-h3 font-semibold leading-snug text-white tabular-nums whitespace-nowrap">
                  <span className="sr-only">{s.prefix}{finalValue}{s.suffix}</span>
                  <span aria-hidden="true"><AnimatedStat prefix={s.prefix} countTo={s.countTo} decimals={s.decimals} suffix={s.suffix} ready={heroReady} /></span>
                </span>
                <span className="text-label-s font-semibold leading-[1.4] uppercase tracking-wider text-fg-on-dark-opacity-64 max-w-[140px] sm:max-w-none">
                  {s.label}
                </span>
              </li>
            );
          })}
        </ul>
        )}

        {/* Project facts (role / team / duration / platform) — a hero meta row,
            mirroring the stat treatment (value prominent, small uppercase label
            below) used across the other case-study heroes. */}
        {facts.length > 0 && (
          <ul role="list" className="flex flex-wrap items-start gap-x-8 sm:gap-x-12 lg:gap-x-16 gap-y-5 pt-2 list-none transition-opacity duration-700" style={{ opacity: heroReady ? 1 : 0 }}>
            {facts.map((f, i) => (
              <li key={i} className="flex flex-col gap-1">
                <span className="text-h3 font-semibold leading-snug text-white tabular-nums whitespace-nowrap">{f.value}</span>
                <span className="text-label-s font-semibold leading-[1.4] uppercase tracking-wider text-fg-on-dark-opacity-64">{f.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      </section>
    </>
  );
}

// ── Collapsible-section machinery — accordion active ONLY below 920px (where
// the secondary nav is hidden), matching Canap. At ≥920px sections stay
// expanded and the secondary nav drives navigation. ──
function useSectionCollapse() {
  const [open, setOpen] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 920px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 920px)');
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  const btnRef = useRef(null);
  const contentRef = useRef(null);
  const gridRef = useRef(null);
  const handleToggle = () => {
    if (open) {
      if (contentRef.current?.contains(document.activeElement)) btnRef.current?.focus();
      setOpen(false);
      const el = gridRef.current;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setHidden(true);
      } else {
        const onEnd = (e) => {
          if (e.propertyName !== 'grid-template-rows') return;
          el?.removeEventListener('transitionend', onEnd);
          setHidden(true);
        };
        el?.addEventListener('transitionend', onEnd);
      }
    } else {
      setHidden(false);
      requestAnimationFrame(() => setOpen(true));
    }
  };
  const collapsible = !isDesktop;
  return { collapsible, open, sectionOpen: collapsible ? open : true, hidden, handleToggle, btnRef, contentRef, gridRef };
}

const collapseLabel = (open, title, lang) =>
  open ? (lang === 'fr' ? `Réduire ${title}` : `Collapse ${title}`)
       : (lang === 'fr' ? `Développer ${title}` : `Expand ${title}`);

function SectionChevron({ open }) {
  return (
    <div className="group shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-colors hover:bg-btn-nav-bg-hover">
      <img
        src={imgChevronUp}
        alt=""
        className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-[filter,transform] duration-300 forced-colors:brightness-[unset] forced-colors:invert-0 ${open ? '' : 'rotate-180'} brightness-0 dark:invert group-hover:invert dark:group-hover:brightness-0 dark:group-hover:invert-0`}
      />
    </div>
  );
}

function CollapseBody({ id, c, className, children }) {
  const inner = className != null ? <div className={className}>{children}</div> : <>{children}</>;
  if (!c.collapsible) return inner;
  return (
    <div
      ref={c.gridRef}
      id={`${id}-content`}
      style={c.hidden ? { display: 'none' } : undefined}
      className={`grid [overflow-anchor:none] motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-in-out ${c.sectionOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      inert={!c.sectionOpen}
    >
      <div ref={c.contentRef} className="overflow-hidden min-h-0">
        {inner}
      </div>
    </div>
  );
}

function SectionHeading({ c, id, title, lang, titleInset = false }) {
  const titlePad = titleInset ? 'pl-6 sm:pl-12 lg:pl-[60px]' : '';
  const heading = (
    <div className="flex items-center justify-between gap-4">
      <h2 id={`${id}-heading`} className={`text-h2 font-semibold text-fg-primary py-6 sm:py-7 lg:py-8 ${titlePad}`}>
        {title}
      </h2>
      {c.collapsible && <SectionChevron open={c.open} />}
    </div>
  );
  if (!c.collapsible) return heading;
  return (
    <button
      ref={c.btnRef}
      onClick={c.handleToggle}
      aria-label={collapseLabel(c.open, title, lang)}
      aria-expanded={c.open}
      aria-controls={`${id}-content`}
      className="w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fg-primary"
    >
      {heading}
    </button>
  );
}

function Section({ id, title, bgClass = 'bg-bg-page', titleInset = false, lang = 'en', children, collapsedGapClass = '' }) {
  const c = useSectionCollapse();
  const collapsed = c.collapsible && !c.sectionOpen;
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`${collapsed ? 'bg-bg-page' : bgClass}${collapsed ? ` ${collapsedGapClass}` : ''}`}>
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 pt-8 sm:pt-10 lg:pt-12 pb-2 sm:pb-3 md:max-w-2xl lg:max-w-[52rem]">
        <SectionHeading c={c} id={id} title={title} lang={lang} titleInset={titleInset} />
      </div>
      <CollapseBody id={id} c={c} className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 pb-16 sm:pb-20 lg:pb-24 md:max-w-2xl lg:max-w-[52rem]">
        {children}
      </CollapseBody>
    </section>
  );
}

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth' });
  el.focus({ preventScroll: true });
};

// Collapsible floating secondary nav. Hovering the right edge reveals a
// "Minimise" affordance; clicking (or dragging left) collapses it into a
// centre-left pill. Trimmed port of Canap's SecondaryNav — no sub-sections.
function SecondaryNav({ sections, activeId, activeSubId, onNavigate, visible, lang }) {
  const [collapsed, setCollapsed] = useState(false);
  const [tipVisible, setTipVisible] = useState(false);
  const timerRef = useRef(null);
  const showTip = () => { clearTimeout(timerRef.current); timerRef.current = setTimeout(() => setTipVisible(true), 500); };
  const hideTip = () => { clearTimeout(timerRef.current); setTipVisible(false); };
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const dragStartX = useRef(null);
  const onEdgePointerDown = (e) => { dragStartX.current = e.clientX; e.currentTarget.setPointerCapture?.(e.pointerId); };
  const onEdgePointerMove = (e) => {
    if (dragStartX.current == null) return;
    if (e.clientX - dragStartX.current <= -24) { dragStartX.current = null; setCollapsed(true); hideTip(); }
  };
  const onEdgePointerUp = () => { dragStartX.current = null; };

  const minimiseLabel = lang === 'fr' ? 'Réduire' : 'Minimise';
  const expandLabel   = 'Navigation';

  if (collapsed) {
    return (
      <div className={`fixed left-2 top-1/2 -translate-y-1/2 z-10 transition-opacity duration-180 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button
          type="button"
          onClick={() => { setCollapsed(false); hideTip(); }}
          onMouseEnter={showTip}
          onMouseLeave={hideTip}
          onFocus={showTip}
          onBlur={hideTip}
          aria-label={expandLabel}
          className="flex items-center justify-center w-9 h-9 backdrop-blur-3 bg-nav-bg rounded-radius-4 shadow-xs ring-1 ring-nav-ring text-fg-muted hover:text-fg-primary hover:bg-nav-active-bg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 5h16M4 12h12M4 19h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        {tipVisible && (
          <div role="tooltip" className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap rounded-radius-2 px-2 py-1 text-tooltip font-medium bg-nav-active-bg-solid text-fg-inverse shadow-xs pointer-events-none z-20">
            {expandLabel}
          </div>
        )}
      </div>
    );
  }

  return (
    <nav aria-label="Page sections" className={`relative p-2 backdrop-blur-3 bg-nav-bg rounded-radius-6 shadow-xs ring-1 ring-nav-ring transition-opacity duration-180 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <ol className="grid gap-1" style={{ gridTemplateColumns: 'max-content' }}>
        {sections.map((s) => {
          const isActive = activeId === s.id;
          return (
            <li key={s.id}>
              {/* When a section is active AND has sub-items, the active background
                  wraps the main item + its sub-items as one nested group. */}
              <div className={`border ${isActive && s.subsections?.length > 0 ? 'bg-bg-page border-black/[0.08] dark:border-white/[0.10] rounded-radius-4' : 'border-transparent'}`}>
              <button
                onClick={() => onNavigate(s.id)}
                aria-current={isActive ? 'location' : undefined}
                className={`relative text-tooltip leading-snug py-2 px-3 rounded-full text-left w-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus border ${
                  isActive
                    ? `text-fg-primary font-semibold${s.subsections?.length > 0 ? ' border-transparent' : ' bg-bg-page border-black/[0.08] dark:border-white/[0.10]'}`
                    : 'text-fg-muted font-normal border-transparent hover:text-fg-primary hover:bg-nav-active-bg'
                }`}
              >
                <span aria-hidden="true" className="font-semibold invisible block select-none whitespace-nowrap">{s.title}</span>
                <span className="absolute inset-0 py-2 px-3 whitespace-nowrap">{s.title}</span>
              </button>

              {s.subsections?.length > 0 && (
                /* Subsections show only when the parent section is active;
                   collapsed (height 0) otherwise but still rendered so the nav
                   keeps a constant width. */
                <div
                  className={`hidden min-[920px]:block ${isActive ? '' : 'max-h-0 overflow-hidden'}`}
                  inert={isActive ? undefined : true}
                >
                  <ol className="mt-0.5 grid gap-0">
                    {s.subsections.map((sub) => {
                      const isSubActive = activeSubId === sub.id;
                      return (
                        <li key={sub.id}>
                          <button
                            onClick={() => onNavigate(sub.id)}
                            aria-current={isSubActive ? 'location' : undefined}
                            className={`relative text-chip-xs leading-snug py-1.5 pl-4 pr-2 rounded-full text-left w-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                              isSubActive
                                ? 'text-fg-primary font-semibold'
                                : 'text-fg-muted font-normal hover:text-fg-primary hover:bg-nav-active-bg'
                            }`}
                          >
                            <span aria-hidden="true" className="font-semibold invisible block select-none whitespace-nowrap">{sub.title}</span>
                            <span className="absolute inset-0 py-1.5 pl-4 pr-2 whitespace-nowrap">{sub.title}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              )}
              </div>
            </li>
          );
        })}
      </ol>

      <button
        type="button"
        onClick={() => { setCollapsed(true); hideTip(); }}
        onPointerDown={onEdgePointerDown}
        onPointerMove={onEdgePointerMove}
        onPointerUp={onEdgePointerUp}
        onFocus={showTip}
        onBlur={hideTip}
        aria-label={minimiseLabel}
        className="group/edge absolute top-0 -right-[3px] h-full w-[15px] cursor-w-resize select-none rounded-r-radius-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-inset"
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-6 right-[3px] w-[2px] rounded-full bg-fg-muted-inverse dark:bg-fg-muted opacity-0 group-hover/edge:opacity-100 group-focus-visible/edge:opacity-100 transition-opacity"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, #000 35%, #000 65%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 35%, #000 65%, transparent)',
          }}
        />
        <span aria-hidden="true" onMouseEnter={showTip} onMouseLeave={hideTip} className="absolute left-full top-1/2 -translate-y-1/2 pl-[3px] cursor-pointer text-fg-muted opacity-0 group-hover/edge:opacity-100 group-focus-visible/edge:opacity-100 transition-opacity">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {tipVisible && (
        <div role="tooltip" className="absolute left-full top-1/2 -translate-y-1/2 ml-7 whitespace-nowrap rounded-radius-2 px-2 py-1 text-tooltip font-medium bg-nav-active-bg-solid text-fg-inverse shadow-xs pointer-events-none z-20">
          {minimiseLabel}
        </div>
      )}
    </nav>
  );
}

// The case study itself — rendered only once the password gate unlocks, so the
// scroll-spy effects mount with the content present.
function DigitalTwinCaseStudy({ lang = 'en', token, isDark, content }) {
  const t = { ...content, ...LOCAL[lang] };
  const sections = SECTIONS[lang] ?? SECTIONS.en;
  const [activeId, setActiveId] = useState('');
  const [activeSubId, setActiveSubId] = useState('');
  const [scrolledDown, setScrolledDown] = useState(false);
  // Every UX-challenge carousel shares this height: the tallest natural
  // content among them, so every card is the exact same size regardless of
  // which challenge has the most copy. Re-measured from an unconstrained
  // (minHeight: null) pass on mount/resize so it can shrink back down too,
  // not just grow — see the mobile-resize fix this mirrors.
  const [challengeCardHeight, setChallengeCardHeight] = useState(null);
  const [atBottom, setAtBottom] = useState(false);
  const scrollTarget = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let raf1 = null, raf2 = null, debounce = null;
    const measure = () => {
      setChallengeCardHeight(null);
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          const heights = t.design.challenges.map((_, i) => {
            const card = document.querySelector(`#challenge-${i + 1} li.snap-center > [data-squircle]`);
            return card ? card.getBoundingClientRect().height : 0;
          });
          const max = Math.max(0, ...heights);
          if (max) setChallengeCardHeight(max);
        });
      });
    };
    measure();
    // Mobile browsers fire `resize` purely from the address bar showing/hiding
    // while scrolling (viewport height changes, width doesn't) — re-measuring
    // on those makes the cards flicker/reflow mid-scroll, which reads as the
    // scroll position glitching. Only re-measure on an actual width change.
    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      clearTimeout(debounce);
      debounce = setTimeout(measure, 150);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(debounce);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [lang, t.design.challenges]);

  const handleNavigate = (id) => {
    const parentSection = sections.find(s => s.subsections?.some(sub => sub.id === id));
    if (parentSection) {
      setActiveId(parentSection.id);
      setActiveSubId(id);
    } else {
      setActiveId(id);
      setActiveSubId('');
    }
    scrollTarget.current = id;
    setScrolledDown(true);
    scrollToSection(id);
    setTimeout(() => { scrollTarget.current = null; }, 1500);
  };

  useEffect(() => {
    document.title = t.pageTitle;
  }, [lang, t.pageTitle]);

  // Active section via IntersectionObserver — same rootMargin as Canap so the
  // highlight transitions feel identical across case studies.
  useEffect(() => {
    const observers = sections.map((s) => {
      const el = document.getElementById(s.id);
      if (!el) return null;
      // Default the active sub to the section's first one the moment the
      // section is reached, so a sub highlights immediately (the subsection
      // observer then refines it as you scroll). Without this, a section with
      // a single sub deep in a tall block can be scrolled past its thin
      // heading band without ever highlighting.
      const firstSub = s.subsections?.[0]?.id ?? '';
      const obs = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          if (scrollTarget.current) {
            if (s.id === scrollTarget.current) { scrollTarget.current = null; setActiveId(s.id); setActiveSubId(firstSub); }
          } else {
            setActiveId(s.id);
            setActiveSubId(firstSub);
          }
        },
        { rootMargin: '-10% 0px -70% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [lang]);

  // Active subsection — observes the context sub-anchors so the nested nav
  // items highlight as you scroll through them.
  useEffect(() => {
    const allSubs = sections.flatMap((s) => s.subsections ?? []);
    const observers = allSubs.map((sub) => {
      const el = document.getElementById(sub.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          if (scrollTarget.current) {
            if (sub.id === scrollTarget.current) { scrollTarget.current = null; setActiveSubId(sub.id); }
          } else {
            setActiveSubId(sub.id);
          }
        },
        { rootMargin: '-10% 0px -70% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [lang]);

  // Show/hide the nav based on scroll position relative to the first + last
  // sections (appears once past the hero, hides at the last section).
  useEffect(() => {
    const firstId = sections[0].id;
    const lastId = sections[sections.length - 1].id;
    const update = () => {
      const firstEl = document.getElementById(firstId);
      const lastEl = document.getElementById(lastId);
      if (firstEl) setScrolledDown(firstEl.getBoundingClientRect().top < 50);
      if (lastEl) {
        const smt = parseFloat(getComputedStyle(lastEl).scrollMarginTop) || 0;
        setAtBottom(lastEl.getBoundingClientRect().top < smt - 50);
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [lang]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-tooltip-bg focus:text-white focus:rounded-radius-2 focus:text-sm focus:font-semibold"
      >
        {lang === 'fr' ? 'Aller au contenu principal' : 'Skip to main content'}
      </a>

      <Hero lang={lang} token={token} content={content} />

      <main id="main-content">
        {/* Context — overview line, quick facts, and my role. */}
        <Section
          id="context"
          title={t.context.header}
          lang={lang}
          bgClass="bg-bg-surface"
          titleInset
        >
          <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">
            <Tile bgClass="bg-bg-page">
              <TileEyebrow id="ctx-origin">{t.context.originEyebrow}</TileEyebrow>
              <div className="flex flex-col gap-6 max-w-3xl">
                {t.context.intro.map((para, i) => (
                  <Fragment key={i}>
                    <p className={tileBodyText}>{richText(para)}</p>
                    {/* New Murabba visual — sits between the Mukaab paragraph and
                        the "our company" paragraph. Protected asset → token-gated. */}
                    {i === 1 && (
                      <figure className="my-6 sm:my-8 flex flex-col gap-2">
                        <img
                          data-squircle
                          src={assetUrl(`digital-twin/context.new-murabba-masterplan${lang === 'fr' ? '-fr' : ''}.webp`, token)}
                          alt={t.context.murabbaImageAlt}
                          loading="lazy"
                          className="w-full rounded-radius-4 sm:rounded-radius-6"
                        />
                        <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{t.context.murabbaCaption}</figcaption>
                      </figure>
                    )}
                  </Fragment>
                ))}
              </div>
            </Tile>
            <Tile bgClass="bg-bg-page">
              <TileEyebrow id="ctx-team">{t.context.teamEyebrow}</TileEyebrow>
              <TileBody>{t.context.teamBody.map((p, i) => <p key={i}>{richText(p)}</p>)}</TileBody>
              <div className="mt-3 max-w-2xl mx-auto w-full">
                <WorldMapDots
                  isDark={isDark}
                  lang={lang}
                  teamDots={DT_TEAM_DOTS}
                  legendGroups={DT_LEGEND_GROUPS}
                  translations={DT_LEGEND_T}
                  legendBg=""
                />
              </div>
            </Tile>
            <Tile bgClass="bg-bg-page">
              <TileEyebrow id="ctx-role">{t.context.roleEyebrow}</TileEyebrow>
              <TileBody>
                <p>{richText(t.context.roleIntro)}</p>
                <div>
                  <p>{richText(t.context.roleRespLead)}</p>
                  <div className="mt-6 flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-x-8">
                    <div data-squircle className="rounded-radius-4 sm:rounded-radius-5 border border-black/[0.08] dark:border-white/[0.10] p-5">
                      <p className={`${microLabel} mb-3`}>{t.context.roleRespLeft.heading}</p>
                      <BulletList items={t.context.roleRespLeft.items} />
                    </div>
                    <div data-squircle className="rounded-radius-4 sm:rounded-radius-5 border border-black/[0.08] dark:border-white/[0.10] p-5">
                      <p className={`${microLabel} mb-3`}>{t.context.roleRespRight.heading}</p>
                      <BulletList items={t.context.roleRespRight.items} />
                    </div>
                  </div>
                </div>
                {t.context.roleBody.map((p, i) => <p key={i}>{richText(p)}</p>)}
              </TileBody>
            </Tile>
          </div>
        </Section>

        {/* Challenge — the pains, then the HMW design challenge on a dark plate. */}
        <Section id="challenge" title={t.challenge.header} lang={lang} bgClass="bg-bg-page" titleInset>
          <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">
            <Tile bgClass="bg-z-0 dark:bg-bg-page">
              <TileBody><p>{richText(t.challenge.lead)}</p><p className="mt-4">{richText(t.challenge.intro)}</p></TileBody>
              <p className={`${tileBodyText} mt-8 max-w-3xl`}>{richText(t.challenge.painsOutro)}</p>
            </Tile>
            <Tile bgClass="bg-z-1000 dark:bg-bg-subtle">
              <h3 id="ch-problem" className="text-h3 font-semibold text-fg-on-dark-primary mb-3 scroll-mt-28">{t.challenge.hmwLabel}</h3>
              <p className="text-display-2 font-semibold text-fg-on-dark-secondary mt-3">{t.challenge.hmw}</p>
            </Tile>
          </div>
        </Section>

        {/* Users — four stakeholder groups in a full-bleed snap carousel
            (shared CardCarousel: snap, windowed dots, prev/next), mirroring
            the Canap case study. */}
        <Section id="users" title={t.users.header} lang={lang} bgClass="bg-gradient-to-b from-white to-[#f6f6f6] dark:from-[#141414] dark:to-[#1f1f1f]" titleInset>
          <p className={`${tileBodyText} max-w-3xl mb-8 sm:mb-10 pl-6 sm:pl-12 lg:pl-[60px]`}>{t.users.intro}</p>
          {/* Full-bleed: the track breaks out of the reading column so cards
              scroll all the way to the screen edges. */}
          <div className="mx-[calc(50%-50vw)]">
            <CardCarousel
              items={t.users.groups}
              copy={t.users}
              itemName={(g) => g.title}
              renderItem={(g, i) => (
                <li key={i} className="shrink-0 w-[82vw] sm:w-[340px] lg:w-[360px] snap-center list-none">
                  <MiniCard number={String(i + 1).padStart(2, '0')} title={g.title} label={t.users.needsLabel} items={g.needs} bgClass="bg-z-0 dark:bg-bg-page" />
                </li>
              )}
            />
          </div>
        </Section>

        {/* Evolution — three phases from demo to digital twin, in a full-bleed
            snap carousel (shared CardCarousel), like the Users section. */}
        <Section id="evolution" title={t.evolution.header} lang={lang} bgClass="bg-bg-surface" titleInset>
          <p className={`${tileBodyText} max-w-3xl mb-8 sm:mb-10 pl-6 sm:pl-12 lg:pl-[60px]`}>{t.evolution.intro}</p>
          <div className="mx-[calc(50%-50vw)]">
            <CardCarousel
              items={t.evolution.phases}
              copy={t.evolution}
              maxDots={3}
              itemName={(p) => p.title}
              renderItem={(p, i) => (
                <li key={i} className="shrink-0 w-[82vw] sm:w-[420px] lg:w-[460px] snap-center list-none">
                  <div data-squircle className="h-full flex flex-col p-6 sm:p-8 lg:p-10 rounded-radius-6 sm:rounded-radius-8 lg:rounded-radius-12 bg-z-0 dark:bg-bg-page">
                    <div className="flex items-baseline gap-3">
                      <span className="text-h4 font-semibold text-fg-muted tabular-nums">{p.n}</span>
                      <h3 className="text-h4 font-semibold text-fg-primary">{p.title}</h3>
                    </div>
                    <BulletList items={p.items} className="mt-6" />
                    <div className="mt-auto pt-6">
                      <div data-squircle className="rounded-radius-4 sm:rounded-radius-5 border border-black/[0.08] dark:border-white/[0.10] p-5">
                        <LabeledBlock label={t.labels.goal} text={p.goal} labelClass={`${microLabel} !text-palette-indigo-fg`} />
                      </div>
                    </div>
                  </div>
                </li>
              )}
            />
          </div>
        </Section>

        {/* Design — context constraints (trade shows, gamepad), the five UX
            challenges, then the flexible UI system. */}
        <Section id="design" title={t.design.header} lang={lang} bgClass="bg-gradient-to-b from-white via-[#f6f6f6] to-white dark:from-[#141414] dark:via-[#1f1f1f] dark:to-[#141414]" titleInset>
          <p className={`${tileBodyText} max-w-3xl mb-8 sm:mb-10 pl-6 sm:pl-12 lg:pl-[60px]`}>{t.design.intro}</p>
          <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">
            <Tile bgClass="bg-bg-page" className="border border-black/[0.08] dark:border-white/[0.10]">
              <p className={`${microLabel} mb-2`}>{t.design.gamepad.kicker}</p>
              <TileEyebrow id="design-gamepad">
                <span className="sm:hidden">{t.design.gamepad.eyebrowShort || t.design.gamepad.eyebrow}</span>
                <span className="hidden sm:inline">{t.design.gamepad.eyebrow}</span>
              </TileEyebrow>
              <TileBody><p>{richText(t.design.gamepad.intro)}</p></TileBody>
              <ControllerMapping lang={lang} token={token} copy={t.design.gamepad.controller} className="mt-10 sm:mt-12" />
              <div className="mt-10 sm:mt-12">
                <p className={microLabel}>{t.design.gamepad.implicationsLabel}</p>
                <BulletList items={[t.design.gamepad.implications[0]]} className="mt-5 sm:mt-6" />
                <FocusStateCycle token={token} alt={t.design.gamepad.focusState.alt} caption={t.design.gamepad.focusState.caption} layout="mobile" className="mt-6 sm:mt-7 sm:hidden" />
                <FocusStateCycle token={token} alt={t.design.gamepad.focusState.alt} caption={t.design.gamepad.focusState.caption} layout="desktop" className="mt-6 sm:mt-7 hidden sm:flex" />
                <BulletList items={[t.design.gamepad.implications[1]]} className="mt-6 sm:mt-7" />
                <GamepadImplicationExample token={token} name="gamepad.directional-navigation" alt={t.design.gamepad.directionalNav.alt} caption={t.design.gamepad.directionalNav.caption} className="mt-6 sm:mt-7" />
              </div>
            </Tile>

            <div
              id="design-system"
              data-squircle
              className="scroll-mt-28 rounded-radius-6 sm:rounded-radius-8 lg:rounded-radius-12 bg-black p-6 sm:p-12 lg:p-[60px]"
            >
              <h3 className="text-h3 font-semibold text-white mb-8 sm:mb-10 lg:mb-11 scroll-mt-28">{t.design.system.header}</h3>
              <div className="text-copy-l text-white/70 max-w-3xl mb-10 sm:mb-12 space-y-6">{richText(t.design.system.intro)}</div>
              <DesignSystemShowcase labels={t.design.system.dsLabels} iconsSrc={assetUrl('digital-twin/design-system.iconography.svg', token)} token={token} iconFocusCopy={t.design.system.iconFocus} lang={lang} />
              <p className="mt-10 sm:mt-12 max-w-3xl text-fine-print text-white/40">{t.design.system.reducedNote}</p>
            </div>

            <Tile bgClass="bg-bg-page" className="border border-black/[0.08] dark:border-white/[0.10]">
              <TileEyebrow id="design-menu">{t.design.menu.eyebrow}</TileEyebrow>
              <TileBody><p>{richText(t.design.menu.intro)}</p></TileBody>
              <MenuDiagram lang={lang} token={token} label={t.design.menu.imgLabel} alt={t.design.menu.imgAlt} className="mt-12 sm:mt-16" />
              <figure className="mt-12 sm:mt-16">
                <figcaption className={`${microLabel} mb-5 sm:mb-6`}>{t.design.menu.protoLabel}</figcaption>
                <DigitalTwinMenu key={lang} lang={lang} hint={LOCAL[lang].protoHint} token={token} />
              </figure>
              <LabeledBlock className="mt-12 sm:mt-16" itemsClass="mt-5 sm:mt-6" label={t.design.menu.decisionsLabel} items={t.design.menu.decisions} />
            </Tile>

            <Tile bgClass="bg-bg-page" className="border border-black/[0.08] dark:border-white/[0.10]">
              <TileEyebrow id="design-spatial">{t.design.spatial.eyebrow}</TileEyebrow>
              <TileBody><p>{richText(t.design.spatial.intro)}</p></TileBody>
              <figure className="mt-12 sm:mt-16">
                <SpatialProto token={token} copy={{ ...t.design.spatial, protoHint: LOCAL[lang].protoHint }} />
              </figure>
            </Tile>
          </div>
        </Section>

        {/* Key UX challenges & solutions — its own collapsible section, like
            Design/Impact, with a mobile chevron to compact it. */}
        <Section id="design-challenges" title={t.design.challengesEyebrow} lang={lang} bgClass="bg-bg-surface" titleInset>
          <p className={`${tileBodyText} max-w-3xl mb-8 sm:mb-10 pl-6 sm:pl-12 lg:pl-[60px]`}>{t.design.challengesIntro}</p>
          <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
            {t.design.challenges.map((item, i) => (
              <ChallengeCarousel
                key={i}
                index={i}
                item={item}
                labels={t.labels}
                copy={t.design.challengeSlide}
                token={token}
                lang={lang}
                minHeight={challengeCardHeight}
              />
            ))}
          </div>
        </Section>

        {/* Impact — narrative summary of outcomes. */}
        <Section id="impact" title={t.impact.header} lang={lang} bgClass="bg-bg-page" titleInset collapsedGapClass="pb-10">
          <Tile bgClass="bg-bg-page" className="border border-black/[0.08] dark:border-white/[0.10]">
            <div className="flex flex-col gap-6 max-w-3xl">
              {t.impact.intro.map((para, i) => (
                <p key={i} className={tileBodyText}>{richText(para)}</p>
              ))}
            </div>
          </Tile>
        </Section>

        {/* Enablers — the tools used, grouped by category, like the other
            case studies. */}
        <div className="bg-bg-page pb-16 sm:pb-20">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 flex justify-center">
            <ToolsSection label={t.toolsLabel} categories={t.toolCategories} />
          </div>
        </div>

        <div className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
            <Link
              to="/#case-studies"
              data-spring
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              <img
                src={imgArrowRight}
                alt=""
                width={16}
                height={16}
                className="brightness-0 invert"
                style={{ transform: 'rotate(180deg)' }}
                draggable="false"
              />
              {t.outro}
            </Link>
          </div>
        </div>
      </main>

      {/* Desktop secondary nav — fixed, visible once scrolled past the hero.
          The opacity fade lives on the inner <nav> (see SecondaryNav), not this
          wrapper, so the backdrop-blur eases in rather than popping. */}
      <div
        inert={scrolledDown && !atBottom ? undefined : true}
        className={`hidden min-[920px]:block fixed z-10 top-[240px] min-[920px]:right-[calc(50%_+_20.5rem)] lg:right-[calc(50%_+_25.5rem)] ${scrolledDown && !atBottom ? '' : 'pointer-events-none'}`}
      >
        <SecondaryNav sections={sections} activeId={activeId} activeSubId={activeSubId} onNavigate={handleNavigate} visible={scrolledDown && !atBottom} lang={lang} />
      </div>

      <Footer lang={lang} />
    </>
  );
}

export default function DigitalTwin({ lang = 'en', isDark }) {
  return (
    <PasswordGate lang={lang}>
      {(content, token) => <DigitalTwinCaseStudy lang={lang} token={token} isDark={isDark} content={content} />}
    </PasswordGate>
  );
}
