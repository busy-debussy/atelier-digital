import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function isFranceTz() {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone === 'Europe/Paris'; }
  catch { return false; }
}
function isEveningInParis() {
  try {
    const h = parseInt(
      new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris', hour: 'numeric', hour12: false }), 10
    );
    return h >= 20 || h < 5;
  } catch { return false; }
}
function isAfterWorkHoursLocal() {
  const h = new Date().getHours();
  return h >= 18 || h < 5;
}

// Session flag — animation only plays once per page load
let sessionAnimDone = false;

const france = isFranceTz();

function getHeading(lang, dark) {
  if (lang === 'fr') return dark ? "Bonsoir, c'est David !" : "Bonjour, c'est David !";
  return isAfterWorkHoursLocal() ? "Hey, I'm David!" : "Hi, I'm David!";
}

const EASE = 'cubic-bezier(0.22,1,0.36,1)';

export default function Hero({ lang, isDark, enableDark, onDone }) {
  const evening = france && isEveningInParis();
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const skip = sessionAnimDone || prefersReduced;

  const heading  = getHeading(lang, evening || (lang === 'fr' && isDark));
  const subtitle = lang === 'fr' ? 'Designer produit senior'  : 'Senior product designer';
  const expLabel  = lang === 'fr' ? 'expert en'               : 'experienced in';
  const btnCases  = lang === 'fr' ? 'Études de cas'           : 'Case studies';
  const pills = lang === 'fr'
    ? ['Digital twins', 'Design 3D', 'Accessibilité', 'Design systems', 'Collab IA', 'Stratégie UX']
    : ['Digital twins', '3D design', 'Accessibility', 'Design systems', 'AI collab', 'UX strategy'];

  const [ready, setReady] = useState(skip);

  // Auto dark for French evening visitors
  useEffect(() => {
    if (evening && lang === 'fr' && enableDark) enableDark();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Trigger animation on next paint; mark done after last element fades in
  useEffect(() => {
    if (skip) { onDone?.(); return; }
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    const id  = setTimeout(() => { sessionAnimDone = true; onDone?.(); }, 900);
    return () => { cancelAnimationFrame(raf); clearTimeout(id); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Inline style helper — all animation is CSS, JS only flips one boolean
  const fadeUp = (delay, dur = 560) => skip ? undefined : ({
    opacity:    ready ? 1 : 0,
    transform:  prefersReduced ? undefined : (ready ? 'none' : 'translateY(18px)'),
    transition: `opacity ${dur}ms ${delay}ms ${EASE}, transform ${dur}ms ${delay}ms ${EASE}`,
  });

  return (
    <section aria-label={lang === 'fr' ? 'Présentation' : 'Introduction'} className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 pb-24">
      <div aria-hidden="true" className="hero-surface-gradient pointer-events-none absolute inset-0" />

      <div className="relative flex flex-col items-center gap-0">

        <div style={fadeUp(0)}>
          <h1 className="text-display-1 font-bold tracking-tight leading-tight text-fg-primary">
            {heading}
          </h1>
        </div>

        <div className="mt-4 sm:mt-6" style={fadeUp(100)}>
          <h2 className="text-display-2 font-semibold leading-tight text-fg-muted">
            {subtitle}
          </h2>
        </div>

        <div className="mt-8 sm:mt-12 w-full max-w-lg" style={fadeUp(200, 480)}>
          <div className="block border border-glass-subtle rounded-radius-8 px-4 py-5 sm:px-6 flex flex-col items-center gap-4 max-w-lg">
            <h3 className="text-label-s font-semibold leading-[1.4] uppercase tracking-wider text-fg-muted">
              {expLabel}
            </h3>
            <ul aria-label={expLabel} className="list-none grid grid-cols-3 gap-1.5 sm:gap-2 p-0 m-0">
              {pills.map((pill, i) => (
                <li
                  key={pill}
                  className="px-2.5 py-1 sm:px-4 sm:py-2 rounded-full text-tag-s font-medium leading-normal flex items-center justify-center bg-bg-surface border border-glass-subtle text-fg-secondary"
                  style={skip ? {} : {
                    opacity:    ready ? 1 : 0,
                    transform:  prefersReduced ? undefined : (ready ? 'none' : 'translateY(10px)'),
                    transition: `opacity 480ms ${320 + i * 55}ms ${EASE}, transform 480ms ${320 + i * 55}ms ${EASE}`,
                  }}
                >
                  {pill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 flex items-center gap-8" style={fadeUp(380)}>
          <a
            href="#case-studies"
            onClick={(e) => {
              e.preventDefault();
              const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
              const mobile  = window.matchMedia('(max-width: 639px)').matches;
              if (mobile) {
                window.scrollBy({ top: window.innerHeight * 1.0, behavior: reduced ? 'instant' : 'smooth' });
              } else {
                document.getElementById('case-studies')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
              }
            }}
            data-spring
            className="px-6 py-3 bg-cta-600 hover:bg-cta-700 text-fg-on-accent-opacity-95 font-medium text-btn-m rounded-full border border-accent-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2"
          >
            {btnCases}
          </a>
          <Link
            to="/resume"
            data-spring
            className="text-btn-m font-medium text-cta-600 dark:text-cta-400 hover:text-cta-700 dark:hover:text-cta-300 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:rounded-sm"
          >
            {lang === 'fr' ? 'CV interactif' : 'Interactive CV'}
          </Link>
        </div>

      </div>
    </section>
  );
}
