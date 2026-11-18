# Conexiones MCP para publicar, lanzar y medir

Las conexiones son **opcionales y no bloqueantes**. Si un conector no está disponible, la campaña sigue: entregas el paquete listo para publicar a mano e indicas qué conector lo automatizaría.

Fuente de los datos: guías de integración de github.com/coreyhaines31/marketingskills (`tools/integrations/`), revisadas por sus autores en octubre de 2026. Las plataformas cambian sus APIs con frecuencia: si una llamada falla de forma inesperada, revisa la documentación oficial antes de reintentar.

## Contenido
1. Cómo detectar qué hay disponible
2. Catálogo por canal
3. Reglas de uso seguro
4. Si no hay conector

---

## 1. Cómo detectar qué hay disponible

1. Revisa las herramientas que tienes cargadas en esta sesión. Un conector disponible aparece como herramientas con su nombre (por ejemplo, herramientas de Post Bridge, Meta Ads, Google Ads o HubSpot).
2. Si el entorno tiene búsqueda de herramientas diferidas o un directorio de conectores, búscalo por nombre o por función ("social media publishing", "ads").
3. Si no está, no lo simules ni inventes resultados. Anota el conector como "no conectado" y sigue con la sección 4.

**Dónde se ejecuta cada tipo de conexión:**
- **MCP remoto** (URL con OAuth): se agrega en claude.ai, Claude Desktop o Claude Code como conector personalizado. El usuario autoriza con su cuenta; nunca pidas tokens en el chat.
- **CLI o API directa** (LinkedIn Ads, TikTok Ads, Search Console): requieren Claude Code o Cowork, con credenciales en variables de entorno. El chat web no llega a esas APIs.

---

## 2. Catálogo por canal

### Publicación orgánica en redes

| Conector | Tipo | Redes | Notas |
|---|---|---|---|
| **Post Bridge** (recomendado) | MCP oficial remoto, OAuth: `https://www.post-bridge.com/api/mcp/mcp` | TikTok, Instagram, YouTube, X, LinkedIn, Facebook, Threads, Bluesky, Pinterest, Google Business | Soporta borradores (`is_draft: true`) y analítica por post. Una cuenta con token vencido debe reconectarse en su panel antes de publicar |
| Buffer | MCP oficial | Varias redes según el plan | Alternativa a Post Bridge |
| Composio | MCP único que agrupa cientos de apps | Lo que el usuario conecte | Comodín para redes o herramientas sin MCP propio |
| Zapier | MCP | Lo que el usuario conecte | Comodín; útil si la empresa ya usa Zapier |

### Pauta

| Conector | Tipo | Notas |
|---|---|---|
| **Meta Ads** (Facebook/Instagram) | MCP oficial remoto `https://mcp.facebook.com/ads`, beta abierta, lectura y escritura | Se conecta con Facebook Login for Business. Empezar en solo lectura y validar contra Ads Manager antes de permitir escrituras |
| **Google Ads** (incluye YouTube y Performance Max) | MCP disponible; también CLI | Primera llamada siempre de lectura sobre la cuenta correcta. `cost_micros` ÷ 1.000.000 = costo real |
| LinkedIn Ads | Sin MCP oficial: Composio (toolkit LinkedIn) o CLI/API | API versionada en `api.linkedin.com/rest`; requiere Claude Code o Cowork para la CLI |
| TikTok Ads | Sin MCP: API de TikTok for Business | Requiere Claude Code o Cowork |

### SEO y medición

| Conector | Tipo | Notas |
|---|---|---|
| Semrush | MCP oficial remoto `https://mcp.semrush.com/v2/mcp` | Keywords, competidores, backlinks |
| GA4 | MCP disponible | Lectura de tráfico y conversiones |
| Google Search Console | Sin MCP: API o CLI | Requiere Claude Code o Cowork |
| HubSpot | MCP oficial remoto `mcp.hubspot.com`, lectura y escritura | CRM, leads, emails |

---

## 3. Reglas de uso seguro

- **Lectura primero.** La primera interacción con cualquier conector es una consulta de solo lectura para confirmar cuenta, permisos y estado. Confirma con el usuario que es la cuenta correcta (nombre de la página, ID de la cuenta publicitaria).
- **Escritura solo tras el gate.** Ninguna publicación, programación, creación de campaña o cambio de presupuesto ocurre sin la aprobación descrita en `aprobacion-y-publicacion.md`.
- **Borradores y estado pausado por defecto.** En orgánico, crea borradores cuando la herramienta lo permita y programa solo lo aprobado. En pauta, crea campañas pausadas salvo que el usuario apruebe explícitamente activarlas.
- **Cambios como plan.** Toda modificación en pauta se presenta como: estado actual → cambio → efecto esperado → cómo revertirlo.
- **Confirmar resultados reales.** Reporta como hecho solo lo que la herramienta confirmó (ID del post, estado de la campaña). Si la respuesta es ambigua, consulta de nuevo en modo lectura.
- **Mínimo privilegio.** Recomienda al usuario autorizar solo los permisos que la campaña necesita.

---

## 4. Si no hay conector

Entrega un **paquete de publicación manual** por canal:

```markdown
## <Red o plataforma> — <fecha y hora sugerida>
**Cuenta:** <nombre>
**Formato:** <post, carrusel, reel, anuncio de texto...>
**Texto:** <listo para pegar>
**Recursos visuales:** <descripción o archivo>
**Enlace con UTM:** <url?utm_source=...&utm_medium=...&utm_campaign=...>
**Pasos:** <3-5 pasos concretos en la interfaz de la plataforma>
```

Al final, indica en una línea qué conector del catálogo automatizaría ese canal.
