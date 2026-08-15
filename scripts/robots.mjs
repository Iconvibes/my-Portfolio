/**
 * Single source of truth for robots.txt content and the AI crawler registry.
 *
 * `buildRobots()` is what actually ships: scripts/prerender.mjs writes its
 * output to dist/robots.txt during every build. public/robots.txt mirrors the
 * same content so the checked-in file and the deployed file can never drift.
 * scripts/check-robots.mjs parses the file on disk and independently verifies
 * that every crawler in this registry is allowed.
 *
 * Why explicit per-crawler entries instead of relying on `User-agent: *`?
 * The wildcard group only covers crawlers that don't match a more specific
 * group, and it disappears entirely once any specific group exists. Explicit
 * `Allow: /` groups make the intent unambiguous, future-proof the file against
 * someone later tightening the wildcard group, and are verifiable by the
 * robots gate. The site is fully prerendered static HTML with llms.txt and
 * llms-full.txt at the root, so every allowed agent gets clean content.
 */
import { siteConfig } from '../src/content/site.js';

// AI crawlers — the GEO payload. Each entry is the robots.txt user-agent token
// plus the product tokens an actual UA would carry (for longest-match, RFC 9309).
export const AI_CRAWLERS = [
  { name: 'GPTBot', tokens: ['gptbot'], note: 'OpenAI — model training' },
  { name: 'OAI-SearchBot', tokens: ['oai-searchbot'], note: 'OpenAI — ChatGPT search' },
  { name: 'ChatGPT-User', tokens: ['chatgpt-user'], note: 'OpenAI — ChatGPT browsing' },
  { name: 'ClaudeBot', tokens: ['claudebot'], note: 'Anthropic — web indexing' },
  { name: 'Claude-Web', tokens: ['claude-web'], note: 'Anthropic — web research' },
  { name: 'Anthropic-ai', tokens: ['anthropic-ai'], note: 'Anthropic — research & training' },
  { name: 'PerplexityBot', tokens: ['perplexitybot'], note: 'Perplexity — search & answers' },
  { name: 'Google-Extended', tokens: ['google-extended'], note: 'Google — Gemini / Vertex AI' },
  { name: 'Applebot', tokens: ['applebot'], note: 'Apple — Siri / Apple Intelligence' },
  { name: 'Applebot-Extended', tokens: ['applebot-extended'], note: 'Apple — model training' },
  { name: 'cohere-ai', tokens: ['cohere-ai'], note: 'Cohere — retrieval & RAG' },
  { name: 'CCBot', tokens: ['ccbot'], note: 'Common Crawl — web corpus' },
  { name: 'Bytespider', tokens: ['bytespider'], note: 'ByteDance — AI crawler' },
  { name: 'Amazonbot', tokens: ['amazonbot'], note: 'Amazon — web data' },
  { name: 'Meta-ExternalAgent', tokens: ['meta-externalagent'], note: 'Meta — AI assistant' }
];

// Major search crawlers — verified alongside the AI crawlers so a tightening
// of the wildcard group can never silently cut off indexing either.
export const SEARCH_CRAWLERS = [
  { name: 'Googlebot', tokens: ['googlebot'], note: 'Google Search' },
  { name: 'Bingbot', tokens: ['bingbot'], note: 'Bing Search' },
  { name: 'DuckDuckBot', tokens: ['duckduckbot'], note: 'DuckDuckGo Search' }
];

// --- RFC 9309 parsing & evaluation -----------------------------------------
//
// Shared by the pre-deploy gate (scripts/check-robots.mjs) and the post-deploy
// live check (scripts/check-live.mjs) so the deployed robots.txt is always
// judged with the same semantics the real crawlers use.

export const parseRobots = (text) => {
  const groups = [];
  let current = null;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }
    const colon = line.indexOf(':');
    if (colon === -1) {
      continue;
    }
    const key = line.slice(0, colon).trim().toLowerCase();
    const value = line.slice(colon + 1).trim();

    if (key === 'user-agent') {
      // Consecutive user-agent lines before any rule form one group.
      if (current && current.rules.length === 0) {
        current.agents.push(value.toLowerCase());
      } else {
        current = { agents: [value.toLowerCase()], rules: [] };
        groups.push(current);
      }
    } else if ((key === 'allow' || key === 'disallow') && current) {
      current.rules.push({ type: key, value });
    }
    // sitemap, crawl-delay, etc. are irrelevant to the allow/block question.
  }

  return groups;
};

// Match a robots rule pattern against a path, supporting `*` (any run of
// characters) and a trailing `$` end-anchor (RFC 9309 §2.2.3). Returns the
// number of matched octets (the specificity) when the rule matches, else null.
// A bare `*` is the legacy "block everything" pattern.
const matchRule = (pattern, path) => {
  if (pattern === '*') {
    return 1;
  }
  const anchored = pattern.endsWith('$');
  const core = anchored ? pattern.slice(0, -1) : pattern;
  const segments = core.split('*');

  // The first segment must match at the very start of the path.
  if (!path.startsWith(segments[0])) {
    return null;
  }
  let pos = segments[0].length;
  for (let i = 1; i < segments.length; i += 1) {
    const segment = segments[i];
    if (segment === '') {
      continue; // leading/trailing/consecutive `*` matches zero characters
    }
    const found = path.indexOf(segment, pos);
    if (found === -1) {
      return null;
    }
    pos = found + segment.length;
  }
  if (anchored && pos !== path.length) {
    return null;
  }
  return pattern.length;
};

// RFC 9309 §2.2.1: all groups whose user-agent matches the crawler's product
// token are merged; the `*` group applies only when no specific group matches.
// §2.2.2: the most specific (longest) matching rule decides, and an `allow`
// rule beats an equally specific `disallow` rule.
export const evaluate = (groups, tokens) => {
  const specific = [];
  let wildcard = null;

  for (const group of groups) {
    const isWildcard = group.agents.includes('*');
    if (isWildcard) {
      wildcard = group;
    } else if (group.agents.some((agent) => tokens.some((token) => token.includes(agent)))) {
      specific.push(group);
    }
  }

  const rules = specific.length > 0 ? specific.flatMap((group) => group.rules) : wildcard ? wildcard.rules : [];
  if (rules.length === 0) {
    return 'allowed'; // no matching group — nothing blocks this crawler
  }

  // Empty patterns (e.g. `Disallow:` with no value) allow everything and can
  // never block — drop them before comparing specificity.
  const matches = rules
    .filter((rule) => rule.value !== '')
    .map((rule) => ({ type: rule.type, specificity: matchRule(rule.value, '/') }))
    .filter((match) => match.specificity !== null);
  if (matches.length === 0) {
    return 'allowed';
  }

  const best = Math.max(...matches.map((match) => match.specificity));
  const mostSpecific = matches.filter((match) => match.specificity === best);
  return mostSpecific.some((match) => match.type === 'allow') ? 'allowed' : 'blocked';
};

export const evaluateCrawlers = (text, crawlers = [...AI_CRAWLERS, ...SEARCH_CRAWLERS]) => {
  const groups = parseRobots(text);
  return crawlers.map((crawler) => ({
    crawler,
    status: evaluate(
      groups,
      crawler.tokens.map((token) => token.toLowerCase())
    )
  }));
};

export const buildRobots = () => {
  const lines = [
    '# robots.txt — Ferdinard Ashonibare portfolio',
    '',
    '# AI crawlers are explicitly allowed for Generative Engine Optimization (GEO):',
    '# the site is fully prerendered static HTML with llms.txt and llms-full.txt',
    '# at the root, so every agent below gets clean, parseable content.',
    '',
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /.git',
    'Disallow: /.env*',
    'Disallow: /node_modules',
    ''
  ];

  lines.push('# AI crawlers', '');
  for (const crawler of AI_CRAWLERS) {
    lines.push(`User-agent: ${crawler.name}`, 'Allow: /', '');
  }

  lines.push('# Standard search crawlers', '');
  for (const crawler of SEARCH_CRAWLERS) {
    lines.push(`User-agent: ${crawler.name}`, 'Allow: /', '');
  }

  lines.push(`# Machine-readable site summary for AI crawlers`, `Sitemap: ${siteConfig.siteUrl}/sitemap.xml`);
  return lines.join('\n') + '\n';
};
