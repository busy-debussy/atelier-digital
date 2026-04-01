# Changelog

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
