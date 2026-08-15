/**
 * Pre-deploy robots.txt gate: proves every AI and search crawler is allowed.
 *
 * Parses the robots.txt that will actually deploy (dist/robots.txt after
 * prerender, falling back to public/robots.txt before a build) and applies
 * RFC 9309 matching rules independently for each registered crawler — most
 * specific matching user-agent group wins, rules are evaluated in order, and
 * the first rule matching the root path decides. Fails the build (exit 1) if
 * any crawler would be blocked, so a tightening of the wildcard group can
 * never silently cut off GPTBot, PerplexityBot, or Googlebot.
 *
 * Usage: node scripts/check-robots.mjs [--live]
 *   --live  also fetch <siteUrl>/robots.txt and verify the deployed file.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, readFileSync } from 'node:fs';

import { evaluateCrawlers } from './robots.mjs';
import { siteConfig } from '../src/content/site.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// --- verification ----------------------------------------------------------

const report = (label, text) => {
  const results = evaluateCrawlers(text);
  const blocked = results.filter((result) => result.status === 'blocked');

  if (blocked.length === 0) {
    console.log(`  ✓ ${label}: all ${results.length} AI + search crawlers allowed`);
  } else {
    console.error(`  ✗ ${label}: ${blocked.length}/${results.length} crawler(s) BLOCKED`);
    for (const { crawler } of blocked) {
      console.error(`    ✗ ${crawler.name} (${crawler.note})`);
    }
  }
  return blocked.length;
};

// --- main ------------------------------------------------------------------

const distRobots = path.join(rootDir, 'dist', 'robots.txt');
const publicRobots = path.join(rootDir, 'public', 'robots.txt');
const robotsFile = existsSync(distRobots) ? distRobots : publicRobots;

if (!existsSync(robotsFile)) {
  console.error('❌ robots.txt not found — run `npm run build` first, or check public/robots.txt.');
  process.exit(1);
}

let failures = 0;
const label = `robots.txt (${path.relative(rootDir, robotsFile)})`;
failures += report(label, readFileSync(robotsFile, 'utf8'));

// Optional live check: verify the deployed file end to end (run after deploy).
if (process.argv.includes('--live')) {
  const url = `${siteConfig.siteUrl}/robots.txt`;
  try {
    const response = await fetch(url);
    failures += report(`live ${url}`, await response.text());
  } catch (error) {
    console.error(`  ✗ could not fetch ${url}: ${error.message}`);
    failures += 1;
  }
}

if (failures > 0) {
  console.error(`\n❌ robots.txt gate FAILED (${failures} issue(s)) — fix before deploying.`);
  process.exit(1);
}

console.log('\n✅ robots.txt gate passed — no AI crawler is blocked.\n');
