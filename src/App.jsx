import { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { initSpringPress } from './utils/springPress';
import { initSquircle } from './utils/squircle';
import { GA_ID, loadGoogleAnalytics, loadClarity, trackPageView, trackEvent } from './analytics';
import Nav from './components/Nav';
import ScrollForMore from './components/ScrollForMore';
import CookieBanner from './components/CookieBanner';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import SalesPlatform from './pages/SalesPlatform';
import XRExperiences from './pages/XRExperiences';
import Resume from './pages/Resume';
import Cookies from './pages/Cookies';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

// Fires a GA4 page_view on every client-side navigation.
// The initial pageview is sent here too (send_page_view: false disables the auto one).
function PageViewTracker() {
  const { pathname } = useLocation();
  useEffect(() => { trackPageView(pathname); }, [pathname]);
  return null;
}

function AnimatedRoutes({ children, enterDirRef }) {
  const { pathname } = useLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cls = useMemo(() => {
    const dir = enterDirRef?.current;
    return dir === -1 ? 'page-slide-from-right' : dir === 1 ? 'page-slide-from-left' : 'page-enter';
  }, [pathname]);
  return (
    <div
      key={pathname}
      className={cls}
      onAnimationEnd={e => { if (e.target === e.currentTarget) e.currentTarget.className = ''; }}
    >
      {children}
    </div>
  );
}

const PROJECTS = ['/case-study/sales-platform', '/case-study/xr'];

function AppShell({ isDark, toggleDark, setIsDark, lang, toggleLang }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const enterDirRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      enterDirRef.current = e.detail?.dir ?? null;
      const idx = PROJECTS.indexOf(pathname);
      const next = PROJECTS[(idx + 1) % PROJECTS.length];
      navigate(next);
      setTimeout(() => { enterDirRef.current = null; }, 450);
    };
    window.addEventListener('cycle-project', handler);
    return () => window.removeEventListener('cycle-project', handler);
  }, [pathname, navigate]);

  useEffect(() => {
    const handler = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.code === 'KeyH') { pathname === '/' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : navigate('/'); trackEvent('keyboard_shortcut', { key: 'H' }); }
      if (e.code === 'KeyR') { pathname === '/resume' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : navigate('/resume'); trackEvent('keyboard_shortcut', { key: 'R' }); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [pathname, navigate]);

  return (
    <div id="app-shell" className="min-h-screen bg-bg-page text-gray-900 dark:text-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-tooltip-bg focus:text-white focus:rounded-radius-2 focus:text-sm focus:font-semibold">
        {lang === 'fr' ? 'Aller au contenu principal' : 'Skip to main content'}
      </a>
      <Nav isDark={isDark} toggleDark={toggleDark} lang={lang} toggleLang={toggleLang} />
      {(pathname === '/resume' || pathname === '/case-study/sales-platform' || pathname === '/case-study/xr') && <ScrollForMore lang={lang} scrollTarget={pathname === '/resume' ? 'summary-bio' : undefined} />}
      <AnimatedRoutes enterDirRef={enterDirRef}><Routes>
        <Route path="/" element={<Home lang={lang} isDark={isDark} enableDark={() => setIsDark(true)} />} />
        <Route path="/case-study/sales-platform" element={<SalesPlatform lang={lang} isDark={isDark} />} />
        <Route path="/case-study/xr" element={<XRExperiences lang={lang} isDark={isDark} />} />
<Route path="/resume" element={<Resume lang={lang} />} />
        <Route path="/cookies" element={<Cookies lang={lang} />} />
        <Route path="/privacy" element={<Privacy lang={lang} />} />
        <Route path="/terms" element={<Terms lang={lang} />} />
        <Route path="*" element={<NotFound lang={lang} />} />
      </Routes></AnimatedRoutes>
    </div>
  );
}

function App() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState('en');

  useEffect(() => initSpringPress(), []);
  useEffect(() => initSquircle(), []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#141414');
    } else {
      document.documentElement.classList.remove('dark');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#ffffff');
    }
  }, [isDark]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Load analytics scripts if consent was already given (previous visit)
  // and re-check whenever consent changes in the current session
  useEffect(() => {
    const tryLoad = () => {
      if (localStorage.getItem('cookie-consent') === 'accepted') {
        loadGoogleAnalytics(GA_ID);
        loadClarity();
      }
    };
    tryLoad();
    window.addEventListener('cookie-consent-changed', tryLoad);
    return () => window.removeEventListener('cookie-consent-changed', tryLoad);
  }, []);

  const konamiRef = useRef([]);
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];


  useEffect(() => {
    const handler = (e) => {
      // Skip if any modifier is held, or if focus is in a text field
      if (e.code === 'Escape') { window.dispatchEvent(new CustomEvent('close-chat')); return; }
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      // Konami code
      konamiRef.current = [...konamiRef.current, e.code].slice(-KONAMI.length);
      if (konamiRef.current.join(',') === KONAMI.join(',')) {
        konamiRef.current = [];
        confetti({ particleCount: 200, spread: 120, origin: { y: 0.6 } });
      }

      if (e.code === 'KeyD') { setIsDark(d => !d); trackEvent('dark_mode_toggle'); }
      if (e.code === 'KeyL' || e.code === 'KeyF') { setLang(l => { const next = l === 'en' ? 'fr' : 'en'; trackEvent('language_toggle', { language: next }); return next; }); }
      if (e.code === 'KeyC') { window.dispatchEvent(new CustomEvent('toggle-chat')); trackEvent('keyboard_shortcut', { key: 'C' }); }
      if (e.code === 'KeyP') { window.dispatchEvent(new CustomEvent('cycle-project')); trackEvent('keyboard_shortcut', { key: 'P' }); }
      if (e.code === 'KeyT') { window.dispatchEvent(new CustomEvent('toggle-contact')); trackEvent('keyboard_shortcut', { key: 'T' }); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const [chatOpen, setChatOpen] = useState(false);
  const [secondaryNavVisible, setSecondaryNavVisible] = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false);
  const toggleDark = () => setIsDark(!isDark);
  const toggleLang = () => setLang(lang === 'en' ? 'fr' : 'en');

  useEffect(() => {
    const handler = (e) => setSecondaryNavVisible(e.detail);
    window.addEventListener('secondary-nav-change', handler);
    return () => window.removeEventListener('secondary-nav-change', handler);
  }, []);

  const navScrollRef = useRef(false);
  useEffect(() => {
    const onNavScroll = () => {
      navScrollRef.current = true;
      setScrolledDown(false);
      setTimeout(() => { navScrollRef.current = false; setScrolledDown(false); }, 1500);
    };
    window.addEventListener('nav-scroll-start', onNavScroll);
    return () => window.removeEventListener('nav-scroll-start', onNavScroll);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (!navScrollRef.current) {
        if (y > lastY && y > 80) setScrolledDown(true);
        else if (y < lastY) setScrolledDown(false);
      }
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageViewTracker />
      <div inert={chatOpen || undefined}>
        <AppShell isDark={isDark} toggleDark={toggleDark} setIsDark={setIsDark} lang={lang} toggleLang={toggleLang} />
        <CookieBanner lang={lang} hideFloating={secondaryNavVisible} />
      </div>
      <ChatBot lang={lang} onOpenChange={setChatOpen} fadeFloating={scrolledDown} />
    </BrowserRouter>
  );
}

export default App;
