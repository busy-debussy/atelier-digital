import { useEffect, useState, useRef } from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import imgPortrait     from '../assets/photos/portrait.webp';
import imgSend         from '../assets/icons/icon-send.svg';
import imgLinkedIn     from '../assets/icons/icon-linkedin.svg';
import imgChevronDown       from '../assets/icons/icon-chevron-down.svg';
import imgChevronLeft       from '../assets/icons/icon-chevron-left.svg';
import imgChevronRight      from '../assets/icons/icon-chevron-right.svg';
import imgLogoSoluisLight   from '../assets/logos/employers/logo-soluis-light.webp';
import imgLogoSoluisDark    from '../assets/logos/employers/logo-soluis-dark.webp';
import imgLogoHoloxica      from '../assets/logos/employers/logo-holoxica-light.webp';
import imgLogoHoloxicaDark  from '../assets/logos/employers/logo-holoxica-dark.webp';
import imgLogoShootPost     from '../assets/logos/employers/logo-shoot-and-post.webp';
import imgLogoCreativeMode  from '../assets/logos/employers/logo-creative-mode.webp';
import imgLogoEdinburghNapierLight from '../assets/logos/education/logo-edinburgh-napier-light.webp';
import imgLogoEdinburghNapierDark  from '../assets/logos/education/logo-edinburgh-napier-dark.webp';
import imgLogoUnivTours            from '../assets/logos/education/logo-universite-de-tours.webp';
import imgLogoIutDeBlois           from '../assets/logos/education/logo-iut-de-blois.webp';
import imgLogoBenjaminFranklinLight from '../assets/logos/education/logo-lycee-benjamin-franklin-light.webp';
import imgLogoBenjaminFranklinDark  from '../assets/logos/education/logo-lycee-benjamin-franklin-dark.webp';
import imgLogoGlasgow              from '../assets/logos/education/logo-glasgow-university.webp';
import imgLogoGoogle               from '../assets/logos/education/logo-google.webp';
import imgIconAward                from '../assets/icons/icon-award.svg';
import imgIconTouch      from '../assets/icons/expertise-touch.svg';
import imgIconVector     from '../assets/icons/expertise-vector.svg';
import imgIcon3D         from '../assets/icons/expertise-3d.svg';
import imgIconMedia      from '../assets/icons/expertise-media.svg';
import imgIconManagement from '../assets/icons/expertise-management.svg';
import imgIconData       from '../assets/icons/expertise-data.svg';
import imgToolFigma        from '../assets/logos/tools/logo-figma.webp';
import imgToolXD           from '../assets/logos/tools/logo-adobe-xd.webp';
import imgToolBezi         from '../assets/logos/tools/logo-bezi.webp';
import imgToolIllustrator  from '../assets/logos/tools/logo-adobe-illustrator.webp';
import imgToolPhotoshop    from '../assets/logos/tools/logo-adobe-photoshop.webp';
import imgTool3dsMax       from '../assets/logos/tools/logo-autodesk-3dsmax.webp';
import imgToolDaVinci      from '../assets/logos/tools/logo-davinci-resolve.webp';
import imgToolAfterEffects from '../assets/logos/tools/logo-adobe-after-effects.webp';
import imgToolConfluence   from '../assets/logos/tools/logo-atlassian-confluence.webp';
import imgToolJira         from '../assets/logos/tools/logo-atlassian-jira.webp';
import imgToolMiro         from '../assets/logos/tools/logo-miro.webp';
import imgToolNotion       from '../assets/logos/tools/logo-notion.svg';
import imgToolGAnalytics   from '../assets/logos/tools/logo-google-analytics.webp';
import imgToolClaude       from '../assets/logos/tools/logo-claude.svg';
import imgToolGitHub       from '../assets/logos/tools/logo-github.svg';
import Collaborations from '../components/Collaborations';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const strong   = 'font-bold text-fg-primary';

function B({ children }) {
  return <strong className={strong}>{children}</strong>;
}

const T = {
  en: {
    title:          'Summary',
    experience:     'Experience',
    expertise:      'Expertise',
    topSkills:      'Top skills',
    certifications: 'Certifications',
    education:      'Education',
    downloadPdf:    'Download PDF',
    sendEmail:      'Message',
    connect:        "Let's connect",
    navPrev:        'View previous experience',
    navNext:        'View next experience',
    eduNavPrev:     'View previous education',
    eduNavNext:     'View next education',
    xpNavPrev:      'View previous expertise',
    xpNavNext:      'View next expertise',
    certNavPrev:    'View previous certification',
    certNavNext:    'View next certification',
    skipToMain:     'Skip to main content',
    expCarousel:    'Experience',
    xpCarousel:     'Expertise',
    eduCarousel:    'Education',
    certCarousel:   'Certifications',
    cardOf:         (n, total) => `Card ${n} of ${total}`,
    scrollForMore:  'Scroll for more',
    topSkillsList: [
      'Design thinking', 'Critical thinking', 'User journeys', 'Prototyping',
      'Design systems', 'Atomic design', 'Usability testing', 'Extended reality',
      '3D Graphics', 'Collaboration',
    ],
    certificationCards: [
      { name: 'Google UX Designer Pro',   nameParts: ['Google UX', 'Designer Pro'], issuer: 'Google',                icon: imgLogoGoogle },
      { name: 'Google Digital Marketing',                                            issuer: 'Google',                icon: imgLogoGoogle },
      { name: 'Biomedical Visualisation',                                            issuer: 'University of Glasgow', icon: imgLogoGlasgow },
      { name: 'Excellence in Holography',                                            issuer: 'International Hologram Manufacturers Association', icon: imgIconAward,   svgIcon: true },
    ],
    bio: [
      <>Design is how it works. A background in <B>mechanical engineering</B>, <B>holography</B>, <B>spatial computing</B> and <B>digital twins</B> brings technical depth to every digital experience I craft.</>,
      <><B>Driving innovation through design</B>, I am proficient at <B>prototyping</B> (in tools like Figma and in code) while <B>collaborating</B> cross-functionally and <B>influencing</B> a design team.</>,
      <>Attentive, empathetic, curious and agile, I am a <B>first-principle</B> thinker with a <B>human-centred</B> approach to problem-solving.</>,
      <>Thriving on new challenges. Dedicated to <B>building better</B>.</>,
    ],
    expertiseCards: [
      {
        title:       'Prototyping',
        icon:        imgIconTouch,
        description: <>4+ years designing <B>user-flows</B>, <B>wireframes</B>, and <B>high-fidelity interactive prototypes</B> for mobile, web, AR/VR and <B>digital twins</B>.</>,
        tools: [
          { name: 'Figma',      icon: imgToolFigma },
          { name: 'Claude Code', icon: imgToolClaude, noBg: true },
          { name: 'GitHub',     icon: imgToolGitHub, noBg: true, darkInvert: true },
          { name: 'Bezi',      icon: imgToolBezi },
        ],
      },
      {
        title:       '2D Graphics',
        icon:        imgIconVector,
        description: <>12+ years creating 2D imagery, <B>vector-based iconography</B>, and visual identities for businesses.</>,
        tools: [
          { name: 'Adobe Illustrator', icon: imgToolIllustrator },
          { name: 'Adobe Photoshop',   icon: imgToolPhotoshop },
        ],
      },
      {
        title:       '3D Graphics',
        icon:        imgIcon3D,
        description: <>10+ years modelling, texturing, lighting, and animating 3D content for diverse industries, including <B>medical imaging</B>, <B>AEC</B> and more.</>,
        tools: [
          { name: 'Autodesk 3DS Max', icon: imgTool3dsMax },
        ],
      },
      {
        title:       'Audio & Video',
        icon:        imgIconMedia,
        description: <>3+ years editing, and <B>post-production</B> work, including <B>sound design</B> and <B>motion graphics</B>.</>,
        tools: [
          { name: 'DaVinci Resolve',     icon: imgToolDaVinci },
          { name: 'Adobe After Effects', icon: imgToolAfterEffects },
        ],
      },
      {
        title:       'Management',
        icon:        imgIconManagement,
        description: <>4+ years <B>collaborating remotely</B> with cross-functional teams on Agile <B>software development</B> projects.</>,
        tools: [
          { name: 'Atlassian Confluence', icon: imgToolConfluence },
          { name: 'Atlassian Jira',       icon: imgToolJira },
          { name: 'Miro',                 icon: imgToolMiro },
          { name: 'Notion',               icon: imgToolNotion, noBg: true, darkInvert: true },
        ],
      },
      {
        title:       'Data',
        icon:        imgIconData,
        description: <>3+ years <B>analysing feedbacks</B>, <B>gaining insights</B> into user's behaviours and <B>iterating</B> from the learnings.</>,
        tools: [
          { name: 'Google Analytics', icon: imgToolGAnalytics },
        ],
      },
    ],
    educationCards: [
      {
        institution: 'Edinburgh Napier University',
        degree:      'Bachelor of Science',
        course:      'digital media',
        flag:        '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
        location:    'Edinburgh, Scotland',
        period:      '2009-2011',
        logo:        imgLogoEdinburghNapierLight,
        logoDark:    imgLogoEdinburghNapierDark,
        drawers: [
          { label: 'Digital Anthropology', content: <>Comprehensive understanding of how people <strong>use and respond</strong> to <strong>emerging technologies</strong> and media.</> },
          { label: 'Competence building', content: <>Development of <strong>adaptable</strong>, practical and <strong>theoretical skills</strong>.</> },
          { label: 'Tools', content: <><strong>3D</strong> (Autodesk Maya), <strong>Visual effects</strong> (After Effects), and multimedia production tools.</> },
        ],
      },
      {
        institution: 'Université François Rabelais',
        degree:      'Licence (BSc equivalent)',
        course:      'multimedia & communication',
        flag:        '🇫🇷',
        location:    'Tours, France',
        period:      '2007-2010',
        logo:        imgLogoUnivTours,
        logoDark:    null,
        logoClass:   'max-h-[48px] sm:max-h-[72px] lg:max-h-[80px]',
        drawers: [
          { label: 'Practice', content: <>Design and production of <strong>multimedia products</strong> and services.</> },
          { label: 'Theory', content: <>Study of <strong>aesthetics</strong>, <strong>ergonomics</strong>, marketing, <strong>web development</strong>, project methodologies, and <strong>project management</strong>.</> },
        ],
      },
      {
        institution: 'IUT de Blois',
        degree:      'DUT (2-year course)',
        course:      'information technology',
        flag:        '🇫🇷',
        location:    'Blois, France',
        period:      '2007-2009',
        logo:        imgLogoIutDeBlois,
        logoDark:    null,
        logoClass:   'max-h-[80px] sm:max-h-[112px] lg:max-h-[128px]',
        drawers: [
          { label: 'More info', content: <>A <strong>multidisciplinary program</strong> focusing mainly on three areas: <strong>communication</strong>, <strong>graphic design</strong> and <strong>software development</strong>.</> },
        ],
      },
      {
        institution: 'Lycée Benjamin Franklin',
        degree:      'BTS (HND equivalent)',
        course:      'industrial product design',
        flag:        '🇫🇷',
        location:    'Orléans, France',
        period:      '2006-2007',
        logo:        imgLogoBenjaminFranklinLight,
        logoDark:    imgLogoBenjaminFranklinDark,
        drawers: [
          { label: 'More info', content: <>Study of <strong>engineering physics</strong>, mathematics and <strong>materials science</strong> to design, analyse and manufacture <strong>mechanical systems</strong> and <strong>industrial products</strong> for mass production.</> },
        ],
      },
    ],
    experienceCards: [
      {
        company:  'Soluis Tech Ltd.',
        role:     'Senior UX/UI Designer',
        flag:     '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
        location: 'Edinburgh, Scotland',
        period:   'From 2023',
        logo:     imgLogoSoluisLight,
        logoDark: imgLogoSoluisDark,
        drawers: [
          { label: 'Digital twin',   content: <>Led the design of <strong>digital twin solutions</strong> (Unreal Engine) accelerating <strong>macro-engineering projects</strong>, featuring <strong>real-time simulation</strong>, measuring, and viewing tools, accessible via multiple inputs.</> },
          { label: 'Sales platform', content: <>Responsive web-based app allowing users to explore <strong>3D generated representations</strong> of unbuilt properties. The platform facilitated sales of <strong>£5B+</strong> in the first year of collab, <strong>24% increase YoY</strong>.</> },
          { label: 'AR/VR',          content: <>Designed <strong>interactive and immersive 3D experiences</strong> using augmented reality technologies (<strong>Magic Leap 2</strong>, iPad), and virtual reality headsets (<strong>Meta Quest</strong>) for international trade shows.</> },
        ],
      },
      {
        company:  'Holoxica Ltd.',
        role:     'Holographic Design Engineer',
        flag:     '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
        location: 'Edinburgh, Scotland',
        period:   '2012 – 2023',
        logo:     imgLogoHoloxica,
        logoDark: imgLogoHoloxicaDark,
        drawers: [
          { label: 'Digital twins', content: <><strong>UK Ministry of Defence</strong> projects: designed a method to accurately generate humans and a <strong>XR system</strong> integrating <strong>3D cameras and robotics</strong> for remote operations in hazardous environments.</> },
          { label: 'UX/UI',         content: <>Design lead for <strong>enterprise applications</strong> visualising diverse <strong>3D data</strong>, real-time, volumetric and more, on <strong>3D light field displays</strong>.</> },
          { label: '3D Graphics',   content: <>Over a decade of experience designing <strong>holographic display content</strong>, primarily for <strong>medical imaging</strong> and <strong>scientific visualisation</strong>, with applications across diverse industries.</> },
        ],
      },
      {
        company:  'Shoot&Post',
        role:     'Post-Producer',
        flag:     '🇸🇪',
        location: 'Gothenburg, Sweden',
        period:   '2010',
        static:   true,
        logo:     imgLogoShootPost,
        logoDark: null,
        drawers: [
          { label: 'Conforming' },
          { label: 'Visual effects' },
        ],
      },
      {
        company:  'Creative Mode',
        role:     'Web Designer',
        flag:     '🇦🇺',
        location: 'Brisbane, Australia',
        period:   '2009',
        static:   true,
        logo:     imgLogoCreativeMode,
        logoDark: null,
        drawers: [
          { label: 'Web Design' },
          { label: 'Videography' },
        ],
      },
    ],
  },
  fr: {
    title:          'Résumé',
    experience:     'Expérience',
    expertise:      'Savoir-faire',
    topSkills:      'Compétences',
    certifications: 'Certificats',
    education:      'Formation',
    downloadPdf:    'Télécharger PDF',
    sendEmail:      'Échangeons',
    connect:        'Connectons',
    navPrev:        "Voir l'expérience précédente",
    navNext:        "Voir l'expérience suivante",
    eduNavPrev:     "Voir la formation précédente",
    eduNavNext:     "Voir la formation suivante",
    xpNavPrev:      "Voir le savoir-faire précédent",
    xpNavNext:      "Voir le savoir-faire suivant",
    scrollForMore:  'Faire défiler',
    certNavPrev:    'Voir la certification précédente',
    certNavNext:    'Voir la certification suivante',
    skipToMain:     'Aller au contenu principal',
    expCarousel:    'Expérience',
    xpCarousel:     'Savoir-faire',
    eduCarousel:    'Formation',
    certCarousel:   'Certifications',
    cardOf:         (n, total) => `Fiche ${n} sur ${total}`,
    topSkillsList: [
      'Design thinking', 'Pensée critique', 'Parcours utilisateurs', 'Prototypage',
      'Systèmes de design', 'Design atomique', "Tests d'utilisabilité", 'Réalité étendue',
      'Graphisme 3D', 'Collaboration',
    ],
    certificationCards: [
      { name: 'Google UX Designer Pro',    nameParts: ['Google UX', 'Designer Pro'], issuer: 'Google',                icon: imgLogoGoogle },
      { name: 'Google Digital Marketing',                                             issuer: 'Google',                icon: imgLogoGoogle },
      { name: 'Biomedical Visualisation',                                             issuer: 'University of Glasgow', icon: imgLogoGlasgow },
      { name: 'Excellence en Holographie',                                            issuer: 'International Hologram Manufacturers Association', icon: imgIconAward,   svgIcon: true },
    ],
    bio: [
      <>Le design, c'est comment ça fonctionne. Un parcours en <B>ingénierie mécanique</B>, <B>holographie</B>, <B>informatique spatiale</B> et <B>jumeaux numériques</B> apporte une profondeur technique à chaque expérience digitale que je conçois.</>,
      <>Promouvant l'innovation via le design, j'ai acquis une expertise en <B>prototypage</B>, tout en <B>collaborant</B>  étroitement avec des équipes inter-fonctionnelles, et  <B>dirigeant</B>  une équipe.</>,
      <>Attentif, dans l'empathie, et curieux, je suis un <B>penseur créatif</B>, animé par une méthode de résolution des problèmes, et de gestion des projets d'innovation, <B>centrée sur les usagers</B>.</>,
      <>Avide de nouveaux défis, et de contribuer à un <B>avenir meilleur</B>.</>,
    ],
    expertiseCards: [
      {
        title:       'Prototypage',
        icon:        imgIconTouch,
        description: <>Plus de 4 ans d'expérience conception de <B>parcours utilisateurs</B>, <B>maquettes</B>, et <B>prototypes</B> de pour mobile, web, réalité étendue et <B>jumeaux numériques</B>.</>,
        tools: [
          { name: 'Figma',      icon: imgToolFigma },
          { name: 'Claude Code', icon: imgToolClaude, noBg: true },
          { name: 'GitHub',     icon: imgToolGitHub, noBg: true, darkInvert: true },
          { name: 'Bezi',      icon: imgToolBezi },
        ],
      },
      {
        title:       'Graphisme 2D',
        icon:        imgIconVector,
        description: <>12 ans d'expérience de création d'images 2D, d'<B>iconographie vectorielle</B>, et d'identités visuelles pour les entreprises.</>,
        tools: [
          { name: 'Adobe Illustrator', icon: imgToolIllustrator },
          { name: 'Adobe Photoshop',   icon: imgToolPhotoshop },
        ],
      },
      {
        title:       'Graphisme 3D',
        icon:        imgIcon3D,
        description: <>10 ans d'expérience en modélisation et animation de contenu 3D pour l'imagerie médicale, la visualisation scientifique, la construction, l'architecture, et autre.</>,
        tools: [
          { name: 'Autodesk 3DS Max', icon: imgTool3dsMax },
        ],
      },
      {
        title:       'Audiovisuel',
        icon:        imgIconMedia,
        description: <>3 années d'expérience en <B>montage</B> et <B>post-production</B> audio et video, notamment la création d'<B>effets visuels</B> et <B>sonores</B>.</>,
        tools: [
          { name: 'DaVinci Resolve',     icon: imgToolDaVinci },
          { name: 'Adobe After Effects', icon: imgToolAfterEffects },
        ],
      },
      {
        title:       'Management',
        icon:        imgIconManagement,
        description: <>4 années de <B>collaboration</B> avec des équipes inter-fonctionnelles (dév, MPs, parties prenantes) sur des projets de <B>développement logiciel</B> Agile.</>,
        tools: [
          { name: 'Atlassian Confluence', icon: imgToolConfluence },
          { name: 'Atlassian Jira',       icon: imgToolJira },
          { name: 'Miro',                 icon: imgToolMiro },
          { name: 'Notion',               icon: imgToolNotion, noBg: true, darkInvert: true },
        ],
      },
      {
        title:       'Données',
        icon:        imgIconData,
        description: <>3 années d'<B>analyse</B> de <B>retours d'expérience</B> utilisateur pour comprendre le comportement des usagers et <B>parfaire</B> la conception.</>,
        tools: [
          { name: 'Google Analytics', icon: imgToolGAnalytics },
        ],
      },
    ],
    experienceCards: [
      {
        company:  'Soluis Tech Ltd.',
        role:     'Designer UX/UI Sénior',
        flag:     '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
        location: 'Édimbourg, Écosse',
        period:   'Depuis 2023',
        logo:     imgLogoSoluisLight,
        logoDark: imgLogoSoluisDark,
        drawers: [
          { label: 'Jumeau numérique',    content: "Lead design de solutions de jumeaux numériques (Unreal Engine) pour accélérer des projets de macro-ingénierie, intégrant des outils de simulation, mesure et visualisation en temps réel, accessibles via plusieurs types d'interfaces." },
          { label: 'Plateforme de vente', content: "Lead designer d'une plateforme immobilière 3D facilitant la visualisation de propriétés sur plan, ayant contribué à plus de £5 milliards de ventes dès la première année (+24 % en un an)." },
          { label: 'Réalité étendue (XR)',               content: "Designer d'expériences 3D interactives et immersives utilisant la réalité augmentée (Magic Leap 2, iPad) et la réalité virtuelle (Meta Quest) pour des salons internationaux." },
        ],
      },
      {
        company:  'Holoxica Ltd.',
        role:     'Holographic Design Engineer',
        flag:     '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
        location: 'Édimbourg, Écosse',
        period:   '2012 – 2023',
        logo:     imgLogoHoloxica,
        logoDark: imgLogoHoloxicaDark,
        drawers: [
          { label: 'Jumeaux numériques', content: "Projets du ministère de la Défense (UK) : conception d'une méthode de génération d'humains et d'un système XR (3D cams, robotique) pour opérations à distance en zones dangereuses." },
          { label: 'UX/UI',              content: "Design lead d'une suite de logiciels professionnels dédiés à la visualisation de données 3D, temps réel, volumétriques et médicales, sur écrans holographiques." },
          { label: 'Graphisme 3D',       content: "10 ans d'expérience en conception 3D pour écrans holographiques. Spécialisé en imagerie médicale et en visualisation scientifique, avec des collaborations dans de nombreux autres secteurs." },
        ],
      },
      {
        company:  'Shoot&Post',
        role:     'Post-Producteur',
        flag:     '🇸🇪',
        location: 'Göteborg, Suède',
        period:   '2010',
        static:   true,
        logo:     imgLogoShootPost,
        logoDark: null,
        drawers: [
          { label: 'Conforming' },
          { label: 'Effets visuels' },
        ],
      },
      {
        company:  'Creative Mode',
        role:     'Web Designer / Vidéaste',
        flag:     '🇦🇺',
        location: 'Brisbane, Australie',
        period:   '2009',
        static:   true,
        logo:     imgLogoCreativeMode,
        logoDark: null,
        drawers: [
          { label: 'Web Design' },
          { label: 'Vidéo' },
        ],
      },
    ],
    educationCards: [
      {
        institution: "Université Napier d'Édimbourg",
        degree:      'Bachelor of Science',
        course:      'multimedia',
        flag:        '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
        location:    'Édimbourg, Écosse',
        period:      '2009-2011',
        logo:        imgLogoEdinburghNapierLight,
        logoDark:    imgLogoEdinburghNapierDark,
        drawers: [
          { label: 'Anthropologie digitale', content: "Étude de l'utilisation et de la perception des médias émergents par les usagers." },
          { label: 'Perfectionnement', content: "Développement d'aptitudes pratiques et théoriques adaptables." },
          { label: 'Outils informatiques', content: "Logiciels de graphisme 3D (Autodesk Maya), d'effets visuels (After Effects), et outils de production multimédia." },
        ],
      },
      {
        institution: 'Université François Rabelais',
        degree:      'Licence Professionnelle',
        course:      'ATC - Activités et techniques de communication',
        flag:        '🇫🇷',
        location:    'Tours, France',
        period:      '2007-2010',
        logo:        imgLogoUnivTours,
        logoDark:    null,
        drawers: [
          { label: 'Pratique', content: 'Conception et production de produits et de services multimédia.' },
          { label: 'Théorie', content: "Étude de l'esthétique, l'ergonomie, la mercatique, la programmation informatique, la méthodologie et la gestion de projet." },
        ],
      },
      {
        institution: 'IUT de Blois',
        degree:      'DUT - Diplôme Universitaire de Technologie',
        course:      'SRC - Services et réseaux de communication',
        flag:        '🇫🇷',
        location:    'Blois, France',
        period:      '2007-2009',
        logo:        imgLogoIutDeBlois,
        logoDark:    null,
        drawers: [
          { label: "Plus d'informations", content: "Programme multidisciplinaire axé sur la communication, l'infographie et le développement Web." },
        ],
      },
      {
        institution: 'Lycée Benjamin Franklin',
        degree:      'BTS - Brevet de Technicien Supérieur',
        course:      'CPI - Conception de Produits Industriels',
        flag:        '🇫🇷',
        location:    'Orléans, France',
        period:      '2006-2007',
        logo:        imgLogoBenjaminFranklinLight,
        logoDark:    imgLogoBenjaminFranklinDark,
        drawers: [
          { label: "Plus d'informations", content: "Étude de l'ingénierie et de la science des matériaux pour concevoir, analyser et fabriquer des systèmes mécaniques à grande échelle." },
        ],
      },
    ],
  },
};

const divider  = '';
const h2class  = 'text-h2 font-bold leading-tight text-fg-primary mb-8';
const bodyMuted = 'text-copy-m font-normal leading-loose text-fg-secondary';

// ── Summary ────────────────────────────────────────────────────────────────────

function SummarySection({ t, lang }) {
  const btnBase = 'flex items-center justify-center gap-2 px-3 py-2 rounded-radius-4 transition-colors bg-bg-surface sm:bg-transparent sm:dark:bg-transparent hover:bg-nav-hover-bg';
  const btnSquircle = { 'data-squircle': '' };
  const btnLabel = 'font-medium text-btn-m leading-[1.2] text-fg-primary whitespace-nowrap';

  return (
    <section id="summary" className={`${divider} scroll-mt-24 pt-32 pb-16 sm:pt-32 sm:pb-16 lg:pt-48 lg:pb-16`}>
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

        {/* ── Left column: photo + buttons ───────────────────────────── */}
        <div className="flex flex-col items-center gap-6 shrink-0 w-full lg:w-auto">
          <img
            src={imgPortrait}
            alt="Portrait of David V."
            data-squircle
            className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-radius-14 sm:rounded-radius-16 lg:rounded-radius-18 object-cover"
          />

          <h1 className="lg:hidden text-h1 font-bold text-center text-fg-primary">
            David V.
          </h1>

          <ul className="flex flex-col gap-4 sm:gap-3 w-56" aria-label="Contact and download">
            <li>
              <a data-spring {...btnSquircle} tabIndex={0} href={`mailto:d@AtelierDigital.co.uk?subject=${encodeURIComponent(lang === 'fr' ? 'Prise de contact' : 'Getting in touch')}`} className={`${btnBase} w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus`}>
                <img src={imgSend} alt="" width={24} height={24} className="shrink-0 dark:invert" />
                <span className={btnLabel}>{t.sendEmail}</span>
              </a>
            </li>
            <li>
              <button data-spring {...btnSquircle} onClick={() => window.open(['https://www.link','edin.com','/in/','dav','idvi','all','ard'].join(''), '_blank', 'noopener,noreferrer')} aria-label={`${t.connect} — LinkedIn`} className={`${btnBase} w-full cursor-pointer`}>
                <img src={imgLinkedIn} alt="" width={24} height={24} className="shrink-0 dark:invert" />
                <span className={btnLabel}>{t.connect}</span>
              </button>
            </li>
            <li className="sm:mt-3">
              <a
                href="https://drive.google.com/uc?export=download&id=1-xtBf6L3nXJ5b0sQ1vfO8HSO_hN1jBU6"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
                aria-label={lang === 'fr' ? 'Télécharger PDF via Google Drive' : 'Download PDF via Google Drive'}
                data-spring
                data-squircle
                className="w-full flex items-center justify-center py-3 bg-cta-600 hover:bg-cta-700 text-fg-on-accent-opacity-95 font-medium text-btn-m leading-[1.2] rounded-radius-4 border border-accent-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-border-focus"
              >
                {t.downloadPdf}
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-8 w-full px-4 sm:px-16 lg:px-0">
          <h1 className="hidden lg:block text-h1 font-bold leading-tight text-fg-primary">
            David V.
          </h1>

          <div id="summary-bio" className={`flex flex-col gap-6 ${bodyMuted}`}>
            {t.bio.map((para, i) => para && <p key={i}>{para}</p>)}
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Experience ─────────────────────────────────────────────────────────────


function ExperienceCard({ card, cardIdx, openDrawers, onToggle }) {
  const anyOpen = openDrawers.some(Boolean);
  return (
    <li data-squircle className="relative shrink-0 w-[calc(100vw-3rem)] sm:w-[488px] lg:w-[536px] h-[500px] sm:h-[540px] lg:h-[580px] flex flex-col snap-center rounded-radius-6 sm:rounded-radius-7 lg:rounded-radius-8 bg-bg-page border border-border-subtle overflow-hidden">

      <div className="px-4 sm:px-5 lg:px-6 pt-2 sm:pt-3 lg:pt-4 pb-0">
        <p className="text-subheading font-medium leading-snug text-fg-secondary">{card.company}</p>
        <h3 className="text-h3 font-semibold leading-snug text-fg-primary">{card.role}</h3>
        {card.location && (
          <p className="text-subheading font-medium leading-snug text-fg-muted">{card.flag} {card.location}</p>
        )}
      </div>

      {/* Logo — fills available space, fades out when any drawer is open */}
      <div className={`flex-1 flex items-center justify-center px-4 sm:px-5 lg:px-6 transition-opacity duration-300 ease-out ${anyOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {card.logo ? (
          <>
            <img src={card.logo} alt={card.company} loading="lazy" width="300" height="104" className={`max-h-[66px] sm:max-h-[96px] lg:max-h-[104px] w-full object-contain ${card.logoDark ? 'dark:hidden' : ''}`} />
            {card.logoDark && <img src={card.logoDark} alt={card.company} loading="lazy" width="300" height="104" className="hidden dark:block max-h-[66px] sm:max-h-[96px] lg:max-h-[104px] w-full object-contain" />}
          </>
        ) : (
          <span className="text-h4 font-bold leading-tight text-fg-primary">{card.company}</span>
        )}
      </div>

      {/* In-flow spacer: mirrors closed-drawer stack height so flex-1 logo centers above them */}
      <div className="shrink-0" style={{ height: card.drawers.length * 76 }} />

      {/* Drawers — absolutely positioned at bottom so they overlay without shifting the logo */}
      <ul className="absolute bottom-0 left-0 right-0 flex flex-col bg-bg-page pb-2">
        {card.drawers.map((drawer, di) => (
          <li key={di}>
            <div className="mx-4 sm:mx-5 lg:mx-6 h-px bg-border-subtle" />
            {card.static ? (
              <div className="w-full flex items-center px-4 sm:px-5 lg:px-6 py-3 sm:py-4 lg:py-4">
                <h4 className="text-h4 font-bold leading-tight text-fg-primary">{drawer.label}</h4>
              </div>
            ) : (
              <>
                <h4>
                <button
                  onClick={() => onToggle(di)}
                  aria-expanded={openDrawers[di]}
                  aria-controls={`exp-drawer-${cardIdx}-${di}`}
                  className="group/btn w-full flex items-center justify-between px-4 sm:px-5 lg:px-6 py-3 sm:py-4 lg:py-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus"
                >
                  <span className="inline-block text-h4 font-bold leading-tight text-fg-primary origin-center sm:transition-transform sm:duration-200 sm:group-hover/btn:scale-[1.04]">{drawer.label}</span>
                  <span data-spring className="shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-colors hover:bg-btn-nav-bg-hover group">
                    <img
                      src={imgChevronDown}
                      alt=""
                      width={24} height={24}
                      className={`dark:brightness-0 dark:invert dark:group-hover:brightness-100 dark:group-hover:invert-0 group-hover:brightness-0 group-hover:invert transition-transform duration-300 ${openDrawers[di] ? 'rotate-180' : ''}`}
                    />
                  </span>
                </button>
                </h4>
                <div
                  id={`exp-drawer-${cardIdx}-${di}`}
                  inert={!openDrawers[di]}
                  onClick={() => onToggle(di)}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out cursor-pointer ${openDrawers[di] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 text-copy-m font-normal leading-relaxed text-fg-secondary">
                      {drawer.content ?? ''}
                    </p>
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </li>
  );
}

function ExperienceSection({ t }) {
  const cards = t.experienceCards;
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isProgrammaticRef = useRef(false);
  const scrollTimerRef = useRef(null);
  const [openDrawers, setOpenDrawers] = useState(() =>
    cards.map(card => card.drawers.map(() => false))
  );

  const getCarouselPl = () => {
    if (typeof window === 'undefined') return '1.5rem';
    const vw = window.innerWidth;
    if (window.matchMedia('(min-width: 1024px)').matches)
      return `${Math.max(24, (vw - 720) / 2)}px`;
    if (window.matchMedia('(min-width: 640px)').matches)
      return `${Math.max(24, (vw - 536) / 2)}px`;
    return '1.5rem';
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

  const scrollToCard = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index];
    if (card) {
      const cardLeft = card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
      const scrollLeft = Math.max(0, cardLeft - (track.clientWidth - card.offsetWidth) / 2);
      track.scrollTo({ left: scrollLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
    setActiveIndex(index);
    isProgrammaticRef.current = true;
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => { isProgrammaticRef.current = false; }, 400);
  };

  const handleScroll = () => {
    if (isProgrammaticRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children);
    const containerRect = track.getBoundingClientRect();
    const viewportCenter = track.scrollLeft + track.clientWidth / 2;
    let closest = 0, minDist = Infinity;
    items.forEach((item, i) => {
      const itemLeft = item.getBoundingClientRect().left - containerRect.left + track.scrollLeft;
      const dist = Math.abs(itemLeft + item.offsetWidth / 2 - viewportCenter);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  };

  const getDateOffset = () => {
    if (typeof window === 'undefined') return 0;
    const n = cards.length;
    if (activeIndex !== 0 && activeIndex !== n - 1) return 0;
    const vw = window.innerWidth;
    let cardW;
    if (window.matchMedia('(min-width: 1024px)').matches) cardW = 536;
    else if (window.matchMedia('(min-width: 640px)').matches) cardW = 488;
    else return 0;
    const pl = parseFloat(carouselPl);
    if (isNaN(pl)) return 0;
    return activeIndex === 0 ? pl + cardW / 2 - vw / 2 : vw / 2 - pl - cardW / 2;
  };

  const toggleDrawer = (ci, di) => {
    setOpenDrawers(prev =>
      prev.map((card, i) =>
        i === ci ? card.map((open, j) => j === di ? !open : false) : card
      )
    );
  };

  return (
    <section id="experience" className={`${divider} py-16 scroll-mt-0`}>

      <div className="max-w-5xl mx-auto px-6">
        <h2 className={h2class}>{t.experience}</h2>
      </div>

      <div role="region" aria-roledescription="carousel" aria-label={t.expCarousel}>
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {t.cardOf(activeIndex + 1, cards.length)} — {cards[activeIndex]?.company}
        </div>
        <ul
          ref={trackRef}
          role="list"
          aria-label={t.expCarousel}
          onScroll={handleScroll}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') { e.preventDefault(); scrollToCard(Math.max(0, activeIndex - 1)); }
            if (e.key === 'ArrowRight') { e.preventDefault(); scrollToCard(Math.min(cards.length - 1, activeIndex + 1)); }
          }}
          className="flex gap-8 sm:gap-12 lg:gap-16 overflow-x-auto snap-x snap-mandatory pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus"
          style={{ scrollbarWidth: 'none', paddingLeft: carouselPl, paddingRight: carouselPl, touchAction: 'pan-x pan-y' }}
        >
          {cards.map((card, ci) => (
            <ExperienceCard
              key={ci}
              cardIdx={ci}
              card={card}
              openDrawers={openDrawers[ci]}
              onToggle={(di) => toggleDrawer(ci, di)}
            />
          ))}
        </ul>
      </div>

      <p
        className="mt-2 text-label-s leading-[1.2] font-medium text-fg-muted text-center transition-transform duration-300"
        style={{ transform: `translateX(${getDateOffset()}px)` }}
      >
        {cards[activeIndex]?.period}
      </p>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center mt-4 sm:mt-5 lg:mt-6 px-6 sm:px-28 lg:px-52">
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
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 justify-self-end">
          <button
            onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            data-spring
            aria-label={t.navPrev}
            className="group p-2 sm:p-2.5 lg:p-3 rounded-full bg-btn-nav-bg-rest enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
          >
            <img src={imgChevronLeft} alt="" width={20} height={20} className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px] brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter]" />
          </button>
          <button
            onClick={() => scrollToCard(Math.min(cards.length - 1, activeIndex + 1))}
            disabled={activeIndex === cards.length - 1}
            data-spring
            aria-label={t.navNext}
            className="group p-2 sm:p-2.5 lg:p-3 rounded-full bg-btn-nav-bg-rest enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
          >
            <img src={imgChevronRight} alt="" width={20} height={20} className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px] group-enabled:group-hover:brightness-0 group-enabled:group-hover:invert dark:brightness-0 dark:invert dark:group-enabled:group-hover:brightness-100 dark:group-enabled:group-hover:invert-0 transition-[filter]" />
          </button>
        </div>
      </div>

    </section>
  );
}

// ── Expertise ───────────────────────────────────────────────────────────────

function ToolIcon({ name, icon, noBg, darkInvert }) {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    if (!visible) return;
    const handler = (e) => {
      if (btnRef.current && !btnRef.current.contains(e.target)) setVisible(false);
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [visible]);

  return (
    <div className="relative flex flex-col items-center">
      <div className={`absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 pointer-events-none z-10 transition-opacity duration-150 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <div data-squircle className="bg-tooltip-bg text-fg-primary-inverse text-tooltip font-light leading-[1.2] px-2 py-[4px] rounded-radius-2 whitespace-nowrap ring-1 ring-tooltip-ring">
          {name}
        </div>
      </div>
      <button
        ref={btnRef}
        aria-label={name}
        onMouseEnter={() => { if (!window.matchMedia('(pointer: coarse)').matches) setVisible(true); }}
        onMouseLeave={() => { if (!window.matchMedia('(pointer: coarse)').matches) setVisible(false); }}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        onClick={() => { if (window.matchMedia('(pointer: coarse)').matches) setVisible(v => !v); }}
        className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${noBg ? 'rounded-radius-2' : 'rounded-radius-2 sm:rounded-radius-3 lg:rounded-radius-3 overflow-hidden shadow-xs'}`}
      >
        {icon
          ? <img src={icon} alt={name} loading="lazy" className={`w-full h-full ${noBg ? 'object-contain' : 'object-cover'} ${darkInvert ? 'dark:brightness-0 dark:invert' : ''}`} />
          : null
        }
      </button>
    </div>
  );
}

function ExpertiseCard({ card }) {
  return (
    <li data-squircle className="shrink-0 w-[calc(100vw-8rem)] sm:w-[536px] lg:w-[720px] h-[472px] sm:h-[444px] lg:h-[536px] flex flex-col justify-between snap-center rounded-radius-8 sm:rounded-radius-16 lg:rounded-radius-18 bg-bg-page p-6 sm:p-10 lg:p-16">

      <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">
        <div data-squircle className="w-16 h-16 sm:w-[72px] sm:h-[72px] lg:w-20 lg:h-20 rounded-radius-6 sm:rounded-radius-7 lg:rounded-radius-8 bg-bg-page flex items-center justify-center shrink-0 overflow-hidden">
          {card.icon && <img src={card.icon} alt="" width={64} height={64} loading="lazy" className="sm:w-[72px] sm:h-[72px] lg:w-20 lg:h-20 object-contain dark:brightness-0 dark:invert dark:opacity-[0.965]" />}
        </div>

        <h3 className="text-h3 font-semibold leading-snug text-fg-primary">
          {card.title}
        </h3>

        <p className="text-copy-m font-normal leading-loose text-fg-secondary">
          {card.description}
        </p>
      </div>

      <div className="flex items-center gap-6 sm:gap-7 lg:gap-8">
        {card.tools.map((tool, i) => (
          <ToolIcon key={i} name={tool.name} icon={tool.icon} noBg={tool.noBg} darkInvert={tool.darkInvert} />
        ))}
      </div>
    </li>
  );
}

function ExpertiseSection({ t }) {
  const cards = t.expertiseCards;
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isProgrammaticRef = useRef(false);
  const scrollTimerRef = useRef(null);

  const getCarouselPl = () => {
    if (typeof window === 'undefined') return '2.5rem';
    const vw = window.innerWidth;
    if (window.matchMedia('(min-width: 1024px)').matches)
      return `${Math.max(24, (vw - 720) / 2)}px`;
    if (window.matchMedia('(min-width: 640px)').matches)
      return `${Math.max(24, (vw - 536) / 2)}px`;
    return '4rem';
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

  const scrollToCard = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index];
    if (card) {
      const cardLeft = card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
      const scrollLeft = Math.max(0, cardLeft - (track.clientWidth - card.offsetWidth) / 2);
      track.scrollTo({ left: scrollLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
    setActiveIndex(index);
    isProgrammaticRef.current = true;
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => { isProgrammaticRef.current = false; }, 400);
  };

  const handleScroll = () => {
    if (isProgrammaticRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children);
    const containerRect = track.getBoundingClientRect();
    const viewportCenter = track.scrollLeft + track.clientWidth / 2;
    let closest = 0, minDist = Infinity;
    items.forEach((item, i) => {
      const itemLeft = item.getBoundingClientRect().left - containerRect.left + track.scrollLeft;
      const dist = Math.abs(itemLeft + item.offsetWidth / 2 - viewportCenter);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  };

  return (
    <section id="expertise" className={`${divider} py-16 scroll-mt-24 bg-bg-surface`}>

      <div className="max-w-5xl mx-auto px-6">
        <h2 className={h2class}>{t.expertise}</h2>
      </div>

      <div role="region" aria-roledescription="carousel" aria-label={t.xpCarousel}>
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {t.cardOf(activeIndex + 1, cards.length)} — {cards[activeIndex]?.title}
        </div>
        <ul
          ref={trackRef}
          role="list"
          aria-label={t.xpCarousel}
          onScroll={handleScroll}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') { e.preventDefault(); scrollToCard(Math.max(0, activeIndex - 1)); }
            if (e.key === 'ArrowRight') { e.preventDefault(); scrollToCard(Math.min(cards.length - 1, activeIndex + 1)); }
          }}
          className="flex gap-8 sm:gap-12 lg:gap-16 overflow-x-auto snap-x snap-mandatory pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus"
          style={{ scrollbarWidth: 'none', paddingLeft: carouselPl, paddingRight: carouselPl, touchAction: 'pan-x pan-y' }}
        >
          {cards.map((card, ci) => (
            <ExpertiseCard key={ci} card={card} />
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center mt-4 sm:mt-5 lg:mt-6 px-6 sm:px-28 lg:px-52">
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
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 justify-self-end">
          <button
            onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            data-spring
            aria-label={t.xpNavPrev}
            className="group p-2 sm:p-2.5 lg:p-3 rounded-full bg-btn-nav-bg-rest-subtle enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
          >
            <img src={imgChevronLeft} alt="" width={20} height={20} className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px] brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter]" />
          </button>
          <button
            onClick={() => scrollToCard(Math.min(cards.length - 1, activeIndex + 1))}
            disabled={activeIndex === cards.length - 1}
            data-spring
            aria-label={t.xpNavNext}
            className="group p-2 sm:p-2.5 lg:p-3 rounded-full bg-btn-nav-bg-rest-subtle enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
          >
            <img src={imgChevronRight} alt="" width={20} height={20} className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px] group-enabled:group-hover:brightness-0 group-enabled:group-hover:invert dark:brightness-0 dark:invert dark:group-enabled:group-hover:brightness-100 dark:group-enabled:group-hover:invert-0 transition-[filter]" />
          </button>
        </div>
      </div>

    </section>
  );
}

// ── Education ───────────────────────────────────────────────────────────────

function EducationCard({ card, cardIdx, openDrawers, onToggle }) {
  const anyOpen = openDrawers.some(Boolean);
  return (
    <li data-squircle className="relative shrink-0 w-[calc(100vw-3rem)] sm:w-[488px] lg:w-[536px] h-[500px] sm:h-[540px] lg:h-[580px] flex flex-col snap-center rounded-radius-6 sm:rounded-radius-7 lg:rounded-radius-8 bg-bg-page border border-border-subtle overflow-hidden">

      <div className="px-4 sm:px-5 lg:px-6 pt-2 sm:pt-3 lg:pt-4 pb-0">
        <p className="text-subheading font-medium leading-snug text-fg-primary">{card.institution}</p>
        <h3 className="text-h3 font-semibold leading-snug text-fg-primary">{card.degree}{' '}<br aria-hidden="true" />{card.course.charAt(0).toUpperCase() + card.course.slice(1)}</h3>
        {card.location && (
          <p className="text-subheading font-medium leading-snug text-fg-muted">{card.flag} {card.location}</p>
        )}
      </div>

      {/* Logo — fills available space, fades out when any drawer is open */}
      <div className={`flex-1 flex items-center justify-center px-4 sm:px-5 lg:px-6 transition-opacity duration-300 ease-out ${anyOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {card.logo ? (
          <>
            <img src={card.logo} alt={card.institution} loading="lazy" width="300" height="128" className={`${card.logoClass ?? 'max-h-[66px] sm:max-h-[96px] lg:max-h-[104px]'} w-full object-contain ${card.logoDark ? 'dark:hidden' : ''}`} />
            {card.logoDark && <img src={card.logoDark} alt={card.institution} loading="lazy" width="300" height="128" className={`hidden dark:block ${card.logoClass ?? 'max-h-[66px] sm:max-h-[96px] lg:max-h-[104px]'} w-full object-contain`} />}
          </>
        ) : (
          <span className="text-h4 font-bold leading-tight text-fg-primary">{card.institution}</span>
        )}
      </div>

      {/* In-flow spacer: mirrors closed-drawer stack height so flex-1 logo centers above them */}
      <div className="shrink-0" style={{ height: card.drawers.length * 76 }} />

      {/* Drawers — absolutely positioned at bottom so they overlay without shifting the logo */}
      <ul className="absolute bottom-0 left-0 right-0 flex flex-col bg-bg-page pb-2">
        {card.drawers.map((drawer, di) => (
          <li key={di}>
            <div className="mx-4 sm:mx-5 lg:mx-6 h-px bg-border-subtle" />
            <h4>
            <button
              onClick={() => onToggle(di)}
              aria-expanded={openDrawers[di]}
              aria-controls={`edu-drawer-${cardIdx}-${di}`}
              className="group/btn w-full flex items-center justify-between px-4 sm:px-5 lg:px-6 py-3 sm:py-4 lg:py-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus"
            >
              <span className="inline-block text-h4 font-bold leading-tight text-fg-primary origin-center sm:transition-transform sm:duration-200 sm:group-hover/btn:scale-[1.04]">{drawer.label}</span>
              <span data-spring className="shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-colors hover:bg-btn-nav-bg-hover group">
                <img
                  src={imgChevronDown}
                  alt=""
                  width={24} height={24}
                  className={`dark:brightness-0 dark:invert dark:group-hover:brightness-100 dark:group-hover:invert-0 group-hover:brightness-0 group-hover:invert transition-transform duration-300 ${openDrawers[di] ? 'rotate-180' : ''}`}
                />
              </span>
            </button>
            </h4>
            <div
              id={`edu-drawer-${cardIdx}-${di}`}
              inert={!openDrawers[di]}
              onClick={() => onToggle(di)}
              className={`grid transition-[grid-template-rows] duration-300 ease-out cursor-pointer ${openDrawers[di] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <p className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 text-copy-m font-normal leading-relaxed text-fg-secondary">
                  {drawer.content ?? ''}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </li>
  );
}

function EducationSection({ t }) {
  const cards = t.educationCards;
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isProgrammaticRef = useRef(false);
  const scrollTimerRef = useRef(null);
  const [openDrawers, setOpenDrawers] = useState(() =>
    cards.map(card => card.drawers.map(() => false))
  );

  const getCarouselPl = () => {
    if (typeof window === 'undefined') return '1.5rem';
    const vw = window.innerWidth;
    if (window.matchMedia('(min-width: 1024px)').matches)
      return `${Math.max(24, (vw - 720) / 2)}px`;
    if (window.matchMedia('(min-width: 640px)').matches)
      return `${Math.max(24, (vw - 536) / 2)}px`;
    return '1.5rem';
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

  const scrollToCard = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index];
    if (card) {
      const cardLeft = card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
      const scrollLeft = Math.max(0, cardLeft - (track.clientWidth - card.offsetWidth) / 2);
      track.scrollTo({ left: scrollLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
    setActiveIndex(index);
    isProgrammaticRef.current = true;
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => { isProgrammaticRef.current = false; }, 400);
  };

  const handleScroll = () => {
    if (isProgrammaticRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children);
    const containerRect = track.getBoundingClientRect();
    const viewportCenter = track.scrollLeft + track.clientWidth / 2;
    let closest = 0, minDist = Infinity;
    items.forEach((item, i) => {
      const itemLeft = item.getBoundingClientRect().left - containerRect.left + track.scrollLeft;
      const dist = Math.abs(itemLeft + item.offsetWidth / 2 - viewportCenter);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  };

  const getDateOffset = () => {
    if (typeof window === 'undefined') return 0;
    const n = cards.length;
    if (activeIndex !== 0 && activeIndex !== n - 1) return 0;
    const vw = window.innerWidth;
    let cardW;
    if (window.matchMedia('(min-width: 1024px)').matches) cardW = 536;
    else if (window.matchMedia('(min-width: 640px)').matches) cardW = 488;
    else return 0;
    const pl = parseFloat(carouselPl);
    if (isNaN(pl)) return 0;
    return activeIndex === 0 ? pl + cardW / 2 - vw / 2 : vw / 2 - pl - cardW / 2;
  };

  const toggleDrawer = (ci, di) => {
    setOpenDrawers(prev =>
      prev.map((card, i) =>
        i === ci ? card.map((open, j) => j === di ? !open : false) : card
      )
    );
  };

  return (
    <section id="education" className={`${divider} py-16 scroll-mt-24`}>

      <div className="max-w-5xl mx-auto px-6">
        <h2 className={h2class}>{t.education}</h2>
      </div>

      <div role="region" aria-roledescription="carousel" aria-label={t.eduCarousel}>
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {t.cardOf(activeIndex + 1, cards.length)} — {cards[activeIndex]?.institution}
        </div>
        <ul
          ref={trackRef}
          role="list"
          aria-label={t.eduCarousel}
          onScroll={handleScroll}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') { e.preventDefault(); scrollToCard(Math.max(0, activeIndex - 1)); }
            if (e.key === 'ArrowRight') { e.preventDefault(); scrollToCard(Math.min(cards.length - 1, activeIndex + 1)); }
          }}
          className="flex gap-8 sm:gap-12 lg:gap-16 overflow-x-auto snap-x snap-mandatory pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus"
          style={{ scrollbarWidth: 'none', paddingLeft: carouselPl, paddingRight: carouselPl, touchAction: 'pan-x pan-y' }}
        >
          {cards.map((card, ci) => (
            <EducationCard key={ci} cardIdx={ci} card={card} openDrawers={openDrawers[ci]} onToggle={(di) => toggleDrawer(ci, di)} />
          ))}
        </ul>
      </div>

      <p
        className="mt-2 text-label-s leading-[1.2] font-medium text-fg-muted text-center transition-transform duration-300"
        style={{ transform: `translateX(${getDateOffset()}px)` }}
      >
        {cards[activeIndex]?.period}
      </p>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center mt-4 sm:mt-5 lg:mt-6 px-6 sm:px-28 lg:px-52">
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
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 justify-self-end">
          <button
            onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            data-spring
            aria-label={t.eduNavPrev}
            className="group p-2 sm:p-2.5 lg:p-3 rounded-full bg-btn-nav-bg-rest enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
          >
            <img src={imgChevronLeft} alt="" width={20} height={20} className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px] brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter]" />
          </button>
          <button
            onClick={() => scrollToCard(Math.min(cards.length - 1, activeIndex + 1))}
            disabled={activeIndex === cards.length - 1}
            data-spring
            aria-label={t.eduNavNext}
            className="group p-2 sm:p-2.5 lg:p-3 rounded-full bg-btn-nav-bg-rest enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
          >
            <img src={imgChevronRight} alt="" width={20} height={20} className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px] group-enabled:group-hover:brightness-0 group-enabled:group-hover:invert dark:brightness-0 dark:invert dark:group-enabled:group-hover:brightness-100 dark:group-enabled:group-hover:invert-0 transition-[filter]" />
          </button>
        </div>
      </div>

    </section>
  );
}

// ── Top Skills + Certifications ─────────────────────────────────────────────

function CertificationCard({ card }) {
  const [flipped, setFlipped] = useState(false);

  const nameEl = card.nameParts ? (
    <>{card.nameParts[0]}<span className="hidden lg:block" aria-hidden="true" />{' '}{card.nameParts[1]}</>
  ) : card.name;

  const isSvg = card.svgIcon === true;

  return (
    <div
      data-spring
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      onClick={() => setFlipped(f => !f)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlipped(f => !f); } }}
      className="cursor-pointer [perspective:800px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-radius-8 sm:rounded-radius-10 lg:rounded-radius-12"
    >
      <div className="transition-transform duration-200 sm:hover:scale-[1.04]">
      <div
        className="relative [transform-style:preserve-3d] motion-safe:transition-transform motion-safe:duration-500"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <div inert={flipped} data-squircle className="flex flex-col items-center pt-3 sm:pt-[14px] lg:pt-4 pb-5 sm:pb-5 lg:pb-6 px-3 sm:px-[14px] lg:px-4 bg-bg-page dark:bg-bg-surface rounded-radius-8 sm:rounded-radius-10 lg:rounded-radius-12 border border-border-subtle [backface-visibility:hidden]">
          <div data-squircle className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-radius-4 sm:rounded-radius-5 lg:rounded-radius-6 bg-bg-page dark:bg-bg-surface flex items-center justify-center mb-2 sm:mb-[10px] lg:mb-3 overflow-hidden shrink-0">
            {card.icon
              ? <img src={card.icon} alt="" loading="lazy" className={`w-full h-full object-contain${isSvg ? ' dark:brightness-0 dark:invert' : ''}`} />
              : null
            }
          </div>
          <p className="text-card-m font-bold text-fg-primary text-center leading-snug">{nameEl}</p>
        </div>

        <div inert={!flipped} data-squircle className="absolute inset-0 flex flex-col items-center justify-center bg-bg-page rounded-radius-8 sm:rounded-radius-10 lg:rounded-radius-12 border border-border-subtle [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-card-m font-bold text-fg-primary text-center leading-snug px-4">{card.issuer}</p>
        </div>
      </div>
      </div>
    </div>
  );
}

function SkillsCertSection({ t }) {
  const certs = t.certificationCards;
  const certTrackRef = useRef(null);
  const [activePage, setActivePage] = useState(0);
  const isProgrammaticRef = useRef(false);
  const scrollTimerRef = useRef(null);

  // Group into pages of 2 for the mobile carousel
  const certPages = [];
  for (let i = 0; i < certs.length; i += 2) certPages.push(certs.slice(i, i + 2));

  const scrollToCertPage = (pageIndex) => {
    const track = certTrackRef.current;
    if (!track) return;
    const page = track.children[pageIndex];
    if (page) track.scrollTo({ left: page.offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    setActivePage(pageIndex);
    isProgrammaticRef.current = true;
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => { isProgrammaticRef.current = false; }, 400);
  };

  const handleCertScroll = () => {
    if (isProgrammaticRef.current) return;
    const track = certTrackRef.current;
    if (!track) return;
    const page = Math.round(track.scrollLeft / track.clientWidth);
    setActivePage(Math.min(certPages.length - 1, Math.max(0, page)));
  };

  return (
    <section id="top-skills" className={`${divider} pt-16 pb-8 sm:py-16 scroll-mt-24`}>
      <div className="max-w-5xl mx-auto px-6 flex flex-col lg:flex-row gap-12 lg:gap-20">

        {/* ── Left: Top Skills ───────────────────────────────── */}
        <div className="lg:flex-1">
          <h2 className={h2class}>{t.topSkills}</h2>
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 lg:mt-16 sm:px-16 lg:px-0 list-none">
            {t.topSkillsList.map((skill, i) => (
              <li
                key={i}
                className="px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-3 rounded-full border border-border-subtle font-semibold text-tag-m leading-normal text-fg-primary whitespace-nowrap select-none"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Right: Certifications ──────────────────────────── */}
        <div id="certifications" className="scroll-mt-24 lg:w-[448px]">
          <h2 className={h2class}>{t.certifications}</h2>

          <div className="hidden sm:grid grid-cols-2 gap-4 lg:gap-6 sm:px-16 lg:px-0">
            {certs.map((card, i) => <CertificationCard key={i} card={card} />)}
          </div>

          <div className="sm:hidden -mx-6">
            <div role="region" aria-roledescription="carousel" aria-label={t.certCarousel}>
              <div aria-live="polite" aria-atomic="true" className="sr-only">
                {t.cardOf(activePage + 1, certPages.length)}
              </div>
            <ul
              ref={certTrackRef}
              role="list"
              aria-label={t.certCarousel}
              onScroll={handleCertScroll}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') { e.preventDefault(); scrollToCertPage(Math.max(0, activePage - 1)); }
                if (e.key === 'ArrowRight') { e.preventDefault(); scrollToCertPage(Math.min(certPages.length - 1, activePage + 1)); }
              }}
              className="flex overflow-x-auto snap-x snap-mandatory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus py-3 -my-3"
              style={{ scrollbarWidth: 'none', touchAction: 'pan-x pan-y' }}
            >
              {certPages.map((page, pi) => (
                <li key={pi} className="w-full shrink-0 snap-start flex gap-4 px-6">
                  {page.map((card, ci) => (
                    <div key={ci} className="flex-1 min-w-0">
                      <CertificationCard card={card} />
                    </div>
                  ))}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center mt-4 px-6">
              <div />
              <div className="flex items-center">
                {certPages.map((_, i) => (
                  <button key={i} onClick={() => scrollToCertPage(i)} aria-label={`Go to page ${i + 1}`} aria-current={i === activePage ? 'true' : undefined} className="group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg-primary rounded-full motion-safe:transition-all motion-safe:duration-200 p-2">
                    <span className={`block rounded-full motion-safe:transition-all motion-safe:duration-200 ${i === activePage ? 'w-4 h-2 bg-fg-dot-active' : 'w-2 h-2 bg-fg-dot-rest group-hover:bg-fg-dot-hover'}`} />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 justify-self-end">
                <button
                  onClick={() => scrollToCertPage(Math.max(0, activePage - 1))}
                  disabled={activePage === 0}
                  data-spring
                  aria-label={t.certNavPrev}
                  className="group p-2 rounded-full bg-btn-nav-bg-rest enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
                >
                  <img src={imgChevronLeft} alt="" width={20} height={20}
                    className="brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter]"
                  />
                </button>
                <button
                  onClick={() => scrollToCertPage(Math.min(certPages.length - 1, activePage + 1))}
                  disabled={activePage === certPages.length - 1}
                  data-spring
                  aria-label={t.certNavNext}
                  className="group p-2 rounded-full bg-btn-nav-bg-rest enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
                >
                  <img src={imgChevronRight} alt="" width={20} height={20}
                    className="group-enabled:group-hover:brightness-0 group-enabled:group-hover:invert dark:brightness-0 dark:invert dark:group-enabled:group-hover:brightness-100 dark:group-enabled:group-hover:invert-0 transition-[filter]"
                  />
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function Resume({ lang }) {
  const t = T[lang];
  const { hash } = useLocation();
  const [searchParams] = useSearchParams();
  const fromHome = searchParams.get('from') === 'home';
  const [showBack, setShowBack] = useState(fromHome);
  const footerRef = useRef(null);

  useEffect(() => {
    if (!fromHome) return;
    const onScroll = () => {
      if (window.scrollY <= 80) setShowBack(false);
    };
    const attachTimer = setTimeout(() => {
      window.addEventListener('scroll', onScroll, { passive: true });
    }, 1200);
    return () => {
      clearTimeout(attachTimer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [fromHome]);

  useEffect(() => {
    if (!fromHome) return;
    const footer = document.querySelector('footer');
    if (!footer) return;
    footerRef.current = footer;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setShowBack(false); },
      { threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [fromHome]);

  useEffect(() => {
    document.title = lang === 'fr' ? 'CV interactif • Atelier Digital' : 'Résumé • Atelier Digital';
  }, [lang]);

  useEffect(() => {
    if (!hash) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const raf = requestAnimationFrame(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' });
    });
    return () => cancelAnimationFrame(raf);
  }, [hash]);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-radius-2 focus:ring-2 focus:ring-border-focus focus:bg-white focus:text-fg-primary focus:outline-none">
        {t.skipToMain}
      </a>
      <main id="main-content" aria-label={t.title} className="bg-bg-page min-h-screen" tabIndex={-1}>
        <div className="max-w-5xl mx-auto px-6">

          {/* 1. Summary */}
          <SummarySection t={t} lang={lang} />

        </div>

        {/* 2. Experience — full browser width for carousel */}
        <ExperienceSection t={t} />

        {/* 3. Expertise — full browser width for carousel */}
        <ExpertiseSection t={t} />

        {/* 4+5. Top skills + Certifications */}
        <SkillsCertSection t={t} />

        {/* 6. Education — full browser width for carousel */}
        <EducationSection t={t} />

        {/* 7. Key collaborations — reused from home page */}
        <Collaborations lang={lang} lgAlignWidth={720} smAlignWidth={536} />

        {/* 8. Get in touch — reused from home page */}
        <Contact lang={lang} variant="resume" lgAlignWidth={720} smAlignWidth={536} />

      </main>

      {/* Back-to-homepage chip — shown when arriving from the "experienced in" pills */}
      <div
        aria-live="polite"
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center transition-opacity duration-300 ease-out ${
          showBack ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Link
          to="/"
          data-spring
          onClick={() => setShowBack(false)}
          className="flex items-center gap-2 h-9 bg-tooltip-bg/90 backdrop-blur-3 text-fg-primary-inverse text-tooltip font-medium px-4 rounded-full shadow-m hover:bg-bg-surface hover:text-fg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus whitespace-nowrap"
          aria-label={lang === 'fr' ? "Retour à l'accueil" : 'Back to homepage'}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M8.5 2.5L4 7l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="sm:hidden">{lang === 'fr' ? "Retour à l'accueil" : 'Back to home'}</span>
          <span className="hidden sm:inline">{lang === 'fr' ? "Retour à l'accueil" : 'Back to homepage'}</span>
        </Link>
        <button
          onClick={() => setShowBack(false)}
          data-spring
          aria-label={lang === 'fr' ? 'Fermer' : 'Dismiss'}
          className="ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-tooltip-bg/90 backdrop-blur-3 text-fg-primary-inverse hover:bg-bg-surface hover:text-fg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <Footer lang={lang} />
    </>
  );
}

export default Resume;
