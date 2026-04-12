import { useState, useEffect, useRef } from 'react';
import imgChevronLeft  from '../assets/icons/icon-chevron-left.svg';
import imgChevronRight from '../assets/icons/icon-chevron-right.svg';
import imgClose        from '../assets/icons/icon-close-sm.svg';

// Carousel (big) logos
import imgGovUkLight  from '../assets/logos/clients/logo-uk-government-light.webp';
import imgGovUkDark   from '../assets/logos/clients/logo-uk-government-dark.webp';
import imgLgfLight      from '../assets/logos/clients/logo-lgf-light.webp';
import imgLgfDark       from '../assets/logos/clients/logo-lgf-dark.webp';
import imgLgfSmallLight from '../assets/logos/clients/logo-lgf-light-small.webp';
import imgLgfSmallDark  from '../assets/logos/clients/logo-lgf-dark-small.webp';
import imgDstlLight   from '../assets/logos/clients/logo-dstl-light.webp';
import imgDstlDark    from '../assets/logos/clients/logo-dstl-dark.webp';
import imgJlrLight    from '../assets/logos/clients/logo-jlr-light.webp';
import imgJlrDark     from '../assets/logos/clients/logo-jlr-dark.webp';
import imgNokia       from '../assets/logos/clients/logo-nokia.webp';
import imgPifLight    from '../assets/logos/clients/logo-pif-light.webp';
import imgPifDark     from '../assets/logos/clients/logo-pif-dark.webp';
import imgEtisalat    from '../assets/logos/clients/logo-etisalat.webp';
import imgCern        from '../assets/logos/clients/logo-cern.webp';
import imgEdinLight   from '../assets/logos/clients/logo-university-of-edinburgh-light.webp';
import imgEdinDark    from '../assets/logos/clients/logo-university-of-edinburgh-dark.webp';
import imgIbm         from '../assets/logos/clients/logo-ibm.webp';
import imgUke         from '../assets/logos/clients/logo-uke.webp';

// Modal (small) logos
import imgGovUkSmallLight  from '../assets/logos/clients/logo-uk-government-light-small.webp';
import imgGovUkSmallDark   from '../assets/logos/clients/logo-uk-government-dark-small.webp';
import imgDstlSmallLight   from '../assets/logos/clients/logo-dstl-light-small.webp';
import imgDstlSmallDark    from '../assets/logos/clients/logo-dstl-dark-small.webp';
import imgJlrSmallLight    from '../assets/logos/clients/logo-jlr-light-small.webp';
import imgJlrSmallDark     from '../assets/logos/clients/logo-jlr-dark-small.webp';
import imgNokiaSmall       from '../assets/logos/clients/logo-nokia-small.webp';
import imgPifSmallLight    from '../assets/logos/clients/logo-pif-light-small.webp';
import imgPifSmallDark     from '../assets/logos/clients/logo-pif-dark-small.webp';
import imgEtisalatSmall    from '../assets/logos/clients/logo-etisalat-small.webp';
import imgCernSmall        from '../assets/logos/clients/logo-cern-small.webp';
import imgEdinSmallLight   from '../assets/logos/clients/logo-university-of-edinburgh-light-small.webp';
import imgEdinSmallDark    from '../assets/logos/clients/logo-university-of-edinburgh-dark-small.webp';
import imgIbmSmall         from '../assets/logos/clients/logo-ibm-small.webp';
import imgUkeSmall         from '../assets/logos/clients/logo-uke-small.webp';

// Logo data
const logos = [
  { logo: imgGovUkLight, logoDark: imgGovUkDark,  logoSmall: imgGovUkSmallLight,  logoSmallDark: imgGovUkSmallDark  },
  { logo: imgLgfLight,   logoDark: imgLgfDark,    logoSmall: imgLgfSmallLight,    logoSmallDark: imgLgfSmallDark    },
  { logo: imgDstlLight,  logoDark: imgDstlDark,   logoSmall: imgDstlSmallLight,   logoSmallDark: imgDstlSmallDark   },
  { logo: imgJlrLight,   logoDark: imgJlrDark,    logoSmall: imgJlrSmallLight,    logoSmallDark: imgJlrSmallDark    },
  { logo: imgNokia,      logoDark: null,           logoSmall: imgNokiaSmall,       logoSmallDark: null               },
  { logo: imgPifLight,   logoDark: imgPifDark,    logoSmall: imgPifSmallLight,    logoSmallDark: imgPifSmallDark    },
  { logo: imgEtisalat,   logoDark: null,           logoSmall: imgEtisalatSmall,    logoSmallDark: null               },
  { logo: imgCern,       logoDark: null,           logoSmall: imgCernSmall,        logoSmallDark: null               },
  { logo: imgEdinLight,  logoDark: imgEdinDark,   logoSmall: imgEdinSmallLight,   logoSmallDark: imgEdinSmallDark   },
  { logo: imgIbm,        logoDark: null,           logoSmall: imgIbmSmall,         logoSmallDark: null               },
  { logo: imgUke,        logoDark: null,           logoSmall: imgUkeSmall,         logoSmallDark: null               },
];

// Translations
const T = {
  en: {
    heading:  'Key collaborations',
    close:    'Close',
    navPrev:  'View previous collaborator',
    navNext:  'View next collaborator',
    collaborators: [
      { name: 'Government of the United Kingdom',              description: 'We contributed to improve simulated environments by automating the creation of <strong>human digital twins</strong>.' },
      { name: 'Looking Glass Factory',                         description: 'We delivered <strong>real-time</strong> solutions in terrain mapping, and <strong>medical imaging</strong> via a suite of enterprise apps running on 3D light-field displays.' },
      { name: 'Defence Science and Technology Laboratory',     description: 'A holographic <strong>telexistence system</strong> enabling <strong>remote operations</strong> in hazardous environments.' },
      { name: 'Jaguar Land Rover',                             description: 'We partnered with Jaguar Land Rover to bring holographic innovations that <strong>enhance car safety</strong>.' },
      { name: 'Nokia',                                         description: 'A 5G-powered real-time <strong>3D telepresence</strong> system, featuring 3D capture and light-field displays for lifelike human connections.' },
      { name: 'Public Investment Funds',                       description: 'We engaged investors by revealing a mega construction project through <strong>immersive</strong> AR and VR experiences. (Magic Leap 2, Meta Quest Pro)' },
      { name: 'Etisalat',                                      description: 'A <strong>3D telemedicine</strong> platform showcasing <strong>healthcare innovations</strong> to 100,000+ attendees.' },
      { name: 'European Organization for Nuclear Research',    description: 'We celebrated the Higgs Boson discovery by recreating the collision event in a <strong>digital hologram</strong>.' },
      { name: 'The University of Edinburgh',                   description: 'Together with an anatomy professor, we created a <strong>life-size hologram</strong> to support the teaching of the <strong>human body</strong>.' },
      { name: 'IBM',                                           description: 'We aimed to reshape the future of digital interactions, by teaming up with IBM, to build an <strong>AI-powered</strong> 3D Avatar.' },
      { name: 'University Hospital Hamburg',                   description: 'We supported surgical training with a leading academic hospital by designing a series of 3D <strong>eye surgery animations</strong>.' },
    ],
  },
  fr: {
    heading:  'Collaborations clés',
    close:    'Fermer',
    navPrev:  'Voir le collaborateur précédent',
    navNext:  'Voir le collaborateur suivant',
    collaborators: [
      { name: 'Gouvernement du Royaume-Uni',                        description: 'Nous avons contribué à améliorer des environnements simulés en automatisant la création de <strong>jumeaux numériques humains</strong>.' },
      { name: 'Looking Glass Factory',                              description: 'Une suite d’applis pro pour écrans 3D, offrant des <strong>solutions en temps réel</strong> pour la cartographie et l’imagerie médicale.' },
      { name: 'Laboratoire de science et technologie de défense',   description: 'Un système de <strong>télé-existence holographique</strong> pour des <strong>opérations à distance</strong> dans des environnements dangereux.' },
      { name: 'Jaguar Land Rover',                                  description: 'En collaboration avec Jaguar Land Rover, nous avons développé des innovations pour <strong>renforcer la sécurité des véhicules</strong>. ' },
      { name: 'Nokia',                                              description: 'Un <strong>système de télé-présence</strong> 3D en temps réel, propulsé par la 5G, avec capture 3D et écrans volumétriques pour rapprocher les gens.' },
      { name: "Fonds public d'investissement",                      description: 'Nous avons présenté un méga-projet à des investisseurs via des expériences 3D en <strong>réalité augmentée</strong> (Magic Leap 2) et en <strong>réalité virtuelle</strong>.' },
      { name: 'Etisalat',                                           description: 'Une <strong>plateforme de télé-médecine</strong> 3D présentant des <strong>innovations de santé</strong> lors d’un événement rassemblant plus de 100k participants.' },
      { name: "Organisation européenne pour la recherche nucléaire", description: 'Nous avons rendu hommage à la découverte du boson de Higgs en recréant l’événement de collision dans un <strong>hologramme</strong>.' },
      { name: "Université d'Édimbourg",                             description: 'Avec un professeur d’anatomie, nous avons créé un <strong>hologramme grandeur nature</strong> pour aider l’enseignement du <strong>corps humain</strong>.' },
      { name: 'IBM',                                                description: 'Nous avons tenté d’améliorer le futur des intéractions, avec IBM, en créant un avatar 3D <strong>propulsé par l’IA</strong>.' },
      { name: "Centre hospitalier universitaire d’Hambourg",       description: 'Nous avons soutenu la formation chirurgicale, avec un hôpital universitaire, en concevant une série d’animations 3D de <strong>chirurgies oculaires</strong>.' },
    ],
  },
};

// Nav button styles (same as other carousels)
const navBtnClass      = 'group shrink-0 p-2 sm:p-[10px] lg:p-3 rounded-full bg-btn-nav-bg-rest hover:bg-btn-nav-bg-hover transition-[opacity,background-color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default disabled:pointer-events-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg-primary';
const modalNavBtnClass = 'group shrink-0 p-2 sm:p-[10px] lg:p-3 rounded-full bg-btn-nav-bg-rest hover:bg-btn-nav-bg-hover transition-[opacity,background-color] duration-150 disabled:opacity-[0.15] disabled:cursor-default disabled:pointer-events-none cursor-pointer';
const chevL = 'w-5 h-5 sm:w-[22px] sm:h-[22px] lg:w-6 lg:h-6 brightness-0 group-hover:brightness-100 dark:brightness-100 dark:group-hover:brightness-0 transition-[filter]';
const chevR = 'w-5 h-5 sm:w-[22px] sm:h-[22px] lg:w-6 lg:h-6 group-hover:brightness-0 group-hover:invert dark:brightness-0 dark:invert dark:group-hover:brightness-100 dark:group-hover:invert-0 transition-[filter]';

const LOGO_W = { mobile: 152, sm: 176, lg: 200 };


function Collaborations({ lang, lgAlignWidth, smAlignWidth }) {
  const t = T[lang] ?? T.en;
  const collaborators = t.collaborators.map((c, i) => ({ ...c, ...logos[i] }));

  const trackRef    = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModal, setActiveModal] = useState(null);
  const [contentVisible, setContentVisible] = useState(true);
  const isProgrammaticScroll = useRef(false);
  const programmaticScrollTimer = useRef(null);

  // Carousel padding: centres the first logo on load
  const getCarouselPl = () => {
    if (typeof window === 'undefined') return '1.5rem';
    const vw = window.innerWidth;
    if (window.matchMedia('(min-width: 1024px)').matches)
      return `${Math.max(24, (vw - (lgAlignWidth ?? LOGO_W.lg)) / 2)}px`;
    if (window.matchMedia('(min-width: 640px)').matches)
      return `${Math.max(24, (vw - (smAlignWidth ?? LOGO_W.sm)) / 2)}px`;
    return `${Math.max(16, (vw - LOGO_W.mobile) / 2)}px`;
  };
  const [carouselPl, setCarouselPl] = useState(getCarouselPl);

  useEffect(() => {
    const update = () => setCarouselPl(getCarouselPl());
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

  // Step size per breakpoint
  const getStep = () => {
    if (typeof window === 'undefined') return 1;
    if (window.matchMedia('(min-width: 1024px)').matches) return 3;
    if (window.matchMedia('(min-width: 640px)').matches) return 2;
    return 1;
  };

  // Scroll helpers
  const scrollToIndex = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const item = track.children[index];
    if (!item) return;
    const targetScrollLeft = Math.max(
      0,
      item.offsetLeft - (track.clientWidth - item.offsetWidth) / 2
    );
    isProgrammaticScroll.current = true;
    clearTimeout(programmaticScrollTimer.current);
    track.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
    setActiveIndex(index);
    programmaticScrollTimer.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 600);
  };

  const handleScroll = () => {
    if (isProgrammaticScroll.current) return;
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0, minDist = Infinity;
    Array.from(track.children).forEach((item, i) => {
      if (item.getAttribute('aria-hidden')) return;
      const dist = Math.abs(item.offsetLeft + item.offsetWidth / 2 - center);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  };

  // Modal helpers
  const triggerRef          = useRef(null);
  const closeButtonRef      = useRef(null);
  const modalRef            = useRef(null);
  const modalTrackRef       = useRef(null);
  const modalIndexRef       = useRef(null);
  const modalJustOpenedRef  = useRef(false);
  const modalScrollTimer    = useRef(null);
  const prevActiveModalRef  = useRef(null);

  const openModal = (i, triggerEl) => {
    triggerRef.current = triggerEl;
    modalJustOpenedRef.current = true;
    modalIndexRef.current = i;
    setActiveModal(i);
    scrollToIndex(i);
  };
  const closeModal = (restoreFocus = true) => {
    setActiveModal(null);
    modalIndexRef.current = null;
    if (restoreFocus) triggerRef.current?.focus();
  };
  const navigateModal = (i) => {
    setContentVisible(false);
    setTimeout(() => {
      const track = modalTrackRef.current;
      if (track) track.scrollTo({ left: i * track.clientWidth, behavior: 'instant' });
      modalIndexRef.current = i;
      setActiveModal(i);
      scrollToIndex(i);
      setContentVisible(true);
    }, 150);
  };

  const handleModalScroll = () => {
    const track = modalTrackRef.current;
    if (!track) return;
    clearTimeout(modalScrollTimer.current);
    modalScrollTimer.current = setTimeout(() => {
      const i = Math.round(track.scrollLeft / track.clientWidth);
      if (i !== modalIndexRef.current) {
        modalIndexRef.current = i;
        setActiveModal(i);
        scrollToIndex(i);
        setContentVisible(true);
      }
    }, 80);
  };

  // Scroll modal track to the right slide on open (instant)
  useEffect(() => {
    if (activeModal === null || !modalJustOpenedRef.current) return;
    modalJustOpenedRef.current = false;
    const raf = requestAnimationFrame(() => {
      const track = modalTrackRef.current;
      if (track) track.scrollTo({ left: activeModal * track.clientWidth, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(raf);
  }, [activeModal]); // eslint-disable-line react-hooks/exhaustive-deps

  // Move focus to close button only when modal first opens (null → number)
  useEffect(() => {
    if (activeModal === null) { prevActiveModalRef.current = null; return; }
    if (prevActiveModalRef.current === null) {
      const raf = requestAnimationFrame(() => closeButtonRef.current?.focus());
      return () => cancelAnimationFrame(raf);
    }
    prevActiveModalRef.current = activeModal;
  }, [activeModal]);

  // Hide background content from assistive tech while modal is open
  useEffect(() => {
    if (activeModal === null) return;
    const section = document.getElementById('collaborators');
    if (!section) return;
    const inerted = [];
    let node = section;
    while (node.parentElement && node !== document.body) {
      Array.from(node.parentElement.children).forEach(sibling => {
        if (sibling !== node && !sibling.hasAttribute('inert')) {
          sibling.setAttribute('inert', '');
          inerted.push(sibling);
        }
      });
      node = node.parentElement;
    }
    return () => inerted.forEach(el => el.removeAttribute('inert'));
  }, [activeModal]);

  useEffect(() => {
    if (activeModal === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft')  navigateModal(Math.max(0, modalIndexRef.current - 1));
      if (e.key === 'ArrowRight') navigateModal(Math.min(collaborators.length - 1, modalIndexRef.current + 1));
    };
    const onMouseDown = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) closeModal();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [activeModal]); // eslint-disable-line react-hooks/exhaustive-deps

  // Dismiss modal when user scrolls the section out of view
  useEffect(() => {
    if (activeModal === null) return;
    const section = document.getElementById('collaborators');
    if (!section) return;
    let initialised = false;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!initialised) { initialised = true; return; }
        if (entry.intersectionRatio < 0.3) closeModal(false);
      },
      { threshold: 0.3 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, [activeModal]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      id="collaborators"
      aria-labelledby="collab-heading"
      className="scroll-mt-24 py-16"
    >
      <div {...(activeModal !== null ? { inert: '' } : {})} className="max-w-5xl mx-auto px-6 mb-12 sm:mb-14 lg:mb-16">
        <h2 id="collab-heading" className="text-h2 font-bold leading-tight text-fg-primary">
          {t.heading}
        </h2>
      </div>

      {/* Carousel area: track + nav stacked; modal overlays both */}
      <div className="relative">

        {/* Logo track */}
        <ul
          ref={trackRef}
          onScroll={handleScroll}
          {...(activeModal !== null ? { inert: '', 'aria-hidden': 'true' } : {})}
          className={`relative flex gap-8 snap-x snap-mandatory transition-[opacity,filter] duration-300 ${activeModal !== null ? 'opacity-[0.1] blur-sm' : 'opacity-100 blur-none'}`}
          style={{
            overflowX: 'auto',
            overflowY: 'visible',
            scrollbarWidth: 'none',
            paddingLeft: carouselPl,
            paddingRight: carouselPl,
            paddingTop: '20px',
            paddingBottom: '20px',
            touchAction: 'pan-x pan-y',
          }}
          aria-label={t.heading}
        >
          {collaborators.map((collab, i) => (
            <li key={i} className="shrink-0 snap-center" style={{ scrollSnapStop: 'always' }}>
              <button
                data-spring
                onClick={(e) => openModal(i, e.currentTarget)}
                aria-label={collab.name}
                aria-haspopup="dialog"
                className="w-[152px] h-[152px] sm:w-[176px] sm:h-[176px] lg:w-[200px] lg:h-[200px] flex items-center justify-center cursor-pointer motion-safe:transition-[transform,background-color] duration-200 sm:hover:scale-[1.06] sm:hover:bg-white sm:dark:hover:bg-[#1f1f1f] rounded-radius-7 sm:rounded-radius-7 border border-border-subtle sm:border-0 sm:hover:border sm:hover:border-border-subtle bg-bg-page dark:bg-bg-surface sm:bg-transparent sm:dark:bg-transparent p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg-primary focus-visible:ring-offset-2"
              >
                <>
                  <img src={collab.logo} alt="" className={`w-full h-full object-contain ${collab.logoDark ? 'dark:hidden' : ''}`} />
                  {collab.logoDark && <img src={collab.logoDark} alt="" className="hidden dark:block w-full h-full object-contain" />}
                </>
              </button>
            </li>
          ))}
        </ul>

        {/* Normal nav, below track, reduced gap */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center mt-6 sm:mt-4 px-6 sm:px-28 lg:px-52">
          <div />
          <div className="flex items-center">
            {collaborators.map((_, i) => {
              const win = Math.min(5, collaborators.length); const start = Math.min(Math.max(0, activeIndex - 2), collaborators.length - win); const inWindow = i >= start && i < start + win; const isEdge = inWindow && ((i === start && start > 0) || (i === start + win - 1 && start + win < collaborators.length));
              return (
                <button key={i} tabIndex={inWindow ? 0 : -1} onClick={() => scrollToIndex(i)} aria-label={`Go to collaborator ${i + 1}`} aria-current={i === activeIndex ? 'true' : undefined} className={`group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg-primary rounded-full motion-safe:transition-all motion-safe:duration-200 ${inWindow ? 'p-2' : 'w-0 overflow-hidden p-0'}`}>
                  <span className={`block rounded-full motion-safe:transition-all motion-safe:duration-200 ${i === activeIndex ? 'w-4 h-2 bg-fg-dot-active' : isEdge ? 'w-1.5 h-1.5 bg-[#1f1f1f]/20 dark:bg-[#fafafa]/20' : 'w-2 h-2 bg-[#1f1f1f]/40 dark:bg-[#fafafa]/40 group-hover:bg-[#1f1f1f]/90 dark:group-hover:bg-[#fafafa]/90'}`} />
                </button>
              );
            })}
          </div>
          <div {...(activeModal !== null ? { inert: '' } : {})} className={`flex items-center gap-2 sm:gap-3 lg:gap-4 justify-self-end ${activeModal !== null ? 'invisible' : ''}`}>
            <button
              data-spring
              onClick={() => scrollToIndex(Math.max(0, activeIndex - getStep()))}
              disabled={activeIndex === 0}
              aria-label={t.navPrev}
              className={navBtnClass}
            >
              <img src={imgChevronLeft} alt="" width={20} height={20} className={chevL} />
            </button>
            <button
              data-spring
              onClick={() => scrollToIndex(Math.min(collaborators.length - 1, activeIndex + getStep()))}
              disabled={activeIndex === collaborators.length - 1}
              aria-label={t.navNext}
              className={navBtnClass}
            >
              <img src={imgChevronRight} alt="" width={20} height={20} className={chevR} />
            </button>
          </div>
        </div>

        {/* Modal overlay */}
        {activeModal !== null && (
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={collaborators[activeModal]?.name}
            className="absolute inset-x-0 top-0 h-[240px] sm:h-[192px] lg:h-[214px] flex items-center px-2 sm:px-6 lg:px-8 gap-2 sm:gap-4 lg:gap-6 sm:max-w-3xl lg:max-w-4xl sm:mx-auto"
          >
            <div style={{ animation: 'modal-in 0.25s cubic-bezier(0.22,1,0.36,1) 0.35s both' }}>
              <button
                data-spring
                onClick={() => navigateModal(Math.max(0, activeModal - 1))}
                disabled={activeModal === 0}
                aria-label={t.navPrev}
                className={`${modalNavBtnClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg-primary`}
              >
                <img src={imgChevronLeft} alt="" width={20} height={20} className={chevL} />
              </button>
            </div>

            {/* Card wrapper: shadow + rounded corners, overflow-hidden clips the sliding track */}
            <div
              className="relative flex-1 self-stretch overflow-hidden rounded-radius-8 sm:rounded-radius-10 lg:rounded-radius-12 bg-bg-page dark:bg-bg-surface shadow-m"
              style={{ animation: 'modal-card-in 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}
            >
              {/* Close button — sits above the track */}
              <button
                data-spring
                ref={closeButtonRef}
                onClick={closeModal}
                aria-label={t.close}
                className="group absolute top-3 right-3 lg:top-4 lg:right-4 z-10 flex items-center justify-center p-1.5 sm:p-2 rounded-full bg-btn-nav-bg-rest hover:bg-btn-nav-bg-hover transition-[background-color] duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg-primary"
              >
                <img
                  src={imgClose}
                  alt=""
                  width={16} height={16}
                  className="sm:w-5 sm:h-5 brightness-0 group-hover:invert dark:invert dark:group-hover:brightness-0 dark:group-hover:invert-0 transition-[filter] duration-150"
                />
              </button>

              {/* Horizontal scroll-snap track — one card per collaborator */}
              <div
                ref={modalTrackRef}
                onScroll={handleModalScroll}
                role="group"
                aria-label={collaborators[activeModal]?.name}
                tabIndex={0}
                className="flex h-full"
                style={{ overflowX: 'auto', scrollbarWidth: 'none', scrollSnapType: 'x mandatory', touchAction: 'pan-x' }}
              >
                {collaborators.map((collab, i) => (
                  <div
                    key={i}
                    className="shrink-0 w-full h-full flex flex-col justify-between gap-2 sm:gap-[14px] lg:gap-4 pt-4 sm:pt-7 lg:pt-9 pb-2 sm:pb-3 lg:pb-4 px-4 sm:px-10 lg:px-14"
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    <div className="flex-1 min-h-0 overflow-hidden" style={{ opacity: contentVisible ? 1 : 0, transition: 'opacity 150ms ease' }}>
                      <p className="text-copy-m leading-relaxed lg:leading-loose text-fg-secondary [&_strong]:text-fg-primary pr-7 sm:pr-8">
                        <span dangerouslySetInnerHTML={{ __html: collab.description }} />
                      </p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3" style={{ opacity: contentVisible ? 1 : 0, transition: 'opacity 150ms ease' }}>
                      <>
                        <img src={collab.logoSmall} alt="" className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 object-contain shrink-0 ${collab.logoSmallDark ? 'dark:hidden' : ''}`} />
                        {collab.logoSmallDark && <img src={collab.logoSmallDark} alt="" className="hidden dark:block w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 object-contain shrink-0" />}
                      </>
                      <span className="text-[12px] sm:text-[14px] lg:text-[15px] font-semibold text-fg-primary">
                        {collab.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ animation: 'modal-in 0.25s cubic-bezier(0.22,1,0.36,1) 0.35s both' }}>
              <button
                data-spring
                onClick={() => navigateModal(Math.min(collaborators.length - 1, activeModal + 1))}
                disabled={activeModal === collaborators.length - 1}
                aria-label={t.navNext}
                className={`${modalNavBtnClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg-primary`}
              >
                <img src={imgChevronRight} alt="" width={20} height={20} className={chevR} />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default Collaborations;
