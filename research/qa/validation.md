# Validation

Validated on 18 October 2026.

- `npm run lint`: passed.
- `npm run build`: passed, including TypeScript and prerendering.
- Local homepage returns HTTP 200.
- Browser checked at 375px, 768px, 1100px, and the default desktop viewport.
- Hero uses the original founder portrait; no canvas/3D shape remains.
- Mobile layout has no horizontal overflow (document scrollWidth equals clientWidth).
- Portfolio category filter, project details, service selection, manual reviews, and FAQ expansion verified.
- Project brief selection, text entry, review, and clipboard copy verified without submitting an inquiry externally.
- Project dialog custom scrollbar matches the green theme; footer actions and close button remain visible while the content scrolls, on desktop and mobile.
- Paused-motion mode keeps the project brief visible and usable.
- Fresh page load registers staggered reveals; scrolling updates project/portrait parallax and manifesto progress.
- Reduced-motion behavior reviewed in source; no browser preference was changed during QA.

Screenshots: `desktop-hero.jpg`, `mobile-hero.jpg`, `project-dialog.jpg`, and `scroll-typography.jpg`.

No production deployment was performed. Contact continues through the original Fiverr profile.

## Green branding and stronger motion refinement

- Original logo verified in the header and footer; primary controls now use #075344.
- Rebuilt service illustration verified at 375px, with a complete two-line mobile-app heading and no horizontal overflow.
- Desktop hero portrait frame measured 632px wide and 680px high, approximately 16% larger than before.
- Native hero scrolling verified: at 445px of page scroll, the portrait translates upward about 42px while copy moves downward about 29px.
- Portfolio stack verified with sticky cards at 118px and scale recession as the following card approaches.
- Single-result project filtering returns a normal, unpinned card; project dialogs still open and keep actions visible.
- Mobile cards remain in normal flow. At 375px, document scroll width equals client width (365px).
- Final lint and production build passed after the refinements.
- Additional screenshots: `green-large-hero.jpg`, `green-project-stack.jpg`, `service-panel-green-mobile.jpg`, `green-hero-mobile.jpg`.

## Layered deck, animated diagrams, and technology icons

- Desktop projects pin at 118px, 154px, 190px, and 226px. All three earlier labeled spines remain visible behind the final card; flow space holds the complete deck before release.
- Service diagrams use synchronized signal travel, input/output pulses, and a floating core. Computed transforms and signal offsets change while running; the page pause control sets every diagram loop to paused. Reduced motion disables these loops in CSS.
- React, Next.js, WordPress, and AI & Automation appear as the four technology labels with local SVG brand assets and a workflow icon. Service selectors also have matching icons.
- At 375px, technology labels wrap into two columns and document scrollWidth equals clientWidth (365px). Mobile-app heading and animated panel remain readable.
- `npm run lint` and `npm run build` passed after integrating the deck, service animations, and icons.
- Screenshots: `real-card-deck.jpg`, `technology-icons-desktop.jpg`, `technology-icons-mobile.jpg`, `animated-service-mobile.jpg`.

## Mobile stacking correction

- Enabled the layered deck below 1000px with vertically arranged previews and content. At 375x812 and 320x568, cards pin at 88px, 118px, 148px, and 178px; all preceding spines remain visible and no horizontal overflow occurs.
- Tablet 768x1024 also stacks; short landscape 812x375 uses ordinary flow with no hold spacer so the whole card stays reachable.
- Motion now reads the responsive CSS pin offset. Pointer focus after closing the first project keeps z-index values 1, 2, 3, 4; keyboard-visible focus can still raise a card for access.
- Mobile project dialog opening/closing verified. Screenshots: `mobile-card-stack.jpg`, `mobile-card-stack-small.jpg`.

## About section refinement

- Removed the duplicate About portrait; the hero portrait remains. About uses an editorial headline/copy layout with a full-width stats row.
- The heading types once, then continuously cycles its last phrase through possibility, bold ideas, and real impact. Mobile DOM checks show changing text with a stable 146.25px heading height and no horizontal overflow.
- Offscreen/hidden-tab timers stop; pause preserves progress and reduced motion uses the static accessible heading. Screenshot: `about-typing-mobile.jpg`.

## Internal case studies

- Added four original project slugs as in-app pages, including source descriptions, facts, and all gallery assets. Project dialog action now uses an internal Next Link rather than opening WordPress.
- Browser clicked the AI writing project's full case-study action and stayed on localhost. Desktop and 375px mobile layouts verified; mobile scrollWidth equals clientWidth (365px), and every case-study image loaded.
- Static production build generated all four routes; unknown slugs use notFound. Final lint and production build passed.
- Screenshots: `internal-case-study-desktop.jpg`, `internal-case-study-mobile.jpg`.
