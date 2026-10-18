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
- Project dialog custom scrollbar is cobalt; footer actions and close button remain visible while the content scrolls, on desktop and mobile.
- Paused-motion mode keeps the project brief visible and usable.
- Fresh page load registers staggered reveals; scrolling updates project/portrait parallax and manifesto progress.
- Reduced-motion behavior reviewed in source; no browser preference was changed during QA.

Screenshots: `desktop-hero.jpg`, `mobile-hero.jpg`, `project-dialog.jpg`, and `scroll-typography.jpg`.

No production deployment was performed. Contact continues through the original Fiverr profile.
