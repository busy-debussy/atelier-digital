import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { initSpringPress } from './utils/springPress';
import { GA_ID, loadGoogleAnalytics, loadClarity, trackPageView } from './analytics';
import Nav from './components/Nav';
import ScrollForMore from './components/ScrollForMore';
import CookieBanner from './components/CookieBanner';
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
        <Route path="/projects/xr" element={<XRExperiences lang={lang} isDark={isDark} />} />
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

  const toggleDark = () => setIsDark(!isDark);
  const toggleLang = () => setLang(lang === 'en' ? 'fr' : 'en');

  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageViewTracker />
      <AppShell isDark={isDark} toggleDark={toggleDark} setIsDark={setIsDark} lang={lang} toggleLang={toggleLang} />
      <CookieBanner lang={lang} />
    </BrowserRouter>
  );
}

export default App;
