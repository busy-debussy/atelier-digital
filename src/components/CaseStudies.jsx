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
import imgBgSales      from '../assets/photos/photo-cgi-interactive-platform.webp';
import imgBgXR         from '../assets/photos/photo-xr-experiences.webp';
import imgBgTwin       from '../assets/photos/photo-digital-twins.webp';

// Nav button styles
const navBtnClass = 'group shrink-0 p-2 sm:p-[10px] lg:p-3 rounded-full bg-btn-nav-bg-rest enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer';
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
    restrictedCta: 'Message',
    cards: [
      {
        bg:           imgBgSales,
        title:        'An interactive platform',
        subtitle:     'supercharging sales by 20%',
        primaryChip:  { label: 'Web app', icon: imgIconWeb },
        secondaryChips: [{ label: 'React' }],
        tint:         'blue',
        cta:          'go',
        href:         '/case-study/sales-platform',
      },
      {
        bg:           imgBgXR,
        title:        'Shared XR experiences',
        subtitle:     'engaging the public',
        primaryChip:  { label: 'Augmented Reality', icon: imgIconAR },
        secondaryChips: [{ label: 'Unity' }, { label: 'Unreal' }],
        tint:         'blue',
        cta:          'go',
        href:         '/case-study/xr',
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
        mailSubject:  'Digital twins — enquiry',
      },
    ],
  },
  fr: {
    heading:       'Études de cas',
    navPrev:       "Voir l'étude de cas précédente",
    navNext:       "Voir l'étude de cas suivante",
    restricted:    'Accès restreint',
    restrictedBody:'Prenez contact pour en savoir plus\nsur ce projet.',
    restrictedCta: 'Message',
    cards: [
      {
        bg:           imgBgSales,
        title:        'Une plateforme web',
        subtitle:     'booste les ventes de 20%',
        primaryChip:  { label: 'Web app', icon: imgIconWeb },
        secondaryChips: [{ label: 'React' }],
        tint:         'blue',
        cta:          'go',
        href:         '/case-study/sales-platform',
      },
      {
        bg:           imgBgXR,
        title:        'Des expériences XR',
        subtitle:     'engagent le public',
        primaryChip:  { label: 'Réalité augmentée', icon: imgIconAR },
        secondaryChips: [{ label: 'Unity' }, { label: 'Unreal' }],
        tint:         'blue',
        cta:          'go',
        href:         '/case-study/xr',
      },
      {
        bg:           imgBgTwin,
        title:        'Un jumeau numérique',
        subtitle:     'accélére la macro-ingénierie',
        primaryChip:  { label: 'Jumeau numérique', icon: imgIconTwin },
        secondaryChips: [{ label: 'Unreal Engine' }],
        tint:         null,
        cta:          'locked',
        href:         null,
        mailSubject:  "Jumeaux numériques — plus d'infos",
      },
    ],
  },
};

// Card
function CsCard({ card, t }) {
  const [showRestricted, setShowRestricted] = useState(false);

  const panelBg = card.tint === 'blue' ? 'var(--card-panel)' : 'var(--card-panel-locked)';

  const inner = (
    <>
      <img src={card.bg} alt="" className="absolute inset-0 w-full h-full object-cover" />

      <div
        className="absolute bottom-0 left-0 right-0 p-3 sm:p-3.5 lg:p-4 flex flex-col gap-2 sm:gap-3 lg:gap-3 backdrop-blur-8"
        style={{ background: panelBg }}
      >
        <div className="flex flex-wrap gap-1 sm:gap-2">
          <div className="flex items-center gap-1 px-2 py-1 rounded-radius-3 bg-chip-bg-primary overflow-hidden">
            {card.primaryChip.icon && (
              <img src={card.primaryChip.icon} alt="" className="w-3 h-3 shrink-0 brightness-0 invert" />
            )}
            <span className="text-chip-xs font-medium text-white leading-none whitespace-nowrap">
              {card.primaryChip.label}
            </span>
          </div>
          {card.secondaryChips.map((chip, i) => (
            <div key={i} className="flex items-center px-2 py-1 rounded-radius-3 bg-chip-bg-secondary">
              <span className="text-chip-xs font-medium text-fg-on-dark-opacity-64 leading-none whitespace-nowrap">
                {chip.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-h4 font-bold text-white leading-tight">
              {card.title}
            </h3>
            <p className="text-subheading font-medium text-fg-on-dark-secondary leading-snug">
              {card.subtitle}
            </p>
          </div>

          {card.cta === 'go' ? (
            <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 lg:w-12 lg:h-12 rounded-radius-4 sm:rounded-radius-4 lg:rounded-radius-5 bg-white flex items-center justify-center">
              <img src={imgArrowRight} alt="" className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            </div>
          ) : (
            <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 lg:w-12 lg:h-12 rounded-radius-4 sm:rounded-radius-4 lg:rounded-radius-5 bg-chip-bg-primary flex items-center justify-center">
              <img src={imgLock} alt="" className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 brightness-0 invert opacity-60" />
            </div>
          )}
        </div>
      </div>

      {/* Restricted access overlay, hover (desktop) + state (touch) */}
      {card.cta === 'locked' && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-5 bg-bg-glass-heavy backdrop-blur-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto p-6"
          style={{ opacity: showRestricted ? 1 : undefined, pointerEvents: showRestricted ? 'auto' : undefined }}
        >
          <img src={imgLockLg} alt="" width={80} height={80} className="brightness-0 invert" />
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-h3 font-semibold text-white leading-snug">{t.restricted}</p>
            <p className="text-copy-m font-normal text-fg-on-dark-secondary leading-relaxed whitespace-pre-line">{t.restrictedBody}</p>
          </div>
          <a
            href={`mailto:d@AtelierDigital.co.uk?subject=${encodeURIComponent(card.mailSubject)}`}
            onClick={(e) => e.stopPropagation()}
            data-spring
            className="mt-2 px-5 py-2 sm:px-6 sm:py-2 bg-cta-600 border border-accent-border rounded-full text-fg-on-accent-opacity-95 font-medium text-label-s leading-[1.2] hover:bg-cta-700 transition-colors"
          >
            {t.restrictedCta}
          </a>
        </div>
      )}
    </>
  );

  const liClass = 'relative shrink-0 w-[300px] sm:w-[360px] lg:w-[384px] h-[420px] sm:h-[404px] lg:h-[480px] rounded-radius-7 sm:rounded-radius-8 overflow-hidden group snap-center motion-safe:hover:scale-[1.03] motion-safe:transition-transform duration-200 cursor-pointer bg-bg-page';

  if (card.cta === 'go') {
    return (
      <li data-spring-desktop className="group/card relative shrink-0 w-[300px] sm:w-[360px] lg:w-[384px] h-[420px] sm:h-[404px] lg:h-[480px] snap-center motion-safe:hover:scale-[1.03] motion-safe:transition-transform duration-200 cursor-pointer">
        {/* Inner wrapper carries overflow-hidden so the spring scale on the li isn't clipped */}
        <div className="absolute inset-0 rounded-radius-7 sm:rounded-radius-8 overflow-hidden group bg-bg-page">
          {inner}
        </div>
        <Link to={card.href} className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white rounded-radius-7 sm:rounded-radius-8" aria-label={card.title} />
      </li>
    );
  }

  const handleCardClick = () => {
    if (window.matchMedia('(min-width: 640px)').matches) {
      window.location.href = `mailto:d@AtelierDigital.co.uk?subject=${encodeURIComponent(card.mailSubject)}`;
    } else {
      setShowRestricted(v => !v);
    }
  };

  return (
    <li
      data-spring-desktop
      className={liClass}
      onClick={handleCardClick}
    >
      {inner}
    </li>
  );
}

// Section
function CaseStudies({ lang, lgAlignWidth, smAlignWidth }) {
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
      if (lgAlignWidth !== undefined) return `${Math.max(24, (vw - lgAlignWidth) / 2)}px`;
      const allThreeW = 3 * LG_CARD + 2 * LG_GAP;
      if (vw >= allThreeW + 48) return `${(vw - allThreeW) / 2}px`;
      return `${Math.max(24, (vw - LG_CARD) / 2)}px`;
    }
    if (window.matchMedia('(min-width: 640px)').matches)
      return smAlignWidth !== undefined ? `${Math.max(24, (vw - smAlignWidth) / 2)}px` : '24px';
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
        <h2 id="cs-heading" className="text-h2 font-bold leading-tight text-fg-primary mb-8">
          {t.heading}
        </h2>
      </div>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {t.cards[activeIndex].title}
      </div>

      <ul
        ref={trackRef}
        onScroll={handleScroll}
        className="relative flex gap-4 sm:gap-6 lg:gap-8 snap-x snap-mandatory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg-primary"
        style={{ overflowX: 'auto', overflowY: 'visible', scrollbarWidth: 'none', paddingLeft: carouselPl, paddingRight: carouselPl, paddingTop: '28px', paddingBottom: '52px', touchAction: 'pan-x pan-y' }}
        aria-label={t.heading}
      >
        {cards.map((card, i) => <CsCard key={i} card={card} t={t} />)}
      </ul>

      {/* Nav, mobile/tablet only */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center mt-4 sm:mt-5 px-6">
        <div />
        <div className="flex items-center">
          {cards.map((_, i) => {
            const win = Math.min(5, cards.length); const start = Math.min(Math.max(0, activeIndex - 2), cards.length - win); const inWindow = i >= start && i < start + win; const isEdge = inWindow && ((i === start && start > 0) || (i === start + win - 1 && start + win < cards.length));
            return (
              <button key={i} tabIndex={inWindow ? 0 : -1} onClick={() => scrollToCard(i)} aria-label={`Go to card ${i + 1}`} aria-current={i === activeIndex ? 'true' : undefined} className={`group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg-primary rounded-full motion-safe:transition-all motion-safe:duration-200 ${inWindow ? 'p-2' : 'w-0 overflow-hidden p-0'}`}>
                <span className={`block rounded-full motion-safe:transition-all motion-safe:duration-200 ${i === activeIndex ? 'w-4 h-2 bg-fg-dot-active' : isEdge ? 'w-1.5 h-1.5 bg-fg-dot-edge' : 'w-2 h-2 bg-fg-dot-rest group-hover:bg-fg-dot-hover'}`} />
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2 sm:gap-3 justify-self-end">
          <button
            data-spring
            onClick={() => scrollToCard(Math.max(0, activeIndex - getStep()))}
            disabled={activeIndex === 0}
            aria-label={t.navPrev}
            className={navBtnClass}
          >
            <img src={imgChevronLeft} alt="" width={20} height={20} className={chevL} />
          </button>
          <button
            data-spring
            onClick={() => scrollToCard(Math.min(cards.length - 1, activeIndex + getStep()))}
            disabled={activeIndex === cards.length - 1}
            aria-label={t.navNext}
            className={navBtnClass}
          >
            <img src={imgChevronRight} alt="" width={20} height={20} className={chevR} />
          </button>
        </div>
      </div>

    </section>
  );
}

export default CaseStudies;
