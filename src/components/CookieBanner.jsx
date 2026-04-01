import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export const CONSENT_KEY = 'cookie-consent';

const T = {
  en: {
    label:      'Cookie preferences',
    message:    'This site uses cookies for analytics.',
    learnMore:  'View the cookies policy',
    learnMoreShort: 'Learn more',
    reject:     'Decline',
    accept:     'Accept',
  },
  fr: {
    label:      'Préférences de cookies',
    message:    "Ce site utilise des cookies pour l'analyse.",
    learnMore:  'Consulter la politique de cookies',
    learnMoreShort: 'En savoir plus',
    reject:     'Refuser',
    accept:     'Accepter',
  },
};

function CookieBanner({ lang, hideFloating = false }) {
  const [visible, setVisible] = useState(false);
  const rejectRef = useRef(null);
  const t = T[lang] ?? T.en;

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setVisible(true);
    const show = () => { setVisible(true); };
    window.addEventListener('show-cookie-banner', show);
    return () => window.removeEventListener('show-cookie-banner', show);
  }, []);

  useEffect(() => {
    if (visible) rejectRef.current?.focus();
  }, [visible]);

  const respond = (choice) => {
    localStorage.setItem(CONSENT_KEY, choice);
    setVisible(false);
    window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: choice }));
  };

  return (
    <>
      {/* Full banner */}
      <div
        {...(visible && !hideFloating ? { role: 'dialog', 'aria-modal': 'true', 'aria-label': t.label } : {})}
        inert={!visible || hideFloating}
        className={`fixed bottom-4 left-4 z-[300] w-[280px] bg-[#1f1f1f]/95 dark:bg-[#f6f6f6]/95 backdrop-blur-sm border border-white/[0.08] dark:border-black/[0.08] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.10)] p-4 flex flex-col gap-3 transition-all duration-300 ease-out ${
          visible && !hideFloating ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
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

    </>
  );
}

export default CookieBanner;
