import { useState, useEffect, useLayoutEffect, useRef, useMemo, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { trackEvent } from '../analytics';
import Footer from '../components/Footer';
import rawGlobe from '../assets/icons/globe-time-zones.svg?raw';
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
          <ul className="list-disc pl-5 flex flex-col gap-1 text-[16px] sm:text-[17px] lg:text-[18px] leading-loose text-[#262626] dark:text-[#adadad]">
            <li><strong>Alignment</strong> on design and development progress</li>
            <li>Early identification of <strong>blockers</strong></li>
            <li>Rapid navigation of <strong>trade-offs</strong> and <strong>technical constraints</strong></li>
            <li>Iteration of design in response to <strong>feedback</strong></li>
          </ul>,
          { type: 'callout', label: 'UX Contribution', body: <>I maintained <strong>Figma as the source of truth</strong> for designs, <strong>Confluence for documentation</strong>, and <strong>Jira for task management</strong>, keeping the team aligned and productive.</> },
        ],
        map: true,
      },
      {
        id:      'why',
        eyebrow: 'Why',
        heading: 'One shot at a first impression',
        body: [
          <>We were given the opportunity to reveal one of the most ambitious urban developments ever proposed, to a <strong>global audience of investors</strong>. Every detail had to make the project's scale and ambition instantly tangible.</>,
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
          <ul className="list-none flex flex-col gap-2 text-[16px] sm:text-[17px] lg:text-[18px] leading-loose text-[#262626] dark:text-[#adadad]">
            <li><strong>Backers</strong> Investors seeking credibility, scale, and clear investable opportunity.</li>
            <li><strong>Builders</strong> Developers and architects looking for tangible ways to engage.</li>
            <li><strong>Visionaries</strong> Policymakers and strategists focused on long-term impact and legacy.</li>
          </ul>,
          { type: 'callout', label: 'UX Insight', body: <>Experiences needed to <strong>flex across group sizes</strong> and engagement styles without losing narrative clarity. Design choices, from the AR presenter flow to mirrored iPad and VR screens, reflected insights from delegate behavior and high-investment audience research.</> },
        ],
      },
      {
        id:      'when-where',
        eyebrow: 'When & Where',
        heading: 'MIPIM, Cannes',
        body: [
          <>Experiences were deployed at the world’s largest real estate and investment event, hosted over <strong>one week</strong> at the Palais des Festivals.</>,
          <>The client built a two-storey pavilion with a ground floor housing two projects. Layout, dwell time, and engagement had to capture attention quickly and leave impact within minutes.</>,
          { type: 'callout', label: 'Spatial UX Consideration', body: 'Clear flow and spatial guidance were essential to direct visitors naturally through all experiences.' },
        ],
      },
      {
        id:      'what',
        eyebrow: 'What',
        heading: 'Complementary experiences',
        body: [
          <>Rather than a single installation, we designed <strong>a system of six experiences</strong>, each a unique entry point into the story.</>,
        ],
        footerCallout: { label: 'UX/UI Contribution:', body: <>I designed the UI and interaction patterns for the five interactive experiences. This included intuitive flows across touch, AR/VR controllers, and mouse/gamepad, micro-interactions and onboarding, and visual flows aligned with the pavilion layout and narrative.</> },
        experiences: [
          {
            number: '01',
            title:  'Film installation',
            tech:   'three LCD walls',
            body:   "A cinematic introduction establishing the project's vision and scale. Narrated and produced in-house, it set the context for everything that followed.",
          },
          {
            number: '02',
            title:  'Interactive map app',
            tech:   'Transparent touchscreen display',
            body:   'A satellite view of the full development, helping visitors understand geographic context and surrounding districts.',
          },
          {
            number: '03',
            title:  'AR Experience',
            tech:   'Magic Leap 2 • Unity',
            body:   'A shared augmented reality experience for up to five participants, revealing the central structure layer by layer.',
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
            body:   'A self-guided exploration of the full development and its districts.',
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
          <>We explored a multiplayer AR experience, but chose not to pursue it. While compelling, it required more devices than we could properly test or troubleshoot. In addition, network conditions at high-density events were unpredictable to rely on.</>,
          <>The iPad companion was planned from the start as a potential value-add, though we did not include it in the client brief. With limited time and complex logistics, we were unsure we could deliver it, but it provided an opportunity to enhance the experience, and so we worked on it hoping to overdeliver.</>,
          <>The interactive map was intentionally scoped back to prioritise clarity and reliability over additional features, ensuring it delivered value without introducing risk.</>,
          { type: 'callout', label: 'UX Insight', body: 'Every constraint became an opportunity to maximize engagement and storytelling.' },
        ],
      },
      {
        id:      'solve',
        eyebrow: 'Solve',
        heading: 'Form follows constraint',
        body: [
          <>Each experience carried unique technical and spatial demands, and every design decision had consequences:</>,
          <ul className="list-disc pl-5 flex flex-col gap-1 text-[16px] sm:text-[17px] lg:text-[18px] leading-loose text-[#262626] dark:text-[#adadad]">
            <li><strong>Transparent display:</strong> Needed to show both interface and the space behind it clearly</li>
            <li><strong>AR (Magic Leap 2):</strong> Optimised 3D assets for device constraints; designed for up to five participants simultaneously</li>
            <li><strong>iPad app:</strong> Mirrored the AR session in real time for non-headset users, boosting engagement and curiosity</li>
            <li><strong>VR (Meta Quest 3):</strong> Immersive walkthrough at human scale, with mirrored view for observers</li>
            <li><strong>Digital twin:</strong> Built for cross-platform accessibility</li>
          </ul>,
          { type: 'h3', text: 'Design strategies for scale and clarity' },
          <ul className="list-disc pl-5 flex flex-col gap-1 text-[16px] sm:text-[17px] lg:text-[18px] leading-loose text-[#262626] dark:text-[#adadad]">
            <li>In AR, visual cues communicated the central building's volume immediately</li>
            <li>VR Wadis were crafted to feel vast but navigable</li>
            <li>On the interactive map, each district had a distinct identity to clarify the development</li>
          </ul>,
          { type: 'h3', text: 'Interaction patterns' },
          <ul className="list-disc pl-5 flex flex-col gap-1 text-[16px] sm:text-[17px] lg:text-[18px] leading-loose text-[#262626] dark:text-[#adadad]">
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
          <ul className="list-disc pl-5 flex flex-col gap-1 text-[16px] sm:text-[17px] lg:text-[18px] leading-loose text-[#262626] dark:text-[#adadad]">
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
      satellite: 'Representation of the vast size of the development site.',
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
          <ul className="list-disc pl-5 flex flex-col gap-1 text-[16px] sm:text-[17px] lg:text-[18px] leading-loose text-[#262626] dark:text-[#adadad]">
            <li><strong>Coordination</strong> sur l'avancement du design et du développement</li>
            <li>Identification précoce des <strong>blocages</strong></li>
            <li>Navigation rapide des <strong>compromis</strong> et <strong>contraintes techniques</strong></li>
            <li>Itération du design en réponse aux <strong>retours</strong></li>
          </ul>,
          { type: 'callout', label: 'Contribution UX', body: <>J'ai maintenu <strong>Figma comme source de vérité</strong> pour les designs, <strong>Confluence pour la documentation</strong> et <strong>Jira pour la gestion des tâches</strong>, maintenant l'équipe alignée et productive.</> },
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
          <ul className="list-none flex flex-col gap-2 text-[16px] sm:text-[17px] lg:text-[18px] leading-loose text-[#262626] dark:text-[#adadad]">
            <li><strong>Les investisseurs</strong> À la recherche de crédibilité, d'ampleur et d'opportunités d'investissement claires.</li>
            <li><strong>Les bâtisseurs</strong> Promoteurs et architectes cherchant des moyens concrets de s'impliquer.</li>
            <li><strong>Les visionnaires</strong> Décideurs et stratèges axés sur l'impact à long terme et l'héritage.</li>
          </ul>,
          { type: 'callout', label: 'UX Insight', body: <>Les expériences devaient <strong>s'adapter à la taille des groupes</strong> et aux styles d'engagement sans perdre la clarté narrative. Les choix de conception, du flux présentateur AR aux écrans iPad et VR en miroir, reflétaient les enseignements des comportements délégués et de la recherche sur les publics à fort investissement.</> },
        ],
      },
      {
        id:      'when-where',
        eyebrow: 'Où et quand',
        heading: 'MIPIM, Cannes',
        body: [
          <>Les expériences ont été déployées au plus grand événement mondial dédié à l'immobilier et à l'investissement, accueilli pendant <strong>une semaine</strong> au Palais des Festivals.</>,
          <>Le client a construit un pavillon sur deux étages, avec un rez-de-chaussée accueillant deux projets. La disposition, le temps de présence et l'engagement devaient capter l'attention rapidement et laisser une impression en quelques minutes.</>,
          { type: 'callout', label: 'Considération UX Spatiale', body: "Une circulation claire et un guidage spatial étaient essentiels pour diriger naturellement les visiteurs à travers toutes les expériences." },
        ],
      },
      {
        id:      'what',
        eyebrow: 'Quoi',
        heading: 'Des expériences complémentaires',
        body: [
          <>Plutôt qu'une seule installation, nous avons conçu <strong>un système de six expériences</strong>, chacune offrant un point d'entrée unique dans la même histoire.</>,
        ],
        footerCallout: { label: 'Contribution UX/UI :', body: <>J'ai conçu l'UI et les patterns d'interaction pour les cinq expériences interactives. Cela incluait des flux intuitifs sur tactile, contrôleurs AR/VR et souris/manette, des micro-interactions et l'onboarding, et des flux visuels alignés avec la disposition du pavillon et la narration.</> },
        experiences: [
          {
            number: '01',
            title:  'Installation audiovisuelle',
            tech:   'Trois murs-écrans LCD',
            body:   "Une introduction cinématographique présentant la vision et l'ampleur du projet. Narrée et produite en interne, elle posait le contexte pour la suite.",
          },
          {
            number: '02',
            title:  'Carte interactive',
            tech:   'Écran tactile transparent',
            body:   "Une vue satellite de l'ensemble du développement, aidant les visiteurs à comprendre le contexte géographique et les quartiers environnants.",
          },
          {
            number: '03',
            title:  'Expérience AR',
            tech:   'Magic Leap 2 • Unity',
            body:   "Une expérience de réalité augmentée partagée pour jusqu'à cinq participants, révélant la structure centrale couche par couche.",
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
          <>Nous avons exploré une expérience AR multijoueur, mais avons choisi de ne pas la poursuivre. Bien que prometteuse, elle nécessitait plus d'appareils que nous ne pouvions tester correctement, et les conditions réseau dans des environnements à forte densité étaient trop imprévisibles.</>,
          <>Le compagnon iPad était prévu dès le départ comme valeur ajoutée potentielle, non inclus dans le brief client. Avec des délais serrés et une logistique complexe, nous n'étions pas certains de le livrer, mais il représentait une opportunité d'enrichir l'expérience.</>,
          <>La carte interactive a été intentionnellement simplifiée pour prioriser la clarté et la fiabilité plutôt que des fonctionnalités supplémentaires.</>,
          { type: 'callout', label: 'UX Insight', body: "Chaque contrainte est devenue une opportunité de maximiser l'engagement et la narration." },
        ],
      },
      {
        id:      'solve',
        eyebrow: 'Concevoir',
        heading: 'La forme suit la contrainte',
        body: [
          <>Chaque expérience avait ses propres exigences techniques et spatiales, et chaque décision avait des conséquences :</>,
          <ul className="list-disc pl-5 flex flex-col gap-1 text-[16px] sm:text-[17px] lg:text-[18px] leading-loose text-[#262626] dark:text-[#adadad]">
            <li><strong>Écran transparent :</strong> Devait afficher l'interface et laisser voir l'espace derrière</li>
            <li><strong>AR (Magic Leap 2) :</strong> Assets 3D optimisés pour les contraintes de l'appareil ; conçu pour cinq participants simultanément</li>
            <li><strong>Application iPad :</strong> Miroir de la session AR en temps réel pour les participants sans casque, renforçant l'engagement et la curiosité</li>
            <li><strong>VR (Meta Quest 3) :</strong> Visite immersive à échelle humaine, avec vue miroir pour les observateurs</li>
            <li><strong>Jumeau numérique :</strong> Conçu pour l'accessibilité multiplateforme</li>
          </ul>,
          { type: 'h3', text: "Stratégies de design pour l'échelle et la clarté" },
          <ul className="list-disc pl-5 flex flex-col gap-1 text-[16px] sm:text-[17px] lg:text-[18px] leading-loose text-[#262626] dark:text-[#adadad]">
            <li>En AR, des repères visuels communiquaient immédiatement le volume du bâtiment central</li>
            <li>Les Wadis en VR ont été conçus pour paraître vastes mais navigables</li>
            <li>Sur la carte interactive, chaque quartier avait une identité distincte pour clarifier le développement</li>
          </ul>,
          { type: 'h3', text: "Patterns d'interaction" },
          <ul className="list-disc pl-5 flex flex-col gap-1 text-[16px] sm:text-[17px] lg:text-[18px] leading-loose text-[#262626] dark:text-[#adadad]">
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
          <ul className="list-disc pl-5 flex flex-col gap-1 text-[16px] sm:text-[17px] lg:text-[18px] leading-loose text-[#262626] dark:text-[#adadad]">
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
const COUNTRY_COLOR_MAP = {
  Scotland: '#C9A84C',
  England:  '#6B9CE8',
  UAE:      '#E8836B',
  Vietnam:  '#6BC4A0',
};

const TEAM_DOTS = [
  { label: 'Designer',           group: 'design',     country: 'Scotland', color: '#C9A84C' },
  { label: 'Unity',         group: 'dev',        country: 'Scotland', color: '#C9A84C' },
  { label: 'Creative Team',      group: 'studio',     country: 'Scotland', color: '#C9A84C' },
  { label: 'Project Manager',    group: 'management', country: 'England',  color: '#6B9CE8' },
  { label: 'Product Manager',    group: 'management', country: 'UAE',      color: '#E8836B' },
  { label: 'Unreal Engine', group: 'dev',        country: 'Vietnam',  color: '#6BC4A0' },
];

const LEGEND_GROUPS = [
  { heading: 'Development', group: 'dev' },
  { heading: 'Design',      group: 'design' },
  { heading: 'Management',  group: 'management' },
  { heading: 'Studio',      group: 'studio' },
];

// Flat ordered list of pills as rendered (by LEGEND_GROUPS order) — used for roving tabindex
const FLAT_DOTS = LEGEND_GROUPS.flatMap(col => TEAM_DOTS.filter(d => d.group === col.group));

const SVG_W = 1114, SVG_H = 561;

// Extract normalised timezone string from a circle ID, e.g. "even+4-UAE" → "4", "odd-11-Sea" → "-11"
function extractTz(id) {
  const m = id.match(/^(?:even|odd)([+-]?\d+(?:\.\d+)?)-/);
  return m ? String(parseFloat(m[1])) : null;
}

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

const LEGEND_T = {
  en: {
    headings:      { dev: 'Engineering', design: 'Design', management: 'Management', studio: 'Studio' },
    labels:        { Designer: 'Designer', 'Unity': 'Unity', 'Creative Team': 'Creative Team', 'Project Manager': 'Project Manager', 'Product Manager': 'Product Manager', 'Unreal Engine': 'Unreal Engine' },
    mapCaption:    'Slide or hover over the map to explore time zones.',
    groupAriaLabel: 'Team members by location',
    mapAriaLabel:   'World map showing team locations. Use left and right arrow keys to explore time zones.',
  },
  fr: {
    headings:      { dev: 'Ingénierie', design: 'Design', management: 'Management', studio: 'Studio' },
    labels:        { Designer: 'Designer', 'Unity': 'Unity', 'Creative Team': "Équipe créative", 'Project Manager': 'Chef de projet', 'Product Manager': 'Product Manager', 'Unreal Engine': 'Unreal Engine' },
    mapCaption:    "Survolez la carte pour explorer les fuseaux horaires.",
    groupAriaLabel: "Membres de l'équipe par localisation",
    mapAriaLabel:   "Carte du monde montrant les localisations de l'équipe. Utilisez les flèches gauche et droite pour explorer les fuseaux horaires.",
  },
};

function WorldMapDots({ isDark, lang = 'en' }) {
  const lt = LEGEND_T[lang] ?? LEGEND_T.en;
  const [hovered,    setHovered]    = useState(null); // { tz, country } | null — transient hover
  const [selected,   setSelected]   = useState(null); // { tz, country } | null — locked by click
  const [focusedIdx, setFocusedIdx] = useState(0);    // roving tabindex for legend pills
  const containerRef    = useRef(null);
  const mapRef          = useRef(null);
  const touchOverlayRef = useRef(null);
  const prevLitRef    = useRef([]);             // circles highlighted on last hover, cleared cheaply
  const legendRef     = useRef(null);           // legend container for click-outside detection

  // Deselect pill on click-outside or scroll
  useEffect(() => {
    const handleClick = (e) => {
      // Don't deselect when interacting with the map or legend — let their own handlers run first
      if (mapRef.current?.contains(e.target)) return;
      if (legendRef.current?.contains(e.target)) return;
      setSelected(null);
    };
    // Only deselect on scroll if it isn't triggered by a touch on the map
    const handleScroll = () => {
      if (mapRef.current?.dataset.touching) return;
      setSelected(null);
    };
    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Arrow key navigation on the map itself — cycles through all tz columns
  const handleMapKeyDown = (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    if (!tzList.length) return;
    const curr = selected ? tzList.indexOf(selected.tz) : -1;
    const next = e.key === 'ArrowRight'
      ? (curr + 1) % tzList.length
      : (curr - 1 + tzList.length) % tzList.length;
    setSelected({ tz: tzList[next], country: null });
  };

  // Arrow key navigation across legend pills (roving tabindex pattern)
  const handleLegendKeyDown = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const buttons = [...legendRef.current.querySelectorAll('button')];
    const curr = buttons.indexOf(document.activeElement);
    if (curr === -1) return;
    const next = e.key === 'ArrowRight'
      ? (curr + 1) % buttons.length
      : (curr - 1 + buttons.length) % buttons.length;
    buttons[next].focus();
    setFocusedIdx(next);
    const dot   = FLAT_DOTS[next];
    const dotTz = dot ? dotPositions[dot.country]?.tz ?? null : null;
    if (dotTz) setSelected({ tz: dotTz, country: dot.country });
  };

  // Fallback: reset on any pointer movement outside the map container
  useEffect(() => {
    const handleMove = (e) => {
      if (!mapRef.current) return;
      const r = mapRef.current.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
        setHovered(prev => prev === null ? null : null);
      }
    };
    document.addEventListener('pointermove', handleMove);
    return () => document.removeEventListener('pointermove', handleMove);
  }, []);

  // Parse SVG once per dark-mode change: color named circles, tag every circle with data-tz
  const { svgHtml, dotPositions, tzList } = useMemo(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawGlobe, 'image/svg+xml');
    const svg = doc.documentElement;
    svg.setAttribute('width', '100%');
    svg.removeAttribute('height');
    svg.setAttribute('overflow', 'visible');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-hidden', 'true'); // outer div carries the accessible label
    svg.style.touchAction = 'none';          // iOS: hand all touch events to JS

    const rect = svg.querySelector('rect');
    if (rect) rect.setAttribute('fill', 'transparent');

    const bgOpacity  = isDark ? 0.45 : 0.45;
    const bgHoverDim = isDark ? 0.06 : 0.15;
    const labelColor = isDark ? '#f6f6f6' : '#1f1f1f';

    // CSS: [data-active] triggers blanket dim; matching elements get inline opacity overrides
    const style = doc.createElementNS('http://www.w3.org/2000/svg', 'style');
    style.textContent = `
      svg { touch-action: none; }
      .xr-bg    { opacity: ${bgOpacity}; cursor: crosshair; }
      .xr-dot   { opacity: 1;            cursor: crosshair; }
      .xr-label    { font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
                     font-size: 8px; font-weight: 700; text-anchor: middle; dominant-baseline: central;
                     cursor: crosshair; fill: ${labelColor}; }
      .xr-label-bg { cursor: crosshair; fill: ${isDark ? '#2e2e2e' : '#e4e4e4'}; opacity: 0; }
      svg[data-active] .xr-bg       { opacity: ${bgHoverDim}; }
      svg[data-active] .xr-dot      { opacity: 0.2; }
      svg[data-active] .xr-label    { opacity: ${bgHoverDim}; }
      svg[data-active] .xr-label-bg { opacity: 0; }
    `;
    svg.insertBefore(style, svg.firstChild);

    const allCircles = Array.from(svg.querySelectorAll('circle'));
    const positions  = {};

    // Find the first two rows to compute row spacing, then place labels one row above the first dot row
    const sortedCys  = [...new Set(allCircles.map(c => parseFloat(c.getAttribute('cy'))))].sort((a, b) => a - b);
    const minCy      = sortedCys[0];
    const maxCy      = sortedCys[sortedCys.length - 1];
    const nextCy     = sortedCys[1] ?? minCy;
    const rowSpacing = nextCy - minCy;
    const dotRowY    = minCy - rowSpacing;       // new dot row sits one row above the map
    const labelY     = minCy - rowSpacing * 2;   // labels sit one row above the dot row

    // Extend the viewBox upward so labels + dot row are inside it — overflow:visible paints outside
    // the viewBox but browsers clip pointer events to the viewBox boundary.
    const vb   = (svg.getAttribute('viewBox') || `0 0 ${SVG_W} ${SVG_H}`).trim().split(/[\s,]+/);
    const vbX  = parseFloat(vb[0]);
    const vbY  = parseFloat(vb[1]) - rowSpacing * 2 - 30;
    const vbW  = parseFloat(vb[2]);
    const vbH  = parseFloat(vb[3]) + rowSpacing * 2 + 30;
    svg.setAttribute('viewBox', `${vbX} ${vbY} ${vbW} ${vbH}`);

    // Collect first-row cx values grouped by tz (to find the middle x of each group)
    const lastRowByTz = {};
    allCircles.forEach(c => {
      if (Math.abs(parseFloat(c.getAttribute('cy')) - maxCy) > 0.5) return;
      const tz = extractTz(c.getAttribute('id') || '');
      if (!tz) return;
      (lastRowByTz[tz] = lastRowByTz[tz] || []).push(parseFloat(c.getAttribute('cx')));
    });

    allCircles.forEach(circle => {
      const id     = circle.getAttribute('id') || '';
      const baseId = id.replace(/-\d+$/, ''); // strip incrementing suffix added to deduplicate SVG ids
      const tz     = extractTz(baseId);
      if (tz) circle.setAttribute('data-tz', tz);

      let matched = null;
      for (const country of Object.keys(COUNTRY_COLOR_MAP)) {
        if (baseId.endsWith(`-${country}`)) { matched = country; break; }
      }

      if (matched) {
        circle.setAttribute('fill', COUNTRY_COLOR_MAP[matched]);
        circle.setAttribute('data-country', matched);
        circle.setAttribute('class', 'xr-dot');
        circle.setAttribute('r', '8');
        positions[matched] = {
          x: (parseFloat(circle.getAttribute('cx')) / SVG_W) * 100,
          y: ((parseFloat(circle.getAttribute('cy')) - vbY) / vbH) * 100,
          tz,
        };
      } else {
        const fill = circle.getAttribute('fill');
        if (fill === 'white') {
          circle.setAttribute('fill', isDark ? 'transparent' : 'transparent');
        } else {
          circle.setAttribute('fill', '#C8C8C8');
        }
        circle.setAttribute('class', 'xr-bg');
      }
    });

    // Add timezone label backgrounds + text at the last row positions
    const labelsG = doc.createElementNS('http://www.w3.org/2000/svg', 'g');
    Object.entries(lastRowByTz).forEach(([tz, cxArr]) => {
      cxArr.sort((a, b) => a - b);
      let midIdx = Math.floor(cxArr.length / 2);
      if (tz === '10') midIdx = Math.max(0, midIdx - 1);
      const midCx  = cxArr[midIdx];
      const tzNum  = parseFloat(tz);
      const label  = tzNum === 0 ? 'GMT' : tzNum > 0 ? `+${tzNum}` : String(tzNum);

      // Default pill dimensions (sized for 8px label)
      const dw = label.length * 7 + 10;
      const dh = 14;

      const bg = doc.createElementNS('http://www.w3.org/2000/svg', 'rect');
      bg.setAttribute('x',          String(midCx - dw / 2));
      bg.setAttribute('y',          String(labelY - dh / 2));
      bg.setAttribute('width',      String(dw));
      bg.setAttribute('height',     String(dh));
      bg.setAttribute('rx',         '4');
      bg.setAttribute('data-tz',    tz);
      bg.setAttribute('data-midx',  String(midCx));
      bg.setAttribute('data-midy',  String(labelY));
      bg.setAttribute('data-dw',    String(dw));
      bg.setAttribute('data-dh',    String(dh));
      bg.setAttribute('data-len',   String(label.length));
      bg.setAttribute('class',      'xr-label-bg');
      labelsG.appendChild(bg);

      const text = doc.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x',        String(midCx));
      text.setAttribute('y',        String(labelY));
      text.setAttribute('data-tz',  tz);
      text.setAttribute('class',    'xr-label');
      text.textContent = label;
      labelsG.appendChild(text);

      // Dot row — one circle per tz column, sits between labels and the map
      const dot = doc.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx',       String(midCx));
      dot.setAttribute('cy',       String(dotRowY));
      dot.setAttribute('r',        '4');
      dot.setAttribute('data-tz',  tz);
      dot.setAttribute('class',    'xr-bg');
      labelsG.appendChild(dot);
    });
    svg.appendChild(labelsG);

    const tzList = Object.keys(lastRowByTz).sort((a, b) => parseFloat(a) - parseFloat(b));
    return { svgHtml: svg.outerHTML, dotPositions: positions, tzList };
  }, [isDark]);

  // Mobile: HTML overlay with non-passive direct listeners — the only approach iOS respects
  useEffect(() => {
    const overlay = touchOverlayRef.current;
    const map     = mapRef.current;
    if (!overlay || !map || !tzList.length) return;

    const scrub = (clientX) => {
      const r   = map.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
      setSelected({ tz: tzList[Math.min(tzList.length - 1, Math.floor(pct * tzList.length))], country: null });
    };

    let startX  = null;
    let startY  = null;
    let prevY   = null;
    let isHoriz = null;

    const onStart = (e) => {
      e.preventDefault();
      startX  = e.touches[0].clientX;
      startY  = e.touches[0].clientY;
      prevY   = startY;
      isHoriz = null;
      scrub(startX);
    };

    const onMove = (e) => {
      e.preventDefault();
      const t  = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (isHoriz === null && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
        isHoriz = Math.abs(dx) >= Math.abs(dy);
      }
      if (isHoriz === false) {
        window.scrollBy(0, prevY - t.clientY);
        prevY = t.clientY;
      } else if (isHoriz === true) {
        scrub(t.clientX);
      }
    };

    const onEnd = () => { setSelected(null); };

    overlay.addEventListener('touchstart', onStart, { passive: false });
    overlay.addEventListener('touchmove',  onMove,  { passive: false });
    overlay.addEventListener('touchend',   onEnd,   { passive: true });

    return () => {
      overlay.removeEventListener('touchstart', onStart);
      overlay.removeEventListener('touchmove',  onMove);
      overlay.removeEventListener('touchend',   onEnd);
    };
  }, [tzList]);

  // On hover/select change: toggle [data-active], restore previously lit circles, highlight new tz group
  useLayoutEffect(() => {
    const active = hovered ?? selected;
    const svgEl  = containerRef.current?.querySelector('svg');
    if (!svgEl) return;

    // Restore previous highlights (inline styles removed, CSS defaults take over)
    prevLitRef.current.forEach(c => {
      c.style.opacity = '';
      if (c.classList.contains('xr-label')) { c.style.fontSize = ''; c.style.fill = ''; }
      if (c.classList.contains('xr-label-bg')) {
        const midx = parseFloat(c.getAttribute('data-midx'));
        const midy = parseFloat(c.getAttribute('data-midy'));
        const dw   = parseFloat(c.getAttribute('data-dw'));
        const dh   = parseFloat(c.getAttribute('data-dh'));
        c.setAttribute('x',      String(midx - dw / 2));
        c.setAttribute('y',      String(midy - dh / 2));
        c.setAttribute('width',  String(dw));
        c.setAttribute('height', String(dh));
        c.setAttribute('rx',     '4');
        c.style.fill = '';
      }
    });
    prevLitRef.current = [];

    if (!active) { svgEl.removeAttribute('data-active'); return; }

    svgEl.setAttribute('data-active', '1');
    const lit = [];

    if (!hovered && selected && selected.country) {
      // Pill-selected mode: un-dim the country dot; hide all labels so no tz info shows
      const dot = svgEl.querySelector(`[data-country="${selected.country}"]`);
      if (dot) { dot.style.opacity = '1'; lit.push(dot); }
      svgEl.querySelectorAll('.xr-label, .xr-label-bg').forEach(el => {
        el.style.opacity = '0'; lit.push(el);
      });
    } else {
      // Map-hover mode: highlight every element in the tz column + expand the label
      const bgActiveOpacity = isDark ? 0.9 : 0.8;
      svgEl.querySelectorAll(`[data-tz="${active.tz}"]`).forEach(c => {
        c.style.opacity = c.classList.contains('xr-dot') ? '1' : String(bgActiveOpacity);
        if (c.classList.contains('xr-label')) {
          c.style.opacity  = '1';
          c.style.fontSize = '22px';
          c.style.fill     = isDark ? '#000000' : '#ffffff';
        }
        if (c.classList.contains('xr-label-bg')) {
          const midx = parseFloat(c.getAttribute('data-midx'));
          const midy = parseFloat(c.getAttribute('data-midy'));
          const len  = parseInt(c.getAttribute('data-len'), 10);
          const aw   = len * 14 + 28;
          const ah   = 38;
          c.style.opacity = '1';
          c.style.fill    = isDark ? '#ffffff' : '#000000';
          c.setAttribute('x',      String(midx - aw / 2));
          c.setAttribute('y',      String(midy - ah / 2));
          c.setAttribute('width',  String(aw));
          c.setAttribute('height', String(ah));
          c.setAttribute('rx',     '16');
        }
        lit.push(c);
      });
    }
    prevLitRef.current = lit;
  }, [hovered, selected, isDark]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
      {/* Inline SVG map — mouse events delegated to outer container */}
      <div
        ref={mapRef}
        className="relative w-full mb-2 sm:mb-0 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A84C]"
        style={{ cursor: 'crosshair' }}
        tabIndex={0}
        role="img"
        aria-label={lt.mapAriaLabel}
        onKeyDown={handleMapKeyDown}
        onMouseOver={(e) => {
          const circle = e.target.closest?.('[data-tz]');
          if (!circle) return;
          const tz      = circle.getAttribute('data-tz');
          const country = circle.getAttribute('data-country') || null;
          setHovered(prev => (prev?.tz === tz && prev?.country === country) ? prev : { tz, country });
        }}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="relative w-full">
          <div ref={containerRef} className="w-full" dangerouslySetInnerHTML={{ __html: svgHtml }} />
          <div ref={touchOverlayRef} className="absolute inset-0 sm:hidden" style={{ zIndex: 2, touchAction: 'none' }} aria-hidden="true" />
        </div>
        {/* Tooltips — purely visual, country name already in each button's aria-label */}
        {Object.entries(dotPositions).map(([country, pos]) => (
          <div
            key={country}
            aria-hidden="true"
            className="absolute pointer-events-none"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -100%)' }}
          >
            <div
              className="mb-2 whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-medium bg-[#1f1f1f] text-white dark:bg-white dark:text-[#1f1f1f] transition-opacity duration-150"
              style={{ opacity: (hovered ?? selected)?.country === country ? 1 : 0 }}
            >
              {country}
            </div>
          </div>
        ))}
      </div>
      <p className="text-[12px] text-[#5c5c5c] dark:text-[#adadad] mt-2 text-center" aria-hidden="true">{lt.mapCaption}</p>

      {/* Screen-reader description of the map */}
      <p className="sr-only">
        World map showing the geographic distribution of the team across four countries and their time zones.
        Use the buttons below to highlight each team member's location on the map.
      </p>
      </div>

      {/* Legend */}
      <div ref={legendRef} className="grid grid-cols-2 gap-x-10 gap-y-6 lg:flex lg:gap-y-0" role="group" aria-label={lt.groupAriaLabel} onKeyDown={handleLegendKeyDown}>
        {LEGEND_GROUPS.map((col) => (
          <div key={col.group} className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#5c5c5c] dark:text-[#adadad] mb-1" aria-hidden="true">{lt.headings[col.group]}</p>
            {TEAM_DOTS.filter(d => d.group === col.group).map((dot) => {
              const dotTz      = dotPositions[dot.country]?.tz ?? null;
              const active     = hovered ?? selected;
              const isSelected = selected?.tz === dotTz;
              const flatIdx    = FLAT_DOTS.indexOf(dot);
              return (
                <button
                  key={dot.label}
                  type="button"
                  tabIndex={flatIdx === focusedIdx ? 0 : -1}
                  aria-pressed={isSelected}
                  aria-label={`${lt.labels[dot.label] ?? dot.label}, ${dot.country}${isSelected ? ', selected' : ''}`}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors self-start ${
                    isSelected
                      ? 'bg-black/[0.12] dark:bg-white/[0.16]'
                      : 'bg-black/[0.05] dark:bg-white/[0.07] hover:bg-black/[0.1] dark:hover:bg-white/[0.13]'
                  }`}
                  style={{
                    opacity: active && active.tz !== dotTz ? 0.2 : 1,
                    transition: 'opacity 200ms ease',
                  }}
                  onFocus={() => setFocusedIdx(flatIdx)}
                  onPointerEnter={(e) => { if (e.pointerType !== 'touch') setHovered({ tz: dotTz, country: dot.country }); }}
                  onPointerLeave={(e) => { if (e.pointerType !== 'touch') setHovered(null); }}
                  onPointerDown={(e) => { e.stopPropagation(); setSelected(prev => prev?.tz === dotTz ? null : { tz: dotTz, country: dot.country }); }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: dot.color, flexShrink: 0 }} aria-hidden="true" />
                  <span className="text-[13px] text-[#5c5c5c] dark:text-[#adadad] whitespace-nowrap">{lt.labels[dot.label] ?? dot.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
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
      style={{ animation: 'fade-in 0.2s ease both', background: 'rgba(0,0,0,0.92)' }}
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
      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-[13px] font-medium text-white/60 tabular-nums pointer-events-none">
        {index + 1} / {slides.length}
      </span>

      {/* Close */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        aria-label={closeLbl}
        data-spring
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <img src={imgClose} alt="" width={20} height={20} className="brightness-0 invert" />
      </button>

      {/* Prev */}
      <button
        data-spring
        onClick={(e) => { e.stopPropagation(); go(Math.max(0, index - 1)); }}
        disabled={index === 0}
        aria-label={prevLbl}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <img src={imgChevronLeft} alt="" width={20} height={20} className="brightness-0 invert" />
      </button>

      {/* Next */}
      <button
        data-spring
        onClick={(e) => { e.stopPropagation(); go(Math.min(slides.length - 1, index + 1)); }}
        disabled={index === slides.length - 1}
        aria-label={nextLbl}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
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
                className="w-full text-left cursor-zoom-in rounded-[16px] sm:rounded-[20px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
              >
                <div className="bg-white dark:bg-[#141414] rounded-[16px] sm:rounded-[20px] p-4 w-full overflow-hidden" dangerouslySetInnerHTML={{ __html: slide.svg }} />
              </button>
              <figcaption className="text-[12px] text-[#5c5c5c] dark:text-[#adadad] text-center">{slide.label}</figcaption>
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
const bodyText = 'text-[16px] sm:text-[17px] lg:text-[18px] leading-loose text-[#262626] dark:text-[#adadad]';

// ── Scroll helper ─────────────────────────────────────────────────────────────
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  el.focus({ preventScroll: true });
};

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
                className={`relative text-[13px] leading-snug py-1.5 px-2 rounded-lg text-left w-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC] ${
                  isActive
                    ? 'text-[#1f1f1f] dark:text-[#f6f6f6] font-semibold bg-black/[0.04] dark:bg-white/[0.06]'
                    : 'text-[#5c5c5c] dark:text-[#adadad] font-normal hover:text-[#1f1f1f] dark:hover:text-[#f6f6f6] hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                }`}
              >
                <span aria-hidden="true" className="font-semibold invisible block select-none whitespace-nowrap">{s.eyebrow}</span>
                <span className="absolute inset-0 py-1.5 px-2 whitespace-nowrap">{s.eyebrow}</span>
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
    <nav aria-label="Page sections" className="w-full backdrop-blur-[4px] bg-white/[0.64] dark:bg-black/[0.64] rounded-3xl shadow-[0px_0px_17.1px_0px_rgba(0,0,0,0.08)] dark:ring-1 dark:ring-white/[0.16] p-[10px]">
      <div className="overflow-hidden rounded-[16px]">
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
                  className={`h-8 px-3 rounded-2xl text-[13px] font-medium whitespace-nowrap transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC] ${
                    isActive
                      ? 'bg-[#161616] dark:bg-white text-white dark:text-[#161616]'
                      : 'text-[#5c5c5c] dark:text-[#adadad]'
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

// ── Placeholder asset zone ────────────────────────────────────────────────────
function AssetPlaceholder({ label }) {
  return (
    <div className="w-full rounded-[24px] sm:rounded-[32px] aspect-video flex items-center justify-center border-2 border-dashed border-black/[0.12] dark:border-white/[0.12]">
      <p className="text-[13px] font-medium text-[#5c5c5c] dark:text-[#adadad] uppercase tracking-widest">{label}</p>
    </div>
  );
}

// ── Experience card ───────────────────────────────────────────────────────────
function ExperienceCard({ exp, lang }) {
  return (
    <div className="flex gap-6 sm:gap-8 py-6 sm:py-8">
      <span className="text-[13px] font-bold uppercase tracking-widest shrink-0 pt-0.5 gold-text">{exp.number}</span>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-[17px] sm:text-[18px] font-bold text-[#1f1f1f] dark:text-[#f6f6f6] leading-snug">{exp.title}</h3>
          <span className="text-[12px] font-medium uppercase tracking-wider text-[#5c5c5c] dark:text-[#adadad]">{exp.tech}</span>
        </div>
        {(Array.isArray(exp.body) ? exp.body : [exp.body]).map((para, i) => (
          <p key={i} className="text-[15px] sm:text-[16px] leading-relaxed text-[#5c5c5c] dark:text-[#adadad]">{para}</p>
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
          <span className="text-[15px] sm:text-[16px] font-medium text-[#1f1f1f] dark:text-[#f6f6f6]">{m.role}</span>
          <span className="text-[14px] sm:text-[15px] text-[#5c5c5c] dark:text-[#adadad] text-right shrink-0">{m.detail}</span>
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
  const scrollTarget = useRef(null);

  const xboxSvg = useMemo(() =>
    rawXboxKeybinding
      .replace(/(<svg[^>]*)\s+width="[^"]*"\s+height="[^"]*"/, '$1 role="img" aria-label="Xbox controller keybindings for the Digital Twin exploration" style="width:100%;height:auto"')
  , []);

  const handleNavigate = (id) => {
    setActiveId(id);
    scrollTarget.current = id;
    scrollToSection(id);
    // Fallback: release lock after 2s in case target never intersects
    setTimeout(() => { scrollTarget.current = null; }, 2000);
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

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:ring-2 focus:ring-[#0152EC] focus:bg-white focus:text-[#1f1f1f] focus:outline-none font-medium">
        {t.skipToMain}
      </a>

      <main
        id="main-content"
        aria-label={t.title}
        tabIndex={-1}
        className={`bg-white dark:bg-[#141414] min-h-screen transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      >

        {/* ── Hero ── */}
        <section
          aria-labelledby="xr-hero-heading"
          className="relative min-h-screen flex flex-col bg-[#0e0e0e] overflow-hidden"
        >
          <img src={mipimPhoto} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-700" style={{ opacity: heroReady ? 1 : 0, background: 'linear-gradient(to bottom, rgba(14,14,14,0.2) 0%, rgba(14,14,14,1) 100%)' }} />

          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 mt-auto relative z-10 pb-24 sm:pb-28 lg:pb-32 pt-40 transition-opacity duration-700" style={{ opacity: heroReady ? 1 : 0 }}>
            <div className="flex flex-col gap-6 sm:gap-8">
              <p className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-widest text-white">
                {t.label}
              </p>
              <h1
                id="xr-hero-heading"
                className="text-[40px] sm:text-[56px] lg:text-[72px] font-bold leading-[1.05] text-white"
              >
                {t.title}
              </h1>
              <p className="text-[17px] sm:text-[19px] lg:text-[21px] leading-relaxed text-white/80 max-w-2xl">
                {t.tagline}
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-6 sm:flex sm:flex-wrap sm:gap-x-16 mt-2" aria-label="Key figures">
                {t.stats.map((s, i) => (
                  <li key={i} className="flex flex-col gap-1">
                    <span className="text-[32px] sm:text-[40px] font-bold leading-none tabular-nums whitespace-nowrap" style={{ color: GOLD }}>
                      <AnimatedStat prefix={s.prefix} countTo={s.countTo} suffix={s.suffix} ready={heroReady} />
                    </span>
                    <span className="text-[13px] sm:text-[14px] text-white/70 uppercase tracking-widest font-medium">{s.label}</span>
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
                    <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-widest gold-text">
                      {section.eyebrow}
                    </p>
                    <h2
                      id={`${section.id}-heading`}
                      className="text-[28px] sm:text-[36px] lg:text-[44px] font-bold leading-tight text-[#1f1f1f] dark:text-[#f6f6f6]"
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
                                className="w-full rounded-[16px] sm:rounded-[20px] object-cover"
                              />
                              <figcaption className="text-[12px] text-[#5c5c5c] dark:text-[#adadad] text-center">{t.captions.satellite}</figcaption>
                            </figure>
                          )}
                          {/* AR session photo — before Reflection text in Measure */}
                          {section.id === 'measure' && i === 4 && (
                            <figure className="flex flex-col gap-2 max-w-lg mx-auto">
                              <img
                                src={eventPresentationPhoto}
                                alt="Leading a presenter-led AR session at MIPIM"
                                className="w-full rounded-[16px] sm:rounded-[20px] object-cover"
                              />
                              <figcaption className="text-[12px] text-[#5c5c5c] dark:text-[#adadad] text-center">{t.captions.arSession}</figcaption>
                            </figure>
                          )}
                          {/* Xbox keybinding — after list in Solve */}
                          {section.id === 'solve' && i === 1 && (
                            <figure className="flex flex-col gap-2">
                              <div className="bg-[#141414] rounded-[16px] sm:rounded-[20px] p-6"
                                   dangerouslySetInnerHTML={{ __html: xboxSvg }} />
                              <figcaption className="text-[12px] text-[#5c5c5c] dark:text-[#adadad] text-center">{t.captions.xbox}</figcaption>
                            </figure>
                          )}
                          {/* Flowcharts — after Approaches heading in Solve */}
                          {section.id === 'solve' && i === 8 && (
                            <FlowSection isDark={isDark} lang={lang} labels={t.flowLabels} />
                          )}
                          {section.id === 'prioritise' && i === 0 && (
                            <figure className="flex flex-col gap-2 max-w-sm mx-auto">
                              <div className="grid" style={{ gridTemplateColumns: '4fr 1fr' }}>
                                <img src={magicLeapPhoto} alt="Magic Leap 2 AR glasses" className="w-full rounded-[12px] sm:rounded-[16px] object-cover" />
                                <img src={magicLeapControllerPhoto} alt="Magic Leap 2 controller" className="w-full rounded-[12px] sm:rounded-[16px] object-cover" />
                              </div>
                              <figcaption className="text-[12px] text-[#5c5c5c] dark:text-[#adadad] text-center">{t.captions.magicLeap}</figcaption>
                            </figure>
                          )}
                          {section.id === 'when-where' && i === 0 && (
                            <figure className="flex flex-col gap-2 max-w-lg mx-auto">
                              <img
                                src={eventBuildingPhoto}
                                alt="Two-storey building constructed by our client at MIPIM"
                                className="w-full rounded-[16px] sm:rounded-[20px] object-cover"
                              />
                              <figcaption className="text-[12px] text-[#5c5c5c] dark:text-[#adadad] text-center">{t.captions.building}</figcaption>
                            </figure>
                          )}
                          {section.id === 'prioritise' && i === 1 && (
                            <figure className="flex flex-col gap-2 max-w-sm mx-auto">
                              <img src={tableTopLogo} alt="Client logo design on the AR table top" className="w-full rounded-[16px] sm:rounded-[20px] object-cover dark:[filter:invert(0.92)_hue-rotate(180deg)]" />
                              <figcaption className="text-[12px] text-[#5c5c5c] dark:text-[#adadad] text-center">{t.captions.tracker}</figcaption>
                            </figure>
                          )}
                          {p?.type === 'callout'
                            ? p.variant === 'goal'
                              ? (
                                <div className="mt-6 -mb-4 rounded-2xl bg-[#16a34a]/[0.06] dark:bg-[#16a34a]/[0.12] border border-[#16a34a]/20 px-5 py-4 flex flex-col gap-3">
                                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#15803d] dark:text-[#4ade80]">{p.label}</span>
                                  <p className={bodyText}>{p.body}</p>
                                </div>
                              )
                              : (
                              <div className="mt-6 -mb-4 rounded-2xl bg-[#C9A84C]/[0.08] dark:bg-[#C9A84C]/[0.10] border border-[#C9A84C]/25 px-5 py-4 flex flex-col gap-3">
                                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#7A5C00] dark:text-[#C9A84C]">{p.label}</span>
                                <p className={bodyText}>{p.body}</p>
                              </div>
                            )
                            : p?.type === 'h3'
                              ? <h3 className="text-[16px] sm:text-[17px] lg:text-[18px] font-semibold text-[#1f1f1f] dark:text-[#f6f6f6]">{p.text}</h3>
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
                        className="w-full rounded-[16px] sm:rounded-[20px] object-cover dark:[filter:invert(0.92)]"
                      />
                      <figcaption className="text-[12px] text-[#5c5c5c] dark:text-[#adadad] text-center">{t.captions.floorPlan}</figcaption>
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
                    <div className="mt-6 -mb-4 rounded-2xl bg-[#C9A84C]/[0.08] dark:bg-[#C9A84C]/[0.10] border border-[#C9A84C]/25 px-5 py-4 flex flex-col gap-3 max-w-3xl">
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-[#7A5C00] dark:text-[#C9A84C]">{section.footerCallout.label}</span>
                      <div className={bodyText}>{section.footerCallout.body}</div>
                    </div>
                  )}

                </section>
              ))}
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0152EC] hover:bg-[#0142cc] text-white font-medium text-[15px] sm:text-[16px] rounded-full border border-[#5289f2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC] focus-visible:ring-offset-2"
            >
              <img src={imgArrowRight} alt="" width={16} height={16} className="brightness-0 invert" style={{ transform: 'rotate(180deg)' }} />
              {t.backLabel}
            </Link>
          </div>
        </div>

      </main>

      {/* ── Mobile floating nav ── */}
      <div
        inert={scrolledDown && !atBottom ? undefined : true}
        className={`md:hidden fixed bottom-2 left-[68px] right-4 z-40 flex justify-center pointer-events-none transition-opacity duration-300 ${scrolledDown && !atBottom ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="pointer-events-auto w-full">
          <MobileSecondaryNav sections={t.sections} activeId={activeId} onNavigate={handleNavigate} />
        </div>
      </div>

      {/* ── Chat button circular wrapper — centred behind the trigger when sec nav is visible ── */}
      <div
        aria-hidden="true"
        className={`md:hidden fixed z-[39] pointer-events-none transition-opacity duration-300 rounded-full backdrop-blur-[4px] bg-white/[0.64] dark:bg-black/[0.64] shadow-[0px_0px_17.1px_0px_rgba(0,0,0,0.08)] dark:ring-1 dark:ring-white/[0.16] ${scrolledDown && !atBottom ? 'opacity-100' : 'opacity-0'}`}
        style={{ width: 52, height: 52, left: 8, bottom: 8 }}
      />

      <Footer lang={lang} />
    </>
  );
}

export default XRExperiences;
