import Hero from '../components/Hero';
import CaseStudies from '../components/CaseStudies';
import Collaborations from '../components/Collaborations';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollForMore from '../components/ScrollForMore';

import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Secondary nav — same floating panel + collapse-to-pill pattern as Resume
// and the case studies. Flat list (no subsections): Case studies →
// Collaborators → Contact are the only real content blocks after the Hero.
const SECTIONS = {
  en: [
    { id: 'case-studies',  title: 'Case studies' },
    { id: 'collaborators', title: 'Collaborators' },
    { id: 'contact',       title: 'Get in touch' },
  ],
  fr: [
    { id: 'case-studies',  title: 'Études de cas' },
    { id: 'collaborators', title: 'Collaborateurs' },
    { id: 'contact',       title: 'Prenons contact' },
  ],
};

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  el.focus({ preventScroll: true });
};

// Floating panel positioned via `fixed` + `right: calc(50% + Nrem)` (no
// reserved flex column) — the offsets are the ones tuned for the case
// studies' `md:max-w-2xl lg:max-w-[52rem]` reading column, which
// CaseStudies/Collaborations/Contact all reuse verbatim, so the nav hugs
// the same edge here.
function SecondaryNav({ sections, activeId, onNavigate, lang, visible = true }) {
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
  const expandLabel   = lang === 'fr' ? 'Développer' : 'Expand';

  if (collapsed) {
    return (
      <div className={`hidden min-[920px]:block fixed left-2 top-1/2 -translate-y-1/2 z-10 transition-opacity duration-180 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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
    <div
      inert={!visible}
      className={`hidden min-[920px]:block fixed z-10 top-[240px] min-[920px]:right-[calc(50%_+_20.5rem)] lg:right-[calc(50%_+_25.5rem)] ${visible ? '' : 'pointer-events-none'}`}
    >
      <nav aria-label="Page sections" className={`relative p-2 backdrop-blur-3 bg-nav-bg rounded-radius-6 shadow-xs ring-1 ring-nav-ring transition-opacity duration-180 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <ol className="grid gap-1" style={{ gridTemplateColumns: 'max-content' }}>
          {sections.map((s) => {
            const isActive = activeId === s.id;
            return (
              <li key={s.id}>
                <button
                  onClick={() => onNavigate(s.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative text-tooltip leading-snug py-2 px-3 rounded-full text-left w-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus border ${
                    isActive
                      ? 'text-fg-primary font-semibold bg-bg-page border-black/[0.08] dark:border-white/[0.10]'
                      : 'text-fg-muted font-normal border-transparent hover:text-fg-primary hover:bg-nav-active-bg'
                  }`}
                >
                  <span aria-hidden="true" className="font-semibold invisible block select-none whitespace-nowrap">{s.title}</span>
                  <span className="absolute inset-0 py-2 px-3 whitespace-nowrap">{s.title}</span>
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
      </nav>
    </div>
  );
}

function Home({ lang, isDark, enableDark }) {
  const [showScroll, setShowScroll] = useState(false);
  const { hash } = useLocation();

  const sections = SECTIONS[lang] ?? SECTIONS.en;
  const [activeId, setActiveId] = useState('');
  const [scrolledDown, setScrolledDown] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const scrollTarget = useRef(null);
  // Tracks whether the (collapsible) Contact section is actually open, so the
  // Footer's top spacing can match: full when Contact is open, tighter when
  // it's collapsed shut — rather than a flat reduction that's wrong either way.
  const [contactOpen, setContactOpen] = useState(true);

  const handleNavigate = (id) => {
    setActiveId(id);
    scrollTarget.current = id;
    setScrolledDown(true);
    scrollToSection(id);
    setTimeout(() => { scrollTarget.current = null; }, 1500);
  };

  useEffect(() => {
    document.title = 'Atelier Digital • David V.';
  }, []);

  useEffect(() => {
    if (!hash) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile  = window.matchMedia('(max-width: 639px)').matches;
    const id = setTimeout(() => {
      if (hash === '#case-studies' && mobile) {
        window.scrollBy({ top: window.innerHeight * 1.0, behavior: reduced ? 'instant' : 'smooth' });
      } else {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' });
      }
    }, 50);
    return () => clearTimeout(id);
  }, [hash]);

  // Active section via IntersectionObserver — same rootMargin shape as the
  // case-study secondary navs, so the highlight transitions feel identical.
  useEffect(() => {
    const observers = sections.map(s => {
      const el = document.getElementById(s.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          if (scrollTarget.current) {
            if (s.id === scrollTarget.current) { scrollTarget.current = null; setActiveId(s.id); }
          } else {
            setActiveId(s.id);
          }
        },
        { rootMargin: '-10% 0px -70% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [lang, sections]);

  // Show/hide the nav based on scroll position relative to the first + last
  // sections, so it appears once you're past the Hero and hides at the bottom.
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
  }, [lang, sections]);

  return (
    <>
      {showScroll && <ScrollForMore lang={lang} scrollAmount={1.0} />}

      <SecondaryNav sections={sections} activeId={activeId} onNavigate={handleNavigate} visible={scrolledDown && !atBottom} lang={lang} />

      <main id="main-content" lang={lang} aria-label={lang === 'fr' ? "Page d'accueil" : 'Home page'} tabIndex={-1}>
        <Hero lang={lang} isDark={isDark} enableDark={enableDark} onDone={() => setShowScroll(true)} />
        <CaseStudies lang={lang} lgAlignWidth={720} smAlignWidth={536} collapsible />
        <Collaborations lang={lang} lgAlignWidth={720} smAlignWidth={536} collapsible />
        <Contact lang={lang} variant="home" lgAlignWidth={720} smAlignWidth={536} showDesktopNav collapsible onOpenChange={setContactOpen} />
      </main>
      <Footer lang={lang} tightTop={!contactOpen} />
    </>
  );
}

export default Home;
