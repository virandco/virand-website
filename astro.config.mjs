// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs / OG tags. Update when the domain is final.
  site: 'https://virand.co',
  // All pages remain static; only /api/proyecto opts into server rendering.
  adapter: vercel(),
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_FROM: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },

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
