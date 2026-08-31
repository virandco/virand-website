import { ui, defaultLang, type Lang, type UIKey } from './ui';

/** Read the active language from the URL (`/` = es, `/en/...` = en). */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg && seg in ui) return seg as Lang;
  return defaultLang;
}

/** Returns a `t(key)` lookup bound to a language, falling back to the default. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** The other language — for the toggle. */
export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}

/**
 * Map a path to its localized form.
 * Default locale has no prefix; `en` is served under `/en`.
 */
export function localizedPath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return clean;
  return clean === '/' ? `/${lang}/` : `/${lang}${clean}`;
}
