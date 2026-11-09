import { WHATSAPP_NUMBER } from '../consts';
import { questionnaireCopy } from '../i18n/ui';
import type { ProjectData } from './projectForm';
export function questionnaireWhatsApp(data: ProjectData): string {
 const copy=questionnaireCopy[data.lang], labels=copy.summaryLabels;
 const chosen=(key:'business'|'brand'|'needs'|'budget',value:string) => copy[key].find(item=>item.value===value)?.label||'';
 const lines=[
  copy.summaryTitle,
  labels.business+': '+chosen('business',data.business)+(data.businessOther?' ('+data.businessOther+')':''),
  labels.brand+': '+chosen('brand',data.brand),
  labels.needs+': '+data.needs.map(v=>chosen('needs',v)).join(', '),
  labels.budget+': '+chosen('budget',data.budget),
  labels.name+': '+data.name,
  labels.contact+': '+data.contact,
  ...(data.message?[labels.message+': '+data.message]:[]),
 ];
 return 'https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent(lines.join('\n'));
}
