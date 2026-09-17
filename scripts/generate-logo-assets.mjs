import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';

// Master A-Prism Geometry on a 32x32 grid
// Face 1: Main 'A' frame (left leg, apex, inner void)
// Face 2: 3D Bevel Facet (right flank isometric facet)
// Face 3: Floating Satellite Crossbar (suspended beam with air-gaps)
// Face 4: Southeast Echo Layer (offset depth shadow)

function buildLogoSvg({ mode = 'currentColor', micro = false } = {}) {
  // At micro scale (16px/32px), strokes and gaps are snapped to full integer pixels
  const gap = micro ? 2 : 1.5;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none" shape-rendering="geometricPrecision">
  <!-- Echo Layer (Southeast offset: +2.5, +2.5) -->
  <g class="echo-layer" opacity="0.35" fill="${mode}">
    <!-- Echo apex and right slope -->
    <path d="M18.5 7.5L26.5 15.5V29.5H23V16.5L16 9.5H18.5Z" />
    <!-- Echo right outer bevel -->
    <path d="M26.5 15.5L30.5 19.5V29.5H26.5V15.5Z" />
    <!-- Echo base feet -->
    <path d="M7.5 29.5H11.5V27H7.5V29.5Z" />
  </g>

  <!-- Main A-Prism Solid Structure -->
  <g class="prism-structure" fill="${mode}">
    <!-- Left Pillar & Apex Main Face -->
    <path d="M5 27V15L13.5 5H16.5L9 14V27H5Z" />

    <!-- Apex Cap -->
    <path d="M13.5 5H19L16.5 8H11L13.5 5Z" />

    <!-- Right Pillar Main Face -->
    <path d="M16.5 8L23 15.5V27H19V16.5L14 10.5L16.5 8Z" />

    <!-- 3D Bevel Facet (Right Flank) -->
    <path class="bevel-facet" opacity="0.75" d="M19 5L27 14.5V27H23V15.5L16.5 8L19 5Z" />

    <!-- Floating Satellite Crossbar (Suspended beam with calibrated air gap) -->
    <rect x="${7 + gap}" y="17.5" width="${16 - 2 * gap}" height="3" rx="0.5" />
  </g>
</svg>`;
}

function buildFaviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none" shape-rendering="geometricPrecision">
  <style>
    :root {
      --mark-color: #000000;
      --echo-alpha: 0.38;
      --facet-alpha: 0.72;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --mark-color: #ffffff;
        --echo-alpha: 0.42;
        --facet-alpha: 0.78;
      }
    }
    .mark-fill { fill: var(--mark-color); }
    .mark-echo { fill: var(--mark-color); opacity: var(--echo-alpha); }
    .mark-facet { fill: var(--mark-color); opacity: var(--facet-alpha); }
  </style>
  <!-- Echo Layer (SE offset) -->
  <g class="mark-echo">
    <path d="M18.5 7.5L26.5 15.5V29.5H23V16.5L16 9.5H18.5Z" />
    <path d="M26.5 15.5L30.5 19.5V29.5H26.5V15.5Z" />
    <path d="M7.5 29.5H11.5V27H7.5V29.5Z" />
  </g>
  <!-- Main A-Prism Body -->
  <g>
    <path class="mark-fill" d="M5 27V15L13.5 5H16.5L9 14V27H5Z" />
    <path class="mark-fill" d="M13.5 5H19L16.5 8H11L13.5 5Z" />
    <path class="mark-fill" d="M16.5 8L23 15.5V27H19V16.5L14 10.5L16.5 8Z" />
    <path class="mark-facet" d="M19 5L27 14.5V27H23V15.5L16.5 8L19 5Z" />
    <!-- Floating Crossbar -->
    <rect class="mark-fill" x="9" y="17.5" width="12" height="3" rx="0.5" />
  </g>
</svg>`;
}

// Geometric Wordmark ACRAZIE in retro-tech Acrazie identity
function buildWordmarkSvg({ mode = 'currentColor' } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 40" width="100%" height="100%" fill="none" shape-rendering="geometricPrecision">
  <g fill="${mode}">
    <!-- A (A-Prism Geometry) -->
    <g transform="translate(6, 6)">
      <!-- Echo -->
      <path opacity="0.3" d="M16 4.5L24.5 13V27H21V14L13.5 7H16Z M24.5 13L27.5 16.5V27H24.5V13Z M5.5 27H9.5V24.5H5.5V27Z" />
      <!-- Main A-Prism -->
      <path d="M3 25V13L11.5 2H14.5L7.5 11.5V25H3Z" />
      <path d="M11.5 2H17L14.5 5H9L11.5 2Z" />
      <path d="M14.5 5L21 12.5V25H17V13.5L12 7.5L14.5 5Z" />
      <path opacity="0.75" d="M17 2L24.5 11V25H21V12.5L14.5 5L17 2Z" />
      <rect x="7" y="14" width="10.5" height="3" rx="0.5" />
    </g>

    <!-- C -->
    <g transform="translate(42, 6)">
      <!-- Echo -->
      <path opacity="0.3" d="M24.5 2.5V7H6.5V20.5H24.5V25H2.5V2.5H24.5Z" />
      <!-- Main C -->
      <path d="M22 0V4.5H4.5V20.5H22V25H0V0H22Z" />
    </g>

    <!-- R -->
    <g transform="translate(74, 6)">
      <!-- Echo -->
      <path opacity="0.3" d="M24.5 2.5V14.5L18.5 14.5L26.5 27H21L14.5 16.5H6.5V27H2.5V2.5H24.5Z" />
      <!-- Main R -->
      <path d="M0 0H22V12L16 12L24 25H18.5L12 14H4.5V25H0V0ZM4.5 4.5V9.5H17.5V4.5H4.5Z" />
    </g>

    <!-- A (A-Prism Geometry) -->
    <g transform="translate(108, 6)">
      <!-- Echo -->
      <path opacity="0.3" d="M16 4.5L24.5 13V27H21V14L13.5 7H16Z M24.5 13L27.5 16.5V27H24.5V13Z M5.5 27H9.5V24.5H5.5V27Z" />
      <!-- Main A-Prism -->
      <path d="M3 25V13L11.5 2H14.5L7.5 11.5V25H3Z" />
      <path d="M11.5 2H17L14.5 5H9L11.5 2Z" />
      <path d="M14.5 5L21 12.5V25H17V13.5L12 7.5L14.5 5Z" />
      <path opacity="0.75" d="M17 2L24.5 11V25H21V12.5L14.5 5L17 2Z" />
      <rect x="7" y="14" width="10.5" height="3" rx="0.5" />
    </g>

    <!-- Z (Clean Sharp Z) -->
    <g transform="translate(142, 6)">
      <!-- Echo -->
      <path opacity="0.3" d="M2.5 2.5H24.5V7H13.5L24.5 20.5V25H2.5V20.5H13.5L2.5 7V2.5Z" />
      <!-- Main Z -->
      <path d="M0 0H22V4.5L10 19.5H22V25H0V20.5L12 5.5H0V0Z" />
    </g>

    <!-- I -->
    <g transform="translate(172, 6)">
      <!-- Echo -->
      <path opacity="0.3" d="M2.5 2.5H9.5V27H2.5V2.5Z" />
      <!-- Main I -->
      <path d="M0 0H6.5V25H0V0Z" />
    </g>

    <!-- E -->
    <g transform="translate(190, 6)">
      <!-- Echo -->
      <path opacity="0.3" d="M24.5 2.5V7H6.5V12.5H20.5V17H6.5V20.5H24.5V25H2.5V2.5H24.5Z" />
      <!-- Main E -->
      <path d="M22 0V4.5H4.5V10H18V14.5H4.5V20.5H22V25H0V0H22Z" />
    </g>
  </g>
</svg>`;
}

async function run() {
  console.log('Generating SVG files...');
  fs.writeFileSync('public/logo.svg', buildLogoSvg({ mode: 'currentColor' }));
  fs.writeFileSync('public/favicon.svg', buildFaviconSvg());
  fs.writeFileSync('public/wordmark.svg', buildWordmarkSvg({ mode: 'currentColor' }));

  // HTML Contact Sheet for Visual Validation across all sizes
  const contactSheetHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Logo A-Prism & Wordmark — Planche de Contact</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 40px;
      background: #0d0d11;
      color: #f0f0f5;
    }
    h1 { font-size: 24px; font-weight: 600; margin-bottom: 8px; letter-spacing: -0.02em; }
    p.subtitle { color: #888899; margin-top: 0; margin-bottom: 32px; font-size: 14px; }
    .grid { display: flex; flex-direction: column; gap: 40px; }
    .card {
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      padding: 24px;
      background: #14141c;
    }
    .card h2 { font-size: 16px; margin-top: 0; margin-bottom: 16px; color: #d0d0dd; }
    .comparisons { display: flex; gap: 24px; flex-wrap: wrap; }
    .viewport {
      padding: 24px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      min-width: 140px;
    }
    .light { background: #ffffff; color: #000000; border: 1px solid #e0e0e0; }
    .dark { background: #000000; color: #ffffff; border: 1px solid #222222; }
    .label { font-size: 11px; font-mono: monospace; opacity: 0.65; }
    .sizes-row { display: flex; align-items: flex-end; gap: 24px; flex-wrap: wrap; }
    .size-box { display: flex; flex-direction: column; align-items: center; gap: 6px; }
  </style>
</head>
<body>
  <h1>A-Prism (Direction 2) — Planche de Validation Optique</h1>
  <p class="subtitle">Validation multi-tailles (16px à 256px), fonds contrastés (noir & blanc) et wordmark ACRAZIE.</p>

  <div class="grid">
    <div class="card">
      <h2>1. Monogramme A-Prism — Échelles réelles (16px, 24px, 32px, 48px, 64px, 128px)</h2>
      <div class="comparisons">
        <!-- Light Theme -->
        <div class="viewport light">
          <div class="label">Thème Clair (#ffffff)</div>
          <div class="sizes-row">
            <div class="size-box">
              <div style="width: 16px; height: 16px;">${buildLogoSvg({ mode: '#000000', micro: true })}</div>
              <span class="label">16px</span>
            </div>
            <div class="size-box">
              <div style="width: 24px; height: 24px;">${buildLogoSvg({ mode: '#000000', micro: true })}</div>
              <span class="label">24px</span>
            </div>
            <div class="size-box">
              <div style="width: 32px; height: 32px;">${buildLogoSvg({ mode: '#000000' })}</div>
              <span class="label">32px</span>
            </div>
            <div class="size-box">
              <div style="width: 48px; height: 48px;">${buildLogoSvg({ mode: '#000000' })}</div>
              <span class="label">48px</span>
            </div>
            <div class="size-box">
              <div style="width: 64px; height: 64px;">${buildLogoSvg({ mode: '#000000' })}</div>
              <span class="label">64px</span>
            </div>
            <div class="size-box">
              <div style="width: 128px; height: 128px;">${buildLogoSvg({ mode: '#000000' })}</div>
              <span class="label">128px</span>
            </div>
          </div>
        </div>

        <!-- Dark Theme -->
        <div class="viewport dark">
          <div class="label">Thème Sombre (#000000)</div>
          <div class="sizes-row">
            <div class="size-box">
              <div style="width: 16px; height: 16px;">${buildLogoSvg({ mode: '#ffffff', micro: true })}</div>
              <span class="label">16px</span>
            </div>
            <div class="size-box">
              <div style="width: 24px; height: 24px;">${buildLogoSvg({ mode: '#ffffff', micro: true })}</div>
              <span class="label">24px</span>
            </div>
            <div class="size-box">
              <div style="width: 32px; height: 32px;">${buildLogoSvg({ mode: '#ffffff' })}</div>
              <span class="label">32px</span>
            </div>
            <div class="size-box">
              <div style="width: 48px; height: 48px;">${buildLogoSvg({ mode: '#ffffff' })}</div>
              <span class="label">48px</span>
            </div>
            <div class="size-box">
              <div style="width: 64px; height: 64px;">${buildLogoSvg({ mode: '#ffffff' })}</div>
              <span class="label">64px</span>
            </div>
            <div class="size-box">
              <div style="width: 128px; height: 128px;">${buildLogoSvg({ mode: '#ffffff' })}</div>
              <span class="label">128px</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>2. Wordmark ACRAZIE Rétro-Tech</h2>
      <div class="comparisons">
        <div class="viewport light" style="flex: 1;">
          <div class="label">Wordmark Clair</div>
          <div style="width: 360px; height: 60px;">${buildWordmarkSvg({ mode: '#000000' })}</div>
        </div>
        <div class="viewport dark" style="flex: 1;">
          <div class="label">Wordmark Sombre</div>
          <div style="width: 360px; height: 60px;">${buildWordmarkSvg({ mode: '#ffffff' })}</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

  fs.writeFileSync('test-logo-preview.html', contactSheetHtml);
  console.log('✅ Wrote test-logo-preview.html');

  // Rasterize using Playwright for Apple Touch Icon & Favicon ICO
  console.log('Rasterizing PNGs with Playwright...');
  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage();

    // 1. Apple Touch Icon (180x180) on black background with centered white A-Prism
    const appleIconHtml = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#000000;display:flex;align-items:center;justify-content:center;width:180px;height:180px;">
  <div style="width:120px;height:120px;">
    ${buildLogoSvg({ mode: '#ffffff' })}
  </div>
</body>
</html>`;
    await page.setViewportSize({ width: 180, height: 180 });
    await page.setContent(appleIconHtml);
    const appleIconBuf = await page.screenshot({ type: 'png' });
    fs.writeFileSync('public/apple-touch-icon.png', appleIconBuf);
    console.log('✅ Generated public/apple-touch-icon.png (180x180)');

    // 2. Favicon frames for ICO (16, 32, 48)
    const pngFrames = [];
    for (const size of [16, 32, 48]) {
      const frameHtml = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:transparent;display:flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;">
  <div style="width:${size}px;height:${size}px;">
    ${buildLogoSvg({ mode: '#000000', micro: size <= 24 })}
  </div>
</body>
</html>`;
      await page.setViewportSize({ width: size, height: size });
      await page.setContent(frameHtml);
      const buf = await page.screenshot({ type: 'png', omitBackground: true });
      pngFrames.push({ size, buffer: buf });
    }

    // Pack into a valid multi-image Windows ICO format
    // ICO Header: 6 bytes
    // Directory entries: 16 bytes per image
    // Followed by raw PNG data chunks
    const count = pngFrames.length;
    const headerSize = 6 + count * 16;
    let totalSize = headerSize;
    for (const f of pngFrames) {
      totalSize += f.buffer.length;
    }

    const icoBuf = Buffer.alloc(totalSize);
    // Reserved
    icoBuf.writeUInt16LE(0, 0);
    // Type 1 = ICO
    icoBuf.writeUInt16LE(1, 2);
    // Image count
    icoBuf.writeUInt16LE(count, 4);

    let offset = headerSize;
    for (let i = 0; i < count; i++) {
      const f = pngFrames[i];
      const entryPos = 6 + i * 16;
      icoBuf.writeUInt8(f.size === 256 ? 0 : f.size, entryPos); // width
      icoBuf.writeUInt8(f.size === 256 ? 0 : f.size, entryPos + 1); // height
      icoBuf.writeUInt8(0, entryPos + 2); // color count (0 = no palette)
      icoBuf.writeUInt8(0, entryPos + 3); // reserved
      icoBuf.writeUInt16LE(1, entryPos + 4); // color planes
      icoBuf.writeUInt16LE(32, entryPos + 6); // bpp
      icoBuf.writeUInt32LE(f.buffer.length, entryPos + 8); // size of image data
      icoBuf.writeUInt32LE(offset, entryPos + 12); // offset to image data

      f.buffer.copy(icoBuf, offset);
      offset += f.buffer.length;
    }

    fs.writeFileSync('public/favicon.ico', icoBuf);
    console.log(`✅ Generated public/favicon.ico (${icoBuf.length} bytes, with 16px, 32px, 48px frames)`);

    // Capture contact sheet screenshot for artifacts/inspection
    await page.setViewportSize({ width: 900, height: 950 });
    await page.setContent(contactSheetHtml);
    const previewScreenshot = await page.screenshot({ type: 'png' });
    fs.writeFileSync('/Users/acrazie/.gemini/antigravity-cli/brain/5d1f7263-a36f-40f7-9edc-09194999ef55/logo-contact-sheet.png', previewScreenshot);
    console.log('✅ Generated visual artifact: logo-contact-sheet.png');
  } finally {
    if (browser) await browser.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
