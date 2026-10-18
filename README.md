# CustomWebPro

A responsive Next.js rebuild with the original logo, a forest-green theme, a large founder portrait, layered hero parallax, sticky project cards, scroll-driven typography, interactive services, case-study galleries, pricing, reviews, FAQs, and a project-brief builder.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000.

```sh
npm run lint
npm run build
npm start
```

## Source archive

- `research/collection-summary.md`: collection scope and results.
- `research/content-catalog.json`: services, projects, reviews, FAQs, and pricing.
- `research/site-content.json` and `research/site-copy.md`: full original copy.
- `research/asset-manifest.json`: source URLs, checksums, and image mappings.
- `research/raw/`: 15 archived public HTML sources.
- `public/images/original/`: 68 original media files.
- `research/design-plan.md`: reference audit and accepted refinements.
- `research/qa/`: browser screenshots and validation notes.

Run the public collector again with `node scripts/collect-content.mjs`.

## Implementation

- `components/agency.tsx`: content and interactive sections.
- `components/motion.tsx`: native scroll progress, parallax, reveal, and stack geometry.
- `components/project-stack.css`: desktop sticky portfolio cards.
- `components/manifesto.tsx`: scroll-linked editorial typography.
- `components/service-panel.css`: responsive service illustrations.
- `components/project-brief.tsx`: inquiry drafting, review, and copy dialog.
- `app/wow-scroll.css`: enlarged portrait and opposing scroll typography.
- `app/scrollbars.css`: custom scrollbars and persistent project-dialog actions.

Contact follows the original Fiverr profile. Visitors prepare and copy their brief, then send it on Fiverr. There is no message-delivery backend.

Motion respects reduced-motion preferences. The visible pause control freezes scroll effects and decorative animation. Portfolio cards stack on desktop, phones, and tablets, with a vertical card layout on smaller screens. Short landscape viewports and reduced motion use ordinary flow so content remains reachable. Native scrolling is preserved throughout.

This is a local implementation. No production domain or WordPress installation has been changed.
