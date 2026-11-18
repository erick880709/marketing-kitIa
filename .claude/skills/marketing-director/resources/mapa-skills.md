# Mapa de skills del kit

Qué skill hace qué, de qué repositorio viene y en qué orden se invoca. Si una skill no está instalada, ejecuta la tarea tú mismo con la profundidad posible y regístralo como "ejecutado sin especialista".

Fuentes: **Corey** = github.com/coreyhaines31/marketingskills (MIT). **kostja94** = github.com/kostja94/marketing-skills (MIT). **Nueva** = construida para este kit.

## Contenido
1. Inventario por capa
2. Recorridos por tipo de solicitud
3. Dependencias que no se deben romper
4. Colisiones resueltas
5. Solapamientos: cuál usar
6. Skills referenciadas que no están en el kit

---

## 1. Inventario por capa

### Capa estratégica

| Skill | Repo | Úsala para |
|---|---|---|
| `product-marketing` | Corey | Crear o actualizar el contexto de producto (`.agents/product-marketing.md`) |
| `customer-research` | Corey | Extraer lenguaje real del cliente, dolores y objeciones |
| `competitor-profiling` | Corey | Investigar competidores |
| `gtm-strategy`, `product-launch` | kostja94 | Go-to-market y lanzamiento de producto o servicio |
| `branding` | kostja94 | Propósito, posicionamiento y voz de marca |
| `pricing-strategy`, `discount-marketing-strategy` | kostja94 | Precios y promociones |
| `growth-funnel`, `retention-strategy` | kostja94 | Embudo AARRR y retención |
| `offers` | Corey | Diseñar la oferta (bonos, garantías, urgencia honesta); servicios y B2B de ticket alto |
| `pricing` | Corey | Precio y empaquetado de software (planes, métrica de valor, freemium) |
| `launch` | Corey | Lanzamiento de producto o funcionalidad: Product Hunt, beta, lista de espera |
| `marketing-ideas` | Corey | Banco de ideas y tácticas de crecimiento |
| `reverse-engineer-marketing`, `competitors` | Corey | Cómo creció un competidor; páginas "X vs Y" y alternativas |
| `pmf-strategy`, `cold-start-strategy`, `indie-hacker-strategy`, `open-source-strategy` | kostja94 | Validación y primeros usuarios según el tipo de empresa |
| `research-sources` | kostja94 | Fuentes de información para ideación y monitoreo |
| `marketing-plan` | Corey | Plan de marketing con canales, presupuesto y metas |
| `integrated-marketing` | kostja94 | Concepto de campaña coordinado entre canales |
| `marketing-council` | Corey | Decisiones con trade-offs (simulación de expertos, rotular como simulación) |
| `marketing-psychology` | Corey | Principios de persuasión aplicados al mensaje |

### Capa SEO

| Skill | Repo | Úsala para |
|---|---|---|
| `seo-strategy` | kostja94 | Roadmap SEO priorizado |
| `keyword-research` | kostja94 | Coordinar investigación de keywords (descubrimiento, clustering, oportunidad, mapeo) |
| `keyword-discovery`, `keyword-clustering`, `keyword-opportunity`, `keyword-mapping` | kostja94 | Pasos individuales de investigación de keywords |
| `seo-audit` | Corey | Auditoría técnica y on-page |
| `schema` | Corey | Datos estructurados |
| `site-architecture` | Corey | Estructura del sitio, URLs, enlazado interno |
| `programmatic-seo` | Corey | Páginas a escala por plantilla |
| `ai-seo` | Corey | Visibilidad en respuestas de IA (ChatGPT, Perplexity, AI Overviews). Preferir sobre `generative-engine-optimization` (kostja94), que queda como complemento |
| `content-strategy` | Corey | Plan de contenidos orientado a búsqueda |
| `localization-strategy`, `translation` | kostja94 | Mercados e idiomas; keywords locales, no traducidas |
| `local-seo` | kostja94 | Google Business Profile y búsqueda local |
| `eeat-signals` | kostja94 | Señales de experiencia y autoridad (sectores regulados, B2B técnico) |
| `link-building` | Corey | Enlaces y menciones que mejoran ranking y citas en IA |
| `website-structure`, `domain-selection`, `domain-architecture`, `multi-domain-brand-seo` | kostja94 | Qué páginas construir y decisiones de dominio |

### Capa de pauta

| Skill | Repo | Úsala para |
|---|---|---|
| `ads` | Corey | Planear, ejecutar, diagnosticar campañas en Google, Meta y LinkedIn |
| `ad-creative` | Corey | Titulares, textos, ángulos y variantes de anuncios |
| `paid-ads-strategy` | kostja94 | Mezcla de canales pagados y reparto de presupuesto |
| `google-ads`, `meta-ads`, `linkedin-ads`, `tiktok-ads`, `reddit-ads`, `youtube-ads` | kostja94 | Detalle por plataforma; solo las que se usen |
| `cro` | Corey | Landing y páginas de destino |
| `conversion-tracking` | Corey | Píxeles, CAPI, conversiones mejoradas, eventos |
| `analytics` | Corey | Plan de medición, GA4, UTMs |
| `attribution` | Corey | Atribución entre canales |
| `ab-testing` | Corey | Diseño y lectura de pruebas |
| `signup`, `onboarding`, `popups` | Corey | Registro, activación y captación en sitio |
| `revops` | Corey | Ciclo de vida del lead, MQL/SQL, scoring y traspaso a ventas |

### Capa de contenido y redes

| Skill | Repo | Úsala para |
|---|---|---|
| `copywriting` | Corey | Redacción de páginas, anuncios y piezas |
| `copy-editing` | Corey | Edición y eliminación de "frases de IA" |
| `content-marketing` | kostja94 | Formatos y reutilización de contenido entre canales |
| `social` | Corey | Contenido orgánico para LinkedIn, X, Instagram, TikTok, Facebook; calendarios |
| `linkedin-posts` | kostja94 | Profundidad en LinkedIn |
| `youtube-seo` | kostja94 | Títulos, descripciones y optimización en YouTube |
| `image` | Corey | Piezas gráficas (para anuncios, ver `ad-creative`) |
| `video` | Corey | Guiones y producción de video |
| `emails` | Corey | Secuencias de nutrición y correos de campaña |
| `lead-magnets` | Corey | Recursos descargables para captar leads |
| `free-tools` | Corey | Herramientas gratuitas (calculadoras, evaluadores) como imán de leads |
| `sms` | Corey | SMS y WhatsApp |
| `influencer-marketing`, `public-relations` | Corey | Creadores, prensa y medios |
| `cold-email`, `prospecting`, `sales-enablement` | Corey | Prospección en frío y material de ventas (B2B) |
| `aso` | Corey | Fichas de App Store y Google Play |
| `marketing-loops` | Corey | Tareas recurrentes que un agente ejecuta con cadencia (chequeos semanales de pauta o SEO) |

### Capa de marca

| Skill | Repo | Úsala para |
|---|---|---|
| `branding` | kostja94 | Estrategia, historia y voz de marca |
| `brand-monitoring`, `brand-protection` | kostja94 | Monitorear menciones y actuar contra suplantación |
| `rebranding-strategy` | kostja94 | Cambio de marca o dominio, redirecciones |

---

## 2. Recorridos por tipo de solicitud

| Tipo | Orden de invocación |
|---|---|
| `campana-completa` | `product-marketing` (si no hay contexto) → `customer-research` → `marketing-plan` / `integrated-marketing` → `analytics` + `conversion-tracking` → `keyword-research` → `copywriting` → `ad-creative` → `social` → `emails` → `cro` (landing) → `copy-editing` (revisión final) |
| `seo` | `seo-audit` → `keyword-research` → `seo-strategy` → `site-architecture` / `schema` → `content-strategy` → `copywriting` → `ai-seo` |
| `pauta` | `analytics` + `conversion-tracking` → `ads` (+ skill de la plataforma: `meta-ads`, `google-ads`, `linkedin-ads`…) → `ad-creative` → `cro` → `ab-testing` |
| `organico` | `social` (+ `linkedin-posts` si es LinkedIn) → `copy-editing` → `image` / `video` si hace falta pieza visual |
| `pieza` | Skill de la pieza (`copywriting`, `ad-creative`, `emails`...) → `copy-editing` |
| `plan` | `customer-research` → `competitor-profiling` → `marketing-plan` → `marketing-council` opcional |
| `diagnostico` | `analytics` → `ads` (modo diagnóstico) o `seo-audit` → `attribution` |

---

## 3. Dependencias que no se deben romper

- **Medición antes de pauta.** Lanzar anuncios sin conversiones configuradas impide optimizar y desperdicia presupuesto. Si no hay tracking, la primera tarea de la campaña es `conversion-tracking`.
- **Keywords antes de contenido SEO.** Escribir primero y buscar keywords después produce contenido que nadie busca.
- **Mensaje central antes de piezas.** Todas las skills de producción reciben el mismo mensaje central y ángulos; así la campaña se ve coherente entre canales.
- **Landing antes de activar anuncios.** El anuncio promete; la landing cumple. Si no existe destino, la pauta espera.

---

## 4. Colisiones resueltas

Estas skills existen en ambos repositorios. Instala solo la versión indicada para evitar que el agente active la equivocada. Los duplicados de kostja94 retirados del kit están en `.claude/_skills-descartadas/` (fuera de la carpeta de skills, no se cargan).

| Nombre | Versión elegida | Motivo |
|---|---|---|
| `content-strategy` | Corey | Integrada con el contexto de producto y con evals |
| `copywriting` | Corey | Evals y referencias de "frases de IA" |
| `seo-audit` | Corey | Evals; kostja94 cubre la estrategia con `seo-strategy` (versión kostja94 v1.1.0 retirada) |
| `integrated-marketing`, `localization-strategy`, `paid-ads-strategy`, `youtube-ads` | kostja94 (una sola copia) | Había copias idénticas anidadas; se dejó una |
| `programmatic-seo` | Corey | Evals |
| `link-building` | Corey | Evals |
| `influencer-marketing` | Corey | Evals |
| `public-relations` | Corey | Evals |

---

## 5. Solapamientos: cuál usar

Estas skills tienen nombres distintos pero cubren temas parecidos. Usa la principal y la otra solo como complemento.

| Tema | Principal | Complemento |
|---|---|---|
| Visibilidad en IA | `ai-seo` | `generative-engine-optimization` |
| Conversión de páginas y formularios | `cro` | `conversion-optimization` (embudo completo) |
| Plan de contenidos | `content-strategy` (búsqueda) | `content-marketing` (formatos y reutilización entre canales) |
| Lanzamiento | `launch` (ejecución) | `product-launch` (checklist), `gtm-strategy` (modelo de salida al mercado) |
| Precios | `pricing` (software) | `pricing-strategy`, `discount-marketing-strategy` (promociones) |
| Estructura del sitio | `site-architecture` | `website-structure` (priorizar páginas) |
| Estrategia de pauta | `ads` | `paid-ads-strategy` (mezcla de canales) + skill de cada plataforma |

## 6. Skills referenciadas que no están en el kit

Algunas skills mencionan especialistas que no existen en este kit (sobre todo del repositorio kostja94): generadores de páginas (`landing-page-generator`, `pricing-page-generator`, `homepage-generator`…), `entity-seo`, `serp-features`, `product-hunt-launch`, `directory-submission`, `tiktok-captions`, `reddit-posts`, `parasite-seo`, `medium-posts`, entre otros. Cuando una skill remita a uno de ellos, haz la tarea con la skill más cercana del kit (por ejemplo, `copywriting` + `cro` para una landing, `social` para captions de TikTok, `launch` para Product Hunt) o tú mismo, y regístralo como "ejecutado sin especialista".
