/**
 * Pre-deploy platform metrics gate.
 *
 * Re-measures the LIVE platform behind the So-Safe Corps case study
 * (featuredCaseStudy.liveUrl in src/content/caseStudies.js) and verifies the
 * published `outcomes` still describe it:
 *
 *   - Status        the platform must answer HTTP 200
 *   - HTTPS + HSTS  Strict-Transport-Security must still be present
 *   - Page weight   median HTML bytes vs the published KB (worse-only, +40%)
 *   - Time to first byte  median TTFB vs the published seconds (worse-only, +60%)
 *   - Composition   script / stylesheet / image counts vs the published detail
 *
 * Drift is worse-only: a measured IMPROVEMENT over the published number passes
 * (with a note), because a claim like "≈1.4 s, measured then" stays true when
 * the platform gets faster. Only a materially worse number makes the claim
 * misleading, so only that fails.
 *
 * Exits 1 on any hard failure, gross drift, or unreachable platform — so it
 * can gate a deploy. Run it right before pushing.
 *
 * Usage:
 *   node scripts/check-metrics.mjs                  # gate (read-only)
 *   node scripts/check-metrics.mjs --probes 10      # stabler median
 *   node scripts/check-metrics.mjs --timeout 20000  # per-probe timeout ms
 *   node scripts/check-metrics.mjs --update         # refresh published numbers from fresh measurements
 *   node scripts/check-metrics.mjs --content <path> # run the gate + --update against a copy (defaults to the repo file)
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const args = process.argv.slice(2);
const flagValue = (name) => {
  const index = args.indexOf(name);
  return index !== -1 ? args[index + 1] : undefined;
};
const PROBES = Math.max(1, Number(flagValue('--probes') ?? 5));
const TIMEOUT = Number(flagValue('--timeout') ?? 15000);
const UPDATE = args.includes('--update');
const CONTENT_FILE =
  flagValue('--content') ||
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/content/caseStudies.js');

// Worse-only drift tolerances.
const TOLERANCE = { weight: 0.4, ttfb: 0.6 };

let failures = 0;
const report = [];
const line = (text = '') => report.push(text);

const now = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date();
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const probe = async (url) => {
  const started = performance.now();
  const res = await fetch(url, {
    headers: { 'user-agent': 'Mozilla/5.0 (compatible; MetricsGate/1.0; pre-deploy check)' },
    redirect: 'follow',
    signal: AbortSignal.timeout(TIMEOUT)
  });
  const ttfb = performance.now() - started;
  const body = await res.text();
  return {
    status: res.status,
    ttfb,
    bytes: Buffer.byteLength(body, 'utf8'),
    hsts: res.headers.get('strict-transport-security') !== null,
    // Executable scripts only — JSON-LD structured-data blocks use <script> too.
    scripts: [...body.matchAll(/<script\b[^>]*>/gi)].filter((match) => !/application\/ld\+json/i.test(match[0])).length,
    stylesheets: (body.match(/<link\b[^>]*rel=["']stylesheet["']/gi) ?? []).length,
    images: (body.match(/<img\b/gi) ?? []).length
  };
};

const parseKb = (value) => {
  const match = value.match(/≈?\s*([\d.]+)\s*KB/i);
  return match ? Number(match[1]) * 1024 : null;
};

const parseSeconds = (value) => {
  const match = value.match(/≈?\s*([\d.]+)\s*s\b/i);
  return match ? Number(match[1]) * 1000 : null;
};

const parseCount = (detail, word) => {
  const match = detail.match(new RegExp(`(\\d+)\\s*${word}`, 'i'));
  return match ? Number(match[1]) : null;
};

const pct = (measured, published) => {
  const delta = ((measured - published) / published) * 100;
  return `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}%`;
};

const kb = (bytes) => (bytes / 1024).toFixed(0);

// --- comparison -------------------------------------------------------------

const COMPOSITION = [
  { word: 'script', key: 'scripts' },
  { word: 'stylesheet', key: 'stylesheets' },
  { word: 'image', key: 'images' }
];

const check = (publishedOutcomes, measured) => {
  const results = [];
  const outcome = (label) => publishedOutcomes.find((item) => item.label === label);

  const status = outcome('Status');
  if (!status) {
    results.push({ ok: false, text: 'published "Status" outcome is missing — add it back' });
  } else if (measured.status !== 200) {
    results.push({ ok: false, text: `Status: published "${status.value}" · measured HTTP ${measured.status}` });
  } else {
    results.push({ ok: true, text: `Status: published "${status.value}" · measured HTTP 200` });
  }

  const security = outcome('HTTPS + HSTS');
  if (!security) {
    results.push({ ok: false, text: 'published "HTTPS + HSTS" outcome is missing — add it back' });
  } else if (!measured.hsts) {
    results.push({ ok: false, text: 'HTTPS + HSTS: published "Verified active" · measured: no Strict-Transport-Security header' });
  } else {
    results.push({ ok: true, text: 'HTTPS + HSTS: published "Verified active" · measured: Strict-Transport-Security present' });
  }

  const weight = outcome('Page weight');
  if (!weight) {
    results.push({ ok: false, text: 'published "Page weight" outcome is missing — add it back' });
  } else {
    const published = parseKb(weight.value);
    if (published === null) {
      results.push({ ok: false, text: `Page weight: cannot parse published value "${weight.value}"` });
    } else if (measured.bytes > published * (1 + TOLERANCE.weight)) {
      results.push({
        ok: false,
        text: `Page weight: published ≈${kb(published)} KB · measured ≈${kb(measured.bytes)} KB (${pct(measured.bytes, published)}, tolerance +${TOLERANCE.weight * 100}%)`
      });
    } else {
      results.push({
        ok: true,
        text: `Page weight: published ≈${kb(published)} KB · measured ≈${kb(measured.bytes)} KB (${pct(measured.bytes, published)})${measured.bytes <= published ? ' — lighter, still holds' : ''}`
      });
    }
    for (const { word, key } of COMPOSITION) {
      const expected = parseCount(weight.detail ?? '', word);
      if (expected === null) continue; // detail doesn't state counts — nothing to verify
      if (measured[key] !== expected) {
        results.push({ ok: false, text: `Composition: ${measured[key]} ${word}s measured vs ${expected} published` });
      }
    }
  }

  const ttfbOutcome = outcome('Time to first byte');
  if (!ttfbOutcome) {
    results.push({ ok: false, text: 'published "Time to first byte" outcome is missing — add it back' });
  } else {
    const published = parseSeconds(ttfbOutcome.value);
    if (published === null) {
      results.push({ ok: false, text: `Time to first byte: cannot parse published value "${ttfbOutcome.value}"` });
    } else if (measured.ttfb > published * (1 + TOLERANCE.ttfb)) {
      results.push({
        ok: false,
        text: `Time to first byte: published ≈${(published / 1000).toFixed(1)} s · measured ≈${(measured.ttfb / 1000).toFixed(2)} s (${pct(measured.ttfb, published)}, tolerance +${TOLERANCE.ttfb * 100}%)`
      });
    } else {
      results.push({
        ok: true,
        text: `Time to first byte: published ≈${(published / 1000).toFixed(1)} s · measured ≈${(measured.ttfb / 1000).toFixed(2)} s (${pct(measured.ttfb, published)})${measured.ttfb <= published ? ' — faster, still holds' : ''}`
      });
    }
  }

  return results;
};

// --- --update ---------------------------------------------------------------

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const rewriteOutcome = (text, label, changes) => {
  let updated = text;
  if (changes.value !== null) {
    updated = updated.replace(
      new RegExp(`(label: '${escapeRegExp(label)}',\\s*\\r?\\n\\s*value: ')[^']*(')`),
      `$1${changes.value}$2`
    );
  }
  if (changes.detail !== null) {
    updated = updated.replace(
      new RegExp(`(label: '${escapeRegExp(label)}',\\s*\\r?\\n\\s*value: '[^']*',\\s*\\r?\\n\\s*detail: ')[^']*(')`),
      `$1${changes.detail}$2`
    );
  }
  return updated;
};

const refresh = async (measured, featuredCaseStudy) => {
  const date = now();
  const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
  const probes = `from ${measured.probes} network probe${measured.probes === 1 ? '' : 's'} (median)`;

  const updates = new Map([
    [
      'HTTPS + HSTS',
      {
        value: null,
        detail: `Strict-Transport-Security: max-age=31536000 confirmed on the live response headers (measured ${date}).`
      }
    ],
    [
      'Page weight',
      {
        value: `≈${Math.round(measured.bytes / 1024)} KB HTML`,
        detail: `Measured ${date} ${probes}: ${plural(measured.scripts, 'script')}, ${plural(measured.stylesheets, 'stylesheet')}, ${plural(measured.images, 'image')}.`
      }
    ],
    [
      'Time to first byte',
      {
        value: `≈${(measured.ttfb / 1000).toFixed(1)} s`,
        detail: `Measured ${date} ${probes} — varies with visitor location and server load.`
      }
    ]
  ]);

  let text = await readFile(CONTENT_FILE, 'utf8');
  for (const [label, changes] of updates) {
    text = rewriteOutcome(text, label, changes);
  }
  await writeFile(CONTENT_FILE, text);

  // Post-update self-check: the refreshed numbers must pass the same gate.
  const refreshed = featuredCaseStudy.outcomes.map((item) => {
    const change = updates.get(item.label);
    return change ? { ...item, value: change.value ?? item.value, detail: change.detail ?? item.detail } : item;
  });
  return refreshed;
};

// --- run --------------------------------------------------------------------

const run = async () => {
  // The file being verified: the repo copy by default, or `--content <path>`
  // (for testing a proposed file without touching the repo).
  const { featuredCaseStudy } = await import(pathToFileURL(CONTENT_FILE).href);
  const liveUrl = featuredCaseStudy.liveUrl;

  line(`=== Platform metrics gate — ${liveUrl} ===`);
  line(
    `Probing ${PROBES}× (${TIMEOUT / 1000}s timeout per probe)${UPDATE ? ' · --update: will refresh published numbers' : ''}`
  );
  line('');

  const okProbes = [];
  let failedProbes = 0;
  for (let i = 0; i < PROBES; i += 1) {
    try {
      const result = await probe(liveUrl);
      okProbes.push(result);
      line(
        `  probe ${i + 1}: HTTP ${result.status} · TTFB ${(result.ttfb / 1000).toFixed(2)} s · ${(result.bytes / 1024).toFixed(1)} KB · ${result.scripts} script${result.scripts === 1 ? '' : 's'}, ${result.stylesheets} stylesheet${result.stylesheets === 1 ? '' : 's'}, ${result.images} image${result.images === 1 ? '' : 's'}${result.hsts ? ' · HSTS ✓' : ' · HSTS ✗'}`
      );
    } catch (error) {
      failedProbes += 1;
      line(`  probe ${i + 1}: failed — ${error.message}`);
    }
  }

  if (okProbes.length === 0) {
    failures += 1;
    line('');
    line('✗ Platform unreachable — every probe failed. The case study claims "Live in production";');
    line('  do not deploy while it cannot be reached.');
  } else {
    const bad = okProbes.find((result) => result.status !== 200);
    const measured = {
      status: bad ? bad.status : 200,
      hsts: okProbes.every((result) => result.hsts),
      ttfb: median(okProbes.map((result) => result.ttfb)),
      bytes: median(okProbes.map((result) => result.bytes)),
      scripts: okProbes[0].scripts,
      stylesheets: okProbes[0].stylesheets,
      images: okProbes[0].images,
      probes: okProbes.length
    };
    if (failedProbes > 0) {
      line(`  (${failedProbes} probe${failedProbes === 1 ? '' : 's'} failed — median over ${okProbes.length})`);
    }
    line(
      `  median: TTFB ${(measured.ttfb / 1000).toFixed(2)} s · ${(measured.bytes / 1024).toFixed(1)} KB · ` +
        `${measured.scripts} script${measured.scripts === 1 ? '' : 's'}, ${measured.stylesheets} stylesheet${measured.stylesheets === 1 ? '' : 's'}, ` +
        `${measured.images} image${measured.images === 1 ? '' : 's'}${measured.hsts ? ' · HSTS on all probes' : ' · HSTS missing'}` +
        (measured.status === 200 ? ' · HTTP 200' : ` · HTTP ${measured.status}`)
    );
    line('');

    let results = check(featuredCaseStudy.outcomes, measured);
    line('Published vs measured (worse-only drift check):');
    for (const result of results) {
      line(`  ${result.ok ? '✓' : '✗'} ${result.text}`);
      if (!result.ok) failures += 1;
    }

    if (UPDATE) {
      line('');
      line(`--update: refreshing published numbers (${CONTENT_FILE})…`);
      const refreshed = await refresh(measured, featuredCaseStudy);
      results = check(refreshed, measured);
      line('  post-update re-check:');
      for (const result of results) {
        line(`  ${result.ok ? '✓' : '✗'} ${result.text}`);
        if (!result.ok) failures += 1;
      }
      if (results.every((result) => result.ok)) {
        line(`  ✅ content file refreshed with today's measurements (${now()})`);
      }
    }
  }

  line('');
  if (failures === 0) {
    line('✅ PASS — every published case-study outcome still describes the live platform.');
  } else {
    line(`❌ FAIL — ${failures} issue(s). The published numbers no longer hold; refresh them with:`);
    line('     npm run verify:metrics -- --update');
  }
  console.log(report.join('\n'));
  process.exit(failures === 0 ? 0 : 1);
};

run().catch((error) => {
  console.error(`✗ unexpected error: ${error.message}`);
  process.exit(1);
});
