// Regenerates public/resume/resume.pdf from scripts/resume/resume.html.
// Usage: npm run resume:build   (or: node scripts/resume/build-resume.mjs)
// Optional args (paths relative to project root):
//   node scripts/resume/build-resume.mjs scripts/resume/resume-v2.html Ferdinard_Ashonibare_Fullstack_Engineer_v2.pdf
// Set CHROME_PATH to override the browser executable.
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';

const args = process.argv.slice(2);
const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const htmlPath = join(root, args[0] || 'scripts/resume/resume.html');
const outPath = join(root, args[1] || 'public/resume/resume.pdf');

if (!existsSync(htmlPath)) {
  console.error(`Source HTML not found: ${htmlPath}`);
  process.exit(1);
}

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
].filter(Boolean);

const browser = candidates.find((p) => existsSync(p));
if (!browser) {
  console.error('No Chrome/Edge executable found. Set CHROME_PATH to one and retry.');
  process.exit(1);
}

// file:// URL with spaces percent-encoded (the project path contains spaces).
const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/').replace(/ /g, '%20');

execFileSync(
  browser,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${outPath}`,
    fileUrl
  ],
  { stdio: 'inherit' }
);

const size = statSync(outPath).size;
console.log(`OK: ${outPath} (${(size / 1024).toFixed(1)} KB)`);
