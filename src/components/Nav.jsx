import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import imgChevronBlack from '../assets/icons/icon-chevron-down-sm.svg';
import imgChevronWhite from '../assets/icons/icon-chevron-down-sm-white.svg';
import imgChevronDown  from '../assets/icons/icon-chevron-down.svg';
import imgSunIcon      from '../assets/icons/icon-sun.svg';
import imgMoonIcon     from '../assets/icons/icon-moon.svg';
import imgLogo         from '../assets/logos/site/logo.svg';
import imgFlagGB       from '../assets/icons/icon-flag-gb.svg';
import imgFlagFR       from '../assets/icons/icon-flag-fr.svg';
import imgLockIcon     from '../assets/icons/icon-lock-sm.svg';
import imgArrowRight   from '../assets/icons/icon-arrow-right-accent.svg';
import imgLinkedIn     from '../assets/icons/icon-linkedin.svg';
import { trackEvent }  from '../analytics';
import imgPortrait     from '../assets/photos/portrait.webp';
// Case-study mini-card art (mirrors the homepage case-study cards). Canap uses
// an animated poster grid on the homepage; a static home screen stands in here.
import imgCardSales    from '../assets/photos/photo-cgi-interactive-platform.webp';
import imgCardXR       from '../assets/photos/photo-xr-experiences.webp';
import imgCardTwin     from '../assets/photos/photo-digital-twins.webp';
import { CanapCardBackdrop } from './CanapCardBackdrop';
import { POSTER_PATHS, POSTER_BASE } from '../data/canapPosters';

// Translations
const T = {
  en: {
    projects:          'case studies',
    'digital twin':    'digital twin',
    'sales platform':  'web app',
    'extended reality':'extended reality',
    'iphone app':      'iPhone app',
    holograms:         'holograms',
    résumé:            'résumé',
    'résumé nav':      'résumé',
    "let's talk":      "let's talk",
    home:              'home',
    'dark mode':       'dark mode',
    'back to top':     'back to top',
    'go home':         'go home',
    'tip projects':    'browse case studies',
    'tip resume':      'interactive CV',
    'tip talk':        'contact details',
  },
  fr: {
    projects:          'études de cas',
    'digital twin':    'digital twin',
    'sales platform':  'application web',
    'extended reality':'réalité étendue',
    'iphone app':      'app iPhone',
    holograms:         'hologrammes',
    résumé:            'CV interactif',
    // Desktop/tablet main menu shows the short "CV" so the FR nav width matches
    // the EN nav (the long "CV interactif" stays on mobile + the tooltip).
    'résumé nav':      'CV',
    "let's talk":      'coordonnées',
    home:              'accueil',
    'dark mode':       'mode sombre',
    'back to top':     'retour en haut',
    'go home':         "aller à l'accueil",
    'tip projects':    'parcourir les études de cas',
    'tip resume':      'CV interactif',
    'tip talk':        'échangeons',
  },
};

// Flags, local exports, fixed container so nav width never shifts
function Flag({ code }) {
  return (
    <div className="shrink-0 rounded-radius-2 overflow-hidden" style={{ width: 24, height: 24, minWidth: 24 }}>
      <img
        src={code === 'gb' ? imgFlagGB : imgFlagFR}
        alt={`${code.toUpperCase()} flag`}
        width={24}
        height={24}
        className="block"
      />
    </div>
  );
}

function Chevron({ isOpen, isDark }) {
  const useWhite = isDark !== isOpen;
  return (
    <img
      src={useWhite ? imgChevronWhite : imgChevronBlack}
      alt=""
      width={16}
      height={16}
      className="shrink-0 transition-transform duration-200"
      style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
    />
  );
}

function usePortalPosition(anchorRef, { offsetTop = 11, align = 'left', offsetX = 0 } = {}) {
  const [style, setStyle] = useState({ visibility: 'hidden', position: 'fixed' });
  useLayoutEffect(() => {
    const update = () => {
      if (!anchorRef.current) return;
      const r = anchorRef.current.getBoundingClientRect();
      const base = { position: 'fixed', top: r.bottom + offsetTop, visibility: 'visible', zIndex: 200 };
      if (align === 'right') {
        setStyle({ ...base, right: window.innerWidth - r.right });
      } else if (align === 'center') {
        setStyle({ ...base, left: r.left + r.width / 2, transform: 'translateX(-50%)' });
      } else if (align === 'viewport') {
        // Centre on the viewport — used by wide dropdowns so they always fit
        // (and stay gutter-padded) regardless of the anchor's position.
        setStyle({ ...base, left: '50%', transform: 'translateX(-50%)' });
      } else {
        setStyle({ ...base, left: r.left + offsetX });
      }
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => { window.removeEventListener('resize', update); window.removeEventListener('scroll', update, true); };
  }, [anchorRef, offsetTop, align, offsetX]);
  return style;
}

function Tooltip({ label, isDark, offset = 8, shortcut }) {
  const bg  = isDark ? '#f6f6f6' : '#1f1f1f';
  const txt = isDark ? '#1f1f1f' : '#f6f6f6';
  return (
    <div style={{ top: `calc(100% + ${offset}px)` }} className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
<div style={{ background: bg, color: txt }} className={`relative z-0 text-tooltip font-light leading-[1.2] pl-2 ${shortcut ? 'pr-[4px]' : 'pr-2'} py-[4px] rounded-radius-2 whitespace-nowrap ring-1 ring-tooltip-ring flex items-center gap-2`}>
        {label}
        {shortcut && <kbd className="text-tooltip-kbd font-medium w-[18px] h-[18px] flex items-center justify-center rounded-[6px] border border-tooltip-keyboard-shortcut-border text-tooltip-keyboard-shortcut-fg not-italic">{shortcut}</kbd>}
      </div>
    </div>
  );
}

function useDelayedTooltip(delay = 600) {
  const [visible, setVisible] = useState(false);
  const timer = useRef(null);
  const show = (guard) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (typeof guard === 'function' && !guard()) return;
      setVisible(true);
    }, delay);
  };
  const hide = () => { clearTimeout(timer.current); setVisible(false); };
  useEffect(() => () => clearTimeout(timer.current), []);
  return [visible, show, hide];
}

const Knob = ({ pressed }) => (
  <div className="relative shrink-0 flex items-center justify-center" style={{ width: 26, height: 26 }}>
    <div
      aria-hidden="true"
      className="absolute inset-0 rounded-full"
      style={{
        background: 'rgba(128,128,128,0.33)',
        transform: pressed ? 'scale(1.7)' : 'scale(1)',
        transition: pressed ? 'transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 300ms ease-out',
      }}
    />
    <div
      className="absolute inset-0 rounded-full bg-white"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.30),0 0 0 0.5px rgba(0,0,0,0.08)' }}
    />
  </div>
);

function DarkModeToggle({ isDark, onToggle, lang = 'en', noTooltip = false }) {
  const buttonRef = useRef(null);
  const [hovered, setHovered]           = useState(false);
  const [pressed, setPressed]           = useState(false);
  const [tooltipVisible, showTip, hideTip] = useDelayedTooltip(600);
  const suppressRef = useRef(false);
  const suppressTimer = useRef(null);
  // Safari fires spurious mouseenter on re-render / focus regain — verify via :hover at fire time.
  const tryShowTip = () => showTip(() => buttonRef.current?.matches(':hover'));

  const suppress = () => {
    hideTip();
    suppressRef.current = true;
    clearTimeout(suppressTimer.current);
    suppressTimer.current = setTimeout(() => { suppressRef.current = false; }, 800);
  };

  useEffect(() => { suppress(); }, [isDark]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = () => { suppress(); onToggle(); };

  const bgStyle = isDark
    ? { background: hovered ? '#383838' : '#404040' }
    : hovered
      ? { backgroundImage: 'linear-gradient(rgba(0,0,0,0.32),rgba(0,0,0,0.32)),linear-gradient(rgba(0,0,0,0.16),rgba(0,0,0,0.16))' }
      : { backgroundImage: 'linear-gradient(rgba(0,0,0,0.32),rgba(0,0,0,0.32)),linear-gradient(rgba(255,255,255,0.32),rgba(255,255,255,0.32))' };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => { setPressed(false); hideTip(); }}
        onClick={handleClick}
        onMouseEnter={() => { setHovered(true);  if (!noTooltip && !suppressRef.current) tryShowTip(); }}
        onMouseLeave={() => { setHovered(false); hideTip(); }}
        onBlur={() => { setHovered(false); hideTip(); }}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="relative flex items-center h-8 w-[51px] rounded-radius-4 cursor-pointer transition-colors"
        style={{ padding: isDark ? '3px 3px 3px 4px' : '3px 4px 3px 3px', gap:2, ...bgStyle }}
      >
        {isDark ? (
          <>
            <img src={imgMoonIcon} alt="" width={16} height={16} className="shrink-0" />
            <Knob pressed={pressed} />
          </>
        ) : (
          <>
            <Knob pressed={pressed} />
            <img src={imgSunIcon} alt="" width={16} height={16} className="shrink-0" />
          </>
        )}
      </button>
      {!noTooltip && <div className={`pointer-events-none transition-opacity duration-200 ${tooltipVisible ? 'opacity-100' : 'opacity-0 invisible'}`}><Tooltip label={T[lang]['dark mode'] ?? 'dark mode'} isDark={isDark} offset={10} shortcut="D" /></div>}
    </div>
  );
}

// StableLabel — keeps a menu slot the same width in EN and FR by reserving the
// wider language's label as real (invisible) text stacked under the visible one.
// Because the reservation is text in rem/em, it scales with the user's font size
// and zoom — unlike a fixed min-width it can never clip when text is enlarged
// (keeps WCAG 1.4.4 Resize Text / 1.4.10 Reflow intact). The visible label is
// the only one exposed to assistive tech; the sizer copy is aria-hidden.
function StableLabel({ en, fr, lang }) {
  return (
    <span className="inline-grid justify-items-center">
      <span aria-hidden={lang !== 'en'} className={`[grid-area:1/1] whitespace-nowrap ${lang !== 'en' ? 'invisible' : ''}`}>{en}</span>
      <span aria-hidden={lang !== 'fr'} className={`[grid-area:1/1] whitespace-nowrap ${lang !== 'fr' ? 'invisible' : ''}`}>{fr}</span>
    </span>
  );
}

function ProjectsButton({ isOpen, onClick, isDark, lang }) {
  const [tooltipVisible, showTip, hideTip] = useDelayedTooltip(600);
  return (
    <div className="relative">
      <button
        data-spring
        onClick={() => { hideTip(); onClick(); }}
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'projects-menu' : undefined}
        aria-label={isOpen ? `Close ${T[lang].projects} menu` : `Open ${T[lang].projects} menu`}
        className={`flex items-center justify-center gap-2 h-8 px-3 rounded-radius-3 cursor-pointer active:opacity-[0.33] transition-colors ${
          isOpen ? 'bg-nav-active-bg-solid' : 'hover:bg-nav-hover-bg'
        }`}
      >
        <span className={`font-medium text-base leading-6 whitespace-nowrap ${isOpen ? 'text-fg-primary-inverse' : 'text-fg-primary'}`}>
          <StableLabel en={T.en.projects} fr={T.fr.projects} lang={lang} />
        </span>
        <Chevron isOpen={isOpen} isDark={isDark} />
      </button>
      {tooltipVisible && !isOpen && <Tooltip label={T[lang]['tip projects']} isDark={isDark} offset={10} shortcut="P" />}
    </div>
  );
}

// ProjectsDropdown — mini case-study cards (desktop + tablet), mirroring the
// homepage case-study cards (image + status dot + title). Width is capped to the
// smallest tablet nav width (sm = 640px) minus the nav's px-4 gutters (608px);
// the four cards split that width minus the gaps via a 4-col grid. Centred on
// the viewport so it always fits and stays gutter-padded.
function ProjectsDropdown({ onClose, lang, dropdownRef, anchorRef }) {
  const portalStyle = usePortalPosition(anchorRef, { offsetTop: 11, align: 'viewport' });
  const items = [
    { key: 'sales platform',   to: '/case-study/web-app', img: imgCardSales },
    { key: 'extended reality', to: '/case-study/extended-reality',             img: imgCardXR,    tone: 'shipped' },
    { key: 'digital twin',     to: '/case-study/digital-twin',   img: imgCardTwin,  tone: 'shipped', protected: true },
    { key: 'iphone app',       to: '/case-study/iphone-app',          customBg: 'canap-poster-grid' },
  ];

  useEffect(() => {
    const id = setTimeout(() => {
      dropdownRef.current?.querySelector('[role="menuitem"]:not([aria-disabled="true"])')?.focus();
    }, 0);
    return () => clearTimeout(id);
  }, [dropdownRef]);

  // Card face — image, bottom gradient for legibility, status dot, title; a lock
  // glyph for the restricted (no-link) card.
  const cardFace = (img, labelKey, locked, customBg) => (
    <>
      {customBg === 'canap-poster-grid' ? (
        // Same tilted, counter-scrolling poster wall the homepage Canap card
        // uses, with tighter gaps + smaller radii to suit the ~142px mini card.
        <CanapCardBackdrop posterGap="gap-1" posterRadius="rounded-[6px]" rowGap="gap-1" posterSize="w92" />
      ) : (
        <img src={img} alt="" draggable="false" className="absolute inset-0 w-full h-full object-cover" />
      )}
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
      {locked && (
        <>
          {/* Dimming layer marks the card as restricted (non-interactive). */}
          <span aria-hidden="true" className="absolute inset-0 bg-black/55" />
          <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
            <img src={imgLockIcon} alt="" width={18} height={18} className="brightness-0 invert opacity-90" />
          </span>
        </>
      )}
      <span className="absolute inset-x-0 bottom-0 p-2 flex items-center gap-1 text-xs font-semibold leading-tight text-white">
        {T[lang][labelKey]}
      </span>
    </>
  );

  return createPortal(
    <div
      id="projects-menu"
      role="menu"
      aria-label={lang === 'fr' ? 'Études de cas' : 'Case studies'}
      ref={dropdownRef}
      style={portalStyle}
      onBlur={(e) => {
        // On some browsers (notably Safari/macOS) a mouse click on a <button>
        // doesn't move focus to it, so relatedTarget is null/ambiguous here —
        // closing in that case races the trigger button's own click-to-toggle
        // handler (blur-close fires first, then the toggle flips it back
        // open). Defer to the mousedown outside-click handler instead when
        // relatedTarget can't tell us where focus actually went.
        if (!e.relatedTarget) return;
        if (!e.currentTarget.contains(e.relatedTarget) && !anchorRef?.current?.contains(e.relatedTarget)) onClose();
      }}
      className="w-[608px] max-w-[calc(100vw-2rem)] backdrop-blur-3 bg-nav-bg ring-1 ring-nav-ring rounded-radius-5 shadow-s p-2"
    >
      <div role="none" className="grid grid-cols-4 gap-2">
        {items.map(({ key, to, img, customBg }, index) => (
          to ? (
            <Link
              key={key}
              data-spring-desktop
              data-squircle
              to={to}
              onClick={onClose}
              role="menuitem"
              aria-label={T[lang][key]}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  e.preventDefault(); onClose(); anchorRef?.current?.querySelector('button')?.focus();
                } else if (e.key === 'Tab' && !e.shiftKey && index === items.length - 1) {
                  // Last card — the panel is a portal appended at the end of
                  // <body>, so a plain Tab would otherwise fall through to
                  // whatever's last in raw DOM order instead of the nav item
                  // that visually follows the trigger button.
                  e.preventDefault();
                  onClose();
                  anchorRef?.current?.nextElementSibling?.querySelector('a, button, [tabindex]')?.focus();
                } else if (e.key === 'Tab' && e.shiftKey && index === 0) {
                  e.preventDefault();
                  onClose();
                  anchorRef?.current?.querySelector('button')?.focus();
                }
              }}
              className="group relative aspect-[4/5] rounded-radius-3 overflow-hidden select-none motion-safe:hover:scale-[1.03] motion-safe:focus-visible:scale-[1.03] motion-safe:transition-transform duration-200 focus-visible:outline-none"
            >
              {cardFace(img, key, false, customBg)}
              <span aria-hidden="true" className="absolute inset-0 rounded-radius-3 ring-2 ring-inset ring-cta-500/0 group-hover:ring-cta-500 group-focus-visible:ring-cta-500 transition-[box-shadow] duration-150" />
            </Link>
          ) : (
            <div
              key={key}
              role="menuitem"
              aria-disabled="true"
              aria-label={T[lang][key]}
              data-squircle
              className="relative aspect-[4/5] rounded-radius-3 overflow-hidden cursor-default select-none opacity-50"
            >
              {cardFace(img, key, true, customBg)}
            </div>
          )
        ))}
      </div>
    </div>,
    document.body
  );
}

function LanguageDropdown({ lang, toggleLang, onClose, dropdownRef, anchorRef }) {
  const portalStyle = usePortalPosition(anchorRef, { offsetTop: 11, align: 'center' });
  const other = lang === 'en' ? 'fr' : 'en';
  const handleSelect = () => { toggleLang(); onClose(); };

  useEffect(() => {
    const id = setTimeout(() => {
      dropdownRef.current?.querySelector('[role="menuitem"]')?.focus();
    }, 0);
    return () => clearTimeout(id);
  }, [dropdownRef]);

  return createPortal(
    <div
      id="language-menu"
      role="menu"
      aria-label={lang === 'en' ? 'Language selection' : 'Sélection de la langue'}
      ref={dropdownRef}
      style={portalStyle}
      className="backdrop-blur-3 bg-nav-bg border border-glass-default rounded-radius-4 overflow-hidden shadow-s"
    >
      <ul role="none" className="p-2">
        <li role="none">
          <button
            role="menuitem"
            tabIndex={0}
            onClick={handleSelect}
            onKeyDown={(e) => {
              if (e.key === 'Escape') { e.preventDefault(); onClose(); anchorRef?.current?.querySelector('button')?.focus(); }
              else if (e.key === 'Tab') { onClose(); }
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-radius-3 hover:bg-nav-hover-bg cursor-pointer transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus"
          >
            <Flag code={other === 'en' ? 'gb' : 'fr'} />
            <span className="font-semibold text-base leading-6 text-fg-primary">{other === 'en' ? 'GB' : 'FR'}</span>
          </button>
        </li>
      </ul>
    </div>,
    document.body
  );
}

function LanguageButton({ lang, toggleLang, isDark }) {
  const [tooltipVisible, showTip, hideTip] = useDelayedTooltip(600);
  const containerRef = useRef(null);
  const flagCode = lang === 'en' ? 'gb' : 'fr';
  const label    = lang === 'en' ? 'GB' : 'FR';

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => { hideTip(); toggleLang(); }}
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
        data-spring
        aria-label={`${label}, change language`}
        className="flex items-center gap-2 h-8 px-3 rounded-radius-3 cursor-pointer active:opacity-[0.33] transition-colors hover:bg-nav-hover-bg"
      >
        <Flag code={flagCode} />
        <span className="font-medium text-base leading-6 whitespace-nowrap text-fg-primary">
          {label}
        </span>
      </button>
      {tooltipVisible && <Tooltip label={lang === 'fr' ? 'lire en anglais' : 'read in french'} isDark={isDark} offset={10} shortcut="L" />}
    </div>
  );
}

function NavLink({ to, label, labelEn, labelFr, lang, currentPage, tooltip, shortcut, isDark }) {
  const [path, hash] = to.split('#');
  const isActive = currentPage === path && !hash;
  const [tooltipVisible, showTip, hideTip] = useDelayedTooltip(600);
  const handleClick = (e) => {
    hideTip();
    if (hash) {
      const el = document.getElementById(hash);
      const useFallback = !el && !!document.getElementById('footer-contact');
      const target = el || (useFallback ? document.getElementById('footer-contact') : null);
      if (target) {
        e.preventDefault();
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (useFallback) {
          window.scrollTo({ top: Number.MAX_SAFE_INTEGER, behavior: reduced ? 'instant' : 'smooth' });
        } else {
          target.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' });
        }
        return;
      }
    }
    if (currentPage === path && !hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <li className="relative">
      <Link
        to={to}
        tabIndex={0}
        data-spring
        onClick={handleClick}
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
        className={`flex items-center justify-center h-8 px-4 rounded-radius-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
          isActive
            ? 'bg-nav-active-bg-solid'
            : 'active:opacity-[0.33] hover:bg-nav-hover-bg'
        }`}
      >
        <span className={`font-medium text-base leading-6 whitespace-nowrap ${isActive ? 'text-fg-primary-inverse' : 'text-fg-primary'}`}>
          {labelEn && labelFr ? (lang === 'fr' ? labelFr : labelEn) : label}
        </span>
      </Link>
      {tooltipVisible && tooltip && <Tooltip label={tooltip} isDark={isDark} offset={10} shortcut={shortcut} />}
    </li>
  );
}

function ContactModal({ lang, onClose }) {
  const closeRef = useRef(null);
  const u = 'd', d = 'AtelierDigital.co.uk';
  const liHref = () => ['https://www.link','edin.com','/in/','dav','idvi','all','ard'].join('');
  const subject = lang === 'fr' ? 'Prise de contact' : 'Getting in touch';

  const [copied, setCopied] = useState(false);

  useEffect(() => { closeRef.current?.focus({ preventScroll: true }); }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Inverted: dark card in light mode, light card in dark mode
  const lbl = 'text-overline-s font-medium leading-[1.4] uppercase tracking-wider text-fg-muted-inverse mb-1';
  const val = 'text-copy-s font-normal leading-relaxed text-fg-primary-inverse';
  const row = 'group block -mx-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus';
  const rowInner = 'mx-2 my-1 px-5 py-3 rounded-radius-3 transition-colors group-hover:bg-modal-copy-btn-hover-bg';
  const rowInnerProps = { 'data-squircle': '' };

  return createPortal(
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-[600] bg-modal-scrim backdrop-blur-1"
        style={{ animation: 'fade-in 0.2s ease both' }}
      />
      {/* Centering wrapper — flex centering is more reliable than top/left/transform */}
      <div className="fixed inset-0 z-[601] flex items-center justify-center pointer-events-none px-4">
        <div role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" className="pointer-events-auto w-full max-w-[380px] relative">
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label={lang === 'fr' ? 'Fermer' : 'Close'}
            data-spring
          className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full text-fg-primary-inverse hover:bg-bg-surface hover:text-fg-primary active:opacity-[0.33] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus cursor-pointer"
          style={{ animation: 'fade-in 0.3s ease 0.25s both' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <div
            className="bg-tooltip-bg rounded-radius-7 shadow-l px-6 pt-6 pb-6"
            style={{ animation: 'modal-card-in 0.35s cubic-bezier(0.22,1,0.36,1) both' }}
          >
        <div className="flex items-center gap-3 mb-5">
          <img
            src={imgPortrait}
            alt="David V."
            width={48}
            height={48}
            className="rounded-full shrink-0 object-cover"
            style={{ width: 48, height: 48 }}
          />
          <div>
            <h1 id="contact-modal-title" className="text-h3 font-semibold text-fg-primary-inverse leading-snug">
              David V.
            </h1>
            <p className="text-subheading font-medium leading-snug text-fg-muted-inverse">
              {lang === 'fr' ? 'Designer produit senior' : 'Senior Product Designer'}
            </p>
          </div>
        </div>

        <div className="h-px bg-border-subtle-inverted -mx-6" />

        <ul>
          <li className="border-b border-border-subtle-inverted">
            <a data-spring href={`mailto:${u}@${d}?subject=${encodeURIComponent(subject)}`} onClick={() => trackEvent('contact_email_click')} className={row}>
              <div {...rowInnerProps} className={`${rowInner} flex items-center justify-between gap-3`}>
                <div className="min-w-0">
                  <h2 className={lbl}>{lang === 'fr' ? 'E-mail' : 'Email'}</h2>
                  <p className={`${val} flex items-center gap-2`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="shrink-0">
                      <path d="M1 4.5A1.5 1.5 0 0 1 2.5 3h11A1.5 1.5 0 0 1 15 4.5v.97l-7 4.375L1 5.47V4.5Z"/>
                      <path d="M1 6.72v4.78A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.72l-6.647 4.154a.75.75 0 0 1-.806 0L1 6.72Z"/>
                    </svg>
                    <span className="obf-email" data-u={u} data-d={d} aria-hidden="true" />
                  </p>
                  <span className="sr-only">d@AtelierDigital.co.uk</span>
                </div>
                <button
                  data-spring
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigator.clipboard.writeText(`${u}@${d}`); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  aria-label={lang === 'fr' ? "Copier l'adresse e-mail" : 'Copy email address'}
                  className="flex items-center gap-2 px-3 h-7 rounded-full border border-inverted-subtle hover:border-transparent text-chip-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus bg-inverted-subtle hover:bg-fg-primary-inverse shrink-0 text-fg-primary-inverse hover:text-fg-primary"
                >
                  {copied ? (
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2.5 7l3.5 3.5 5.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <rect x="4.5" y="0.5" width="9" height="10" rx="1.5" stroke="currentColor"/>
                      <rect x="0.5" y="3.5" width="9" height="10" rx="1.5" fill="currentColor" fillOpacity="0.12" stroke="currentColor"/>
                    </svg>
                  )}
                  {copied ? (lang === 'fr' ? 'Copié !' : 'Copied!') : (lang === 'fr' ? 'Copier' : 'Copy')}
                </button>
              </div>
            </a>
          </li>
          <li className="border-b border-border-subtle-inverted">
            <button
              data-spring
              onClick={() => { trackEvent('contact_linkedin_click'); window.open(liHref(), '_blank', 'noopener,noreferrer'); }}
              className="group -ml-6 w-[calc(100%+3rem)] text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus"
            >
              <div {...rowInnerProps} className={rowInner}>
                <h2 className={lbl}>LinkedIn</h2>
                <p className={`${val} flex items-center gap-2`}>
                  <img src={imgLinkedIn} alt="" width={16} height={16} className="invert dark:invert-0 shrink-0" />
                  David V.
                </p>
              </div>
            </button>
          </li>
          <li>
            <a
              data-spring
              href="https://maps.google.com/?q=55.9527025,-3.2038472"
              target="_blank"
              rel="noopener noreferrer"
              className={row}
            >
              <div {...rowInnerProps} className={rowInner}>
                <h2 className={lbl}>{lang === 'fr' ? 'Localisation' : 'Location'}</h2>
                <p className={val}>
                  🏴󠁧󠁢󠁳󠁣󠁴󠁿 {lang === 'fr' ? 'Édimbourg, Royaume-Uni' : 'Edinburgh, United Kingdom'}
                </p>
              </div>
            </a>
          </li>
        </ul>

        <div className="pt-4">
          <a
            data-spring
            data-squircle
            href="/david-v.vcf"
            download="david-v.vcf"
            onClick={() => trackEvent('vcard_download')}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-radius-4 border border-border-subtle-inverted text-fg-primary-inverse font-medium text-label-s leading-[1.2] hover:bg-fg-primary-inverse hover:text-tooltip-bg hover:border-fg-primary-inverse active:opacity-[0.33] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 2v8M5 7l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {lang === 'fr' ? 'Enregistrer le contact' : 'Save contact'}
          </a>
        </div>

          </div>{/* end dialog */}
        </div>{/* end card wrapper */}
      </div>{/* end centering wrapper */}
    </>,
    document.body
  );
}

// LetsTalkButton — opens contact modal instead of scrolling
function LetsTalkButton({ lang, isDark, onOpen }) {
  const [tooltipVisible, showTip, hideTip] = useDelayedTooltip(600);
  return (
    <li className="relative">
      <button
        data-spring
        onClick={() => { hideTip(); onOpen(); }}
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
        className="flex items-center justify-center h-8 px-4 rounded-radius-3 transition-colors active:opacity-[0.33] hover:bg-nav-hover-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus cursor-pointer"
      >
        <span className="font-medium text-base leading-6 whitespace-nowrap text-fg-primary">
          {T[lang]["let's talk"]}
        </span>
      </button>
      {tooltipVisible && <Tooltip label={T[lang]['tip talk']} isDark={isDark} offset={10} shortcut="T" />}
    </li>
  );
}

function DesktopTabletNav({ isDark, toggleDark, lang, toggleLang, isTablet, onContactOpen, navVisible = true }) {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [langOpen,     setLangOpen]     = useState(false);

  // When the main nav slides away on scroll-down, close any open dropdown so it
  // doesn't linger detached over the page (it's a portal, not a nav child).
  useEffect(() => {
    if (!navVisible) { setProjectsOpen(false); setLangOpen(false); }
  }, [navVisible]);
  const location  = useLocation();
  const navigate  = useNavigate();
  const currentPage = location.pathname;
  const [logoTipVisible, showLogoTip, hideLogoTip] = useDelayedTooltip(600);
  const navRef              = useRef(null);
  const projectsBtnRef      = useRef(null);
  const projectsDropdownRef = useRef(null);
  const langDropdownRef     = useRef(null);

  const openProjectsDropdown = () => {
    setProjectsOpen(p => !p);
    setLangOpen(false);
  };

  useEffect(() => {
    const handler = (e) => {
      const inNav              = navRef.current?.contains(e.target);
      const inProjectsBtn      = projectsBtnRef.current?.contains(e.target);
      const inProjectsDropdown = projectsDropdownRef.current?.contains(e.target);
      const inLangDropdown     = langDropdownRef.current?.contains(e.target);
      // Case-study dropdown closes on any press that isn't its own button or
      // panel — so pressing another main-nav button (or clicking outside)
      // dismisses it.
      if (!inProjectsBtn && !inProjectsDropdown) setProjectsOpen(false);
      // Language dropdown closes on any press outside the nav or its panel.
      if (!inNav && !inLangDropdown) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);


  const handleLogoClick = (e) => {
    e.preventDefault();
    if (currentPage === '/') { window.scrollTo({ top:0, behavior:'smooth' }); }
    else { navigate('/'); }
  };

  return (
    <nav
      ref={navRef}
      className="flex items-center pr-2 backdrop-blur-1 bg-nav-bg rounded-radius-6 shadow-xs ring-1 ring-nav-ring"
      style={{ gap: isTablet ? '32px' : '192px' }}
    >
      <div className="relative">
        <a
          data-spring
          href="/"
          tabIndex={0}
          onClick={handleLogoClick}
          aria-label="Atelier Digital, back to top"
          onMouseEnter={showLogoTip}
          onMouseLeave={hideLogoTip}
          className="flex items-center p-2 rounded-radius-6 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <div className="flex items-center gap-1 py-1 pl-1 pr-3 rounded-radius-5 group-hover:bg-nav-hover-bg transition-colors">
            <img src={imgLogo} alt="" width={24} height={24} className="shrink-0" />
            <span className="font-bold text-base leading-4 text-fg-primary whitespace-nowrap" style={{ letterSpacing:'-0.8px' }}>
              ATELIER DIGITAL
            </span>
          </div>
        </a>
        {logoTipVisible && <Tooltip label={currentPage === '/' ? T[lang]['back to top'] : T[lang]['go home']} isDark={isDark} offset={2} shortcut="H" />}
      </div>

      <ol className={`flex items-center ${isTablet ? 'gap-2' : 'gap-4'}`}>
        <li className="relative" ref={projectsBtnRef}>
          <ProjectsButton isOpen={projectsOpen} onClick={openProjectsDropdown} isDark={isDark} lang={lang} />
          {projectsOpen && (
            <ProjectsDropdown onClose={() => setProjectsOpen(false)} lang={lang} dropdownRef={projectsDropdownRef} anchorRef={projectsBtnRef} />
          )}
        </li>

        <NavLink to="/resume"         labelEn={T.en['résumé nav']} labelFr={T.fr['résumé nav']} lang={lang} currentPage={currentPage} tooltip={currentPage === '/resume' ? T[lang]['back to top'] : T[lang]['tip resume']} shortcut="R" isDark={isDark} />
        <LetsTalkButton lang={lang} isDark={isDark} onOpen={onContactOpen} />

        <li className="relative flex items-center gap-2">
          <div aria-hidden="true" className="w-px h-4 bg-nav-divider shrink-0" />
          <LanguageButton lang={lang} toggleLang={toggleLang} isDark={isDark} />
        </li>

        <li><DarkModeToggle isDark={isDark} onToggle={toggleDark} lang={lang} /></li>
      </ol>
    </nav>
  );
}

function MobileNav({ isDark, toggleDark, lang, toggleLang, onContactOpen }) {
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(true);
  const location  = useLocation();
  const navigate  = useNavigate();
  const currentPage = location.pathname;

  const handleLogoClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (currentPage === '/') { window.scrollTo({ top:0, behavior:'smooth' }); }
    else { navigate('/'); }
  };

  const mobilePages = [
    { key: 'projects',   to: null       },
    { key: 'résumé',     to: '/resume'  },
    { key: "let's talk", modal: true    },
  ];

  const subItems = [
    { key: 'sales platform',   to: '/case-study/web-app', locked: false },
    { key: 'extended reality', to: '/case-study/extended-reality',             locked: false },
    { key: 'digital twin',     to: '/case-study/digital-twin',   locked: false, protected: true },
    { key: 'iphone app',       to: '/case-study/iphone-app',          locked: false },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full flex items-center backdrop-blur-1 bg-nav-bg rounded-radius-6 shadow-xs ring-1 ring-nav-ring">
        <a data-spring href="/" tabIndex={0} onClick={handleLogoClick} aria-label="Atelier Digital, back to top" className="flex items-center p-1 rounded-radius-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus">
          <div className="flex items-center gap-1 pl-1 pr-4 py-1 rounded-radius-5">
            <img src={imgLogo} alt="" width={36} height={36} className="shrink-0" />
            <span className="font-bold text-base text-fg-primary whitespace-nowrap leading-4" style={{ letterSpacing:'-0.8px' }}>
              ATELIER DIGITAL
            </span>
          </div>
        </a>
        <button onClick={() => { const opening = !menuOpen; setMenuOpen(opening); if (opening) setProjectsOpen(true); }} aria-label={menuOpen ? 'Close menu' : 'Open menu'} className="flex-1 flex items-center justify-end p-2 pr-3 rounded-r-[24px]">
          <span data-spring className="relative flex items-center justify-center w-8 h-8 shrink-0">
            <span
              aria-hidden="true"
              className="absolute w-[26.8px] h-[3.5px] rounded-full bg-fg-primary transition-transform duration-300 ease-in-out"
              style={{ transform: menuOpen ? 'translateY(0) rotate(45deg)' : 'translateY(-6.25px) rotate(0deg)' }}
            />
            <span
              aria-hidden="true"
              className="absolute w-[26.8px] h-[3.5px] rounded-full bg-fg-primary transition-transform duration-300 ease-in-out"
              style={{ transform: menuOpen ? 'translateY(0) rotate(-45deg)' : 'translateY(6.25px) rotate(0deg)' }}
            />
          </span>
        </button>
      </div>

      {menuOpen && createPortal(
        <div aria-hidden="true" className="fixed inset-0 z-[499] bg-bg-glass-default animate-[fade-in_200ms_ease-out_both]" onClick={() => setMenuOpen(false)} />,
        document.body
      )}

      {menuOpen && (
        <div className="w-full backdrop-blur-2 bg-nav-mobile border border-glass-default rounded-radius-8 overflow-hidden">
          <ol className="flex flex-col gap-2 p-4">
            {mobilePages.map(({ key, to, modal }) => (
              <li key={key}>
                {modal ? (
                  <button
                    onClick={() => { setMenuOpen(false); onContactOpen(); }}
                    className="flex items-center h-12 px-4 rounded-radius-4 transition-colors active:opacity-[0.33] hover:bg-nav-hover-bg w-full text-left cursor-pointer"
                  >
                    <span data-spring className="font-medium text-2xl leading-8 text-fg-primary">
                      {T[lang][key]}
                    </span>
                  </button>
                ) : to ? (
                  <Link
                    to={to}
                    onClick={(e) => {
                      const [p, h] = to.split('#');
                      if (h) {
                        const el = document.getElementById(h) || document.getElementById('footer-contact');
                        if (el) {
                          e.preventDefault();
                          setMenuOpen(false);
                          const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                          el.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' });
                          return;
                        }
                      }
                      setMenuOpen(false);
                      if (currentPage === p && !h) { window.scrollTo({ top: 0, behavior: 'smooth' }); }
                    }}
                    className="flex items-center h-12 px-4 rounded-radius-4 transition-colors active:opacity-[0.33] hover:bg-nav-hover-bg"
                  >
                    <span data-spring className="font-medium text-2xl leading-8 text-fg-primary">
                      {T[lang][key]}
                    </span>
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setProjectsOpen(!projectsOpen)}
                      className="flex items-center justify-start gap-2 w-full h-12 px-4 rounded-radius-4 hover:bg-nav-hover-bg transition-colors active:opacity-[0.33]"
                    >
                      <span data-spring className="flex items-center gap-2">
                        <span className="font-medium text-2xl leading-8 text-fg-primary">{T[lang][key]}</span>
                        <img
                          src={imgChevronDown}
                          alt=""
                          width={24}
                          height={24}
                          className="shrink-0 dark:invert transition-transform duration-200"
                          style={{ transform: projectsOpen ? 'rotate(180deg)' : 'none' }}
                        />
                      </span>
                    </button>
                    {projectsOpen && (
                      <div className="pl-4 pt-2 flex flex-col gap-2">
                        {subItems.map(({ key: sk, to: st, locked, protected: isProtected }) => (
                          locked ? (
                            <div key={sk} className="flex items-center gap-3 h-12 px-4 rounded-radius-4 opacity-[0.32] cursor-default">
                              <img src={imgLockIcon} alt="" width={20} height={20} className="shrink-0 dark:invert" />
                              <span className="font-medium text-2xl leading-8 text-fg-primary">{T[lang][sk]}</span>
                            </div>
                          ) : (
                            <Link
                              key={sk}
                              to={st}
                              onClick={() => { setMenuOpen(false); setProjectsOpen(false); }}
                              className="flex items-center gap-3 h-12 px-4 rounded-radius-4 hover:bg-nav-hover-bg transition-colors"
                            >
                              <span data-spring className="flex items-center gap-3">
                                <img src={imgArrowRight} alt="" width={16} height={16} className="shrink-0" style={{ transform:'none' }} />
                                <span className="font-medium text-2xl leading-8 text-fg-primary">{T[lang][sk]}</span>
                              </span>
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ol>

          <div className="mx-4 h-px bg-nav-divider" />

          <div className="flex items-center justify-around px-6 py-4">
            <button
              data-spring
              onClick={() => { if (lang !== 'en') toggleLang(); }}
              className={`flex items-center gap-2 h-12 px-4 rounded-radius-4 transition-colors active:opacity-[0.33] ${lang !== 'en' ? 'hover:bg-nav-hover-bg cursor-pointer' : 'bg-nav-active-bg-solid cursor-default'}`}
            >
              <Flag code="gb" />
              <span className={`font-medium text-2xl ${lang === 'en' ? 'text-fg-primary-inverse' : 'text-fg-muted'}`}>GB</span>
            </button>
            <button
              data-spring
              onClick={() => { if (lang !== 'fr') toggleLang(); }}
              className={`flex items-center gap-2 h-12 px-4 rounded-radius-4 transition-colors active:opacity-[0.33] ${lang !== 'fr' ? 'hover:bg-nav-hover-bg cursor-pointer' : 'bg-nav-active-bg-solid cursor-default'}`}
            >
              <Flag code="fr" />
              <span className={`font-medium text-2xl ${lang === 'fr' ? 'text-fg-primary-inverse' : 'text-fg-muted'}`}>FR</span>
            </button>
            <DarkModeToggle isDark={isDark} onToggle={toggleDark} lang={lang} noTooltip />
          </div>
        </div>
      )}
    </div>
  );
}

function Nav({ isDark, toggleDark, lang, toggleLang }) {
  const [visible, setVisible] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) return;
    root.inert = contactOpen || false;
    return () => { root.inert = false; };
  }, [contactOpen]);

  useEffect(() => {
    const handler = () => setContactOpen(c => !c);
    window.addEventListener('toggle-contact', handler);
    return () => window.removeEventListener('toggle-contact', handler);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= 0) { setVisible(true); }
      else if (y < lastY.current) { setVisible(true); }
      else if (y > lastY.current + 8) { setVisible(false); }
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Warm the cache for the case-studies dropdown's Canap poster wall so the
  // mini-card images are already loaded by the time the dropdown is opened
  // (the backdrop only mounts on open, so otherwise they'd download then).
  useEffect(() => {
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const base = POSTER_BASE.replace(/\/w\d+$/, '/w92');
    const id = idle(() => { POSTER_PATHS.forEach((p) => { const img = new Image(); img.decoding = 'async'; img.src = `${base}${p}`; }); });
    return () => cancel(id);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[500] flex justify-center pt-4 px-4 pointer-events-none transition-transform duration-300 ease-in-out"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(-120%)' }}
    >
      <div className="pointer-events-auto hidden lg:flex">
        <DesktopTabletNav isDark={isDark} toggleDark={toggleDark} lang={lang} toggleLang={toggleLang} isTablet={false} onContactOpen={() => setContactOpen(true)} navVisible={visible} />
      </div>
      <div className="pointer-events-auto hidden sm:flex lg:hidden">
        <DesktopTabletNav isDark={isDark} toggleDark={toggleDark} lang={lang} toggleLang={toggleLang} isTablet={true} onContactOpen={() => setContactOpen(true)} navVisible={visible} />
      </div>
      <div className="pointer-events-auto flex sm:hidden w-full">
        <MobileNav isDark={isDark} toggleDark={toggleDark} lang={lang} toggleLang={toggleLang} onContactOpen={() => setContactOpen(true)} />
      </div>
      {contactOpen && <ContactModal lang={lang} isDark={isDark} onClose={() => setContactOpen(false)} />}
    </div>
  );
}

export default Nav;
