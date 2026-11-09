# Encargo: CODEX-007 (landing de una sola página, primera versión completa)

## Objetivo
Reemplazar el sitio multipágina por UNA landing de conversión en español e inglés, partiendo del repo ORIGINAL (el que está en vivo), con hero de video que avanza con el scroll, pocas secciones, un cuestionario que perfila y clasifica prospectos, y cierre a WhatsApp o formulario. Tú defines toda la arquitectura de esta primera versión. Esta versión se evalúa visualmente por Andrés: prioriza que se vea moderna, potente y fácil de leer.

## Reglas de trabajo
- Base: `origin/main` (HEAD `1a4c50e`). NO partas de la `main` local.
- Primero: `git fetch origin`.
- Desde `E:\PROYECTOS\VIRAND\WEB` crea el worktree: `git worktree add ..\WEB-landing -b codex/landing-v2 origin/main`. Trabaja ahí.
- Antes de empezar, desde `E:\PROYECTOS\VIRAND\WEB`, crea un tag local en la `main` local para no perder ese trabajo: `git tag archivo/multipagina-2026-11 main`. Sin push de ningún tipo.
- Un commit por subtarea, mensaje `tipo(alcance): descripción` en español. No comitees si `npm run build` o `npx astro check` fallan. Sin force, reset ni rebase. Sin `.env*` ni secretos.
- Usa `git --no-pager`. Si el sandbox bloquea escritura, para y reporta.
- No inventes colores, fuentes, efectos, precios, clientes, casos, cifras ni garantías.

## Material de partida (rutas)
En el repo ORIGINAL (`origin/main`), léelos antes de diseñar:
- `CLAUDE.md`, `AGENTS.md`, `.claude/guidelines/brand-guidelines.md`, `.agents/skills/design-taste-frontend/SKILL.md`
- `src/styles/global.css`, `src/lib/brand.ts`, `src/consts.ts`, `src/i18n/ui.ts`, `src/i18n/utils.ts`
- `src/layouts/Layout.astro`, `src/pages/index.astro`, `src/pages/en/index.astro`
- `src/components/`: `Hero`, `MotionBand`, `Nav`, `Footer`, `ThemeToggle`, `LangToggle`, `WhatsAppCta`, `Wordmark`, `Services`, `Process`, `Contact`, `Section`, `SectionHeading`
- Assets: `src/assets/` (wordmarks, logos verticales, íconos, `hero-dark.jpeg`, `hero-light.jpeg`), `public/headeranimation.mp4`, `public/headeranimation-poster.jpg`, `public/favicon.*`, `public/og.png`

Del trabajo reciente (NO es base, solo fuente de texto y de lógica), en la `main` local usa `git show main:<ruta>` o `git grep -n <término> main`:
- Textos legales ES/EN de privacidad, términos y cookies: ubícalos con `git ls-tree -r --name-only main | grep -Ei 'privac|terminos|terms|cookies'` y revisa también `docs/copy/`.
- Formulario (solo lógica, no su diseño): `src/pages/api/proyecto.ts`, `src/lib/projectForm.ts`, `src/lib/antiBot.ts`, `src/components/ProjectForm.astro`.
- Analítica: `src/lib/analytics.ts`, `docs/ANALITICA.md`. CSP y headers: `astro.config.mjs` y `vercel.json`.
- Publicación: `docs/PUBLICACION.md`. Imágenes Open Graph: `public/og/og-es.png`, `public/og/og-en.png`, `scripts/generar-og.mjs`.
- Ícono 3D: prototipo en `E:\PROYECTOS\VIRAND\WEB-LOGO-3D-PROTOTIPO\v3` y su integración en `main` (`git grep -n createExperience main`).
- Video fuente: `E:\PROYECTOS\VIRAND\BRAND\ELMNTS\CLIP\Character_walking_in_rain_1f9ca9e2_1080p.mp4`.

## Reglas de negocio y de marca (obligatorias)
- Identidad del original: colores, fuentes (League Spartan para títulos, Manrope para cuerpo), wordmark y toggles de tema e idioma, tal como están en `origin/main`. Modo claro con los valores actuales. El ícono 3D es idéntico en ambos temas.
- Sin precios ni "desde" en el sitio. Sí se puede decir "precio fijo por implementación, sin mensualidades obligatorias". Sin Stripe.
- Prestador legal: Andrés Virgües Fajardo, persona natural (VIRAND es marca). Único correo público: `contacto@virand.co`. No escribas ningún otro correo.
- No prometas resultados, ventas ni "24/7". El agente del Signature System es un agente de atención y agenda por WhatsApp (guiado o híbrido), no "IA completa".
- Plazo del Signature System: "a partir de 2 semanas".
- Botón de WhatsApp lleva a WhatsApp (`WHATSAPP` en `main:src/consts.ts`, número 573228802540). "Cuéntanos tu proyecto" lleva al cuestionario/formulario. Son rutas distintas.
- Idiomas: ES en `/` y EN en `/en/`, mismo contenido y misma estructura. `prefixDefaultLocale: false`.
- Rutas finales: `/`, `/en/`, legales (conserva los slugs actuales: `/privacidad`↔`/en/privacy`, `/terminos`↔`/en/terms`, `/cookies`), 404 y `/api/proyecto`. Nada más. Tampoco `/casos`.
- `noindex` solo donde ya aplica. La home es indexable. Hreflang y sitemap coherentes.

## Estructura de la landing (una página, anclas)
Menú con anclas, toggles de tema e idioma y un CTA. Orden:
1. `#inicio` Hero: video de fondo que avanza con el scroll. Titular general sobre "sistemas que optimizan tu operación". Subtítulo que nombre las capacidades reales: software a medida, automatización, branding y desarrollo web con estética cuidada. Dos CTA: WhatsApp y "Cuéntanos tu proyecto".
2. `#signature` Signature System, la sección protagonista: tres piezas presentadas como un solo motor (kit básico de marca, landing, agente de atención y agenda). Precio fijo por implementación, entrega con manual y accesos, plazo desde 2 semanas. CTA a WhatsApp y al cuestionario.
3. `#proceso` Cómo trabajamos: cuatro pasos (entender el negocio y diagnosticar, construir el sistema, entregarlo con manual y accesos, medir el rendimiento).
4. `#a-medida` Servicios a medida. Mensaje: no todas las herramientas preestablecidas aplican a todos los negocios; tus procesos pueden ser distintos, por eso hacemos proyectos a medida. Lista corta de lo demás que ofrecemos: software y CRM a medida, cotizaciones parametrizadas y catálogo dinámico, landings y sitios web adicionales, contenido para redes sociales, gestión de pauta en Meta y Google (sin garantía de resultados), branding y manual de marca.
5. `#faq` Cuatro a seis preguntas con respuestas que solo afirmen lo que sabemos (plazo, precio fijo, qué se entrega, quién paga sus APIs y mensajería, si necesitas conocimientos técnicos). Las que no tengan respuesta definida, márcalas `PENDIENTE` en `docs/copy/PENDIENTES.md`.
6. `#cuestionario` Cuestionario de perfilado (ver abajo), con cierre a WhatsApp o formulario.
7. Cierre: ícono 3D solo (ver abajo), frase de firma y footer con enlaces legales y `contacto@virand.co`.
Referencia de estructura: automaxia.com (posicionamiento, soluciones por área, metodología, FAQ, formulario). Toma SOLO la lógica de bloques. No copies textos, imágenes, nombres ni su tabla comparativa. Sin blog, sin contadores, sin cuadrícula de logos.

## Cuestionario (pasos de a uno, con progreso)
1. Tipo de negocio: comercio o tienda; restaurante o gastronomía; servicios con citas (clínica, estética, tatuajes u otros); empresa de servicios; otro (texto corto).
2. ¿Ya tienes marca?: sí, con manual de marca; tengo logo pero no manual; aún no tengo marca.
3. ¿Qué buscas? (selección múltiple): Signature System; landing page; agente de atención por WhatsApp; software o automatización a medida; sitio web completo; contenido o pauta; branding o manual de marca; no estoy seguro.
4. Presupuesto aproximado (USD): menos de 500; 500 a 1,000; 1,000 a 2,500; más de 2,500; aún no lo sé.
5. Contacto: nombre, WhatsApp o correo (al menos uno), mensaje opcional y casilla de consentimiento (usa el texto aprobado en `main:src/components/ProjectForm.astro`, ES y EN). Cierre con dos botones: enviar por formulario, o continuar por WhatsApp con un mensaje prellenado que resuma las respuestas.
Clasificación: calcula internamente un perfil (etiquetas) con las respuestas. Si el presupuesto es "menos de 500", agrega la nota "presupuesto bajo" en el correo que recibe Andrés (no se la muestres a la persona) y en la pantalla final ofrécele opciones puntuales de entrada (landing page o manual de marca) SIN precios. "Aún no lo sé" no es presupuesto bajo. El correo debe llegar legible, con las respuestas y las etiquetas. Reutiliza la ruta de Resend, antibot y validación de `main`, y la agenda de Google Calendar tras el envío exitoso con su enlace de respaldo (`hl=en` en EN). Sin PII en analítica.

## Hero con video que avanza con el scroll
- Usa SOLO los primeros 3 segundos del clip (después hay un error de IA). Recorta y recodifica con ffmpeg a un mp4 de baja carga con fotogramas clave en todos los cuadros (`-g 1`), y una versión webm si ayuda. Genera poster. Guarda el original recortado fuera de `public/`.
- El video avanza lento con el scroll mientras el hero queda anclado (sticky) durante un tramo razonable de scroll; el texto del hero permanece legible sobre un velo. Interpolación suave, sin saltos. No hay loop.
- Fallback: poster estático si hay `prefers-reduced-motion`, si el video falla o si el navegador no permite el scrub. Verifica que en móvil no se vea la caja negra de iOS (el original ya lo resolvió con poster; mira `MotionBand.astro`).
- Rendimiento: el LCP debe ser el poster o el titular, nunca esperar al video. Reporta peso final del video y el LCP.

## Ícono 3D al final
- Solo el ícono de VIRAND, rotación sutil, sin recorrido ni anclas ni scroll-driven. Carga diferida cuando entra al viewport, en un chunk aparte. Reutiliza lo necesario del prototipo, sin traer el sistema de recorrido.
- Fallback estático con `src/assets/VIRAND-icono-*.svg` en móvil, `prefers-reduced-motion` o fallo de WebGL.

## Subtareas (un commit por cada una)
1. `chore(base)`: worktree, tag de archivo, limpieza de lo que no se use, dependencias necesarias para el endpoint (adaptador de Vercel solo si hace falta para `/api`, el resto prerenderizado).
2. `feat(arquitectura)`: layout, i18n ES/EN, rutas, nav con anclas, tokens, footer, estructura vacía de secciones.
3. `feat(hero)`: hero con video y fallback.
4. `feat(secciones)`: Signature, proceso, a medida y FAQ con copy ES/EN en `docs/copy/{es,en}/landing.md` y en `ui.ts`.
5. `feat(cuestionario)`: cuestionario, clasificación, API, WhatsApp, agenda.
6. `feat(3d)`: ícono final.
7. `feat(legales)`: privacidad, términos y cookies ES/EN con el estilo nuevo y el texto de `main`, sin cambiar el contenido jurídico salvo lo necesario para que coincida con la nueva analítica y eventos.
8. `feat(seo)`: metadatos, hreflang, sitemap, Open Graph, Umami con eventos del cuestionario (`cuestionario_iniciado`, `cuestionario_completado`, `cta_whatsapp`, `form_enviado`, `agenda_vista`; solo categorías, sin datos personales), CSP y `vercel.json` ajustados.
9. `docs(reporte)`: `docs/reportes/codex-007-landing-v2.md`.

## Verificación final
`npm ci`, `npm run build`, `npx astro check`. Prueba en Edge (headless) a 1440, 1024, 768 y 390 px: sin desbordes, anclas correctas, cuestionario completo en ES y EN, WhatsApp con mensaje prellenado, scrub del video, fallback con movimiento reducido, 3D en ambos temas, CSP sin violaciones. Sin em dashes y sin precios en el sitio. Capturas de cada sección en `docs/reportes/capturas/`.

## Entregable
Reporte con: decisiones de arquitectura, lista de commits con hash, peso del video y del chunk 3D, LCP, qué reutilizaste de `main` (archivo por archivo), qué dejaste fuera, pendientes y puntos de copy marcados `PENDIENTE`. Sin push ni merge.