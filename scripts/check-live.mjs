/**
 * Post-deploy AI visibility check.
 *
 * Fetches the LIVE site (or `--base <url>` for staging/preview) and reports
 * exactly what GPTBot, PerplexityBot, and ClaudeBot — and every registered AI
 * crawler — would receive:
 *
 *   1. robots.txt access verdict per crawler (RFC 9309 semantics, shared with
 *      the pre-deploy gate in scripts/check-robots.mjs)
 *   2. llms.txt / llms-full.txt / sitemap.xml presence, size, and coverage
 *   3. every public page: HTTP status, content-type, title/description/
 *      canonical vs the intended config, H1 count, JSON-LD health, and a
 *      word count that proves the page is prerendered, not a JS shell
 *
 * Requests are sent with a real crawler user-agent (GPTBot's by default) so
 * the response is what the bot would actually get. Pages are validated against
 * the PRODUCTION siteUrl (canonical, og:image, expected titles), so pointing
 * --base at a preview/staging host still verifies the deployed contract.
 *
 * Usage:
 *   node scripts/check-live.mjs                       # production site
 *   node scripts/check-live.mjs --base http://127.0.0.1:4173
 *   node scripts/check-live.mjs --timeout 20000
 *
 * Exits 1 if anything an AI agent depends on is missing, wrong, or blocked.
 */
import { evaluateCrawlers } from './robots.mjs';
import { siteConfig } from '../src/content/site.js';
import { getSeoConfig, toAbsoluteUrl } from '../src/seo/site.js';
import { allPublicPaths } from '../src/utils/routeMeta.js';
import { insights } from '../src/content/insights.js';

const args = process.argv.slice(2);
const baseFlag = args.indexOf('--base');
const BASE = (baseFlag !== -1 && args[baseFlag + 1]) || siteConfig.siteUrl;
const timeoutFlag = args.indexOf('--timeout');
const TIMEOUT = Number((timeoutFlag !== -1 && args[timeoutFlag + 1]) || 15000);

// Real crawler user-agents. Shared fetches go out as GPTBot; robots.txt is
// parsed locally per crawler, which is what the crawler itself does.
const GPTBOT_UA =
  'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot';

const FOCUS_BOTS = ['GPTBot', 'PerplexityBot', 'ClaudeBot'];

let failures = 0;
const report = [];
const line = (text = '') => report.push(text);

const fetchText = async (url) => {
  const response = await fetch(url, {
    headers: { 'user-agent': GPTBOT_UA, accept: '*/*' },
    signal: AbortSignal.timeout(TIMEOUT)
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

const pageWordCount = (html) => {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text ? text.split(' ').length : 0;
};

// --- assets ----------------------------------------------------------------

const checkAsset = async (pathname) => {
  const url = `${BASE}${pathname}`;
  try {
    const res = await fetchText(url);
    return { pathname, ...res };
  } catch (error) {
    return { pathname, status: 0, type: '', body: '', error: error.message };
  }
};

// --- pages -----------------------------------------------------------------

const checkPage = async (routePath) => {
  const url = routePath === '/' ? `${BASE}/` : `${BASE}${routePath}`;
  const issues = [];
  let notes = '';

  let res;
  try {
    res = await fetchText(url);
  } catch (error) {
    return { routePath, fatal: error.message };
  }

  const { status, type, body } = res;
  if (status !== 200) issues.push(`HTTP ${status}`);
  if (!type.includes('text/html')) issues.push(`content-type ${type}`);
  if (body.includes('<!--seo-head-->')) issues.push('unreplaced prerender placeholder');

  const expected = getSeoConfig(routePath);

  const title = decodeHtml((body.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '').trim());
  if (!title) {
    issues.push('missing title');
  } else if (title !== expected.title) {
    issues.push(`title mismatch: "${title}"`);
  }

  const description = decodeHtml(
    (body.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '').trim()
  );
  if (!description) {
    issues.push('missing description');
  } else if (description !== expected.description) {
    issues.push('description mismatch');
  }

  const canonical = (body.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? '').trim();
  const expectedCanonical = toAbsoluteUrl(routePath);
  if (canonical !== expectedCanonical) {
    issues.push(`canonical: ${canonical || '(missing)'}`);
  }

  const h1Count = (body.match(/<h1[\s\S]*?<\/h1>/g) ?? []).length;
  if (h1Count !== 1) issues.push(`H1 count ${h1Count}`);

  const ogImage = (body.match(/<meta property="og:image" content="([^"]+)"/)?.[1] ?? '').trim();
  if (!ogImage.startsWith(`${siteConfig.siteUrl}/`)) {
    issues.push('og:image not on production origin');
  }

  const blocks = [...body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const parsed = [];
  let broken = 0;
  for (const match of blocks) {
    try {
      parsed.push(JSON.parse(match[1]));
    } catch {
      broken += 1;
    }
  }
  if (blocks.length === 0) issues.push('no JSON-LD');
  if (broken > 0) issues.push(`${broken} broken JSON-LD block(s)`);

  const article = insights.find((item) => routePath === `/insights/${item.slug}`);
  if (article) {
    if (!body.includes(article.title)) issues.push('article headline missing from page body');
    if (!parsed.some((block) => block['@type'] === 'Article' && block.headline === article.title)) {
      issues.push('Article JSON-LD headline mismatch');
    }
  }

  const words = pageWordCount(body);
  if (words < 100) issues.push(`only ${words} words (JS shell?)`);

  notes = `${title === expected.title ? 'title ✓' : 'no title'} · ${h1Count === 1 ? '1 H1 ✓' : 'H1 ✗'} · ${blocks.length} JSON-LD · ${words.toLocaleString('en-US')} words`;
  if (article) {
    const headlineInBody = body.includes(article.title);
    const headlineInJsonLd = parsed.some(
      (block) => block['@type'] === 'Article' && block.headline === article.title
    );
    notes += headlineInBody && headlineInJsonLd ? ' · headline ✓' : ' · headline ✗';
  }

  return { routePath, status, notes, issues };
};

// --- run -------------------------------------------------------------------

const run = async () => {
  line(`=== AI access report — ${BASE} ===`);
  line(`Fetched as: ${GPTBOT_UA}`);
  line(`Validated against production origin: ${siteConfig.siteUrl}`);
  line('');

  // 1. robots.txt + per-crawler verdicts
  const robots = await checkAsset('/robots.txt');
  if (robots.status !== 200) {
    failures += 1;
    line(`✗ robots.txt ${robots.error ? `(fetch failed: ${robots.error})` : `HTTP ${robots.status}`}`);
  } else {
    const verdicts = evaluateCrawlers(robots.body);
    const blocked = verdicts.filter((result) => result.status === 'blocked');
    const bodyLower = robots.body.toLowerCase();

    line(`robots.txt (${robots.status}, ${(robots.body.length / 1024).toFixed(1)} KB)`);
    for (const bot of FOCUS_BOTS) {
      const verdict = verdicts.find((result) => result.crawler.name === bot);
      if (!verdict) continue;
      const explicitGroup = bodyLower.includes(`user-agent: ${bot.toLowerCase()}`);
      line(
        `  ${bot.padEnd(13)} ${verdict.status === 'allowed' ? '✓ ALLOWED' : '✗ BLOCKED'}` +
          (verdict.status === 'allowed' && explicitGroup ? ' (explicit Allow: / group)' : '')
      );
    }
    if (blocked.length === 0) {
      line(`  ${verdicts.length} AI + search crawlers checked — none blocked`);
    } else {
      failures += blocked.length;
      for (const { crawler } of blocked) {
        line(`  ✗ ${crawler.name} (${crawler.note})`);
      }
    }
    line('');
  }

  // 2. AI-visible assets
  const llms = await checkAsset('/llms.txt');
  const links = (llms.body.match(/\[[^\]]+\]\(https?:\/\/[^)]+\)/g) ?? []).length;
  if (llms.status === 200 && llms.body.includes('llms-full.txt')) {
    line(`llms.txt      ${llms.status} · ${llms.type.split(';')[0]} · ${(llms.body.length / 1024).toFixed(1)} KB · ${links} links · → llms-full.txt ✓`);
  } else {
    failures += 1;
    line(`✗ llms.txt ${llms.error ? `(fetch failed: ${llms.error})` : `HTTP ${llms.status}${llms.body.includes('llms-full.txt') ? '' : ' — no llms-full.txt link'}`}`);
  }

  const llmsFull = await checkAsset('/llms-full.txt');
  const fullHeadings = (llmsFull.body.match(/^# /gm) ?? []).length;
  if (llmsFull.status === 200 && fullHeadings >= allPublicPaths.length) {
    line(`llms-full.txt ${llmsFull.status} · ${llmsFull.type.split(';')[0]} · ${(llmsFull.body.length / 1024).toFixed(1)} KB · ${fullHeadings} pages (≥ ${allPublicPaths.length}) ✓`);
  } else {
    failures += 1;
    line(`✗ llms-full.txt ${llmsFull.error ? `(fetch failed: ${llmsFull.error})` : `HTTP ${llmsFull.status} · ${fullHeadings}/${allPublicPaths.length} pages`}`);
  }

  const sitemap = await checkAsset('/sitemap.xml');
  const locs = (sitemap.body.match(/<loc>/g) ?? []).length;
  if (sitemap.status === 200 && locs === allPublicPaths.length) {
    line(`sitemap.xml   ${sitemap.status} · ${sitemap.type.split(';')[0]} · ${locs} URLs ✓`);
  } else {
    failures += 1;
    line(`✗ sitemap.xml ${sitemap.error ? `(fetch failed: ${sitemap.error})` : `HTTP ${sitemap.status} · ${locs}/${allPublicPaths.length} URLs`}`);
  }
  line('');

  // 3. Pages
  line(`Pages (${allPublicPaths.length}) — what each allowed bot would fetch:`);
  for (const routePath of allPublicPaths) {
    const page = await checkPage(routePath);
    if (page.fatal) {
      failures += 1;
      line(`  ✗ ${routePath === '/' ? '/' : routePath} — fetch failed: ${page.fatal}`);
      continue;
    }
    const marker = page.issues.length === 0 ? '✓' : '✗';
    line(`  ${marker} ${(routePath === '/' ? '/' : routePath).padEnd(42)} ${page.status} · ${page.notes}`);
    for (const issue of page.issues) {
      failures += 1;
      line(`      ✗ ${issue}`);
    }
  }

  line('');
  if (failures === 0) {
    const allowed = FOCUS_BOTS.join(', ');
    line(
      `✅ PASS — ${allowed} are allowed and would receive ${allPublicPaths.length} prerendered pages` +
        ' with correct SEO heads and structured data, plus llms.txt, llms-full.txt, and sitemap.xml.'
    );
  } else {
    line(`❌ FAIL — ${failures} issue(s) found. Deploy the current build, then re-run this check.`);
  }
  console.log(report.join('\n'));
  process.exit(failures === 0 ? 0 : 1);
};

run().catch((error) => {
  console.error(`✗ unexpected error: ${error.message}`);
  process.exit(1);
});
