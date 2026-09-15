// Renderiza public/ e gera screenshots desktop + celular em shots/
import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFileSync, existsSync, mkdirSync } from 'fs';
import { extname, join, normalize } from 'path';

const types = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.ico': 'image/x-icon',
};

const srv = createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const f = normalize(join('public', p));
  if (!f.startsWith('public') || !existsSync(f)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' });
  res.end(readFileSync(f));
}).listen(8777);

mkdirSync('shots', { recursive: true });
const browser = await chromium.launch();

for (const [name, viewport, deviceScaleFactor, isMobile] of [
  ['desktop', { width: 1440, height: 900 }, 1, false],
  ['celular', { width: 390, height: 844 }, 2, true],
]) {
  const page = await browser.newPage({ viewport, deviceScaleFactor, isMobile, hasTouch: isMobile });
  await page.goto('http://localhost:8777/', { waitUntil: 'load', timeout: 60000 });
  // desliga transições e força o estado final das animações de entrada (.rv/.rv2/.rv3 + .on)
  // animações de entrada "completam" instantaneamente (forwards => estado final visível)
  await page.addStyleTag({ content: '*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition:none!important;scroll-behavior:auto!important}' });
  await page.evaluate(async () => {
    document.querySelectorAll('.rv,.rv2,.rv3').forEach((el) => el.classList.add('on'));
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
    document.querySelectorAll('img[loading]').forEach((i) => { i.loading = 'eager'; });
    // rola a página para disparar lazy-load e espera todas as imagens carregarem
    await new Promise((done) => {
      let y = 0;
      const t = setInterval(() => {
        y += 500; window.scrollTo(0, y);
        if (y >= document.body.scrollHeight) { clearInterval(t); window.scrollTo(0, 0); done(); }
      }, 40);
    });
    await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((res) => { img.onload = img.onerror = res; }))));
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `shots/${name}.jpg`, fullPage: true, type: 'jpeg', quality: 85 });
  await page.close();
  console.log(`ok: shots/${name}.jpg`);
}

await browser.close();
srv.close();
