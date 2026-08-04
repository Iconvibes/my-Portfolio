#!/usr/bin/env node
/**
 * Regenerate the social share card (public/og-card.jpg) from the current
 * public/profile.jpg — run after any photo change:
 *
 *     npm run og-card
 *
 * Pipeline: writes a 1200×630 card (photo + terminal status block) as HTML,
 * screenshots it with headless Chrome, converts to a quality-95 JPEG, then
 * verifies the output is 1200×630 and under WhatsApp's ~300 KB preview limit.
 *
 * JPEG conversion uses PowerShell + System.Drawing (Windows). On other
 * platforms the script prints the PNG and exits with instructions.
 */
import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const PHOTO = path.join(publicDir, 'profile.jpg');
const OUTPUT = path.join(publicDir, 'og-card.jpg');
const SIZE_LIMIT = 300 * 1024; // WhatsApp preview limit (~300 KB)
const WIDTH = 1200;
const HEIGHT = 630;

const CARD_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Syne:wght@600;800&family=Instrument+Serif:ital@0;1&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${WIDTH}px; height: ${HEIGHT}px; }
  body {
    background: #060a12; color: #e2e8f0; overflow: hidden; position: relative;
    font-family: 'JetBrains Mono', ui-monospace, Consolas, monospace;
    /* Note: -webkit-font-smoothing is a no-op on Windows Chrome (DirectWrite
       always uses subpixel AA), so the JPEG conversion preserves the exact
       render. Harmless to keep for macOS/other renderers. */
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  .grid { position: absolute; inset: 0;
    background-image: linear-gradient(to right, rgba(148,163,184,.05) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(148,163,184,.05) 1px, transparent 1px);
    background-size: 40px 40px; }
  .glow { position: absolute; inset: 0;
    background: radial-gradient(ellipse at 18% 0%, rgba(200,241,53,.15), transparent 46%),
                radial-gradient(ellipse at 100% 100%, rgba(56,130,246,.13), transparent 52%); }
  .card { position: absolute; inset: 0; display: flex; align-items: center;
    padding: 54px 62px; gap: 46px; }
  .left { flex: 1; min-width: 0; }
  .eyebrow { color: #c8f135; font-size: 18px; font-weight: 600;
    letter-spacing: .22em; text-transform: uppercase; margin-bottom: 16px; }
  .term { background: rgba(11,18,32,.94); border: 1px solid rgba(148,163,184,.22);
    border-radius: 16px; padding: 20px 26px; width: 590px;
    box-shadow: 0 26px 64px rgba(0,0,0,.45); }
  .bar { display: flex; gap: 8px; align-items: center; padding-bottom: 13px;
    margin-bottom: 12px; border-bottom: 1px solid rgba(148,163,184,.14); }
  .bar i { width: 12px; height: 12px; border-radius: 99px; display: inline-block; }
  .bar i:nth-child(1) { background: #ff5f57; }
  .bar i:nth-child(2) { background: #febc2e; }
  .bar i:nth-child(3) { background: #28c840; }
  .bar span { margin-left: auto; color: #64748b; font-size: 13px;
    letter-spacing: .18em; text-transform: uppercase; }
  .ln { font-size: 20px; line-height: 1.95; white-space: nowrap; }
  .p { color: #c8f135; margin-right: 10px; }
  .hi { color: #f8fafc; font-weight: 600; }
  .dim { color: #64748b; }
  .status { color: #c8f135; font-weight: 700; }
  .cursor { display: inline-block; width: 10px; height: 21px; background: #c8f135;
    vertical-align: -3px; margin-left: 5px; border-radius: 2px; }
  .name { font-family: 'Syne', 'Segoe UI', sans-serif; font-weight: 800;
    font-size: 46px; line-height: 1.05; color: #f8fafc; margin-top: 24px;
    letter-spacing: -.01em; }
  .name em { font-family: 'Instrument Serif', Georgia, serif; font-style: italic;
    font-weight: 400; color: #c8f135; }
  .right .photo { width: 306px; height: 382px; border-radius: 22px; object-fit: cover;
    object-position: center top; border: 1px solid rgba(148,163,184,.3);
    box-shadow: 0 30px 70px rgba(0,0,0,.5); }
</style>
</head>
<body>
  <div class="grid"></div>
  <div class="glow"></div>
  <div class="card">
    <div class="left">
      <div class="eyebrow">// ferdinand — status</div>
      <div class="term">
        <div class="bar"><i></i><i></i><i></i><span>ferdinard — status</span></div>
        <div class="ln"><span class="p">$</span><span class="hi">whoami</span></div>
        <div class="ln">↳ <span class="hi">ferdinard ashonibare</span></div>
        <div class="ln"><span class="p">$</span><span class="hi">cat status.json</span></div>
        <div class="ln dim">↳ { role: "full-stack developer" }</div>
        <div class="ln dim">↳ { stack: "react · node · express · mongo" }</div>
        <div class="ln dim">↳ { base: "lagos, nigeria" }</div>
        <div class="ln"><span class="status">↳ { status: "open to work" }</span><span class="cursor"></span></div>
      </div>
      <div class="name">Ferdinard <em>Ashonibare</em></div>
    </div>
    <div class="right">
      <img class="photo" src="profile.jpg" alt="Ferdinard Ashonibare" />
    </div>
  </div>
</body>
</html>`;

const fail = (message) => {
  console.error(`\n❌ og-card: ${message}\n`);
  process.exit(1);
};

const findChrome = () => {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
  ];
  return candidates.find((candidate) => candidate && existsSync(candidate));
};

const pngSize = (file) => {
  const bytes = readFileSync(file);
  return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)];
};

const jpegToOutput = (pngPath) => {
  if (process.platform !== 'win32') {
    fail(
      `JPEG conversion needs Windows (PowerShell + System.Drawing). ` +
        `The PNG was left at ${pngPath} — convert it (e.g. with sharp) and save it as public/og-card.jpg.`
    );
  }

  const ps1Path = path.join(tmpdir(), `og-card-${process.pid}.ps1`);
  writeFileSync(
    ps1Path,
    [
      'Add-Type -AssemblyName System.Drawing',
      '$img = [System.Drawing.Image]::FromFile($env:OG_SRC)',
      '$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq \'image/jpeg\' }',
      '$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)',
      '$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]95)',
      '$img.Save($env:OG_DST, $enc, $ep)',
      '$img.Dispose()'
    ].join('\n'),
    'utf8'
  );

  const result = spawnSync(
    'powershell.exe',
    ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', ps1Path],
    { encoding: 'utf8', env: { ...process.env, OG_SRC: pngPath, OG_DST: OUTPUT } }
  );
  rmSync(ps1Path, { force: true });

  if (result.status !== 0 || !existsSync(OUTPUT)) {
    fail(`JPEG conversion failed: ${(result.stderr || result.stdout || 'unknown error').trim()}`);
  }
};

// ---- main ----
if (!existsSync(PHOTO)) {
  fail(`public/profile.jpg not found — add your portrait first.`);
}

const tmpHtml = path.join(publicDir, `.og-card-${process.pid}.html`);
const tmpPng = path.join(tmpdir(), `og-card-${process.pid}.png`);

try {
  writeFileSync(tmpHtml, CARD_HTML, 'utf8');

  const chrome = findChrome();
  if (!chrome) {
    fail('headless Chrome/Edge not found — set CHROME_PATH to the executable.');
  }

  const shot = spawnSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      `--window-size=${WIDTH},${HEIGHT}`,
      '--virtual-time-budget=8000',
      `--screenshot=${tmpPng}`,
      pathToFileURL(tmpHtml).href
    ],
    { encoding: 'utf8' }
  );

  if (shot.status !== 0 || !existsSync(tmpPng)) {
    fail(`Chrome screenshot failed: ${(shot.stderr || shot.stdout || 'no output').trim()}`);
  }

  const [w, h] = pngSize(tmpPng);
  if (w !== WIDTH || h !== HEIGHT) {
    fail(`rendered ${w}×${h} instead of ${WIDTH}×${HEIGHT} — check the card markup.`);
  }

  jpegToOutput(tmpPng);

  // Keep the lossless master next to the script (not shipped) so the JPEG can be
  // re-verified against its exact source render after any photo/card change.
  copyFileSync(tmpPng, path.join(root, '.freebuff', 'og-card-master.png'));

  const size = readFileSync(OUTPUT).length;
  const pretty = `${(size / 1024).toFixed(1)} KB`;
  console.log(`\n✅ og-card regenerated: public/og-card.jpg (${WIDTH}×${HEIGHT}, ${pretty})`);

  if (size > SIZE_LIMIT) {
    console.warn(`⚠️  ${pretty} exceeds WhatsApp's ~300 KB preview limit — WhatsApp may drop the image.`);
  } else {
    console.log(`✓ Under WhatsApp's ~300 KB limit.`);
  }
  console.log('✓ The og meta already points at /og-card.jpg — redeploy and re-run the cache-busting checklist.\n');
} finally {
  rmSync(tmpHtml, { force: true });
  rmSync(tmpPng, { force: true });
}
