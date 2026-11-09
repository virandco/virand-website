import assert from 'node:assert/strict';
import { validateProject, classifyProject, composeEmail, sendWithResend, sanitizeLine } from '../src/lib/projectForm.ts';
import { checkFillTime, isHoneypotTripped, rateLimit, resetRateLimits } from '../src/lib/antiBot.ts';

const raw={business:'appointments',businessOther:'',brand:'logo',needs:['signature','agent'],budget:'unknown',name:'Prueba técnica',contact:'contacto@virand.co',message:'Agenda y atención',consent:true,lang:'es'};
const valid=validateProject(raw); assert.equal(valid.ok,true);
assert.equal(classifyProject(valid.data).includes('presupuesto bajo'),false);
const low=validateProject({...raw,budget:'under500'}); assert.equal(low.ok,true);
assert.equal(classifyProject(low.data).includes('presupuesto bajo'),true);
assert.match(composeEmail(low.data).text,/presupuesto bajo/);
assert.match(composeEmail(valid.data).text,/Signature System, Agente de atención por WhatsApp/);
for(const [field,value] of [['business','bad'],['brand','bad'],['budget','bad'],['needs',['bad']],['needs',[]],['needs','signature'],['name','x'],['contact','x@'],['contact','123'],['consent',false],['message','x'.repeat(501)]]) {
 const result=validateProject({...raw,[field]:value});assert.equal(result.ok,false,field);assert.ok(result.errors[field],field);
}
assert.equal(validateProject({...raw,business:'other',businessOther:''}).ok,false);
assert.equal(validateProject({...raw,business:'other',businessOther:'Taller'}).ok,true);
assert.equal(validateProject({...raw,contact:'+57 322 880 2540'}).data.contactKind,'phone');
assert.deepEqual(validateProject({...raw,needs:['agent','agent']}).data.needs,['agent']);
assert.equal(sanitizeLine('  Prueba\r\n  técnica\u202e  '),'Prueba técnica');
assert.equal(checkFillTime(Date.now()-5000),'ok');
assert.equal(checkFillTime(Date.now()),'too_fast');
assert.equal(checkFillTime('bad'),'invalid');
assert.equal(isHoneypotTripped('filled'),true);
resetRateLimits();assert.equal(rateLimit('qa',{max:1,windowMs:1000},1000).allowed,true);assert.equal(rateLimit('qa',{max:1,windowMs:1000},1001).allowed,false);assert.equal(rateLimit('qa',{max:1,windowMs:1000},2001).allowed,true);
let payload;
const sent=await sendWithResend({apiKey:'test-only',from:'contacto@virand.co',to:'contacto@virand.co',...composeEmail(valid.data),replyTo:valid.data.contact},async(url,options)=>{assert.equal(url,'https://api.resend.com/emails');payload=JSON.parse(options.body);return new Response('{}',{status:200});});
assert.equal(sent.ok,true);assert.equal(payload.reply_to,'contacto@virand.co');assert.match(payload.text,/Aceptó el tratamiento/);
assert.equal((await sendWithResend({apiKey:'test-only',from:'contacto@virand.co',to:'contacto@virand.co',subject:'Prueba',text:'Prueba'},async()=>{throw new Error('mock');})).ok,false);
console.log('Validación, clasificación, sanitización, antibot y transporte simulado: OK.');
