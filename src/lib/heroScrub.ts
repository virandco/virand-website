// The observer runs a native video seek loop only while the sticky hero is visible.
// No playback, autoplay, scroll listener or layout-changing animation.
const hero = document.querySelector<HTMLElement>('[data-scroll-hero]');
const video = document.querySelector<HTMLVideoElement>('[data-hero-video]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
if (hero && video) {
  let frame = 0, visible = false, ready = false, last = 0;
  const staticPoster = () => {
    ready = false;
    cancelAnimationFrame(frame);
    video.removeAttribute('data-ready');
    video.pause();
    hero.dataset.static = '';
  };
  const tick = (now: number) => {
    if (!visible || !ready || reduced.matches || document.hidden) return;
    const travel = hero.offsetHeight - innerHeight;
    const progress = Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / Math.max(1, travel)));
    const target = progress * Math.max(0, video.duration - 1 / 24);
    // Wait for each seek to finish. This avoids queued seeks on slower decoders.
    if (!video.seeking && now - last >= 32 && Math.abs(video.currentTime - target) > .018) {
      try { video.currentTime += (target - video.currentTime) * .22; }
      catch { staticPoster(); return; }
      last = now;
    }
    frame = requestAnimationFrame(tick);
  };
  const start = () => {
    cancelAnimationFrame(frame);
    if (visible && ready && !reduced.matches && !document.hidden) frame = requestAnimationFrame(tick);
  };
  const load = () => {
    if (reduced.matches || !video.canPlayType('video/mp4')) { staticPoster(); return; }
    video.src = '/media/hero-scroll.mp4';
    video.load();
  };
  video.addEventListener('loadeddata', () => {
    ready = true;
    // The separate image remains underneath, including in iOS before a decoded frame exists.
    video.dataset.ready = '';
    delete hero.dataset.static;
    start();
  });
  video.addEventListener('error', staticPoster);
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); });
  observer.observe(hero);
  reduced.addEventListener('change', () => {
    if (reduced.matches) staticPoster();
    else if (!video.src) load();
    else { ready = video.readyState >= 2; if (ready) { video.dataset.ready = ''; delete hero.dataset.static; start(); } }
  });
  document.addEventListener('visibilitychange', start);
  if (reduced.matches) staticPoster();
  else if (document.readyState === 'complete') setTimeout(load, 200);
  else window.addEventListener('load', () => setTimeout(load, 200), { once: true });
  window.addEventListener('pagehide', () => { cancelAnimationFrame(frame); observer.disconnect(); }, { once: true });
}
