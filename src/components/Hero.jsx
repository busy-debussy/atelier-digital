import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { color } from '../design-system';

// Time detection
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
  if (lang === 'fr') return dark ? "Bonsoir, c'est David\u00a0!\u00a0😀" : "Bonjour, c'est David\u00a0!\u00a0😀";
  return isAfterWorkHoursLocal() ? "Hey, I'm David!\u00a0😀" : "Hi, I'm David!\u00a0😀";
}

const hexToRgba = (hex, alpha) => {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

const EASE = 'cubic-bezier(0.22,1,0.36,1)';

export default function Hero({ lang, isDark, enableDark, onDone }) {
  const evening = france && isEveningInParis();
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const skip = sessionAnimDone || prefersReduced;

  const heading  = getHeading(lang, evening || (lang === 'fr' && isDark));
  const subtitle = lang === 'fr' ? 'Designer produit senior'  : 'Senior product designer';
  const expLabel = lang === 'fr' ? 'expert en'                : 'experienced in';
  const btnCV    = lang === 'fr' ? 'CV intéractif'            : 'Interactive CV';
  const btnCases = lang === 'fr' ? 'Études de cas'            : 'Case studies';

  const pills = lang === 'fr'
    ? ['Digital twins', 'Design 3D', 'Accessibilité', 'Design systems', 'Vibe-coding', 'Stratégie UX']
    : ['Digital twins', '3D design', 'Accessibility', 'Design systems', 'Vibe-coding', 'UX strategy'];

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
      <div aria-hidden="true" className="hero-accent-glow pointer-events-none absolute inset-0 dark:hidden" />

      <div className="flex flex-col items-center gap-0">

        {/* H1 */}
        <div style={fadeUp(0)}>
          <h1 className="text-display-1 font-bold tracking-tight leading-tight text-fg-primary">
            {heading}
          </h1>
        </div>

        {/* H2 */}
        <div className="mt-6 sm:mt-8" style={fadeUp(100)}>
          <h2 className="text-display-2 font-semibold leading-tight text-fg-muted">
            {subtitle}
          </h2>
        </div>

        {/* Card + pills */}
        <div className="mt-10 sm:mt-20" style={fadeUp(200, 480)}>
          <Link
            data-spring
            to="/resume?from=home#experience"
            className="group block border border-glass-subtle hover:border-border-subtle rounded-radius-8 px-6 py-5 flex flex-col items-center gap-4 max-w-lg transition-[border-color,box-shadow] duration-200 hover:shadow-s dark:hover:shadow-s-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 cursor-pointer"
          >
            <h3 className="text-label-s font-semibold leading-[1.4] uppercase tracking-wider text-fg-muted">
              {expLabel}
            </h3>
            <ul aria-label={expLabel} className="list-none grid grid-cols-3 gap-2 p-0 m-0">
              {pills.map((pill, i) => (
                <li
                  key={pill}
                  className="px-2 py-1 sm:px-4 sm:py-2 rounded-full text-tag-s font-medium leading-normal flex items-center justify-center"
                  style={{
                    ...(skip ? {} : {
                      opacity:    ready ? 1 : 0,
                      transform:  prefersReduced ? undefined : (ready ? 'none' : 'translateY(10px)'),
                      transition: `opacity 480ms ${320 + i * 55}ms ${EASE}, transform 480ms ${320 + i * 55}ms ${EASE}`,
                    }),
                    backgroundColor: isDark
                      ? color.uiConceptAccent[i % color.uiConceptAccent.length].bgDark
                      : hexToRgba(color.uiConceptAccent[i % color.uiConceptAccent.length].bg, 0.45),
                    color: isDark
                      ? color.uiConceptAccent[i % color.uiConceptAccent.length].fgDark
                      : color.uiConceptAccent[i % color.uiConceptAccent.length].fg,
                  }}
                >
                  {pill}
                </li>
              ))}
            </ul>
          </Link>
        </div>

        {/* Buttons */}
        <div className="mt-8 sm:mt-10 flex gap-3" style={fadeUp(500)}>
          <a
            href="#case-studies"
            onClick={(e) => {
              e.preventDefault();
              const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
              const mobile  = window.matchMedia('(max-width: 639px)').matches;
              document.getElementById('case-studies')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: mobile ? 'center' : 'start' });
            }}
            data-spring
            className="px-6 py-3 bg-cta-600 hover:bg-cta-700 text-fg-on-accent-opacity-95 font-medium text-btn-m rounded-full border border-accent-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2"
          >
            {btnCases}
          </a>
          <Link
            to="/resume"
            data-spring
            className="px-6 py-3 text-cta-600 hover:text-cta-700 dark:text-fg-primary dark:hover:opacity-80 font-medium text-btn-m rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg-primary focus-visible:ring-offset-2"
          >
            {btnCV}
          </Link>
        </div>

      </div>
    </section>
  );
}
