# Ferdinard Ashonibare — Portfolio

A production portfolio and personal developer platform built with React, Vite, and Tailwind CSS. Every route is prerendered to static HTML, every page carries structured data, and the build pipeline validates SEO integrity before deployment.

This is not a template. The architecture — content-driven routing, centralized metadata, automated SEO validation, security headers, GEO-ready structured data, and a curated `llms.txt` — was built intentionally to demonstrate that a personal site can be engineered to the same standard as a production application.

**Live site:** [ferdinardashonibare.com](https://ferdinardashonibare.com)

---

## Engineering highlights

- **Content-driven architecture** — All site content (projects, insights, credentials, FAQs, navigation) lives in `src/content/` as plain data. Pages are presentation only. Adding a project or writing an article never touches component code.

- **Single source of truth for routing** — Route metadata, page loaders, sitemap entries, canonical URLs, structured data, and breadcrumbs all derive from a centralized route table. Concrete case-study and article routes are generated from content modules at build time.

- **Build-time SEO validation** — The production build includes an automated gate (`scripts/check-seo.mjs`) that verifies every prerendered route carries title, description, canonical, og:image, JSON-LD, and a single H1. A page cannot ship without passing.

- **Static prerendering** — Every route renders to a real HTML file during the build. Googlebot and AI crawlers receive complete markup on the first request — no SPA catch-all, no soft-404s.

- **GEO / AI-readability** — `llms.txt` and `llms-full.txt` provide machine-readable content summaries. JSON-LD structured data uses schema.org types (Person, Organization, WebSite, CreativeWork, Article, FAQPage, BreadcrumbList) mapped to actual page content.

- **Security headers** — Content-Security-Policy, HSTS, Permissions-Policy, X-Content-Type-Options, and Referrer-Policy are configured in `netlify.toml`. The CSP is built from actual resource usage, not copied from a template.

- **Route-level code splitting** — Each page loads as its own chunk. The shared vendor bundle (React, React Router, ReactDOM) is split separately. Users never download code for pages they do not visit.

- **Automated robots.txt validation** — `scripts/check-robots.mjs` parses the generated `robots.txt` and independently verifies that all 18 registered AI and search crawlers (GPTBot, ClaudeBot, PerplexityBot, Googlebot, etc.) are allowed.

---

## Tech stack

| Layer | Technologies |
|-------|-------------|
| UI | React 19, React Router 7, Tailwind CSS v4, lucide-react icons |
| Animation | Framer Motion, CSS transforms (custom cursor, parallax, tilt cards) |
| Build | Vite 7, Terser (console/debugger stripping), `@tailwindcss/vite` |
| Rendering | Static prerendering via `src/entry-server.jsx` + `scripts/prerender.mjs` |
| SEO | `src/seo/schemas.js` — route-specific JSON-LD, canonical URLs, OG/Twitter metadata |
| GEO | `llms.txt`, `llms-full.txt`, structured entity data, semantic HTML |
| Quality | Vitest, ESLint (flat config), SEO smoke check, robots.txt gate |
| Deployment | Netlify — CDN, security headers, immutable asset caching, form handling |

---

## Why this architecture

### React + Vite

A lightweight client-side framework with fast HMR for development and efficient code-split builds for production. No framework overhead beyond what the project actually uses.

### Static prerendering (not SSR)

The site is fundamentally a content-driven application. Every route has known content at build time. Prerendering produces complete HTML that crawlers and users receive immediately from the CDN, without requiring a running application server for page delivery.

### Content separated from UI

Projects, insights, credentials, navigation, FAQs, and site metadata live in `src/content/` as plain JavaScript data. This separation means content changes never risk breaking component logic, and content modules can be imported by multiple consumers (pages, SEO builders, sitemap generators, `llms-full.txt` generators) without duplication.

### Centralized route metadata

A single route table (`src/utils/routeMeta.js`) drives navigation labels, page titles, descriptions, sitemap priorities, canonical URLs, and prerender paths. This eliminates the most common class of SEO bug: a route that exists in the router but is missing from the sitemap, or has a stale title in the metadata.

### Concrete routes from content modules

Case-study routes (`/case-study/so-safe-corps`, `/case-study/wura-grand-hotel`, `/case-study/tpc-logistics`) are derived from the projects content module. Article routes (`/insights/government-platform-trust`, etc.) are derived from the insights module. Adding a new project or article automatically generates its route, SEO metadata, sitemap entry, JSON-LD, breadcrumb schema, and `llms-full.txt` coverage.

### No unnecessary infrastructure

The project does not use a database, Redis, Express server, or API layer for this portfolio site. The content is static, the form uses Netlify's built-in handling, and the entire site deploys as prerendered files to a CDN. Adding a backend would introduce operational complexity without a corresponding product need.

---

## Project structure

```
src/
  content/              # All site content as plain data — the single source of truth
    projects.js         #   6 projects (slug, name, status, tech, caseStudyUrl, …)
    insights.js         #   3 articles with full body content (p, h2, ul, quote blocks)
    caseStudies.js      #   Featured case study copy (So-Safe Corps deep dive)
    site.js             #   Site name, URLs, email, social profiles
    navigation.js       #   4 primary navigation items
    credentials.js      #   Education, certifications, current learning
    capabilities.js     #   Service offerings + technology list
    faq.js              #   7 questions and answers
    facts.js            #   Derived quotable facts (from other modules — never hardcoded)
    industries.js       #   6 focus sectors
    testimonials.js     #   Client quotes (empty array until real quotes are added)
    process.js          #   4-step delivery process + values
    contact.js          #   Email, phone, social links
    index.js            #   Re-exports all content modules

  pages/                # One component per route — presentation only
    Home.jsx
    About.jsx
    Work.jsx
    CaseStudy.jsx       #   Handles /case-study and /case-study/:slug
    Insights.jsx
    InsightArticle.jsx  #   Handles /insights/:slug
    Contact.jsx

  components/
    layout/             # Header, Footer, PageShell, CommandPalette, CustomCursor
    sections/           # Page sections (Hero, Work, FAQ, Capabilities, CTA, …)
    ui/                 # Reusable primitives (Button, Card, Badge, Reveal, TiltCard, …)

  seo/
    site.js             # getSeoConfig, toAbsoluteUrl, normalizePath
    schemas.js          # JSON-LD builders, buildSeoHead, buildStructuredData

  utils/
    routeMeta.js        # Central route table — metadata, priorities, SEO facts
    routeMeta.test.js   # 16 tests: route integrity, parity, case-study derivation
    routes.jsx          # Route config + dynamic routes for React Router

  hooks/                # useInView, useReducedMotion
  styles/globals.css    # Theme tokens, fonts, custom cursor, animations
  layout/MainLayout.jsx # Shell: header, footer, AnimatePresence, SEO tag sync

  routes.jsx            # App route tree (MainLayout → children)
  App.jsx               # BrowserRouter
  main.jsx              # createRoot entry point
  entry-server.jsx      # Static render entry for the prerender pipeline

scripts/
  prerender.mjs         # Renders all routes to static HTML + sitemap.xml + robots.txt
  generate-llms-full.mjs # Generates dist/llms-full.txt from content modules
  check-seo.mjs         # Pre-deploy SEO validation gate (exits 1 on failure)
  check-robots.mjs      # Validates robots.txt allows all 18 AI + search crawlers
  robots.mjs            # robots.txt builder + RFC 9309 parser + crawler registry
  og-card.mjs           # Regenerates social share card from profile photo
  check-live.mjs        # Post-deploy live site verification
  check-metrics.mjs     # Performance metrics check

public/
  profile.jpg           # Hero portrait
  og-card.jpg           # Social share card (1200×630)
  fav.png               # Favicon
  404.html              # Branded error page (no React — pure HTML/CSS)
  llms.txt              # Machine-readable site summary for AI crawlers
  robots.txt            # Mirrors the build-generated version
  sitemap.xml           # Mirrors the build-generated version
  _redirects            # Netlify redirect rules
  fonts/                # Self-hosted woff2 fonts (Inter, Syne, JetBrains Mono, Instrument Serif)
  projects/             # Project images and visuals
  resume/               # Resume PDF
```

---

## Routing

### Static routes

Six primary routes exist in the route table (`src/utils/routeMeta.js`):

| Path | Page | Nav |
|------|------|-----|
| `/` | Home | Yes |
| `/about` | About | Yes |
| `/work` | Projects | Yes |
| `/case-study` | Featured case study (So-Safe Corps) | No |
| `/insights` | Articles listing | No |
| `/contact` | Contact form + details | Yes |

### Concrete case-study routes

Derived from projects with a non-empty `caseStudyUrl` in `src/content/projects.js`:

| Path | Project |
|------|---------|
| `/case-study/so-safe-corps` | Ogun State So-Safe Corps |
| `/case-study/wura-grand-hotel` | Wura Grand Hotel |
| `/case-study/tpc-logistics` | TPC Logistics |

Adding a new project with a `caseStudyUrl` value automatically generates its prerendered HTML, sitemap entry, canonical URL, JSON-LD `CreativeWork` schema, breadcrumb schema, and `llms-full.txt` coverage.

### Concrete article routes

Derived from the insights module in `src/content/insights.js`:

| Path | Article |
|------|---------|
| `/insights/government-platform-trust` | What building a government platform taught me about trust |
| `/insights/hotel-websites-that-book` | Designing hotel websites that actually book rooms |
| `/insights/fast-web-app-checklist` | A simple checklist for shipping fast web apps |

### Route-level code splitting

Every page is a lazily loaded chunk. The router resolves the correct module on navigation. The shared vendor bundle (React, ReactDOM, React Router) is split separately.

### 404 handling

Unmatched URLs return `public/404.html` with a real HTTP 404 status. There is no SPA catch-all — Netlify's `force = false` redirect falls through to the 404 page for any path without a matching prerendered file.

---

## SEO

SEO is treated as a first-class engineering system, not a metadata afterthought.

### Per-route metadata

Every route in the table carries: title, description, social description, keywords, sitemap priority, and change frequency. These are defined once in `src/utils/routeMeta.js` and consumed by the prerenderer, sitemap generator, structured-data builder, and client-side tag sync.

### Canonical URLs

Every page specifies a self-referencing `<link rel="canonical">` pointing to the canonical absolute URL (trailing-slash form, matching Netlify's directory-style serving).

### Open Graph and Twitter cards

Every page includes `og:title`, `og:description`, `og:image` (1200×630), `og:url`, `og:type`, `og:site_name`, `og:locale`, and equivalent Twitter card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`).

### JSON-LD structured data

Each page carries route-appropriate schema.org markup:

| Route | Schema types |
|-------|-------------|
| All pages | Person, Organization, WebSite |
| `/` | + FAQPage |
| `/about` | + ProfilePage, BreadcrumbList |
| `/work` | + CollectionPage (ItemList → CreativeWork) |
| `/case-study` | + Article (featured case study) |
| `/case-study/:slug` | + CreativeWork (project-specific), BreadcrumbList |
| `/insights` | + ItemList |
| `/insights/:slug` | + Article (publication metadata), BreadcrumbList |
| `/contact` | + ContactPage → ContactPoint |
| Pages with testimonials | + Review (when testimonials exist) |

All JSON-LD is escaped safely against `</script>` breakout via `escapeJsonLd()`.

### Sitemap

Generated at build time (`scripts/prerender.mjs`) from all concrete (non-parameterized) routes. Includes `<lastmod>` (real publish dates for articles, today's date for other routes), `<changefreq>`, and `<priority>`. Currently generates 12 URLs.

### robots.txt

Generated at build time (`scripts/robots.mjs`). Explicitly allows all 18 registered AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot, etc.) and standard search crawlers (Googlebot, Bingbot, DuckDuckBot). Disallows `/admin`, `/.git`, `/.env*`, `/node_modules`. The `scripts/check-robots.mjs` gate validates the generated file before deployment.

### SEO validation

`scripts/check-seo.mjs` runs as part of the production build and verifies every prerendered route carries:

- Non-empty `<title>`
- `<meta name="description">`
- `<meta name="robots" content="index,follow">`
- Self-referencing `<link rel="canonical">` on the correct domain
- Exactly one non-empty `<h1>`
- `<meta property="og:title">`, `og:description`, `og:image`, `og:url`
- `<meta name="twitter:card">`
- At least one parseable `<script type="application/ld+json">` block
- No unreplaced `<!--seo-head-->` placeholder
- Presence of `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`, `404.html`
- No SPA catch-all in `netlify.toml` or `_redirects`

A failing check exits with code 1, blocking deployment.

---

## GEO / AI discoverability

The project provides machine-readable first-party information intended to help search engines and AI systems understand the site's entities, content, and authorship.

### `llms.txt`

Located at the site root, linked from every page via `<link rel="llms.txt">`. Contains a structured summary: identity, key facts, education, proof of work, services, tech stack, key pages, essays, and a link to `llms-full.txt`.

### `llms-full.txt`

Generated at build time (`scripts/generate-llms-full.mjs`). Contains the complete text of every page as plain Markdown — Home, About, Work, Case Study (featured + individual project pages), Insights listing, Contact, and each article's full body. Currently covers 12 pages.

### Structured entity data

JSON-LD schemas define explicit entity relationships:

- **Person** → Ferdinard Ashonibare (with `alumniOf`, `hasCredential`, `knowsAbout`, `sameAs`)
- **Organization** → Codeferd Digital (with `founder` → Person)
- **WebSite** → ferdinardashonibare.com (with `publisher` → Organization)
- **CreativeWork** → Each project case study (with `author` → Person)
- **Article** → Each insight essay (with `datePublished`, `author`, `articleSection`)
- **FAQPage** → Home page questions (with `Question` → `Answer`)

These relationships are internally consistent — every `@id` reference resolves, and no schema makes claims not supported by visible content.

### Semantic HTML

Pages use semantic elements: `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`, `<dl>`/`<dt>`/`<dd>` for key facts, proper heading hierarchy (one H1 per page), and `aria-label` attributes on navigation landmarks.

---

## Performance

### Static delivery

Every route is prerendered to HTML and served from Netlify's CDN. The initial page load does not depend on client-side JavaScript rendering.

### Code splitting

Each page is a separate chunk. The shared vendor bundle (React + React Router) is extracted into its own chunk. Users download only the code for the page they visit.

### Asset caching

| Asset type | Cache strategy |
|-----------|---------------|
| HTML pages | 1 hour, stale-while-revalidate 24 hours |
| Hashed JS/CSS (`/assets/*`) | 1 year, immutable |
| Fonts (`.woff2`) | 1 day, stale-while-revalidate 30 days |
| Images (`.jpg`, `.png`, `.svg`) | 1 day, stale-while-revalidate 30 days |
| Resume PDF | 1 hour, stale-while-revalidate 24 hours |

### Font strategy

All four font families (Inter, Syne, JetBrains Mono, Instrument Serif) are self-hosted as woff2 with unicode-range subsets. No third-party font requests at runtime. Only the LCP font (Syne 700) is preloaded.

### Animation optimization

- **Custom cursor**: Uses `requestAnimationFrame` for the animation loop, passive event listeners for `mousemove`, and `translate3d` transforms for GPU compositing. Disabled on coarse pointers (touch devices) and for users with `prefers-reduced-motion: reduce`.
- **Scroll animations**: `IntersectionObserver`-based reveal with one-time trigger (disconnects after first intersection). Respects reduced-motion preference.
- **Parallax and tilt**: CSS `transform`-based with `will-change` hints. Parallax disabled when reduced motion is preferred.

---

## Custom cursor

The custom cursor is a deliberate part of the site's visual identity — a lime reticle that follows the native pointer with a lerped ring, contracting over interactive elements and transforming into a text caret over input fields.

It is implemented with:

- **Fine-pointer detection** — only activates on `pointer: fine` (mouse/trackpad). Touch devices never see it.
- **Reduced-motion respect** — completely hidden when `prefers-reduced-motion: reduce` is active.
- **Optimized event handling** — `requestAnimationFrame` loop, passive `mousemove` listener, direct DOM style writes (no React re-renders during animation).
- **iframe awareness** — hides when the pointer enters an iframe (e.g., the resume PDF viewer) to avoid double-cursor rendering.

The native cursor remains visible at all times. The custom cursor is a decorative companion, not a replacement.

---

## Accessibility

- **Skip link** — "Skip to main content" link, visible on focus, positioned at the top of the page.
- **Semantic HTML** — Proper heading hierarchy (one H1 per page), `<nav>` with `aria-label`, `<main>`, `<article>`, `<section>`, `<dl>` for key-value pairs.
- **Keyboard navigation** — All interactive elements are focusable. The command palette implements a focus trap. Navigation works without a mouse.
- **Focus states** — Visible `:focus-visible` outlines using the site's signal color.
- **Reduced motion** — `useReducedMotion` hook disables Framer Motion animations, parallax, and the custom cursor when the OS preference is active. CSS `prefers-reduced-motion: reduce` also disables all CSS animations and transitions.
- **Form accessibility** — All form fields use associated `<label>` elements. The contact form includes a honeypot field for bot filtering (hidden from real users).
- **Touch-friendly** — Mobile navigation uses appropriately sized tap targets. Hover-only interactions have touch alternatives.

---

## Security

### Headers (configured in `netlify.toml`)

| Header | Value |
|--------|-------|
| `Content-Security-Policy` | `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'sameorigin'; base-uri 'self'; form-action 'self'` |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=()` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |

### Application-level

- **JSON-LD escaping** — All structured data is serialized via `JSON.stringify()` with `</script>` breakout prevention (`<` → `\u003c`).
- **External links** — All external links use `target="_blank"` with `rel="noopener noreferrer"`.
- **Contact form** — Netlify honeypot field (`company-url`) for bot filtering. Hidden from real users via CSS.
- **No secrets in code** — Environment variables are not committed. The `.env` file is in `.gitignore`.
- **Console stripping** — Production builds use Terser with `drop_console: true` and `drop_debugger: true`.

---

## Testing

### Unit / integration tests

```bash
npm test
```

Runs Vitest. Currently 16 tests covering:

- Route table integrity (unique paths, SEO metadata completeness)
- Article route derivation from insights content
- Case-study route derivation from projects content
- Route config ↔ page map parity (every route resolves to a Component)
- Navigation ↔ route table parity (hrefs and labels match)

### SEO validation

```bash
npm run build:seo-check
```

Validates the current `dist/` output: every prerendered route carries required SEO tags, canonical URLs are correct, JSON-LD parses cleanly, and essential files exist.

### Robots.txt validation

```bash
npm run build:robots-check
```

Parses the generated `robots.txt` and verifies all 18 registered AI and search crawlers are allowed.

### Full build validation

```bash
npm run build
```

Runs the complete pipeline: tests → client build → SSR build → prerender → llms-full.txt generation → SEO check → robots.txt check. Any failure stops deployment.

---

## Local development

Requires Node.js 20+.

```bash
git clone https://github.com/Iconvibes/my-Portfolio.git
cd my-Portfolio
npm install
npm run dev
```

The dev server starts at `http://localhost:5173` with HMR.

### Available commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Development server with hot module replacement |
| `npm test` | Run the Vitest test suite |
| `npm run lint` | ESLint (flat config) |
| `npm run build` | Full production build: tests → client → SSR → prerender → SEO validation |
| `npm run preview` | Preview the production build locally |
| `npm run og-card` | Regenerate the social share card from `profile.jpg` |
| `npm run build:seo-check` | Run SEO validation against current `dist/` |
| `npm run build:llms-full` | Regenerate `llms-full.txt` |
| `npm run build:robots-check` | Validate `robots.txt` crawler permissions |
| `npm run verify:live` | Verify the deployed site |
| `npm run verify:metrics` | Check performance metrics |
| `npm run resume:build` | Build the resume |

---

## Build pipeline

The `npm run build` command runs this sequence:

```
npm test
  ↓  (16 tests — route integrity, parity, case-study derivation)
vite build
  ↓  (client bundle — code-split, Terser-minified, console-stripped)
vite build --ssr src/entry-server.jsx
  ↓  (SSR bundle for the prerender pipeline)
node scripts/prerender.mjs
  ↓  (renders every concrete route to static HTML)
  ↓  (generates sitemap.xml and robots.txt)
node scripts/generate-llms-full.mjs
  ↓  (generates llms-full.txt from content modules)
node scripts/check-seo.mjs
  ↓  (validates every route has title, description, canonical, OG, JSON-LD, H1)
node scripts/check-robots.mjs
  ↓  (validates all 18 AI + search crawlers are allowed)
```

If any step fails, the build stops. Netlify receives a failed build and does not deploy.

---

## Deployment

The site deploys to **Netlify** via the build command in `netlify.toml`.

### Redirects

| From | To | Status |
|------|----|--------|
| `/solutions` | `/work` | 301 |
| Unmatched URLs | `/404.html` | 404 |

There is no SPA catch-all. Every route is a real file on disk.

### Key deployment facts

- Every HTML route is a prerendered file (e.g., `dist/about/index.html`)
- Hashed assets get immutable 1-year cache headers
- Self-hosted fonts get daily revalidation with 30-day stale-while-revalidate
- Images get daily revalidation (the og-card regenerates on photo changes)
- Security headers apply site-wide via `netlify.toml`

---

## Adding content

### Add a project

1. Open `src/content/projects.js`
2. Add a project object with: `slug`, `name`, `tagline`, `sector`, `description`, `highlights`, `tech`, `status`, `href`, `caseStudyUrl`, `image`, `accent`
3. Save a project image at `public/projects/{slug}.jpg` (or `.svg`/`.png`)
4. Run `npm run build` — the route, sitemap entry, SEO metadata, JSON-LD, and `llms-full.txt` coverage are generated automatically
5. If the project has a `caseStudyUrl`, a dedicated case-study page is created

When a project goes live: set `status: 'live'` and `href` to the deployed URL. The UI automatically shows a live link instead of the "Launching soon" badge.

### Write an article

1. Open `src/content/insights.js`
2. Add an insight object with: `slug`, `title`, `category`, `summary`, `published`, `body`
3. Body blocks support: `{ type: 'p', text }`, `{ type: 'h2', text }`, `{ type: 'ul', items }`, `{ type: 'quote', text }`
4. Run `npm run build` — the route, article JSON-LD, breadcrumb schema, and `llms-full.txt` coverage are generated automatically

### Update credentials

Edit `src/content/credentials.js`. Changes propagate to the About page and the Person JSON-LD schema (`alumniOf`, `hasCredential`).

### Update contact information

Edit `src/content/contact.js` for channels and social links. Edit `src/content/site.js` for email, phone, and location.

### Update the profile photo

Replace `public/profile.jpg`. It appears on the hero and About page. Run `npm run og-card` to regenerate the social share card.

### Update the resume

Replace `public/resume/resume.pdf`. The resume button opens it in an in-page viewer on desktop and downloads on mobile.

---

## Future engineering considerations

- **TypeScript for content models** — The content modules are currently plain JavaScript. Adding TypeScript interfaces for projects, insights, and credentials would catch field-name typos at build time.
- **Browser-level smoke tests** — Playwright or Cypress tests could verify the actual rendered behavior of prerendered routes, form submissions, keyboard navigation, and reduced-motion handling.
- **CSP nonce for inline styles** — The current CSP uses `'unsafe-inline'` for `style-src` because Tailwind CSS utility classes are inlined. Build-time nonce injection would allow removing this.
- **Performance monitoring** — Runtime performance instrumentation (e.g., Web Vitals reporting) would complement the architectural optimizations already in place.

---

## License

Designed and built by **Ferdinard Ashonibare**. All rights reserved.
