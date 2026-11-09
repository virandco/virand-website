// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { THEME_INIT_SCRIPT } from './src/lib/themeScript.ts';
const SITE='https://virand.co';
/** @param {string} text @returns {`sha256-${string}`} */
const sha256=text=>`sha256-${createHash('sha256').update(text).digest('base64')}`;
// Keep the English error page static and return an actual 404 for unknown /en URLs.
// The adapter normally emits one Spanish fallback for every language.
/** @type {import('astro').AstroIntegration} */
const adapter=vercel();
const finishVercel=adapter.hooks['astro:build:done'];
adapter.hooks['astro:build:done']=async (/** @type {import('astro').HookParameters<'astro:build:done'>} */ context)=>{
 await finishVercel?.(context);
 const file=new URL('./.vercel/output/config.json',import.meta.url);
 const output=JSON.parse(await readFile(file,'utf8'));
 const index=output.routes.findIndex((/** @type {{dest?:string}} */ route)=>route.dest==='/404.html');
 if(index<0)throw new Error('Missing Vercel 404 fallback');
 output.routes.splice(index,0,{src:'^/en(?:/.*)?$',dest:'/en/404/index.html',status:404});
 await writeFile(file,JSON.stringify(output,null,2)+'\n');
};
export default defineConfig({
 site:SITE,
 adapter,
 env:{schema:{
  RESEND_API_KEY:envField.string({context:'server',access:'secret',optional:true}),
  CONTACT_FROM:envField.string({context:'server',access:'secret',optional:true}),
 }},
 security:{csp:{
  scriptDirective:{resources:["'self'",'https://cloud.umami.is'],hashes:[sha256(THEME_INIT_SCRIPT)]},
  styleDirective:{resources:["'self'",{resource:"'unsafe-inline'",kind:'attribute'}]},
  directives:[
   "default-src 'self'","img-src 'self' data:","font-src 'self' data:","media-src 'self'",
   "connect-src 'self' https://gateway.umami.is","frame-src https://calendar.google.com",
   "object-src 'none'","base-uri 'self'","form-action 'self'",
  ],
 }},
 i18n:{locales:['es','en'],defaultLocale:'es',routing:{prefixDefaultLocale:false}},
 integrations:[icon(),sitemap({
  filter:page=>['/','/en/','/en'].includes(new URL(page).pathname),
  serialize:item=>({...item,links:[
   {url:SITE+'/',lang:'es'},{url:SITE+'/en/',lang:'en'},{url:SITE+'/',lang:'x-default'},
  ]}),
 })],
 vite:{plugins:[tailwindcss()]},
});
