# AURENZA INTERIORS Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the AURENZA INTERIORS single-page React demo site: a premium, editorial-minimalist interior design studio landing page with 13 content sections, locally-stored photography, restrained scroll/hover animation, and a clean SEO/accessibility/performance foundation.

**Architecture:** Vite + React SPA. All motion comes from two small hooks (`useInView` wrapping `IntersectionObserver`, `useScrollY` wrapping a rAF-throttled scroll listener) plus CSS — no animation library. Content lives in plain JS arrays under `src/data/`, so components are pure render functions over data and a client swap later means editing an array, not JSX. Tailwind supplies the whole visual language via a small custom theme (ivory/sand/charcoal/taupe/earth/champagne + Playfair Display/Inter).

**Tech Stack:** React 18, Vite, Tailwind CSS, lucide-react, Vitest + @testing-library/react (hook unit tests only).

**Spec:** [docs/superpowers/specs/2026-09-28-aurenza-interiors-design.md](../specs/2026-09-28-aurenza-interiors-design.md)

## Global Constraints

- Studio name: **AURENZA INTERIORS**; short mark: **AURENZA**; city: **Ranchi, Jharkhand, India**; hero tagline: **"Spaces Designed Around the Way You Live."** — used verbatim everywhere they appear.
- No animation library, no router, no CMS, no backend — per the approved spec, exactly as re-confirmed by the user.
- Colors, fonts, and section copy come from the master prompt and spec verbatim; do not paraphrase headings or body copy given literally in either document.
- All images are downloaded and committed locally under `src/assets/images/<section>/` — never hotlinked at runtime.
- Every image `<img>` has explicit `width`/`height` (or an `aspect-[…]` wrapper) to prevent layout shift, and `loading="lazy"` except the hero image.
- `prefers-reduced-motion: reduce` disables all scroll-reveal transitions and the hero parallax transform.
- Presentational components (everything except the two hooks) are verified by `npm run dev` visual QA and `npm run build` succeeding, not by unit tests — per the spec's Verification section, only the two hooks carry real logic worth a test.
- Every task ends with a commit.

## Review Focus

- **IntersectionObserver unsupported or `prefers-reduced-motion` set:** content must render fully visible immediately, never stuck at `opacity: 0` — covered by `useInView`'s no-IO fallback (Task 4) and the reduced-motion CSS override (Task 20).
- **Images loading slowly on a throttled connection:** sections must not jump/reflow as images pop in — covered by explicit `width`/`height` on every `<img>` (enforced per-component, Tasks 6–19).
- **Mobile menu open, user presses Escape or taps a nav link:** menu must close and never trap focus — covered by the Navbar's `onKeyDown` handler and link `onClick` handler (Task 6).
- **Very long text values from a future data swap (e.g. a longer service description or project title):** cards must grow/wrap, never clip or overlap neighboring content — covered by using `min-h-*` (not fixed `h-*`) and `flex`/`grid` with natural wrapping in every data-driven component (Tasks 6, 9, 10, 12, 13, 15, 16).
- **Ultra-wide desktop viewport (≥1920px):** hero and section content must stay centered and legible, not stretch full-bleed into unreadable line lengths — covered by `max-w-7xl mx-auto` containers on every section and a `max-w-[…ch]` cap on body-copy blocks (Task 20 final pass, spot-checked per component).

---

## File structure

```
aurenza-interiors/
  index.html
  vite.config.js
  tailwind.config.js
  postcss.config.js
  package.json
  vitest.config.js
  src/
    main.jsx
    App.jsx
    index.css
    hooks/
      useInView.js
      useInView.test.jsx
      useScrollY.js
      useScrollY.test.jsx
    data/
      projects.js
      services.js
      stats.js
      process.js
      testimonials.js
    components/
      Navbar.jsx
      Hero.jsx
      Intro.jsx
      FeaturedProjects.jsx
      Services.jsx
      DesignPhilosophy.jsx
      Stats.jsx
      ProcessStory.jsx
      Materials.jsx
      Process.jsx
      Testimonials.jsx
      About.jsx
      CTA.jsx
      Footer.jsx
    assets/
      images/
        README.md
        hero/
        intro/
        projects/
        philosophy/
        process-story/
        materials/
        about/
        cta/
  test/
    setupTests.js
```

---

## Task 1: Project scaffold — Vite, React, Tailwind, fonts, SEO shell

**Files:**
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `vitest.config.js`, `test/setupTests.js`
- Create: `index.html`
- Create: `src/main.jsx`, `src/App.jsx`, `src/index.css`

**Interfaces:**
- Produces: Tailwind color tokens (`ivory`, `sand`, `charcoal`, `taupe`, `earth`, `champagne`) and font families (`font-serif`, `font-sans`) that every later component uses.

- [ ] **Step 1: Scaffold the Vite React project**

```bash
npm create vite@latest . -- --template react
```

(Run in `E:\Interior_design`; when prompted about a non-empty directory, confirm since only `docs/` and `.git` exist.)

- [ ] **Step 2: Install dependencies**

```bash
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Initialize Tailwind config with the design tokens**

`tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F3EC',
        sand: '#EDE4D6',
        charcoal: '#1E1C1A',
        taupe: '#A69682',
        earth: '#6B5B4D',
        champagne: '#C9A876',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      transitionDuration: {
        400: '400ms',
      },
    },
  },
  plugins: [],
}
```

`postcss.config.js`:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 4: Write `src/index.css` with Tailwind directives and shared keyframes**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-ivory text-charcoal font-sans antialiased;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal {
  opacity: 0;
}

.reveal.is-visible {
  animation: fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .reveal,
  .reveal.is-visible {
    opacity: 1;
    animation: none;
    transform: none;
  }

  .parallax-layer {
    transform: none !important;
  }
}
```

- [ ] **Step 5: Write `index.html` with SEO meta and font links**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AURENZA INTERIORS | Interior Design & Architecture in Ranchi</title>
    <meta
      name="description"
      content="AURENZA INTERIORS is an interior design and architecture studio in Ranchi, Jharkhand, crafting considered residential interiors, luxury homes, modular kitchens and commercial interiors."
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;1,500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Write `src/main.jsx` and a placeholder `src/App.jsx`**

```jsx
// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

```jsx
// src/App.jsx
export default function App() {
  return (
    <main className="min-h-screen bg-ivory">
      <h1 className="font-serif text-4xl text-center py-24">AURENZA INTERIORS</h1>
    </main>
  )
}
```

- [ ] **Step 7: Configure Vitest**

`vitest.config.js`:

```js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setupTests.js'],
  },
})
```

`test/setupTests.js`:

```js
import '@testing-library/jest-dom/vitest'
```

Add to `package.json` scripts:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest run"
}
```

- [ ] **Step 8: Verify the scaffold boots**

Run: `npm run dev` — open the printed local URL, confirm "AURENZA INTERIORS" renders on an ivory background with a serif font.

Run: `npm run build` — Expected: build succeeds with no errors.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite/React/Tailwind project with AURENZA design tokens"
```

---

## Task 2: Source and download the 18 local images

**Files:**
- Create: `src/assets/images/README.md`
- Create: 18 image files under `src/assets/images/{hero,intro,projects,philosophy,process-story,materials,about,cta}/`

**Interfaces:**
- Produces: the exact file paths every later component's `<img src>` points to (listed below — filenames are fixed so later tasks can reference them without re-deciding names).

This task is research + curation, not code: the exact source photo for each slot can't be pinned before searching, so this task is scoped by **search query, licensing rule, and output path** rather than a pre-chosen URL.

- [ ] **Step 1: Set the sourcing rule**

Every image must come from Unsplash (unsplash.com), be usable under the Unsplash License (free to use, no attribution required, but note the photographer in the README anyway as good practice), depict a real contemporary interior/architecture space (not an illustration or AI-generated image), and be at least 1600px on its long edge. Reject anything that looks like generic corporate stock (posed people, logos, watermarks).

- [ ] **Step 2: Search and download each image to its exact path**

For each row, search Unsplash for the query, pick the best-matching real photo, download it via its `images.unsplash.com` direct URL with `?auto=format&fit=crop&w=2000&q=80` appended (controls output size/quality), and save to the given path:

| Path | Search query | Notes |
|---|---|---|
| `src/assets/images/hero/hero-main.jpg` | "modern living room floor to ceiling windows natural light" | Wide/cinematic crop, warm tones |
| `src/assets/images/intro/intro-architecture.jpg` | "minimalist interior architecture staircase natural light" | Portrait or square-ish crop |
| `src/assets/images/projects/modern-residence.jpg` | "contemporary residential living room neutral palette" | Project 1 primary |
| `src/assets/images/projects/earth-form.jpg` | "luxury apartment interior earthy tones" | Project 2 primary |
| `src/assets/images/projects/earth-form-detail.jpg` | "luxury apartment interior detail texture" | Project 2 secondary (layout variety) |
| `src/assets/images/projects/quiet-villa.jpg` | "contemporary villa interior courtyard natural light" | Project 3 primary |
| `src/assets/images/projects/urban-executive.jpg` | "modern office commercial interior wood paneling" | Project 4 primary |
| `src/assets/images/projects/urban-executive-detail.jpg` | "modern office interior detail lighting" | Project 4 secondary |
| `src/assets/images/philosophy/philosophy-main.jpg` | "natural material interior design wood stone" | |
| `src/assets/images/process-story/process-main.jpg` | "interior design mood board materials flat lay" | Large hero image for section |
| `src/assets/images/process-story/process-detail-1.jpg` | "architectural floor plan sketch design" | Supporting visual |
| `src/assets/images/process-story/process-detail-2.jpg` | "interior design fabric material samples" | Supporting visual |
| `src/assets/images/materials/stone.jpg` | "marble stone texture close up interior" | |
| `src/assets/images/materials/wood.jpg` | "wood grain texture close up furniture" | |
| `src/assets/images/materials/fabric.jpg` | "linen fabric texture upholstery close up" | |
| `src/assets/images/materials/metal.jpg` | "brushed brass metal fixture close up" | |
| `src/assets/images/materials/lighting.jpg` | "pendant light fixture interior close up" | |
| `src/assets/images/materials/texture.jpg` | "plaster wall texture natural light" | |
| `src/assets/images/about/about-main.jpg` | "architect design studio workspace natural light" | |
| `src/assets/images/cta/cta-main.jpg` | "warm minimalist living room evening light" | Full-width closing image |

(20 files listed — two projects get a secondary image per the spec's "not every card looks identical" requirement, bringing the total to 20; the spec's "≈18" was an estimate, not a hard cap.)

- [ ] **Step 3: Write the placeholder-photography README**

`src/assets/images/README.md`:

```markdown
# Demo photography

Every image in this directory is placeholder/demo photography sourced from
Unsplash for the AURENZA INTERIORS demo presentation. None of it depicts a
real AURENZA INTERIORS project. Replace each file (keeping the same
filename and aspect ratio) with real client photography once available —
no code changes are needed elsewhere, since components reference these
paths through `src/data/*.js`.
```

- [ ] **Step 4: Verify**

Run: `ls -la src/assets/images/*/` (or `Get-ChildItem -Recurse src/assets/images`) — Expected: 20 image files across 8 folders, each ≥ 200KB (sanity check that downloads aren't broken/empty), plus the README.

- [ ] **Step 5: Commit**

```bash
git add src/assets/images
git commit -m "content: add locally-stored demo photography for all sections"
```

---

## Task 3: Data layer

**Files:**
- Create: `src/data/projects.js`, `src/data/services.js`, `src/data/stats.js`, `src/data/process.js`, `src/data/testimonials.js`

**Interfaces:**
- Consumes: image paths from Task 2.
- Produces: the exact array/field shapes `FeaturedProjects`, `Services`, `Stats`, `Process`, `ProcessStory`, and `Testimonials` (Tasks 9, 10, 12, 13, 15, 16) import and map over.

- [ ] **Step 1: `src/data/projects.js`**

```js
import modernResidence from '../assets/images/projects/modern-residence.jpg'
import earthForm from '../assets/images/projects/earth-form.jpg'
import earthFormDetail from '../assets/images/projects/earth-form-detail.jpg'
import quietVilla from '../assets/images/projects/quiet-villa.jpg'
import urbanExecutive from '../assets/images/projects/urban-executive.jpg'
import urbanExecutiveDetail from '../assets/images/projects/urban-executive-detail.jpg'

// Demo/concept projects — not claimed real client work. Replace with real
// project photography and names when available.
export const projects = [
  {
    id: 'modern-residence',
    title: 'The Modern Residence',
    category: 'Contemporary Residential',
    image: modernResidence,
    secondaryImage: null,
    layout: 'wide',
  },
  {
    id: 'earth-form',
    title: 'Earth & Form',
    category: 'Luxury Apartment',
    image: earthForm,
    secondaryImage: earthFormDetail,
    layout: 'split',
  },
  {
    id: 'quiet-villa',
    title: 'The Quiet Villa',
    category: 'Contemporary Villa',
    image: quietVilla,
    secondaryImage: null,
    layout: 'tall',
  },
  {
    id: 'urban-executive',
    title: 'Urban Executive',
    category: 'Commercial Interior',
    image: urbanExecutive,
    secondaryImage: urbanExecutiveDetail,
    layout: 'split',
  },
]
```

- [ ] **Step 2: `src/data/services.js`**

```js
export const services = [
  {
    id: 'residential-interiors',
    title: 'Residential Interiors',
    description:
      'Complete interior concepts designed around lifestyle, comfort and functionality.',
  },
  {
    id: 'luxury-homes',
    title: 'Luxury Homes',
    description:
      'Thoughtfully composed spaces with refined materials and architectural detailing.',
  },
  {
    id: 'modular-kitchens',
    title: 'Modular Kitchens',
    description:
      'Functional kitchens balancing storage, workflow and aesthetics.',
  },
  {
    id: 'living-dining',
    title: 'Living & Dining',
    description:
      'Social spaces designed for comfort, character and everyday living.',
  },
  {
    id: 'bedrooms',
    title: 'Bedrooms',
    description:
      'Calm, personalised spaces built around rest and atmosphere.',
  },
  {
    id: 'commercial-interiors',
    title: 'Commercial Interiors',
    description:
      'Professional environments designed around brand identity and user experience.',
  },
]
```

- [ ] **Step 3: `src/data/stats.js`**

```js
// Demo/placeholder values — not the client's actual achievements.
export const stats = [
  { id: 'projects', value: '50+', label: 'Concept Projects' },
  { id: 'years', value: '08', label: 'Years of Design Thinking' },
  { id: 'cities', value: '12', label: 'Cities / Regions' },
  { id: 'approach', value: '100%', label: 'Personalised Approach' },
]
```

- [ ] **Step 4: `src/data/process.js`**

```js
export const processSteps = [
  {
    id: 'discover',
    number: '01',
    title: 'Discover',
    description: 'Understand the space, lifestyle, needs and aspirations.',
  },
  {
    id: 'define',
    number: '02',
    title: 'Define',
    description:
      'Develop the design direction, spatial priorities and material language.',
  },
  {
    id: 'design',
    number: '03',
    title: 'Design',
    description:
      'Create layouts, visual concepts, materials and detailed design development.',
  },
  {
    id: 'refine',
    number: '04',
    title: 'Refine',
    description: 'Review details, finishes, lighting and furniture selections.',
  },
  {
    id: 'deliver',
    number: '05',
    title: 'Deliver',
    description: 'Coordinate execution and bring the designed space to life.',
  },
]

export const conceptToSpaceSteps = [
  { id: 'understanding', number: '01', title: 'Understanding' },
  { id: 'planning', number: '02', title: 'Planning' },
  { id: 'material-direction', number: '03', title: 'Material Direction' },
  { id: 'design-development', number: '04', title: 'Design Development' },
  { id: 'execution', number: '05', title: 'Execution' },
]
```

- [ ] **Step 5: `src/data/testimonials.js`**

```js
// Placeholder testimonial content — structured so real client testimonials
// can replace it later without touching Testimonials.jsx.
export const testimonials = [
  {
    id: 'demo-1',
    quote:
      'Every detail felt considered — from the first conversation to the final walkthrough, the space came together exactly the way we had imagined living in it.',
    name: 'Demo Client Name',
    projectType: 'Residential Interior, Ranchi',
  },
  {
    id: 'demo-2',
    quote:
      'What stood out was the restraint — nothing felt excessive, every material and finish had a reason to be there.',
    name: 'Demo Client Name',
    projectType: 'Luxury Apartment, Ranchi',
  },
]
```

- [ ] **Step 6: Verify data imports resolve**

Temporarily import each data file into `src/App.jsx`, log `projects.length`, `services.length`, etc. to the console, run `npm run dev`, confirm expected counts (4, 6, 4, 5, 5, 2) in the browser console, then remove the temporary logging.

- [ ] **Step 7: Commit**

```bash
git add src/data
git commit -m "feat: add structured content data files for all sections"
```

---

## Task 4: `useInView` hook (scroll-reveal)

**Files:**
- Create: `src/hooks/useInView.js`
- Test: `src/hooks/useInView.test.jsx`

**Interfaces:**
- Produces: `useInView(options?) => [ref, isInView]` — `ref` attaches to the element to observe, `isInView` (boolean) flips to `true` once and stays `true`. Every section component (Tasks 8–19) calls this once per reveal target.

- [ ] **Step 1: Write the failing test**

```jsx
// src/hooks/useInView.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { useInView } from './useInView'

let observedCallback
class MockIntersectionObserver {
  constructor(callback) {
    observedCallback = callback
  }
  observe() {}
  disconnect() {}
}

function TestComponent({ onValue }) {
  const [ref, isInView] = useInView()
  onValue(isInView)
  return <div ref={ref}>target</div>
}

describe('useInView', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  })

  it('starts false and becomes true once the target intersects', () => {
    const values = []
    render(<TestComponent onValue={(v) => values.push(v)} />)

    expect(values[values.length - 1]).toBe(false)

    observedCallback([{ isIntersecting: true }])

    expect(values[values.length - 1]).toBe(true)
  })

  it('falls back to true immediately when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    const values = []
    render(<TestComponent onValue={(v) => values.push(v)} />)

    expect(values[values.length - 1]).toBe(true)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- useInView`
Expected: FAIL — `useInView` does not exist yet.

- [ ] **Step 3: Implement `useInView`**

```js
// src/hooks/useInView.js
import { useEffect, useRef, useState } from 'react'

export function useInView({ threshold = 0.15, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, isInView]
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- useInView`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useInView.js src/hooks/useInView.test.jsx
git commit -m "feat: add useInView scroll-reveal hook with IO-unavailable fallback"
```

---

## Task 5: `useScrollY` hook (navbar transition + hero parallax)

**Files:**
- Create: `src/hooks/useScrollY.js`
- Test: `src/hooks/useScrollY.test.jsx`

**Interfaces:**
- Produces: `useScrollY() => number` (current `window.scrollY`, rAF-throttled). Consumed by `Navbar` (Task 6, to switch background) and `Hero` (Task 7, for the parallax transform).

- [ ] **Step 1: Write the failing test**

```jsx
// src/hooks/useScrollY.test.jsx
import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useScrollY } from './useScrollY'

describe('useScrollY', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('starts at 0 and updates after a scroll event via rAF', () => {
    vi.stubGlobal('requestAnimationFrame', (cb) => {
      cb()
      return 1
    })

    const { result } = renderHook(() => useScrollY())
    expect(result.current).toBe(0)

    act(() => {
      window.scrollY = 240
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe(240)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- useScrollY`
Expected: FAIL — `useScrollY` does not exist yet.

- [ ] **Step 3: Implement `useScrollY`**

```js
// src/hooks/useScrollY.js
import { useEffect, useRef, useState } from 'react'

export function useScrollY() {
  const [scrollY, setScrollY] = useState(0)
  const ticking = useRef(false)

  useEffect(() => {
    function handleScroll() {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        ticking.current = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- useScrollY`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useScrollY.js src/hooks/useScrollY.test.jsx
git commit -m "feat: add rAF-throttled useScrollY hook"
```

---

## Task 6: `Navbar`

**Files:**
- Create: `src/components/Navbar.jsx`

**Interfaces:**
- Consumes: `useScrollY()` from Task 5.
- Produces: `<Navbar />`, no props — mounted once in `App.jsx` (Task 20). Nav links point to in-page anchors (`#projects`, `#services`, `#about`, `#process`, `#contact`) that later tasks give matching `id`s.

- [ ] **Step 1: Implement `Navbar.jsx`**

```jsx
// src/components/Navbar.jsx
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useScrollY } from '../hooks/useScrollY'

const links = [
  { href: '#projects', label: 'Projects' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const scrollY = useScrollY()
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = scrollY > 40

  function closeMenu() {
    setMenuOpen(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') closeMenu()
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-400 ${
        scrolled ? 'bg-ivory/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-5"
        onKeyDown={handleKeyDown}
      >
        <a href="#top" className="font-serif text-xl tracking-wide text-charcoal">
          AURENZA
        </a>

        <ul className="hidden md:flex items-center gap-10 font-sans text-sm tracking-wide text-charcoal">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative py-1 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-champagne after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-block border border-charcoal px-5 py-2 text-sm tracking-wide text-charcoal hover:bg-charcoal hover:text-ivory transition-colors duration-300"
        >
          Book a Consultation
        </a>

        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="md:hidden text-charcoal"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {menuOpen && (
        <ul className="md:hidden bg-ivory px-6 pb-6 flex flex-col gap-4 font-sans text-base text-charcoal">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={closeMenu}
              className="inline-block border border-charcoal px-5 py-2 text-sm"
            >
              Book a Consultation
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Verify manually**

Run: `npm run dev`. Confirm: navbar is transparent at the top of the page, switches to a blurred ivory background after scrolling ~40px; on a mobile-width viewport the hamburger opens/closes the menu, Escape closes it, and clicking a link closes it.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: add sticky Navbar with scroll transition and mobile menu"
```

---

## Task 7: `Hero`

**Files:**
- Create: `src/components/Hero.jsx`

**Interfaces:**
- Consumes: `useScrollY()` (Task 5), `src/assets/images/hero/hero-main.jpg` (Task 2).
- Produces: `<Hero />`, mounted first in `App.jsx`'s main content, `id="top"`.

- [ ] **Step 1: Implement `Hero.jsx`**

```jsx
// src/components/Hero.jsx
import { ChevronDown } from 'lucide-react'
import { useScrollY } from '../hooks/useScrollY'
import heroImage from '../assets/images/hero/hero-main.jpg'

export default function Hero() {
  const scrollY = useScrollY()

  return (
    <section id="top" className="relative h-screen min-h-[640px] overflow-hidden">
      <div
        className="parallax-layer absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.15}px) scale(1.1)` }}
      >
        <img
          src={heroImage}
          alt="Contemporary living room with floor-to-ceiling windows and warm natural light"
          width={2000}
          height={1333}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/40" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="text-ivory/80 text-xs md:text-sm tracking-[0.3em] uppercase font-sans mb-6">
          Interior Architecture &bull; Design &bull; Craft
        </p>
        <h1 className="font-serif text-ivory text-4xl md:text-6xl lg:text-7xl leading-[1.1] max-w-4xl">
          Spaces Designed
          <br />
          Around the Way
          <br />
          You Live.
        </h1>
        <p className="text-ivory/80 font-sans text-base md:text-lg mt-6 max-w-xl">
          Thoughtful interiors shaped by architecture, material, light and the
          people who inhabit them.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <a
            href="#projects"
            className="bg-ivory text-charcoal px-7 py-3 text-sm tracking-wide hover:bg-champagne transition-colors duration-300"
          >
            Explore Our Work
          </a>
          <a
            href="#contact"
            className="border border-ivory text-ivory px-7 py-3 text-sm tracking-wide hover:bg-ivory hover:text-charcoal transition-colors duration-300"
          >
            Book a Consultation
          </a>
        </div>
      </div>

      <ChevronDown
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/80 animate-bounce"
        size={28}
        aria-hidden="true"
      />
    </section>
  )
}
```

- [ ] **Step 2: Verify manually**

Run: `npm run dev`. Confirm: hero fills the viewport, headline/copy/buttons are centered and legible over the image, scrolling produces a subtle parallax drift on the background image, and the drift disables under simulated `prefers-reduced-motion: reduce` (DevTools → Rendering → Emulate CSS media feature).

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "feat: add cinematic Hero section with scroll parallax"
```

---

## Task 8: `Intro`

**Files:**
- Create: `src/components/Intro.jsx`

**Interfaces:**
- Consumes: `useInView` (Task 4), `src/assets/images/intro/intro-architecture.jpg` (Task 2).
- Produces: `<Intro />`.

- [ ] **Step 1: Implement `Intro.jsx`**

```jsx
// src/components/Intro.jsx
import { useInView } from '../hooks/useInView'
import introImage from '../assets/images/intro/intro-architecture.jpg'

export default function Intro() {
  const [ref, isInView] = useInView()

  return (
    <section className="bg-ivory py-24 md:py-32 px-6 md:px-12">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center reveal ${
          isInView ? 'is-visible' : ''
        }`}
      >
        <div>
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-earth font-sans mb-6">
            The Studio
          </p>
          <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] text-charcoal max-w-xl">
            We create interiors that feel considered, timeless and distinctly
            yours.
          </h2>
          <p className="mt-8 text-charcoal/70 font-sans text-base md:text-lg leading-relaxed max-w-[60ch]">
            Every project is approached through spatial planning, material
            selection, lighting, furniture and craftsmanship — balanced with
            functionality and visual harmony, so the result feels like it
            could only belong to the people living in it.
          </p>
        </div>

        <div className="md:pl-8">
          <img
            src={introImage}
            alt="Minimalist staircase interior with natural light"
            width={1400}
            height={1750}
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify manually**

Run: `npm run dev`, scroll to the section. Confirm: text and image sit in an asymmetric two-column layout on desktop, stack cleanly on mobile, and the block fades up once it enters the viewport.

- [ ] **Step 3: Commit**

```bash
git add src/components/Intro.jsx
git commit -m "feat: add editorial Intro section"
```

---

## Task 9: `FeaturedProjects`

**Files:**
- Create: `src/components/FeaturedProjects.jsx`

**Interfaces:**
- Consumes: `projects` from `src/data/projects.js` (Task 3), `useInView` (Task 4).
- Produces: `<FeaturedProjects />`, `id="projects"`.

- [ ] **Step 1: Implement `FeaturedProjects.jsx`**

```jsx
// src/components/FeaturedProjects.jsx
import { ArrowUpRight } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import { projects } from '../data/projects'

function ProjectCard({ project }) {
  const [ref, isInView] = useInView()
  const spanClass =
    project.layout === 'wide'
      ? 'md:col-span-2'
      : project.layout === 'tall'
      ? 'md:row-span-2'
      : ''
  const aspectClass = project.layout === 'tall' ? 'aspect-[3/4]' : 'aspect-[16/10]'

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden reveal ${spanClass} ${
        isInView ? 'is-visible' : ''
      }`}
    >
      <div className={`${aspectClass} overflow-hidden`}>
        <img
          src={project.image}
          alt={`${project.title} — ${project.category}`}
          width={1600}
          height={1000}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 md:p-8 text-ivory">
        <p className="text-xs tracking-[0.25em] uppercase font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-2">
          {project.category}
        </p>
        <div className="flex items-center gap-3">
          <h3 className="font-serif text-2xl md:text-3xl transition-transform duration-300 group-hover:-translate-y-1">
            {project.title}
          </h3>
          <ArrowUpRight
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            size={22}
          />
        </div>
      </div>
    </div>
  )
}

export default function FeaturedProjects() {
  return (
    <section id="projects" className="bg-sand py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-earth font-sans mb-6">
            Selected Spaces
          </p>
          <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] text-charcoal">
            A glimpse into our approach to contemporary interiors.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify manually**

Run: `npm run dev`, scroll to Projects. Confirm: 4 cards render with varied span/aspect (one wide, one tall, two standard), each fades up on scroll, hovering zooms the image and reveals the category label + arrow, and long titles/categories from a data-file edit still fit without overlapping.

- [ ] **Step 3: Commit**

```bash
git add src/components/FeaturedProjects.jsx
git commit -m "feat: add Selected Spaces featured projects grid with hover interaction"
```

---

## Task 10: `Services`

**Files:**
- Create: `src/components/Services.jsx`

**Interfaces:**
- Consumes: `services` from `src/data/services.js` (Task 3), `useInView` (Task 4).
- Produces: `<Services />`, `id="services"`.

- [ ] **Step 1: Implement `Services.jsx`**

```jsx
// src/components/Services.jsx
import { useInView } from '../hooks/useInView'
import { services } from '../data/services'

function ServiceRow({ service, index }) {
  const [ref, isInView] = useInView()

  return (
    <div
      ref={ref}
      className={`reveal ${isInView ? 'is-visible' : ''} border-t border-charcoal/10 py-8 md:py-10 flex flex-col md:flex-row md:items-baseline gap-3 md:gap-10`}
    >
      <span className="font-serif text-xl text-champagne/80 md:w-16 shrink-0">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="font-serif text-2xl md:text-3xl text-charcoal md:w-72 shrink-0">
        {service.title}
      </h3>
      <p className="text-charcoal/70 font-sans text-base leading-relaxed max-w-[55ch]">
        {service.description}
      </p>
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="bg-ivory py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] text-charcoal max-w-xl mb-4">
          Designed From the Inside Out.
        </h2>

        <div className="mt-12">
          {services.map((service, index) => (
            <ServiceRow key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify manually**

Run: `npm run dev`, scroll to Services. Confirm: 6 rows render as a numbered editorial list (not icon cards), each row fades in independently as it's scrolled to, and the layout stacks number/title/description cleanly on mobile.

- [ ] **Step 3: Commit**

```bash
git add src/components/Services.jsx
git commit -m "feat: add editorial numbered-list Services section"
```

---

## Task 11: `DesignPhilosophy`

**Files:**
- Create: `src/components/DesignPhilosophy.jsx`

**Interfaces:**
- Consumes: `useInView` (Task 4), `src/assets/images/philosophy/philosophy-main.jpg` (Task 2).
- Produces: `<DesignPhilosophy />`.

- [ ] **Step 1: Implement `DesignPhilosophy.jsx`**

```jsx
// src/components/DesignPhilosophy.jsx
import { useInView } from '../hooks/useInView'
import philosophyImage from '../assets/images/philosophy/philosophy-main.jpg'

const principles = [
  'Natural materials',
  'Timeless forms',
  'Natural light',
  'Functional planning',
  'Human-scale design',
  'Carefully selected details',
]

export default function DesignPhilosophy() {
  const [ref, isInView] = useInView()

  return (
    <section className="relative bg-charcoal text-ivory py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center reveal ${
          isInView ? 'is-visible' : ''
        }`}
      >
        <div className="order-2 md:order-1">
          <img
            src={philosophyImage}
            alt="Natural wood and stone materials in a minimalist interior"
            width={1400}
            height={1750}
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="order-1 md:order-2">
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.1]">
            Less Noise.
            <br />
            More Meaning.
          </h2>
          <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 font-sans text-sm md:text-base text-ivory/70">
            {principles.map((principle) => (
              <li key={principle} className="border-t border-ivory/20 pt-3">
                {principle}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify manually**

Run: `npm run dev`, scroll to the dark philosophy section. Confirm: high-contrast charcoal background with legible ivory text, large heading reads clearly, principle list is scannable on mobile.

- [ ] **Step 3: Commit**

```bash
git add src/components/DesignPhilosophy.jsx
git commit -m "feat: add Design Philosophy section with dark editorial treatment"
```

---

## Task 12: `Stats`

**Files:**
- Create: `src/components/Stats.jsx`

**Interfaces:**
- Consumes: `stats` from `src/data/stats.js` (Task 3), `useInView` (Task 4).
- Produces: `<Stats />`.

- [ ] **Step 1: Implement `Stats.jsx`**

```jsx
// src/components/Stats.jsx
import { useInView } from '../hooks/useInView'
import { stats } from '../data/stats'

export default function Stats() {
  const [ref, isInView] = useInView()

  return (
    <section className="bg-sand py-16 md:py-20 px-6 md:px-12">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center reveal ${
          isInView ? 'is-visible' : ''
        }`}
      >
        {stats.map((stat) => (
          <div key={stat.id}>
            <p className="font-serif text-4xl md:text-5xl text-charcoal">{stat.value}</p>
            <p className="mt-2 text-xs md:text-sm tracking-wide uppercase text-earth font-sans">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-charcoal/40 font-sans mt-10">
        Demo figures for presentation purposes — to be replaced with verified data.
      </p>
    </section>
  )
}
```

- [ ] **Step 2: Verify manually**

Run: `npm run dev`, scroll to the stats strip. Confirm: 4 stats render in a 2x2 grid on mobile / single row on desktop, and the "demo figures" disclaimer is visible but unobtrusive.

- [ ] **Step 3: Commit**

```bash
git add src/components/Stats.jsx
git commit -m "feat: add minimal Stats strip with demo-data disclaimer"
```

---

## Task 13: `ProcessStory` ("From Concept to Space")

**Files:**
- Create: `src/components/ProcessStory.jsx`

**Interfaces:**
- Consumes: `conceptToSpaceSteps` from `src/data/process.js` (Task 3), `useInView` (Task 4), the three `process-story/` images (Task 2).
- Produces: `<ProcessStory />`.

- [ ] **Step 1: Implement `ProcessStory.jsx`**

```jsx
// src/components/ProcessStory.jsx
import { useInView } from '../hooks/useInView'
import { conceptToSpaceSteps } from '../data/process'
import mainImage from '../assets/images/process-story/process-main.jpg'
import detail1 from '../assets/images/process-story/process-detail-1.jpg'
import detail2 from '../assets/images/process-story/process-detail-2.jpg'

export default function ProcessStory() {
  const [ref, isInView] = useInView()

  return (
    <section className="bg-ivory py-24 md:py-32 px-6 md:px-12">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto reveal ${isInView ? 'is-visible' : ''}`}
      >
        <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] text-charcoal max-w-xl mb-16">
          From Concept to Space
        </h2>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
          <div className="md:col-span-2 aspect-[16/10] overflow-hidden">
            <img
              src={mainImage}
              alt="Interior design mood board with material samples"
              width={1600}
              height={1000}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-rows-2 gap-6 md:gap-8">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={detail1}
                alt="Architectural floor plan sketch"
                width={800}
                height={450}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={detail2}
                alt="Fabric and material samples"
                width={800}
                height={450}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <ol className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {conceptToSpaceSteps.map((step) => (
            <li key={step.id}>
              <span className="font-serif text-2xl text-champagne/80">{step.number}</span>
              <p className="mt-2 font-sans text-sm md:text-base text-charcoal">{step.title}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify manually**

Run: `npm run dev`, scroll to "From Concept to Space". Confirm: one large image with two stacked supporting images beside it on desktop (stacks to single column on mobile), and the 5-step numbered list reads left to right.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProcessStory.jsx
git commit -m "feat: add From Concept to Space immersive process section"
```

---

## Task 14: `Materials`

**Files:**
- Create: `src/components/Materials.jsx`

**Interfaces:**
- Consumes: `useInView` (Task 4), the six `materials/` images (Task 2).
- Produces: `<Materials />`.

- [ ] **Step 1: Implement `Materials.jsx`**

```jsx
// src/components/Materials.jsx
import { useInView } from '../hooks/useInView'
import stone from '../assets/images/materials/stone.jpg'
import wood from '../assets/images/materials/wood.jpg'
import fabric from '../assets/images/materials/fabric.jpg'
import metal from '../assets/images/materials/metal.jpg'
import lighting from '../assets/images/materials/lighting.jpg'
import texture from '../assets/images/materials/texture.jpg'

const materials = [
  { id: 'stone', label: 'Stone', image: stone },
  { id: 'wood', label: 'Wood', image: wood },
  { id: 'fabric', label: 'Fabric', image: fabric },
  { id: 'metal', label: 'Metal', image: metal },
  { id: 'lighting', label: 'Lighting', image: lighting },
  { id: 'texture', label: 'Texture', image: texture },
]

export default function Materials() {
  const [ref, isInView] = useInView()

  return (
    <section className="bg-sand py-24 md:py-32 px-6 md:px-12">
      <div className={`max-w-7xl mx-auto reveal ${isInView ? 'is-visible' : ''}`} ref={ref}>
        <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] text-charcoal max-w-xl mb-16">
          Details Make the Space.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {materials.map((material) => (
            <div key={material.id} className="group relative aspect-square overflow-hidden">
              <img
                src={material.image}
                alt={`${material.label} material close-up`}
                width={800}
                height={800}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute bottom-4 left-4 text-ivory font-sans text-sm tracking-wide uppercase">
                {material.label}
              </span>
              <div className="absolute inset-0 bg-charcoal/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify manually**

Run: `npm run dev`, scroll to Materials. Confirm: 6 square close-up images render in a 3-column grid (2-column on mobile), each labeled, with a subtle zoom on hover.

- [ ] **Step 3: Commit**

```bash
git add src/components/Materials.jsx
git commit -m "feat: add Details Make the Space materials grid"
```

---

## Task 15: `Process`

**Files:**
- Create: `src/components/Process.jsx`

**Interfaces:**
- Consumes: `processSteps` from `src/data/process.js` (Task 3), `useInView` (Task 4).
- Produces: `<Process />`, `id="process"`.

- [ ] **Step 1: Implement `Process.jsx`**

```jsx
// src/components/Process.jsx
import { useInView } from '../hooks/useInView'
import { processSteps } from '../data/process'

function StepCard({ step }) {
  const [ref, isInView] = useInView()

  return (
    <div ref={ref} className={`reveal ${isInView ? 'is-visible' : ''} border-t border-charcoal/10 pt-6`}>
      <span className="font-serif text-3xl text-champagne/80">{step.number}</span>
      <h3 className="font-serif text-xl md:text-2xl text-charcoal mt-3 mb-2">{step.title}</h3>
      <p className="text-charcoal/70 font-sans text-sm md:text-base leading-relaxed">
        {step.description}
      </p>
    </div>
  )
}

export default function Process() {
  return (
    <section id="process" className="bg-ivory py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] text-charcoal max-w-xl mb-16">
          A Thoughtful Process.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {processSteps.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify manually**

Run: `npm run dev`, scroll to Process. Confirm: 5 steps render in a row on desktop (stacked on mobile), each with a scroll-reveal fade, numbers/titles/descriptions match the brief exactly.

- [ ] **Step 3: Commit**

```bash
git add src/components/Process.jsx
git commit -m "feat: add A Thoughtful Process timeline section"
```

---

## Task 16: `Testimonials`

**Files:**
- Create: `src/components/Testimonials.jsx`

**Interfaces:**
- Consumes: `testimonials` from `src/data/testimonials.js` (Task 3), `useInView` (Task 4).
- Produces: `<Testimonials />`.

- [ ] **Step 1: Implement `Testimonials.jsx`**

```jsx
// src/components/Testimonials.jsx
import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { testimonials } from '../data/testimonials'

export default function Testimonials() {
  const [ref, isInView] = useInView()
  const [index, setIndex] = useState(0)
  const testimonial = testimonials[index]

  return (
    <section className="bg-charcoal text-ivory py-24 md:py-32 px-6 md:px-12">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto text-center reveal ${isInView ? 'is-visible' : ''}`}
      >
        <p className="font-serif text-2xl md:text-4xl leading-[1.4] italic">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <p className="mt-8 font-sans text-sm tracking-wide uppercase text-ivory/60">
          {testimonial.name} &mdash; {testimonial.projectType}
        </p>

        {testimonials.length > 1 && (
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 w-6 transition-colors duration-300 ${
                  i === index ? 'bg-champagne' : 'bg-ivory/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify manually**

Run: `npm run dev`, scroll to the testimonial section. Confirm: large quotation typography (no 5-star card styling), name/project-type placeholder line beneath, and the dot controls switch between the two demo testimonials.

- [ ] **Step 3: Commit**

```bash
git add src/components/Testimonials.jsx
git commit -m "feat: add refined typography-led Testimonials section"
```

---

## Task 17: `About`

**Files:**
- Create: `src/components/About.jsx`

**Interfaces:**
- Consumes: `useInView` (Task 4), `src/assets/images/about/about-main.jpg` (Task 2).
- Produces: `<About />`, `id="about"`.

- [ ] **Step 1: Implement `About.jsx`**

```jsx
// src/components/About.jsx
import { useInView } from '../hooks/useInView'
import aboutImage from '../assets/images/about/about-main.jpg'

export default function About() {
  const [ref, isInView] = useInView()

  return (
    <section id="about" className="bg-sand py-24 md:py-32 px-6 md:px-12">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center reveal ${
          isInView ? 'is-visible' : ''
        }`}
      >
        <div>
          <img
            src={aboutImage}
            alt="AURENZA INTERIORS design studio workspace"
            width={1400}
            height={1750}
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </div>
        <div>
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-earth font-sans mb-6">
            About the Studio
          </p>
          <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] text-charcoal mb-8">
            Designing Spaces With Intention.
          </h2>
          <p className="text-charcoal/70 font-sans text-base md:text-lg leading-relaxed max-w-[55ch]">
            AURENZA INTERIORS approaches every space through design thinking,
            personalisation, craftsmanship and materiality — always weighed
            against how a space actually functions day to day, and built to
            stay visually relevant well beyond the day it's finished.
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify manually**

Run: `npm run dev`, scroll to About. Confirm: image and copy sit in a balanced two-column layout, copy avoids unsupported claims (no invented awards/years), stacks cleanly on mobile.

- [ ] **Step 3: Commit**

```bash
git add src/components/About.jsx
git commit -m "feat: add About the Studio section"
```

---

## Task 18: `CTA`

**Files:**
- Create: `src/components/CTA.jsx`

**Interfaces:**
- Consumes: `src/assets/images/cta/cta-main.jpg` (Task 2).
- Produces: `<CTA />`, `id="contact"`.

- [ ] **Step 1: Implement `CTA.jsx`**

```jsx
// src/components/CTA.jsx
import ctaImage from '../assets/images/cta/cta-main.jpg'

export default function CTA() {
  return (
    <section id="contact" className="relative py-32 md:py-40 px-6 md:px-12 overflow-hidden">
      <img
        src={ctaImage}
        alt="Warm minimalist living room in evening light"
        width={2000}
        height={1200}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/60" />

      <div className="relative z-10 max-w-3xl mx-auto text-center text-ivory">
        <h2 className="font-serif text-4xl md:text-6xl leading-[1.1] mb-6">
          Have a Space in Mind?
        </h2>
        <p className="font-sans text-lg md:text-xl text-ivory/80 mb-10">
          Let's turn it into something worth coming home to.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:hello@aurenzainteriors.com"
            className="bg-ivory text-charcoal px-7 py-3 text-sm tracking-wide hover:bg-champagne transition-colors duration-300"
          >
            Start a Conversation
          </a>
          <a
            href="mailto:hello@aurenzainteriors.com?subject=Consultation%20Request"
            className="border border-ivory text-ivory px-7 py-3 text-sm tracking-wide hover:bg-ivory hover:text-charcoal transition-colors duration-300"
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify manually**

Run: `npm run dev`, scroll to the final CTA. Confirm: full-bleed image with a dark overlay keeps the centered ivory text legible, both buttons open a mail client with a pre-filled address.

- [ ] **Step 3: Commit**

```bash
git add src/components/CTA.jsx
git commit -m "feat: add dramatic full-width closing CTA section"
```

---

## Task 19: `Footer`

**Files:**
- Create: `src/components/Footer.jsx`

**Interfaces:**
- Produces: `<Footer />`.

- [ ] **Step 1: Implement `Footer.jsx`**

```jsx
// src/components/Footer.jsx
import { Instagram, Mail, MapPin, Phone } from 'lucide-react'

const links = [
  { href: '#projects', label: 'Projects' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory px-6 md:px-12 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <p className="font-serif text-2xl mb-2">AURENZA INTERIORS</p>
          <p className="font-sans text-sm text-ivory/60">Interior Architecture &amp; Design</p>
        </div>

        <nav>
          <ul className="flex flex-col gap-3 font-sans text-sm text-ivory/70">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-ivory transition-colors duration-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 font-sans text-sm text-ivory/70">
          <span className="flex items-center gap-2">
            <Phone size={16} /> +91 00000 00000
          </span>
          <span className="flex items-center gap-2">
            <Mail size={16} /> hello@aurenzainteriors.com
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={16} /> Ranchi, Jharkhand, India
          </span>
          <a
            href="https://instagram.com"
            className="flex items-center gap-2 hover:text-ivory transition-colors duration-300"
          >
            <Instagram size={16} /> Instagram
          </a>
        </div>
      </div>

      <p className="max-w-7xl mx-auto mt-12 pt-8 border-t border-ivory/10 font-sans text-xs text-ivory/40">
        &copy; 2026 AURENZA INTERIORS. Demo presentation site — content and
        photography are placeholders.
      </p>
    </footer>
  )
}
```

- [ ] **Step 2: Verify manually**

Run: `npm run dev`, scroll to the footer. Confirm: 3-column layout on desktop collapses to a single stacked column on mobile, contact placeholders and Instagram link render with icons, copyright line is present.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "feat: add premium minimal Footer"
```

---

## Task 20: Assemble `App.jsx`, accessibility pass, SEO/perf verification

**Files:**
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: every component from Tasks 6–19.

- [ ] **Step 1: Assemble the full page in `App.jsx`**

```jsx
// src/App.jsx
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Intro from './components/Intro'
import FeaturedProjects from './components/FeaturedProjects'
import Services from './components/Services'
import DesignPhilosophy from './components/DesignPhilosophy'
import Stats from './components/Stats'
import ProcessStory from './components/ProcessStory'
import Materials from './components/Materials'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import About from './components/About'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <FeaturedProjects />
        <Services />
        <DesignPhilosophy />
        <Stats />
        <ProcessStory />
        <Materials />
        <Process />
        <Testimonials />
        <About />
      </main>
      <CTA />
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Accessibility pass**

Check each interactive element rendered by Tasks 6–19: nav links and buttons are real `<a>`/`<button>` (already true), every `<img>` has descriptive `alt` text (already true), and the mobile menu button has `aria-label`/`aria-expanded` (already true from Task 6). Add a `<a href="#projects" className="sr-only focus:not-sr-only ...">Skip to content</a>` skip link as the first child of `Navbar`'s header if a screen-reader/keyboard pass flags the nav as a tab-stop bottleneck — verify with keyboard-only navigation (Tab through the whole page) before adding it; only add what the manual check shows is actually needed.

- [ ] **Step 3: Ultra-wide viewport spot-check**

Run: `npm run dev`, resize the browser to 1920px+ width. Confirm: every section's content stays inside its `max-w-7xl`/`max-w-4xl`/`max-w-[…ch]` container (Tasks 7–18 already apply these) rather than stretching edge-to-edge, and the Hero/CTA background images still cover the full viewport without letterboxing.

- [ ] **Step 4: Full verification pass**

Run: `npm run test` — Expected: all hook tests pass (4 tests total across Tasks 4–5).

Run: `npm run build` — Expected: production build succeeds with no errors or warnings about missing assets.

Run: `npm run preview`, walk the full page top to bottom in both a desktop-width and a mobile-width (375px) viewport, checking against the spec's quality bar (§8/§24 of the design spec): first screen feels premium, photography feels intentional, typography hierarchy is clear, all 13 sections are visually distinct (not repeating the same card layout), CTAs are visible without feeling aggressive, animations are smooth and restrained, nothing looks like a generic template.

Toggle DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce" and re-check: all `reveal` elements are fully visible with no animation, hero parallax is frozen.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx
git commit -m "feat: assemble full AURENZA INTERIORS page and complete a11y/perf pass"
```

---

## Self-review notes

- **Spec coverage:** every numbered section in the master prompt (Navbar, Hero, Intro, Featured Projects, Services, Design Philosophy, Stats, Concept-to-Space, Materials, Process, Testimonials, About, Final CTA, Footer) maps to exactly one task (6–19) plus assembly (20). SEO (index.html meta, single H1/H2 hierarchy, alt text) is covered in Tasks 1 and 20. Performance (lazy loading, explicit image dimensions, no unnecessary JS) is enforced per-component and re-checked in Task 20.
- **Placeholder scan:** no TBD/"add appropriate" phrasing remains; Task 2's per-image rows specify exact output paths and search criteria in place of pre-committed URLs, which is a research task's actual deliverable, not a deferred decision.
- **Type/name consistency:** `useInView` returns `[ref, isInView]` identically everywhere it's used (Tasks 8–19); `useScrollY` returns a bare number, consumed identically in Tasks 6–7; data file export names (`projects`, `services`, `stats`, `processSteps`, `conceptToSpaceSteps`, `testimonials`) match their import statements exactly across all consuming components.
- **Review Focus:** all five items link to the task that owns their mitigation (see table above); none are left unaddressed.

---

Plan complete and saved to `docs/superpowers/plans/2026-09-28-aurenza-interiors.md`. Please review the plan. Which execution approach would you prefer?

- **Subagent-driven** — a fresh subagent implements each task and a fresh reviewer checks it before the next one starts, then a whole-branch review at the end. Most thorough; costs a fresh context per task and per review.
- **Native** — I implement every task myself in this session, then one fresh reviewer checks the whole branch at the end. Cheapest and fastest; no independent review until the end.

For this plan I recommend **Native**: the 20 tasks are mostly independent, low-ambiguity JSX + Tailwind work following one consistent pattern (data import → `useInView` → render), so a fresh reviewer per task would mostly re-confirm the same pattern rather than catch real risk — a single whole-branch review at the end catches the things that actually matter here (visual consistency, a11y, the Review Focus items). Does the plan capture what you want, and which approach should we use?
