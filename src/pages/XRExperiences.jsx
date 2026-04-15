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
      { countTo: 1, decimals: 0, prefix: '', suffix: ' UX',     label: 'System' },
      { countTo: 6, decimals: 0, prefix: '', suffix: ' weeks',  label: 'Delivery' },
    ],
    sections: [
      {
        id:      'why',
        eyebrow: 'Context',
        heading: 'One shot at first impression',
        tile: true,
        body: [
          <>We were commissioned to unveil a large-scale <strong>urban development</strong>.</>,
          { type: 'callout', variant: 'goal', label: 'Goal', body: <>Immediate conviction of <strong>scale</strong> and <strong>ambition</strong>.</> },
        ],
      },
      {
        id:      'when-where',
        eyebrow: 'When & Where',
        heading: 'MIPIM, Cannes',
        tile: true,
        body: [
          <>A high-density <strong>one week</strong> event.</>,
        ],
      },
      {
        id:      'who',
        eyebrow: 'Who',
        heading: 'A high-stakes audience',
        tile: true,
        body: [
          <>Delegate passes cost <strong>€2,500 to €3,000</strong> per person.</>,
<>We targeted three audience types:</>,
          <ul className="list-none flex flex-col gap-2 text-copy-m font-normal leading-loose text-fg-secondary">
            <li><strong>Investors</strong> seeking credibility and clear investable opportunity.</li>
            <li><strong>Developers and architects</strong> looking for tangible ways to engage.</li>
            <li><strong>Visionaries</strong> focused on long-term impact and legacy.</li>
          </ul>,
        ],
      },
      {
        id:      'team',
        eyebrow: 'Our team',
        heading: 'Distributed by design',
        body: [
          <>Core team of <strong>five</strong> across <strong>four countries</strong> delivering <strong>XR system end-to-end</strong>.</>,
          { type: 'h3', text: 'Delivery model' },
          <><strong>2-week sprints</strong> · <strong>Daily UK-aligned stand-ups</strong><br />→ Fast trade-offs, rapid iteration, early blocker detection</>,
          { type: 'callout', variant: 'gold', label: 'My role', body: <>Sole Senior UX/UI Designer across <strong>6 XR applications</strong>, I led interaction system design and cross-device UX decisions under tight delivery constraints.</>
 },
        ],
        map: true,
        tile: true,
      },
      {
        id:      'what',
        eyebrow: 'What',
        heading: 'Experiential system',
        body: [
          <>Instead of one large installation, <strong>six complementary experiences</strong> forming a single narrative system.</>,
        ],
        footerCallout: { label: 'Spatial UX Consideration', body: 'Spatial flow guided visitors sequentially across experiences to maximise engagement.' },
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
        heading: 'Decision under constraints',
        body: [
          <><strong>AR table</strong> prioritised as the central experience based on engagement and logistical constraints.<br />→ Optimised for hardware setup and group interaction.</>,
          <>Designed a <strong>branded AR tracker</strong>, optimised for reliable detection across <strong>Magic Leap</strong> and <strong>iPad</strong>.</>,
          { type: 'h3', text: 'What didn\'t make it' },
          <>Multiplayer AR was explored but not pursued due to <strong>device limitations</strong> and <strong>unreliable event network conditions</strong>.</>,
          <>A <strong>colour-coded laser pointer</strong> system was retained to support shared focus during the experience.</>,
          { type: 'h3', text: 'What was overdelivered' },
          <><strong>iPad companion app</strong> introduced to extend engagement beyond headset users.</>,
          { type: 'h3', text: 'What was scoped down' },
          <>Interactive map scoped back to prioritise <strong>clarity</strong> and <strong>reliability</strong> over feature depth.</>,
          { type: 'callout', label: 'UX Insight', body: <>Technical and spatial constraints led to <strong>structured, presenter-led</strong> and <strong>guided interactions</strong>.</> },
        ],
      },
      {
        id:      'solve',
        eyebrow: 'Solve',
        heading: 'Form follows constraint',
        body: [
          <>Each experience was shaped by <strong>technical and spatial constraints</strong>:</>,
          <ul className="list-disc pl-5 flex flex-col gap-1 text-copy-m font-normal leading-loose text-fg-secondary">
            <li><strong>Transparent display:</strong> Balanced UI visibility with physical environment</li>
            <li><strong>AR (Magic Leap 2):</strong> Optimised for device limits and up to five concurrent users</li>
            <li><strong>iPad app:</strong> Mirrored AR sessions for non-headset engagement</li>
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
          <>A <strong>presenter-led AR flow</strong> anchored the experience, supported by mirrored outputs that extended engagement beyond headset users. Consistent interaction logic across <strong>AR, VR, touch, and gamepad</strong> ensured seamless transitions between experiences and devices.</>,
          { type: 'h3', text: 'Approaches' },
          <>Initial AR flow allowed users to choose between solo and shared modes, but onboarding steps (app selection, tracking, calibration) introduced <strong>friction</strong> and delayed engagement.</>,
          <>We consolidated this into a single <strong>presenter-led, pre-calibrated experience</strong>, removing setup complexity and standardising the interaction flow.</>,
          { type: 'h3', text: 'System decisions' },
          <ul className="list-disc pl-5 flex flex-col gap-1 text-copy-m font-normal leading-loose text-fg-secondary">
            <li><strong>AR table:</strong> Single guided flow with mirrored iPad for observers</li>
            <li><strong>VR:</strong> Wall mirroring enabled shared viewing without breaking immersion</li>
            <li><strong>Interactive map + digital twin:</strong> Simplified navigation across input types</li>
            <li><strong>Film installation:</strong> Controlled pacing and spatial cues for group flow</li>
          </ul>,
          { type: 'callout', label: 'Key principle', body: <>All interactions were designed to minimise friction, preserve <strong>narrative flow</strong>, and ensure <strong>consistency</strong> across AR, VR, and screen-based experiences.</> },
        ],
      },
      {
        id:      'measure',
        eyebrow: 'Measure & Impact',
        heading: 'Live deployment',
        body: [
          <>Presenter-led AR sessions consistently retained participants for full <strong>10-minute experiences</strong>. Observers remained engaged through mirrored <strong>iPad and VR outputs</strong>, enabling parallel participation across formats. The pavilion operated at <strong>full capacity</strong> throughout the event, leading to strong client feedback and an extended <strong>multi-year partnership</strong>.</>,
          { type: 'callout', label: 'UX Insight', body: <>Working on-site allowed direct observation of participant behaviour, enabling rapid refinements to <strong>pacing</strong> and <strong>interaction flow</strong> in response to real-time engagement patterns and session dynamics.</> },
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
      tracker:   "Reliable tracking, aligned with brand.",
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
      { countTo: 1, decimals: 0, prefix: '', suffix: ' UX',        label: 'Système' },
      { countTo: 6, decimals: 0, prefix: '', suffix: ' semaines',  label: 'Pour livrer' },
    ],
    sections: [
      {
        id:      'why',
        eyebrow: 'Contexte',
        heading: 'Une chance de marquer les esprits',
        tile: true,
        body: [
          <>Nous avons eu l'opportunité de révéler un <strong>développement urbain</strong>.</>,
          { type: 'callout', variant: 'goal', label: 'Objectif', body: <>Conviction immédiate d'<strong>ampleur</strong> et d'<strong>ambition</strong>.</> },
        ],
      },
      {
        id:      'when-where',
        eyebrow: 'Où et quand',
        heading: 'MIPIM, Cannes',
        tile: true,
        body: [
          <>Un événement à haute densité sur <strong>une semaine</strong>.</>,
        ],
      },
      {
        id:      'who',
        eyebrow: 'Qui',
        heading: 'Un public à enjeux élevés',
        tile: true,
        body: [
          <>Les passes délégués coûtaient <strong>2 500 à 3 000 €</strong> par personne.</>,
          <>Nous avons ciblé trois types de public :</>,
          <ul className="list-none flex flex-col gap-2 text-copy-m font-normal leading-loose text-fg-secondary">
            <li><strong>Les investisseurs</strong> en quête de crédibilité et d'une opportunité d'investissement claire.</li>
            <li><strong>Les développeurs et architectes</strong> cherchant des moyens concrets de s'impliquer.</li>
            <li><strong>Les visionnaires</strong> focalisés sur l'impact à long terme et l'héritage.</li>
          </ul>,
        ],
      },
      {
        id:      'team',
        eyebrow: "L'équipe",
        heading: 'Sur plusieurs fuseaux',
        body: [
          <>Équipe de <strong>cinq</strong> personnes répartie dans <strong>quatre pays</strong>, pour livrer le <strong>système XR de bout en bout</strong>.</>,
          { type: 'h3', text: 'Modèle de travail' },
          <><strong>Sprints de 2 semaines</strong> · <strong>Stand-ups quotidiens alignés sur le Royaume-Uni</strong><br />→ Arbitrages rapides, itération accélérée, détection précoce des blocages</>,
          { type: 'callout', variant: 'gold', label: 'Mon rôle', body: <>Seul Senior UX/UI Designer sur <strong>6 applications XR</strong>, j'ai piloté la conception du système d'interaction et les décisions UX multi-appareils dans des délais de livraison serrés.</> },
        ],
        map: true,
        tile: true,
      },
      {
        id:      'what',
        eyebrow: 'Quoi',
        heading: 'Système expérientiel',
        body: [
          <>Plutôt qu'une grande installation unique, <strong>six expériences complémentaires</strong> formant un système narratif cohérent.</>,
        ],
        footerCallout: { label: 'Considération UX Spatiale', body: 'Le flux spatial guidait les visiteurs séquentiellement à travers les expériences pour maximiser l\'engagement.' },
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
        heading: 'Décision sous contraintes',
        body: [
          <><strong>Table AR</strong> priorisée comme expérience centrale en raison de l'engagement et des contraintes logistiques.<br />→ Optimisée pour l'installation matérielle et l'interaction en groupe.</>,
          <>Conception d'un <strong>tracker AR brandé</strong>, optimisé pour une détection fiable sur <strong>Magic Leap</strong> et <strong>iPad</strong>.</>,
          { type: 'h3', text: "Ce qui n'a pas été retenu" },
          <>La réalité augmentée multijoueur a été explorée mais abandonnée en raison des <strong>limitations des appareils</strong> et des <strong>conditions réseau instables en événement</strong>.</>,
          <>Un système de <strong>pointeur laser coloré</strong> a été conservé pour maintenir une attention partagée pendant l'expérience.</>,
          { type: 'h3', text: 'Ce qui a été livré en plus' },
          <><strong>Application compagnon iPad</strong> introduite pour prolonger l'engagement au-delà des utilisateurs avec casque.</>,
          { type: 'h3', text: 'Ce qui a été simplifié' },
          <>La carte interactive a été recentrée pour prioriser la <strong>clarté</strong> et la <strong>fiabilité</strong> plutôt que la profondeur fonctionnelle.</>,
          { type: 'callout', label: 'UX Insight', body: <>Les contraintes techniques et spatiales ont orienté vers des <strong>interactions structurées, guidées par un présentateur</strong>.</> },
        ],
      },
      {
        id:      'solve',
        eyebrow: 'Concevoir',
        heading: 'La forme suit la contrainte',
        body: [
          <>Chaque expérience a été façonnée par des <strong>contraintes techniques et spatiales</strong> :</>,
          <ul className="list-disc pl-5 flex flex-col gap-1 text-copy-m font-normal leading-loose text-fg-secondary">
            <li><strong>Écran transparent :</strong> Équilibre entre visibilité de l'interface et environnement physique</li>
            <li><strong>AR (Magic Leap 2) :</strong> Optimisé pour les limites de l'appareil et jusqu'à cinq utilisateurs simultanés</li>
            <li><strong>Application iPad :</strong> Sessions AR en miroir pour l'engagement sans casque</li>
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
          <>Un <strong>flux AR guidé par un présentateur</strong> ancrait l'expérience, soutenu par des sorties en miroir qui étendaient l'engagement au-delà des utilisateurs avec casque. Une logique d'interaction cohérente sur <strong>AR, VR, tactile et manette</strong> assurait des transitions fluides entre les expériences et les appareils.</>,
          { type: 'h3', text: 'Approches' },
          <>Le flux AR initial permettait aux utilisateurs de choisir entre les modes solo et partagé, mais les étapes d'onboarding (sélection d'app, tracking, calibration) introduisaient des <strong>frictions</strong> et retardaient l'engagement.</>,
          <>Nous avons consolidé cela en une <strong>expérience unique guidée par un présentateur, pré-calibrée</strong>, supprimant la complexité de configuration et standardisant le flux d'interaction.</>,
          { type: 'h3', text: 'Décisions système' },
          <ul className="list-disc pl-5 flex flex-col gap-1 text-copy-m font-normal leading-loose text-fg-secondary">
            <li><strong>Table AR :</strong> Flux guidé unique avec iPad en miroir pour les observateurs</li>
            <li><strong>VR :</strong> Le miroir mural permettait une visualisation partagée sans rompre l'immersion</li>
            <li><strong>Carte interactive + jumeau numérique :</strong> Navigation simplifiée sur tous les types de saisie</li>
            <li><strong>Installation audiovisuelle :</strong> Rythme contrôlé et repères spatiaux pour le flux de groupe</li>
          </ul>,
          { type: 'callout', label: 'Principe clé', body: <>Toutes les interactions ont été conçues pour minimiser les frictions, préserver le <strong>flux narratif</strong> et garantir la <strong>cohérence</strong> sur les expériences AR, VR et sur écran.</> },
        ],
      },
      {
        id:      'measure',
        eyebrow: 'Mesurer et analyser',
        heading: 'Déploiement en direct',
        body: [
          <>Les sessions de réalité augmentée guidées retenaient régulièrement les participants pendant la totalité des <strong>10 minutes</strong>. Les observateurs restaient engagés grâce aux sorties <strong>iPad et VR en miroir</strong>, permettant une participation parallèle sur tous les formats. Le pavillon a fonctionné à <strong>pleine capacité</strong> tout au long de l'événement, générant des retours clients très positifs et un <strong>partenariat pluriannuel</strong>.</>,
          { type: 'callout', label: 'UX Insight', body: <>La présence sur place a permis l'observation directe du comportement des participants, permettant des ajustements rapides du <strong>rythme</strong> et du <strong>flux d'interaction</strong> en réponse aux dynamiques d'engagement en temps réel.</> },
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
      satellite: "Représentation de la taille immense du site.",
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
      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-tooltip font-medium text-fg-on-dark-opacity-64 tabular-nums pointer-events-none">
        {index + 1} / {slides.length}
      </span>

      {/* Close */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        aria-label={closeLbl}
        data-spring
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-lightbox-btn-bg hover:bg-lightbox-btn-bg-hover transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightbox-fg-muted"
      >
        <img src={imgClose} alt="" width={20} height={20} className="brightness-0 invert" />
      </button>

      {/* Prev */}
      <button
        data-spring
        onClick={(e) => { e.stopPropagation(); go(Math.max(0, index - 1)); }}
        disabled={index === 0}
        aria-label={prevLbl}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-lightbox-btn-bg hover:bg-lightbox-btn-bg-hover transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightbox-fg-muted"
      >
        <img src={imgChevronLeft} alt="" width={20} height={20} className="brightness-0 invert" />
      </button>

      {/* Next */}
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
          .replace(/fill="#815A00" stroke="#815A00"/g, 'fill="#C9A84C" stroke="#C9A84C"')
          .replace(/(<svg[^>]*>)/, '$1<style>text,tspan{fill:rgba(255,255,255,0.85)} g:has(rect[fill="#C9A84C"]) text,g:has(rect[fill="#C9A84C"]) tspan{fill:#000000!important}</style><rect width="100%" height="100%" fill="#141414"/>')
          .replace(/fill="white" stroke=/g,        'fill="#141414" stroke=')
          .replace(/stroke="#FF0000"/g,             'stroke="#C0392B"')
          .replace(/fill="#1E1E1E"/g,               'fill="white" fill-opacity="0.8"')
          .replace(/fill="black" fill-opacity="0\.8"/g, 'fill="white" fill-opacity="0.8"')
          .replace(/fill="black"/g,                 'fill="white" fill-opacity="0.8"');
      } else {
        svg = svg
          .replace(/fill="#815A00" stroke="#815A00"/g, 'fill="#C9A84C" stroke="#C9A84C"')
          .replace(/(<(?:text|tspan)\b[^>]*)fill="white"/g, '$1fill="#000000"');
      }
      let lightboxSvg = svg
        .replace(/style="width:100%;height:auto"/, 'style="height:80vh;width:auto;max-width:90vw;display:block"')
        .replace(/<rect width="100%" height="100%"[^>]*\/>/, '')
        .replace(/(<(?:text|tspan)\b[^>]*)\s+fill-opacity="[^"]*"/g, '$1');
      if (!isDark) {
        lightboxSvg = lightboxSvg
          .replace(/fill="black"/g, 'fill="white"');
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
    <div data-squircle className="rounded-radius-6 bg-bg-page border border-feedback-neutral-border px-5 py-4 flex flex-col gap-4 sm:w-fit">
      <h2 className="text-label-s font-semibold leading-[1.4] uppercase tracking-wider text-fg-secondary">{label}</h2>
      <div className="flex flex-wrap items-start gap-x-12 gap-y-6">
        {categories.map(cat => (
          <div key={cat.label} className="flex flex-col gap-3">
            <h3 className="text-overline-s font-medium leading-[1.4] uppercase tracking-wider text-fg-muted">{cat.label}</h3>
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
                    ? 'text-fg-primary font-semibold bg-nav-active-bg'
                    : 'text-fg-muted font-normal hover:text-fg-primary hover:bg-nav-active-bg'
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

        {/* ── Hero ── */}
        <section
          aria-labelledby="xr-hero-heading"
          className="relative min-h-screen flex flex-col bg-bg-surface overflow-hidden"
          onTouchStart={onHeroTouchStart}
          onTouchEnd={onHeroTouchEnd}
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
              <p className="text-display-2 font-semibold leading-tight text-fg-on-dark-opacity-90 max-w-2xl lg:whitespace-nowrap">
                {t.tagline}
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-6 sm:flex sm:flex-wrap sm:gap-x-16 mt-2" aria-label="Key figures">
                {t.stats.map((s, i) => (
                  <li key={i} className="flex flex-col gap-1">
                    <span className="text-display-2 font-semibold leading-tight tabular-nums whitespace-nowrap" style={{ color: GOLD }}>
                      <AnimatedStat prefix={s.prefix} countTo={s.countTo} suffix={s.suffix} ready={heroReady} />
                    </span>
                    <span className="text-label-s font-semibold leading-[1.4] uppercase tracking-wider text-fg-on-dark-opacity-64">{s.label}</span>
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
                  className={`${si === 0 ? 'pt-8' : 'pt-3'} ${si === t.sections.length - 1 ? 'pb-16' : 'pb-3'} sm:${si === 0 ? 'pt-10' : 'pt-5'} sm:${si === t.sections.length - 1 ? 'pb-20' : 'pb-5'} lg:${si === 0 ? 'pt-24' : 'pt-6'} lg:${si === t.sections.length - 1 ? 'pb-24' : 'pb-6'} scroll-mt-24 focus-visible:outline-none${section.tile !== false ? '' : ' flex flex-col gap-8 sm:gap-10 lg:gap-12'}`}
                >
                  <div className={section.tile !== false ? 'bg-bg-page rounded-radius-6 sm:rounded-radius-8 lg:rounded-radius-12 p-6 sm:p-12 lg:p-[60px] flex flex-col gap-6 sm:gap-8' : 'contents'}>
                  {/* Eyebrow + heading */}
                  <div className="flex flex-col gap-3">
                    <p className="text-label-s font-semibold leading-[1.4] uppercase tracking-wider gold-text">
                      {section.eyebrow}
                    </p>
                    <h2
                      id={`${section.id}-heading`}
                      className="text-h2 font-bold leading-tight text-fg-primary"
                    >
                      {section.heading}
                    </h2>
                  </div>

                  {/* Body paragraphs — first para, then map (if any), then rest */}
                  <div className={`flex flex-col gap-8${section.tile !== false ? '' : ' max-w-3xl'}`}>
                    {section.body.slice(0, 1).map((p, i) => (
                      p?.type === 'ul'
                        ? <div key={i}>{p}</div>
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
                        alt="Leading a presenter-led AR session at MIPIM"
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
                          {/* Satellite photo — after para 1 of Why */}
                          {section.id === 'why' && i === 0 && (
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
                          {/* AR session photo — before Reflection text in Measure */}
                          {section.id === 'measure' && i === 4 && (
                            <figure className="flex flex-col gap-2 max-w-lg mx-auto">
                              <img
                                src={eventPresentationPhoto}
                                alt="Leading a presenter-led AR session at MIPIM"
                                data-squircle
                                className="w-full rounded-radius-4 sm:rounded-radius-5 object-cover"
                              />
                              <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{t.captions.arSession}</figcaption>
                            </figure>
                          )}
                          {/* Xbox keybinding — after list in Solve */}
                          {section.id === 'solve' && i === 1 && (
                            <figure className="flex flex-col gap-2">
                              <div data-squircle className="dark bg-bg-page rounded-radius-4 sm:rounded-radius-5 p-6"
                                   dangerouslySetInnerHTML={{ __html: xboxSvg }} />
                              <figcaption className="text-fine-print font-normal leading-normal text-fg-muted text-center">{t.captions.xbox}</figcaption>
                            </figure>
                          )}
                          {/* Flowcharts — after Approaches heading in Solve */}
                          {section.id === 'solve' && i === 8 && (
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
                                <div data-squircle className="mt-6 rounded-radius-4 bg-feedback-success-bg border border-feedback-success-border px-5 py-4 flex flex-col gap-3">
                                  <span className="text-overline-s font-medium leading-[1.4] uppercase tracking-wider text-feedback-success-fg">{p.label}</span>
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
                              : p.variant === 'sky' || p.variant === 'gold'
                              ? (
                                <div data-squircle className={`mt-6 rounded-radius-4 px-5 py-4 flex flex-col gap-3 ${p.variant === 'gold' ? 'bg-feedback-warning-bg border border-feedback-warning-border' : 'bg-palette-sky-bg border border-palette-indigo-bg'}`}>
                                  <span className={`text-overline-s font-medium leading-[1.4] uppercase tracking-wider ${p.variant === 'gold' ? 'text-palette-yellow-fg' : 'text-palette-indigo-fg'}`}>{p.label}</span>
                                  <p className={bodyText}>{p.body}</p>
                                </div>
                              )
                              : (
                              <div data-squircle className="mt-6 rounded-radius-4 bg-feedback-warning-bg border border-feedback-warning-border px-5 py-4 flex flex-col gap-3">
                                <span className="text-overline-s font-medium leading-[1.4] uppercase tracking-wider text-feedback-warning-fg">{p.label}</span>
                                <p className={bodyText}>{p.body}</p>
                              </div>
                            )
                            : p?.type === 'h3'
                              ? <h3 className={`${p.mt ?? 'mt-4'} text-h3 font-semibold leading-snug text-fg-primary`}>{p.text}</h3>
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
                        data-squircle
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
                    <div data-squircle className="mt-6 rounded-radius-4 bg-feedback-warning-bg border border-feedback-warning-border px-5 py-4 flex flex-col gap-3 max-w-3xl">
                      <span className="text-overline-s font-medium leading-[1.4] uppercase tracking-wider text-feedback-warning-fg">{section.footerCallout.label}</span>
                      <div className={bodyText}>{section.footerCallout.body}</div>
                    </div>
                  )}

                  </div>{/* end tile/contents wrapper */}
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-cta-600 hover:bg-cta-700 text-fg-on-accent-opacity-95 font-medium text-tag-m leading-[1.2] rounded-full border border-accent-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2"
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
        className={`md:hidden fixed bottom-2 left-4 right-4 z-40 flex justify-center pointer-events-none transition-opacity duration-300 ${scrolledDown && !atBottom && !scrollingDown ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
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
