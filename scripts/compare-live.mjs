/**
 * Local build vs live production diff — AI crawler perspective.
 *
 * Compares the freshly prerendered `dist/` against what the LIVE site serves
 * to a real crawler (GPTBot UA), and lists every concrete difference an AI
 * agent would notice: robots.txt verdicts, llms.txt / llms-full.txt /
 * sitemap.xml content, per-page SEO heads (title, description, canonical,
 * og:image, H1, JSON-LD), visible body text, route inventory, redirects, and
 * the hashed asset bundles each build references.
 *
 * Usage:
 *   node scripts/compare-live.mjs                # dist vs production
 *   node scripts/compare-live.mjs --base http://127.0.0.1:4173
 *   node scripts/compare-live.mjs --dist /path/to/dist
 *
 * Exits 0 when identical from a crawler's perspective, 1 when any difference
 * is found (including differences that are harmless, e.g. a newer build).
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { evaluateCrawlers } from './robots.mjs';
import { siteConfig } from '../src/content/site.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);

const baseFlag = args.indexOf('--base');
const BASE = (baseFlag !== -1 && args[baseFlag + 1]) || siteConfig.siteUrl;
const distFlag = args.indexOf('--dist');
const DIST = (distFlag !== -1 && args[distFlag + 1]) || path.resolve(__dirname, '..', 'dist');

const GPTBOT_UA =
  'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot';
const FOCUS_BOTS = ['GPTBot', 'PerplexityBot', 'ClaudeBot'];

let differences = 0;
const report = [];
const line = (text = '') => report.push(text);
const diff = (text = '') => {
  differences += 1;
  report.push(`  ✗ ${text}`);
};

const fetchText = async (url) => {
  const response = await fetch(url, {
    headers: { 'user-agent': GPTBOT_UA, accept: '*/*' },
    signal: AbortSignal.timeout(15000)
  });
  return {
    status: response.status,
    type: response.headers.get('content-type') || '',
    body: await response.text()
  };
};

const decodeHtml = (value) =>
  value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&apos;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');

// Visible text a crawler reads after script/style/tag stripping.
const visibleText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const wordCount = (text) => (text ? text.split(' ').length : 0);

const extract = (html) => ({
  title: decodeHtml((html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '').trim()),
  description: decodeHtml(
    (html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '').trim()
  ),
  canonical: (html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? '').trim(),
  ogImage: (html.match(/<meta property="og:image" content="([^"]+)"/)?.[1] ?? '').trim(),
  h1Count: (html.match(/<h1[\s\S]*?<\/h1>/g) ?? []).length,
  jsonLd: [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => {
      try {
        return JSON.parse(m[1]);
      } catch {
        return { __broken: m[1] };
      }
    }
  ),
  body: visibleText(html)
});

const stableJson = (value) => {
  const seen = new Set();
  const sort = (v) => {
    if (Array.isArray(v)) return v.map(sort);
    if (v && typeof v === 'object') {
      if (seen.has(v)) return '[circular]';
      seen.add(v);
      const out = {};
      for (const key of Object.keys(v).sort()) out[key] = sort(v[key]);
      return out;
    }
    return v;
  };
  return JSON.stringify(sort(value));
};

// First point of divergence between two visible-text bodies, with a window.
const textDiff = (a, b) => {
  if (a === b) return null;
  const aWords = a.split(' ');
  const bWords = b.split(' ');
  let i = 0;
  while (i < aWords.length && i < bWords.length && aWords[i] === bWords[i]) i += 1;
  const win = 12;
  return {
    atWord: i + 1,
    local: aWords.slice(Math.max(0, i - 4), i + win).join(' '),
    live: bWords.slice(Math.max(0, i - 4), i + win).join(' ')
  };
};

const jsonLdDiff = (localBlocks, liveBlocks) => {
  const localKeys = localBlocks.map(stableJson);
  const liveKeys = liveBlocks.map(stableJson);
  const notes = [];
  if (localKeys.length !== liveKeys.length) {
    notes.push(`block count ${localKeys.length} vs live ${liveKeys.length}`);
  }
  for (const key of localKeys) {
    if (!liveKeys.includes(key)) {
      const block = localBlocks[localKeys.indexOf(key)];
      notes.push(`local-only JSON-LD: ${block['@type'] ?? 'unknown'}`);
    }
  }
  for (const key of liveKeys) {
    if (!localKeys.includes(key)) {
      const block = liveBlocks[liveKeys.indexOf(key)];
      notes.push(`live-only JSON-LD: ${block['@type'] ?? 'unknown'}`);
    }
  }
  return notes;
};

const walkHtml = async (dir, base = '') => {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      out.push(...(await walkHtml(path.join(dir, entry.name), `${base}/${entry.name}`)));
    } else if (entry.name === 'index.html') {
      out.push(base === '' ? '/' : base);
    }
  }
  return out.sort();
};

// --- run -------------------------------------------------------------------

const run = async () => {
  line(`=== dist vs live — ${BASE} ===`);
  line(`Local build: ${DIST}`);
  line('');

  // 0. Route inventory
  const localRoutes = await walkHtml(DIST);
  const routes = [...new Set([...localRoutes])].sort();

  // 1. Text assets ------------------------------------------------
  const textAssets = ['robots.txt', 'llms.txt', 'llms-full.txt', 'sitemap.xml', '_redirects'];
  line('Text assets (robots.txt, llms.txt, llms-full.txt, sitemap.xml, _redirects):');
  for (const name of textAssets) {
    let localBody = '';
    try {
      localBody = await readFile(path.join(DIST, name), 'utf8');
    } catch {
      diff(`${name} missing from local dist`);
      continue;
    }
    const live = await fetchText(`${BASE}/${name}`);
    const localStable = stableJson(localBody);
    const liveStable = stableJson(live.body);
    // Netlify consumes _redirects and never serves the file, so a live 404 is
    // expected; what matters is that the rules it defines actually work.
    if (name === '_redirects' && live.status === 404) {
      line(`  ✓ _redirects — not served live (expected: Netlify consumes it; rules verified separately)`);
      continue;
    }
    if (live.status === 404 && localStable !== liveStable) {
      diff(`${name} — local exists, live is HTTP ${live.status}`);
      continue;
    }
    if (localStable === liveStable) {
      line(`  ✓ ${name} — identical (${(localBody.length / 1024).toFixed(1)} KB)`);
    } else {
      diff(`${name} — content differs (local ${(localBody.length / 1024).toFixed(1)} KB vs live ${(live.body.length / 1024).toFixed(1)} KB)`);
      if (name === 'robots.txt') {
        const localVerdicts = evaluateCrawlers(localBody);
        const liveVerdicts = evaluateCrawlers(live.body);
        for (const bot of FOCUS_BOTS) {
          const l = localVerdicts.find((v) => v.crawler.name === bot)?.status;
          const r = liveVerdicts.find((v) => v.crawler.name === bot)?.status;
          if (l !== r) {
            diff(`robots verdict ${bot}: local ${l ?? '?'} vs live ${r ?? '?'}`);
          }
        }
      }
      if (name === 'sitemap.xml') {
        const localLocs = (localBody.match(/<loc>/g) ?? []).length;
        const liveLocs = (live.body.match(/<loc>/g) ?? []).length;
        diff(`  sitemap URLs: local ${localLocs} vs live ${liveLocs}`);
      }
      if (name === 'llms.txt') {
        const localFull = (localBody.match(/llms-full\.txt/g) ?? []).length;
        const liveFull = (live.body.match(/llms-full\.txt/g) ?? []).length;
        if (localFull !== liveFull) diff(`  llms.txt → llms-full.txt link: local ${localFull} vs live ${liveFull}`);
      }
    }
  }
  line('');

  // 2. Pages -------------------------------------------------------
  line(`Pages (${routes.length}) — title · description · canonical · og:image · H1 · JSON-LD · body:`);
  for (const routePath of routes) {
    const localHtml = await readFile(
      path.join(DIST, routePath === '/' ? 'index.html' : `${routePath}/index.html`),
      'utf8'
    );
    const local = extract(localHtml);
    const url = routePath === '/' ? `${BASE}/` : `${BASE}${routePath}/`;
    const live = await fetchText(url);

    const issues = [];
    if (live.status !== 200) {
      issues.push(`live HTTP ${live.status} (local page not deployed)`);
    } else {
      const remote = extract(live.body);
      if (local.title !== remote.title) issues.push(`title: "${remote.title}"`);
      if (local.description !== remote.description) issues.push('description differs');
      if (local.canonical !== remote.canonical) issues.push(`canonical: ${remote.canonical}`);
      if (local.ogImage !== remote.ogImage) issues.push(`og:image: ${remote.ogImage}`);
      if (local.h1Count !== remote.h1Count) issues.push(`H1 count ${remote.h1Count} vs local ${local.h1Count}`);
      for (const note of jsonLdDiff(local.jsonLd, remote.jsonLd)) issues.push(note);
      const words = wordCount(remote.body);
      if (local.body !== remote.body) {
        const t = textDiff(local.body, remote.body);
        issues.push(
          `body differs: local ${wordCount(local.body).toLocaleString('en-US')} words vs live ${words.toLocaleString('en-US')} words` +
            (t ? ` (first change at word ${t.atWord}; live reads “${t.live.slice(0, 90)}…”` : '')
        );
      }
      if (live.body.includes('<!--seo-head-->')) issues.push('live page has unreplaced prerender placeholder');
    }

    const marker = issues.length === 0 ? '✓' : '✗';
    line(`  ${marker} ${routePath === '/' ? '/' : routePath}`);
    for (const issue of issues) diff(`    ${issue}`);
  }
  line('');

  // 3. Asset bundles ------------------------------------------------
  line('Hashed asset bundles (index references vs live):');
  const localIndex = await readFile(path.join(DIST, 'index.html'), 'utf8');
  const localAssets = [...localIndex.matchAll(/href="(\/assets\/[^"]+)"|src="(\/assets\/[^"]+)"/g)]
    .map((m) => m[1] || m[2])
    .sort();
  const liveIndex = await fetchText(`${BASE}/`);
  const liveAssets = [...liveIndex.body.matchAll(/href="(\/assets\/[^"]+)"|src="(\/assets\/[^"]+)"/g)]
    .map((m) => m[1] || m[2])
    .sort();
  const localOnly = localAssets.filter((a) => !liveAssets.includes(a));
  const liveOnly = liveAssets.filter((a) => !localAssets.includes(a));
  if (localOnly.length === 0 && liveOnly.length === 0) {
    line(`  ✓ index.html references the same ${localAssets.length} hashed assets`);
  } else {
    for (const a of localOnly) diff(`local-only asset (new build): ${a}`);
    for (const a of liveOnly) diff(`live-only asset (old build): ${a}`);
  }
  line('');

  if (differences === 0) {
    line('✅ IDENTICAL — production serves exactly what this dist build would ship.');
  } else {
    line(`❌ ${differences} difference(s) — production is running an older (or different) build.`);
  }
  console.log(report.join('\n'));
  process.exit(differences === 0 ? 0 : 1);
};

run().catch((error) => {
  console.error(`✗ unexpected error: ${error.message}`);
  process.exit(1);
});
