import Hero from '../components/Hero';
import CaseStudies from '../components/CaseStudies';
import Collaborations from '../components/Collaborations';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollForMore from '../components/ScrollForMore';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Home({ lang, isDark, enableDark }) {
  const [showScroll, setShowScroll] = useState(false);
  const { hash } = useLocation();

  useEffect(() => {
    document.title = 'Atelier Digital • David V.';
  }, []);

  useEffect(() => {
    if (!hash) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const id = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' });
    }, 50);
    return () => clearTimeout(id);
  }, [hash]);

  return (
    <>
      {showScroll && <ScrollForMore lang={lang} />}
      <main id="main-content" lang={lang} aria-label={lang === 'fr' ? "Page d'accueil" : 'Home page'} tabIndex={-1}>
        <Hero lang={lang} isDark={isDark} enableDark={enableDark} onDone={() => setShowScroll(true)} />
        <CaseStudies lang={lang} lgAlignWidth={720} smAlignWidth={536} />
        <Collaborations lang={lang} lgAlignWidth={720} smAlignWidth={536} />
        <Contact lang={lang} variant="home" lgAlignWidth={720} smAlignWidth={536} showDesktopNav />
      </main>
      <Footer lang={lang} />
    </>
  );
}

export default Home;
