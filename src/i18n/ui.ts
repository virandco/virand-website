// Translation dictionary.
// Keys are grouped by section. `es` is the source of truth; `en` mirrors its keys.
// A few values carry inline <strong> for same-family emphasis; those are
// rendered with set:html and are noted at their key.

export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export const defaultLang = 'es';

export type Lang = keyof typeof languages;

export const ui = {
  es: {
    'meta.title': 'VIRAND | Build Perception',
    'meta.description':
      'Estudio creativo. Construimos percepción con sistemas de contenido, identidad de marca y dirección creativa.',

    'a11y.skip': 'Saltar al contenido',
    'a11y.themeToggle': 'Cambiar entre modo claro y oscuro',
    'a11y.langToggle': 'Cambiar idioma',
    'a11y.home': 'VIRAND, inicio',

    'nav.cta': 'Hablemos',
    'nav.sections': 'Secciones',

    'hero.eyebrow': 'Estudio creativo',
    'hero.headline': 'Build Perception',
    'hero.phrase':
      'Sistemas creativos de contenido, identidad y dirección de arte para marcas que deciden cómo se les percibe.',
    'hero.imageAlt':
      'Fachada de concreto de noche con el símbolo de VIRAND iluminado sobre un muro rojo.',
    'hero.imageAltLight':
      'Formas curvas de concreto blanco que evocan el símbolo de VIRAND.',

    'manifesto.heading': 'Un estudio, no una agencia.',
    // contains <strong>
    'manifesto.body1':
      'Una agencia vende horas y entregables sueltos. Nosotros diseñamos <strong>un sistema</strong>: cómo suena tu marca, cómo se ve y qué deja en la mente de quien la encuentra.',
    // contains <strong>
    'manifesto.body2':
      'Trabajamos con <strong>dirección y criterio estético</strong>, no con plantillas. Cada pieza construye la misma percepción, sin ruido y sin relleno.',

    'motion.tagline': 'Systems in Motion',
    'motion.caption': 'La marca en movimiento.',
    'motion.videoLabel': 'Animación del símbolo de VIRAND.',

    'work.heading': 'Cómo trabajamos',
    'work.intro': 'Todo lo que hacemos mueve a la marca por tres momentos.',
    'work.s1.name': 'Atención',
    'work.s1.body': 'Que te encuentren y se detengan. Contenido con criterio, no ruido.',
    'work.s2.name': 'Nutrición',
    'work.s2.body': 'Que te entiendan y confíen. Una presencia constante y coherente.',
    'work.s3.name': 'Conversión',
    'work.s3.body': 'Que den el paso. Del interés a la conversación.',

    'services.heading': 'Servicios',
    'services.intro': 'Cuatro frentes que se arman juntos o por separado.',
    'services.s1.name': 'Content System',
    'services.s1.body':
      'Un sistema de contenido que trabaja: formatos, calendario y narrativa para atención, nutrición y conversión.',
    'services.s2.name': 'Brand Identity',
    'services.s2.body':
      'Identidad visual y verbal. Logo, sistema tipográfico, color y las reglas que lo mantienen coherente.',
    'services.s3.name': 'Creative Direction',
    'services.s3.body':
      'Dirección de arte y posicionamiento. La estética y el criterio detrás de cada pieza.',
    'services.s4.name': 'AI Content',
    'services.s4.body':
      'Paquetes de contenido producido con inteligencia artificial. Volumen y velocidad, con criterio y dirección humana en cada pieza.',

    'audience.heading': 'A quién servimos',
    'audience.a1.name': 'Marcas y negocios modernos',
    'audience.a1.body':
      'Empresas que ya se mueven en digital y quieren verse a la altura de lo que ofrecen.',
    'audience.a2.name': 'Artistas y marcas personales',
    'audience.a2.body': 'Creadores que necesitan una identidad tan fuerte como su trabajo.',
    'audience.a3.name': 'Negocios tradicionales',
    'audience.a3.body':
      'Negocios con oficio y trayectoria que todavía no se traduce a lo digital.',

    'process.heading': 'Proceso',
    'process.p1.name': 'Diagnóstico',
    'process.p1.body':
      'Miramos la marca, el mercado y lo que ya existe. Definimos a dónde vamos.',
    'process.p2.name': 'Sistema',
    'process.p2.body':
      'Construimos las reglas: identidad, narrativa y formatos que se van a repetir.',
    'process.p3.name': 'Producción',
    'process.p3.body':
      'Ejecutamos las piezas con dirección, sin perder el estándar entre una y otra.',
    'process.p4.name': 'Iteración',
    'process.p4.body':
      'Medimos, ajustamos y volvemos a empezar. El sistema mejora con el tiempo.',
    'process.loop': 'y vuelve a empezar',

    'contact.heading': 'Construyamos cómo te perciben.',
    'contact.body': 'Cuéntanos qué marca estás construyendo. Respondemos por WhatsApp.',

    'footer.tagline': 'Build Perception',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.contact': 'Hablemos',
  },
  en: {
    'meta.title': 'VIRAND | Build Perception',
    'meta.description':
      'Creative studio. We build perception through content systems, brand identity and creative direction.',

    'a11y.skip': 'Skip to content',
    'a11y.themeToggle': 'Toggle light and dark mode',
    'a11y.langToggle': 'Change language',
    'a11y.home': 'VIRAND, home',

    'nav.cta': "Let's talk",
    'nav.sections': 'Sections',

    'hero.eyebrow': 'Creative studio',
    'hero.headline': 'Build Perception',
    'hero.phrase':
      'Creative systems for content, identity and art direction, for brands that decide how they are perceived.',
    'hero.imageAlt':
      'Concrete facade at night with the VIRAND symbol lit on a red wall.',
    'hero.imageAltLight':
      'White curved concrete forms echoing the VIRAND symbol.',

    'manifesto.heading': 'A studio, not an agency.',
    // contains <strong>
    'manifesto.body1':
      'An agency sells hours and loose deliverables. We design <strong>a system</strong>: how your brand sounds, how it looks and what it leaves in the mind of whoever finds it.',
    // contains <strong>
    'manifesto.body2':
      'We work with <strong>direction and taste</strong>, not templates. Every piece builds the same perception, with no noise and no filler.',

    'motion.tagline': 'Systems in Motion',
    'motion.caption': 'The brand in motion.',
    'motion.videoLabel': 'VIRAND symbol animation.',

    'work.heading': 'How we work',
    'work.intro': 'Everything we make moves the brand through three moments.',
    'work.s1.name': 'Attention',
    'work.s1.body': 'Get found and make people stop. Content with intent, not noise.',
    'work.s2.name': 'Nurture',
    'work.s2.body': 'Get understood and trusted. A constant, coherent presence.',
    'work.s3.name': 'Conversion',
    'work.s3.body': 'Get the step taken. From interest to a conversation.',

    'services.heading': 'Services',
    'services.intro': 'Four fronts, built together or on their own.',
    'services.s1.name': 'Content System',
    'services.s1.body':
      'A content system that works: formats, calendar and narrative for attention, nurture and conversion.',
    'services.s2.name': 'Brand Identity',
    'services.s2.body':
      'Visual and verbal identity. Logo, type system, color and the rules that keep it coherent.',
    'services.s3.name': 'Creative Direction',
    'services.s3.body':
      'Art direction and positioning. The aesthetic and the judgment behind every piece.',
    'services.s4.name': 'AI Content',
    'services.s4.body':
      'Content packages produced with artificial intelligence. Volume and speed, with human judgment and direction on every piece.',

    'audience.heading': 'Who we serve',
    'audience.a1.name': 'Modern brands and businesses',
    'audience.a1.body':
      'Companies already moving in digital that want to look the part.',
    'audience.a2.name': 'Artists and personal brands',
    'audience.a2.body': 'Creators who need an identity as strong as their work.',
    'audience.a3.name': 'Traditional businesses',
    'audience.a3.body':
      "Businesses with craft and history that hasn't reached digital yet.",

    'process.heading': 'Process',
    'process.p1.name': 'Diagnosis',
    'process.p1.body':
      "We look at the brand, the market and what already exists. We define where we're going.",
    'process.p2.name': 'System',
    'process.p2.body':
      'We build the rules: identity, narrative and formats that will repeat.',
    'process.p3.name': 'Production',
    'process.p3.body':
      'We produce the pieces with direction, holding the standard from one to the next.',
    'process.p4.name': 'Iteration',
    'process.p4.body':
      'We measure, adjust and start again. The system gets better over time.',
    'process.loop': 'and it starts again',

    'contact.heading': "Let's build how you're perceived.",
    'contact.body': "Tell us what brand you're building. We reply on WhatsApp.",

    'footer.tagline': 'Build Perception',
    'footer.rights': 'All rights reserved.',
    'footer.contact': "Let's talk",
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
