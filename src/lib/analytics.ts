// Fixed categories only. Unknown properties and free text never reach Umami.
const events = ['cuestionario_iniciado','cuestionario_completado','cta_whatsapp','form_enviado','agenda_vista'] as const;
type EventName = typeof events[number];
export function track(name: EventName, props: {idioma?:'es'|'en'} = {}): void {
 try {
  if(typeof window==='undefined'||!events.includes(name)) return;
  const umami=(window as unknown as {umami?:{track:(name:string,data?:Record<string,string>)=>void}}).umami;
  const data=props.idioma==='es'||props.idioma==='en'?{idioma:props.idioma}:undefined;
  umami?.track(name,data);
 } catch { /* Tracking never interrupts the visitor. */ }
}
