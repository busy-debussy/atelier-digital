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
import imgHamburger    from '../assets/icons/icon-hamburger.svg';
import imgClose        from '../assets/icons/icon-close.svg';
import imgLinkedIn     from '../assets/icons/icon-linkedin.svg';
import { trackEvent }  from '../analytics';
import imgPortrait     from '../assets/photos/portrait.webp';

// Translations
const T = {
  en: {
    projects:          'case studies',
    'digital twin':    'digital twins',
    'sales platform':  'sales platform',
    'extended reality':'extended reality',
    holograms:         'holograms',
    résumé:            'résumé',
    "let's talk":      "let's talk",
    home:              'home',
    'dark mode':       'dark mode',
    'back to top':     'back to top',
    'go home':         'go home',
    'tip projects':    'browse case studies',
    'tip resume':      'view my CV',
    'tip talk':        'contact details',
  },
  fr: {
    projects:          'études de cas',
    'digital twin':    'digital twins',
    'sales platform':  'plateforme web',
    'extended reality':'réalité étendue',
    holograms:         'hologrammes',
    résumé:            'CV interactif',
    "let's talk":      'coordonnées',
    home:              'accueil',
    'dark mode':       'mode sombre',
    'back to top':     'retour en haut',
    'go home':         "aller à l'accueil",
    'tip projects':    'parcourir les études de cas',
    'tip resume':      'voir mon CV',
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

// Chevron helper
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

// Portal position hook, calculates fixed coords from an anchor element
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

// Tooltip
function Tooltip({ label, isDark, offset = 8, shortcut }) {
  const bg  = isDark ? '#f6f6f6' : '#1f1f1f';
  const txt = isDark ? '#1f1f1f' : '#f6f6f6';
  return (
    <div style={{ top: `calc(100% + ${offset}px)` }} className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
<div style={{ background: bg, color: txt }} className={`relative z-0 text-tooltip font-light leading-[1.2] pl-2 ${shortcut ? 'pr-[4px]' : 'pr-2'} py-[4px] rounded-radius-2 whitespace-nowrap ring-1 ring-white/20 dark:ring-black/10 flex items-center gap-2`}>
        {label}
        {shortcut && <kbd className="text-tooltip-kbd font-medium w-[18px] h-[18px] flex items-center justify-center rounded-[6px] bg-tooltip-keyboard-shortcut-bg text-tooltip-keyboard-shortcut-fg not-italic">{shortcut}</kbd>}
      </div>
    </div>
  );
}

function useDelayedTooltip(delay = 600) {
  const [visible, setVisible] = useState(false);
  const timer = useRef(null);
  const show = () => { timer.current = setTimeout(() => setVisible(true), delay); };
  const hide = () => { clearTimeout(timer.current); setVisible(false); };
  useEffect(() => () => clearTimeout(timer.current), []);
  return [visible, show, hide];
}

// DarkModeToggle
function DarkModeToggle({ isDark, onToggle, lang = 'en', noTooltip = false }) {
  const [hovered, setHovered]           = useState(false);
  const [pressed, setPressed]           = useState(false);
  const [tooltipVisible, showTip, hideTip] = useDelayedTooltip(600);
  const suppressRef = useRef(false);
  const suppressTimer = useRef(null);

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

  const Knob = () => (
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

  return (
    <div className="relative">
      <button
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => { setPressed(false); handleClick(); }}
        onPointerLeave={() => setPressed(false)}
        onMouseEnter={() => { setHovered(true);  if (!noTooltip && !suppressRef.current) showTip(); }}
        onMouseLeave={() => { setHovered(false); hideTip(); }}
        onBlur={() => { setHovered(false); hideTip(); }}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="relative flex items-center h-8 w-[51px] rounded-radius-4 cursor-pointer transition-colors"
        style={{ padding: isDark ? '3px 3px 3px 4px' : '3px 4px 3px 3px', gap:2, ...bgStyle }}
      >
        {isDark ? (
          <>
            <img src={imgMoonIcon} alt="" width={16} height={16} className="shrink-0" />
            <Knob />
          </>
        ) : (
          <>
            <Knob />
            <img src={imgSunIcon} alt="" width={16} height={16} className="shrink-0" />
          </>
        )}
      </button>
      {!noTooltip && <div className={`pointer-events-none transition-opacity duration-200 ${tooltipVisible ? 'opacity-100' : 'opacity-0'}`}><Tooltip label={T[lang]['dark mode'] ?? 'dark mode'} isDark={isDark} offset={10} shortcut="D" /></div>}
    </div>
  );
}

// ProjectsButton
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
        className={`flex items-center justify-center gap-2 h-8 px-4 rounded-radius-3 cursor-pointer active:opacity-[0.33] transition-colors ${
          isOpen ? 'bg-nav-active-bg-solid' : 'hover:bg-nav-hover-bg'
        }`}
      >
        <span className={`font-medium text-base leading-6 whitespace-nowrap ${isOpen ? 'text-fg-primary-inverse' : 'text-fg-primary'}`}>
          {T[lang].projects}
        </span>
        <Chevron isOpen={isOpen} isDark={isDark} />
      </button>
      {tooltipVisible && !isOpen && <Tooltip label={T[lang]['tip projects']} isDark={isDark} offset={10} shortcut="P" />}
    </div>
  );
}

// ProjectsDropdown
function ProjectsDropdown({ onClose, lang, dropdownRef, anchorRef }) {
  const portalStyle = usePortalPosition(anchorRef, { offsetTop: 11, offsetX: -14 });
  const items = [
    { key: 'sales platform',   to: '/case-study/sales-platform', locked: false },
    { key: 'extended reality', to: '/case-study/xr',             locked: false },
    { key: 'digital twin',     to: null,                       locked: true  },
  ];

  useEffect(() => {
    const id = setTimeout(() => {
      dropdownRef.current?.querySelector('[role="menuitem"]:not([aria-disabled="true"])')?.focus();
    }, 0);
    return () => clearTimeout(id);
  }, [dropdownRef]);

  return createPortal(
    <div
      id="projects-menu"
      role="menu"
      aria-label={lang === 'fr' ? 'Études de cas' : 'Case studies'}
      ref={dropdownRef}
      style={portalStyle}
      className="w-[198px] backdrop-blur-[12px] bg-nav-bg border border-glass-default rounded-radius-4 overflow-hidden shadow-s"
    >
      <ul role="none" className="p-2 flex flex-col">
        {items.map(({ key, to, locked }) => (
          <li key={key} role="none" className={locked ? 'opacity-[0.32]' : ''}>
            {to ? (
              <Link
                to={to}
                onClick={onClose}
                role="menuitem"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') { e.preventDefault(); onClose(); anchorRef?.current?.querySelector('button')?.focus(); }
                  else if (e.key === 'Tab') { onClose(); }
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-radius-3 hover:bg-nav-hover-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus"
              >
                <div className="size-6 shrink-0 flex items-center justify-center">
                  <img src={imgArrowRight} alt="" width={16} height={16} style={{ transform:'none' }} />
                </div>
                <span className="font-medium text-base leading-6 text-fg-primary whitespace-nowrap">{T[lang][key]}</span>
              </Link>
            ) : (
              <div role="menuitem" aria-disabled="true" className="flex items-center gap-2 px-3 py-2 cursor-default">
                <div className="size-6 shrink-0 flex items-center justify-center">
                  <img src={imgLockIcon} alt="" width={16} height={16} className="dark:invert" />
                </div>
                <span className="font-medium text-base leading-6 text-fg-primary whitespace-nowrap">{T[lang][key]}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>,
    document.body
  );
}

// LanguageDropdown
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
      className="backdrop-blur-[12px] bg-nav-bg border border-glass-default rounded-radius-4 overflow-hidden shadow-s"
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

// LanguageButton
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

// NavLink, pressed state on active page
function NavLink({ to, label, currentPage, tooltip, shortcut, isDark }) {
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
          {label}
        </span>
      </Link>
      {tooltipVisible && tooltip && <Tooltip label={tooltip} isDark={isDark} offset={10} shortcut={shortcut} />}
    </li>
  );
}

// ContactModal
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
  const row = 'block py-4 px-6 -mx-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus hover:bg-white/[0.04] dark:hover:bg-black/[0.04]';

  return createPortal(
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-[600] bg-black/40 backdrop-blur-[4px]"
        style={{ animation: 'fade-in 0.2s ease both' }}
      />
      {/* Centering wrapper — flex centering is more reliable than top/left/transform */}
      <div className="fixed inset-0 z-[601] flex items-center justify-center pointer-events-none px-4">
        <div role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" className="pointer-events-auto w-full max-w-[380px] relative">
          {/* Close button */}
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
        {/* Header */}
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
            <a data-spring href={`mailto:${u}@${d}?subject=${encodeURIComponent(subject)}`} onClick={() => trackEvent('contact_email_click')} className={`${row} flex items-center justify-between gap-3`}>
              <div className="min-w-0">
                <h2 className={lbl}>{lang === 'fr' ? 'E-mail' : 'Email'}</h2>
                <span className={`${val} obf-email block`} data-u={u} data-d={d} aria-hidden="true" />
                <span className="sr-only">d@AtelierDigital.co.uk</span>
              </div>
              <button
                data-spring
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigator.clipboard.writeText(`${u}@${d}`); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                aria-label={lang === 'fr' ? "Copier l'adresse e-mail" : 'Copy email address'}
                className="flex items-center gap-2 px-3 h-7 rounded-full text-chip-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus bg-white/[0.06] dark:bg-black/[0.06] hover:bg-white/[0.12] dark:hover:bg-black/[0.1] shrink-0 text-fg-primary-inverse"
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
            </a>
          </li>
          <li className="border-b border-border-subtle-inverted">
            <button
              data-spring
              onClick={() => { trackEvent('contact_linkedin_click'); window.open(liHref(), '_blank', 'noopener,noreferrer'); }}
              className="py-4 px-6 -ml-6 w-[calc(100%+3rem)] text-left cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus hover:bg-white/[0.04] dark:hover:bg-black/[0.04]"
            >
              <h2 className={lbl}>LinkedIn</h2>
              <p className={`${val} flex items-center gap-2`}>
                <img src={imgLinkedIn} alt="" width={16} height={16} className="invert dark:invert-0 shrink-0" />
                David V.
              </p>
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
              <h2 className={lbl}>{lang === 'fr' ? 'Localisation' : 'Location'}</h2>
              <p className={val}>
                🏴󠁧󠁢󠁳󠁣󠁴󠁿 {lang === 'fr' ? 'Édimbourg, Royaume-Uni' : 'Edinburgh, United Kingdom'}
              </p>
            </a>
          </li>
        </ul>

        <div className="pt-4">
          <a
            data-spring
            href="/david-v.vcf"
            download="david-v.vcf"
            onClick={() => trackEvent('vcard_download')}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-radius-4 border border-border-subtle-inverted text-fg-primary-inverse font-medium text-label-s leading-[1.2] hover:bg-white/[0.06] dark:hover:bg-black/[0.04] active:opacity-[0.33] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
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

// DesktopTabletNav
function DesktopTabletNav({ isDark, toggleDark, lang, toggleLang, isTablet, onContactOpen }) {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [langOpen,     setLangOpen]     = useState(false);
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
      const inProjectsDropdown = projectsDropdownRef.current?.contains(e.target);
      const inLangDropdown     = langDropdownRef.current?.contains(e.target);
      if (!inNav && !inProjectsDropdown && !inLangDropdown) {
        setProjectsOpen(false);
        setLangOpen(false);
      }
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
      className="flex items-center pr-2 backdrop-blur-[4px] bg-nav-bg rounded-radius-6 shadow-xs ring-1 ring-nav-ring"
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

        <NavLink to="/resume"         label={T[lang].résumé}       currentPage={currentPage} tooltip={currentPage === '/resume' ? T[lang]['back to top'] : T[lang]['tip resume']} shortcut="R" isDark={isDark} />
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

// MobileNav
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
    { key: 'sales platform',   to: '/case-study/sales-platform', locked: false },
    { key: 'extended reality', to: '/case-study/xr',             locked: false },
    { key: 'digital twin',     to: null,                       locked: true  },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full flex items-center backdrop-blur-[4px] bg-nav-bg rounded-radius-6 shadow-xs ring-1 ring-nav-ring">
        <a data-spring href="/" tabIndex={0} onClick={handleLogoClick} aria-label="Atelier Digital, back to top" className="flex items-center p-1 rounded-radius-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus">
          <div className="flex items-center gap-1 pl-1 pr-4 py-1 rounded-radius-5">
            <img src={imgLogo} alt="" width={36} height={36} className="shrink-0" />
            <span className="font-bold text-base text-fg-primary whitespace-nowrap leading-4" style={{ letterSpacing:'-0.8px' }}>
              ATELIER DIGITAL
            </span>
          </div>
        </a>
        <button onClick={() => { const opening = !menuOpen; setMenuOpen(opening); if (opening) setProjectsOpen(true); }} aria-label={menuOpen ? 'Close menu' : 'Open menu'} className="flex-1 flex items-center justify-end p-2 pr-3 rounded-r-[24px]">
          <span data-spring className="flex items-center justify-center">
            <img
              src={menuOpen ? imgClose : imgHamburger}
              alt=""
              width={32}
              height={32}
              className="shrink-0 dark:invert"
            />
          </span>
        </button>
      </div>

      {menuOpen && createPortal(
        <div aria-hidden="true" className="fixed inset-0 z-[499]" onClick={() => setMenuOpen(false)} />,
        document.body
      )}

      {menuOpen && (
        <div className="w-full backdrop-blur-[8px] bg-nav-mobile border border-black/[0.16] dark:border-white/[0.16] rounded-radius-8 overflow-hidden">
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
                        {subItems.map(({ key: sk, to: st, locked }) => (
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

// Nav (root)
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

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[500] flex justify-center pt-4 px-4 pointer-events-none transition-transform duration-300 ease-in-out"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(-120%)' }}
    >
      <div className="pointer-events-auto hidden lg:flex">
        <DesktopTabletNav isDark={isDark} toggleDark={toggleDark} lang={lang} toggleLang={toggleLang} isTablet={false} onContactOpen={() => setContactOpen(true)} />
      </div>
      <div className="pointer-events-auto hidden sm:flex lg:hidden">
        <DesktopTabletNav isDark={isDark} toggleDark={toggleDark} lang={lang} toggleLang={toggleLang} isTablet={true} onContactOpen={() => setContactOpen(true)} />
      </div>
      <div className="pointer-events-auto flex sm:hidden w-full">
        <MobileNav isDark={isDark} toggleDark={toggleDark} lang={lang} toggleLang={toggleLang} onContactOpen={() => setContactOpen(true)} />
      </div>
      {contactOpen && <ContactModal lang={lang} isDark={isDark} onClose={() => setContactOpen(false)} />}
    </div>
  );
}

export default Nav;
