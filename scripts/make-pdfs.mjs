/**
 * Creates the downloadable PDFs from the built site:
 *   - every printable in src/content/printables/  →  public/downloads/<name>.pdf
 *   - every lecture-notes file that has a `pdf:` path  →  that path in public/
 *
 * Usage (on your computer):   npm run pdfs
 * (this builds the site, creates the PDFs, then builds and checks again)
 * Needs Microsoft Edge or Google Chrome (already on Windows). Uses no internet connection.
 * After running, commit the new PDFs and push.
 */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { spawn } from 'node:child_process';

const DIST = 'dist';
const PUBLIC = 'public';
const PORT = 4399;

// ---------- find the browser ----------
const candidates = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];
const browser = candidates.find((p) => fs.existsSync(p));
if (!browser) {
  console.error('Could not find Microsoft Edge or Google Chrome.');
  process.exit(1);
}
if (!fs.existsSync(DIST)) {
  console.error('Run `npm run build` first.');
  process.exit(1);
}

// ---------- what to print ----------
const jobs = [];
for (const file of fs.readdirSync('src/content/printables').filter((f) => /\.mdx?$/.test(f))) {
  const id = file.replace(/\.mdx?$/, '');
  const isWorksheet = !/^kind:\s*answer-key/m.test(fs.readFileSync(path.join('src/content/printables', file), 'utf8'));
  jobs.push({
    url: `/print/${id}/`,
    out: `${PUBLIC}/downloads/${id}.pdf`,
    margins: false,
    // First-page preview image for the resource page (worksheets only)
    preview: isWorksheet ? `${PUBLIC}/previews/${id}.png` : undefined,
  });
}
for (const file of fs.readdirSync('src/content/notes').filter((f) => /\.mdx?$/.test(f))) {
  const text = fs.readFileSync(path.join('src/content/notes', file), 'utf8');
  const pdf = text.match(/^pdf:\s*["']?(\/[^"'\s]+\.pdf)/m)?.[1];
  if (pdf) jobs.push({ url: `/notes/${file.replace(/\.mdx?$/, '')}/`, out: `${PUBLIC}${pdf}`, margins: true });
}

// ---------- tiny local web server for the built site ----------
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf' };
const server = http.createServer((req, res) => {
  let p = path.join(DIST, decodeURIComponent(req.url.split('?')[0]));
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  if (!fs.existsSync(p)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': types[path.extname(p)] ?? 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(PORT, r));

// ---------- drive the browser ----------
// A fresh, private browser profile and a free port (0) every run, so it never
// connects to an old instance. The browser writes its chosen port to DevToolsActivePort.
const profile = fs.mkdtempSync(path.join(process.env.TEMP ?? '/tmp', 'cc-pdf-'));
// On GitHub's build servers (CI) the browser runs inside a container and needs --no-sandbox.
const ciFlags = process.env.CI ? ['--no-sandbox'] : [];
spawn(browser, ['--headless=new', '--disable-gpu', '--hide-scrollbars', ...ciFlags, '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const portFile = path.join(profile, 'DevToolsActivePort');
let debugPort;
let targets;
for (let i = 0; i < 80 && !targets; i++) {
  try {
    debugPort ??= Number(fs.readFileSync(portFile, 'utf8').split('\n')[0]);
    targets = await (await fetch(`http://127.0.0.1:${debugPort}/json`)).json();
  } catch { await sleep(250); }
}
if (!targets) {
  console.error('Could not start the browser.');
  process.exit(1);
}

/** Shut the whole browser down cleanly (no hidden processes left behind). */
async function closeBrowser() {
  try {
    const { webSocketDebuggerUrl } = await (await fetch(`http://127.0.0.1:${debugPort}/json/version`)).json();
    const b = new WebSocket(webSocketDebuggerUrl);
    await new Promise((r) => b.addEventListener('open', r));
    b.send(JSON.stringify({ id: 1, method: 'Browser.close' }));
    await sleep(500);
  } catch {}
}

const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let msgId = 0;
const pending = new Map();
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
const send = (method, params = {}) => new Promise((r) => { const i = ++msgId; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Page.enable');
await send('Runtime.enable');

const siteConfig = fs.readFileSync('src/config/site.ts', 'utf8');
const notice = siteConfig.match(/printableNotice:\s*'([^']*)'/)?.[1] ?? '';
if (!notice) console.warn('Note: no printableNotice found in src/config/site.ts');
// Web address printed in the footer, taken from `url` in src/config/site.ts
const host = new URL(siteConfig.match(/^\s*url:\s*'([^']*)'/m)?.[1] ?? 'https://chemistryclarity.com').host;
const year = new Date().getFullYear();
const footer = `<div style="width:100%;font-family:Arial,sans-serif;font-size:7.5px;color:#777;padding:0 16mm;display:flex;justify-content:space-between;">
  <span>© ${year} Chemistry Clarity · ${host} · ${notice}</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`;

let failed = 0;
for (const job of jobs) {
  const status = (await fetch(`http://localhost:${PORT}${job.url}`)).status;
  if (status !== 200) {
    console.error(`✗ ${job.url} is missing from the build (status ${status}). Run "npm run build" first and fix any errors.`);
    failed++;
    continue;
  }
  await send('Page.navigate', { url: `http://localhost:${PORT}${job.url}` });
  await sleep(1200);
  await send('Runtime.evaluate', { expression: 'document.fonts.ready.then(() => true)', awaitPromise: true });
  const result = await send('Page.printToPDF', {
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: footer,
    ...(job.margins ? { marginTop: 0.6, marginBottom: 0.75, marginLeft: 0.6, marginRight: 0.6, paperWidth: 8.27, paperHeight: 11.69 } : {}),
  });
  if (!result.result?.data) { console.error(`✗ ${job.url}: ${JSON.stringify(result.error)}`); failed++; continue; }
  const pdf = Buffer.from(result.result.data, 'base64');
  fs.mkdirSync(path.dirname(job.out), { recursive: true });
  fs.writeFileSync(job.out, pdf);

  // Privacy check: the PDF must not contain an author name.
  const meta = pdf.toString('latin1');
  const author = meta.match(/\/Author\s*\(([^)]*)\)/)?.[1];
  const pages = (meta.match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  console.log(`✓ ${job.out}  (${pages} page${pages === 1 ? '' : 's'}, ${(pdf.length / 1024).toFixed(0)} KB${author ? `, AUTHOR FIELD: "${author}"` : ''})`);
  if (author) failed++;

  if (job.preview) {
    // A4 at screen resolution is 794 × 1123 px; capture the first page, then shrink to 600 px wide.
    await send('Emulation.setDeviceMetricsOverride', { width: 794, height: 1123, deviceScaleFactor: 1, mobile: false });
    await sleep(300);
    const shot = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 794, height: 1123, scale: 1 } });
    await send('Emulation.clearDeviceMetricsOverride');
    fs.mkdirSync(path.dirname(job.preview), { recursive: true });
    try {
      const { default: sharp } = await import('sharp');
      await sharp(Buffer.from(shot.result.data, 'base64')).resize({ width: 600 }).png({ compressionLevel: 9 }).toFile(job.preview);
    } catch {
      // Image library unavailable: keep the full-size screenshot instead of failing the publish.
      fs.writeFileSync(job.preview, Buffer.from(shot.result.data, 'base64'));
    }
    console.log(`  ✓ preview ${job.preview}`);
  }
}

ws.close();
await closeBrowser();
server.close();
try { fs.rmSync(profile, { recursive: true, force: true }); } catch {}
if (failed) process.exit(1);
console.log('\nDone. Commit the PDFs in public/downloads/ and push.');
