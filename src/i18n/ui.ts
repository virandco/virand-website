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
    "nojs": "Si no puedes usar el cuestionario, escríbenos por WhatsApp."
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
    "nojs": "If you cannot use the questionnaire, contact us on WhatsApp."
  }
} as const;

export const round2LegalCopy = {
  "es": {
    "privacy": {
      "title": "Política de privacidad",
      "notice": "Última actualización: noviembre de 2026. Versión 1.0.",
      "sections": [
        {
          "title": "Responsable",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "Andrés Virgües Fajardo, persona natural y titular de la marca VIRAND, es el responsable del tratamiento de los datos descritos aquí. VIRAND es una marca, no una empresa constituida."
            },
            {
              "kind": "paragraph",
              "html": "El canal de contacto y para ejercer tus derechos es <a href=\"mailto:contacto@virand.co\">contacto@virand.co</a>."
            }
          ]
        },
        {
          "title": "Datos que recibimos",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "Al enviar el formulario recibimos tu nombre, tipo de negocio, estado de la marca, servicios de interés, presupuesto aproximado, WhatsApp o correo, tu mensaje y la indicación de consentimiento. El formulario también envía el idioma y datos técnicos para prevenir envíos automatizados."
            },
            {
              "kind": "paragraph",
              "html": "El servidor utiliza la dirección IP y datos temporales de la solicitud para limitar abusos. Los contadores de límite de envíos son temporales y se mantienen en memoria."
            },
            {
              "kind": "paragraph",
              "html": "Si escribes por correo o WhatsApp, recibimos los datos de contacto y el contenido que decidas compartir en esa conversación."
            }
          ]
        },
        {
          "title": "Finalidad y autorización",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "Usamos los datos para atender tu solicitud, entender el proyecto, responder por el canal de contacto facilitado, coordinar una llamada, contactarte sobre nuestros servicios, gestionar la relación comercial y medir y mejorar el sitio (ver «Analítica del sitio»). La reserva de una llamada se ofrece después de enviar el formulario."
            },
            {
              "kind": "paragraph",
              "html": "El formulario requiere que marques la autorización de tratamiento antes de enviarlo. También puedes contactar por <a href=\"mailto:contacto@virand.co\">contacto@virand.co</a>."
            }
          ]
        },
        {
          "title": "Formulario y proveedores",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "El formulario se envía a la ruta de servidor del sitio. Tras validarlo, los datos y la indicación de consentimiento se envían a Resend, proveedor de correo en EE. UU., que entrega el mensaje a <a href=\"mailto:contacto@virand.co\">contacto@virand.co</a>."
            },
            {
              "kind": "paragraph",
              "html": "Vercel, proveedor de alojamiento de EE. UU., aloja el sitio y ejecuta la ruta del formulario. El sitio no guarda las solicitudes en una base de datos propia ni tiene un agente de atención conectado en esta fase."
            },
            {
              "kind": "paragraph",
              "html": "El mensaje queda en el correo de contacto y se atiende mediante ese canal. Resend y Vercel intervienen en la transmisión y el alojamiento según sus propios servicios y políticas."
            }
          ]
        },
        {
          "title": "Analítica del sitio",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "El servicio de analítica del sitio es Umami Cloud, operado por Umami Software, Inc. Cuando está activado, el sitio mide visitas, clics en botones, inicio y finalización del cuestionario, envío del formulario y visualización de la agenda como eventos. Solo se envían categorías fijas, sin respuestas del cuestionario, nombre, contacto ni contenido del mensaje."
            },
            {
              "kind": "paragraph",
              "html": "El sitio no está configurado para instalar cookies de analítica. Según la <a href=\"https://umami.is/docs/faq\">documentación de Umami</a>, su rastreador no requiere cookies."
            },
            {
              "kind": "paragraph",
              "html": "Según la <a href=\"https://umami.is/privacy\">política de Umami</a>, el proveedor procesa brevemente datos técnicos de conexión, como la IP, para entregar solicitudes, calcular identificadores de visitante y estimar la ubicación aproximada. La IP no se guarda como campo de los registros de analítica estándar. La misma política distingue esos registros de los registros operativos y de seguridad, que pueden incluir direcciones IP."
            },
            {
              "kind": "paragraph",
              "html": "El sitio respeta la señal Do Not Track del navegador para desactivar el seguimiento de Umami cuando el navegador comunica esa preferencia. Esto no equivale a impedir todas las solicitudes HTTP ni los registros técnicos de los proveedores."
            }
          ]
        },
        {
          "title": "Preferencia de tema y reserva",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "El código propio del sitio solo guarda en el navegador la preferencia de tema claro u oscuro, mediante localStorage con la clave virand-theme. No escribe cookies propias ni usa sessionStorage."
            },
            {
              "kind": "paragraph",
              "html": "Después de enviar el formulario, la opción de reserva puede mostrar una agenda incrustada de Google Calendar cuando esté habilitada. Al cargar la agenda, Google puede usar sus propias cookies y tratar datos de conexión. El sitio no controla esas cookies. Consulta las <a href=\"https://policies.google.com/privacy\">políticas de Google</a> y la <a href=\"/cookies/\">política de cookies del sitio</a>."
            }
          ]
        },
        {
          "title": "Proveedores y visitantes de otros países",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "El alojamiento y el envío de correo utilizan los servicios de Vercel y Resend descritos, proveedores de EE. UU. Umami Cloud es el servicio de analítica descrito en esta política. Estos servicios pueden implicar tratamiento de información fuera de Colombia o de tu país de residencia."
            },
            {
              "kind": "paragraph",
              "html": "Si visitas el sitio desde otro país, tu solicitud se trata mediante el mismo flujo. Las políticas de los proveedores explican sus propios tratamientos: <a href=\"https://resend.com/legal/privacy-policy\">Resend</a>, <a href=\"https://vercel.com/legal/privacy-policy\">Vercel</a> y <a href=\"https://umami.is/privacy\">Umami</a>."
            }
          ]
        },
        {
          "title": "Conservación",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "Conservamos los datos mientras sean necesarios para atender la solicitud y la relación comercial, y hasta que el titular pida su eliminación. Si solicitas eliminarlos, revisamos si existe una obligación legal que exija conservar alguna información y te explicamos lo que corresponda."
            }
          ]
        },
        {
          "title": "Derechos y contacto",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "Puedes solicitar acceso, actualización o corrección de tus datos, información sobre su uso, prueba de la autorización, y la eliminación o revocación del consentimiento cuando corresponda conforme a la ley."
            },
            {
              "kind": "paragraph",
              "html": "Escribe a <a href=\"mailto:contacto@virand.co\">contacto@virand.co</a> e indica qué solicitud quieres realizar. Si hace falta verificar tu identidad para atenderla, se te pedirá la información necesaria por ese canal, sin publicarla en el sitio."
            }
          ]
        },
        {
          "title": "Marco y cambios",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "Esta política toma como referencia la Ley 1581 de 2012 y las normas que la reglamentan en Colombia."
            },
            {
              "kind": "paragraph",
              "html": "Los cambios en este texto se publicarán en esta página con su fecha y versión."
            }
          ]
        }
      ],
      "description": "Conoce qué datos recibe VIRAND, cómo se usan en el formulario, qué proveedores intervienen y cómo ejercer tus derechos de privacidad."
    },
    "terms": {
      "title": "Términos de uso",
      "notice": "Última actualización: noviembre de 2026. Versión 1.0.",
      "sections": [
        {
          "title": "Responsable y contacto",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "El sitio es operado por Andrés Virgües Fajardo, persona natural y titular de la marca VIRAND. VIRAND es una marca, no una empresa constituida. Contacto: <a href=\"mailto:contacto@virand.co\">contacto@virand.co</a>."
            }
          ]
        },
        {
          "title": "Uso informativo del sitio",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "El sitio presenta servicios y permite enviar consultas sobre proyectos. Su contenido es informativo; enviar el formulario no constituye por sí solo un acuerdo de prestación de servicios."
            }
          ]
        },
        {
          "title": "Servicios y acuerdo aparte",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "Cada servicio se rige por un acuerdo aparte entre el cliente y Andrés Virgües Fajardo. El alcance, los entregables y las condiciones de ejecución se confirman en ese acuerdo antes de empezar."
            }
          ]
        },
        {
          "title": "Marca y contenido",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "La marca VIRAND, su logotipo y la firma Build Perception pertenecen a Andrés Virgües Fajardo. El contenido del sitio pertenece a su titular o a los terceros que correspondan."
            },
            {
              "kind": "paragraph",
              "html": "La publicación de ese contenido no concede por sí sola permiso para reutilizarlo, sin perjuicio de los usos permitidos por la ley."
            }
          ]
        },
        {
          "title": "Resultados y responsabilidad",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "No se garantizan ventas, tráfico, conversiones ni otros resultados concretos derivados de los servicios descritos. Los resultados dependen de factores que pueden quedar fuera del alcance acordado."
            },
            {
              "kind": "paragraph",
              "html": "El funcionamiento del sitio y de servicios externos puede verse afectado por interrupciones o cambios de esos proveedores. Esto no excluye de forma absoluta la responsabilidad que corresponda conforme a la ley ni limita derechos que no puedan renunciarse."
            }
          ]
        },
        {
          "title": "Datos y servicios externos",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "El tratamiento de la información enviada se describe en la <a href=\"/privacidad/\">política de privacidad</a>. La preferencia de tema, la analítica y la posible agenda de Google se explican en la <a href=\"/cookies/\">política de cookies</a>."
            }
          ]
        },
        {
          "title": "Ley aplicable y cambios",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "Estos términos se interpretan conforme a la ley de Colombia."
            },
            {
              "kind": "paragraph",
              "html": "Las actualizaciones de este texto se publicarán en esta página con su fecha y versión."
            }
          ]
        }
      ],
      "description": "Consulta las condiciones de uso del sitio VIRAND, la titularidad de la marca, los acuerdos de servicios y los límites de responsabilidad."
    },
    "cookies": {
      "title": "Política de cookies",
      "notice": "Última actualización: noviembre de 2026. Versión 1.0.",
      "sections": [
        {
          "title": "Responsable y contacto",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "Andrés Virgües Fajardo, persona natural y titular de la marca VIRAND, opera este sitio. VIRAND es una marca, no una empresa constituida. Contacto: <a href=\"mailto:contacto@virand.co\">contacto@virand.co</a>."
            }
          ]
        },
        {
          "title": "Preferencia de tema",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "El código propio del sitio guarda únicamente tu elección de tema claro u oscuro en localStorage con la clave virand-theme. Esa preferencia permite mantener el tema en las siguientes visitas."
            },
            {
              "kind": "paragraph",
              "html": "El código propio no escribe cookies ni utiliza sessionStorage. Puedes borrar la preferencia desde los ajustes de almacenamiento de tu navegador; al hacerlo, el sitio vuelve a su tema predeterminado."
            }
          ]
        },
        {
          "title": "Umami Cloud",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "El servicio de analítica del sitio es Umami Cloud, operado por Umami Software, Inc. Cuando está activado, el sitio mide visitas, clics en botones, inicio y finalización del cuestionario, envío del formulario y visualización de la agenda como eventos. Solo se envían categorías fijas, sin respuestas del cuestionario, nombre, contacto ni contenido del mensaje."
            },
            {
              "kind": "paragraph",
              "html": "El sitio no está configurado para instalar cookies de analítica. Según la <a href=\"https://umami.is/docs/faq\">documentación de Umami</a>, su rastreador no requiere cookies."
            },
            {
              "kind": "paragraph",
              "html": "Según la <a href=\"https://umami.is/privacy\">política de Umami</a>, el proveedor procesa brevemente datos técnicos de conexión, como la IP, para entregar solicitudes, calcular identificadores de visitante y estimar la ubicación aproximada. La IP no se guarda como campo de los registros de analítica estándar. La misma política distingue esos registros de los registros operativos y de seguridad, que pueden incluir direcciones IP."
            },
            {
              "kind": "paragraph",
              "html": "El sitio respeta la señal Do Not Track del navegador para desactivar el seguimiento de Umami cuando el navegador comunica esa preferencia. Esto no equivale a impedir todas las solicitudes HTTP ni los registros técnicos de los proveedores."
            }
          ]
        },
        {
          "title": "Google Calendar después del formulario",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "Después de enviar el formulario, la opción de reserva puede mostrar una agenda incrustada de Google Calendar cuando esté habilitada. Esa agenda es un servicio externo."
            },
            {
              "kind": "paragraph",
              "html": "Cuando se carga, Google puede usar sus propias cookies y tratar datos de conexión según sus políticas. El sitio no controla esas cookies. Consulta <a href=\"https://policies.google.com/technologies/cookies\">cómo usa Google las cookies</a> y sus <a href=\"https://policies.google.com/privacy\">políticas de privacidad</a>."
            }
          ]
        },
        {
          "title": "Tus opciones e información adicional",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "Puedes revisar o borrar el almacenamiento y gestionar las cookies de terceros mediante las opciones de tu navegador. Las restricciones que establezcas pueden afectar a funciones de la agenda de Google."
            },
            {
              "kind": "paragraph",
              "html": "La información sobre el formulario, los proveedores y tus derechos está en la <a href=\"/privacidad/\">política de privacidad</a>. Para consultas, escribe a <a href=\"mailto:contacto@virand.co\">contacto@virand.co</a>."
            }
          ]
        },
        {
          "title": "Cambios",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "Si cambian las herramientas o el almacenamiento utilizados por el sitio, este texto se actualizará con su fecha y versión."
            }
          ]
        }
      ],
      "description": "Consulta la preferencia de tema, la analítica con Umami Cloud y Do Not Track, y las posibles cookies de la agenda de Google Calendar."
    }
  },
  "en": {
    "privacy": {
      "title": "Privacy Policy",
      "notice": "Last updated: November 2026. Version 1.0.",
      "sections": [
        {
          "title": "Controller",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "Andrés Virgües Fajardo, an individual and the owner of the VIRAND brand, is responsible for the data processing described here. VIRAND is a brand, not an incorporated company."
            },
            {
              "kind": "paragraph",
              "html": "The contact channel for questions and exercising your rights is <a href=\"mailto:contacto@virand.co\">contacto@virand.co</a>."
            }
          ]
        },
        {
          "title": "Data we receive",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "When you submit the form, we receive your name, business type, brand status, services of interest, approximate budget, WhatsApp number or email, your message and the indication of consent. The form also sends the language and technical data to help prevent automated submissions."
            },
            {
              "kind": "paragraph",
              "html": "The server uses the IP address and temporary request data to limit abuse. Submission limit counters are temporary and held in memory."
            },
            {
              "kind": "paragraph",
              "html": "If you contact us by email or WhatsApp, we receive the contact details and content you choose to share in that conversation."
            }
          ]
        },
        {
          "title": "Purpose and authorization",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "We use the data to handle your request, understand the project, respond through the contact channel you provided, schedule a call, follow up with you about our services, manage the commercial relationship and measure and improve the site (see “Site analytics”). Call booking is offered after form submission."
            },
            {
              "kind": "paragraph",
              "html": "The form requires you to select the data processing authorization before submitting it. You may also contact <a href=\"mailto:contacto@virand.co\">contacto@virand.co</a>."
            }
          ]
        },
        {
          "title": "Form and providers",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "The form is sent to the site’s server route. After validation, the data and indication of consent are sent to Resend, an email provider in the US, which delivers the message to <a href=\"mailto:contacto@virand.co\">contacto@virand.co</a>."
            },
            {
              "kind": "paragraph",
              "html": "Vercel, a hosting provider in the US, hosts the site and runs the form route. At this stage, the site does not store requests in its own database or have a connected customer service agent."
            },
            {
              "kind": "paragraph",
              "html": "The message remains in the contact inbox and is handled through that channel. Resend and Vercel are involved in transmission and hosting under their own services and policies."
            }
          ]
        },
        {
          "title": "Site analytics",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "The site’s analytics service is Umami Cloud, operated by Umami Software, Inc. When enabled, the site measures visits, button clicks, questionnaire starts and completions, form submissions and calendar views as events. Only fixed categories are sent, without questionnaire answers, names, contact details or message content."
            },
            {
              "kind": "paragraph",
              "html": "The site is not configured to install analytics cookies. According to <a href=\"https://umami.is/docs/faq\">Umami’s documentation</a>, its tracker does not require cookies."
            },
            {
              "kind": "paragraph",
              "html": "According to <a href=\"https://umami.is/privacy\">Umami’s policy</a>, the provider briefly processes technical connection data, such as IP addresses, to deliver requests, calculate visitor identifiers and estimate approximate location. IP addresses are not stored as fields in standard analytics records. The same policy distinguishes those records from operational and security logs, which may include IP addresses."
            },
            {
              "kind": "paragraph",
              "html": "The site respects the browser’s Do Not Track signal by disabling Umami tracking when the browser communicates that preference. This does not mean preventing all HTTP requests or providers’ technical logs."
            }
          ]
        },
        {
          "title": "Theme preference and booking",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "The site’s own code stores only the light or dark theme preference in the browser, using localStorage under the virand-theme key. It does not write its own cookies or use sessionStorage."
            },
            {
              "kind": "paragraph",
              "html": "After form submission, the booking option may display an embedded Google Calendar when enabled. When the calendar loads, Google may use its own cookies and process connection data. The site does not control those cookies. See <a href=\"https://policies.google.com/privacy\">Google’s policies</a> and the <a href=\"/en/cookies/\">site’s cookie policy</a>."
            }
          ]
        },
        {
          "title": "Providers and visitors in other countries",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "Hosting and email delivery use the Vercel and Resend services described above, which are US providers. Umami Cloud is the analytics service described in this policy. These services may involve processing information outside Colombia or your country of residence."
            },
            {
              "kind": "paragraph",
              "html": "If you visit from another country, your request is handled through the same flow. The providers’ policies explain their own processing: <a href=\"https://resend.com/legal/privacy-policy\">Resend</a>, <a href=\"https://vercel.com/legal/privacy-policy\">Vercel</a> and <a href=\"https://umami.is/privacy\">Umami</a>."
            }
          ]
        },
        {
          "title": "Retention",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "We retain the data while it is needed to handle the request and the commercial relationship, and until the data subject requests deletion. If you request deletion, we check whether a legal obligation requires any information to be kept and explain what applies."
            }
          ]
        },
        {
          "title": "Rights and contact",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "You may request access to, updates or corrections to your data, information about its use, proof of authorization, and deletion or withdrawal of consent where applicable under the law."
            },
            {
              "kind": "paragraph",
              "html": "Write to <a href=\"mailto:contacto@virand.co\">contacto@virand.co</a> and explain your request. If identity verification is needed to handle it, the necessary information will be requested through that channel, without publishing it on the site."
            }
          ]
        },
        {
          "title": "Framework and changes",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "This policy refers to Colombian Law 1581 of 2012 and its implementing regulations."
            },
            {
              "kind": "paragraph",
              "html": "Changes to this text will be published on this page with their date and version."
            }
          ]
        }
      ],
      "description": "Learn what data VIRAND receives, how the project form uses it, which providers are involved and how to exercise your privacy rights."
    },
    "terms": {
      "title": "Terms of Use",
      "notice": "Last updated: November 2026. Version 1.0.",
      "sections": [
        {
          "title": "Operator and contact",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "The site is operated by Andrés Virgües Fajardo, an individual and the owner of the VIRAND brand. VIRAND is a brand, not an incorporated company. Contact: <a href=\"mailto:contacto@virand.co\">contacto@virand.co</a>."
            }
          ]
        },
        {
          "title": "Informational use of the site",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "The site presents services and lets you send project inquiries. Its content is informational; submitting the form does not by itself create a service agreement."
            }
          ]
        },
        {
          "title": "Services and separate agreement",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "Each service is governed by a separate agreement between the client and Andrés Virgües Fajardo. Scope, deliverables and implementation terms are confirmed in that agreement before work starts."
            }
          ]
        },
        {
          "title": "Brand and content",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "The VIRAND brand, its logo and the Build Perception signature belong to Andrés Virgües Fajardo. Site content belongs to its owner or the relevant third parties."
            },
            {
              "kind": "paragraph",
              "html": "Publishing that content does not by itself grant permission to reuse it, without prejudice to uses permitted by law."
            }
          ]
        },
        {
          "title": "Results and responsibility",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "No specific sales, traffic, conversions or other results are guaranteed from the services described. Results depend on factors that may fall outside the agreed scope."
            },
            {
              "kind": "paragraph",
              "html": "The operation of the site and external services may be affected by interruptions or changes by those providers. This does not absolutely exclude liability that applies under the law or limit rights that cannot be waived."
            }
          ]
        },
        {
          "title": "Data and external services",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "The processing of submitted information is described in the <a href=\"/en/privacy/\">Privacy Policy</a>. Theme preference, analytics and the possible Google calendar are explained in the <a href=\"/en/cookies/\">Cookie Policy</a>."
            }
          ]
        },
        {
          "title": "Applicable law and changes",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "These terms are interpreted under Colombian law."
            },
            {
              "kind": "paragraph",
              "html": "Updates to this text will be published on this page with their date and version."
            }
          ]
        }
      ],
      "description": "Read the terms for using the VIRAND website, including brand and content ownership, separate service agreements and responsibility."
    },
    "cookies": {
      "title": "Cookie Policy",
      "notice": "Last updated: November 2026. Version 1.0.",
      "sections": [
        {
          "title": "Operator and contact",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "Andrés Virgües Fajardo, an individual and the owner of the VIRAND brand, operates this site. VIRAND is a brand, not an incorporated company. Contact: <a href=\"mailto:contacto@virand.co\">contacto@virand.co</a>."
            }
          ]
        },
        {
          "title": "Theme preference",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "The site’s own code stores only your choice of light or dark theme in localStorage under the virand-theme key. This preference keeps the selected theme for later visits."
            },
            {
              "kind": "paragraph",
              "html": "The site’s own code does not write cookies or use sessionStorage. You can remove the preference through your browser’s storage settings; doing so returns the site to its default theme."
            }
          ]
        },
        {
          "title": "Umami Cloud",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "The site’s analytics service is Umami Cloud, operated by Umami Software, Inc. When enabled, the site measures visits, button clicks, questionnaire starts and completions, form submissions and calendar views as events. Only fixed categories are sent, without questionnaire answers, names, contact details or message content."
            },
            {
              "kind": "paragraph",
              "html": "The site is not configured to install analytics cookies. According to <a href=\"https://umami.is/docs/faq\">Umami’s documentation</a>, its tracker does not require cookies."
            },
            {
              "kind": "paragraph",
              "html": "According to <a href=\"https://umami.is/privacy\">Umami’s policy</a>, the provider briefly processes technical connection data, such as IP addresses, to deliver requests, calculate visitor identifiers and estimate approximate location. IP addresses are not stored as fields in standard analytics records. The same policy distinguishes those records from operational and security logs, which may include IP addresses."
            },
            {
              "kind": "paragraph",
              "html": "The site respects the browser’s Do Not Track signal by disabling Umami tracking when the browser communicates that preference. This does not mean preventing all HTTP requests or providers’ technical logs."
            }
          ]
        },
        {
          "title": "Google Calendar after the form",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "After form submission, the booking option may display an embedded Google Calendar when enabled. That calendar is an external service."
            },
            {
              "kind": "paragraph",
              "html": "When it loads, Google may use its own cookies and process connection data under its policies. The site does not control those cookies. See <a href=\"https://policies.google.com/technologies/cookies\">how Google uses cookies</a> and its <a href=\"https://policies.google.com/privacy\">privacy policies</a>."
            }
          ]
        },
        {
          "title": "Your choices and further information",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "You can review or remove storage and manage third-party cookies through your browser settings. Restrictions you set may affect Google calendar functions."
            },
            {
              "kind": "paragraph",
              "html": "Information about the form, providers and your rights is in the <a href=\"/en/privacy/\">Privacy Policy</a>. For questions, write to <a href=\"mailto:contacto@virand.co\">contacto@virand.co</a>."
            }
          ]
        },
        {
          "title": "Changes",
          "blocks": [
            {
              "kind": "paragraph",
              "html": "If the tools or storage used by the site change, this text will be updated with its date and version."
            }
          ]
        }
      ],
      "description": "Read about theme storage, Umami Cloud analytics and Do Not Track, and the possible cookies used by the Google Calendar booking embed."
    }
  }
} as const;

export const round2NotFoundCopy = {
  "es": {
    "title": "Esta página no existe.",
    "notice": "",
    "sections": [
      {
        "title": "",
        "blocks": [
          {
            "kind": "paragraph",
            "html": "Vuelve al inicio o cuéntanos qué buscabas."
          },
          {
            "kind": "paragraph",
            "html": "<a href=\"/\">Ir al inicio</a>"
          },
          {
            "kind": "paragraph",
            "html": "<a href=\"/#cuestionario\">Cuéntanos tu proyecto</a>"
          }
        ]
      }
    ]
  },
  "en": {
    "title": "This page does not exist.",
    "notice": "",
    "sections": [
      {
        "title": "",
        "blocks": [
          {
            "kind": "paragraph",
            "html": "Go back to the home page or tell us what you were looking for."
          },
          {
            "kind": "paragraph",
            "html": "<a href=\"/en/\">Go to the home page</a>"
          },
          {
            "kind": "paragraph",
            "html": "<a href=\"/en/#cuestionario\">Tell us about your project</a>"
          }
        ]
      }
    ]
  }
} as const;
