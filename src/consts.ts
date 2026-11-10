export const SITE = { name: 'VIRAND', domain: 'virand.co' } as const;
export const WHATSAPP_NUMBER = '573228802540';
export const WHATSAPP = { isProvisional: false, url: 'https://wa.me/573228802540' } as const;
export const CONTACT_EMAIL = 'contacto@virand.co';
export const SOCIAL = [
  { id: 'instagram', label: 'Instagram', icon: 'ph:instagram-logo', url: 'https://www.instagram.com/virand.co/' },
  { id: 'facebook', label: 'Facebook', icon: 'ph:facebook-logo', url: 'https://www.facebook.com/profile.php?id=61594997916698' },
] as const;
export const UMAMI_WEBSITE_ID = '7acebee5-620e-4e8d-a055-22f025bc3018';
export const CALENDAR_BOOKING_URL = 'https://calendar.app.google/Uxfopn8jZcti3CKs7';
export const CALENDAR_EMBED_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0VdipIduBeeh9cx7VfxPLSBrwpSQxmDPODKbOeXyRjN0z7u5IQA7v4KOUUpZSajXzN3hni26qP?gv=true';
export const ROUTES = {
  home: { es: '/', en: '/' },
  privacy: { es: '/privacidad', en: '/privacy' },
  terms: { es: '/terminos', en: '/terms' },
  cookies: { es: '/cookies', en: '/cookies' },
  notFound: { es: '/404', en: '/404' },
} as const;
export type RouteKey = keyof typeof ROUTES;
export const NOINDEX_ROUTES: readonly RouteKey[] = ['privacy', 'terms', 'cookies', 'notFound'];
export const NAV_ITEMS = [
  { id: 'signature', label: { es: 'Signature System', en: 'Signature System' } },
  { id: 'proceso', label: { es: 'Proceso', en: 'Process' } },
  { id: 'a-medida', label: { es: 'A medida', en: 'Custom work' } },
  { id: 'faq', label: { es: 'FAQ', en: 'FAQ' } },
] as const;
