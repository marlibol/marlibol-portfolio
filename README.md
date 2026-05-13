# marlibol — Mai Linh Ho · Creative Portfolio

A cinematic, interactive creative portfolio built as an editorial luxury site.
Crafted with **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion**,
**GSAP**, and **Lenis** smooth scrolling.

> Editorial direction: dark/cream atmospheric pacing · oversized Fraunces
> display · custom cursor · magnetic interactions · kinetic typography ·
> scroll-driven reveals · grain texture · cinematic transitions.

---

## Setup

Requires **Node 18+** (Node 20 recommended) and **npm 9+**.

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
```

Open `http://localhost:3000` to view it.

```bash
# Production build
npm run build
npm run start

# Lint
npm run lint
```

That's it. No `.env` file is required to get the site running locally.

---

## Folder structure

```
marlibol-portfolio/
├── app/
│   ├── layout.tsx           Root layout — fonts, metadata, AppShell wrapper
│   ├── page.tsx             Section composition (hero → about → work → …)
│   └── globals.css          Tailwind layers + custom utilities (grain, glass, marquee mask)
│
├── components/
│   ├── AppShell.tsx         Client orchestrator — Lenis init, cursor, loader gate
│   │
│   ├── animations/          Reusable interaction primitives
│   │   ├── SplitText.tsx    Per-word reveal-from-clip-mask
│   │   ├── Magnetic.tsx     Cursor-magnet hover wrapper
│   │   ├── Cursor.tsx       Site-wide custom cursor (dot + ring + modes)
│   │   ├── Spotlight.tsx    Cursor-following radial glow
│   │   ├── DistortImage.tsx Image with cursor-parallax hover
│   │   └── Parallax.tsx     Scroll-driven vertical drift
│   │
│   ├── sections/            One file per page section
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Work.tsx
│   │   ├── ProjectCard.tsx  Individual project frame (used by Work)
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Philosophy.tsx
│   │   └── Contact.tsx
│   │
│   └── ui/                  Site furniture
│       ├── Loader.tsx       Intro cinematic count 0 → 100
│       ├── Nav.tsx          Top floating glass nav with live clock
│       ├── Marquee.tsx      Kinetic looping text strip
│       └── Footer.tsx       Colophon credits
│
├── hooks/
│   ├── useLenis.ts          Smooth-scroll engine (RAF wired into GSAP ticker)
│   ├── useMouseTracker.ts   Global mouse motion values (singleton)
│   └── useFinePointer.ts    Detect mouse vs touch
│
├── lib/
│   ├── content.ts           ★ All copy, projects, experience — edit here
│   └── cn.ts                Class-name helper
│
├── public/
│   └── images/              Photography pulled from the source portfolio
│
├── next.config.js
├── tailwind.config.js       ★ Design tokens — palette, fonts, easings
├── postcss.config.js
├── tsconfig.json
├── .eslintrc.json
├── .gitignore
└── package.json
```

---

## Editing the content

**One file rule:** every piece of copy on the site lives in
[`lib/content.ts`](./lib/content.ts).

- Update `site.email`, `site.phone`, social links
- Edit the `projects` array to add / remove / reorder entries
- Edit `experience`, `education`, `skills`, `philosophy`

No component file imports raw strings, so changes here propagate site-wide.

### Swapping images

Replace files in `/public/images/` with the same filenames (or update the
`cover` path in `lib/content.ts`). Recommended:

- Cover/project images: **1600×1000 px** minimum, JPEG quality 85
- Portrait: **900×1200 px** portrait orientation
- All images: ideally compressed with [Squoosh](https://squoosh.app/) or
  [Sharp](https://sharp.pixelplumbing.com/) before placing

---

## Design tokens

Edit `tailwind.config.js` to retune the system:

| Token            | Value                                           |
| ---------------- | ----------------------------------------------- |
| `ink` palette    | Deep navy-black `#0A0F1F` and its tones         |
| `azure` palette  | Cornflower accent `#3E7CCB` (from the deck)     |
| `cream`          | Warm off-white `#F4EFE6` (editorial body)       |
| `rust`           | Warm accent `#B8542B` (hover/highlights)        |
| `font-display`   | Fraunces — variable serif                       |
| `font-sans`      | Inter Tight                                     |
| `font-mono`      | JetBrains Mono                                  |
| `ease-expo-out`  | `cubic-bezier(0.16, 1, 0.3, 1)` — primary curve |

---

## Deploying

### Vercel (recommended — zero config)

1. Push the repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Vercel auto-detects Next.js — no config needed
4. Add your custom domain in **Settings → Domains**

```bash
# Or deploy from the CLI
npm i -g vercel
vercel
```

### Netlify

1. `npm run build`
2. Connect the repo in Netlify with:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Install the [`@netlify/plugin-nextjs`](https://docs.netlify.com/integrations/frameworks/next-js/) plugin (Netlify auto-adds it on detection)

The site is fully static-friendly — no server routes, no env vars required.

---

## Recommended fonts

Already wired through `next/font/google` in `app/layout.tsx`:

| Role     | Font                                                              | Why                                                |
| -------- | ----------------------------------------------------------------- | -------------------------------------------------- |
| Display  | [Fraunces](https://fonts.google.com/specimen/Fraunces)            | Variable serif with knockout italics. Editorial.   |
| Body / UI | [Inter Tight](https://fonts.google.com/specimen/Inter+Tight)     | Tighter than Inter — doesn't look SaaS-y.          |
| Accents  | [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) | Indexes, timestamps, kickers.                      |

**Alternative pairings worth trying** (just swap the imports in `layout.tsx`):

- Display: [PP Editorial New](https://pangrampangram.com/products/editorial-new) (paid) — even sharper editorial feel
- Display: [Migra](https://www.future-fonts.com/wndr-studio/migra) — for a more brutalist take
- Body: [Söhne](https://klim.co.nz/retail-fonts/sohne/) (paid) — gold standard for Apple-grade body text
- Body: [General Sans](https://www.fontshare.com/fonts/general-sans) — free, geometric, refined

---

## Special moments (the brief asked for 2–4)

1. **Intro Loader** — first-visit only. 0–100 count with the name revealing
   and a vertical sweep exit. Persisted to `sessionStorage`.
2. **Philosophy scroll-focus** — paragraph words start blurred and sharpen
   as you scroll past, one by one. Pure typography moment, no images.
3. **Project film frames** — each project's image scales up gently as it
   passes through the viewport with the index stamped on the corner like
   a developed print.
4. **Closing oversized signature** — the `marlibol` wordmark rises into
   place at 22vw, framed by ink and grain.

---

## Sound design (optional)

If you want to add ambient audio (Awwwards finalists almost always do):

1. Source a low-volume ambient loop (suggested: low pad + light hiss, ~110bpm).
   I like the public-domain loops at [Tasos Frantzolas](https://soundsnap.com/)
   or generative loops from [Mubert API](https://mubert.com/).
2. Add a `Sound` toggle component that loops the track at ~30% volume.
3. Use the Web Audio API for the toggle so playback can fade in/out smoothly
   instead of pop. A 600ms fade ramp via `GainNode` is the right baseline.
4. **Important**: always start audio muted. Browsers block autoplay; surface
   a small persistent "Sound ON / OFF" toggle in the nav (next to the clock).
5. Add a UI tick sound for the magnetic CTA hover — under -20dB, very short
   sample, makes the page feel tactile.

I left this out of the default build because audio without consent damages
trust and breaks for half of visitors (muted tabs, accessibility). When you
add it, ship the toggle visibly off-by-default.

---

## Interactive enhancement ideas

Things to layer on later if you want to push further:

- **Project case studies** — turn each project into its own route
  (`app/work/[slug]/page.tsx`) with full case-study layouts and shared-element
  transitions (`framer-motion`'s `layoutId` does this in 5 lines).
- **WebGL distortion** — swap `DistortImage` for a `@react-three/fiber` plane
  with a fragment-shader displacement map driven by mouse position. Adds
  ~80KB but gives you proper "liquid" image distortion.
- **Dark/light auto theme** — invert palette based on scroll position so the
  cursor + nav adapt to the section underneath them (we already alternate
  sections; the cursor + nav just need to react).
- **Locale switcher** — the content file is structured enough that adding
  Vietnamese alongside English is a 1-hour job; wrap `lib/content.ts` in a
  language object and pass through React context.

---

## Performance notes

The build is intentionally lean. Approximate sizes (after `next build`):

- First load JS: ~120 KB gzip (Lenis, Framer core, GSAP utilities)
- Total page weight on first load: ~280 KB gzip (incl. fonts)

### Built-in optimizations

- `next/font/google` — fonts self-hosted at build time, zero CLS, no Google round-trip
- `next/image` on every photograph — AVIF/WebP responsive variants generated at build
- Single RAF loop — GSAP's ticker drives both Lenis and ScrollTrigger
- Singleton mouse listener — one `mousemove` handler globally; components subscribe via shared motion values
- Lenis disabled on touch + reduced-motion (no JS-driven scroll on phones)
- All animations GPU-friendly: transforms only, never layout-affecting props

### Squeeze further if needed

- Lazy-load below-the-fold sections with `next/dynamic({ ssr: false })`
- Replace the project images with a CDN (Cloudinary / Vercel Blob) and use
  `next/image`'s `loader` prop for on-the-fly transforms
- Drop GSAP entirely if you're not extending ScrollTrigger usage — Framer
  Motion's `useScroll` covers most of what we use it for here (saves ~30KB)
- Remove `next/font/google` Vietnamese subset if you ship English-only

### Lighthouse targets

The intended scores on a clean prod build:

- Performance: **95+**
- Accessibility: **95+**
- Best Practices: **100**
- SEO: **100**

The custom cursor / magnetic buttons cost ~3 a11y points if not paired with
visible focus states — already mitigated in the code (focus styles inherit
from the Tailwind defaults and `data-cursor="hover"` is purely cosmetic).

---

## Notes from the build

- **Why Lenis + GSAP both:** Lenis owns the scroll loop, GSAP's ScrollTrigger
  reads from it. We could've used `framer-motion`'s `useScroll` alone, but
  ScrollTrigger handles pin/snap/scrub edge cases much more cleanly when
  the project grows.
- **Why not Locomotive Scroll v5:** Locomotive's last major release was
  rewritten on top of Lenis. Using Lenis directly is one less abstraction.
- **Glassmorphism is used twice only** — the nav and (very subtly) the
  hover state of magnetic buttons. The brief said "very lightly"; the
  rest of the depth comes from layered ink, grain, and soft shadows.
- **Vietnamese subset is included** in the font config so diacritics on
  Phan Mạnh Quỳnh / Nguyễn Du / Quảng Ninh render correctly.

---

## License

Code is yours to use under MIT. Photography in `/public/images/` belongs to
Mai Linh Ho — please replace if you fork this for your own portfolio.

Built March 2026.
