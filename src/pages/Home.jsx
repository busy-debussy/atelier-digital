import Hero from '../components/Hero';
import CaseStudies from '../components/CaseStudies';
import Collaborations from '../components/Collaborations';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollForMore from '../components/ScrollForMore';

import { useState, useEffect } from 'react';

function Home({ lang, isDark, enableDark }) {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    document.title = 'Atelier Digital • David V.';
  }, []);

  return (
    <>
      {showScroll && <ScrollForMore lang={lang} />}
      <main id="main-content" lang={lang} aria-label={lang === 'fr' ? "Page d'accueil" : 'Home page'} tabIndex={-1}>
        <Hero lang={lang} isDark={isDark} enableDark={enableDark} onDone={() => setShowScroll(true)} />
        <CaseStudies lang={lang} />
        <Collaborations lang={lang} lgAlignWidth={720} smAlignWidth={536} />
        <Contact lang={lang} variant="home" />
      </main>
      <Footer lang={lang} />
    </>
  );
}

export default Home;
