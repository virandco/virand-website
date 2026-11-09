# CODEX-007: landing v2

Fecha: 9 de noviembre de 2026. Estado: implementación completa para revisión visual local, sin publicación.

## Base y aislamiento

- Worktree: `E:\PROYECTOS\VIRAND\WEB-landing`.
- Rama: `codex/landing-v2`.
- Se ejecutó primero `git fetch origin`. Base comprobada: `1a4c50eb31d961324f26b1c946001be8c3d3a6c4`.
- Tag local `archivo/multipagina-2026-11`: `0dd12f039530d37599390cc4357c17c5e12ace2e`, el estado de la main local al comenzar.
- La main local no se usó como base. Solo se consultó con `git show main:<ruta>` para recuperar las fuentes solicitadas.
- No hubo push, merge, amend, force, reset ni rebase. No se abrieron ni copiaron archivos de entorno.
- El encargo original se conserva sin modificaciones en `docs/tareas/codex-007-landing-v2.md`.

## Revisión visual

Vista local de la build: [ES](http://127.0.0.1:4323/) y [EN](http://127.0.0.1:4323/en/).

[Galería de capturas](capturas/index.html). Hay 35 imágenes: todas las secciones y contacto en escritorio oscuro y móvil claro, ambos idiomas, cierre claro de escritorio y movimiento reducido. Las imágenes de contacto contienen datos de prueba.

## Arquitectura y diseño

Astro renderiza una sola composición compartida, `Landing.astro`, para ES y EN. Los textos están en `src/i18n/ui.ts`; las secciones comerciales se documentan también en `docs/copy/{es,en}/landing.md`.

Rutas de contenido: `/`, `/en/`, `/privacidad`, `/en/privacy`, `/terminos`, `/en/terms`, `/cookies`, `/en/cookies`, `/404` y `/en/404`. La única ruta de aplicación con ejecución de servidor es `/api/proyecto`. El adaptador añade sus rutas internas de Astro. No hay páginas de servicios, casos, recursos ni campañas.

Se conservan los tokens originales, League Spartan, Manrope, wordmark, tema oscuro predeterminado y valores del modo claro. `src/styles/global.css` y `src/lib/brand.ts` no se modificaron. Los componentes usan la paleta y los efectos existentes. La identidad visual sigue las secciones 2 y 3 de la guía de marca del original; los servicios y el posicionamiento nuevos vienen del encargo CODEX-007, que prevalece sobre los pilares antiguos de esa guía.

Lectura de diseño: landing para negocios que necesitan ordenar su operación, con lenguaje editorial y cinematográfico. Parámetros de la habilidad: `DESIGN_VARIANCE: 7`, `MOTION_INTENSITY: 6`, `VISUAL_DENSITY: 3`. Se mantiene la asimetría del original, con el movimiento concentrado en el hero y el cierre. La habilidad se aplica a las secciones de marketing; el cuestionario usa controles nativos, fieldsets, progreso y errores accesibles.

Composición: hero fijo durante 65% adicional de una altura de pantalla; Signature como bloque protagonista de una sola implementación; proceso en secuencia; catálogo breve en dos columnas; FAQ nativas; cuestionario; ícono y firma. Las columnas se apilan en móvil.

Se consultó automaxia.com para la lógica general de posicionamiento, soluciones, metodología, FAQ y contacto. No se copiaron textos, imágenes, clientes, cifras ni comparaciones.

## Hero y rendimiento

| Recurso | Resultado |
|---|---|
| Fuente externa | `E:/PROYECTOS/VIRAND/BRAND/ELMNTS/CLIP/Character_walking_in_rain_1f9ca9e2_1080p.mp4` |
| Recorte conservado fuera de public | `media/hero-source-3s.mp4`, 2.956.304 bytes |
| MP4 servido | `public/media/hero-scroll.mp4`, 1.599.970 bytes (1,60 MB decimales) |
| Codificación | 1280 × 720, H.264, 24 fps, exactamente 3 segundos, sin audio, `-g 1 -keyint_min 1`, faststart |
| Poster | `public/media/hero-poster.jpg`, 159.218 bytes |
| Chunk 3D | `iconScene.CAXohDlu.js`, 589.478 bytes; gzip calculado: 150.463 bytes |

El poster tiene prioridad de carga y un elemento de imagen independiente debajo del video. El MP4 se solicita después de la carga inicial. No hay reproducción automática ni loop: se modifica currentTime con interpolación, esperando cada seek. IntersectionObserver limita el trabajo a la zona visible y la pestaña activa. Se conserva el poster si falla la carga o la asignación de tiempo; con movimiento reducido no se descarga el MP4.

El ícono se importa en un chunk separado solo cuando entra en pantalla. Usa el SVG oficial, extrusión, pose y sombreado del ícono compacto del prototipo v3. La rotación es leve y autónoma, sin scroll, anclas ni recorrido. Es idéntico en ambos temas. En móvil, movimiento reducido, error de importación, pérdida de contexto o fallo de WebGL se muestra el SVG wine oficial. La animación se detiene fuera del viewport.

### Medición

Lighthouse 13.6.0 sobre la build de producción, con Edge headless y perfil móvil simulado:

| Métrica | Resultado final |
|---|---|
| Rendimiento | 94 |
| Accesibilidad | 100 |
| Buenas prácticas | 100 |
| SEO | 100 |
| LCP | 1,2 s |
| CLS | 0,002 |
| Tiempo total de bloqueo | 280 ms |

Evidencia: `lighthouse-es-mobile.json`. Son medidas locales de laboratorio, no datos de campo ni una medición de INP. El LCP observado en los recorridos de Edge fue el H1, entre 144 y 608 ms en escritorio y entre 168 y 184 ms a 390 px. El video no bloqueó el LCP.

El build avisa que el chunk 3D supera 500 kB sin compresión. Está diferido y no se solicita al cargar la home. Se conserva la geometría y el material solicitado.

## Cuestionario y contacto

Cinco pasos, uno visible a la vez: negocio, marca, intereses múltiples, presupuesto y contacto. Se puede volver sin perder respuestas. El tipo “otro” pide texto corto. Se exige nombre, WhatsApp o correo válido y el consentimiento aprobado, con mensaje opcional de hasta 500 caracteres. Sin JavaScript se ofrece WhatsApp y se mantiene visible el contenido de la landing.

La misma validación normaliza los datos para navegador y servidor. El servidor vuelve a validar, calcula etiquetas y compone un correo de texto con todas las respuestas. El presupuesto “menos de 500” añade `presupuesto bajo` únicamente a ese correo. “Aún no lo sé” no recibe esa etiqueta. El último paso ofrece una landing o un manual de marca como entrada, sin precios.

WhatsApp usa el número 573228802540. Los CTA generales abren WhatsApp y “Cuéntanos tu proyecto” lleva a `#cuestionario`. El cierre del cuestionario genera un mensaje con las respuestas, sin etiquetas internas. Abrir el enlace no envía el mensaje automáticamente.

El endpoint conserva Resend, honeypot, tiempo mínimo, límites temporales de intentos y de envíos, respuestas genéricas y ausencia de PII en registros. Se ajustó la comprobación de origen al host real y el límite de cuerpo a bytes UTF-8. El control por IP sigue siendo local a cada instancia serverless, como en main.

La agenda se crea después de una respuesta exitosa. EN añade `hl=en` al iframe y al enlace largo de respaldo. No se crea un iframe de Google antes del envío. Umami recibe solo los cinco eventos solicitados y la categoría cerrada de idioma; no recibe respuestas, presupuesto, etiquetas ni datos de contacto.

## SEO, legales y seguridad

La home ES/EN es indexable. Legales y 404 conservan noindex. Canonical y alternos se resuelven por ruta, incluidos los slugs legales diferentes. El sitemap contiene únicamente las dos homes. Se generaron imágenes OG ES/EN con el titular nuevo y los assets originales.

CSP con hashes, recursos propios, Umami y Google Calendar. No se habilitó unsafe-eval ni scripts inline sin hash. Las asignaciones de estilo necesarias usan el permiso de atributos separado, como en main. Vercel conserva las cabeceras de seguridad, redirect de www, noindex para previews y no-store para la API.

Se añadió una regla a la salida del adaptador, después del filesystem y antes del fallback general, para que las rutas desconocidas bajo /en sirvan el 404 inglés con estado 404. Ambas páginas de error siguen prerenderizadas.

Los textos jurídicos de main se mantienen. Se actualizaron únicamente las descripciones técnicas de los datos que ahora pide el cuestionario y de los eventos de analítica. El responsable sigue siendo Andrés Virgües Fajardo, persona natural; el consentimiento se conserva literalmente en ES y EN.

## Reutilización de main, archivo por archivo

| Fuente en main | Uso en esta versión |
|---|---|
| `src/lib/projectForm.ts` | Sanitización, normalización, contacto, límites y transporte Resend; esquema, clasificación y correo adaptados al cuestionario. |
| `src/lib/antiBot.ts` | Copiado: honeypot, tiempo mínimo y rate limit en memoria. |
| `src/pages/api/proyecto.ts` | Reutilizado y adaptado para intereses múltiples, origen y conteo de bytes. |
| `src/components/ProjectForm.astro` | Consentimiento literal y lógica de agenda diferida, idioma y respaldo. No se copió su diseño. |
| `src/consts.ts` | Número de WhatsApp, correo público, ID público de Umami y URLs de agenda; tabla de rutas reducida. |
| `src/i18n/ui.ts` | Textos legales y de 404, respuestas aprobadas de FAQ, proceso y entrega. El resto de la nueva landing procede del encargo. |
| `src/components/ReadingPage.astro` | Componente de lectura para legales y 404. |
| `src/pages/privacidad.astro` | Página legal ES. |
| `src/pages/terminos.astro` | Página legal ES. |
| `src/pages/cookies.astro` | Página legal ES. |
| `src/pages/en/privacy.astro` | Página legal EN. |
| `src/pages/en/terms.astro` | Página legal EN. |
| `src/pages/en/cookies.astro` | Página legal EN. |
| `src/pages/404.astro` | Página de error ES, enlaces adaptados a anclas. |
| `src/pages/en/404.astro` | Página de error EN, enlaces adaptados a anclas. |
| `src/lib/home3d/scene.js` | Solo extracción de geometría del SVG, profundidad 1600, pose y sombreado del ícono final. Implementación separada nueva. |
| `src/lib/analytics.ts` | Convención de eventos cerrados, filtrado de categorías y manejo tolerante a ausencia de Umami; módulo simplificado a los cinco eventos nuevos. |
| `src/components/Analytics.astro` | Condición de build, dominio público y Do Not Track; componente adaptado al nuevo módulo. |
| `src/lib/themeScript.ts` | Copiado para compartir el texto exacto entre Layout y el hash CSP. |
| `astro.config.mjs` | Esquema de secretos opcionales, CSP y estrategia de prerender como referencia; configuración nueva sobre la base remota. |
| `vercel.json` | Copiado: www, cabeceras, previews noindex y API no-store. |
| `public/robots.txt` | Copiado. |
| `scripts/generar-og.mjs` | Copiado; solo se actualizaron los titulares. Las imágenes se generaron de nuevo. |
| `docs/ANALITICA.md` | Convenciones consultadas; documentación reescrita para los eventos del cuestionario. |
| `docs/PUBLICACION.md` | Referencia para variables, flujo de publicación y verificación real; no se publicó nada. |
| `docs/copy/es/privacidad.md` | Fuente legal copiada y sincronizada con la descripción técnica nueva. |
| `docs/copy/es/terminos.md` | Fuente legal conservada. |
| `docs/copy/es/cookies.md` | Fuente legal conservada, con eventos actualizados. |
| `docs/copy/en/privacy.md` | Fuente legal copiada y sincronizada con la descripción técnica nueva. |
| `docs/copy/en/terms.md` | Fuente legal conservada. |
| `docs/copy/en/cookies.md` | Fuente legal conservada, con eventos actualizados. |
| `docs/copy/es/404.md` | Copiado, con enlace al cuestionario. |
| `docs/copy/en/404.md` | Copiado, con enlace al cuestionario. |

La ruta del prototipo indicada en el encargo no estaba como carpeta hermana. Se encontró en `E:/PROYECTOS/VIRAND/WEB/WEB-LOGO-3D-PROTOTIPO/v3`; se leyó su estructura y se usó como fuente de integración la escena de main.

## Qué quedó fuera

No se trajeron la arquitectura multipágina de la main local, las rutas comerciales adicionales, landings de pauta, casos, recursos, blog, contadores, clientes, precios ni comparativas. No se trajeron el ducto 3D, el recorrido, el arrastre ni las anclas de esa experiencia.

Se retiraron Manifesto, MotionBand, WorkFunnel, Audience y Contact antiguos, junto con el video largo y su poster. Hero, Services y Process fueron reemplazados. Se conservan los assets oficiales de marca y las imágenes originales como fuentes, aunque no formen parte del nuevo contenido visible.

No se copiaron archivos de entorno, credenciales, la instalación de dependencias de la main local ni sus salidas de build. Las herramientas Playwright y Lighthouse se instalaron fuera del repositorio para QA.

## Verificación

- `npm ci`: correcto. Se detuvo el servidor de desarrollo para liberar el binding nativo de Windows antes de reinstalar.
- `npm run build`: correcto.
- `npx astro check`: 0 errores, 0 advertencias, 0 hints.
- `node tests/questionnaire.test.mjs`: correcto. Validación, clasificación, sanitización, límites, antibot y transporte simulado.
- Edge headless 157.0.4341.42: ES y EN a 1440, 1024, 768 y 390 px; cuestionario completo en los ocho recorridos.
- Sin desbordes; enlaces y menú móvil correctos; conservación de respuestas al volver; múltiples intereses; consentimientos y errores; rama de presupuesto bajo y presupuesto desconocido.
- WhatsApp interceptado en la prueba: número y mensaje prellenado correctos, sin enviar mensajes.
- Respuesta de formulario simulada para validar error y éxito; agenda diferida y respaldo EN correctos.
- Scrub comprobado mediante cambios reales de currentTime, fallback de carga fallida, movimiento reducido y ausencia de WebGL.
- 3D diferido, temas claro/oscuro y SVG en móvil comprobados.
- Sin JavaScript: contenido y poster visibles, formulario sustituido por acceso a WhatsApp.
- 0 violaciones CSP y 0 errores de página en los ocho recorridos de la build.
- API local real: 405, 403, 400, 422, 503, honeypot, tamaño y formato comprobados. El proceso de prueba usó credenciales vacías para impedir correos reales.
- Metadatos, alternos legales, noindex, imágenes OG y regla de 404 EN comprobados.
- Sin em dashes en el contenido visible, ni precios de servicios. Los importes aparecen únicamente como las opciones de presupuesto exigidas por el encargo.
- Auditoría final: 0 vulnerabilidades altas o críticas; 4 moderadas transitivas relacionadas con el adaptador (`@astrojs/vercel`, `@vercel/nft`, `glob`, `minimatch`). No se aplicaron cambios de versión mayor ni force.

Evidencias: `qa-edge.json`, `qa-rutas.json`, `qa-api.json`, `lighthouse-es-mobile.json`, capturas y pruebas en `tests/`.

Para reproducir las pruebas de navegador: construir, ejecutar `node tests/serve-production.mjs` y, en otra terminal, ejecutar `tests/browser-landing.mjs` y `tests/routes-landing.mjs` con Playwright disponible. La variable opcional `VIRAND_QA_PLAYWRIGHT` acepta la URL file del módulo instalado fuera del repo. Edge debe estar instalado. Los endpoints del formulario se simulan en el recorrido de navegador.

## Pendientes y límites

1. PENDIENTE de copy: confirmar conocimientos técnicos requeridos y alcance de capacitación. Está en `docs/copy/PENDIENTES.md`; no se publicó una respuesta inventada.
2. Verificar entrega real al buzón en un entorno autorizado que tenga `RESEND_API_KEY` y `CONTACT_FROM`. No se inspeccionaron secretos ni se envió correo real. El transporte y los estados del formulario sí se probaron.
3. Confirmar cabeceras y reservas reales en Vercel después de una eventual publicación. El calendario se probó con respuesta controlada, sin crear citas.
4. Una prueba nativa en iPhone/Safari queda fuera de Edge headless. Se conservó la protección de poster independiente y los atributos inline de iOS del original.
5. Los cuatro avisos moderados del adaptador quedan para revisión de dependencias por Claude Code. La auditoría pasó de 14 avisos iniciales, incluida una vulnerabilidad crítica, a los cuatro moderados descritos.

## Commits

| Hash | Subtarea |
|---|---|
| `5f9099b` | chore(base): preparar landing aislada y dependencias de servidor |
| `f676704` | feat(arquitectura): unificar la landing y navegación por anclas |
| `f5ab7b7` | feat(hero): sincronizar video recortado con el scroll y conservar poster |
| `4093dd5` | feat(secciones): presentar Signature y servicios con copy paralelo |
| `0e86f7e` | feat(cuestionario): perfilar proyectos y conectar formulario WhatsApp y agenda |
| `c5d8f40` | feat(3d): mostrar el ícono final con carga diferida y fallback estático |
| `5275069` | feat(legales): conservar textos aprobados y adaptar su presentación |
| `0aaf3af` | feat(seo): integrar metadatos analítica CSP y validación de la landing |

El noveno commit, `docs(reporte)`, añade este reporte y las evidencias. Su hash se consulta con `git --no-pager log -1 --oneline`; el archivo no puede contener el hash del mismo commit que lo incorpora.
