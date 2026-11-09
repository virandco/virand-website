// Generates the Open Graph images: public/og/og-es.png and public/og/og-en.png.
// Run: node scripts/generar-og.mjs
//
// No dependencies: it renders an HTML layout with a installed Edge or Chrome
// (headless, DevTools protocol) and saves the screenshot. Set BROWSER_PATH to
// use another Chromium. Inputs are the official brand SVGs in src/assets and
// the League Spartan Bold file from @fontsource.
//
// Layout (brand-guidelines.md 4.1, 4.2): Obsidian base (about 60%), a Wine Red
// panel with the white icon (about 25%), white wordmark and headline (about
// 10%), a short Gold rule (about 5%). Headline in League Spartan Bold, caps.
// No slogans, no claims: the headline is the approved home H1 (docs/copy).
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'public', 'og');

const HEADLINES = {
  es: 'Sistemas que optimizan tu operación.',
  en: 'Systems that optimize your operations.',
};

const COLORS = { obsidian: '#080808', wine: '#6B0F1A', white: '#FFFFFF', gold: '#C9A84C' };

const svgInner = (file) => readFileSync(join(root, 'src/assets', file), 'utf8').replace(/<\?xml[^>]*\?>\s*/, '');
const wordmark = svgInner('02-VIRAND-wordmark-blanco.svg');
const icon = svgInner('VIRAND-icono-blanco.svg');
const font = readFileSync(
  join(root, 'node_modules/@fontsource/league-spartan/files/league-spartan-latin-700-normal.woff2'),
).toString('base64');

const html = (lang) => `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><style>
@font-face { font-family: 'League Spartan'; font-weight: 700; src: url(data:font/woff2;base64,${font}) format('woff2'); }
* { margin: 0; box-sizing: border-box; }
html, body { width: 1200px; height: 630px; background: ${COLORS.obsidian}; overflow: hidden; }
.card { position: relative; width: 1200px; height: 630px; }
.panel { position: absolute; top: 0; right: 0; bottom: 0; width: 330px; background: ${COLORS.wine};
  display: flex; align-items: center; justify-content: center; }
.panel svg { width: 200px; height: auto; }
.left { position: absolute; top: 64px; left: 72px; bottom: 64px; width: 740px;
  display: flex; flex-direction: column; justify-content: space-between; }
.wordmark svg { height: 50px; width: auto; }
.rule { width: 64px; height: 5px; background: ${COLORS.gold}; margin-bottom: 30px; }
h1 { font-family: 'League Spartan', sans-serif; font-weight: 700; font-size: 78px; line-height: 0.96;
  letter-spacing: -0.02em; text-transform: uppercase; color: ${COLORS.white}; text-wrap: balance; }
</style></head><body><div class="card">
<div class="panel">${icon}</div>
<div class="left">
  <div class="wordmark">${wordmark}</div>
  <div><div class="rule"></div><h1>${HEADLINES[lang]}</h1></div>
</div></div></body></html>`;

const candidates = [
  process.env.BROWSER_PATH,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);
const browser = candidates.find((p) => existsSync(p));
if (!browser) throw new Error('No Edge or Chrome found. Set BROWSER_PATH.');

const work = join(tmpdir(), `virand-og-${Date.now()}`);
mkdirSync(work, { recursive: true });
mkdirSync(OUT, { recursive: true });
const PORT = 9360 + Math.floor(Math.random() * 100);
const proc = spawn(
  browser,
  ['--headless=new', `--remote-debugging-port=${PORT}`, '--disable-gpu', '--no-first-run', '--hide-scrollbars', `--user-data-dir=${join(work, 'profile')}`, 'about:blank'],
  { stdio: 'ignore' },
);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  let targets;
  for (let i = 0; i < 60; i++) {
    try {
      targets = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
      if (targets.some((t) => t.type === 'page')) break;
    } catch { /* browser still starting */ }
    await sleep(250);
  }
  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0;
  const pending = new Map();
  ws.onmessage = (m) => {
    const d = JSON.parse(m.data);
    if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); }
  };
  const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
  for (const lang of ['es', 'en']) {
    const file = join(work, `og-${lang}.html`);
    writeFileSync(file, html(lang));
    await send('Page.navigate', { url: pathToFileURL(file).href });
    await sleep(800);
    await send('Runtime.evaluate', { expression: 'document.fonts.ready', awaitPromise: true });
    const shot = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } });
    const target = join(OUT, `og-${lang}.png`);
    writeFileSync(target, Buffer.from(shot.result.data, 'base64'));
    console.log(`${target} (${Math.round(readFileSync(target).length / 1024)} KB)`);
  }
  ws.close();
} finally {
  proc.kill();
}
