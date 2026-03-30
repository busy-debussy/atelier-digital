import { useState, useEffect, useRef } from 'react';
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

// Timing
const CARET_DELAY        = 1000;
const TYPE_SPEED         = 50;
const COMMA_PAUSE        = 500;
const WORD_SPEED         = 120;
const AFTER_SUBTITLE     = COMMA_PAUSE;
const AFTER_H3_MOUNT     = 50;   // rAF-style delay before fading in H3
const AFTER_H3_VISIBLE   = 500;  // wait for H3 fade to finish
const AFTER_PILLS_MOUNT  = 50;
const PILL_STAGGER       = 60;
const AFTER_PILLS_DONE   = COMMA_PAUSE;
const AFTER_BUTTONS_MOUNT = 50;

// Fade-in wrapper (mounts then fades in via double-tick)
function FadeIn({ children, className = '', duration = 500, instant = false }) {
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [visible, setVisible] = useState(instant);
  useEffect(() => {
    if (instant) return;
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    return () => cancelAnimationFrame(raf);
  }, [instant]);
  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: reduced ? undefined : (visible ? 'translateY(0px)' : 'translateY(16px)'),
        transition: instant ? undefined : `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1), transform ${duration}ms cubic-bezier(0.22,1,0.36,1)`,
      }}
    >
      {children}
    </div>
  );
}

// Helpers
const hexToRgba = (hex, alpha) => {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

// Session flag, animation only plays once per page load
let sessionAnimDone = false;

// Heading helper
const france = isFranceTz();

function getHeading(lang, dark) {
  if (lang === 'fr') return dark ? "Bonsoir, c'est David\u00a0! 😀" : "Bonjour, c'est David\u00a0! 😀";
  return isAfterWorkHoursLocal() ? "Hey, I'm David! 😀" : "Hi, I'm David! 😀";
}

// Component
export default function Hero({ lang, isDark, enableDark, onDone }) {
  const evening = france && isEveningInParis();
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const skipAnim = sessionAnimDone || prefersReduced;

  // heading used to drive the typing animation, only changes on lang switch
  const heading = getHeading(lang, evening || (lang === 'fr' && isDark));
  const subtitle  = lang === 'fr' ? 'Designer produit senior'  : 'Senior product designer';
  const expLabel  = lang === 'fr' ? 'expert en'                : 'experienced in';
  const btnCV     = lang === 'fr' ? 'CV intéractif'            : 'Interactive CV';
  const btnCases  = lang === 'fr' ? 'Études de cas'            : 'Case studies';

  const pills = (lang === 'fr'
    ? ['Digital twins', 'Design 3D', 'Accessibilité', 'Design systems', 'Vibe-coding', 'Stratégie UX']
    : ['Digital twins', '3D design', 'Accessibility', 'Design systems', 'Vibe-coding', 'UX strategy']
  );
  const words = subtitle.split(' ');

  // Render gates, skip straight to final state if animation already played
  const [displayed,     setDisplayed]     = useState(skipAnim ? heading : '');
  const [typingDone,    setTypingDone]     = useState(skipAnim);
  const [showSubtitle,  setShowSubtitle]   = useState(skipAnim);
  const [visibleWords,  setVisibleWords]   = useState(skipAnim ? words.length : 0);
  const [showH3,        setShowH3]         = useState(skipAnim);
  const [visiblePills,  setVisiblePills]   = useState(skipAnim ? pills.length : 0);
  const [showButtons,   setShowButtons]    = useState(skipAnim);

  const timers = useRef([]);
  const t = (fn, ms) => { const id = setTimeout(fn, ms); timers.current.push(id); };

  // Auto dark for French evening visitors
  useEffect(() => {
    if (evening && lang === 'fr' && enableDark) enableDark();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset + run full animation on heading change (lang change)
  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];

    if (skipAnim) {
      setDisplayed(heading);
      onDone?.();
      return;
    }

    setDisplayed('');
    setTypingDone(false);
    setShowSubtitle(false);
    setVisibleWords(0);
    setShowH3(false);
    setVisiblePills(0);
    setShowButtons(false);

    let i = 0;
    let paused = false;

    const startTyping = () => {
      const iv = setInterval(() => {
        if (paused) return;
        i++;
        setDisplayed(heading.slice(0, i));
        if (heading[i - 1] === ',') {
          paused = true;
          t(() => { paused = false; }, COMMA_PAUSE);
        }
        if (i >= heading.length) {
          clearInterval(iv);
          setTypingDone(true);
        }
      }, TYPE_SPEED);
      timers.current.push(iv);
    };

    t(startTyping, CARET_DELAY);
    return () => { timers.current.forEach(clearTimeout); timers.current = []; };
  }, [heading]); // eslint-disable-line react-hooks/exhaustive-deps

  // Instant greeting swap on dark mode toggle (no re-animation)
  useEffect(() => {
    if (typingDone && lang === 'fr') {
      setDisplayed(getHeading(lang, isDark));
    }
  }, [isDark]); // eslint-disable-line react-hooks/exhaustive-deps

  // Mount subtitle after a pause matching the comma pause
  useEffect(() => {
    if (!typingDone) return;
    const id = setTimeout(() => setShowSubtitle(true), COMMA_PAUSE);
    return () => clearTimeout(id);
  }, [typingDone]);

  useEffect(() => {
    if (!showSubtitle) return;
    if (skipAnim) return;
    let w = 0;
    const iv = setInterval(() => {
      w++;
      setVisibleWords(w);
      if (w >= words.length) clearInterval(iv);
    }, WORD_SPEED);
    return () => clearInterval(iv);
  }, [showSubtitle]); // eslint-disable-line react-hooks/exhaustive-deps

  // After subtitle done: mount H3+pills container → stagger pills → buttons
  useEffect(() => {
    if (visibleWords < words.length) return;
    if (skipAnim) return;
    t(() => {
      setShowH3(true); // mounts H3 + pills container (pills all opacity-0)
      t(() => {
        // Start pill stagger after H3 has faded in
        let p = 0;
        const iv = setInterval(() => {
          p++;
          setVisiblePills(p);
          if (p >= pills.length) {
            clearInterval(iv);
            t(() => { setShowButtons(true); sessionAnimDone = true; onDone?.(); }, AFTER_PILLS_DONE);
          }
        }, PILL_STAGGER);
        timers.current.push(iv);
      }, AFTER_H3_MOUNT + AFTER_H3_VISIBLE);
    }, AFTER_SUBTITLE);
  }, [visibleWords]); // eslint-disable-line react-hooks/exhaustive-deps

  const caretBlinking = displayed.length === 0;

  return (
    <section aria-label={lang === 'fr' ? 'Présentation' : 'Introduction'} className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 pb-24">
      <div className="flex flex-col items-center gap-0 -mt-0 sm:mt-0">

        {/* H1, typed heading */}
        <div>
          <h1
            aria-label={heading}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.15] md:leading-none text-[#1f1f1f] dark:text-[#f6f6f6]"
          >
            <span>
              {displayed}
              {!typingDone && (
                <span className={`inline-block w-[3px] h-[0.85em] ml-1 align-middle bg-[#1f1f1f] dark:bg-[#f6f6f6] rounded-sm ${caretBlinking ? 'motion-safe:animate-[blink_1s_step-end_infinite]' : ''}`} />
              )}
            </span>
          </h1>
        </div>

        {/* H2, subtitle word by word */}
        {showSubtitle && (
          <div className="mt-6 sm:mt-8">
            <h2
              aria-label={subtitle}
              className="text-3xl md:text-5xl font-medium text-[#5c5c5c] dark:text-[#adadad]"
            >
              {words.map((word, i) => (
                <span
                  key={i}
                  className="inline-block mr-[0.25em]"
                  style={{
                    opacity: i < visibleWords ? 1 : 0,
                    transform: prefersReduced ? undefined : (i < visibleWords ? 'translateY(0px)' : 'translateY(10px)'),
                    transition: 'opacity 500ms cubic-bezier(0.22,1,0.36,1), transform 500ms cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  {word}
                </span>
              ))}
            </h2>
          </div>
        )}

        {/* H3 + Pills + Buttons, all mounted together so space is reserved upfront */}
        {showH3 && (
          <div className="mt-10 sm:mt-20 flex flex-col items-center gap-5 sm:gap-6">
            <FadeIn instant={skipAnim}>
              <Link
                data-spring
                to="/resume#experience"
                className="group block border border-black/[0.08] dark:border-white/[0.08] hover:border-black/[0.18] dark:hover:border-white/[0.18] rounded-3xl px-6 py-5 flex flex-col items-center gap-4 max-w-lg transition-[border-color,box-shadow] duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_20px_rgba(255,255,255,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC] focus-visible:ring-offset-2 cursor-pointer"
              >
                <h3 className="text-[14px] sm:text-[15px] font-semibold uppercase tracking-widest text-[#5c5c5c] dark:text-[#adadad]">
                  {expLabel}
                </h3>
                <ul
                  aria-label={expLabel}
                  className="list-none grid grid-cols-3 gap-2 p-0 m-0"
                >
                  {pills.map((pill, i) => (
                    <li
                      key={pill}
                      className="px-2 py-1 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-[15px] font-medium flex items-center justify-center"
                      style={{
                        opacity: i < visiblePills ? 1 : 0,
                        transform: prefersReduced ? undefined : (i < visiblePills ? 'translateY(0px)' : 'translateY(8px)'),
                        transition: 'opacity 400ms cubic-bezier(0.22,1,0.36,1), transform 400ms cubic-bezier(0.22,1,0.36,1)',
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
            </FadeIn>
            <div
              className="mt-8 sm:mt-10 flex gap-3"
              style={{
                opacity: showButtons ? 1 : 0,
                transform: prefersReduced ? undefined : (showButtons ? 'translateY(0px)' : 'translateY(12px)'),
                transition: 'opacity 500ms cubic-bezier(0.22,1,0.36,1), transform 500ms cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <a
                href="#case-studies"
                onClick={(e) => {
                  e.preventDefault();
                  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                  const mobile = window.matchMedia('(max-width: 639px)').matches;
                  document.getElementById('case-studies')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: mobile ? 'center' : 'start' });
                }}
                data-spring
                className="px-6 py-3 bg-[#0152EC] hover:bg-[#0142cc] text-white font-medium text-[15px] sm:text-[16px] rounded-full border border-[#5289f2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC] focus-visible:ring-offset-2"
              >
                {btnCases}
              </a>
              <Link
                to="/resume"
                data-spring
                className="px-6 py-3 text-[#0152EC] hover:text-[#0142cc] dark:text-[#7aabff] dark:hover:text-[#9ec0ff] font-medium text-[15px] sm:text-[16px] rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6] focus-visible:ring-offset-2"
              >
                {btnCV}
              </Link>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
