import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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

const strong   = 'font-bold text-[#1f1f1f] dark:text-[#f6f6f6]';

function B({ children }) {
  return <strong className={strong}>{children}</strong>;
}

const T = {
  en: {
    title:          'Summary',
    summary:        'Summary',
    experience:     'Experience',
    expertise:      'Expertise',
    topSkills:      'Top skills',
    certifications: 'Certifications',
    education:      'Education',
    downloadPdf:    'Download PDF',
    sendEmail:      'send an email',
    connect:        "let's connect",
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
      <>Multidisciplinary UX/UI designer with a background in <B>2D and 3D graphics</B>, I craft <B>intuitive</B> digital experiences.</>,
      <><B>Driving innovation through design</B>, I am proficient at <B>prototyping</B> (digital twins, extended reality, web and mobile) while <B>collaborating</B> cross-functionally and <B>leading</B> a design team.</>,
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
          { name: 'Adobe XD',  icon: imgToolXD },
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
          { label: 'Digital Anthropology', content: 'Comprehensive understanding of how people use and respond to emerging technologies and media.' },
          { label: 'Competence building', content: 'Development of adaptable, practical and theoretical skills.' },
          { label: 'Tools', content: '3D (Autodesk Maya), Visual effects (After Effects), and multimedia production tools.' },
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
          { label: 'Practice', content: 'Design and production of multimedia products and services.' },
          { label: 'Theory', content: 'Study of aesthetics, ergonomics, marketing, web development, project methodologies, and project management.' },
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
          { label: 'More info', content: 'A multidisciplinary program focusing mainly on three areas: communication, graphic design and software development.' },
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
          { label: 'More info', content: 'Study of engineering physics, mathematics and materials science to design, analyse and manufacture mechanical systems and industrial products for mass production.' },
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
          { label: 'Digital twin',   content: 'Led the design of digital twin solutions (Unreal Engine) accelerating macro-engineering projects, and featuring real-time simulation, measuring, and viewing tools, accessible via multiple inputs.' },
          { label: 'Sales platform', content: 'Responsive web-based app allowing users to explore 3D generated representations of unbuilt properties. The platform facilitated sales of £5B+ in the first year of collab, 24% increase YoY.' },
          { label: 'AR/VR',          content: 'Designed interactive and immersive 3D experiences using augmented reality technologies (Magic Leap 2, iPad), and virtual reality headsets (Meta Quest) for international trade shows.' },
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
          { label: 'Digital twins', content: 'UK Ministry of Defence projects: designed a method to accurately generate humans and a XR system integrating 3D cameras and robotics for remote operations in hazardous environments.' },
          { label: 'UX/UI',         content: 'Design lead for enterprise applications visualising diverse 3D data, real-time, volumetric and more, on 3D light field displays.' },
          { label: '3D Graphics',   content: 'Over a decade of experience designing holographic display content, primarily for medical imaging and scientific visualisation, with applications across diverse industries.' },
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
        role:     'Web Designer / Videographer',
        flag:     '🇦🇺',
        location: 'Brisbane, Australia',
        period:   '2009',
        static:   true,
        logo:     imgLogoCreativeMode,
        logoDark: null,
        drawers: [
          { label: 'Web Design' },
          { label: 'Video' },
        ],
      },
    ],
  },
  fr: {
    title:          'Résumé',
    summary:        'Profil',
    experience:     'Expérience',
    expertise:      'Savoir-faire',
    topSkills:      'Compétences',
    certifications: 'Certificats',
    education:      'Formation',
    downloadPdf:    'télécharger PDF',
    sendEmail:      'échangeons',
    connect:        'connectons',
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
      <>Architecte du numérique, fort de douze années d'expérience dans <B>l'innovation</B> tout en <B>graphisme 2D et 3D</B>, je conçois des produits <B>intuitifs</B>.</>,
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
          { name: 'Adobe XD',  icon: imgToolXD },
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
const h2class  = 'text-[24px] sm:text-[28px] lg:text-[30px] font-bold leading-tight text-[#1f1f1f] dark:text-[#f6f6f6] mb-8';
const bodyMuted = 'text-[16px] sm:text-[17px] lg:text-[18px] leading-loose text-[#5c5c5c] dark:text-[#adadad]';

// ── Summary ────────────────────────────────────────────────────────────────────

function SummarySection({ t }) {
  const btnBase = 'flex items-center justify-center gap-2 px-3 py-2 rounded-2xl transition-colors bg-[#f6f6f6] dark:bg-white/[0.07] sm:bg-transparent sm:dark:bg-transparent hover:bg-black/[0.04] dark:hover:bg-white/[0.08]';
  const btnLabel = 'font-medium text-[18px] sm:text-[20px] text-[#1f1f1f] dark:text-[#f6f6f6] whitespace-nowrap';

  return (
    <section id="summary" className={`${divider} scroll-mt-24 pt-8 pb-16 sm:py-16`}>
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

        {/* ── Left column: photo + buttons ───────────────────────────── */}
        <div className="flex flex-col items-center gap-6 shrink-0 w-full lg:w-auto">
          <img
            src={imgPortrait}
            alt="Portrait of David V."
            className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-[56px] sm:rounded-[64px] lg:rounded-[72px] object-cover"
          />

          <h2 className={`lg:hidden text-[30px] sm:text-[36px] font-semibold text-center text-[#1f1f1f] dark:text-[#f6f6f6]`}>
            David V.
          </h2>

          <ul className="flex flex-col gap-4 sm:gap-3 w-56" aria-label="Contact and download">
            <li>
              <a href="mailto:d@atelierdigital.co.uk" className={`${btnBase} w-full`}>
                <img src={imgSend} alt="" width={24} height={24} className="shrink-0 dark:invert" />
                <span className={btnLabel}>{t.sendEmail}</span>
              </a>
            </li>
            <li>
              <button onClick={() => window.open(['https://www.link','edin.com','/in/','dav','idvi','all','ard'].join(''), '_blank', 'noopener,noreferrer')} aria-label={`${t.connect} — LinkedIn`} className={`${btnBase} w-full cursor-pointer`}>
                <img src={imgLinkedIn} alt="" width={24} height={24} className="shrink-0 dark:invert" />
                <span className={btnLabel}>{t.connect}</span>
              </button>
            </li>
            <li className="sm:mt-3">
              <a
                href="https://drive.google.com/uc?export=download&id=1lYUG7b85P9nuI5KAIs16Zbxf0S8dyXpZ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang === 'fr' ? 'Télécharger PDF via Google Drive' : 'Download PDF via Google Drive'}
                className="w-full flex items-center justify-center py-3 bg-[#0152EC] hover:bg-[#0142cc] text-white font-medium text-[18px] sm:text-[20px] rounded-2xl border border-[#5289f2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0152EC]"
              >
                {t.downloadPdf}
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-8 w-full px-4 sm:px-16 lg:px-0">
          <p className="hidden lg:block text-[44px] font-semibold leading-tight text-[#1f1f1f] dark:text-[#f6f6f6]">
            David V.
          </p>

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
    <li className="relative shrink-0 w-[calc(100vw-3rem)] sm:w-[488px] lg:w-[536px] h-[500px] sm:h-[540px] lg:h-[580px] flex flex-col snap-center rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] bg-white dark:bg-[#141414] border border-[#d6d6d6] dark:border-[#2a2a2a] overflow-hidden">

      <div className="px-4 sm:px-5 lg:px-6 pt-2 sm:pt-3 lg:pt-3.5 pb-0">
        <p className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium leading-snug text-black dark:text-[#f6f6f6]">{card.company}</p>
        <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold leading-tight text-[#1f1f1f] dark:text-[#f6f6f6]">{card.role}</p>
        {card.location && (
          <p className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium text-[#5c5c5c] dark:text-[#adadad]">{card.flag} {card.location}</p>
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
          <span className="text-[18px] sm:text-[20px] font-bold text-[#1f1f1f] dark:text-[#f6f6f6]">{card.company}</span>
        )}
      </div>

      {/* In-flow spacer: mirrors closed-drawer stack height so flex-1 logo centers above them */}
      <div className="shrink-0" style={{ height: card.drawers.length * 76 }} />

      {/* Drawers — absolutely positioned at bottom so they overlay without shifting the logo */}
      <ul className="absolute bottom-0 left-0 right-0 flex flex-col bg-white dark:bg-[#141414] pb-2">
        {card.drawers.map((drawer, di) => (
          <li key={di}>
            <div className="mx-4 sm:mx-5 lg:mx-6 h-px bg-[#adadad] dark:bg-[#3a3a3a]" />
            {card.static ? (
              <div className="w-full flex items-center px-4 sm:px-5 lg:px-6 py-3 sm:py-3.5 lg:py-4">
                <span className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold text-[#1f1f1f] dark:text-[#f6f6f6]">{drawer.label}</span>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onToggle(di)}
                  aria-expanded={openDrawers[di]}
                  aria-controls={`exp-drawer-${cardIdx}-${di}`}
                  className="w-full flex items-center justify-between px-4 sm:px-5 lg:px-6 py-3 sm:py-3.5 lg:py-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0152EC]"
                >
                  <span className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold text-[#1f1f1f] dark:text-[#f6f6f6]">{drawer.label}</span>
                  <span className="shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-colors hover:bg-[#1f1f1f] dark:hover:bg-[#f6f6f6] group">
                    <img
                      src={imgChevronDown}
                      alt=""
                      width={24} height={24}
                      className={`dark:brightness-0 dark:invert dark:group-hover:brightness-100 dark:group-hover:invert-0 group-hover:brightness-0 group-hover:invert transition-transform duration-300 ${openDrawers[di] ? 'rotate-180' : ''}`}
                    />
                  </span>
                </button>
                <div
                  id={`exp-drawer-${cardIdx}-${di}`}
                  inert={!openDrawers[di]}
                  onClick={() => onToggle(di)}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out cursor-pointer ${openDrawers[di] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 text-[16px] sm:text-[17px] lg:text-[18px] leading-relaxed text-[#262626] dark:text-[#adadad]">
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
    <section id="experience" className={`${divider} py-16 scroll-mt-24`}>

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
          className="flex gap-8 sm:gap-12 lg:gap-16 overflow-x-auto snap-x snap-mandatory pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0152EC]"
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
        className="mt-2 text-[13px] sm:text-[14px] font-medium text-[#5c5c5c] dark:text-[#adadad] text-center transition-transform duration-300"
        style={{ transform: `translateX(${getDateOffset()}px)` }}
      >
        {cards[activeIndex]?.period}
      </p>

      <div className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-4 mt-4 sm:mt-5 lg:mt-6 pr-6 sm:pr-28 lg:pr-52">
        <button
          onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
          aria-label={t.navPrev}
          className="group p-2 sm:p-2.5 lg:p-3 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color,color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer enabled:active:opacity-70"
        >
          <img
            src={imgChevronLeft}
            alt="" width={20} height={20}
            className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px] brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter]"
          />
        </button>
        <button
          onClick={() => scrollToCard(Math.min(cards.length - 1, activeIndex + 1))}
          disabled={activeIndex === cards.length - 1}
          aria-label={t.navNext}
          className="group p-2 sm:p-2.5 lg:p-3 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color,color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer enabled:active:opacity-70"
        >
          <img
            src={imgChevronRight}
            alt="" width={20} height={20}
            className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px] group-enabled:group-hover:brightness-0 group-enabled:group-hover:invert dark:brightness-0 dark:invert dark:group-enabled:group-hover:brightness-100 dark:group-enabled:group-hover:invert-0 transition-[filter]"
          />
        </button>
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
      <div className={`absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10 transition-opacity duration-150 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-[#1f1f1f] dark:bg-[#f6f6f6] text-[#f6f6f6] dark:text-[#1f1f1f] text-[12px] font-semibold px-2 py-[3px] rounded-[6px] whitespace-nowrap ring-1 ring-white/20 dark:ring-black/10">
          {name}
        </div>
        <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-[#1f1f1f] dark:border-t-[#f6f6f6]" />
      </div>
      <button
        ref={btnRef}
        aria-label={name}
        onMouseEnter={() => { if (!window.matchMedia('(pointer: coarse)').matches) setVisible(true); }}
        onMouseLeave={() => { if (!window.matchMedia('(pointer: coarse)').matches) setVisible(false); }}
        onClick={() => { if (window.matchMedia('(pointer: coarse)').matches) setVisible(v => !v); }}
        className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC] ${noBg ? 'rounded-lg' : 'rounded-[8px] sm:rounded-[10px] lg:rounded-[12px] overflow-hidden bg-[#f6f6f6] dark:bg-[#2a2a2a] shadow-[1px_1px_8px_0px_rgba(0,0,0,0.08)]'}`}
      >
        {icon
          ? <img src={icon} alt={name} loading="lazy" className={`w-full h-full ${noBg ? 'object-contain' : 'object-cover'} ${darkInvert ? 'dark:brightness-0 dark:invert' : ''}`} />
          : <span className="text-[7px] font-bold text-[#5c5c5c] dark:text-[#adadad] text-center leading-tight px-[2px]">{name}</span>
        }
      </button>
    </div>
  );
}

function ExpertiseCard({ card }) {
  return (
    <li className="shrink-0 w-[calc(100vw-8rem)] sm:w-[536px] lg:w-[720px] h-[472px] sm:h-[444px] lg:h-[536px] flex flex-col justify-between snap-center rounded-[32px] sm:rounded-[64px] lg:rounded-[72px] bg-white dark:bg-[#141414] p-6 sm:p-10 lg:p-16">

      <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">
        <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] lg:w-20 lg:h-20 rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] bg-white dark:bg-[#141414] flex items-center justify-center shrink-0 overflow-hidden">
          {card.icon
            ? <img src={card.icon} alt="" width={64} height={64} loading="lazy" className="sm:w-[72px] sm:h-[72px] lg:w-20 lg:h-20 object-contain dark:brightness-0 dark:invert dark:opacity-[0.965]" />
            : <span className="text-[10px] text-[#5c5c5c] dark:text-[#adadad] font-medium text-center px-1">icon</span>
          }
        </div>

        <h3 className="text-[24px] sm:text-[26px] lg:text-[30px] font-bold leading-[32px] sm:leading-[36px] lg:leading-[40px] tracking-[0.12px] text-[#1f1f1f] dark:text-[#f6f6f6]">
          {card.title}
        </h3>

        <p className="text-[16px] sm:text-[17px] lg:text-[18px] leading-[36px] sm:leading-[34px] lg:leading-[40px] text-[#5c5c5c] dark:text-[#adadad]">
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
    <section id="expertise" className={`${divider} py-16 scroll-mt-24 bg-[#f6f6f6] dark:bg-[#1f1f1f]`}>

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
          className="flex gap-8 sm:gap-12 lg:gap-16 overflow-x-auto snap-x snap-mandatory pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0152EC]"
          style={{ scrollbarWidth: 'none', paddingLeft: carouselPl, paddingRight: carouselPl, touchAction: 'pan-x pan-y' }}
        >
          {cards.map((card, ci) => (
            <ExpertiseCard key={ci} card={card} />
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-4 mt-4 sm:mt-5 lg:mt-6 pr-6 sm:pr-28 lg:pr-52">
        <button
          onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
          aria-label={t.xpNavPrev}
          className="group p-2 sm:p-2.5 lg:p-3 rounded-full bg-white dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color,color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer enabled:active:opacity-70"
        >
          <img src={imgChevronLeft} alt="" width={20} height={20}
            className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px] brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter]"
          />
        </button>
        <button
          onClick={() => scrollToCard(Math.min(cards.length - 1, activeIndex + 1))}
          disabled={activeIndex === cards.length - 1}
          aria-label={t.xpNavNext}
          className="group p-2 sm:p-2.5 lg:p-3 rounded-full bg-white dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color,color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer enabled:active:opacity-70"
        >
          <img src={imgChevronRight} alt="" width={20} height={20}
            className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px] group-enabled:group-hover:brightness-0 group-enabled:group-hover:invert dark:brightness-0 dark:invert dark:group-enabled:group-hover:brightness-100 dark:group-enabled:group-hover:invert-0 transition-[filter]"
          />
        </button>
      </div>

    </section>
  );
}

// ── Education ───────────────────────────────────────────────────────────────

function EducationCard({ card, cardIdx, openDrawers, onToggle }) {
  const anyOpen = openDrawers.some(Boolean);
  return (
    <li className="relative shrink-0 w-[calc(100vw-3rem)] sm:w-[488px] lg:w-[536px] h-[500px] sm:h-[540px] lg:h-[580px] flex flex-col snap-center rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] bg-white dark:bg-[#141414] border border-[#d6d6d6] dark:border-[#2a2a2a] overflow-hidden">

      <div className="px-4 sm:px-5 lg:px-6 pt-2 sm:pt-3 lg:pt-3.5 pb-0">
        <p className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium leading-snug text-black dark:text-[#f6f6f6]">{card.institution}</p>
        <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold leading-tight text-[#1f1f1f] dark:text-[#f6f6f6]">{card.degree}</p>
        <p className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium leading-snug text-[#1f1f1f] dark:text-[#f6f6f6]">{card.course}</p>
        {card.location && (
          <p className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium text-[#5c5c5c] dark:text-[#adadad]">{card.flag} {card.location}</p>
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
          <span className="text-[18px] sm:text-[20px] font-bold text-[#1f1f1f] dark:text-[#f6f6f6]">{card.institution}</span>
        )}
      </div>

      {/* In-flow spacer: mirrors closed-drawer stack height so flex-1 logo centers above them */}
      <div className="shrink-0" style={{ height: card.drawers.length * 76 }} />

      {/* Drawers — absolutely positioned at bottom so they overlay without shifting the logo */}
      <ul className="absolute bottom-0 left-0 right-0 flex flex-col bg-white dark:bg-[#141414] pb-2">
        {card.drawers.map((drawer, di) => (
          <li key={di}>
            <div className="mx-4 sm:mx-5 lg:mx-6 h-px bg-[#adadad] dark:bg-[#3a3a3a]" />
            <button
              onClick={() => onToggle(di)}
              aria-expanded={openDrawers[di]}
              aria-controls={`edu-drawer-${cardIdx}-${di}`}
              className="w-full flex items-center justify-between px-4 sm:px-5 lg:px-6 py-3 sm:py-3.5 lg:py-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0152EC]"
            >
              <span className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold text-[#1f1f1f] dark:text-[#f6f6f6]">{drawer.label}</span>
              <span className="shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-colors hover:bg-[#1f1f1f] dark:hover:bg-[#f6f6f6] group">
                <img
                  src={imgChevronDown}
                  alt=""
                  width={24} height={24}
                  className={`dark:brightness-0 dark:invert dark:group-hover:brightness-100 dark:group-hover:invert-0 group-hover:brightness-0 group-hover:invert transition-transform duration-300 ${openDrawers[di] ? 'rotate-180' : ''}`}
                />
              </span>
            </button>
            <div
              id={`edu-drawer-${cardIdx}-${di}`}
              inert={!openDrawers[di]}
              onClick={() => onToggle(di)}
              className={`grid transition-[grid-template-rows] duration-300 ease-out cursor-pointer ${openDrawers[di] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <p className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 text-[16px] sm:text-[17px] lg:text-[18px] leading-relaxed text-[#262626] dark:text-[#adadad]">
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
          className="flex gap-8 sm:gap-12 lg:gap-16 overflow-x-auto snap-x snap-mandatory pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0152EC]"
          style={{ scrollbarWidth: 'none', paddingLeft: carouselPl, paddingRight: carouselPl, touchAction: 'pan-x pan-y' }}
        >
          {cards.map((card, ci) => (
            <EducationCard key={ci} cardIdx={ci} card={card} openDrawers={openDrawers[ci]} onToggle={(di) => toggleDrawer(ci, di)} />
          ))}
        </ul>
      </div>

      <p
        className="mt-2 text-[13px] sm:text-[14px] font-medium text-[#5c5c5c] dark:text-[#adadad] text-center transition-transform duration-300"
        style={{ transform: `translateX(${getDateOffset()}px)` }}
      >
        {cards[activeIndex]?.period}
      </p>

      <div className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-4 mt-4 sm:mt-5 lg:mt-6 pr-6 sm:pr-28 lg:pr-52">
        <button
          onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
          aria-label={t.eduNavPrev}
          className="group p-2 sm:p-2.5 lg:p-3 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color,color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer enabled:active:opacity-70"
        >
          <img src={imgChevronLeft} alt="" width={20} height={20}
            className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px] brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter]"
          />
        </button>
        <button
          onClick={() => scrollToCard(Math.min(cards.length - 1, activeIndex + 1))}
          disabled={activeIndex === cards.length - 1}
          aria-label={t.eduNavNext}
          className="group p-2 sm:p-2.5 lg:p-3 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color,color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer enabled:active:opacity-70"
        >
          <img src={imgChevronRight} alt="" width={20} height={20}
            className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px] group-enabled:group-hover:brightness-0 group-enabled:group-hover:invert dark:brightness-0 dark:invert dark:group-enabled:group-hover:brightness-100 dark:group-enabled:group-hover:invert-0 transition-[filter]"
          />
        </button>
      </div>

    </section>
  );
}

// ── Top Skills + Certifications ─────────────────────────────────────────────

function CertificationCard({ card }) {
  const [flipped, setFlipped] = useState(false);

  const nameEl = card.nameParts ? (
    <>{card.nameParts[0]}<span className="hidden lg:block" aria-hidden="true" />{card.nameParts[1]}</>
  ) : card.name;

  const isSvg = card.svgIcon === true;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      onClick={() => setFlipped(f => !f)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlipped(f => !f); } }}
      className="cursor-pointer [perspective:800px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC] rounded-[32px] sm:rounded-[40px] lg:rounded-[48px]"
    >
      <div className="transition-transform duration-200 sm:hover:scale-[1.04]">
      <div
        className="relative [transform-style:preserve-3d] motion-safe:transition-transform motion-safe:duration-500"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <div inert={flipped} className="flex flex-col items-center pt-3 sm:pt-[14px] lg:pt-4 pb-5 sm:pb-5 lg:pb-6 px-3 sm:px-[14px] lg:px-4 bg-white dark:bg-[#1f1f1f] rounded-[32px] sm:rounded-[40px] lg:rounded-[48px] border border-[#d6d6d6] dark:border-[#2a2a2a] [backface-visibility:hidden]">
          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] bg-white dark:bg-[#1f1f1f] flex items-center justify-center mb-2 sm:mb-[10px] lg:mb-3 overflow-hidden shrink-0">
            {card.icon
              ? <img src={card.icon} alt="" loading="lazy" className={`w-full h-full object-contain${isSvg ? ' dark:brightness-0 dark:invert' : ''}`} />
              : <span className="text-[8px] text-[#5c5c5c] dark:text-[#adadad]">icon</span>
            }
          </div>
          <p className="text-[15px] sm:text-[16px] lg:text-[18px] font-bold text-[#5c5c5c] dark:text-[#adadad] text-center leading-snug">{nameEl}</p>
        </div>

        <div inert={!flipped} className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-[#141414] rounded-[32px] sm:rounded-[40px] lg:rounded-[48px] border border-[#d6d6d6] dark:border-[#2a2a2a] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-[15px] sm:text-[16px] lg:text-[18px] font-bold text-[#1f1f1f] dark:text-[#f6f6f6] text-center leading-snug px-4">{card.issuer}</p>
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
                className="px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 rounded-full border border-[#d6d6d6] dark:border-[#3a3a3a] font-semibold text-[14px] sm:text-[15px] lg:text-[16px] text-[#1f1f1f] dark:text-[#f6f6f6] whitespace-nowrap select-none"
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

          <div className="sm:hidden">
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
              className="flex overflow-x-auto snap-x snap-mandatory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0152EC]"
              style={{ scrollbarWidth: 'none', touchAction: 'pan-x pan-y' }}
            >
              {certPages.map((page, pi) => (
                <li key={pi} className="w-full shrink-0 snap-start flex gap-3">
                  {page.map((card, ci) => (
                    <div key={ci} className="flex-1 min-w-0">
                      <CertificationCard card={card} />
                    </div>
                  ))}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-end gap-2 mt-6">
              <button
                onClick={() => scrollToCertPage(Math.max(0, activePage - 1))}
                disabled={activePage === 0}
                aria-label={t.certNavPrev}
                className="group p-2 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color,color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer enabled:active:opacity-70"
              >
                <img src={imgChevronLeft} alt="" width={20} height={20}
                  className="brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter]"
                />
              </button>
              <button
                onClick={() => scrollToCertPage(Math.min(certPages.length - 1, activePage + 1))}
                disabled={activePage === certPages.length - 1}
                aria-label={t.certNavNext}
                className="group p-2 rounded-full bg-[#f6f6f6] dark:bg-[#2a2a2a] enabled:hover:bg-[#1f1f1f] dark:enabled:hover:bg-[#f6f6f6] transition-[opacity,background-color,color] duration-150 disabled:opacity-30 disabled:cursor-default enabled:cursor-pointer enabled:active:opacity-70"
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
    </section>
  );
}

function Resume({ lang }) {
  const t = T[lang];
  const { hash } = useLocation();

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
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:ring-2 focus:ring-[#0152EC] focus:bg-white focus:text-[#1f1f1f] focus:outline-none">
        {t.skipToMain}
      </a>
      <main id="main-content" aria-label={t.title} className="bg-white dark:bg-[#141414] min-h-screen" tabIndex={-1}>
        <div className="max-w-5xl mx-auto px-6">

          <div className="pt-32 pb-4">
            <h1 className="text-[24px] sm:text-[28px] lg:text-[30px] font-bold leading-tight text-[#1f1f1f] dark:text-[#f6f6f6]">
              {t.title}
            </h1>
          </div>

          {/* 1. Summary */}
          <SummarySection t={t} />

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
      <Footer lang={lang} />
    </>
  );
}

export default Resume;
