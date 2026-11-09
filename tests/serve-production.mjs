// Local production-build preview. The API is proxied to astro dev on 4322.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('.vercel/output/static');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.mp4':'video/mp4','.woff2':'font/woff2','.xml':'application/xml'};
http.createServer(async(req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 if(pathname==='/api/proyecto') {
  const chunks=[];for await(const chunk of req)chunks.push(chunk);
  try { const result=await fetch('http://127.0.0.1:4322/api/proyecto',{method:req.method,headers:{...req.headers,host:'127.0.0.1:4322',origin:req.headers.origin?.replace(':4323',':4322')||'http://127.0.0.1:4322'},body:['GET','HEAD'].includes(req.method)?undefined:Buffer.concat(chunks)});
  res.writeHead(result.status,Object.fromEntries(result.headers));res.end(Buffer.from(await result.arrayBuffer())); } catch {res.writeHead(503,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify({ok:false,code:'unavailable'}));}return;
 }
 let file=path.join(root,pathname);let status=200;
 if(!file.startsWith(root)) {res.writeHead(403);res.end();return;}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 if(!fs.existsSync(file)) {file=path.join(root,pathname.startsWith('/en/')?'en/404/index.html':'404.html');status=404;}
 const stat=fs.statSync(file),type=types[path.extname(file)]||'application/octet-stream';
 const range=req.headers.range?.match(/bytes=(\d+)-(\d*)/);
 if(range) {const start=+range[1],end=range[2]?Math.min(+range[2],stat.size-1):stat.size-1;res.writeHead(206,{'Content-Type':type,'Accept-Ranges':'bytes','Content-Range':`bytes ${start}-${end}/${stat.size}`,'Content-Length':end-start+1});fs.createReadStream(file,{start,end}).pipe(res);}
 else {res.writeHead(status,{'Content-Type':type,'Content-Length':stat.size,'X-Content-Type-Options':'nosniff'});if(req.method==='HEAD')res.end();else fs.createReadStream(file).pipe(res);}
}).listen(4323,'127.0.0.1',()=>console.log('Production QA: http://127.0.0.1:4323'));
