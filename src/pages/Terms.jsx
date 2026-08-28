import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// ── Update this date whenever content changes ──────────────────────────────────
const LAST_UPDATED = new Date('2026-08-28');

const formatDate = (date, lang) =>
  date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const T = {
  en: {
    title:         'Terms of use',
    emoji:         '📄',
    skipToMain:    'Skip to main content',
    updated:       'Last updated:',
    intro2:        'By accessing or using this Website, you agree to the terms below.',
    contactIntro:  'For questions about these Terms, please contact:',
    privacyLink:   ['Please refer to the ', 'Privacy Policy', ' and ', 'Cookies Policy', ' pages for information on how your data is collected and used.'],
    sections: [
      { id: 'ownership',       heading: 'Ownership of content',    navLabel: 'Ownership', body: 'All content on this Website (including designs, case studies, text, images, and code) is owned by David V. unless otherwise noted. Client logos and project materials are the property of their respective owners and are used for portfolio demonstration only. You may not copy, reproduce, distribute, or adapt any content without prior written consent.' },
      { id: 'acceptable-use',  heading: 'Acceptable use',          navLabel: 'Use', body: 'You agree to use this Website lawfully and respectfully. You must not:', bullets: ["Misrepresent or claim any content as your own", "Copy portfolio work for commercial or academic use", "Use automated tools to collect or download content", "Attempt to disrupt or harm the Website's functionality"] },
      { id: 'third-party',     heading: 'Third-party links',       navLabel: 'Third-party', body: 'This Website may include links to external websites or tools. These are provided for convenience only. David V. is not responsible for the content, practices, or policies of any third party websites.' },
      { id: 'disclaimer',      heading: 'Disclaimer',              body: 'All information on this Website is provided for general and portfolio purposes only. While efforts are made to ensure accuracy, there is no guarantee that the information is complete, current, or error free.' },
      { id: 'liability',       heading: 'Limitation of liability', navLabel: 'Liability', body: 'To the fullest extent permitted by law, David V. shall not be held liable for any direct, indirect, or incidental damages arising from your use of this Website.' },
      { id: 'ai-chatbot',       heading: 'AI chatbot',              body: 'This Website includes an AI powered chatbot powered by Claude (Anthropic). By using it, you acknowledge that:', bullets: ['Responses are AI generated and may not always be accurate or complete', 'The chatbot is intended to answer questions about David\'s professional background only', 'Conversation transcripts are stored anonymously for quality and insight purposes', 'You must not attempt to misuse, manipulate, or overload the chatbot'] },
      { id: 'privacy-cookies', heading: 'Privacy and cookies',     navLabel: 'Privacy', privacyLink: true },
      { id: 'changes',         heading: 'Changes to these terms',  navLabel: 'Updates', body: 'These Terms may be updated periodically. Continued use of the Website after updates means you accept any changes.' },
      { id: 'contact',         heading: 'Contact',                 contact: true },
    ],
  },
  fr: {
    title:         "Conditions d'utilisation",
    emoji:         '📄',
    skipToMain:    'Aller au contenu principal',
    updated:       'Dernière mise à jour :',
    intro1:        'Merci de votre visite !',
    intro2:        "En accédant à ce site ou en l'utilisant, vous acceptez les conditions ci-dessous.",
    contactIntro:  'Pour toute question concernant ces conditions, veuillez contacter :',
    privacyLink:   ['Veuillez consulter les pages ', 'Politique de confidentialité', ' et ', 'Politique de cookies', " pour en savoir plus sur la collecte et l'utilisation de vos données."],
    sections: [
      { id: 'ownership',       heading: 'Propriété du contenu',        navLabel: 'Propriété', body: "Tout le contenu de ce site (y compris les maquettes, études de cas, textes, images et code) appartient à David V., sauf indication contraire. Les logos clients et documents de projet appartiennent à leurs propriétaires respectifs et sont utilisés à des fins de portfolio uniquement. Vous ne pouvez pas copier, reproduire, distribuer ou adapter ce contenu sans consentement écrit préalable." },
      { id: 'acceptable-use',  heading: 'Utilisation acceptable',      navLabel: 'Utilisation', body: "Vous acceptez d'utiliser ce site de manière légale et respectueuse. Vous ne devez pas :", bullets: ["Vous attribuer ou usurper tout contenu de ce site", "Copier des travaux du portfolio à des fins commerciales ou académiques", "Utiliser des outils automatisés pour collecter ou télécharger du contenu", "Tenter de perturber ou d'endommager le fonctionnement du site"] },
      { id: 'third-party',     heading: 'Liens tiers',                 body: "Ce site peut inclure des liens vers des sites ou outils externes. Ces liens sont fournis pour votre commodité uniquement. David V. n'est pas responsable du contenu, des pratiques ou des politiques de ces sites tiers." },
      { id: 'disclaimer',      heading: 'Avertissement',               body: "Toutes les informations de ce site sont fournies à des fins générales et de portfolio. Bien que des efforts soient faits pour en garantir l'exactitude, aucune garantie n'est offerte quant à l'exhaustivité ou l'absence d'erreurs." },
      { id: 'liability',       heading: 'Limitation de responsabilité', navLabel: 'Responsabilité', body: "Dans les limites autorisées par la loi, David V. ne saurait être tenu responsable de dommages directs, indirects ou accessoires résultant de l'utilisation de ce site." },
      { id: 'ai-chatbot',       heading: 'Chatbot IA',                  body: 'Ce site intègre un chatbot alimenté par Claude (Anthropic). En l\'utilisant, vous reconnaissez que :', bullets: ['Les réponses sont générées par une IA et peuvent ne pas toujours être exactes ou complètes', 'Le chatbot est destiné uniquement à répondre aux questions sur le parcours professionnel de David', 'Les transcriptions de conversations sont stockées anonymement à des fins de qualité et d\'analyse', 'Vous ne devez pas tenter d\'utiliser abusivement, manipuler ou surcharger le chatbot'] },
      { id: 'privacy-cookies', heading: 'Confidentialité et cookies',  navLabel: 'Vie privée', privacyLink: true },
      { id: 'changes',         heading: 'Modifications des conditions', navLabel: 'Mises à jour', body: "Ces conditions peuvent être mises à jour périodiquement. L'utilisation continue du site après toute mise à jour vaut acceptation des modifications." },
      { id: 'contact',         heading: 'Contact',                     contact: true },
    ],
  },
};

const card = 'py-12 scroll-mt-24';
const h2   = 'text-h2 font-bold leading-tight text-fg-primary mb-6';
const body = 'text-copy-m font-normal leading-loose text-fg-secondary';
const lnk  = 'underline hover:opacity-60 transition-opacity rounded-radius-half focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus';

function TermsSection({ s, num, t, delay }) {
  return (
    <li
      id={s.id}
      tabIndex={-1}
      className={`${card} focus-visible:outline-none`}
      style={{ animation: 'fade-in 0.5s cubic-bezier(0.22,1,0.36,1) both', animationDelay: delay }}
    >
      <h2 className={h2}><span className="font-bold mr-1">{num}.</span>{s.heading}</h2>

      {s.body && <p className={`${body} mb-6`}>{s.body}</p>}

      {s.bullets && (
        <ul className="list-disc list-inside space-y-2 mb-6">
          {s.bullets.map((b, i) => <li key={i} className={body}>{b}</li>)}
        </ul>
      )}

      {s.privacyLink && (
        <p className={body}>
          {t.privacyLink[0]}
          <Link to="/privacy" className={lnk}>{t.privacyLink[1]}</Link>
          {t.privacyLink[2]}
          <Link to="/cookies" className={lnk}>{t.privacyLink[3]}</Link>
          {t.privacyLink[4]}
        </p>
      )}

      {s.contact && (
        <address className={`${body} not-italic space-y-3`}>
          <p className={body}>{t.contactIntro}</p>
          <div data-squircle className="w-fit rounded-radius-5 border border-border-subtle py-5 px-8 space-y-3">
            <p className="font-semibold text-fg-primary">David V.</p>
            <p className={body}>Senior Product Designer</p>
            <p>
              <button
                onClick={() => window.location.href = 'mailto:d@AtelierDigital.co.uk'}
                className={`${body} ${lnk} cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded`}
                aria-label="Send an email to David"
              >
                <span className="obf-email" data-u="d" data-d="AtelierDigital.co.uk" aria-hidden="true" />
              </button>
            </p>
            <p><Link to="/" className={`${body} ${lnk}`}>www.AtelierDigital.co.uk</Link></p>
          </div>
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
  const expandLabel   = lang === 'fr' ? 'Développer' : 'Expand';

  // Collapsed → fixed pill at the centre-left of the viewport. An empty
  // placeholder keeps the original nav column width so the page content does
  // not shift when minimising/restoring.
  if (collapsed) {
    return (
      <>
        <div className="hidden md:block w-36 shrink-0" aria-hidden="true" />
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
              <path d="M4 5h16M4 12h12M4 19h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
      <div className="hidden md:block w-36 shrink-0" aria-hidden="true" />
      <nav aria-label="Page sections" className="hidden md:block fixed top-[240px] left-6 min-[1200px]:left-[calc(50%_-_36rem)] z-10 w-36">
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
                    ? 'text-fg-primary font-semibold bg-bg-page border border-black/[0.08] dark:border-white/[0.10]'
                    : 'text-fg-muted font-normal border border-transparent hover:text-fg-primary hover:bg-nav-active-bg'
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
      </div>
    </nav>
    </>
  );
}

function Terms({ lang }) {
  const t = T[lang];
  const year = new Date().getFullYear();
  const [activeId, setActiveId] = useState('');
  const [mounted,     setMounted]     = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [atBottom,    setAtBottom]    = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const suppressRef = useRef(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.title = lang === 'fr' ? 'Conditions • Atelier Digital' : 'Terms • Atelier Digital';
  }, [lang]);

  useEffect(() => {
    const observers = t.sections.map(s => {
      const el = document.getElementById(s.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting && !suppressRef.current) setActiveId(s.id); },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [lang]);

  useEffect(() => {
    const firstEl = document.getElementById(t.sections[0].id);
    const lastEl  = document.getElementById(t.sections[t.sections.length - 1].id);
    if (!firstEl || !lastEl) return;
    const update = () => {
      // Anchor = scroll-mt-24 (96px). Mirrors the case-study pattern: the nav is
      // visible at the first and last sections' anchors and hides ~50px past
      // either end. Top buffer = 96 + 50; bottom = (96 + section height) − 50.
      setScrolledDown(firstEl.getBoundingClientRect().top < 146);
      setAtBottom(lastEl.getBoundingClientRect().bottom < lastEl.offsetHeight + 46);
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

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-radius-2 focus:ring-2 focus:ring-border-focus focus:bg-white focus:text-fg-primary focus:outline-none font-medium">
        {t.skipToMain}
      </a>
      <main id="main-content" aria-label={t.title} className={`bg-bg-page dark:bg-bg-surface min-h-screen transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`} tabIndex={-1}>
        <div className="px-6 flex flex-col items-center">
          <div className="flex items-start gap-10 w-full max-w-6xl">
            <SecondaryNav sections={t.sections} activeId={activeId} onNavigate={handleNavigate} lang={lang} visible={scrolledDown && !atBottom} />

            {/* Main column */}
            <div className="flex-1 min-w-0 max-w-3xl">
              <div className="pt-32 pb-4">
                <p className="text-label-s font-medium leading-[1.2] text-fg-muted mb-3">
                  {t.updated} {formatDate(LAST_UPDATED, lang)}
                </p>
                <h1 className="text-h1 font-bold leading-tight text-fg-primary">
                  {t.title}
                </h1>
              </div>

              <div className="py-8">
                <div className="mb-8" style={{ animation: 'fade-in 0.5s cubic-bezier(0.22,1,0.36,1) both', animationDelay: '0.05s' }}>
                  <p className={`${body} font-semibold text-fg-primary mb-1`}>{t.intro1}</p>
                  <p className={body}>{t.intro2}</p>
                </div>
                <ol className="space-y-0">
                  {t.sections.map((s, i) => (
                    <TermsSection key={s.id} s={s} num={i + 1} t={t} delay={`${0.1 + i * 0.07}s`} />
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Outro — outside flex row so sticky nav stops before it */}
          <p className="text-h3 font-semibold leading-snug text-center text-fg-primary py-16">
            © {year} David V.{lang === 'fr' ? ' Tous droits réservés.' : ' All rights reserved.'}
          </p>
        </div>
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

export default Terms;
