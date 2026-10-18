# CustomWebPro — design and motion plan

## Public reference audit

Inspected 18 October 2026 through public HTML and the reference's public JS/CSS bundle.

- Current site: https://customwebpro.webmastery.tech/
- Reference: https://www.apporeo.agency/
- App Oreo's structure is fixed translucent navigation, a pale blue split hero with a typewriter service line and founder portrait, trust cards, service grid, portfolio with a show-more control, interactive team photo with member pins, vertically scrolling testimonials, client logos, and footer. Its public implementation uses Framer Motion and AOS. No actual 3D scene was found.
- The valuable reference pattern is clear progression from promise to trust to services to work to people. Use this progression with CustomWebPro's own content and visual identity. App Oreo's founder, team, reviews, client count, logos, and seller claims belong to that business.

## Creative direction

An independent digital product studio with ambitious craft and a personal founder presence. Warm paper (#F7F7F2), ink (#101112), electric cobalt (#214BFF), quiet grey rules, and a charcoal technical section. Large tightly tracked sans-serif type; small mono labels and section indexes. Broad whitespace and deliberate asymmetry, with a physical reflective blue 3D knot as the memorable identity motif. Prefer strong type and genuine project imagery to generic AI illustrations.

Desktop container: approximately 1,360 px with 5–6vw side gutters. Hero: 55/45 text/visual, 100–130 px display heading, short 18 px body. Mobile: 40–54 px heading, 24 px gutters, text above a roughly 320 px visual. Use 100–140 px between major sections on desktop and 72–88 px on mobile. Avoid uniform rounded-card grids throughout: alternate editorial rows, full-width color fields, and large project canvases.

## Page sequence and content

| Section | Layout and implementation content |
| --- | --- |
| Navigation | CustomWebPro wordmark, Work / Services / About / FAQ anchors, and cobalt Let's talk button. Small availability dot. Mobile menu is a real button and closes after selection. |
| Hero | Eyebrow: Independent development studio. Headline: “Great ideas. / Exceptional / digital realities.” Cobalt accent on final line. Supporting copy covers AI-powered websites, mobile apps, and intelligent automation. Primary “Start a project” and secondary “Explore our work” actions. Right: interactive blue knot, fine orbital lines, discreet “Built for what's next” label. Below: actual source-backed “6+ years experience”, “1.5K+ clients” if retained as the existing site's claim, and “AI · Web · Mobile”. |
| Capability strip | Full-width cobalt or off-white horizontal word band: AI-powered products · Websites that convert · Mobile experiences · Automation. Decorative duplicate items are hidden from assistive technology. |
| Selected work | Editorial heading “Proof, in pixels.” and four genuine existing projects. One large restaurant canvas, paired financial services/construction canvases, then an AI writing/workflow canvas. Cards show project title, service labels, and an accessible details action. Existing site screenshots remain intact; colored frames supply visual cohesion. Project details can use a drawer with actual source content. Never imply invented performance results. |
| Services | Dark charcoal full-width section, small cobalt accents and numbered editorial rows. Three original source categories: AI Mobile Application Development; AI Website Development; Interactive Online Coding Lessons. Expand each category with source-backed capabilities: AI agents/chatbots, SaaS, full-stack development, automation, WordPress design/redesign. Keep each summary short and outcome-focused. |
| Founder / process | Source portrait of Biplob Hossain, “Your idea. My obsession.” or equivalent human headline, founder name and 6+ years of experience. Three steps: Discover / Design & build / Launch & evolve. Include hands-on coding education in supporting copy. Avoid presenting a made-up team. |
| Investment | Three transparent options preserving the source: WordPress websites from $90/project; AI websites & software from $150/project; hourly collaboration $25/hour. State that final scope and quote follow discovery. If detailed packages are exposed, use source values: AI $150/$1,150/$2,250 and WordPress $90/$290/$590. A “Discuss your project” action goes to contact. |
| Testimonials | Three readable quotes with source usernames and countries: mordechaib, Israel; purebullion, United States; v2alarry, United States. Keep exact wording or disclose a shortened excerpt. Large quote plus manual previous/next controls can be more polished than perpetual moving columns. |
| FAQ | Five native details/summary rows from the original site: services, custom AI products, WordPress, ongoing support, and getting started/costs. First item can open initially. |
| Contact / footer | Large “Let's build something / worth clicking.” close, mail/contact action and a working contact form with name/email/message. A form without a backend must clearly show a usable email draft or real mailto action; never fabricate delivery success. Simple service/section links, actual social/Fiverr links from source, and 2026 copyright. |

## Five motion interactions and their access rules

1. **Physical hero object:** real torus-knot geometry with reflective cobalt material, three soft studio lights, slow roughly 25-second rotation and subtle pointer-directed rotation capped around 8°. Scroll moves the object upward at approximately 0.12× page displacement. Clamp pixel ratio to 1.5–2, stop the render loop when offscreen or the tab is hidden, and show a stable CSS/SVG fallback when WebGL fails. The canvas is decorative and has `aria-hidden`; the headline and actions remain HTML. Reduced motion freezes rotation/parallax while retaining the graphic.
2. **Editorial entrance:** hero lines arrive with a restrained 22 px rise and opacity change, 0.7-second ease-out and 80 ms stagger. Section reveals use 18 px translation at 15% visibility, once per visit. Content is visible by default and only enhanced after client initialization so failed JS never hides it. Reduced motion removes translation and staggering; no page-covering loader.
3. **Project depth:** desktop fine-pointer hover applies at most 3° tilt and a 1.035 image scale over 450 ms. A small arrow circle moves about 4 px. All text and actions stay flat and readable; touch/keyboard get a border or cobalt color change with the same information. Disable tilt for coarse pointers and reduced motion. No cursor replacement.
4. **Capability band and section handoff:** a single slow linear band at about 30 px/second bridges hero to work; large backgrounds shift only within their own clipped section, at under 0.08× scroll displacement. Pause the band on hover and focus; a visible pause control is preferable if continuous. Reduced motion presents a wrapped static line. Normal scrolling remains native with no scroll hijacking or forced pinned sequence.
5. **Purposeful controls:** service/FAQ expansion lasts 220–300 ms, button arrow shifts 3–4 px, testimonials crossfade in 200 ms after a manual click. Controls have visible focus, 44 px minimum targets, semantic button/summary elements, `aria-expanded` where applicable, and Escape/return-focus handling for dialogs. Nothing advances automatically while a user is reading or interacting. Reduced motion removes nonessential transitions.

## Build acceptance

- Preserve the actual brand, founder identity, projects, source prices, quotes, and contact destinations; polish copy without importing another agency's claims.
- Every navigation item, work action, pricing CTA, FAQ control, mobile menu, and contact path must work.
- At 375, 768, and 1440 px, no horizontal overflow, clipped headings, hidden controls, or text under the canvas.
- Verify keyboard flow, visible focus, reduced motion, portrait/project image loading, and fallback graphics. Keep the 3D scene as progressive enhancement.

## Final approved direction

The hero uses Biplob's original portrait composition instead of the initial 3D concept. The Three.js component and dependencies have been removed. Typography has been increased throughout, with Geist as the main typeface. Motion now includes layered portrait parallax, staggered section and card entrances, scroll-linked typography, rotating accents, and a process-progress line. Project dialogs use a dedicated scrolling content area with a custom cobalt scrollbar, persistent close control, and an always-visible action footer.

## Logo and green theme refinement

Replaced the temporary wordmark with the original `Screenshot-removebg-preview.png` in the header and footer. The primary theme is now deep green (#075344), with mint highlights and sage surfaces. The favicon uses the original logo mark. Replaced the crowded service-panel wireframe with a contained service graphic; service headings now wrap within zero-minimum grid columns, including on mobile.

## Stronger scroll direction and portrait sizing

The desktop hero portrait is now approximately16% larger (about632px wide in the full desktop container) with a closer subject crop. Hero copy and portrait move in opposite directions during exit. Work cards use native sticky stacking and recession as each next project approaches. Project images have stronger bounded parallax, and an opposing two-line typography ribbon moves with vertical scroll. Mobile retains readable normal-flow project cards; reduced motion disables pinning and nonessential movement.

## Layered cards and icon details

Each desktop project now has a labeled 36px spine and a progressively lower sticky position, so earlier cards remain visible behind the front card. A short flow spacer holds the completed deck before it leaves the viewport. Service diagrams animate a signal from input through a pulsing central icon to output; the global pause control and reduced-motion preference apply. The technology strip contains exactly React, Next.js, WordPress, and AI & Automation, with locally stored brand SVGs and a workflow symbol. Service selectors use matching Lucide icons.
