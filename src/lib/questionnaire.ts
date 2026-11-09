import { questionnaireCopy } from '../i18n/ui';
import { validateProject, type FieldName, type ProjectData } from './projectForm';
import { questionnaireWhatsApp } from './whatsapp';
import { track } from './analytics';
const form=document.querySelector<HTMLFormElement>('[data-questionnaire]');
if(form) {
 const lang=form.dataset.lang==='en'?'en':'es', copy=questionnaireCopy[lang];
 const steps=Array.from(form.querySelectorAll<HTMLFieldSetElement>('[data-step]'));
 const next=form.querySelector<HTMLButtonElement>('[data-next]')!;
 const back=form.querySelector<HTMLButtonElement>('[data-back]')!;
 const submit=form.querySelector<HTMLButtonElement>('[data-submit]')!;
 const whatsapp=form.querySelector<HTMLButtonElement>('[data-whatsapp]')!;
 const status=form.querySelector<HTMLElement>('[data-status]')!;
 const success=document.querySelector<HTMLElement>('[data-success]')!;
 const stepFields:FieldName[][]=[['business','businessOther'],['brand'],['needs'],['budget'],['name','contact','message','consent']];
 let current=0,busy=false,completed=false;
 const payload=():Record<string,unknown> => {
  const data=new FormData(form);
  return {...Object.fromEntries(data),needs:data.getAll('needs'),consent:data.get('consent')==='on'};
 };
 const clear=()=>{
  form.querySelectorAll('[aria-invalid]').forEach(el=>el.removeAttribute('aria-invalid'));
  form.querySelectorAll<HTMLElement>('[data-error]').forEach(el=>{el.hidden=true;el.textContent='';});
  status.hidden=true; status.textContent='';
 };
 const setStep=(index:number,focus=true)=>{
  current=index;
  steps.forEach((el,i)=>{el.hidden=i!==index;});
  next.hidden=index===4; back.hidden=index===0; submit.hidden=index!==4; whatsapp.hidden=index!==4;
  form.querySelector('[data-step-number]')!.textContent=String(index+1);
  form.querySelector('progress')!.value=index+1;
  form.querySelector<HTMLElement>('[data-entry]')!.hidden=!(index===4&&payload().budget==='under500');
  if(focus) {
   const legend=steps[index].querySelector('legend');
   legend?.focus({preventScroll:true});
   legend?.scrollIntoView({block:'nearest',behavior:'instant'});
  }
 };
 const markErrors=(errors:Partial<Record<FieldName,string>>,onlyCurrent=false)=>{
  const entries=Object.entries(errors).filter(([key])=>!onlyCurrent||stepFields[current].includes(key as FieldName));
  if(!entries.length) return false;
  if(!onlyCurrent) {
   const index=stepFields.findIndex(fields=>fields.includes(entries[0][0] as FieldName));
   if(index>=0) setStep(index);
  }
  let first:HTMLElement|null=null;
  for(const [key,code] of entries) {
   const el=form.querySelector<HTMLElement>('[data-error="'+key+'"]');
   if(el) {el.hidden=false;el.textContent=key==='contact'&&code==='invalid'?copy.errors.contact:key==='consent'?copy.errors.consent:copy.errors[code as keyof typeof copy.errors]||copy.errors.invalid;}
   form.querySelectorAll<HTMLElement>('[name="'+key+'"]').forEach(input=>{input.setAttribute('aria-invalid','true');first??=input;});
  }
  status.textContent=copy.error; status.hidden=false;
  (first as HTMLElement|null)?.focus();
  return true;
 };
 const validData=():ProjectData|null=>{
  clear(); const result=validateProject(payload());
  if(!result.ok) {markErrors(result.errors);return null;}
  if(!completed) {completed=true;track('cuestionario_completado',{idioma:lang});}
  return result.data;
 };
 form.dataset.enhanced='';
 form.querySelector<HTMLElement>('[data-progress]')!.hidden=false;
 (form.elements.namedItem('ts') as HTMLInputElement).value=String(Date.now());
 const other=form.querySelector<HTMLElement>('[data-other]')!;
 const updateOther=()=>{other.hidden=payload().business!=='other';};
 form.addEventListener('change',updateOther);
 form.addEventListener('focusin',()=>track('cuestionario_iniciado',{idioma:lang}),{once:true});
 next.addEventListener('click',()=>{
  if(busy)return; clear(); const result=validateProject(payload());
  if(!result.ok&&markErrors(result.errors,true)) return;
  setStep(Math.min(4,current+1));
 });
 back.addEventListener('click',()=>{if(!busy){clear();setStep(Math.max(0,current-1));}});
 whatsapp.addEventListener('click',()=>{
  if(busy)return; const data=validData(); if(!data)return;
  track('cta_whatsapp',{idioma:lang});
  const link=document.createElement('a');link.href=questionnaireWhatsApp(data);link.target='_blank';link.rel='noopener noreferrer';link.click();
 });
 form.addEventListener('submit',async event=>{
  event.preventDefault(); if(busy)return;
  if(current<4) {next.click();return;}
  const data=validData(); if(!data)return;
  busy=true; form.setAttribute('aria-busy','true');
  form.querySelectorAll<HTMLButtonElement>('button').forEach(button=>button.disabled=true);
  submit.textContent=copy.sending;
  const controller=new AbortController(), timeout=setTimeout(()=>controller.abort(),15000);
  try {
   const response=await fetch('/api/proyecto',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...payload(),...data,consent:true}),signal:controller.signal});
   const result=await response.json();
   if(!response.ok||!result.ok) {
    if(result.code==='validation') markErrors(result.errors||{});
    else { status.textContent=copy.formErrors[result.code as keyof typeof copy.formErrors]||copy.formErrors.generic;status.hidden=false;status.focus(); }
    return;
   }
   track('form_enviado',{idioma:lang});
   form.hidden=true;success.hidden=false;success.focus({preventScroll:true});
   if(data.budget==='under500') {const entry=form.querySelector<HTMLElement>('[data-entry]')!.cloneNode(true) as HTMLElement;entry.hidden=false;success.prepend(entry);}
   const template=success.querySelector<HTMLTemplateElement>('[data-calendar]')!;
   const host=success.querySelector<HTMLElement>('[data-calendar-host]')!;
   host.append(template.content.cloneNode(true));
   const iframe=host.querySelector('iframe')!;
   iframe.src=iframe.dataset.src!;
   host.querySelector('h3')?.focus({preventScroll:true});
   const observer=new IntersectionObserver(entries=>{
    if(entries.some(entry=>entry.isIntersecting)) {track('agenda_vista',{idioma:lang});observer.disconnect();}
   },{threshold:.1});
   observer.observe(host);
  } catch {status.textContent=copy.formErrors.network;status.hidden=false;status.focus();}
  finally {
   clearTimeout(timeout);busy=false;form.removeAttribute('aria-busy');
   form.querySelectorAll<HTMLButtonElement>('button').forEach(button=>button.disabled=false);
   submit.textContent=copy.submit;
  }
 });
 setStep(0,false);
 form.hidden=false;
}
