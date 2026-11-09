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
export const questionnaireCopy = {
  "es": {
    "title": "Cuéntanos tu proyecto.",
    "intro": "Primero entendemos tu negocio. Después definimos qué sistema necesita.",
    "step": "Paso",
    "of": "de",
    "next": "Continuar",
    "back": "Volver",
    "submit": "Enviar por formulario",
    "whatsapp": "Continuar por WhatsApp",
    "sending": "Enviando…",
    "questions": [
      "¿Qué tipo de negocio tienes?",
      "¿Ya tienes marca?",
      "¿Qué buscas?",
      "¿Cuál es tu presupuesto aproximado?",
      "¿Cómo te contactamos?"
    ],
    "multi": "Puedes elegir varias opciones.",
    "budgetHint": "Presupuesto aproximado en USD. Nos ayuda a orientar el alcance.",
    "business": [
      {
        "value": "retail",
        "label": "Comercio o tienda"
      },
      {
        "value": "restaurant",
        "label": "Restaurante o gastronomía"
      },
      {
        "value": "appointments",
        "label": "Servicios con citas (clínica, estética, tatuajes u otros)"
      },
      {
        "value": "services",
        "label": "Empresa de servicios"
      },
      {
        "value": "other",
        "label": "Otro"
      }
    ],
    "brand": [
      {
        "value": "manual",
        "label": "Sí, con manual de marca"
      },
      {
        "value": "logo",
        "label": "Tengo logo, pero no manual"
      },
      {
        "value": "none",
        "label": "Aún no tengo marca"
      }
    ],
    "needs": [
      {
        "value": "signature",
        "label": "Signature System"
      },
      {
        "value": "landing",
        "label": "Landing page"
      },
      {
        "value": "agent",
        "label": "Agente de atención por WhatsApp"
      },
      {
        "value": "custom",
        "label": "Software o automatización a medida"
      },
      {
        "value": "website",
        "label": "Sitio web completo"
      },
      {
        "value": "content",
        "label": "Contenido o pauta"
      },
      {
        "value": "branding",
        "label": "Branding o manual de marca"
      },
      {
        "value": "unsure",
        "label": "No estoy seguro"
      }
    ],
    "budget": [
      {
        "value": "under500",
        "label": "Menos de 500"
      },
      {
        "value": "500to1000",
        "label": "500 a 1,000"
      },
      {
        "value": "1000to2500",
        "label": "1,000 a 2,500"
      },
      {
        "value": "over2500",
        "label": "Más de 2,500"
      },
      {
        "value": "unknown",
        "label": "Aún no lo sé"
      }
    ],
    "labels": {
      "businessOther": "Cuéntanos qué hace tu negocio",
      "name": "Nombre",
      "contact": "WhatsApp o correo",
      "contactHint": "Escribe al menos un medio de contacto válido.",
      "message": "Mensaje (opcional)",
      "messageHint": "Máximo 500 caracteres."
    },
    "consentPrefix": "Autorizo al equipo de VIRAND a usar la información que envío para responder mi consulta, coordinar una llamada, medir y mejorar el sitio y contactarme sobre sus servicios, según la ",
    "consentLink": "política de privacidad",
    "consentNote": "Puedes solicitar la corrección o eliminación de tus datos escribiendo a contacto@virand.co.",
    "error": "Revisa los campos indicados.",
    "errors": {
      "required": "Este campo es obligatorio.",
      "too_short": "Este texto es demasiado corto.",
      "too_long": "Este texto es demasiado largo.",
      "invalid": "Revisa este campo.",
      "contact": "Escribe un correo o un número de WhatsApp válido.",
      "consent": "Debes aceptar para enviar."
    },
    "formErrors": {
      "unavailable": "No pudimos enviar tu mensaje en este momento. Inténtalo de nuevo más tarde.",
      "too_fast": "Espera unos segundos e inténtalo de nuevo.",
      "rate_limited": "Hiciste demasiados intentos. Inténtalo de nuevo en unos minutos.",
      "network": "No pudimos conectar. Revisa tu conexión e inténtalo de nuevo.",
      "generic": "No pudimos enviar tu mensaje. Inténtalo de nuevo."
    },
    "success": "Recibimos tu mensaje. El siguiente paso es agendar una llamada.",
    "calendar": "Agenda una llamada",
    "calendarTitle": "Agenda de VIRAND: elige un horario para la llamada",
    "calendarFallback": "Abrir la agenda en una pestaña nueva",
    "entryTitle": "También podemos empezar por una pieza.",
    "entryBody": "Una landing page o un manual de marca pueden ser un punto de entrada para tu negocio.",
    "summaryTitle": "Hola VIRAND. Este es mi proyecto:",
    "summaryLabels": {
      "business": "Negocio",
      "brand": "Marca",
      "needs": "Busco",
      "budget": "Presupuesto aproximado (USD)",
      "name": "Nombre",
      "contact": "Contacto",
      "message": "Mensaje"
    },
    "nojs": "Puedes completar los campos y enviar el formulario. También puedes escribirnos por WhatsApp."
  },
  "en": {
    "title": "Tell us about your project.",
    "intro": "First, we understand your business. Then, we define the system it needs.",
    "step": "Step",
    "of": "of",
    "next": "Continue",
    "back": "Back",
    "submit": "Send form",
    "whatsapp": "Continue on WhatsApp",
    "sending": "Sending…",
    "questions": [
      "What type of business do you have?",
      "Do you already have a brand?",
      "What are you looking for?",
      "What is your approximate budget?",
      "How can we contact you?"
    ],
    "multi": "You can select more than one option.",
    "budgetHint": "Approximate budget in USD. This helps us guide the scope.",
    "business": [
      {
        "value": "retail",
        "label": "Retail or store"
      },
      {
        "value": "restaurant",
        "label": "Restaurant or food business"
      },
      {
        "value": "appointments",
        "label": "Appointment-based services (clinic, aesthetics, tattoos or others)"
      },
      {
        "value": "services",
        "label": "Service company"
      },
      {
        "value": "other",
        "label": "Other"
      }
    ],
    "brand": [
      {
        "value": "manual",
        "label": "Yes, with a brand manual"
      },
      {
        "value": "logo",
        "label": "I have a logo, but no manual"
      },
      {
        "value": "none",
        "label": "I do not have a brand yet"
      }
    ],
    "needs": [
      {
        "value": "signature",
        "label": "Signature System"
      },
      {
        "value": "landing",
        "label": "Landing page"
      },
      {
        "value": "agent",
        "label": "WhatsApp customer service agent"
      },
      {
        "value": "custom",
        "label": "Custom software or automation"
      },
      {
        "value": "website",
        "label": "Complete website"
      },
      {
        "value": "content",
        "label": "Content or ads"
      },
      {
        "value": "branding",
        "label": "Branding or brand manual"
      },
      {
        "value": "unsure",
        "label": "I am not sure"
      }
    ],
    "budget": [
      {
        "value": "under500",
        "label": "Less than 500"
      },
      {
        "value": "500to1000",
        "label": "500 to 1,000"
      },
      {
        "value": "1000to2500",
        "label": "1,000 to 2,500"
      },
      {
        "value": "over2500",
        "label": "More than 2,500"
      },
      {
        "value": "unknown",
        "label": "I do not know yet"
      }
    ],
    "labels": {
      "businessOther": "Tell us what your business does",
      "name": "Name",
      "contact": "WhatsApp or email",
      "contactHint": "Enter at least one valid contact method.",
      "message": "Message (optional)",
      "messageHint": "Maximum 500 characters."
    },
    "consentPrefix": "I agree that the VIRAND team may use the information I send to reply to my inquiry, schedule a call, measure and improve the site, and follow up about its services, as described in the ",
    "consentLink": "Privacy Policy",
    "consentNote": "You can request correction or deletion of your data by writing to contacto@virand.co.",
    "error": "Please check the highlighted fields.",
    "errors": {
      "required": "This field is required.",
      "too_short": "This is too short.",
      "too_long": "This is too long.",
      "invalid": "Please check this field.",
      "contact": "Enter a valid email or WhatsApp number.",
      "consent": "You must accept to send."
    },
    "formErrors": {
      "unavailable": "We couldn't send your message right now. Please try again later.",
      "too_fast": "Wait a few seconds and try again.",
      "rate_limited": "Too many attempts. Please try again in a few minutes.",
      "network": "We couldn't connect. Check your connection and try again.",
      "generic": "We couldn't send your message. Please try again."
    },
    "success": "We received your message. The next step is to schedule a call.",
    "calendar": "Schedule a call",
    "calendarTitle": "VIRAND booking calendar: choose a time for your call",
    "calendarFallback": "Open the calendar in a new tab",
    "entryTitle": "We can also start with one piece.",
    "entryBody": "A landing page or a brand manual can be a starting point for your business.",
    "summaryTitle": "Hi VIRAND. Here is my project:",
    "summaryLabels": {
      "business": "Business",
      "brand": "Brand",
      "needs": "Looking for",
      "budget": "Approximate budget (USD)",
      "name": "Name",
      "contact": "Contact",
      "message": "Message"
    },
    "nojs": "You can fill in the fields and submit the form. You can also contact us on WhatsApp."
  }
} as const;