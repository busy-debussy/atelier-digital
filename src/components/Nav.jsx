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

// Translations
const T = {
  en: {
    projects:          'projects',
    'digital twin':    'digital twin',
    'sales platform':  'sales platform',
    'extended reality':'extended reality',
    holograms:         'holograms',
    résumé:            'résumé',
    "let's talk":      "let's talk",
    home:              'home',
    'dark mode':       'dark mode',
    'back to top':     'back to top',
    'go home':         'go home',
    'tip projects':    'open menu',
    'tip resume':      'view my CV',
    'tip talk':        'contact details',
  },
  fr: {
    projects:          'projets',
    'digital twin':    'digital twin',
    'sales platform':  'plateforme web',
    'extended reality':'réalité étendue',
    holograms:         'hologrammes',
    résumé:            'CV interactif',
    "let's talk":      'coordonnées',
    home:              'accueil',
    'dark mode':       'mode sombre',
    'back to top':     'retour en haut',
    'go home':         "aller à l'accueil",
    'tip projects':    'ouvrir le menu',
    'tip resume':      'voir mon CV',
    'tip talk':        'échangeons',
  },
};

// Flags, local exports, fixed container so nav width never shifts
function Flag({ code }) {
  return (
    <div className="shrink-0 rounded-[6px] overflow-hidden" style={{ width: 24, height: 24, minWidth: 24 }}>
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
function Tooltip({ label, isDark, offset = 8 }) {
  const bg  = isDark ? '#f6f6f6' : '#1f1f1f';
  const txt = isDark ? '#1f1f1f' : '#f6f6f6';
  return (
    <div style={{ top: `calc(100% + ${offset}px)` }} className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
      <svg width="12" height="6" viewBox="0 0 12 6" aria-hidden="true" className="shrink-0 relative z-[1]" style={{ display:'block', marginBottom:'-1px' }}>
        <path d={`M0,6 L5.2,0.9 Q6,0 6.8,0.9 L12,6 Z`} fill={bg} />
      </svg>
      <div style={{ background: bg, color: txt }} className="relative z-0 text-[15px] font-semibold leading-4 px-3 py-[4px] rounded-lg whitespace-nowrap ring-1 ring-white/20 dark:ring-black/10">
        {label}
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
  const [tooltipVisible, showTip, hideTip] = useDelayedTooltip(600);

  const handleClick = () => {
    hideTip();
    onToggle();
  };

  const bgStyle = isDark
    ? { background: hovered ? '#000000' : '#262626' }
    : hovered
      ? { backgroundImage: 'linear-gradient(rgba(0,0,0,0.32),rgba(0,0,0,0.32)),linear-gradient(rgba(0,0,0,0.16),rgba(0,0,0,0.16))' }
      : { backgroundImage: 'linear-gradient(rgba(0,0,0,0.32),rgba(0,0,0,0.32)),linear-gradient(rgba(255,255,255,0.32),rgba(255,255,255,0.32))' };

  const Knob = () => (
    <div className="shrink-0 rounded-full bg-white" style={{ width:26, height:26, boxShadow:'0 1px 4px rgba(0,0,0,0.30),0 0 0 0.5px rgba(0,0,0,0.08)' }} />
  );

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        onMouseEnter={() => { setHovered(true);  if (!noTooltip) showTip(); }}
        onMouseLeave={() => { setHovered(false); hideTip(); }}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="relative flex items-center h-8 w-[51px] rounded-[16px] cursor-pointer transition-colors"
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
      {tooltipVisible && <Tooltip label={T[lang]['dark mode'] ?? 'dark mode'} isDark={isDark} offset={16} />}
    </div>
  );
}

// ProjectsButton
function ProjectsButton({ isOpen, onClick, isDark, lang }) {
  const [tooltipVisible, showTip, hideTip] = useDelayedTooltip(600);
  return (
    <div className="relative">
      <button
        onClick={() => { hideTip(); onClick(); }}
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'projects-menu' : undefined}
        aria-label={isOpen ? `Close ${T[lang].projects} menu` : `Open ${T[lang].projects} menu`}
        className={`flex items-center justify-center gap-2 h-8 w-[106px] rounded-[12px] cursor-pointer active:opacity-[0.33] transition-colors ${
          isOpen ? 'bg-[#161616] dark:bg-white' : 'hover:bg-black/[0.04] dark:hover:bg-white/[0.08]'
        }`}
      >
        <span className={`font-medium text-base leading-6 whitespace-nowrap ${isOpen ? 'text-white dark:text-[#161616]' : 'text-black dark:text-white'}`}>
          {T[lang].projects}
        </span>
        <Chevron isOpen={isOpen} isDark={isDark} />
      </button>
      {tooltipVisible && !isOpen && <Tooltip label={T[lang]['tip projects']} isDark={isDark} offset={16} />}
    </div>
  );
}

// ProjectsDropdown
function ProjectsDropdown({ onClose, lang, dropdownRef, anchorRef }) {
  const portalStyle = usePortalPosition(anchorRef, { offsetTop: 11, offsetX: -14 });
  const items = [
    { key: 'digital twin',     to: null,                       locked: true  },
    { key: 'sales platform',   to: '/projects/sales-platform', locked: false },
    { key: 'extended reality', to: null,                       locked: true  },
    { key: 'holograms',        to: null,                       locked: true  },
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
      className="w-[198px] backdrop-blur-[4px] bg-white/[0.64] dark:bg-black/[0.64] border border-black/[0.16] dark:border-white/[0.16] rounded-2xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.12)]"
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
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0152EC]"
              >
                <div className="size-6 shrink-0 flex items-center justify-center">
                  <img src={imgArrowRight} alt="" width={16} height={16} style={{ transform:'none' }} />
                </div>
                <span className="font-semibold text-base leading-6 text-black dark:text-white whitespace-nowrap">{T[lang][key]}</span>
              </Link>
            ) : (
              <div role="menuitem" aria-disabled="true" className="flex items-center gap-2 px-3 py-2 cursor-default">
                <div className="size-6 shrink-0 flex items-center justify-center">
                  <img src={imgLockIcon} alt="" width={16} height={16} className="dark:invert" />
                </div>
                <span className="font-semibold text-base leading-6 text-[#161616] dark:text-white whitespace-nowrap">{T[lang][key]}</span>
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
  const portalStyle = usePortalPosition(anchorRef, { offsetTop: 11, align: 'right' });
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
      className="backdrop-blur-[4px] bg-white/[0.64] dark:bg-black/[0.64] border border-black/[0.16] dark:border-white/[0.16] rounded-2xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.12)]"
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
            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.08] cursor-pointer transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0152EC]"
          >
            <Flag code={other === 'en' ? 'gb' : 'fr'} />
            <span className="font-semibold text-base leading-6 text-[#1f1f1f] dark:text-white">{other === 'en' ? 'GB' : 'FR'}</span>
          </button>
        </li>
      </ul>
    </div>,
    document.body
  );
}

// LanguageButton
function LanguageButton({ isOpen, onClick, onClose, lang, toggleLang, isDark, langDropdownRef }) {
  const [tooltipVisible, showTip, hideTip] = useDelayedTooltip(600);
  const containerRef = useRef(null);
  const flagCode = lang === 'en' ? 'gb' : 'fr';
  const label    = lang === 'en' ? 'GB' : 'FR';

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => { hideTip(); onClick(); }}
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'language-menu' : undefined}
        aria-label={`${label}, change language`}
        className={`flex items-center gap-2 h-8 px-3 rounded-[12px] cursor-pointer active:opacity-[0.33] transition-colors ${
          isOpen ? 'bg-[#161616] dark:bg-white' : 'hover:bg-black/[0.04] dark:hover:bg-white/[0.08]'
        }`}
      >
        <Flag code={flagCode} />
        <span className={`font-medium text-base leading-6 whitespace-nowrap ${isOpen ? 'text-white dark:text-[#161616]' : 'text-[#161616] dark:text-white'}`}>
          {label}
        </span>
        <Chevron isOpen={isOpen} isDark={isDark} />
      </button>
      {tooltipVisible && !isOpen && <Tooltip label="languages" isDark={isDark} offset={16} />}
      {isOpen && <LanguageDropdown lang={lang} toggleLang={toggleLang} onClose={onClose} dropdownRef={langDropdownRef} anchorRef={containerRef} />}
    </div>
  );
}

// NavLink, pressed state on active page
function NavLink({ to, label, currentPage, tooltip, isDark }) {
  const [path, hash] = to.split('#');
  const isActive = currentPage === path && !hash;
  const [tooltipVisible, showTip, hideTip] = useDelayedTooltip(600);
  const handleClick = () => {
    hideTip();
    if (hash && currentPage === path) {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    } else if (currentPage === path && !hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <li className="relative">
      <Link
        to={to}
        tabIndex={0}
        onClick={handleClick}
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
        className={`flex items-center justify-center h-8 px-4 rounded-[12px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC] ${
          isActive
            ? 'bg-[#161616] dark:bg-white'
            : 'active:opacity-[0.33] hover:bg-black/[0.04] dark:hover:bg-white/[0.08]'
        }`}
      >
        <span className={`font-medium text-base leading-6 whitespace-nowrap ${isActive ? 'text-white dark:text-[#161616]' : 'text-black dark:text-white'}`}>
          {label}
        </span>
      </Link>
      {tooltipVisible && tooltip && <Tooltip label={tooltip} isDark={isDark} offset={16} />}
    </li>
  );
}

// DesktopTabletNav
function DesktopTabletNav({ isDark, toggleDark, lang, toggleLang, isTablet }) {
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
      className="flex items-center pr-2 backdrop-blur-[4px] bg-white/[0.64] dark:bg-black/[0.64] rounded-3xl shadow-[0px_0px_17.1px_0px_rgba(0,0,0,0.08)] dark:ring-1 dark:ring-white/[0.16]"
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
          className="flex items-center p-2 rounded-3xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC]"
        >
          <div className="flex items-center gap-1 py-1 pl-1 pr-3 rounded-[20px] group-hover:bg-black/[0.04] dark:group-hover:bg-white/[0.08] transition-colors">
            <img src={imgLogo} alt="" width={24} height={24} className="shrink-0" />
            <span className="font-bold text-base leading-6 text-[#1f1f1f] dark:text-white whitespace-nowrap" style={{ letterSpacing:'-0.8px' }}>
              ATELIER DIGITAL
            </span>
          </div>
        </a>
        {logoTipVisible && <Tooltip label={currentPage === '/' ? T[lang]['back to top'] : T[lang]['go home']} isDark={isDark} />}
      </div>

      <ol className={`flex items-center ${isTablet ? 'gap-2' : 'gap-4'}`}>
        <li className="relative" ref={projectsBtnRef}>
          <ProjectsButton isOpen={projectsOpen} onClick={openProjectsDropdown} isDark={isDark} lang={lang} />
          {projectsOpen && (
            <ProjectsDropdown onClose={() => setProjectsOpen(false)} lang={lang} dropdownRef={projectsDropdownRef} anchorRef={projectsBtnRef} />
          )}
        </li>

        <NavLink to="/resume"         label={T[lang].résumé}       currentPage={currentPage} tooltip={T[lang]['tip resume']} isDark={isDark} />
        <NavLink to="/resume#contact" label={T[lang]["let's talk"]} currentPage={currentPage} tooltip={T[lang]['tip talk']}   isDark={isDark} />

        <li role="none" aria-hidden="true"><div className="w-px h-4 bg-black/[0.12] dark:bg-white/[0.12] shrink-0" /></li>

        <li className="relative">
          <LanguageButton
            isOpen={langOpen}
            onClick={() => { setLangOpen(!langOpen); setProjectsOpen(false); }}
            onClose={() => setLangOpen(false)}
            lang={lang} toggleLang={toggleLang} isDark={isDark}
            langDropdownRef={langDropdownRef}
          />
        </li>

        <li><DarkModeToggle isDark={isDark} onToggle={toggleDark} lang={lang} /></li>
      </ol>
    </nav>
  );
}

// MobileNav
function MobileNav({ isDark, toggleDark, lang, toggleLang }) {
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
    { key: 'home',       to: '/'        },
    { key: 'projects',   to: null       },
    { key: 'résumé',     to: '/resume'  },
    { key: "let's talk", to: '/resume#contact' },
  ];

  const subItems = [
    { key: 'digital twin',     to: null,                       locked: true  },
    { key: 'sales platform',   to: '/projects/sales-platform', locked: false },
    { key: 'extended reality', to: null,                       locked: true  },
    { key: 'holograms',        to: null,                       locked: true  },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full flex items-center backdrop-blur-[4px] bg-white/[0.64] dark:bg-black/[0.64] rounded-3xl shadow-[0px_0px_17.1px_0px_rgba(0,0,0,0.08)] dark:ring-1 dark:ring-white/[0.16]">
        <a data-spring href="/" tabIndex={0} onClick={handleLogoClick} aria-label="Atelier Digital, back to top" className="flex items-center p-1 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC]">
          <div className="flex items-center gap-1 pl-1 pr-4 py-1 rounded-[20px]">
            <img src={imgLogo} alt="" width={36} height={36} className="shrink-0" />
            <span className="font-bold text-base text-[#1f1f1f] dark:text-white whitespace-nowrap leading-4" style={{ letterSpacing:'-0.8px' }}>
              ATELIER DIGITAL
            </span>
          </div>
        </a>
        <button onClick={() => { const opening = !menuOpen; setMenuOpen(opening); if (opening) setProjectsOpen(true); }} aria-label={menuOpen ? 'Close menu' : 'Open menu'} className="flex-1 flex items-center justify-end p-2 pr-3 rounded-r-3xl">
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
        <div className="w-full backdrop-blur-[8px] bg-white/[0.88] dark:bg-black/[0.88] border border-black/[0.16] dark:border-white/[0.16] rounded-[32px] overflow-hidden">
          <ol className="flex flex-col gap-2 p-4">
            {mobilePages.map(({ key, to }) => (
              <li key={key}>
                {to ? (
                  <Link
                    to={to}
                    onClick={() => {
                      setMenuOpen(false);
                      const [p, h] = to.split('#');
                      if (h && currentPage === p) { document.getElementById(h)?.scrollIntoView({ behavior: 'smooth' }); }
                      else if (currentPage === to) { window.scrollTo({ top: 0, behavior: 'smooth' }); }
                    }}
                    className="flex items-center h-12 px-4 rounded-2xl transition-colors active:opacity-[0.33] hover:bg-black/[0.04] dark:hover:bg-white/[0.08]"
                  >
                    <span data-spring className="font-medium text-2xl leading-8 text-black dark:text-white">
                      {T[lang][key]}
                    </span>
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setProjectsOpen(!projectsOpen)}
                      className="flex items-center justify-start gap-2 w-full h-12 px-4 rounded-2xl hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors active:opacity-[0.33]"
                    >
                      <span data-spring className="flex items-center gap-2">
                        <span className="font-medium text-2xl leading-8 text-black dark:text-white">{T[lang][key]}</span>
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
                            <div key={sk} className="flex items-center gap-3 h-12 px-4 rounded-2xl opacity-[0.32] cursor-default">
                              <img src={imgLockIcon} alt="" width={20} height={20} className="shrink-0 dark:invert" />
                              <span className="font-medium text-2xl leading-8 text-black dark:text-white">{T[lang][sk]}</span>
                            </div>
                          ) : (
                            <Link
                              key={sk}
                              to={st}
                              onClick={() => { setMenuOpen(false); setProjectsOpen(false); }}
                              className="flex items-center gap-3 h-12 px-4 rounded-2xl hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors"
                            >
                              <span data-spring className="flex items-center gap-3">
                                <img src={imgArrowRight} alt="" width={16} height={16} className="shrink-0" style={{ transform:'none' }} />
                                <span className="font-medium text-2xl leading-8 text-black dark:text-white">{T[lang][sk]}</span>
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

          <div className="mx-4 h-px bg-black/[0.10] dark:bg-white/[0.10]" />

          <div className="flex items-center justify-around px-6 py-4">
            <button
              data-spring
              onClick={() => { if (lang !== 'en') toggleLang(); }}
              className={`flex items-center gap-2 h-12 px-4 rounded-2xl transition-colors active:opacity-[0.33] ${lang !== 'en' ? 'hover:bg-black/[0.04] dark:hover:bg-white/[0.08] cursor-pointer' : 'bg-[#161616] dark:bg-white cursor-default'}`}
            >
              <Flag code="gb" />
              <span className={`font-medium text-xl ${lang === 'en' ? 'text-white dark:text-[#161616]' : 'text-[#5c5c5c] dark:text-white/40'}`}>GB</span>
            </button>
            <button
              data-spring
              onClick={() => { if (lang !== 'fr') toggleLang(); }}
              className={`flex items-center gap-2 h-12 px-4 rounded-2xl transition-colors active:opacity-[0.33] ${lang !== 'fr' ? 'hover:bg-black/[0.04] dark:hover:bg-white/[0.08] cursor-pointer' : 'bg-[#161616] dark:bg-white cursor-default'}`}
            >
              <Flag code="fr" />
              <span className={`font-medium text-xl ${lang === 'fr' ? 'text-white dark:text-[#161616]' : 'text-[#5c5c5c] dark:text-white/40'}`}>FR</span>
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
  return (
    <div className="fixed top-0 left-0 right-0 z-[500] flex justify-center pt-4 px-4 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
      <div className="pointer-events-auto hidden lg:flex">
        <DesktopTabletNav isDark={isDark} toggleDark={toggleDark} lang={lang} toggleLang={toggleLang} isTablet={false} />
      </div>
      <div className="pointer-events-auto hidden sm:flex lg:hidden">
        <DesktopTabletNav isDark={isDark} toggleDark={toggleDark} lang={lang} toggleLang={toggleLang} isTablet={true} />
      </div>
      <div className="pointer-events-auto flex sm:hidden w-full">
        <MobileNav isDark={isDark} toggleDark={toggleDark} lang={lang} toggleLang={toggleLang} />
      </div>
    </div>
  );
}

export default Nav;
