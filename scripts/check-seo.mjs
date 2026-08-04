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

import { publicRoutePaths } from '../src/utils/routeMeta.js';
import { siteConfig } from '../src/content/site.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const REQUIRED_TAGS = [
  ['<title>', 'title tag'],
  ['<meta name="description"', 'meta description'],
  ['<link rel="canonical"', 'canonical link'],
  ['<meta property="og:image"', 'og:image'],
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

if (publicRoutePaths.length === 0) {
  failures.push('routeMeta exposes no routes — nothing to check');
  report.push('  ✗ routeMeta exposes no routes');
}

for (const route of publicRoutePaths) {
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
  }

  const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/);
  if (!ogImage || !sameOrigin(ogImage[1])) {
    missing.push(`absolute og:image on ${siteConfig.siteUrl}`);
  }

  if (missing.length) {
    failures.push(`${label}: missing ${missing.join(', ')}`);
    report.push(`  ✗ ${label}: missing ${missing.join(', ')}`);
  } else {
    report.push(`  ✓ ${label}`);
  }
}

// Site-level files the SEO contract depends on.
for (const asset of ['sitemap.xml', 'robots.txt']) {
  const file = path.join(dist, asset);
  if (!existsSync(file)) {
    failures.push(`dist/${asset} is missing`);
    report.push(`  ✗ dist/${asset} missing`);
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
console.log(`All ${publicRoutePaths.length} routes carry title, description, canonical, og:image and JSON-LD.\n`);
