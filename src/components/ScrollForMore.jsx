import { useState, useEffect, useRef } from 'react';
import imgChevronDown from '../assets/icons/icon-chevron-down.svg';

const T = {
  en: 'Scroll for more',
  fr: 'Défiler pour voir plus',
};

export default function ScrollForMore({ lang }) {
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
      inert={visible ? undefined : ''}
      className={`fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center motion-safe:transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      <div className={`absolute bottom-[calc(100%+20px)] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-opacity duration-150 ${tipVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-[#1f1f1f] dark:bg-[#f6f6f6] text-[#f6f6f6] dark:text-[#1f1f1f] text-[13px] sm:text-[15px] font-semibold px-3 py-1 rounded-lg whitespace-nowrap ring-1 ring-white/20 dark:ring-black/10">
          {label}
        </div>
        <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#1f1f1f] dark:border-t-[#f6f6f6] mt-[-1px]" />
      </div>

      <button
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}
        aria-label={label}
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
