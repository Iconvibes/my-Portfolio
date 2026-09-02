#!/usr/bin/env node
/**
 * Refresh the self-hosted fonts.
 *
 * Downloads the latin + latin-ext woff2 subsets for the three families the
 * design system uses (Manrope, DM Sans, JetBrains Mono) into public/fonts/,
 * dedupes the files Google serves once per family across weights (Manrope
 * and DM Sans share a single file per weight), and rewrites the @font-face
 * block in src/styles/globals.css between the "self-hosted-fonts" markers.
 *
 *     node scripts/fetch-fonts.mjs
 *
 * NOTE: keep the generated filenames stable across refreshes — the
 * netlify.toml woff2 cache rule relies on them (a rename would orphan old
 * cached files).
 */
import { writeFileSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
const CSS_URL =
  'https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap';
const KEEP = ['latin', 'latin-ext'];
const START_MARKER = '/* <self-hosted-fonts> */';
const END_MARKER = '/* </self-hosted-fonts> */';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'fonts');
const globalsCss = path.join(root, 'src', 'styles', 'globals.css');

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const cssRes = await fetch(CSS_URL, { headers: { 'user-agent': UA } });
if (!cssRes.ok) throw new Error(`CSS fetch failed: HTTP ${cssRes.status}`);
const css = await cssRes.text();

const blocks = [];
const re = /\/\*\s*([a-z-]+)\s*\*\/\s*@font-face\s*\{([\s\S]*?)\}/g;
let m;
while ((m = re.exec(css))) blocks.push({ subset: m[1], body: m[2] });

const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const get = (body, key) => (body.match(new RegExp(key + ': ([^;]+);')) || [])?.[1]?.trim();
const md5 = (buf) => createHash('md5').update(buf).digest('hex');

// Download everything, keyed by (family, subset, style, weight)
const items = [];
for (const { subset, body } of blocks) {
  if (!KEEP.includes(subset)) continue;
  const family = get(body, 'font-family').replace(/'/g, '');
  const style = get(body, 'font-style');
  const weight = get(body, 'font-weight');
  const unicodeRange = get(body, 'unicode-range');
  const url = (get(body, 'src').match(/url\(([^)]+)\)/) || [])[1];

  const r = await fetch(url);
  if (!r.ok) throw new Error(`Font fetch failed: HTTP ${r.status} (${url})`);
  const buf = Buffer.from(await r.arrayBuffer());
  items.push({ family, style, weight, subset, unicodeRange, buf });
}

// Dedupe identical bytes (Google serves one file per family across weights).
const hashToItem = new Map();
for (const it of items) {
  const h = md5(it.buf);
  if (hashToItem.has(h)) {
    hashToItem.get(h).weights.push(it.weight);
    hashToItem.get(h).subsets.push(it.subset);
    hashToItem.get(h).styles.push(it.style);
  } else {
    hashToItem.set(h, { ...it, weights: [it.weight], subsets: [it.subset], styles: [it.style] });
  }
}

const rules = [];
let n = 0;
for (const [, it] of hashToItem) {
  const family = it.family;
  const uniqueSubsets = [...new Set(it.subsets)];
  const uniqueWeights = [...new Set(it.weights)];
  const uniqueStyles = [...new Set(it.styles)];
  const fname = `${slug(family)}-${uniqueSubsets.join('-')}${uniqueWeights.length === 1 ? '-' + uniqueWeights[0] : ''}${uniqueStyles.length === 1 && uniqueStyles[0] !== 'normal' ? '-' + uniqueStyles[0] : ''}.woff2`;
  writeFileSync(path.join(outDir, fname), it.buf);

  for (const w of uniqueWeights) {
    for (const s of uniqueStyles) {
      for (const sub of uniqueSubsets) {
        const orig = items.find(
          (x) => x.family === family && x.weight === w && x.style === s && x.subset === sub
        );
        rules.push(`@font-face {\n  font-family: '${family}';\n  font-style: ${s};\n  font-weight: ${w};\n  font-display: swap;\n  src: url(/fonts/${fname}) format('woff2');\n  unicode-range: ${orig?.unicodeRange};\n}`);
      }
    }
  }
  console.log(`  ok ${fname} (${(it.buf.length / 1024).toFixed(0)} KB)`);
  n++;
}

// Rewrite the @font-face block in globals.css between the markers.
const generated = rules.join('\n\n') + '\n';
let cssText = readFileSync(globalsCss, 'utf8');
const start = cssText.indexOf(START_MARKER);
const end = cssText.indexOf(END_MARKER);
if (start === -1 || end === -1) {
  throw new Error('globals.css markers not found — re-add /* <self-hosted-fonts> */ ... /* </self-hosted-fonts> */');
}
cssText =
  cssText.slice(0, start + START_MARKER.length) +
  '\n' +
  generated +
  cssText.slice(end);
writeFileSync(globalsCss, cssText, 'utf8');

console.log(`${n} unique files -> public/fonts/ (${rules.length} @font-face rules)`);
console.log('globals.css updated between the <self-hosted-fonts> markers.');
