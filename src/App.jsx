import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { initSpringPress } from './utils/springPress';
import { GA_ID, loadGoogleAnalytics, loadClarity, trackPageView } from './analytics';
import Nav from './components/Nav';
import ScrollForMore from './components/ScrollForMore';
import CookieBanner from './components/CookieBanner';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import SalesPlatform from './pages/SalesPlatform';
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

function AnimatedRoutes({ children }) {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}

function AppShell({ isDark, toggleDark, setIsDark, lang, toggleLang }) {
  const { pathname } = useLocation();
  return (
    <div id="app-shell" className="min-h-screen bg-white dark:bg-[#141414] text-gray-900 dark:text-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#1f1f1f] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold">
        {lang === 'fr' ? 'Aller au contenu principal' : 'Skip to main content'}
      </a>
      <Nav isDark={isDark} toggleDark={toggleDark} lang={lang} toggleLang={toggleLang} />
      {(pathname === '/resume' || pathname === '/projects/sales-platform') && <ScrollForMore lang={lang} scrollTarget={pathname === '/resume' ? 'summary-bio' : undefined} />}
      <AnimatedRoutes><Routes>
        <Route path="/" element={<Home lang={lang} isDark={isDark} enableDark={() => setIsDark(true)} />} />
        <Route path="/projects/sales-platform" element={<SalesPlatform lang={lang} isDark={isDark} />} />
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

      if (e.code === 'KeyD') setIsDark(d => !d);
      if (e.code === 'KeyL') setLang(l => l === 'en' ? 'fr' : 'en');
      if (e.code === 'KeyC') window.dispatchEvent(new CustomEvent('toggle-chat'));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const [chatOpen, setChatOpen] = useState(false);
  const [secondaryNavVisible, setSecondaryNavVisible] = useState(false);
  const toggleDark = () => setIsDark(!isDark);
  const toggleLang = () => setLang(lang === 'en' ? 'fr' : 'en');

  useEffect(() => {
    const handler = (e) => setSecondaryNavVisible(e.detail);
    window.addEventListener('secondary-nav-change', handler);
    return () => window.removeEventListener('secondary-nav-change', handler);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageViewTracker />
      <div inert={chatOpen || undefined}>
        <AppShell isDark={isDark} toggleDark={toggleDark} setIsDark={setIsDark} lang={lang} toggleLang={toggleLang} />
        <CookieBanner lang={lang} hideFloating={secondaryNavVisible} />
      </div>
      <ChatBot lang={lang} onOpenChange={setChatOpen} hideFloating={secondaryNavVisible} />
    </BrowserRouter>
  );
}

export default App;
