/**
 * Pre-deploy SEO smoke check.
 *
 * Runs AFTER `scripts/prerender.mjs` and fails the build (exit 1) if any
 * prerendered route is missing required SEO tags. Wire it into the build
 * command so Netlify can never ship a page without a title, description,
 * canonical URL, social image, or structured data.
 *
 * Usage: node scripts/check-seo.mjs
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { allPublicPaths } from '../src/utils/routeMeta.js';
import { siteConfig } from '../src/content/site.js';
import { toAbsoluteUrl } from '../src/seo/site.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const REQUIRED_TAGS = [
  ['<title>', 'title tag'],
  ['<meta name="author"', 'meta author'],
  ['<meta name="description"', 'meta description'],
  ['<meta name="robots"', 'meta robots'],
  ['<link rel="canonical"', 'canonical link'],
  ['<meta property="og:title"', 'og:title'],
  ['<meta property="og:description"', 'og:description'],
  ['<meta property="og:image"', 'og:image'],
  ['<meta property="og:url"', 'og:url'],
  ['<meta name="twitter:card"', 'twitter:card'],
  ['<link rel="llms.txt"', 'llms.txt link'],
  ['<script type="application/ld+json"', 'JSON-LD structured data']
];

const pageFile = (route) =>
  route === '/'
    ? path.join(dist, 'index.html')
    : path.join(dist, route.replace(/^\//, ''), 'index.html');

const failures = [];
const report = [];

const sameOrigin = (url) => {
  try {
    return new URL(url).origin === new URL(siteConfig.siteUrl).origin;
  } catch {
    return false;
  }
};

if (allPublicPaths.length === 0) {
  failures.push('routeMeta exposes no routes — nothing to check');
  report.push('  ✗ routeMeta exposes no routes');
}

for (const route of allPublicPaths) {
  const file = pageFile(route);
  const label = route === '/' ? '/' : route;

  if (!existsSync(file)) {
    failures.push(`${label}: HTML file missing (${path.relative(root, file)})`);
    report.push(`  ✗ ${label}: missing HTML file`);
    continue;
  }

  const html = readFileSync(file, 'utf8');
  const missing = REQUIRED_TAGS.filter(([token]) => !html.includes(token)).map(
    ([, description]) => description
  );

  // The Vite template ships a hardcoded meta description, so if the prerender's
  // <!--seo-head--> injection silently failed, the description check alone would
  // false-pass. Assert the placeholder was actually replaced.
  if (html.includes('<!--seo-head-->')) {
    missing.push('prerender injection (unreplaced <!--seo-head--> placeholder)');
  }

  const title = html.match(/<title>([^<]*)<\/title>/);
  if (!title || !title[1].trim()) {
    missing.push('non-empty title');
  }

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!canonical || !sameOrigin(canonical[1])) {
    missing.push(`absolute canonical on ${siteConfig.siteUrl}`);
  } else {
    // Canonical must self-reference this exact route — a homepage-serving
    // soft-404 regression shows up here before it hurts indexing. Reuse
    // toAbsoluteUrl so the gate can never drift from the URL builder, and
    // sanity-check the shape since the gate now derives its expectation
    // from the same function that emits the tag.
    const expectedCanonical = toAbsoluteUrl(route);
    if (canonical[1] !== expectedCanonical) {
      missing.push(`canonical matching ${expectedCanonical} (got ${canonical[1]})`);
    }
    const canonicalPath = new URL(canonical[1]).pathname;
    if (
      canonicalPath.includes('//') ||
      (route !== '/' && !canonical[1].endsWith('/')) ||
      (route === '/' && canonical[1] !== `${siteConfig.siteUrl}/`)
    ) {
      missing.push(`well-formed canonical (got ${canonical[1]})`);
    }
  }

  // Each prerendered page must contain its own real content: exactly one H1.
  const h1Count = (html.match(/<h1[\s\S]*?<\/h1>/g) ?? []).length;
  if (h1Count !== 1) {
    missing.push(`exactly one H1 (found ${h1Count})`);
  } else {
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    if (!h1 || !h1[1].replace(/<[^>]+>/g, '').trim()) {
      missing.push('non-empty H1');
    }
  }

  const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/);
  if (!ogImage || !sameOrigin(ogImage[1])) {
    missing.push(`absolute og:image on ${siteConfig.siteUrl}`);
  }

  // Every JSON-LD block must parse as valid JSON — a single broken schema
  // silently kills all structured data on the page for crawlers.
  const ldJsonBlocks = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) ?? [];
  if (ldJsonBlocks.length === 0) {
    missing.push('JSON-LD block');
  } else {
    const broken = ldJsonBlocks.filter((block) => {
      const raw = block.replace(/^<script type="application\/ld\+json">/, '').replace(/<\/script>$/, '');
      try {
        JSON.parse(raw);
        return false;
      } catch {
        return true;
      }
    });
    if (broken.length) {
      missing.push(`${broken.length} unparseable JSON-LD block(s)`);
    }
  }

  if (missing.length) {
    failures.push(`${label}: missing ${missing.join(', ')}`);
    report.push(`  ✗ ${label}: missing ${missing.join(', ')}`);
  } else {
    report.push(`  ✓ ${label}`);
  }
}

// Site-level files the SEO contract depends on.
for (const asset of ['sitemap.xml', 'robots.txt', 'llms.txt', 'llms-full.txt', '404.html']) {
  const file = path.join(dist, asset);
  if (!existsSync(file)) {
    failures.push(`dist/${asset} is missing`);
    report.push(`  ✗ dist/${asset} missing`);
  }
}

// llms-full.txt must cover every public route and be discoverable from the
// curated llms.txt summary — a full-text file that is stale or unreachable
// defeats its purpose for agentic fetching.
const llmsFullFile = path.join(dist, 'llms-full.txt');
if (existsSync(llmsFullFile)) {
  const llmsFull = readFileSync(llmsFullFile, 'utf8');
  const pageHeadings = (llmsFull.match(/^# /gm) ?? []).length;
  if (pageHeadings < allPublicPaths.length) {
    failures.push(
      `llms-full.txt covers ${pageHeadings} page(s), expected ${allPublicPaths.length}`
    );
    report.push(
      `  ✗ llms-full.txt covers ${pageHeadings}/${allPublicPaths.length} pages`
    );
  }
}

const llmsTxtFile = path.join(dist, 'llms.txt');
if (existsSync(llmsTxtFile) && !readFileSync(llmsTxtFile, 'utf8').includes('llms-full.txt')) {
  failures.push('llms.txt does not reference llms-full.txt');
  report.push('  ✗ llms.txt missing llms-full.txt link');
}

// The SPA catch-all must never ship: it soft-404s every unknown URL to the
// homepage and prevents Google from indexing real routes cleanly. Check BOTH
// redirect sources — netlify.toml takes precedence over dist/_redirects.
const spaCatchAllPattern = /\/index\.html\s+200/;
const redirectsFile = path.join(dist, '_redirects');
const redirectSources = [{ label: 'netlify.toml', file: path.join(root, 'netlify.toml') }];

if (existsSync(redirectsFile)) {
  redirectSources.push({ label: 'dist/_redirects', file: redirectsFile });
}

for (const source of redirectSources) {
  const content = readFileSync(source.file, 'utf8');
  if (spaCatchAllPattern.test(content)) {
    failures.push(`SPA catch-all found in ${source.label} (/* /index.html 200) — remove it`);
    report.push(`  ✗ SPA catch-all found in ${source.label}`);
  }
}

// The social card must ship (skip the check only if defaultImage is an external URL).
if (!/^https?:\/\//.test(siteConfig.defaultImage)) {
  const cardFile = path.join(dist, siteConfig.defaultImage.replace(/^\//, ''));
  if (!existsSync(cardFile)) {
    failures.push(`dist${siteConfig.defaultImage} is missing`);
    report.push(`  ✗ dist${siteConfig.defaultImage} missing`);
  }
}

if (failures.length) {
  console.error('\n❌ SEO smoke check FAILED:\n' + report.join('\n'));
  console.error(`\n${failures.length} issue(s) found — fix before deploying.\n`);
  process.exit(1);
}

console.log('\n✅ SEO smoke check passed:' + report.join(''));
console.log(`All ${allPublicPaths.length} routes carry title, description, canonical, og:image and JSON-LD.\n`);
