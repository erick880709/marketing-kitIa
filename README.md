# Kit de Marketing Agéntico

Kit para Claude Code que convierte una idea de negocio ("quiero conseguir clientes para nuestro servicio de QA") en una campaña completa: brief, estrategia, piezas por canal, publicación en redes y plataformas de anuncios por MCP, y reporte de resultados.

El kit tiene dos partes:

- **Un agente coordinador**, `director-marketing`. Entiende la necesidad, decide la estrategia y llama a las skills en el orden correcto.
- **89 skills especialistas**: SEO, pauta, redes, email, contenido, marca, medición y más. Cada una sabe hacer bien un trabajo.

No necesitas saber qué skill usar: le hablas al agente y él decide.

## Primera prueba (para el equipo de marketing)

1. **Clona el repositorio** y abre la carpeta en VS Code:
   ```bash
   git clone <url-del-repositorio>
   cd kit-marketing-agentico
   ```
2. **Elige tu herramienta:**
   - **Claude Code:** en la terminal, ejecuta `claude --agent director-marketing`.
   - **GitHub Copilot:** en el chat de VS Code, escribe `/campana-desde-idea`.
3. **Escribe una idea real en una frase**, por ejemplo: *"Quiero conseguir 20 reuniones con gerentes de TI para nuestro servicio de QA automatizado en Colombia"*.
4. **Responde las preguntas, revisa el brief y sigue el flujo.** No conectes redes de clientes reales en las primeras pruebas. Sin conectores, el kit entrega el paquete listo para copiar y pegar.
5. **Reporta el resultado** en *Issues → New issue → Resultado de prueba del kit*. No pegues datos confidenciales de clientes.

Las salidas de tus pruebas (`campanas/`, `.agents/`, `Linea_Base_*.md`) quedan solo en tu equipo, porque `.gitignore` las excluye.

---

## Contenido

1. [Estructura del kit](#1-estructura-del-kit)
2. [Instalación](#2-instalación)
3. [Conectar redes sociales y plataformas de anuncios (MCP)](#3-conectar-redes-sociales-y-plataformas-de-anuncios-mcp)
4. [Cómo usar el kit](#4-cómo-usar-el-kit)
4b. [Workflows: Claude Code y GitHub Copilot](#4b-workflows-claude-code-y-github-copilot)
5. [Entradas que necesita el agente](#5-entradas-que-necesita-el-agente)
6. [Salidas del agente](#6-salidas-del-agente)
7. [Catálogo de skills: entradas y salidas](#7-catálogo-de-skills-entradas-y-salidas)
8. [Archivos que genera el kit](#8-archivos-que-genera-el-kit)
9. [Reglas de seguridad](#9-reglas-de-seguridad)
10. [Mantenimiento y limitaciones](#10-mantenimiento-y-limitaciones)

---

## 1. Estructura del kit

```
Marketing/
├── README.md                         ← esta guía
├── .claude/
│   ├── agents/
│   │   ├── director-marketing.md     ← agente coordinador (punto de entrada, conversa con el usuario)
│   │   ├── productor-marketing.md    ← subagente: produce y revisa piezas, arma el paquete
│   │   └── publicador-marketing.md   ← subagente: ejecuta por MCP solo lo aprobado
│   ├── skills/                       ← 89 skills, una carpeta por skill
│   │   ├── marketing-director/       ← skill inicial: el manual operativo del agente
│   │   │   ├── SKILL.md
│   │   │   └── resources/            ← brief, intake, mapa de skills, MCP, aprobación, reporte
│   │   ├── copywriting/
│   │   ├── ads/
│   │   └── …
│   ├── workflows/
│   │   └── campana-desde-idea.js     ← workflow de Claude Code (producción en paralelo)
│   └── _skills-descartadas/          ← duplicados retirados (no se cargan)
├── .github/                          ← versión para GitHub Copilot
│   ├── copilot-instructions.md
│   ├── agents/                       ← director, productor y publicador (encadenados con handoffs)
│   └── prompts/                      ← /campana-desde-idea, /conectar-redes, /reporte-campana
├── .vscode/mcp.ejemplo.json          ← plantilla de servidores MCP para VS Code / Copilot
├── campanas/<proyecto>/              ← paquetes de campaña generados (no se suben a git)
└── THIRD_PARTY_NOTICES.md            ← licencias de las skills de terceros
```

Importante: Claude Code solo reconoce skills en `.claude/skills/<nombre>/SKILL.md`, a un nivel de profundidad. No muevas skills a subcarpetas.

---

## 2. Instalación

### Requisitos

- **Claude Code**: CLI, extensión de VS Code o JetBrains, o app de escritorio.
- Una cuenta de Claude con acceso a Claude Code.
- Opcional: **Node.js 18+**, solo si vas a conectar Composio (`npx`) o usar las CLI de anuncios.
- Opcional: cuentas en las plataformas que quieras conectar (Post Bridge, Meta Business, Google Ads, HubSpot, etc.).

### Opción A: usar el kit en este proyecto (recomendada)

1. Abre la carpeta `Marketing/` en Claude Code. El kit ya está en `.claude/`.
2. Inicia una sesión y verifica la instalación:
   - Ejecuta `/agents`: debe aparecer **director-marketing**.
   - Escribe `/marketing-director`: la skill debe cargarse.

### Opción B: llevar el kit a otro proyecto

Copia las carpetas `agents` y `skills` al `.claude/` del otro proyecto:

```bash
# Desde la carpeta Marketing/
cp -r .claude/agents  <ruta-del-proyecto>/.claude/
cp -r .claude/skills  <ruta-del-proyecto>/.claude/
```

### Opción C: tenerlo disponible en todos tus proyectos

Copia las mismas carpetas al directorio de usuario: `~/.claude/agents/` y `~/.claude/skills/`. En Windows es `C:\Users\<usuario>\.claude\`.

Si un proyecto tiene skills con el mismo nombre, las del proyecto tienen prioridad.

---

## 3. Conectar redes sociales y plataformas de anuncios (MCP)

Las conexiones son **opcionales**. Sin ellas, el kit entrega todo listo para copiar y pegar, con instrucciones paso a paso. Con ellas, el agente puede publicar, programar, crear campañas (siempre en pausa) y leer métricas, **siempre con tu aprobación**.

El agente te guía en la primera conversación. También puedes hacerlo tú directamente.

### Conectores recomendados

| Canal | Conector | Cómo se conecta |
|---|---|---|
| Redes orgánicas: LinkedIn, Instagram, Facebook, TikTok, X, YouTube, Threads, Pinterest, Google Business | **Post Bridge** | `claude mcp add --transport http --scope project post-bridge https://www.post-bridge.com/api/mcp/mcp` |
| Facebook e Instagram Ads | **Meta Ads** (oficial) | `claude mcp add --transport http --scope project meta-ads https://mcp.facebook.com/ads` |
| CRM y email | **HubSpot** | `claude mcp add --transport http --scope project hubspot https://mcp.hubspot.com` o conector de claude.ai |
| SEO | **Semrush** | `claude mcp add --transport http --scope project semrush https://mcp.semrush.com/v2/mcp` |
| LinkedIn Ads y redes sin MCP propio | **Composio** | `npx @composio/mcp@latest setup` |
| Google Ads, GA4, Buffer, Zapier | MCP de cada proveedor | Ver la guía de cada uno en [tools/integrations](https://github.com/coreyhaines31/marketingskills/tree/main/tools/integrations) |
| Piezas gráficas | **Canva** | Conector de claude.ai |

Después de agregar un servidor:

1. En Claude Code, ejecuta `/mcp`, elige el servidor e inicia sesión en el navegador (OAuth).
2. Pide al agente que **verifique la conexión**. Hará una consulta de solo lectura, como listar tus cuentas o páginas, y te pedirá confirmar que es la cuenta correcta.

**Nunca pegues tokens, contraseñas ni API keys en el chat.** La guía completa está en [setup-conexiones.md](.claude/skills/marketing-director/resources/setup-conexiones.md) y el catálogo en [conexiones-mcp.md](.claude/skills/marketing-director/resources/conexiones-mcp.md).

---

## 4. Cómo usar el kit

### Inicio rápido

Inicia Claude Code con el agente como conversación principal. Es la forma recomendada, porque así el agente puede hacerte preguntas:

```bash
claude --agent director-marketing
```

Luego escribe tu idea en lenguaje natural:

```
Quiero conseguir clientes empresariales para nuestro nuevo servicio de pruebas automatizadas de software en Colombia.
```

Otras formas de invocarlo:

- En una sesión normal, pide: "usa el agente director-marketing para…".
- Usa la skill directamente: `/marketing-director quiero una campaña para…`.
- Llama una skill concreta si ya sabes lo que necesitas, por ejemplo `/copywriting hazme el copy de la landing de…`.

### Qué pasa después: el flujo de 9 fases

| Fase | Qué hace el agente | Qué haces tú |
|---|---|---|
| 0. Contexto | Lee el contexto de producto, la línea base y tus adjuntos. Revisa qué redes están conectadas | Adjunta lo que tengas: brochure, sitio web, campañas anteriores |
| 1. Interpretar | Clasifica tu pedido: campaña completa, SEO, pauta, orgánico, pieza, plan, diagnóstico o reporte | Nada |
| 2. Preguntas | Hace solo las preguntas bloqueantes: máximo 3 a 5 por ronda y 2 rondas | Responde, o di "tú decide" |
| 3. Brief | Redacta el brief con puntaje de completitud y supuestos | **Confirma o corrige** |
| 4. Estrategia | Define el mensaje central, ángulos, canales, embudo, calendario, presupuesto y KPIs | Revisa |
| 5. Delegación | Llama a las skills especialistas en orden | Nada |
| 6. Producción | Arma el paquete de campaña con todas las piezas, revisadas | Revisa |
| 7. Aprobación | Muestra una tabla con cada acción externa: contenido, cuenta, fecha, presupuesto y cómo revertirla | **Aprueba fila por fila** ("apruebo 1 y 3") |
| 8. Publicación | Publica, programa o crea campañas en pausa por MCP, o entrega el paquete manual | Activa las campañas cuando quieras (requiere otra aprobación) |
| 9. Reporte | Entrega el reporte, los KPIs y lo que no pudo determinar. Actualiza la línea base | Vuelve con "¿cómo va la campaña?" |

### Ejemplos de pedidos

| Pides | El agente lo trata como | Recorrido principal |
|---|---|---|
| "Quiero vender más cursos de inglés en Medellín" | Campaña completa | product-marketing → customer-research → marketing-plan → tracking → keywords → copy → anuncios → redes → email → landing |
| "No aparecemos en Google" | SEO | seo-audit → keyword-research → seo-strategy → site-architecture/schema → content-strategy |
| "Quiero hacer anuncios en LinkedIn" | Pauta | analytics + conversion-tracking → ads → linkedin-ads → ad-creative → cro |
| "Publica algo sobre el evento del jueves" | Orgánico | social → linkedin-posts → image → copy-editing |
| "Hazme el copy de la landing" | Pieza | copywriting → copy-editing |
| "Arma el plan de marketing del semestre" | Plan | customer-research → competitor-profiling → marketing-plan |
| "¿Por qué no funcionan mis anuncios?" | Diagnóstico | analytics → ads → attribution |
| "Vamos a lanzar un producto nuevo" | Lanzamiento | gtm-strategy → offers/pricing → launch → campaña completa |

---

## 4b. Workflows: Claude Code y GitHub Copilot

Las dos herramientas usan **las mismas skills** (`.claude/skills/`) y las mismas reglas: brief confirmado antes de producir, aprobación explícita antes de publicar y nada de credenciales en el chat. Cambia cómo se encadenan los pasos.

### ¿Hace falta más de un agente?

**Para elegir skills, no: basta con `director-marketing`.** La selección sigue reglas fijas (tipo de pedido → recorrido del mapa → dependencias → solapamientos), así que un segundo agente "router" competiría con el primero y crearía decisiones contradictorias. Lo que sí conviene separar es la **ejecución**:

- **Producción en paralelo.** Con 3 o más canales, un solo contexto se satura. En Claude lo resuelve el workflow; en Copilot, el agente `productor-marketing`.
- **Publicación aislada.** Solo `publicador-marketing` ejecuta escrituras por MCP. En Claude es un subagente que no habla con el usuario: el director hace el gate y le pasa las filas aprobadas textualmente. En Copilot, el publicador conversa directamente y hace el gate él mismo.

Los tres agentes existen en ambas herramientas, cada uno en su formato: `.claude/agents/*.md` para Claude y `.github/agents/*.agent.md` para Copilot. No se pueden copiar de una carpeta a la otra, porque los nombres de herramientas y los *handoffs* son distintos.

### Claude Code: workflow `campana-desde-idea`

```
Usuario ──► director-marketing (fases 0-3: contexto, preguntas, brief confirmado)
                 │  "¿Ejecuto el workflow?" (pide permiso)
                 ▼
         Workflow campana-desde-idea (fases 4-6, sin publicar)
           Contexto ─► Estrategia ─► [Canal 1: producir → revisar]
                                     [Canal 2: producir → revisar]   (en paralelo)
                                     [Canal N: producir → revisar]
                       ─► Paquete: campanas/<proyecto>/paquete-campana.md + tabla de aprobación
                 │
                 ▼
         director-marketing (fase 7 gate con el usuario)
                 │  filas aprobadas, textuales
                 ▼
         publicador-marketing (fase 8: publica o crea campañas en pausa, devuelve IDs)
                 │
                 ▼
         director-marketing (fase 9 reporte y línea base)
```

- **Cuándo se usa:** cuando el brief está confirmado y la campaña tiene 3 o más canales. El agente lo ofrece y pide permiso, porque lanza varios agentes y consume más tokens. Con 1 o 2 canales, el director delega en el subagente `productor-marketing`. Las etapas de producción, revisión y paquete del workflow corren con ese mismo subagente, así que necesita `.claude/agents/productor-marketing.md`.
- **Ejecución manual:** en una sesión de Claude Code, pide *"ejecuta el workflow campana-desde-idea con este brief"* o usa `/workflows` para ver el progreso.
- **Entradas (`args`):** `brief` (texto del brief confirmado), `proyecto` (slug, usado en la carpeta y en `utm_campaign`), `fecha` (AAAA-MM-DD).
- **Salidas:** `campanas/<proyecto>/paquete-campana.md` (estrategia, KPIs, piezas revisadas por canal, tabla de aprobación, paquete manual para canales sin conector) y un resumen con canales, estado de conexiones y "Lo que no pude determinar".
- **No publica.** La publicación siempre vuelve a la conversación, con aprobación fila por fila.

### GitHub Copilot: agentes encadenados con handoffs

Copilot no ejecuta scripts de workflow. El flujo equivalente son tres agentes personalizados en `.github/agents/`, que se pasan el trabajo con botones de *handoff*:

```
/campana-desde-idea
   │
   ▼
director-marketing      fases 0-4: contexto, preguntas, brief, estrategia y skills por canal
   │  [Producir piezas de la campaña]
   ▼
productor-marketing     fases 5-6: aplica las skills por canal, revisa y escribe el paquete
   │  [Aprobar y publicar]
   ▼
publicador-marketing    fases 7-9: conexiones MCP, gate, publicación (pausada) y reporte
   │  [Volver al director]
   └──────────────► siguiente iteración
```

**Configuración en VS Code:**

1. Abre la carpeta `Marketing/` en VS Code con GitHub Copilot Chat. Los agentes de `.github/agents/` aparecen en el selector de agentes del chat, y los prompts de `.github/prompts/` como comandos `/`.
2. Los agentes leen las skills directamente desde `.claude/skills/<skill>/SKILL.md`, así que no hace falta duplicarlas. Si además quieres que Copilot cargue las skills de forma automática y tu versión solo lee `.github/skills/`, copia `.claude/skills` a `.github/skills`. Esa copia debes mantenerla sincronizada.
3. Para MCP, copia `.vscode/mcp.ejemplo.json` como `.vscode/mcp.json`, deja solo los servidores que vayas a usar, inícialos desde la vista de MCP y autoriza cada uno por OAuth.
4. Elige el modelo en el selector de Copilot. Los agentes no fijan modelo.

**Prompts disponibles:**

| Prompt | Agente | Entrada | Salida |
|---|---|---|---|
| `/campana-desde-idea` | director-marketing | Tu idea en una frase | Brief confirmado, estrategia y tabla de canales y skills, con handoff al productor |
| `/conectar-redes` | publicador-marketing | Canales a conectar (opcional) | Tabla de estado, guía paso a paso, verificación en solo lectura y registro en la línea base |
| `/reporte-campana` | publicador-marketing | Nombre de la campaña | Reporte contra KPIs, recomendaciones y tabla de aprobación de cambios |

### Equivalencias

| Paso | Claude Code | GitHub Copilot |
|---|---|---|
| Entrada | `claude --agent director-marketing` | `/campana-desde-idea` |
| Brief y estrategia | director-marketing | director-marketing |
| Producción | productor-marketing (subagente), o el workflow `campana-desde-idea` con productor-marketing en paralelo | productor-marketing (secuencial) |
| Aprobación (gate) | director-marketing | publicador-marketing |
| Ejecución por MCP | publicador-marketing (subagente, recibe las filas aprobadas) | publicador-marketing |
| MCP | `claude mcp add …` + `/mcp` (`.mcp.json`) | `.vscode/mcp.json` + vista de MCP |
| Instrucciones globales | `.claude/agents/director-marketing.md` | `.github/copilot-instructions.md` |

---

## 5. Entradas que necesita el agente

### Mínimo para empezar

Una frase con tu idea. El agente infiere lo que puede y pregunta solo lo que cambia la estrategia.

### Datos bloqueantes

Si no los das, el agente los pregunta. Si respondes "tú decide", los marca como `ASUMIDO`.

| Dato | Ejemplo | Cuándo es bloqueante |
|---|---|---|
| **Objetivo** | Generar 30 leads B2B al mes, vender 100 unidades, aumentar visitas | Siempre |
| **Oferta** | Qué vendes, precio o rango, qué te diferencia | Siempre |
| **Audiencia** | Gerentes de TI de empresas medianas en Colombia | Siempre |
| **Presupuesto y periodo** | 2.000.000 COP mensuales | Solo si hay pauta |
| **Acción esperada** | Agendar demo, comprar, descargar, escribir por WhatsApp | Campañas de conversión |

### Datos asumibles

Si faltan, el agente los decide y lo dice: tono, formatos, frecuencia de publicación, calendario, canales secundarios.

### Contexto que mejora el resultado

| Insumo | Dónde ponerlo | Para qué sirve |
|---|---|---|
| Contexto de producto (ICP, posicionamiento, voz) | `.agents/product-marketing.md`. Lo crea la skill `product-marketing` | Evita repetir preguntas en cada campaña |
| Historial de la marca | `Linea_Base_<Proyecto>.md` en la raíz. Lo crea y actualiza el agente | Decisiones, aprendizajes y cuentas conectadas |
| Documentos | Adjúntalos en el chat: brochure, URL del sitio, reportes, campañas anteriores | Datos reales en vez de supuestos |
| Métricas | Conectores MCP de solo lectura (GA4, Meta Ads, Google Ads, Post Bridge) o exportes | Diagnósticos y reportes |

**El agente no inventa datos.** Métricas, precios, testimonios, clientes, premios o certificaciones solo se usan si los aportas. Si faltan, quedan marcados como `FALTA`.

---

## 6. Salidas del agente

| Salida | Cuándo | Formato |
|---|---|---|
| **Brief de campaña** | Fase 3 | Markdown con objetivo, audiencia, oferta, mensaje, canales, KPIs, puntaje de completitud (0-100) y supuestos etiquetados |
| **Estrategia y plan** | Fase 4 | Mensaje central, 2-3 ángulos, mezcla de canales justificada, embudo, calendario, presupuesto por canal y KPIs por etapa |
| **Paquete de campaña** | Fase 6 | Piezas ordenadas por canal y fecha: anuncios y variantes, posts por red, artículos, landing, emails, guiones de video, briefs de imagen, enlaces con UTM |
| **Tabla de aprobación** | Fase 7 | Una fila por acción externa: contenido completo, cuenta, fecha, presupuesto y cómo se revierte |
| **Publicaciones y campañas** | Fase 8 | Posts publicados o en borrador y campañas creadas en pausa, con el ID o URL que devolvió la plataforma. Sin conector: paquete manual paso a paso |
| **Estado de conexiones** | Fases 0 y 8 | Tabla por canal: conectado, no conectado o requiere autorización |
| **Reporte** | Fase 9 | Qué se hizo y qué skill lo hizo, pendientes, KPIs y cómo leerlos, puntaje de preparación y "Lo que no pude determinar" |
| **Línea base actualizada** | Fase 9 | `Linea_Base_<Proyecto>.md` con decisiones, supuestos confirmados, aprendizajes y cuentas conectadas |

Las plantillas están en [.claude/skills/marketing-director/resources/](.claude/skills/marketing-director/resources/).

---

## 7. Catálogo de skills: entradas y salidas

Todas las skills leen `.agents/product-marketing.md` si existe. Cuando las llama el agente, reciben además el brief y el mensaje central. La columna "Entradas" indica lo que la skill necesita además de eso.

Origen: **C** = Corey Haines (`coreyhaines31/marketingskills`, MIT). **K** = kostja94 (`kostja94/marketing-skills`, MIT). **N** = construida para este kit.

### 7.1 Coordinación y estrategia

| Skill | Origen | Entradas | Salidas |
|---|---|---|---|
| `marketing-director` | N | Idea o pedido en texto libre, adjuntos | Brief, estrategia, paquete de campaña, tabla de aprobación, reporte, línea base |
| `product-marketing` | C | Información del producto, clientes, competidores, sitio web | `.agents/product-marketing.md`: ICP, posicionamiento, propuesta de valor y voz |
| `customer-research` | C | Entrevistas, encuestas, reseñas, tickets, foros | Síntesis de investigación, banco de citas del cliente (VOC), personas y JTBD |
| `competitor-profiling` | C | Nombres o URLs de competidores | Un perfil fechado por competidor en `competitor-profiles/`, con hechos separados de inferencias |
| `reverse-engineer-marketing` | C | Competidor a analizar, tus datos para comparar | `teardowns/<competidor>/playbook.md`: línea de tiempo de movimientos y jugadas a copiar |
| `marketing-plan` | C | Empresa o cliente, equipo, presupuesto, metas | `~/marketing-plans/<cliente>/final_plan.md`: canales, presupuesto, equipo, metas AARRR |
| `integrated-marketing` | K | Objetivo y audiencia | Definición del programa, selección de canales, mapa PESO y estructura de campaña |
| `marketing-council` | C | Decisión con trade-offs | Opiniones simuladas de expertos, desacuerdos y recomendación |
| `marketing-psychology` | C | Mensaje, página u oferta | Principios de persuasión aplicables y evaluación de honestidad |
| `marketing-ideas` | C | Producto, etapa, tiempo y presupuesto | Lista de ideas priorizadas con por qué encajan y primeros pasos |
| `gtm-strategy` | K | Escenario (lanzamiento, nuevo mercado, reposicionamiento) | Modelo de salida al mercado (PLG/SLG/MLG), plan de 90 días, ICP y persona |
| `pmf-strategy` | K | Señales de producto, métricas, feedback | Diagnóstico de product-market fit y plan de validación |
| `cold-start-strategy` | K | Producto sin tracción | 2-3 canales, línea de tiempo y checklist para los primeros usuarios |
| `indie-hacker-strategy` | K | Proyecto de fundador solo | Plan para los primeros 100 usuarios y mezcla de "Build in Public" |
| `open-source-strategy` | K | Proyecto open source | Estrategia de crecimiento y monetización |
| `growth-funnel` | K | Métricas por etapa | Diagnóstico AARRR, metas por etapa y acciones por cuello de botella |
| `retention-strategy` | K | Datos de churn y ciclo de vida | Análisis de churn, tácticas por etapa y playbook de intervención |
| `research-sources` | K | Uso (ideación, competencia, industria) | Lista corta de fuentes y cadencia de monitoreo |
| `marketing-loops` | C | Tarea recurrente deseada | Definición de una tarea automática: cadencia, qué revisa, qué recuerda y cuándo para |

### 7.2 Oferta, precio y lanzamiento

| Skill | Origen | Entradas | Salidas |
|---|---|---|---|
| `offers` | C | Producto o servicio y precio actual | Oferta rediseñada: bonos, garantía, urgencia honesta, planes de pago |
| `pricing` | C | Producto, costos, clientes y competidores | Planes, métrica de valor, freemium o prueba, plan de migración de precios |
| `pricing-strategy` | K | Modelo de negocio | Modelo de precios, estructura de planes, anclaje |
| `discount-marketing-strategy` | K | Promoción deseada (Black Friday, cupones, LTD) | Tipo de descuento, campaña y límites financieros |
| `launch` | C | Producto o funcionalidad y fecha | Plan de lanzamiento: beta, lista de espera, Product Hunt, notas de versión |
| `product-launch` | K | Producto y canales | Plan por canal y checklist pre, durante y post lanzamiento |

### 7.3 SEO y búsqueda

| Skill | Origen | Entradas | Salidas |
|---|---|---|---|
| `seo-strategy` | K | Sitio y objetivos | Fase actual, tareas priorizadas P0-P3 y qué skill hace cada una |
| `seo-audit` | C | URL del sitio, datos de Search Console si hay | Informe de auditoría técnica y on-page con prioridades |
| `keyword-research` | K | Palabra semilla o lista de keywords, mercado e idioma | Coordina los 4 pasos siguientes y entrega keywords agrupadas, priorizadas y asignadas a páginas |
| `keyword-discovery` | K | Semilla, competidores, lenguaje del cliente | Lista ampliada de búsquedas long-tail |
| `keyword-clustering` | K | Lista de keywords | Clusters por intención y decisión de qué va en la misma página |
| `keyword-opportunity` | K | Clusters y objetivo de negocio | Clusters priorizados por demanda, encaje, competencia y costo |
| `keyword-mapping` | K | Clusters y páginas del sitio | Mapa keyword → página: reutilizar, mejorar, consolidar o crear |
| `content-strategy` | C | Temas, audiencia, keywords | Pilares, clusters de temas y calendario editorial priorizado |
| `site-architecture` | C | Sitio actual o tipo de sitio | Jerarquía de páginas, URLs, navegación, enlazado interno y sitemap en Mermaid |
| `website-structure` | K | Tipo de sitio y etapa | Lista de páginas priorizadas (imprescindible, deseable, opcional) y estructura de URLs |
| `schema` | C | Página y tipo de contenido | Código JSON-LD listo para implementar |
| `programmatic-seo` | C | Plantilla y fuente de datos | Estrategia de páginas a escala, plantilla y guía de contenido |
| `ai-seo` | C | Sitio, temas y competidores citados | Plan para aparecer en ChatGPT, Perplexity y AI Overviews |
| `generative-engine-optimization` | K | Contenido existente | Estructura para citas en IA, entidades y distribución (complementa `ai-seo`) |
| `eeat-signals` | K | Páginas o sitio | Evaluación E-E-A-T, bio de autor, plan de citas y señales de experiencia |
| `link-building` | C | Páginas objetivo | Diagnóstico de enlaces, activos enlazables y plan de outreach |
| `local-seo` | K | Negocio local, ubicaciones | Formato NAP, checklist de Google Business Profile y lista de citas locales |
| `localization-strategy` | K | Mercados e idiomas objetivo | Decisión de locales, arquitectura de URLs, hreflang y plan de despliegue |
| `translation` | K | Texto fuente e idioma destino | Traducción o transcreación, glosario y revisión |
| `domain-selection` | K | Marca y mercado | Tipo de dominio, TLD y checklist |
| `domain-architecture` | K | Productos o marcas múltiples | Recomendación de subcarpeta, subdominio o dominio propio |
| `multi-domain-brand-seo` | K | Dominios de la empresa | Mapa hub-spoke, schema Organization y enlazado |
| `youtube-seo` | K | Video y tema | Títulos, descripción, etiquetas y guía de miniatura |
| `aso` | C | Ficha de App Store o Google Play | Título, keywords, capturas y comparación con competidores |

### 7.4 Pauta y medición

| Skill | Origen | Entradas | Salidas |
|---|---|---|---|
| `ads` | C | Objetivo, presupuesto, cuentas, datos de campañas si existen | Plan de campaña, estructura, diagnóstico (mantener, ajustar o apagar). Datos faltantes marcados MISSING |
| `paid-ads-strategy` | K | Objetivo y presupuesto | Canal recomendado, cuándo empezar, enfoque de presupuesto y requisito de landing |
| `google-ads` | K | Keywords, presupuesto, landing | Estructura de búsqueda, Performance Max, RSA y Quality Score |
| `meta-ads` | K | Audiencia, creatividades, píxel | Estructura Advantage+, audiencias, píxel y CAPI |
| `linkedin-ads` | K | Audiencia B2B (cargos, empresas) | Formatos, segmentación, Lead Gen Forms e Insight Tag |
| `tiktok-ads` | K | Creatividades de video | Formatos, Spark Ads, píxel y Events API |
| `youtube-ads` | K | Video y objetivo | Formato recomendado, especificaciones creativas y checklist |
| `reddit-ads` | K | Comunidades objetivo | Segmentación por subreddit y formatos |
| `ad-creative` | C | Mensaje, ángulos, plataforma | Titulares y textos por ángulo, con conteo de caracteres e hipótesis de prueba |
| `cro` | C | URL o copy de la página o formulario | Recomendaciones: cambios rápidos, pruebas y cambios mayores |
| `conversion-optimization` | K | Datos del embudo | Mapa del embudo, hipótesis y plan de prueba |
| `signup` | C | Flujo de registro | Hallazgos con impacto y recomendaciones |
| `onboarding` | C | Primera experiencia del usuario | Auditoría y diseño de flujo de activación |
| `popups` | C | Página y objetivo de captación | Diseño de popup: tipo, disparador, segmentación y copy |
| `analytics` | C | Sitio, herramienta (GA4, GTM, Mixpanel…) | Plan de medición: eventos, nombres y UTMs |
| `conversion-tracking` | C | Plataformas de anuncios y sitio | Configuración y diagnóstico de píxeles, CAPI, conversiones mejoradas, con verificación |
| `attribution` | C | Datos de canales e ingresos | Lectura de atribución: qué canal funciona y qué números creer |
| `ab-testing` | C | Hipótesis y tráfico | Plan de prueba (muestra, duración) o lectura de resultados |
| `revops` | C | Proceso de leads y CRM | Etapas del ciclo de vida, scoring MQL/SQL, enrutamiento y SLA |

### 7.5 Contenido, redes y canales directos

| Skill | Origen | Entradas | Salidas |
|---|---|---|---|
| `copywriting` | C | Brief, página o borrador | Copy de página (titulares, secciones, CTA) o edición puntual |
| `copy-editing` | C | Texto existente | Texto editado, sin "frases de IA" |
| `social` | C | Tema, red, cuenta | Posts, hilos, carruseles y calendario por red. Opcional: `.agents/listening-sources.md` |
| `linkedin-posts` | K | Tema y objetivo | Post listo para publicar: gancho de 210 caracteres o menos y texto con conteo |
| `content-marketing` | K | Objetivos de contenido | Tipos de contenido, matriz formato-canal y plan de reutilización |
| `image` | C | Pieza requerida (hero, banner, social, OG) | Enfoque (generar, diseñar o fotografiar), prompts y especificaciones |
| `video` | C | Objetivo del video | Enfoque (grabación, avatar, generado, plantilla) y guion |
| `emails` | C | Disparador y objetivo del flujo | Secuencia: resumen, correos con asunto, cuerpo, CTA y tiempos |
| `sms` | C | Flujo deseado (carrito, promo, WhatsApp) | Chequeo de cumplimiento, estrategia y mensajes |
| `lead-magnets` | C | Audiencia y oferta | Recomendación de lead magnet, nivel de gating y campos del formulario |
| `free-tools` | C | Idea de herramienta | Evaluación de la idea y especificación |
| `competitors` | C | Competidores | Páginas "X vs Y" y de alternativas, datos del competidor en YAML |
| `influencer-marketing` | C | Producto, presupuesto | Selección de creadores, brief, contrato y divulgación |
| `public-relations` | C | Noticia o tema | Pitch, comunicado de prensa, lista de medios y manejo de crisis |
| `cold-email` | C | Prospectos y oferta | Correos en frío, seguimientos, cadencia y entregabilidad |
| `prospecting` | C | ICP y señales de compra | Lista de prospectos calificados (tabla o CSV) |
| `sales-enablement` | C | Producto, objeciones | Decks, one-pagers, battle cards y guiones de demo |

### 7.6 Marca

| Skill | Origen | Entradas | Salidas |
|---|---|---|---|
| `branding` | K | Empresa, propósito, valores | Estrategia de marca, historia, voz y tono, arquetipo |
| `brand-monitoring` | K | Marca y variantes | Plan de monitoreo, búsquedas, alertas y escalamiento |
| `brand-protection` | K | Caso de suplantación o fraude | Paquete de evidencia, plantillas de denuncia y prevención |
| `rebranding-strategy` | K | Marca o dominio actual y nuevo | Línea de tiempo, mapa de redirecciones y plan de anuncio |

---

## 8. Archivos que genera el kit

| Archivo o carpeta | Lo genera | Contenido |
|---|---|---|
| `.agents/product-marketing.md` | `product-marketing` | Contexto de producto compartido por todas las skills |
| `Linea_Base_<Proyecto>.md` | `director-marketing` | Historial de campañas, decisiones, aprendizajes y cuentas conectadas |
| `competitor-profiles/` | `competitor-profiling` | Un perfil por competidor |
| `teardowns/<competidor>/` | `reverse-engineer-marketing` | Análisis de crecimiento de competidores |
| `~/marketing-plans/<cliente>/final_plan.md` | `marketing-plan` | Plan de marketing completo |
| `.agents/listening-sources.md` | `social` | Fuentes de escucha social |
| `.agents/brand.md`, `.agents/design.md` | `image`, `video` | Guías de marca y diseño para piezas visuales |
| `.agents/advisors/` | `marketing-council` | Perfiles de asesores personalizados |
| `.mcp.json` | `claude mcp add --scope project` | Servidores MCP del proyecto para Claude Code, sin secretos |
| `campanas/<proyecto>/paquete-campana.md` | Workflow `campana-desde-idea` o `productor-marketing` | Estrategia, piezas revisadas y tabla de aprobación |
| `.vscode/mcp.json` | El usuario, a partir de `mcp.ejemplo.json` | Servidores MCP para GitHub Copilot |

El resto de salidas (brief, piezas, reportes) se entregan en la conversación. Pide al agente que las guarde como archivo si las necesitas.

---

## 9. Reglas de seguridad

- **Nada se publica ni se gasta sin tu aprobación explícita.** Solo cuenta lo que escribes en el chat, fila por fila. "Se ve bien" no aprueba un gasto que no se mostró.
- **Las campañas nuevas se crean en pausa.** Activarlas es otra aprobación.
- Un aumento de gasto mayor al **20%** sobre lo aprobado requiere nueva aprobación.
- **Nunca se piden credenciales en el chat.** Las conexiones se autorizan por OAuth o en archivos locales ignorados por git.
- **No se inventan datos.** Todo dato lleva una etiqueta: `VERIFICADO`, `ASUMIDO` o `FALTA`.
- Las piezas se revisan contra políticas de anuncios, datos personales y sectores regulados ([cumplimiento.md](.claude/skills/marketing-director/resources/cumplimiento.md)).

---

## 10. Mantenimiento y limitaciones

### Ajustes aplicados al kit

- Se movieron 28 skills que estaban anidadas en `platforms/` y `strategies/`, donde Claude Code no las cargaba, al nivel correcto de `.claude/skills/`.
- Se retiraron 5 duplicados a `.claude/_skills-descartadas/`: 4 copias idénticas y una versión antigua de `seo-audit`.
- Se instalaron 22 skills desde el repositorio fuente local. Las usa el mapa del director o las mencionan otras skills: `competitor-profiling`, `image`, `lead-magnets`, `offers`, `pricing`, `launch`, `popups`, `signup`, `onboarding`, `cold-email`, `prospecting`, `sales-enablement`, `revops`, `competitors`, `free-tools`, `influencer-marketing`, `link-building`, `public-relations`, `marketing-ideas`, `marketing-loops`, `reverse-engineer-marketing` y `aso`.
- Se corrigieron enlaces rotos en `seo-strategy` y `website-structure`.
- Se agregó la guía de conexión MCP paso a paso, `setup-conexiones.md`.
- El mapa de skills tiene ahora reglas de solapamiento: qué skill usar cuando dos cubren el mismo tema.

### Limitaciones conocidas

- Algunas skills de kostja94 mencionan especialistas que no están en el kit: generadores de páginas, `entity-seo`, `product-hunt-launch`, `tiktok-captions` y otros. El agente los reemplaza con la skill más cercana y lo registra como "ejecutado sin especialista". La lista está en la sección 6 de [mapa-skills.md](.claude/skills/marketing-director/resources/mapa-skills.md).
- LinkedIn Ads, TikTok Ads y Google Search Console no tienen MCP oficial. Requieren Composio o una CLI con credenciales locales.
- Las APIs de las plataformas cambian con frecuencia. Si una conexión falla de forma inesperada, revisa la documentación oficial del proveedor.
- Si el agente corre como subagente (llamado desde otra conversación), no puede hacerte preguntas directamente. Devuelve las preguntas pendientes al hilo principal. Para la experiencia completa, usa `claude --agent director-marketing`.

### Agregar o actualizar skills

1. Copia la carpeta de la skill a `.claude/skills/<nombre>/`, con el `SKILL.md` en la raíz de esa carpeta.
2. Verifica que el `name:` del frontmatter no choque con otra skill.
3. Agrega la skill a [mapa-skills.md](.claude/skills/marketing-director/resources/mapa-skills.md) y, si cambia un recorrido, a la tabla de delegación de los dos directores: [Claude](.claude/agents/director-marketing.md) y [Copilot](.github/agents/director-marketing.agent.md).
