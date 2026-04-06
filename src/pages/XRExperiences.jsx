import { useState, useEffect, useLayoutEffect, useRef, useMemo, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../analytics';
import Footer from '../components/Footer';
import rawGlobe from '../assets/icons/globe-time-zones.svg?raw';
import imgArrowRight from '../assets/icons/icon-arrow-right.svg';
import mipimPhoto from '../assets/photos/photo-MIPIM.webp';
import eventBuildingPhoto from '../assets/photos/photo-event-building.webp';
import eventSpacePhoto from '../assets/photos/photo-event-space.webp';
import eventGroupPhoto from '../assets/photos/photo-event-group.webp';
import eventPresentationPhoto from '../assets/photos/photo-event-building-presentation.webp';
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
    tagline:     'The architecture of engagement. A global unveiling.',
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
          <>For this project, our core team of five, spanning four countries, led the <strong>end-to-end design and development</strong> of all applications. Film production was handled by our studio team.</>,
          <>To overcome the challenges of working fully remotely across time zones, we operated in two-week sprints with <strong>daily stand-ups</strong> aligned to UK core hours. This cadence was essential for:</>,
          <ul className="list-disc pl-5 flex flex-col gap-1 text-[16px] sm:text-[17px] lg:text-[18px] leading-loose text-[#262626] dark:text-[#adadad]">
            <li><strong>Maintaining alignment</strong> and visibility into sprint progress</li>
            <li><strong>Surfacing blockers</strong> early to avoid delays</li>
            <li><strong>Understanding design impact</strong> on engineering and development</li>
            <li><strong>Identifying delivery risks</strong> and navigating trade-offs</li>
            <li><strong>Guiding design evolution</strong> throughout the process</li>
          </ul>,
          <>Given the project’s ambition and tight timeline, this structure was critical to delivering on time, with design and engineering working in lockstep.</>,
        ],
        map: true,
      },
      {
        id:      'why',
        eyebrow: 'Why',
        heading: 'One shot at a first impression',
        body: [
          <>This was a singular opportunity to reveal one of the most ambitious urban developments ever proposed, to a global audience of investors. With limited time and high expectations, we had to make the project’s scale and ambition instantly tangible, or risk it being dismissed as just another concept.</>,
          <>Every decision mattered: the space, the pacing, the way groups and individuals engaged. We needed a system of experiences that would work in tandem to deliver conviction, while ensuring no part of the story fractured. The goal was clear: leave every visitor believing <strong>this wasn’t just another development, but a redefinition of what a city could be</strong>.</>,
        ],
      },
      {
        id:      'who',
        eyebrow: 'Who',
        heading: 'A high-stakes audience',
        body: [
          <>While I had prior experience designing large-scale installations across the UK and Middle East (100k+ attendees), this was my first exposure to real estate investment events.</>,
          <>To close that gap quickly, I aligned with colleagues experienced in Architecture, Engineering, and Construction-focused events, and built a clear understanding of audience behaviour, expectations, and decision drivers.</>,
          <>Attendance itself signalled intent. Delegate passes ranged from €2,500 to €3,000, with total costs often exceeding €10,000 per person. This was a highly invested, time-constrained audience, where attention was limited and expectations were high. </>,
          <>Designing for this context meant addressing three distinct mindsets, each with different definitions of value:</>,
          <ul className="list-none flex flex-col gap-2 text-[16px] sm:text-[17px] lg:text-[18px] leading-loose text-[#262626] dark:text-[#adadad]">
            <li><strong>Backers</strong> Investors seeking credibility, scale, and clear investable opportunity.</li>
            <li><strong>Builders</strong> Developers and architects looking for tangible ways to engage.</li>
            <li><strong>Visionaries</strong> Policymakers and strategists focused on long-term impact and legacy.</li>
          </ul>,
        ],
      },
      {
        id:      'when-where',
        eyebrow: 'When & Where',
        heading: 'MIPIM, Cannes',
        body: [
          <>The experiences were designed for <strong>MIPIM</strong>, the world's largest real estate and investment event, held annually, over <strong>one week</strong> at the Palais des Festivals in Cannes, France.</>,
          <>For the event, our client constructed a two-storey pavilion in a prime, high-visibility location. The ground floor was dedicated to two projects, included our experiences, placing them directly within a high-traffic, time-pressured environment.</>,
          <>This context made spatial design critical. Layout, flow, and dwell time needed to work together to capture attention quickly, guide movement, and deliver impact within minutes.</>,
        ],
      },
      {
        id:      'what',
        eyebrow: 'What',
        heading: 'Complementary experiences',
        body: [
          <>Rather than a single installation, we designed <strong>a system of six experiences</strong>, each offering a different entry point into the same story.</>,
          <>We occupied half of the ground floor of our client's two-storey pavilion. Two natural entry points converged into a central flow, ensuring that nearly every visitor passed through the experience space.</>,
          <>The experiences were designed to flex across audience types and group sizes. Large groups could engage passively through the film installation, smaller groups were guided through shared AR sessions, and individuals could explore interactively at their own pace.</>,
          <>This allowed us to balance throughput, engagement depth, and time constraints within a high-traffic environment.</>,
        ],
        experiences: [
          {
            number: '01',
            title:  'Film installation',
            tech:   'three LCD walls',
            body:   'A cinematic introduction establishing the project’s vision and scale. Narrated and produced in-house, it set the context for everything that followed.',
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
        heading: 'What made the cut and why',
        body: [
          <>The physical space and delivery capacity defined the boundaries. We could support up to six experiences, with the Augmented Reality table expected to drive the most engagement. Since the table needed to be built in Saudi Arabia and shipped to France, it had to be designed and finalised first, leaving no margin for error.</>,
          <>We carefully considered the table’s dimensions to feel comfortable for two users per side, while accommodating the hardware, including each Magic Leap headset, controller, and computer power unit. At the center, I designed an AR tracker reflecting the client’s branding. Its size and pattern were critical as Magic Leap sensors and iPad cameras needed to detect it reliably, ensuring the 3D imagery remained precisely locked even as users moved around. I derived it from the client's logo, adapting it to stay within brand guidelines while being distinct enough that sensors wouldn't trigger on the same logo displayed across the pavilion.</>,
          <>Positioned against a wall with a wall-mounted screen above, the table allowed three usable sides, supporting up to six users simultaneously. Every decision, from table size to tracker design, was deliberate, balancing user comfort, technical feasibility, and the overall immersive experience.</>,
          <>We explored a multiplayer Magic Leap experience, but chose not to pursue it. While compelling, it required more devices than we could properly test or troubleshoot. Network conditions at high-density events were also too unpredictable to rely on.</>,
          <>The iPad companion was planned from the start as a potential value-add, though we did not include it in the client brief. With limited time and complex logistics, we were unsure we could deliver it, but it provided an opportunity to enhance the experience. When more visitors arrived than there were headsets, the iPad mirrored the AR session in real time, keeping the entire group engaged. We also anticipated the curiosity this interaction would generate: seeing participants engage with something invisible naturally drew attention, and the iPad allowed passersby to understand and share in the experience.</>,
          <>The interactive map was intentionally scoped back. With limited time, we prioritised clarity and reliability over additional features, ensuring it delivered value without introducing risk.</>,
        ],
      },
      {
        id:      'solve',
        eyebrow: 'Solve',
        heading: 'Form follows constraint.',
        body: [
          <>Each experience carried its own technical and spatial demands, and every decision carried consequences. The transparent display had to show both the interface and the space behind it. The Magic Leap AR experience required 3D assets optimized for the device's processing constraints. The VR environment needed to feel immersive yet intuitive at human scale. The digital twin exploration was built from the ground up to work across gamepad, mouse, and keyboard.</>,
          <>Conveying the central structure’s scale was a recurring challenge. Its size was unlike anything most visitors had encountered, leaving them with no obvious reference point. In AR, I designed visual cues that immediately communicated its volume. In VR, the Wadis were crafted to feel vast yet unhurried. On the interactive map, each district was given a distinct identity, clarifying the full development. Every detail was deliberate, helping visitors grasp the scope of the project without feeling overwhelmed.</>,
          <>The shared AR experience was built around one narrator guiding a small group of participants. Handing control to attendees could have fragmented the story. The table’s placement against a wall, with a screen above, allowed multiple participants to engage while naturally drawing in passersby. The VR station mirrored the headset view on a wall screen, letting bystanders follow without waiting.</>,
          <>The iPad companion exemplified systems thinking in action. Planned from the start but kept off the client brief due to tight timelines, it mirrored the AR session in real time. This ensured that even visitors without headsets could follow along, keeping groups engaged and amplifying curiosity. Seeing participants interact with something invisible sparked questions, and the iPad allowed everyone nearby to join the experience.</>,
          <>Across all six experiences, we maintained consistent interaction patterns despite four input paradigms: touch, AR controllers, VR controllers, and gamepad/mouse. This allowed visitors to move between experiences seamlessly, preserving immersion and narrative clarity. Every choice reflected a careful balance of technical feasibility, user experience, and storytelling impact. These decisions would be tested live in the weeks to come.</>,
        ],
      },
      {
        id:      'measure',
        eyebrow: 'Measure & Review',
        heading: 'Iterating live, under pressure',
        body: [
          'The experiences ran live across the full week of MIPIM, engaging investors and industry figures in one of the event\'s most competitive environments. As the sole designer on site, I ran AR sessions, presented to groups, calibrated headsets, and troubleshot in real time.',
          <>The presenter-led AR sessions ran approximately ten minutes each. The script took a couple of sessions to refine: observing real audience reactions in the room made the adjustments obvious. After those early refinements, the results were clear: across the entire week, only one participant left before the end of a session. Everyone else stayed, asked questions during and after, and many exchanged business cards on their way out. Every engaged investor, identifiable by their purple delegate badge, was personally introduced to the client's business team.</>,
          <>Early on, one issue arose: the interactive map had been tested on a different touchscreen at home. The transparent display at the event behaved differently. I located the correct drivers, collaborated with the engineer remotely, and adapted interactions so the experience ran smoothly for the next session.</>,
          <>Exact visitor numbers were impossible to track among 20,000+ attendees, but the space ran at capacity from opening to close each day. The impact extended beyond the event: the project became the start of a multi-year partnership with the client. Feedback was strong. Several attendees described it as the most impressive experience they’d seen at MIPIM that year.</>,
          <>Shipping live and iterating on-site was a unique design challenge. Being in the room with users allowed me to <strong>observe behavior, make rapid decisions, and ensure the experience delivered as intended</strong>, a perspective few digital projects offer.</>,
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
      tracker:   "The AR tracker at the centre of the table, derived from the client's logo.",
      floorPlan: 'Floor plan of the experience space with the six installations.',
      arSession: 'Leading a presenter-led AR session at MIPIM.',
      map:       'Interact with the map to explore time zones.',
    },
  },

  fr: {
    skipToMain:  'Aller au contenu principal',
    pageTitle:   'Expériences XR • Atelier Digital',
    label:       'Étude de cas • Réalité étendue',
    title:       'Révéler un Mégaprojet',
    tagline:     "L’architecture de l’engagement lors d’un dévoilement mondial.",
    stats: [
      { countTo: 6, decimals: 0, prefix: '', suffix: '',           label: 'Apps' },
      { countTo: 3, decimals: 0, prefix: '', suffix: ' XR',        label: 'Expériences' },
      { countTo: 1, decimals: 0, prefix: '', suffix: ' UX',        label: 'Designer' },
      { countTo: 6, decimals: 0, prefix: '', suffix: ' semaines',  label: 'Pour livrer' },
    ],
    sections: [
      {
        id:      'team',
        eyebrow: "L’équipe",
        heading: 'Sur plusieurs fuseaux horaires',
        body: [
          <>Pour ce projet, notre équipe de cinq personnes, réparties dans quatre pays, a assuré la <strong>conception et le développement</strong> de toutes les applications de bout en bout. La production vidéo a été prise en charge par notre équipe studio.</>,
          <>Pour surmonter les contraintes du télétravail sur plusieurs fuseaux horaires, nous avons fonctionné en sprints de deux semaines avec des <strong>réunions quotidiennes</strong> alignés sur les horaires du Royaume-Uni. Cette organisation était essentiel pour :</>,
          <ul className="list-disc pl-5 flex flex-col gap-1 text-[16px] sm:text-[17px] lg:text-[18px] leading-loose text-[#262626] dark:text-[#adadad]">
            <li><strong>Maintenir la coordination</strong> et la visibilité sur l’avancement du sprint</li>
            <li><strong>Identifier les obstacles</strong> tôt pour éviter les retards</li>
            <li><strong>Comprendre l’impact du design</strong> sur l’équipe de dévelopement</li>
            <li><strong>Anticiper les risques liés à la livraison</strong> et faire des compromis</li>
            <li><strong>Guider l’évolution du design</strong> tout au long du processus</li>
          </ul>,
          <>Compte tenu de l’ambition du projet et de son calendrier serré, cette organisation nous a permis de respecter les délais, avec les équipes design et dev travaillant en synergie.</>,
        ],
        map: true,
      },
      {
        id:      'why',
        eyebrow: 'Pourquoi',
        heading: 'Une seule chance de marquer les esprits',
        body: [
          <>Il s’agissait d’une occasion unique de présenter l’un des projets urbains les plus ambitieux jamais proposés à un public mondial d’investisseurs. Avec un temps limité et des attentes élevées, il fallait rendre l’ampleur et l’ambition du projet immédiatement perceptibles, sous peine de le voir réduit à un simple concept.</>,
          <>Chaque décision comptait : l’espace, le rythme, la façon dont les groupes et les individus interagissaient. Nous avions besoin d’un système d’expériences fonctionnant ensemble pour susciter la conviction, tout en veillant à ce qu’aucune partie de l’histoire de passe à côté. L’objectif était de faire en sorte que chaque visiteur comprenne qu’il ne s’agissait pas d’un projet immobilier ordinaire, mais d’une redéfinition de ce qu’une ville pouvait être.</>,
        ],
      },
      {
        id:      'who',
        eyebrow: 'Qui',
        heading: 'Un public à enjeux élevés',
        body: [
          <>Bien que j’aie de l’expérience dans la conception d’installations à grande échelle au Royaume-Uni et au Moyen-Orient (plus de 100 000 participants), c’était ma première exposition liée à l’investissement immobilier.</>,
          <>Pour combler rapidement cette lacune, je me suis rapproché de collègues expérimentés dans les événements axés sur l’architecture, l’ingénierie et la construction, et j’ai acquis une compréhension claire des comportements, des attentes et des facteurs de décision de ce public.</>,
          <>Le simple fait de participer signalait l’intention. Les pass délégués variaient de 2 500 à 3 000 €, avec des coûts totaux souvent supérieurs 10 000 € par personne. I s’agissait d’un public investi, soumis à des contraintes de temps, où l’attention était limitée et les attentes élevées.</>,
          <>Concevoir dans ce contexte impliquait de prendre en considération trois états d’esprit distincts, chacun avec sa propre définition de la valeur :</>,
          <ul className="list-none flex flex-col gap-2 text-[16px] sm:text-[17px] lg:text-[18px] leading-loose text-[#262626] dark:text-[#adadad]">
            <li><strong>Les investisseurs</strong> À la recherche de crédibilité, d’ampleur et d’opportunités d’investissement claires.</li>
            <li><strong>Les bâtisseurs</strong> Promoteurs et architectes cherchant des moyens concrets de s’impliquer.</li>
            <li><strong>Les visionnaires</strong> Décideurs et stratèges axés sur l’impact à long terme et l’héritage.</li>
          </ul>,
        ],
      },
      {
        id:      'when-where',
        eyebrow: 'Où et quand',
        heading: 'MIPIM, Cannes',
        body: [
          <>Les expériences ont été conçues pour le <strong>MIPIM</strong>, le plus grand événement mondial dédié à l’immobilier et à l’investissement, qui se tient chaque année pendant <strong>une semaine</strong> au Palais des Festivals de Cannes, en France.</>,
          <>Pour l’événement, notre client a construit un pavillon sur deux étages dans un emplacement de premier choix, très visible. Le rez-de-chaussée accueillait deux projets, dont nos expériences, les plaçant directement dans un environnement à fort trafic.</>,
          <>Dans ce contexte, l’analyse spatiale du lieu était déterminante. La disposition, les flux et le temps de présence devaient fonctionner ensemble pour attirer l’attention, guider les déplacements et créer un impact en quelques minutes.</>,
        ],
      },
      {
        id:      'what',
        eyebrow: 'Quoi',
        heading: 'Des expériences complémentaires',
        body: [
          <>Plutôt qu’une seule installation, nous avons conçu <strong>un système de six expériences</strong>, chacune offrant un point d’entrée différent dans la même histoire.</>,
          <>Nous occupions la moitié du rez-de-chaussée du pavillon. Deux points d’entrée convergeaient vers un flux central, garantissant que la plupart des visiteurs traversaient notre espace.</>,
          <>Les expériences étaient conçues pour s’adapter aux différents types d’audience et tailles de groupes. Les grands groupes pouvaient s’engager de manière passive via l’installation audiovisuelle, les petits groupes étaient guidés par des sessions AR partagées, et les individus pouvaient explorer les autres expériences interactives à leur propre rythme.</>,
          <>Cela nous a permis d’équilibrer le flux de visiteurs, la profondeur d’engagement et les contraintes de temps dans un environnement à fort trafic.</>,
        ],
        experiences: [
          {
            number: '01',
            title:  'Installation audiovisuelle',
            tech:   'Trois murs-écrans LCD',
            body:   "Une introduction cinématographique présentant la vision et l’ampleur du projet. Narrée et produite en interne, elle posait le contexte du projet dans son ensemble.",
          },
          {
            number: '02',
            title:  'Carte interactive',
            tech:   'Écran tactile transparent',
            body:   "Un point de vue satellite de l’ensemble du développement, permettant aux visiteurs de comprendre le contexte géographique et les quartiers environnants.",
          },
          {
            number: '03',
            title:  'Expérience AR',
            tech:   'Magic Leap 2 • Unity',
            body:   "Une expérience de réalité augmentée partagée pour jusqu’à cinq participants, révélant le bâtiment central couche par couche.",
          },
          {
            number: '04',
            title:  'Compagnon 2D en temps-réel',
            tech:   'iPad',
            body:   "Une vue miroir en temps réel de l’expérience AR, garantissant que les participants sans casque de restaient engagés.",
          },
          {
            number: '05',
            title:  'Expérience VR',
            tech:   'Meta Quest 3 • Unreal',
            body:   "Une visite immersive dans les Wadis (vallées asséchées typiques de la région), permettant aux visiteurs de découvrir le développement à hauteur d’homme.",
          },
          {
            number: '06',
            title:  'Exploration du jumeau numérique',
            tech:   'Unreal Engine',
            body:   "Une exploration autonome de l’ensemble du développement et de ses quartiers.",
          },
        ],
      },
      {
        id:      'prioritise',
        eyebrow: 'Prioriser et choisir',
        heading: 'Ce qui a été retenu, et pourquoi',
        body: [
          <>L’espace physique et notre capacité de production ont défini les limites. Nous pouvions prendre en charge jusqu’à six expériences, la table de réalité augmentée étant celle censée générer le plus d’engagement. Cette table devant être construite en Arabie Saoudite et expédiée en France, elle a dû être conçue et finalisée en priorité, sans marge d’erreur.</>,
          <>Nous avons soigneusement réfléchi aux dimensions de la table pour qu’elle soit confortable pour deux utilisateurs par côté, tout en intégrant le matériel, notamment chaque casque Magic Leap, les manettes et l’unité centrale. Au centre, j’ai conçu un marqueur AR reflétant l’identité visuelle du client. Sa taille et son motif étaient essentiels : les capteurs Magic Leap et les caméras iPad devaient le détecter de manière fiable, afin que les images 3D restent précisément ancrées même lorsque les utilisateurs se déplaçaient. Je l’ai dérivé du logo du client, en l’adaptant pour respecter la charte graphique tout en étant suffisamment distinct pour que les capteurs ne se déclenchent pas sur le logo du client affiché partout dans le pavillon.</>,
          <>Placée contre un mur, avec un écran mural au-dessus, la table offrait trois côtés utilisables, et pouvait accueillir jusqu’à six utilisateurs simultanément. Chaque décision, de la taille de la table à la conception du marqueur, était délibérée, équilibrant confort des utilisateurs, faisabilité technique et cohérence de l’expérience immersive.</>,
          <>Nous avons envisagé une expérience multijoueur sur Magic Leap, mais avons choisi de ne pas la poursuivre. Bien que prometteuse, cette interconnectivité nécessitait plus d’appareils que nous n’avions à disposition pour tester correctement et prévenir les risques de malfonctionnement. De plus, la participation multiple dépendait de conditions réseau trop imprévisibles dans un environnement événementiel à forte affluence.</>,
          <>Le compagnon iPad était prévu dès le départ comme une valeur ajoutée potentielle, bien que nous ne l’ayons pas inclus dans le brief client. Avec des délais serrés et une logistique complexe, nous n’étions pas certains de pouvoir le livrer, mais il représentait une opportunité d’enrichir l’expérience. Lorsque davantage de visiteurs arrivaient qu’il n’y avait de casques disponibles, l’iPad reflétait la session AR en temps réel, maintenant le groupe engagé. Nous avions également anticipé la curiosité que cette interaction susciterait : voir des participants interagir avec quelque chose d’invisible attire naturellement l’attention, et l’iPad permettait aux passants de comprendre et de partager l’expérience.</>,
          <>La carte interactive a été volontairement simplifiée. Avec des délais limités, nous avons privilégié la clarté et la fiabilité plutôt que des fonctionnalités supplémentaires, garantissant qu’elle apporte de la valeur sans introduire de risques.</>,
        ],
      },
      {
        id:      'solve',
        eyebrow: 'Concevoir',
        heading: 'La forme suit la contrainte.',
        body: [
          <>Chaque expérience avait ses propres exigences techniques et spatiales, et chaque décision avait des conséquences. L’écran transparent devait montrer à la fois l’interface et l’espace derrière lui. L’expérience AR sur Magic Leap nécessitait du contenu 3D optimisés pour la limite de puissance graphique. L’environnement VR devait être immersif tout en restant intuitif et à échelle humaine. L’exploration du jumeau numérique devait fonctionner avec souris et clavier mais aussi avec une manette.</>,
          <>Transmettre la grandeur du bâtiment central était un défi récurrent. Sa taille était hors du commun pour la plupart des visiteurs, ne leur offrant aucun point de référence évident. En AR, j’ai conçu des repères visuels permettant de communiquer immédiatement son volume. En VR, les Wadis ont été conçus pour paraître vastes tout en donnant une sensation de calme. Sur la carte interactive, chaque quartier se voyait attribuer une identité distincte, clarifiant l’ensemble du développement. Chaque détail était pensé de manière délibérée, aidant les visiteurs à saisir l’ampleur du projet sans se sentir submergés.</>,
          <>L’expérience AR partagée était centrée sur un narrateur guidant un petit groupe de participants. Donner le contrôle aux participants aurait pu fragmenter le récit. Le positionnement de la table contre un mur, avec un écran au-dessus, permettait à plusieurs participants d’interagir tout en attirant naturellement les passants. La station VR reflétait la vue du casque sur un écran mural, permettant aux spectateurs de suivre l’action sans attendre.</>,
          <>Le compagnon iPad illustrait la pensée systémique en action. Prévu dès le départ mais omis du brief client en raison des délais serrés, elle reflétait la session AR en temps réel. Cela permettait même aux visiteurs sans lunettes de réalité augmenté de suivre, maintenant l’engagement des groupes et suscitant la curiosité. Voir les participants interagir avec quelque chose d’invisible éveillait des questions, et l’iPad permettait à tous les passants à proximité de rejoindre l’expérience.</>,
          <>Sur l’ensemble des six expériences, nous avons maintenu des schémas d’interaction cohérents malgré quatre paradigmes de saisie : tactile, contrôleurs AR, contrôleurs VR et manette/souris. Cela permettait aux visiteurs de passer d’une expérience à l’autre de manière fluide, préservant l’immersion et la clarté narrative. Chaque choix reflétait un équilibre soigneusement pensé entre faisabilité technique, expérience utilisateur et impact narratif. des décisions qui seraient testées en direct dans les semaines à venir.</>,
        ],
      },
      {
        id:      'measure',
        eyebrow: 'Mesurer et analyser',
        heading: 'Itérer en direct, sous pression',
        body: [
          <>Les expériences se sont déroulées en direct pendant toute la semaine du MIPIM, engageant investisseurs et acteurs du secteur dans l’un des environnements les plus compétitifs de l’évènement. En tant que seul designer sur place, j’ai animé les sessions AR, présenté à des groupes, calibré les casques et résolu les problèmes en temps réel.</>,
          <>Les sessions AR animées par le présentateur duraient environ dix minutes chacune. Le script a nécessité quelques sessions pour être affiné : observer les réactions réelles du public dans la salle rendait les ajustements évidents. Après ces premières améliorations, les résultats étaient clairs : pendant toute la semaine, un seul participant a quitté une session avant la fin. Tous les autres sont restés, ont posé des questions pendant et après, et beaucoup ont échangé leurs cartes de visite en sortant. Chaque investisseur engagé identifiable à son badge délégué violet a été présenté personnellement à l’équipe commerciale du client.</>,
          <>Dès le jour d’installation, un problème est apparu : la carte interactive avait été testée sur un autre écran tactile à domicile. L’écran transparent sur place se comportait différemment. J’ai trouvé les bons pilotes, collaboré à distance avec l’ingénieur, et adapté les interactions pour que l’expérience fonctionne correctement dès la session suivante.</>,
          <>Nous n’avons pas compté le nombre exact de visiteurs parmi plus de 20 000 participants, mais l’espace a fonctionné à pleine capacité de l’ouverture à la fermeture chaque jour. L’impact a dépassé l’événement : le projet a marqué le début d’un partenariat pluriannuel avec le client. Les retours ont été très positifs, plusieurs participants l’ont décrit comme l’expérience la plus impressionnante qu’ils aient vue à MIPIM.</>,
          <>Déployer l’expérience en direct et l’itérer sur place constituait un défi de conception unique. Être dans la salle avec les utilisateurs m’a permis d’observer leur comportement, de prendre des décisions rapides et de garantir que l’expérience se déroulait comme prévu, une perspective que peu de projets numériques offrent.</>,
        ],
      },
    ],
    backLabel: "Retour aux études de cas",
    placeholderAsset: 'Asset — à venir',
    flowLabels: {
      initial: "Flux initial de l’expérience AR partagée",
      initialAria: "Flux initial de l’expérience AR partagée — points de friction mis en évidence en rouge",
      shipped: "Flux du produit livré",
      shippedAria: "Flux du produit livré — actions du présentateur mises en évidence en doré",
    },
    captions: {
      xbox:      "Mappings de la manette Xbox pour explorer le jumeau numérique.",
      magicLeap: "Casque et contrôleur Magic Leap 2 utilisés pour l’expérience AR.",
      building:  "Pavillon sur deux étages construit par notre client spécifiquement pour l’événement.",
      tracker:   "Le tracker AR au centre de la table.",
      floorPlan: "Plan de l’espace d’exposition avec les six installations.",
      arSession: "Animation d’une session AR en présentiel au MIPIM.",
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
  { label: 'Unity Devs',         group: 'dev',        country: 'Scotland', color: '#C9A84C' },
  { label: 'Creative Team',      group: 'studio',     country: 'Scotland', color: '#C9A84C' },
  { label: 'Project Manager',    group: 'management', country: 'England',  color: '#6B9CE8' },
  { label: 'Product Manager',    group: 'management', country: 'UAE',      color: '#E8836B' },
  { label: 'Unreal Engine Devs', group: 'dev',        country: 'Vietnam',  color: '#6BC4A0' },
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
    headings:      { dev: 'Development', design: 'Design', management: 'Management', studio: 'Studio' },
    labels:        { Designer: 'Designer', 'Unity Devs': 'Unity Devs', 'Creative Team': 'Creative Team', 'Project Manager': 'Project Manager', 'Product Manager': 'Product Manager', 'Unreal Engine Devs': 'Unreal Engine Devs' },
    mapCaption:    'Slide or hover over the map to explore time zones.',
    groupAriaLabel: 'Team members by location',
    mapAriaLabel:   'World map showing team locations. Use left and right arrow keys to explore time zones.',
  },
  fr: {
    headings:      { dev: 'Développement', design: 'Design', management: 'Management', studio: 'Studio' },
    labels:        { Designer: 'Designer', 'Unity Devs': 'Devs Unity', 'Creative Team': "Équipe créative", 'Project Manager': 'Chef de projet', 'Product Manager': 'Product Manager', 'Unreal Engine Devs': 'Devs Unreal Engine' },
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
  const containerRef  = useRef(null);
  const mapRef        = useRef(null);           // outer map container for bounds checking
  const prevLitRef    = useRef([]);             // circles highlighted on last hover, cleared cheaply
  const legendRef     = useRef(null);           // legend container for click-outside detection

  // Deselect pill on click-outside or scroll
  useEffect(() => {
    const handleClick = (e) => {
      // Deselect unless the click landed on a pill button inside the legend
      const btn = e.target.closest('button');
      if (!btn || !legendRef.current?.contains(btn)) {
        setSelected(null);
      }
    };
    const handleScroll = () => setSelected(null);
    document.addEventListener('pointerdown', handleClick);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', handleClick);
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

    const rect = svg.querySelector('rect');
    if (rect) rect.setAttribute('fill', 'transparent');

    const bgOpacity  = isDark ? 0.45 : 0.45;
    const bgHoverDim = isDark ? 0.06 : 0.15;
    const labelColor = isDark ? '#f6f6f6' : '#1f1f1f';

    // CSS: [data-active] triggers blanket dim; matching elements get inline opacity overrides
    const style = doc.createElementNS('http://www.w3.org/2000/svg', 'style');
    style.textContent = `
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

    // Find the last two rows to compute row spacing, then place labels one row below the last dot row
    const sortedCys  = [...new Set(allCircles.map(c => parseFloat(c.getAttribute('cy'))))].sort((a, b) => a - b);
    const maxCy      = sortedCys[sortedCys.length - 1];
    const prevCy     = sortedCys[sortedCys.length - 2] ?? maxCy;
    const rowSpacing = maxCy - prevCy;
    const labelY     = maxCy + rowSpacing;

    // Extend the viewBox downward so the label row is inside it — overflow:visible paints outside
    // the viewBox but browsers clip pointer events to the viewBox boundary.
    const vb = (svg.getAttribute('viewBox') || `0 0 ${SVG_W} ${SVG_H}`).trim().split(/[\s,]+/);
    const extendedVbH = parseFloat(vb[3]) + rowSpacing + 30;
    svg.setAttribute('viewBox', `${vb[0]} ${vb[1]} ${vb[2]} ${extendedVbH}`);

    // Collect last-row cx values grouped by tz (to find the middle x of each group)
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
          y: (parseFloat(circle.getAttribute('cy')) / extendedVbH) * 100,
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
    });
    svg.appendChild(labelsG);

    const tzList = Object.keys(lastRowByTz).sort((a, b) => parseFloat(a) - parseFloat(b));
    return { svgHtml: svg.outerHTML, dotPositions: positions, tzList };
  }, [isDark]);

  // Mobile: press-and-slide to scrub through timezones by finger x position
  useEffect(() => {
    const el = mapRef.current;
    if (!el || !tzList.length) return;

    let startX = null;

    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
      const r = el.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (startX - r.left) / r.width));
      const idx = Math.min(tzList.length - 1, Math.floor(pct * tzList.length));
      setSelected({ tz: tzList[idx], country: null });
    };

    // touch-action: pan-y on the element lets the browser handle vertical scroll
    // natively; horizontal moves come straight to this handler without conflict.
    const onTouchMove = (e) => {
      if (startX === null) return;
      const r = el.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.touches[0].clientX - r.left) / r.width));
      const idx = Math.min(tzList.length - 1, Math.floor(pct * tzList.length));
      setSelected({ tz: tzList[idx], country: null });
    };

    const onTouchEnd = () => { startX = null; };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove',  onTouchMove,  { passive: true });
    el.addEventListener('touchend',   onTouchEnd,   { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove',  onTouchMove);
      el.removeEventListener('touchend',   onTouchEnd);
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
      // Pill-selected mode: only un-dim the specific country dot; tz column stays dimmed
      const dot = svgEl.querySelector(`[data-country="${selected.country}"]`);
      if (dot) { dot.style.opacity = '1'; lit.push(dot); }
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
        style={{ cursor: 'crosshair', touchAction: 'pan-y' }}
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
        <div ref={containerRef} className="w-full" dangerouslySetInnerHTML={{ __html: svgHtml }} />
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
                  onMouseEnter={() => setHovered({ tz: dotTz, country: dot.country })}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(prev => prev?.tz === dotTz ? null : { tz: dotTz, country: dot.country })}
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
              <ul className="flex flex-wrap gap-x-10 gap-y-6 sm:gap-x-16 mt-2" aria-label="Key figures">
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

                  {/* Xbox keybinding — after first para of Solve */}
                  {section.id === 'solve' && (
                    <figure className="flex flex-col gap-2">
                      <div className="bg-[#141414] rounded-[16px] sm:rounded-[20px] p-6"
                           dangerouslySetInnerHTML={{ __html: xboxSvg }} />
                      <figcaption className="text-[12px] text-[#5c5c5c] dark:text-[#adadad] text-center">{t.captions.xbox}</figcaption>
                    </figure>
                  )}

                  {/* AR session photo — after first para of Measure */}
                  {section.id === 'measure' && (
                    <figure className="flex flex-col gap-2 max-w-lg mx-auto">
                      <img
                        src={eventPresentationPhoto}
                        alt="Leading a presenter-led AR session at MIPIM"
                        className="w-full rounded-[16px] sm:rounded-[20px] object-cover"
                      />
                      <figcaption className="text-[12px] text-[#5c5c5c] dark:text-[#adadad] text-center">{t.captions.arSession}</figcaption>
                    </figure>
                  )}

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
                          {/* Flowcharts — after para 3 of Solve (i===2 in slice, renders before para 4) */}
                          {section.id === 'solve' && i === 2 && (
                            <div className="flex flex-col gap-2 w-full">
                              <div className="flex flex-col sm:flex-row gap-4 w-full">
                                {[
                                  { raw: rawFlowInitial, label: t.flowLabels.initial, ariaLabel: t.flowLabels.initialAria },
                                  { raw: rawFlowShipped, label: t.flowLabels.shipped, ariaLabel: t.flowLabels.shippedAria, expandViewBox: '-154 0 621 1053' },
                                ].map(({ raw, label, ariaLabel, expandViewBox }) => {
                                  let svg = translateFlowSvg(raw, lang)
                                    .replace(/(<svg[^>]*)\swidth="[^"]*"\sheight="[^"]*"/, `$1 role="img" aria-label="${ariaLabel}" style="width:100%;height:auto"`)
                                    .replace(/<rect width="\d+" height="\d+" fill="white"\/>/, '');
                                  if (expandViewBox) svg = svg.replace(/viewBox="[^"]*"/, `viewBox="${expandViewBox}"`);
                                  if (isDark) {
                                    svg = svg
                                      .replace(/(<svg[^>]*>)/, '$1<rect width="100%" height="100%" fill="#141414"/>')
                                      .replace(/fill="white" stroke=/g, 'fill="#141414" stroke=')
                                      .replace(/stroke="#FF0000"/g, 'stroke="#C0392B"')
                                      .replace(/fill="#1E1E1E"/g, 'fill="white" fill-opacity="0.8"')
                                      .replace(/fill="black" fill-opacity="0\.8"/g, 'fill="white" fill-opacity="0.8"')
                                      .replace(/fill="black"/g, 'fill="white" fill-opacity="0.8"');
                                  } else {
                                    svg = svg
                                      .replace(/fill="#815A00" stroke="#815A00"/g, 'fill="#C9A84C" stroke="#C9A84C"')
                                      .replace(/<text fill="white"/g, '<text fill="#1A1200"');
                                  }
                                  return (
                                    <figure key={label} className="flex flex-col gap-2 flex-1">
                                      <div className="bg-white dark:bg-[#141414] rounded-[16px] sm:rounded-[20px] p-4 w-full overflow-hidden" dangerouslySetInnerHTML={{ __html: svg }} />
                                      <figcaption className="text-[12px] text-[#5c5c5c] dark:text-[#adadad] text-center">{label}</figcaption>
                                    </figure>
                                  );
                                })}
                              </div>
                            </div>
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
                          {section.id === 'when-where' && i === 1 && (
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
                          {p?.type === 'ul'
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
