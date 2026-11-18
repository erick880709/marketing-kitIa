---
agent: "publicador-marketing"
description: "Diagnostica y guía paso a paso la conexión de redes sociales y plataformas de anuncios por MCP"
argument-hint: "Canales a conectar (opcional), p. ej. 'LinkedIn e Instagram orgánico, Meta Ads'"
---

Canales que quiero conectar: ${input:canales:Opcional. Ej: LinkedIn, Instagram, Meta Ads. Vacío = diagnóstico completo}

Sigue `.claude/skills/marketing-director/resources/setup-conexiones.md`:

1. Muestra la tabla de estado de conexiones por canal.
2. Para cada canal pendiente, guíame **uno a la vez**: qué agregar en `.vscode/mcp.json` (usa `.vscode/mcp.ejemplo.json` como base), cómo iniciarlo y cómo autorizarlo por OAuth en VS Code.
3. Verifica cada conexión en **solo lectura** y pídeme confirmar que es la cuenta correcta.
4. Registra el resultado en `resources/linea-base/Linea_Base_<Proyecto>.md`, sección "Cuentas y conectores".

No me pidas tokens ni contraseñas en el chat y no publiques nada.
