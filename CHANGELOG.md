# Changelog

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
