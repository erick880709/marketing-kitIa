# Guía de conexión de redes sociales y plataformas por MCP

Usa esta guía cuando el usuario quiera **dejar listas** las conexiones (antes de la primera campaña) o cuando en la Fase 8 falte un conector. Complementa `conexiones-mcp.md`, que es el catálogo, con los pasos concretos.

Principios:
- **Una conexión a la vez**, solo las que la campaña necesita. No conectes todo "por si acaso".
- **Nunca pidas tokens, contraseñas ni API keys en el chat.** Los MCP remotos usan OAuth en el navegador; las claves de CLI van en archivos locales ignorados por git.
- **Cada paso es un mensaje corto** (3-5 líneas): una acción, para qué sirve, el enlace oficial y qué confirmación no sensible debe devolver el usuario (nombre de la página, ID de la cuenta publicitaria).
- Las conexiones **no bloquean** la campaña. Si el usuario no quiere conectar, entrega el paquete manual (`conexiones-mcp.md`, sección 4).

---

## Paso 1. Diagnóstico: qué está conectado hoy

1. Revisa las herramientas cargadas en la sesión (nombres tipo `mcp__<servidor>__<herramienta>`). Si hay búsqueda de herramientas diferidas, busca por nombre: "post-bridge", "meta", "hubspot", "composio", "canva".
2. En Claude Code, puedes ejecutar `claude mcp list` (Bash) para ver los servidores configurados y su estado.
3. Presenta al usuario una tabla de estado:

| Canal | Conector recomendado | Estado | Necesario para esta campaña |
|---|---|---|---|
| Redes orgánicas (LinkedIn, Instagram, Facebook, TikTok, X, YouTube…) | Post Bridge | Conectado / No conectado / Requiere autorización | Sí / No |
| Meta Ads (Facebook + Instagram) | Meta Ads MCP oficial | … | … |
| Google Ads / YouTube Ads | Google Ads MCP o CLI | … | … |
| LinkedIn Ads | Composio (toolkit LinkedIn) o CLI | … | … |
| CRM / email | HubSpot | … | … |
| SEO | Semrush | … | … |
| Medición | GA4 | … | … |
| Piezas gráficas | Canva (conector claude.ai) | … | … |

Pregunta qué filas marcadas como "Sí" quiere conectar ahora.

## Paso 2. Conectar cada servidor

### A. MCP remoto con OAuth en Claude Code (la mayoría)

```bash
# Alcance de proyecto: guarda la definición en .mcp.json (sin secretos), compartible con el equipo
claude mcp add --transport http --scope project <nombre> <url>
```

Luego, en la sesión interactiva de Claude Code, el usuario ejecuta `/mcp`, elige el servidor y completa el inicio de sesión en el navegador. Reinicia la sesión si las herramientas no aparecen.

| Servidor | Comando |
|---|---|
| Post Bridge (redes orgánicas) | `claude mcp add --transport http --scope project post-bridge https://www.post-bridge.com/api/mcp/mcp` |
| Meta Ads (pauta FB/IG) | `claude mcp add --transport http --scope project meta-ads https://mcp.facebook.com/ads` |
| HubSpot (CRM, email) | `claude mcp add --transport http --scope project hubspot https://mcp.hubspot.com` |
| Semrush (SEO) | `claude mcp add --transport http --scope project semrush https://mcp.semrush.com/v2/mcp` |

Plantilla equivalente de `.mcp.json` en la raíz del proyecto:

```json
{
  "mcpServers": {
    "post-bridge": { "type": "http", "url": "https://www.post-bridge.com/api/mcp/mcp" },
    "meta-ads":    { "type": "http", "url": "https://mcp.facebook.com/ads" },
    "hubspot":     { "type": "http", "url": "https://mcp.hubspot.com" },
    "semrush":     { "type": "http", "url": "https://mcp.semrush.com/v2/mcp" }
  }
}
```

Incluye solo los servidores elegidos en el Paso 1.

### B. Conectores de claude.ai (sin comandos)

Si el usuario usa claude.ai, Claude Desktop o Claude Code con cuenta claude.ai: **Configuración → Conectores**, busca el servicio (HubSpot, Canva, Google Drive, Slack, Notion…) y pulsa *Conectar*. También puede agregar un conector personalizado con la URL de la tabla anterior. Si un conector aparece como "requiere autenticación", se autoriza ahí; Claude no puede completar el OAuth por el usuario.

### C. Redes o plataformas sin MCP oficial (LinkedIn Ads, TikTok Ads y otras)

Opción recomendada: **Composio**, un solo MCP que agrupa cientos de apps.

```bash
npx @composio/mcp@latest setup
```

Después, ejecuta `/mcp` para confirmar que `composio` aparece. Luego autoriza cada app (por ejemplo, LinkedIn) desde el enlace de conexión que entrega Composio en el navegador.

Opción alternativa: CLI o API directa con variables locales. Sigue `tools/SETUP.md` del repositorio fuente (github.com/coreyhaines31/marketingskills). Las claves van en `.env.marketing`, que debe estar en `.gitignore` y nunca se imprime en el chat.

### D. Google Ads, GA4, Buffer, Zapier

Tienen servidor MCP, pero su instalación depende de la cuenta (proyecto de Google Cloud, permisos de la propiedad, plan contratado). Sigue la guía de cada uno en `github.com/coreyhaines31/marketingskills/tree/main/tools/integrations` (`google-ads.md`, `ga4.md`, `buffer.md`, `zapier.md`). No inventes URLs ni comandos que no estén en la guía oficial.

## Paso 3. Verificar cada conexión (solo lectura)

Haz siempre una primera llamada **de solo lectura** y confirma con el usuario que la cuenta es la correcta:

| Conector | Verificación |
|---|---|
| Post Bridge | Listar cuentas sociales conectadas. Si una red aparece con token vencido, el usuario debe reconectarla en el panel de Post Bridge |
| Meta Ads | Listar cuentas publicitarias y páginas. Confirmar nombre e ID |
| Google Ads | Consulta de lectura sobre el customer ID. Recordar: `cost_micros` ÷ 1.000.000 |
| HubSpot | Leer propiedades o un contacto de prueba |
| Composio / LinkedIn | Listar páginas u organizaciones administradas |

Reporta el resultado real que devolvió la herramienta. Si falla, no reintentes en bucle: explica el error y el siguiente paso.

## Paso 4. Registrar el estado

Anota en `Linea_Base_<Proyecto>.md`, en la sección "Cuentas y conectores", qué quedó conectado, con qué cuenta (nombre e ID, nunca credenciales) y con qué permisos. Así la próxima campaña no repite el diagnóstico.

## Conexiones mínimas por tipo de campaña

| Tipo | Imprescindible para automatizar | Recomendable |
|---|---|---|
| `organico` | Post Bridge (o Buffer / Composio) | Canva para piezas |
| `pauta` Meta | Meta Ads MCP | GA4, Post Bridge para orgánico de apoyo |
| `pauta` Google/YouTube | Google Ads | GA4 |
| `pauta` LinkedIn | Composio (LinkedIn) o CLI | HubSpot para leads |
| `campana-completa` | Post Bridge + la plataforma de pauta elegida | HubSpot, GA4, Semrush, Canva |
| `seo` | Ninguno | Semrush, Search Console por CLI |
| `reporte` | El conector de lectura de cada canal activo | — |
