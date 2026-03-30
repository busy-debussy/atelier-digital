import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export const CONSENT_KEY = 'cookie-consent';

const T = {
  en: {
    label:      'Cookie preferences',
    message:    'This site uses cookies for analytics.',
    learnMore:  'Learn more about cookies',
    learnMoreShort: 'Learn more',
    reject:     'Decline',
    accept:     'Accept',
  },
  fr: {
    label:      'Préférences de cookies',
    message:    "Ce site utilise des cookies pour l'analyse.",
    learnMore:  'En savoir plus sur les cookies',
    learnMoreShort: 'En savoir plus',
    reject:     'Refuser',
    accept:     'Accepter',
  },
};

function CookieBanner({ lang }) {
  const [visible,      setVisible]     = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const rejectRef = useRef(null);
  const t = T[lang] ?? T.en;

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setVisible(true);
    else setConsentGiven(true);
    const show = () => { setVisible(true); setConsentGiven(false); };
    window.addEventListener('show-cookie-banner', show);
    return () => window.removeEventListener('show-cookie-banner', show);
  }, []);

  useEffect(() => {
    if (visible) rejectRef.current?.focus();
  }, [visible]);

  const respond = (choice) => {
    localStorage.setItem(CONSENT_KEY, choice);
    setVisible(false);
    setConsentGiven(true);
    window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: choice }));
  };

  if (visible) return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.label}
      className="fixed bottom-4 left-4 z-[300] w-[280px] bg-[#1f1f1f]/95 dark:bg-[#f6f6f6]/95 backdrop-blur-sm border border-white/[0.08] dark:border-black/[0.08] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.10)] p-4 flex flex-col gap-3"
      style={{ animation: 'fade-in 0.35s cubic-bezier(0.22,1,0.36,1) both' }}
    >
      <p className="text-[13px] text-[#adadad] dark:text-[#5c5c5c]">
        {t.message}{' '}
        <Link
          to="/cookies"
          className="underline hover:opacity-60 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7aabff] dark:focus-visible:ring-[#0152EC] rounded-sm text-[#f6f6f6] dark:text-[#1f1f1f]"
        >
          {t.learnMore}
        </Link>
      </p>
      <div className="flex items-center gap-2">
        <button
          data-spring
          ref={rejectRef}
          onClick={() => respond('rejected')}
          className="flex-1 py-1.5 text-[13px] font-medium rounded-lg border border-white/[0.15] dark:border-black/[0.12] bg-[#f6f6f6] dark:bg-[#1f1f1f] text-[#1f1f1f] dark:text-[#f6f6f6] hover:bg-[#ebebeb] dark:hover:bg-[#2c2c2c] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7aabff] dark:focus-visible:ring-[#0152EC]"
        >
          {t.reject}
        </button>
        <button
          data-spring
          onClick={() => respond('accepted')}
          className="flex-1 py-1.5 text-[13px] font-medium rounded-lg border border-white/[0.15] dark:border-black/[0.12] bg-[#f6f6f6] dark:bg-[#1f1f1f] text-[#1f1f1f] dark:text-[#f6f6f6] hover:bg-[#ebebeb] dark:hover:bg-[#2c2c2c] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7aabff] dark:focus-visible:ring-[#0152EC]"
        >
          {t.accept}
        </button>
      </div>
    </div>
  );

  if (consentGiven) return (
    <div className="fixed bottom-4 left-4 z-[300] group" style={{ animation: 'fade-in 0.35s cubic-bezier(0.22,1,0.36,1) both' }}>
      <button
        onClick={() => window.dispatchEvent(new Event('show-cookie-banner'))}
        aria-label={t.label}
        data-spring
        className="w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-[4px] bg-white/[0.64] dark:bg-black/[0.64] shadow-[0px_0px_17.1px_0px_rgba(0,0,0,0.08)] dark:ring-1 dark:ring-white/[0.16] hover:scale-110 transition-transform duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC]"
      >
        <span className="text-[16px] leading-none">🍪</span>
      </button>
      <div className="pointer-events-none absolute bottom-[calc(100%+8px)] left-0 opacity-0 group-hover:opacity-100 group-hover:delay-[600ms] transition-opacity duration-200 flex flex-col items-start">
        <div className="bg-[#1f1f1f] dark:bg-[#f6f6f6] text-[#f6f6f6] dark:text-[#1f1f1f] text-[15px] font-semibold leading-4 px-3 py-[4px] rounded-lg whitespace-nowrap ring-1 ring-white/20 dark:ring-black/10">
          {t.label}
        </div>
        <svg width="12" height="6" viewBox="0 0 12 6" aria-hidden="true" className="shrink-0 ml-3" style={{ display: 'block', marginTop: '-1px' }}>
          <path d="M0,0 L5.2,5.1 Q6,6 6.8,5.1 L12,0 Z" className="fill-[#1f1f1f] dark:fill-[#f6f6f6]" />
        </svg>
      </div>
    </div>
  );

  return null;
}

export default CookieBanner;
