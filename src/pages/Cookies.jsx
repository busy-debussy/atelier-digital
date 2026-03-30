import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// ── Update this date whenever content changes ──────────────────────────────────
const LAST_UPDATED = new Date('2026-03-26');

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
            heading: 'Hotjar by Content Square',
            body: 'This Website also uses Hotjar, a behaviour analytics tool that provides heat maps. Hotjar helps me understand how visitors interact visually with the site to improve usability. Hotjar may collect anonymised information such as:',
            bullets: ['Clicks, taps, scrolling behaviour', 'Device and browser type', 'Pages visited', 'Screen resolution and language', 'Referring pages'],
            links: [
              { label: 'Privacy policy', href: 'https://www.hotjar.com/legal/policies/privacy/' },
              { label: 'Do not track', href: 'https://www.hotjar.com/policies/do-not-track/' },
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
        body: "Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez un site web. Ils contribuent à améliorer votre expérience de navigation en fournissant des statistiques d'utilisation anonymes.",
      },
      {
        id: 'how-used',
        heading: 'Comment les cookies sont-ils utilisés ?',
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
            heading: 'Hotjar by Content Square',
            body: "Ce site utilise également Hotjar, un outil d'analyse comportementale. Hotjar m'aide à comprendre comment les visiteurs interagissent visuellement avec le site. Hotjar peut collecter des informations anonymisées telles que :",
            bullets: ['Clics, tapotements, comportement de défilement', "Type d'appareil et de navigateur", 'Pages visitées', "Résolution d'écran et langue", 'Pages de référence'],
            links: [
              { label: 'Politique de confidentialité', href: 'https://www.hotjar.com/legal/policies/privacy/' },
              { label: 'Ne pas suivre', href: 'https://www.hotjar.com/privacy/do-not-track/' },
            ],
          },
        ],
      },
      {
        id: 'managing',
        heading: 'Gestion des cookies',
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
const h2   = 'text-[24px] sm:text-[28px] lg:text-[30px] font-bold leading-tight text-[#1f1f1f] dark:text-[#f6f6f6] mb-6';
const h3   = 'text-[15px] sm:text-[16px] lg:text-[17px] font-semibold leading-snug text-[#1f1f1f] dark:text-[#f6f6f6] mb-3 mt-10';
const body = 'text-[16px] sm:text-[17px] lg:text-[18px] leading-loose text-[#262626] dark:text-[#adadad]';
const lnk  = 'underline hover:opacity-60 transition-opacity rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC]';

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
              <span className="font-semibold text-[#1f1f1f] dark:text-[#f6f6f6]">{b.label}:</span> {b.text}
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
          className={`mt-2 px-5 py-2.5 text-[14px] sm:text-[15px] font-medium rounded-xl bg-[#1f1f1f] dark:bg-[#f6f6f6] text-white dark:text-[#1f1f1f] hover:opacity-80 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC]`}
        >
          {manageBtn}
        </button>
      )}

      {s.contact && (
        <address className={`${body} not-italic mt-2 space-y-3`}>
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
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  el.focus({ preventScroll: true });
};

function SecondaryNav({ sections, activeId }) {
  return (
    <nav aria-label="Page sections" className="hidden md:block sticky top-16 self-start z-10 w-44 shrink-0 pt-28">
      <ol className="space-y-2">
        {sections.map((s, i) => {
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

function Cookies({ lang }) {
  const t = T[lang];
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    document.title = lang === 'fr' ? 'Cookies • Atelier Digital' : 'Cookies • Atelier Digital';
  }, [lang]);

  useEffect(() => {
    const observers = t.sections.map(s => {
      const el = document.getElementById(s.id);
      if (!el) return null;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActiveId(s.id); }, { rootMargin: '-30% 0px -60% 0px' });
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
        {/* Shared layout wrapper */}
        <div className="px-6 flex flex-col items-center">
          <div className="flex items-start gap-10 w-full max-w-6xl">
            {/* Left spacer — smaller than the secondary nav to shift content left without losing all whitespace */}
            <div className="hidden md:block w-20 shrink-0" />

            {/* Main column */}
            <div className="flex-1 min-w-0">
              {/* Title */}
              <div className="pt-32 pb-4">
                <p className="text-sm text-[#5c5c5c] dark:text-[#adadad] mb-3">
                  {t.updated} {formatDate(LAST_UPDATED, lang)}
                </p>
                <h1 className="text-[36px] sm:text-[44px] font-semibold leading-tight text-[#1f1f1f] dark:text-[#f6f6f6]">
                  {t.title} {t.emoji}
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

            <SecondaryNav sections={t.sections} activeId={activeId} />
          </div>{/* flex row */}

          {/* Outro — outside flex row so sticky nav stops before it */}
          <p className="text-[22px] sm:text-[26px] font-bold text-center text-[#1f1f1f] dark:text-[#f6f6f6] py-16">
            {t.outro}
          </p>
        </div>{/* px-6 */}
      </main>
      <Footer lang={lang} />
    </>
  );
}

export default Cookies;
