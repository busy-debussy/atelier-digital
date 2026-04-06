# Changelog 

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
