import { spawn } from 'node:child_process';
import fs from 'node:fs';
import { chromium } from '@playwright/test';

async function main() {
  console.log('Starting dev server on port 4173...');
  const server = spawn('bun', ['run', 'dev', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], {
    stdio: 'ignore',
  });

  await new Promise((r) => setTimeout(r, 2500));

  const gifencCode = fs.readFileSync('node_modules/gifenc/dist/gifenc.js', 'utf8');

  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 960, height: 540 } });

    console.log('Navigating to homepage...');
    await page.goto('http://127.0.0.1:4173');
    await page.waitForSelector('canvas');
    await page.waitForTimeout(1000);

    console.log('Capturing screenshots with text and animated canvas...');
    const frameCount = 20; // 20 frames
    const delay = 120; // 120ms = ~8.3 fps (2.4s total animation)
    const base64Frames = [];

    for (let i = 0; i < frameCount; i++) {
      const buf = await page.screenshot({ type: 'jpeg', quality: 75 });
      base64Frames.push(buf.toString('base64'));
      await page.waitForTimeout(delay);
    }

    console.log('Encoding animated GIF in browser...');
    const gifBase64 = await page.evaluate(async ({ code, frames, delay }) => {
      const exports = {};
      const fn = new Function('exports', code);
      fn(exports);
      const { GIFEncoder, quantize, applyPalette } = exports;

      const gif = GIFEncoder();
      const width = 640;
      const height = 360;

      const c = document.createElement('canvas');
      c.width = width;
      c.height = height;
      const ctx = c.getContext('2d', { willReadFrequently: true });

      for (const b64 of frames) {
        const img = new Image();
        img.src = `data:image/jpeg;base64,${b64}`;
        await img.decode();
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        const imgData = ctx.getImageData(0, 0, width, height);

        const palette = quantize(imgData.data, 128);
        const index = applyPalette(imgData.data, palette);
        gif.writeFrame(index, width, height, { palette, delay });
      }

      gif.finish();
      const bytes = gif.bytes();

      let binary = '';
      const len = bytes.byteLength;
      const chunkSize = 8192;
      for (let i = 0; i < len; i += chunkSize) {
        binary += String.fromCharCode.apply(null, bytes.subarray(i, Math.min(i + chunkSize, len)));
      }
      return btoa(binary);
    }, { code: gifencCode, frames: base64Frames, delay });

    const buffer = Buffer.from(gifBase64, 'base64');
    fs.writeFileSync('public/preview.gif', buffer);
    console.log(`✅ Success! Generated public/preview.gif (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
  } finally {
    if (browser) await browser.close();
    server.kill();
  }
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
