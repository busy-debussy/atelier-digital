import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import imgChevronLeft from '../assets/icons/icon-chevron-left.svg';
import imgChevronRight from '../assets/icons/icon-chevron-right.svg';
import imgLock         from '../assets/icons/icon-lock.svg';
import imgArrowRight   from '../assets/icons/icon-arrow-right.svg';
import imgLockLg       from '../assets/icons/icon-lock-lg.svg';
import imgIconAR       from '../assets/icons/icon-ar.svg';
import imgIconWeb      from '../assets/icons/icon-responsive.svg';
import imgIconTwin     from '../assets/icons/icon-inputs.svg';
import imgBgSales      from '../assets/photos/photo-cgi-interactive-platform.png';
import imgBgXR         from '../assets/photos/photo-xr-experiences.png';
import imgBgTwin       from '../assets/photos/photo-digital-twins.png';

// Nav button styles (mirrors other carousels)
const navBtnClass = 'group shrink-0 p-2 sm:p-[10px] lg:p-3 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color,color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer enabled:active:opacity-70';
const chevL = 'w-5 h-5 sm:w-[22px] sm:h-[22px] lg:w-6 lg:h-6 brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter]';
const chevR = 'w-5 h-5 sm:w-[22px] sm:h-[22px] lg:w-6 lg:h-6 group-enabled:group-hover:brightness-0 group-enabled:group-hover:invert dark:brightness-0 dark:invert dark:group-enabled:group-hover:brightness-100 dark:group-enabled:group-hover:invert-0 transition-[filter]';

// Data
const T = {
  en: {
    heading:       'Case studies',
    navPrev:       'View previous case study',
    navNext:       'View next case study',
    restricted:    'Restricted access',
    restrictedBody:'Get in touch to learn more\nabout this project.',
    restrictedCta: 'email',
    cards: [
      {
        bg:           imgBgSales,
        title:        'An interactive platform',
        subtitle:     'supercharging sales by 20%',
        primaryChip:  { label: 'Web app', icon: imgIconWeb },
        secondaryChips: [{ label: 'React' }],
        tint:         'blue',
        cta:          'go',
        href:         '/projects/sales-platform',
      },
      {
        bg:           imgBgXR,
        title:        'Shared XR experiences',
        subtitle:     'engaging the public',
        primaryChip:  { label: 'Augmented Reality', icon: imgIconAR },
        secondaryChips: [{ label: 'Unity' }, { label: 'Unreal' }],
        tint:         null,
        cta:          'locked',
        href:         null,
      },
      {
        bg:           imgBgTwin,
        title:        'Real-time digital twins',
        subtitle:     'accelerating megaprojects',
        primaryChip:  { label: 'Digital twin', icon: imgIconTwin },
        secondaryChips: [{ label: 'Unreal Engine' }],
        tint:         null,
        cta:          'locked',
        href:         null,
      },
    ],
  },
  fr: {
    heading:       'Études de cas',
    navPrev:       "Voir l'étude de cas précédente",
    navNext:       "Voir l'étude de cas suivante",
    restricted:    'Accès restreint',
    restrictedBody:'Prenez contact pour en savoir plus\nsur ce projet.',
    restrictedCta: 'envoyer un email',
    cards: [
      {
        bg:           imgBgSales,
        title:        'Une plateforme interactive',
        subtitle:     'boostant les ventes de 20%',
        primaryChip:  { label: 'Web app', icon: imgIconWeb },
        secondaryChips: [{ label: 'React' }],
        tint:         'blue',
        cta:          'go',
        href:         '/projects/sales-platform',
      },
      {
        bg:           imgBgXR,
        title:        'Expériences XR partagées',
        subtitle:     'engageant le public',
        primaryChip:  { label: 'Réalité augmentée', icon: imgIconAR },
        secondaryChips: [{ label: 'Unity' }, { label: 'Unreal' }],
        tint:         null,
        cta:          'locked',
        href:         null,
      },
      {
        bg:           imgBgTwin,
        title:        'Jumeaux numériques en temps réel',
        subtitle:     'accélérant les mégaprojets',
        primaryChip:  { label: 'Jumeau numérique', icon: imgIconTwin },
        secondaryChips: [{ label: 'Unreal Engine' }],
        tint:         null,
        cta:          'locked',
        href:         null,
      },
    ],
  },
};

// Card
function CsCard({ card, t }) {
  const [showRestricted, setShowRestricted] = useState(false);

  const panelBg = card.tint === 'blue' ? '#003464' : '#000000';

  const inner = (
    <>
      <img src={card.bg} alt="" className="absolute inset-0 w-full h-full object-cover" />

      <div
        className="absolute bottom-0 left-0 right-0 p-3 sm:p-3.5 lg:p-4 flex flex-col gap-2 sm:gap-2.5 lg:gap-3 backdrop-blur-[30px]"
        style={{ background: panelBg }}
      >
        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-white/[0.16] overflow-hidden">
            {card.primaryChip.icon && (
              <img src={card.primaryChip.icon} alt="" className="w-3 h-3 shrink-0 brightness-0 invert" />
            )}
            <span className="text-[9px] sm:text-[11px] lg:text-[12px] font-medium text-white leading-none whitespace-nowrap">
              {card.primaryChip.label}
            </span>
          </div>
          {card.secondaryChips.map((chip, i) => (
            <div key={i} className="flex items-center px-2 py-1 rounded-xl bg-black/[0.32]">
              <span className="text-[9px] sm:text-[11px] lg:text-[12px] font-medium text-white/60 leading-none whitespace-nowrap">
                {chip.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <h3 className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold text-white leading-tight tracking-[0.12px]">
              {card.title}
            </h3>
            <p className="text-[13px] sm:text-[15px] lg:text-[18px] font-medium text-[#d6d6d6] leading-snug">
              {card.subtitle}
            </p>
          </div>

          {card.cta === 'go' ? (
            <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 lg:w-12 lg:h-12 rounded-[14px] sm:rounded-[16px] lg:rounded-[20px] bg-white flex items-center justify-center">
              <img src={imgArrowRight} alt="" className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            </div>
          ) : (
            <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 lg:w-12 lg:h-12 rounded-[14px] sm:rounded-[16px] lg:rounded-[20px] bg-white/[0.24] flex items-center justify-center">
              <img src={imgLock} alt="" className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 brightness-0 invert opacity-60" />
            </div>
          )}
        </div>
      </div>

      {/* Restricted access overlay, hover (desktop) + state (touch) */}
      {card.cta === 'locked' && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-5 bg-black/[0.82] backdrop-blur-[8px] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto p-6"
          style={{ opacity: showRestricted ? 1 : undefined, pointerEvents: showRestricted ? 'auto' : undefined }}
        >
          <img src={imgLockLg} alt="" width={80} height={80} className="brightness-0 invert" />
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold text-white leading-tight">{t.restricted}</p>
            <p className="text-[14px] sm:text-[16px] lg:text-[18px] text-[#d6d6d6] leading-relaxed whitespace-pre-line">{t.restrictedBody}</p>
          </div>
          <a
            href="mailto:d@AtelierDigital.co.uk"
            onClick={(e) => e.stopPropagation()}
            className="mt-2 px-5 py-1.5 sm:px-6 sm:py-2 bg-[#0152ec] border border-[#5289f2] rounded-full text-white font-medium text-[14px] sm:text-[16px] transition-colors hover:bg-[#0142cc]"
          >
            {t.restrictedCta}
          </a>
        </div>
      )}
    </>
  );

  const liClass = 'relative shrink-0 w-[300px] sm:w-[360px] lg:w-[384px] h-[420px] sm:h-[404px] lg:h-[480px] rounded-[28px] sm:rounded-[32px] overflow-hidden group snap-center motion-safe:hover:scale-[1.03] motion-safe:transition-transform duration-200 cursor-pointer';

  if (card.cta === 'go') {
    return (
      <li className={liClass}>
        {inner}
        {/* Stretched link covers the full card */}
        <Link to={card.href} className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white rounded-[28px] sm:rounded-[32px]" aria-label={card.title} />
      </li>
    );
  }

  return (
    <li
      className={liClass}
      onClick={() => setShowRestricted(v => !v)}
    >
      {inner}
    </li>
  );
}

// Section
function CaseStudies({ lang }) {
  const t = T[lang] ?? T.en;
  const cards = t.cards;

  const trackRef       = useRef(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const LG_CARD = 384, LG_GAP = 32;

  const getCarouselPl = () => {
    if (typeof window === 'undefined') return '1.5rem';
    const vw = window.innerWidth;
    if (window.matchMedia('(min-width: 1024px)').matches) {
      const allThreeW = 3 * LG_CARD + 2 * LG_GAP;
      if (vw >= allThreeW + 48) return `${(vw - allThreeW) / 2}px`;
      return `${Math.max(24, (vw - LG_CARD) / 2)}px`;
    }
    if (window.matchMedia('(min-width: 640px)').matches) return '24px';
    return `${Math.max(16, (vw - 300) / 2)}px`;
  };
  const [carouselPl, setCarouselPl] = useState(getCarouselPl);

  useEffect(() => {
    const update = () => setCarouselPl(getCarouselPl());
    update();
    window.addEventListener('resize', update, { passive: true });
    const mqSm = window.matchMedia('(min-width: 640px)');
    const mqLg = window.matchMedia('(min-width: 1024px)');
    mqSm.addEventListener('change', update);
    mqLg.addEventListener('change', update);
    return () => {
      window.removeEventListener('resize', update);
      mqSm.removeEventListener('change', update);
      mqLg.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const raf = requestAnimationFrame(() => {
      const card = track.children[activeIndexRef.current];
      if (card) {
        const scrollLeft = Math.max(0, card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2);
        track.scrollTo({ left: scrollLeft, behavior: 'instant' });
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [carouselPl]);

  const getStep = () => window.matchMedia('(min-width: 640px)').matches ? cards.length - 1 : 1;

  const scrollToCard = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index];
    if (card) {
      const scrollLeft = Math.max(0, card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2);
      track.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0, minDist = Infinity;
    Array.from(track.children).forEach((item, i) => {
      if (item.getAttribute('aria-hidden')) return;
      const dist = Math.abs(item.offsetLeft + item.offsetWidth / 2 - center);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    activeIndexRef.current = closest;
    setActiveIndex(closest);
  };

  return (
    <section id="case-studies" aria-labelledby="cs-heading" className="py-16 scroll-mt-24" tabIndex={-1}>

      <div className="max-w-5xl mx-auto px-6">
        <h2 id="cs-heading" className="text-[24px] sm:text-[28px] lg:text-[30px] font-bold leading-tight text-[#1f1f1f] dark:text-[#f6f6f6] mb-8">
          {t.heading}
        </h2>
      </div>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {t.cards[activeIndex].title}
      </div>

      <ul
        ref={trackRef}
        onScroll={handleScroll}
        className="relative flex gap-4 sm:gap-6 lg:gap-8 snap-x snap-mandatory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]"
        style={{ overflowX: 'auto', overflowY: 'visible', scrollbarWidth: 'none', paddingLeft: carouselPl, paddingTop: '12px', paddingBottom: '12px', touchAction: 'pan-x pan-y' }}
        aria-label={t.heading}
      >
        {cards.map((card, i) => <CsCard key={i} card={card} t={t} />)}
        <li role="none" aria-hidden="true"><div className="shrink-0" style={{ width: carouselPl }} /></li>
      </ul>

      {/* Nav, mobile/tablet only */}
      <div className="lg:hidden flex items-center justify-end gap-2 sm:gap-3 mt-4 sm:mt-5 pr-6 sm:pr-28">
        <button
          onClick={() => scrollToCard(Math.max(0, activeIndex - getStep()))}
          disabled={activeIndex === 0}
          aria-label={t.navPrev}
          className={navBtnClass}
        >
          <img src={imgChevronLeft} alt="" width={20} height={20} className={chevL} />
        </button>
        <button
          onClick={() => scrollToCard(Math.min(cards.length - 1, activeIndex + getStep()))}
          disabled={activeIndex === cards.length - 1}
          aria-label={t.navNext}
          className={navBtnClass}
        >
          <img src={imgChevronRight} alt="" width={20} height={20} className={chevR} />
        </button>
      </div>

    </section>
  );
}

export default CaseStudies;
