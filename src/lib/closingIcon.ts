// Loads the v4 3D icon when its section gets near the viewport, after the page has
// loaded and the browser is idle. Reduced motion, no WebGL or `?static` keep the flat SVG.
import type { IconScene } from './icon3d/scene';

const host = document.querySelector<HTMLElement>('[data-closing-icon]');
if (host) {
  const canvas = host.querySelector('canvas')!;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const forcedStatic = new URLSearchParams(location.search).has('static');
  const root = document.documentElement;
  const theme = () => (root.dataset.theme === 'light' ? 'light' : 'dark');
  const hasGl = () => {
    try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); }
    catch { return false; }
  };
  let scene: IconScene | undefined, loading = false, near = false, failed = false, loaded = document.readyState === 'complete';
  const eligible = () => !failed && !forcedStatic && !motion.matches;
  const toStatic = () => { scene?.dispose(); scene = undefined; host.dataset.iconMode = 'static'; };
  const fail = () => { failed = true; toStatic(); };
  const idle = (fn: () => void) => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 600 }) : setTimeout(fn, 50));

  const boot = async () => {
    if (scene || loading || !eligible() || !near || !loaded) return;
    if (!hasGl()) return fail();
    loading = true;
    try {
      const { createIcon } = await import('./icon3d/scene.js');
      if (!eligible()) return;
      scene = await createIcon({ canvas, theme: theme() });
      scene.setActive(!document.hidden);
      host.dataset.iconMode = '3d';
    } catch { fail(); }
    finally { loading = false; }
  };
  const update = () => {
    if (!eligible()) return toStatic();
    if (scene) return scene.setActive(!document.hidden);
    idle(() => void boot());
  };

  if (!loaded) addEventListener('load', () => { loaded = true; update(); }, { once: true });
  canvas.addEventListener('webglcontextlost', (event) => { event.preventDefault(); fail(); });
  const observer = new IntersectionObserver(([entry]) => { near = entry.isIntersecting; update(); }, { rootMargin: '50% 0px' });
  observer.observe(host);
  motion.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
  window.addEventListener('pagehide', () => {
    observer.disconnect(); scene?.dispose();
    motion.removeEventListener('change', update);
    document.removeEventListener('visibilitychange', update);
  }, { once: true });
}
