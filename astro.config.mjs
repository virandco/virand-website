// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs / OG tags. Update when the domain is final.
  site: 'https://virand.co',

  // Single page in two languages: `/` (es) and `/en/` (en).
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [icon()],

  vite: {
    plugins: [tailwindcss()],
  },
});
