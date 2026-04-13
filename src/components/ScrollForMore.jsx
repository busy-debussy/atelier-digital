import { useState, useEffect, useRef } from 'react';
import imgChevronDown from '../assets/icons/icon-chevron-down.svg';
import { trackEvent } from '../analytics';

const T = {
  en: 'scroll for more',
  fr: 'Faire défiler',
};

export default function ScrollForMore({ lang, scrollTarget }) {
  const [visible, setVisible]       = useState(true);
  const [tipVisible, setTipVisible] = useState(false);
  const timerRef                    = useRef(null);

  useEffect(() => {
    setVisible(true); // reset when route mounts
    const onScroll = () => setVisible(window.scrollY <= 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const showTip = () => { timerRef.current = setTimeout(() => setTipVisible(true), 600); };
  const hideTip = () => { clearTimeout(timerRef.current); setTipVisible(false); };
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const label = T[lang] ?? T.en;

  return (
    <div
      inert={!visible}
      className={`fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center motion-safe:transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      <div className={`absolute bottom-[calc(100%+20px)] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-opacity duration-150 ${tipVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-tooltip-bg text-fg-primary-inverse text-tooltip font-light leading-[1.2] px-2 py-[4px] rounded-radius-2 whitespace-nowrap ring-1 ring-tooltip-ring">
          {label}
        </div>
      </div>

      <div data-spring>
        <button
          onClick={() => {
            trackEvent('scroll_for_more');
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const mobile = window.matchMedia('(max-width: 639px)').matches;
            if (scrollTarget && mobile) {
              document.getElementById(scrollTarget)?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'center' });
            } else {
              window.scrollBy({ top: window.innerHeight * 0.9, behavior: reduced ? 'instant' : 'smooth' });
            }
          }}
          aria-label={label}
          className="group p-2 sm:p-2.5 lg:p-3 rounded-full bg-btn-nav-bg-rest hover:bg-btn-nav-bg-hover transition-colors motion-safe:animate-bounce cursor-pointer"
        >
          <img
            src={imgChevronDown}
            alt=""
            width={20} height={20}
            className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px] dark:brightness-0 dark:invert group-hover:brightness-0 group-hover:invert dark:group-hover:brightness-100 dark:group-hover:invert-0 transition-[filter]"
          />
        </button>
      </div>
    </div>
  );
}
