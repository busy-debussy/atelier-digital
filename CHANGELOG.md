# Changelog 

## [2.1.5] — 2026-04-14

### Hero chat limit, send button polish, cookie notice, CV CTA

#### Hero — message limit
- `MAX_HERO_TURNS = 6` — matches ChatBot panel limit
- "X messages remaining" counter appears from 2nd turn; urgent (warning colour) at 1 remaining
- At limit: centered limit message ("All caught up, drop me a line if you'd like to know more." / FR equivalent); input disabled; send button hidden
- Collapse button remains visible at limit

#### Hero — send button
- Idle state: ghost circle (border only, muted arrow) instead of filled grey — signals interactivity without looking broken
- Active state: filled solid as before

#### Hero — cookie notice
- "By using this chat you agree to the cookies policy" placed below input
- Space always reserved (no layout shift on CTAs); fades in on input focus, fades out on blur
- "cookies policy" link in `text-fg-primary`; 150ms blur delay to allow link clicks

#### Hero — CTAs
- "Interactive CV" secondary text link restored alongside "Case studies"
- `text-cta-600 dark:text-cta-400`, hover `text-cta-700 dark:text-cta-300`, `gap-8` between CTAs
- "Open full chat" button removed

## [2.1.4] — 2026-04-14

### Hero inline chat, floating button removal, nav & mobile polish

#### Hero — inline AI chat
- Replaced floating ChatBot button with inline chat input directly in the hero section
- Cycling placeholder phrases (EN/FR, 8 each) in shuffled order via Fisher-Yates; pure opacity crossfade animation (no Y movement)
- On first message: H1, H2, and skills card fade out; messages appear in their place (slot div pattern — input position never shifts)
- After first message: placeholder collapses to static "Ask Claude…"; cycling stops
- Collapse button (inverted colours, `esc` shortcut) appears inside input bar when chat is active; tooltip with kbd badge
- Input hover shadow/border only shown when idle and empty
- "Open full chat →" text link fades in below input after first exchange, fires `toggle-chat` event to open ChatBot panel
- Added `hero-surface-gradient` layer (`bg-surface` → `bg-page`) over hero background

#### Hero — CTAs
- Restored "Interactive CV" as secondary text link alongside "Case studies" primary button
- `text-cta-600 dark:text-cta-400` for correct contrast in both modes
- Gap between CTAs: `gap-8`
- Removed emoji from H1 heading

#### ChatBot
- Removed floating trigger button entirely (pill, idle timer, nudge logic, `forcedVisible`, `hideFloating`, `fadeFloating`)
- Panel remains accessible via keyboard shortcut and new hero "Open full chat →" link
- Removed unused L keys: `button`, `pill`, `rateLimited`

#### Nav
- Resume tooltip: `'view my CV'` → `'interactive CV'` (EN); `'voir mon CV'` → `'CV interactif'` (FR)

#### Mobile secondary nav (all pages)
- Removed circle backdrop div from secondary nav on all case study and legal pages
- Nav bar repositioned from `left-[68px]` → `left-4`, centred on screen

#### Home / ScrollForMore
- "Case studies" CTA on mobile now uses `scrollBy({ top: innerHeight * 1.0 })` — matches ScrollForMore behaviour
- "Back to case studies" buttons on SalesPlatform and XRExperiences use same `scrollBy` on mobile
- ScrollForMore tooltip delay removed (instant on hover)

## [2.1.3] — 2026-04-14

### Resume, Sales Platform, Collaborations, carousel & scroll fixes

#### Resume page
- Bio para 2: "digital twins, extended reality, web and mobile" → "in tools like Figma and in code"
- Bio para 2: "leading a design team" → "influencing a design team"
- Certification carousel (mobile): added dot indicators centred below the track, matching other carousel patterns
- Back-to-home chip: added `whitespace-nowrap` — prevents wrapping on French mobile
- Certification card name: fixed missing space between "UX" and "Designer" on mobile (inline `{' '}` before second `nameParts` segment)

#### Sales Platform page
- "My role" tile moved to after "Our team" tile in the Context section
- "Our team" para 1: trimmed to end at emoji — removed "The design team collaborated… all launches" sentence
- "Our team" para 1: added "and" before "distributed globally"

#### Collaborations component
- Added hint caption "Select a logo to learn more" (FR: "Sélectionnez un logo pour en savoir plus") between carousel track and dots
- Caption sits closer to the logos than the dots (`mt-1` above, `mt-4 sm:mt-5` below)
- Caption fades out permanently after first logo is selected (`hintDismissed` state)

#### CaseStudies component
- Reduced mobile gap between carousel and dot/nav row: `paddingBottom` 52px → 24px on mobile via reactive `carouselPb` state; nav `mt-4` → `mt-0` on mobile

#### ScrollForMore component
- Mobile scroll amount increased from `0.9 × vh` to `1.0 × vh` — clears the full-screen hero on the homepage

## [2.1.2] — 2026-04-14

### Storybook design system integration, hero fade-up animation

#### Hero intro animation (replaced typewriter)
- Dropped typewriter, caret, char-by-char subtitle, interval chains, grid-height trick, and 8 state variables
- Single `ready` boolean flipped on next paint; CSS `transition-delay` drives all stagger
- Sequence: H1 (0ms) → H2 (100ms) → card (200ms) → pills stagger (320–595ms) → buttons (500ms); total ~900ms

#### Storybook
- `preview.jsx`: wraps every story in `bg-bg-page text-fg-primary min-h-screen font-sans`; dark mode toggle maps to `.dark` on `<html>`; built-in backgrounds addon disabled
- `preview-head.html`: injects Inter font into Storybook's preview iframe
- `manager.js` + `theme.js`: custom manager theme (sidebar, toolbar, inputs) in light and dark variants using exact semantic token values; switches on OS preference
- `Configure.mdx`: replaced 389-line default boilerplate with design system landing page (token pipeline, dark mode architecture, writing stories guide, token groups table)
- `TokenCatalog.stories.jsx`: replaced hardcoded `#6b7280`/`#9ca3af` colours, `fontFamily` strings, and inline borders with token classes (`text-fg-secondary`, `text-fg-muted`, `font-sans`, `font-mono`, `border-border-subtle`, `bg-bg-page`, etc.)

## [2.1.1] — 2026-04-13

### Hero animation speed, file cleanup

#### Hero intro animation
- Cut total sequence from ~6s to ~3s — reduced `CARET_DELAY` (1000→400ms), `COMMA_PAUSE` (500→280ms), `CHAR_SPEED` (35→25ms), `AFTER_SUBTITLE` (500→80ms), `AFTER_H3_VISIBLE` (500→120ms), `AFTER_PILLS_DONE` (500→150ms)
- Pills now start appearing while the experience card is still fading in (overlapping stages feel more natural)

#### File cleanup
- Deleted root `CNAME` — duplicate of `public/CNAME` (Vite copies public/ to dist/ on build; root file was a GitHub Pages leftover)
- Removed Storybook scaffold stubs: `Button`, `Header`, `Page` (jsx + stories.js + css) — default templates never used by the app

## [2.1.0] — 2026-04-13

### Footer, carousels, hero, map tokens, legal chat, nav dimming

#### Footer nav redesign
- Hover rect now hugs text width — `block leading-[3rem]` → `inline-block leading-normal py-2`
- Hover state: added `hover:bg-nav-hover-bg px-3 -mx-3 rounded-radius-2` (background pill on hover)
- All list columns: `flex flex-col` → `flex flex-col gap-2`
- Arrow link items and Locked items: `flex` → `inline-flex` (preserves inline sizing alongside text)
- Contact column `<ul>`: `flex flex-col gap-2`
- `data-squircle` on manage-cookies button and internal nav links

#### Carousel blink fix (Contact + CaseStudies)
- Added `isProgrammaticScroll` ref — suppresses `handleScroll` for 600ms during smooth-scroll to prevent button state oscillation on press

#### Hero mobile emoji orphan fix
- Added `\u00a0` (non-breaking space) before emoji in all heading variants (EN + FR, morning/evening) — prevents emoji orphaning onto its own line at narrow widths

#### WorldMapDots — full color token migration
- `DEFAULT_COUNTRY_COLOR_MAP` and `DEFAULT_TEAM_DOTS`: all hardcoded hex → `var(--map-country-*)`
- `dotRestFill`: `isDark ? '#404040' : '#d4d4d4'` → `var(--map-dot-rest)` (live CSS var, no JS dark check)
- `labelColor`: `isDark ? '#fafafa' : '#1f1f1f'` → `var(--fg-primary)`
- Timezone label fills: `isDark` ternaries → `var(--tooltip-fg)` / `var(--tooltip-bg)`
- Mobile/tablet legend breakpoint: `md:hidden` → `lg:hidden`
- Desktop legend: grid+flex hybrid → pure `flex` with `desktopCol` property for column stacking
- Legend filter buttons: added `cursor-pointer`

#### Design tokens — map country colors (`semantic.css`)
- `--map-dot-rest`: `#d4d4d4` → `#e8e8e8` light, `#404040` → `#2a2a2a` dark (less contrast vs land)
- Added `--map-country-scotland/england/uae/vietnam/purple/pink/indigo/pistachio/red`:
  - Light mode: midpoint values (visible on white without being heavy)
  - Dark mode: palette-fg-dark bright values (visible on dark backgrounds)

#### SalesPlatform — map tokens + layout
- `SP_COUNTRY_COLOR_MAP` and `SP_TEAM_DOTS`: all colors → `var(--map-country-*)` tokens
- `SP_LEGEND_GROUPS`: added `desktopCol` to stack Dev+QA and Marketing+Management into shared columns
- Map section: wrapped in `max-w-2xl mx-auto` to match XR page proportions
- `data-squircle` on Tile, ToolsGrid, tool tooltip divs
- Hero section: swipe gesture (60px threshold) dispatches `cycle-project` for mobile project switching
- Minor stat label text tweaks (shorter copy)

#### XR Experiences
- Hero section: same swipe-to-cycle gesture as SalesPlatform
- `data-squircle` on XRToolsSection and tool tooltip divs

#### Legal pages — chat button parity (Privacy, Cookies, Terms)
- Replaced no-op `secondary-nav-change` effect with `chat-force-visible` dispatch — chat button now appears on mobile whenever the secondary nav is visible, matching case study page behavior

#### Nav — mobile menu dimming
- Mobile menu overlay: added `bg-bg-glass-default` (`rgba(0,0,0,0.64)`) + `animate-[fade-in_200ms_ease-out_both]` — page content dims when menu opens

#### ChatBot — idle nudge system
- Floating button now only appears after 3s idle + 200px scroll (one-time nudge per session)
- Auto-dismisses after 6s; overridden by `chat-force-visible` events from case study / legal pages
- `data-squircle` on message bubbles, loading indicator, textarea, send button

#### Contact modal (Nav)
- Row hover: restructured with inner rounded wrapper + squircle for tighter hover highlight
- vCard download button: hover now inverts (white bg, dark text, white border)
- `data-squircle` on vCard button

## [2.0.7] — 2026-04-13

### Token migration — glass borders, chip surfaces, contact modal polish

#### Border-glass Tailwind v4 fix
- **Root cause** — Tailwind v4 wraps CSS vars in `rgb(var(--x) / opacity)` which corrupts rgba values stored in CSS custom properties, rendering borders as solid black
- **Fix** — `@layer utilities` in `index.css` defines `border-glass-subtle/medium/default` and `border-inverted-subtle` directly (bypassing Tailwind's color system); matching `TAILWIND_EXCLUDED` set in `generate-tailwind-config.mjs` prevents double-registration

#### Glass borders applied (now correct)
- **Nav dropdowns** (Projects + Language) — `border-black/[0.16] dark:border-white/[0.16]` → `border-glass-default`
- **Mobile menu panel** — same
- **Contact glass cards** — same
- **Hero experience card** — `border-black/[0.06] dark:border-white/[0.06]` → `border-glass-subtle`; hover `border-black/[0.16] dark:border-white/[0.16]` → `hover:border-border-subtle`
- **WorldMapDots filter pills** (both render blocks) — `border-black/[0.08] dark:border-white/[0.08]` → `border-glass-subtle`

#### CaseStudies chip and overlay tokens
- **Primary chip bg** — `bg-white/[0.16]` → `bg-chip-bg-primary`
- **Secondary chips bg** — `bg-black/[0.32]` → `bg-chip-bg-secondary`
- **Lock icon container** — `bg-white/[0.24]` → `bg-chip-bg-primary`
- **Restricted overlay** — `bg-black/[0.82]` → `bg-bg-glass-heavy`

#### Contact modal polish
- **Drawer row hover** — `hover:bg-white/[0.04] dark:hover:bg-black/[0.04]` → `hover:bg-inverted-subtle`
- **Email copy chip** — redesigned: `bg-inverted-subtle border border-inverted-subtle`; hover inverts to `bg-fg-primary-inverse text-fg-primary border-transparent`
- **vCard download hover** — `hover:bg-white/[0.06] dark:hover:bg-black/[0.04]` → `hover:bg-inverted-subtle`

## [2.0.6] — 2026-04-13

### Token migration — inverted surfaces, opacity text, map pills, cleanup

#### New tokens
- **`bg-inverted-subtle`** / **`border-inverted-subtle`** — created in Figma and wired through `generate-tokens.mjs`; `bg`: white/6% light, black/4% dark; `border`: white/6% light, black/6% dark; applied to ChatBot bubble bg, input bg, and separator border
- **`border-glass-*` fix** — `default/medium/subtle` light mode values were white opacity (wrong); corrected to black opacity in `generate-tokens.mjs`; dark mode values also corrected
- **`fg-on-dark-opacity-64` fix** — token value was `TW/900` (90%); corrected to `TW/800` (64%); applied to map axis labels and carousel counters across SalesPlatform and XRExperiences

#### WorldMapDots filter pills
- Rest state — removed background, added `border-black/[0.08] dark:border-white/[0.08]`
- Hover — `bg-nav-hover-bg`
- Selected — `bg-bg-surface-inverted` with `text-fg-primary-inverse` on label span
- Label text — conditional `text-fg-muted` at rest / `text-fg-primary-inverse` when selected

#### Other cleanup
- **SalesPlatform stakeholders callout** — `border-black/[0.06] dark:border-white/[0.08]` → `border-feedback-neutral-border`
- **CookieBanner** — removed panel border and button borders (shadow + contrast sufficient)
- **NotFound watermark** — `text-black/[0.04] dark:text-white/[0.04]` → `text-nav-active-bg`

## [2.0.5] — 2026-04-13

### Token migration — font sizes, glass surfaces, nav hover

#### Font sizes
- **`text-tag-s`** — Hero.jsx pill labels `text-[10px] sm:text-[14px] lg:text-[15px]` → `text-tag-s` (exact match)
- **`text-tag-m`** — XR TeamTable role label `text-[15px] sm:text-[16px]` → `text-tag-m`; XR section h2 `text-[28px] sm:text-[34px] lg:text-[40px]` → `text-h2`; Cookies CTA `text-copy-s sm:text-[15px]` → `text-tag-m`
- **`text-tooltip`** — WorldMapDots map tooltip `text-[11px]` → `text-tooltip`
- **`text-tooltip-kbd`** — new token `font-size/ui/tooltip-kbd` (11px fixed, all breakpoints); applied to kbd shortcut badges in Nav and ChatBot
- **Resume icon fallback** — removed dev placeholder `<span>icon</span>` entirely; `card.icon && <img>` pattern used instead

#### `tooltip-kbd` token infrastructure
- `tokens.json` — new entry `font-size/ui/tooltip-kbd` (11/11/11px) added to type-primitives snapshot
- `generate-tokens.mjs` — added to hardcoded fallback snapshot (all 3 breakpoints); FIGMA_RENAMES table fully rebuilt for April 2026 restructure: `font-size/` → `size/`, spaces removed, sub-groups added (`size/ui/btn/M`, `size/ui/tooltip/txt`, `size/ui/tooltip/kbd`, etc.)
- `generate-tailwind-config.mjs` — `tooltip-kbd` shorthand alias added

#### Glass surface tokens
- **`bg-nav-bg`** — replaces `bg-white/[0.64] dark:bg-black/[0.64]` across Nav (bar, dropdowns), Contact (glass card), Cookies, Privacy, Terms, SalesPlatform, XRExperiences (sidebar navs + scroll pills)
- **`bg-nav-mobile`** — replaces `bg-white/90 dark:bg-black/90` on mobile menu panel
- **`ring-nav-ring`** — replaces `dark:ring-1 dark:ring-white/[0.16]` across all nav bars and sidebar navs; ring is transparent in light, white/16 in dark
- **`border-glass-default`** — nav dropdowns and Contact glass card; `border-black/[0.16] dark:border-white/[0.16]` → `border-glass-default`
- **`semantic.css` fixes** — `border-glass-default/medium/subtle` light mode corrected (was white opacity, now black opacity); dark mode `medium/subtle` corrected (was black, now white)

#### Nav hover fix
- `Nav.jsx` lines 221 and 404 — Case Studies trigger and nav link hover `dark:hover:bg-white/[0.04]` (4%) → `hover:bg-nav-hover-bg` (8%), matching Let's Talk button

## [2.0.4] — 2026-04-13

### Figma Variables sync infrastructure — `generate-tokens.mjs`
- **MCP-based sync** — variables fetched from Figma via Plugin API (MCP); hardcoded snapshot verified and confirmed accurate against current Figma state
- **REST API path built** — `GET /v1/files/:key/variables/local` wired up with graceful fallback; blocked on `file_variables:read` scope (Figma Pro PAT limitation, not available in UI)
- **Merge strategy** — Figma values override matching hardcoded keys; snapshot is the fallback when fetch fails or creds are absent
- **Env wiring** — `FIGMA_TOKEN` and `FIGMA_FILE_KEY` loaded automatically from `.env.local`
- **FIGMA_RENAMES table** — maps Figma's renamed variables back to canonical token names; populated with all April 2026 renames: `btn-M/S`, `card-M`, `tag-M/S`, `nav-L/M/S`, `chip-S/XS` (spaces → hyphens)
- **Layout collection parser** — strips `spacing/`, `radius/`, `blur/` group prefixes from the `layout` collection; `blur/blur-N` variables parsed and available
- **Sync workflow** — say "sync from Figma" to pull latest values via MCP; changes committed as a diff for full auditability

## [2.0.3] — 2026-04-13

### Token migration — eliminate all hardcoded hex colors
- **`border-accent-border`** — `border-[#5289f2]` replaced across 8 files (CTA button borders)
- **Carousel dot tokens** — `bg-fg-dot-edge`, `bg-fg-dot-rest`, `bg-fg-dot-hover`, `bg-fg-dot-active` applied across 5 components; `fg/dot/hover` corrected from TB.800 (0.64) to TB.900 (0.9)
- **Contact nav buttons** — rest → `bg-btn-nav-bg-rest-subtle`; hover → `bg-btn-nav-bg-hover`; inactive bg → `bg-btn-nav-bg-inactive`; inactive chevron → `group-disabled:opacity-20`
- **Inverted frosted surfaces** — Resume back-to-home pill and CookieBanner panel → `bg-tooltip-bg/90` and `bg-tooltip-bg/95`
- **CookieBanner** — muted text → `text-fg-muted-inverse`; light hover → `hover:bg-btn-bg-over`; dark hover → `dark:hover:bg-btn-nav-bg-rest-subtle`; focus ring → `ring-border-focus`
- **ChatBot** — close button dark hover → `dark:hover:bg-bg-surface`; disclaimer → `text-fg-primary-inverse/40`
- **WorldMapDots tooltip** — `bg-tooltip-bg text-fg-primary-inverse` (matches all other tooltips)
- **CaseStudies** — on-dark restricted copy → `text-fg-on-dark-secondary`
- **XR Experiences** — goal callouts → `feedback/success` tokens; insight callouts → `feedback/warning` tokens; Xbox figure → `dark bg-bg-page`
- **Collaborations** — logo hover dark → `sm:dark:hover:bg-bg-surface`
- **Contact** — muted body copy → `text-fg-secondary`

## [2.0.2] — 2026-04-13

### Storybook — token catalog
- **CSS import** — `index.css` imported in `preview.jsx` so all tokens and Tailwind classes resolve in Storybook
- **Light/dark toggle** — toolbar switch adds/removes `.dark` class on `html`; all semantic tokens switch correctly
- **Token catalog stories** — three stories under Design Tokens/Catalog: Colors (primitive palettes + all semantic swatches), Typography (all size aliases with resolved px values), Spacing/Radius/Shadows

## [2.0.1] — 2026-04-12

### Hotfix — short font-size aliases lost on token regeneration
- **Root cause** — `generate-tailwind-config.mjs` overwrites `tailwind.config.js` on every `npm run tokens`; short aliases added manually to the output file were wiped before the v2.0.0 deploy
- **Fix** — short aliases moved into `generate-tailwind-config.mjs` so they survive every regeneration
- **Aliases** — `text-h1` through `text-h6`, `text-display-1/2`, `text-copy-*`, `text-btn-*`, `text-nav-*`, `text-tag-*`, `text-chip-*`, `text-tooltip`, `text-caption`, `text-brand-logo` (30 aliases total)

## [2.0.0] — 2026-04-12

### Design token system — full site migration
- **Semantic color tokens** — all hardcoded hex values replaced with `fg-*`, `bg-*`, `border-*`, `cta-*`, and `tooltip-*` tokens across all 19 components and pages; remaining hardcoded values are documented exceptions (opacity variants, intentional DS gaps, always-dark XR sections)
- **Typography short aliases** — `text-font-size-headings-display-h1` → `text-display-1`, `text-font-size-copy-copy-m` → `text-copy-m`, etc.; full short alias set added to `tailwind.config.js`, long-form names removed
- **Border radius scale** — `rounded-[Npx]` replaced with `rounded-radius-N` tokens (radius-half=2px through radius-full=9999px) across all files; `radius-half` added to `generate-tokens.mjs`
- **Shadow scale** — `shadow-[...]` replaced with `shadow-xs/s/m/l` tokens; `shadows.css` created as hand-maintained file for effect style tokens (not exportable as Figma variables); `shadow-s-dark` added for dark-mode white-tint variant
- **Button nav tokens** — `bg-[#f6f6f6] dark:bg-[#262626]` carousel/nav button rest state → `bg-btn-nav-bg-rest`; hover → `bg-btn-nav-bg-hover`; white/dark variant → `bg-btn-nav-bg-rest-subtle`
- **Inverted surface tokens** — `bg-[#1f1f1f] dark:bg-[#fafafa]` solid panels → `bg-tooltip-bg`; nav active states → `bg-nav-active-bg-solid`; carousel dot active → `bg-fg-dot-active`; kbd badges → `bg-tooltip-keyboard-shortcut-bg / text-tooltip-keyboard-shortcut-fg`
- **Divider tokens** — `bg-[#d4d4d4] dark:bg-[#404040]` → `bg-border-subtle`; inverted divider → `bg-border-subtle-inverted`
- **Typography breakpoints fixed** — token CSS and style-dictionary config updated from 768px/1280px to 640px/1024px to match site's Tailwind `sm:`/`lg:` breakpoints
- **`shadows.css`** — new hand-maintained token file imported in `index.css`; holds shadow effect style vars and any tokens not yet in Figma export pipeline

---

## [1.5.11] — 2026-04-09

### Sales Platform — world map tooltip positioning
- **Selection-aware offsets** — `SP_TOOLTIP_OFFSETS` converted from a static object to a function `(selected) => offsets`, allowing tooltip positions to vary by active pill; `WorldMapDots` updated to accept either format
- **Developer / Marketing** — England tooltip pushed below its dot (`y: 40`) when Scotland + England are both visible
- **Project Manager** — Cyprus tooltip pushed below its dot (`y: 40`, centred) when England + Cyprus are both visible; England tooltip remains above
- **QA Testers** — Indonesia tooltip pushed below its dot (`y: 40`) when Indonesia + Thailand are both visible

---

## [1.5.10] — 2026-04-09

### WorldMapDots — legend pill interactions (XR & Sales Platform)
- **Immediate dimming on first click** — root cause was CSS inside SVG `<style>` not applying in Chrome for innerHTML-injected SVGs; fixed by generating a document-level `<style>` element driven by a React-managed `data-ca` prop on the container div, so the CSS and attribute land atomically during React's commit phase before paint
- **Click-outside deselect** — switched from `click` to capture-phase `pointerdown` on `document`; fires reliably on iOS Safari where `click` does not propagate on non-interactive elements
- **Legend whitespace deselects** — refined the capture handler to only skip deselection when the target is inside a `<button>` within the legend; heading text and gaps now correctly deselect

### Mobile secondary nav — hide on scroll down
- **XR Experiences, Sales Platform, Privacy, Cookies, Terms** — floating secondary nav and its chat-button backdrop now hide while scrolling down and reappear on scroll up (mobile only, `< 768px`)
- **`nav-scroll-start` event** — dispatched when a nav item is tapped; suppresses hide logic in both the local scroll listener and the global header scroll listener for 1.5 s, preventing the nav from flashing away during programmatic scroll-to-section

### Global header — nav-scroll suppression
- **`App.jsx`** — listens for `nav-scroll-start` and freezes `scrolledDown` state for 1.5 s so the header doesn't auto-hide during section jumps triggered by the secondary nav

### Sales Platform — Cyprus tooltip
- **Offset fix** — Cyprus tooltip nudged `x: +80, y: −12` to prevent overlap with the England tooltip when "Project Manager" is selected on the team map

### Resume — back-to-homepage chip
- **Responsive label** — "Back to home" on mobile (`< sm`), "Back to homepage" on desktop

### Cookie banner — mobile position
- **Raised on mobile** — banner now sits at `bottom-[60px]` on small screens (above bottom nav area) instead of `bottom-4`

### Figma integration
- **Capture script** — `mcp.figma.com` capture script added to `index.html` for MCP Figma design capture workflow

---

## [1.5.9] — 2026-04-08

### Nav — press effects
- **`data-spring` added** to résumé link, language button, and case studies button

### Nav — résumé button tooltip & shortcut
- **Tooltip** shows "back to top" / "retour en haut" when already on the résumé page; otherwise "view my CV"
- **`R` shortcut** scrolls to top when on the résumé page; navigates there otherwise

### Chat AI button
- **Hover inverts colours** — bg and text flip on hover; scale-up on hover removed
- **Hides on scroll down** — fades to opacity 0 (no position change) when scrolling down past 80 px; reappears on scroll up
- **Tooltip added** — "Chat with Claude" / "Tchat avec Claude" with `C` keyboard shortcut badge

### Collaborations — logos
- **Desktop hover state** — card background, border and rounded corners appear on hover to signal clickability (matches existing mobile card style)

### ScrollForMore button
- **Press effect** — `data-spring` wrapper added; resolves conflict with `animate-bounce` by applying spring to a parent div

### Back-to-homepage chip
- **Hover inverts colours** on both the chip link and the close button

### Sales Platform — world map legend
- **"Quality Assurance" → "QA"** in the team legend heading (EN)

### Sales Platform — mobile secondary nav
- **Hides on scroll down** — mobile floating nav (and chat backdrop) fade out while scrolling down; reappear on scroll up; desktop nav unaffected

---

## [1.5.8] — 2026-04-08

### Resume — Back-to-homepage chip
- **New chip** — appears at `bottom-4` (centred) when arriving from the "experienced in" pills (`?from=home`); `h-9` matches chat button height
- **Visibility logic** — hides when `scrollY ≤ 80` (avoids overlap with ScrollForMore), when the footer enters the viewport, or on manual dismiss; scroll listener delayed 1.2 s to avoid the initial anchor scroll triggering hide
- **Fade only** — opacity transition in place, no Y movement on hide/show
- **Close button** — matches chip styling; larger × icon; inverts colours on hover; `data-spring` press effect
- **`pointer-events` fix** — removed always-present `pointer-events-none` base class; mutually exclusive with `pointer-events-auto`
- **`#experience` scroll** — `scroll-mt-0` so arrival scrolls as far down as possible

### Hero
- **"Experienced in" link** — updated to `/resume?from=home#experience` to trigger the back-to-home chip

### Nav — Dark mode toggle
- **Hover fix** — hover in dark mode now lightens (`#262626 → #383838`) instead of darkening to black
- **Press ripple** — semi-transparent grey circle (`rgba(128,128,128,0.1)`) centred on the knob; starts at knob size (hidden behind it), expands to `scale(1.7)` with spring bounce (`cubic-bezier(0.34,1.56,0.64,1)`) on press, contracts on release
- **Toggle on release** — dark mode now switches on `pointerUp` instead of `onClick`

### Nav — Typo fix
- `'digital twin'` → `'digital twins'` in both EN and FR case-studies menu

### Sales Platform — minor fixes
- FR label: `'QA Testers'` → `'Testeurs'`
- Duplicate `aria-label` removed from CGI concepts and wireframes carousels (attribute moved to correct element)
- Stray `aria-label` removed from high-fidelity mock-ups carousel

---

## [1.5.7] — 2026-04-08

### Shared component — WorldMapDots
- **Extracted to `src/components/WorldMapDots.jsx`** — moved from XRExperiences.jsx into a shared component; accepts `teamDots`, `legendGroups`, `countryColorMap`, `translations`, `dotIdMap`, and `tooltipOffsets` as props with XR defaults
- **Multi-country pills** — dots now support `countries: string[]` in addition to `country: string`; clicking a multi-country pill highlights all matching dots on the map simultaneously
- **`dotIdMap` prop** — pins a country to a specific SVG circle ID, enabling single-dot display for countries with multiple circles (Australia, Brazil, Indonesia, Thailand, Cyprus)
- **`tooltipOffsets` prop** — per-country x/y nudge to prevent overlapping tooltips (e.g. England/Scotland)
- **Pill key fix** — pill keys and selection state now use `label-primaryCountry` composite to avoid React key conflicts when multiple pills share a label

### Sales Platform — Our Team tile
- **World map added** — team distribution map with legend rendered inside the Our Team tile
- **SP-specific team data** — custom `SP_TEAM_DOTS`, `SP_LEGEND_GROUPS`, `SP_COUNTRY_COLOR_MAP`, `SP_LEGEND_T`, `SP_DOT_ID_MAP`, `SP_TOOLTIP_OFFSETS`
- **Legend groups** — Design (UX/UI · Interaction · Visual), Studio (Creative Team · 3D Artists), Engineering, QA, Marketing, Management
- **Design** — UX/UI across Scotland/India/Australia; Interaction in Malaysia; Visual in Scotland
- **Studio** — Creative Team (Scotland); 3D Artists single pill covering Portugal, Brazil, Nigeria (all same colour)
- **Engineering** — Developer pill covering Scotland and England
- **Quality Assurance** — QA Testers pill covering Indonesia and Thailand
- **Marketing** — pill covering England and Scotland
- **Management** — Project Manager covering England and Cyprus; Product Manager in UAE
- **Team description** — updated to "Fully remote, with the flexibility to work from anywhere, distributed globally"

### Sales Platform — Tools Used
- **Moved to bottom of page** — tools section removed from context tiles and placed before the outro, matching XR pattern; centered with `flex justify-center`
- **Category layout** — flat grid replaced with labelled category groups (Design · Development · Production · Project Management); per-icon `useState` replacing shared `activeName` state
- **Our Team tile** — now full-width; Tools Used tile removed from the two-column grid
- **Container** — `rounded-3xl`, `sm:w-fit`, gradient bottom on impact section fades to white

### Sales Platform — tool icons
- **`zoom` prop** — replaces old `contain` boolean; applies `scale()` transform to zoom past baked-in padding (Teams `1.5×`, Unity `65%` contain)
- **`contain` prop** — now accepts a size string (e.g. `w-[75%] h-[75%]`) for object-contain icons

### XR Experiences — section 1 (Team)
- **"My role"** — UX Contribution callout removed; paragraph rewritten: "As the sole UX/UI designer, I led the design strategy for this high-profile project…" (EN + FR)
- **h3 spacing** — `mt-4` added before all `type: 'h3'` body items

### XR Experiences — Tools Used
- **Unity icon** — `logo-unity.webp` imported; replaces text fallback; `contain: 'w-[65%] h-[65%]'`
- **Microsoft Teams icon** — `logo-microsoft-teams.webp` imported; `zoom: 1.5` to fill container
- **Container** — `rounded-3xl`; moved inside the main content column with `flex justify-center`; `gap-5` between icons

---

## [1.5.6] — 2026-04-08

### Sales Platform — secondary navigation
- **Desktop fixed nav** — sticky side nav (visible at `xl:` breakpoint+) appears once scrolled past the hero; fades out at the bottom of the page; same show/hide logic as mobile
- **Mobile floating nav** — pill strip floats above the chat button when scrolling through sections; auto-scrolls active item into view
- **Chat button backdrop** — frosted circle behind the chat button when the mobile nav is visible, matching XR pattern
- **IntersectionObserver** — tracks active section with `rootMargin: '-10% 0px -70% 0px'`; scroll-lock prevents race condition on programmatic navigation

### Sales Platform — content updates
- **Outcome** — rewritten: leads with 48-hour sell-out + 20% YoY / £6.8B, followed by team coordination paragraph (EN + FR)
- **Retrospective** — replaced with three focused paragraphs: early alignment, trade-offs/iterative approach, stakeholder communication (EN + FR)
- **Tile 2 (industry)** — titles realigned left (removed `text-right`); body rewritten to "The client needed a platform to support growth and scale globally…" (EN + FR)
- **Mission** — "allows buyers to explore" → "lets buyers explore"; removed "from a global overview down to detailed interiors" (EN + FR)
- **Stakeholders** — ", marketing." → "and marketing" (EN + FR)
- **Market** — first three paragraphs replaced with concise competitor analysis + vision statement; Key Design Prerequisites kept (EN + FR)
- **Design Principle** — condensed to "Layered, progressive flow lets users explore at their own pace while supporting future global expansion." (EN + FR)
- **Retrospective** — "Despite the fast-paced nature…" → "The team's agility and collaboration ensured we met tight deadlines." (EN + FR)
- **3D exploration** — "Large 3D datasets took several minutes to load, creating a lag for users." → "Large 3D datasets caused multi-minute load times." (EN + FR)
- **Incremental iterations** — "ensuring continuous improvements without delaying the initial launch" → "enabling continuous improvement without delaying launch" (EN + FR)

### Accessibility
- **WCAG empty list item** — added `filter(Boolean)` guard on `card.bullets.map` in hifi mock-up cards

---

## [1.5.5] — 2026-04-07

### XR Experiences — content rewrite (EN + FR)
- **Tagline** — shortened to "The architecture of engagement" (removed "A global unveiling.")
- **Team section** — tightened copy; sprint cadence list condensed to four focused bullets; closing paragraph replaced with a UX Contribution callout (Figma / Confluence / Jira)
- **Why section** — condensed to one paragraph + blue goal callout ("Ensure every visitor leaves convinced…")
- **Who section** — merged four paragraphs into two; UX Insight callout added on audience flex design
- **When & Where section** — condensed from three paragraphs to two; Spatial UX Consideration callout added
- **What section** — body condensed to one sentence; prose UX contribution replaced with a `footerCallout` beneath the experience cards
- **Prioritise section** — heading: "What made the cut and why" → "Decision-making under constraints"; prose condensed; UX Insight callout added
- **Solve section** — heading: "Form follows constraint." → "Form follows constraint"; five long paragraphs replaced with structured lists (per-experience constraints, design strategies, interaction patterns, Approaches, Key decisions); UX Contribution callout added
- **Measure section** — heading: "Iterating live, under pressure" → "Iterating live under pressure"; verbose narrative condensed to tighter prose
- **FR sections** — fully updated to match EN structure across all sections
- **Callout variants** — amber for UX Contribution/Insight, blue (`variant: 'goal'`) for project goals

### XR Experiences — mobile map fix
- **Legend pill interaction** — `onMouseEnter`/`onMouseLeave` replaced with `onPointerEnter`/`onPointerLeave` guarded by `pointerType !== 'touch'`; on mobile, tapping a pill now correctly shows only the country dot + tooltip without also triggering the timezone column highlight

### Contact modal ("Let's Talk")
- **Close button** — delayed fade-in on open (`fade-in 0.3s ease 0.25s both`) so it appears after the panel has settled
- **Email copy pill** — restyled from `rounded-lg` to `rounded-full` with wider padding and a persistent subtle background; reads clearly as a distinct pill at rest

### Sales Platform
- **Hero title** — "A luxury off-plan sales platform" → "Luxury off-plan sales platform"
- **Define challenge** — body text rephrased for clarity and rewrapped as JSX

### AI Chat
- **Cookie notice** — "agree to our cookies policy" → "agree to the cookies policy"

---

## [1.5.4] — 2026-04-06

### Contact modal ("Let's Talk")
- **Portrait, email, LinkedIn, location, vCard** — new modal accessible via the "Let's Talk" nav button or `T` keyboard shortcut; replaces the previous scroll-to-section behaviour
- **Email row** — tapping the row opens a mailto; a copy button alongside shows a checkmark + "Copied!" confirmation
- **LinkedIn row** — opens `linkedin.com/in/davidviallard` in a new tab; displays "David V." (no full last name in the UI); icon inverts correctly in dark mode
- **Location row** — links to Google Maps coordinates (Edinburgh)
- **Save contact** — downloads `david-v.vcf`; vCard 3.0 with embedded base64 portrait photo
- **Modal centering** — uses `fixed inset-0 flex items-center justify-center` on the wrapper to avoid transform conflicts with the `modal-card-in` CSS animation
- **WCAG compliance** — `inert` set on `#root` when modal is open (covers full React app while the portal outside `#root` stays accessible); `aria-hidden` alone was insufficient and has been removed
- **`T` to toggle** — pressing T again while the modal is open closes it (toggle behaviour via CustomEvent listener)

### GA4 analytics events
- **`chat_open`** — fired when the AI chat panel is opened
- **`scroll_for_more`** — fired when the scroll indicator button is clicked
- **`dark_mode_toggle`** — fired on `D` keyboard shortcut
- **`language_toggle`** — fired on `L`/`F` keyboard shortcut, includes `{ language }` param
- **`keyboard_shortcut`** — fired for H, R, C, P, T shortcuts with `{ key }` param
- **`vcard_download`** — fired when the Save Contact link is clicked in the modal
- **`contact_email_click`** — fired when the email row in the modal is clicked
- **`contact_linkedin_click`** — fired when the LinkedIn row in the modal is clicked
- **`cookie_consent`** — fired on Accept or Decline with `{ choice: 'accepted'/'rejected' }`
- **`case_study_view`** — fired on mount of SalesPlatform and XRExperiences with `{ study }` param
- **`404_error`** — fired on mount of the NotFound page with `{ path }` param

### XR Experiences — timezone map (mobile)
- **Tap to show timezone** — touching the map immediately highlights the timezone at the tap position (previously only recorded coordinates without updating state)
- **Slide to scrub** — sliding horizontally after a tap changes the timezone in real time
- **`touch-action: pan-y`** — added to the map element so the browser handles vertical scroll natively without competing with the JS touch handler; simplified `touchmove` to always update (direction detection loop removed); all touch listeners are now passive

### Accessibility (WCAG 2.2)
- **Empty list items resolved** — footer legal dividers (`Privacy · Cookies · Terms`) folded into adjacent `<li>` elements as inline `<div aria-hidden>` bars; carousel trailing spacers replaced with `paddingRight` on the scroll container; Nav desktop divider folded into the language button's `<li>`
- **Footer build error fixed** — unclosed `<span>` in `ObfuscatedEmail` component removed

---

## [1.5.3] — 2026-04-06

### Terminology & URLs
- **"Case studies" everywhere** — renamed from "projects" across all nav labels, footer sitemap, tooltips, and page copy (EN and FR); consistent with how the work is described throughout the site
- **URL scheme** — routes changed from `/projects/sales-platform` and `/projects/xr` to `/case-study/sales-platform` and `/case-study/xr`; asset folder renamed `assets/projects/` → `assets/case-study/` to match

### Navigation
- **Case studies tooltip** — projects button tooltip updated to "browse case studies"; `P` shortcut badge added to tooltip (was missing)

### Chat
- **Cookie notice** — subtitle added below chat header: "By using this chat you agree to our cookies policy" with a link to `/cookies`; bilingual
- **Tooltip shortcut badge** — `C` shortcut hint in the floating button tooltip now renders as a `<kbd>` badge (dark grey background, rounded) matching the style used in all Nav tooltips

### Policy pages (Privacy · Cookies · Terms)
- **Secondary nav active-state bug fix** — clicking a section in the secondary nav could switch the active highlight to a different section once scrolling settled on short sections (e.g. "Cookies and tracking", "International transfers", "Security", "CCPA"); fixed with a `suppressRef` pattern that blocks the IntersectionObserver for 1500ms after a programmatic navigation; applied to both desktop and mobile secondary nav on all three pages
- **Page title emojis removed** — 🔒 / 🍪 / 📄 removed from the `<h1>` on Privacy, Cookies, and Terms

### Terms of use — copy
- **Em-dashes removed** — ownership body text replaced `—…—` parenthetical em-dashes with `(…)` in EN and FR
- **Compound word hyphens removed** — "third-party", "error-free", "AI-powered", "AI-generated" → "third party", "error free", "AI powered", "AI generated" in description body text

---

## [1.5.2] — 2026-04-06

### Keyboard shortcuts
- **H** — go home from any page; scrolls to top if already on `/`; shortcut badge shown in logo tooltip
- **R** — navigate to résumé from any page; shortcut badge shown in résumé nav tooltip
- **F** — alias for L (toggle EN/FR language); no additional tooltip
- **Escape** — was already wired; confirmed working to close chat panel

### Hero (Home)
- **Subtle radial gradient** — faint `#0152EC` wash (5% opacity) centred at 50% 40%, fading to transparent; light mode only; adds focal depth without visible colour
- **Accessibility** — H1 and H2 now use `aria-label` on the element itself instead of a hidden `sr-only` span + `aria-hidden` on the visual span; removes 3 of 4 spurious `aria-hidden` best-practice warnings on the home page (email obfuscation span intentionally kept)
- **"Experienced in" card** — removed white/dark fill background; card is now transparent against the page

### Chat button
- **Emoji span** — removed `aria-hidden="true"` from the 💬 emoji; button `aria-label` already provides the accessible name so the attribute was redundant

---

## [1.5.0] — 2026-04-06

### Navigation
- **XR page linked** — "Extended reality" entry in desktop dropdown and mobile submenu now links to `/projects/xr` (was locked)
- **Holograms removed** — removed from both desktop dropdown and mobile submenu
- **Digital twin moved last** — reordered to: sales platform → extended reality → digital twin in both nav and footer sitemap
- **`P` keyboard shortcut** — pressing `P` cycles between case study pages (`/projects/sales-platform` → `/projects/xr` → back); follows the existing single-key pattern (D, L, C)

### Case Studies carousel (Home)
- **XR card unlocked** — card 2 now links to `/projects/xr`, uses blue panel background and white arrow button matching card 1; "view case study" tooltip on hover

### Footer sitemap
- **XR linked** — "extended reality" entry replaced locked state with an active link to `/projects/xr`
- **Digital twin moved last** — reordered to match nav: sales platform → extended reality → digital twin

### XR Experiences page
- **Scroll for more** — scroll indicator now appears on the XR page (added `/projects/xr` to the condition in App.jsx)
- **Hero animation** — text and gradient overlay now fade in after 600ms on mount (matching Sales Platform behaviour); count-up stats gated on `heroReady`
- **Back to case studies CTA** — replaced gold text link with blue pill button (`bg-[#0152EC]`) with left-pointing white arrow; links to `/#case-studies`; label updated to "Back to case studies" / "Retour aux études de cas"
- **Bottom padding increased** — hero content `pb-24 sm:pb-28 lg:pb-32` to clear the scroll indicator
- **`aria-hidden` removed from stats** — collapsed sr-only + aria-hidden double-span pattern to a single span; screen readers read the final value without announcing count-up animation
- **Parse error fix** — French `backLabel` string changed to double quotes to avoid invalid character error on `é`

### Sales Platform page
- **Hero animation** — gradient overlay and text now fade in after 600ms on mount, matching XR; count-up stats gated on `heroReady`
- **Hero title** — updated to "A luxury off-plan sales platform" / "Une plateforme de vente sur plan"
- **Title size & weight** — `text-[40px] sm:text-[56px] lg:text-[72px] font-bold leading-[1.05]` (was 32/44/56px font-semibold); matches XR hero
- **Category eyebrow** — `text-[12px] sm:text-[13px]` (was 13/14px); matches XR
- **Stats labels** — `text-white/70 uppercase tracking-widest font-medium` (was `text-white leading-snug`); AAA compliant (~7.4:1), fixes prior contrast failure at white/50
- **Hero text hierarchy** — eyebrow and stats labels set to `text-white/70`; title and stats numbers remain full white
- **Bottom padding** — `pb-24 sm:pb-28 lg:pb-32` to clear scroll indicator
- **Back to case studies CTA** — blue pill button with left-pointing white arrow added at page bottom; links to `/#case-studies`

### Tailwind / build
- **`@source` directive** — added `@source "./**/*.{jsx,tsx,js,ts,html}"` to `index.css` to ensure all JSX files are scanned for utility classes regardless of Vite module graph entry order

---

## [1.5.1] — 2026-04-06

### Navigation
- **Nav hides on scroll down** — main nav bar slides out (`translateY(-120%)`) when scrolling down past 8px threshold; reappears on any upward scroll or when at the top; 300ms ease transition
- **"Let's talk" scroll fix** — from pages without a `#contact` section, button now scrolls to `Number.MAX_SAFE_INTEGER` (browser-clamped to page bottom) instead of `scrollIntoView` on `footer-contact`, ensuring full scroll on long pages like Sales Platform
- **Keyboard shortcut badge style** — shortcut hints in tooltips now render as a `<kbd>` element with dark grey background (`#4a4a4a` light / `#2a2a2a` dark), 15×18px square, rounded corners

### Home — carousels
- **Carousel alignment** — Case Studies and Contact carousels now use `lgAlignWidth={720} smAlignWidth={536}`, matching Collaborations and the Resume page; content left-edge aligns consistently across all sections
- **Desktop nav visible** — dots and chevron controls now show on desktop for both Case Studies and Contact carousels (were `lg:hidden`)

### XR Experiences page
- **Mobile secondary nav repositioned** — matches policy pages: `bottom-2 left-[68px] right-4`, shifted right of chat button
- **Circular wrapper behind chat button** — when secondary nav is visible on mobile, a 52×52px frosted-glass circle appears behind the chat button, matching the secondary nav's backdrop style; both are vertically centred on the same axis
- **Tagline contrast** — `text-white/60` → `text-white/80` (~7.4:1, WCAG AAA)
- **Stats labels contrast** — `text-white/50` → `text-white/70` (~6.4:1, WCAG AA large)

### Cookies · Privacy · Terms pages
- **Circular wrapper behind chat button** — same 52×52px frosted-glass circle treatment as XR page; appears when secondary nav is visible
- **Secondary nav repositioned** — `bottom-2 left-[68px] right-4` (was centred full-width); chat button and secondary nav coexist and are centred as a pair

---

## [1.2.9] — 2026-04-02

### Carousels
- **Dots navigation** — all carousels (Contact, Case Studies, Collaborations, Resume Experience / Expertise / Education) now show a pill-for-active dot indicator centred between a left spacer and the chevron buttons; windowed 5-dot display (same pattern as Sales Platform) handles long lists gracefully
- **Contact — Message card first** — email/message card is now the first card in the carousel on all variants
- **Collaborations — dots stable during scroll** — `isProgrammaticScroll` ref suppresses `handleScroll` during programmatic smooth-scroll so dots don't flicker through intermediate positions; dots remain visible when the detail modal is open (only chevrons are hidden/inerted)

### Navigation
- **"Let's talk" scroll fallback** — `handleClick` on desktop and mobile now checks `getElementById(hash)` first, then falls back to `getElementById('footer-contact')`, so the button works on pages without a contact section (Privacy, Terms, Cookies)
- **Dark mode tooltip suppression** — extracted `suppress()` function; `useEffect` on `isDark` calls it on every toggle (keyboard shortcut D included), fully eliminating spurious tooltip appearances

### Footer
- **`id="footer-contact"`** added to the contact column to serve as the scroll target fallback for "Let's talk" without conflicting with the `id="contact"` on the Contact section

### Chatbot
- **Pill label** — updated to "Ask A.I. about David" (was "Ask A.I."); `max-w` widened to `max-w-[160px]` to fit the longer text
- **Urgent warning** — remaining turns counter turns amber (`text-[#f59e0b]`) and bold at 1 message remaining

### Résumé
- **Bio copy** — "Design is how it looks and how it works." → "Design is how it works."

### PDF
- **Updated CV link** — Google Drive file ID updated to the latest CV in both `Contact.jsx` and `Resume.jsx`

---

## [1.2.8] — 2026-04-02

### Chatbot
- **Pill trigger button** — trigger now opens as `💬 Ask A.I.` pill on load, smoothly collapsing to the circular icon after 3 seconds; width, padding and text opacity all transition with spring easing
- **Remaining turns indicator** — after the user's 2nd message, a subtle centred note shows how many messages remain (e.g. "4 messages remaining"); counts down with each turn; disappears when the limit message takes over; bilingual (`messages restants` in FR)
- **Emoji contrast fix** — added `text-white dark:text-[#1f1f1f]` to the emoji span so contrast checkers see white-on-dark rather than assuming black-on-dark (ratio was 1.27:1); `aria-hidden="true"` added to remove it from the accessibility tree

### Collaborations modal
- **Navigation fade** — pressing prev/next fades description and logo+title out (150ms), snaps to the new card instantly, then fades new content back in; swipe navigation restores visibility once scroll settles
- **Logo/title alignment** — `justify-between` on all breakpoints (was `sm:justify-normal`) so logo+title is always pinned to the bottom; description wrapped in `flex-1 min-h-0 overflow-hidden` so variable-length text never pushes the logo row
- **Bottom padding reduced** — `pb-4 sm:pb-6 lg:pb-7` → `pb-2 sm:pb-3 lg:pb-4` to move logo+title closer to the card bottom

### Cookie banner
- **Self-dismiss on cookies page** — clicking "View the cookies policy" while already on `/cookies` now dismisses the banner instead of navigating (no-op navigation)

### Navigation
- **Dark mode tooltip flicker fix** — `suppressRef` blocks `showTip` for 600ms after a click, preventing spurious `mouseenter` events fired by the browser during DOM re-render from re-triggering the tooltip
- **Mobile menu — "home" removed** — logo already navigates home; the menu item was redundant

---

## [1.2.7] — 2026-04-02

### Easter egg
- **Konami code** — entering ↑↑↓↓←→←→BA triggers a confetti burst (`canvas-confetti`); sequence tracked via `konamiRef` in App.jsx; fires only when no modifier keys held and focus is not in a text field

### Chatbot
- **Escape key** — pressing Escape dispatches `close-chat` event (handled before modifier/text-field guards so it always works); ChatBot listens and closes the panel
- **Click-outside dismiss** — an invisible full-screen overlay (`z-[399]`) mounts behind the panel when open; clicking it closes the panel
- **Trigger hides when open** — trigger button fades to `opacity-0 pointer-events-none` when the panel is open (no slide, opacity only); `inert` added to match
- **Trigger button style** — inverted to dark: `bg-[#1f1f1f] dark:bg-[#f6f6f6]`; removed `backdrop-blur` (required transparency that conflicted with full opacity icon)
- **Close button** — padding increased from `p-1.5` to `p-2.5`; repositioned with `-mt-2 -mr-3`
- **Panel radius** — `rounded-3xl` → `rounded-[28px]`
- **Tooltip casing** — "Learn about David" → "learn about David"; "En savoir plus sur David" → "en savoir plus sur David"

### Hero
- **Language switch — no re-animation** — `isFirstHeading` ref distinguishes initial load from language toggle; switching language now snaps directly to final state without replaying the typing animation
- **Shadow clipping fix** — added `padding: '20px', margin: '-20px'` to the overflow wrapper inside the grid expand animation; hover shadow on the "experienced in" card was getting clipped
- **Container radius** — `rounded-3xl` → `rounded-[32px]`

### Navigation
- **"Let's talk" destination** — changed from `/resume#contact` to `/#contact`; now scrolls to the contact section on the home page instead of navigating to the résumé page
- **Home page hash scroll** — added `useLocation` hash detection to `Home.jsx` so navigating to `/#contact` from another page smoothly scrolls to the contact section
- **Language toggle** — replaced dropdown with direct toggle (only 2 languages; dropdown was unnecessary overhead)
- **Language tooltip** — updated from "languages" / "langues" to "read in french" / "lire en anglais"
- **Dropdown blur** — `backdrop-blur-[4px]` → `backdrop-blur-[12px]` on Projects and Language dropdowns

### Cookie banner
- **Copy / link spacing (tablet+)** — separated the message copy and "View the cookies policy" link into distinct paragraphs with `md:mt-2` between them; previously inline in the same `<p>`
- **Title / copy spacing (tablet+)** — added `md:mt-2` to the copy paragraph to increase gap below the 🍪 heading

### Contact carousel
- **Card order (home variant)** — reordered from LinkedIn → Interactive CV → Message to LinkedIn → Message → Interactive CV

### CTA labels — "Message"
- **Resume page** — `send an email` → `Message` (EN); `échangeons` → `Échangeons` (FR)
- **Case studies** — `email` → `Message` (EN); `envoyer un email` → `Message` (FR) on the restricted card CTA
- **Contact carousel** — `Envoyer un email` → `Message` on the FR email card button
- **Footer** — sr-only label: "Send an email to David" → "Message David"
- **Privacy / Cookies pages** — `aria-label` on obfuscated email button: "Send an email to David" → "Message David"

### Copy
- **Resume hero buttons** — `let's connect` → `Let's connect` (EN); `connectons` → `Connectons`, `échangeons` → `Échangeons` (FR)
- **ScrollForMore tooltip** — `Scroll for more` → `scroll for more`

---

## [1.2.6] — 2026-04-02

### Cookie banner
- **Centred** — banner position changed from `left-4` to `left-1/2 -translate-x-1/2`
- **No pre-selected button** — auto-focus moved from "Decline" button to the dialog container (`tabIndex={-1}`); focus enters the modal without pre-selecting a choice
- **Non-blocking** — removed `aria-modal="true"`; page remains interactive while banner is open; `bannerOpen` state and inner `inert` wrapper removed from App.jsx
- **Banner link** — "Learn more about cookies" → "View the cookies policy" (EN); "Consulter la politique de cookies" (FR)

### Chatbot
- **Hint callout removed** — first-load blue hint bubble removed entirely; `hint` state, `hintTimer`, `HINT_KEY`, and both related `useEffect`s cleaned up; hover tooltip is the sole discovery mechanism
- **Trigger button** — `bottom-[68px]` → `bottom-4`; `dismissHint()` call removed from click handler

### Footer
- **Manage Cookies** — "Cookies" link replaced with a button dispatching `show-cookie-banner`; `whitespace-nowrap`; French: "Gérer les cookies"
- **Legal button padding** — `px-4` → `px-2` on Privacy, Manage Cookies, and Terms

### Accessibility (Cookies / Privacy / Terms pages)
- **No label for button** — added explicit `aria-label={s.heading}` to all `SecondaryNav` buttons; audit tools were not computing accessible name from absolutely-positioned child spans
- **aria-hidden on parent of focusable** — replaced `aria-hidden` with `inert` on the hidden mobile secondary nav container; `inert` removes focusability and hides from AT without the parent/focusable conflict

### Sales Platform
- **Stakeholder tile** — `space-y-1` removed from bullet list; line rhythm now consistent with Mission tile
- **My role tile** — stats nudged up `sm:-mt-2` on tablet/desktop; `my-4` breathing room on mobile (reset at `sm`)
- **£6.8 Billions** → **£6.8 billion** in page and chatbot system prompt

### Copy
- **British English** — confirmed all user-visible copy is British English; corrected monetary figure capitalisation/pluralisation

---

## [1.2.5] — 2026-04-02

### Navigation & tooltips
- **Tooltips — style** — font size reduced from `text-[15px]` to `text-[13px]`; weight reduced from `font-semibold` to `font-light`; side padding reduced from `px-3` to `px-2`; caret/arrow removed from all tooltips
- **Tooltips — keyboard shortcuts** — shortcut letter shown in muted grey alongside label: `D` (dark mode), `L` (language), `C` (chatbot); shortcut `C` also shown in chatbot hover tooltip
- **Tooltips — gap** — offset reduced from `16px` to `10px` on all nav tooltips; logo tooltip uses `offset={2}` to compensate for its `p-2` container
- **Dark mode tooltip** — always in DOM, visibility toggled via opacity transition (fixes random persistence bug in dark mode)
- **ScrollForMore tooltip** — updated to match nav tooltip style (`text-[13px] font-light px-2 py-[4px]`); caret removed
- **Keyboard shortcuts** — single-key shortcuts added: `D` (dark mode), `L` (language), `C` (open/close chatbot); implemented with `e.code` for Mac reliability; skipped when modifier keys held or focus is in a text field
- **Language dropdown** — now centred below the language button (was right-aligned); added `center` alignment option to `usePortalPosition`

### Cookie & footer
- **Floating cookie button removed** — the 🍪 icon button no longer appears after consent; cookie preferences are now accessible via "Manage Cookies" in the footer
- **Footer — Manage Cookies** — "Cookies" link replaced with a "Manage Cookies" button that opens the cookie panel; label is `whitespace-nowrap` to prevent wrapping; French: "Gérer les cookies"
- **Cookie banner link** — "Learn more about cookies" → "View the cookies policy" (EN); "En savoir plus sur les cookies" → "Consulter la politique de cookies" (FR); still navigates to `/cookies`
- **Footer legal buttons** — side padding reduced from `px-4` to `px-2`

### Chatbot
- **Trigger button position** — moved from `bottom-[68px]` to `bottom-4`, taking the position previously occupied by the cookie icon

### Sales Platform
- **Stakeholders tile** — removed `space-y` between list items; vertical rhythm now driven purely by line-height, consistent with the Mission tile
- **My role tile** — stats block (`15 weeks` / `10 projects`) nudged up by 2px on tablet and desktop (`sm:-mt-2`); extra vertical breathing room added on mobile (`my-4`, reset at `sm`)
- **Outcome — £6.8 Billions** — corrected to `£6.8 billion` (lowercase, no plural after a numeral)

### Copy & language
- **British English audit** — confirmed all user-visible copy is British English; corrected `£6.8 Billion` → `£6.8 billion` in chatbot system prompt (`api/chat.js`)

---

## [1.2.4] — 2026-04-01

### New features
- **Chatbot — first-load hint** — a blue callout bubble appears to the right of the chatbot button after the user actions the cookie banner (accepted or declined), shown once only (localStorage flag); auto-dismisses after 5 seconds or on any click; copy: "Chat with A.I." / "Skip the scroll, just ask" (EN), "Discutez avec l'I.A. pour gagner du temps" (FR)

### Chatbot system prompt
- **Collaborations** — added all 11 collaboration modal descriptions attributed per partner (UK Government, Looking Glass Factory, DSTL, JLR, Nokia, PIF, Etisalat, CERN, University of Edinburgh, IBM, University Hospital Hamburg)
- **Work history** — added full drawer content for all experience and education cards; added all four certifications and top skills
- **Sales Platform case study** — added detailed section: client context, mission, challenge, UX strategy (MVP, firm deadlines, incremental iterations), 9-view design, technical exploration (Unreal pixel-streaming trade-off), outcome (£6.8B, 20% YoY, 48h sell-out), and retrospective
- **Portfolio meta** — added section explaining David built this site himself, taking on designer, PM, product manager, and tester roles, using Claude Code as AI coding assistant
- **Observed qualities** — added section on non-obvious strengths: technical depth, spatial/digital career thread, high-stakes delivery, systems thinking, collaborative nature
- **Soluis date** — removed end date to avoid disclosing departure timing
- **French placeholder** — "Demande à Claude…" → "Demandez à Claude…"

### UI refinements
- **Mobile nav — z-index** — nav wrapper raised from `z-50` to `z-[500]`; portal backdrop raised from `z-[49]` to `z-[499]`; mobile menu now renders above chatbot panel and cookie banner

### Secondary nav — hide floating buttons
- **Cookies / Privacy / Terms** — cookie and chatbot floating buttons fade out when the mobile secondary nav is visible; fade back in when it exits; implemented via `secondary-nav-change` window event dispatched from all three pages; App.jsx listens and passes `hideFloating` prop to both CookieBanner and ChatBot
- **Privacy & Terms** — added `secondary-nav-change` event dispatch (matching Cookies); fixed mobile secondary nav position from `bottom-20` to `bottom-4`

### Accessibility
- **Chatbot dialog** — `role="dialog"` and `aria-modal` now only applied when panel is open, removing false-positive WCAG errors when closed
- **Cookie banner dialog** — same pattern: `role="dialog"` and `aria-modal` only applied when banner is visible
- **App wrapper** — removed `aria-hidden` from background wrapper when chat is open; `inert` alone is sufficient and avoids "aria-hidden on parent of focusable" error

---

## [1.2.3] — 2026-04-01

### New features
- **Chatbot — clickable links** — URLs and email addresses in assistant responses are now rendered as clickable links; URLs open in a new tab, email addresses open the mail client

### Bug fixes
- **Blob — private access** — fixed `BlobError: Cannot use public access on a private store` by switching `access: 'public'` to `access: 'private'`; also more appropriate for privacy

### Privacy & legal
- **Code comment** — added inline comment in `api/chat.js` explaining why conversation logging is independent of cookie consent (no personal data, legitimate interest basis)

---

## [1.2.2] — 2026-04-01

### Bug fixes
- **Chatbot — panel width on mobile** — switched from `calc(100vw - 32px)` to `left: 16px / right: 16px` inline styles with `maxWidth: 380px`; safe now that `overflow-x: clip` is restored on `html`

### Privacy & legal
- **Terms of use** — added "AI chatbot" section (EN + FR): AI-generated responses disclaimer, intended use, anonymous storage disclosure, misuse prohibition; last updated date bumped to 2026-04-01
- **Privacy policy** — removed Figma capture script from `index.html`

### Accessibility
- **Chatbot — modal background** — background content now gets `aria-hidden` and `inert` when chat panel is open, properly hiding it from assistive technologies; resolves WCAG 2.2 modal accessibility error

---

## [1.2.1] — 2026-04-01

### New features
- **Conversation logging** — each completed chat conversation is saved as a JSON file to Vercel Blob (`chat-logs/`); stores IP, timestamp, and full transcript; write is fire-and-forget and never blocks the response; `@vercel/blob` added to dependencies
- **Chatbot system prompt** — updated with richer briefing: expanded holography section (IBM Watson avatar project, mechanical engineering prototypes, automotive/military HUDs), clearer career timeline, updated XR description (Magic Leap 2), expanded "what he's looking for" section

### UI refinements
- **Chatbot — panel position** — chat panel now opens at `bottom-4 left-4`, same position as the cookie banner, covering the button area rather than floating above it
- **Chatbot — panel colours** — inverted to match cookie banner style: dark background (`#1c1c1c`) in light mode, white background in dark mode
- **Chatbot — title** — "Ask about David" → "A.I. knows about me" (EN) / "L'I.A. me connaît par 💙" (FR)
- **Chatbot — panel border** — uses same border as mobile nav: `border-white/[0.16] dark:border-black/[0.16]`
- **Chatbot — panel radius** — matches case study card radius: `rounded-3xl`
- **Chatbot — close button** — replaced inline SVG with `icon-close-sm.svg` matching the collaborations modal; white icon by default in light mode, black in dark mode; inverts on hover
- **Chatbot — send button** — uses `icon-send.svg` asset; larger (24px icon, `p-2`); light blue border (`#5289f2`) matching Figma design
- **Chatbot — empty state** — removed placeholder text; messages area collapses to zero height when no messages, so panel shows header + input only
- **Chatbot — input placeholder** — "Ask me anything…" → "Ask Claude…" (EN) / "Demande à Claude…" (FR); placeholder nudged 2px right so blinking cursor appears in front
- **Chatbot — input height** — fixed at 42px to match send button; grows up to 100px on multi-line input; wraps long messages
- **Chatbot — separator** — single separator above input, only shown once messages exist; no separator below header
- **Chatbot — tooltip** — "Learn about David" / "En savoir plus sur David"
- **Chatbot — trigger button** — stacked above cookie button at `bottom-[68px]`; additional vertical spacing between the two buttons
- **Chatbot — keyboard** — `inert` on panel when closed removes invisible elements from Tab order; Tab from textarea jumps to close button; `tabIndex={0}` on trigger button for Safari; `aria-label` and `autoComplete="off"` on textarea
- **Cookie banner — animation** — replaced CSS keyframe with always-in-DOM approach (same as chatbot panel): `opacity-0 translate-y-3 → opacity-100 translate-y-0`, `duration-300 ease-out`; both banner and button states animate independently; `inert` when hidden
- **Cookie banner — tooltip** — moved from above button to side (right), no caret; matching chatbot tooltip style
- **Cookie banner — keyboard** — `tabIndex={0}` on cookie icon button for Safari
- **Case studies — dark mode cards** — card background is `#111111` in dark mode (was white in both modes)
- **index.css** — restored `overflow-x: clip` on `html` (accidentally removed during iOS nav fix); this also fixes mobile nav bar width changing when switching language

### Bug fixes
- **Carousel clipping** — `overflow-x: clip` on `html` restored, fixing horizontal content clipping introduced in a previous session

### Privacy & legal
- **Privacy policy** — updated (EN + FR) to disclose AI chatbot, Anthropic as a third-party processor, anonymous conversation storage on Vercel, and legitimate interest legal basis; last updated date bumped to 2026-04-01
- **Conversation anonymisation** — IP addresses not stored in chat logs; transcripts contain timestamp and messages only

### Cost controls
- **Anthropic spend cap** — $5/month hard limit set in Anthropic console; API errors gracefully after limit is reached

---

## [1.2.0] — 2026-03-31

### New features
- **AI chatbot** — floating "Ask about my work" button (bottom-right, all pages); opens a glass-morphism chat panel powered by Claude Haiku via a Vercel serverless function; bilingual (responds in French if the visitor writes in French); limited to 6 turns per conversation; rate-limited to 10 requests per IP per hour; API key kept server-side, never exposed to the browser; CORS configured via `vercel.json`; `VITE_CHAT_API_URL` environment variable wired into GitHub Actions for production builds

### Infrastructure
- **Vercel** — added `api/chat.js` serverless function and `vercel.json` for CORS headers and SPA routing; site remains on GitHub Pages, Vercel serves the API only
- **GitHub Actions** — `VITE_CHAT_API_URL` secret passed to Vite build so the chatbot calls the correct Vercel endpoint in production

### Bug fixes
- **Nav — iOS overscroll clipping** — nav bar no longer gets clipped when fast-scrolling to the top (rubber-band bounce); fixed by adding `transform: translateZ(0)` to the nav wrapper, forcing it into its own GPU compositing layer

---

## [1.1.9] — 2026-03-31

### Bug fixes
- **Sales Platform — blank space below footer** — collapsing the Design section no longer leaves a large blank area below the footer; root cause was nested elements with large padding escaping the `grid-rows-[0fr]` + `overflow: hidden` clip (browser rendering bug); fixed by setting `display: none` on the grid after the collapse animation ends, guaranteeing zero layout contribution; expanding reverses this by removing `display: none` one frame before the animation starts; `prefers-reduced-motion` users get the hide/show immediately without waiting for a transition

---

## [1.4.0] — 2026-04-06

### New page
- **XR Experiences case study** — full bilingual (EN/FR) case study page at `/xr-experiences` and `/fr/xr-experiences`, with 8 sections: Team, Why, Who, When & Where, What, Prioritise & Choose, Solve, and Measure & Review
- **Route** — added to `App.jsx` for both EN (`/xr-experiences`) and FR (`/fr/xr-experiences`)

### New components
- **`WorldMapDots`** — interactive SVG world map showing the distributed team across Scotland, England, UAE, and Vietnam; dots grouped by timezone; hover highlights a timezone column; click locks selection; keyboard-navigable legend pills with roving tabindex; fully bilingual (headings, role labels, map caption, aria strings)
- **XR page architecture** — sticky side nav with `IntersectionObserver`-driven active section tracking; hero with four stats; six experience cards; AR/VR flowcharts with EN/FR regex translation pipeline; inline SVG diagrams; asset injection between paragraphs via `body.slice(1).map` + index guards

### New assets
- **Photos** (7) — MIPIM exterior, client pavilion, event space, event group, presenter-led AR session, Magic Leap 2 headset, Magic Leap 2 controller
- **Diagrams** — `xbox-key-binding.svg` (Xbox controller keybindings for the Digital Twin), `globe-time-zones.svg`, `globe.svg`
- **Logos** — `logo-table-top.webp` (AR tracker derived from client logo)
- **Flowcharts** — `shared-ar-experience-flow-inital.svg` and `shared-ar-experience-flow-shipped.svg`; bilingual text via SVG regex translation pipeline; `text-anchor="middle"` with centred tspan x-coordinates so FR text is never off-centre in containers

### Content — English
- All 8 sections written; "Believers" renamed to **"Visionaries"** in audience type list
- Experience 02: "top-down exploration" → **"satellite view"**
- Experience 05: added parenthetical **(the dry valleys at the heart of the development)** for Wadis
- Experience 06: removed reference to unavailable dedicated case study
- Magic Leap multiplayer rationale restructured into two cleaner sentences with distinct reasons
- AR asset constraint: "optimized for mixed reality at scale" → **"for the device's processing constraints"**
- Solve section: "audience experience" → **"user experience"**
- Measure section: "one attendee" → **"several attendees"**
- All em dashes in body text replaced with appropriate punctuation (periods, colons, commas)

### Content — French
- Full bilingual translation across all 8 sections
- Typographic apostrophes (`'` U+2019) throughout
- Image captions translated for all 7 figures (Xbox, Magic Leap, building, tracker, floor plan, AR session, world map)
- World map legend fully translated: group headings and role pill labels
- `LEGEND_T` object handles EN/FR legend strings, map caption, and aria labels inside `WorldMapDots`

### Accessibility
- `role="img"` + `aria-label` on all inline SVGs (Xbox keybinding, flowcharts, world map)
- Skip-to-content link on case study page
- `aria-labelledby` wired to section headings in the side nav
- Roving tabindex on world map legend pills with left/right arrow key support on the map itself

### Bug fixes
- **Flowchart SVG text (FR)** — tspan x-coordinates were hardcoded for English string lengths; fixed by setting `text-anchor="middle"` and x to the geometric centre of each column/container
- **Xbox controller light mode** — colour-inversion logic removed; diagram now uses a dark (`#141414`) background in both modes pending a redesigned asset

---

## [1.1.8] — 2026-03-31

### New features
- **OG image** — added `og-image.webp` (2400×1260px dark variant); wired up `og:image`, `og:image:width/height`, and `twitter:image` meta tags; upgraded Twitter card from `summary` to `summary_large_image`

### UI refinements
- **Hero — H2 subtitle** — each letter fades in individually (35ms stagger, 300ms opacity transition) instead of word-by-word; spaces preserved via `whiteSpace: pre`
- **Hero — buttons** — fade in with opacity only, no upward movement
- **Hero — emoji** — fixed replacement character (`<?>`) appearing mid-typing by splitting heading with `[...heading]` (Unicode code points) instead of `.slice()` (code units)
- **Page load fade-in** — added 500ms opacity transition on mount to Privacy and Terms pages, consistent with Cookies

---

## [1.1.7] — 2026-03-31

### UI refinements
- **Hero — lift animation** — H1/H2 now smoothly slide up when the "experienced in" block appears; previously the layout shifted instantly as the block mounted at full height; now uses `grid-template-rows 0fr→1fr` transition (700ms spring easing) so the push-up is animated

---

## [1.1.6] — 2026-03-31

### Analytics
- **Microsoft Clarity** — replaced Hotjar/Content Square with Microsoft Clarity for heatmaps and session recordings; updated tracking script and `loadClarity()` function in `analytics.js`

### Legal
- **Cookies policy** — updated third-party tools section (EN + FR): Hotjar → Microsoft Clarity, updated privacy and terms links
- **Privacy policy** — updated data collected, how collected, and third-party services sections (EN + FR)
- **Last updated dates** — bumped to 2026-03-31 on Cookies and Privacy pages

---

## [1.1.5] — 2026-03-31

### New features
- **Mobile secondary nav** (Cookies, Privacy, Terms) — floating pill nav appears after the first section scrolls into view and disappears after the last section exits; active section highlighted with filled pill; auto-scrolls active item into view; glass-morphism style matching the main nav; horizontally scrollable with button-shape clip (`overflow-hidden rounded-[16px]` inset within `rounded-3xl` outer); hidden from accessibility tree when not visible (`aria-hidden`)
- **Page load fade-in** (Cookies) — content fades in from opacity 0 to 100 on mount via `mounted` state

### Analytics
- **GA4 SPA page tracking** — disabled auto pageview (`send_page_view: false`) and added `PageViewTracker` component that fires a `page_view` event on every client-side route change; previously only the landing page was tracked
- **`trackPageView`** — new export in `analytics.js`; silently no-ops if consent not yet given

### Micro-interactions
- **Spring press — `data-spring-desktop`** — new attribute that skips the press effect on mobile (≤639 px); applied to case study cards, contact carousel cards, and certification flip cards so scrolling those carousels doesn't accidentally trigger a press
- **Spring press — scroll cancel** — 80 ms delay before committing the visual press on mobile so a scroll's `pointercancel` arrives first; `pointermove` threshold (8 px) cancels an in-progress press on swipe

### Mobile nav
- **Hamburger hit area** — expanded to full right side of nav bar (`flex-1`) for easier tapping; spring press scoped to icon `<span>` so the scale origin is centred on the icon
- **Menu items press** — spring `data-spring` moved to inner content `<span>` wrappers (text + chevron / arrow) so scale origin matches the visible label, not the full-width row
- **Language buttons** — added `data-spring` press effect to both GB and FR buttons
- **Projects submenu** — opens by default when the menu is opened

### Certification carousel (Resume)
- **Full-width cards** — changed `w-full` → `w-screen` so each page fills the viewport regardless of container hierarchy
- **Consistent spacing** — carousel breaks out of `px-6` container with `-mx-6`; cards use `gap-4 px-4`
- **Clip fix** — added `py-3 -my-3` to give vertical breathing room inside the `overflow-x: auto` container

### Bug fixes
- **Sales Platform — whitespace below footer** — added `overflow-anchor: none` on collapsing grid and a `transitionend` scroll clamp to prevent page scroll position exceeding `scrollHeight - innerHeight` after a section collapses
- **Collaborations** — corrected French name "Centre hospitalier universitaire de Hambourg" → "d'Hambourg"

### Accessibility
- **`aria-current="location"`** — fixed invalid `"true"` value on all secondary nav buttons (Cookies, Privacy, Terms desktop and mobile navs)
- **`<ul>` over `<ol>`** — mobile secondary nav uses unordered list (sections have no meaningful sequence/ranking)

---

## [1.1.4] — 2026-03-30

### Accessibility — keyboard navigation
- **Safari tab order** — Added explicit `tabIndex={0}` to all `<a>` / `<Link>` elements site-wide so Safari includes them in the Tab order without requiring the "Press Tab to highlight each item" browser setting
- **Nav — résumé & let's talk** — Both links now reachable via Tab in Safari; focus ring added
- **Nav — logo** — Reachable via Tab in Safari; focus ring added
- **Nav — Projects dropdown** — Auto-focuses first enabled item on open (`setTimeout(0)`); `onKeyDown` on the link handles Escape (closes menu, returns focus to trigger) and Tab (closes menu); arrow navigation removed (single enabled item)
- **Nav — Language dropdown** — Same pattern as Projects: `setTimeout(0)` auto-focus, `onKeyDown` on the button for Escape and Tab
- **Footer sitemap** — Added `tabIndex={0}` and focus rings to all sitemap and contact `<Link>`/`<a>` elements; added `block` to the shared `row` style so all focus outlines render at a consistent height regardless of inline vs flex-item context
- **Contact carousel** — Added `tabIndex={0}` to all CTA `<a>`/`<Link>` elements; `onFocus` on the track scrolls the focused card into view; focus ring on the blue CTA button
- **Resume — send an email & download PDF** — Added `tabIndex={0}` and focus ring to both `<a>` buttons in the summary section
- **Resume — expertise tool icons** — Tooltip now appears on keyboard focus (`onFocus`/`onBlur`) in addition to mouse hover
- **Resume — experience & education drawer chevrons** — Spring press effect scoped to the chevron icon only (removed from the full-width drawer row)
- **Resume — certification cards** — Added spring press effect (`data-spring`) to the flip card
- **Sales Platform — carousel lightbox** — `useEffect` captures `document.activeElement` on mount and restores focus to the trigger button on close; close button auto-focused via `setTimeout(0)` on open
- **Sales Platform — carousel keyboard** — Enter / Space on the focused carousel track opens the active slide in fullscreen; individual slide buttons set to `tabIndex={-1}` (mouse-clickable, not a separate Tab stop)
- **Sales Platform — nav dots** — Hidden dots (outside the 5-dot window) set to `tabIndex={-1}` so Tab only stops on visible dots

### UI refinements
- **Case studies** — "View case study" tooltip below the arrow button on the first card (hover with 600 ms delay); upward-pointing caret; carousel `paddingBottom` increased to 52 px to prevent clipping
- **Case studies** — Named Tailwind group (`group/card`) scopes the tooltip hover to the card without conflicting with the inner restricted-overlay group
- **ScrollForMore** — Shortened French label to "Faire défiler"

### Content
- **Contact carousel (resume variant)** — Download PDF card now links to the same Google Drive URL as the summary section button (was pointing to a stale `/cv.pdf` local file)

---

## [1.1.3] — 2026-03-30

### UI refinements
- **Nav** — Résumé button shows filled active state (black/white) when on the résumé page
- **Nav** — Logo tooltip: "back to top" on home page, "go to home page" on all other pages
- **Nav** — Tooltips added to Projects, Résumé, and Let's talk buttons (desktop/tablet); tooltip Y offset unified across all nav items
- **Footer** — Spring press effect on all sitemap and contact detail links; hash links use a 140 ms navigation delay so the animation is visible before the page scrolls
- **Footer** — Spring press effect on Privacy, Cookies, and Terms buttons
- **Case studies** — Locked cards (tablet/desktop) open mailto on click instead of toggling the restricted overlay; mobile toggle behaviour unchanged

### Content
- **Mailto** — Pre-composed subjects on all mailto links: card-specific for locked case study cards ("XR experiences — enquiry", "Digital twins — enquiry", with French variants); "Getting in touch" / "Prise de contact" for all generic contact buttons

---

## [1.1.2] — 2026-03-30

### UI refinements
- **Micro-interactions** — Replaced CSS `active:` scale with a JS spring-press system: fast snap on press (120ms ease-out), bouncy spring release (500ms overshoot). Mobile scales up, desktop scales down. Applied to all CTAs, carousel nav buttons, scroll-down, cookie, and hamburger buttons
- **Resume** — Removed Adobe XD from Prototyping expertise card

---

## [1.1.1] — 2026-03-30

### Bug fixes
- **Resume** — Fixed blank page caused by `lang` prop missing from `SummarySection`

---

## [1.1.0] — 2026-03-30

### New features
- **Hero** — "Experienced in" rectangle is now clickable and links to `/resume#experience`
- **Hero** — Swapped CTA buttons: blue button now scrolls to Case studies; text button navigates to Interactive CV
- **Hero** — "Interactive CV" hover changes text colour instead of showing a background
- **Resume** — GitHub added to Prototyping tools (Figma → Claude → GitHub → Adobe XD → Bezi)
- **Collaborations modal** — Dismisses smoothly when user scrolls away (no focus jump back)

### Accessibility
- **404 page** — Decorative "404" spans are `aria-hidden`; `sr-only` span provides the text to AT
- **Cookie banner** — Removed `aria-hidden` from cookie emoji (button `aria-label` takes precedence)
- **Collaborations** — Logo track gets `aria-hidden` + `inert` when modal is open
- **Resume** — Distinct `aria-label` on Google Drive vs direct PDF download links to resolve identical-links audit flag

### Performance
- **Legal pages** (Terms, Privacy, Cookies) — Replaced `getBoundingClientRect()` with `scrollIntoView()` to avoid forced reflow
- **Sales Platform** — Hero uses `<picture>` with a dedicated mobile image below 640 px
- **Sales Platform** — `loading="lazy"` on all carousel slides (concepts, wireframes, hi-fi) and UI concept cards
- **Resume** — `loading="lazy"` on experience logos, tool icons, expertise icons, education logos and skills icons
- **Resume** — Explicit `width`/`height` attributes on company and institution logos to prevent layout shift (CLS)

### UI refinements
- **Collaborations modal** — Close button has no idle background; hover adds a filled circle
- **GitHub icon** — Inverts to white in dark mode (`darkInvert: true`)

---

## [1.0.0] — initial release
