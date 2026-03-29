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
          aria-label={t.learnMore}
          className="underline hover:opacity-60 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7aabff] dark:focus-visible:ring-[#0152EC] rounded-sm text-[#f6f6f6] dark:text-[#1f1f1f]"
        >
          {t.learnMoreShort}
        </Link>
      </p>
      <div className="flex items-center gap-2">
        <button
          ref={rejectRef}
          onClick={() => respond('rejected')}
          className="flex-1 py-1.5 text-[13px] font-medium rounded-lg border border-white/[0.15] dark:border-black/[0.12] bg-[#f6f6f6] dark:bg-[#1f1f1f] text-[#1f1f1f] dark:text-[#f6f6f6] hover:bg-[#ebebeb] dark:hover:bg-[#2c2c2c] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7aabff] dark:focus-visible:ring-[#0152EC]"
        >
          {t.reject}
        </button>
        <button
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
        className="w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-[4px] bg-white/[0.64] dark:bg-black/[0.64] shadow-[0px_0px_17.1px_0px_rgba(0,0,0,0.08)] dark:ring-1 dark:ring-white/[0.16] hover:scale-110 transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC]"
      >
        <span aria-hidden="true" className="text-[16px] leading-none">🍪</span>
      </button>
      <span className="pointer-events-none absolute bottom-full left-0 mb-2 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1f1f1f] border border-black/[0.08] dark:border-white/[0.08] shadow-sm text-[12px] font-medium text-[#1f1f1f] dark:text-[#f6f6f6] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        {t.label}
      </span>
    </div>
  );

  return null;
}

export default CookieBanner;
