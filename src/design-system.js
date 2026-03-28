//───────────────────────────────────────────────────────────────────────────
// Design System • Atelier Digital Portfolio
// Covers: Nav, Footer, Home, Resume, Contact, CaseStudies, Collaborations,
//         ScrollForMore, and all case study pages (Sales Platform, XR Experiences).
// All values are Tailwind-compatible.
//───────────────────────────────────────────────────────────────────────────

// Colour palette──────────────────────────────────────────────────────────

export const color = {

  // Core surfaces
  surface: {
    page:         { light: '#ffffff',  dark: '#141414' },  // page/section background
    elevated:     { light: '#f6f6f6',  dark: '#1f1f1f' },  // cards, tiles, sections
    sunken:       { light: '#e0e0e0',  dark: '#2a2a2a' },  // inset elements, tool icons, modal cards
    overlay:      { light: '#262626',  dark: '#262626' },  // dark mode toggle background
  },

  // Text
  text: {
    primary:      { light: '#1f1f1f',  dark: '#f6f6f6' },  // headings, bold, eyebrows
    secondary:    { light: '#5c5c5c',  dark: '#adadad' },  // muted labels, h3 titles
    body:         { light: '#262626',  dark: '#f6f6f6' },  // body copy
    inverse:      { light: '#f6f6f6',  dark: '#1f1f1f' },  // text on dark/inverted backgrounds
    onDark:       '#d6d6d6',                               // subtitle on dark overlays (case study cards)
  },

  // Borders & glass
  border: {
    subtle:       { light: 'rgba(0,0,0,0.08)',    dark: 'rgba(255,255,255,0.08)'  },  // general borders
    medium:       { light: 'rgba(0,0,0,0.16)',    dark: 'rgba(255,255,255,0.16)'  },  // dropdown/modal borders
    divider:      { light: 'rgba(0,0,0,0.10)',    dark: 'rgba(255,255,255,0.10)'  },  // footer dividers
    legalDivider: { light: 'rgba(0,0,0,0.20)',    dark: 'rgba(255,255,255,0.20)'  },  // footer legal pipe separators
    tooltipRing:  { light: 'rgba(255,255,255,0.20)', dark: 'rgba(0,0,0,0.10)'    },  // tooltip ring
    navRing:      'rgba(255,255,255,0.16)',                                           // dark mode nav ring (dark only)
  },

  // Glass surfaces (backdrop-blur overlays)
  glass: {
    bg:           { light: 'rgba(255,255,255,0.64)', dark: 'rgba(0,0,0,0.64)' },  // nav, dropdowns, modal overlays
    bgHeavy:      { light: 'rgba(255,255,255,0.88)', dark: 'rgba(0,0,0,0.88)' },  // mobile menu
  },

  // Interactive states
  interactive: {
    rest:         { light: '#f6f6f6',  dark: '#2a2a2a' },              // button/icon resting
    hover:        { light: '#1f1f1f',  dark: '#f6f6f6' },              // button/icon hover
    hoverSubtle:  { light: 'rgba(0,0,0,0.04)', dark: 'rgba(255,255,255,0.08)' },  // ghost hover
    activeInvert: { light: '#161616',  dark: '#ffffff' },              // nav pill active (projects, lang)
    pressed:      'opacity-[0.33]',                                    // active/tap feedback
  },

  // Accent
  accent: {
    blue:         '#0152EC',  // contact CTA button (primary action)
    blueHover:    '#0142cc',  // contact CTA hover
    blueBorder:   '#5289f2',  // contact CTA border
    blueOverlay:  'linear-gradient(180deg, rgba(0,130,251,0.3) 0%, rgba(0,130,251,0.5) 100())',  // case study card hover tint
  },

  // Overlay gradients (case study cards)
  cardOverlay: {
    default:      'rgba(0,0,0,0.64)',                                  // base dark overlay
    hover:        'linear-gradient(180deg, rgba(0,130,251,0.3) 0%, rgba(0,130,251,0.5) 100%), rgba(0,0,0,0.64)',
    chip:         { primary: 'rgba(255,255,255,0.16)', secondary: 'rgba(0,0,0,0.32)' },
    restricted:   'rgba(0,0,0,0.82)',                                  // locked content overlay
    lockButton:   'rgba(255,255,255,0.24)',                            // lock icon bg on overlay
  },

  // Case study: UI Concept card accents (Sales Platform 9-up grid)
  uiConceptAccent: [
    { bg: '#ffeeb3', fg: '#916404' },  // 1. Globe        yellow
    { bg: '#ffe2ca', fg: '#994f00' },  // 2. Country      orange
    { bg: '#ffd5d5', fg: '#962628' },  // 3. City/region  red
    { bg: '#ffe9f9', fg: '#8f3575' },  // 4. Hero         pink
    { bg: '#f4e5ff', fg: '#7a38ab' },  // 5. Project      purple
    { bg: '#d7e2f6', fg: '#254c96' },  // 6. Tower        blue dark
    { bg: '#e2ecff', fg: '#286dad' },  // 7. Tower floors blue light
    { bg: '#daf5d3', fg: '#277a22' },  // 8. Unit         green dark
    { bg: '#e9f5d3', fg: '#5e760f' },  // 9. Interiors    green light
  ],

  // Case study: Launches timeline segments (Sales Platform)
  timelineSegment: {
    teal:         '#48e6b8',
    tealMuted:    'rgba(72,230,184,0.5)',
    orange:       '#f26f21',
    orangeMuted:  'rgba(242,111,33,0.5)',
    purple:       '#9747ff',
  },
};

// Typography──────────────────────────────────────────────────────────────
// All responsive sizes follow a mobile → tablet → desktop scale.
// Breakpoints: sm = 640px (tablet), lg = 1024px (desktop).

export const type = {

  // Site-wide

  // Navigation links
  navLink: {
    size:         '16px',
    weight:       'medium',
    leading:      '24px',
  },

  // Navigation dropdown items
  navDropdownItem: {
    size:         '16px',
    weight:       'semibold',
    leading:      '24px',
  },

  // Site logo wordmark
  logo: {
    size:         '16px',
    weight:       'bold',
    letterSpacing: '-0.8px',
  },

  // Nav / ScrollForMore tooltip
  tooltip: {
    size:         ['13px', '15px'],  // [mobile, sm+]
    weight:       'semibold',
    color:        { label: color.text.primary, bg: color.surface.page },
  },

  // Footer section headings
  footerHeading: {
    size:         ['30px', '36px', '44px'],
    weight:       'semibold',
    leading:      'tight',
    color:        color.text.primary,
  },

  // Case study section collapse header (h2)
  sectionHeader: {
    size:         ['20px', '22px', '24px'],
    weight:       'bold',
    color:        color.text.primary,
  },

  // Tile primitives (case study pages)

  // Tile eyebrow, large bold label above content
  eyebrow: {
    size:         ['24px', '26px', '30px'],
    weight:       'bold',
    leading:      'tight',
    color:        color.text.primary,
  },

  // Tile title (h3), large display question or statement
  title: {
    size:         ['30px', '36px', '44px'],
    leading:      ['40px', '48px', '56px'],
    weight:       'semibold',
    color:        color.text.secondary,
  },

  // Sub-section heading (h4)
  h4: {
    size:         ['18px', '20px', '24px'],
    leading:      ['24px', '28px', '32px'],
    weight:       'bold',
    color:        color.text.primary,
  },

  // Body copy (tiles, cards, descriptions)
  body: {
    size:         ['16px', '17px', '18px'],
    leading:      ['30px', '34px', '40px'],
    weight:       'normal',
    color:        color.text.body,
  },

  // Stat / large data display (resume, impact tiles)
  stat: {
    size:         ['30px', '36px', '44px'],
    weight:       'bold',
    leading:      'tight',
    color:        color.text.primary,
  },

  // Footnote
  footnote: {
    size:         ['13px', '14px'],
    weight:       'normal',
    color:        color.text.secondary,
  },

  // Home / case study cards

  // CaseStudies card title
  caseStudyCardTitle: {
    size:         ['18px', '20px', '24px'],
    weight:       'bold',
    letterSpacing: '0.12px',
    color:        '#ffffff',
  },

  // CaseStudies card subtitle
  caseStudyCardSubtitle: {
    size:         ['13px', '15px', '18px'],
    weight:       'medium',
    color:        color.text.onDark,
  },

  // Chip label (case study category tags)
  chip: {
    size:         ['9px', '11px', '12px'],
    weight:       'medium',
  },

  // Collaborations modal

  // Collaborator modal description
  collaboratorBody: {
    size:         ['15px', '16px', '17px'],
    leading:      ['28px', '30px', '34px'],
  },

  // Contact cards

  // Contact card title
  contactCardTitle: {
    size:         ['23px', '26px', '30px'],
    weight:       'bold',
    letterSpacing: '0.12px',
  },

  // Contact CTA button
  contactButton: {
    size:         ['20px', '22px', '24px'],
    weight:       'medium',
  },

  // Sales Platform specific

  // UI concept card title bar
  uiConceptCardTitle: {
    size:         ['13px', '14px', '15px'],
    weight:       'bold',
    leading:      'snug',
  },

  // UI concept card bullets
  uiConceptCardBullet: {
    size:         ['12px', '13px'],
    leading:      'snug',
    color:        color.text.body,
  },

  // Pill / tag label (resume expertise pills)
  pill: {
    size:         ['14px', '15px'],
    weight:       'medium',
    color:        color.text.primary,
  },
};

// Spacing─────────────────────────────────────────────────────────────────

export const spacing = {

  // Case study page tiles
  tileGap:             { mobile: '24px', tablet: '28px', desktop: '32px' },   // gap-6/7/8
  tilePadding:         { mobile: '24px', tablet: '48px', desktop: '60px' },   // p-6/12/[60px]
  tileInnerGap:        { mobile: '16px', tablet: '20px', desktop: '24px' },   // gap-4/5/6
  subsectionGap:       { mobile: '8px',  tablet: '8px',  desktop: '8px'  },   // pt-2
  subsectionGapLarge:  { mobile: '32px', tablet: '40px', desktop: '48px' },   // pt-8/10/12
  sectionPadding:      { mobile: '32px', tablet: '40px', desktop: '48px' },   // py-8/10/12
  sectionHeaderPadding:{ mobile: '24px', tablet: '28px', desktop: '32px' },   // py-6/7/8

  // Carousels (case study pages)
  carouselGap:         { mobile: '16px', tablet: '24px' },                    // gap-4/6
  toolIconGap:         { mobile: '12px', tablet: '8px', desktop: '12px' },    // gap-3/2/3

  // Home, case study cards
  caseStudyCardGap:    { mobile: '4px',  tablet: '6px', desktop: '8px' },
  caseStudyCardSize:   { mobile: '300×420px', tablet: '360×404px', desktop: '384×480px' },
  caseStudyChipGap:    { mobile: '1px',  tablet: '1.5px' },

  // Home, collaborator logos
  collaboratorLogoSize:{ mobile: '152px', tablet: '176px', desktop: '200px' },
  collaboratorCarouselGap: '8px',                                             // constant

  // Contact cards
  contactCardGap:      { mobile: '32px', tablet: '36px', desktop: '40px' },
  contactCardPadding:  { mobile: '32px', tablet: '36px', desktop: '40px' },   // p-8/9/10
  contactIconSize:     { mobile: '64px', tablet: '72px', desktop: '80px' },

  // Footer
  footerTopPadding:    { mobile: '64px', desktop: '112px' },                  // py-16/28
  footerColumnGap:     { mobile: '48px', md: '96px', lg: '160px' },           // gap-12/24/40
  footerSitemapGap:    { tablet: '40px', desktop: '64px' },                   // gap-10/16
};

// Border radius───────────────────────────────────────────────────────────

export const radius = {

  // Case study tiles & carousels
  tile:             { mobile: '24px', tablet: '32px', desktop: '48px' },      // rounded-[24/32/48px]
  carouselTrack:    { mobile: '12px', tablet: '16px', desktop: '24px' },      // rounded-xl/2xl/3xl
  toolIcon:         { mobile: '8px',  tablet: '10px', desktop: '12px' },      // rounded-[8/10/12px]
  uiConceptCard:    '16px',                                                    // rounded-[16px]
  pill:             '9999px',                                                  // rounded-full
  tooltipBubble:    '6px',                                                     // rounded-[6px]
  carouselDot:      '9999px',                                                  // rounded-full

  // Navigation
  navBar:           '9999px',                                                  // rounded-3xl
  navButton:        '12px',                                                    // rounded-[12px]
  navDropdown:      '16px',                                                    // rounded-2xl
  navDropdownItem:  '12px',                                                    // rounded-xl
  flagIcon:         '6px',                                                     // rounded-[6px]
  mobileMenu:       '32px',                                                    // rounded-[32px]
  mobileMenuItem:   '16px',                                                    // rounded-2xl

  // Home cards
  caseStudyCard:    { mobile: '28px', tablet: '32px', desktop: '9999px' },    // → rounded-full on desktop
  caseStudyCardCta: { mobile: '14px', tablet: '16px', desktop: '20px' },
  collaboratorLogo: { mobile: '8px',  tablet: '10px', desktop: '12px' },
  collaboratorModal:{ mobile: '32px', tablet: '40px', desktop: '48px' },
  contactCard:      { mobile: '32px', tablet: '40px', desktop: '48px' },
  contactButton:    { mobile: '16px', tablet: '20px', desktop: '24px' },

  // Footer
  footerLegalLink:  '8px',                                                     // rounded-lg
};

// Shadows─────────────────────────────────────────────────────────────────

export const shadow = {
  nav:          '0px 0px 17.1px 0px rgba(0,0,0,0.08)',   // navigation bar
  dropdown:     '0px 0px 4px 1px rgba(0,0,0,0.04)',      // nav/lang dropdowns
  card:         '0px 18px 20px 0px rgba(0,0,0,0.06)',    // contact & collaborator cards
  toggleKnob:   '0 1px 4px rgba(0,0,0,0.30), 0 0 0 0.5px rgba(0,0,0,0.08)',  // dark mode toggle knob
  toolIcon:     '1px 1px 8px 0px rgba(0,0,0,0.08)',      // tool icon tiles
};

// Breakpoints─────────────────────────────────────────────────────────────

export const breakpoint = {
  sm:  '640px',   // tablet 1-col → 2-col, carousels resize, nav switches to tablet layout
  md:  '768px',   // mid tool icon grid switches from 5×2 to 10×1
  lg:  '1024px',  // desktop full multi-column layouts, nav switches to desktop gap
};

// Responsive images───────────────────────────────────────────────────────
// Media query thresholds used in <picture><source> elements.

export const imageBreakpoint = {
  desktop:  '(min-width: 1024px)',   // lg 3-size images (hifi carousel, userflow)
  tablet:   '(min-width: 640px)',    // sm 2-size images (wireframes) / 3-size (concepts, hifi)
};

// Motion──────────────────────────────────────────────────────────────────

export const motion = {
  // Layout transitions
  sectionCollapse:  'grid-template-rows 300ms ease-in-out',
  chevronRotate:    'transform 300ms',

  // Micro-interactions
  tooltip:          'opacity 150ms',
  button:           'background-color, color 150ms',
  dotIndicator:     'all 200ms',        // carousel dot width + opacity
  filterIcon:       'filter 150ms',     // chevron/icon colour on hover

  // Hover feedback
  cardScale:        'transform 200ms',  // case study & contact cards: hover:scale-[1.03]
  logoScale:        'transform 200ms',  // collaborator logos: hover:scale-[1.06], active:scale-[0.97]

  // Scroll
  carouselScroll:   'smooth (native)',

  // Page
  pageEnter:        'CSS class page-enter (defined in global styles)',
  scrollForMore:    'opacity 500ms',    // ScrollForMore fade-in/out

  // Modal
  collaboratorModal:'cubic-bezier(0.22,1,0.36,1) 300ms',  // modal-in spring
};

// Z-index─────────────────────────────────────────────────────────────────

export const zIndex = {
  scrollForMore:  40,    // z-40 above page content, below nav
  nav:            50,    // z-50 site navigation
  tooltip:        20,    // z-20 tool icon tooltips (within stacking context)
  portal:         9999,  // z-[9999] portalled dropdowns (nav projects, language)
};

// Component tokens────────────────────────────────────────────────────────

export const component = {

  // Nav
  nav: {
    position:       'fixed top-0 left-0 right-0',
    desktopGap:     '192px',   // gap between logo and links
    tabletGap:      '32px',
    backdropBlur:   '4px',
    breakpoints:    { desktop: 'lg (1024px)', tablet: 'sm–lg', mobile: '< sm (640px)' },
  },

  // Collapsible Section (case study pages)
  section: {
    headerTag:          'button',
    contentTag:         'section',
    titleTag:           'h2',
    collapseTransition: 'grid-template-rows 300ms ease-in-out',
    accessibility:      ['aria-expanded', 'inert'],
    defaultOpen:        true,
  },

  // Tile (case study pages)
  tile: {
    defaultBg:    color.surface.page,
    greyBg:       color.surface.elevated,
    transparent:  'transparent',
    layout:       'flex flex-col',
  },

  // ToolIcon (resume & Sales Platform)
  toolIcon: {
    sizes:      { mobile: '32px', tablet: '40px', desktop: '48px' },
    ariaHidden: true,       // decorative tooltip is sighted-only
    trigger:    {
      pointer:  'hover',    // fine pointer (mouse)
      touch:    'tap to toggle',
    },
  },

  // Carousel case study pages (ConceptsCarousel, WireframesCarousel, HifiCarousel)
  caseStudyCarousel: {
    slides:           'snap-x snap-mandatory overflow-x-auto touch-pan-x',
    slideSnap:        'snap-start',
    scrollbar:        'none',
    activeDetection:  'closest left edge to scrollLeft',
    nav: {
      dots:     { active: '16×8px pill', inactive: '8×8px circle' },
      buttons:  'prev / next chevron, disabled at boundaries',
    },
  },

  // Carousel home page (CaseStudies, Collaborations)
  homeCarousel: {
    slides:           'snap-x snap-mandatory overflow-x-auto',
    slideSnap:        { caseStudies: 'snap-center', collaborations: 'snap-start' },
    centreFirstSlide: 'dynamic padding-left calculated from viewport width and card size',
    scrollbar:        'none',
  },

  // LaunchesTimeline (Sales Platform)
  timeline: {
    layout:         'horizontal flex bar chart',
    proportioning:  'flex values derived from week counts',
    segments:       10,
    roundedEnds:    'first and last segment only',
  },

  // UIConceptCard 9-up grid (Sales Platform)
  uiConceptCard: {
    grid:             { mobile: '2 columns', tablet: '3 columns', desktop: '3 columns' },
    thumbnailRatio:   '8:5',
    titleBar:         'absolute overlay at bottom, backdrop-blur-md, per-card accent colour',
    bulletsPosition:  'outside / below the card',
  },
};

// Layout grid ─────────────────────────────────────────────────────────────

export const grid = {
  maxWidth:       '1024px',   // max-w-5xl constrains all section content
  horizontalPad:  '24px',     // px-6 on all sections

  // Case study section tile column ratios
  contextRow1:    '5fr 7fr',  // 42/58 client / industry
  contextRow2:    '1fr 1fr',  // 50/50 mission / stakeholders
  contextRow3:    '5fr 7fr',  // 42/58 tools / team
  emphasise:      '5fr 7fr',  // 42/58 audience / goal + full-width market
};
