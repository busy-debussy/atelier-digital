import { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import rawGlobe from '../assets/icons/globe-time-zones.svg?raw';

const SVG_W = 1114, SVG_H = 561;

function extractTz(id) {
  const m = id.match(/^(?:even|odd)([+-]?\d+(?:\.\d+)?)-/);
  return m ? String(parseFloat(m[1])) : null;
}

// ── Default team data (XR / Sales Platform shared team) ───────────────────────
export const DEFAULT_COUNTRY_COLOR_MAP = {
  Scotland: '#C9A84C',
  England:  '#6B9CE8',
  UAE:      '#E8836B',
  Vietnam:  '#6BC4A0',
};

export const DEFAULT_TEAM_DOTS = [
  { label: 'Designer',       group: 'design',     country: 'Scotland', color: '#C9A84C' },
  { label: 'Unity',          group: 'dev',        country: 'Scotland', color: '#C9A84C' },
  { label: 'Creative Team',  group: 'studio',     country: 'Scotland', color: '#C9A84C' },
  { label: 'Project Manager',group: 'management', country: 'England',  color: '#6B9CE8' },
  { label: 'Product Manager',group: 'management', country: 'UAE',      color: '#E8836B' },
  { label: 'Unreal Engine',  group: 'dev',        country: 'Vietnam',  color: '#6BC4A0' },
];

export const DEFAULT_LEGEND_GROUPS = [
  { heading: 'Development', group: 'dev' },
  { heading: 'Design',      group: 'design' },
  { heading: 'Management',  group: 'management' },
  { heading: 'Studio',      group: 'studio' },
];

const DEFAULT_LEGEND_T = {
  en: {
    headings:       { dev: 'Engineering', design: 'Design', management: 'Management', studio: 'Studio' },
    labels:         { Designer: 'Designer', Unity: 'Unity', 'Creative Team': 'Creative Team', 'Project Manager': 'Project Manager', 'Product Manager': 'Product Manager', 'Unreal Engine': 'Unreal Engine' },
    mapCaption:     'Slide or hover over the map to explore time zones.',
    groupAriaLabel: 'Team members by location',
    mapAriaLabel:   'World map showing team locations. Use left and right arrow keys to explore time zones.',
  },
  fr: {
    headings:       { dev: 'Ingénierie', design: 'Design', management: 'Management', studio: 'Studio' },
    labels:         { Designer: 'Designer', Unity: 'Unity', 'Creative Team': 'Équipe créative', 'Project Manager': 'Chef de projet', 'Product Manager': 'Product Manager', 'Unreal Engine': 'Unreal Engine' },
    mapCaption:     'Survolez la carte pour explorer les fuseaux horaires.',
    groupAriaLabel: "Membres de l'équipe par localisation",
    mapAriaLabel:   "Carte du monde montrant les localisations de l'équipe. Utilisez les flèches gauche et droite pour explorer les fuseaux horaires.",
  },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function WorldMapDots({
  isDark,
  lang = 'en',
  teamDots        = DEFAULT_TEAM_DOTS,
  legendGroups    = DEFAULT_LEGEND_GROUPS,
  countryColorMap = DEFAULT_COUNTRY_COLOR_MAP,
  translations    = DEFAULT_LEGEND_T,
  dotIdMap        = {}, // { countryName: 'exact-svg-base-id' } — pin a country to one specific dot
  tooltipOffsets  = {}, // { countryName: { x: 0, y: 0 } } — nudge tooltip position in px
}) {
  const lt = translations[lang] ?? translations.en;
  const flatDots = legendGroups.flatMap(col => teamDots.filter(d => d.group === col.group));

  const [hovered,    setHovered]    = useState(null);
  const [selected,   setSelected]   = useState(null);
  const [focusedIdx, setFocusedIdx] = useState(0);
  const containerRef    = useRef(null);
  const mapRef          = useRef(null);
  const touchOverlayRef = useRef(null);
  const prevLitRef      = useRef([]);
  const legendRef       = useRef(null);
  // Deselect on pointer-outside (capture phase fires on all elements incl. iOS non-interactive)
  useEffect(() => {
    const handlePointerDown = (e) => {
      if (legendRef.current?.contains(e.target) && e.target.closest('button')) return;
      setSelected(null);
    };
    document.addEventListener('pointerdown', handlePointerDown, true);
    return () => document.removeEventListener('pointerdown', handlePointerDown, true);
  }, []);

  // Arrow key navigation on the map
  const handleMapKeyDown = (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    if (!tzList.length) return;
    const curr = selected ? tzList.indexOf(selected.tz) : -1;
    const next = e.key === 'ArrowRight'
      ? (curr + 1) % tzList.length
      : (curr - 1 + tzList.length) % tzList.length;
    setSelected({ tz: tzList[next], country: null });
  };

  // Roving tabindex across legend pills
  const handleLegendKeyDown = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const buttons = [...legendRef.current.querySelectorAll('button')];
    const curr = buttons.indexOf(document.activeElement);
    if (curr === -1) return;
    const next = e.key === 'ArrowRight'
      ? (curr + 1) % buttons.length
      : (curr - 1 + buttons.length) % buttons.length;
    buttons[next].focus();
    setFocusedIdx(next);
    const dot   = flatDots[next];
    const dotTz = dot ? dotPositions[dot.country]?.tz ?? null : null;
    if (dotTz) setSelected({ tz: dotTz, country: dot.country });
  };

  // Reset on pointer movement outside the map
  useEffect(() => {
    const handleMove = (e) => {
      if (!mapRef.current) return;
      const r = mapRef.current.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
        setHovered(prev => prev === null ? null : null);
      }
    };
    document.addEventListener('pointermove', handleMove);
    return () => document.removeEventListener('pointermove', handleMove);
  }, []);

  // CSS for country-selection dimming — lives outside the SVG so it survives innerHTML
  const countriesCSS = useMemo(() => {
    if (!selected?.key) return '';
    const bgDim = '0.3';
    const selectors = (selected.countries ?? [])
      .map(c => `.xr-map-root[data-ca] .xr-dot[data-country="${c}"]`)
      .join(', ');
    return [
      `.xr-map-root[data-ca] .xr-bg { opacity: ${bgDim} !important; }`,
      `.xr-map-root[data-ca] .xr-dot { opacity: 0.2 !important; }`,
      selectors ? `${selectors} { opacity: 1 !important; }` : '',
      `.xr-map-root[data-ca] .xr-label { opacity: 0 !important; }`,
      `.xr-map-root[data-ca] .xr-label-bg { opacity: 0 !important; }`,
    ].filter(Boolean).join('\n');
  }, [selected, isDark]);

  // Parse SVG once per dark-mode change
  const { svgHtml, dotPositions, tzList } = useMemo(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawGlobe, 'image/svg+xml');
    const svg = doc.documentElement;
    svg.setAttribute('width', '100%');
    svg.removeAttribute('height');
    svg.setAttribute('overflow', 'visible');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.touchAction = 'none';

    const rect = svg.querySelector('rect');
    if (rect) rect.setAttribute('fill', 'transparent');

    const dotRestFill = isDark ? '#404040' : '#d4d4d4';
    const labelColor  = isDark ? '#fafafa' : '#1f1f1f';

    const style = doc.createElementNS('http://www.w3.org/2000/svg', 'style');
    style.textContent = `
      svg { touch-action: none; }
      .xr-bg    { cursor: crosshair; }
      .xr-dot   { opacity: 1;        cursor: crosshair; }
      .xr-label    { font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
                     font-size: 8px; font-weight: 700; text-anchor: middle; dominant-baseline: central;
                     cursor: crosshair; fill: ${labelColor}; }
      .xr-label-bg { cursor: crosshair; opacity: 0; }
      svg[data-active] .xr-bg       { opacity: 0.3; }
      svg[data-active] .xr-dot      { opacity: 0.2; }
      svg[data-active] .xr-label    { opacity: 0.3; }
      svg[data-active] .xr-label-bg { opacity: 0; }
    `;
    svg.insertBefore(style, svg.firstChild);

    const allCircles = Array.from(svg.querySelectorAll('circle'));
    const positions  = {};

    const sortedCys  = [...new Set(allCircles.map(c => parseFloat(c.getAttribute('cy'))))].sort((a, b) => a - b);
    const minCy      = sortedCys[0];
    const maxCy      = sortedCys[sortedCys.length - 1];
    const nextCy     = sortedCys[1] ?? minCy;
    const rowSpacing = nextCy - minCy;
    const dotRowY    = minCy - rowSpacing;
    const labelY     = minCy - rowSpacing * 2;

    const vb   = (svg.getAttribute('viewBox') || `0 0 ${SVG_W} ${SVG_H}`).trim().split(/[\s,]+/);
    const vbX  = parseFloat(vb[0]);
    const vbY  = parseFloat(vb[1]) - rowSpacing * 2 - 30;
    const vbW  = parseFloat(vb[2]);
    const vbH  = parseFloat(vb[3]) + rowSpacing * 2 + 30;
    svg.setAttribute('viewBox', `${vbX} ${vbY} ${vbW} ${vbH}`);

    const lastRowByTz = {};
    allCircles.forEach(c => {
      if (Math.abs(parseFloat(c.getAttribute('cy')) - maxCy) > 0.5) return;
      const tz = extractTz(c.getAttribute('id') || '');
      if (!tz) return;
      (lastRowByTz[tz] = lastRowByTz[tz] || []).push(parseFloat(c.getAttribute('cx')));
    });

    allCircles.forEach(circle => {
      const id     = circle.getAttribute('id') || '';
      const baseId = id.replace(/-\d+$/, '');
      const tz     = extractTz(baseId);
      if (tz) circle.setAttribute('data-tz', tz);

      let matched = null;
      for (const country of Object.keys(countryColorMap)) {
        const specificId = dotIdMap[country];
        if (specificId ? baseId === specificId : baseId.endsWith(`-${country}`)) { matched = country; break; }
      }

      if (matched) {
        circle.setAttribute('fill', countryColorMap[matched]);
        circle.setAttribute('data-country', matched);
        circle.setAttribute('class', 'xr-dot');
        circle.setAttribute('r', '8');
        positions[matched] = {
          x: (parseFloat(circle.getAttribute('cx')) / SVG_W) * 100,
          y: ((parseFloat(circle.getAttribute('cy')) - vbY) / vbH) * 100,
          tz,
        };
      } else {
        const fill = circle.getAttribute('fill');
        if (fill === 'white') {
          circle.setAttribute('fill', 'transparent');
        } else {
          circle.setAttribute('fill', dotRestFill);
        }
        circle.setAttribute('class', 'xr-bg');
      }
    });

    const labelsG = doc.createElementNS('http://www.w3.org/2000/svg', 'g');
    Object.entries(lastRowByTz).forEach(([tz, cxArr]) => {
      cxArr.sort((a, b) => a - b);
      let midIdx = Math.floor(cxArr.length / 2);
      if (tz === '10') midIdx = Math.max(0, midIdx - 1);
      const midCx  = cxArr[midIdx];
      const tzNum  = parseFloat(tz);
      const label  = tzNum === 0 ? 'GMT' : tzNum > 0 ? `+${tzNum}` : String(tzNum);

      const dw = label.length * 7 + 10;
      const dh = 14;

      const bg = doc.createElementNS('http://www.w3.org/2000/svg', 'rect');
      bg.setAttribute('x',         String(midCx - dw / 2));
      bg.setAttribute('y',         String(labelY - dh / 2));
      bg.setAttribute('width',     String(dw));
      bg.setAttribute('height',    String(dh));
      bg.setAttribute('rx',        '4');
      bg.setAttribute('data-tz',   tz);
      bg.setAttribute('data-midx', String(midCx));
      bg.setAttribute('data-midy', String(labelY));
      bg.setAttribute('data-dw',   String(dw));
      bg.setAttribute('data-dh',   String(dh));
      bg.setAttribute('data-len',  String(label.length));
      bg.setAttribute('class',     'xr-label-bg');
      labelsG.appendChild(bg);

      const text = doc.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x',       String(midCx));
      text.setAttribute('y',       String(labelY));
      text.setAttribute('data-tz', tz);
      text.setAttribute('class',   'xr-label');
      text.textContent = label;
      labelsG.appendChild(text);

      const dot = doc.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx',       String(midCx));
      dot.setAttribute('cy',       String(dotRowY));
      dot.setAttribute('r',        '4');
      dot.setAttribute('data-tz',  tz);
      dot.setAttribute('class',    'xr-bg');
      labelsG.appendChild(dot);
    });
    svg.appendChild(labelsG);

    const tzList = Object.keys(lastRowByTz).sort((a, b) => parseFloat(a) - parseFloat(b));
    return { svgHtml: svg.outerHTML, dotPositions: positions, tzList };
  }, [isDark, countryColorMap]);

  // Mobile touch overlay
  useEffect(() => {
    const overlay = touchOverlayRef.current;
    const map     = mapRef.current;
    if (!overlay || !map || !tzList.length) return;

    const scrub = (clientX) => {
      const r   = map.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
      setSelected({ tz: tzList[Math.min(tzList.length - 1, Math.floor(pct * tzList.length))], country: null });
    };

    let startX = null, startY = null, prevY = null, isHoriz = null;

    const onStart = (e) => {
      e.preventDefault();
      startX = e.touches[0].clientX; startY = e.touches[0].clientY;
      prevY = startY; isHoriz = null;
      scrub(startX);
    };
    const onMove = (e) => {
      e.preventDefault();
      const t  = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (isHoriz === null && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
        isHoriz = Math.abs(dx) >= Math.abs(dy);
      }
      if (isHoriz === false) { window.scrollBy(0, prevY - t.clientY); prevY = t.clientY; }
      else if (isHoriz === true) { scrub(t.clientX); }
    };
    const onEnd = () => { setSelected(null); };

    overlay.addEventListener('touchstart', onStart, { passive: false });
    overlay.addEventListener('touchmove',  onMove,  { passive: false });
    overlay.addEventListener('touchend',   onEnd,   { passive: true });
    return () => {
      overlay.removeEventListener('touchstart', onStart);
      overlay.removeEventListener('touchmove',  onMove);
      overlay.removeEventListener('touchend',   onEnd);
    };
  }, [tzList]);

  // Highlight map on hover/select change
  useLayoutEffect(() => {
    const active = hovered ?? selected;
    const svgEl  = containerRef.current?.querySelector('svg');
    if (!svgEl) return;

    prevLitRef.current.forEach(c => {
      c.style.opacity = '';
      if (c.classList.contains('xr-label')) { c.style.fontSize = ''; c.style.fill = ''; }
      if (c.classList.contains('xr-label-bg')) {
        const midx = parseFloat(c.getAttribute('data-midx'));
        const midy = parseFloat(c.getAttribute('data-midy'));
        const dw   = parseFloat(c.getAttribute('data-dw'));
        const dh   = parseFloat(c.getAttribute('data-dh'));
        c.setAttribute('x',      String(midx - dw / 2));
        c.setAttribute('y',      String(midy - dh / 2));
        c.setAttribute('width',  String(dw));
        c.setAttribute('height', String(dh));
        c.setAttribute('rx',     '4');
        c.style.fill = '';
      }
    });
    prevLitRef.current = [];

    if (!active) { svgEl.removeAttribute('data-active'); return; }

    svgEl.setAttribute('data-active', '1');
    const lit = [];

    if (selected?.key) {
      // Opacity is handled by the <style countriesCSS> element above — no inline style needed here.
    } else {
      const bgActiveOpacity = isDark ? 0.9 : 0.8;
      svgEl.querySelectorAll(`[data-tz="${active.tz}"]`).forEach(c => {
        c.style.opacity = c.classList.contains('xr-dot') ? '1' : String(bgActiveOpacity);
        if (c.classList.contains('xr-label')) {
          c.style.opacity  = '1';
          c.style.fontSize = '22px';
          c.style.fill     = isDark ? '#1f1f1f' : '#fafafa';
        }
        if (c.classList.contains('xr-label-bg')) {
          const midx = parseFloat(c.getAttribute('data-midx'));
          const midy = parseFloat(c.getAttribute('data-midy'));
          const len  = parseInt(c.getAttribute('data-len'), 10);
          const aw   = len * 14 + 28;
          const ah   = 38;
          c.style.opacity = '1';
          c.style.fill    = isDark ? '#fafafa' : '#1f1f1f';
          c.setAttribute('x',      String(midx - aw / 2));
          c.setAttribute('y',      String(midy - ah / 2));
          c.setAttribute('width',  String(aw));
          c.setAttribute('height', String(ah));
          c.setAttribute('rx',     '16');
        }
        lit.push(c);
      });
    }
    prevLitRef.current = lit;
  }, [hovered, selected, isDark]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div
          ref={mapRef}
          className="relative w-full mb-2 sm:mb-0 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-gold"
          style={{ cursor: 'crosshair' }}
          tabIndex={0}
          role="img"
          aria-label={lt.mapAriaLabel}
          onKeyDown={handleMapKeyDown}
          onMouseOver={(e) => {
            const circle = e.target.closest?.('[data-tz]');
            if (!circle) return;
            const tz      = circle.getAttribute('data-tz');
            const country = circle.getAttribute('data-country') || null;
            setHovered(prev => (prev?.tz === tz && prev?.country === country) ? prev : { tz, country });
          }}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="relative w-full">
            {countriesCSS && <style>{countriesCSS}</style>}
            <div ref={containerRef} className="w-full xr-map-root" data-ca={selected?.key ? '1' : undefined} dangerouslySetInnerHTML={{ __html: svgHtml }} />
            <div ref={touchOverlayRef} className="absolute inset-0 sm:hidden" style={{ zIndex: 2, touchAction: 'none' }} aria-hidden="true" />
          </div>
          {Object.entries(dotPositions).map(([country, pos]) => {
            const off = (typeof tooltipOffsets === 'function' ? tooltipOffsets(selected) : tooltipOffsets)[country];
            return (
            <div
              key={country}
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{ left: `calc(${pos.x}% + ${off?.x ?? 0}px)`, top: `calc(${pos.y}% + ${off?.y ?? 0}px)`, transform: 'translate(-50%, -100%)' }}
            >
              <div
                className="mb-2 whitespace-nowrap rounded-radius-2 px-2 py-1 text-[11px] font-medium bg-[#1f1f1f] text-white dark:bg-white dark:text-fg-primary-inverse transition-opacity duration-150"
                style={{ opacity: (selected?.key ? selected : (hovered ?? selected))?.countries?.includes(country) || (!selected?.key && (hovered ?? selected)?.country === country) ? 1 : 0 }}
              >
                {country}
              </div>
            </div>
            );
          })}
        </div>
        <p className="text-[12px] leading-normal text-fg-muted mt-2 text-center" aria-hidden="true">{lt.mapCaption}</p>
        <p className="sr-only">
          World map showing the geographic distribution of the team across four countries and their time zones.
          Use the buttons below to highlight each team member&apos;s location on the map.
        </p>
      </div>

      <div ref={legendRef} role="group" aria-label={lt.groupAriaLabel} onKeyDown={handleLegendKeyDown}>
        {/* Mobile: two independent flex columns (odd groups → col 1, even → col 2) */}
        <div className="md:hidden flex gap-x-10">
          {[legendGroups.filter((_, i) => i % 2 === 0), legendGroups.filter((_, i) => i % 2 === 1)].map((colGroups, ci) => (
            <div key={ci} className="flex-1 flex flex-col gap-6">
              {colGroups.map((col) => (
                <div key={col.group} className="flex flex-col gap-2">
                  <p className="text-overline-s font-medium leading-[1.4] uppercase tracking-wider text-fg-muted mb-1" aria-hidden="true">{lt.headings[col.group]}</p>
                  {teamDots.filter(d => d.group === col.group).map((dot) => {
                    const dotCountries = Array.isArray(dot.countries) ? dot.countries : dot.country ? [dot.country] : [];
                    const primaryTz    = dotPositions[dotCountries[0]]?.tz ?? null;
                    const active       = hovered ?? selected;
                    const dotKey       = `${dot.label}-${dotCountries[0] ?? ''}`;
                    const isSelected   = selected?.key === dotKey;
                    const flatIdx      = flatDots.indexOf(dot);
                    const isActiveTz   = !isSelected && active && (active.key ? true : dotCountries.every(c => dotPositions[c]?.tz !== active.tz));
                    return (
                      <button
                        key={dotKey}
                        type="button"
                        tabIndex={flatIdx === focusedIdx ? 0 : -1}
                        aria-pressed={isSelected}
                        aria-label={`${lt.labels[dot.label] ?? dot.label}${dotCountries.length === 1 ? `, ${dotCountries[0]}` : ''}${isSelected ? ', selected' : ''}`}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors self-start ${isSelected ? 'bg-black/[0.12] dark:bg-white/[0.16]' : 'bg-black/[0.05] dark:bg-white/[0.07] hover:bg-black/[0.1] dark:hover:bg-white/[0.13]'}`}
                        style={{ opacity: isActiveTz ? 0.2 : 1, transition: 'opacity 200ms ease' }}
                        onFocus={() => setFocusedIdx(flatIdx)}
                        onPointerEnter={(e) => { if (e.pointerType !== 'touch') setHovered({ tz: primaryTz, country: dotCountries[0] ?? null }); }}
                        onPointerLeave={(e) => { if (e.pointerType !== 'touch') setHovered(null); }}
                        onPointerDown={(e) => { e.stopPropagation(); setHovered(null); setSelected(prev => prev?.key === dotKey ? null : { tz: primaryTz, countries: dotCountries, label: dot.label, key: dotKey }); }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: dot.color, flexShrink: 0 }} aria-hidden="true" />
                        <span className="text-label-s font-medium leading-[1.2] text-fg-muted whitespace-nowrap">{lt.labels[dot.label] ?? dot.label}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* md+: grid / desktop flex */}
        <div className="hidden md:grid grid-cols-2 gap-x-10 gap-y-6 lg:flex lg:gap-y-0">
          {legendGroups.map((col) => (
            <div key={col.group} className="flex flex-col gap-2">
              <p className="text-overline-s font-medium leading-[1.4] uppercase tracking-wider text-fg-muted mb-1" aria-hidden="true">{lt.headings[col.group]}</p>
              {teamDots.filter(d => d.group === col.group).map((dot) => {
                const dotCountries = Array.isArray(dot.countries) ? dot.countries : dot.country ? [dot.country] : [];
                const primaryTz    = dotPositions[dotCountries[0]]?.tz ?? null;
                const active       = hovered ?? selected;
                const dotKey       = `${dot.label}-${dotCountries[0] ?? ''}`;
                const isSelected   = selected?.key === dotKey;
                const flatIdx      = flatDots.indexOf(dot);
                const isActiveTz   = active && dotCountries.every(c => dotPositions[c]?.tz !== active.tz) && !isSelected;
                return (
                  <button
                    key={dotKey}
                    type="button"
                    tabIndex={flatIdx === focusedIdx ? 0 : -1}
                    aria-pressed={isSelected}
                    aria-label={`${lt.labels[dot.label] ?? dot.label}${dotCountries.length === 1 ? `, ${dotCountries[0]}` : ''}${isSelected ? ', selected' : ''}`}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors self-start ${
                      isSelected
                        ? 'bg-black/[0.12] dark:bg-white/[0.16]'
                        : 'bg-black/[0.05] dark:bg-white/[0.07] hover:bg-black/[0.1] dark:hover:bg-white/[0.13]'
                    }`}
                    style={{ opacity: isActiveTz ? 0.2 : 1, transition: 'opacity 200ms ease' }}
                    onFocus={() => setFocusedIdx(flatIdx)}
                    onPointerEnter={(e) => { if (e.pointerType !== 'touch') setHovered({ tz: primaryTz, country: dotCountries[0] ?? null }); }}
                    onPointerLeave={(e) => { if (e.pointerType !== 'touch') setHovered(null); }}
                    onPointerDown={(e) => { e.stopPropagation(); setHovered(null); setSelected(prev => prev?.key === dotKey ? null : { tz: primaryTz, countries: dotCountries, label: dot.label, key: dotKey }); }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: dot.color, flexShrink: 0 }} aria-hidden="true" />
                    <span className="text-[13px] text-fg-muted whitespace-nowrap">{lt.labels[dot.label] ?? dot.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
