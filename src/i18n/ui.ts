export const languages = { es: 'Español', en: 'English' } as const;
export const defaultLang = 'es';
export type Lang = keyof typeof languages;
export const ui = {
  es: {
    'meta.title': 'VIRAND | Sistemas que optimizan tu operación',
    'meta.description': 'Software a medida, automatización, branding y desarrollo web con estética cuidada. Conoce Signature System y cuéntanos tu proyecto.',
    'a11y.skip': 'Saltar al contenido', 'a11y.themeToggle': 'Cambiar entre modo claro y oscuro',
    'a11y.langToggle': 'Cambiar idioma', 'a11y.home': 'VIRAND, inicio',
    'nav.cta': 'WhatsApp', 'nav.sections': 'Secciones',
  },
  en: {
    'meta.title': 'VIRAND | Systems that optimize your operations',
    'meta.description': 'Custom software, automation, branding and carefully designed websites. Explore Signature System and tell us about your project.',
    'a11y.skip': 'Skip to content', 'a11y.themeToggle': 'Toggle light and dark mode',
    'a11y.langToggle': 'Change language', 'a11y.home': 'VIRAND, home',
    'nav.cta': 'WhatsApp', 'nav.sections': 'Sections',
  },
} as const;
export type UIKey = keyof (typeof ui)[typeof defaultLang];
export const heroCopy = {
  es: {
    title: 'Sistemas que optimizan tu operación.',
    body: 'Software a medida, automatización, branding y desarrollo web con estética cuidada.',
    project: 'Cuéntanos tu proyecto',
  },
  en: {
    title: 'Systems that optimize your operations.',
    body: 'Custom software, automation, branding and carefully designed websites.',
    project: 'Tell us about your project',
  },
} as const;
export const landingCopy = {
  "es": {
    "signature": {
      "title": "Signature System",
      "intro": "Tres piezas. Un solo motor para tu negocio.",
      "body": "Una base de marca, una landing y un agente de atención y agenda por WhatsApp, conectados en una sola implementación.",
      "pieces": [
        {
          "title": "Kit básico de marca",
          "body": "Colores, tipografía y reglas visuales para una presencia coherente.",
          "icon": "fingerprint"
        },
        {
          "title": "Landing de conversión",
          "body": "Tu oferta, con un camino claro para contactar, agendar o cotizar.",
          "icon": "browser"
        },
        {
          "title": "Atención y agenda",
          "body": "Un agente guiado o híbrido por WhatsApp que presenta opciones, captura datos y ayuda a agendar.",
          "icon": "whatsapp-logo"
        }
      ],
      "terms": [
        "Precio fijo por implementación",
        "Sin mensualidades obligatorias",
        "A partir de 2 semanas"
      ],
      "delivery": "Recibes el sistema, su manual de uso y tus accesos. El plazo se confirma según el alcance y tus materiales."
    },
    "process": {
      "title": "De tu operación al sistema.",
      "steps": [
        {
          "title": "Entender y diagnosticar",
          "body": "Escuchamos qué hace tu negocio, cómo operas y qué necesitas resolver. Definimos el alcance."
        },
        {
          "title": "Construir el sistema",
          "body": "Diseñamos y conectamos las piezas que necesita tu operación."
        },
        {
          "title": "Entregar con manual y accesos",
          "body": "Recibes el sistema funcionando, su manual de uso y tus accesos."
        },
        {
          "title": "Medir el rendimiento",
          "body": "Revisamos citas, consultas y tiempos de respuesta. Ajustamos lo que haga falta."
        }
      ]
    },
    "custom": {
      "title": "Tu proceso puede ser distinto.",
      "intro": "No todas las herramientas preestablecidas aplican a todos los negocios. Por eso también construimos proyectos a medida.",
      "items": [
        {
          "title": "Software y CRM a medida",
          "body": "Herramientas construidas alrededor de tus procesos."
        },
        {
          "title": "Cotizaciones y catálogos",
          "body": "Cotizaciones parametrizadas y catálogos dinámicos."
        },
        {
          "title": "Landings y sitios web",
          "body": "Páginas adicionales o un sitio web completo."
        },
        {
          "title": "Contenido para redes",
          "body": "Piezas que sostienen la presencia de tu marca."
        },
        {
          "title": "Pauta en Meta y Google",
          "body": "Gestión de campañas, sin garantía de resultados."
        },
        {
          "title": "Branding y manual de marca",
          "body": "Identidad y reglas para mantenerla coherente."
        }
      ]
    },
    "faq": {
      "title": "Antes de empezar.",
      "items": [
        {
          "q": "¿Cuánto tarda el Signature System?",
          "a": "A partir de 2 semanas, según el alcance y tus materiales. Confirmamos el plazo antes de empezar."
        },
        {
          "q": "¿Cómo se define el precio?",
          "a": "Precio fijo por implementación, sin mensualidades obligatorias. Definimos el alcance y el valor antes de empezar."
        },
        {
          "q": "¿Qué recibo al final?",
          "a": "El kit básico de marca, la landing, el agente de atención y agenda por WhatsApp, un manual de uso y tus accesos."
        },
        {
          "q": "¿Quién paga las APIs y la mensajería?",
          "a": "Las paga el cliente, al igual que los servicios de terceros como dominio y hosting. Los contratas a tu nombre. VIRAND te enseña a configurarlos y te acompaña en el proceso."
        },
        {
          "q": "¿Cómo funciona el agente?",
          "a": "Es guiado o híbrido. Presenta opciones, acompaña a tus clientes y captura información como servicio, horario y datos de contacto."
        }
      ]
    }
  },
  "en": {
    "signature": {
      "title": "Signature System",
      "intro": "Three parts. One engine for your business.",
      "body": "A brand foundation, a landing page and a WhatsApp customer service and scheduling agent, connected in one implementation.",
      "pieces": [
        {
          "title": "Basic brand kit",
          "body": "Colors, typography and visual rules for a consistent presence.",
          "icon": "fingerprint"
        },
        {
          "title": "Conversion landing page",
          "body": "Your offer, with a clear way to inquire, schedule or request a quote.",
          "icon": "browser"
        },
        {
          "title": "Customer service and scheduling",
          "body": "A guided or hybrid WhatsApp agent that presents options, captures details and helps schedule appointments.",
          "icon": "whatsapp-logo"
        }
      ],
      "terms": [
        "Fixed price per implementation",
        "No mandatory monthly fees",
        "Starting at 2 weeks"
      ],
      "delivery": "You receive the system, its usage manual and your access. Timing is confirmed based on scope and your materials."
    },
    "process": {
      "title": "From your operations to a system.",
      "steps": [
        {
          "title": "Understand and diagnose",
          "body": "We listen to what your business does, how you operate and what you need to solve. We define the scope."
        },
        {
          "title": "Build the system",
          "body": "We design and connect the parts your operations need."
        },
        {
          "title": "Deliver with manual and access",
          "body": "You receive the working system, its usage manual and your access."
        },
        {
          "title": "Measure performance",
          "body": "We review appointments, inquiries and response times, and adjust where needed."
        }
      ]
    },
    "custom": {
      "title": "Your process may be different.",
      "intro": "Prebuilt tools do not fit every business. That is why we also build custom projects.",
      "items": [
        {
          "title": "Custom software and CRM",
          "body": "Tools built around your processes."
        },
        {
          "title": "Quotes and catalogs",
          "body": "Parameterized quotes and dynamic catalogs."
        },
        {
          "title": "Landing pages and websites",
          "body": "Additional pages or a complete website."
        },
        {
          "title": "Social media content",
          "body": "Content that supports your brand presence."
        },
        {
          "title": "Meta and Google ads",
          "body": "Campaign management, with no guarantee of results."
        },
        {
          "title": "Branding and brand manual",
          "body": "An identity and the rules to keep it consistent."
        }
      ]
    },
    "faq": {
      "title": "Before we start.",
      "items": [
        {
          "q": "How long does Signature System take?",
          "a": "Starting at 2 weeks, depending on scope and your materials. We confirm the timeframe before work starts."
        },
        {
          "q": "How is the price set?",
          "a": "A fixed price per implementation, with no mandatory monthly fees. We agree on scope and price before work starts."
        },
        {
          "q": "What do I receive?",
          "a": "The basic brand kit, landing page, WhatsApp customer service and scheduling agent, a usage manual and your access."
        },
        {
          "q": "Who pays for APIs and messaging?",
          "a": "You pay for them, along with third-party services such as your domain and hosting. You contract them in your name. VIRAND shows you how to set them up and supports you through the process."
        },
        {
          "q": "How does the agent work?",
          "a": "It uses a guided or hybrid flow. It presents options, assists your customers and captures information such as service, time and contact details."
        }
      ]
    }
  }
} as const;