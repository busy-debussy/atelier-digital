import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// ── Update this date whenever content changes ──────────────────────────────────
const LAST_UPDATED = new Date('2026-03-26');

const formatDate = (date, lang) =>
  date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const T = {
  en: {
    title:        'Privacy policy',
    emoji:        '🔒',
    skipToMain:   'Skip to main content',
    updated:      'Last updated:',
    intro:        'This page explains how your personal data is collected, used, and protected when you visit Atelier Digital. I aim to be clear and transparent.',
    outro:        'Your privacy is valued and handled with care.',
    contactLabel: 'Contact:',
    cookiesLink:  ['See ', 'Cookies Policy', ' for full details and management.'],
    sections: [
      { id: 'controller',     heading: 'Controller',                    nameBody: 'Name: David V.', contact: true },
      { id: 'data-collected', heading: 'Personal data collected',       bullets: ['Essential technical data (e.g., cookie banner state, session preferences)', 'Analytics data (pages visited, time on page, device/browser type)', 'Behavioural insights (anonymised heat maps, session recordings via Hotjar by Content Square, only with consent)', 'Contact info if you email me (name, email)'] },
      { id: 'how-collected',  heading: 'How data is collected',         bullets: ['Cookies and similar technologies', 'Analytics tools: Google Analytics (only if consented)', 'Behavioural tools: Hotjar by Content Square (only if consented)', 'Direct contact (email)'] },
      { id: 'legal-bases',    heading: 'Purposes and legal bases',      navLabel: 'Purposes and legal\nbases', bullets: ['Essential site functionality: legitimate interest', 'Analytics & site improvements: consent', 'Behavioural insights: consent', 'Communication: consent or legitimate interest depending on context'] },
      { id: 'third-party',    heading: 'Third-party services',          bullets: ['Google Analytics: anonymous aggregated usage data. Opt-out available via cookie settings or Google opt-out tool.', 'Hotjar by Content Square: anonymised heat maps. Only enabled with consent.'] },
      { id: 'cookies-track',  heading: 'Cookies and tracking',          cookiesLink: true },
      { id: 'retention',      heading: 'Data retention',                body: 'Data is retained only as long as necessary. Analytics data is stored in anonymised or aggregated form.' },
      { id: 'transfers',      heading: 'International transfers',       body: 'Data may be processed outside the EU/UK (e.g., Google servers). Appropriate safeguards are applied.' },
      { id: 'your-rights',    heading: 'Your rights (EU/UK residents)', bullets: ['Access your data', 'Correct or delete data', 'Object to or restrict processing', 'Withdraw consent at any time'], contactEmail: true },
      { id: 'ccpa',           heading: 'CCPA (California residents)',   body: 'You may have rights under the California Consumer Privacy Act, including access, deletion, or opt-out of the sale of personal information. I do not sell personal info.', contactEmail: true },
      { id: 'security',       heading: 'Security',                      body: 'Reasonable technical measures are in place, but no system is 100% secure. Contact me with any concerns.' },
      { id: 'changes',        heading: 'Changes to this policy',        body: 'Updates will be posted here with a revised date.' },
    ],
  },
  fr: {
    title:        'Politique de confidentialité',
    emoji:        '🔒',
    skipToMain:   'Aller au contenu principal',
    updated:      'Dernière mise à jour :',
    intro:        "Cette page explique comment vos données personnelles sont collectées, utilisées et protégées lorsque vous visitez Atelier Digital. Je m'engage à être clair et transparent.",
    outro:        'Votre vie privée est valorisée et traitée avec soin.',
    contactLabel: 'Contact :',
    cookiesLink:  ['Voir la ', 'politique de cookies', ' pour tous les détails.'],
    sections: [
      { id: 'controller',     heading: 'Responsable du traitement',          nameBody: 'Nom : David V.', contact: true },
      { id: 'data-collected', heading: 'Données personnelles collectées',    bullets: ["Données techniques essentielles (ex. : état de la bannière de cookies, préférences de session)", "Données analytiques (pages visitées, temps passé, type d'appareil/navigateur)", "Insights comportementaux (cartes de chaleur anonymisées via Hotjar by Content Square, uniquement avec consentement)", "Coordonnées si vous me contactez par e-mail (nom, e-mail)"] },
      { id: 'how-collected',  heading: 'Comment les données sont collectées', bullets: ['Cookies et technologies similaires', 'Outils analytiques : Google Analytics (uniquement avec consentement)', 'Outils comportementaux : Hotjar by Content Square (uniquement avec consentement)', 'Contact direct (e-mail)'] },
      { id: 'legal-bases',    heading: 'Finalités et bases légales',         bullets: ["Fonctionnement essentiel du site : intérêt légitime", "Analytique et améliorations : consentement", "Insights comportementaux : consentement", "Communication : consentement ou intérêt légitime selon le contexte"] },
      { id: 'third-party',    heading: 'Services tiers',                     bullets: ["Google Analytics : données d'utilisation agrégées et anonymes. Désactivation possible via les paramètres de cookies ou l'outil Google.", "Hotjar by Content Square : cartes de chaleur anonymisées. Activé uniquement avec consentement."] },
      { id: 'cookies-track',  heading: 'Cookies et suivi',                   cookiesLink: true },
      { id: 'retention',      heading: 'Conservation des données',           body: 'Les données sont conservées uniquement le temps nécessaire. Les données analytiques sont stockées sous forme anonymisée ou agrégée.' },
      { id: 'transfers',      heading: 'Transferts internationaux',          body: "Les données peuvent être traitées hors de l'UE/Royaume-Uni (ex. : serveurs Google). Des garanties appropriées sont appliquées." },
      { id: 'your-rights',    heading: 'Vos droits (résidents UE/RU)',       bullets: ["Accéder à vos données", "Corriger ou supprimer vos données", "S'opposer au traitement ou le restreindre", "Retirer votre consentement à tout moment"], contactEmail: true },
      { id: 'ccpa',           heading: 'CCPA (résidents californiens)',      body: "Vous pouvez bénéficier de droits en vertu du California Consumer Privacy Act, notamment l'accès, la suppression ou la désinscription de la vente de données. Je ne vends pas de données personnelles.", contactEmail: true },
      { id: 'security',       heading: 'Sécurité',                          body: "Des mesures techniques raisonnables sont en place, mais aucun système n'est sécurisé à 100%. Contactez-moi pour tout problème." },
      { id: 'changes',        heading: 'Modifications de cette politique',   body: 'Les mises à jour seront publiées ici avec une nouvelle date.' },
    ],
  },
};

const card = 'py-12 scroll-mt-24';
const h2   = 'text-[24px] sm:text-[28px] lg:text-[30px] font-bold leading-tight text-[#1f1f1f] dark:text-[#f6f6f6] mb-6';
const body = 'text-[16px] sm:text-[17px] lg:text-[18px] leading-loose text-[#262626] dark:text-[#adadad]';
const lnk  = 'underline hover:opacity-60 transition-opacity rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC]';

function ObfuscatedEmail({ className }) {
  const u = 'd', d = 'AtelierDigital.co.uk';
  return (
    <button
      onClick={() => window.location.href = `mailto:${u}@${d}`}
      className={`${className} cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC] rounded`}
      aria-label="Send an email to David"
    >
      <span className="obf-email" data-u={u} data-d={d} aria-hidden="true" />
    </button>
  );
}

function PrivacySection({ s, num, t, delay }) {
  return (
    <li
      id={s.id}
      tabIndex={-1}
      className={`${card} focus-visible:outline-none`}
      style={{ animation: 'fade-in 0.5s cubic-bezier(0.22,1,0.36,1) both', animationDelay: delay }}
    >
      <h2 className={h2}><span className="font-bold mr-1">{num}.</span>{s.heading}</h2>

      {s.nameBody && <p className={`${body} mb-4`}>{s.nameBody}</p>}
      {s.body     && <p className={`${body} mb-6`}>{s.body}</p>}

      {s.bullets && (
        <ul className="list-disc list-inside space-y-2 mb-6">
          {s.bullets.map((b, i) => <li key={i} className={body}>{b}</li>)}
        </ul>
      )}

      {s.cookiesLink && (
        <p className={body}>
          {t.cookiesLink[0]}
          <Link to="/cookies" className={lnk}>{t.cookiesLink[1]}</Link>
          {t.cookiesLink[2]}
        </p>
      )}

      {(s.contact || s.contactEmail) && (
        <p className={`${body} mt-4`}>
          {t.contactLabel}{' '}
          <ObfuscatedEmail className={`${body} ${lnk}`} />
        </p>
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
    <nav aria-label="Page sections" className="hidden md:block sticky top-16 self-start w-44 shrink-0 pt-28">
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
                <span aria-hidden="true" className="font-semibold invisible block select-none" style={s.navLabel ? { whiteSpace: 'pre-wrap' } : undefined}>{s.navLabel ?? s.heading}</span>
                <span className="absolute inset-0 py-1.5 px-2" style={s.navLabel ? { whiteSpace: 'pre-wrap' } : undefined}>{s.navLabel ?? s.heading}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function Privacy({ lang }) {
  const t = T[lang];
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    document.title = lang === 'fr' ? 'Confidentialité • Atelier Digital' : 'Privacy • Atelier Digital';
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
                  <p className={body}>{t.intro}</p>
                </div>
                <ol className="space-y-0">
                  {t.sections.map((s, i) => (
                    <PrivacySection key={s.id} s={s} num={i + 1} t={t} delay={`${0.1 + i * 0.07}s`} />
                  ))}
                </ol>
              </div>
            </div>

            <SecondaryNav sections={t.sections} activeId={activeId} />
          </div>

          {/* Outro — outside flex row so sticky nav stops before it */}
          <p className="text-[22px] sm:text-[26px] font-bold text-center text-[#1f1f1f] dark:text-[#f6f6f6] py-16">
            {t.outro}
          </p>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}

export default Privacy;
