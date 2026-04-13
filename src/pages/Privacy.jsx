import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// ── Update this date whenever content changes ──────────────────────────────────
const LAST_UPDATED = new Date('2026-04-13');

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
      { id: 'data-collected', heading: 'Personal data collected',       bullets: ['Essential technical data (e.g., cookie banner state, session preferences)', 'Analytics data (pages visited, time on page, device/browser type)', 'Behavioural insights (anonymised heat maps, session recordings via Microsoft Clarity, only with consent)', 'Chat conversation transcripts (anonymised, no IP address) if you use the AI chatbot', 'Contact info if you email me (name, email)'] },
      { id: 'how-collected',  heading: 'How data is collected',         bullets: ['Cookies and similar technologies', 'Analytics tools: Google Analytics (only if consented)', 'Behavioural tools: Microsoft Clarity (only if consented)', 'AI chatbot: conversation transcripts are stored anonymously on Vercel\'s infrastructure', 'Direct contact (email)'] },
      { id: 'legal-bases',    heading: 'Purposes and legal bases',      navLabel: 'Purposes and legal\nbases', bullets: ['Essential site functionality: legitimate interest', 'Analytics & site improvements: consent', 'Behavioural insights: consent', 'AI chatbot: legitimate interest (understanding visitor interest in David\'s work)', 'Communication: consent or legitimate interest depending on context'] },
      { id: 'third-party',    heading: 'Third-party services',          bullets: ['Google Analytics: anonymous aggregated usage data. Opt-out available via cookie settings or Google opt-out tool.', 'Microsoft Clarity: anonymised heat maps and session recordings. Only enabled with consent.', 'Anthropic (Claude AI): chat messages are processed by Anthropic\'s API to generate responses. Conversation transcripts are stored anonymously on Vercel\'s infrastructure. No personal identifiers (e.g. IP addresses) are retained.'] },
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
      { id: 'data-collected', heading: 'Données personnelles collectées',    bullets: ["Données techniques essentielles (ex. : état de la bannière de cookies, préférences de session)", "Données analytiques (pages visitées, temps passé, type d'appareil/navigateur)", "Insights comportementaux (cartes de chaleur anonymisées via Microsoft Clarity, uniquement avec consentement)", "Transcriptions de conversations du chatbot IA (anonymisées, sans adresse IP) si vous utilisez le chatbot", "Coordonnées si vous me contactez par e-mail (nom, e-mail)"] },
      { id: 'how-collected',  heading: 'Comment les données sont collectées', bullets: ['Cookies et technologies similaires', 'Outils analytiques : Google Analytics (uniquement avec consentement)', 'Outils comportementaux : Microsoft Clarity (uniquement avec consentement)', "Chatbot IA : les transcriptions de conversations sont stockées anonymement sur l'infrastructure Vercel", 'Contact direct (e-mail)'] },
      { id: 'legal-bases',    heading: 'Finalités et bases légales',         bullets: ["Fonctionnement essentiel du site : intérêt légitime", "Analytique et améliorations : consentement", "Insights comportementaux : consentement", "Chatbot IA : intérêt légitime (comprendre l'intérêt des visiteurs pour le travail de David)", "Communication : consentement ou intérêt légitime selon le contexte"] },
      { id: 'third-party',    heading: 'Services tiers',                     bullets: ["Google Analytics : données d'utilisation agrégées et anonymes. Désactivation possible via les paramètres de cookies ou l'outil Google.", "Microsoft Clarity : cartes de chaleur et enregistrements de session anonymisés. Activé uniquement avec consentement.", "Anthropic (Claude IA) : les messages du chat sont traités par l'API d'Anthropic pour générer des réponses. Les transcriptions sont stockées anonymement sur l'infrastructure Vercel. Aucun identifiant personnel (ex. : adresse IP) n'est conservé."] },
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
const h2   = 'text-h2 font-bold leading-tight text-fg-primary mb-6';
const body = 'text-copy-m font-normal leading-loose text-fg-secondary';
const lnk  = 'underline hover:opacity-60 transition-opacity rounded-radius-half focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus';

function ObfuscatedEmail({ className }) {
  const u = 'd', d = 'AtelierDigital.co.uk';
  return (
    <button
      onClick={() => window.location.href = `mailto:${u}@${d}`}
      className={`${className} cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded`}
      aria-label="Message David"
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
    <nav aria-label="Page sections" className="w-full backdrop-blur-[4px] bg-white/[0.64] dark:bg-black/[0.64] rounded-radius-6 shadow-xs dark:ring-1 dark:ring-white/[0.16] p-[10px]">
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
                  className={`h-8 px-3 rounded-radius-4 text-tooltip font-medium leading-snug whitespace-nowrap transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
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

function SecondaryNav({ sections, activeId, onNavigate }) {
  return (
    <nav aria-label="Page sections" className="hidden md:block sticky top-16 self-start z-10 w-44 shrink-0 pt-28">
      <ol className="space-y-2">
        {sections.map((s) => {
          const isActive = activeId === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() => onNavigate(s.id)}
                aria-label={s.navLabel ?? s.heading}
                aria-current={isActive ? 'location' : undefined}
                className={`relative text-tooltip leading-snug py-2 px-2 rounded-radius-2 text-left w-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                  isActive
                    ? 'text-fg-primary font-semibold bg-black/[0.04] dark:bg-white/[0.06]'
                    : 'text-fg-muted font-normal hover:text-fg-primary hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                }`}
              >
                {/* Invisible bold copy locks the button height to its semibold size — prevents 1→2 line reflow on hover */}
                <span aria-hidden="true" className="font-semibold invisible block select-none" style={s.navLabel ? { whiteSpace: 'pre-wrap' } : undefined}>{s.navLabel ?? s.heading}</span>
                <span className="absolute inset-0 py-2 px-2" style={s.navLabel ? { whiteSpace: 'pre-wrap' } : undefined}>{s.navLabel ?? s.heading}</span>
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
  const [mounted,     setMounted]     = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const suppressRef = useRef(false);

  useEffect(() => { setMounted(true); }, []);
  const [atBottom,    setAtBottom]    = useState(false);

  useEffect(() => {
    document.title = lang === 'fr' ? 'Confidentialité • Atelier Digital' : 'Privacy • Atelier Digital';
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
      setScrolledDown(firstEl.getBoundingClientRect().top < 150);
      setAtBottom(lastEl.getBoundingClientRect().bottom < 200);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [t]);

  const secondaryNavVisible = scrolledDown && !atBottom;
  useEffect(() => {
    // secondary-nav-change intentionally not dispatched — chat button coexists with sec nav
  }, [secondaryNavVisible]);

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
    setScrollingDown(false);
    window.dispatchEvent(new CustomEvent('nav-scroll-start'));
    scrollToSection(id);
    setTimeout(() => { suppressRef.current = false; setScrollingDown(false); }, 1500);
  };

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-radius-2 focus:ring-2 focus:ring-border-focus focus:bg-z-0 focus:text-fg-primary focus:outline-none font-medium">
        {t.skipToMain}
      </a>
      <main id="main-content" aria-label={t.title} className={`bg-bg-page dark:bg-bg-surface min-h-screen transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`} tabIndex={-1}>
        <div className="px-6 flex flex-col items-center">
          <div className="flex items-start gap-10 w-full max-w-6xl">
            {/* Left spacer — smaller than the secondary nav to shift content left without losing all whitespace */}
            <div className="hidden md:block w-20 shrink-0" />

            {/* Main column */}
            <div className="flex-1 min-w-0">
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
                  <p className={body}>{t.intro}</p>
                </div>
                <ol className="space-y-0">
                  {t.sections.map((s, i) => (
                    <PrivacySection key={s.id} s={s} num={i + 1} t={t} delay={`${0.1 + i * 0.07}s`} />
                  ))}
                </ol>
              </div>
            </div>

            <SecondaryNav sections={t.sections} activeId={activeId} onNavigate={handleNavigate} />
          </div>

          {/* Outro — outside flex row so sticky nav stops before it */}
          <p className="text-h3 font-semibold leading-snug text-center text-fg-primary py-16">
            {t.outro}
          </p>
        </div>
        <div inert={scrolledDown && !atBottom && !scrollingDown ? undefined : true} className={`md:hidden fixed bottom-2 left-[68px] right-4 z-40 flex justify-center pointer-events-none transition-opacity duration-300 ${scrolledDown && !atBottom && !scrollingDown ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="pointer-events-auto w-full">
            <MobileSecondaryNav sections={t.sections} activeId={activeId} onNavigate={handleNavigate} />
          </div>
        </div>
        <div aria-hidden="true" className={`md:hidden fixed z-[39] pointer-events-none transition-opacity duration-300 rounded-full backdrop-blur-[4px] bg-white/[0.64] dark:bg-black/[0.64] shadow-xs dark:ring-1 dark:ring-white/[0.16] ${scrolledDown && !atBottom && !scrollingDown ? 'opacity-100' : 'opacity-0'}`} style={{ width: 52, height: 52, left: 8, bottom: 8 }} />
      </main>
      <Footer lang={lang} />
    </>
  );
}

export default Privacy;
