# Sutanu Paul — Portfolio

Personal developer portfolio for **Sutanu Paul** — Java backend engineer working with
Spring Boot, Spring Security, React, and agentic AI (Python + LangGraph).

Design direction: **retro technical dossier** — near-black canvas, deep-navy surfaces,
hairline rules, monospace chrome, CRT scanlines, hard offset shadows. No glassmorphism,
no neon gradients.

## Stack

| Concern | Choice |
| --- | --- |
| Build | Vite 8 |
| UI | React 19 |
| Styling | Tailwind CSS v4 (`@theme` tokens in `src/index.css`) |
| Animation | Framer Motion (`motion`) |
| Icons | lucide-react + inline SVG brand marks |
| Fonts | Sora, Plus Jakarta Sans, JetBrains Mono (self-hosted via Google Fonts CDN) |

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the built bundle
npm run lint     # oxlint
```

## Project layout

```
public/
  SUTANU_PAUL_RESUME.pdf   résumé served at /SUTANU_PAUL_RESUME.pdf
  favicon.svg
  robots.txt
src/
  data/portfolio.js        ← single source of truth for ALL content
  lib/motion.js            easings + hooks (magnetic, tilt, spotlight, count-up, parallax)
  components/
    Preloader.jsx          terminal boot sequence
    Navbar.jsx  Hero.jsx  About.jsx  Skills.jsx  Projects.jsx  Contact.jsx  Footer.jsx
    Architecture.jsx       SVG architecture diagram (one shared coordinate space)
    Effects.jsx            custom cursor, scroll progress, back-to-top
    art/ProjectArt.jsx     six animated SVG project covers
    ui/Primitives.jsx      Reveal, SectionHeading, MagneticButton, TiltCard, Marquee, …
    ui/BrandIcons.jsx      GitHub / LinkedIn / LeetCode marks
```

## Editing content

**Almost everything lives in `src/data/portfolio.js`** — profile details, education,
skills tabs, projects, achievements, timeline and links. Edit that file and the whole
site updates. No component hardcodes copy.

### Colour system

Change the palette in the `@theme` block at the top of `src/index.css`. Accent tokens:

| Token | Role |
| --- | --- |
| `--color-navy` / `--color-navy-2` / `--color-navy-3` | deep navy surfaces (badges, active states) |
| `--color-neon` / `--color-neon-soft` | readable light-navy accent for text and rules |
| `--color-iris` / `--color-iris-soft` | reserved for AI / agent work |
| `--color-fg` / `--color-fg-dim` / `--color-fg-faint` | foreground ramp, kept separate from surfaces so text is never near-black |

Every token has a light-theme counterpart in the `html.light` block.

### Adding a project

Append to `projects` in `src/data/portfolio.js`, then add a matching cover to
`ART` in `src/components/art/ProjectArt.jsx` (reuse an existing art component or
write a new SVG using the `Frame`, `Bar`, `Ring` and `Packet` helpers).

## Notes

- The résumé link opens `public/SUTANU_PAUL_RESUME.pdf` in a new tab. Replace that
  file to update it — no code change needed.
- The contact form is currently front-end only. Wire `submit()` in
  `src/components/Contact.jsx` to your API, Formspree, or a serverless function.
- `prefers-reduced-motion` is respected throughout, and the custom cursor only
  activates on fine-pointer devices.

## Deploy

Vercel / Netlify / Cloudflare Pages — no config needed. Any static host that serves
`dist/` works.