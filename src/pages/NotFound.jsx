import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../analytics';

const T = {
  en: {
    code:     '404',
    eyebrow:  'Page not found',
    heading:  'Looks like this page\nskipped the handoff.',
    body:     'No design, no dev, no URL, this one never made it out of the backlog.',
    cta:      'Back to home',
  },
  fr: {
    code:     '404',
    eyebrow:  'Page introuvable',
    heading:  'Cette page n\'a pas\nsurvécu à la revue design.',
    body:     'Ni maquette, ni développement, ni URL, elle est restée bloquée dans le backlog.',
    cta:      'Retour à l\'accueil',
  },
};

export default function NotFound({ lang }) {
  const t = T[lang] ?? T.en;
  useEffect(() => {
    document.title = lang === 'fr' ? 'Page introuvable • Atelier Digital' : 'Page not found • Atelier Digital';
    trackEvent('404_error', { path: window.location.pathname });
  }, [lang]);

  return (
    <main
      id="main-content"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 pb-24 select-none"
    >
      {/* Giant 404 */}
      <div className="relative mb-6">
        <span className="sr-only">{t.code}</span>
        <span
          aria-hidden="true"
          className="block text-[160px] sm:text-[220px] lg:text-[280px] font-bold leading-none tracking-tighter text-nav-active-bg pointer-events-none"
          style={{ userSelect: 'none' }}
        >
          {t.code}
        </span>
        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-[72px] sm:text-[96px] lg:text-[120px] font-bold leading-none tracking-tight text-fg-primary">
          {t.code}
        </span>
      </div>

      {/* Eyebrow */}
      <p className="text-label-s font-semibold leading-[1.4] uppercase tracking-wider text-fg-muted mb-4">
        {t.eyebrow}
      </p>

      {/* Heading */}
      <h1 className="text-h2 font-bold leading-tight text-fg-primary mb-4 whitespace-pre-line">
        {t.heading}
      </h1>

      {/* Body */}
      <p className="max-w-sm text-copy-m font-normal leading-loose text-fg-muted mb-10">
        {t.body}
      </p>

      {/* CTA */}
      <Link
        to="/"
        data-spring
        className="px-6 py-3 bg-cta-600 hover:bg-cta-700 text-fg-on-accent-opacity-95 font-medium text-label-s leading-[1.2] rounded-full border border-accent-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2"
      >
        {t.cta}
      </Link>
    </main>
  );
}
