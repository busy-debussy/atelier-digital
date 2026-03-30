# Changelog

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
