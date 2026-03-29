import { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
  }, [lang]);

  return (
    <main
      id="main-content"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 pb-24 select-none"
    >
      {/* Giant 404 */}
      <div className="relative mb-6">
        <span
          aria-hidden="true"
          className="block text-[160px] sm:text-[220px] lg:text-[280px] font-bold leading-none tracking-tighter text-black/[0.04] dark:text-white/[0.04] pointer-events-none"
          style={{ userSelect: 'none' }}
        >
          {t.code}
        </span>
        <span className="absolute inset-0 flex items-center justify-center text-[72px] sm:text-[96px] lg:text-[120px] font-bold leading-none tracking-tight text-[#1f1f1f] dark:text-[#f6f6f6]">
          {t.code}
        </span>
      </div>

      {/* Eyebrow */}
      <p className="text-[13px] sm:text-[14px] font-semibold uppercase tracking-widest text-[#5c5c5c] dark:text-[#adadad] mb-4">
        {t.eyebrow}
      </p>

      {/* Heading */}
      <h1 className="text-[28px] sm:text-[36px] lg:text-[44px] font-bold leading-tight tracking-tight text-[#1f1f1f] dark:text-[#f6f6f6] mb-4 whitespace-pre-line">
        {t.heading}
      </h1>

      {/* Body */}
      <p className="max-w-sm text-[16px] sm:text-[17px] leading-relaxed text-[#5c5c5c] dark:text-[#adadad] mb-10">
        {t.body}
      </p>

      {/* CTA */}
      <Link
        to="/"
        className="px-6 py-3 bg-[#0152EC] hover:bg-[#0142cc] active:opacity-80 text-white font-medium text-[15px] sm:text-[16px] rounded-full border border-[#5289f2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC] focus-visible:ring-offset-2"
      >
        {t.cta}
      </Link>
    </main>
  );
}
