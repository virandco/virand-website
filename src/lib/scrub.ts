// Scroll-linked video. Each clip runs one rAF loop only while its section is on
// screen (IntersectionObserver), reads its own box and eases the video toward the
// matching frame. No scroll listener, no autoplay, no layout-changing animation.
//
// pin   = sticky stage; progress runs while the stage is pinned.
// pass  = a band crossing the viewport, from entering at the bottom to leaving at the top.
// lead  = sticky stage that already plays while it scrolls in (box): entering → pin end.
// trail = sticky stage that keeps playing while it scrolls away (hero): pin start →
//         its bottom reaching a quarter of the viewport.
//
// The section receives `--p` (0..1) so CSS can choreograph overlays with the same clock.

export type ScrubMode = 'pin' | 'pass' | 'lead' | 'trail';
// [start, end] in viewport heights: p = 0 when the section top is at start·vh,
// p = 1 when its bottom is at end·vh.
const RANGES: Record<ScrubMode, [number, number]> = { pin: [0, 1], pass: [1, 0], lead: [1, 1], trail: [0, 0.25] };

export interface ScrubOptions {
  section: HTMLElement;
  video: HTMLVideoElement;
  /** Base path without size suffix, e.g. `/media/box`. A function lets the hero follow the theme. */
  src: string | (() => string);
  mode: ScrubMode;
  /** Load as soon as the page is idle instead of when the section gets close. */
  eager?: boolean;
}

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const small = matchMedia('(max-width: 767px)');
const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export function scrub({ section, video, src, mode, eager = false }: ScrubOptions) {
  const base = typeof src === 'function' ? src : () => src;
  let frame = 0, visible = false, near = eager, ready = false, last = 0, lastP = -1, current = '';

  const progress = () => {
    const r = section.getBoundingClientRect(), vh = innerHeight;
    const [s, e] = RANGES[mode];
    return clamp((s * vh - r.top) / Math.max(1, s * vh + r.height - e * vh));
  };

  const tick = (now: number) => {
    if (!visible || document.hidden) return;
    const p = progress();
    if (Math.abs(p - lastP) > 0.0005) { section.style.setProperty('--p', p.toFixed(4)); lastP = p; }
    if (ready && !reduced.matches) {
      const target = p * Math.max(0, video.duration - 1 / 24);
      // One seek at a time: queued seeks stall slower decoders.
      if (!video.seeking && now - last >= 30 && Math.abs(video.currentTime - target) > 0.02) {
        try { video.currentTime += (target - video.currentTime) * 0.3; } catch { fallback(); }
        last = now;
      }
    }
    frame = requestAnimationFrame(tick);
  };
  const start = () => { cancelAnimationFrame(frame); if (visible && !document.hidden) frame = requestAnimationFrame(tick); };

  const fallback = () => { ready = false; video.removeAttribute('data-ready'); video.removeAttribute('src'); video.load(); };

  const load = () => {
    if (reduced.matches || !near || !video.canPlayType('video/mp4')) return;
    const file = base() + (small.matches ? '-m.mp4' : '-d.mp4');
    if (file === current) return;
    current = file; ready = false;
    video.removeAttribute('data-ready');
    video.src = file;
    video.load();
  };

  video.muted = true;
  video.addEventListener('loadeddata', () => {
    ready = true;
    // Jump straight to the right frame so a reload (theme swap) does not rewind.
    try { video.currentTime = progress() * Math.max(0, video.duration - 1 / 24); } catch { /* seek later */ }
    video.dataset.ready = '';
    start();
  });
  video.addEventListener('error', fallback);

  const seen = new IntersectionObserver(([e]) => { visible = e.isIntersecting; start(); });
  seen.observe(section);
  const approach = new IntersectionObserver(([e]) => { if (e.isIntersecting) { near = true; load(); approach.disconnect(); } }, { rootMargin: '120% 0px' });
  if (!eager) approach.observe(section);

  const onChange = () => { if (reduced.matches) fallback(); else load(); };
  reduced.addEventListener('change', onChange);
  small.addEventListener('change', onChange);
  document.addEventListener('visibilitychange', start);

  if (eager) {
    if (document.readyState === 'complete') setTimeout(load, 150);
    else addEventListener('load', () => setTimeout(load, 150), { once: true });
  }
  addEventListener('pagehide', () => { cancelAnimationFrame(frame); seen.disconnect(); approach.disconnect(); }, { once: true });

  return { reload: load };
}

/** Wire every `[data-scrub]` section on the page. */
export function scrubAll() {
  for (const section of document.querySelectorAll<HTMLElement>('[data-scrub]')) {
    const video = section.querySelector<HTMLVideoElement>('video[data-scrub-video]');
    if (!video) continue;
    const mode = (section.dataset.scrub ?? 'pass') in RANGES ? section.dataset.scrub as ScrubMode : 'pass';
    const themed = section.dataset.scrubThemed;
    const root = document.documentElement;
    const src = themed ? () => `${themed}-${root.dataset.theme === 'light' ? 'light' : 'dark'}` : section.dataset.scrubSrc!;
    const api = scrub({ section, video, src, mode, eager: section.hasAttribute('data-scrub-eager') });
    if (themed) new MutationObserver(api.reload).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  }
}
