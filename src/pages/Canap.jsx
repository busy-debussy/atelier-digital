import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import imgArrowRight  from '../assets/icons/icon-arrow-right.svg';
import imgChevronLeft  from '../assets/icons/icon-chevron-left.svg';
import imgChevronRight from '../assets/icons/icon-chevron-right.svg';
import imgChevronUp    from '../assets/icons/icon-chevron-up.svg';
import { CanapHeroBackdrop } from '../components/CanapHeroBackdrop';
// Interaction-model poster cards, exported straight from Figma so the badge,
// three-dot chip, metadata line and per-size corner radii are pixel-exact.
// `her-m` carries the full chrome; the other three are clean posters for the
// context-sizing strip (M / S / XS).
import imgPosterHerM from '../assets/case-study/canap/poster-her-size-m.webp';
import imgPosterOppenheimerM from '../assets/case-study/canap/poster.oppenheimer-size-m.webp';
import imgPoster2001S from '../assets/case-study/canap/poster-2001-size-s.webp';
import imgPosterPluribusXs from '../assets/case-study/canap/poster-pluribus-size-xs.webp';
import imgMenuDropdown from '../assets/case-study/canap/menu-dropdown.png';
// Poster shown in its real app context (cards list).
import imgPosterCardList from '../assets/case-study/canap/poster-card-list.png';
import imgUndo from '../assets/case-study/canap/undo.webp';

// Tool logos for the Tools section.
import imgToolFigma         from '../assets/logos/tools/logo-figma.webp';
import imgToolPhotoshop     from '../assets/logos/tools/logo-adobe-photoshop.webp';
import imgToolClaude        from '../assets/logos/tools/logo-claude.svg';
import imgToolSwift         from '../assets/logos/tools/logo-swift.webp';
import imgToolNextJs        from '../assets/logos/tools/logo-next-js.webp';
import imgToolPrisma        from '../assets/logos/tools/logo-prisma.webp';
import imgToolVercel        from '../assets/logos/tools/logo-vercel.webp';
import imgToolNeon          from '../assets/logos/tools/logo-neon.webp';
import imgToolIconComposer  from '../assets/logos/tools/logo-icon-composer.webp';
import imgToolSFSymbols     from '../assets/logos/tools/logo-sf-symbols.webp';
import imgToolXcode         from '../assets/logos/tools/logo-xcode.webp';

// Competition logos for the Existing solutions section.
import imgCompLetterboxd from '../assets/logos/competition/logo-letterboxd.webp';
import imgCompTrakt      from '../assets/logos/competition/logo-trakt-tv.webp';
import imgCompJustWatch  from '../assets/logos/competition/logo-just-watch.webp';
import imgCompTVtime     from '../assets/logos/competition/logo-tv-time.webp';

// Real Canap screens + design-system frames, exported from the Figma file
// (key 7PIxc1jS3Kt9XN4dg8xnig) via the Figma MCP and converted to webp.
// To refresh: re-render the node with get_screenshot, download, and run the
// sharp webp conversion (sharp is a devDependency).
import imgCanapHome        from '../assets/case-study/canap/canap-home.webp';
import imgCanapGroup       from '../assets/case-study/canap/canap-group.webp';
import imgCanapWatchlist   from '../assets/case-study/canap/canap-watchlist.webp';
import imgCanapContent     from '../assets/case-study/canap/canap-content.webp';
import imgCanapForYou      from '../assets/case-study/canap/canap-foryou.webp';
import imgCanapFoundations from '../assets/case-study/canap/canap-foundations.webp';
import imgCanapIos26       from '../assets/case-study/canap/canap-ios26.webp';
// User-journey diagram — designer-made SVGs, one pair per theme, each with a
// desktop (landscape) and mobile (portrait) crop. Theme picked via the isDark
// prop; device picked via <picture> breakpoints (mirrors SalesPlatform userflow).
import imgJourneyEnDesktopDark  from '../assets/case-study/canap/user-journey/en-desktop-dark.svg';
import imgJourneyEnDesktopLight from '../assets/case-study/canap/user-journey/en-desktop-light.svg';
import imgJourneyEnMobileDark   from '../assets/case-study/canap/user-journey/en-mobile-dark.svg';
import imgJourneyEnMobileLight  from '../assets/case-study/canap/user-journey/en-mobile-light.svg';
import imgJourneyFrDesktopDark  from '../assets/case-study/canap/user-journey/fr-desktop-dark.svg';
import imgJourneyFrDesktopLight from '../assets/case-study/canap/user-journey/fr-desktop-light.svg';
import imgJourneyFrMobileDark   from '../assets/case-study/canap/user-journey/fr-mobile-dark.svg';
import imgJourneyFrMobileLight  from '../assets/case-study/canap/user-journey/fr-mobile-light.svg';
// Sign-in flow hero screens — Figma exports (3x → webp), dark-only like the
// app. Keyed by the `img` field on each beat in the signIn copy.
import imgSignInSignIn   from '../assets/case-study/canap/sign-in-flow/01-sign-in.webp';
import imgSignInCode     from '../assets/case-study/canap/sign-in-flow/02-code.webp';
import imgSignInProfile  from '../assets/case-study/canap/sign-in-flow/03-profile.webp';
import imgSignInEditAvatar from '../assets/case-study/canap/sign-in-flow/04-edit-avatar.webp';
import imgSignInInterests from '../assets/case-study/canap/sign-in-flow/05-interests.webp';
import imgSignInAllSet   from '../assets/case-study/canap/sign-in-flow/06-all-set.webp';
// UX & Core Flows — Figma design screen + shipped iPhone build, one pair per
// app tab.
import imgUxHomeFigma    from '../assets/case-study/canap/ux-flows/home-figma.webp';
import imgUxLibraryFigma from '../assets/case-study/canap/ux-flows/library-figma.webp';
import imgUxForYouFigma  from '../assets/case-study/canap/ux-flows/for-you-figma.webp';
import imgUxGroupsFigma  from '../assets/case-study/canap/ux-flows/groups-figma.webp';
import imgUxSearchFigma  from '../assets/case-study/canap/ux-flows/search-figma.webp';
import imgUxHomeBuild    from '../assets/case-study/canap/ux-flows/home-build.webp';
import imgUxLibraryBuild from '../assets/case-study/canap/ux-flows/library-build.webp';
import imgUxForYouBuild  from '../assets/case-study/canap/ux-flows/for-you-build.webp';
import imgUxGroupsBuild  from '../assets/case-study/canap/ux-flows/groups-build.webp';
import imgUxSearchBuild  from '../assets/case-study/canap/ux-flows/search-build.webp';
// Onboarding flow-map diagram — designer-made SVGs (one pair per theme, each a
// desktop landscape + mobile portrait crop), same treatment as the user journey.
import imgSifGraphEnDesktopDark  from '../assets/case-study/canap/sign-in-flow/en-desktop-dark.svg';
import imgSifGraphEnDesktopLight from '../assets/case-study/canap/sign-in-flow/en-desktop-light.svg';
import imgSifGraphEnMobileDark   from '../assets/case-study/canap/sign-in-flow/en-mobile-dark.svg';
import imgSifGraphEnMobileLight  from '../assets/case-study/canap/sign-in-flow/en-mobile-light.svg';
import imgSifGraphFrDesktopDark  from '../assets/case-study/canap/sign-in-flow/fr-desktop-dark.svg';
import imgSifGraphFrDesktopLight from '../assets/case-study/canap/sign-in-flow/fr-desktop-light.svg';
import imgSifGraphFrMobileDark   from '../assets/case-study/canap/sign-in-flow/fr-mobile-dark.svg';
import imgSifGraphFrMobileLight  from '../assets/case-study/canap/sign-in-flow/fr-mobile-light.svg';
import imgTechEnDesktopDark  from '../assets/case-study/canap/technical-direction/en-desktop-dark.svg';
import imgTechEnDesktopLight from '../assets/case-study/canap/technical-direction/en-desktop-light.svg';
import imgTechEnMobileDark   from '../assets/case-study/canap/technical-direction/en-mobile-dark.svg';
import imgTechEnMobileLight  from '../assets/case-study/canap/technical-direction/en-mobile-light.svg';
import imgTechFrDesktopDark  from '../assets/case-study/canap/technical-direction/fr-desktop-dark.svg';
import imgTechFrDesktopLight from '../assets/case-study/canap/technical-direction/fr-desktop-light.svg';
import imgTechFrMobileDark   from '../assets/case-study/canap/technical-direction/fr-mobile-dark.svg';
import imgTechFrMobileLight  from '../assets/case-study/canap/technical-direction/fr-mobile-light.svg';
import imgBehaviourEnDark    from '../assets/case-study/canap/behaviour-paths/en-dark.svg';
import imgBehaviourEnLight   from '../assets/case-study/canap/behaviour-paths/en-light.svg';
import imgBehaviourFrDark    from '../assets/case-study/canap/behaviour-paths/fr-dark.svg';
import imgBehaviourFrLight   from '../assets/case-study/canap/behaviour-paths/fr-light.svg';
// imgCanapForYou is used in the Design opener showcase below.
import imgCanapIcons       from '../assets/case-study/canap/canap-icons.webp';
import imgIcons16          from '../assets/case-study/canap/icons-size-16.webp';
import imgIcons24          from '../assets/case-study/canap/icons-size-24.webp';
import imgFigmaAppIcon     from '../assets/case-study/canap/figma-app-icon.png';
// Feature / IA glyphs — SF Symbols exported from the Canap app as white SVGs;
// rendered via CSS mask so `bg-current` tints them with the theme fg colour.
import iconSquareGrid      from '../assets/case-study/canap/icon-square-grid.svg';
import iconFilmStack       from '../assets/case-study/canap/icon-film-stack.svg';
import iconMagnifyingglass from '../assets/case-study/canap/icon-magnifyingglass.svg';
import iconPerson2         from '../assets/case-study/canap/icon-person-2.svg';
import iconMessage         from '../assets/case-study/canap/icon-message.svg';
import iconPaperplane      from '../assets/case-study/canap/icon-paperplane.svg';
import iconHouseFill       from '../assets/case-study/canap/icon-house-fill.svg';
import iconPersonCropCircle from '../assets/case-study/canap/icon-person-crop-circle.svg';
import iconSparkles        from '../assets/case-study/canap/icon-sparkles.svg';

// ---------------------------------------------------------------------------
// Canap — case study page (SCAFFOLD)
//
// Status: structural skeleton, copy is TODO, visuals are colour-block
// placeholders. Mirrors the section anatomy of SalesPlatform.jsx so the
// secondary nav, scroll behaviour, and tile vocabulary all line up with
// the rest of the portfolio.
//
// Fill order (suggested):
//   1. T.en strings — write the English copy section by section, top to
//      bottom. Don't worry about French until the English is locked in.
//   2. T.fr strings — translate once en is final. Keep TODO markers
//      until then; the bilingual scaffold won't crash with TODOs.
//   3. Replace `<Placeholder>` blocks with real <picture> elements as
//      assets land. Naming follows SalesPlatform: en/fr × light/dark ×
//      desktop/tablet/mobile under /assets/case-study/canap/.
//   4. (Optional) lift carousels + scroll-spy nav from SalesPlatform.jsx
//      once the page has enough real content to justify them.
// ---------------------------------------------------------------------------

// Translation object — every string slot the page needs, scaffolded as
// `[TODO en]` / `[TODO fr]` so visual proofing works before copy is final.
const T = {
  en: {
    pageTitle: 'Canap • Case study',
    hero: {
      category: 'NDA-free side project',
      // The headline angle the audit recommends: cross-platform consumer
      // product shipped solo. Keep it punchy — display-1 reads at a
      // distance.
      title: 'A media app for watching together',
      stats: [
        { prefix: '', countTo: 6, decimals: 0, suffix: ' weeks', label: 'from idea to alpha testing' },
      ],
    },
    context: {
      header: 'Context',
      eyebrows: ['Origin', 'Pain points', 'Problem statement'],
      painsIntro: <><p>Finding content worth watching can be more difficult than it should. Especially in group settings.</p><p>Across conversations, clear patterns emerged:</p></>,
      client: <><p>Many of the projects I worked on are challenging to share publicly due to client ownership and confidentiality agreements.</p><p>To provide a clearer view of how I think and work, I invested the equivalent of <strong>six weeks in designing and building</strong> a product from scratch.</p><p>The project addresses a <strong>recurring problem</strong> observed within my circle, and it highlights my end-to-end approach to <strong>product strategy</strong>, <strong>UX/UI design</strong>, <strong>execution</strong>, and <strong>AI-assisted development</strong>.</p></>,
      painPoints: [
        <>“Let’s watch a film. Something we haven’t seen yet.” We start discussing, negotiating, <strong>scrolling</strong>. <strong>40 minutes pass.</strong> It's already bedtime.</>,
        <>"We picked something and watched 20 minutes." <strong>Neither of us really wanted it.</strong> We stopped watching.</>,
        <>"We’re subscribed to five streaming apps. <strong>We end up switching between several apps</strong> before finding something to watch."</>,
        <>A bus ad. A podcast. A conversation at a party. A family dinner. <strong>Recommendations rarely appear when we are in a position to act on them.</strong></>,
      ],
      painsOutro: <>These observations highlight frictions around decision-making and coordination.</>,
      problemStatement: 'When people want to watch something together, discovering and agreeing on content can be difficult. Content is fragmented across platforms, turning a simple decision into a time-consuming process that often results in unsatisfying compromises.',
      constraintLabel: 'Constraint',
      constraint: [
        'Designing for iOS narrows the scope to mobile-first content discovery and viewing decisions.',
        'iOS also offers strong native support for sharing, saving, song recognition, and notifications.',
      ],
    },
    research: { header: 'Research' },
    appReviews: {
      header: 'App store review analysis',
      intro: 'To better understand how existing solutions were perceived in practice, reviewing user feedback validated observed pain points beyond my immediate network.',
      carouselLabel: 'App Store reviews',
      cardOf: (n, total) => `Review ${n} of ${total}`,
      navPrev: 'View previous review',
      navNext: 'View next review',
    },
    insights: {
      header: 'Key insights',
      items: [
        'Users expect a consistent experience across content types.',
        'Existing products don’t directly address group coordination.',
        'Discovery and decision-making are separate moments.',
      ],
    },
    existing: {
      header: 'Existing solutions',
      intro: 'Current solutions each address only a fragment of the problem.',
      carouselLabel: 'Existing solutions',
      navPrev: 'View previous solution',
      navNext: 'View next solution',
      cardOf: (n, total) => `Solution ${n} of ${total}`,
      apps: [
        {
          name: 'Letterboxd',
          category: 'Film social network',
          doesWell: 'Strong community built around comments and lists.',
          gap: 'Limited to films, with no support for TV or group coordination.',
        },
        {
          name: 'Trakt',
          category: 'Universal tracker',
          doesWell: 'Tracks anything across every platform, with detailed stats.',
          gap: 'Optimised for tracking. Lacks social discovery.',
        },
        {
          name: 'JustWatch',
          category: 'Streaming router',
          doesWell: 'Makes it easy to find where content is streaming.',
          gap: 'No watch history, no social layer, and no taste-based discovery.',
        },
        {
          name: 'TV Time',
          category: 'TV tracker',
          doesWell: 'Effective TV tracking with reminders for ongoing series.',
          gap: 'Group experience is limited to comments only.',
        },
      ],
    },
    ideate: {
      header: 'Ideate',
      braindumpHeader: 'Braindump',
      intro: 'A first-pass braindump of the features I wished existed, written down before any sorting or judgement.',
      items: [
        'Multi-user: each person ticks what they’ve already seen, so it’s easier to find something new for everyone.',
        'Recommend a title directly to a friend or a group.',
        'IMDB and Rotten Tomatoes ratings on every title.',
        'One place for what we watched, what we’re watching, and what we want to watch.',
        'Where each title is available to stream.',
        'A calendar view of what’s coming out and when.',
        'Recommendations based on watch history. Handles one user or a whole group watching together.',
        'Group content by genre, category, year, audience, type.',
        'Works for people who don’t live together.',
      ],
    },
    productPrinciples: {
      header: 'Product principles',
      items: [
        { title: 'Unify the entertainment journey', body: 'Films, TV series, and documentaries are part of one experience.' },
        { title: 'Support shared decision-making', body: 'Help groups find content to watch together.' },
        { title: 'Enable recommendation sharing', body: 'Enable users to save and share recommendations instantly.' },
      ],
    },
    coreFeatures: {
      header: 'Core features',
      items: [
        { icon: 'discovery', title: 'Discovery', body: 'Browse per type, genre, mood, date, awards, rating.' },
        { icon: 'library', title: 'Library', body: 'Manage films, TV series, and documentaries.' },
        { icon: 'search', title: 'Search', body: 'Quickly find any content and people.' },
        { icon: 'groups', title: 'Groups', body: 'Identify content that aligns with the likes of multiple people.' },
        { icon: 'social', title: 'Social', body: 'Community building with ratings, songs and comment.' },
        { icon: 'recommendations', title: 'Recommend', body: 'Save and share content from any source in seconds.' },
      ],
      carousel: {
        carouselLabel: 'Core features',
        navPrev: 'View previous feature',
        navNext: 'View next feature',
        cardOf: (n, total) => `Feature ${n} of ${total}`,
      },
    },
    principles: {
      header: 'Design principles',
      intro: 'Eight principles that shaped every screen.',
      carouselLabel: 'Design principles',
      navPrev: 'View previous principle',
      navNext: 'View next principle',
      cardOf: (n, total) => `Principle ${n} of ${total}`,
      items: [
        {
          title: 'Progressive disclosure',
          body: 'Show only what’s needed in the moment. Reveal options gradually, so beginners aren’t overwhelmed and experts still find the depth.',
        },
        {
          title: 'Immediate feedback',
          body: 'Every interaction produces a visible, tactile, or audio response. Nothing happens silently.',
        },
        {
          title: 'Affordances',
          body: 'Elements suggest how they’re used through shape, position, and small visual cues, never heavy skeuomorphism.',
        },
        {
          title: 'Consistency',
          body: 'Similar actions behave similarly everywhere. Cognitive load drops, predictability rises.',
        },
        {
          title: 'Hierarchy',
          body: 'Visual hierarchy guides attention naturally. Important actions earn emphasis through spacing, contrast, placement, and accent colour.',
        },
        {
          title: 'Reduction',
          body: 'Less is more. Remove unnecessary decisions and interface elements; carry only what the moment requires.',
        },
        {
          title: 'Forgiveness',
          body: 'Mistakes are easy to recover from. Undo is one tap away, destructive actions confirm, and nothing irreversible happens by accident.',
        },
        {
          title: 'Content first',
          body: 'The interface exists to help the user reach the content, not to compete with it. UI recedes, content leads.',
        },
      ],
    },
    design: {
      header: 'Design',
      iaHeader: 'Information architecture',
      iaCarousel: {
        carouselLabel: 'Information architecture',
        navPrev: 'View previous tab',
        navNext: 'View next tab',
        cardOf: (n, total) => `Tab ${n} of ${total}`,
      },
      journey: {
        header: 'User journey',
        intro: 'At the heart of the experience is a content-management flow, enabling users to quickly track, prioritise or discard titles.',
        imgAlt: 'The path to marking a title — find it, act in place or open it, then pick where it belongs — landing in one of five states: Watching, Want to watch, Watched, Stopped or Dismissed.',
      },
      interaction: {
        header: 'Interaction model',
        intro: 'Posters are the primary interactive element across the app. They keep the 2:3 ratio, which sits naturally on mobile.',
        posterAlt: 'A poster carrying its status badge, action chip and metadata',
        badgeStatus: 'Watching',
        metaYear: '2013',
        metaRating: '8.0',
        annotations: [
          { n: '1', title: 'Status badge', body: 'A frosted disk indicates a status is set, giving immediate feedback and indicating the title belongs to a list.' },
          { n: '2', title: 'Action menu', body: 'A long press opens a contextual menu and a three-dot chip in the bottom-right makes that menu discoverable.' },
          { n: '3', title: 'Adaptive metadata', body: 'Release year, IMDb score, user’s own rating. Only what’s relevant surfaces, always in a familiar place.' },
        ],
        sizingLabel: 'Sized for context',
        sizes: [
          { label: 'Discovery', w: 132 },
          { label: 'Carousel', w: 92 },
          { label: 'List', w: 62 },
        ],
        viewingLabel: 'Viewing modes',
        viewingBody: 'Flexible carousels, list and grid views support different user preferences. And swipe gestures enable faster actions.',
        undoLabel: 'Human error',
        undoBody: 'List management actions are easily recoverable, giving users the confidence to explore.',
        menuLabel: 'A menu that fits the moment',
        menuBody: 'The menu, with quick actions, adapts to each context, offering only the appropriate actions at the right time.',
        menuQuick: [
          { label: 'Want to watch', icon: 'bookmark' },
          { label: 'Watching', icon: 'eye' },
          { label: 'Watched', icon: 'check', green: true },
        ],
        menuRows: [
          { label: 'Recommend', icon: 'send' },
          { label: 'Add to favourites', icon: 'heart' },
          { label: 'Save to collection', icon: 'tray' },
          { label: 'Remove from lists', icon: 'x', destructive: true },
        ],
        outro: 'Making posters both the source of information and the point of action keeps the interface simple.',
      },
      signIn: {
        header: 'Onboarding flow',
        intro: 'Attention to details was applied throughout the app, including in the onboarding experience, from account creation to profile setup.',
        figmaCta: 'Open the prototype in Figma',
        carousel: {
          carouselLabel: 'Sign-in flow',
          navPrev: 'View previous step',
          navNext: 'View next step',
          cardOf: (n, total) => `Step ${n} of ${total}`,
        },
        beats: [
          {
            n: '01',
            title: 'Entry screen',
            body: 'Dual-path authentication, no password required.',
            img: 'signIn',
            alt: 'Sign-in screen: a grid of film posters behind a yellow “Sign in with email” button and a “Sign in with Apple” button.',
          },
          {
            n: '02',
            title: 'Verification code',
            body: 'The code is split into two groups of three for easier memorising and entry.',
            img: 'code',
            alt: 'Verification screen: “Check your inbox” above six code boxes, the first two filled, with a numeric keypad below.',
          },
          {
            n: '03',
            title: 'Profile setup',
            body: 'A simple identity setup step with real-time validation and availability checks.',
            img: 'profile',
            alt: 'Profile setup: an avatar, a name field, and a username field showing live “3–14 characters” and “Available” checks.',
          },
          {
            n: '04',
            title: 'Avatar personalisation',
            body: 'Lightweight profile creation using colours, initials, and emojis.',
            img: 'editAvatar',
            alt: 'Edit-avatar sheet: a monogram avatar above a row of backdrop-colour swatches and an “Add emoji” option.',
          },
          {
            n: '05',
            title: 'Interest swiping',
            body: 'A swipe-based step to like or skip films, supported by haptics and undo.',
            img: 'interests',
            alt: 'Interest picker: a large film poster you swipe to like or skip, captioned “Swipe left to skip, swipe right to like”.',
          },
          {
            n: '06',
            title: 'Setup complete',
            body: 'Completion screen that preloads the home experience in the background.',
            img: 'allSet',
            alt: 'Confirmation screen: a yellow checkmark above “All set!” and a welcome message.',
          },
        ],
      },
      intro: 'Four decisions did most of the work. Each one grew out of an Apple Human Interface Guidelines principle, and each one is running on a real screen today. The screens here are exported straight from the Figma file.',
      figmaLabel: 'View in Figma',
      features: [
        {
          number: '01',
          principle: 'Hierarchy',
          title: 'Group sessions',
          body: 'A watchlist you open with someone else. Priorities lean toward whoever added a title, vetoes stay visible, and the next pick goes to the person whose choices have waited longest.',
          node: '836:25807',
        },
        {
          number: '02',
          principle: 'Progressive disclosure',
          title: 'The spoiler curtain',
          body: 'Episode titles, descriptions, even the episode count stay hidden behind a curtain until you choose to look. The app assumes you would rather not know yet.',
          node: '783:22615',
        },
        {
          number: '03',
          principle: 'Reduction',
          title: 'A home with no feed',
          body: 'No infinite scroll waiting on the home screen. You get a short, finite set of cards: what comes next, what the group landed on, what just arrived. Then it stops, on purpose.',
          node: '211:650',
        },
        {
          number: '04',
          principle: 'Content first',
          title: 'One watchlist',
          body: 'A single list that spans Netflix, Prime, Apple TV plus and the rest. Where to watch is a quiet detail on each title, not the thing the whole library is built around.',
          node: '850:26734',
        },
      ],
      inspect: {
        title: 'Look around the file yourself',
        body: 'The whole design is open for inspection. Pan through the screens below, or open the file in Figma to see how each one is put together.',
        cta: 'Open in Figma',
      },
    },
    designSystem: {
      header: 'Design system',
      intro: <><p>The product was designed exclusively for dark mode to prioritise content artwork.</p><p>Colour, type, radius and spacing are one token system, defined in Figma as semantic variables, and split into four JSON files in code.</p></>,
      reducedNote: 'Scales are intentionally reduced for presentation purposes.',
      openFigma: 'Open Figma file',
      dsLabels: { palette: 'Palette', type: 'Type', surfaces: 'Surfaces', icons: 'Icons', radii: 'Radii', iconSizes: 'Icon sizes', spacing: 'Spacing' },
      categories: [
        { id: 'ds-colour', label: 'Colour' },
        { id: 'ds-type', label: 'Type' },
        { id: 'ds-spacing', label: 'Spacing' },
        { id: 'ds-radius', label: 'Radius' },
        { id: 'ds-icons', label: 'Icons' },
        { id: 'ds-components', label: 'Components' },
      ],
      foundations: {
        colour: {
          title: 'Colour',
          body: 'The product was designed for dark mode to keep the focus on content.',
          labels: { semantic: 'Status and accent', surfaces: 'Surfaces', avatars: 'Avatar palette' },
        },
        type: {
          title: 'Type',
          body: 'One typeface aligned with the Apple Human Interface Guidelines, supporting accessible scaling while maintaining visual hierarchy.',
        },
        radius: {
          title: 'Radius',
          body: 'A fixed set of corner radii. Every surface picks a role, card at 16, tile at 20, hero at 24, and raw numbers are not allowed, so roundness stays even from one screen to the next.',
        },
        spacing: {
          title: 'Spacing',
          body: 'Standardised spacing tokens ensure visual consistency.',
        },
      },
      pipeline: {
        label: 'One source of truth',
        body: 'The tokens live as JSON. A sync step rebuilds the SwiftUI token files from that one source, and the build fails if they drift. Change a value once and the whole app moves with it. Pulling those values from Figma is still a manual export for now — the live Variables API is Enterprise-only — but everything downstream of the JSON is automated and drift-checked.',
      },
      foundationsShot: 'The foundations page from the Figma file: colour, type, spacing, radius and icon sizes in one place.',
      iconsShot: 'The icon set, drawn at every size it ships in.',
      inspect: {
        title: 'See the whole system',
        body: 'The library is open for inspection. Pan around the components and icons here, or open the file in Figma to dig in.',
        cta: 'Open in Figma',
      },
    },
    process: {
      header: 'Built with AI',
      intro: 'Designed, developed, and launched as a solo project, I own product strategy, UX, visual design, and implementation, using AI to support exploration, prototyping, and development.\nIt enabled faster iteration and more informed implementation decisions across the process.',
      assetLabel: 'Screenshot',
      // UX & Core Flows carousel — 5 flows, each shown as a Figma design next to
      // the shipped iPhone build.
      uxFlows: {
        figmaLabel: 'Figma',
        buildLabel: 'Build',
        carousel: {
          carouselLabel: 'UX & core flows',
          navPrev: 'View previous flow',
          navNext: 'View next flow',
          cardOf: (n, total) => `Flow ${n} of ${total}`,
        },
        slides: [
          { id: 'home',    label: 'Home' },
          { id: 'library', label: 'Library' },
          { id: 'for-you', label: 'For you' },
          { id: 'groups',  label: 'Groups' },
          { id: 'search',  label: 'Search' },
        ],
      },
      // iOS Build & Testing carousel — 6 build/testing captures, one per slide.
      iosBuild: {
        carousel: {
          carouselLabel: 'iOS build & testing',
          navPrev: 'View previous',
          navNext: 'View next',
          cardOf: (n, total) => `${n} of ${total}`,
        },
        slides: [
          { id: 'slide-intro', label: 'Testing session', text: 'An analysis of how users rate content.' },
          { id: 'slide-1', label: 'Problem', text: 'Only ~20% of users were giving content a rating (0 to 5), despite high engagement.' },
          { id: 'slide-experiment', label: 'Experiment', text: 'To understand behaviours, users were asked during interview sessions to rate content they had previously watched.' },
          { id: 'slide-2', text: '', diagram: 'behaviourPaths' },
          { id: 'slide-3', label: 'Key behavioural insights', bullets: ['The vast majority of users went through the Library', 'Only 36% switched to card view to rate in bulk', 'Only 20% sorted the list by “Unrated”', 'Users who optimised their flow were 80% faster'] },
          { id: 'slide-aha', aha: { label: 'Unexpected discovery', text: 'During a test, a swipe to remove a title from “Watched” triggered an unintended rating.' } },
          { id: 'slide-4', label: 'Product changes', bullets: ['The “Watched” tab is shown in card view by default', 'A tooltip explains the purpose of the sort button on first visit', 'The swipe gesture is separated from rating to avoid errors', 'Marking a title as watched opens a rating sheet — a “Don’t show again” button lets users hide it when it feels redundant'] },
          { id: 'slide-5', label: 'Impact', bullets: ['Rating adoption rose to ~48% of new users', '80% of users who discovered sorting use it to rate', 'Card view became dominant in the “Watched” list'] },
        ],
      },
      sections: [
        {
          id: 'process-technical',
          title: 'Technical direction',
          caption: 'Early exploration focused on backend structure, authentication, and scalability. AI supported decision-making, contributing to a pragmatic stack choice using Prisma and Vercel.',
          image: null,
          diagram: 'techStack',
        },
        {
          id: 'process-flows',
          title: 'UX & Core Flows',
          caption: 'AI accelerated exploration of key interaction patterns for the app, including the homepage watching section, the want to watch priorisation, the recommendation algorithm, group management and search features.',
          image: null,
          carousel: 'uxFlows',
        },
        {
          id: 'process-build',
          title: 'iOS Build & Testing',
          caption: 'AI supported implementation in Xcode by speeding up SwiftUI scaffolding and iteration inside the iOS Simulator.\nCombined with TestFlight testing, this enabled rapid validation of real-world behaviour, especially around synchronisation, session stability, and interaction timing, feeding insights back into the product loop.',
          image: null,
          carousel: 'iosBuild',
        },
      ],
    },
    impact: {
      header: 'Impact',
      outcome: {
        eyebrow: 'Outcome',
        body: [
          'This project demonstrates the end-to-end creation of a product as a solo designer, from problem definition through to a working iOS alpha.',
          'AI acted as a continuous support layer across the process, helping accelerate technical decisions, expand UX exploration, and bridge the gap between design and implementation in Xcode.',
          'Rather than replacing design work, it increased iteration speed and made it possible to move fluidly between thinking, building, and testing.',
        ],
      },
      nextSteps: {
        eyebrow: 'Next steps',
        body: [
          'The product is still in active development.',
          'The alpha release on TestFlight opens a series of upcoming tests, aimed at improving the product and validating the ambition behind this case study: building a better way to watch content together.',
        ],
      },
    },
    tools: { label: 'Enablers' },
    outro: 'Back to case studies',
  },

  fr: {
    pageTitle: 'Canap • Étude de cas',
    hero: {
      category: 'Projet perso',
      title: 'Une app média pour mieux choisir',
      stats: [
        { prefix: '', countTo: 6, decimals: 0, suffix: ' semaines', label: 'de l’idée à l’alpha' },
      ],
    },
    context: {
      header: 'Contexte',
      eyebrows: ['Origine', 'Friction', 'Énoncé du problème'],
      painsIntro: <><p>Trouver un contenu qui vaut la peine d’être regardé peut être plus compliqué qu’il ne devrait l’être, surtout à plusieurs.</p><p>Au fil des conversations, des tendances clairs sont apparues :</p></>,
      painsOutro: <>Ces observations mettent en évidence des points de friction dans la prise de décision et la coordination.</>,
      client: <><p>Une grande partie des projets sur lesquels j’ai travaillé est difficile à partager publiquement, car ils appartiennent à des clients ou sont sous accords de confidentialité.</p><p>Pour offrir une vue plus claire de ma façon de penser et de travailler, j’ai consacré l’équivalent de <strong>six semaines à concevoir et construire</strong> un produit de A à Z.</p><p>Le projet répond à un <strong>problème</strong> observé dans mon entourage, et met en lumière mon approche en <strong>stratégie produit</strong>, <strong>design UX/UI</strong>, <strong>exécution</strong> et <strong>développement assisté par l’IA</strong>.</p></>,
      painPoints: [
        <>« On veut regarder un film. Un truc qu’on n’a pas encore vu. » On discute. On négocie. <strong>On scrolle</strong>. <strong>40 minutes passent.</strong> Et c’est déjà l’heure d’aller dormir.</>,
        <>« On a fini par choisir quelque chose. On a regardé 20 minutes. » <strong>Aucun de nous n’en avait vraiment envie.</strong> On a arrêté.</>,
        <>« On est abonnés à cinq plateformes de streaming. <strong>On passe d’une app à l'autre</strong> avant de trouver quelque chose. »</>,
        <>Une pub sur un bus. Un podcast. Une conversation lors d’une soirée. Un dîner de famille. <strong>Les recommandations arrivent rarement au bon moment.</strong></>,
      ],
      problemStatement: 'Quand des gens veulent regarder quelque chose ensemble, le choix et la prise de décision sont souvent compliqués. La fragmentation des contenus entre les plateformes rend ce processus long et conduit fréquemment à des compromis insatisfaisants.',
      constraintLabel: 'Contrainte',
      constraint: [
        'Le produit a été conçu pour iOS afin de fixer un cap clair et de se concentrer sur les usages mobile.',
        'iOS offre aussi des mécanismes natifs solides de partage et de notifications, centraux dans l’expérience.',
      ],
    },
    research: { header: 'Recherche' },
    appReviews: {
      header: 'Analyse des avis utilisateurs',
      intro: 'Pour mieux comprendre la perception des solutions existantes, l’analyse d’avis utilisateurs a permis de confirmer les points de friction indentifiés au-delà de mon entourage proche.',
      carouselLabel: 'Avis de l’App Store',
      cardOf: (n, total) => `Avis ${n} sur ${total}`,
      navPrev: 'Voir l’avis précédent',
      navNext: 'Voir l’avis suivant',
    },
    insights: {
      header: 'Points clés',
      items: [
        'Les utilisateurs attendent une expérience unifiée à travers films, séries et documentaires.',
        'Les produits existants ne répondent pas directement au défi de la coordination de groupe.',
        'La découverte et la prise de décision sont deux moments distincts.',
      ],
    },
    existing: {
      header: 'Solutions existantes',
      intro: 'Les solutions actuelles ne traitent chacune qu’un fragment du problème.',
      carouselLabel: 'Solutions existantes',
      navPrev: 'Voir la solution précédente',
      navNext: 'Voir la solution suivante',
      cardOf: (n, total) => `Solution ${n} sur ${total}`,
      apps: [
        {
          name: 'Letterboxd',
          category: 'Réseau social cinéphile',
          doesWell: 'Une communauté née des critiques, des listes et de la découverte.',
          gap: 'Limité au cinéma, sans prise en charge des séries ni des groupes.',
        },
        {
          name: 'Trakt',
          category: 'Suivi universel',
          doesWell: 'Suit tout sur toutes les plateformes, avec des stats détaillées.',
          gap: 'Optimisé pour le suivi, mais offre une découverte sociale limitée.',
        },
        {
          name: 'JustWatch',
          category: 'Routage streaming',
          doesWell: 'Permet de trouver facilement sur quelles plateformes le contenu est dispo.',
          gap: 'Pas d’historique de visionnage, ni de couche sociale.',
        },
        {
          name: 'TV Time',
          category: 'Suivi TV',
          doesWell: 'Un suivi TV efficace avec des rappels pour les séries en cours.',
          gap: 'L’expérience de groupe se limite aux commentaires.',
        },
      ],
    },
    ideate: {
      header: 'Idéation',
      braindumpHeader: 'Remue-méninges',
      intro: 'Un premier jet : les fonctionnalités que je rêvais d’avoir, écrites avant tout tri ou jugement.',
      items: [
        'Multi-utilisateur : chacun coche ce qu’il a déjà vu, pour qu’il soit plus facile de trouver quelque chose de nouveau pour tout le monde.',
        'Recommander un titre directement à un ami ou à un groupe.',
        'Les notes IMDB et Rotten Tomatoes sur chaque titre.',
        'Un seul endroit pour ce qu’on a regardé, ce qu’on regarde, et ce qu’on veut regarder.',
        'Où chaque titre est disponible en streaming.',
        'Une vue calendrier de ce qui sort et quand.',
        'Des recommandations basées sur l’historique de visionnage. Fonctionne pour un seul utilisateur ou un groupe qui regarde ensemble.',
        'Regrouper le contenu par genre, catégorie, année, audience, type.',
        'Fonctionne pour des gens qui n’habitent pas au même endroit.',
      ],
    },
    productPrinciples: {
      header: 'Principes produit',
      items: [
        { title: 'Unifier le parcours de divertissement', body: 'Films, séries et documentaires font partie d’une même expérience.' },
        { title: 'Soutenir la décision partagée', body: 'Permettre plus facilement aux groupes de trouver un contenu qu’ils ont envie de regarder ensemble.' },
        { title: 'Capturer et partager les recommandations', body: 'Permettre aux utilisateurs d’enregistrer et d’envoyer des recommandations instantanément, à tout moment.' },
      ],
    },
    coreFeatures: {
      header: 'Fonctionnalités clés',
      items: [
        { icon: 'discovery', title: 'Découverte', body: 'Parcourir par type, genre, date, notes et récompenses.' },
        { icon: 'library', title: 'Bibliothèque', body: 'Gérer simplement les listes de lectures.' },
        { icon: 'search', title: 'Recherche', body: 'Trouver rapidement un contenu ou  une personne.' },
        { icon: 'groups', title: 'Groupes', body: 'Identifier des contenus compatibles à plusieurs.' },
        { icon: 'social', title: 'Social', body: 'Construire un communauté via la notation et les commentaires.' },
        { icon: 'recommendations', title: 'Recommander', body: 'Enregistrement et partage instantanés.' },
      ],
      carousel: {
        carouselLabel: 'Fonctionnalités clés',
        navPrev: 'Voir la fonctionnalité précédente',
        navNext: 'Voir la fonctionnalité suivante',
        cardOf: (n, total) => `Fonctionnalité ${n} sur ${total}`,
      },
    },
    principles: {
      header: 'Principes de design',
      intro: 'Huit principes qui ont façonné chaque écran.',
      carouselLabel: 'Principes de design',
      navPrev: 'Voir le principe précédent',
      navNext: 'Voir le principe suivant',
      cardOf: (n, total) => `Principe ${n} sur ${total}`,
      items: [
        {
          title: 'Divulgation progressive',
          body: 'N’afficher que ce qui est nécessaire au moment présent. Révéler les options progressivement, pour que les débutants ne soient pas submergés et que les experts trouvent toujours la profondeur.',
        },
        {
          title: 'Retour immédiat',
          body: 'Chaque interaction produit une réponse visible, tactile ou sonore. Rien ne se passe en silence.',
        },
        {
          title: 'Affordances',
          body: 'Les éléments suggèrent comment les utiliser par leur forme, leur position et de petits indices visuels, jamais par un skeuomorphisme lourd.',
        },
        {
          title: 'Cohérence',
          body: 'Des actions similaires se comportent de la même manière partout. La charge cognitive diminue, la prévisibilité augmente.',
        },
        {
          title: 'Hiérarchie',
          body: 'La hiérarchie visuelle guide naturellement l’attention. Les actions importantes gagnent leur emphase par l’espacement, le contraste, le placement et la couleur d’accent.',
        },
        {
          title: 'Réduction',
          body: 'Moins, c’est plus. Supprimer les décisions et les éléments d’interface inutiles ; ne garder que ce que le moment exige.',
        },
        {
          title: 'Pardon',
          body: 'Les erreurs sont faciles à corriger. L’annulation est à un tap, les actions destructives demandent confirmation, et rien d’irréversible n’arrive par accident.',
        },
        {
          title: 'Le contenu d’abord',
          body: 'L’interface existe pour aider l’utilisateur à atteindre le contenu, pas pour rivaliser avec lui. L’UI s’efface, le contenu mène.',
        },
      ],
    },
    design: {
      header: 'Conception',
      iaHeader: 'Architecture de l’info',
      iaCarousel: {
        carouselLabel: 'Architecture de l’information',
        navPrev: 'Voir l’onglet précédent',
        navNext: 'Voir l’onglet suivant',
        cardOf: (n, total) => `Onglet ${n} sur ${total}`,
      },
      journey: {
        header: 'Parcours utilisateur',
        intro: 'Le cœur de l’expérience repose sur la gestion du contenu, permettant aux utilisateurs de rapidement suivre, prioriser ou écarter des titres.',
        imgAlt: 'Le chemin pour marquer un titre — le trouver, agir sur place ou l’ouvrir, puis choisir sa place — pour aboutir à l’un des cinq états : En cours, À regarder, Vu, Arrêté ou Ignoré.',
      },
      interaction: {
        header: 'Modèle d’interaction',
        intro: 'Les posters sont l’élément interactif central de l’application. Ils conservent le ratio 2:3, qui s’intègre naturellement sur mobile.',
        posterAlt: 'Une affiche portant son badge de statut, sa pastille d’action et ses métadonnées',
        badgeStatus: 'En cours',
        metaYear: '2013',
        metaRating: '8,0',
        annotations: [
          { n: '1', title: 'Badge de statut', body: 'Une pastille semi-transparente indique qu’un statut est défini, donnant un retour immédiat et signalant que le titre appartient déjà à une liste.' },
          { n: '2', title: 'Menu d’action', body: 'Un appui long ouvre un menu contextuel, tandis qu’une pastille à trois points en bas à droite le rend découvrable.' },
          { n: '3', title: 'Métadonnées dynamiques', body: 'Année de sortie, note IMDb, note utilisateur. Seules les informations pertinentes sont affichées, toujours à un emplacement familier.' },
        ],
        sizingLabel: 'Sur mesure',
        sizes: [
          { label: 'Découverte', w: 132 },
          { label: 'Carrousel', w: 92 },
          { label: 'Liste', w: 62 },
        ],
        viewingLabel: 'Affichage',
        viewingBody: 'Les vues en liste, cartes et grille s’adaptent aux préférences des utilisateurs, avec des gestes tactiles pour accélérer les actions.',
        undoLabel: 'Erreur humaine',
        undoBody: 'Les actions sur les listes sont réversibles, afin de renforcer la confiance et encourager l’exploration.',
        menuLabel: 'Un menu contextuel',
        menuBody: 'Le menu s’adapte au contexte et n’affiche que les actions pertinentes.',
        menuQuick: [
          { label: 'À regarder', icon: 'bookmark' },
          { label: 'En cours', icon: 'eye' },
          { label: 'Vu', icon: 'check', green: true },
        ],
        menuRows: [
          { label: 'Recommander', icon: 'send' },
          { label: 'Ajouter aux favoris', icon: 'heart' },
          { label: 'Enregistrer dans une collection', icon: 'tray' },
          { label: 'Retirer des listes', icon: 'x', destructive: true },
        ],
        outro: 'L’affiche est à la fois source d’information et point d’action, simplifiant l’interface.',
      },
      signIn: {
        header: 'Premiers pas',
        intro: 'Un soin particulier a été apporté à l’ensemble de l’expérience, y compris lors de la première utilisation, de la création de compte à la configuration du profil.',
        figmaCta: 'Ouvrir le prototype dans Figma',
        carousel: {
          carouselLabel: 'Parcours d’inscription',
          navPrev: 'Étape précédente',
          navNext: 'Étape suivante',
          cardOf: (n, total) => `Étape ${n} sur ${total}`,
        },
        beats: [
          {
            n: '01',
            title: 'Écran d’entrée',
            body: 'Authentification à deux voies, sans mot de passe.',
            img: 'signIn',
            alt: 'Écran de connexion : une grille d’affiches de films derrière un bouton jaune « Se connecter par e-mail » et un bouton « Se connecter avec Apple ».',
          },
          {
            n: '02',
            title: 'Code de vérification',
            body: 'Le code à 6 chiffres est scindé en deux groupes de 3 pour faciliter la lecture et la saisie.',
            img: 'code',
            alt: 'Écran de vérification : « Vérifiez votre boîte mail » au-dessus de six cases de code, les deux premières remplies, avec un pavé numérique en dessous.',
          },
          {
            n: '03',
            title: 'Configuration du profil',
            body: 'Une étape simple de création de compte avec validation en temps réel et vérification de disponibilité.',
            img: 'profile',
            alt: 'Configuration du profil : un avatar, un champ nom et un champ nom d’utilisateur affichant en direct les contrôles « 3–14 caractères » et « Disponible ».',
          },
          {
            n: '04',
            title: 'Personnalisation de l’avatar',
            body: 'Un outil simple permet d’ajuster couleurs, initiales ou emojis.',
            img: 'editAvatar',
            alt: 'Feuille d’édition de l’avatar : un avatar à monogramme au-dessus d’une rangée de pastilles de couleur de fond et d’une option « Ajouter un emoji ».',
          },
          {
            n: '05',
            title: 'Sélection des goûts',
            body: 'Faire glisser pour aimer ou rejeter des posters, soutenue par l’haptique et l’annulation.',
            img: 'interests',
            alt: 'Sélecteur de goûts : une grande affiche de film que l’on fait glisser pour aimer ou passer, légendée « Glissez à gauche pour passer, à droite pour aimer ».',
          },
          {
            n: '06',
            title: 'Configuration terminée',
            body: 'Écran de fin qui précharge l’expérience d’accueil en arrière-plan.',
            img: 'allSet',
            alt: 'Écran de confirmation : une coche jaune au-dessus de « Tout est prêt ! » et d’un message de bienvenue.',
          },
        ],
      },
      intro: 'Quatre décisions ont fait l’essentiel du travail. Chacune vient d’un principe des Apple Human Interface Guidelines, et chacune tourne aujourd’hui sur un vrai écran. Les écrans présentés ici sont exportés directement du fichier Figma.',
      figmaLabel: 'Voir dans Figma',
      features: [
        {
          number: '01',
          principle: 'Hiérarchie',
          title: 'Sessions de groupe',
          body: 'Une watchlist qu’on ouvre à deux. Les priorités penchent vers celui qui a ajouté un titre, les vetos restent visibles, et le prochain choix revient à la personne dont les envies ont attendu le plus longtemps.',
          node: '836:25807',
        },
        {
          number: '02',
          principle: 'Divulgation progressive',
          title: 'Le rideau anti spoiler',
          body: 'Titres d’épisodes, descriptions, et même le nombre d’épisodes restent cachés derrière un rideau jusqu’à ce que tu choisisses de regarder. Par défaut, l’app suppose que tu préfères ne pas savoir.',
          node: '783:22615',
        },
        {
          number: '03',
          principle: 'Réduction',
          title: 'Un accueil sans feed',
          body: 'Pas de scroll infini qui attend sur l’accueil. Tu obtiens un nombre limité de cartes : ce qui vient ensuite, ce que le groupe a choisi, ce qui vient de sortir. Puis ça s’arrête, volontairement.',
          node: '211:650',
        },
        {
          number: '04',
          principle: 'Le contenu d’abord',
          title: 'Une seule watchlist',
          body: 'Une liste unique qui couvre Netflix, Prime, Apple TV plus et le reste. Où regarder devient un détail discret sur chaque titre, pas ce autour de quoi toute la bibliothèque s’organise.',
          node: '850:26734',
        },
      ],
      inspect: {
        title: 'Explorez le fichier vous-même',
        body: 'Toute la conception est ouverte à l’inspection. Parcourez les écrans ci-dessous, ou ouvrez le fichier dans Figma pour voir comment chacun est construit.',
        cta: 'Ouvrir dans Figma',
      },
    },
    designSystem: {
      header: 'Design system',
      intro: <><p>Le produit a été conçu exclusivement pour le mode sombre afin de mettre en valeur les posters.</p><p>Couleurs, typographies, rayons et espacement sont unifiés dans un système de tokens, définis dans Figma comme variables sémantiques, et structurés en fichiers JSON dans le code.</p></>,
      reducedNote: 'Les échelles sont volontairement réduites pour la présentation.',
      openFigma: 'Voir le fichier Figma',
      dsLabels: { palette: 'Palette', type: 'Type', surfaces: 'Surfaces', icons: 'Icônes', radii: 'Rayons', iconSizes: 'Tailles d’icônes', spacing: 'Espacement' },
      categories: [
        { id: 'ds-colour', label: 'Couleur' },
        { id: 'ds-type', label: 'Typo' },
        { id: 'ds-spacing', label: 'Espacement' },
        { id: 'ds-radius', label: 'Rayon' },
        { id: 'ds-icons', label: 'Icônes' },
        { id: 'ds-components', label: 'Composants' },
      ],
      foundations: {
        colour: {
          title: 'Couleur',
          body: 'Le produit a été conçu pour le mode sombre afin de garder l’attention sur le contenu.',
          labels: { semantic: 'Statut et accent', surfaces: 'Surfaces', avatars: 'Palette avatars' },
        },
        type: {
          title: 'Typographie',
          body: 'Une seule police alignée sur les Apple Human Interface Guidelines, prenant en charge une mise à l’échelle accessible tout en maintenant la hiérarchie visuelle.',
        },
        radius: {
          title: 'Rayon',
          body: 'Un jeu fixe de rayons. Chaque surface choisit un rôle, card à 16, tile à 20, hero à 24, et les valeurs brutes sont interdites, pour que l’arrondi reste régulier d’un écran à l’autre.',
        },
        spacing: {
          title: 'Espacement',
          body: 'Des tokens d’espacement standardisés garantissent la cohérence visuelle.',
        },
      },
      pipeline: {
        label: 'Une seule source de vérité',
        body: 'Les tokens vivent en JSON. Une étape de synchronisation reconstruit les fichiers de tokens SwiftUI à partir de cette source unique, et le build échoue s’ils dérivent. On change une valeur une fois et toute l’app bouge avec. Récupérer ces valeurs depuis Figma reste un export manuel pour l’instant — l’API Variables en direct est réservée au plan Enterprise — mais tout ce qui suit le JSON est automatisé et vérifié contre toute dérive.',
      },
      foundationsShot: 'La page foundations du fichier Figma : couleur, typo, espacement, rayon et tailles d’icônes au même endroit.',
      iconsShot: 'Le jeu d’icônes, dessiné à chaque taille où il est utilisé.',
      inspect: {
        title: 'Voir tout le système',
        body: 'La librairie est ouverte à l’inspection. Parcourez les composants et les icônes ici, ou ouvrez le fichier dans Figma pour creuser.',
        cta: 'Ouvrir dans Figma',
      },
    },
    process: {
      header: 'Conçu avec l’IA',
      intro: 'Projet conçu, développé et lancé de manière indépendante. J’ai piloté la stratégie produit, l’UX, le design visuel et le développement, en m’appuyant sur l’IA pour accélérer l’exploration, le prototypage et le développement.\nCela a permis des itérations plus rapide et des décisions mieux informées.',
      assetLabel: 'Capture',
      uxFlows: {
        figmaLabel: 'Figma',
        buildLabel: 'Build',
        carousel: {
          carouselLabel: 'UX et flux principaux',
          navPrev: 'Flux précédent',
          navNext: 'Flux suivant',
          cardOf: (n, total) => `Flux ${n} sur ${total}`,
        },
        slides: [
          { id: 'home',    label: 'Home' },
          { id: 'library', label: 'Library' },
          { id: 'for-you', label: 'For You' },
          { id: 'groups',  label: 'Groups' },
          { id: 'search',  label: 'Search' },
        ],
      },
      iosBuild: {
        carousel: {
          carouselLabel: 'Build & tests iOS',
          navPrev: 'Précédent',
          navNext: 'Suivant',
          cardOf: (n, total) => `${n} sur ${total}`,
        },
        slides: [
          { id: 'slide-intro', label: 'Session de test', text: 'Analyse du comportement de notation des utilisateurs.' },
          { id: 'slide-1', label: 'Problème', text: 'Seuls ~20 % des utilisateurs attribuaient une note (0 à 5) aux contenus, malgré un fort engagement.' },
          { id: 'slide-experiment', label: 'Expérience', text: 'Pour comprendre les comportements, les utilisateurs ont été invités lors de sessions d’entretien à noter des contenus qu’ils avaient déjà regardés.' },
          { id: 'slide-2', text: '', diagram: 'behaviourPaths' },
          { id: 'slide-3', label: 'Enseignements clés', bullets: ['La grande majorité des utilisateurs passent par la Bibliothèque', 'Seulement 36 % passent en vue carte pour traiter à la chaine', 'Seuls 20% trient la liste par « Non notés »', 'Les utilisateurs ayant optimisé leur flux sont 80 % plus rapides'] },
          { id: 'slide-aha', aha: { label: 'Découverte inattendue', text: 'Lors d’un test, un swipe pour supprimer un titre « Vus » a entraîné une notation involontaire.' } },
          { id: 'slide-4', label: 'Changements produit', bullets: ['L’onglet "vus" est affiché par défault en mode carte', 'Une bulle d’aide explique l’utilité du bouton de tri lors de la première visite.', 'Séparation dans l’interaction entre swipe et notation pour éviter les erreurs.', 'Marquer un titre comme « vu » ouvre une feuille de notation. un bouton « Ne plus afficher » évite la redondance.'] },
          { id: 'slide-5', label: 'Impact', bullets: ['Adoption de la notation portée à ~48 % des nouveaux utilisateurs', '80 % des utilisateurs ayant découvert le tri utilisent la fonctionnalité pour noter', 'La vue carte est devenue dominante dans la liste « Vus »'] },
        ],
      },
      sections: [
        {
          id: 'process-technical',
          title: 'Direction technique',
          caption: 'L’exploration initiale s’est concentrée sur le backend, l’authentification et la scalabilité. L’IA a guidé le choix d’une stack pragmatique avec Prisma et Vercel.',
          image: null,
          diagram: 'techStack',
        },
        {
          id: 'process-flows',
          title: 'UX et flux principaux',
          caption: 'L’IA a accéléré la conception des principaux flux : accueil, priorisation, recommandations, groupes et recherche.',
          image: null,
          carousel: 'uxFlows',
        },
        {
          id: 'process-build',
          title: 'Build & tests iOS',
          caption: 'L’IA a accéléré l’implémentation SwiftUI dans Xcode et les itérations sur simulateur iOS. Couplée à TestFlight, elle a permis de valider rapidement le comportement réel et d’alimenter la boucle produit.',
          image: null,
          carousel: 'iosBuild',
        },
      ],
    },
    impact: {
      header: 'Impact',
      outcome: {
        eyebrow: 'Résultat',
        body: [
          'Ce projet démontre la création de bout en bout d’un produit en tant que designer en solo, de la définition du problème jusqu’à une alpha iOS fonctionnelle.',
          'L’IA a joué le rôle de couche de support continue tout au long du processus, aidant à accélérer les décisions techniques, à élargir l’exploration UX et à combler l’écart entre design et implémentation dans Xcode.',
          'Plutôt que de remplacer le travail de design, elle a augmenté la vitesse d’itération et permis de naviguer fluidement entre réflexion, construction et test.',
        ],
      },
      nextSteps: {
        eyebrow: 'Prochaines étapes',
        body: [
          'Le produit est encore en développement actif.',
          'La sortie de l’alpha sur TestFlight ouvre une série de tests à venir, visant à améliorer le produit et à valider l’ambition de cette étude de cas : construire une meilleure façon de regarder du contenu ensemble.',
        ],
      },
    },
    tools: { label: 'Catalyseurs' },
    outro: 'Retour aux études de cas',
  },
};

// SECTIONS — drives the (future) secondary nav scroll-spy. Mirror of the
// SalesPlatform shape; unused while the secondary nav is omitted from
// this scaffold but the IDs are wired into each <section> below so the
// nav can be lifted across as-is when ready.
const SECTIONS = {
  en: [
    { id: 'context',    title: 'Context',             subsections: [
      { id: 'ctx-origin', title: 'Origin' },
      { id: 'ctx-pains',  title: 'Pain points' },
    ] },
    { id: 'research',   title: 'Research',            subsections: [
      { id: 'existing',     title: 'Competition' },
      { id: 'app-reviews',  title: 'Reviews' },
      { id: 'insights',     title: 'Insights' },
      { id: 'ctx-problem',  title: 'Problem' },
    ] },
    { id: 'ideate',     title: 'Ideate',              subsections: [
      { id: 'product-principles', title: 'Principles' },
      { id: 'core-features',      title: 'Features' },
    ] },
    { id: 'design',        title: 'Design',         subsections: [
      { id: 'information-architecture', title: 'Architecture' },
      { id: 'design-system',            title: 'System' },
      { id: 'user-journey',             title: 'User journey' },
      { id: 'interaction-model',        title: 'Interaction' },
      { id: 'onboarding-flow',          title: 'Onboarding' },
    ] },
    { id: 'process',       title: 'Process',        subsections: [
      { id: 'process-technical', title: 'Technical' },
      { id: 'process-flows',     title: 'Core flows' },
      { id: 'process-build',     title: 'Build & test' },
    ] },
    { id: 'impact',        title: 'Impact',         subsections: [
      { id: 'imp-outcome',    title: 'Outcome' },
      { id: 'imp-next-steps', title: 'Next steps' },
    ] },
  ],
  fr: [
    { id: 'context',    title: 'Contexte',             subsections: [
      { id: 'ctx-origin', title: 'Origine' },
      { id: 'ctx-pains',  title: 'Friction' },
    ] },
    { id: 'research',   title: 'Recherche',            subsections: [
      { id: 'existing',     title: 'Concurrence' },
      { id: 'app-reviews',  title: 'Avis' },
      { id: 'insights',     title: 'Observations' },
      { id: 'ctx-problem',  title: 'Problème' },
    ] },
    { id: 'ideate',     title: 'Idéation',             subsections: [
      { id: 'product-principles', title: 'Principes' },
      { id: 'core-features',      title: 'Fonctions' },
    ] },
    { id: 'design',        title: 'Conception',        subsections: [
      { id: 'information-architecture', title: 'Architecture' },
      { id: 'design-system',            title: 'Système' },
      { id: 'user-journey',             title: 'Parcours utilisateur' },
      { id: 'interaction-model',        title: 'Interaction' },
      { id: 'onboarding-flow',          title: 'Inscription' },
    ] },
    { id: 'process',       title: 'Processus',         subsections: [
      { id: 'process-technical', title: 'Technique' },
      { id: 'process-flows',     title: 'Flux' },
      { id: 'process-build',     title: 'Build & test' },
    ] },
    { id: 'impact',        title: 'Impact',            subsections: [
      { id: 'imp-outcome',    title: 'Résultat' },
      { id: 'imp-next-steps', title: 'Prochaines étapes' },
    ] },
  ],
};

// Visual treatment for the "Existing solutions" app icons. Keyed by
// app name so the data in `T.[lang].existing.apps` stays purely
// textual. Each entry points to the brand's real app-icon webp under
// /src/assets/logos/competition/.
const EXISTING_APP_VISUAL = {
  Letterboxd: { icon: imgCompLetterboxd },
  Trakt:      { icon: imgCompTrakt },
  JustWatch:  { icon: imgCompJustWatch },
  'TV Time':  { icon: imgCompTVtime },
};

// CANAP_TOOLS — bilingual category labels + tool list. Mirrors the
// shape SalesPlatform.jsx and XRExperiences.jsx use (label = { en, fr };
// tools = [{ name, icon, ...display modifiers }]).
const CANAP_TOOLS = [
  {
    label: { en: 'Design', fr: 'Design' },
    tools: [
      { name: 'Figma',         icon: imgToolFigma },
      { name: 'Photoshop',     icon: imgToolPhotoshop },
      { name: 'Icon Composer', icon: imgToolIconComposer },
      { name: 'SF Symbols',    icon: imgToolSFSymbols },
    ],
  },
  {
    label: { en: 'Engineering', fr: 'Développement' },
    tools: [
      { name: 'Xcode',    icon: imgToolXcode },
      { name: 'SwiftUI',  icon: imgToolSwift },
      { name: 'Next.js',  icon: imgToolNextJs, circle: true },
      { name: 'Prisma',   icon: imgToolPrisma,   bgClass: 'bg-white' },
    ],
  },
  {
    label: { en: 'Other', fr: 'Autres' },
    tools: [
      { name: 'Claude Code', icon: imgToolClaude, bgClass: 'bg-[#D97757]', invertIcon: true, contain: 'w-[85%] h-[85%]' },
      { name: 'Vercel',      icon: imgToolVercel, darkInvert: true, circle: true },
      { name: 'Neon',        icon: imgToolNeon,   bgClass: 'bg-z-1000', contain: 'w-[80%] h-[80%]' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Primitives — kept inline so this file is self-contained. Once the case
// study has settled and you decide it's worth de-duplicating with
// SalesPlatform.jsx and XRExperiences.jsx, lift these into shared
// components under /src/components/case-study/.
// ---------------------------------------------------------------------------

// ToolIcon — direct port of SalesPlatform.jsx's `ToolIcon`. Hover/focus
// tooltip with the tool name, square button (or circle when
// `circle=true`), optional dark-mode invert for SVGs that aren't
// dark-mode safe.
function ToolIcon({ name, icon, fallback, darkInvert = false, lightInvert = false, circle = false, contain = false, zoom, bgClass = 'bg-btn-nav-bg-rest', invertIcon = false }) {
  const [active, setActive] = useState(false);
  const tooltipId = `tooltip-${name.replace(/\s+/g, '-').toLowerCase()}`;
  // `bgClass` lets per-tool entries override the default button surface
  // when a logo needs a brand-specific plate (Claude on its orange,
  // Neon on black, marks that need a forced white plate, etc).
  // `invertIcon` forces the icon image to pure white via filter for
  // logos riding on a dark/branded plate.
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
        className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0 overflow-hidden ${bgClass} shadow-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f1f1f] dark:focus-visible:outline-[#fafafa] ${circle ? 'rounded-full' : 'rounded-radius-3'}`}
      >
        {icon ? (
          <img
            src={icon}
            alt=""
            className={`${contain ? `${contain} object-contain` : 'w-full h-full object-cover'}${darkInvert ? ' dark:invert' : ''}${lightInvert ? ' invert dark:invert-0' : ''}${invertIcon ? ' brightness-0 invert' : ''}`}
            style={zoom ? { transform: `scale(${zoom})` } : undefined}
          />
        ) : (
          // Fallback for tools without a logo file yet: renders the
          // 2-letter `fallback` (or first two chars of name) in the
          // same button frame. Drop a logo in /src/assets/logos/tools/
          // and add `icon:` to the entry to switch this off.
          <span className="text-sm font-bold tracking-tight text-fg-secondary">{fallback ?? name.slice(0, 2)}</span>
        )}
      </button>
    </div>
  );
}

// ToolsGrid — categorised rounded card matching SalesPlatform's layout
// (rounded-radius-6, bg-bg-page, neutral border, flex-wrap rows of
// tool buttons grouped under per-category headings).
function ToolsGrid({ lang }) {
  const label = T[lang].tools.label;
  return (
    <div className="relative sm:w-fit">
      {/* Squircle surface + border drawn as a layer behind the content so the
          icon tooltips (positioned above the top row) aren't clipped by the
          card's squircle clip-path. */}
      <div data-squircle aria-hidden="true" className="absolute inset-0 rounded-radius-6 bg-bg-page border border-feedback-neutral-border pointer-events-none" />
      <div className="relative flex flex-col gap-4 px-5 py-4">
        <h2 className="text-label-s font-semibold leading-[1.4] uppercase tracking-wider text-fg-secondary">{label}</h2>
        <div className="flex flex-wrap items-start gap-x-12 gap-y-6">
          {CANAP_TOOLS.map(cat => (
            <div key={cat.label.en} className="flex flex-col gap-3">
              <p className="text-overline-s font-medium leading-[1.4] uppercase tracking-wider text-fg-muted">{cat.label[lang] ?? cat.label.en}</p>
              <div className="flex flex-wrap gap-5">
                {cat.tools.map(tool => (
                  <ToolIcon key={tool.name} {...tool} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const tileBodyText = 'text-copy-m font-normal leading-loose text-fg-secondary [&_strong]:text-fg-primary';

// Dark variant of tileBodyText for tiles sitting on the pure-black
// `bg-z-1000` plate. Uses the always-light `fg-on-dark-*` tokens so
// body + bolded text stay readable regardless of theme.
const darkTileBodyText = 'text-copy-m font-normal leading-loose text-fg-on-dark-secondary [&_strong]:text-fg-on-dark-primary';

function Tile({ children, bgClass = 'bg-bg-surface', fullWidth = false, className = '' }) {
  return (
    <div
      data-squircle
      className={[
        'p-6 sm:p-12 lg:p-[60px] rounded-radius-6 sm:rounded-radius-8 lg:rounded-radius-12',
        fullWidth ? 'lg:col-span-2' : '',
        bgClass,
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

function TileEyebrow({ children, id }) {
  return (
    <h3 id={id} className="text-h3 font-semibold text-fg-primary mb-3 scroll-mt-28">
      {children}
    </h3>
  );
}

function TileTitle({ children }) {
  return (
    <p className="text-display-2 font-semibold text-fg-muted mt-3 mb-6">
      {children}
    </p>
  );
}

function TileBody({ children }) {
  return <div className={`space-y-6 ${tileBodyText}`}>{children}</div>;
}

function TileH4({ children }) {
  return <h4 className="text-h4 font-semibold text-fg-primary mt-8 mb-2">{children}</h4>;
}


// PostItNote — sticky-note primitive used by the Context "Pain points"
// tile. Casual on purpose: pastel paper colour, slight tilt, soft
// drop-shadow so it lifts off the tile, and a handwritten font stack
// (Marker Felt is preinstalled on macOS / iOS; cursive is the system
// fallback everywhere else). The rotation is set per-instance so the
// 2×2 grid reads as scattered rather than aligned.
function PostItNote({ children, rotate = '-2deg', tone = 'amber', offsetX = '0px', offsetY = '0px' }) {
  const palette = {
    amber: 'bg-amber-100 dark:bg-amber-200',
    pink:  'bg-pink-100 dark:bg-pink-200',
    mint:  'bg-emerald-100 dark:bg-emerald-200',
    sky:   'bg-sky-100 dark:bg-sky-200',
    lilac: 'bg-violet-100 dark:bg-violet-200',
    peach: 'bg-orange-100 dark:bg-orange-200',
  }[tone] || 'bg-amber-100 dark:bg-amber-200';
  return (
    <div
      className={`canap-postit relative p-4 sm:p-5 ${palette} text-neutral-900 w-full max-w-[300px] mx-auto`}
      style={{
        // `--tilt`, `--off-x`, `--off-y` are consumed by
        // `.canap-postit` in index.css. The tilt scales down to 20%
        // on viewports below `sm`; offsets zero out on the same
        // breakpoint so the mobile stack stays aligned.
        '--tilt': rotate,
        '--off-x': offsetX,
        '--off-y': offsetY,
        boxShadow: '0 6px 16px -6px rgba(0, 0, 0, 0.22), 0 1.5px 3px rgba(0, 0, 0, 0.08)',
        fontFamily: '"Caveat", "Patrick Hand", "Marker Felt", "Bradley Hand", cursive',
      }}
    >
      <p className="text-lg sm:text-xl leading-snug">{children}</p>
    </div>
  );
}

function Callout({ emoji, label, body, variant = 'success' }) {
  const palette = {
    success: 'bg-feedback-success-bg border-feedback-success-border',
    warning: 'bg-feedback-warning-bg border-feedback-warning-border',
    error:   'bg-feedback-error-bg border-feedback-error-border',
  }[variant] || 'bg-feedback-success-bg border-feedback-success-border';
  return (
    <div data-squircle className={`mt-6 p-5 sm:p-6 rounded-radius-3 border ${palette}`}>
      <p className={tileBodyText}>
        <span aria-hidden="true" className="mr-2">{emoji}</span>
        <strong>{label}.</strong>{' '}
        {body}
      </p>
    </div>
  );
}

// Section — collapsible-style wrapper used by every block below. Simpler
// than SalesPlatform's animated grid-rows transition; intent is the
// same shell shape, ready for the lifted version when the time comes.
// Accordion collapse for the case-study sections — active ONLY when the
// secondary nav is hidden (< 920px), matching SalesPlatform. At ≥920px the
// secondary nav handles navigation, so sections stay expanded with no chevron.
function useSectionCollapse() {
  const [open, setOpen] = useState(true);
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
      setHidden(false);
      requestAnimationFrame(() => setOpen(true));
    }
  };
  const collapsible = !isDesktop;
  return { collapsible, open, sectionOpen: collapsible ? open : true, hidden, handleToggle, btnRef, contentRef, gridRef };
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

// CollapseBody — wraps section content so it can animate closed on mobile.
// On desktop (not collapsible) it renders the content untouched (no
// overflow-hidden) so nothing in Canap's richer content gets clipped.
function CollapseBody({ id, c, className, children }) {
  // `className` set → wrap content in one max-width column (the standard
  // Section). Omitted → render the raw children (sections whose carousels
  // break full-bleed). Either way, untouched on desktop (no overflow-hidden).
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

// SectionHeading — the h2 + (mobile) collapse chevron. Renders as a toggle
// button when collapsible, a plain heading otherwise. Shared by `Section` and
// the raw carousel sections (Research, Ideate). Drop inside the title wrapper.
function SectionHeading({ c, id, title, lang, titleInset = false }) {
  const titlePad = titleInset ? 'pl-6 sm:pl-12 lg:pl-[60px]' : '';
  const heading = (
    <div className="flex items-center justify-between gap-4">
      <h2 id={`${id}-heading`} className={`text-h2 font-semibold text-fg-primary py-6 sm:py-7 lg:py-8 ${titlePad}`}>
        {title}
      </h2>
      {c.collapsible && <SectionChevron open={c.open} />}
    </div>
  );
  if (!c.collapsible) return heading;
  return (
    <button
      ref={c.btnRef}
      onClick={c.handleToggle}
      aria-label={collapseLabel(c.open, title, lang)}
      aria-expanded={c.open}
      aria-controls={`${id}-content`}
      className="w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fg-primary"
    >
      {heading}
    </button>
  );
}

function Section({ id, title, eyebrowOffset, contentClass = '', bgClass = 'bg-bg-page', titleInset = false, lang = 'en', children }) {
  // Below 920px (secondary nav hidden) the h2 becomes a collapse/expand toggle
  // with a chevron; at ≥920px it's a plain, always-expanded heading.
  const c = useSectionCollapse();
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={c.collapsible && !c.sectionOpen ? 'bg-bg-page' : bgClass}>
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 pt-8 sm:pt-10 lg:pt-12 pb-2 sm:pb-3 md:max-w-2xl lg:max-w-[52rem]">
        <SectionHeading c={c} id={id} title={title} lang={lang} titleInset={titleInset} />
      </div>
      <CollapseBody id={id} c={c} className={`max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 pb-16 sm:pb-20 lg:pb-24 md:max-w-2xl lg:max-w-[52rem] ${contentClass}`}>
        {children}
      </CollapseBody>
    </section>
  );
}

// Placeholder — colour-block stand-in for every <picture> the page will
// eventually carry. Uses a deterministic hue per `seed` so different
// slots don't all blur into one wall of grey. Aspect ratios match the
// SalesPlatform image expectations: 16:10 for hero, 4:3 for flows,
// 16:9 for concepts/wireframes/hifi.
function Placeholder({ label = 'Image placeholder', aspect = '16/10', seed = 0, className = '' }) {
  const hue = (seed * 47) % 360;
  return (
    <div
      role="img"
      aria-label={label}
      data-squircle
      className={`w-full rounded-radius-4 flex items-center justify-center text-white/80 text-sm font-medium tracking-wide ${className}`}
      style={{
        aspectRatio: aspect,
        backgroundImage: `linear-gradient(135deg, hsl(${hue} 60% 38%), hsl(${(hue + 30) % 360} 55% 28%))`,
      }}
    >
      {label}
    </div>
  );
}

// Figma source file. The Design + Design-system sections embed and link to
// it so visitors can inspect the real foundations, components and icons.
const FIGMA_FILE_KEY = '7PIxc1jS3Kt9XN4dg8xnig';
const figmaFileUrl = (nodeId) =>
  `https://www.figma.com/design/${FIGMA_FILE_KEY}/Canap?node-id=${nodeId}`;

// Screens behind each of the four Design decisions, in feature order
// (group sessions, spoiler curtain, home, watchlist).
const CANAP_DECISION_SHOTS = [imgCanapGroup, imgCanapContent, imgCanapHome, imgCanapWatchlist];

// PhoneFrame — wraps a tall app screenshot in an iPhone-style bezel. The
// screen sits in a fixed-height viewport that scrolls in place, so a
// full-length screen can be explored without taking over the page. The
// exported frames already carry the iOS status bar, so no fake notch is
// drawn over them.
function PhoneFrame({ src, alt, className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-[248px] ${className}`}>
      <div
        className="rounded-[2.6rem] bg-black p-2 ring-1 ring-white/10"
        style={{ boxShadow: '0 24px 60px -20px rgba(0,0,0,0.55), 0 6px 16px -8px rgba(0,0,0,0.4)' }}
      >
        <div className="overflow-hidden rounded-[2.1rem] bg-black" style={{ aspectRatio: '402 / 812' }}>
          <div className="h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <img src={src} alt={alt} className="block w-full" draggable="false" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
}

// FramedShot — a wide image (a Figma page export) in a rounded, bordered
// surface that matches the app's screen colour.
function FramedShot({ src, alt, className = '' }) {
  return (
    <div
      data-squircle
      className={`overflow-hidden rounded-radius-4 ring-1 ring-black/10 dark:ring-white/10 ${className}`}
      style={{ backgroundColor: '#1c1c1e' }}
    >
      <img src={src} alt={alt} className="block w-full" draggable="false" loading="lazy" />
    </div>
  );
}

// FigmaEmbed — live, pannable view of the Figma file. Needs the file's link
// sharing set to "anyone with the link can view"; until then it falls back
// to the framed cover image + the "Open in Figma" link beside it.
function FigmaEmbed({ nodeId, title, fallbackSrc }) {
  const [failed, setFailed] = useState(false);
  const src = `https://embed.figma.com/design/${FIGMA_FILE_KEY}/Canap?node-id=${nodeId}&embed-host=atelier-digital`;
  if (failed && fallbackSrc) return <FramedShot src={fallbackSrc} alt={title} />;
  return (
    <div
      data-squircle
      className="overflow-hidden rounded-radius-4 ring-1 ring-black/10 dark:ring-white/10"
      style={{ backgroundColor: '#1c1c1e' }}
    >
      <iframe
        title={title}
        src={src}
        onError={() => setFailed(true)}
        allowFullScreen
        loading="lazy"
        className="block w-full border-0 h-[440px] sm:h-[540px]"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Design-system specimens — rendered LIVE from the real Canap iOS token
// values (snapshotted from the Canap repo's tokens/{colour,font,radius,
// spacing}.json, dark theme). These are not screenshots: the web case study
// draws the exact numbers the SwiftUI app ships, so the "one source of truth
// across iOS and web" claim is demonstrated rather than asserted. If the iOS
// tokens change, update the small curated arrays below.
// ---------------------------------------------------------------------------

const DS_COLOURS = {
  semantic: [
    { name: 'accent',    token: 'icon/accent',    hex: '#FEC700' },
    { name: 'danger',    token: 'text/danger',    hex: '#F04040' },
    { name: 'success',   token: 'text/success',   hex: '#30D158' },
    { name: 'warning',   token: 'text/warning',   hex: '#FF9900' },
  ],
  surfaces: [
    { name: 'screen',  token: 'bg/screen',       hex: '#1C1C1E' },
    { name: 'sheet',   token: 'surface/sheet',   hex: '#2C2C2E' },
    { name: 'item',    token: 'surface/item',    hex: '#39393D' },
    { name: 'control', token: 'surface/control', hex: '#5C5C5C' },
  ],
  avatars: [
    { name: 'red',    hex: '#F04040' },
    { name: 'orange', hex: '#FFA25E' },
    { name: 'yellow', hex: '#FEC700' },
    { name: 'cyan',   hex: '#85E0EF' },
    { name: 'purple', hex: '#973286' },
    { name: 'pink',   hex: '#C73468' },
  ],
};

// DsGroupLabel — the small mono uppercase group label used across specimens
// (Geist's quiet section markers).
function DsGroupLabel({ children }) {
  return (
    <p className="text-overline-s font-mono uppercase tracking-widest text-fg-muted mb-3">{children}</p>
  );
}

// ColourSpecimen — Geist-style: a hairline-divided swatch grid for the
// semantic tokens, a continuous tonal ramp for the surfaces (they really do
// step light→dark), and a small avatar row. Real hex throughout.
function ColourSpecimen({ copy }) {
  return (
    <div className="flex flex-col gap-8">
      {/* Status + accent — swatch grid, four across filling the width. */}
      <div>
        <DsGroupLabel>{copy.semantic}</DsGroupLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {DS_COLOURS.semantic.map((c) => (
            <div key={c.name}>
              <div
                className="w-full h-10 rounded-radius-2 ring-1 ring-black/[0.06] dark:ring-white/10 mb-2.5"
                style={{ backgroundColor: c.hex }}
              />
              <p className="text-tag-s font-medium text-fg-primary leading-tight">{c.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Surfaces — continuous tonal ramp, swatches butted together. */}
      <div>
        <DsGroupLabel>{copy.surfaces}</DsGroupLabel>
        <div className="flex rounded-radius-3 overflow-hidden ring-1 ring-black/[0.08] dark:ring-white/10">
          {DS_COLOURS.surfaces.map((c) => (
            <div key={c.name} className="flex-1 h-16" style={{ backgroundColor: c.hex }} />
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          {DS_COLOURS.surfaces.map((c) => (
            <div key={c.name} className="flex-1 min-w-0">
              <p className="text-tag-s font-medium text-fg-primary leading-tight truncate">{c.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Avatar palette */}
      <div>
        <DsGroupLabel>{copy.avatars}</DsGroupLabel>
        <div className="flex flex-wrap gap-4">
          {DS_COLOURS.avatars.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-2">
              <div
                className="w-12 h-12 rounded-full ring-1 ring-black/[0.08] dark:ring-white/10"
                style={{ backgroundColor: c.hex }}
              />
              <p className="text-fine-print font-mono text-fg-muted">{c.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// TypeSpecimen — the Apple-HIG role scale at the real Figma base sizes (pt).
const DS_TYPE = [
  { role: 'Primary title',   size: 28, weight: 600 },
  { role: 'Secondary title', size: 22, weight: 600 },
  { role: 'Tertiary title',  size: 20, weight: 600 },
  { role: 'Body',            size: 17, weight: 400 },
  { role: 'Call out',        size: 15, weight: 400 },
  { role: 'Footnote',        size: 12, weight: 400 },
  { role: 'Caption',         size: 10, weight: 400 },
];

function TypeSpecimen() {
  return (
    <div>
      {/* Spec-table header row */}
      <div className="flex items-baseline justify-between gap-4 pb-2 mb-1 border-b border-black/10 dark:border-white/15">
        <span className="text-fine-print font-mono uppercase tracking-widest text-fg-muted">role</span>
        <span className="text-fine-print font-mono uppercase tracking-widest text-fg-muted">pt</span>
      </div>
      <div className="flex flex-col divide-y divide-black/5 dark:divide-white/10">
        {DS_TYPE.map((r) => (
          <div key={r.role} className="flex items-baseline justify-between gap-4 py-2.5">
            <span
              className="text-fg-primary truncate"
              style={{ fontSize: `${r.size}px`, fontWeight: r.weight, lineHeight: 1.1 }}
            >
              {r.role}
            </span>
            <span className="text-tag-s text-fg-muted font-mono whitespace-nowrap shrink-0">
              {r.size}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// RadiusSpecimen — the corner-radius roles, real pt values.
const DS_RADII = [
  { role: 'card', value: 16 },
  { role: 'tile', value: 20 },
  { role: 'hero', value: 24 },
  { role: 'preview', value: 36 },
];

function RadiusSpecimen() {
  return (
    <div className="flex flex-wrap gap-4 sm:gap-5">
      {DS_RADII.map((r) => (
        <div key={r.role} className="flex flex-col items-center gap-2">
          <div
            className="w-20 h-20"
            style={{
              borderRadius: `${r.value}px`,
              background: 'rgba(254,199,0,0.18)',
              border: '1px solid rgba(254,199,0,0.65)',
            }}
          />
          <p className="text-fine-print font-mono text-fg-muted text-center leading-tight">{r.role}<br />{r.value}</p>
        </div>
      ))}
    </div>
  );
}

// SpacingSpecimen — the unified gap/padding scale, bars at 2× for legibility.
const DS_SPACING = [
  { token: 's4', value: 4 },
  { token: 's8', value: 8 },
  { token: 's12', value: 12 },
  { token: 's16', value: 16 },
  { token: 's24', value: 24 },
  { token: 's32', value: 32 },
  { token: 's64', value: 64 },
];

function SpacingSpecimen() {
  return (
    <div className="flex flex-col gap-2.5">
      {DS_SPACING.map((s) => (
        <div key={s.token} className="flex items-center gap-3">
          <span className="text-fine-print text-fg-muted font-mono w-8 shrink-0">{s.token}</span>
          <span
            className="h-3 rounded-sm shrink-0"
            style={{ width: `${s.value * 2}px`, backgroundColor: '#FEC700' }}
          />
          <span className="text-fine-print font-mono text-fg-muted">{s.value}px</span>
        </div>
      ))}
    </div>
  );
}

// ─── Redesigned design-system showcase (Figma node 3511:16029) ───────────────
// Dark (surface/base #000) foundations on a single black panel, brand-yellow
// (#FEC700) accent on the scale specimens. Values are the real iOS tokens.
const DS_ACCENT = '#FEC700';
const DS_PALETTE = [
  { c: '#973286', label: 'purple' },
  { c: '#85E0EF', label: 'cyan' },
  { c: '#30D158', label: 'success' },
  { c: '#FEC700', label: 'accent' },
  { c: '#FF9900', label: 'warning' },
  { c: '#F04040', label: 'danger' },
  { c: '#C73468', label: 'pink' },
];
// Type role grid — rows × 3 columns (titles · UI · small). Sizes/weights are
// the iOS font tokens (large-title 32 … pill-label 10).
const DS_TYPE_ROWS = [
  [{ t: 'Large', s: 32, w: 600 }, { t: 'Body', s: 17, w: 400 }, null],
  [{ t: 'Primary', s: 26, w: 600 }, { t: 'CTA', s: 19, w: 700 }, { t: 'caption', s: 12, w: 500 }],
  [{ t: 'Secondary', s: 22, w: 700 }, { t: 'Chip', s: 15, w: 500 }, { t: 'tagline', s: 14, w: 400, i: true }],
  [{ t: 'Tertiary', s: 20, w: 600 }, { t: 'Label', s: 12, w: 500 }, { t: 'Badges', s: 10, w: 600 }],
];
const DS_SURFACES_RAMP = [
  { n: 'Base', c: '#000000' },     // surface/base
  { n: 'Section', c: '#1C1C1E' },  // surface/section
  { n: 'Sheet', c: '#2C2C2E' },    // surface/sheet
];
const DS_RADII_SCALE = [{ v: 8, l: '8' }, { v: 12, l: '12' }, { v: 16, l: '16' }, { v: 24, l: '24' }, { v: 9999, l: 'full' }];
const DS_ICON_SIZES = [{ s: 16, l: 'S 16' }, { s: 24, l: 'M 24' }, { s: 32, l: 'L 32' }, { s: 44, l: 'XL 44' }, { s: 64, l: '2XL 64' }];
const DS_SPACING_SCALE = [2, 4, 6, 8, 10, 12, 16, 24, 32, 40, 64];

function DsLabel({ children }) {
  return <p className="text-copy-m font-semibold text-white mb-4">{children}</p>;
}

// SquareDashedIcon — SF Symbol `square.dashed` (the icon-sizes specimen): a
// rounded square drawn with a few long rounded dashes. Scales the stroke with
// the size so the dash rhythm matches the glyph at 16 → 64pt.
function SquareDashedIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className="block">
      <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.5" stroke={DS_ACCENT} strokeWidth="2" strokeLinecap="round" strokeDasharray="3.1 2.9" />
    </svg>
  );
}

// DsPalette — colour swatches whose token name reveals on hover (desktop) and
// on tap (mobile). Hover/keyboard-focus are pure CSS; a tap calls reveal(i),
// which toggles the label: tapping a swatch shows its name (and auto-hides
// after a delay, since a tap has no natural "leave" event); tapping the same
// swatch again hides it immediately.
function DsPalette({ label }) {
  const [revealed, setRevealed] = useState(null);
  const timerRef = useRef(null);
  const reveal = (i) => {
    clearTimeout(timerRef.current);
    if (revealed === i) {
      setRevealed(null);   // tap again on the same swatch → hide
      return;
    }
    setRevealed(i);
    timerRef.current = setTimeout(() => setRevealed(null), 1600);
  };
  useEffect(() => () => clearTimeout(timerRef.current), []);
  return (
    <div>
      <DsLabel>{label}</DsLabel>
      <div className="flex justify-between items-start max-w-md mx-auto lg:max-w-none lg:mx-0">
        {DS_PALETTE.map(({ c, label: name }, i) => (
          <button
            key={i}
            type="button"
            aria-label={name}
            onClick={() => reveal(i)}
            className="group relative block p-0 leading-none focus:outline-none"
          >
            {/* Mobile (phone): pill only — the tinted container + stroke appear
                just for the selected swatch (revealed/tap) so the row reads as
                spaced pills. Tablet/desktop (md+): container appears on hover
                (and focus) only. Border stays present but transparent off-state
                so toggling tint never shifts layout. */}
            <span
              data-squircle
              className={`flex items-center p-2 rounded-radius-5 border transition-colors duration-150 md:group-hover:bg-[var(--tint)] md:group-hover:border-white/[0.08] group-focus-visible:bg-[var(--tint)] group-focus-visible:border-white/[0.08] ${revealed === i ? 'bg-[var(--tint)] border-white/[0.08]' : 'bg-transparent border-transparent'}`}
              style={{ '--tint': `${c}26` }}
            >
              <span className="block w-6 h-11 rounded-radius-4" style={{ backgroundColor: c }} />
            </span>
            <span
              className={`pointer-events-none absolute left-1/2 top-full -translate-x-1/2 mt-1.5 text-fine-print font-semibold text-white/85 whitespace-nowrap transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 ${revealed === i ? 'opacity-100' : 'opacity-0'}`}
            >
              {name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function DesignSystemShowcase({ labels }) {
  return (
    // Desktop (lg): a 3-row × 2-column grid matching the Figma redesign
    // (node 3529:1551). Every block is a fixed 320px wide with a 45px column
    // gap and 64px row gap. Row 1 pairs the Palette+Surfaces group (left,
    // stacked as one unit) with the Type card (right); row 2 is Icons | Icon
    // sizes; row 3 is Spacing | Radii. Cells stretch so the Type card and the
    // Surfaces card share a bottom edge. Below lg it collapses to a single
    // centred column in source order.
    <div className="flex flex-col gap-10 sm:gap-12 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16 lg:items-stretch">
      {/* Row 1 · left — Palette + Surfaces grouped as one cell so the pair
          aligns top-and-bottom with the Type card. Tight 24px gap on desktop;
          normal section rhythm on mobile. */}
      <div className="flex flex-col gap-10 sm:gap-12 lg:gap-6">
        {/* Palette — colour swatches; each token name reveals on hover / tap. */}
        <DsPalette label={labels.palette} />

        {/* Surfaces — tonal ramp (base → section → sheet) */}
        <div>
          <DsLabel>{labels.surfaces}</DsLabel>
          <div data-squircle className="max-w-md mx-auto lg:max-w-none lg:mx-0 rounded-radius-6 overflow-hidden ring-1 ring-white/10">
            {DS_SURFACES_RAMP.map((s, i) => (
              <div key={i} className="h-16 sm:h-[72px] flex items-center px-7 text-copy-m text-white" style={{ backgroundColor: s.c }}>
                {s.n}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 1 · right — Type role grid in a section-surface card with a fade.
          On desktop the cell + card grow to fill the row so the card's bottom
          edge lines up with the Surfaces card; the role rows distribute
          (content-between) to spread evenly like the Figma. */}
      <div className="lg:h-full lg:flex lg:flex-col">
        <DsLabel>{labels.type}</DsLabel>
        <div data-squircle className="relative max-w-md mx-auto lg:max-w-none lg:mx-0 lg:flex-1 lg:flex lg:flex-col rounded-radius-6 bg-[#1c1c1e] overflow-hidden px-5 py-5 sm:px-6 sm:py-6">
          <p className="text-tag-s text-white/40 mb-5">Title</p>
          <div className="grid grid-cols-[auto_auto_auto] justify-between gap-y-5 items-center lg:flex-1 lg:content-between">
            {DS_TYPE_ROWS.flat().map((cell, i) => (
              <div key={i} className="min-w-0">
                {cell && (
                  <span
                    className={`leading-none whitespace-nowrap ${i % 3 === 0 ? 'text-white' : i % 3 === 1 ? 'text-white/90' : 'text-white/45'}`}
                    style={{ fontSize: `${cell.s}px`, fontWeight: cell.w, fontStyle: cell.i ? 'italic' : 'normal' }}
                  >
                    {cell.t}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#1c1c1e]" />
        </div>
      </div>

      {/* Row 2 · left — Icons: the real 16pt + 24pt grids (Figma exports),
          shown at their true relative sizes (24pt visibly larger). */}
      <div>
        <DsLabel>{labels.icons}</DsLabel>
        <div className="flex items-start justify-center lg:justify-between gap-6 sm:gap-10 lg:gap-0">
          <img src={imgIcons16} alt="Icons drawn at 16 point" className="block w-[136px] h-auto shrink-0" />
          <img src={imgIcons24} alt="Icons drawn at 24 point" className="block w-[152px] h-auto shrink-0" />
        </div>
      </div>

      {/* Row 2 · right — Icon sizes: `square.dashed` glyph at S16 → 2XL64 */}
      <div>
        <DsLabel>{labels.iconSizes}</DsLabel>
        <div className="flex justify-center lg:justify-between items-end gap-5 sm:gap-7">
          {DS_ICON_SIZES.map((it, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <SquareDashedIcon size={it.s} />
              <span className="text-fine-print text-white/50 whitespace-nowrap">{it.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3 · left — Spacing: bottom-aligned bar scale */}
      <div>
        <DsLabel>{labels.spacing}</DsLabel>
        <div className="flex justify-center lg:justify-between items-end gap-3.5 sm:gap-4 lg:h-[88px]">
          {DS_SPACING_SCALE.map((v, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="block w-2 rounded-full" style={{ height: `${v}px`, backgroundColor: DS_ACCENT }} />
              <span className="text-fine-print text-white/50 tabular-nums">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3 · right — Radii: yellow-outlined squares. Drawn radius is halved
          (the Figma intent) so 16/24 stay visible as rounded squares on the
          small 32px swatch instead of collapsing to circles; labels are real. */}
      <div>
        <DsLabel>{labels.radii}</DsLabel>
        <div className="flex justify-center items-start lg:items-end gap-6 sm:gap-7 lg:gap-8 lg:h-[88px]">
          {DS_RADII_SCALE.map((r, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="block w-8 h-8 border-2" style={{ borderColor: DS_ACCENT, borderRadius: r.v === 9999 ? '9999px' : `${r.v / 2}px` }} />
              <span className="text-fine-print text-white/50">{r.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// SpecPanel — Geist-style foundation block: a header row (title + mono meta),
// a short description, and a hairline-bordered "preview canvas" holding the
// live specimen. `canvas={false}` for blocks whose child is already framed
// (the Figma image exports).
function SpecPanel({ id, title, meta, body, canvas = true, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <h4 className="text-h4 font-semibold text-fg-primary">{title}</h4>
        {meta && <span className="text-tag-s font-mono text-fg-muted shrink-0">{meta}</span>}
      </div>
      {body && <p className="text-copy-m text-fg-secondary mb-5 max-w-2xl">{body}</p>}
      {canvas ? (
        <div
          data-squircle
          className="rounded-radius-4 border border-black/[0.08] dark:border-white/[0.10] bg-bg-page p-5 sm:p-7"
        >
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}

// DsCategoryStrip — the design-system contents as a row of anchor chips at the
// top of the section (Geist's sidebar, shrunk to one section). Static, not
// sticky; smooth-scrolls via the shared helper (honours reduced motion).
function DsCategoryStrip({ items }) {
  return (
    <nav aria-label="Design system contents" className="flex flex-wrap gap-2 sm:justify-center mb-12 sm:mb-14">
      {items.map((c) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          onClick={(e) => { e.preventDefault(); scrollToSection(c.id); }}
          className="text-tag-m font-medium text-fg-secondary hover:text-fg-primary px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/[0.14] hover:border-black/25 dark:hover:border-white/30 transition-colors"
        >
          {c.label}
        </a>
      ))}
    </nav>
  );
}

// dsCatLabel — a category's localized label by id, for the Icons / Components
// panel titles (which have no `foundations.*` copy entry of their own).
const dsCatLabel = (cats, id) => (cats.find((c) => c.id === id) || {}).label || '';

// scrollToSection — used by the secondary nav. Honours
// `prefers-reduced-motion` (jumps instantly instead of smooth-scroll
// when the user prefers reduced motion). Same helper SalesPlatform
// uses.
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  el.focus({ preventScroll: true });
};

// SecondaryNav — desktop-only vertical list of section links pinned
// to the right of the content column. Direct port of SalesPlatform's
// `SecondaryNav`. The `invisible` span trick reserves space for the
// bold-weight version so the active state doesn't reflow the column.
function SecondaryNav({ sections, activeId, activeSubId, onNavigate, visible, lang }) {
  // Collapsible secondary nav. Hovering the right edge highlights it and shows
  // a delayed "Minimise" tooltip; clicking (or dragging left) collapses the nav
  // into a centre-left pill that restores it. The pill follows the same
  // scroll-gated visibility as the floating panel.
  const [collapsed, setCollapsed] = useState(false);
  const [tipVisible, setTipVisible] = useState(false);
  const timerRef = useRef(null);
  const showTip = () => { clearTimeout(timerRef.current); timerRef.current = setTimeout(() => setTipVisible(true), 500); };
  const hideTip = () => { clearTimeout(timerRef.current); setTipVisible(false); };
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const dragStartX = useRef(null);
  const onEdgePointerDown = (e) => { dragStartX.current = e.clientX; e.currentTarget.setPointerCapture?.(e.pointerId); };
  const onEdgePointerMove = (e) => {
    if (dragStartX.current == null) return;
    if (e.clientX - dragStartX.current <= -24) { dragStartX.current = null; setCollapsed(true); hideTip(); }
  };
  const onEdgePointerUp = () => { dragStartX.current = null; };

  const minimiseLabel = lang === 'fr' ? 'Réduire' : 'Minimise';
  const expandLabel   = lang === 'fr' ? 'Afficher la navigation' : 'Expand navigation';

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
            <path d="M4 7h16M4 12h12M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
    // Secondary nav backdrop blur
    <nav aria-label="Page sections" className={`relative p-2 backdrop-blur-3 bg-nav-bg rounded-radius-6 shadow-xs ring-1 ring-nav-ring transition-opacity duration-180 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <ol className="grid gap-1" style={{ gridTemplateColumns: 'max-content' }}>
        {sections.map((s) => {
          const isActive = activeId === s.id;
          return (
            <li key={s.id}>
              {/* When a section is active AND has sub-items, the light-grey
                  background expands to wrap the main item and its sub-items as
                  one group, so the sub-items read as nested rather than as more
                  top-level links. (Sub-items render for every section here, but
                  only the active section's group gets the background.) */}
              <div className={isActive && s.subsections?.length > 0 ? 'bg-nav-active-bg rounded-radius-4' : ''}>
              <button
                onClick={() => onNavigate(s.id)}
                aria-current={isActive ? 'location' : undefined}
                className={`relative text-tooltip leading-snug py-2 px-3 rounded-full text-left w-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                  isActive
                    ? `text-fg-primary font-semibold${s.subsections?.length > 0 ? '' : ' bg-nav-active-bg'}`
                    : 'text-fg-muted font-normal hover:text-fg-primary hover:bg-nav-active-bg'
                }`}
              >
                <span aria-hidden="true" className="font-semibold invisible block select-none whitespace-nowrap">{s.title}</span>
                <span className="absolute inset-0 py-2 px-3 whitespace-nowrap">{s.title}</span>
              </button>

              {s.subsections?.length > 0 && (
                /* Subsections show only when the parent section is active;
                   collapsed (height 0) otherwise but still rendered so the nav
                   keeps a constant width. */
                <div
                  className={`hidden min-[920px]:block ${isActive ? '' : 'max-h-0 overflow-hidden'}`}
                  inert={isActive ? undefined : true}
                >
                <ol className="mt-0.5 grid gap-0">
                  {s.subsections.map((sub) => {
                    const isSubActive = activeSubId === sub.id;
                    return (
                      <li key={sub.id}>
                        <button
                          onClick={() => onNavigate(sub.id)}
                          aria-current={isSubActive ? 'location' : undefined}
                          className={`relative text-chip-xs leading-snug py-1.5 pl-4 pr-2 rounded-full text-left w-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                            isSubActive
                              ? 'text-fg-primary font-semibold'
                              : 'text-fg-muted font-normal hover:text-fg-primary hover:bg-nav-active-bg'
                          }`}
                        >
                          <span aria-hidden="true" className="font-semibold invisible block select-none whitespace-nowrap">{sub.title}</span>
                          <span className="absolute inset-0 py-1.5 pl-4 pr-2 whitespace-nowrap">{sub.title}</span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
                </div>
              )}
              </div>
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
    </nav>
  );
}

// MobileSecondaryNav — horizontal scrollable pill bar pinned to the
// bottom of the viewport on mobile. Auto-scrolls the active section's
// pill into view as the page scrolls. Port of SalesPlatform's mobile
// nav.
function MobileSecondaryNav({ sections, activeId, onNavigate, visible }) {
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current || !activeId) return;
    const btn = trackRef.current.querySelector(`[data-section="${activeId}"]`);
    btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeId]);

  return (
    <nav aria-label="Page sections" className={`w-full backdrop-blur-1 bg-nav-bg rounded-radius-6 shadow-xs ring-1 ring-nav-ring p-[10px] transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="overflow-hidden rounded-radius-4">
        <ul ref={trackRef} className="w-full flex items-center gap-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {sections.map((s) => {
            const isActive = activeId === s.id;
            return (
              <li key={s.id} className="shrink-0">
                <button
                  data-section={s.id}
                  onClick={() => onNavigate(s.id)}
                  aria-label={s.title}
                  aria-current={isActive ? 'location' : undefined}
                  className={`h-8 px-3 rounded-radius-4 text-tooltip font-medium leading-snug whitespace-nowrap transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                    isActive
                      ? 'bg-nav-active-bg-solid text-fg-inverse'
                      : 'text-fg-muted'
                  }`}
                >
                  {s.title}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

// Count-up animation utilities. Copied verbatim from SalesPlatform.jsx
// (and XRExperiences.jsx has a near-identical pair) so all three case
// studies share the same hero-stat behaviour: stat values tick from
// zero to their final value over ~1.8s once `heroReady` flips true.
// Each case study keeps its own copy rather than importing a shared
// util — established convention in this codebase. Honours
// `prefers-reduced-motion`.
function useCountUp(target, duration = 1800, decimals = 0, ready = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!ready) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target, duration, decimals, ready]);
  return count;
}

function AnimatedStat({ prefix, countTo, decimals, suffix, ready }) {
  const value = useCountUp(countTo, 1800, decimals, ready);
  return (
    <span>{prefix}{decimals > 0 ? value.toFixed(decimals) : value}{suffix}</span>
  );
}

// PrincipleCard — a single card in the Principles carousel. Fixed
// widths so snap-scrolling has stable card boundaries. The number is
// the visual anchor (no leading zero, very large typography); title +
// body sit below.
function PrincipleCard({ number, title, body }) {
  return (
    <li
      data-squircle
      className="shrink-0 w-[calc(100vw-3rem)] sm:w-[420px] lg:w-[480px] snap-center rounded-radius-6 sm:rounded-radius-8 lg:rounded-radius-12 bg-bg-surface p-6 sm:p-10 lg:p-12 flex flex-col gap-6 sm:gap-8"
    >
      <span className="text-[6rem] sm:text-[7rem] lg:text-[8rem] font-bold leading-none text-fg-muted tabular-nums">{number}</span>
      <div className="flex flex-col gap-3">
        <h3 className="text-h3 font-semibold text-fg-primary">{title}</h3>
        <p className={tileBodyText}>{body}</p>
      </div>
    </li>
  );
}

// PrinciplesCarousel — direct port of the Resume page's expertise
// carousel pattern, scoped to principles. Includes:
//   • role="region" + aria-roledescription="carousel" wrapper
//   • Polite aria-live announcement of the active card for screen readers
//   • Keyboard arrow-key navigation on the track
//   • Visible focus ring on the track
//   • Dots indicator (windowed to 5 visible at a time)
//   • Prev/Next chevron buttons with disabled states at the edges
//   • Dynamic horizontal padding so the first/last cards can snap-center
//     within the viewport on resize.
function PrinciplesCarousel({ items, copy }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isProgrammaticRef = useRef(false);
  const scrollTimerRef = useRef(null);

  const getCarouselPl = () => {
    if (typeof window === 'undefined') return '1.5rem';
    const vw = window.innerWidth;
    // Start the first card at the content column's left edge — the same x as
    // the problem-statement plate and every tile/intro: (vw - maxW)/2 + px,
    // tracking the `md:max-w-2xl lg:max-w-[52rem]` + `px-6/8/10` column.
    if (window.matchMedia('(min-width: 1024px)').matches)
      return `${Math.max(24, (vw - 832) / 2 + 40)}px`;   // 52rem + px-10
    if (window.matchMedia('(min-width: 768px)').matches)
      return `${Math.max(24, (vw - 672) / 2 + 32)}px`;   // 42rem + px-8
    if (window.matchMedia('(min-width: 640px)').matches)
      return '2rem';                                      // px-8 (column full-width)
    return '1.5rem';                                      // px-6
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

  // Horizontal scrolling + snapping is left entirely to the browser (native
  // overflow-x scroll + CSS scroll-snap on the track). The browser's momentum
  // + snap handles flicks and rapid consecutive swipes far more reliably than
  // any wheel-hijack — every custom variant we tried broke real swiping. The
  // accepted trade-off is the small vertical drift when a two-finger swipe
  // isn't perfectly horizontal. Nav buttons/dots still drive `scrollToCard`.

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
    const children = Array.from(track.children);
    const containerRect = track.getBoundingClientRect();
    const viewportCenter = track.scrollLeft + track.clientWidth / 2;
    let closest = 0, minDist = Infinity;
    children.forEach((item, i) => {
      const itemLeft = item.getBoundingClientRect().left - containerRect.left + track.scrollLeft;
      const dist = Math.abs(itemLeft + item.offsetWidth / 2 - viewportCenter);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={copy.carouselLabel}>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {copy.cardOf(activeIndex + 1, items.length)}: {items[activeIndex]?.title}
      </div>
      <ul
        ref={trackRef}
        role="list"
        aria-label={copy.carouselLabel}
        onScroll={handleScroll}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollToCard(Math.max(0, activeIndex - 1)); }
          if (e.key === 'ArrowRight') { e.preventDefault(); scrollToCard(Math.min(items.length - 1, activeIndex + 1)); }
        }}
        className="relative flex gap-6 sm:gap-8 lg:gap-10 overflow-x-auto snap-x snap-mandatory pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus"
        style={{ scrollbarWidth: 'none', paddingLeft: carouselPl, paddingRight: carouselPl, touchAction: 'pan-x pan-y' }}
      >
        {items.map((p, i) => (
          <PrincipleCard key={i} number={i + 1} title={p.title} body={p.body} />
        ))}
      </ul>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center mt-4 sm:mt-5 lg:mt-6 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto">
        <div />
        <div className="flex items-center">
          {items.map((_, i) => {
            const win = Math.min(5, items.length);
            const start = Math.min(Math.max(0, activeIndex - 2), items.length - win);
            const inWindow = i >= start && i < start + win;
            const isEdge = inWindow && ((i === start && start > 0) || (i === start + win - 1 && start + win < items.length));
            return (
              <button
                key={i}
                tabIndex={inWindow ? 0 : -1}
                onClick={() => scrollToCard(i)}
                aria-label={copy.cardOf(i + 1, items.length)}
                aria-current={i === activeIndex ? 'true' : undefined}
                className={`group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg-primary rounded-full motion-safe:transition-all motion-safe:duration-200 ${inWindow ? 'p-2' : 'w-0 overflow-hidden p-0'}`}
              >
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
            aria-label={copy.navPrev}
            className="group p-2 sm:p-2.5 lg:p-3 rounded-full bg-btn-nav-bg-rest-subtle enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
          >
            <img src={imgChevronLeft} alt="" width={20} height={20} className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px] brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter]" />
          </button>
          <button
            onClick={() => scrollToCard(Math.min(items.length - 1, activeIndex + 1))}
            disabled={activeIndex === items.length - 1}
            data-spring
            aria-label={copy.navNext}
            className="group p-2 sm:p-2.5 lg:p-3 rounded-full bg-btn-nav-bg-rest-subtle enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
          >
            <img src={imgChevronRight} alt="" width={20} height={20} className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px] group-enabled:group-hover:brightness-0 group-enabled:group-hover:invert dark:brightness-0 dark:invert dark:group-enabled:group-hover:brightness-100 dark:group-enabled:group-hover:invert-0 transition-[filter]" />
          </button>
        </div>
      </div>
    </div>
  );
}

// AppCard — single card in the Existing solutions carousel. Layout
// mirrors the old grid tile (icon header + strengths/gap body) but
// with carousel-friendly fixed widths.
function AppCard({ app, lang }) {
  const visual = EXISTING_APP_VISUAL[app.name];
  return (
    <li
      data-squircle
      className="shrink-0 w-[calc(100vw-3rem)] sm:w-[420px] lg:w-[480px] snap-center rounded-radius-6 sm:rounded-radius-8 lg:rounded-radius-12 bg-bg-surface p-6 sm:p-10 lg:p-12"
    >
      <div className="flex items-start gap-4 mb-6">
        <img
          src={visual.icon}
          alt=""
          aria-hidden="true"
          data-squircle
          className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-radius-4 shrink-0 object-cover"
        />
        <div className="min-w-0">
          {/* `h4`, not `h3`: each app nests one level below the
              "Existing solutions" `h3` sub-heading it belongs to, so the
              outline stays correct (Research h2 → Existing solutions h3 →
              each app h4) instead of the app reading as a peer of the
              "Existing solutions" / "Key insights" sub-sections. Styled at
              `text-h3` size — visual size is independent of heading level.
              The `<ul role="list">` still carries the list semantics. */}
          <h4 className="text-h3 font-semibold text-fg-primary">{app.name}</h4>
          {/* `whitespace-nowrap` so categories like "Film social network"
              never break onto a second line; the card is wide enough
              to accommodate the longest existing category at the
              `text-label-s` size. */}
          <p className="text-label-s font-semibold leading-[1.4] uppercase tracking-wider text-fg-muted mt-1 whitespace-nowrap">{app.category}</p>
        </div>
      </div>
      <div className="space-y-4">
        <p className={tileBodyText}>
          <strong>{lang === 'fr' ? 'Forces :' : 'Strengths:'}</strong> {app.doesWell}
        </p>
        <p className={tileBodyText}>
          <strong>{lang === 'fr' ? 'Lacune :' : 'Gap:'}</strong> {app.gap}
        </p>
      </div>
    </li>
  );
}

// Trimmed to the on-thesis fragment of each review; `…` marks elided filler
// (generic praise, app-specific bug reports). Ordered to track the Key
// insights: collaboration → watching together / cross-service → content
// breadth → whole-experience gap. NOTE: `rating` values are estimates from
// each review's title/tone — set the real star counts when known.
const APP_STORE_REVIEWS = [
  { title: 'My favourite app', rating: 5, date: '30 Apr', user: 'moomamaboo',
    body: "…A feature I think would be great is having shared lists that you can edit together with a friend, e.g. by creating one together or giving them access to it. I am very surprised that something similar has not already been added!" },
  { title: 'Bugs! And non-optimal UX.', rating: 3, date: '1y ago', user: 'rjrcooper',
    body: "I want an app that helps me keep track of what [I'd] like to watch across all services, which series my wife and I have started watching and which series either I or the both of us have finished watching. This app comes very close…" },
  { title: 'Great but could add', rating: 4, date: '25 Feb', user: 'Cozykeira<3',
    body: "I love this app for the fact you can track your movies, but I wish there was a feature where you can track your series you have watched and possibly documentaries, as I am someone who watches them more…" },
  { title: 'Almost perfect', rating: 4, date: '4y ago', user: 'Peubert',
    body: "I really like the look and feel of this app having tried so many… having used so many other apps I feel it's not worth using without some basic form of track sync, to save having to re-add everything and sync what I watch. If it had that then it would be an easy 5/5" },
];

// ReviewCard — one App Store review in the review-analysis carousel. Mirrors
// the Figma card: title + amber stars on the left, date / username stacked on
// the right, body below. No `self-start`, so every card stretches to the
// tallest in the row (the flex track is `items-stretch`) and they all share
// one height.
function ReviewCard({ review }) {
  return (
    <li
      data-squircle
      className="shrink-0 w-[calc(100vw-3rem)] sm:w-[340px] lg:w-[360px] snap-center rounded-radius-6 sm:rounded-radius-8 lg:rounded-radius-12 bg-bg-surface p-6 sm:p-7"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="min-w-0">
          <p className="text-copy-m font-semibold text-fg-primary">{review.title}</p>
          <p aria-hidden="true" className="text-fg-secondary text-copy-s tracking-[0.15em] mt-1.5">
            {'★'.repeat(review.rating)}<span className="text-fg-muted/30">{'★'.repeat(5 - review.rating)}</span>
          </p>
          <span className="sr-only">{review.rating} out of 5 stars</span>
        </div>
        {/* Date + username blurred for reviewer privacy — they're real
            App Store handles. `select-none` + `aria-hidden` so the raw
            text isn't trivially copied or read aloud either. */}
        <div aria-hidden="true" className="text-right shrink-0 blur-[6px] select-none">
          <p className="text-label-s text-fg-muted whitespace-nowrap">{review.date}</p>
          <p className="text-label-s text-fg-muted whitespace-nowrap mt-0.5">{review.user}</p>
        </div>
      </div>
      <p className="text-copy-s leading-relaxed text-fg-secondary">{review.body}</p>
    </li>
  );
}

// CardCarousel — generic horizontal card carousel (scroll-snap, keyboard
// arrows, windowed dots, prev/next, full aria). Used by both the Existing
// solutions and App store review analysis sub-sections so they share exactly
// the same behaviour. `renderItem(item, i)` draws each `<li>` card;
// `itemName(item)` (optional) feeds the live-region announcement.
// CarouselNav — the shared control row used by every carousel: a windowed
// dots indicator (up to `maxDots` visible, default 5) + prev/next chevron
// buttons with edge disabled states. `onSelect(index)` drives both the dots
// and the chevrons (the chevrons pass a clamped neighbour index).
function CarouselNav({ count, activeIndex, copy, onSelect, maxDots = 5, className = '' }) {
  return (
    <div className={`grid grid-cols-[1fr_auto_1fr] items-center ${className}`}>
      <div />
      <div className="flex items-center">
        {Array.from({ length: count }).map((_, i) => {
          const win = Math.min(maxDots, count);
          // Keep the active dot centred in the window (offset = half the
          // window), then clamp so the window never runs past either end.
          const start = Math.min(Math.max(0, activeIndex - Math.floor((win - 1) / 2)), count - win);
          const inWindow = i >= start && i < start + win;
          const isEdge = inWindow && ((i === start && start > 0) || (i === start + win - 1 && start + win < count));
          return (
            <button
              key={i}
              tabIndex={inWindow ? 0 : -1}
              onClick={() => onSelect(i)}
              aria-label={copy.cardOf(i + 1, count)}
              aria-current={i === activeIndex ? 'true' : undefined}
              className={`group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg-primary rounded-full motion-safe:transition-all motion-safe:duration-200 ${inWindow ? 'p-2' : 'w-0 overflow-hidden p-0'}`}
            >
              <span className={`block rounded-full motion-safe:transition-all motion-safe:duration-200 ${i === activeIndex ? 'w-4 h-2 bg-fg-dot-active' : isEdge ? 'w-1.5 h-1.5 bg-fg-dot-edge' : 'w-2 h-2 bg-fg-dot-rest group-hover:bg-fg-dot-hover'}`} />
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 justify-self-end">
        <button
          onClick={() => onSelect(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
          data-spring
          aria-label={copy.navPrev}
          className="group p-2 sm:p-2.5 lg:p-3 rounded-full bg-btn-nav-bg-rest-subtle enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
        >
          <img src={imgChevronLeft} alt="" width={20} height={20} className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px] brightness-0 group-enabled:group-hover:brightness-100 dark:brightness-100 dark:group-enabled:group-hover:brightness-0 transition-[filter]" />
        </button>
        <button
          onClick={() => onSelect(Math.min(count - 1, activeIndex + 1))}
          disabled={activeIndex === count - 1}
          data-spring
          aria-label={copy.navNext}
          className="group p-2 sm:p-2.5 lg:p-3 rounded-full bg-btn-nav-bg-rest-subtle enabled:hover:bg-btn-nav-bg-hover transition-[opacity,background-color,color] duration-150 disabled:!bg-transparent disabled:opacity-20 disabled:cursor-default enabled:cursor-pointer"
        >
          <img src={imgChevronRight} alt="" width={20} height={20} className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px] group-enabled:group-hover:brightness-0 group-enabled:group-hover:invert dark:brightness-0 dark:invert dark:group-enabled:group-hover:brightness-100 dark:group-enabled:group-hover:invert-0 transition-[filter]" />
        </button>
      </div>
    </div>
  );
}

function CardCarousel({ items, copy, renderItem, itemName, maxDots }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isProgrammaticRef = useRef(false);
  const scrollTimerRef = useRef(null);

  const getCarouselPl = () => {
    if (typeof window === 'undefined') return '1.5rem';
    const vw = window.innerWidth;
    // Start the first card at the content column's left edge — the same x as
    // the problem-statement plate and every tile/intro: (vw - maxW)/2 + px,
    // tracking the `md:max-w-2xl lg:max-w-[52rem]` + `px-6/8/10` column.
    if (window.matchMedia('(min-width: 1024px)').matches)
      return `${Math.max(24, (vw - 832) / 2 + 40)}px`;   // 52rem + px-10
    if (window.matchMedia('(min-width: 768px)').matches)
      return `${Math.max(24, (vw - 672) / 2 + 32)}px`;   // 42rem + px-8
    if (window.matchMedia('(min-width: 640px)').matches)
      return '2rem';                                      // px-8 (column full-width)
    return '1.5rem';                                      // px-6
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

  // Horizontal scrolling + snapping is left entirely to the browser (native
  // overflow-x scroll + CSS scroll-snap on the track). The browser's momentum
  // + snap handles flicks and rapid consecutive swipes far more reliably than
  // any wheel-hijack — every custom variant we tried broke real swiping. The
  // accepted trade-off is the small vertical drift when a two-finger swipe
  // isn't perfectly horizontal. Nav buttons/dots still drive `scrollToCard`.

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
    const children = Array.from(track.children);
    const containerRect = track.getBoundingClientRect();
    const viewportCenter = track.scrollLeft + track.clientWidth / 2;
    let closest = 0, minDist = Infinity;
    children.forEach((item, i) => {
      const itemLeft = item.getBoundingClientRect().left - containerRect.left + track.scrollLeft;
      const dist = Math.abs(itemLeft + item.offsetWidth / 2 - viewportCenter);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={copy.carouselLabel}>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {copy.cardOf(activeIndex + 1, items.length)}{itemName ? `: ${itemName(items[activeIndex])}` : ''}
      </div>
      <ul
        ref={trackRef}
        role="list"
        aria-label={copy.carouselLabel}
        onScroll={handleScroll}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollToCard(Math.max(0, activeIndex - 1)); }
          if (e.key === 'ArrowRight') { e.preventDefault(); scrollToCard(Math.min(items.length - 1, activeIndex + 1)); }
        }}
        className="relative flex gap-6 sm:gap-8 lg:gap-10 overflow-x-auto snap-x snap-mandatory pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus"
        style={{ scrollbarWidth: 'none', paddingLeft: carouselPl, paddingRight: carouselPl, touchAction: 'pan-x pan-y' }}
      >
        {items.map((item, i) => renderItem(item, i))}
      </ul>

      <CarouselNav
        count={items.length}
        activeIndex={activeIndex}
        copy={copy}
        onSelect={scrollToCard}
        maxDots={maxDots}
        className="mt-4 sm:mt-5 lg:mt-6 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto"
      />
    </div>
  );
}

// The app's information architecture, as presented on the Design page: one
// card per top-level tab (the user sits at the centre of all of them). A node
// is a plain string (leaf) or `{ name, children }` for a single nested level
// (rendered as a bulleted sub-item). Labels mirror the shipping iOS app.
const INFO_ARCHITECTURE = [
  { icon: 'home', name: 'Home', children: ['Keep watching', 'Trending', 'Recommendations', 'Award winners', 'Coming soon', 'Top rated'] },
  { icon: 'library', name: 'Library', children: ['Watching', 'To Watch', 'Watched', 'Stopped', 'Dismissed', 'Collections'] },
  { icon: 'groups', name: 'Groups', children: ['Group watching', 'Top matches', 'Sessions', 'Coming soon', 'Group Watched', 'Stats'] },
  { icon: 'search', name: 'Search', children: ['Trending', 'Recent searches', 'Suggestions', 'Search results'] },
  { icon: 'profile', name: 'Profile', children: ['Public profile', 'Calendar', 'Favourite people', 'Recommend', 'Import', 'Account settings'] },
];


// FeatureGlyph — the Core-features / IA tab icons. Real SF Symbols exported
// from the Canap app as white SVGs; drawn via CSS mask so the shape is filled
// with `bg-current`, i.e. the call site's text colour (`text-fg-primary`).
// That keeps them theme-adaptive (dark in light mode, light in dark mode)
// from a single white asset.
const FEATURE_ICONS = {
  discovery: iconSquareGrid,         // square.grid.2x2
  library: iconFilmStack,            // film.stack
  search: iconMagnifyingglass,       // magnifyingglass
  groups: iconPerson2,               // person.2
  social: iconMessage,               // message
  recommendations: iconPaperplane,   // paperplane
  home: iconHouseFill,               // house.fill
  profile: iconPersonCropCircle,     // person.crop.circle
  'for-you': iconSparkles,           // sparkles
};

function FeatureGlyph({ name, className = '' }) {
  const src = FEATURE_ICONS[name];
  if (!src) return null;
  return (
    <span
      aria-hidden="true"
      className={`inline-block bg-current ${className}`}
      style={{
        // Quote the URL: under 4KB Vite inlines these as data: URIs that
        // contain single quotes/commas, which break an unquoted CSS url().
        maskImage: `url("${src}")`,
        WebkitMaskImage: `url("${src}")`,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  );
}

// FeatureCard — one Core-features card (icon + title + body). Shared by the
// tablet/desktop grid and the mobile carousel so the markup stays in one place.
function FeatureCard({ f, className = '' }) {
  return (
    <div data-squircle className={`rounded-radius-6 sm:rounded-radius-8 bg-bg-surface p-6 sm:p-7 ${className}`}>
      <FeatureGlyph name={f.icon} className="w-10 h-10 text-fg-primary mb-3.5" />
      <h4 className="text-h4 font-semibold text-fg-primary mb-2">{f.title}</h4>
      <p className={tileBodyText}>{f.body}</p>
    </div>
  );
}

// IaCard — one tab's screen list: centred title, left-aligned screens, a single
// nested level shown as bulleted sub-items. Surface-token card.
function IaCard({ root, className = '' }) {
  return (
    <div
      data-squircle
      className={`rounded-radius-6 bg-bg-surface border border-black/[0.06] dark:border-white/[0.08] p-5 ${className}`}
    >
      {/* Tab header — the tab's SF-Symbol glyph above its name, matching the
          Core-features cards (same 40px icon). */}
      <FeatureGlyph name={root.icon} className="w-10 h-10 text-fg-primary mb-3" />
      <p className="text-h4 font-semibold text-fg-primary text-left mb-5 sm:mb-6">{root.name}</p>
      {/* Up to six leaves laid out column-first in a 2-column / max-3-row grid,
          each item bulleted. grid-flow-col fills column 1 (items 1–3) before
          column 2 (items 4–6); shorter tabs (e.g. Search) just leave the tail
          of column 2 empty. */}
      <ul className="grid grid-cols-2 grid-rows-3 grid-flow-col gap-x-4 gap-y-1.5 text-copy-s text-fg-secondary">
        {root.children.map((c, i) => {
          const name = typeof c === 'string' ? c : c.name;
          const kids = typeof c === 'string' ? [] : (c.children ?? []);
          return (
            <li key={i} className="flex gap-1.5">
              <span aria-hidden="true" className="text-fg-muted shrink-0">•</span>
              <span>
                {name}
                {kids.map((k, j) => (
                  <span key={j} className="block pl-2 text-fg-muted">{'•'} {k}</span>
                ))}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// UserJourney — a single designer-made diagram of the path to setting a
// title's status and the five states it lands in. Theme picked from the
// isDark prop (kept in sync with the <html>.dark class in App.jsx); device
// crop picked via <picture> breakpoints — landscape desktop art at md+,
// portrait mobile art below. Mirrors the SalesPlatform userflow pattern.
function UserJourney({ copy, isDark, lang }) {
  const fr = lang === 'fr';
  const desktop = fr ? (isDark ? imgJourneyFrDesktopDark : imgJourneyFrDesktopLight)
                     : (isDark ? imgJourneyEnDesktopDark : imgJourneyEnDesktopLight);
  const mobile  = fr ? (isDark ? imgJourneyFrMobileDark : imgJourneyFrMobileLight)
                     : (isDark ? imgJourneyEnMobileDark : imgJourneyEnMobileLight);
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <img src={mobile} alt={copy.imgAlt} loading="lazy" className="w-full h-auto" />
    </picture>
  );
}

// Sizing-strip posters (Figma exports, clean — chrome-free, per-size radii
// baked in): Discovery (M) · Carousel (S) · List (XS).
const IM_POSTER_SIZES = [imgPosterOppenheimerM, imgPoster2001S, imgPosterPluribusXs];

// Small circled number used to tie a poster element to its annotation. Used
// only inside the Interaction-model black panel, so it's white-on-dark.
function ImPin({ n, className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#141414] text-fine-print font-semibold leading-none ${className}`}
    >
      {n}
    </span>
  );
}

// InteractionModel — the poster as both the thing you read and the thing you
// act on. Lives on the black showcase panel, so all text is on-dark. The
// annotated poster and the action menu are pixel-exact Figma exports; numbered
// pins overlay the poster to tie each element to its legend. Three beats, all
// responsive without a carousel: annotated poster (figure + numbered legend,
// side by side on desktop, stacked on mobile); a context-sizing strip (three
// clean exports, bottom-aligned, decreasing width); and the action-menu export
// with a caption.
function InteractionModel({ copy }) {
  return (
    <div className="flex flex-col gap-10 sm:gap-12">
      {/* Beat 1 — annotated poster (Figma export) + numbered legend */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-3 sm:mb-5">
        {/* lg:ml-7 nudges the poster right ~28px so its left edge lines up with
            the menu dropdown's card edge below (the menu PNG carries ~29px of
            baked-in drop-shadow padding). */}
        <figure className="w-[176px] shrink-0 mx-auto lg:mx-0 lg:ml-7 mt-4 lg:mt-0">
          <img
            src={imgPosterHerM}
            alt={copy.posterAlt}
            loading="lazy"
            className="block w-full h-auto"
          />
        </figure>

        <ol className="flex-1 flex flex-col gap-5 lg:pt-6">
          {copy.annotations.map((a, i) => (
            <li key={i} className="flex gap-3">
              <ImPin n={a.n} className="mt-0.5 shrink-0" />
              <div>
                <p className="text-copy-m font-semibold text-white mb-1">{a.title}</p>
                <p className="text-copy-s text-white/65">{a.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Beat 2 — contextual action menu (Figma export of the real two-tier
          UIKit menu: a quick-action status row, then standard list rows). */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
        <img
          src={imgMenuDropdown}
          alt={copy.menuLabel}
          loading="lazy"
          className="w-[228px] h-auto shrink-0 mx-auto sm:mx-0"
        />
        <div className="max-w-md sm:pt-24">
          <p className="text-copy-m font-semibold text-white mb-1.5">{copy.menuLabel}</p>
          <p className="text-copy-s text-white/65">{copy.menuBody}</p>
        </div>
      </div>

      {/* Beat 3 — sized for context. Desktop: posters on the left, caption on
          the right (mirrors the menu beat). Mobile: posters then caption
          stacked, with mt-6 widening the gap from the menu above. */}
      <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row-reverse sm:justify-end gap-6 sm:gap-14 items-start sm:items-center">
        <div className="flex items-end gap-5 shrink-0">
          {copy.sizes.map((s, i) => (
            <img
              key={i}
              src={IM_POSTER_SIZES[i]}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="block h-auto"
              style={{ width: `${s.w}px` }}
            />
          ))}
        </div>
        <div className="max-w-md">
          <p className="text-copy-m font-semibold text-white mb-1.5">{copy.sizingLabel}</p>
          {copy.sizingBody && <p className="text-copy-s text-white/65 mb-1.5">{copy.sizingBody}</p>}
          {/* The outro's gap to the title matches the menu title→description gap (mb-1.5). */}
          <p className="text-copy-s text-white/70 [&_strong]:text-white">{copy.outro}</p>
        </div>
      </div>

      {/* Beat 4 — viewing mode: the cards-list context export. Desktop: image on
          the left, title + description on the right. Mobile: image on top,
          title + description below. mt-* widens the gap from the
          sized-for-context beat above. */}
      <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-6 sm:gap-14 items-start sm:items-center">
        <img
          src={imgPosterCardList}
          alt="Posters in a cards list context"
          loading="lazy"
          className="block w-full sm:w-[320px] h-auto rounded-radius-4 shrink-0"
        />
        <div className="max-w-md">
          <p className="text-copy-m font-semibold text-white mb-1.5">{copy.viewingLabel}</p>
          <p className="text-copy-s text-white/65">{copy.viewingBody}</p>
        </div>
      </div>

      {/* Beat 5 — human error: the undo affordance after a swipe action.
          Desktop: small undo pill on the left, title + description on the
          right. Mobile: pill on top, text below. */}
      <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-6 sm:gap-14 items-start sm:items-center">
        <img
          src={imgUndo}
          alt="Undo button"
          loading="lazy"
          className="block w-[150px] h-auto shrink-0 mx-auto sm:mx-0"
        />
        <div className="max-w-md">
          <p className="text-copy-m font-semibold text-white mb-1.5">{copy.undoLabel}</p>
          <p className="text-copy-s text-white/65">{copy.undoBody}</p>
        </div>
      </div>
    </div>
  );
}

// Hero — title, category eyebrow, and two animated stats. Matches the
// SalesPlatform / XR hero stat rendering exactly so the three case
// studies share a consistent stat treatment (animated count-up + the
// `text-label-s uppercase tracking-wider text-fg-on-dark-opacity-64`
// label style, not the bespoke sentence-case treatment the scaffold
// originally shipped with).
function Hero({ lang }) {
  const t = T[lang].hero;
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setHeroReady(true), 600);
    return () => clearTimeout(id);
  }, []);
  return (
    <section
      aria-labelledby="hero-heading"
      lang={lang}
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#141414]"
    >
      {/* Animated poster grid — full-viewport version of the homepage
          card backdrop, matching the iOS app's login backdrop. Slow
          counter-scrolling rows of 20 curated posters rotated -15°.
          Lives behind the vignette + content layers below. */}
      <CanapHeroBackdrop />

      {/* Dark vignette so the title, pill, and stats stay readable
          over whatever posters happen to land beneath them. Heavy
          at top + bottom (the chrome anchor points) so the text
          areas stay legible even when bright posters scroll behind
          them. The middle band keeps the posters readable, just
          dimmed enough to recede behind the headline. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/95"
      />

      {/* Content container — `flex flex-col gap-6 sm:gap-8` matches
          SalesPlatform + XR exactly. The entrance fade (`opacity heroReady`,
          700ms after the 600ms delay) is applied to each CHILD below, not
          here: the pill has a `backdrop-blur`, and an ancestor with
          opacity < 1 disables backdrop-filter, so fading this container made
          the pill's blur + edge pop in at the end of the fade. Fading the
          children individually lets the pill ease in with its blur intact. */}
      <div className="relative flex-1 flex flex-col justify-end max-w-5xl mx-auto w-full px-6 sm:px-8 lg:px-10 pb-24 sm:pb-28 lg:pb-32 gap-6 sm:gap-8">
        {/* Side-project tag — rendered as a pill rather than the
            usual small eyebrow so it reads as the FIRST thing a
            reader registers, setting expectations before the
            title's design hook lands.
            Uses the portfolio's `inverted-subtle` semantic tokens
            (`bg-inverted-subtle` + `border-inverted-subtle`) which
            auto-flip light/dark — bright tint in light mode for a
            soft lift over the always-dark hero, dark tint in dark
            mode so the pill recedes into the surrounding dark UI
            instead of glowing. Text stays white via
            `text-fg-on-dark-opacity-90` (always white at 90%, since
            the hero background is always dark regardless of site
            theme). Same pattern Nav.jsx line 529 already uses. */}
        <span
          className="inline-flex self-start items-center text-tag-m uppercase tracking-widest font-semibold text-fg-on-dark-opacity-90 bg-inverted-subtle backdrop-blur-sm border border-inverted-subtle px-4 py-1.5 rounded-full transition-opacity duration-700"
          style={{ opacity: heroReady ? 1 : 0 }}
        >
          {t.category}
        </span>
        {/* Title — `font-bold leading-tight` + `max-w-3xl` matches
            SalesPlatform's hero title exactly. `text-shadow` stays
            because Canap's hero sits over animated posters (other
            case studies have static photographic backgrounds with
            their own gradient overlays that provide contrast). */}
        <h1
          id="hero-heading"
          className="text-display-1 font-bold leading-tight text-white max-w-3xl transition-opacity duration-700"
          style={{ textShadow: '0 2px 24px rgba(0, 0, 0, 0.7)', opacity: heroReady ? 1 : 0 }}
        >
          {t.title}
        </h1>

        <ul role="list" className="flex items-start gap-8 sm:gap-12 lg:gap-16 pt-2 list-none transition-opacity duration-700" style={{ opacity: heroReady ? 1 : 0 }}>
          {t.stats.map((s, i) => {
            const finalValue = s.decimals > 0 ? s.countTo.toFixed(s.decimals) : s.countTo;
            return (
              <li key={i} className="flex flex-col gap-1">
                <span className="text-display-2 font-semibold leading-tight text-white tabular-nums whitespace-nowrap">
                  {/* Screen readers get the final value directly; the
                      visible AnimatedStat is hidden from AT to avoid
                      reading every interim tick. */}
                  <span className="sr-only">{s.prefix}{finalValue}{s.suffix}</span>
                  <span aria-hidden="true"><AnimatedStat prefix={s.prefix} countTo={s.countTo} decimals={s.decimals} suffix={s.suffix} ready={heroReady} /></span>
                </span>
                <span className="text-label-s font-semibold leading-[1.4] uppercase tracking-wider text-fg-on-dark-opacity-64 max-w-[100px] sm:max-w-none">
                  {s.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// Hero screen per sign-in beat, keyed by the `img` field in the signIn copy.
const SIGN_IN_IMG = {
  signIn: imgSignInSignIn,
  code: imgSignInCode,
  profile: imgSignInProfile,
  editAvatar: imgSignInEditAvatar,
  interests: imgSignInInterests,
  allSet: imgSignInAllSet,
};

// SignInFlow — the 18-screen onboarding curated to five decisive beats, on the
// page surface (theme-aware text). The device exports are dark-mode iOS screens
// with their own bezels, so they read as phones on either light or dark page.
// Each beat is a device export above its number + title + body, presented as a
// full-bleed carousel (shared CardCarousel: snap, windowed dots, prev/next) at
// every breakpoint — so the screens stay legible rather than shrinking into a
// row on desktop.
function SignInFlow({ copy }) {
  return (
    <div className="mx-[calc(50%-50vw)]">
      <CardCarousel
        items={copy.beats}
        copy={copy.carousel}
        itemName={(b) => b.title}
        renderItem={(b, i) => (
          <li
            key={i}
            data-squircle
            className="shrink-0 w-[calc(100vw-3rem)] sm:w-[360px] lg:w-[600px] snap-center list-none rounded-radius-6 sm:rounded-radius-8 lg:rounded-radius-12 bg-bg-surface p-6 sm:p-7 lg:p-8"
          >
            {/* Stacked (phone above caption) on mobile/tablet; side-by-side on
                desktop, where the slide is wide enough to set the two apart.
                On desktop the caption bottom-aligns with the screenshot. */}
            <div className="flex flex-col lg:flex-row lg:items-end gap-5 lg:gap-10">
              <img
                src={SIGN_IN_IMG[b.img]}
                alt={b.alt}
                loading="lazy"
                className="block w-[200px] h-auto mx-auto lg:mx-0 shrink-0"
              />
              <div className="lg:flex-1">
                <p className="text-copy-l font-semibold text-fg-primary mb-2">{b.title}</p>
                <p className="text-copy-m text-fg-secondary">{b.body}</p>
              </div>
            </div>
          </li>
        )}
      />
    </div>
  );
}

// SignInFlowGraph — a designer-made flow map of the onboarding that opens the
// sign-in section, in the same visual language (and same SVG treatment) as the
// user-journey diagram. Theme picked from the isDark prop; device crop via a
// <picture> breakpoint — landscape desktop art at md+, portrait mobile art
// below. Transparent SVGs, so they sit on the page surface in either theme.
function SignInFlowGraph({ isDark, lang }) {
  const fr = lang === 'fr';
  const desktop = fr ? (isDark ? imgSifGraphFrDesktopDark : imgSifGraphFrDesktopLight)
                     : (isDark ? imgSifGraphEnDesktopDark : imgSifGraphEnDesktopLight);
  const mobile  = fr ? (isDark ? imgSifGraphFrMobileDark : imgSifGraphFrMobileLight)
                     : (isDark ? imgSifGraphEnMobileDark : imgSifGraphEnMobileLight);
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <img
        src={mobile}
        alt="Onboarding flow map: from the sign-in screen the user picks Apple or email; the email path adds a verification code; both paths converge on profile setup, then picking interests, then an all-set confirmation."
        loading="lazy"
        className="w-full h-auto"
      />
    </picture>
  );
}

// TechStackGraph — a designer-made architecture diagram for the Technical
// direction beat, in the same visual language (and same SVG treatment) as the
// user-journey / sign-in flow diagrams. Theme picked from the isDark prop;
// device crop via a <picture> breakpoint — landscape desktop art at md+,
// portrait mobile art below. Transparent SVGs, so they sit on the page surface
// in either theme.
function TechStackGraph({ isDark, lang }) {
  const fr = lang === 'fr';
  const desktop = fr ? (isDark ? imgTechFrDesktopDark : imgTechFrDesktopLight)
                     : (isDark ? imgTechEnDesktopDark : imgTechEnDesktopLight);
  const mobile  = fr ? (isDark ? imgTechFrMobileDark : imgTechFrMobileLight)
                     : (isDark ? imgTechEnMobileDark : imgTechEnMobileLight);
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <img
        src={mobile}
        alt="Architecture: the client (iOS / web) authenticates with Sign in with Apple or email plus OTP, reaching the backend API layer, which connects to a Prisma database and is hosted on Vercel."
        loading="lazy"
        className="w-full h-auto"
      />
    </picture>
  );
}

// Figma design + shipped iPhone build per UX flow, keyed by the slide `id` in
// the process.uxFlows copy. Drop the exports into
// src/assets/case-study/canap/ux-flows/ (e.g. room-creation-figma.webp /
// room-creation-build.webp), import them, and replace the nulls below — until
// then each slot renders a portrait Placeholder.
const UX_FLOW_IMG = {
  'home':    { figma: imgUxHomeFigma,    build: imgUxHomeBuild },
  'library': { figma: imgUxLibraryFigma, build: imgUxLibraryBuild },
  'for-you': { figma: imgUxForYouFigma,  build: imgUxForYouBuild },
  'groups':  { figma: imgUxGroupsFigma,  build: imgUxGroupsBuild },
  'search':  { figma: imgUxSearchFigma,  build: imgUxSearchBuild },
};

// UxFlowsCarousel — five flows, each a Figma design beside the shipped iPhone
// build. Full-bleed carousel reusing the shared CardCarousel (snap, dots,
// prev/next), mirroring the onboarding-flow carousel.
function UxFlowsCarousel({ copy }) {
  return (
    <div className="mx-[calc(50%-50vw)]">
      <CardCarousel
        items={copy.slides}
        copy={copy.carousel}
        itemName={(s) => s.label}
        renderItem={(s, i) => {
          const imgs = UX_FLOW_IMG[s.id] || {};
          const pair = [
            { src: imgs.figma, label: copy.figmaLabel },
            { src: imgs.build, label: copy.buildLabel },
          ];
          return (
            <li
              key={i}
              data-squircle
              className="shrink-0 w-[calc(100vw-3rem)] sm:w-[428px] lg:w-[460px] snap-center list-none rounded-radius-6 sm:rounded-radius-8 lg:rounded-radius-12 bg-bg-surface p-6 sm:py-7 sm:px-8 lg:px-12"
            >
              <p className="flex items-center gap-2 text-copy-l font-semibold text-fg-primary mb-5">
                <FeatureGlyph name={s.id} className="w-5 h-5 shrink-0 text-fg-primary" />
                {s.label}
              </p>
              <div className="flex gap-3 sm:gap-4">
                {pair.map((ph, j) => (
                  <figure key={j} className="flex-1 m-0">
                    {ph.src ? (
                      <img src={ph.src} alt={`${s.label} — ${ph.label}`} loading="lazy" className="w-full h-auto rounded-radius-3" />
                    ) : (
                      <Placeholder aspect="9/19.5" seed={i * 2 + j + 5} label={`${s.label} · ${ph.label}`} />
                    )}
                    <figcaption className="mt-2 text-tag-s text-fg-muted text-center">{ph.label}</figcaption>
                  </figure>
                ))}
              </div>
            </li>
          );
        }}
      />
    </div>
  );
}

// BehaviourPathsDiagram — designer-made vertical flow of the rating paths
// observed in the testing session, in the shared diagram language. Single
// portrait SVG picked by theme (isDark); transparent so it sits on the slide
// surface. Compact so it fits inside a carousel slide.
function BehaviourPathsDiagram({ isDark, lang }) {
  const fr = lang === 'fr';
  const src = fr ? (isDark ? imgBehaviourFrDark : imgBehaviourFrLight)
                 : (isDark ? imgBehaviourEnDark : imgBehaviourEnLight);
  return (
    <img
      src={src}
      alt="Behavioural paths observed: users entered rating from either the Library or a Content page, then changed sorting, switched between card and list view, and batch-rating behaviour emerged."
      loading="lazy"
      className="w-full h-auto"
    />
  );
}

// Build/testing captures for the iOS Build & Testing carousel, keyed by slide
// `id`. Drop the exports into src/assets/case-study/canap/ios-build/ (e.g.
// slide-1.webp … slide-5.webp), import them, and replace the nulls below —
// until then each slide renders a portrait Placeholder.
const IOS_BUILD_IMG = {
  'slide-1': null,
  'slide-2': null,
  'slide-3': null,
  'slide-4': null,
  'slide-5': null,
};

// IosBuildCarousel — five build/testing narrative slides, full-bleed carousel.
// Full-bleed carousel reusing the shared CardCarousel, like the other two.
function IosBuildCarousel({ copy, isDark, lang }) {
  return (
    <div className="mx-[calc(50%-50vw)]">
      <CardCarousel
        items={copy.slides}
        copy={copy.carousel}
        renderItem={(s, i) => {
          const isContent = s.label || s.text || s.bullets || s.diagram || s.aha;
          return (
            <li
              key={i}
              data-squircle
              className="shrink-0 w-[80vw] sm:w-[360px] snap-center list-none rounded-radius-6 sm:rounded-radius-8 lg:rounded-radius-12 bg-bg-surface p-6 sm:p-7"
            >
              {isContent ? (
                <div className="flex flex-col h-full justify-center">
                  {s.label && <p className="text-h4 font-semibold text-fg-primary mb-3">{s.label}</p>}
                  {s.text && <p className="text-copy-l font-medium leading-snug text-fg-primary">{s.text}</p>}
                  {s.diagram === 'behaviourPaths' && (
                    <div className="mt-4"><BehaviourPathsDiagram isDark={isDark} lang={lang} /></div>
                  )}
                  {s.bullets && (
                    <ul className="flex flex-col gap-2.5">
                      {s.bullets.map((bz, j) => (
                        <li key={j} className="flex gap-2 text-copy-s text-fg-secondary leading-snug">
                          <span aria-hidden="true" className="text-fg-muted shrink-0">→</span>
                          <span>{bz}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.aha && (
                    <div>
                      <p className="text-h4 font-semibold text-fg-primary mb-3">{s.aha.label}</p>
                      <p className="text-copy-s text-fg-secondary leading-snug">{s.aha.text}</p>
                    </div>
                  )}
                </div>
              ) : IOS_BUILD_IMG[s.id] ? (
                <img src={IOS_BUILD_IMG[s.id]} alt="" loading="lazy" className="block w-full max-w-[240px] mx-auto h-auto rounded-radius-3" />
              ) : (
                <div className="max-w-[240px] mx-auto"><Placeholder aspect="9/19.5" seed={i + 11} label={`iOS build · ${i + 1}`} /></div>
              )}
            </li>
          );
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

function Canap({ lang = 'en', isDark }) {
  const t = T[lang];
  const sections = SECTIONS[lang] ?? SECTIONS.en;
  // Left padding that lines a section intro up with its h2 title. The title
  // sits in a wider, centred wrapper that narrows at `md`, so the offset to the
  // body column isn't constant: below md the title is indented by the full
  // `px` ladder (pl-6/pl-12); from md up the title is only the column's `px`
  // to the right of the body, so the intro needs just that (md=1rem, lg=1.25rem).
  // Reading-column inset — matches the tile's own left padding
  // (`p-6 sm:p-12 lg:p-[60px]`) so every section/sub-section title and body
  // lines up with the first h3 ("Origin"), which sits inside a tile.
  const introInset = 'pl-6 sm:pl-12 lg:pl-[60px]';
  const [activeId, setActiveId]         = useState('');
  const [activeSubId, setActiveSubId]   = useState('');
  const [scrolledDown, setScrolledDown] = useState(false);
  const [atBottom, setAtBottom]         = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const scrollTarget = useRef(null);
  const navScrollRef = useRef(false);
  // Mobile (< 920px) collapse state for the two raw carousel sections, which
  // aren't rendered via the <Section> component. Research & Ideate.
  const researchC = useSectionCollapse();
  const ideateC = useSectionCollapse();

  const handleNavigate = (id) => {
    const parentSection = sections.find(s => s.subsections?.some(sub => sub.id === id));
    if (parentSection) {
      setActiveId(parentSection.id);
      setActiveSubId(id);
    } else {
      setActiveId(id);
      setActiveSubId('');
    }
    scrollTarget.current = id;
    navScrollRef.current = true;
    setScrollingDown(false);
    setScrolledDown(true);
    scrollToSection(id);
    setTimeout(() => { scrollTarget.current = null; navScrollRef.current = false; setScrollingDown(false); }, 1500);
  };

  useEffect(() => {
    document.title = t.pageTitle;
  }, [lang, t.pageTitle]);


  // Active section via IntersectionObserver. Same rootMargin shape as
  // SalesPlatform so the highlight transitions feel identical across
  // case studies.
  useEffect(() => {
    const observers = sections.map(s => {
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

  // Active subsection — only fires if any section has subsections.
  // Currently Canap ships with empty `subsections: []` arrays, so
  // this is a no-op until the SECTIONS structure grows sub-IDs.
  useEffect(() => {
    const allSubs = sections.flatMap(s => s.subsections ?? []);
    const observers = allSubs.map(sub => {
      const el = document.getElementById(sub.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          if (scrollTarget.current) {
            if (sub.id === scrollTarget.current) { scrollTarget.current = null; setActiveSubId(sub.id); }
          } else {
            setActiveSubId(sub.id);
          }
        },
        { rootMargin: '-10% 0px -70% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [lang]);

  // Show/hide both navs based on scroll position relative to the
  // first + last sections (so the nav appears once you're past the
  // hero and hides once you reach the last section).
  useEffect(() => {
    const firstId = sections[0].id;
    const lastId  = sections[sections.length - 1].id;
    const update = () => {
      const firstEl = document.getElementById(firstId);
      const lastEl  = document.getElementById(lastId);
      if (firstEl) setScrolledDown(firstEl.getBoundingClientRect().top < 80);
      if (lastEl)  setAtBottom(lastEl.getBoundingClientRect().bottom < 700);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [lang]);

  // Mobile-only scroll-direction tracking so the floating bottom
  // nav can hide on scroll-down (like SalesPlatform).
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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-tooltip-bg focus:text-white focus:rounded-radius-2 focus:text-sm focus:font-semibold"
      >
        {lang === 'fr' ? 'Aller au contenu principal' : 'Skip to main content'}
      </a>

      <Hero lang={lang} />

      <main id="main-content">
        {/* ---------- CONTEXT --------------------------------------- */}
        <Section
          id="context"
          title={t.context.header}
          lang={lang}
          bgClass="bg-gradient-to-b from-white to-[#f6f6f6] dark:from-[#141414] dark:to-[#1f1f1f]"
          titleInset
        >
          {/* Three tiles, stacked. Structured as a narrative:
              Origin (why this project exists) → Pain points (the lived
              frustrations) → Problem statement (the distilled design
              challenge). Single-column on purpose — splitting any of
              these into half-width tiles would break the reading
              order. */}
          <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">
            {/* Origin */}
            <Tile fullWidth>
              <TileEyebrow id="ctx-origin">{t.context.eyebrows[0]}</TileEyebrow>
              <TileBody>{t.context.client}</TileBody>
            </Tile>

            {/* Pain points — rendered as post-it notes on a neutral
                paper-ish background. Four notes in a 2×2 grid on
                desktop, single-column stack on mobile. Tilts and
                colours are deterministic by index so the composition
                stays stable. */}
            <Tile
              fullWidth
              bgClass="bg-transparent"
            >
              <TileEyebrow id="ctx-pains">{t.context.eyebrows[1]}</TileEyebrow>
              {/* Match the section-title→intro gap (Existing solutions etc.):
                  h2 py-6/7/8 + pb-2/3 ≈ 2 / 2.5 / 2.75rem. */}
              <div className={`${tileBodyText} max-w-2xl mt-8 sm:mt-10 lg:mt-11 space-y-6`}>{t.context.painsIntro}</div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-y-10 lg:gap-x-20 mt-12 sm:mt-14 lg:mt-16 px-2 sm:px-6">
                {t.context.painPoints.map((pain, i) => {
                  const tones = ['amber', 'pink', 'mint', 'sky', 'lilac', 'peach'];
                  const rotations = ['-1.2deg', '2.3deg', '0.6deg', '-2.6deg', '1.7deg', '-0.9deg', '2.5deg', '-1.5deg', '-2.1deg'];
                  // Small per-index translate offsets so the 2×3
                  // grid reads as hand-placed rather than ruler-true.
                  // Kept under ±10px so the layout doesn't visually
                  // break the column alignment.
                  const offsetsX = ['4px', '-6px', '-3px', '8px', '2px', '-5px'];
                  const offsetsY = ['-6px', '3px', '5px', '-2px', '7px', '-4px'];
                  return (
                    <PostItNote
                      key={i}
                      tone={tones[i % tones.length]}
                      rotate={rotations[i % rotations.length]}
                      offsetX={offsetsX[i % offsetsX.length]}
                      offsetY={offsetsY[i % offsetsY.length]}
                    >
                      {pain}
                    </PostItNote>
                  );
                })}
              </div>
              {/* Outro — lands the post-it observations on the takeaway that
                  sets up the problem statement. Mirrors the intro's body
                  style; the top margin matches the grid's top margin so the
                  gap below the post-its equals the gap above them. */}
              {t.context.painsOutro && (
                <p className={`${tileBodyText} max-w-2xl mt-12 sm:mt-14 lg:mt-16`}>{t.context.painsOutro}</p>
              )}
            </Tile>
          </div>
        </Section>

        {/* ---------- RESEARCH -------------------------------------- */}
        {/* Raw `<section>` (matching Principles) so the Existing-solutions
            carousel can break out to full viewport while headings + copy
            stay inside the narrow content column. Research is a parent
            section: each research method (Existing solutions, App store
            review analysis, …) is a `text-h3` sub-section beneath the
            single `Research` h2 — the same heading hierarchy as Context →
            Pain points. */}
        <section
          id="research"
          aria-labelledby="research-heading"
          className={researchC.collapsible && !researchC.sectionOpen ? 'bg-bg-page' : 'bg-gradient-to-b from-white to-[#f6f6f6] dark:from-[#141414] dark:to-[#1f1f1f]'}
        >
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 pt-8 sm:pt-10 lg:pt-12 pb-2 sm:pb-3 md:max-w-2xl lg:max-w-[52rem]">
            <SectionHeading c={researchC} id="research" title={t.research.header} lang={lang} titleInset />
          </div>

          <CollapseBody id="research" c={researchC}>
          {/* Sub-section: Existing solutions — heading only; the cards carry
              the survey and the outro lands the verdict, so no intro line. */}
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 md:max-w-2xl lg:max-w-[52rem] mb-10">
            <h3 id="existing" className={`text-h3 font-semibold text-fg-primary scroll-mt-28 ${introInset}`}>{t.existing.header}</h3>
          </div>

          <CardCarousel
            items={t.existing.apps}
            copy={t.existing}
            itemName={(app) => app.name}
            renderItem={(app, i) => <AppCard key={i} app={app} lang={lang} />}
          />

          {/* Outro — lands the carousel on the gap none of these apps fill.
              Mirrors the intro wrapper + body style; `mt-10` matches the
              intro's `mb-10` above the carousel so the gaps bracket it. */}
          {t.existing.outro && (
            <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 md:max-w-2xl lg:max-w-[52rem] mt-10">
              <p className={`${tileBodyText} max-w-3xl ${introInset}`}>{t.existing.outro}</p>
            </div>
          )}

          {/* Sub-section: App store review analysis. Heading + placeholder
              for now — drop the real copy into `appReviews` when ready. The
              larger top margin sets it off as a distinct research method. */}
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 md:max-w-2xl lg:max-w-[52rem] mt-16 sm:mt-20 lg:mt-24 mb-10">
            <h3 id="app-reviews" className={`text-h3 font-semibold text-fg-primary mb-8 sm:mb-10 lg:mb-11 scroll-mt-28 ${introInset}`}>{t.appReviews.header}</h3>
            <p className={`${tileBodyText} max-w-3xl ${introInset}`}>{t.appReviews.intro}</p>
          </div>

          <CardCarousel
            items={APP_STORE_REVIEWS}
            copy={t.appReviews}
            itemName={(r) => r.title}
            renderItem={(review, i) => <ReviewCard key={i} review={review} />}
          />

          {/* Sub-section: Key insights — synthesis of the research methods
              above (pains + existing solutions + app reviews) into the
              takeaways that drive the design. Numbered list with hairline
              dividers, matching the design-system panels' rule colour. */}
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 md:max-w-2xl lg:max-w-[52rem] mt-16 sm:mt-20 lg:mt-24">
            <h3 id="insights" className={`text-h3 font-semibold text-fg-primary mb-8 sm:mb-10 lg:mb-11 scroll-mt-28 ${introInset}`}>{t.insights.header}</h3>
            <ol className={introInset}>
              {t.insights.items.map((item, i) => (
                <li
                  key={i}
                  className={`flex items-baseline gap-5 sm:gap-6 py-6 sm:py-7 ${i > 0 ? 'border-t border-black/[0.08] dark:border-white/[0.10]' : ''}`}
                >
                  <span className="text-h3 font-semibold text-fg-muted tabular-nums leading-tight shrink-0 w-6 sm:w-7">{i + 1}</span>
                  <p className={`${tileBodyText} max-w-2xl`}>{item}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Problem statement — the distilled design challenge, stated after
              the research methods + key insights that lead to it. A dark plate
              with light text in both modes: `bg-z-1000` (#000) in light, and a
              softer elevated `bg-bg-subtle` (#404040) in dark so it stands out
              without the harsh near-white slab. Same content-column width as
              the sub-sections above. */}
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 md:max-w-2xl lg:max-w-[52rem] mt-16 sm:mt-20 lg:mt-24">
            <Tile bgClass="bg-z-1000 dark:bg-bg-subtle">
              <h3 id="ctx-problem" className="text-h3 font-semibold text-fg-on-dark-primary mb-3 scroll-mt-28">{t.context.eyebrows[2]}</h3>
              <p className="text-display-2 font-semibold text-fg-on-dark-secondary mt-3 mb-6">{t.context.problemStatement}</p>
            </Tile>
          </div>

          {/* Constraint — the iOS-first scoping decision that follows from the
              problem statement above; sits with it as a pair to close the
              define phase before Ideate. */}
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 md:max-w-2xl lg:max-w-[52rem] mt-6 sm:mt-7 lg:mt-8">
            <Tile>
              <TileEyebrow id="ctx-constraint">{t.context.constraintLabel}</TileEyebrow>
              <div className="mt-8 sm:mt-10 lg:mt-11 flex flex-col gap-6 sm:gap-7">
                <p className={`${tileBodyText} max-w-2xl`}>{t.context.constraint[0]}</p>
                <img
                  src={imgCanapIos26}
                  alt="iOS 26"
                  data-squircle
                  className="w-full max-w-[120px] lg:max-w-[140px] self-center rounded-radius-4"
                />
                <p className={`${tileBodyText} max-w-2xl`}>{t.context.constraint[1]}</p>
              </div>
            </Tile>
          </div>

          {/* Match the Context section's bottom breathing room (the `Section`
              component uses `pb-16/20/24`) so the gap below Research equals
              the gap below Context. */}
          <div className="pb-16 sm:pb-20 lg:pb-24" />
          </CollapseBody>
        </section>

        {/* ---------- IDEATE ---------------------------------------- */}
        {/* ---------- IDEATE ---------------------------------------- */}
        {/* Raw `<section>` (like Research) so the Design-principles carousel
            can break to full viewport while headings + copy stay in the
            narrow column. Sub-sections: Product principles (the guardrails)
            → Core features (what to build) → Design principles (how it looks
            and feels — distinct from the product principles above). */}
        <section
          id="ideate"
          aria-labelledby="ideate-heading"
          className="bg-bg-page"
        >
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 pt-8 sm:pt-10 lg:pt-12 pb-2 sm:pb-3 md:max-w-2xl lg:max-w-[52rem]">
            <SectionHeading c={ideateC} id="ideate" title={t.ideate.header} lang={lang} titleInset />
          </div>

          <CollapseBody id="ideate" c={ideateC}>
          {/* Sub-section: Product principles — the guardrails that shaped
              what to build. Numbered list (title + rationale), echoing the
              Key insights list. */}
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 md:max-w-2xl lg:max-w-[52rem]">
            <h3 id="product-principles" className={`text-h3 font-semibold text-fg-primary mb-8 sm:mb-10 lg:mb-11 scroll-mt-28 ${introInset}`}>{t.productPrinciples.header}</h3>
            <ol className={introInset}>
              {t.productPrinciples.items.map((p, i) => (
                <li
                  key={i}
                  className={`flex items-baseline gap-5 sm:gap-6 py-6 sm:py-7 ${i > 0 ? 'border-t border-black/[0.08] dark:border-white/[0.10]' : ''}`}
                >
                  <span className="text-h3 font-semibold text-fg-muted tabular-nums leading-tight shrink-0 w-6 sm:w-7">{i + 1}</span>
                  <div className="max-w-2xl">
                    <p className="text-copy-m font-semibold text-fg-primary mb-1.5">{p.title}</p>
                    <p className={tileBodyText}>{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Sub-section: Core features — the headline capabilities, as a
              card grid (distinct from the numbered Product principles above).
              Scales to any number of features. */}
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 md:max-w-2xl lg:max-w-[52rem] mt-16 sm:mt-20 lg:mt-24">
            <h3 id="core-features" className={`text-h3 font-semibold text-fg-primary mb-8 sm:mb-10 lg:mb-11 scroll-mt-28 ${introInset}`}>{t.coreFeatures.header}</h3>

            {/* Tablet / desktop (sm+): a 3-column grid. */}
            <div className="hidden sm:grid sm:grid-cols-3 gap-5 lg:gap-6">
              {t.coreFeatures.items.map((f, i) => (
                <FeatureCard key={i} f={f} />
              ))}
            </div>

            {/* Mobile: full-bleed snap carousel with the shared nav controls.
                Breaks out of the column so cards reach the screen edges. */}
            <div className="sm:hidden mx-[calc(50%-50vw)]">
              <CardCarousel
                items={t.coreFeatures.items}
                copy={t.coreFeatures.carousel}
                itemName={(f) => f.title}
                renderItem={(f, i) => (
                  <li key={i} className="shrink-0 w-[74vw] max-w-[320px] snap-center list-none">
                    <FeatureCard f={f} className="h-full" />
                  </li>
                )}
              />
            </div>
          </div>

          {/* Sub-section: Design principles — hidden for now. The look-and-feel
              guardrails carousel is kept in the codebase (PrinciplesCarousel +
              t.principles copy) but not rendered. Restore by un-commenting. */}
          {/*
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 md:max-w-2xl lg:max-w-[52rem] mt-16 sm:mt-20 lg:mt-24 mb-10">
            <h3 id="principles" className={`text-h3 font-semibold text-fg-primary mb-8 sm:mb-10 lg:mb-11 scroll-mt-28 ${introInset}`}>{t.principles.header}</h3>
            <p className={`text-copy-l text-fg-secondary max-w-3xl ${introInset}`}>{t.principles.intro}</p>
          </div>

          <PrinciplesCarousel items={t.principles.items} copy={t.principles} />
          */}

          <div className="pb-16 sm:pb-20 lg:pb-24" />
          </CollapseBody>
        </section>

        {/* ---------- DESIGN ---------------------------------------- */}
        {/* One block per design decision, each backed by its real iOS screen
            in a PhoneFrame (scrollable in place) and tagged with the HIG
            principle it proves. Phone alternates left/right for rhythm. The
            screens are real Figma exports; the closing block embeds the
            whole file so visitors can inspect it directly. */}
        <Section id="design" title={t.design.header} lang={lang} bgClass="bg-bg-page" titleInset>
          {/* Sub-section: Information architecture — the user at the centre of
              every tab. A horizontal snap carousel of the tab cards at every
              breakpoint (desktop included). First design beat, before the
              screen-by-screen walkthrough. */}
          <div id="information-architecture" className="scroll-mt-28 mb-12 sm:mb-14">
            <h3 className={`text-h3 font-semibold text-fg-primary mb-6 sm:mb-7 scroll-mt-28 ${introInset}`}>{t.design.iaHeader}</h3>

            {/* Full-bleed: the track breaks out of the reading column so cards
                scroll all the way to the screen edges. CardCarousel pads the
                first card to align with the column and carries the shared nav. */}
            <div className="mx-[calc(50%-50vw)]">
              <CardCarousel
                items={INFO_ARCHITECTURE}
                copy={t.design.iaCarousel}
                maxDots={3}
                itemName={(root) => root.name}
                renderItem={(root, i) => (
                  <li key={i} className="shrink-0 w-[82vw] sm:w-[340px] lg:w-[360px] snap-center list-none">
                    <IaCard root={root} className="h-full" />
                  </li>
                )}
              />
            </div>
          </div>

          {/* ---------- DESIGN SYSTEM (sub-section of Design) --------- */}
          {/* Foundations rendered live from the real iOS token values (see the
              DS_* specimen components) — not screenshots. Geist-style editorial
              layout: a category strip, then each foundation as a header + mono
              meta + a hairline "preview canvas" holding the live specimen. */}
          {/* Redesigned (Figma node 3511:16029): a single black panel (surface/
              base #000) holding the live foundations — palette, type role grid,
              surface ramp, icon set, radii, icon sizes, spacing — with the
              brand-yellow accent on the scale specimens. */}
          <div
            id="design-system"
            data-squircle
            className="scroll-mt-28 mt-16 sm:mt-20 lg:mt-24 rounded-radius-6 sm:rounded-radius-8 lg:rounded-radius-12 bg-black p-6 sm:p-12 lg:p-[60px]"
          >
            <h3 className="text-h3 font-semibold text-white mb-8 sm:mb-10 lg:mb-11 scroll-mt-28">{t.designSystem.header}</h3>
            <div className="text-copy-l text-white/70 max-w-3xl mb-10 sm:mb-12 space-y-6">{t.designSystem.intro}</div>
            <DesignSystemShowcase labels={t.designSystem.dsLabels} />
            {/* Closing aside about the specimens — fine-print and dimmer, at the
                end of the section (no longer a hanging-asterisk footnote). */}
            <p className="mt-10 sm:mt-12 max-w-3xl text-fine-print text-white/40">
              {t.designSystem.reducedNote}
            </p>
          </div>

          {/* Open-in-Figma button — secondary CTA as a pill (surface fill +
              hairline), Figma app icon leading, right-arrow trailing. Aligned
              to the right of the panel, on the page surface. */}
          <div className="mt-6 sm:mt-7 flex justify-end">
            <a
              href={figmaFileUrl('3527-12802')}
              target="_blank"
              rel="noreferrer noopener"
              data-spring
              className="inline-flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-full bg-blue-600 text-white font-semibold text-btn-m hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              {/* Icon sits on a matched #161616 plate (same as the app-icon's
                  own background) with padding, so the black bg reads larger
                  without scaling the glyph. */}
              <span className="inline-flex items-center justify-center rounded-full bg-[#161616] shadow-xs p-[3px]">
                <img src={imgFigmaAppIcon} alt="" width={20} height={20} className="rounded-radius-2" />
              </span>
              {t.designSystem.openFigma}
              <img
                src={imgArrowRight}
                alt=""
                width={16}
                height={16}
                className="ml-0.5 brightness-0 invert"
                draggable="false"
              />
            </a>
          </div>

          {/* Sub-section: User journey — the path to marking a title's status,
              then the five states it lands in. Responsive grid/stepper, no
              carousel. */}
          <div id="user-journey" className="scroll-mt-28 mt-16 sm:mt-20 lg:mt-24">
            <h3 className={`text-h3 font-semibold text-fg-primary mb-3 scroll-mt-28 ${introInset}`}>{t.design.journey.header}</h3>
            <p className={`text-copy-l text-fg-secondary mb-6 sm:mb-8 max-w-3xl ${introInset}`}>{t.design.journey.intro}</p>
            {/* No reading-column left inset here (unlike the header/intro): the
                Section already centres its content, so the diagram sits centred
                within the symmetric padding. On desktop (lg) it grows slightly
                into the gutter via symmetric negative margins (~48px each side,
                within the ~56px gutter) — still centred, just a touch larger. */}
            <div className="lg:-mx-12">
              <UserJourney copy={t.design.journey} isDark={isDark} lang={lang} />
            </div>
          </div>

          {/* Sub-section: Interaction model — the poster as the primary unit
              of information and action. Annotated poster + context sizing +
              action menu. Sits on a black showcase panel (the iOS app's own
              #141414) so the dark UI exports read true; all text is on-dark. */}
          <div
            id="interaction-model"
            data-squircle
            className="scroll-mt-28 mt-16 sm:mt-20 lg:mt-24 rounded-radius-6 sm:rounded-radius-8 lg:rounded-radius-12 bg-[#141414] p-6 sm:p-12 lg:p-[60px] pb-12 sm:pb-16 lg:pb-20"
          >
            <h3 className="text-h3 font-semibold text-white mb-3 scroll-mt-28">{t.design.interaction.header}</h3>
            <p className="text-copy-m text-white/70 mb-10 sm:mb-12 max-w-3xl">{t.design.interaction.intro}</p>
            <InteractionModel copy={t.design.interaction} />
          </div>

          {/* Sub-section: Sign-in flow — the 18-screen onboarding curated to a
              handful of decisive beats. On the page surface (theme-aware): a
              flow-map diagram, then a carousel of hero screens with the
              designer's own rationale per beat. */}
          <div id="onboarding-flow" className="scroll-mt-28 mt-16 sm:mt-20 lg:mt-24">
            <h3 className={`text-h3 font-semibold text-fg-primary mb-3 scroll-mt-28 ${introInset}`}>{t.design.signIn.header}</h3>
            <p className={`text-copy-l text-fg-secondary mb-8 sm:mb-10 max-w-3xl ${introInset}`}>{t.design.signIn.intro}</p>

            {/* Flow map — an overview of the onboarding before the detailed
                beats. Centred within the section (no left inset), growing
                slightly into the gutter on tablet and desktop via symmetric
                negative margins. The diagram itself is centred by the SVG's
                trimmed viewBox. */}
            <div className="mb-4 sm:mb-16 lg:mb-20 md:-mx-8 lg:-mx-12">
              <SignInFlowGraph isDark={isDark} lang={lang} />
            </div>

            {/* Full-bleed carousel of the five beats at every breakpoint. */}
            <SignInFlow copy={t.design.signIn} />
          </div>
        </Section>

        {/* ---------- PROCESS (Built with AI) ----------------------- */}
        {/* The differentiator: a designer directing an AI collaborator to a
            shipped, coherent result. Five numbered sections, each a tile with
            paragraphs, lead-in bullet lists, labelled sub-groups and the odd
            key-takeaway callout (see ProcessBlock). */}
        <Section id="process" title={t.process.header} lang={lang} bgClass="bg-gradient-to-b from-[#f6f6f6] to-white dark:from-[#1f1f1f] dark:to-[#141414]" titleInset>
          {/* Two paragraphs (split on the newline) rendered as separate <p>s
              with a normal gap, so the type matches every other section intro
              instead of the cramped single-line-height of whitespace-pre-line. */}
          <div className={`mb-10 sm:mb-12 max-w-3xl ${introInset}`}>
            {t.process.intro.split('\n').map((para, i) => (
              <p key={i} className={`text-copy-l text-fg-secondary ${i > 0 ? 'mt-4' : ''}`}>{para}</p>
            ))}
          </div>
          {/* Each beat as an alternating media + text row: a screenshot /
              prototype carries the story, the caption is a single line. Media
              slots are Placeholders until the real assets are dropped in
              (set `image` on each section). */}
          <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
            {t.process.sections.map((s, i) => (
              <div key={i} className="flex flex-col">
                {/* Left-aligned, stacked: title + description, then the visual
                    below — matching the other sub-sections on the page. */}
                <h3 id={s.id} className={`text-h3 font-semibold text-fg-primary mb-3 scroll-mt-28 ${introInset}`}>{s.title}</h3>
                <div className={`max-w-3xl ${s.carousel ? 'mb-10 sm:mb-14' : 'mb-6 sm:mb-8'} ${introInset}`}>
                  {s.caption.split('\n').map((para, j) => (
                    <p key={j} className={`text-copy-l text-fg-secondary ${j > 0 ? 'mt-4' : ''}`}>{para}</p>
                  ))}
                </div>
                {s.carousel === 'uxFlows' ? (
                  /* Full-bleed carousel (handles its own breakout) — not inside
                     the reading-column wrapper. */
                  <UxFlowsCarousel copy={t.process.uxFlows} />
                ) : s.carousel === 'iosBuild' ? (
                  <IosBuildCarousel copy={t.process.iosBuild} isDark={isDark} lang={lang} />
                ) : (
                  <div className={`max-w-3xl ${introInset}`}>
                    {s.diagram === 'techStack' ? (
                      <TechStackGraph isDark={isDark} lang={lang} />
                    ) : s.image ? (
                      <img src={s.image} alt={s.title} data-squircle className="w-full rounded-radius-4" />
                    ) : (
                      <Placeholder aspect="16/10" seed={i + 2} label={`${t.process.assetLabel} · ${s.title}`} />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* ---------- IMPACT ---------------------------------------- */}
        <Section
          id="impact"
          title={t.impact.header}
          lang={lang}
          bgClass="bg-gradient-to-b from-[#f6f6f6] to-white dark:from-[#1f1f1f] dark:to-[#141414]"
          titleInset
        >
          <div className="grid grid-cols-1 gap-6 sm:gap-7 lg:gap-8">
            <Tile bgClass="bg-bg-page">
              <TileEyebrow id="imp-outcome">{t.impact.outcome.eyebrow}</TileEyebrow>
              <div className="space-y-4">
                {t.impact.outcome.body.map((p, i) => (
                  <TileBody key={i}>{p}</TileBody>
                ))}
              </div>
            </Tile>
            <Tile>
              <TileEyebrow id="imp-next-steps">{t.impact.nextSteps.eyebrow}</TileEyebrow>
              <div className="space-y-4">
                {t.impact.nextSteps.body.map((p, i) => (
                  <TileBody key={i}>{p}</TileBody>
                ))}
              </div>
            </Tile>
          </div>
        </Section>

        {/* ---------- TOOLS ----------------------------------------- */}
        {/* Centered Tools row matching SalesPlatform + XR. The
            ToolsGrid card supplies its own border / radius / padding;
            this wrapper just gives it the page-level horizontal
            rhythm and vertical breathing room. */}
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 pt-16 sm:pt-20 pb-16 sm:pb-20 flex justify-center">
          <ToolsGrid lang={lang} />
        </div>

        {/* ---------- OUTRO ----------------------------------------- */}
        <div className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
            <Link
              to="/#case-studies"
              data-spring
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              <img
                src={imgArrowRight}
                alt=""
                width={16}
                height={16}
                className="brightness-0 invert"
                style={{ transform: 'rotate(180deg)' }}
                draggable="false"
              />
              {t.outro}
            </Link>
          </div>
        </div>
      </main>

      {/* ── Desktop secondary nav — fixed, visible once scrolled past hero ──
          The opacity fade lives on the inner <nav> (see SecondaryNav), NOT on
          this wrapper: an ancestor with opacity < 1 disables the nav's
          `backdrop-blur`, so fading the wrapper made the blur pop in at the
          end instead of easing in. The wrapper only handles position +
          interaction-blocking (`inert` / `pointer-events`). */}
      <div
        inert={scrolledDown && !atBottom ? undefined : true}
        className={`hidden min-[920px]:block fixed z-10 top-[240px] min-[920px]:right-[calc(50%_+_20.5rem)] lg:right-[calc(50%_+_25.5rem)] ${scrolledDown && !atBottom ? '' : 'pointer-events-none'}`}
      >
        <SecondaryNav sections={sections} activeId={activeId} activeSubId={activeSubId} onNavigate={handleNavigate} visible={scrolledDown && !atBottom} lang={lang} />
      </div>

      {/* Mobile floating secondary nav is deactivated on this page — the
          desktop nav (min-[920px]:block above) still shows on wide screens.
          `MobileSecondaryNav` is kept defined in case it's reinstated. */}

      <Footer lang={lang} />
    </>
  );
}

export default Canap;
