// Knowledge base for the on-site assistant. Rule-based on purpose: every answer
// comes from approved landing copy (Signature, process, custom work, FAQ), so the
// assistant can never promise something the site does not say.
// Keywords are matched without accents and in lowercase.
import type { Lang } from './ui';

export type ChatAction = { label: string; href: string; kind: 'whatsapp' | 'section' | 'mail' | 'calendar' | 'external' };
export type Intent = {
  id: string;
  chip: string;
  keywords: string[];
  answer: string[];
  next?: string[];
  actions?: ('whatsapp' | 'questionnaire' | 'signature' | 'custom' | 'mail' | 'calendar')[];
};

type ChatCopy = {
  launcher: string;
  title: string;
  subtitle: string;
  greeting: string;
  placeholder: string;
  send: string;
  close: string;
  restart: string;
  fallback: string[];
  actions: Record<NonNullable<Intent['actions']>[number], string>;
  start: string[];
  intents: Intent[];
};

export const chatCopy: Record<Lang, ChatCopy> = {
  es: {
    launcher: '¿Dudas?',
    title: 'Asistente VIRAND',
    subtitle: 'Respuestas rápidas sobre servicios y contacto.',
    greeting: 'Hola. Te ayudo con dudas frecuentes, a elegir entre Signature System y un proyecto a medida, o a contactarnos. ¿Qué quieres saber?',
    placeholder: 'Escribe tu pregunta',
    send: 'Enviar',
    close: 'Cerrar asistente',
    restart: 'Volver al inicio',
    fallback: [
      'No tengo una respuesta precisa para eso aquí.',
      'Escríbenos por WhatsApp y te respondemos directamente, o elige uno de los temas.',
    ],
    actions: {
      whatsapp: 'Escribir por WhatsApp',
      questionnaire: 'Cuéntanos tu proyecto',
      signature: 'Ver Signature System',
      custom: 'Ver proyectos a medida',
      mail: 'Enviar un correo',
      calendar: 'Agendar una llamada',
    },
    start: ['guide', 'signature', 'price', 'custom', 'contact'],
    intents: [
      {
        id: 'guide', chip: '¿Qué me conviene?',
        keywords: ['conviene', 'recomiendas', 'cual elijo', 'elegir', 'necesito', 'no se', 'ayuda', 'diferencia', 'opcion', 'opciones'],
        answer: [
          'Depende de lo que necesites resolver:',
          'Si quieres marca, web y un agente que atienda y agende, todo listo en una sola implementación, es Signature System.',
          'Si tu proceso es distinto (software, CRM, cotizaciones, catálogos, un sitio completo, contenido o pauta), es un proyecto a medida.',
        ],
        next: ['signature', 'custom', 'contact'],
      },
      {
        id: 'signature', chip: '¿Qué es Signature System?',
        keywords: ['signature', 'sistema', 'paquete', 'que es', 'que incluye', 'incluye', 'piezas', 'oferta', 'plan'],
        answer: [
          'Es un paquete completo: tu marca, una web que convierte y un agente que atiende y agenda, conectados en una sola implementación.',
          'Incluye kit de marca (branding básico), web o landing de conversión y un agente guiado o híbrido en WhatsApp o integrado a tu web.',
        ],
        next: ['price', 'timing', 'agent'],
        actions: ['signature'],
      },
      {
        id: 'price', chip: '¿Cuánto cuesta?',
        keywords: ['precio', 'cuesta', 'cuanto', 'valor', 'costo', 'tarifa', 'pago', 'pagar', 'dolares', 'usd', '950', 'mensualidad', 'inversion'],
        answer: [
          'Signature System cuesta 950 USD por implementación: precio fijo y sin mensualidades obligatorias.',
          'El dominio va incluido. El hosting, las APIs y la mensajería se contratan aparte, a tu nombre. Los proyectos a medida se cotizan según su alcance.',
        ],
        next: ['timing', 'thirdparty', 'contact'],
        actions: ['questionnaire'],
      },
      {
        id: 'timing', chip: '¿Cuánto tarda?',
        keywords: ['tarda', 'tiempo', 'plazo', 'semanas', 'cuando', 'demora', 'entrega', 'rapido', 'dias'],
        answer: ['A partir de 2 semanas, según el alcance y tus materiales. Confirmamos el plazo antes de empezar.'],
        next: ['deliverables', 'process', 'contact'],
      },
      {
        id: 'deliverables', chip: '¿Qué recibo al final?',
        keywords: ['recibo', 'entregan', 'entregable', 'final', 'manual', 'accesos'],
        answer: ['El kit de marca, la web o landing, el agente guiado o híbrido (en WhatsApp o integrado a tu web), un manual de uso y tus accesos.'],
        next: ['agent', 'price', 'contact'],
      },
      {
        id: 'agent', chip: '¿Cómo funciona el agente?',
        keywords: ['agente', 'ia', 'bot', 'chatbot', 'whatsapp', 'automatizacion', 'automatico', 'atencion', 'agenda', 'citas', 'hibrido', 'guiado'],
        answer: ['En el Signature System es guiado o híbrido, y funciona en WhatsApp o integrado a tu web. Presenta opciones, acompaña a tus clientes y captura información como servicio, horario y datos de contacto.', 'También desarrollamos agentes de IA especializados para tu negocio: atienden a tus clientes, resuelven dudas, califican prospectos, cotizan o agendan según tus reglas y tu información.'],
        next: ['thirdparty', 'signature', 'contact'],
      },
      {
        id: 'thirdparty', chip: '¿Quién paga APIs y hosting?',
        keywords: ['api', 'apis', 'hosting', 'dominio', 'mensajeria', 'terceros', 'meta', 'servidor'],
        answer: ['Los pagas tú, a tu nombre, al igual que el hosting. El dominio lo incluimos nosotros. VIRAND te enseña a configurarlos y te acompaña en el proceso.'],
        next: ['price', 'contact'],
      },
      {
        id: 'custom', chip: 'Proyectos a medida',
        keywords: ['medida', 'personalizado', 'software', 'crm', 'cotizacion', 'cotizaciones', 'catalogo', 'sitio', 'web completa', 'pagina', 'contenido', 'redes', 'pauta', 'anuncios', 'ads', 'google', 'branding', 'manual de marca', 'logo', 'marca'],
        answer: [
          'Construimos proyectos a medida cuando las herramientas preestablecidas no encajan:',
          'Software y CRM a medida. Cotizaciones y catálogos dinámicos. Landings y sitios web completos. Contenido para redes. Pauta en Meta y Google (sin garantía de resultados). Branding y manual de marca.',
        ],
        next: ['guide', 'contact'],
        actions: ['custom', 'questionnaire'],
      },
      {
        id: 'process', chip: '¿Cómo trabajan?',
        keywords: ['proceso', 'trabajan', 'metodologia', 'pasos', 'empezar', 'inicio', 'como funciona'],
        answer: ['Primero entendemos tu operación y definimos el alcance. Luego construimos el sistema, te lo entregamos con manual y accesos, y medimos su rendimiento para ajustar lo que haga falta.'],
        next: ['timing', 'contact'],
      },
      {
        id: 'contact', chip: 'Contacto',
        keywords: ['contacto', 'contactar', 'hablar', 'llamada', 'llamar', 'reunion', 'correo', 'email', 'mail', 'telefono', 'numero', 'escribir', 'asesor', 'humano', 'persona', 'agendar'],
        answer: ['Puedes escribirnos por WhatsApp, enviarnos un correo a contacto@virand.co o contarnos tu proyecto en el cuestionario. Al terminarlo puedes agendar una llamada.'],
        actions: ['whatsapp', 'questionnaire', 'mail'],
        next: ['guide'],
      },
    ],
  },
  en: {
    launcher: 'Questions?',
    title: 'VIRAND assistant',
    subtitle: 'Quick answers about services and contact.',
    greeting: 'Hi. I can help with common questions, choosing between Signature System and a custom project, or getting in touch. What would you like to know?',
    placeholder: 'Type your question',
    send: 'Send',
    close: 'Close assistant',
    restart: 'Back to start',
    fallback: [
      "I don't have a precise answer for that here.",
      'Message us on WhatsApp and we will reply directly, or pick one of the topics.',
    ],
    actions: {
      whatsapp: 'Message on WhatsApp',
      questionnaire: 'Tell us about your project',
      signature: 'See Signature System',
      custom: 'See custom work',
      mail: 'Send an email',
      calendar: 'Book a call',
    },
    start: ['guide', 'signature', 'price', 'custom', 'contact'],
    intents: [
      {
        id: 'guide', chip: 'Which one fits me?',
        keywords: ['fit', 'recommend', 'choose', 'which', 'need', 'not sure', 'help', 'difference', 'option', 'options'],
        answer: [
          'It depends on what you need to solve:',
          'If you want a brand, a website and an agent that answers and schedules, all in one implementation, that is Signature System.',
          'If your process is different (software, CRM, quotes, catalogs, a full website, content or ads), that is a custom project.',
        ],
        next: ['signature', 'custom', 'contact'],
      },
      {
        id: 'signature', chip: 'What is Signature System?',
        keywords: ['signature', 'system', 'package', 'what is', 'include', 'includes', 'parts', 'offer', 'plan'],
        answer: [
          'One complete package: your brand, a website that converts and an agent that answers and schedules, connected in one implementation.',
          'It includes a brand kit (basic branding), a conversion website or landing page and a guided or hybrid agent on WhatsApp or built into your website.',
        ],
        next: ['price', 'timing', 'agent'],
        actions: ['signature'],
      },
      {
        id: 'price', chip: 'How much is it?',
        keywords: ['price', 'cost', 'how much', 'fee', 'pay', 'payment', 'dollars', 'usd', '950', 'monthly', 'investment'],
        answer: [
          'Signature System costs 950 USD per implementation: a fixed price with no mandatory monthly fees.',
          'The domain is included. Hosting, APIs and messaging are contracted separately, in your name. Custom projects are quoted based on scope.',
        ],
        next: ['timing', 'thirdparty', 'contact'],
        actions: ['questionnaire'],
      },
      {
        id: 'timing', chip: 'How long does it take?',
        keywords: ['long', 'time', 'timeline', 'weeks', 'when', 'delivery', 'fast', 'days'],
        answer: ['Starting at 2 weeks, depending on scope and your materials. We confirm the timeframe before work starts.'],
        next: ['deliverables', 'process', 'contact'],
      },
      {
        id: 'deliverables', chip: 'What do I receive?',
        keywords: ['receive', 'deliverable', 'deliverables', 'get', 'manual', 'access'],
        answer: ['The brand kit, the website or landing page, the guided or hybrid agent (on WhatsApp or built into your website), a usage manual and your access.'],
        next: ['agent', 'price', 'contact'],
      },
      {
        id: 'agent', chip: 'How does the agent work?',
        keywords: ['agent', 'ai', 'bot', 'chatbot', 'whatsapp', 'automation', 'automatic', 'customer service', 'schedule', 'appointments', 'hybrid', 'guided'],
        answer: ['In Signature System it uses a guided or hybrid flow, on WhatsApp or built into your website. It presents options, assists your customers and captures information such as service, time and contact details.', 'We also develop specialized AI agents for your business: they answer your customers, resolve questions, qualify leads, quote or schedule following your rules and your information.'],
        next: ['thirdparty', 'signature', 'contact'],
      },
      {
        id: 'thirdparty', chip: 'Who pays for APIs and hosting?',
        keywords: ['api', 'apis', 'hosting', 'domain', 'messaging', 'third', 'meta', 'server'],
        answer: ['You pay for them, in your name, along with hosting. We include the domain. VIRAND shows you how to set them up and supports you through the process.'],
        next: ['price', 'contact'],
      },
      {
        id: 'custom', chip: 'Custom work',
        keywords: ['custom', 'tailored', 'software', 'crm', 'quote', 'quotes', 'catalog', 'website', 'site', 'content', 'social', 'ads', 'google', 'branding', 'brand manual', 'logo', 'brand'],
        answer: [
          'We build custom projects when prebuilt tools do not fit:',
          'Custom software and CRM. Quotes and dynamic catalogs. Landing pages and full websites. Social media content. Meta and Google ads (with no guarantee of results). Branding and brand manual.',
        ],
        next: ['guide', 'contact'],
        actions: ['custom', 'questionnaire'],
      },
      {
        id: 'process', chip: 'How do you work?',
        keywords: ['process', 'work', 'method', 'steps', 'start', 'how does it work'],
        answer: ['First we understand your operations and define the scope. Then we build the system, deliver it with a manual and your access, and measure performance to adjust where needed.'],
        next: ['timing', 'contact'],
      },
      {
        id: 'contact', chip: 'Contact',
        keywords: ['contact', 'talk', 'call', 'meeting', 'email', 'mail', 'phone', 'number', 'write', 'human', 'person', 'book'],
        answer: ['You can message us on WhatsApp, email contacto@virand.co or tell us about your project in the questionnaire. When you finish it, you can book a call.'],
        actions: ['whatsapp', 'questionnaire', 'mail'],
        next: ['guide'],
      },
    ],
  },
};
