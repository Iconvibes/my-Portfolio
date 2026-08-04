# Ferdinard Ashonibare — Portfolio

A unique personal portfolio for Ferdinard Ashonibare, a full-stack web developer in Lagos, Nigeria. Built with React, Vite, Tailwind CSS v4, and react-router — with SSR + per-route prerendering for SEO.

## Features

- Editorial "field-tested systems" identity: Syne / Instrument Serif / JetBrains Mono, ink + paper + signal-lime palette
- Signature hero with terminal status card and lime marquee
- Three featured projects — So-Safe Corps (live), Wura Grand Hotel and EduTrack (launching soon)
- Case study, About, Work, Insights, and Contact pages
- Netlify-ready (form, redirects, robots, sitemap), accessibility + reduced-motion friendly

## Adding live links/screenshots for Wura Grand Hotel & EduTrack

Once a project is hosted, edit `src/content/projects.js`:

1. Set `status: 'live'` and `href: 'https://your-domain'`.
2. Save a screenshot at `public/projects/{slug}.jpg` and set `image: '/projects/{slug}.jpg'`.

The UI automatically switches from the "Launching soon" badge to the live link.

## Résumé & profile photo

- Résumé: replace `public/resume/resume.pdf` with your latest résumé (keep the same filename).
  The résumé button opens it in an in-page viewer on desktop and downloads it directly on mobile.
- Profile photo: save a 4:5 portrait (~800×1000) at `public/profile.jpg` (or `public/images/profile.jpg`)
  — it appears on the hero and the About page automatically. Until then an on-brand monogram card is shown.

## Commands

```bash
npm install
npm run dev      # dev server
npm run lint     # eslint
npm run build    # client + SSR + prerender (dist/) + SEO smoke check
npm run build:seo-check   # run only the SEO smoke check on the current dist/
npm run og-card  # regenerate public/og-card.jpg from the current profile.jpg
```

The build ends with `scripts/check-seo.mjs`, a pre-deploy SEO gate: it fails (exit 1)
if any of the 6 routes in `dist/` is missing a title, meta description, canonical link,
og:image, or JSON-LD structured data (or if `sitemap.xml`, `robots.txt`, or the OG card
are absent). This runs inside Netlify's build, so a broken page can never ship.

## Go-live checklist & link-preview cache-busting

Every platform caches link previews by the exact URL string — same URL = cached preview,
new URL (even with a query param) = fresh crawl. Use this checklist after any deploy,
especially the first one.

### The 8-step go-live sequence

- [ ] 1. Deploy to Netlify and make sure the custom domain (`ferdinardashonibare.com`) is active — the OG tags point at it.
- [ ] 2. Verify the tags on the deployed page:
      `curl -s -A "Twitterbot/1.0" https://ferdinardashonibare.com/ | grep og:` — confirm they point at `og-card.jpg`.
- [ ] 3. Confirm the card is reachable: `curl -s -o /dev/null -w "%{http_code}" https://ferdinardashonibare.com/og-card.jpg` → expect `200`.
- [ ] 4. **Facebook / WhatsApp / Instagram:** open `developers.facebook.com/tools/debug/`, paste the URL, hit **Scrape Again**.
- [ ] 5. **WhatsApp:** message yourself the link (your own chat) → check the card. Stale? Delete the message and resend the link with `?v=2` appended.
- [ ] 6. **X/Twitter:** paste the URL into the tweet composer to preview the card, then tweet the clean link (X has no purge tool; new URL = fresh crawl).
- [ ] 7. **LinkedIn:** run `linkedin.com/post-inspector` on the URL before posting it.
- [ ] 8. Done — every future share of that URL uses the correct card. Repeat this loop any time the photo or card changes.

### The WhatsApp 300KB image rule

WhatsApp **will not show** a link-preview image larger than ~300 KB. `public/og-card.jpg` is
currently 87 KB — keep it under 300 KB or WhatsApp silently drops the photo from shares.

### Regenerating the share card after a photo change

1. Replace `public/profile.jpg` (4:5 portrait, ~800×1000).
2. Run `npm run og-card` — one command re-renders `public/og-card.jpg`
   (1200×630, quality-95 JPEG, auto-verified under WhatsApp's 300 KB limit).
   Requires headless Chrome/Edge; on Windows the JPEG conversion is automatic.
3. Redeploy, then re-run the 8-step cache-busting sequence above (the old card is cached
   by every platform that has seen the URL).
