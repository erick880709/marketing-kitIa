# Estructura de entregables

Todos los entregables del kit se guardan bajo la carpeta **`resources/` en la raíz del proyecto**, organizados en subcarpetas según la naturaleza del entregable. Esta regla aplica a cualquier agente (`director-marketing`, `productor-marketing`, `publicador-marketing`, workflow `campana-desde-idea`) y a cualquier skill que escriba archivos.

## Procedimiento (siempre, antes de escribir)

1. **Crear la raíz si falta.** Si `resources/` no existe, créala primero.
2. **Clasificar por naturaleza.** Identifica la naturaleza del entregable y su subcarpeta en la tabla de abajo.
3. **Crear la subcarpeta si falta.** Si la subcarpeta (o la carpeta `<proyecto>`/`<cliente>`/`<objetivo>`) no existe, créala.
4. **Escribir el archivo** dentro de esa subcarpeta, con nombre seguro (slug `[a-z0-9-]`, sin espacios ni rutas absolutas).

## Clasificación por naturaleza

| Entregable | Lo genera | Subcarpeta |
|---|---|---|
| Brief de campaña | director-marketing | `resources/briefs/` |
| Estrategia y plan (mensaje, ángulos, canales, calendario, KPIs) | director-marketing | `resources/estrategias/` |
| Paquete de campaña | productor-marketing / workflow | `resources/campanas/<proyecto>/paquete-campana.md` |
| Copy de piezas | copywriting, copy-editing | `resources/campanas/<proyecto>/copy/` |
| Anuncios y creatividades | ad-creative, ads, meta-ads, google-ads, linkedin-ads, tiktok-ads, youtube-ads, reddit-ads | `resources/campanas/<proyecto>/anuncios/` |
| Posts y calendario social | social, linkedin-posts | `resources/campanas/<proyecto>/social/` |
| Emails, SMS y cold email | emails, sms, cold-email | `resources/campanas/<proyecto>/email/` |
| Briefs de imagen y guiones de video | image, video | `resources/campanas/<proyecto>/visual/` |
| Entregables SEO (auditorías, keywords, schema, estrategia de contenido) | seo-audit, keyword-research, seo-strategy, schema, content-strategy, site-architecture, ai-seo | `resources/campanas/<proyecto>/seo/` |
| Copy de landing y CRO | copywriting, cro, conversion-optimization | `resources/campanas/<proyecto>/landing/` |
| Plan de medición y tracking | analytics, conversion-tracking, attribution | `resources/campanas/<proyecto>/medicion/` |
| Tabla de aprobación | director / productor / publicador | `resources/campanas/<proyecto>/aprobacion/` |
| Reporte de campaña | director-marketing, publicador-marketing | `resources/reportes/` |
| Línea base de la marca | director-marketing | `resources/linea-base/Linea_Base_<Proyecto>.md` |
| Perfiles de competidores | competitor-profiling | `resources/competidores/` |
| Teardown de competidor | reverse-engineer-marketing | `resources/teardowns/<objetivo>/` |
| Plan de marketing | marketing-plan | `resources/planes/<cliente>/` |

Dentro de `resources/campanas/<proyecto>/`, las piezas se guardan en la subcarpeta de su naturaleza (copy, anuncios, social, email, visual, seo, landing, medicion, aprobacion). El `paquete-campana.md` vive en la raíz de `<proyecto>` y referencia esas piezas.

## Contexto persistente (NO es un entregable)

Estos archivos son **contexto compartido** que otras skills leen en cada sesión, no entregables de campaña. Siguen viviendo en `.agents/`:

- `.agents/product-marketing.md` (product-marketing)
- `.agents/brand.md` y `.agents/design.md` (image, video)
- `.agents/listening-sources.md` (social)
- `.agents/advisors/` (marketing-council)

## Reglas

- Nunca escribas entregables fuera de `resources/` (ni en la raíz, ni en `~/`).
- Datos crudos con fecha (scrapes, respuestas de API) van en una subcarpeta `<YYYY-MM-DD>` dentro de la subcarpeta del entregable, para poder repetir y comparar.
- Los entregables de campaña son locales por usuario: `resources/` está en `.gitignore`. No subas datos de clientes.
