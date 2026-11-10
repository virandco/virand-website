// Pointer position for the offer card light ([data-spot]) and the live dot fields
// (.dots--live). One delegated pointermove listener, one write per frame, mouse only.
const fine = matchMedia('(hover: hover) and (pointer: fine)');

let pending: PointerEvent | undefined, raf = 0;

function apply() {
  raf = 0;
  const e = pending; if (!e) return;
  const target = e.target instanceof Element ? e.target : null;
  for (const el of [target?.closest<HTMLElement>('[data-spot]'), target?.closest<HTMLElement>('.dots--live')]) {
    if (!el) continue;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }
}

document.addEventListener('pointermove', (e) => {
  if (e.pointerType !== 'mouse' || !fine.matches) return;
  pending = e;
  if (!raf) raf = requestAnimationFrame(apply);
}, { passive: true });
