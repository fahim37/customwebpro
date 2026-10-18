# Original asset guide

All paths below are relative to `public`. Originals are downloaded byte for byte; source URLs, WordPress IDs, dimensions and SHA-256 hashes are in `asset-manifest.json`.

## Current identity

- Portrait: `/images/original/Confident-Business-Portrait-Cutout.png` — 1105 × 1424, transparent background; visually inspected.
- Original header wordmark: `/images/original/Screenshot-removebg-preview.png` — 362 × 88.
- Original footer wordmark: `/images/original/Screenshot-2.png` — 354 × 82.
- Original favicon: `/images/original/cropped-Screenshot.png` — 512 × 512.
- Alternate portraits and older template imagery are preserved too; avoid confusing the unused `banner_author.png` with Biplob's current portrait.

## Current case studies

| Case | Primary image | Additional images |
|---|---|---|
| AI restaurant | `/images/original/Restaurant-Website-UI-Design-1.webp` | `Restaurant-Website-UI-Design.webp` (full page, 718 × 2188) |
| Finance / SaaS | `/images/original/Modern-SaaS-workspace-with-sleek-devices.webp` | `Modern-SaaS-UI-1.webp`, `Modern-SaaS-UI-2.webp` |
| Construction | `/images/original/Construction-company-website-1.webp` | `Construction-company-website-2.webp`, `Construction-company-website-3.webp` |
| AI writing | `/images/original/Untitled-1.webp` | `Untitled-2.webp`, `Untitled-3.webp` |

The original media filenames are retained for traceability. `source-project-overview.jpg` is a diagnostic contact sheet of these four primary images.

## Technology logos

The source carousel contains technologies, not client logos. `source-logo-overview.jpg` was visually inspected to establish these identities.

| Technology | Original filename |
|---|---|
| Flutter | `Screenshot_2-removebg-preview.png` |
| Dart | `Screenshot_3-removebg-preview.png` |
| Node.js | `image-removebg-preview-2.png` |
| React | `image-removebg-preview-1.png` |
| Next.js | `image-removebg-preview.png` |
| MongoDB | `image-removebg-preview-4.png` |
| Express | `image-removebg-preview-3.png` |
| TypeScript | `image-removebg-preview-6.png` |
| Mongoose | `image-removebg-preview-5.png` |
| OpenAI | `image-removebg-preview-9.png` |
| Python | `image-removebg-preview-8.png` |
| JavaScript | `image-removebg-preview-7.png` |

## Content and contact

`content-catalog.json` provides normalized services, all four case studies with galleries and project metadata, all five FAQs, all three testimonials, six package tiers and contact information. The larger `site-content.json` contains the complete extraction, including unused legacy `/home/` content, published templates and archive pages.

The source publishes a Fiverr profile as its contact destination: `https://www.fiverr.com/customweb_pro`. It has no published email address or telephone number. The old contact form depends on the source WordPress/Elementor installation.

## Collection verification

- 15 unique public HTML sources archived, with 15 distinct raw HTML files.
- 68 original media images downloaded; all 68 local byte counts and SHA-256 hashes match the manifest.
- 221 responsive thumbnail URLs mapped to canonical originals.
- 16 Elementor CSS files examined for background images.
- All collection HTTP requests succeeded; zero missing local page or image files.
- `node --check scripts/collect-content.mjs` passed.

The current source homepage is `raw/index.html`; `raw/home.html` is a separate, older published `/home/` page.
