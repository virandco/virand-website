const {chromium}=await import(process.env.VIRAND_QA_PLAYWRIGHT || 'playwright');
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const out=path.resolve('docs/reportes/capturas');
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const report=[];
try {
 for(const width of [1440,1024,768,390]) for(const lang of ['es','en']) {
  const theme=width<=768?'light':'dark',context=await browser.newContext({viewport:{width,height:900}});
  await context.addInitScript(({theme})=>{
   localStorage.setItem('virand-theme',theme);
   window.__qaCsp=[];window.__qaEvents=[];window.__qaLcp=[];
   document.addEventListener('securitypolicyviolation',e=>window.__qaCsp.push({directive:e.effectiveDirective,blocked:e.blockedURI}));
   window.umami={track:(name,data)=>window.__qaEvents.push({name,data})};
   new PerformanceObserver(list=>{for(const entry of list.getEntries())window.__qaLcp.push({ms:entry.startTime,tag:entry.element?.tagName,url:entry.url});}).observe({type:'largest-contentful-paint',buffered:true});
  },{theme});
  await context.route('https://wa.me/**',route=>route.fulfill({contentType:'text/html',body:'WhatsApp QA'}));
  const page=await context.newPage(),errors=[],requests=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('request',request=>requests.push(request.url()));
  await page.route('https://cloud.umami.is/**',route=>route.fulfill({contentType:'text/javascript',body:''}));
  await page.route('https://calendar.google.com/**',route=>route.fulfill({contentType:'text/html',body:'<html lang="'+lang+'"><body>Agenda de prueba</body></html>'}));
  await page.goto('http://127.0.0.1:4323/'+(lang==='en'?'en/':''),{waitUntil:'networkidle'});
  await page.waitForTimeout(1000);
  assert.equal(await page.locator('html').getAttribute('lang'),lang);
  assert.equal(await page.locator('html').getAttribute('data-theme'),theme);
  const lcp=await page.evaluate(()=>window.__qaLcp.at(-1));
  assert.ok(!requests.some(url=>/\/scene\.[\w-]+\.js$/.test(url)),'3D loaded before viewport');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'initial overflow');
  const video=page.locator('.hero video[data-scrub-video]');
  await page.waitForFunction(()=>document.querySelector('.hero video[data-scrub-video]').readyState>=2);
  const before=await video.evaluate(video=>video.currentTime);
  await page.evaluate(()=>scrollTo({top:300,behavior:'instant'}));await page.waitForTimeout(900);
  const after=await video.evaluate(video=>video.currentTime);assert.ok(after>before+.3,'video scrub failed');
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  if([1440,390].includes(width)) {
   await page.waitForTimeout(800);await page.screenshot({path:out+'/'+lang+'-'+width+'-'+theme+'-inicio.jpg',quality:85});
   await page.evaluate(()=>{document.querySelectorAll('[data-reveal]').forEach(el=>el.classList.add('is-visible'));document.querySelectorAll('header.nav,.skip-link').forEach(el=>el.style.visibility='hidden');});
   for(const id of ['signature','proceso','a-medida','faq','cuestionario']){
    await page.locator('#'+id).scrollIntoViewIfNeeded();await page.waitForTimeout(1000);
    await page.locator('#'+id).screenshot({path:out+'/'+lang+'-'+width+'-'+theme+'-'+id+'.jpg',quality:85});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,id+' overflow');
   }
  }
  await page.evaluate(()=>document.querySelectorAll('header.nav,.skip-link').forEach(el=>el.style.visibility=''));
  await page.locator('[data-closing-icon]').scrollIntoViewIfNeeded();await page.waitForTimeout(1600);
  const mode=await page.locator('[data-closing-icon]').getAttribute('data-icon-mode');
  assert.equal(mode,'3d','3d missing');
  if([1440,390].includes(width)) await page.locator('.closing').screenshot({path:out+'/'+lang+'-'+width+'-'+theme+'-cierre.jpg',quality:85});
  if(width===1440){
   await page.locator('[data-theme-toggle]').click();
   assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
   assert.equal(await page.locator('[data-closing-icon]').getAttribute('data-icon-mode'),'3d');
   await page.locator('.closing').screenshot({path:out+'/'+lang+'-'+width+'-light-cierre.jpg',quality:85});
   await page.locator('[data-theme-toggle]').click();
  }
  await page.locator('#cuestionario').scrollIntoViewIfNeeded();
  await page.locator('[data-next]').click();
  assert.equal(await page.locator('[data-step="0"]').isVisible(),true);
  assert.equal(await page.locator('[data-error="business"]').isVisible(),true);
  await page.locator('[name=business][value=other]').check();
  await page.locator('[name=businessOther]').fill('Taller de prueba');
  await page.locator('[data-next]').click();
  await page.locator('[name=brand][value=logo]').check();
  await page.locator('[data-next]').click();
  await page.locator('[name=needs][value=signature]').check();await page.locator('[name=needs][value=custom]').check();
  await page.locator('[data-next]').click();
  const budget=width===1440?'under500':'unknown';
  await page.locator('[name=budget][value='+budget+']').check();
  await page.locator('[data-next]').click();
  assert.equal(await page.locator('[data-entry]').isVisible(),budget==='under500');
  await page.locator('[data-back]').click();await page.locator('[data-next]').click();
  await page.locator('[name=name]').fill('Prueba técnica');
  await page.locator('[name=contact]').fill('contacto@virand.co');
  await page.locator('[name=message]').fill('Integración de agenda.');
  await page.locator('[data-whatsapp]').click();
  assert.equal(await page.locator('[data-error=consent]').isVisible(),true);
  await page.locator('[name=consent]').check();
  if([1440,390].includes(width)){await page.evaluate(()=>document.querySelectorAll('header.nav,.skip-link').forEach(el=>el.style.visibility='hidden'));await page.locator('#cuestionario').screenshot({path:out+'/'+lang+'-'+width+'-'+theme+'-contacto.jpg',quality:85});await page.evaluate(()=>document.querySelectorAll('header.nav,.skip-link').forEach(el=>el.style.visibility=''));}
  const popupPromise=page.waitForEvent('popup');await page.locator('[data-whatsapp]').click();const popup=await popupPromise;
  await popup.waitForURL(url=>url.href.startsWith('https://wa.me/'),{timeout:8000}).catch(()=>{});
  const wa=popup.url();assert.ok(wa.startsWith('https://wa.me/573228802540?text='));const message=new URL(wa).searchParams.get('text');assert.match(message,/Taller de prueba/);assert.match(message,/Signature System/);assert.ok(!message.includes('presupuesto bajo'));await popup.close();
  await page.route('**/api/proyecto',route=>route.fulfill({status:503,contentType:'application/json',body:'{"ok":false,"code":"unavailable"}'}));
  await page.locator('[data-submit]').click();await page.waitForTimeout(150);assert.equal(await page.locator('[data-status]').isVisible(),true);
  await page.unroute('**/api/proyecto');
  let sent;
  await page.route('**/api/proyecto',route=>{sent=route.request().postDataJSON();return route.fulfill({status:200,contentType:'application/json',body:'{"ok":true}'});});
  await page.locator('[data-submit]').click();await page.locator('[data-success]').waitFor({state:'visible'});
  assert.equal(sent.consent,true);assert.deepEqual(sent.needs,['signature','custom']);
  const calendar=await page.locator('[data-calendar-host] iframe').getAttribute('src');assert.equal(new URL(calendar).searchParams.get('hl'),lang==='en'?'en':null);
  const fallback=await page.locator('[data-calendar-host] a').getAttribute('href');if(lang==='en')assert.equal(new URL(fallback).searchParams.get('hl'),'en');
  await page.locator('[data-calendar-host]').scrollIntoViewIfNeeded();await page.waitForTimeout(350);
  const events=await page.evaluate(()=>window.__qaEvents);
  for(const event of events){assert.ok(['idioma'].every(k=>!event.data||Object.keys(event.data).every(key=>key===k)));assert.ok(!JSON.stringify(event).includes('contacto@'));}
  for(const name of ['cuestionario_iniciado','cuestionario_completado','cta_whatsapp','form_enviado','agenda_vista']) assert.ok(events.some(event=>event.name===name),name);
  const csp=await page.evaluate(()=>window.__qaCsp);assert.deepEqual(csp,[],'CSP violations');
  assert.deepEqual(errors,[],'page errors');
  report.push({width,lang,theme,lcp,video:{before,after},icon:mode,events:events.map(e=>e.name),csp,errors});
  console.log(width,lang,'OK',lcp?.ms.toFixed(0)+'ms LCP',mode);
  await context.close();
 }
 const reduced=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 const page=await reduced.newPage(),media=[];page.on('request',request=>media.push(request.url()));await page.goto('http://127.0.0.1:4323/');
 await page.locator('[data-closing-icon]').scrollIntoViewIfNeeded();await page.waitForTimeout(500);
 assert.equal(media.some(url=>url.endsWith('.mp4')||/\/scene\.[\w-]+\.js$/.test(url)),false,'reduced motion loaded animation');
 assert.equal(await page.locator('[data-closing-icon] .closing__flat').isVisible(),true);
 await page.screenshot({path:out+'/movimiento-reducido.jpg',quality:85});await reduced.close();
 const noGl=await browser.newContext({viewport:{width:1440,height:900}});await noGl.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type.startsWith('webgl')?null:original.call(this,type,...args);};});
 const noGlPage=await noGl.newPage();await noGlPage.goto('http://127.0.0.1:4323/');await noGlPage.locator('[data-closing-icon]').scrollIntoViewIfNeeded();await noGlPage.waitForTimeout(700);assert.equal(await noGlPage.locator('[data-closing-icon]').getAttribute('data-icon-mode'),'static');await noGl.close();
 fs.writeFileSync(path.resolve('docs/reportes/qa-edge.json'),JSON.stringify({browser:await browser.version(),runs:report,reducedMotion:'OK',noWebGL:'OK'},null,2));
} finally {await browser.close();}
