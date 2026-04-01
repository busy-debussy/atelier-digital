import { useState, useEffect, useRef } from 'react';
import imgChevronDown from '../assets/icons/icon-chevron-down.svg';

const T = {
  en: 'Scroll for more',
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
        <div className="bg-[#1f1f1f] dark:bg-[#f6f6f6] text-[#f6f6f6] dark:text-[#1f1f1f] text-[13px] font-light px-2 py-[4px] rounded-lg whitespace-nowrap ring-1 ring-white/20 dark:ring-black/10">
          {label}
        </div>
      </div>

      <button
        onClick={() => {
          const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          const mobile = window.matchMedia('(max-width: 639px)').matches;
          if (scrollTarget && mobile) {
            document.getElementById(scrollTarget)?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'center' });
          } else {
            window.scrollBy({ top: window.innerHeight * 0.9, behavior: reduced ? 'instant' : 'smooth' });
          }
        }}
        aria-label={label}
        data-spring
        className="group p-2 sm:p-2.5 lg:p-3 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] hover:bg-[#1f1f1f] dark:hover:bg-[#f6f6f6] transition-colors motion-safe:animate-bounce cursor-pointer"
      >
        <img
          src={imgChevronDown}
          alt=""
          width={20} height={20}
          className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px] dark:brightness-0 dark:invert group-hover:brightness-0 group-hover:invert dark:group-hover:brightness-100 dark:group-hover:invert-0 transition-[filter]"
        />
      </button>
    </div>
  );
}
