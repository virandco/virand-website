# Analítica de la landing (CODEX-007)

Umami Cloud conserva el identificador público de main y solo mide virand.co en builds de producción. Desarrollo y previews no envían eventos. Se respeta Do Not Track.

| Evento | Cuándo | Categorías |
|---|---|---|
| cuestionario_iniciado | Primer foco dentro del formulario | idioma: es o en |
| cuestionario_completado | Primer intento válido de enviar por formulario o continuar en WhatsApp | idioma: es o en |
| cta_whatsapp | Clic en WhatsApp, incluidos los CTA y el cierre del cuestionario | idioma: es o en |
| form_enviado | El endpoint confirma el envío | idioma: es o en |
| agenda_vista | La agenda aparece en el viewport tras el envío | idioma: es o en |

No se envían respuestas, presupuesto, etiquetas internas, nombre, correo, teléfono, negocio ni mensaje. El módulo filtra categorías y propiedades por listas cerradas. Los enlaces navegan sin esperar a la analítica.

La clasificación comercial se hace en el servidor y se incluye únicamente en el correo a contacto@virand.co. No se persiste en una base de datos. El contador de abuso es temporal y local a cada instancia del servidor, igual que en main.
