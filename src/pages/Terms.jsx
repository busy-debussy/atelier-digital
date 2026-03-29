import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// ── Update this date whenever content changes ──────────────────────────────────
const LAST_UPDATED = new Date('2026-03-26');

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
      { id: 'ownership',       heading: 'Ownership of content',    body: 'All content on this Website — including designs, case studies, text, images, and code — is owned by David V. unless otherwise noted. Client logos and project materials are the property of their respective owners and are used for portfolio demonstration only. You may not copy, reproduce, distribute, or adapt any content without prior written consent.' },
      { id: 'acceptable-use',  heading: 'Acceptable use',          body: 'You agree to use this Website lawfully and respectfully. You must not:', bullets: ["Misrepresent or claim any content as your own", "Copy portfolio work for commercial or academic use", "Use automated tools to collect or download content", "Attempt to disrupt or harm the Website's functionality"] },
      { id: 'third-party',     heading: 'Third-party links',       body: 'This Website may include links to external websites or tools. These are provided for convenience only. David V. is not responsible for the content, practices, or policies of any third-party websites.' },
      { id: 'disclaimer',      heading: 'Disclaimer',              body: 'All information on this Website is provided for general and portfolio purposes only. While efforts are made to ensure accuracy, there is no guarantee that the information is complete, current, or error-free.' },
      { id: 'liability',       heading: 'Limitation of liability', body: 'To the fullest extent permitted by law, David V. shall not be held liable for any direct, indirect, or incidental damages arising from your use of this Website.' },
      { id: 'privacy-cookies', heading: 'Privacy and cookies',     privacyLink: true },
      { id: 'changes',         heading: 'Changes to these terms',  body: 'These Terms may be updated periodically. Continued use of the Website after updates means you accept any changes.' },
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
      { id: 'ownership',       heading: 'Propriété du contenu',        body: "Tout le contenu de ce site — y compris les maquettes, études de cas, textes, images et code — appartient à David V., sauf indication contraire. Les logos clients et documents de projet appartiennent à leurs propriétaires respectifs et sont utilisés à des fins de portfolio uniquement. Vous ne pouvez pas copier, reproduire, distribuer ou adapter ce contenu sans consentement écrit préalable." },
      { id: 'acceptable-use',  heading: 'Utilisation acceptable',      body: "Vous acceptez d'utiliser ce site de manière légale et respectueuse. Vous ne devez pas :", bullets: ["Vous attribuer ou usurper tout contenu de ce site", "Copier des travaux du portfolio à des fins commerciales ou académiques", "Utiliser des outils automatisés pour collecter ou télécharger du contenu", "Tenter de perturber ou d'endommager le fonctionnement du site"] },
      { id: 'third-party',     heading: 'Liens tiers',                 body: "Ce site peut inclure des liens vers des sites ou outils externes. Ces liens sont fournis pour votre commodité uniquement. David V. n'est pas responsable du contenu, des pratiques ou des politiques de ces sites tiers." },
      { id: 'disclaimer',      heading: 'Avertissement',               body: "Toutes les informations de ce site sont fournies à des fins générales et de portfolio. Bien que des efforts soient faits pour en garantir l'exactitude, aucune garantie n'est offerte quant à l'exhaustivité ou l'absence d'erreurs." },
      { id: 'liability',       heading: 'Limitation de responsabilité', body: "Dans les limites autorisées par la loi, David V. ne saurait être tenu responsable de dommages directs, indirects ou accessoires résultant de l'utilisation de ce site." },
      { id: 'privacy-cookies', heading: 'Confidentialité et cookies',  privacyLink: true },
      { id: 'changes',         heading: 'Modifications des conditions', body: "Ces conditions peuvent être mises à jour périodiquement. L'utilisation continue du site après toute mise à jour vaut acceptation des modifications." },
      { id: 'contact',         heading: 'Contact',                     contact: true },
    ],
  },
};

const card = 'py-12 scroll-mt-24';
const h2   = 'text-[24px] sm:text-[28px] lg:text-[30px] font-bold leading-tight text-[#1f1f1f] dark:text-[#f6f6f6] mb-6';
const body = 'text-[16px] sm:text-[17px] lg:text-[18px] leading-loose text-[#262626] dark:text-[#adadad]';
const lnk  = 'underline hover:opacity-60 transition-opacity rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC]';

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
          <p className="font-semibold text-[#1f1f1f] dark:text-[#f6f6f6]">David V. — Senior Product Designer</p>
          <p>
            <button
              onClick={() => window.location.href = 'mailto:d@AtelierDigital.co.uk'}
              className={`${body} ${lnk} cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC] rounded`}
              aria-label="Send an email to David"
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
  const top = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  el.focus({ preventScroll: true });
};

function SecondaryNav({ sections, activeId }) {
  return (
    <nav aria-label="Page sections" className="hidden md:block sticky top-16 self-start z-10 w-44 shrink-0 pt-28">
      <ol className="space-y-2">
        {sections.map((s) => {
          const isActive = activeId === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() => scrollToSection(s.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative text-[13px] leading-snug py-1.5 px-2 rounded-lg text-left w-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC] ${
                  isActive
                    ? 'text-[#1f1f1f] dark:text-[#f6f6f6] font-semibold bg-black/[0.04] dark:bg-white/[0.06]'
                    : 'text-[#5c5c5c] dark:text-[#adadad] font-normal hover:text-[#1f1f1f] dark:hover:text-[#f6f6f6] hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                }`}
              >
                {/* Invisible bold copy locks the button height to its semibold size — prevents 1→2 line reflow on hover */}
                <span aria-hidden="true" className="font-semibold invisible block select-none">{s.heading}</span>
                <span className="absolute inset-0 py-1.5 px-2">{s.heading}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function Terms({ lang }) {
  const t = T[lang];
  const year = new Date().getFullYear();
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    document.title = lang === 'fr' ? 'Conditions • Atelier Digital' : 'Terms • Atelier Digital';
  }, [lang]);

  useEffect(() => {
    const observers = t.sections.map(s => {
      const el = document.getElementById(s.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveId(s.id); },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [lang]);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:ring-2 focus:ring-[#0152EC] focus:bg-white focus:text-[#1f1f1f] focus:outline-none font-medium">
        {t.skipToMain}
      </a>
      <main id="main-content" aria-label={t.title} className="bg-white dark:bg-[#1f1f1f] min-h-screen" tabIndex={-1}>
        <div className="px-6 flex flex-col items-center">
          <div className="flex items-start gap-10 w-full max-w-6xl">
            {/* Left spacer — smaller than the secondary nav to shift content left without losing all whitespace */}
            <div className="hidden md:block w-20 shrink-0" />

            {/* Main column */}
            <div className="flex-1 min-w-0">
              <div className="pt-32 pb-4">
                <p className="text-sm text-[#5c5c5c] dark:text-[#adadad] mb-3">
                  {t.updated} {formatDate(LAST_UPDATED, lang)}
                </p>
                <h1 className="text-[36px] sm:text-[44px] font-semibold leading-tight text-[#1f1f1f] dark:text-[#f6f6f6]">
                  {t.title} {t.emoji}
                </h1>
              </div>

              <div className="py-8">
                <div className="mb-8" style={{ animation: 'fade-in 0.5s cubic-bezier(0.22,1,0.36,1) both', animationDelay: '0.05s' }}>
                  <p className={`${body} font-semibold text-[#1f1f1f] dark:text-[#f6f6f6] mb-1`}>{t.intro1}</p>
                  <p className={body}>{t.intro2}</p>
                </div>
                <ol className="space-y-0">
                  {t.sections.map((s, i) => (
                    <TermsSection key={s.id} s={s} num={i + 1} t={t} delay={`${0.1 + i * 0.07}s`} />
                  ))}
                </ol>
              </div>
            </div>

            <SecondaryNav sections={t.sections} activeId={activeId} />
          </div>

          {/* Outro — outside flex row so sticky nav stops before it */}
          <p className="text-[22px] sm:text-[26px] font-bold text-center text-[#1f1f1f] dark:text-[#f6f6f6] py-16">
            © {year} David V.{lang === 'fr' ? ' Tous droits réservés.' : ' All rights reserved.'}
          </p>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}

export default Terms;
