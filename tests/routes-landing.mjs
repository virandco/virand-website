const {chromium}=await import(process.env.VIRAND_QA_PLAYWRIGHT || 'playwright');import assert from 'node:assert/strict';import fs from 'node:fs';
const browser=await chromium.launch({channel:'msedge',headless:true});const results=[];
try{
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 const page=await context.newPage();await page.route('https://cloud.umami.is/**',r=>r.fulfill({body:''}));
 for(const route of ['/','/en/','/privacidad','/en/privacy','/terminos','/en/terms','/cookies','/en/cookies','/404','/en/404']) {
  const response=await page.goto('http://127.0.0.1:4323'+route);
  const lang=route.startsWith('/en')?'en':'es';assert.equal(await page.locator('html').getAttribute('lang'),lang);
  const home=route==='/'||route==='/en/';assert.equal(await page.locator('meta[name=robots]').count(),home?0:1);
  assert.equal(await page.locator('link[rel=alternate][hreflang]').count(),3);
  assert.ok((await page.locator('link[rel=canonical]').getAttribute('href')).startsWith('https://virand.co/'));
  assert.ok((await page.locator('meta[property="og:image"]').getAttribute('content')).endsWith('/og/og-'+lang+'.png'));
  for(const href of ['/apple-touch-icon.png','/site.webmanifest','/favicon.ico','/favicon.svg'])assert.ok(await page.locator(`link[href="${href}"]`).count(),href+' missing');
  assert.equal((await page.request.get('http://127.0.0.1:4323/apple-touch-icon.png')).status(),200);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,route);
  const emails=await page.locator('a[href^="mailto:"]').evaluateAll(els=>els.map(el=>el.getAttribute('href')));assert.ok(emails.every(email=>email==='mailto:contacto@virand.co'));
  await page.locator('.lang-toggle').click();const opposite=new URL(page.url()).pathname;assert.equal(opposite.startsWith('/en'),lang==='es');
  results.push({route,status:response.status(),opposite,overflow:false});
 }
 await page.goto('http://127.0.0.1:4323/');
 await page.locator('.nav__mobile summary').click();await page.locator('.nav__mobile a[href="/#signature"]').click();
 assert.equal(new URL(page.url()).hash,'#signature');assert.equal(await page.locator('.nav__mobile').getAttribute('open'),null);
 assert.ok(Math.abs((await page.locator('#signature').boundingBox()).y-80)<5);
 await page.locator('#faq summary').first().click();assert.notEqual(await page.locator('#faq details').first().getAttribute('open'),null);
 const failed=await browser.newContext({viewport:{width:1440,height:900}});
 const failedPage=await failed.newPage();await failedPage.route('**/media/hero-*.mp4',route=>route.abort());
 await failedPage.goto('http://127.0.0.1:4323/');await failedPage.waitForTimeout(500);
 assert.equal(await failedPage.locator('.hero video[data-scrub-video]').getAttribute('data-ready'),null);
 assert.equal(await failedPage.locator('.hero__poster[data-when=dark]').isVisible(),true);await failed.close();
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const nojsPage=await nojs.newPage();await nojsPage.goto('http://127.0.0.1:4323/');
 assert.equal(await nojsPage.locator('[data-questionnaire]').isVisible(),false);
 assert.equal(await nojsPage.locator('.questionnaire__panel noscript a').isVisible(),true);
 assert.equal(await nojsPage.locator('.box__offer').evaluate(el=>getComputedStyle(el).opacity),'1');assert.equal(await nojsPage.locator('.offer').evaluate(el=>getComputedStyle(el).opacity),'1');
 await nojs.close();
 const config=JSON.parse(fs.readFileSync('.vercel/output/config.json'));assert.ok(config.routes.some(route=>route.dest==='/en/404/index.html'&&route.status===404));
 fs.writeFileSync('docs/reportes/qa-rutas.json',JSON.stringify({routes:results,mobileNav:'OK',faq:'OK',videoFailure:'OK',noJavaScript:'OK',english404:'OK'},null,2));console.log('Rutas, SEO, alternos legales, menú móvil, FAQ y fallo de video: OK.');
} finally {await browser.close();}
