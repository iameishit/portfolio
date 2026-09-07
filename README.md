# Eishit Nigam — Portfolio (Static, React + Vite)

Frontend-only rebuild of the portfolio. No backend, no database, no API —
every section reads from local data files in `src/data/`. The contact
section uses a Tally form embed instead of a server-side form handler.

## Stack

- React 18 + Vite
- Plain CSS (`src/styles/global.css`) — no UI framework
- `three` for a small decorative WebGL hero background (see
  `src/components/HeroScene.jsx`) — the only added dependency
- Zero network calls at runtime except the Tally contact embed and Ahrefs
  analytics

## Project structure

```
src/
  data/            profile.js, focus.js, skills.js, projects.js, career.js, certificates.js
  components/      one component per section + shared UI (Reveal, CustomCursor,
                    CommandPalette, HeroScene...)
  hooks/           useTheme, useToast, useScrollProgress
  styles/          global.css
public/
  assets/          favicon set, og-cover.svg, hero-bg.png, certificates/
  robots.txt, sitemap.xml, llms.txt, site.webmanifest
  BingSiteAuth.xml, google<id>.html   — search engine verification files
```

## Local development

```bash
npm install
npm run dev
```

## Editing content

Edit the corresponding file in `src/data/` and rebuild:

- `profile.js` — name, roles, hero tagline, about paragraphs, status panel
- `focus.js` — the two "what I do" cards
- `career.js` — timeline entries
- `projects.js` — work section cards, including `summary` (medium-length
  description), `repo`/`orgUrl` (only set when a real URL exists — never
  invent one), and the Swiggy Builders Club recognition block
- `skills.js` — stack chips, grouped
- `certificates.js` — verified certificates only; never invent fields

## Hero animation (Three.js)

`src/components/HeroScene.jsx` renders a small WebGL background (a
wireframe icosahedron + drifting particle field) behind the hero copy.
It:
- reads its two colors directly from the page's own `--accent`/`--copper`
  CSS variables, so it can never introduce a color outside the existing
  palette or drift from the light/dark theme toggle
- doesn't mount at all when the visitor has `prefers-reduced-motion` set
- disposes all Three.js resources on unmount

## SEO / AEO / GEO

- `index.html` — per-page meta, canonical, OG/Twitter, and a JSON-LD
  `@graph` (Person, Organization, SoftwareApplication ×2, CreativeWork,
  ProfilePage, WebSite) describing only what's visibly on the page, plus
  Google Search Console verification meta tag and the Ahrefs analytics
  snippet.
- `public/robots.txt` / `sitemap.xml` / `llms.txt` — see inline comments.
- `public/BingSiteAuth.xml` and `public/google<id>.html` — copied verbatim
  from Bing Webmaster Tools / Google Search Console; must stay in place
  to remain verified.

Update `https://eishit-dev.vercel.app/` across `index.html`,
`robots.txt`, `sitemap.xml`, and `llms.txt` if the production domain ever
changes.

## Deploy to Vercel

**Git import (recommended):** push this repo to GitHub and import it in
Vercel. It auto-detects Vite; `vercel.json` pins `outputDirectory: dist`.
No environment variables required.

**Drag and drop:**
```bash
npm install
npm run build
```
Drag the generated `dist/` folder onto vercel.com/new.
