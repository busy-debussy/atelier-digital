import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import imgChevronLeft  from '../assets/icons/icon-chevron-left.svg';
import imgChevronRight from '../assets/icons/icon-chevron-right.svg';
import imgSendLight     from '../assets/contact/action-send-email-light.webp';
import imgSendDark      from '../assets/contact/action-send-email-dark.webp';
import imgDocLight      from '../assets/contact/action-view-document-light.webp';
import imgDocDark       from '../assets/contact/action-view-document-dark.webp';
import imgLinkedInLight from '../assets/contact/qr-linkedin-light.webp';
import imgLinkedInDark  from '../assets/contact/qr-linkedin-dark.webp';
import imgPortrait      from '../assets/photos/portrait.webp';

// ── Styles ────────────────────────────────────────────────────────────────────
const navBtnClass = 'group shrink-0 p-2 sm:p-[10px] lg:p-3 rounded-full bg-white dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer';
const chevL = 'w-5 h-5 sm:w-[22px] sm:h-[22px] lg:w-6 lg:h-6 brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter]';
const chevR = 'w-5 h-5 sm:w-[22px] sm:h-[22px] lg:w-6 lg:h-6 group-enabled:group-hover:brightness-0 group-enabled:group-hover:invert dark:brightness-0 dark:invert dark:group-enabled:group-hover:brightness-100 dark:group-enabled:group-hover:invert-0 transition-[filter]';

// ── Translations ──────────────────────────────────────────────────────────────
const T = {
  en: {
    heading: 'Get in touch',
    navPrev: 'View previous card',
    navNext: 'View next card',
    emailCard: {
      icon: imgSendLight, iconDark: imgSendDark,
      title: 'Hit my inbox',
      description: 'Let’s discuss how we can achieve great things together.',
      buttonLabel: 'Message',
      action: { type: 'email', href: `mailto:d@AtelierDigital.co.uk?subject=${encodeURIComponent('Getting in touch')}` },
    },
    pdfCard: {
      icon: imgPortrait, iconDark: imgPortrait,
      title: 'Paper version',
      description: 'View a print-friendly A4-size version of this résumé.',
      buttonLabel: 'Download PDF',
      action: { type: 'download', href: 'https://drive.google.com/uc?export=download&id=1-xtBf6L3nXJ5b0sQ1vfO8HSO_hN1jBU6' },
    },
    resumeCard: {
      icon: imgPortrait, iconDark: imgPortrait,
      title: 'About me',
      description: 'Learn more about my experience, skills and education.',
      buttonLabel: 'Interactive CV',
      action: { type: 'link', href: '/resume' },
    },
    linkedinCard: {
      icon: imgLinkedInLight, iconDark: imgLinkedInDark,
      title: "Let's connect",
      description: 'Scan the QR code above, or use the button below to view my profile.',
      buttonLabel: 'LinkedIn',
      action: { type: 'linkedin' },
    },
  },
  fr: {
    heading: 'Prenons contact',
    navPrev: 'Voir la carte précédente',
    navNext: 'Voir la carte suivante',
    emailCard: {
      icon: imgSendLight, iconDark: imgSendDark,
      title: 'Échangeons',
      description: "Explorons ce que nous pouvons construire ensemble.",
      buttonLabel: 'Message',
      action: { type: 'email', href: `mailto:d@AtelierDigital.co.uk?subject=${encodeURIComponent('Prise de contact')}` },
    },
    pdfCard: {
      icon: imgPortrait, iconDark: imgPortrait,
      title: 'Version papier',
      description: 'Lire la version A4 imprimable de ce curriculum vitae.',
      buttonLabel: 'Télécharger PDF',
      action: { type: 'download', href: 'https://drive.google.com/uc?export=download&id=1-xtBf6L3nXJ5b0sQ1vfO8HSO_hN1jBU6' },
    },
    resumeCard: {
      icon: imgPortrait, iconDark: imgPortrait,
      title: 'À propos',
      description: "En savoir plus sur mon parcours, savoir-faire et formation.",
      buttonLabel: 'CV intéractif',
      action: { type: 'link', href: '/resume' },
    },
    linkedinCard: {
      icon: imgLinkedInLight, iconDark: imgLinkedInDark,
      title: 'Connectons',
      description: 'Scannez le code QR ci-dessus, ou consultez mon profil via le bouton.',
      buttonLabel: 'LinkedIn',
      action: { type: 'linkedin' },
    },
  },
};

// ── Card button ───────────────────────────────────────────────────────────────
const btnClass = 'block w-full py-3 sm:py-[14px] lg:py-4 rounded-2xl sm:rounded-[20px] lg:rounded-3xl bg-[#0152EC] hover:bg-[#0142cc] text-white font-medium text-[20px] sm:text-[22px] lg:text-[24px] leading-6 sm:leading-7 lg:leading-8 text-center transition-colors border border-[#5289f2] after:absolute after:inset-0 after:content-[\'\'] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0152EC]';

const liHref = () => ['https://www.link','edin.com','/in/','dav','idvi','all','ard'].join('');

function CardButton({ action, label }) {
  if (action.type === 'email')
    return <a tabIndex={0} href={action.href} className={btnClass}>{label}</a>;
  if (action.type === 'download')
    return <a tabIndex={0} href={action.href} download aria-label={`${label} (direct)`} className={btnClass}>{label}</a>;
  if (action.type === 'link')
    return <Link tabIndex={0} to={action.href} className={btnClass}>{label}</Link>;
  if (action.type === 'linkedin')
    return <button onClick={() => window.open(liHref(), '_blank', 'noopener,noreferrer')} className={`${btnClass} cursor-pointer`}>{label}<span className="sr-only">{' (opens in new tab)'}</span></button>;
  return <a tabIndex={0} href={action.href} target="_blank" rel="noopener noreferrer" className={btnClass}>{label}</a>;
}

// ── Single card ───────────────────────────────────────────────────────────────
function ContactCard({ card, glass }) {
  const cardBg = glass
    ? 'backdrop-blur-[16px] bg-white/[0.64] dark:bg-black/[0.64] border border-black/[0.16] dark:border-white/[0.16] shadow-[0px_0px_17.1px_0px_rgba(0,0,0,0.08)]'
    : 'bg-white dark:bg-[#141414]';
  return (
    <li data-spring-desktop className={`relative shrink-0 w-[300px] sm:w-[360px] lg:w-[384px] flex flex-col snap-center rounded-[32px] sm:rounded-[40px] lg:rounded-[48px] ${cardBg} p-8 sm:p-9 lg:p-10 gap-8 sm:gap-9 lg:gap-10 motion-safe:transition-transform duration-200 motion-safe:hover:scale-[1.03] cursor-pointer`}>

      <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">

        <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">
          <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] lg:w-20 lg:h-20 shrink-0 flex items-center justify-center">
            {card.icon && (
              <>
                <img src={card.icon} alt="" className="w-full h-full object-contain dark:hidden" />
                <img src={card.iconDark} alt="" className="w-full h-full object-contain hidden dark:block" />
              </>
            )}
          </div>
          <h3 className="text-[23px] sm:text-[26px] lg:text-[30px] font-bold leading-6 sm:leading-7 lg:leading-10 tracking-[0.12px] text-[#1f1f1f] dark:text-[#f6f6f6]">
            {card.title}
          </h3>
        </div>

        {/* Description — fixed height so all cards are the same height */}
        <div className="h-[84px] sm:h-[96px] lg:h-[120px]">
          <p className="font-normal text-[16px] sm:text-[17px] lg:text-[18px] leading-[30px] sm:leading-[34px] lg:leading-10 text-[#5c5c5c] dark:text-[#adadad]">
            {card.description}
          </p>
        </div>
      </div>

      <CardButton action={card.action} label={card.buttonLabel} />
    </li>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
// variant: 'home' (middle card = link to /resume) | 'resume' (middle card = download PDF)
function Contact({ lang, variant = 'home', noBg = false, lgAlignWidth, smAlignWidth, showDesktopNav = false }) {
  const t = T[lang] ?? T.en;
  const cards = [
    t.emailCard,
    t.linkedinCard,
    variant === 'resume' ? t.pdfCard : t.resumeCard,
  ];

  const trackRef       = useRef(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // lg: 384px card, 32px gap (gap-8); sm: 360px card; mobile: 300px card
  const LG_CARD = 384, LG_GAP = 32;

  const getCarouselPl = () => {
    if (typeof window === 'undefined') return '1.5rem';
    const vw = window.innerWidth;
    if (window.matchMedia('(min-width: 1024px)').matches) {
      if (lgAlignWidth !== undefined) return `${Math.max(24, (vw - lgAlignWidth) / 2)}px`;
      const allThreeW = 3 * LG_CARD + 2 * LG_GAP;
      // If all 3 cards fit, centre the group; otherwise centre one card
      if (vw >= allThreeW + 48) return `${(vw - allThreeW) / 2}px`;
      return `${Math.max(24, (vw - LG_CARD) / 2)}px`;
    }
    if (window.matchMedia('(min-width: 640px)').matches)
      return smAlignWidth !== undefined ? `${Math.max(24, (vw - smAlignWidth) / 2)}px` : '24px';
    return `${Math.max(16, (vw - 300) / 2)}px`;
  };
  const [carouselPl, setCarouselPl] = useState(getCarouselPl);

  // Update padding on resize / breakpoint change
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

  // Tablet: jump over already-visible cards; mobile: one card at a time
  const getStep = () =>
    window.matchMedia('(min-width: 640px)').matches ? cards.length - 1 : 1;

  // After carouselPl settles in the DOM: re-snap active card
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
    <section id="contact" aria-labelledby="contact-heading" className={`py-16 scroll-mt-24 ${noBg ? '' : 'bg-[#f6f6f6] dark:bg-[#1f1f1f]'}`}>

      <div className="max-w-5xl mx-auto px-6">
        <h2 id="contact-heading" className="text-[24px] sm:text-[28px] lg:text-[30px] font-bold leading-tight text-[#1f1f1f] dark:text-[#f6f6f6] mb-8">
          {t.heading}
        </h2>
      </div>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {cards[activeIndex].title}
      </div>

      {/* paddingRight omitted — Chrome flex overflow-x bug; trailing spacer used instead */}
      <ul
        ref={trackRef}
        onScroll={handleScroll}
        onFocus={(e) => {
          const items = Array.from(trackRef.current?.children ?? []).filter(c => !c.getAttribute('aria-hidden'));
          const idx = items.findIndex(c => c.contains(e.target));
          if (idx >= 0) scrollToCard(idx);
        }}
        className="relative flex gap-4 sm:gap-6 lg:gap-8 snap-x snap-mandatory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]"
        style={{ overflowX: 'auto', overflowY: 'visible', scrollbarWidth: 'none', paddingLeft: carouselPl, paddingRight: carouselPl, paddingTop: '28px', paddingBottom: '28px', touchAction: 'pan-x pan-y' }}
        aria-label={t.heading}
      >
        {cards.map((card, i) => <ContactCard key={i} card={card} glass={noBg} />)}
      </ul>

      {/* Nav — mobile/tablet only; desktop never needs it */}
      <div className={`${showDesktopNav ? '' : 'lg:hidden '}grid grid-cols-[1fr_auto_1fr] items-center mt-4 sm:mt-5 px-6`}>
        <div />
        <div className="flex items-center">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              aria-label={`Go to card ${i + 1}`}
              aria-current={i === activeIndex ? 'true' : undefined}
              className="group cursor-pointer p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6] rounded-full motion-safe:transition-all motion-safe:duration-200"
            >
              <span className={`block rounded-full motion-safe:transition-all motion-safe:duration-200 ${i === activeIndex ? 'w-4 h-2 bg-[#1f1f1f] dark:bg-[#f6f6f6]' : 'w-2 h-2 bg-[#1f1f1f]/40 dark:bg-[#f6f6f6]/40 group-hover:bg-[#1f1f1f]/60 dark:group-hover:bg-[#f6f6f6]/60'}`} />
            </button>
          ))}
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

export default Contact;
