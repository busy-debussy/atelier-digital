import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// ── Update this date whenever content changes ──────────────────────────────────
const LAST_UPDATED = new Date('2026-06-17');

const formatDate = (date, lang) =>
  date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const T = {
  en: {
    title:       'Cookies policy',
    emoji:       '🍪',
    skipToMain:  'Skip to main content',
    updated:     'Last updated:',
    intro:       'This page explains how cookies are used at Atelier Digital.',
    browserLabel:'How to manage cookies in your browser:',
    newTabLabel: ' (opens in new tab)',
    manageBtn:   'Manage cookie preferences',
    outro:       'I believe in ethical design and respectful data use.',
    sections: [
      {
        id: 'what-are-cookies',
        heading: 'What are cookies?',
        body: 'Cookies are small text files stored on your device when you visit a website. They help improve your browsing experience by providing anonymous usage statistics.',
      },
      {
        id: 'how-used',
        heading: 'How cookies are used?',
        navLabel: 'Usage',
        body: 'Cookies are used to better understand how visitors interact with this portfolio and to improve the user experience. They are used for these purposes:',
        bullets: [
          { label: 'Essential', text: 'required for site functionality' },
          { label: 'Analytics', text: 'anonymous usage data for UX improvements' },
          { label: 'Performance', text: 'help monitor website performance and speed' },
        ],
      },
      {
        id: 'third-party',
        heading: 'Third-party tools',
        subsections: [
          {
            heading: 'Google Analytics',
            body: 'This Website uses Google Analytics, a service by Google LLC. Google Analytics helps analyse website traffic and user behaviour. The data collected is anonymous and may include:',
            bullets: ['Pages visited', 'Time spent on pages', 'Browser / device details', 'Approximate location (city-level)', 'Referral source'],
            links: [
              { label: 'Privacy policy', href: 'https://policies.google.com/privacy' },
              { label: 'Cookie policy', href: 'https://policies.google.com/technologies/cookies' },
              { label: 'Opt out', href: 'https://tools.google.com/dlpage/gaoptout' },
            ],
          },
          {
            heading: 'Microsoft Clarity',
            body: 'This Website also uses Microsoft Clarity, a behaviour analytics tool that provides heat maps and session recordings. Clarity helps me understand how visitors interact visually with the site to improve usability. Clarity may collect anonymised information such as:',
            bullets: ['Clicks, taps, scrolling behaviour', 'Device and browser type', 'Pages visited', 'Screen resolution and language', 'Referring pages'],
            links: [
              { label: 'Privacy policy', href: 'https://privacy.microsoft.com/privacystatement' },
              { label: 'Clarity privacy', href: 'https://clarity.microsoft.com/terms' },
            ],
          },
        ],
      },
      {
        id: 'managing',
        heading: 'Managing cookies',
        body: 'You can control cookies through your browser settings:',
        bullets: ['Blocking or deleting cookies', 'Allowing cookies from trusted sites only', 'Clearing cookies after each session'],
        browsers: [
          { label: 'Chrome',  href: 'https://support.google.com/chrome/answer/95647' },
          { label: 'Firefox', href: 'https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences' },
          { label: 'Safari',  href: 'https://support.apple.com/en-gb/guide/safari/sfri11471/mac' },
          { label: 'Edge',    href: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
        ],
      },
      {
        id: 'consent',
        heading: 'Consent',
        body: 'When you first visit this Website, you may see a cookie banner asking for consent. You can withdraw or modify your consent at any time.',
        manageCookies: true,
      },
      {
        id: 'updates',
        heading: 'Updates to this policy',
        navLabel: 'Updates',
        body: "This Cookies Policy may be updated occasionally to reflect changes in technology or legal requirements. Any updates will be posted on this page with a revised 'Last updated' date.",
      },
      {
        id: 'contact',
        heading: 'Contact',
        body: 'For any questions regarding this cookies policy:',
        contact: true,
      },
    ],
  },
  fr: {
    title:       'Politique de cookies',
    emoji:       '🍪',
    skipToMain:  'Aller au contenu principal',
    updated:     'Dernière mise à jour :',
    intro:       'Cette page explique comment les cookies sont utilisés chez Atelier Digital.',
    browserLabel:'Comment gérer les cookies dans votre navigateur :',
    newTabLabel: ' (ouvre dans un nouvel onglet)',
    manageBtn:   'Gérer mes préférences de cookies',
    outro:       'Je crois en un design éthique et un usage respectueux des données.',
    sections: [
      {
        id: 'what-are-cookies',
        heading: 'Que sont les cookies ?',
        navLabel: 'Définition',
        body: "Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez un site web. Ils contribuent à améliorer votre expérience de navigation en fournissant des statistiques d'utilisation anonymes.",
      },
      {
        id: 'how-used',
        heading: 'Comment les cookies sont-ils utilisés ?',
        navLabel: 'Utilisation',
        body: "Les cookies sont utilisés pour mieux comprendre comment les visiteurs interagissent avec ce portfolio et pour améliorer l'expérience utilisateur. Ils sont utilisés à ces fins :",
        bullets: [
          { label: 'Essentiels', text: 'requis pour le bon fonctionnement du site' },
          { label: 'Analytiques', text: "données d'utilisation anonymes pour améliorer l'expérience" },
          { label: 'Performance', text: 'surveillance des performances et de la vitesse du site' },
        ],
      },
      {
        id: 'third-party',
        heading: 'Outils tiers',
        subsections: [
          {
            heading: 'Google Analytics',
            body: "Ce site utilise Google Analytics, un service de Google LLC. Google Analytics aide à analyser le trafic et le comportement des utilisateurs. Les données collectées sont anonymes et peuvent inclure :",
            bullets: ['Pages visitées', 'Temps passé sur les pages', "Navigateur / type d'appareil", 'Localisation approximative (ville)', 'Source de référence'],
            links: [
              { label: 'Politique de confidentialité', href: 'https://policies.google.com/privacy' },
              { label: 'Politique de cookies', href: 'https://policies.google.com/technologies/cookies' },
              { label: 'Désactiver', href: 'https://tools.google.com/dlpage/gaoptout' },
            ],
          },
          {
            heading: 'Microsoft Clarity',
            body: "Ce site utilise également Microsoft Clarity, un outil d'analyse comportementale fournissant des cartes de chaleur et des enregistrements de session. Clarity m'aide à comprendre comment les visiteurs interagissent visuellement avec le site. Clarity peut collecter des informations anonymisées telles que :",
            bullets: ['Clics, tapotements, comportement de défilement', "Type d'appareil et de navigateur", 'Pages visitées', "Résolution d'écran et langue", 'Pages de référence'],
            links: [
              { label: 'Politique de confidentialité', href: 'https://privacy.microsoft.com/privacystatement' },
              { label: 'Confidentialité Clarity', href: 'https://clarity.microsoft.com/terms' },
            ],
          },
        ],
      },
      {
        id: 'managing',
        heading: 'Gestion des cookies',
        navLabel: 'Gestion',
        body: 'Vous pouvez contrôler les cookies via les paramètres de votre navigateur :',
        bullets: ['Bloquer ou supprimer les cookies', 'Autoriser uniquement les cookies de sites de confiance', 'Effacer les cookies après chaque session'],
        browsers: [
          { label: 'Chrome',  href: 'https://support.google.com/chrome/answer/95647' },
          { label: 'Firefox', href: 'https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences' },
          { label: 'Safari',  href: 'https://support.apple.com/en-gb/guide/safari/sfri11471/mac' },
          { label: 'Edge',    href: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
        ],
      },
      {
        id: 'consent',
        heading: 'Consentement',
        body: "Lors de votre première visite, une bannière de cookies peut apparaître pour demander votre consentement. Vous pouvez retirer ou modifier votre consentement à tout moment.",
        manageCookies: true,
      },
      {
        id: 'updates',
        heading: 'Mises à jour de cette politique',
        navLabel: 'Mises à jour',
        body: "Cette politique de cookies peut être mise à jour occasionnellement pour refléter des changements technologiques ou légaux. Toute mise à jour sera publiée sur cette page avec une nouvelle date.",
      },
      {
        id: 'contact',
        heading: 'Coordonnées',
        body: 'Pour toute question concernant cette politique de cookies :',
        contact: true,
      },
    ],
  },
};

const card = 'py-12 scroll-mt-24';
const h2   = 'text-h2 font-bold leading-tight text-fg-primary mb-6';
const h3   = 'text-h3 font-semibold leading-snug text-fg-primary mb-3 mt-10';
const body = 'text-copy-m font-normal leading-loose text-fg-secondary';
const lnk  = 'underline hover:opacity-60 transition-opacity rounded-radius-half focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus';

function CookieSection({ s, num, browserLabel, newTabLabel, manageBtn, delay }) {
  return (
    <li
      id={s.id}
      tabIndex={-1}
      className={`${card} focus-visible:outline-none`}
      style={{ animation: `fade-in 0.5s cubic-bezier(0.22,1,0.36,1) both`, animationDelay: delay }}
    >
      <h2 className={h2}><span className="font-bold mr-1">{num}.</span>{s.heading}</h2>

      {s.body && <p className={`${body} mb-6`}>{s.body}</p>}

      {s.bullets && s.bullets[0]?.label && (
        <ul className="space-y-2 mb-6">
          {s.bullets.map((b, i) => (
            <li key={i} className={body}>
              <span className="font-semibold text-fg-primary">{b.label}:</span> {b.text}
            </li>
          ))}
        </ul>
      )}

      {s.bullets && !s.bullets[0]?.label && (
        <ul className="list-disc list-inside space-y-2 mb-6">
          {s.bullets.map((b, i) => <li key={i} className={body}>{b}</li>)}
        </ul>
      )}

      {s.browsers && (
        <div className="mt-2">
          <p className={`${body} mb-4`}>{browserLabel}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {s.browsers.map(b => (
              <li key={b.label}>
                <a href={b.href} target="_blank" rel="noopener noreferrer" className={`${body} ${lnk}`}>
                  {b.label}<span className="sr-only">{newTabLabel}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {s.subsections && (
        <div className="space-y-10">
        {s.subsections.map((sub, i) => (
        <div key={i}>
          <h3 className={h3}><span className="font-semibold mr-2">{num}.{i + 1}</span>{sub.heading}</h3>
          <p className={`${body} mb-6`}>{sub.body}</p>
          <ul className="list-disc list-inside space-y-2 mb-6">
            {sub.bullets.map((b, j) => <li key={j} className={body}>{b}</li>)}
          </ul>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {sub.links.map(l => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className={`${body} ${lnk}`}>
                  {l.label}<span className="sr-only">{newTabLabel}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
        </div>
      )}

      {s.manageCookies && (
        <button
          onClick={() => window.dispatchEvent(new Event('show-cookie-banner'))}
          className={`mt-2 px-5 py-3 text-tag-m font-medium rounded-radius-3 bg-tooltip-bg text-white dark:text-fg-primary-inverse hover:opacity-80 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus`}
        >
          {manageBtn}
        </button>
      )}

      {s.contact && (
        <address className={`${body} not-italic mt-2 space-y-3`}>
          <p className="font-semibold text-fg-primary">David V. — Senior Product Designer</p>
          <p>
            <button
              onClick={() => window.location.href = 'mailto:d@AtelierDigital.co.uk'}
              className={`${body} ${lnk} cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded`}
              aria-label="Message David"
            >
              <span className="obf-email" data-u="d" data-d="AtelierDigital.co.uk" aria-hidden="true" />
            </button>
          </p>
          <p><Link to="/" className={`${body} ${lnk}`}>www.AtelierDigital.co.uk</Link></p>
        </address>
      )}
    </li>
  );
}

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  el.focus({ preventScroll: true });
};

function MobileSecondaryNav({ sections, activeId, onNavigate }) {
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current || !activeId) return;
    const btn = trackRef.current.querySelector(`[data-section="${activeId}"]`);
    btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeId]);

  return (
    <nav aria-label="Page sections" className="w-full backdrop-blur-1 bg-nav-bg rounded-radius-6 shadow-xs ring-1 ring-nav-ring p-[10px]">
      <div className="overflow-hidden rounded-radius-4">
        <ul ref={trackRef} className="w-full flex items-center gap-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {sections.map((s) => {
            const isActive = activeId === s.id;
            return (
              <li key={s.id} className="shrink-0">
                <button
                  data-section={s.id}
                  onClick={() => onNavigate(s.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`h-8 px-3 rounded-radius-4 text-tooltip font-medium whitespace-nowrap transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                    isActive
                      ? 'bg-nav-active-bg-solid text-fg-inverse'
                      : 'text-fg-muted'
                  }`}
                >
                  {s.heading}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

function SecondaryNav({ sections, activeId, onNavigate, lang, visible = true }) {
  // Collapsible secondary nav. Hovering the right edge highlights it and shows
  // a delayed "Minimise" tooltip; clicking (or dragging left) collapses the nav
  // into a centre-left pill that restores it.
  const [collapsed, setCollapsed] = useState(false);
  const [tipVisible, setTipVisible] = useState(false);
  const timerRef = useRef(null);
  const showTip = () => { clearTimeout(timerRef.current); timerRef.current = setTimeout(() => setTipVisible(true), 500); };
  const hideTip = () => { clearTimeout(timerRef.current); setTipVisible(false); };
  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Drag-left-to-minimise: a leftward drag on the edge past a small threshold
  // collapses the nav (a plain click collapses too, via onClick).
  const dragStartX = useRef(null);
  const onEdgePointerDown = (e) => { dragStartX.current = e.clientX; e.currentTarget.setPointerCapture?.(e.pointerId); };
  const onEdgePointerMove = (e) => {
    if (dragStartX.current == null) return;
    if (e.clientX - dragStartX.current <= -24) { dragStartX.current = null; setCollapsed(true); hideTip(); }
  };
  const onEdgePointerUp = () => { dragStartX.current = null; };

  const minimiseLabel = lang === 'fr' ? 'Réduire' : 'Minimise';
  const expandLabel   = lang === 'fr' ? 'Afficher la navigation' : 'Expand navigation';

  // Collapsed → fixed pill at the centre-left of the viewport. An empty
  // placeholder keeps the original nav column width so the page content does
  // not shift when minimising/restoring.
  if (collapsed) {
    return (
      <>
        <div className="hidden md:block w-44 shrink-0" aria-hidden="true" />
        <div className={`hidden md:block fixed left-2 top-1/2 -translate-y-1/2 z-10 transition-opacity duration-180 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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
              <path d="M4 7h16M4 12h12M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          {tipVisible && (
            <div role="tooltip" className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap rounded-radius-2 px-2 py-1 text-tooltip font-medium bg-nav-active-bg-solid text-fg-inverse shadow-xs pointer-events-none z-20">
              {expandLabel}
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      {/* Placeholder reserves the nav column; the panel itself is position:
          fixed (like the case-study navs) so it holds a constant y and never
          drifts at the end of the page. */}
      <div className="hidden md:block w-44 shrink-0" aria-hidden="true" />
      <nav aria-label="Page sections" className="hidden md:block fixed top-[240px] left-6 min-[1200px]:left-[calc(50%_-_36rem)] z-10 w-44">
      {/* Frosted panel — matches the Canap secondary-nav styling. */}
      <div className={`relative p-2 backdrop-blur-3 bg-nav-bg rounded-radius-6 shadow-xs ring-1 ring-nav-ring transition-opacity duration-180 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <ol className="space-y-1">
        {sections.map((s) => {
          const isActive = activeId === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() => onNavigate(s.id)}
                aria-label={s.navLabel ?? s.heading}
                aria-current={isActive ? 'location' : undefined}
                className={`relative text-tooltip leading-snug py-2 px-3 rounded-full text-left w-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                  isActive
                    ? 'text-fg-primary font-semibold bg-nav-active-bg'
                    : 'text-fg-muted font-normal hover:text-fg-primary hover:bg-nav-active-bg'
                }`}
              >
                {/* Invisible bold copy locks the button height to its semibold size — prevents 1→2 line reflow on hover */}
                <span aria-hidden="true" className="font-semibold invisible block select-none">{s.navLabel ?? s.heading}</span>
                <span className="absolute inset-0 py-2 px-3">{s.navLabel ?? s.heading}</span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Right-edge minimise affordance — hovering highlights the edge and
          reveals a chevron just outside the panel; clicking collapses the nav. */}
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
        {/* edge highlight — only on edge hover/focus */}
        <span
          aria-hidden="true"
          className="absolute inset-y-6 right-[3px] w-[2px] rounded-full bg-fg-muted-inverse dark:bg-fg-muted opacity-0 group-hover/edge:opacity-100 group-focus-visible/edge:opacity-100 transition-opacity"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, #000 35%, #000 65%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 35%, #000 65%, transparent)',
          }}
        />
        {/* chevron, rendered just outside the nav container */}
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
      </div>
    </nav>
    </>
  );
}

function Cookies({ lang }) {
  const t = T[lang];
  const [activeId, setActiveId] = useState('');
  const [mounted, setMounted] = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [atBottom,    setAtBottom]    = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const suppressRef = useRef(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const firstEl = document.getElementById(t.sections[0].id);
    const lastEl  = document.getElementById(t.sections[t.sections.length - 1].id);
    if (!firstEl || !lastEl) return;

    const update = () => {
      const firstTop = firstEl.getBoundingClientRect().top;
      const lastBottom = lastEl.getBoundingClientRect().bottom;
      // Anchor = scroll-mt-24 (96px). Mirrors the case-study pattern: the nav is
      // visible at the first and last sections' anchors and hides ~50px past
      // either end. Top buffer = 96 + 50; bottom = (96 + section height) − 50.
      setScrolledDown(firstTop < 146);
      setAtBottom(lastBottom < lastEl.offsetHeight + 46);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [t]);

  useEffect(() => {
    if (!window.matchMedia('(max-width: 767px)').matches) return;
    const visible = scrolledDown && !atBottom && !scrollingDown;
    window.dispatchEvent(new CustomEvent('chat-force-visible', { detail: visible }));
    return () => window.dispatchEvent(new CustomEvent('chat-force-visible', { detail: false }));
  }, [scrolledDown, atBottom, scrollingDown]);

  useEffect(() => {
    if (!window.matchMedia('(max-width: 767px)').matches) return;
    let lastY = window.scrollY;
    const onScroll = () => { const y = window.scrollY; if (!suppressRef.current) setScrollingDown(y > lastY); lastY = y; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavigate = (id) => {
    setActiveId(id);
    suppressRef.current = true;
    window.dispatchEvent(new CustomEvent('nav-scroll-start'));
    scrollToSection(id);
    setTimeout(() => { suppressRef.current = false; }, 1500);
  };

  useEffect(() => {
    document.title = lang === 'fr' ? 'Cookies • Atelier Digital' : 'Cookies • Atelier Digital';
  }, [lang]);

  useEffect(() => {
    const observers = t.sections.map(s => {
      const el = document.getElementById(s.id);
      if (!el) return null;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !suppressRef.current) setActiveId(s.id); }, { rootMargin: '-30% 0px -60% 0px' });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [lang]);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-radius-2 focus:ring-2 focus:ring-border-focus focus:bg-white focus:text-fg-primary focus:outline-none font-medium">
        {t.skipToMain}
      </a>
      <main id="main-content" aria-label={t.title} className={`bg-bg-page dark:bg-bg-surface min-h-screen transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`} tabIndex={-1}>
        {/* Shared layout wrapper */}
        <div className="px-6 flex flex-col items-center">
          <div className="flex items-start gap-10 w-full max-w-6xl">
            {/* Secondary nav — left of the content column, matching the case studies */}
            <SecondaryNav sections={t.sections} activeId={activeId} onNavigate={handleNavigate} lang={lang} visible={scrolledDown && !atBottom} />

            {/* Main column */}
            <div className="flex-1 min-w-0">
              {/* Title */}
              <div className="pt-32 pb-4">
                <p className="text-label-s font-medium leading-[1.2] text-fg-muted mb-3">
                  {t.updated} {formatDate(LAST_UPDATED, lang)}
                </p>
                <h1 className="text-h1 font-bold leading-tight text-fg-primary">
                  {t.title}
                </h1>
              </div>

              <div className="py-8">
              {/* Intro */}
              <div className="mb-8" style={{ animation: 'fade-in 0.5s cubic-bezier(0.22,1,0.36,1) both', animationDelay: '0.05s' }}>
                <p className={body}>{t.intro}</p>
              </div>

              <ol className="space-y-0">
                {t.sections.map((s, i) => (
                  <CookieSection key={s.id} s={s} num={i + 1} browserLabel={t.browserLabel} newTabLabel={t.newTabLabel} manageBtn={t.manageBtn} delay={`${0.1 + i * 0.07}s`} />
                ))}
              </ol>
            </div>{/* py-8 */}
            </div>{/* main column */}
          </div>{/* flex row */}

          {/* Outro — outside flex row so sticky nav stops before it */}
          <p className="text-h3 font-semibold leading-snug text-center text-fg-primary py-16">
            {t.outro}
          </p>
        </div>{/* px-6 */}

        {/* Secondary nav is tablet/desktop only — hidden on mobile */}
        <div inert={scrolledDown && !atBottom && !scrollingDown ? undefined : true} className={`hidden fixed bottom-2 left-4 right-4 z-40 flex justify-center pointer-events-none transition-opacity duration-300 ${scrolledDown && !atBottom && !scrollingDown ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="pointer-events-auto w-full">
            <MobileSecondaryNav sections={t.sections} activeId={activeId} onNavigate={handleNavigate} />
          </div>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}

export default Cookies;
