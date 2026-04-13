import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { trackEvent } from '../analytics';

export const CONSENT_KEY = 'cookie-consent';

const T = {
  en: {
    label:      'Cookie preferences',
    message:    'Analytics show me how this site is used and help me keep improving your experience.',
    learnMore:  'View the cookies policy',
    learnMoreShort: 'Learn more',
    reject:     'Decline',
    accept:     'Accept',
  },
  fr: {
    label:      'Préférences de cookies',
    message:    "Les cookies analytiques me montrent comment ce site est vraiment utilisé et m'aident à améliorer continuellement votre expérience.",
    learnMore:  'Consulter la politique de cookies',
    learnMoreShort: 'En savoir plus',
    reject:     'Refuser',
    accept:     'Accepter',
  },
};

function CookieBanner({ lang, hideFloating = false }) {
  const [visible, setVisible] = useState(false);
  const [explicit, setExplicit] = useState(false);
  const dialogRef = useRef(null);
  const t = T[lang] ?? T.en;
  const { pathname } = useLocation();
  const onCookiesPage = pathname === '/cookies';

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setVisible(true);
    const show = () => { setVisible(true); setExplicit(true); };
    window.addEventListener('show-cookie-banner', show);
    return () => window.removeEventListener('show-cookie-banner', show);
  }, []);

  useEffect(() => {
    if (visible) dialogRef.current?.focus();
  }, [visible]);

  const respond = (choice) => {
    localStorage.setItem(CONSENT_KEY, choice);
    setVisible(false);
    setExplicit(false);
    window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: choice }));
    trackEvent('cookie_consent', { choice });
  };

  return (
    <>
      {/* Full banner */}
      <div
        {...(visible && (!hideFloating || explicit) ? { role: 'dialog', 'aria-label': t.label } : {})}
        ref={dialogRef}
        tabIndex={-1}
        inert={!visible || (hideFloating && !explicit)}
        className={`fixed bottom-[60px] sm:bottom-4 left-1/2 -translate-x-1/2 z-[300] w-[340px] md:w-auto md:max-w-[760px] bg-tooltip-bg/95 backdrop-blur-1 rounded-radius-6 shadow-s p-5 flex flex-col md:flex-row md:items-center gap-5 md:gap-6 transition-all duration-300 ease-out ${
          visible && (!hideFloating || explicit) ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        {/* Left: label + message */}
        <div className="flex flex-col gap-5 md:gap-2 md:flex-1 min-w-0 md:min-w-[320px]">
          <p className="text-h6 font-semibold leading-tight text-fg-primary-inverse flex items-center gap-2">
            <span className="text-copy-m leading-none">🍪</span>
            {t.label}
          </p>
          <p className="hidden md:block text-copy-s leading-relaxed text-fg-muted-inverse md:mt-2">{t.message}</p>
          <p className="text-fine-print leading-normal text-fg-muted-inverse md:mt-2">
            <Link
              to="/cookies"
              onClick={onCookiesPage ? () => { setVisible(false); setExplicit(false); } : undefined}
              className="underline hover:opacity-60 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-radius-half text-fg-primary-inverse"
            >
              {t.learnMore}
            </Link>
          </p>
          {/* Mobile-only full message */}
          <p className="md:hidden text-copy-s leading-relaxed text-fg-muted-inverse line-clamp-3">
            {t.message}
          </p>
        </div>

        {/* Right: buttons */}
        <div className="flex items-center gap-4 md:shrink-0">
          <button
            data-spring
            aria-label={t.reject}
            onClick={() => respond('rejected')}
            className="flex-1 md:flex-none md:w-[100px] py-3 text-label-s font-medium leading-[1.2] rounded-radius-3 bg-bg-surface text-fg-primary hover:bg-btn-bg-over dark:hover:bg-btn-nav-bg-rest-subtle transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            {t.reject}
          </button>
          <button
            data-spring
            aria-label={t.accept}
            onClick={() => respond('accepted')}
            className="flex-1 md:flex-none md:w-[100px] py-3 text-label-s font-medium leading-[1.2] rounded-radius-3 bg-bg-surface text-fg-primary hover:bg-btn-bg-over dark:hover:bg-btn-nav-bg-rest-subtle transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            {t.accept}
          </button>
        </div>
      </div>

    </>
  );
}

export default CookieBanner;
