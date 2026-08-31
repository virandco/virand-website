// Site-wide constants. Single source of truth for structural data.

export const SITE = {
  name: 'VIRAND',
  domain: 'virand.co',
} as const;

/**
 * WhatsApp CTA target.
 * PROVISIONAL: no real number yet. `isProvisional` lets the button render a
 * disabled/placeholder state instead of a live link. Replace `url` and flip
 * the flag when the real line exists.
 */
export const WHATSAPP = {
  isProvisional: true,
  url: '#contacto',
  // Example of the final shape:
  // url: 'https://wa.me/57XXXXXXXXXX?text=Hola%20VIRAND',
} as const;

/** In-page nav. `id` must match a section's DOM id. */
export const NAV_ITEMS = [
  { id: 'manifiesto', label: { es: 'Manifiesto', en: 'Manifesto' } },
  { id: 'servicios', label: { es: 'Servicios', en: 'Services' } },
  { id: 'proceso', label: { es: 'Proceso', en: 'Process' } },
  { id: 'contacto', label: { es: 'Contacto', en: 'Contact' } },
] as const;
