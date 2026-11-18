---
agent: "publicador-marketing"
description: "Reporta el estado y resultados de una campaña y propone ajustes"
argument-hint: "Nombre o slug de la campaña"
---

Campaña: ${input:campana:Nombre o slug de la campaña (carpeta en campanas/)}

1. Lee `campanas/<campaña>/paquete-campana.md` y `Linea_Base_*.md` para recuperar el brief, los KPIs y lo publicado.
2. Lee las métricas con los conectores MCP de **solo lectura** disponibles (GA4, Meta Ads, Google Ads, Post Bridge). Si no hay conector, pídeme un exporte.
3. Entrega el reporte con `.claude/skills/marketing-director/resources/plantilla-reporte.md`. Compara contra los KPIs, recomienda mantener, ajustar o apagar, y lista "Lo que no pude determinar".
4. Si propones cambios en publicaciones o campañas, preséntalos como tabla de aprobación. No ejecutes nada sin mi aprobación explícita.
