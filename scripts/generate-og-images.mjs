#!/usr/bin/env node
/**
 * Generate page-specific Open Graph images (1200×630 JPEG) for every main route.
 *
 * Pipeline: writes an HTML card → screenshots with headless Chrome → converts
 * to JPEG via PowerShell (Windows). On non-Windows, prints the PNG and exits.
 *
 * Output files (public/):
 *   og-home.jpg     — Home page
 *   og-about.jpg    — About page
 *   og-work.jpg     — Projects / Work page
 *   og-contact.jpg  — Contact page
 *
 * Usage: node scripts/generate-og-images.mjs
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync, writeFileSync, copyFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const SIZE_LIMIT = 300 * 1024;
const WIDTH = 1200;
const HEIGHT = 630;

// ---------------------------------------------------------------------------
// Card HTML templates — each page gets a distinct visual
// ---------------------------------------------------------------------------

const baseStyles = `
  @font-face { font-family: 'Manrope'; font-style: normal; font-weight: 700; font-display: swap; src: url(../public/fonts/manrope-latin.woff2) format('woff2'); }
  @font-face { font-family: 'Manrope'; font-style: normal; font-weight: 800; font-display: swap; src: url(../public/fonts/manrope-latin.woff2) format('woff2'); }
  @font-face { font-family: 'DM Sans'; font-style: normal; font-weight: 400; font-display: swap; src: url(../public/fonts/dm-sans-latin.woff2) format('woff2'); }
  @font-face { font-family: 'DM Sans'; font-style: normal; font-weight: 500; font-display: swap; src: url(../public/fonts/dm-sans-latin.woff2) format('woff2'); }
  @font-face { font-family: 'JetBrains Mono'; font-style: normal; font-weight: 400; font-display: swap; src: url(../public/fonts/jetbrains-mono-latin.woff2) format('woff2'); }
  @font-face { font-family: 'JetBrains Mono'; font-style: normal; font-weight: 600; font-display: swap; src: url(../public/fonts/jetbrains-mono-latin.woff2) format('woff2'); }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${WIDTH}px; height: ${HEIGHT}px; }
  body {
    background: #060a12; color: #e2e8f0; overflow: hidden; position: relative;
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(to right, rgba(148,163,184,.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(148,163,184,.04) 1px, transparent 1px);
    background-size: 64px 64px;
  }
  .accent { color: #c8f135; }
  .eyebrow {
    font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 600;
    letter-spacing: .14em; text-transform: uppercase; color: #c8f135; margin-bottom: 20px;
  }
  .title {
    font-family: 'Manrope', 'Segoe UI', sans-serif; font-weight: 800;
    font-size: 44px; line-height: 1.08; color: #f8fafc; letter-spacing: -.025em;
  }
  .subtitle {
    font-family: 'DM Sans', 'Segoe UI', sans-serif; font-size: 18px; line-height: 1.6;
    color: #94a3b8; margin-top: 16px; max-width: 600px;
  }
  .badge {
    display: inline-block; background: rgba(200,241,53,.12); color: #c8f135;
    font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 600;
    padding: 6px 14px; border-radius: 99px; letter-spacing: .06em; text-transform: uppercase;
    margin-top: 24px;
  }
  .site-url {
    position: absolute; bottom: 40px; left: 62px;
    font-family: 'JetBrains Mono', monospace; font-size: 13px; color: #475569;
    letter-spacing: .08em;
  }
  .card-inner {
    position: absolute; inset: 0; padding: 54px 62px; display: flex; flex-direction: column;
    justify-content: center;
  }
`;

const cards = {
  'og-home': {
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><style>${baseStyles}
      .card-inner { display: grid; grid-template-columns: 1fr 280px; align-items: center; gap: 40px; }
      .photo-wrap { position: relative; justify-self: end; }
      .photo-glow { position: absolute; inset: -10px; border-radius: 22px;
        background: radial-gradient(ellipse at center, rgba(200,241,53,.10), transparent 70%);
        filter: blur(18px); }
      .photo { width: 260px; height: 400px; border-radius: 14px; object-fit: cover;
        object-position: center 15%; border: 1px solid rgba(148,163,184,.12);
        box-shadow: 0 30px 80px rgba(0,0,0,.55); position: relative; z-index: 1; }
      .tagline { font-family: 'DM Sans', sans-serif; font-size: 16px; line-height: 1.6;
        color: #94a3b8; margin-top: 12px; max-width: 500px; }
      .stats-row { display: flex; gap: 28px; margin-top: 22px; }
      .stat-item { display: flex; flex-direction: column; }
      .stat-val { font-family: 'Manrope', sans-serif; font-weight: 800; font-size: 24px; color: #c8f135; }
      .stat-key { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #64748b;
        letter-spacing: .08em; text-transform: uppercase; margin-top: 2px; }
    </style></head><body>
      <div class="grid-bg"></div>
      <div class="card-inner">
        <div>
          <div class="eyebrow">// full-stack developer</div>
          <div class="title">Ferdinard <span class="accent">Ashonibare</span></div>
          <div class="tagline">Building fast, secure web platforms for government, hospitality, education, and real estate. So-Safe Corps — live in production.</div>
          <div class="stats-row">
            <div class="stat-item"><span class="stat-val">2</span><span class="stat-key">Live platforms</span></div>
            <div class="stat-item"><span class="stat-val">4</span><span class="stat-key">Industries</span></div>
            <div class="stat-item"><span class="stat-val">6</span><span class="stat-key">Core tech</span></div>
          </div>
        </div>
        <div class="photo-wrap">
          <div class="photo-glow"></div>
          <img class="photo" src="profile.jpg" alt="Ferdinard Ashonibare"/>
        </div>
      </div>
      <div class="site-url">ferdinardashonibare.com</div>
    </body></html>`
  },

  'og-about': {
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><style>${baseStyles}
      .card-inner { display: grid; grid-template-columns: 280px 1fr; align-items: center; gap: 40px; }
      .photo-wrap { position: relative; justify-self: start; }
      .photo-glow { position: absolute; inset: -10px; border-radius: 22px;
        background: radial-gradient(ellipse at center, rgba(200,241,53,.08), transparent 70%);
        filter: blur(18px); }
      .photo { width: 260px; height: 400px; border-radius: 14px; object-fit: cover;
        object-position: center 15%; border: 1px solid rgba(148,163,184,.12);
        box-shadow: 0 24px 60px rgba(0,0,0,.5); position: relative; z-index: 1; }
      .about-text { font-family: 'DM Sans', sans-serif; font-size: 16px; line-height: 1.65;
        color: #94a3b8; margin-top: 12px; max-width: 520px; }
      .tech-row { display: flex; gap: 8px; margin-top: 20px; flex-wrap: wrap; }
      .tech-pill { background: rgba(200,241,53,.08); border: 1px solid rgba(200,241,53,.15);
        color: #c8f135; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 600;
        padding: 5px 12px; border-radius: 99px; letter-spacing: .04em; }
      .loc-tag { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #64748b;
        letter-spacing: .08em; margin-top: 16px; }
    </style></head><body>
      <div class="grid-bg"></div>
      <div class="card-inner">
        <div class="photo-wrap">
          <div class="photo-glow"></div>
          <img class="photo" src="profile.jpg" alt="Ferdinard Ashonibare"/>
        </div>
        <div>
          <div class="eyebrow">// about</div>
          <div class="title">Ferdinard <span class="accent">Ashonibare</span></div>
          <div class="about-text">Full-stack web developer in Lagos, Nigeria. I design and build complete web products — secure platforms for institutions, polished sites for businesses, and practical tools for educators.</div>
          <div class="tech-row">
            <span class="tech-pill">React</span>
            <span class="tech-pill">Node.js</span>
            <span class="tech-pill">MongoDB</span>
            <span class="tech-pill">Express</span>
            <span class="tech-pill">Tailwind</span>
          </div>
          <div class="loc-tag">📍 Lagos, Nigeria — working worldwide</div>
        </div>
      </div>
      <div class="site-url">ferdinardashonibare.com/about</div>
    </body></html>`
  },

  'og-work': {
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><style>${baseStyles}
      .projects { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 24px; }
      .project { background: #0c1320; border: 1px solid rgba(148,163,184,.1);
        border-radius: 12px; padding: 18px 22px; }
      .project-name { font-family: 'Manrope', sans-serif; font-weight: 700; font-size: 16px; color: #f8fafc; }
      .project-sector { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #64748b;
        letter-spacing: .08em; text-transform: uppercase; margin-top: 4px; }
      .live-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%;
        background: #22c55e; margin-right: 6px; vertical-align: middle; }
    </style></head><body>
      <div class="grid-bg"></div>
      <div class="card-inner">
        <div class="eyebrow">// selected work</div>
        <div class="title">Projects <span class="accent">&amp; Case Studies</span></div>
        <div class="subtitle">Government platforms, hotel websites, real estate systems, and logistics landing pages — built end to end.</div>
        <div class="projects">
          <div class="project"><div class="project-name"><span class="live-dot"></span>So-Safe Corps</div><div class="project-sector">Government &amp; Public Sector</div></div>
          <div class="project"><div class="project-name"><span class="live-dot"></span>De Wura Hotel</div><div class="project-sector">Hospitality</div></div>
          <div class="project"><div class="project-name"><span class="live-dot"></span>Verdant Estates</div><div class="project-sector">Real Estate</div></div>
          <div class="project"><div class="project-name"><span class="live-dot"></span>TPC Logistics</div><div class="project-sector">Logistics</div></div>
        </div>
      </div>
      <div class="site-url">ferdinardashonibare.com/work</div>
    </body></html>`
  },

  'og-contact': {
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><style>${baseStyles}
      .contact-grid { display: flex; gap: 20px; margin-top: 28px; }
      .channel { background: #0c1320; border: 1px solid rgba(148,163,184,.1);
        border-radius: 12px; padding: 18px 24px; flex: 1; }
      .channel-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #64748b;
        letter-spacing: .1em; text-transform: uppercase; margin-bottom: 6px; }
      .channel-value { font-family: 'DM Sans', sans-serif; font-size: 15px; color: #f8fafc; font-weight: 500; }
      .cta { display: inline-block; background: #c8f135; color: #060a12; font-family: 'Manrope', sans-serif;
        font-weight: 700; font-size: 16px; padding: 14px 28px; border-radius: 12px;
        margin-top: 28px; letter-spacing: -.01em; }
    </style></head><body>
      <div class="grid-bg"></div>
      <div class="card-inner">
        <div class="eyebrow">// get in touch</div>
        <div class="title">Let's <span class="accent">build</span> something</div>
        <div class="subtitle">Open to remote full-time roles, long-term contracts, and one-off projects. Based in Lagos, Nigeria — working worldwide.</div>
        <div class="contact-grid">
          <div class="channel"><div class="channel-label">Email</div><div class="channel-value">ferdinardoluwajuwonlo@gmail.com</div></div>
          <div class="channel"><div class="channel-label">Phone</div><div class="channel-value">+234 913 736 0986</div></div>
          <div class="channel"><div class="channel-label">Location</div><div class="channel-value">Lagos, Nigeria</div></div>
        </div>
      </div>
      <div class="site-url">ferdinardashonibare.com/contact</div>
    </body></html>`
  },

  'og-cs-so-safe-corps': {
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><style>${baseStyles}
      .card-inner { display: grid; grid-template-columns: 1fr 420px; align-items: center; gap: 36px; }
      .cs-eyebrow {
        font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 600;
        letter-spacing: .14em; text-transform: uppercase; color: #c8f135; margin-bottom: 16px;
        display: flex; align-items: center; gap: 10px;
      }
      .cs-eyebrow::before { content: ''; display: inline-block; width: 28px; height: 2px; background: #c8f135; }
      .cs-sector {
        font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #64748b;
        letter-spacing: .08em; text-transform: uppercase; margin-top: 12px;
      }
      .cs-stats { display: flex; gap: 24px; margin-top: 24px; }
      .cs-stat { display: flex; flex-direction: column; }
      .cs-stat-val { font-family: 'Manrope', sans-serif; font-weight: 700; font-size: 15px; color: #f8fafc; }
      .cs-stat-key { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #64748b;
        letter-spacing: .06em; text-transform: uppercase; margin-top: 2px; }
      .browser { background: #0c1320; border-radius: 12px; overflow: hidden;
        border: 1px solid rgba(148,163,184,.12); box-shadow: 0 20px 60px rgba(0,0,0,.5); }
      .browser-bar { display: flex; align-items: center; gap: 6px; padding: 10px 14px;
        background: #0f1729; border-bottom: 1px solid rgba(148,163,184,.08); }
      .dot { width: 8px; height: 8px; border-radius: 50%; }
      .dot-r { background: #ef4444; } .dot-y { background: #eab308; } .dot-g { background: #22c55e; }
      .browser-url { flex: 1; margin-left: 10px; font-family: 'JetBrains Mono', monospace;
        font-size: 10px; color: #64748b; letter-spacing: .04em; }
      .browser-img { width: 100%; height: 260px; object-fit: cover; object-position: center top;
        display: block; }
    </style></head><body>
      <div class="grid-bg"></div>
      <div class="card-inner">
        <div>
          <div class="cs-eyebrow">Case Study</div>
          <div class="title" style="font-size:38px;">Ogun State <span class="accent">So-Safe Corps</span></div>
          <div class="cs-sector">Government &amp; Public Sector</div>
          <div class="cs-stats">
            <div class="cs-stat"><span class="cs-stat-val">Live</span><span class="cs-stat-key">In production</span></div>
            <div class="cs-stat"><span class="cs-stat-val">≈48 KB</span><span class="cs-stat-key">Page weight</span></div>
            <div class="cs-stat"><span class="cs-stat-val">≈0.1 s</span><span class="cs-stat-key">TTFB</span></div>
          </div>
        </div>
        <div class="browser">
          <div class="browser-bar">
            <span class="dot dot-r"></span><span class="dot dot-y"></span><span class="dot dot-g"></span>
            <span class="browser-url">sosafecorps.og.gov.ng</span>
          </div>
          <img class="browser-img" src="../projects/so-safe-corps.jpg" alt="So-Safe Corps platform"/>
        </div>
      </div>
      <div class="site-url">ferdinardashonibare.com/case-study/so-safe-corps</div>
    </body></html>`
  },

  'og-cs-verdant-estates': {
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><style>${baseStyles}
      .card-inner { display: grid; grid-template-columns: 1fr 420px; align-items: center; gap: 36px; }
      .cs-eyebrow {
        font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 600;
        letter-spacing: .14em; text-transform: uppercase; color: #22d3ee; margin-bottom: 16px;
        display: flex; align-items: center; gap: 10px;
      }
      .cs-eyebrow::before { content: ''; display: inline-block; width: 28px; height: 2px; background: #22d3ee; }
      .cs-sector {
        font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #64748b;
        letter-spacing: .08em; text-transform: uppercase; margin-top: 12px;
      }
      .cs-stats { display: flex; gap: 24px; margin-top: 24px; }
      .cs-stat { display: flex; flex-direction: column; }
      .cs-stat-val { font-family: 'Manrope', sans-serif; font-weight: 700; font-size: 15px; color: #f8fafc; }
      .cs-stat-key { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #64748b;
        letter-spacing: .06em; text-transform: uppercase; margin-top: 2px; }
      .browser { background: #0c1320; border-radius: 12px; overflow: hidden;
        border: 1px solid rgba(148,163,184,.12); box-shadow: 0 20px 60px rgba(0,0,0,.5); }
      .browser-bar { display: flex; align-items: center; gap: 6px; padding: 10px 14px;
        background: #0f1729; border-bottom: 1px solid rgba(148,163,184,.08); }
      .dot { width: 8px; height: 8px; border-radius: 50%; }
      .dot-r { background: #ef4444; } .dot-y { background: #eab308; } .dot-g { background: #22c55e; }
      .browser-url { flex: 1; margin-left: 10px; font-family: 'JetBrains Mono', monospace;
        font-size: 10px; color: #64748b; letter-spacing: .04em; }
      .browser-img { width: 100%; height: 260px; object-fit: cover; object-position: center top;
        display: block; }
    </style></head><body>
      <div class="grid-bg"></div>
      <div class="card-inner">
        <div>
          <div class="cs-eyebrow">Case Study</div>
          <div class="title" style="font-size:38px;"><span style="color:#22d3ee;">Verdant</span> Estates</div>
          <div class="cs-sector">Real Estate</div>
          <div class="cs-stats">
            <div class="cs-stat"><span class="cs-stat-val">Live</span><span class="cs-stat-key">In production</span></div>
            <div class="cs-stat"><span class="cs-stat-val">Mobile-first</span><span class="cs-stat-key">Responsive</span></div>
            <div class="cs-stat"><span class="cs-stat-val">Search-first</span><span class="cs-stat-key">Discovery UX</span></div>
          </div>
        </div>
        <div class="browser">
          <div class="browser-bar">
            <span class="dot dot-r"></span><span class="dot dot-y"></span><span class="dot dot-g"></span>
            <span class="browser-url">verdant-estates-alpha.vercel.app</span>
          </div>
          <img class="browser-img" src="../projects/verdant-estates.jpg" alt="Verdant Estates platform"/>
        </div>
      </div>
      <div class="site-url">ferdinardashonibare.com/case-study/verdant-estates</div>
    </body></html>`
  }
};

// ---------------------------------------------------------------------------
// Helpers (same approach as og-card.mjs)
// ---------------------------------------------------------------------------

const fail = (message) => {
  console.error(`\n❌ generate-og-images: ${message}\n`);
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

const jpegConvert = (pngPath, outputPath) => {
  if (process.platform !== 'win32') {
    console.log(`  ⚠ PNG saved at ${pngPath} — convert to JPEG manually (non-Windows).`);
    return false;
  }

  const ps1Path = path.join(tmpdir(), `og-gen-${process.pid}.ps1`);
  writeFileSync(
    ps1Path,
    [
      'Add-Type -AssemblyName System.Drawing',
      '$img = [System.Drawing.Image]::FromFile($env:OG_SRC)',
      '$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq \'image/jpeg\' }',
      '$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)',
      '$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]92)',
      '$img.Save($env:OG_DST, $enc, $ep)',
      '$img.Dispose()'
    ].join('\n'),
    'utf8'
  );

  const result = spawnSync(
    'powershell.exe',
    ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', ps1Path],
    { encoding: 'utf8', env: { ...process.env, OG_SRC: pngPath, OG_DST: outputPath } }
  );
  rmSync(ps1Path, { force: true });

  if (result.status !== 0 || !existsSync(outputPath)) {
    console.error(`  ✗ JPEG conversion failed: ${(result.stderr || result.stdout || 'unknown').trim()}`);
    return false;
  }
  return true;
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const chrome = findChrome();
if (!chrome) {
  fail('headless Chrome/Edge not found — set CHROME_PATH to the executable.');
}

console.log('🖼  Generating page-specific OG images (1200×630)…\n');

const results = [];

for (const [name, { html }] of Object.entries(cards)) {
  const outputPath = path.join(publicDir, `${name}.jpg`);
  const tmpHtml = path.join(publicDir, `.og-${name}-${process.pid}.html`);
  const tmpPng = path.join(tmpdir(), `og-${name}-${process.pid}.png`);  try {
    // Inline project screenshots as base64 data URIs for case study cards
    let processedHtml = html;
    const imgRegex = /src="\.\.\/projects\/([^"]+)"/g;
    let match;
    while ((match = imgRegex.exec(html)) !== null) {
      const imgFile = path.join(publicDir, 'projects', match[1]);
      if (existsSync(imgFile)) {
        const b64 = readFileSync(imgFile).toString('base64');
        processedHtml = processedHtml.replace(match[0], `src="data:image/jpeg;base64,${b64}"`);
      }
    }

    writeFileSync(tmpHtml, processedHtml, 'utf8');

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
      console.error(`  ✗ ${name}: Chrome screenshot failed`);
      continue;
    }

    const [w, h] = pngSize(tmpPng);
    if (w !== WIDTH || h !== HEIGHT) {
      console.error(`  ✗ ${name}: rendered ${w}×${h} instead of ${WIDTH}×${HEIGHT}`);
      continue;
    }

    const ok = jpegConvert(tmpPng, outputPath);
    if (!ok) continue;

    const size = readFileSync(outputPath).length;
    const pretty = `${(size / 1024).toFixed(1)} KB`;
    const warn = size > SIZE_LIMIT ? ` ⚠ exceeds ${SIZE_LIMIT / 1024}KB WhatsApp limit` : '';
    console.log(`  ✓ ${name}.jpg — ${pretty}${warn}`);
    results.push({ name, size, path: outputPath });
  } finally {
    rmSync(tmpHtml, { force: true });
    rmSync(tmpPng, { force: true });
  }
}

console.log(`\n✅ ${results.length}/${Object.keys(cards).length} OG images generated.\n`);

if (results.length < Object.keys(cards).length) {
  console.warn('⚠ Some images failed — check Chrome/Edge availability.\n');
}
