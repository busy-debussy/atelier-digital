import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_CHAT_API_URL || '/api/chat';

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
  if (lang === 'fr') return dark ? "Bonsoir, c'est David\u00a0!" : "Bonjour, c'est David\u00a0!";
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
    ? ['Digital twins', 'Design 3D', 'Accessibilité', 'Design systems', 'Vibe-coding', 'Stratégie UX']
    : ['Digital twins', '3D design', 'Accessibility', 'Design systems', 'Vibe-coding', 'UX strategy'];

  const chatPlaceholders = lang === 'fr'
    ? ['Demandez à Claude sur mon travail…', 'Demandez à Claude sur mon expérience…', "J'ai entraîné Claude sur mon portfolio…", 'Demandez à Claude sur mes compétences…', "L'I.A. me connaît bien…", 'Demandez sur ma formation…', 'Que souhaitez-vous savoir?…', 'Claude a été briefé sur mon travail…']
    : ['Ask Claude about my work…', 'Ask Claude about my experience…', 'I trained Claude on my portfolio…', 'Ask Claude about my skills…', 'A.I. knows me well…', 'Ask about my education…', 'What would you like to know?…', 'Claude is briefed on my work…'];

  const [ready, setReady] = useState(skip);
  const [chatInput, setChatInput] = useState('');
  const [chatFocused, setChatFocused] = useState(false);
  const [phIdx, setPhIdx] = useState(0);
  const [phOut, setPhOut] = useState(false);

  // Shuffled order of indices 1–n (index 0 = Claude phrase, always shown first)
  const phOrderRef = useRef(null);
  if (phOrderRef.current === null) {
    const indices = Array.from({ length: chatPlaceholders.length - 1 }, (_, i) => i + 1);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    phOrderRef.current = { order: indices, pos: -1 };
  }
  const MAX_HERO_TURNS = 6;
  const [heroMessages, setHeroMessages] = useState([]);
  const [heroLoading, setHeroLoading] = useState(false);
  const [messagesClosing, setMessagesClosing] = useState(false);
  const messagesEndRef = useRef(null);
  const hasMessages = heroMessages.length > 0;
  const heroTurns = heroMessages.filter(m => m.role === 'user').length;
  const heroAtLimit = heroTurns >= MAX_HERO_TURNS;

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

  // Cycle placeholder phrases in shuffled order — stops when chat is active
  useEffect(() => {
    if (prefersReduced || hasMessages) return;
    const id = setInterval(() => {
      setPhOut(true);
      setTimeout(() => {
        const { order } = phOrderRef.current;
        const nextPos = (phOrderRef.current.pos + 1) % order.length;
        phOrderRef.current.pos = nextPos;
        setPhIdx(order[nextPos]);
        setPhOut(false);
      }, 300);
    }, 2800);
    return () => clearInterval(id);
  }, [hasMessages]); // eslint-disable-line react-hooks/exhaustive-deps

  // Escape key to collapse hero chat
  useEffect(() => {
    if (!hasMessages) return;
    const onKey = (e) => { if (e.key === 'Escape') closeHeroChat(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hasMessages]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [heroMessages, heroLoading]);

  const closeHeroChat = () => {
    setMessagesClosing(true);
    setTimeout(() => {
      setHeroMessages([]);
      setMessagesClosing(false);
      setPhIdx(0);
      phOrderRef.current.pos = -1;
    }, 300);
  };

  const sendHero = async () => {
    const text = chatInput.trim();
    if (!text || heroLoading || heroAtLimit) return;
    const updated = [...heroMessages, { role: 'user', content: text }];
    setHeroMessages(updated);
    setChatInput('');
    setHeroLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      const reply = data.content || data.error || (lang === 'fr' ? 'Une erreur s\'est produite.' : 'Something went wrong.');
      setHeroMessages([...updated, { role: 'assistant', content: reply }]);
    } catch {
      setHeroMessages(prev => [...prev, { role: 'assistant', content: lang === 'fr' ? 'Une erreur s\'est produite.' : 'Something went wrong.' }]);
    } finally {
      setHeroLoading(false);
    }
  };

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

        {/* H1 */}
        <div style={hasMessages && !messagesClosing ? { opacity: 0, transition: 'opacity 300ms ease', pointerEvents: 'none' } : fadeUp(0)}>
          <h1 className="text-display-1 font-bold tracking-tight leading-tight text-fg-primary">
            {heading}
          </h1>
        </div>

        {/* H2 */}
        <div className="mt-4 sm:mt-6" style={hasMessages && !messagesClosing ? { opacity: 0, transition: 'opacity 300ms ease', pointerEvents: 'none' } : fadeUp(100)}>
          <h2 className="text-display-2 font-semibold leading-tight text-fg-muted">
            {subtitle}
          </h2>
        </div>

        {/* Slot — always in flow at card height; card and messages swap inside without affecting input position */}
        <div className="relative mt-8 sm:mt-12 w-full max-w-lg" style={fadeUp(200, 480)}>

          {/* Card */}
          <div className={`transition-opacity duration-300 ${hasMessages && !messagesClosing ? 'opacity-0 pointer-events-none' : ''}`}>
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
                    className="px-2 py-1 sm:px-4 sm:py-2 rounded-full text-tag-s font-medium leading-normal flex items-center justify-center bg-bg-surface border border-glass-subtle text-fg-secondary"
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
            </Link>
          </div>

          {/* Messages — absolutely overlaid on the card slot */}
          {hasMessages && (
            <>
              <div
                className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 overflow-y-auto text-left"
                style={{
                  maxHeight: '45vh',
                  scrollbarWidth: 'none',
                  ...(messagesClosing
                    ? { opacity: 0, transition: 'opacity 300ms ease' }
                    : { animation: 'fade-in 0.35s ease both' }
                  )
                }}
              >
                {heroMessages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] text-copy-s leading-relaxed break-words ${
                      m.role === 'user'
                        ? 'bg-bg-surface border border-glass-subtle rounded-radius-4 rounded-br-[4px] px-4 py-3 text-fg-primary'
                        : 'text-fg-primary px-1'
                    }`}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {heroLoading && (
                  <div className="flex justify-start px-1">
                    <div className="flex gap-1.5 items-center py-2">
                      {[0,1,2].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-fg-dot-rest animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                )}
                {heroTurns >= 2 && !heroAtLimit && !heroLoading && (() => {
                  const left = MAX_HERO_TURNS - heroTurns;
                  const urgent = left === 1;
                  return (
                    <p className={`text-fine-print leading-normal text-center ${urgent ? 'text-feedback-warning-msg-fg font-medium' : 'text-fg-muted-inverse'}`}>
                      {lang === 'fr' ? `${left} message${left === 1 ? '' : 's'} restant${left === 1 ? '' : 's'}` : `${left} message${left === 1 ? '' : 's'} remaining`}
                    </p>
                  );
                })()}
                {heroAtLimit && !heroLoading && (
                  <p className="text-tooltip text-fg-muted-inverse text-center pt-2 leading-relaxed">
                    {lang === 'fr' ? "C'est tout pour l'instant, n'hésitez pas à me contacter pour en savoir plus." : "All caught up, drop me a line if you'd like to know more."}
                  </p>
                )}
                <div ref={messagesEndRef} />
              </div>
            </>
          )}

        </div>

        {/* Inline AI input */}
        <div className="mt-3 sm:mt-4 w-full max-w-lg" style={fadeUp(380)}>
          <div className={`flex items-center border border-glass-subtle focus-within:border-border-subtle rounded-full pl-3 pr-2 h-12 gap-2 transition-[border-color,box-shadow] duration-200 ${!hasMessages && !chatInput.trim() ? 'hover:border-border-subtle hover:shadow-s dark:hover:shadow-s-dark' : ''}`}>
            {hasMessages && (
              <div className="relative group shrink-0">
                <button
                  type="button"
                  onClick={closeHeroChat}
                  aria-label={lang === 'fr' ? 'Réduire' : 'Collapse'}
                  className="w-7 h-7 rounded-full flex items-center justify-center bg-bg-surface-inverted text-fg-primary-inverse hover:opacity-75 transition-opacity duration-150 cursor-pointer"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                <div className="pointer-events-none absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:delay-[400ms] transition-opacity duration-200 z-10">
                  <div data-squircle className="bg-tooltip-bg text-fg-primary-inverse text-tooltip font-light leading-[1.2] pl-2 pr-1 py-[4px] rounded-radius-2 whitespace-nowrap ring-1 ring-tooltip-ring flex items-center gap-2">
                    {lang === 'fr' ? 'Réduire' : 'Collapse'}
                    <kbd className="text-tooltip-kbd font-medium px-1 h-[18px] flex items-center justify-center rounded bg-tooltip-keyboard-shortcut-bg text-tooltip-keyboard-shortcut-fg not-italic">esc</kbd>
                  </div>
                </div>
              </div>
            )}
            <div className="relative flex-1 min-w-0 flex items-center pl-3">
              {!chatInput && (
                hasMessages ? (
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center pl-3 text-copy-s text-fg-dot-rest">
                    {lang === 'fr' ? 'Demandez à Claude…' : 'Ask Claude…'}
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 flex items-center pl-3 text-copy-s text-fg-dot-rest${!phOut && !prefersReduced ? ' ph-ltr-reveal' : ''}`}
                    style={phOut ? { opacity: 0, transition: 'opacity 300ms ease' } : (prefersReduced ? { opacity: 1, transition: 'opacity 350ms ease' } : {})}
                  >
                    {chatPlaceholders[phIdx]}
                  </span>
                )
              )}
              <input
                type="text"
                value={chatInput}
                onChange={e => { if (!heroAtLimit) setChatInput(e.target.value); }}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendHero(); } }}
                placeholder=""
                disabled={heroAtLimit}
                aria-label={lang === 'fr' ? 'Demandez à Claude sur mon travail…' : 'Ask Claude about my work…'}
                onFocus={() => setChatFocused(true)}
                onBlur={() => setTimeout(() => setChatFocused(false), 150)}
                autoComplete="off"
                className="w-full bg-transparent text-copy-s text-fg-primary outline-none disabled:opacity-40"
              />
            </div>
            {!heroAtLimit && <div className="relative group shrink-0">
              <button
                type="button"
                onClick={sendHero}
                disabled={!chatInput.trim() || heroLoading}
                aria-label={lang === 'fr' ? 'Envoyer' : 'Send'}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-[colors,background] duration-150 ${chatInput.trim() && !heroLoading ? 'cursor-pointer bg-fg-primary' : 'cursor-default border border-glass-subtle'}`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: chatInput.trim() && !heroLoading ? 'var(--bg-page)' : 'var(--fg-dot-rest)' }} />
                </svg>
              </button>
              {chatInput.trim() && (
                <div className="pointer-events-none absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:delay-[400ms] transition-opacity duration-200">
                  <div data-squircle className="bg-tooltip-bg text-fg-primary-inverse text-tooltip font-light leading-[1.2] pl-2 pr-1 py-[4px] rounded-radius-2 whitespace-nowrap ring-1 ring-tooltip-ring flex items-center gap-2">
                    {lang === 'fr' ? 'Envoyer' : 'Send prompt'}
                    <kbd className="text-tooltip-kbd font-medium w-[15px] h-[18px] flex items-center justify-center rounded bg-tooltip-keyboard-shortcut-bg text-tooltip-keyboard-shortcut-fg not-italic">↵</kbd>
                  </div>
                </div>
              )}
            </div>}
          </div>
        </div>

        {/* Cookie notice — space always reserved, visible only when input focused */}
        <div className="mt-2 w-full max-w-lg text-center" style={{ ...fadeUp(420), opacity: chatFocused ? 1 : 0, transition: 'opacity 0.3s ease' }}>
          <p className="text-copy-xs text-fg-dot-rest">
            {lang === 'fr' ? "En utilisant ce chat vous acceptez la" : "By using this chat you agree to the"}{' '}
            <Link to="/cookies" className="underline text-fg-primary hover:text-fg-muted transition-colors duration-150">
              {lang === 'fr' ? 'politique de cookies' : 'cookies policy'}
            </Link>
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-10 sm:mt-12 flex items-center gap-8" style={fadeUp(500)}>
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
