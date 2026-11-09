// CODEX-007. Sanitization and Resend transport reused from main; questionnaire schema is new.
export const BUSINESS_VALUES = ['retail','restaurant','appointments','services','other'] as const;
export const BRAND_VALUES = ['manual','logo','none'] as const;
export const NEED_VALUES = ['signature','landing','agent','custom','website','content','branding','unsure'] as const;
export const BUDGET_VALUES = ['under500','500to1000','1000to2500','over2500','unknown'] as const;
export const LIMITS = { name: {min:2,max:80}, contact:{min:5,max:120}, message:{max:500}, businessOther:{min:2,max:100} } as const;
const HARD_CAP = 4000;
export type FieldName = 'business'|'businessOther'|'brand'|'needs'|'budget'|'name'|'contact'|'message'|'consent';
export type FieldErrorCode = 'required'|'too_short'|'too_long'|'invalid';
export type FieldErrors = Partial<Record<FieldName,FieldErrorCode>>;
export interface ProjectData {
 business: typeof BUSINESS_VALUES[number]; businessOther: string;
 brand: typeof BRAND_VALUES[number]; needs: typeof NEED_VALUES[number][];
 budget: typeof BUDGET_VALUES[number]; name: string; contact: string;
 contactKind:'email'|'phone'; message:string; lang:'es'|'en';
}
export type ValidationResult = {ok:true;data:ProjectData}|{ok:false;errors:FieldErrors};
// Control characters (except \n and \t, handled per field) and invisible or
// bidirectional-override characters used to disguise text.
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g;
const INVISIBLE = /[​-‏‪-‮⁠-⁤⁦-⁩﻿]/g;

const length = (value: string) => [...value].length;

/** Single-line text: no control characters, whitespace collapsed, trimmed. */
export function sanitizeLine(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value
    .normalize('NFC')
    .replace(CONTROL, ' ')
    .replace(INVISIBLE, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Multi-line text: keeps line breaks, drops control characters, caps blank lines. */
export function sanitizeText(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value
    .normalize('NFC')
    .replace(/\r\n?/g, '\n')
    .replace(CONTROL, ' ')
    .replace(INVISIBLE, '')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function checkText(
  raw: unknown,
  { min, max }: { min: number; max: number },
): { value: string; error?: FieldErrorCode } {
  if (typeof raw === 'string' && raw.length > HARD_CAP) return { value: '', error: 'too_long' };
  const value = sanitizeLine(raw);
  if (value === '') return { value, error: 'required' };
  if (length(value) < min) return { value, error: 'too_short' };
  if (length(value) > max) return { value, error: 'too_long' };
  return { value };
}

const EMAIL = /^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/;

/** Accepts an email or a phone number (7 to 15 digits, optional leading +). */
function checkContact(raw: unknown): {
  value: string;
  kind: 'email' | 'phone';
  error?: FieldErrorCode;
} {
  const base = checkText(raw, LIMITS.contact);
  if (base.error) return { value: base.value, kind: 'email', error: base.error };
  const value = base.value;
  if (value.includes('@')) {
    return EMAIL.test(value) && value.length <= 254
      ? { value: value.toLowerCase(), kind: 'email' }
      : { value, kind: 'email', error: 'invalid' };
  }
  const digits = value.replace(/[\s().-]/g, '');
  return /^\+?\d{7,15}$/.test(digits)
    ? { value, kind: 'phone' }
    : { value, kind: 'phone', error: 'invalid' };
}

function isTrue(value: unknown): boolean {
  return value === true || value === 'true' || value === 'on' || value === '1';
}

function oneOf<T extends string>(
  raw: unknown,
  allowed: readonly T[],
): { value?: T; error?: FieldErrorCode } {
  if (typeof raw !== 'string' || raw.trim() === '') return { error: 'required' };
  const found = allowed.find((item) => item === raw.trim());
  return found ? { value: found } : { error: 'invalid' };
}


export function validateProject(raw: Record<string,unknown>): ValidationResult {
 const errors: FieldErrors = {};
 const business = oneOf(raw.business,BUSINESS_VALUES);
 const brand = oneOf(raw.brand,BRAND_VALUES);
 const budget = oneOf(raw.budget,BUDGET_VALUES);
 if(business.error) errors.business=business.error;
 if(brand.error) errors.brand=brand.error;
 if(budget.error) errors.budget=budget.error;
 const needs = Array.isArray(raw.needs) ? [...new Set(raw.needs)] : [];
 if(!needs.length) errors.needs='required';
 else if(needs.length>NEED_VALUES.length || needs.some(v=>typeof v!=='string'||!NEED_VALUES.includes(v as typeof NEED_VALUES[number]))) errors.needs='invalid';
 const other = business.value==='other' ? checkText(raw.businessOther,LIMITS.businessOther) : {value:''};
 if(other.error) errors.businessOther=other.error;
 const name=checkText(raw.name,LIMITS.name); if(name.error) errors.name=name.error;
 const contact=checkContact(raw.contact); if(contact.error) errors.contact=contact.error;
 let message='';
 if(typeof raw.message==='string'&&raw.message.length>HARD_CAP) errors.message='too_long';
 else { message=sanitizeText(raw.message); if(length(message)>LIMITS.message.max) errors.message='too_long'; }
 if(!isTrue(raw.consent)) errors.consent='required';
 if(Object.keys(errors).length) return {ok:false,errors};
 return {ok:true,data:{business:business.value!,businessOther:other.value,brand:brand.value!,needs:needs as ProjectData['needs'],budget:budget.value!,name:name.value,contact:contact.value,contactKind:contact.kind,message,lang:raw.lang==='en'?'en':'es'}};
}

/** Internal tags are derived on the server, never accepted from the browser. */
export function classifyProject(data: ProjectData): string[] {
 return [
  'negocio:'+data.business,
  'marca:'+data.brand,
  ...data.needs.map(need=>'interes:'+need),
  ...(data.business==='appointments'?['requiere agenda']:[]),
  ...(data.brand==='none'||data.brand==='logo'?['revisar identidad']:[]),
  ...(data.needs.includes('custom')?['desarrollo a medida']:[]),
  ...(data.budget==='under500'?['presupuesto bajo']:[]),
 ];
}
const businessLabel = {retail:'Comercio o tienda',restaurant:'Restaurante o gastronomía',appointments:'Servicios con citas',services:'Empresa de servicios',other:'Otro'};
const brandLabel = {manual:'Sí, con manual de marca',logo:'Logo sin manual',none:'Aún no tiene marca'};
const needsLabel = {signature:'Signature System',landing:'Landing page',agent:'Agente de atención por WhatsApp',custom:'Software o automatización a medida',website:'Sitio web completo',content:'Contenido o pauta',branding:'Branding o manual de marca',unsure:'No está seguro'};
const budgetLabel = {under500:'Menos de 500 USD','500to1000':'500 a 1,000 USD','1000to2500':'1,000 a 2,500 USD',over2500:'Más de 2,500 USD',unknown:'Aún no lo sabe'};

export function composeEmail(data:ProjectData): {subject:string;text:string} {
 const subject=('Nuevo proyecto: '+data.name).slice(0,150);
 return {subject,text:[
  'Nuevo cuestionario de VIRAND',
  'Nombre: '+data.name,
  (data.contactKind==='email'?'Correo: ':'WhatsApp: ')+data.contact,
  'Tipo de negocio: '+businessLabel[data.business]+(data.businessOther?' ('+data.businessOther+')':''),
  'Marca: '+brandLabel[data.brand],
  'Qué busca: '+data.needs.map(v=>needsLabel[v]).join(', '),
  'Presupuesto aproximado: '+budgetLabel[data.budget],
  'Idioma: '+(data.lang==='en'?'inglés':'español'),
  '', 'Mensaje:', data.message||'(sin mensaje)',
  '', 'Etiquetas internas: '+classifyProject(data).join(', '),
  '', 'Aceptó el tratamiento de datos personales (casilla marcada en el formulario).',
 ].join('\n')};
}
export interface ResendOptions {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}

/**
 * Sends through the Resend REST API. Returns only the HTTP status: the
 * response body and the payload are never logged or returned.
 * `fetchFn` is injectable so tests never hit the network.
 */
export async function sendWithResend(
  options: ResendOptions,
  fetchFn: typeof fetch = fetch,
  timeoutMs = 8000,
): Promise<{ ok: boolean; status: number }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchFn('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: options.from,
        to: [options.to],
        subject: options.subject,
        text: options.text,
        ...(options.replyTo ? { reply_to: options.replyTo } : {}),
      }),
      signal: controller.signal,
    });
    return { ok: response.ok, status: response.status };
  } catch {
    return { ok: false, status: 0 };
  } finally {
    clearTimeout(timer);
  }
}
