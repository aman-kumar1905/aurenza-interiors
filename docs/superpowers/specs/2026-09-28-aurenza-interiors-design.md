# AURENZA INTERIORS — Premium Interior Design Studio Website

Status: approved content brief (from user's master prompt), technical design below.
Date: 2026-09-28

## 1. Goal

A single-page, demo-ready React site for a premium interior design studio, built to
impress a client in a demo presentation. Full content, visual, and copy direction
comes from the user's master prompt (reproduced in full in the conversation — not
duplicated here). This document covers the pieces the master prompt left open:
resolved placeholders, technical architecture, data model, and image plan.

**Resolved placeholders** (all still clearly demo/placeholder content, replaceable later):

| Placeholder | Value |
|---|---|
| Studio Name | AURENZA INTERIORS |
| Short brand name (navbar/footer mark) | AURENZA |
| City | Ranchi, Jharkhand, India |
| Hero tagline | "Spaces Designed Around the Way You Live." |
| Copyright | © 2026 AURENZA INTERIORS |

All other copy (section headings, service descriptions, process steps, stats,
testimonial placeholders, etc.) is used exactly as written in the master prompt.

## 2. Tech stack

- React 18 + Vite (fast dev/build, no SSR needed for a demo SPA)
- Tailwind CSS (utility-first, matches the "editorial minimalism" direction without
  hand-rolled CSS files per component)
- `lucide-react` — icon library, explicitly requested
- **No animation library.** Scroll-reveal, hover, and parallax are done with plain
  CSS transitions/keyframes plus one small custom hook (`useInView`, wrapping
  native `IntersectionObserver`) that toggles a class. This covers every animation
  in the brief (fade-up reveals, image zoom on hover, underline animations, navbar
  transition, subtle hero parallax via a scroll-position CSS variable). A library
  like Framer Motion would duplicate what `IntersectionObserver` + CSS already
  does for this brief's motion vocabulary — add it later only if a specific
  interaction (spring physics, drag, shared-layout transitions) needs it.
- Google Fonts via CDN `<link>` in `index.html` (`Playfair Display` for display
  serif headings, `Inter` for body/UI), with `preconnect` + `display=swap`. No
  self-hosting/`@fontsource` — a demo site doesn't need to shave the CDN's one
  extra DNS hop, and CDN fonts are trivially cached across sites.
- Plain `react-router` is **not** added. This is one page today; section 21's
  future `/interior-design-ranchi` etc. pages are explicitly future work, and
  adding a router for a single route is speculative. When those pages are built,
  introducing `react-router` at that point is a small, contained change.

## 3. Design tokens

Tailwind theme extension (in `tailwind.config.js`):

```js
colors: {
  ivory: '#F7F3EC',      // background
  sand: '#EDE4D6',       // section alt background
  charcoal: '#1E1C1A',   // near-black text/bg
  taupe: '#A69682',      // muted accent / borders
  earth: '#6B5B4D',      // secondary text / brown accent
  champagne: '#C9A876',  // sparing gold accent (underlines, small details only)
},
fontFamily: {
  serif: ['"Playfair Display"', 'serif'],
  sans: ['Inter', 'sans-serif'],
}
```

Rule enforced throughout: champagne accent is used only for thin underlines,
small numerals (01—05), and hover states — never as a fill color or large block,
per the brief's "very subtle" direction.

## 4. Project structure

```
src/
  components/
    Navbar.jsx
    Hero.jsx
    Intro.jsx
    FeaturedProjects.jsx
    Services.jsx
    DesignPhilosophy.jsx
    Stats.jsx
    ProcessStory.jsx      # "From Concept to Space" (section 11)
    Materials.jsx         # "Details Make the Space" (section 12)
    Process.jsx           # "A Thoughtful Process" (section 13)
    Testimonials.jsx
    About.jsx
    CTA.jsx
    Footer.jsx
  data/
    projects.js           # featured project cards (title, category, images, layout hint)
    services.js
    stats.js
    process.js
    testimonials.js
  hooks/
    useInView.js           # IntersectionObserver reveal hook
    useScrollY.js           # rAF-throttled scroll position for navbar + hero parallax
  assets/images/            # downloaded, locally-stored images (see §6)
  App.jsx
  main.jsx
  index.css                 # Tailwind directives + a handful of @keyframes
index.html                  # SEO meta, font links, title
tailwind.config.js
vite.config.js
```

Data-driven sections (`projects.js`, `services.js`, `stats.js`, `process.js`,
`testimonials.js`) mean a client swap later is "edit the array," not "edit JSX,"
satisfying the brief's "easy-to-replace" requirement without building an admin
panel or CMS (out of scope — YAGNI for a demo).

Example shape for `projects.js`:

```js
export const projects = [
  {
    id: 'modern-residence',
    title: 'The Modern Residence',
    category: 'Contemporary Residential',
    image: '/src/assets/images/projects/modern-residence.jpg',
    layout: 'wide', // controls card aspect/grid span for visual variety
  },
  // ...
]
```

## 5. Image plan

All images are **downloaded and committed locally** to `src/assets/images/`
(per user's decision), sourced from Unsplash (free-to-use license), chosen for:
contemporary interiors, warm natural light, neutral/earthy palette, real
architectural photography (not AI-looking, not generic stock).

Folders:
- `hero/` — 1 cinematic wide interior shot
- `intro/` — 1 architectural image
- `projects/` — 4–6 images (one hero image per project card; 2 of the 4 projects
  get a secondary image for layout variety per the brief's "not every card looks
  identical" requirement)
- `philosophy/` — 1 image
- `process-story/` — 1 large + 2 supporting images ("Concept to Space")
- `materials/` — 6 close-up shots: stone, wood, fabric, metal, lighting, texture
- `about/` — 1 image
- `cta/` — 1 full-width closing image

Total ≈ 18 images. Each is downloaded at a reasonable max width (~2000px) and
served via a plain `<img loading="lazy">` (native lazy-loading — no library)
except the hero image, which loads eagerly. `width`/`height` attributes are set
to avoid layout shift. No image CDN/transform pipeline is introduced for a demo
of this size; if real client photography arrives later with dozens of images,
revisit with a proper image-optimization step at that point.

Each image file gets a short comment in `data/` (or a co-located `README` in
`assets/images/`) noting it's placeholder/demo photography to be replaced with
real project photography.

## 6. SEO

- `index.html` title: `AURENZA INTERIORS | Interior Design & Architecture in Ranchi`
- Meta description referencing interior design, residential interiors, luxury
  homes, modular kitchens, and commercial interiors in Ranchi.
- One `<h1>` (hero heading), semantic `<h2>` per major section, `<h3>` for
  sub-items (services, process steps).
- Descriptive `alt` text per image (not keyword-stuffed).
- Section anchors (`#projects`, `#services`, `#about`, `#process`, `#contact`)
  give the nav real, crawlable in-page links.
- Future city-specific landing pages (`/interior-design-ranchi`, etc.) are
  explicitly deferred — no routing scaffold is pre-built for them.

## 7. Accessibility & responsiveness

- All interactive elements (nav links, buttons) are real `<button>`/`<a>` with
  visible focus states — no click-handler `<div>`s.
- `prefers-reduced-motion` media query disables the scroll-reveal transitions and
  hero parallax transform for users who request it.
- Mobile breakpoints handled entirely through Tailwind responsive utilities —
  no separate mobile component tree.

## 8. Verification

Non-trivial logic in this project is `useInView`/`useScrollY` (the only actual
JS logic — everything else is presentational). Each gets one runnable check:

- `useInView`: a small manual smoke test — render a component using it in
  isolation (or a simple `demo()` in a scratch file) and assert the class toggles
  when a mocked `IntersectionObserver` fires. No test framework is added if the
  project doesn't already need one elsewhere.
- End-to-end: `npm run build` must succeed, and a manual pass through the page
  (desktop + mobile viewport) checks the section-by-section quality bar from the
  brief's section 24.

## 9. Explicitly out of scope

- CMS/admin panel for editing content (data files fill this role at demo scale)
- Multi-page routing / future local-SEO city pages
- Backend/contact-form submission handling (buttons are demo CTAs — a "Book a
  Consultation" click can `mailto:`/scroll-to-contact for now; wiring a real
  form backend is a follow-up task once the studio has a real intake process)
- Automated visual regression/E2E test suite (manual QA per §8 is proportionate
  for a single-page demo)
