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
import mipimPhoto from '../assets/photos/photo-MIPIM.webp';
import eventBuildingPhoto from '../assets/photos/photo-event-building.webp';
import eventSpacePhoto from '../assets/photos/photo-event-space.webp';
import eventGroupPhoto from '../assets/photos/photo-event-group.webp';
import eventPresentationPhoto from '../assets/photos/photo-event-building-presentation.webp';
import satelliteSitePhoto    from '../assets/case-study/xr-experience/photo/photo-satellite-development-site.webp';
import tableTopLogo from '../assets/logos/clients/logo-table-top.webp';
import magicLeapPhoto from '../assets/photos/photo-magic-leap-2-glasses.webp';
import magicLeapControllerPhoto from '../assets/photos/photo-magic-leap-2-controller.webp';
import rawXboxKeybinding from '../assets/icons/xbox-key-binding.svg?raw';
import rawFlowInitial from '../assets/case-study/xr-experience/flowchart/shared-ar-experience-flow-inital.svg?raw';
import rawFlowShipped from '../assets/case-study/xr-experience/flowchart/shared-ar-experience-flow-shipped.svg?raw';
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
    pageTitle:   'XR Experiences • Atelier Digital',
    label:       'Case study • Extended Reality',
    title:       'Revealing a Megaproject',
    tagline:     'The architecture of engagement',
    stats: [
      { countTo: 6, decimals: 0, prefix: '', suffix: '',        label: 'Apps' },
      { countTo: 3, decimals: 0, prefix: '', suffix: ' XR',     label: 'Experiences' },
      { countTo: 1, decimals: 0, prefix: '', suffix: ' UX',     label: 'Designer' },
      { countTo: 6, decimals: 0, prefix: '', suffix: ' weeks',  label: 'To deliver' },
    ],
    sections: [
      {
        id:      'team',
        eyebrow: 'Our team',
        heading: 'Distributed by design',
        body: [
          <>Our core team of five, spanning four countries, led the <strong>end-to-end design</strong> and <strong>development</strong> of all applications. Film production was handled by our studio team.</>,
          <>We operated in <strong>two-week sprints</strong> with daily <strong>stand-ups</strong> aligned to UK core hours, enabling:</>,
          <ul className="list-disc pl-5 flex flex-col gap-1 text-copy-m font-normal leading-loose text-fg-secondary">
            <li><strong>Alignment</strong> on design and development progress</li>
            <li>Early identification of <strong>blockers</strong></li>
            <li>Rapid navigation of <strong>trade-offs</strong> and <strong>technical constraints</strong></li>
            <li>Iteration of design in response to <strong>feedback</strong></li>
          </ul>,
          { type: 'h3', text: 'My role' },
          <>As the <strong>sole UX/UI designer</strong>, I led the design strategy for this high-profile project, ensuring consistency and clarity across all experiences. I collaborated closely with developers, engineers, and project managers, establishing a seamless workflow across diverse teams. I made key decisions that balanced user needs with technical constraints, driving the design process forward efficiently, even under tight timelines.</>,
        ],
        map: true,
      },
      {
        id:      'why',
        eyebrow: 'Why',
        heading: 'One shot at a first impression',
        body: [
          <>We were given the opportunity to reveal one of the most ambitious urban developments ever proposed, to a <strong>global audience of investors</strong>. Every detail had to communicate the scale, ambition, and innovative nature of the project.</>,
          { type: 'callout', variant: 'goal', label: 'The goal', body: <>Ensure visitors leave <strong>convinced</strong> this was <strong>a redefinition of what a city could be</strong>.</> },
        ],
      },
      {
        id:      'who',
        eyebrow: 'Who',
        heading: 'A high-stakes audience',
        body: [
          <>I had previously designed large-scale events in the tech industry (100k+ attendees). To tailor experiences for this high-investment, time-constrained audience, I quickly collaborated with a colleague experienced in Architecture, Engineering, and Construction events, reviewing delegate behavior, engagement patterns, and decision drivers.</>,
          <>With delegate passes costing €2,500–€3,000 each, designing for such a time-constrained, high-investment audience demanded clarity, engagement, and efficiency.</>,
          <>We targeted three audience types:</>,
          <ul className="list-none flex flex-col gap-2 text-copy-m font-normal leading-loose text-fg-secondary">
            <li><strong>Backers</strong> Investors seeking credibility, scale, and clear investable opportunity.</li>
            <li><strong>Builders</strong> Developers and architects looking for tangible ways to engage.</li>
            <li><strong>Visionaries</strong> Policymakers and strategists focused on long-term impact and legacy.</li>
          </ul>,
          { type: 'callout', label: 'UX Insight', body: <>We needed to design experiences that could <strong>adapt to different group sizes</strong> and <strong>engagement preferences</strong> while maintaining <strong>narrative clarity</strong> and <strong>storytelling integrity</strong>.</> },
        ],
      },
      {
        id:      'when-where',
        eyebrow: 'When & Where',
        heading: 'MIPIM, Cannes',
        body: [
          <>Experiences were deployed at the world’s largest real estate and investment event, hosted over <strong>one week</strong> at the Palais des Festivals.</>,
          <>Our client constructed a <strong>two-story pavilion</strong> dedicated to showcasing the development. Given the event's scale, the experiences had to <strong>capture attention quickly</strong> and deliver impact within minutes.</>,
          { type: 'callout', label: 'Spatial UX Consideration', body: 'The layout was designed to guide visitors smoothly from one experience to the next, maximizing engagement.' },
        ],
      },
      {
        id:      'what',
        eyebrow: 'What',
        heading: 'Complementary experiences',
        body: [
          <>Instead of one large installation, we designed <strong>six separate, complementary experiences</strong>. Each served as an entry point to different aspects of the project's story.</>,
        ],
        footerCallout: { label: 'UX/UI Contribution:', body: <>I designed the UI and interaction patterns for the five interactive experiences. This included everything from <strong>AR/VR controller flows</strong> to interactions, onboarding, and visuals that aligned with the <strong>pavilion layout</strong> and overall narrative.</> },
        experiences: [
          {
            number: '01',
            title:  'Film installation',
            tech:   'three LCD walls',
            body:   "A cinematic introduction showcasing the project's vision and scale.",
          },
          {
            number: '02',
            title:  'Interactive map app',
            tech:   'Transparent touchscreen display',
            body:   "A transparent touchscreen offering a satellite view of the development's geographic context.",
          },
          {
            number: '03',
            title:  'AR Experience',
            tech:   'Magic Leap 2 • Unity',
            body:   'A shared augmented reality experience where visitors could explore the central building layer by layer.',
          },
          {
            number: '04',
            title:  'Real-time companion app',
            tech:   'iPad',
            body:   'A real-time mirrored view of the AR experience, ensuring non-headset participants remained engaged.',
          },
          {
            number: '05',
            title:  'VR Experience',
            tech:   'Meta Quest 3 • Unreal',
            body:   'An immersive walkthrough of the Wadis (the dry valleys at the heart of the development), allowing visitors to experience it at ground level.',
          },
          {
            number: '06',
            title:  'Digital Twin Exploration',
            tech:   'Unreal Engine',
            body:   'A self-guided exploration of the entire development, its districts and the city around it.',
          },
        ],
      },
      {
        id:      'prioritise',
        eyebrow: 'Prioritise & Choose',
        heading: 'Decision-making under constraints',
        body: [
          <>The AR table was prioritized as the centerpiece, due to expected engagement and logistics (built in Saudi Arabia, shipped to France). We designed the table for comfort and hardware needs, including each Magic Leap headset, controller, and computer power unit.</>,
          <>At the center of the table, I designed an AR tracker, derived from the client logo. Its size and pattern were critical as Magic Leap sensors and iPad cameras needed to detect it reliably, ensuring the 3D imagery remained precisely locked even as users moved around.</>,
          { type: 'h3', text: 'What didn\'t make it' },
          <>We explored a multiplayer AR experience, but chose not to pursue it. While compelling, it required more devices than we could properly test or troubleshoot. In addition, network conditions at high-density events were unpredictable to rely on.</>,
          <>One element we did carry forward was the <strong>colour coded laser pointer</strong> from that early concept. Each participant was assigned a distinct colour, so they could see one another's focus point during the shared experience.</>,
          { type: 'h3', text: 'What was overdelivered' },
          <>While not initially in the brief, I pushed to develop an <strong>iPad companion app</strong>, as it added value by <strong>engaging non-headset users</strong> and enhancing the overall experience.</>,
          { type: 'h3', text: 'What was scoped down' },
          <>The interactive map was intentionally scoped back to prioritise clarity and reliability over additional features, ensuring it delivered value without introducing risk.</>,
          { type: 'callout', label: 'UX Insight', body: 'Every constraint became an opportunity to maximize engagement and storytelling.' },
        ],
      },
      {
        id:      'solve',
        eyebrow: 'Solve',
        heading: 'Form follows constraint',
        body: [
          <>Every experience came with its own set of <strong>technical and spatial challenges</strong>, which shaped the design decisions:</>,
          <ul className="list-disc pl-5 flex flex-col gap-1 text-copy-m font-normal leading-loose text-fg-secondary">
            <li><strong>Transparent display:</strong> Needed to show both interface and the space behind it clearly</li>
            <li><strong>AR (Magic Leap 2):</strong> Optimised 3D assets for device constraints; designed for up to five participants simultaneously</li>
            <li><strong>iPad app:</strong> Mirrored the AR session in real time for non-headset users, boosting engagement and curiosity</li>
            <li><strong>VR (Meta Quest 3):</strong> Immersive walkthrough at human scale, with mirrored view for observers</li>
            <li><strong>Digital twin:</strong> Built for cross-platform accessibility</li>
          </ul>,
          { type: 'h3', text: 'Design strategies for scale and clarity' },
          <ul className="list-disc pl-5 flex flex-col gap-1 text-copy-m font-normal leading-loose text-fg-secondary">
            <li>In AR, visual cues communicated the central building's volume immediately</li>
            <li>VR Wadis were crafted to feel vast but navigable</li>
            <li>On the interactive map, each district had a distinct identity to clarify the development</li>
          </ul>,
          { type: 'h3', text: 'Interaction patterns' },
          <ul className="list-disc pl-5 flex flex-col gap-1 text-copy-m font-normal leading-loose text-fg-secondary">
            <li>Shared AR experience was guided by a single narrator to preserve narrative clarity</li>
            <li>Table placement and mirrored screens enabled multiple participants and passersby to engage naturally</li>
            <li>iPad ensured non-headset participants remained connected and curious</li>
            <li>Consistent interaction patterns across touch, AR/VR controllers, and gamepad/mouse allowed seamless transitions between experiences</li>
          </ul>,
          <>Every decision balanced technical feasibility, user experience, and storytelling impact, creating a coherent and immersive journey across all six experiences.</>,
          { type: 'h3', text: 'Approaches' },
          <>Our initial plan let users choose solo or shared modes on the AR table, but friction points in selecting the app, scanning the AR tracker, and placing the 3D model slowed engagement. I streamlined it into a single, presenter-led, pre-calibrated flow, keeping participation smooth and intuitive.</>,
          <>This approach reflected a broader principle applied across all six experiences. Every interaction was designed to minimize friction, maximize clarity, and preserve narrative flow, whether users were engaging with AR, VR, touchscreens, or the digital twin.</>,
          <><strong>Key decisions</strong></>,
          <ul className="list-disc pl-5 flex flex-col gap-1 text-copy-m font-normal leading-loose text-fg-secondary">
            <li><strong>Magic Leap AR table:</strong> Single guided flow; iPad mirrored the session for observers, sparking curiosity</li>
            <li><strong>VR walkthrough:</strong> Mirrored wall display ensured bystanders could follow without interrupting immersion</li>
            <li><strong>Interactive map and Digital Twin:</strong> Simplified navigation, optimised for touch, mouse, and gamepad</li>
            <li><strong>Film installation:</strong> Carefully timed pacing and spatial cues guided large groups through the story</li>
          </ul>,
          { type: 'callout', label: 'UX Contribution', body: 'I reframed the iPad companion into a deliberate engagement strategy' },
        ],
      },
      {
        id:      'measure',
        eyebrow: 'Measure & Review',
        heading: 'Iterating live under pressure',
        body: [
          <>As the sole designer on-site, I led AR sessions, calibrated headsets, and resolved technical issues in real time. Being present allowed me to observe participant behavior directly and refine the flow on the spot, adjusting pacing and interactions based on audience responses.</>,
          <><strong>Impact</strong></>,
          <>The presenter-led AR sessions, lasting around ten minutes each, retained nearly all participants from start to finish. Observers remained engaged through mirrored iPad and VR displays, allowing multiple attendees to follow the experience without interrupting immersion. The pavilion consistently ran at full capacity throughout the week, and the project’s success extended beyond the event, establishing a multi-year partnership with the client and generating strong, positive feedback from attendees.</>,
          <><strong>Reflection</strong></>,
          <>Leading live, presenter-led AR sessions provided unique insights. Being in the room allowed me to observe participant behavior in real time. This enabled rapid decision-making and immediate iteration. These moments confirmed design assumptions, revealed subtle engagement patterns, and ensured that the experiences delivered exactly as intended.</>,
          <>This project reinforced the importance of system-level UX thinking, multi-device interaction consistency, and design-for-context. It demonstrated that even under tight deadlines and logistical constraints, thoughtful design can create immersive, engaging, and memorable experiences for high-stakes audiences.</>,
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
    placeholderAsset: 'Asset — coming soon',
    flowLabels: {
      initial: 'Initial flow for the shared AR experience',
      initialAria: 'Initial flow for the shared AR experience — friction points highlighted in red',
      shipped: 'Shipped flow for the shared AR experience',
      shippedAria: 'Shipped flow for the shared AR experience — presenter actions highlighted in gold',
    },
    captions: {
      xbox:      'Xbox controller keybindings designed for the Digital Twin exploration.',
      magicLeap: 'Magic Leap 2 headset and controller used for the AR experience.',
      building:  'Two-storey building constructed by our client specifically for the event.',
      tracker:   "This AR tracker ensured sensor reliability while remaining brand-compliant.",
      floorPlan: 'Floor plan of the experience space with the six installations.',
      arSession: 'Leading a presenter-led AR session at MIPIM.',
      satellite: 'Representation of the sheer size of the development site.',
      map:       'Interact with the map to explore time zones.',
    },
  },

  fr: {
    skipToMain:  'Aller au contenu principal',
    pageTitle:   'Expériences XR • Atelier Digital',
    label:       'Étude de cas • Réalité étendue',
    title:       'Révéler un Mégaprojet',
    tagline:     "L'architecture de l'engagement",
    stats: [
      { countTo: 6, decimals: 0, prefix: '', suffix: '',           label: 'Apps' },
      { countTo: 3, decimals: 0, prefix: '', suffix: ' XR',        label: 'Expériences' },
      { countTo: 1, decimals: 0, prefix: '', suffix: ' UX',        label: 'Designer' },
      { countTo: 6, decimals: 0, prefix: '', suffix: ' semaines',  label: 'Pour livrer' },
    ],
    sections: [
      {
        id:      'team',
        eyebrow: "L'équipe",
        heading: 'Plusieurs fuseaux horaires',
        body: [
          <>Notre équipe de cinq personnes, répartie dans quatre pays, a assuré la <strong>conception et le développement</strong> de bout en bout de toutes les applications. La production vidéo a été prise en charge par notre équipe studio.</>,
          <>Nous avons fonctionné en <strong>sprints de deux semaines</strong> avec des <strong>réunions quotidiennes</strong> alignées sur les horaires du Royaume-Uni, permettant :</>,
          <ul className="list-disc pl-5 flex flex-col gap-1 text-copy-m font-normal leading-loose text-fg-secondary">
            <li><strong>Coordination</strong> sur l'avancement du design et du développement</li>
            <li>Identification précoce des <strong>blocages</strong></li>
            <li>Navigation rapide des <strong>compromis</strong> et <strong>contraintes techniques</strong></li>
            <li>Itération du design en réponse aux <strong>retours</strong></li>
          </ul>,
          { type: 'h3', text: 'Mon rôle' },
          <>En tant que <strong>seul designer UX/UI</strong>, j'ai dirigé la stratégie design de ce projet d'envergure, en assurant cohérence et clarté sur l'ensemble des expériences. J'ai collaboré étroitement avec les développeurs, ingénieurs et chefs de projet, instaurant un flux de travail fluide entre des équipes diverses. J'ai pris des décisions clés équilibrant les besoins utilisateurs et les contraintes techniques, faisant avancer le processus de design efficacement, même dans des délais serrés.</>,
        ],
        map: true,
      },
      {
        id:      'why',
        eyebrow: 'Pourquoi',
        heading: 'Une seule chance de marquer les esprits',
        body: [
          <>Nous avons eu l'opportunité de révéler l'un des projets urbains les plus ambitieux jamais proposés à un <strong>public mondial d'investisseurs</strong>. Chaque détail devait rendre l'ampleur et l'ambition du projet immédiatement tangibles.</>,
          { type: 'callout', variant: 'goal', label: "L'objectif", body: <>Faire en sorte que chaque visiteur reparte <strong>convaincu</strong> qu'il s'agissait d'une <strong>redéfinition de ce qu'une ville pouvait être</strong>.</> },
        ],
      },
      {
        id:      'who',
        eyebrow: 'Qui',
        heading: 'Un public à enjeux élevés',
        body: [
          <>J'avais précédemment conçu des événements à grande échelle dans l'industrie tech (100k+ participants). Pour adapter les expériences à ce public à fort investissement et contraintes de temps, j'ai rapidement collaboré avec un collègue expérimenté dans les événements Architecture, Ingénierie et Construction, en analysant les comportements délégués, les schémas d'engagement et les facteurs de décision.</>,
          <>Avec des pass délégués à 2 500–3 000 € chacun, concevoir pour un public aussi investi et contraint par le temps exigeait clarté, engagement et efficacité.</>,
          <>Nous avons ciblé trois types de public :</>,
          <ul className="list-none flex flex-col gap-2 text-copy-m font-normal leading-loose text-fg-secondary">
            <li><strong>Les investisseurs</strong> À la recherche de crédibilité, d'ampleur et d'opportunités d'investissement claires.</li>
            <li><strong>Les bâtisseurs</strong> Promoteurs et architectes cherchant des moyens concrets de s'impliquer.</li>
            <li><strong>Les visionnaires</strong> Décideurs et stratèges axés sur l'impact à long terme et l'héritage.</li>
          </ul>,
          { type: 'callout', label: 'UX Insight', body: <>Nous devions concevoir des expériences capables de <strong>s'adapter à différentes tailles de groupes</strong> et <strong>préférences d'engagement</strong>, tout en maintenant la <strong>clarté narrative</strong> et l'<strong>intégrité du storytelling</strong>.</> },
        ],
      },
      {
        id:      'when-where',
        eyebrow: 'Où et quand',
        heading: 'MIPIM, Cannes',
        body: [
          <>Les expériences ont été déployées au plus grand événement mondial dédié à l'immobilier et à l'investissement, accueilli pendant <strong>une semaine</strong> au Palais des Festivals.</>,
          <>Notre client a construit un <strong>pavillon sur deux niveaux</strong> dédié à la présentation du développement. Compte tenu de l'envergure de l'événement, les expériences devaient <strong>capter l'attention rapidement</strong> et produire un impact en quelques minutes.</>,
          { type: 'callout', label: 'Considération UX Spatiale', body: "La disposition a été conçue pour guider les visiteurs fluidement d'une expérience à l'autre, en maximisant l'engagement." },
        ],
      },
      {
        id:      'what',
        eyebrow: 'Quoi',
        heading: 'Des expériences complémentaires',
        body: [
          <>Plutôt qu'une grande installation unique, nous avons conçu <strong>six expériences distinctes et complémentaires</strong>. Chacune servait de point d'entrée vers différents aspects de l'histoire du projet.</>,
        ],
        footerCallout: { label: 'Contribution UX/UI :', body: <>J'ai conçu l'UI et les patterns d'interaction pour les cinq expériences interactives. Cela incluait tout, des <strong>flux contrôleurs AR/VR</strong> aux interactions, à l'onboarding et aux visuels alignés avec la <strong>disposition du pavillon</strong> et la narration globale.</> },
        experiences: [
          {
            number: '01',
            title:  'Installation audiovisuelle',
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
            body:   "Une expérience de réalité augmentée partagée où les visiteurs pouvaient explorer le bâtiment central couche par couche.",
          },
          {
            number: '04',
            title:  'Application compagnon en temps réel',
            tech:   'iPad',
            body:   "Une vue miroir en temps réel de l'expérience AR, garantissant l'engagement des participants sans casque.",
          },
          {
            number: '05',
            title:  'Expérience VR',
            tech:   'Meta Quest 3 • Unreal',
            body:   "Une visite immersive des Wadis (les vallées au cœur du développement), permettant aux visiteurs de les découvrir à hauteur d'homme.",
          },
          {
            number: '06',
            title:  'Exploration du jumeau numérique',
            tech:   'Unreal Engine',
            body:   "Une exploration autonome de l'ensemble du développement et de ses quartiers.",
          },
        ],
      },
      {
        id:      'prioritise',
        eyebrow: 'Prioriser et choisir',
        heading: 'Décisions sous contraintes',
        body: [
          <>La table AR a été priorisée comme pièce maîtresse, en raison de l'engagement attendu et des contraintes logistiques (construite en Arabie Saoudite, expédiée en France). Nous l'avons conçue pour le confort et les besoins matériels, incluant chaque casque Magic Leap, contrôleur et unité de traitement.</>,
          <>Au centre, j'ai conçu un marqueur AR dérivé du logo client. Sa taille et son motif étaient critiques : les capteurs Magic Leap et les caméras iPad devaient le détecter de manière fiable, maintenant les images 3D précisément ancrées même lors des déplacements des utilisateurs.</>,
          { type: 'h3', text: 'Ce qui n\'a pas été retenu' },
          <>Nous avons exploré une expérience AR multijoueur, mais avons choisi de ne pas la poursuivre. Bien que prometteuse, elle nécessitait plus d'appareils que nous ne pouvions tester correctement, et les conditions réseau dans des environnements à forte densité étaient trop imprévisibles.</>,
          <>Un élément que nous avons conservé est le <strong>pointeur laser coloré</strong> issu de ce concept initial. Chaque participant se voyait attribuer une couleur distincte, lui permettant de voir le point de focus des autres pendant l'expérience partagée.</>,
          { type: 'h3', text: 'Ce qui a été livré en plus' },
          <>Non prévu initialement dans le brief, j'ai poussé pour développer une <strong>application compagnon iPad</strong>, car elle apportait de la valeur en <strong>engageant les participants sans casque</strong> et en enrichissant l'expérience globale.</>,
          { type: 'h3', text: 'Ce qui a été simplifié' },
          <>La carte interactive a été intentionnellement simplifiée pour prioriser la clarté et la fiabilité plutôt que des fonctionnalités supplémentaires.</>,
          { type: 'callout', label: 'UX Insight', body: "Chaque contrainte est devenue une opportunité de maximiser l'engagement et la narration." },
        ],
      },
      {
        id:      'solve',
        eyebrow: 'Concevoir',
        heading: 'La forme suit la contrainte',
        body: [
          <>Chaque expérience avait ses propres <strong>défis techniques et spatiaux</strong>, qui ont façonné les décisions de design :</>,
          <ul className="list-disc pl-5 flex flex-col gap-1 text-copy-m font-normal leading-loose text-fg-secondary">
            <li><strong>Écran transparent :</strong> Devait afficher l'interface et laisser voir l'espace derrière</li>
            <li><strong>AR (Magic Leap 2) :</strong> Assets 3D optimisés pour les contraintes de l'appareil ; conçu pour cinq participants simultanément</li>
            <li><strong>Application iPad :</strong> Miroir de la session AR en temps réel pour les participants sans casque, renforçant l'engagement et la curiosité</li>
            <li><strong>VR (Meta Quest 3) :</strong> Visite immersive à échelle humaine, avec vue miroir pour les observateurs</li>
            <li><strong>Jumeau numérique :</strong> Conçu pour l'accessibilité multiplateforme</li>
          </ul>,
          { type: 'h3', text: "Stratégies de design pour l'échelle et la clarté" },
          <ul className="list-disc pl-5 flex flex-col gap-1 text-copy-m font-normal leading-loose text-fg-secondary">
            <li>En AR, des repères visuels communiquaient immédiatement le volume du bâtiment central</li>
            <li>Les Wadis en VR ont été conçus pour paraître vastes mais navigables</li>
            <li>Sur la carte interactive, chaque quartier avait une identité distincte pour clarifier le développement</li>
          </ul>,
          { type: 'h3', text: "Patterns d'interaction" },
          <ul className="list-disc pl-5 flex flex-col gap-1 text-copy-m font-normal leading-loose text-fg-secondary">
            <li>L'expérience AR partagée était guidée par un seul narrateur pour préserver la clarté narrative</li>
            <li>La disposition de la table et les écrans en miroir permettaient à plusieurs participants et passants de s'engager naturellement</li>
            <li>L'iPad maintenait les participants sans casque connectés et curieux</li>
            <li>Des patterns d'interaction cohérents sur tactile, contrôleurs AR/VR et manette/souris permettaient des transitions fluides entre les expériences</li>
          </ul>,
          <>Chaque décision équilibrait faisabilité technique, expérience utilisateur et impact narratif, créant un parcours cohérent et immersif.</>,
          { type: 'h3', text: 'Approches' },
          <>Notre plan initial laissait les utilisateurs choisir entre les modes solo et partagé sur la table AR, mais des points de friction dans la sélection de l'application, le scan du marqueur AR et le placement du modèle 3D ralentissaient l'engagement. J'ai simplifié en un flux unique, guidé par un présentateur et pré-calibré, gardant la participation fluide et intuitive.</>,
          <>Cette approche reflétait un principe plus large appliqué à l'ensemble des six expériences. Chaque interaction était conçue pour minimiser les frictions, maximiser la clarté et préserver le flux narratif, que les utilisateurs s'engagent avec l'AR, la VR, les écrans tactiles ou le jumeau numérique.</>,
          <><strong>Décisions clés</strong></>,
          <ul className="list-disc pl-5 flex flex-col gap-1 text-copy-m font-normal leading-loose text-fg-secondary">
            <li><strong>Table AR Magic Leap :</strong> Flux guidé unique ; l'iPad reflétait la session pour les observateurs, suscitant la curiosité</li>
            <li><strong>Visite VR :</strong> L'écran mural en miroir permettait aux passants de suivre sans interrompre l'immersion</li>
            <li><strong>Carte interactive et jumeau numérique :</strong> Navigation simplifiée, optimisée pour le tactile, la souris et la manette</li>
            <li><strong>Installation audiovisuelle :</strong> Un rythme soigneusement calibré et des repères spatiaux guidaient les grands groupes</li>
          </ul>,
          { type: 'callout', label: 'Contribution UX', body: "J'ai retravaillé le compagnon iPad, initialement une solution de contournement, en une stratégie d'engagement délibérée." },
        ],
      },
      {
        id:      'measure',
        eyebrow: 'Mesurer et analyser',
        heading: 'Itérer en direct, sous pression',
        body: [
          <>En tant que seul designer sur place, j'ai animé les sessions AR, calibré les casques et résolu les problèmes techniques en temps réel. Ma présence m'a permis d'observer directement le comportement des participants et d'affiner le flux sur le moment, en ajustant le rythme et les interactions selon les réactions du public.</>,
          <><strong>Impact</strong></>,
          <>Les sessions AR guidées par le présentateur, d'une durée d'environ dix minutes, retenaient presque tous les participants du début à la fin. Les observateurs restaient engagés grâce aux écrans iPad et VR en miroir. Le pavillon fonctionnait à pleine capacité tout au long de la semaine, et le succès du projet a posé les bases d'un partenariat pluriannuel avec le client, générant des retours très positifs des participants.</>,
          <><strong>Réflexion</strong></>,
          <>Animer des sessions AR en présentiel a fourni des enseignements uniques. Être dans la salle m'a permis d'observer le comportement des participants en temps réel, de prendre des décisions rapides et d'itérer immédiatement. Ces moments ont confirmé les hypothèses de design, révélé des schémas d'engagement subtils et garanti que les expériences se déroulaient exactement comme prévu.</>,
          <>Ce projet a renforcé l'importance de la réflexion UX au niveau système, de la cohérence des interactions multi-appareils et du design adapté au contexte. Il a démontré que même sous des délais serrés et des contraintes logistiques, un design réfléchi peut créer des expériences immersives, engageantes et mémorables pour des publics à forts enjeux.</>,
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
    placeholderAsset: 'Asset — à venir',
    flowLabels: {
      initial: "Flux initial de l'expérience AR partagée",
      initialAria: "Flux initial de l'expérience AR partagée — points de friction mis en évidence en rouge",
      shipped: "Flux du produit livré",
      shippedAria: "Flux du produit livré — actions du présentateur mises en évidence en doré",
    },
    captions: {
      xbox:      "Mappings de la manette Xbox pour explorer le jumeau numérique.",
      magicLeap: "Casque et contrôleur Magic Leap 2 utilisés pour l'expérience AR.",
      building:  "Pavillon sur deux étages construit par notre client spécifiquement pour l'événement.",
      tracker:   "Le tracker AR garantit la fiabilité des capteurs tout en respectant l'identité de la marque.",
      floorPlan: "Plan de l'espace d'exposition avec les six installations.",
      arSession: "Animation d'une session AR en présentiel au MIPIM.",
      satellite: "Représentation de la taille immense du site de développement.",
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


// ── Flowchart SVG translation ─────────────────────────────────────────────────
const SVG_FR = {
  'INITIAL PLAN':                           'PLAN INITIAL',
  'SHIPPED PRODUCT':                        'PRODUIT LIVRÉ',
  'Approaches AR table':                    'S\'approche de la table AR',
  'Puts on headset':                        'Enfile le casque',
  'Selects app':                            'Sélectionne l\'application',
  'Shared or ':                             'Partagée ou ',
  'Solo?':                                  'Solo\u00A0?',
  'Solo':                                   'Solo',
  'Enters hidden presenter mode':           'Accède au mode présentateur',
  'Scans AR tracker':                       'Scanne le tracker AR',
  'Leads experience layer by layer':        'Présente l\'expérience',
  'Follows onboarding &#38; controls tutorial': 'Suit le tutoriel',
  'Explores master plan independently':     'Explore le projet en autonomie',
  'Places plinth on table':                 'Pose le model 3D sur la table',
  'or Stops?':                              'ou Stop\u00A0?',
  'Shared':                                 'Partagée',
  'Continues ':                             'Continue ',
  'Continues':                              'Continue',
  'Stops':                                  'Stop',
  'Presenter gives access to next visitor': 'Donne accès au visiteur suivant',
  'Gives access to next visitor':           'Donne accès au visiteur suivant',
  'Takes off headset &#38; compute pack':   'Retire le casque et le pack',
  'Returns controller':                     'Rend le contrôleur',
  'Shared session ends':                    'Fin de session partagée',
  'Solo session ends':                      'Fin de session solo',
  'Locks device to app &#38; calibrates headsets': 'Verrouille l\'app et calibre les casques',
  'Assigns headset &#38; compute pack':     'Attribue casque et pack de calcul',
  'Actions':                                'Actions',
  'Decisions':                              'Décisions',
  'Main path':                              'Flux principal',
  'Participant':                            'Participant',
  'Presenter':                              'Présentateur',
  'Friction':                               'Friction',
};

// ── Flowchart lightbox ────────────────────────────────────────────────────────
function FlowchartLightbox({ slides, initialIndex, lang, onClose }) {
  const [index, setIndex]   = useState(initialIndex);
  const [zoom, setZoom]     = useState(1);
  const [pan, setPan]       = useState({ x: 0, y: 0 });
  const indexRef            = useRef(initialIndex);
  const zoomRef             = useRef(1);
  const panRef              = useRef({ x: 0, y: 0 });
  const dialogRef           = useRef(null);
  const closeButtonRef      = useRef(null);
  const returnFocusRef      = useRef(typeof document !== 'undefined' ? document.activeElement : null);

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
      style={{ animation: 'fade-in 0.2s ease both', background: 'rgba(0,0,0,0.95)' }}
      onClick={onClose}
    >
      {/* Chart */}
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
        dangerouslySetInnerHTML={{ __html: slides[index].lightboxSvg }}
      />

      {/* Counter */}
      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-tooltip font-medium text-white/[0.64] tabular-nums pointer-events-none">
        {index + 1} / {slides.length}
      </span>

      {/* Close */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        aria-label={closeLbl}
        data-spring
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/[0.64]"
      >
        <img src={imgClose} alt="" width={20} height={20} className="brightness-0 invert" />
      </button>

      {/* Prev */}
      <button
        data-spring
        onClick={(e) => { e.stopPropagation(); go(Math.max(0, index - 1)); }}
        disabled={index === 0}
        aria-label={prevLbl}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/[0.64]"
      >
        <img src={imgChevronLeft} alt="" width={20} height={20} className="brightness-0 invert" />
      </button>

      {/* Next */}
      <button
        data-spring
        onClick={(e) => { e.stopPropagation(); go(Math.min(slides.length - 1, index + 1)); }}
        disabled={index === slides.length - 1}
        aria-label={nextLbl}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/[0.64]"
      >
        <img src={imgChevronRight} alt="" width={20} height={20} className="brightness-0 invert" />
      </button>
    </div>,
    document.body
  );
}

function FlowSection({ isDark, lang, labels }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const slides = useMemo(() => {
    const configs = [
      { raw: rawFlowInitial,  label: labels.initial,  ariaLabel: labels.initialAria,  expandViewBox: null },
      { raw: rawFlowShipped,  label: labels.shipped,   ariaLabel: labels.shippedAria,  expandViewBox: '-154 0 621 1053' },
    ];
    return configs.map(({ raw, label, ariaLabel, expandViewBox }) => {
      let svg = translateFlowSvg(raw, lang)
        .replace(/(<svg[^>]*)\swidth="[^"]*"\sheight="[^"]*"/, `$1 role="img" aria-label="${ariaLabel}" style="width:100%;height:auto"`)
        .replace(/<rect width="\d+" height="\d+" fill="white"\/>/, '');
      if (expandViewBox) svg = svg.replace(/viewBox="[^"]*"/, `viewBox="${expandViewBox}"`);
      if (isDark) {
        svg = svg
          .replace(/(<svg[^>]*>)/, '$1<style>text,tspan{fill:rgba(255,255,255,0.85)}</style><rect width="100%" height="100%" fill="#141414"/>')
          .replace(/fill="white" stroke=/g,        'fill="#141414" stroke=')
          .replace(/stroke="#FF0000"/g,             'stroke="#C0392B"')
          .replace(/fill="#1E1E1E"/g,               'fill="white" fill-opacity="0.8"')
          .replace(/fill="black" fill-opacity="0\.8"/g, 'fill="white" fill-opacity="0.8"')
          .replace(/fill="black"/g,                 'fill="white" fill-opacity="0.8"');
      } else {
        svg = svg
          .replace(/fill="#815A00" stroke="#815A00"/g, 'fill="#C9A84C" stroke="#C9A84C"')
          .replace(/(<(?:text|tspan)\b[^>]*)fill="white"/g, '$1fill="#1A1200"');
      }
      let lightboxSvg = svg
        .replace(/style="width:100%;height:auto"/, 'style="height:80vh;width:auto;max-width:90vw;display:block"')
        .replace(/<rect width="100%" height="100%"[^>]*\/>/, '');
      if (!isDark) {
        lightboxSvg = lightboxSvg
          .replace(/fill="#1A1200"/g, 'fill="white"')
          .replace(/fill="black"/g,   'fill="white"');
      }
      return { svg, lightboxSvg, label, ariaLabel };
    });
  }, [isDark, lang, labels]);

  const expandLbl = lang === 'fr' ? 'Agrandir le diagramme' : 'Expand chart';

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          {slides.map((slide, i) => (
            <figure key={slide.label} className="flex flex-col gap-2 flex-1">
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`${expandLbl}: ${slide.ariaLabel}`}
                className="w-full text-left cursor-zoom-in rounded-radius-4 sm:rounded-radius-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
              >
                <div className="bg-bg-page rounded-radius-4 sm:rounded-radius-5 p-4 w-full overflow-hidden" dangerouslySetInnerHTML={{ __html: slide.svg }} />
              </button>
              <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{slide.label}</figcaption>
            </figure>
          ))}
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

function translateFlowSvg(svg, lang) {
  if (lang !== 'fr') return svg;
  return Object.entries(SVG_FR).reduce(
    (s, [en, fr]) => s.replaceAll(`>${en}<`, `>${fr}<`),
    svg
  );
}

// ── Shared styles ─────────────────────────────────────────────────────────────
const bodyText = 'text-copy-m font-normal leading-loose text-fg-secondary';

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
        <div className="bg-tooltip-bg text-fg-primary-inverse text-tooltip font-light leading-[1.2] px-2 py-[4px] rounded-radius-2 whitespace-nowrap ring-1 ring-white/20 dark:ring-black/10">{name}</div>
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
          : <span className="text-[7px] font-bold text-fg-muted text-center leading-tight px-[2px]">{name}</span>
        }
      </button>
    </div>
  );
}

function XRToolsSection({ label, categories }) {
  return (
    <div className="rounded-radius-6 bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] px-5 py-4 flex flex-col gap-4 sm:w-fit">
      <p className="text-label-s font-semibold leading-[1.4] uppercase tracking-wider text-fg-secondary">{label}</p>
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
  );
}

// ── Desktop secondary nav ─────────────────────────────────────────────────────
function SecondaryNav({ sections, activeId, onNavigate }) {
  return (
    <nav aria-label="Page sections" className="hidden md:block sticky top-16 self-start z-10 w-44 shrink-0 pt-28">
      <ol className="grid gap-2" style={{ gridTemplateColumns: 'max-content' }}>
        {sections.map((s) => {
          const isActive = activeId === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() => onNavigate(s.id)}
                aria-current={isActive ? 'location' : undefined}
                className={`relative text-tooltip leading-snug py-2 px-2 rounded-radius-2 text-left w-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                  isActive
                    ? 'text-fg-primary font-semibold bg-black/[0.04] dark:bg-white/[0.06]'
                    : 'text-fg-muted font-normal hover:text-fg-primary hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                }`}
              >
                <span aria-hidden="true" className="font-semibold invisible block select-none whitespace-nowrap">{s.eyebrow}</span>
                <span className="absolute inset-0 py-2 px-2 whitespace-nowrap">{s.eyebrow}</span>
              </button>
            </li>
          );
        })}
      </ol>
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
    <nav aria-label="Page sections" className="w-full backdrop-blur-[4px] bg-white/[0.64] dark:bg-black/[0.64] rounded-radius-6 shadow-xs dark:ring-1 dark:ring-white/[0.16] p-[10px]">
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
                      ? 'bg-black/[0.04] dark:bg-white/[0.04] text-fg-primary font-semibold'
                      : 'text-fg-muted hover:text-fg-primary hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
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

// ── Experience card ───────────────────────────────────────────────────────────
function ExperienceCard({ exp, lang }) {
  return (
    <div className="flex gap-6 sm:gap-8 py-6 sm:py-8">
      <span className="text-label-s font-semibold leading-[1.4] uppercase tracking-wider shrink-0 pt-0.5 gold-text">{exp.number}</span>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-h3 font-semibold leading-snug text-fg-primary">{exp.title}</h3>
          <span className="text-overline-s font-medium leading-[1.4] uppercase tracking-wider text-fg-muted">{exp.tech}</span>
        </div>
        {(Array.isArray(exp.body) ? exp.body : [exp.body]).map((para, i) => (
          <p key={i} className="text-copy-m font-normal leading-relaxed text-fg-muted">{para}</p>
        ))}
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
          <span className="text-[15px] sm:text-[16px] font-medium text-fg-primary">{m.role}</span>
          <span className="text-copy-s sm:text-[15px] text-fg-muted text-right shrink-0">{m.detail}</span>
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
      setScrolledDown(firstEl.getBoundingClientRect().top < 150);
      setAtBottom(lastEl.getBoundingClientRect().bottom < 200);
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

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-radius-2 focus:ring-2 focus:ring-border-focus focus:bg-white focus:text-fg-primary focus:outline-none font-medium">
        {t.skipToMain}
      </a>

      <main
        id="main-content"
        aria-label={t.title}
        tabIndex={-1}
        className={`bg-bg-page min-h-screen transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      >

        {/* ── Hero ── */}
        <section
          aria-labelledby="xr-hero-heading"
          className="relative min-h-screen flex flex-col bg-bg-page overflow-hidden"
        >
          <img src={mipimPhoto} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-700" style={{ opacity: heroReady ? 1 : 0, background: 'linear-gradient(to bottom, rgba(20,20,20,0.2) 0%, rgba(20,20,20,1) 100%)' }} />

          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 mt-auto relative z-10 pb-24 sm:pb-28 lg:pb-32 pt-40 transition-opacity duration-700" style={{ opacity: heroReady ? 1 : 0 }}>
            <div className="flex flex-col gap-6 sm:gap-8">
              <p className="text-label-s font-semibold leading-[1.4] uppercase tracking-wider text-white">
                {t.label}
              </p>
              <h1
                id="xr-hero-heading"
                className="text-display-1 font-bold leading-tight text-white"
              >
                {t.title}
              </h1>
              <p className="text-display-2 font-semibold leading-tight text-white/90 max-w-2xl lg:whitespace-nowrap">
                {t.tagline}
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-6 sm:flex sm:flex-wrap sm:gap-x-16 mt-2" aria-label="Key figures">
                {t.stats.map((s, i) => (
                  <li key={i} className="flex flex-col gap-1">
                    <span className="text-display-2 font-semibold leading-tight tabular-nums whitespace-nowrap" style={{ color: GOLD }}>
                      <AnimatedStat prefix={s.prefix} countTo={s.countTo} suffix={s.suffix} ready={heroReady} />
                    </span>
                    <span className="text-label-s font-semibold leading-[1.4] uppercase tracking-wider text-white/[0.64]">{s.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Content sections ── */}
        <div className="px-6 flex flex-col items-center">
          <div className="flex items-start gap-10 w-full max-w-6xl">
            {/* Left spacer — mirrors the right nav width to keep content centred */}
            <div className="hidden md:block w-20 shrink-0" />

            {/* Main column */}
            <div className="flex-1 min-w-0">
              {t.sections.map((section, si) => (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`${section.id}-heading`}
                  tabIndex={-1}
                  className="py-16 sm:py-20 lg:py-24 scroll-mt-24 focus-visible:outline-none flex flex-col gap-8 sm:gap-10 lg:gap-12"
                >
                  {/* Eyebrow + heading */}
                  <div className="flex flex-col gap-3">
                    <p className="text-label-s font-semibold leading-[1.4] uppercase tracking-wider gold-text">
                      {section.eyebrow}
                    </p>
                    <h2
                      id={`${section.id}-heading`}
                      className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold leading-tight text-fg-primary"
                    >
                      {section.heading}
                    </h2>
                  </div>

                  {/* Body paragraphs — first para, then map (if any), then rest */}
                  <div className="flex flex-col gap-8 max-w-3xl">
                    {section.body.slice(0, 1).map((p, i) => (
                      p?.type === 'ul'
                        ? <div key={i}>{p}</div>
                        : <p key={i} className={bodyText}>{p}</p>
                    ))}
                  </div>


                  {/* World map — between para 1 and the rest */}
                  {section.map && (
                    <div className="max-w-2xl mx-auto w-full my-6 sm:my-8">
                      <WorldMapDots isDark={isDark} lang={lang} />
                    </div>
                  )}

                  {section.body.length > 1 && (
                    <div className={`flex flex-col gap-8 max-w-3xl${section.map ? ' mt-4' : ''}`}>
                      {section.body.slice(1).map((p, i) => (
                        <Fragment key={i}>
                          {/* Satellite photo — after para 1 of Why */}
                          {section.id === 'why' && i === 0 && (
                            <figure className="flex flex-col gap-2 max-w-lg mx-auto">
                              <img
                                src={satelliteSitePhoto}
                                alt="Satellite view of the development site"
                                className="w-full rounded-radius-4 sm:rounded-radius-5 object-cover"
                              />
                              <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{t.captions.satellite}</figcaption>
                            </figure>
                          )}
                          {/* AR session photo — before Reflection text in Measure */}
                          {section.id === 'measure' && i === 4 && (
                            <figure className="flex flex-col gap-2 max-w-lg mx-auto">
                              <img
                                src={eventPresentationPhoto}
                                alt="Leading a presenter-led AR session at MIPIM"
                                className="w-full rounded-radius-4 sm:rounded-radius-5 object-cover"
                              />
                              <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{t.captions.arSession}</figcaption>
                            </figure>
                          )}
                          {/* Xbox keybinding — after list in Solve */}
                          {section.id === 'solve' && i === 1 && (
                            <figure className="flex flex-col gap-2">
                              <div className="dark bg-bg-page rounded-radius-4 sm:rounded-radius-5 p-6"
                                   dangerouslySetInnerHTML={{ __html: xboxSvg }} />
                              <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{t.captions.xbox}</figcaption>
                            </figure>
                          )}
                          {/* Flowcharts — after Approaches heading in Solve */}
                          {section.id === 'solve' && i === 8 && (
                            <FlowSection isDark={isDark} lang={lang} labels={t.flowLabels} />
                          )}
                          {section.id === 'prioritise' && i === 0 && (
                            <figure className="flex flex-col gap-2 max-w-sm mx-auto">
                              <div className="grid" style={{ gridTemplateColumns: '4fr 1fr' }}>
                                <img src={magicLeapPhoto} alt="Magic Leap 2 AR glasses" className="w-full rounded-radius-3 sm:rounded-radius-4 object-cover" />
                                <img src={magicLeapControllerPhoto} alt="Magic Leap 2 controller" className="w-full rounded-radius-3 sm:rounded-radius-4 object-cover" />
                              </div>
                              <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{t.captions.magicLeap}</figcaption>
                            </figure>
                          )}
                          {section.id === 'when-where' && i === 0 && (
                            <figure className="flex flex-col gap-2 max-w-lg mx-auto">
                              <img
                                src={eventBuildingPhoto}
                                alt="Two-storey building constructed by our client at MIPIM"
                                className="w-full rounded-radius-4 sm:rounded-radius-5 object-cover"
                              />
                              <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{t.captions.building}</figcaption>
                            </figure>
                          )}
                          {section.id === 'prioritise' && i === 1 && (
                            <figure className="flex flex-col gap-2 max-w-sm mx-auto">
                              <img src={tableTopLogo} alt="Client logo design on the AR table top" className="w-full rounded-radius-4 sm:rounded-radius-5 object-cover dark:[filter:invert(0.92)_hue-rotate(180deg)]" />
                              <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{t.captions.tracker}</figcaption>
                            </figure>
                          )}
                          {p?.type === 'callout'
                            ? p.variant === 'goal'
                              ? (
                                <div className="mt-6 -mb-4 rounded-radius-4 bg-feedback-success-bg border border-feedback-success-border px-5 py-4 flex flex-col gap-3">
                                  <span className="text-overline-s font-medium leading-[1.4] uppercase tracking-wider text-feedback-success-fg">{p.label}</span>
                                  <p className={bodyText}>{p.body}</p>
                                </div>
                              )
                              : (
                              <div className="mt-6 -mb-4 rounded-radius-4 bg-feedback-warning-bg border border-feedback-warning-border px-5 py-4 flex flex-col gap-3">
                                <span className="text-overline-s font-medium leading-[1.4] uppercase tracking-wider text-feedback-warning-fg">{p.label}</span>
                                <p className={bodyText}>{p.body}</p>
                              </div>
                            )
                            : p?.type === 'h3'
                              ? <h3 className="mt-4 text-h3 font-semibold leading-snug text-fg-primary">{p.text}</h3>
                            : p?.type === 'ul'
                              ? <div>{p}</div>
                              : <p className={bodyText}>{p}</p>}
                        </Fragment>
                      ))}
                    </div>
                  )}


                  {/* Team table */}
                  {section.team && (
                    <div className="max-w-xl">
                      <TeamTable members={section.team} />
                    </div>
                  )}


                  {/* Event space sketch */}
                  {section.id === 'what' && (
                    <figure className="flex flex-col gap-2 max-w-lg mx-auto">
                      <img
                        src={eventSpacePhoto}
                        alt="Floor plan sketch of the event space showing the six experience locations"
                        className="w-full rounded-radius-4 sm:rounded-radius-5 object-cover dark:[filter:invert(0.92)]"
                      />
                      <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{t.captions.floorPlan}</figcaption>
                    </figure>
                  )}

                  {/* Experience cards grid */}
                  {section.experiences && (
                    <div className="flex flex-col divide-y divide-black/[0.06] dark:divide-white/[0.06] max-w-3xl">
                      {section.experiences.map((exp, i) => (
                        <ExperienceCard key={i} exp={exp} lang={lang} />
                      ))}
                    </div>
                  )}

                  {section.footerCallout && (
                    <div className="mt-6 -mb-4 rounded-radius-4 bg-feedback-warning-bg border border-feedback-warning-border px-5 py-4 flex flex-col gap-3 max-w-3xl">
                      <span className="text-overline-s font-medium leading-[1.4] uppercase tracking-wider text-feedback-warning-fg">{section.footerCallout.label}</span>
                      <div className={bodyText}>{section.footerCallout.body}</div>
                    </div>
                  )}

                </section>
              ))}
              {/* ── Tools row ── */}
              <div className="pb-16 sm:pb-20 flex justify-center">
                <XRToolsSection label={t.toolsLabel} categories={t.toolCategories} />
              </div>
            </div>

            <SecondaryNav sections={t.sections} activeId={activeId} onNavigate={handleNavigate} />
          </div>
        </div>

        {/* ── Outro ── */}
        <div className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
            <Link
              data-spring
              to="/#case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cta-600 hover:bg-cta-700 text-white/95 font-medium text-tag-m leading-[1.2] rounded-full border border-accent-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2"
            >
              <img src={imgArrowRight} alt="" width={16} height={16} className="brightness-0 invert" style={{ transform: 'rotate(180deg)' }} />
              {t.backLabel}
            </Link>
          </div>
        </div>

      </main>

      {/* ── Mobile floating nav ── */}
      <div
        inert={scrolledDown && !atBottom && !scrollingDown ? undefined : true}
        className={`md:hidden fixed bottom-2 left-[68px] right-4 z-40 flex justify-center pointer-events-none transition-opacity duration-300 ${scrolledDown && !atBottom && !scrollingDown ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="pointer-events-auto w-full">
          <MobileSecondaryNav sections={t.sections} activeId={activeId} onNavigate={handleNavigate} />
        </div>
      </div>

      {/* ── Chat button circular wrapper — centred behind the trigger when sec nav is visible ── */}
      <div
        aria-hidden="true"
        className={`md:hidden fixed z-[39] pointer-events-none transition-opacity duration-300 rounded-full backdrop-blur-[4px] bg-white/[0.64] dark:bg-black/[0.64] shadow-xs dark:ring-1 dark:ring-white/[0.16] ${scrolledDown && !atBottom && !scrollingDown ? 'opacity-100' : 'opacity-0'}`}
        style={{ width: 52, height: 52, left: 8, bottom: 8 }}
      />

      <Footer lang={lang} />
    </>
  );
}

export default XRExperiences;
