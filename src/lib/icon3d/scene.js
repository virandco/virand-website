// VIRAND · ícono 3D v4: objeto "de producto", realista y rotable.
// - Forma: el SVG original extruido, sin bisel: el contorno es exactamente el del logo.
//   Las curvas se sombrean suaves y las esquinas quedan vivas, como papel cortado.
// - Luz: un estudio procedural (RoomEnvironment): reflejos reales sin descargar ningún HDR.
// - Material: vinotinto mate tipo papel, con un grano fino generado en código.
// - Sin sombra de contacto: el objeto flota sobre el fondo de la página, sea claro u oscuro.
// - Arrastrar rota en cualquier dirección, con inercia. Solo dibuja mientras está en pantalla.
//
// Fuente: WEB-LOGO-3D-PROTOTIPO/v4/src/scene.js (v4 final, 9-nov-2026, MD5 5ce43a1d…).
// Geometría, material, luces y gestos sin cambios. El sitio solo añade: setActive
// (pestaña oculta), dispose (pérdida de contexto) y la limpieza de observadores y eventos.
import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, ExtrudeGeometry, MeshPhysicalMaterial,
  DirectionalLight, Vector2, Vector3, Quaternion, Euler, Box2, Shape, Path, ShapeUtils,
  PMREMGenerator, ACESFilmicToneMapping, SRGBColorSpace, MathUtils,
  CanvasTexture, RepeatWrapping, Color,
} from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { toCreasedNormals } from 'three/addons/utils/BufferGeometryUtils.js';
import svgText from './virand-icono-blanco.svg?raw';

export const WINE = 0x6b0f1a;
const DEPTH = 1600;          // grosor (el que elegiste en la v3)

// Grano fino tipo papel/laca, generado en el navegador (0 bytes de descarga).
function grainTexture(size = 256) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const img = g.createImageData(size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 150 + Math.random() * 70;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  // Un desenfoque mínimo para que se lea como fibra y no como ruido digital.
  g.filter = 'blur(0.6px)';
  g.drawImage(c, 0, 0);
  const t = new CanvasTexture(c);
  t.wrapS = t.wrapT = RepeatWrapping;
  return t;
}

export async function createIcon({ canvas, debug = false, theme = 'dark' }) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.035).texture;
  scene.environment = envTex;
  pmrem.dispose();

  const camera = new PerspectiveCamera(24, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  // ---------- Geometría ----------
  const svg = new SVGLoader().parse(svgText);
  const clean = (pts) => {
    const out = [];
    for (const p of pts) if (!out.length || p.distanceTo(out[out.length - 1]) > 0.75) out.push(p);
    if (out.length > 2 && out[0].distanceTo(out[out.length - 1]) < 0.75) out.pop();
    return out;
  };
  const raw = svg.paths.flatMap((p) => p.toShapes(true));
  const box = new Box2();
  raw.forEach((s) => s.getPoints(64).forEach((pt) => box.expandByPoint(pt)));
  const cx = (box.min.x + box.max.x) / 2, cy = (box.min.y + box.max.y) / 2;
  const logoW = box.max.x - box.min.x;
  const shapes = raw.map((s) => {
    const pts = clean(s.getPoints(64)).map((p) => new Vector2(p.x - cx, -(p.y - cy)));
    if (ShapeUtils.isClockWise(pts)) pts.reverse();
    return new Shape(pts);
  });

  const grain = grainTexture();
  grain.repeat.set(1 / 220, 1 / 220);   // UV del extrusor = coordenadas del SVG
  const mat = new MeshPhysicalMaterial({
    // Base más oscura que #6B0F1A: con luz y laca, la cara iluminada termina en el wine de marca.
    color: new Color(0x52070f),
    roughness: 0.9,
    roughnessMap: grain,
    bumpMap: grain,
    bumpScale: 0.25,
    specularIntensity: 0.25,
    envMapIntensity: 0.55,
  });

  const icon = new Group();
  const S = 2.6 / logoW;   // el ícono mide 2.6 unidades de ancho
  let tris = 0;
  for (const sh of shapes) {
    let g = new ExtrudeGeometry(sh, { depth: DEPTH, steps: 1, curveSegments: 64, bevelEnabled: false });
    g.translate(0, 0, -DEPTH / 2);
    // Curvas suaves, esquinas vivas (todo ángulo mayor a 35° queda como arista).
    g = toCreasedNormals(g, MathUtils.degToRad(35));
    tris += (g.index ? g.index.count : g.attributes.position.count) / 3;
    icon.add(new Mesh(g, mat));
  }
  icon.scale.setScalar(S);
  const pivot = new Group();
  pivot.add(icon);
  scene.add(pivot);

  // Luz clave (da forma y separa las caras) + contraluz (lee los cantos en modo oscuro).
  const key = new DirectionalLight(0xfff4ea, 1.5);
  key.position.set(-3, 4, 5);
  const rim = new DirectionalLight(0xffe2d2, 0.7);
  rim.position.set(4, 1.5, -4);
  scene.add(key, rim);

  // ---------- Interacción ----------
  const restQ = new Quaternion().setFromEuler(new Euler(0.32, -0.55, 0.06));
  const userQ = restQ.clone();
  const spin = new Vector3();
  const hover = new Vector2(), hoverT = new Vector2();
  const hoverE = new Euler(), hoverQ = new Quaternion(), q = new Quaternion(), axis = new Vector3();
  let dragging = false, lx = 0, ly = 0, lastT = 0, touched = -1e9;
  let time = 0, last = performance.now(), running = false, visible = true;
  let fps = 0, acc = 0, frames = 0;
  const listeners = [];

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Encaja el ícono (y su giro) en el cuadro, sea vertical u horizontal.
    const fit = 2.15 / Math.tan(MathUtils.degToRad(camera.fov / 2)) / Math.min(1, camera.aspect);
    camera.position.z = fit;
    camera.updateProjectionMatrix();
    wake();
  }

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now; time += dt;
    acc += dt; frames++;
    if (acc >= 0.5) { fps = frames / acc; acc = 0; frames = 0; }

    hover.x = MathUtils.damp(hover.x, hoverT.x, 5, dt);
    hover.y = MathUtils.damp(hover.y, hoverT.y, 5, dt);

    if (!dragging) {
      spin.multiplyScalar(Math.exp(-dt * 1.7));
      const ang = spin.length() * dt;
      if (ang > 1e-6) userQ.premultiply(q.setFromAxisAngle(axis.copy(spin).normalize(), ang));
      if (time - touched > 3) userQ.slerp(restQ, 1 - Math.exp(-dt * 0.8));   // vuelve solo a tres cuartos
    }
    // Flotación mínima y el cursor inclina apenas.
    hoverQ.setFromEuler(hoverE.set(-hover.y * 0.14 + Math.sin(time * 0.6) * 0.025, hover.x * 0.2 + Math.sin(time * 0.45) * 0.05, 0));
    pivot.quaternion.copy(hoverQ).multiply(userQ);
    pivot.position.y = Math.sin(time * 0.8) * 0.03;

    renderer.render(scene, camera);
    for (const fn of listeners) fn({ fps, tris });
  }

  // Bucle solo mientras se ve en pantalla.
  const loop = (now) => frame(now);
  let active = true, disposed = false;
  function wake() {
    if (running || !visible || !active || disposed) return;
    running = true; last = performance.now();
    renderer.setAnimationLoop(loop);
  }
  function sleep() { running = false; renderer.setAnimationLoop(null); }
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? wake() : sleep(); });
  io.observe(canvas);
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  const events = new AbortController();
  const on = (type, fn) => canvas.addEventListener(type, fn, { signal: events.signal });

  // Arrastre: rota en cualquier dirección, con inercia.
  on('pointerdown', (e) => {
    dragging = true; lx = e.clientX; ly = e.clientY; lastT = performance.now();
    spin.set(0, 0, 0); touched = time;
    canvas.setPointerCapture(e.pointerId);
    canvas.classList.add('is-dragging');
  });
  on('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    hoverT.set(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
    if (!dragging) return;
    const now = performance.now(), dx = e.clientX - lx, dy = e.clientY - ly;
    lx = e.clientX; ly = e.clientY;
    const ang = Math.hypot(dx, dy) * 0.009;
    if (ang > 0) {
      axis.set(dy, dx, 0).normalize();
      userQ.premultiply(q.setFromAxisAngle(axis, ang));
      spin.copy(axis).multiplyScalar(ang / Math.max((now - lastT) / 1000, 1 / 120)).clampLength(0, 7);
    }
    lastT = now; touched = time;
  });
  const end = () => { dragging = false; touched = time; canvas.classList.remove('is-dragging'); };
  on('pointerup', end);
  on('pointercancel', end);
  on('pointerleave', () => hoverT.set(0, 0));

  // El material no depende del tema; se conserva setTheme para no romper la API.
  function setTheme() {}

  if (renderer.compileAsync) await renderer.compileAsync(scene, camera);
  resize();
  renderer.render(scene, camera);

  const api = {
    stats: { triangles: Math.round(tris) },
    setTheme,
    onFrame(fn) { listeners.push(fn); },
    // Para pruebas: fija una orientación.
    // Sitio: pausa con la pestaña oculta y libera la GPU al salir.
    setActive(value) { active = value; active ? wake() : sleep(); },
    dispose() {
      if (disposed) return;
      disposed = true; sleep(); io.disconnect(); ro.disconnect(); events.abort();
      scene.traverse((o) => { o.geometry?.dispose(); o.material?.dispose(); });
      grain.dispose(); envTex.dispose(); renderer.dispose();
    },
    pose(x, y, z) { userQ.setFromEuler(new Euler(x, y, z)); spin.set(0, 0, 0); touched = time + 1e6; },
  };
  if (debug) window.__icon = api;
  return api;
}
