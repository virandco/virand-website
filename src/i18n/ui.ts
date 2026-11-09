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
