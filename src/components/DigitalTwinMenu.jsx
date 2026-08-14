import { useState, useRef, useEffect, useCallback, useMemo, createContext, useContext } from 'react';
import { assetUrl } from '../utils/protectedAsset';

// Shared single-tooltip channel — only the element whose id equals `tip` shows
// its tooltip, so at most one is ever visible (even with focus + hover at once).
const TipCtx = createContext({ tip: null, show: () => {}, hide: () => {} });

// ---------------------------------------------------------------------------
// DigitalTwinMenu — live, in-code recreation of the Unreal platform's primary
// menu, for the protected Digital Twin case study. Mirrors the real product
// chrome rather than the site theme (it's an app overlay), so it renders the
// same in light/dark site modes.
//
// Anatomy (from the design provisions):
//   ⚙ Settings │ [group] [group] [group] [group] │ 🕐 12:34
// Each group is an icon button (showing its ACTIVE member's icon) + a chevron
// that opens a dark dropdown of the group's tools. Interaction implemented:
//   • reveal / hide the whole menu with a button (menu hidden by default)
//   • hover / focus an icon → its label appears below (reduce-clutter rule)
//   • chevron → dropdown; ↑/↓ move a gamepad-style focus highlight (white
//     pill), Enter selects (radio dot), Esc closes
//   • clicking a group icon toggles its active tool on/off (dark fill)
//
// Icons are the real exported product artwork (white + black `-active` pairs),
// bundled below. Geometry matches the source SVGs: 32px buttons, 24px glyphs,
// an 18px chevron badge, ~7px gaps, 16px around the divider.
// ---------------------------------------------------------------------------

// Real exported product icons (24×24). Each has a white base variant (for dark
// buttons / dropdown rows) and a black `-active` variant (for the white hover
// circle and the selected white pill). These recreate the real product's
// chrome, so — like the case-study images — they're private-Blob assets
// served only to an unlocked token, not bundled with the client.

// `inverted` swaps to the black `-active` glyph for use on white surfaces.
function MenuIcon({ name, inverted = false, className = '', token }) {
  return <img src={assetUrl(`digital-twin/icons/${inverted ? `${name}-active` : name}.svg`, token)} alt="" aria-hidden="true" draggable="false" className={className} />;
}

const ChevronGlyph = ({ up = false, className = '', weight = '4.2' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={weight} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} style={up ? { transform: 'rotate(180deg)' } : undefined}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

// X / close mark — used to turn a toggled tool off.
const CloseGlyph = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

// Menu model — groups left→right, each with its tools and the initially-active
// member. `toggle` tools turn on/off (dark fill); others are mode selectors.
const MENU = {
  en: {
    reveal: 'Show menu',
    hide: 'Hide menu',
    settings: 'Settings',
    time: '12:34',
    groups: [
      { id: 'review', label: 'Review tools', active: 'measure', tools: [
        { id: 'photo',   label: 'Photo mode', icon: 'photo-mode', toggle: true },
        { id: 'measure', label: 'Measure',    icon: 'measure',    toggle: true },
        { id: 'slicer',  label: 'Slicer',     icon: 'slicer',     toggle: true },
        { id: 'markup',  label: 'Markup',     icon: 'markup',     toggle: true },
      ] },
      { id: 'viewing', label: 'Viewing tools', active: 'tours', tools: [
        { id: 'viewpoints', label: 'Viewpoints',   icon: 'viewpoints' },
        { id: 'cinematics', label: 'Cinematics',   icon: 'cinematics' },
        { id: 'static',     label: 'Static views', icon: 'static-views' },
        { id: 'tours',      label: 'Tours',        icon: 'tours' },
      ] },
      { id: 'scene', label: 'Scene tools', active: 'layers', tools: [
        { id: 'layers',       label: 'Layers',       icon: 'layers' },
        { id: 'lighting',     label: 'Lighting',     icon: 'lighting' },
        { id: 'screens',      label: 'Screens',      icon: 'screens' },
        { id: 'optioneering', label: 'Optioneering', icon: 'optioneering' },
      ] },
      { id: 'sim', label: 'Sim tools', active: 'weather', tools: [
        { id: 'weather', label: 'Weather',    icon: 'weather',    toggle: true },
        { id: 'people',  label: 'People sim', icon: 'people-sim', toggle: true },
      ] },
      { id: 'time', label: 'Time', active: 'timeOfDay', tools: [
        { id: 'timeOfDay', label: 'Time of day', icon: 'clock' },
        { id: 'calendar',  label: 'Calendar',     icon: 'calendar' },
      ] },
    ],
  },
  fr: {
    reveal: 'Afficher le menu',
    hide: 'Masquer le menu',
    settings: 'Réglages',
    time: '12:34',
    groups: [
      { id: 'review', label: 'Outils de revue', active: 'measure', tools: [
        { id: 'photo',   label: 'Mode photo', icon: 'photo-mode', toggle: true },
        { id: 'measure', label: 'Mesure',     icon: 'measure',    toggle: true },
        { id: 'slicer',  label: 'Découpe',    icon: 'slicer',     toggle: true },
        { id: 'markup',  label: 'Annotation', icon: 'markup',     toggle: true },
      ] },
      { id: 'viewing', label: 'Outils de visualisation', active: 'tours', tools: [
        { id: 'viewpoints', label: 'Points de vue', icon: 'viewpoints' },
        { id: 'cinematics', label: 'Cinématiques',  icon: 'cinematics' },
        { id: 'static',     label: 'Vues fixes',    icon: 'static-views' },
        { id: 'tours',      label: 'Visites',       icon: 'tours' },
      ] },
      { id: 'scene', label: 'Outils de scène', active: 'layers', tools: [
        { id: 'layers',       label: 'Calques',      icon: 'layers' },
        { id: 'lighting',     label: 'Éclairage',    icon: 'lighting' },
        { id: 'screens',      label: 'Écrans',       icon: 'screens' },
        { id: 'optioneering', label: 'Optioneering', icon: 'optioneering' },
      ] },
      { id: 'sim', label: 'Outils de simulation', active: 'weather', tools: [
        { id: 'weather', label: 'Météo',           icon: 'weather',    toggle: true },
        { id: 'people',  label: 'Humains', icon: 'people-sim', toggle: true },
      ] },
      { id: 'time', label: 'Heure', active: 'timeOfDay', tools: [
        { id: 'timeOfDay', label: 'Heure du jour', icon: 'clock' },
        { id: 'calendar',  label: 'Calendrier',    icon: 'calendar' },
      ] },
    ],
  },
};

// Dark dropdown for one group. Mounted only while open, so `focusIndex`
// initialises from the active tool in its useState initialiser — no effect
// needed. Arrow keys move a gamepad-style highlight; Enter selects, Esc closes.
function GroupDropdown({ group, active, onSelect, onClose, suppressFocus = false, align = 'left', toolOrder, token }) {
  // Render in most-recently-used order (each selected tool moved to the top).
  const ids = toolOrder && toolOrder.length ? toolOrder : group.tools.map(t => t.id);
  const tools = ids.map(id => group.tools.find(t => t.id === id)).filter(Boolean);
  const [focusIndex, setFocusIndex] = useState(() => Math.max(0, tools.findIndex(t => t.id === active)));
  const listRef = useRef(null);

  // Focus the list on open so arrow keys work immediately (focusing a DOM
  // node, not setting state).
  useEffect(() => { listRef.current?.focus(); }, []);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocusIndex(i => Math.min(tools.length - 1, i + 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setFocusIndex(i => Math.max(0, i - 1)); }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(group.id, tools[focusIndex].id); }
    if (e.key === 'Escape')    { e.preventDefault(); onClose(); }
  };

  return (
    <ul
      ref={listRef}
      role="menu"
      aria-label={group.label}
      onKeyDown={onKeyDown}
      tabIndex={-1}
      data-squircle
      className={`absolute top-[calc(100%+8px)] ${align === 'right' ? 'right-0' : 'left-0'} min-w-[150px] p-1.5 rounded-[16px] bg-black/[0.72] backdrop-blur-md shadow-lg ring-1 ring-white/[0.16] z-20 flex flex-col gap-0.5 focus:outline-none`}
    >
      {tools.map((tool, i) => {
        const isActive = tool.id === active;
        const isFocus = !suppressFocus && i === focusIndex;
        return (
          <li key={tool.id} role="none">
            <button
              type="button"
              role="menuitemradio"
              aria-checked={isActive}
              data-squircle
              onMouseEnter={() => setFocusIndex(i)}
              onClick={() => onSelect(group.id, tool.id)}
              className={`w-full flex items-center gap-2.5 pl-2 pr-2.5 py-1.5 rounded-[9px] text-left text-[14px] cursor-pointer transition-colors ${isFocus ? 'bg-white text-[#1c1c1e]' : 'text-white/90'}`}
            >
              <span className="w-3 flex justify-center">
                {isActive && <span className={`w-1.5 h-1.5 rounded-full ${isFocus ? 'bg-[#1c1c1e]' : 'bg-white'}`} />}
              </span>
              <MenuIcon name={tool.icon} inverted={isFocus} className="w-[18px] h-[18px] shrink-0" token={token} />
              <span className="truncate">{tool.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

// Frosted-glass pill tooltip (translucent white + backdrop blur, like the SVGs
// — not a solid fill). Centred under the icon; shows the active tool name on
// icon-hover, the group name on chevron-hover.
function Tooltip({ show, label }) {
  return (
    <span className={`pointer-events-none absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-20 whitespace-nowrap px-2 py-0.5 rounded-full bg-white/40 backdrop-blur-md text-[#1c1c1e] text-[12px] font-medium shadow-[0_4px_16px_rgba(0,0,0,0.18)] transition-opacity duration-150 ${show ? 'opacity-100' : 'opacity-0'}`}>
      {label}
    </span>
  );
}

// Toggled-on state for a toggle tool — the icon expands into a dark pill:
//   [icon] ⌄ <name> ⌃
// Left (icon + ⌄) opens the group dropdown (hover → 26px white circle on the
// icon, black glyph); the right ⌃ turns the tool off (hover → 26px white circle).
function ToggledPill({ group, activeTool, active, open, onOpen, onToggleOff, onSelect, toolOrder, align = 'left', token }) {
  const [leftHover, setLeftHover] = useState(false);
  const [closeHover, setCloseHover] = useState(false);
  return (
    <div className="relative flex items-center h-8 rounded-full bg-black/80 ring-1 ring-white/[0.16] px-0.5">
      {/* Left — opens the group dropdown. Hover → ONE white pill wrapping the
          icon AND the ⌄ together (distinct from the non-toggled chevron). */}
      <button
        type="button"
        aria-label={`${group.label} options`}
        aria-expanded={open}
        onMouseEnter={() => setLeftHover(true)}
        onMouseLeave={() => setLeftHover(false)}
        onFocus={() => setLeftHover(true)}
        onBlur={() => setLeftHover(false)}
        onClick={() => onOpen(open ? null : group.id)}
        className={`flex items-center gap-0.5 h-[28px] rounded-full pl-0.5 pr-1.5 cursor-pointer transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white/80 ${leftHover ? 'bg-white' : ''}`}
      >
        <MenuIcon name={activeTool.icon} inverted={leftHover} className="w-6 h-6" token={token} />
        <ChevronGlyph className={`w-2 h-2 ${leftHover ? 'text-[#1c1c1e]' : 'text-white'}`} />
      </button>

      {/* Tool name */}
      <span className="px-1.5 text-white text-[15px] font-normal whitespace-nowrap">{activeTool.label}</span>

      {/* Right — collapse / turn the tool off */}
      <button
        type="button"
        aria-label={`Turn off ${activeTool.label}`}
        onMouseEnter={() => setCloseHover(true)}
        onMouseLeave={() => setCloseHover(false)}
        onFocus={() => setCloseHover(true)}
        onBlur={() => setCloseHover(false)}
        onClick={onToggleOff}
        className="h-8 flex items-center rounded-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white/80"
      >
        <span className={`w-[26px] h-[26px] rounded-full flex items-center justify-center transition-colors ${closeHover ? 'bg-white' : ''}`}>
          <CloseGlyph className={`w-4 h-4 ${closeHover ? 'text-[#1c1c1e]' : 'text-white'}`} />
        </span>
      </button>

      {open && <GroupDropdown group={group} active={active} onSelect={onSelect} onClose={() => onOpen(null)} suppressFocus={leftHover || closeHover} toolOrder={toolOrder} align={align} token={token} />}
    </div>
  );
}

// Settings, toggled on — same pill treatment as a tool, minus the dropdown
// (settings has no members): [icon] Settings ⌃.
function SettingsPill({ icon, label, onToggleOff, token }) {
  const [closeHover, setCloseHover] = useState(false);
  return (
    <div className="relative flex items-center h-8 rounded-full bg-black/80 ring-1 ring-white/[0.16] pl-1.5 pr-0.5">
      <MenuIcon name={icon} className="w-6 h-6" token={token} />
      <span className="px-1.5 text-white text-[15px] font-medium whitespace-nowrap">{label}</span>
      <button
        type="button"
        aria-label={`Turn off ${label}`}
        onMouseEnter={() => setCloseHover(true)}
        onMouseLeave={() => setCloseHover(false)}
        onFocus={() => setCloseHover(true)}
        onBlur={() => setCloseHover(false)}
        onClick={onToggleOff}
        className="h-8 flex items-center rounded-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white/80"
      >
        <span className={`w-[26px] h-[26px] rounded-full flex items-center justify-center transition-colors ${closeHover ? 'bg-white' : ''}`}>
          <CloseGlyph className={`w-4 h-4 ${closeHover ? 'text-[#1c1c1e]' : 'text-white'}`} />
        </span>
      </button>
    </div>
  );
}

// One group: icon button (toggles active tool) + chevron badge (opens dropdown).
// `idleLabel` swaps the idle (non-toggled) button for a text pill instead of
// the tool icon — used by the time group, which should show the clock's
// current time at rest and only reveal an icon once a tool is active.
function MenuGroup({ group, active, toggled, open, onToggleTool, onOpen, onSelect, toolOrder, align = 'left', idleLabel, token }) {
  const activeTool = group.tools.find(t => t.id === active) || group.tools[0];
  const [iconHover, setIconHover] = useState(false);
  const [chevHover, setChevHover] = useState(false);

  // The icon button unmounts when the group toggles on, so its mouseleave never
  // fires and iconHover goes stale — reset hover on any toggle change so the
  // icon returns to idle (not hover) when it later collapses back.
  const [prevToggled, setPrevToggled] = useState(toggled);
  if (prevToggled !== toggled) {
    setPrevToggled(toggled);
    setIconHover(false);
    setChevHover(false);
  }

  const tipCtx = useContext(TipCtx);
  const enterIcon = () => { setIconHover(true); tipCtx.show(group.id); };
  const leaveIcon = () => { setIconHover(false); tipCtx.hide(group.id); };
  const enterChev = () => { setChevHover(true); tipCtx.show(group.id); };
  const leaveChev = () => { setChevHover(false); tipCtx.hide(group.id); };

  // Any group switched on shows the expanded pill instead of the icon.
  if (toggled) {
    return (
      <ToggledPill
        group={group}
        activeTool={activeTool}
        active={active}
        open={open}
        onOpen={onOpen}
        onToggleOff={() => onToggleTool(group.id)}
        onSelect={onSelect}
        toolOrder={toolOrder}
        align={align}
        token={token}
      />
    );
  }

  // The icon + chevron fuse into one shape (like the SVG). Two flavours:
  //   • chevron-hover → WHITE pill, black glyph + chevron (also wins while open)
  //   • dropdown open, not hovering the chevron → DARK pill, white glyph + chevron
  const mergedWhite = chevHover;
  const mergedDark = open && !chevHover;
  const merged = mergedWhite || mergedDark;

  return (
    <div className="relative flex items-center">
      {/* Merged background track — links the icon and chevron into one shape.
          On chevron-hover the white is masked so the tool icon's circle is cut
          out (the white is only the crescent around it). */}
      {!idleLabel && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-full transition-colors duration-150 ${mergedWhite ? 'bg-white' : mergedDark ? 'bg-black/[0.62] ring-1 ring-white/[0.16]' : ''}`}
          style={mergedWhite ? { maskImage: 'radial-gradient(circle 16px at 16px 50%, transparent 15px, #000 16px)', WebkitMaskImage: 'radial-gradient(circle 16px at 16px 50%, transparent 15px, #000 16px)' } : undefined}
        />
      )}

      {/* Idle button — the tool icon, or (idleLabel) the clock's time as a
          text pill; either way, hover → frosted-white, inverted content. */}
      <div className="relative z-10">
        <button
          type="button"
          aria-label={idleLabel ? `${activeTool.label}: ${idleLabel}` : activeTool.label}
          aria-pressed={activeTool.toggle ? !!toggled : undefined}
          onMouseEnter={enterIcon}
          onMouseLeave={leaveIcon}
          onFocus={enterIcon}
          onBlur={leaveIcon}
          onClick={() => onToggleTool(group.id)}
          className={idleLabel ? 'h-8 flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80' : 'w-8 h-8 flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80'}
        >
          {idleLabel ? (
            <span className={`h-8 px-3 rounded-[10px] flex items-center font-normal tabular-nums text-[20px] tracking-[-0.01em] transition-all duration-150 ${iconHover ? 'bg-white text-[#1c1c1e]' : 'bg-black/[0.5] text-white ring-1 ring-white/[0.16]'}`}>
              {idleLabel}
            </span>
          ) : (
            <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 ${iconHover ? 'bg-white shadow-[0_4px_16px_rgba(0,0,0,0.28)] ring-0' : mergedDark ? 'bg-transparent ring-0' : `ring-1 ring-white/[0.16] ${toggled ? 'bg-black/80' : 'bg-black/50'}`}`}>
              <MenuIcon name={activeTool.icon} inverted={iconHover} className="w-6 h-6" token={token} />
            </span>
          )}
        </button>
        <Tooltip show={tipCtx.tip === group.id && !open} label={chevHover ? group.label : activeTool.label} />
      </div>

      {/* Chevron — its own dark circle at rest; on hover the merged white pill
          shows through with a black chevron; on open, the dark pill with white.
          Idle text pills (idleLabel) skip this entirely — no dropdown trigger
          until the tool is selected; the dropdown then opens from ToggledPill's
          own chevron instead. */}
      {/* The hit area spans the full height/right extent of the curve so hovering
          anywhere it will appear triggers it; the visible badge stays a 14px
          circle in idle. */}
      {!idleLabel && (
        <button
          type="button"
          aria-label={`${group.label} options`}
          aria-expanded={open}
          onMouseEnter={enterChev}
          onMouseLeave={leaveChev}
          onFocus={enterChev}
          onBlur={leaveChev}
          onClick={() => onOpen(open ? null : group.id)}
          className={`relative z-10 h-8 pl-0.5 pr-1.5 flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white/80 ${mergedWhite ? 'text-[#1c1c1e]' : 'text-white'}`}
        >
          <span className={`w-3 h-3 rounded-full flex items-center justify-center transition-transform ${merged ? 'bg-transparent' : 'bg-black/50 ring-1 ring-white/[0.16]'} ${chevHover ? 'scale-125' : 'scale-100'}`}>
            <ChevronGlyph up={open} weight={chevHover ? '4.6' : '4.2'} className="w-[7px] h-[7px]" />
          </span>
        </button>
      )}

      {!idleLabel && open && <GroupDropdown group={group} active={active} onSelect={onSelect} onClose={() => onOpen(null)} suppressFocus={chevHover} toolOrder={toolOrder} align={align} token={token} />}
    </div>
  );
}

export default function DigitalTwinMenu({ lang = 'en', hint, className = '', token }) {
  const m = MENU[lang] || MENU.en;
  const [openGroup, setOpenGroup] = useState(null);
  const [active, setActive] = useState(() => Object.fromEntries(m.groups.map(g => [g.id, g.active])));
  const [toggledGroup, setToggledGroup] = useState(null);
  const [order, setOrder] = useState(() => Object.fromEntries(m.groups.map(g => [g.id, g.tools.map(t => t.id)])));
  const [settingsHover, setSettingsHover] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [tip, setTip] = useState(null);
  const rootRef = useRef(null);

  const tipApi = useMemo(() => ({
    tip,
    show: (id) => setTip(id),
    hide: (id) => setTip(t => (t === id ? null : t)),
  }), [tip]);

  // Close any open dropdown on outside click.
  useEffect(() => {
    if (!openGroup) return;
    const onDown = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) setOpenGroup(null); };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [openGroup]);

  const selectTool = useCallback((groupId, toolId) => {
    setActive(a => ({ ...a, [groupId]: toolId }));
    setToggledGroup(groupId); // picking a tool toggles it on (one at a time)
    setOrder(o => ({ ...o, [groupId]: [toolId, ...o[groupId].filter(id => id !== toolId)] })); // MRU to top
    setOpenGroup(null);
    setInteracted(true);
  }, []);

  const toggleTool = useCallback((groupId) => {
    setToggledGroup(prev => (prev === groupId ? null : groupId)); // only one at a time
    setOpenGroup(null); // interacting with another button closes any open dropdown
    setInteracted(true);
  }, []);

  // Opening a dropdown also counts as the first interaction.
  const handleOpen = useCallback((id) => {
    setOpenGroup(id);
    if (id != null) setInteracted(true);
  }, []);

  // Settings' icon button unmounts when it toggles on (becomes the pill), so its
  // mouseleave never fires — reset hover/tooltip on toggle change so it returns
  // to idle (not hover) when the pill collapses back.
  const settingsToggled = toggledGroup === 'settings';
  const [prevSettingsToggled, setPrevSettingsToggled] = useState(settingsToggled);
  if (prevSettingsToggled !== settingsToggled) {
    setPrevSettingsToggled(settingsToggled);
    setSettingsHover(false);
    setTip(t => (t === 'settings' ? null : t));
  }

  const groupProps = (group) => ({
    group,
    active: active[group.id],
    toggled: toggledGroup === group.id,
    open: openGroup === group.id,
    toolOrder: order[group.id],
    onToggleTool: toggleTool,
    onOpen: handleOpen,
    onSelect: selectTool,
    token,
  });

  return (
    <div className={className}>
     <TipCtx.Provider value={tipApi}>
      {/* "Scene" backdrop standing in for the 3D viewport behind the real menu:
          a daytime sky gradient in light mode, a dawn gradient in dark mode. */}
      <div
        data-squircle
        className="relative rounded-radius-4 sm:rounded-radius-6 overflow-visible bg-gradient-to-b from-[#c6d4e2] via-[#dadfe7] to-[#ebeced] dark:from-[#39496a] dark:via-[#946a82] dark:to-[#e2a173] px-4 sm:px-6 pt-8 pb-6 min-h-[260px] flex flex-col items-center"
      >
        <div ref={rootRef} className="flex items-center">
          {/* Settings — always first (left). Toggles like a tool (pill, single
              at a time). Hidden on mobile so the tool groups fit; also hidden
              at md (the case-study column narrows to max-w-2xl in that iPad
              range, before widening again at lg) so selected tools don't get
              squeezed. */}
          <div className="hidden sm:flex md:hidden lg:flex items-center">
          {toggledGroup === 'settings' ? (
            <SettingsPill icon="settings" label={m.settings} onToggleOff={() => toggleTool('settings')} token={token} />
          ) : (
            <div className="relative">
              <button
                type="button"
                aria-label={m.settings}
                aria-pressed={false}
                onMouseEnter={() => { setSettingsHover(true); setTip('settings'); }}
                onMouseLeave={() => { setSettingsHover(false); setTip(t => (t === 'settings' ? null : t)); }}
                onFocus={() => { setSettingsHover(true); setTip('settings'); }}
                onBlur={() => { setSettingsHover(false); setTip(t => (t === 'settings' ? null : t)); }}
                onClick={() => { toggleTool('settings'); setInteracted(true); }}
                className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 ${settingsHover ? 'bg-white shadow-[0_4px_16px_rgba(0,0,0,0.28)] ring-0' : 'ring-1 ring-white/[0.24] bg-black/[0.48]'}`}
              >
                <MenuIcon name="settings" inverted={settingsHover} className="w-6 h-6" token={token} />
              </button>
              <Tooltip show={tip === 'settings'} label={m.settings} />
            </div>
          )}
          </div>

          {/* Divider — hidden on mobile and at md (matches settings above) */}
          <span aria-hidden="true" className="hidden sm:block md:hidden lg:block w-0.5 h-7 rounded-full bg-black/50 mx-4" />

          {/* Tool groups — the toggled tool stays in place (centred cluster). */}
          <div className="flex items-center gap-[14px]">
            {m.groups.filter(group => group.id !== 'time').map(group => (
              <MenuGroup key={group.id} {...groupProps(group)} />
            ))}
          </div>

          {/* Time — always last. Hidden on mobile so the tool groups fit. */}
          <div className="hidden sm:flex items-center ml-[14px]">
            <MenuGroup {...groupProps(m.groups.find(group => group.id === 'time'))} idleLabel={m.time} align="right" />
          </div>
        </div>

        {/* Hint — vertically centred in the empty space below the menu, like the
            team-map caption; clears after the first interaction. */}
        {hint && !interacted && (
          <div className="flex-1 flex items-center justify-center w-full pointer-events-none">
            <p className="max-w-[20rem] px-4 text-center text-fine-print leading-normal text-black/55 dark:text-white/75">{hint}</p>
          </div>
        )}
      </div>
     </TipCtx.Provider>
    </div>
  );
}
