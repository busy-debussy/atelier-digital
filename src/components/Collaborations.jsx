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
      { name: 'Government of the United Kingdom',              description: 'We contributed to improve simulated environments by automating the creation of <b>human digital twins</b>.' },
      { name: 'Looking Glass Factory',                         description: 'We delivered <b>real-time</b> solutions in terrain mapping, and <b>medical imaging</> via a suite of enterprise apps running on 3D light-field displays.' },
      { name: 'Defence Science and Technology Laboratory',     description: 'A holographic <b>telexistence system</b> enabling <b>remote operations</b> in hazardous environments.' },
      { name: 'Jaguar Land Rover',                             description: 'We partnered with Jaguar Land Rover to bring holographic innovations that <b>enhance car safety</b>.' },
      { name: 'Nokia',                                         description: 'A 5G-powered real-time <b>3D telepresence</b> system, featuring 3D capture and light-field displays for lifelike human connections.' },
      { name: 'Public Investment Funds',                       description: 'We engaged investors by revealing a mega construction project through <b>immersive</b> AR and VR experiences. (Magic Leap 2, Meta Quest Pro)' },
      { name: 'Etisalat',                                      description: 'A <b>3D telemedicine</b> platform showcasing <b>healthcare innovations</b> to 100,000+ attendees.' },
      { name: 'European Organization for Nuclear Research',    description: 'We celebrated the Higgs Boson discovery by recreating the collision event in a <b>digital hologram</b>.' },
      { name: 'The University of Edinburgh',                   description: 'Together with an anatomy professor, we created a <b>life-size hologram</b> to support the teaching of the <b>human body</b>.' },
      { name: 'IBM',                                           description: 'We aimed to reshape the future of digital interactions, by teaming up with IBM, to build an <b>AI-powered</b> 3D Avatar.' },
      { name: 'University Hospital Hamburg',                   description: 'We supported surgical training with a leading academic hospital by designing a series of 3D <b>eye surgery animations</b>.' },
    ],
  },
  fr: {
    heading:  'Collaborations clés',
    close:    'Fermer',
    navPrev:  'Voir le collaborateur précédent',
    navNext:  'Voir le collaborateur suivant',
    collaborators: [
      { name: 'Gouvernement du Royaume-Uni',                        description: 'Nous avons contribué à améliorer des environnements simulés en automatisant la création de <b>jumeaux numériques humains</b>.' },
      { name: 'Looking Glass Factory',                              description: 'Une suite d’applis pro pour écrans 3D, offrant des <b>solutions en temps réel</b> pour la cartographie et l’imagerie médicale.' },
      { name: 'Laboratoire de science et technologie de défense',   description: 'Un système de <b>téléexistence holographique</b> pour des <b>opérations à distance</b> dans des environnements dangereux.' },
      { name: 'Jaguar Land Rover',                                  description: 'En collaboration avec Jaguar Land Rover, nous avons développé des innovations pour <b>renforcer la sécurité des véhicules</b>. ' },
      { name: 'Nokia',                                              description: 'Un <b>système de téléprésence</b> 3D en temps réel, propulsé par la 5G, avec capture 3D et écrans volumétriques pour rapprocher les gens.' },
      { name: "Fonds public d'investissement",                      description: 'Nous avons présenté un méga-projet à des investisseurs via des expériences 3D en <b>réalité augmentée</b> (Magic Leap 2) et en <b>réalité virtuelle</b>.' },
      { name: 'Etisalat',                                           description: 'Une <b>plateforme de télémédecine</b> 3D présentant des <b>innovations de santé</b> lors d’un événement rassemblant plus de 100 000 participants.' },
      { name: "Organisation européenne pour la recherche nucléaire", description: 'Nous avons rendu hommage à la découverte du boson de Higgs en recréant l’événement de collision dans un <b>hologramme</b>.' },
      { name: "Université d'Édimbourg",                             description: 'Avec un professeur d’anatomie, nous avons créé un <b>hologramme grandeur nature</b> pour aider l’enseignement du <b>corps humain</b>.' },
      { name: 'IBM',                                                description: 'Nous avons tenté d’améliorer le futur des intéractions, avec IBM, en créant un avatar 3D <b>propulsé par l’IA</b>.' },
      { name: "Centre hospitalier universitaire de Hambourg",       description: 'Nous avons soutenu la formation chirurgicale, avec un hôpital universitaire, en concevant une série d’animations 3D de <b>chirurgies oculaires</b>.' },
    ],
  },
};

// Nav button styles (same as other carousels)
const navBtnClass      = 'group shrink-0 p-2 sm:p-[10px] lg:p-3 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color,color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer enabled:active:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]';
const modalNavBtnClass = 'group shrink-0 p-2 sm:p-[10px] lg:p-3 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color,color] duration-150 disabled:opacity-[0.15] disabled:cursor-default enabled:cursor-pointer enabled:active:opacity-70';
const chevL = 'w-5 h-5 sm:w-[22px] sm:h-[22px] lg:w-6 lg:h-6 brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter]';
const chevR = 'w-5 h-5 sm:w-[22px] sm:h-[22px] lg:w-6 lg:h-6 group-enabled:group-hover:brightness-0 group-enabled:group-hover:invert dark:brightness-0 dark:invert dark:group-enabled:group-hover:brightness-100 dark:group-enabled:group-hover:invert-0 transition-[filter]';

const LOGO_W = { mobile: 152, sm: 176, lg: 200 };


function Collaborations({ lang, lgAlignWidth, smAlignWidth }) {
  const t = T[lang] ?? T.en;
  const collaborators = t.collaborators.map((c, i) => ({ ...c, ...logos[i] }));

  const trackRef    = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModal, setActiveModal] = useState(null);

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
    track.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
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
    setActiveIndex(closest);
  };

  // Modal helpers
  const triggerRef     = useRef(null);
  const closeButtonRef = useRef(null);

  const openModal  = (i, triggerEl) => { triggerRef.current = triggerEl; setActiveModal(i); scrollToIndex(i); };
  const closeModal = () => { setActiveModal(null); triggerRef.current?.focus(); };
  const navigateModal = (i) => { setActiveModal(i); scrollToIndex(i); };

  const modalRef     = useRef(null);
  const touchStartX  = useRef(null);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 50) return;
    if (dx < 0 && activeModal < collaborators.length - 1) navigateModal(activeModal + 1);
    if (dx > 0 && activeModal > 0) navigateModal(activeModal - 1);
  };

  // Move focus to close button when modal opens
  useEffect(() => {
    if (activeModal === null) return;
    const raf = requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => cancelAnimationFrame(raf);
  }, [activeModal]);

  useEffect(() => {
    if (activeModal === null) return;
    const onKey      = (e) => { if (e.key === 'Escape') closeModal(); };
    const onMouseDown = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) closeModal();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [activeModal]);

  const activeCollab = activeModal !== null ? collaborators[activeModal] : null;

  return (
    <section
      id="collaborators"
      aria-labelledby="collab-heading"
      className="scroll-mt-24 py-16"
    >
      <div className="max-w-5xl mx-auto px-6 mb-12 sm:mb-14 lg:mb-16">
        <h2 id="collab-heading" className="text-[24px] sm:text-[28px] lg:text-[30px] font-bold leading-tight text-[#1f1f1f] dark:text-[#f6f6f6]">
          {t.heading}
        </h2>
      </div>

      {/* Carousel area: track + nav stacked; modal overlays both */}
      <div className="relative">

        {/* Logo track */}
        <ul
          ref={trackRef}
          onScroll={handleScroll}
          className={`relative flex gap-8 snap-x snap-mandatory transition-[opacity,filter] duration-300 ${activeModal !== null ? 'opacity-[0.1] blur-sm' : 'opacity-100 blur-none'}`}
          style={{
            overflowX: 'auto',
            overflowY: 'visible',
            scrollbarWidth: 'none',
            paddingLeft: carouselPl,
            touchAction: 'pan-x pan-y',
          }}
          aria-label={t.heading}
        >
          {collaborators.map((collab, i) => (
            <li key={i} className="shrink-0 snap-center" style={{ scrollSnapStop: 'always' }}>
              <button
                onClick={(e) => openModal(i, e.currentTarget)}
                aria-label={collab.name}
                aria-haspopup="dialog"
                className="w-[152px] h-[152px] sm:w-[176px] sm:h-[176px] lg:w-[200px] lg:h-[200px] flex items-center justify-center cursor-pointer motion-safe:transition-transform duration-200 sm:hover:scale-[1.06] active:scale-[0.97] rounded-[28px] sm:rounded-none border border-[#e0e0e0] dark:border-[#2a2a2a] sm:border-0 bg-white dark:bg-[#1f1f1f] sm:bg-transparent sm:dark:bg-transparent p-3 sm:p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6] focus-visible:ring-offset-2"
              >
                {collab.logo ? (
                  <>
                    <img src={collab.logo} alt="" className={`w-full h-full object-contain ${collab.logoDark ? 'dark:hidden' : ''}`} />
                    {collab.logoDark && <img src={collab.logoDark} alt="" className="hidden dark:block w-full h-full object-contain" />}
                  </>
                ) : (
                  <span className="text-[13px] sm:text-[14px] lg:text-[15px] font-semibold text-[#5c5c5c] dark:text-[#adadad] text-center px-2 leading-snug">
                    {collab.name}
                  </span>
                )}
              </button>
            </li>
          ))}
          {/* Trailing spacer so the last logo can reach its centred snap position */}
          <li role="none" aria-hidden="true"><div className="shrink-0" style={{ width: carouselPl }} /></li>
        </ul>

        {/* Normal nav, below track, reduced gap */}
        <div className={`flex items-center justify-end gap-2 sm:gap-3 lg:gap-4 mt-6 sm:mt-4 pr-6 sm:pr-28 lg:pr-52 ${activeModal !== null ? 'invisible' : ''}`}>
          <button
            onClick={() => scrollToIndex(Math.max(0, activeIndex - getStep()))}
            disabled={activeIndex === 0}
            aria-label={t.navPrev}
            className={navBtnClass}
          >
            <img src={imgChevronLeft} alt="" width={20} height={20} className={chevL} />
          </button>
          <button
            onClick={() => scrollToIndex(Math.min(collaborators.length - 1, activeIndex + getStep()))}
            disabled={activeIndex === collaborators.length - 1}
            aria-label={t.navNext}
            className={navBtnClass}
          >
            <img src={imgChevronRight} alt="" width={20} height={20} className={chevR} />
          </button>
        </div>

        {/* Modal overlay */}
        {activeModal !== null && activeCollab && (
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={activeCollab.name}
            className="absolute inset-x-0 top-0 h-[152px] sm:h-[176px] lg:h-[200px] flex items-center px-4 sm:px-6 lg:px-8 gap-3 sm:gap-4 lg:gap-6 sm:max-w-3xl lg:max-w-4xl sm:mx-auto"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >

            <div style={{ animation: 'modal-in 0.25s cubic-bezier(0.22,1,0.36,1) 0.35s both' }}>
              <button
                onClick={() => navigateModal(Math.max(0, activeModal - 1))}
                disabled={activeModal === 0}
                aria-label={t.navPrev}
                className={`${modalNavBtnClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]`}
              >
                <img src={imgChevronLeft} alt="" width={20} height={20} className={chevL} />
              </button>
            </div>

            <div className="relative flex-1 flex flex-col gap-3 sm:gap-[14px] lg:gap-4 bg-white dark:bg-[#2a2a2a] rounded-[32px] sm:rounded-[40px] lg:rounded-[48px] pt-5 sm:pt-7 lg:pt-9 pb-4 sm:pb-6 lg:pb-7 px-4 sm:px-10 lg:px-14 shadow-[0px_18px_20px_0px_rgba(0,0,0,0.06)]" style={{ animation: 'modal-in 0.3s cubic-bezier(0.22,1,0.36,1) both' }}>

              {/* Close button:
                  mobile , always black bg + white icon
                  sm/lg  , no bg idle → circular black bg + white icon on hover */}
              <button
                ref={closeButtonRef}
                onClick={closeModal}
                aria-label={t.close}
                className="group absolute top-3 right-3 sm:top-3 sm:right-3 lg:top-4 lg:right-4 flex items-center justify-center p-1.5 sm:p-2 lg:p-2 rounded-full bg-[#1f1f1f] sm:bg-transparent sm:hover:bg-[#1f1f1f] dark:bg-[#2a2a2a] sm:dark:bg-transparent sm:dark:hover:bg-[#f6f6f6] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]"
              >
                <img
                  src={imgClose}
                  alt=""
                  width={16} height={16}
                  className="sm:w-5 sm:h-5 lg:w-5 lg:h-5 brightness-0 invert sm:brightness-100 sm:invert-0 sm:group-hover:brightness-0 sm:group-hover:invert sm:dark:brightness-0 sm:dark:invert sm:dark:group-hover:brightness-100 sm:dark:group-hover:invert-0 transition-[filter]"
                />
              </button>

              <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[28px] sm:leading-[30px] lg:leading-[34px] text-[#5c5c5c] dark:text-[#adadad] pr-7 sm:pr-8">
                <span dangerouslySetInnerHTML={{ __html: activeCollab.description }} />
              </p>

              <div className="flex items-center gap-2 sm:gap-3">
                {activeCollab.logoSmall ? (
                  <>
                    <img src={activeCollab.logoSmall} alt="" className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 object-contain shrink-0 ${activeCollab.logoSmallDark ? 'dark:hidden' : ''}`} />
                    {activeCollab.logoSmallDark && <img src={activeCollab.logoSmallDark} alt="" className="hidden dark:block w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 object-contain shrink-0" />}
                  </>
                ) : (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-[#f6f6f6] dark:bg-[#2a2a2a] rounded-[8px] sm:rounded-[10px] lg:rounded-[12px] shrink-0 flex items-center justify-center overflow-hidden">
                    <span className="text-[6px] font-bold text-[#5c5c5c] dark:text-[#adadad] text-center leading-tight px-[2px]">{activeCollab.name}</span>
                  </div>
                )}
                <span className="text-[12px] sm:text-[14px] lg:text-[15px] font-semibold text-[#1f1f1f] dark:text-[#f6f6f6]">
                  {activeCollab.name}
                </span>
              </div>
            </div>

            <div style={{ animation: 'modal-in 0.25s cubic-bezier(0.22,1,0.36,1) 0.35s both' }}>
              <button
                onClick={() => navigateModal(Math.min(collaborators.length - 1, activeModal + 1))}
                disabled={activeModal === collaborators.length - 1}
                aria-label={t.navNext}
                className={`${modalNavBtnClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1f1f] dark:focus-visible:ring-[#f6f6f6]`}
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
