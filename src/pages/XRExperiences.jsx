import { useState, useEffect, useLayoutEffect, useRef, useMemo, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { trackEvent } from '../analytics';
import Footer from '../components/Footer';
import WorldMapDots from '../components/WorldMapDots';
import imgArrowRight   from '../assets/icons/icon-arrow-right.svg';
import imgClose        from '../assets/icons/icon-close.svg';
import imgChevronLeft  from '../assets/icons/icon-chevron-left.svg';
import imgChevronRight from '../assets/icons/icon-chevron-right.svg';
import imgChevronUp    from '../assets/icons/icon-chevron-up.svg';
import mipimPhoto from '../assets/photos/photo-MIPIM.webp';
import eventBuildingPhoto from '../assets/photos/photo-event-building.webp';
import eventSpacePhoto from '../assets/photos/photo-event-space.webp';
import eventGroupPhoto from '../assets/photos/photo-event-group.webp';
import eventPresentationPhoto from '../assets/photos/photo-event-building-presentation.webp';
import satelliteSitePhoto    from '../assets/case-study/xr-experience/media/photo-satellite-development-site.webp';
import scaleArRender         from '../assets/case-study/xr-experience/media/render-communicating-scale-ar.webp';
import scaleVrScreenshot     from '../assets/case-study/xr-experience/media/screenshot-communicating-scale-vr.webp';
import tableTopLogo from '../assets/logos/clients/logo-table-top.webp';
import magicLeapPhoto from '../assets/photos/photo-magic-leap-2-glasses.webp';
import magicLeapControllerPhoto from '../assets/photos/photo-magic-leap-2-controller.webp';
import rawXboxKeybinding from '../assets/icons/xbox-key-binding.svg?raw';
import flowInitialLightImg   from '../assets/case-study/xr-experience/media/diagram-ar-flow-initial-light.webp';
import flowInitialDarkImg    from '../assets/case-study/xr-experience/media/diagram-ar-flow-initial-dark.webp';
import flowInitialLightFrImg from '../assets/case-study/xr-experience/media/diagram-ar-flow-initial-light-fr.webp';
import flowInitialDarkFrImg  from '../assets/case-study/xr-experience/media/diagram-ar-flow-initial-dark-fr.webp';
import flowShippedLightImg   from '../assets/case-study/xr-experience/media/diagram-ar-flow-shipped-light.webp';
import flowShippedDarkImg    from '../assets/case-study/xr-experience/media/diagram-ar-flow-shipped-dark.webp';
import flowShippedLightFrImg from '../assets/case-study/xr-experience/media/diagram-ar-flow-shipped-light-fr.webp';
import flowShippedDarkFrImg  from '../assets/case-study/xr-experience/media/diagram-ar-flow-shipped-dark-fr.webp';
import imgToolFigma      from '../assets/logos/tools/logo-figma.webp';
import imgToolBezi       from '../assets/logos/tools/logo-bezi.webp';
import imgToolUnreal     from '../assets/logos/tools/logo-unreal-engine.svg';
import imgToolJira       from '../assets/logos/tools/logo-atlassian-jira.webp';
import imgToolConfluence from '../assets/logos/tools/logo-atlassian-confluence.webp';
import imgToolMiro       from '../assets/logos/tools/logo-miro.webp';
import imgToolUnity      from '../assets/logos/tools/logo-unity.webp';
import imgToolTeams      from '../assets/logos/tools/logo-microsoft-teams.webp';

// ── Accent colour ─────────────────────────────────────────────────────────────
const GOLD        = '#C9A84C'; // dark-mode accent (~7.7:1 on #141414)
const GOLD_DARK   = '#D4B563';
const GOLD_A11Y   = '#7A5C00'; // light-mode text — 6:1 on white, passes WCAG AA

// ── Translations ──────────────────────────────────────────────────────────────
const T = {
  en: {
    skipToMain:  'Skip to main content',
    pageTitle:   'XR Experiences',
    label:       'Extended Reality',
    title:       'An XR system for revealing megaprojects',
    tagline:     'The architecture of engagement',
    stats: [
      { countTo: 6, decimals: 0, prefix: '', suffix: '',        label: 'Experiences' },
      { countTo: 6, decimals: 0, prefix: '', suffix: ' weeks',  label: 'Delivery' },
    ],
    sections: [
      {
        id:      'why',
        eyebrow: 'Context',
        heading: 'Built for immediate impact',
        tile: true,
        body: [
          <>We were commissioned to unveil a large-scale <strong>urban development</strong> located in Riyadh, Saudi Arabia.</>,
          <>Our mission was to give the audience of an event immediate conviction of the project's <strong>scale</strong> and <strong>ambition</strong>.</>,
        ],
      },
      {
        id:      'when-where',
        eyebrow: 'Where',
        navLabel: 'Where',
        heading: 'MIPIM',
        tile: true,
        body: [
          <>Held every year in Cannes, France, the event we supported brings together major players in the real estate industry for <strong>a high-density week</strong>, with visitors moving fast and attention scarce.</>,
        ],
      },
      {
        id:      'who',
        eyebrow: 'Who',
        heading: 'High-stakes audience',
        tile: true,
        body: [
          <>Delegate passes cost about <strong>€3k</strong> per person, with attendance expected to exceed <strong>20,000 delegates</strong> from <strong>90 countries</strong>.</>,
<>We targeted three audience types:</>,
          <ul className="list-none grid grid-cols-1 sm:grid-cols-3 gap-3 text-copy-m font-normal leading-loose text-fg-secondary">
            <li className="rounded-radius-4 border border-black/[0.08] dark:border-white/[0.10] px-3 py-3">
              <span className="font-semibold text-fg-primary">Investors</span>
            </li>
            <li className="rounded-radius-4 border border-black/[0.08] dark:border-white/[0.10] px-3 py-3">
              <span className="font-semibold text-fg-primary">Developers</span>
            </li>
            <li className="rounded-radius-4 border border-black/[0.08] dark:border-white/[0.10] px-3 py-3">
              <span className="font-semibold text-fg-primary">Visionaries</span>
            </li>
          </ul>,
        ],
      },
      {
        id:      'team',
        eyebrow: 'Our team',
        heading: 'Fast moving',
        body: [
          <>I worked as part of a core team of <strong>eight</strong>, spread across <strong>four countries</strong>, delivering the <strong>experiences end-to-end</strong>.</>,
          { type: 'callout', variant: 'outline', label: 'Delivery model', body: <>We worked in <strong>two-week sprints</strong> with <strong>daily UK-aligned stand-ups</strong>, which let us catch blockers early, and make trade-offs quickly.</> },
        ],
        map: true,
        tile: true,
      },
      {
        id:      'role',
        eyebrow: 'My role',
        heading: 'Owning the design',
        tile: true,
        body: [
          <>I joined the project as the sole <strong>UX/UI Designer</strong>, and presented the AR experience live to delegates at the event.</>,
          <>My <strong>responsibilities</strong> included:</>,
          { type: 'roleGrid', groups: [
            { heading: 'Interaction design', items: [
              'Interaction logic across AR, VR, touch, and gamepad',
              'Presenter-led AR flow',
              'Hand gestures',
            ]},
            { heading: 'User experience design', items: [
              'Prioritisation under tight delivery constraints',
              'UX decisions across Magic Leap, iPad, TV, and VR',
            ]},
            { heading: 'User interface design', items: [
              'Consistency across the experiential system',
              'Visual design',
            ]},
          ]},
        ],
      },
      {
        id:      'what',
        eyebrow: 'What',
        heading: 'Experiential system',
        body: [
          <>Instead of one large installation, we built <strong>six complementary experiences</strong> that together formed a single narrative.</>,
        ],
        experiences: [
          {
            number: '01',
            title:  'Film installation',
            tech:   'three LCD walls',
            body:   "A cinematic introduction showcasing the project's vision and scale.",
          },
          {
            number: '02',
            title:  'Interactive map',
            tech:   'Transparent touchscreen',
            body:   "A transparent touchscreen offering a satellite view of the project's geographic context.",
          },
          {
            number: '03',
            title:  'AR Experience',
            tech:   'Magic Leap 2 • Unity',
            body:   'A shared AR experience where visitors could explore the central building layer by layer.',
          },
          {
            number: '04',
            title:  'Companion app',
            tech:   'iPad',
            body:   'A real-time mirrored view of the AR experience, ensuring observers remained engaged.',
          },
          {
            number: '05',
            title:  'VR Experience',
            tech:   'Meta Quest 3 • Unreal',
            body:   'An immersive walkthrough allowing visitors to experience the development at human eye level.',
          },
          {
            number: '06',
            title:  'Digital Twin',
            tech:   'Unreal Engine',
            body:   'A self-guided exploration of the entire development, its districts and the city around it.',
          },
        ],
      },
      {
        id:      'prioritise',
        eyebrow: 'Priorisation',
        navLabel: 'Prioritise',
        heading: 'Rationale',
        body: [
          <>The <strong>AR table</strong> was prioritised as the central experience, based on engagement projections and logistical constraints, so we optimised it for hardware setup and group interaction.</>,
          <>We designed an <strong>AR tracker</strong>, distinct enough from the client's logo to avoid false activations, tracking reliably across <strong>Magic Leap</strong> and <strong>iPad</strong>.</>,
          { type: 'h3', text: 'What didn\'t make it' },
          <><strong>True multiplayer AR</strong> was explored but not pursued. With <strong>only one test unit</strong> and concerns about event network reliability, the risk of failure was too high to resolve at the event.</>,
          { type: 'h3', text: 'What was overdelivered' },
          <>To extend engagement beyond headset users, we introduced an <strong>iPad companion app</strong> that mirrored the AR experience in real-time.</>,
        ],
      },
      {
        id:      'solve',
        eyebrow: 'Solve',
        heading: 'Decisions',
        body: [
          { type: 'h3', text: 'Design constraints', mt: 'mt-4' },
          <>Each experience came with its own <strong>technical and spatial constraints</strong>:</>,
          { type: 'cardCarousel', items: [
            { label: 'AR', device: 'Magic Leap 2', body: "We only had one test unit, so multi-device interaction couldn't be tested until the event itself." },
            { label: 'Companion app', device: 'iPad', body: "The event network was outside our control, yet the app needed to mirror Magic Leap's display in real time." },
            { label: 'Map', device: 'Transparent TV', body: 'Content had to stay legible on a see-through screen. We had no unit to test the build on.' },
            { label: 'VR', device: 'Meta Quest 3', body: 'Inherently single-user and shared by many, the experience needed to be hygiene-friendly.' },
            { label: 'Digital twin', device: 'PC Build', body: 'Displayed on a large TV. The whole experience had to be navigable by gamepad.' },
          ]},
          { type: 'h3', text: 'Scale and clarity' },
          { type: 'scaleCards', items: [
            { sentence: <>In VR, the <strong>Wadis</strong> (dried river valleys) were crafted with bike paths to feel navigable and give a <strong>human-eye-level sense</strong> of the central building's scale.</>, image: scaleVrScreenshot, alt: 'VR build showing the scale of the Wadis' },
            { sentence: <>In AR, several layers revealed what the central building would contain. A separate layer conveyed its scale by showing that <strong>18 Empire State Buildings</strong> could fit inside it.</>, image: scaleArRender, alt: "AR overlay showing the central building's scale" },
          ]},
          { type: 'h3', text: 'Refining the AR flow' },
          <>Initial AR flow allowed users to choose between solo and shared modes, but onboarding steps (app selection, tracking, calibration) introduced <strong>friction</strong> and delayed engagement.</>,
          <>That friction was especially costly given the volume of delegates expected to move through the experience in a single week.</>,
          <>We consolidated this into a single <strong>presenter-led, pre-calibrated experience</strong>, removing setup complexity and standardising the interaction flow to keep each session fast and predictable at scale.</>,
          { type: 'h3', text: 'System decisions' },
          <ul className="list-disc pl-5 flex flex-col gap-1 text-copy-m font-normal leading-loose text-fg-secondary">
            <li><strong>Film installation:</strong> Controlled pacing and spatial cues for group flow</li>
            <li><strong>Interactive map:</strong> Touch navigation kept simple on a transparent screen</li>
            <li><strong>AR table:</strong> Single guided flow with mirrored iPad for observers</li>
            <li><strong>VR:</strong> Screen mirroring enabled shared viewing</li>
            <li><strong>Digital twin:</strong> Gamepad navigation for exploring on a TV</li>
          </ul>,
        ],
      },
      {
        id:      'measure',
        eyebrow: 'Impact',
        navLabel: 'Impact',
        heading: 'Results',
        body: [
          <>Presenter-led AR sessions consistently retained participants for full <strong>10-minute experiences</strong>. The pavilion operated at <strong>full capacity</strong> throughout the event, leading to an extended <strong>multi-year partnership</strong>.</>,
          { type: 'callout', label: 'Live deployment', body: <>Working on-site allowed direct observation of participant behaviour, and <strong>technical adjustments</strong> from installation day, then through the <strong>first few days</strong>, to improve how the experiences worked.</> },
        ],
      },
    ],
    toolsLabel: 'Tools Used',
    toolCategories: [
      {
        label: 'Design',
        tools: [
          { name: 'Figma',  icon: imgToolFigma },
          { name: 'Bezi',   icon: imgToolBezi },
        ],
      },
      {
        label: 'Development',
        tools: [
          { name: 'Unity',         icon: imgToolUnity, contain: 'w-[65%] h-[65%]' },
          { name: 'Unreal Engine', icon: imgToolUnreal, darkInvert: true, circle: true },
        ],
      },
      {
        label: 'Project Management',
        tools: [
          { name: 'Jira',             icon: imgToolJira },
          { name: 'Confluence',       icon: imgToolConfluence },
          { name: 'Miro',             icon: imgToolMiro },
          { name: 'Microsoft Teams',  icon: imgToolTeams, zoom: 1.5 },
        ],
      },
    ],
    backLabel: 'Back to case studies',
    digitalTwinCta: 'Digital Twin',
    placeholderAsset: 'Asset — coming soon',
    flowLabels: {
      initial: 'Initial flow for the shared AR experience',
      initialAria: 'Initial flow for the shared AR experience — friction points highlighted in red',
      shipped: 'Shipped flow for the shared AR experience',
      shippedAria: 'Shipped flow for the shared AR experience — presenter actions highlighted in gold',
    },
    captions: {
      xbox:      'Xbox controller keybindings designed for the Digital Twin exploration.',
      magicLeap: 'Magic Leap 2 used for the AR experience.',
      building:  'A two-storey building, built to host the reveal.',
      tracker:   "Fast coordination got the table built and shipped on time.",
      floorPlan: 'Floor plan of the experience space.',
      arSession: 'Leading a shared AR experience.',
      satellite: '19 square km of desert, about to be built.',
      map:       'Interact with the map to explore time zones.',
    },
  },

  fr: {
    skipToMain:  'Aller au contenu principal',
    pageTitle:   'Expériences XR',
    label:       'Réalité étendue',
    title:       'Un système XR pour révéler un mégaprojet',
    tagline:     "L'architecture de l'engagement",
    stats: [
      { countTo: 6, decimals: 0, prefix: '', suffix: '',           label: 'Expériences' },
      { countTo: 6, decimals: 0, prefix: '', suffix: ' semaines',  label: 'Pour livrer' },
    ],
    sections: [
      {
        id:      'why',
        eyebrow: 'Contexte',
        heading: 'Conçu pour un impact immédiat',
        tile: true,
        body: [
          <>Nous avons été chargés de dévoiler un <strong>développement urbain</strong> de grande envergure, situé à Riyad, en Arabie saoudite.</>,
          <>Lors d'un événement, notre mission était de donner au public une conviction immédiate de l'<strong>ampleur</strong> et de l'<strong>ambition</strong> du projet.</>,
        ],
      },
      {
        id:      'when-where',
        eyebrow: 'Où',
        navLabel: 'Où',
        heading: 'MIPIM',
        tile: true,
        body: [
          <>Organisé chaque année à Cannes, l'événement auquel nous avons participé rassemble des acteurs majeurs du secteur immobilier pour <strong>une semaine à haute densité</strong>, où les visiteurs se déplacent rapidement et l'attention est limitée.</>,
        ],
      },
      {
        id:      'who',
        eyebrow: 'Qui',
        heading: 'Un public à enjeux élevés',
        tile: true,
        body: [
          <>Les passes délégués coûtaient environ <strong>3 000 €</strong> par personne, avec une fréquentation attendue de plus de <strong>20 000 délégués</strong> venus de <strong>90 pays</strong>.</>,
          <>Nous avons ciblé trois types de public&nbsp;:</>,
          <ul className="list-none grid grid-cols-1 sm:grid-cols-3 gap-3 text-copy-m font-normal leading-loose text-fg-secondary">
            <li className="rounded-radius-4 border border-black/[0.08] dark:border-white/[0.10] px-3 py-3">
              <span className="font-semibold text-fg-primary">Investisseurs</span>
            </li>
            <li className="rounded-radius-4 border border-black/[0.08] dark:border-white/[0.10] px-3 py-3">
              <span className="font-semibold text-fg-primary">Développeurs</span>
            </li>
            <li className="rounded-radius-4 border border-black/[0.08] dark:border-white/[0.10] px-3 py-3">
              <span className="font-semibold text-fg-primary">Visionnaires</span>
            </li>
          </ul>,
        ],
      },
      {
        id:      'team',
        eyebrow: "L'équipe",
        heading: 'Efficace',
        body: [
          <>J'ai travaillé au sein d'une équipe de <strong>huit</strong> personnes, répartie dans <strong>quatre pays</strong>, pour livrer les <strong>expériences de bout en bout</strong>.</>,
          { type: 'callout', variant: 'outline', label: 'Modèle de travail', body: <>Nous avons travaillé en <strong>sprints de deux semaines</strong> avec des <strong>stand-ups quotidiens alignés sur le Royaume-Uni</strong>, ce qui a permis de détecter les blocages tôt et de trancher rapidement.</> },
        ],
        map: true,
        tile: true,
      },
      {
        id:      'role',
        eyebrow: 'Mon rôle',
        heading: 'Piloter la conception',
        tile: true,
        body: [
          <>J'ai rejoint le projet en tant que le seul <strong>UX/UI Designer</strong>, et j'ai présenté l'expérience AR en direct aux délégués lors de l'événement.</>,
          <>Mes <strong>responsabilités</strong> incluaient&nbsp;:</>,
          { type: 'roleGrid', groups: [
            { heading: "Design d'interaction", items: [
              'Logique d\'interaction sur AR, VR, tactile et manette',
              'Flux AR guidé par un présentateur',
              'Gestes de la main',
            ]},
            { heading: "Design UX", items: [
              'Priorisation sous fortes contraintes de livraison',
              'Décisions UX sur Magic Leap, iPad, TV et VR',
            ]},
            { heading: "Design UI", items: [
              'Cohérence à travers le système expérientiel',
              'Design visuel',
            ]},
          ]},
        ],
      },
      {
        id:      'what',
        eyebrow: 'Quoi',
        heading: 'Système expérientiel',
        body: [
          <>Plutôt qu'une grande installation unique, nous avons produit <strong>six expériences complémentaires</strong> formant un récit unique.</>,
        ],
        experiences: [
          {
            number: '01',
            title:  'Installation AV',
            tech:   'Trois murs-écrans LCD',
            body:   "Une introduction cinématographique présentant la vision et l'envergure du projet.",
          },
          {
            number: '02',
            title:  'Carte interactive',
            tech:   'Écran tactile transparent',
            body:   "Un écran tactile transparent offrant une vue satellite du contexte géographique du développement.",
          },
          {
            number: '03',
            title:  'Expérience AR',
            tech:   'Magic Leap 2 • Unity',
            body:   "Une expérience AR partagée où les visiteurs pouvaient explorer le bâtiment central en détail.",
          },
          {
            number: '04',
            title:  'Appli compagnon',
            tech:   'iPad',
            body:   "Une vue miroir en temps réel de l'expérience AR, garantissant l'engagement des observateurs.",
          },
          {
            number: '05',
            title:  'Expérience VR',
            tech:   'Meta Quest 3 • Unreal',
            body:   "Une visite immersive permettant aux visiteurs de découvrir le projet à hauteur d'homme.",
          },
          {
            number: '06',
            title:  'Digital Twin',
            tech:   'Unreal Engine',
            body:   "Une exploration autonome de l'ensemble du développement et de ses quartiers.",
          },
        ],
      },
      {
        id:      'prioritise',
        eyebrow: 'Priorisation',
        navLabel: 'Prioriser',
        heading: 'Décision sous contraintes',
        body: [
          <>La <strong>table AR</strong> a été priorisée comme expérience centrale, en raison de l'engagement et des contraintes logistiques, nous l'avons donc optimisée pour l'installation matérielle et l'interaction en groupe.</>,
          <>Conception d'un <strong>tracker AR</strong> dérivé du logo, optimisé pour une détection fiable sur <strong>Magic Leap</strong> et <strong>iPad</strong>.</>,
          { type: 'h3', text: "Ce qui n'a pas été retenu" },
          <>La <strong>véritable AR multijoueur</strong> a été explorée mais non retenue. Avec <strong>une seule unité de test</strong> et des doutes sur la fiabilité du réseau de l'événement, le risque d'échec était trop élevé pour être résolu sur place.</>,
          { type: 'h3', text: 'Ce qui a été livré en plus' },
          <>Pour prolonger l'engagement au-delà des utilisateurs avec casque, nous avons introduit une <strong>application compagnon iPad</strong> reproduisant l'expérience AR en temps réel.</>,
        ],
      },
      {
        id:      'solve',
        eyebrow: 'Concevoir',
        heading: 'Décisions',
        body: [
          { type: 'h3', text: 'Contraintes de conception', mt: 'mt-4' },
          <>Chaque expérience avait ses propres <strong>contraintes techniques et spatiales</strong>&nbsp;:</>,
          { type: 'cardCarousel', items: [
            { label: 'AR', device: 'Magic Leap 2', body: "Nous n'avions qu'une seule unité de test, donc l'interaction multi-appareils n'a pu être testée qu'à l'événement lui-même." },
            { label: 'Appli compagnon', device: 'iPad', body: "Le réseau de l'événement échappait à notre contrôle, pourtant l'application devait refléter l'affichage du Magic Leap en temps réel." },
            { label: 'Carte', device: 'TV transparente', body: "Le contenu devait rester lisible sur un écran transparent. Nous n'avions pas d'unité de test disponible." },
            { label: 'VR', device: 'Meta Quest 3', body: 'Intrinsèquement mono-utilisateur et partagé par de nombreuses personnes, l\'expérience devait rester hygiénique.' },
            { label: 'Jumeau numérique', device: 'PC Build', body: 'Affiché sur un grand écran TV. L\'ensemble de l\'expérience devait être navigable à la manette.' },
          ]},
          { type: 'h3', text: 'Échelle et clarté' },
          { type: 'scaleCards', items: [
            { sentence: <>En VR, les <strong>Wadis</strong> (vallées fluviales asséchées) ont été aménagés avec des pistes cyclables pour paraître navigables et donner une <strong>perception de l'échelle à hauteur d'homme</strong> du bâtiment central.</>, image: scaleVrScreenshot, alt: "Version VR montrant l'échelle des Wadis" },
            { sentence: <>En AR, plusieurs calques révélaient ce que contiendrait le bâtiment central. Un calque distinct communiquait son échelle en montrant que <strong>18 Empire State Buildings</strong> pourraient y tenir.</>, image: scaleArRender, alt: "Incrustation AR montrant l'échelle du bâtiment central" },
          ]},
          { type: 'h3', text: 'Affiner le flux AR' },
          <>Le flux AR initial permettait aux utilisateurs de choisir entre les modes solo et partagé, mais les étapes d'onboarding (sélection d'app, tracking, calibration) introduisaient des <strong>points de friction</strong> et retardaient l'engagement.</>,
          <>Cette friction était d'autant plus coûteuse compte tenu du volume de délégués attendus sur une seule semaine.</>,
          <>Nous avons consolidé cela en une <strong>expérience guidée par un présentateur, pré-calibrée</strong>, supprimant la complexité de configuration et standardisant le flux d'interaction.</>,
          { type: 'h3', text: 'Décisions systémiques' },
          <ul className="list-disc pl-5 flex flex-col gap-1 text-copy-m font-normal leading-loose text-fg-secondary">
            <li><strong>Installation AV&nbsp;:</strong> Premier point de contact du parcours, le film donnait le tempo avant que le groupe ne poursuive</li>
            <li><strong>Carte interactive&nbsp;:</strong> Navigation tactile simplifiée sur un écran transparent</li>
            <li><strong>Table AR&nbsp;:</strong> Expérience guidée avec iPad en miroir pour les observateurs</li>
            <li><strong>VR&nbsp;:</strong> Le retour du casque était projeté sur un écran pour une visualisation partagée</li>
            <li><strong>Jumeau numérique&nbsp;:</strong> Navigation à la manette pour explorer sur un grand écran</li>
          </ul>,
        ],
      },
      {
        id:      'measure',
        eyebrow: 'Impact',
        navLabel: 'Impact',
        heading: 'Résultats',
        body: [
          <>Les sessions de réalité augmentée guidées retenaient presque toujours les participants pendant la totalité des <strong>10 minutes</strong> d'expérience. Le pavillon a fonctionné à <strong>pleine capacité</strong> tout au long de l'événement, menant à un <strong>partenariat pluriannuel</strong> avec le client.</>,
          { type: 'callout', label: 'Déploiement en direct', body: <>La présence sur place a permis d'observer directement le comportement des participants et d'apporter des <strong>ajustements techniques</strong> dès l'installation, puis pendant les <strong>premiers jours</strong>, pour améliorer le fonctionnement des expériences.</> },
        ],
      },
    ],
    toolsLabel: 'Outils utilisés',
    toolCategories: [
      {
        label: 'Design',
        tools: [
          { name: 'Figma',  icon: imgToolFigma },
          { name: 'Bezi',   icon: imgToolBezi },
        ],
      },
      {
        label: 'Développement',
        tools: [
          { name: 'Unity',         icon: imgToolUnity, contain: 'w-[65%] h-[65%]' },
          { name: 'Unreal Engine', icon: imgToolUnreal, darkInvert: true, circle: true },
        ],
      },
      {
        label: 'Gestion de projet',
        tools: [
          { name: 'Jira',             icon: imgToolJira },
          { name: 'Confluence',       icon: imgToolConfluence },
          { name: 'Miro',             icon: imgToolMiro },
          { name: 'Microsoft Teams',  icon: imgToolTeams, zoom: 1.5 },
        ],
      },
    ],
    backLabel: "Retour aux études de cas",
    digitalTwinCta: 'Digital Twin',
    placeholderAsset: 'Asset — à venir',
    flowLabels: {
      initial: "Flux initial de l'expérience AR partagée",
      initialAria: "Flux initial de l'expérience AR partagée — points de friction mis en évidence en rouge",
      shipped: "Flux livré de l'expérience AR partagée",
      shippedAria: "Flux livré de l'expérience AR partagée — actions du présentateur mises en évidence en doré",
    },
    captions: {
      xbox:      "Mappings de la manette Xbox pour explorer le jumeau numérique.",
      magicLeap: "Casque et contrôleur Magic Leap 2 utilisés pour l'expérience AR.",
      building:  "Un bâtiment de deux étages, construit pour accueillir le dévoilement.",
      tracker:   "Une coordination rapide a permis de construire la table et de la livrer dans les temps.",
      floorPlan: "Plan de l'espace d'expo avec les installations.",
      arSession: "Animation d'une expérience AR partagée.",
      satellite: "19 km² de désert, sur le point d'être construits.",
      map:       "Interagissez avec la carte pour explorer les fuseaux horaires.",
    },
  },
};

// ── World map dots ────────────────────────────────────────────────────────────


function useCountUp(target, duration, ready) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!ready || !target) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target, duration, ready]);
  return count;
}

function AnimatedStat({ prefix, countTo, suffix, ready }) {
  const value = useCountUp(countTo, 1800, ready);
  return <span>{prefix}{value}{suffix}</span>;
}


// ── Flowchart lightbox ────────────────────────────────────────────────────────
function FlowchartLightbox({ slides, initialIndex, lang, onClose }) {
  const [index, setIndex]       = useState(initialIndex);
  const [zoom, setZoom]         = useState(1);
  const [pan, setPan]           = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const indexRef                = useRef(initialIndex);
  const zoomRef                 = useRef(1);
  const panRef                  = useRef({ x: 0, y: 0 });
  const dialogRef               = useRef(null);
  const closeButtonRef          = useRef(null);
  const returnFocusRef          = useRef(typeof document !== 'undefined' ? document.activeElement : null);

  // Inert background + restore focus on close
  useEffect(() => {
    const dialog = dialogRef.current;
    const hidden = Array.from(document.body.children).filter(el => el !== dialog);
    hidden.forEach(el => el.setAttribute('inert', ''));
    return () => {
      hidden.forEach(el => el.removeAttribute('inert'));
      returnFocusRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    const id = setTimeout(() => closeButtonRef.current?.focus(), 0);
    return () => clearTimeout(id);
  }, []);

  // go also resets zoom/pan so each slide starts fresh
  const goRef = useRef(null);
  goRef.current = (i) => {
    indexRef.current = i; setIndex(i);
    zoomRef.current = 1; panRef.current = { x: 0, y: 0 };
    setZoom(1); setPan({ x: 0, y: 0 });
  };
  const go = (i) => goRef.current(i);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  goRef.current(Math.max(0, indexRef.current - 1));
      if (e.key === 'ArrowRight') goRef.current(Math.min(slides.length - 1, indexRef.current + 1));
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [slides.length, onClose]);

  // Touch: swipe (1-finger, not zoomed) · pan (1-finger, zoomed) · pinch-to-zoom (2-finger)
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;

    let mode = null;
    let swipeStartX = null;
    let pinchStartDist = null, pinchStartZoom = 1;
    let panStartX = 0, panStartY = 0, panStartPanX = 0, panStartPanY = 0;

    const touchDist = (t) => {
      const dx = t[1].clientX - t[0].clientX, dy = t[1].clientY - t[0].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const onStart = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        mode = 'pinch';
        pinchStartDist = touchDist(e.touches);
        pinchStartZoom = zoomRef.current;
      } else if (e.touches.length === 1) {
        if (zoomRef.current > 1) {
          mode = 'pan';
          panStartX = e.touches[0].clientX; panStartY = e.touches[0].clientY;
          panStartPanX = panRef.current.x;  panStartPanY = panRef.current.y;
        } else {
          mode = 'swipe';
          swipeStartX = e.touches[0].clientX;
        }
      }
    };

    const onMove = (e) => {
      if (mode === 'pinch' && e.touches.length === 2) {
        e.preventDefault();
        const newZoom = Math.max(1, Math.min(4, pinchStartZoom * (touchDist(e.touches) / pinchStartDist)));
        zoomRef.current = newZoom;
        if (newZoom === 1) { panRef.current = { x: 0, y: 0 }; setPan({ x: 0, y: 0 }); }
        setZoom(newZoom);
      } else if (mode === 'pan' && e.touches.length === 1) {
        e.preventDefault();
        const newPan = { x: panStartPanX + e.touches[0].clientX - panStartX, y: panStartPanY + e.touches[0].clientY - panStartY };
        panRef.current = newPan; setPan(newPan);
      }
    };

    const onEnd = (e) => {
      if (mode === 'swipe' && swipeStartX !== null) {
        const dx = e.changedTouches[0].clientX - swipeStartX;
        if (Math.abs(dx) >= 40) {
          if (dx < 0) goRef.current(Math.min(slides.length - 1, indexRef.current + 1));
          else        goRef.current(Math.max(0, indexRef.current - 1));
        }
        swipeStartX = null;
      }
      if (e.touches.length < 2) mode = null;
    };

    el.addEventListener('touchstart', onStart, { passive: false });
    el.addEventListener('touchmove',  onMove,  { passive: false });
    el.addEventListener('touchend',   onEnd,   { passive: true });
    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove',  onMove);
      el.removeEventListener('touchend',   onEnd);
    };
  }, [slides.length]);

  // Mouse: scroll-to-zoom · drag-to-pan
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      const newZoom = Math.max(1, Math.min(4, zoomRef.current * factor));
      zoomRef.current = newZoom;
      if (newZoom === 1) { panRef.current = { x: 0, y: 0 }; setPan({ x: 0, y: 0 }); }
      setZoom(newZoom);
    };

    let dragging = false, hasMoved = false;
    let dragStartX = 0, dragStartY = 0, dragStartPanX = 0, dragStartPanY = 0;

    const onMouseDown = (e) => {
      if (zoomRef.current <= 1) return;
      e.preventDefault();
      dragging = true; hasMoved = false;
      dragStartX = e.clientX; dragStartY = e.clientY;
      dragStartPanX = panRef.current.x; dragStartPanY = panRef.current.y;
      setIsDragging(true);
    };

    const onMouseMove = (e) => {
      if (!dragging) return;
      hasMoved = true;
      const newPan = { x: dragStartPanX + e.clientX - dragStartX, y: dragStartPanY + e.clientY - dragStartY };
      panRef.current = newPan; setPan(newPan);
    };

    const onMouseUp = (e) => {
      if (!dragging) return;
      dragging = false;
      setIsDragging(false);
      // Prevent click-to-close if we actually panned
      if (hasMoved) e.stopPropagation();
    };

    el.addEventListener('wheel',     onWheel,     { passive: false });
    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup',   onMouseUp,   { capture: true });

    return () => {
      el.removeEventListener('wheel',     onWheel);
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup',   onMouseUp,   { capture: true });
    };
  }, []);

  const closeLbl = lang === 'fr' ? 'Fermer' : 'Close';
  const prevLbl  = lang === 'fr' ? 'Diagramme précédent' : 'Previous chart';
  const nextLbl  = lang === 'fr' ? 'Diagramme suivant'   : 'Next chart';

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={lang === 'fr' ? 'Diagramme en plein écran' : 'Fullscreen chart'}
      className="fixed inset-0 z-[600] flex items-center justify-center overflow-hidden"
      style={{ animation: 'fade-in 0.2s ease both', background: 'rgba(0,0,0,0.95)', cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      onClick={onClose}
    >
      <div
        className="flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center',
          transition: zoom === 1 && pan.x === 0 && pan.y === 0 ? 'transform 0.2s ease' : 'none',
          willChange: 'transform',
          touchAction: 'none',
        }}
      >
        <img
          src={slides[index].src}
          alt={slides[index].ariaLabel}
          style={{ maxHeight: '80vh', maxWidth: '90vw', width: 'auto', height: 'auto', display: 'block' }}
        />
      </div>

      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-tooltip font-medium text-fg-on-dark-opacity-64 tabular-nums pointer-events-none">
        {index + 1} / {slides.length}
      </span>

      <button
        ref={closeButtonRef}
        onClick={onClose}
        aria-label={closeLbl}
        data-spring
        className="group absolute top-4 right-4 z-10 p-2 rounded-full bg-fg-on-dark-primary hover:bg-black transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightbox-fg-muted"
      >
        <img src={imgClose} alt="" width={20} height={20} className="brightness-0 group-hover:invert" />
      </button>

      <button
        data-spring
        onClick={(e) => { e.stopPropagation(); go(Math.max(0, index - 1)); }}
        disabled={index === 0}
        aria-label={prevLbl}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-lightbox-btn-bg hover:bg-lightbox-btn-bg-hover transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightbox-fg-muted"
      >
        <img src={imgChevronLeft} alt="" width={20} height={20} className="brightness-0 invert" />
      </button>

      <button
        data-spring
        onClick={(e) => { e.stopPropagation(); go(Math.min(slides.length - 1, index + 1)); }}
        disabled={index === slides.length - 1}
        aria-label={nextLbl}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-lightbox-btn-bg hover:bg-lightbox-btn-bg-hover transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightbox-fg-muted"
      >
        <img src={imgChevronRight} alt="" width={20} height={20} className="brightness-0 invert" />
      </button>
    </div>,
    document.body
  );
}

function FlowSection({ isDark, lang, labels }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  // Mobile carousel state (the two flows are a swipe carousel < 640px).
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isProg = useRef(false);
  const scrollToCard = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i];
    if (card) {
      const left = card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
      track.scrollTo({ left, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
    setActiveIndex(i);
    isProg.current = true;
    setTimeout(() => { isProg.current = false; }, 400);
  };
  const handleScroll = () => {
    if (isProg.current) return;
    const track = trackRef.current;
    if (!track) return;
    let closest = 0, min = Infinity;
    Array.from(track.children).forEach((c, i) => {
      const left = c.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
      const d = Math.abs(left - track.scrollLeft);
      if (d < min) { min = d; closest = i; }
    });
    setActiveIndex(closest);
  };

  // Static webp diagrams — light/dark × EN/FR variants.
  const isFr = lang === 'fr';
  const slides = useMemo(() => ([
    { src: isDark ? (isFr ? flowInitialDarkFrImg : flowInitialDarkImg) : (isFr ? flowInitialLightFrImg : flowInitialLightImg), label: labels.initial, ariaLabel: labels.initialAria },
    { src: isDark ? (isFr ? flowShippedDarkFrImg : flowShippedDarkImg) : (isFr ? flowShippedLightFrImg : flowShippedLightImg), label: labels.shipped, ariaLabel: labels.shippedAria },
  ]), [isDark, isFr, labels]);

  const expandLbl = lang === 'fr' ? 'Agrandir le diagramme' : 'Expand chart';

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        {/* Mobile: horizontal swipe carousel (one flow per view). sm+: side by side. */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex gap-4 w-full overflow-x-auto snap-x snap-mandatory sm:overflow-x-visible sm:snap-none"
          style={{ scrollbarWidth: 'none' }}
        >
          {slides.map((slide, i) => (
            <figure key={slide.label} className="flex flex-col gap-2 shrink-0 w-full snap-center sm:w-auto sm:flex-1">
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`${expandLbl}: ${slide.ariaLabel}`}
                className="w-full text-left cursor-zoom-in rounded-radius-4 sm:rounded-radius-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
              >
                <div className="bg-bg-page rounded-radius-4 sm:rounded-radius-5 p-4 w-full overflow-hidden">
                  <img src={slide.src} alt="" className="w-full h-auto" />
                </div>
              </button>
              <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{slide.label}</figcaption>
            </figure>
          ))}
        </div>

        {/* Carousel nav (dots + arrows) — mobile only; sm+ shows both flows side by side. */}
        <div className="sm:hidden grid grid-cols-[1fr_auto_1fr] items-center mt-2">
          <div />
          <div className="flex items-center">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                aria-label={lang === 'fr' ? `Diapositive ${i + 1} sur ${slides.length}` : `Slide ${i + 1} of ${slides.length}`}
                aria-current={i === activeIndex ? 'true' : undefined}
                className="group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg-primary rounded-full motion-safe:transition-all motion-safe:duration-200 p-2"
              >
                <span className={`block rounded-full motion-safe:transition-all motion-safe:duration-200 ${i === activeIndex ? 'w-4 h-2 bg-fg-dot-active' : 'w-2 h-2 bg-fg-dot-rest group-hover:bg-fg-dot-hover'}`} />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 justify-self-end">
            <button
              onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              data-spring
              aria-label={lang === 'fr' ? 'Diapositive précédente' : 'Previous slide'}
              className="group p-2 rounded-full bg-btn-nav-bg-rest-subtle enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
            >
              <img src={imgChevronLeft} alt="" width={20} height={20} className="brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter]" />
            </button>
            <button
              onClick={() => scrollToCard(Math.min(slides.length - 1, activeIndex + 1))}
              disabled={activeIndex === slides.length - 1}
              data-spring
              aria-label={lang === 'fr' ? 'Diapositive suivante' : 'Next slide'}
              className="group p-2 rounded-full bg-btn-nav-bg-rest-subtle enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
            >
              <img src={imgChevronRight} alt="" width={20} height={20} className="group-enabled:group-hover:brightness-0 group-enabled:group-hover:invert dark:brightness-0 dark:invert dark:group-enabled:group-hover:brightness-100 dark:group-enabled:group-hover:invert-0 transition-[filter]" />
            </button>
          </div>
        </div>
      </div>
      {lightboxIndex !== null && (
        <FlowchartLightbox
          slides={slides}
          initialIndex={lightboxIndex}
          lang={lang}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

// ── Shared styles ─────────────────────────────────────────────────────────────
const bodyText = 'text-copy-m font-normal leading-loose text-fg-secondary';

// ── Collapsible sections ──────────────────────────────────────────────────────
// Below 920px (secondary nav hidden) each section's eyebrow + heading become a
// collapse/expand toggle with a chevron, and the body card collapses below —
// matching the Canap & Sales Platform case studies. At ≥920px the secondary nav
// handles navigation, so sections stay expanded with no chevron.
function useSectionCollapse() {
  const [open, setOpen] = useState(true);
  // The body's own open-transition needs `open` to flip a frame after
  // `hidden` clears (see handleToggle below), otherwise un-hiding and
  // starting the grid-rows transition in the same frame can make the
  // browser skip the animation. But the header/chevron aren't ever
  // display:none, so they don't need that delay — `headerOpen` flips
  // synchronously in both directions so the header's own transitions
  // start immediately on click instead of stalling for a frame on open.
  const [headerOpen, setHeaderOpen] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 920px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 920px)');
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  const btnRef = useRef(null);
  const contentRef = useRef(null);
  const gridRef = useRef(null);
  const handleToggle = () => {
    if (open) {
      if (contentRef.current?.contains(document.activeElement)) btnRef.current?.focus();
      setOpen(false);
      setHeaderOpen(false);
      const el = gridRef.current;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setHidden(true);
      } else {
        const onEnd = (e) => {
          if (e.propertyName !== 'grid-template-rows') return;
          el?.removeEventListener('transitionend', onEnd);
          setHidden(true);
        };
        el?.addEventListener('transitionend', onEnd);
      }
    } else {
      setHeaderOpen(true);
      setHidden(false);
      requestAnimationFrame(() => setOpen(true));
    }
  };
  const collapsible = !isDesktop;
  return { collapsible, open, headerOpen, sectionOpen: collapsible ? open : true, hidden, handleToggle, btnRef, contentRef, gridRef };
}

const collapseLabel = (open, title, lang) =>
  open ? (lang === 'fr' ? `Réduire ${title}` : `Collapse ${title}`)
       : (lang === 'fr' ? `Développer ${title}` : `Expand ${title}`);

function SectionChevron({ open }) {
  return (
    <div className="group shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-colors hover:bg-btn-nav-bg-hover">
      <img
        src={imgChevronUp}
        alt=""
        className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-[filter,transform] duration-300 forced-colors:brightness-[unset] forced-colors:invert-0 ${open ? '' : 'rotate-180'} brightness-0 dark:invert group-hover:invert dark:group-hover:brightness-0 dark:group-hover:invert-0`}
      />
    </div>
  );
}

// CollapseBody — wraps the body so it can animate closed on mobile. On desktop
// (not collapsible) the body is rendered untouched (no overflow-hidden) so
// nothing in the section content gets clipped. `className` keeps the body's
// flex-gap whether it's a fragment (desktop) or wrapped (mobile).
function CollapseBody({ id, c, className, children }) {
  const inner = className != null ? <div className={className}>{children}</div> : <>{children}</>;
  if (!c.collapsible) return inner;
  return (
    <div
      ref={c.gridRef}
      id={`${id}-content`}
      style={c.hidden ? { display: 'none' } : undefined}
      className={`grid [overflow-anchor:none] motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-in-out ${c.sectionOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      inert={!c.sectionOpen}
    >
      <div ref={c.contentRef} className="overflow-hidden min-h-0">
        {inner}
      </div>
    </div>
  );
}

// CollapsibleSection — keeps XR's card design: the gold eyebrow + heading stay
// INSIDE the card with the chevron beside them (mobile), and the body collapses
// within the card. On desktop (≥920px) it's the original, always-open card.
function CollapsibleSection({ section, si, isLast, lang, children }) {
  const c = useSectionCollapse();
  const headingId = `${section.id}-heading`;
  const tile = section.tile !== false;
  const bodyGap = tile ? 'flex flex-col gap-6 sm:gap-8' : 'flex flex-col gap-8 sm:gap-10 lg:gap-12';
  // Collapsed on mobile: the eyebrow stands in for the title so the header
  // settles to a single line (matching Digital Twin's collapsed row) instead
  // of stacking eyebrow + heading. The eyebrow row collapses on the same
  // grid-rows timing as the body, and the title crossfades between the full
  // heading and the eyebrow text so nothing snaps.
  const collapsedHeading = c.collapsible && !c.headerOpen;
  const heading = (
    <div className="flex flex-col min-w-0">
      {/* Row 1: the eyebrow — always present, never a separate element that
          disappears. It morphs its own typography (size/weight/colour) in
          place between the small gold label and the big bold title, so it
          visibly becomes the collapsed title instead of crossfading with a
          hidden lookalike. The chevron lives in this row permanently, since
          this is the element that IS the title once collapsed. */}
      <div className={`flex items-center justify-between gap-4 motion-safe:transition-[padding] motion-safe:duration-300 motion-safe:ease-in-out ${collapsedHeading ? 'py-6 sm:py-7 lg:py-8' : 'pb-3'}`}>
        <h2
          id={collapsedHeading ? headingId : undefined}
          className={`flex-1 min-w-0 motion-safe:transition-[font-size,font-weight,color,line-height] motion-safe:duration-300 motion-safe:ease-in-out ${
            collapsedHeading
              ? 'text-h2 font-bold leading-[40px] sm:leading-[48px] lg:leading-[56px] text-fg-primary'
              : 'text-h4 font-semibold leading-[25px] gold-text'
          }`}
        >
          {section.eyebrow}
        </h2>
        {c.collapsible && <SectionChevron open={c.headerOpen} />}
      </div>
      {/* Row 2: the full heading — collapses to zero height (same grid-rows
          technique used for the body) instead of crossfading in place. */}
      <div
        aria-hidden={collapsedHeading}
        className={`grid [overflow-anchor:none] motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-in-out ${collapsedHeading ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'}`}
      >
        <div className="overflow-hidden min-h-0">
          <h2
            id={collapsedHeading ? undefined : headingId}
            className="text-h2 font-bold leading-[40px] sm:leading-[48px] lg:leading-[56px] text-fg-primary"
          >
            {section.headingShort ? (
              <>
                <span className="sm:hidden">{section.headingShort}</span>
                <span className="hidden sm:inline">{section.heading}</span>
              </>
            ) : section.heading}
          </h2>
        </div>
      </div>
    </div>
  );
  // Collapsed spacing mirrors Digital Twin's Section exactly: outer pt-8/pb-2
  // (sm:10/3, lg:12/3) plus the title row's own py-6/7/8 below — two layers,
  // not three, so the tile itself carries no vertical padding while collapsed.
  const pad = collapsedHeading
    ? `${si === 0 ? 'pt-8' : 'pt-8'} ${isLast ? 'pb-16' : 'pb-2'} sm:${si === 0 ? 'pt-10' : 'pt-10'} sm:${isLast ? 'pb-20' : 'pb-3'} lg:${si === 0 ? 'pt-24' : 'pt-12'} lg:${isLast ? 'pb-24' : 'pb-3'}`
    : `${si === 0 ? 'pt-8' : 'pt-0'} ${isLast ? 'pb-16' : 'pb-3'} sm:${si === 0 ? 'pt-10' : 'pt-0'} sm:${isLast ? 'pb-20' : 'pb-5'} lg:${si === 0 ? 'pt-24' : 'pt-0'} lg:${isLast ? 'pb-24' : 'pb-6'}`;
  return (
    <section id={section.id} aria-labelledby={headingId} tabIndex={-1} className={`${pad} motion-safe:transition-[padding] motion-safe:duration-300 motion-safe:ease-in-out scroll-mt-24 focus-visible:outline-none`}>
      <div className={tile ? `${collapsedHeading ? 'bg-bg-surface' : 'bg-bg-page'} motion-safe:transition-[padding,background-color] motion-safe:duration-300 motion-safe:ease-in-out rounded-radius-6 sm:rounded-radius-8 lg:rounded-radius-12 px-6 sm:px-12 lg:px-[60px] ${collapsedHeading ? '' : `pt-6 sm:pt-12 lg:pt-[60px] ${section.id === 'role' ? 'pb-4 sm:pb-6 lg:pb-8' : 'pb-6 sm:pb-12 lg:pb-[60px]'}`} ${bodyGap}` : bodyGap}>
        {c.collapsible ? (
          <button
            ref={c.btnRef}
            onClick={c.handleToggle}
            aria-label={collapseLabel(c.open, section.heading, lang)}
            aria-expanded={c.open}
            aria-controls={`${section.id}-content`}
            className="w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fg-primary"
          >
            {heading}
          </button>
        ) : heading}
        <CollapseBody id={section.id} c={c} className={bodyGap}>
          {children}
        </CollapseBody>
      </div>
    </section>
  );
}

// ── Scroll helper ─────────────────────────────────────────────────────────────
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  el.focus({ preventScroll: true });
};

// ── Tools grid ────────────────────────────────────────────────────────────────
function XRToolIcon({ name, icon, darkInvert = false, circle = false, contain = false, zoom }) {
  const [active, setActive] = useState(false);
  const tooltipId = `xr-tip-${name.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className="relative flex flex-col items-center">
      <div
        id={tooltipId}
        role="tooltip"
        className={`absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10 motion-safe:transition-opacity motion-safe:duration-150 ${active ? 'opacity-100' : 'opacity-0'}`}
      >
        <div data-squircle className="bg-tooltip-bg text-fg-primary-inverse text-tooltip font-light leading-[1.2] px-2 py-[4px] rounded-radius-2 whitespace-nowrap ring-1 ring-tooltip-ring">{name}</div>
      </div>
      <button
        aria-label={name}
        aria-describedby={active ? tooltipId : undefined}
        onMouseEnter={() => { if (!window.matchMedia('(pointer: coarse)').matches) setActive(true); }}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onClick={() => setActive(a => !a)}
        className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0 overflow-hidden bg-btn-nav-bg-rest shadow-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f1f1f] dark:focus-visible:outline-[#fafafa] ${circle ? 'rounded-full' : 'rounded-radius-3'}`}
      >
        {icon
          ? <img src={icon} alt="" className={`${contain ? `${contain} object-contain` : 'w-full h-full object-cover'}${darkInvert ? ' dark:invert' : ''}`} style={zoom ? { transform: `scale(${zoom})` } : undefined} />
          : null
        }
      </button>
    </div>
  );
}

function XRToolsSection({ label, categories }) {
  return (
    <div className="relative sm:w-fit">
      {/* Squircle surface + border drawn as a layer behind the content so the
          icon tooltips (positioned above the top row) aren't clipped by the
          card's squircle clip-path. */}
      <div data-squircle aria-hidden="true" className="absolute inset-0 rounded-radius-6 bg-bg-page border border-feedback-neutral-border pointer-events-none" />
      <div className="relative flex flex-col gap-4 px-5 py-4">
        <h2 className="text-label-s font-semibold leading-[1.4] uppercase tracking-wider text-fg-secondary">{label}</h2>
        <div className="flex flex-wrap items-start gap-x-12 gap-y-6">
          {categories.map(cat => (
            <div key={cat.label} className="flex flex-col gap-3">
              <p className="text-overline-s font-medium leading-[1.4] uppercase tracking-wider text-fg-muted">{cat.label}</p>
              <div className="flex flex-wrap gap-5">
                {cat.tools.map(tool => (
                  <XRToolIcon key={tool.name} {...tool} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Desktop secondary nav ─────────────────────────────────────────────────────
// Frosted floating panel. Positioned by its render-site wrapper as a fixed
// element that floats just left of the centred content (top-[240px], offset
// from page centre) — identical to Canap + Sales Platform. Scroll-gated opacity
// fade lives on the inner blurred panel — NOT an ancestor — so an ancestor
// opacity < 1 never disables the backdrop-blur. It fades in once past the hero
// and out at the last section.
function SecondaryNav({ sections, activeId, onNavigate, visible, lang }) {
  // Collapsible secondary nav. Hovering the right edge highlights it and shows
  // a delayed "Minimise" tooltip; clicking (or dragging left) collapses the nav
  // into a centre-left pill that restores it.
  const [collapsed, setCollapsed] = useState(false);
  const [tipVisible, setTipVisible] = useState(false);
  const timerRef = useRef(null);
  const showTip = () => { clearTimeout(timerRef.current); timerRef.current = setTimeout(() => setTipVisible(true), 500); };
  const hideTip = () => { clearTimeout(timerRef.current); setTipVisible(false); };
  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Drag-left-to-minimise: a leftward drag on the edge past a small threshold
  // collapses the nav (a plain click collapses too, via onClick).
  const dragStartX = useRef(null);
  const onEdgePointerDown = (e) => { dragStartX.current = e.clientX; e.currentTarget.setPointerCapture?.(e.pointerId); };
  const onEdgePointerMove = (e) => {
    if (dragStartX.current == null) return;
    if (e.clientX - dragStartX.current <= -24) { dragStartX.current = null; setCollapsed(true); hideTip(); }
  };
  const onEdgePointerUp = () => { dragStartX.current = null; };

  const minimiseLabel = lang === 'fr' ? 'Réduire' : 'Minimise';
  const expandLabel   = lang === 'fr' ? 'Développer' : 'Expand';

  if (collapsed) {
    return (
      <div className={`fixed left-2 top-1/2 -translate-y-1/2 z-10 transition-opacity duration-180 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button
          type="button"
          onClick={() => { setCollapsed(false); hideTip(); }}
          onMouseEnter={showTip}
          onMouseLeave={hideTip}
          onFocus={showTip}
          onBlur={hideTip}
          aria-label={expandLabel}
          className="flex items-center justify-center w-9 h-9 backdrop-blur-3 bg-nav-bg rounded-radius-4 shadow-xs ring-1 ring-nav-ring text-fg-muted hover:text-fg-primary hover:bg-nav-active-bg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 5h16M4 12h12M4 19h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        {tipVisible && (
          <div role="tooltip" className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap rounded-radius-2 px-2 py-1 text-tooltip font-medium bg-nav-active-bg-solid text-fg-inverse shadow-xs pointer-events-none z-20">
            {expandLabel}
          </div>
        )}
      </div>
    );
  }

  return (
    <nav aria-label="Page sections">
      <div className={`relative p-2 backdrop-blur-3 bg-nav-bg rounded-radius-6 shadow-xs ring-1 ring-nav-ring w-fit transition-opacity duration-180 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <ol className="grid gap-1" style={{ gridTemplateColumns: 'max-content' }}>
          {sections.map((s) => {
            const isActive = activeId === s.id;
            return (
              <li key={s.id}>
                <button
                  onClick={() => onNavigate(s.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative text-tooltip leading-snug py-2 px-3 rounded-full text-left w-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                    isActive
                      ? 'text-fg-primary font-semibold bg-bg-page border border-black/[0.08] dark:border-white/[0.10]'
                      : 'text-fg-muted font-normal border border-transparent hover:text-fg-primary hover:bg-nav-active-bg'
                  }`}
                >
                  <span aria-hidden="true" className="font-semibold invisible block select-none whitespace-nowrap">{s.navLabel ?? s.eyebrow}</span>
                  <span className="absolute inset-0 py-2 px-3 whitespace-nowrap">{s.navLabel ?? s.eyebrow}</span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Right-edge minimise affordance — hovering highlights the edge and
            reveals a chevron just outside the panel; clicking collapses the nav. */}
        <button
          type="button"
          onClick={() => { setCollapsed(true); hideTip(); }}
          onPointerDown={onEdgePointerDown}
          onPointerMove={onEdgePointerMove}
          onPointerUp={onEdgePointerUp}
          onFocus={showTip}
          onBlur={hideTip}
          aria-label={minimiseLabel}
          className="group/edge absolute top-0 -right-[3px] h-full w-[15px] cursor-w-resize select-none rounded-r-radius-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-inset"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-6 right-[3px] w-[2px] rounded-full bg-fg-muted-inverse dark:bg-fg-muted opacity-0 group-hover/edge:opacity-100 group-focus-visible/edge:opacity-100 transition-opacity"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent, #000 35%, #000 65%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 35%, #000 65%, transparent)',
            }}
          />
          <span aria-hidden="true" onMouseEnter={showTip} onMouseLeave={hideTip} className="absolute left-full top-1/2 -translate-y-1/2 pl-[3px] cursor-pointer text-fg-muted opacity-0 group-hover/edge:opacity-100 group-focus-visible/edge:opacity-100 transition-opacity">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

        {tipVisible && (
          <div role="tooltip" className="absolute left-full top-1/2 -translate-y-1/2 ml-7 whitespace-nowrap rounded-radius-2 px-2 py-1 text-tooltip font-medium bg-nav-active-bg-solid text-fg-inverse shadow-xs pointer-events-none z-20">
            {minimiseLabel}
          </div>
        )}
      </div>
    </nav>
  );
}

// ── Mobile secondary nav ──────────────────────────────────────────────────────
function MobileSecondaryNav({ sections, activeId, onNavigate }) {
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current || !activeId) return;
    const btn = trackRef.current.querySelector(`[data-section="${activeId}"]`);
    btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeId]);

  return (
    <nav aria-label="Page sections" className="w-full backdrop-blur-1 bg-nav-bg rounded-radius-6 shadow-xs ring-1 ring-nav-ring p-[10px]">
      <div className="overflow-hidden rounded-radius-4">
        <ul ref={trackRef} className="w-full flex items-center gap-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {sections.map((s) => {
            const isActive = activeId === s.id;
            return (
              <li key={s.id} className="shrink-0">
                <button
                  data-section={s.id}
                  onClick={() => onNavigate(s.id)}
                  aria-label={s.eyebrow || s.heading}
                  aria-current={isActive ? 'location' : undefined}
                  className={`h-8 px-3 rounded-radius-4 text-tooltip font-medium leading-[1.4] whitespace-nowrap transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                    isActive
                      ? 'bg-nav-active-bg text-fg-primary font-semibold'
                      : 'text-fg-muted hover:text-fg-primary hover:bg-nav-active-bg'
                  }`}
                >
                  {s.eyebrow}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

// ── Floor plan explorer ───────────────────────────────────────────────────────
// Numbered hotspots sit over the hand-drawn floor plan at the same spots as
// the sketch's own circled numbers. Hover (desktop) or tap (touch) swaps the
// detail panel below instead of listing all six experiences at once.
const FLOOR_PLAN_POSITIONS = [
  { x: 74.5, y: 21.3 }, // 01 — Film installation
  { x: 60.3, y: 23.0 }, // 02 — Interactive map
  { x: 46.8, y: 19.3 }, // 03 — AR Experience
  { x: 41.9, y: 26.7 }, // 04 — Real-time companion
  { x: 30.4, y: 13.0 }, // 05 — VR Experience
  { x: 21.5, y: 13.0 }, // 06 — Digital Twin Exploration
];

// ── Card carousel ────────────────────────────────────────────────────────────
// Standalone swipe carousel — same visual pattern as FloorPlanExplorer's
// experience cards (inverted panel, snap-x track, dots + arrows nav), but
// self-contained since it doesn't need to sync with anything external like
// hotspots on an image. Used for any "label + body" list that's too long to
// read comfortably as a bulleted list within a section.
function CardCarousel({ items, lang }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const isProg = useRef(false);
  // Cards go 2-up from `sm` — with N items and 2 visible at once, only
  // N-1 scroll positions are actually distinct (the last dot would just
  // land on the same view as the second-to-last). One dot per item only
  // makes sense on mobile, where cards are 1-up.
  const [twoUp, setTwoUp] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 640px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const onChange = () => setTwoUp(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const scrollToCard = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i];
    if (card) {
      const left = card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
      track.scrollTo({ left, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  };
  const select = (i) => {
    setActive(i);
    scrollToCard(i);
    isProg.current = true;
    // Longer jumps (e.g. clicking a dot several cards away) can take longer
    // to scroll than a fixed timeout accounts for; if the timeout clears
    // isProg too early, the scroll handler fires mid-animation and can
    // overwrite `active` with a stale in-between card — surfacing as a dead
    // click right after. Prefer the real scrollend event where supported,
    // with the timeout only as a fallback/safety net.
    const track = trackRef.current;
    const clear = () => { isProg.current = false; };
    if (track && 'onscrollend' in track) {
      track.addEventListener('scrollend', clear, { once: true });
      setTimeout(clear, 1000);
    } else {
      setTimeout(clear, 400);
    }
  };
  const handleScroll = () => {
    if (isProg.current) return;
    const track = trackRef.current;
    if (!track) return;
    let closest = 0, min = Infinity;
    Array.from(track.children).forEach((c, i) => {
      const left = c.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
      const d = Math.abs(left - track.scrollLeft);
      if (d < min) { min = d; closest = i; }
    });
    setActive(closest);
  };
  const goPrev = () => select(Math.max(0, active - 1));
  const goNext = () => select(Math.min(distinctPositions - 1, active + 1));
  const prevLabel = lang === 'fr' ? 'Élément précédent' : 'Previous item';
  const nextLabel = lang === 'fr' ? 'Élément suivant' : 'Next item';

  const visibleCount = twoUp ? 2 : 1;
  const distinctPositions = Math.max(1, items.length - visibleCount + 1);
  const dotWindow = Math.min(4, distinctPositions);
  const clampedActive = Math.min(active, distinctPositions - 1);
  const dotStart = Math.max(0, Math.min(clampedActive - Math.floor(dotWindow / 2), distinctPositions - dotWindow));
  const visibleDots = Array.from({ length: dotWindow }, (_, k) => dotStart + k);

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={trackRef}
        data-squircle
        onScroll={handleScroll}
        className="rounded-radius-4 sm:rounded-radius-6 lg:rounded-radius-8 flex gap-4 overflow-x-auto snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map((item, i) => (
          <div key={i} data-squircle className="shrink-0 w-full sm:w-[calc(50%-8px)] snap-start rounded-radius-4 sm:rounded-radius-6 lg:rounded-radius-8 bg-bg-surface-inverted p-6 flex flex-col gap-2">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <h3 className="text-[20px] font-semibold leading-snug text-fg-primary-inverse">{item.label}</h3>
              {item.device && <span className="text-overline-s font-medium leading-[1.4] uppercase tracking-wider text-fg-muted-inverse">{item.device}</span>}
            </div>
            <div className="mt-auto text-copy-s font-normal leading-relaxed text-fg-secondary-inverse">{item.body}</div>
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          <div />
          <div className="flex items-center">
            {visibleDots.map((i) => (
              <button
                key={i}
                onClick={() => select(i)}
                aria-label={lang === 'fr' ? `Élément ${i + 1} sur ${items.length}` : `Item ${i + 1} of ${items.length}`}
                aria-current={i === clampedActive ? 'true' : undefined}
                className="group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg-primary rounded-full motion-safe:transition-all motion-safe:duration-200 p-2"
              >
                <span className={`block rounded-full motion-safe:transition-all motion-safe:duration-200 ${i === clampedActive ? 'w-4 h-2 bg-fg-dot-active' : 'w-2 h-2 bg-fg-dot-rest group-hover:bg-fg-dot-hover'}`} />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 justify-self-end">
            <button
              onClick={goPrev}
              disabled={active === 0}
              data-spring
              aria-label={prevLabel}
              className="group p-2 rounded-full bg-btn-nav-bg-rest-subtle enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
            >
              <img src={imgChevronLeft} alt="" width={20} height={20} className="brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter]" />
            </button>
            <button
              onClick={goNext}
              disabled={clampedActive === distinctPositions - 1}
              data-spring
              aria-label={nextLabel}
              className="group p-2 rounded-full bg-btn-nav-bg-rest-subtle enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
            >
              <img src={imgChevronRight} alt="" width={20} height={20} className="group-enabled:group-hover:brightness-0 group-enabled:group-hover:invert dark:brightness-0 dark:invert dark:group-enabled:group-hover:brightness-100 dark:group-enabled:group-hover:invert-0 transition-[filter]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Image + sentence pairs, swipeable at every breakpoint (same track/dots/
// arrows pattern as CardCarousel). Each card is a fixed height so both cards
// are the same size regardless of sentence length; internally the image sits
// above the text on mobile (no room to go side by side) and to its left from
// sm+ up.
function ScaleCards({ items, lang }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const isProg = useRef(false);

  const scrollToCard = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i];
    if (card) {
      const left = card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
      track.scrollTo({ left, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  };
  const select = (i) => {
    setActive(i);
    scrollToCard(i);
    isProg.current = true;
    const track = trackRef.current;
    const clear = () => { isProg.current = false; };
    if (track && 'onscrollend' in track) {
      track.addEventListener('scrollend', clear, { once: true });
      setTimeout(clear, 1000);
    } else {
      setTimeout(clear, 400);
    }
  };
  const handleScroll = () => {
    if (isProg.current) return;
    const track = trackRef.current;
    if (!track) return;
    let closest = 0, min = Infinity;
    Array.from(track.children).forEach((c, i) => {
      const left = c.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
      const d = Math.abs(left - track.scrollLeft);
      if (d < min) { min = d; closest = i; }
    });
    setActive(closest);
  };
  const goPrev = () => select(Math.max(0, active - 1));
  const goNext = () => select(Math.min(items.length - 1, active + 1));
  const prevLabel = lang === 'fr' ? 'Élément précédent' : 'Previous item';
  const nextLabel = lang === 'fr' ? 'Élément suivant' : 'Next item';

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={trackRef}
        data-squircle
        onScroll={handleScroll}
        className="rounded-radius-4 sm:rounded-radius-6 lg:rounded-radius-8 flex gap-4 overflow-x-auto snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map((item, i) => (
          <div key={i} data-squircle className="xr-scale-card shrink-0 w-full snap-center rounded-radius-4 sm:rounded-radius-6 lg:rounded-radius-8 bg-bg-surface-inverted overflow-hidden flex flex-col sm:flex-row sm:h-56 lg:h-64">
            <img src={item.image} alt={item.alt} className="w-full h-48 sm:h-full sm:w-3/5 object-cover" />
            <div className="p-6 sm:p-8 sm:w-2/5 flex items-center">
              <p className="text-copy-s font-normal leading-relaxed text-fg-secondary-inverse">{item.sentence}</p>
            </div>
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          <div />
          <div className="flex items-center">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => select(i)}
                aria-label={lang === 'fr' ? `Élément ${i + 1} sur ${items.length}` : `Item ${i + 1} of ${items.length}`}
                aria-current={i === active ? 'true' : undefined}
                className="group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg-primary rounded-full motion-safe:transition-all motion-safe:duration-200 p-2"
              >
                <span className={`block rounded-full motion-safe:transition-all motion-safe:duration-200 ${i === active ? 'w-4 h-2 bg-fg-dot-active' : 'w-2 h-2 bg-fg-dot-rest group-hover:bg-fg-dot-hover'}`} />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 justify-self-end">
            <button
              onClick={goPrev}
              disabled={active === 0}
              data-spring
              aria-label={prevLabel}
              className="group p-2 rounded-full bg-btn-nav-bg-rest-subtle enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
            >
              <img src={imgChevronLeft} alt="" width={20} height={20} className="brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter]" />
            </button>
            <button
              onClick={goNext}
              disabled={active === items.length - 1}
              data-spring
              aria-label={nextLabel}
              className="group p-2 rounded-full bg-btn-nav-bg-rest-subtle enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
            >
              <img src={imgChevronRight} alt="" width={20} height={20} className="group-enabled:group-hover:brightness-0 group-enabled:group-hover:invert dark:brightness-0 dark:invert dark:group-enabled:group-hover:brightness-100 dark:group-enabled:group-hover:invert-0 transition-[filter]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FloorPlanExplorer({ experiences, image, caption, lang }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const trackRef = useRef(null);
  const isProg = useRef(false);
  // Keeps the card carousel in sync with the hotspots on the sketch: selecting
  // a hotspot (or the prev/next buttons) scrolls the carousel to match, and
  // swiping the carousel updates which hotspot reads as active.
  const scrollToCard = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i];
    if (card) {
      const left = card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
      track.scrollTo({ left, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  };
  const select = (i) => {
    setActive(i);
    scrollToCard(i);
    isProg.current = true;
    // Longer jumps (e.g. clicking a dot several cards away) can take longer
    // to scroll than a fixed timeout accounts for; if the timeout clears
    // isProg too early, the scroll handler fires mid-animation and can
    // overwrite `active` with a stale in-between card — surfacing as a dead
    // click right after. Prefer the real scrollend event where supported,
    // with the timeout only as a fallback/safety net.
    const track = trackRef.current;
    const clear = () => { isProg.current = false; };
    if (track && 'onscrollend' in track) {
      track.addEventListener('scrollend', clear, { once: true });
      setTimeout(clear, 1000);
    } else {
      setTimeout(clear, 400);
    }
  };
  const handleScroll = () => {
    if (isProg.current) return;
    const track = trackRef.current;
    if (!track) return;
    let closest = 0, min = Infinity;
    Array.from(track.children).forEach((c, i) => {
      const left = c.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
      const d = Math.abs(left - track.scrollLeft);
      if (d < min) { min = d; closest = i; }
    });
    setActive(closest);
  };
  const goPrev = () => select(Math.max(0, (active ?? 0) - 1));
  const goNext = () => select(Math.min(experiences.length - 1, (active ?? 0) + 1));
  const prevLabel = lang === 'fr' ? 'Expérience précédente' : 'Previous experience';
  const nextLabel = lang === 'fr' ? 'Expérience suivante' : 'Next experience';

  // Six experiences is too many dots to show at once — slide a 4-dot window.
  // The window only shifts once the active card exits it (rather than
  // recentring on every step), so the highlighted dot visibly advances
  // instead of sitting in the same middle slot for several cards in a row.
  const dotWindow = Math.min(4, experiences.length);
  const [dotStart, setDotStart] = useState(0);
  useLayoutEffect(() => {
    const a = active ?? 0;
    setDotStart(prev => {
      if (a < prev) return a;
      if (a > prev + dotWindow - 1) return a - dotWindow + 1;
      return prev;
    });
  }, [active, dotWindow]);
  const visibleDots = Array.from({ length: dotWindow }, (_, k) => dotStart + k);

  const cardContent = (e) => (
    <div className="h-full flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <span className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-bg-page flex items-center justify-center text-h4 font-extrabold text-fg-primary">
          {e.number.replace(/^0/, '')}
        </span>
        <div className="flex flex-col gap-1 min-w-0">
          <h3 className="text-[24px] font-semibold leading-snug text-fg-primary-inverse">{e.title}</h3>
          <span className="text-overline-s font-medium leading-[1.4] uppercase tracking-wider text-fg-muted-inverse">{e.tech}</span>
        </div>
      </div>
      <div className="mt-auto flex flex-col gap-3 pl-1">
        {(Array.isArray(e.body) ? e.body : [e.body]).map((para, i) => (
          <p key={i} className="text-copy-s font-normal leading-relaxed text-fg-secondary-inverse">{para}</p>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 max-w-lg mx-auto w-full">
      <figure className="flex flex-col gap-1">
        <div className="relative -mx-6 sm:mx-0">
          <img
            src={image}
            alt="Floor plan sketch of the event space showing the six experience locations"
            data-squircle
            className="w-full rounded-radius-4 sm:rounded-radius-5 object-cover dark:[filter:invert(0.92)]"
          />
          {experiences.map((e, i) => (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              onClick={() => select(i)}
              aria-label={`${e.number} — ${e.title}`}
              aria-pressed={active === i}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-label-s leading-none border-2 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${active === i || hovered === i ? 'font-bold bg-bg-surface-inverted border-bg-surface-inverted text-fg-primary-inverse' : 'font-semibold bg-bg-page border-black/[0.16] dark:border-white/[0.20] text-fg-primary hover:border-cta-600'}`}
              style={{ left: `${FLOOR_PLAN_POSITIONS[i].x}%`, top: `${FLOOR_PLAN_POSITIONS[i].y}%` }}
            >
              {e.number.replace(/^0/, '')}
            </button>
          ))}
        </div>
        <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{caption}</figcaption>
      </figure>

      {/* Card carousel — one card per experience, snapping into place. Stays
          within the normal column at every breakpoint (unlike the image
          above) so the track's own rounded corners always line up with the
          cards' edges. Sliding via select()/scrollToCard() also gives
          desktop/tablet a slide transition when clicking a dot, arrow, or
          hotspot, instead of just swapping content instantly. */}
      <div
        ref={trackRef}
        data-squircle
        onScroll={handleScroll}
        className="mt-2 rounded-radius-4 sm:rounded-radius-6 lg:rounded-radius-8 flex gap-4 overflow-x-auto snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {experiences.map((e, i) => (
          <div key={i} data-squircle className="shrink-0 w-full snap-center rounded-radius-4 sm:rounded-radius-6 lg:rounded-radius-8 bg-bg-surface-inverted pt-4 px-6 pb-6 flex flex-col">
            {cardContent(e)}
          </div>
        ))}
      </div>

      {/* Carousel nav (dots + arrows) — same pattern as the Solve section's flow
          carousel. Below the carousel on mobile, below the panel on sm+ (no
          touch swipe there, so this is the only way to move between them). */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">
        <div />
        <div className="flex items-center">
          {visibleDots.map((i) => (
            <button
              key={i}
              onClick={() => select(i)}
              aria-label={lang === 'fr' ? `Expérience ${i + 1} sur ${experiences.length}` : `Experience ${i + 1} of ${experiences.length}`}
              aria-current={i === active ? 'true' : undefined}
              className="group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg-primary rounded-full motion-safe:transition-all motion-safe:duration-200 p-2"
            >
              <span className={`block rounded-full motion-safe:transition-all motion-safe:duration-200 ${i === active ? 'w-4 h-2 bg-fg-dot-active' : 'w-2 h-2 bg-fg-dot-rest group-hover:bg-fg-dot-hover'}`} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 justify-self-end">
          <button
            onClick={goPrev}
            disabled={(active ?? 0) === 0}
            data-spring
            aria-label={prevLabel}
            className="group p-2 rounded-full bg-btn-nav-bg-rest-subtle enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
          >
            <img src={imgChevronLeft} alt="" width={20} height={20} className="brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter]" />
          </button>
          <button
            onClick={goNext}
            disabled={(active ?? 0) === experiences.length - 1}
            data-spring
            aria-label={nextLabel}
            className="group p-2 rounded-full bg-btn-nav-bg-rest-subtle enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
          >
            <img src={imgChevronRight} alt="" width={20} height={20} className="group-enabled:group-hover:brightness-0 group-enabled:group-hover:invert dark:brightness-0 dark:invert dark:group-enabled:group-hover:brightness-100 dark:group-enabled:group-hover:invert-0 transition-[filter]" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Team row ──────────────────────────────────────────────────────────────────
function TeamTable({ members }) {
  return (
    <div className="flex flex-col divide-y divide-black/[0.06] dark:divide-white/[0.06]">
      {members.map((m, i) => (
        <div key={i} className="flex items-baseline justify-between gap-4 py-3">
          <span className="text-tag-m font-medium text-fg-primary">{m.role}</span>
          <span className="text-copy-s sm:text-label-s text-fg-muted text-right shrink-0">{m.detail}</span>
        </div>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
function XRExperiences({ lang, isDark }) {
  const t = T[lang] ?? T.en;
  const [mounted, setMounted]         = useState(false);
  const [heroReady, setHeroReady]     = useState(false);
  const [activeId, setActiveId]       = useState('');
  const [scrolledDown, setScrolledDown] = useState(false);
  const [atBottom, setAtBottom]       = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const scrollTarget  = useRef(null);
  const swipeStart    = useRef(null);
  const onHeroTouchStart = (e) => { swipeStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
  const onHeroTouchEnd   = (e) => {
    if (!swipeStart.current) return;
    const dx = e.changedTouches[0].clientX - swipeStart.current.x;
    const dy = e.changedTouches[0].clientY - swipeStart.current.y;
    swipeStart.current = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      window.dispatchEvent(new CustomEvent('cycle-project', { detail: { dir: dx < 0 ? -1 : 1 } }));
    }
  };
  const navScrollRef  = useRef(false);

  const xboxSvg = useMemo(() =>
    rawXboxKeybinding
      .replace(/(<svg[^>]*)\s+width="[^"]*"\s+height="[^"]*"/, '$1 role="img" aria-label="Xbox controller keybindings for the Digital Twin exploration" style="width:100%;height:auto"')
  , []);

  const handleNavigate = (id) => {
    setActiveId(id);
    scrollTarget.current = id;
    navScrollRef.current = true;
    setScrollingDown(false);
    window.dispatchEvent(new CustomEvent('nav-scroll-start'));
    scrollToSection(id);
    setTimeout(() => { scrollTarget.current = null; navScrollRef.current = false; setScrollingDown(false); }, 1500);
  };

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { const t = setTimeout(() => setHeroReady(true), 600); return () => clearTimeout(t); }, []);
  useEffect(() => { document.title = t.pageTitle; }, [t]);
  useEffect(() => { trackEvent('case_study_view', { study: 'xr' }); }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers = t.sections.map(s => {
      const el = document.getElementById(s.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          if (scrollTarget.current) {
            if (s.id === scrollTarget.current) { scrollTarget.current = null; setActiveId(s.id); }
          } else {
            setActiveId(s.id);
          }
        },
        { rootMargin: '-10% 0px -70% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [lang]);

  // Show/hide navs based on scroll position
  useEffect(() => {
    const firstEl = document.getElementById(t.sections[0].id);
    const lastEl  = document.getElementById(t.sections[t.sections.length - 1].id);
    if (!firstEl || !lastEl) return;
    const update = () => {
      // Anchor = scroll-mt-24 (96px). Nav visible at the first/last anchors,
      // hiding 50px past either end: top buffer = 96 + 50; bottom = (96 + height) − 50.
      setScrolledDown(firstEl.getBoundingClientRect().top < 146);
      setAtBottom(lastEl.getBoundingClientRect().bottom < lastEl.offsetHeight + 46);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [t]);

  // Mobile only: track scroll direction to hide nav on scroll down
  useEffect(() => {
    if (!window.matchMedia('(max-width: 767px)').matches) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (!navScrollRef.current) setScrollingDown(y > lastY);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile only: show chat pill when secondary nav is visible
  useEffect(() => {
    if (!window.matchMedia('(max-width: 767px)').matches) return;
    const visible = scrolledDown && !atBottom && !scrollingDown;
    window.dispatchEvent(new CustomEvent('chat-force-visible', { detail: visible }));
    return () => window.dispatchEvent(new CustomEvent('chat-force-visible', { detail: false }));
  }, [scrolledDown, atBottom, scrollingDown]);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-radius-2 focus:ring-2 focus:ring-border-focus focus:bg-white focus:text-fg-primary focus:outline-none font-medium">
        {t.skipToMain}
      </a>

      <main
        id="main-content"
        aria-label={t.title}
        tabIndex={-1}
        className={`bg-bg-surface min-h-screen transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      >

        <section
          aria-labelledby="xr-hero-heading"
          className="relative min-h-screen flex flex-col bg-bg-surface overflow-hidden"
          onTouchStart={onHeroTouchStart}
          onTouchEnd={onHeroTouchEnd}
        >
          <img src={mipimPhoto} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
          {/* Gradient overlay — same pattern as the SalesPlatform
              and Canap heroes (`from-transparent via-black/40
              to-black/95`). Photo's top half reads clear, fading
              to dark at the bottom where the chrome sits. */}
          <div
            className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/40 to-black/95 transition-opacity duration-700"
            style={{ opacity: heroReady ? 1 : 0 }}
          />

          {/* Entrance fade (`opacity heroReady`) is on each CHILD below, not
              here: the pill has a `backdrop-blur`, and an ancestor with
              opacity < 1 disables backdrop-filter — fading the container made
              the pill's blur + edge pop in at the end. Per-child fade lets the
              pill ease in with its blur intact. (The page mount-fade finishes
              at 500ms, before heroReady at 600ms, so it doesn't re-break it.) */}
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 mt-auto relative z-10 pb-24 sm:pb-28 lg:pb-32 pt-40">
            <div className="flex flex-col gap-6 sm:gap-8">
              {/* Pill-style eyebrow — same treatment as the
                  Canap + SalesPlatform case study heroes. Token-
                  driven: `text-tag-m` typography, `bg-inverted-
                  subtle` + `border-inverted-subtle` for the
                  auto-flipping light/dark fill, `text-fg-on-dark-
                  opacity-90` for the text. */}
              <span
                className="inline-flex self-start items-center -ml-4 text-tag-m uppercase tracking-widest font-semibold text-fg-on-dark-opacity-90 bg-inverted-subtle backdrop-blur-sm border border-inverted-subtle px-4 py-1.5 rounded-full transition-opacity duration-700"
                style={{ opacity: heroReady ? 1 : 0 }}
              >
                {t.label}
              </span>
              <h1
                id="xr-hero-heading"
                className="text-display-2 font-semibold leading-tight text-white transition-opacity duration-700"
                style={{ opacity: heroReady ? 1 : 0 }}
              >
                {t.title}
              </h1>
              {/* Tagline removed for hero-shape consistency with
                  the other case studies. The phrase
                  ("The architecture of engagement") was doing
                  thesis work — if the case study still wants
                  that line, it should land in the Context section
                  body copy or as a section eyebrow rather than as
                  hero chrome. `t.tagline` remains in the EN/FR T
                  bundles unused for now in case it's reinstated. */}
              <ul className="flex items-start gap-8 sm:gap-12 lg:gap-16 mt-2 transition-opacity duration-700" style={{ opacity: heroReady ? 1 : 0 }} aria-label="Key figures">
                {t.stats.map((s, i) => (
                  <li key={i} className="flex flex-col gap-1">
                    <span className="text-h3 font-semibold leading-snug tabular-nums whitespace-nowrap text-fg-on-dark-primary">
                      <AnimatedStat prefix={s.prefix} countTo={s.countTo} suffix={s.suffix} ready={heroReady} />
                    </span>
                    <span className="text-label-s font-semibold leading-[1.4] uppercase tracking-wider text-fg-on-dark-opacity-64">{s.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="flex flex-col items-center">
          {/* Centred reading column — same max-width AND horizontal padding as
              Canap + Sales Platform (px-6 sm:px-8 lg:px-10, max-w-[52rem]) so the
              section cards render at an identical width across the three case
              studies; the fixed secondary nav (after </main>) is also identical. */}
          <div className="w-full max-w-5xl md:max-w-2xl lg:max-w-[52rem] px-6 sm:px-8 lg:px-10">
              {t.sections.map((section, si) => (
                <CollapsibleSection
                  key={section.id}
                  section={section}
                  si={si}
                  isLast={si === t.sections.length - 1}
                  lang={lang}
                >

                  {/* Body paragraphs — first para, then map (if any), then rest */}
                  <div className={`flex flex-col gap-8${section.tile !== false ? '' : ' max-w-3xl'}`}>
                    {section.body.slice(0, 1).map((p, i) => (
                      p?.type === 'ul'
                        ? <div key={i}>{p}</div>
                      : p?.type === 'h3'
                        ? <h3 key={i} className={`${p.mt ?? 'mt-4'} ${p.size ?? 'text-h3'} font-semibold leading-snug text-fg-primary`}>{p.text}</h3>
                        : <p key={i} className={bodyText}>{p}</p>
                    ))}
                  </div>


                  {/* Building photo — after first para in When & Where */}
                  {section.id === 'when-where' && (
                    <figure className="flex flex-col gap-2 max-w-lg mx-auto">
                      <img
                        src={eventBuildingPhoto}
                        alt="Two-storey building constructed by our client at MIPIM"
                        className="w-full rounded-radius-4 sm:rounded-radius-5 object-cover"
                      />
                      <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{t.captions.building}</figcaption>
                    </figure>
                  )}

                  {/* AR session photo — in Measure section */}
                  {section.id === 'measure' && (
                    <figure className="flex flex-col gap-2 max-w-lg mx-auto">
                      <img
                        src={eventPresentationPhoto}
                        alt="Leading a shared AR experience"
                        data-squircle
                        className="w-full rounded-radius-4 sm:rounded-radius-5 object-cover"
                      />
                      <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{t.captions.arSession}</figcaption>
                    </figure>
                  )}

                  {/* World map — between para 1 and the rest */}
                  {section.map && (
                    <div className={`${section.tile ? 'w-full' : 'max-w-[40rem] mx-auto w-full'} -mt-2 sm:-mt-3 mb-2`}>
                      <WorldMapDots isDark={isDark} lang={lang} legendBg="" />
                    </div>
                  )}

                  {section.body.length > 1 && (
                    <div className={`flex flex-col gap-8${section.tile !== false ? '' : ' max-w-3xl'}${section.map ? ' mt-4' : ''}`}>
                      {section.body.slice(1).map((p, i) => (
                        <Fragment key={i}>
                          {/* AR session photo — before Reflection text in Measure */}
                          {section.id === 'measure' && i === 4 && (
                            <figure className="flex flex-col gap-2 max-w-lg mx-auto">
                              <img
                                src={eventPresentationPhoto}
                                alt="Leading a shared AR experience"
                                data-squircle
                                className="w-full rounded-radius-4 sm:rounded-radius-5 object-cover"
                              />
                              <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{t.captions.arSession}</figcaption>
                            </figure>
                          )}
                          {/* Flowcharts — after Approaches heading in Solve */}
                          {section.id === 'solve' && i === 5 && (
                            <FlowSection isDark={isDark} lang={lang} labels={t.flowLabels} />
                          )}
                          {section.id === 'prioritise' && i === 0 && (
                            <figure className="flex flex-col gap-2 max-w-sm mx-auto mb-4">
                              <div className="grid" style={{ gridTemplateColumns: '4fr 1fr' }}>
                                <img data-squircle src={magicLeapPhoto} alt="Magic Leap 2 AR glasses" className="w-full rounded-radius-3 sm:rounded-radius-4 object-cover" />
                                <img data-squircle src={magicLeapControllerPhoto} alt="Magic Leap 2 controller" className="w-full rounded-radius-3 sm:rounded-radius-4 object-cover" />
                              </div>
                              <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{t.captions.magicLeap}</figcaption>
                            </figure>
                          )}
                          {section.id === 'prioritise' && i === 1 && (
                            <figure className="flex flex-col gap-2 max-w-sm mx-auto">
                              <img data-squircle src={tableTopLogo} alt="Client logo design on the AR table top" className="w-full rounded-radius-4 sm:rounded-radius-5 object-cover dark:[filter:invert(0.92)_hue-rotate(180deg)]" />
                              <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{t.captions.tracker}</figcaption>
                            </figure>
                          )}
                          {p?.type === 'callout'
                            ? p.variant === 'goal'
                              ? (
                                <div data-squircle className="mt-6 rounded-radius-4 bg-palette-sky-bg border border-palette-indigo-bg px-5 py-4 flex flex-col gap-3">
                                  <span className="text-overline-s font-medium leading-[1.4] uppercase tracking-wider text-palette-indigo-fg">{p.label}</span>
                                  <p className={bodyText}>{p.body}</p>
                                </div>
                              )
                              : p.variant === 'neutral'
                              ? (
                                <div data-squircle className="mt-6 -mb-4 rounded-radius-4 bg-feedback-neutral-bg border border-feedback-neutral-border px-5 py-4 flex flex-col gap-3">
                                  <span className="text-overline-s font-medium leading-[1.4] uppercase tracking-wider text-fg-muted">{p.label}</span>
                                  <p className={bodyText}>{p.body}</p>
                                </div>
                              )
                              : p.variant === 'outline'
                              ? (
                                <div data-squircle className="mt-6 rounded-radius-4 bg-bg-page border border-black/[0.08] dark:border-white/[0.10] px-5 py-4 flex flex-col gap-3">
                                  <span className="text-overline-s font-medium leading-[1.4] uppercase tracking-wider text-fg-muted">{p.label}</span>
                                  <p className={bodyText}>{p.body}</p>
                                </div>
                              )
                              : p.variant === 'sky' || p.variant === 'gold'
                              ? (
                                <div data-squircle className={`mt-6 rounded-radius-4 px-5 py-4 flex flex-col gap-3 ${p.variant === 'gold' ? 'bg-feedback-warning-bg border border-feedback-warning-border' : 'bg-palette-sky-bg border border-palette-indigo-bg'}`}>
                                  <span className={`text-overline-s font-medium leading-[1.4] uppercase tracking-wider ${p.variant === 'gold' ? 'text-palette-yellow-fg' : 'text-palette-indigo-fg'}`}>{p.label}</span>
                                  <p className={bodyText}>{p.body}</p>
                                </div>
                              )
                              : (
                              <div data-squircle className="mt-6 rounded-radius-4 border border-border-subtle px-5 py-4 flex flex-col gap-3">
                                <span className="text-overline-s font-medium leading-[1.4] uppercase tracking-wider text-fg-muted">{p.label}</span>
                                <p className={bodyText}>{p.body}</p>
                              </div>
                            )
                            : p?.type === 'h3'
                              ? <h3 className={`${p.mt ?? 'mt-4'} ${p.size ?? 'text-h3'} font-semibold leading-snug text-fg-primary`}>{p.text}</h3>
                            : p?.type === 'ul'
                              ? <div>{p}</div>
                            : p?.type === 'roleGrid'
                              ? (
                                <CardCarousel
                                  items={p.groups.map(g => ({
                                    label: g.heading,
                                    body: (
                                      <ul className="list-disc pl-5 flex flex-col gap-1">
                                        {g.items.map((item, ii) => <li key={ii}>{item}</li>)}
                                      </ul>
                                    ),
                                  }))}
                                  lang={lang}
                                />
                              )
                            : p?.type === 'cardCarousel'
                              ? <CardCarousel items={p.items} lang={lang} />
                            : p?.type === 'scaleCards'
                              ? <ScaleCards items={p.items} lang={lang} />
                              : <p className={bodyText}>{p}</p>}
                        </Fragment>
                      ))}
                    </div>
                  )}

                  {/* Xbox keybinding — bottom of the Solve section, with a CTA to
                      the Digital Twin case study (same right-aligned pill pattern
                      as the Figma link on the Canap case study). */}
                  {section.id === 'solve' && (
                    <figure className="flex flex-col gap-2">
                      <div data-squircle className="dark bg-bg-page rounded-radius-4 sm:rounded-radius-5 p-6"
                           dangerouslySetInnerHTML={{ __html: xboxSvg }} />
                      <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{t.captions.xbox}</figcaption>
                      <div className="mt-2 flex justify-end">
                        <Link
                          to="/case-study/digital-twin"
                          data-spring
                          className="inline-flex items-center gap-2 pl-4 pr-4 py-2.5 rounded-full bg-blue-600 text-white font-semibold text-btn-m hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                        >
                          {t.digitalTwinCta}
                          <img
                            src={imgArrowRight}
                            alt=""
                            width={16}
                            height={16}
                            className="ml-0.5 brightness-0 invert"
                            draggable="false"
                          />
                        </Link>
                      </div>
                    </figure>
                  )}

                  {/* Satellite photo — after both paragraphs in Why */}
                  {section.id === 'why' && (
                    <figure className="flex flex-col gap-2 max-w-lg mx-auto">
                      <img
                        src={satelliteSitePhoto}
                        alt="Satellite view of the development site"
                        data-squircle
                        className="w-full rounded-radius-4 sm:rounded-radius-5 object-cover"
                      />
                      <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{t.captions.satellite}</figcaption>
                    </figure>
                  )}


                  {section.team && (
                    <div className="max-w-xl">
                      <TeamTable members={section.team} />
                    </div>
                  )}


                  {section.experiences && (
                    <FloorPlanExplorer
                      experiences={section.experiences}
                      image={eventSpacePhoto}
                      caption={t.captions.floorPlan}
                      lang={lang}
                    />
                  )}

                  {section.footerCallout && (
                    <div data-squircle className="mt-6 rounded-radius-4 bg-bg-page border border-black/[0.08] dark:border-white/[0.10] px-5 py-4 flex flex-col gap-3 max-w-3xl">
                      <span className="text-overline-s font-medium leading-[1.4] uppercase tracking-wider text-fg-muted">{section.footerCallout.label}</span>
                      <div className={bodyText}>{section.footerCallout.body}</div>
                    </div>
                  )}

                </CollapsibleSection>
              ))}
              <div className="pb-16 sm:pb-20 flex justify-center">
                <XRToolsSection label={t.toolsLabel} categories={t.toolCategories} />
              </div>
          </div>
        </div>

        <div className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
            <Link
              data-spring
              to="/#case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cta-600 hover:bg-cta-700 text-fg-on-accent-opacity-95 font-medium text-tag-m leading-[1.2] rounded-full border border-accent-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2"
            >
              <img src={imgArrowRight} alt="" width={16} height={16} className="brightness-0 invert" style={{ transform: 'rotate(180deg)' }} />
              {t.backLabel}
            </Link>
          </div>
        </div>

      </main>

      {/* ── Desktop secondary nav — fixed, floats just left of the centred
          content. Position is identical to Canap + Sales Platform. The opacity
          fade lives on the inner blurred panel (see SecondaryNav), NOT this
          wrapper, so an ancestor opacity < 1 never disables the backdrop-blur. ── */}
      <div
        inert={scrolledDown && !atBottom ? undefined : true}
        className={`hidden min-[920px]:block fixed z-10 top-[240px] min-[920px]:right-[calc(50%_+_20.5rem)] lg:right-[calc(50%_+_25.5rem)] ${scrolledDown && !atBottom ? '' : 'pointer-events-none'}`}
      >
        <SecondaryNav sections={t.sections} activeId={activeId} onNavigate={handleNavigate} visible={scrolledDown && !atBottom} lang={lang} />
      </div>

      {/* ── Mobile floating nav — disabled: secondary nav is tablet/desktop only ── */}
      <div
        inert={scrolledDown && !atBottom && !scrollingDown ? undefined : true}
        className={`hidden fixed bottom-2 left-4 right-4 z-40 flex justify-center pointer-events-none transition-opacity duration-300 ${scrolledDown && !atBottom && !scrollingDown ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="pointer-events-auto w-full">
          <MobileSecondaryNav sections={t.sections} activeId={activeId} onNavigate={handleNavigate} />
        </div>
      </div>


      <Footer lang={lang} />
    </>
  );
}

export default XRExperiences;
