import { Link, useLocation, useNavigate } from 'react-router-dom';
import imgLockIcon   from '../assets/icons/icon-lock-sm.svg';
import imgArrowRight from '../assets/icons/icon-arrow-right-accent.svg';

function CopyrightTag({ year, tooltip }) {
  return (
    <span className="relative inline-block group cursor-default">
      © {year} Atelier Digital
      <div className="pointer-events-none absolute bottom-[calc(100%+8px)] left-0 opacity-0 group-hover:opacity-100 group-hover:delay-[600ms] transition-opacity duration-200 flex flex-col items-start">
        <div className="bg-[#1f1f1f] dark:bg-[#f6f6f6] text-[#f6f6f6] dark:text-[#1f1f1f] text-[15px] font-semibold leading-4 px-3 py-[4px] rounded-lg whitespace-nowrap ring-1 ring-white/20 dark:ring-black/10">
          {tooltip}
        </div>
        <svg width="12" height="6" viewBox="0 0 12 6" aria-hidden="true" className="shrink-0 ml-3" style={{ display: 'block', marginTop: '-1px' }}>
          <path d="M0,0 L5.2,5.1 Q6,6 6.8,5.1 L12,0 Z" className="fill-[#1f1f1f] dark:fill-[#f6f6f6]" />
        </svg>
      </div>
    </span>
  );
}

const T = {
  en: {
    sitemap:      'Sitemap',
    contact:      'Contact details',
    home:         'home',
    caseStudies:  'case studies',
    collaborators:'collaborators',
    projects:     'projects',
    digitalTwins: 'digital twins',
    salesPlatform:'sales platform',
    xr:           'extended reality',
    holograms:    'holograms',
    resume:       'résumé',
    experience:   'experience',
    expertise:    'expertise',
    education:    'education',
    location:     'Edinburgh, United Kingdom',
    privacy:      'Privacy',
    cookies:      'Cookies',
    terms:        'Terms',
    thanks:       'Thanks for visiting!',
    techTooltip:  'Designed in Figma, built in React & Tailwind CSS',
  },
  fr: {
    sitemap:      'Plan du site',
    contact:      'Coordonnées',
    home:         'accueil',
    caseStudies:  'études de cas',
    collaborators:'collaborateurs',
    projects:     'projets',
    digitalTwins: 'jumeaux numériques',
    salesPlatform:'plateforme web',
    xr:           'réalité étendue',
    holograms:    'hologrammes',
    resume:       'CV interactif',
    experience:   'expérience pro',
    expertise:    'savoir-faire',
    education:    'formation',
    location:     'Édimbourg, Royaume-Uni',
    privacy:      'Confidentialité',
    cookies:      'Cookies',
    terms:        'Conditions',
    thanks:       'Merci de votre visite !',
    techTooltip:  'Conçu avec Figma, construit en React & Tailwind CSS',
  },
};

const strong    = 'font-bold text-[#1f1f1f] dark:text-[#f6f6f6]';
const muted     = 'text-[#5c5c5c] dark:text-[#adadad]';
const hover     = 'hover:text-[#1f1f1f] dark:hover:text-[#f6f6f6] transition-colors';
const row       = 'block leading-[3rem] whitespace-nowrap';
const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC] rounded';

function Locked({ label }) {
  return (
    <div className={`flex items-center gap-1 opacity-40 ${muted} ${row}`}>
      <img src={imgLockIcon} alt="" width={16} height={16} className="shrink-0 dark:invert" />
      <span>{label}</span>
    </div>
  );
}

function ObfuscatedEmail({ lang }) {
  const u = 'd', d = 'AtelierDigital.co.uk';
  const subject = lang === 'fr' ? 'Prise de contact' : 'Getting in touch';
  return (
    <button
      data-spring
      onClick={() => window.location.href = `mailto:${u}@${d}?subject=${encodeURIComponent(subject)}`}
      className={`${muted} ${hover} ${row} text-left cursor-pointer`}
    >
      <span className="sr-only">Send an email to David</span>
      <span className="obf-email" data-u={u} data-d={d} aria-hidden="true" />
    </button>
  );
}

function Footer({ lang }) {
  const t = T[lang];
  const year = new Date().getFullYear();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Delay hash-link navigation so the spring press animation is visible before the page scrolls
  const delayedNav = (to) => (e) => {
    e.preventDefault();
    setTimeout(() => navigate(to), 140);
  };

  const legalLink = (to, label) => {
    const isActive = pathname === to;
    return (
      <Link
        data-spring
        to={to}
        tabIndex={0}
        onClick={() => { if (isActive) window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className={`px-4 py-1 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC] ${
          isActive
            ? 'bg-[#161616] dark:bg-white text-white dark:text-[#161616] font-semibold'
            : 'hover:text-[#1f1f1f] dark:hover:text-[#f6f6f6] hover:bg-black/[0.04] dark:hover:bg-white/[0.08]'
        }`}
      >{label}</Link>
    );
  };

  return (
    <footer className="bg-white dark:bg-[#141414]">

      <nav aria-label="Site navigation and contact details">
        <div className="max-w-5xl mx-auto px-6 py-16 lg:py-28 flex flex-col md:flex-row gap-12 md:gap-24 lg:gap-40">

          <div>
            <h2 className={`text-[30px] sm:text-[36px] lg:text-[44px] leading-tight font-semibold mb-8 sm:mb-12 lg:mb-16 ${strong}`}>
              {t.sitemap}
            </h2>
            <ul className="flex flex-col sm:flex-row gap-6 sm:gap-10 lg:gap-16">

              <li className="flex flex-col">
                <Link data-spring tabIndex={0} to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`${strong} ${row} ${focusRing}`}>{t.home}</Link>
                <ul>
                  <li><Link data-spring tabIndex={0} to="/#case-studies" onClick={delayedNav('/#case-studies')} className={`${muted} ${hover} ${row} ${focusRing}`}>{t.caseStudies}</Link></li>
                  <li><Link data-spring tabIndex={0} to="/#collaborators" onClick={delayedNav('/#collaborators')} className={`${muted} ${hover} ${row} ${focusRing}`}>{t.collaborators}</Link></li>
                </ul>
              </li>

              <li className="flex flex-col">
                <span className={`${strong} ${row}`}>{t.projects}</span>
                <ul>
                  <li><Locked label={t.digitalTwins} /></li>
                  <li>
                    <Link data-spring tabIndex={0} to="/projects/sales-platform" onClick={() => { if (pathname === '/projects/sales-platform') window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`flex items-center gap-1 ${muted} ${hover} ${row} ${focusRing}`}>
                      <img src={imgArrowRight} alt="" width={16} height={16} className="shrink-0" />
                      {t.salesPlatform}
                    </Link>
                  </li>
                  <li><Locked label={t.xr} /></li>
                  <li><Locked label={t.holograms} /></li>
                </ul>
              </li>

              <li className="flex flex-col">
                <Link data-spring tabIndex={0} to="/resume" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`${strong} ${row} ${focusRing}`}>{t.resume}</Link>
                <ul>
                  <li><Link data-spring tabIndex={0} to="/resume#experience" onClick={delayedNav('/resume#experience')} className={`${muted} ${hover} ${row} ${focusRing}`}>{t.experience}</Link></li>
                  <li><Link data-spring tabIndex={0} to="/resume#expertise"  onClick={delayedNav('/resume#expertise')}  className={`${muted} ${hover} ${row} ${focusRing}`}>{t.expertise}</Link></li>
                  <li><Link data-spring tabIndex={0} to="/resume#education"  onClick={delayedNav('/resume#education')}  className={`${muted} ${hover} ${row} ${focusRing}`}>{t.education}</Link></li>
                </ul>
              </li>

            </ul>
          </div>

          <div>
            <h2 className={`text-[30px] sm:text-[36px] lg:text-[44px] leading-tight font-semibold mb-8 sm:mb-12 lg:mb-16 whitespace-nowrap ${strong}`}>
              {t.contact}
            </h2>
            <ul className="flex flex-col">
              <li className={`${strong} ${row}`}>David V.</li>
              <li><ObfuscatedEmail lang={lang} /></li>
              <li><a data-spring tabIndex={0} href="https://maps.google.com/?q=55.9527025,-3.2038472" target="_blank" rel="noopener noreferrer" className={`${muted} ${hover} ${row} ${focusRing}`}>{t.location}</a></li>
              <li><a data-spring tabIndex={0} href="https://www.atelierdigital.co.uk" target="_blank" rel="noopener noreferrer" className={`${muted} ${hover} ${row} ${focusRing}`}>www.AtelierDigital.co.uk</a></li>
            </ul>
          </div>

        </div>
      </nav>

      <div>
        <div className="max-w-5xl mx-auto px-6 py-10 text-sm text-[#5c5c5c] dark:text-[#adadad]">
          <div className="flex flex-col items-center gap-4 sm:hidden">
            <ul className="flex items-center gap-1" aria-label="Legal">
              <li>{legalLink('/privacy', t.privacy)}</li>
              <li role="none" aria-hidden="true"><div className="w-px h-3 bg-black/20 dark:bg-white/20" /></li>
              <li>{legalLink('/cookies', t.cookies)}</li>
              <li role="none" aria-hidden="true"><div className="w-px h-3 bg-black/20 dark:bg-white/20" /></li>
              <li>{legalLink('/terms', t.terms)}</li>
            </ul>
            <ul className="flex justify-center gap-6" aria-label="Copyright">
              <li><CopyrightTag year={year} tooltip={t.techTooltip} /></li>
              <li>{t.thanks}</li>
            </ul>
          </div>
          <div className="hidden sm:grid sm:grid-cols-3 items-center">
            <CopyrightTag year={year} tooltip={t.techTooltip} />
            <ul className="flex items-center gap-1 justify-center" aria-label="Legal">
              <li>{legalLink('/privacy', t.privacy)}</li>
              <li role="none" aria-hidden="true"><div className="w-px h-3 bg-black/20 dark:bg-white/20" /></li>
              <li>{legalLink('/cookies', t.cookies)}</li>
              <li role="none" aria-hidden="true"><div className="w-px h-3 bg-black/20 dark:bg-white/20" /></li>
              <li>{legalLink('/terms', t.terms)}</li>
            </ul>
            <span className="text-right">{t.thanks}</span>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
