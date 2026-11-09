// Inline script that applies the saved theme before first paint (no flash).
//
// It lives here, as a string, so there is ONE source for its text: `Layout.astro`
// renders it inline and `astro.config.mjs` hashes this same string for the
// Content-Security-Policy. Changing the text updates both; nothing to copy by hand.
// Pure module on purpose (no imports): the Astro config loads it.
export const THEME_INIT_SCRIPT = `(function () {
  try {
    var saved = localStorage.getItem('virand-theme');
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.dataset.theme = saved;
    }
  } catch (e) {}
})();`;
