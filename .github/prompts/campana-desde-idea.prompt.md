---
agent: "director-marketing"
description: "Convierte una idea de negocio en una campaña de marketing: brief, estrategia, piezas, aprobación y publicación"
argument-hint: "Tu idea en una frase, p. ej. 'quiero conseguir clientes B2B para nuestro servicio de QA en Colombia'"
---

Idea del usuario: ${input:idea:Describe tu idea o necesidad de marketing en una frase}

Inicia el flujo del kit de marketing con esta idea:

1. Lee `.claude/skills/marketing-director/SKILL.md` y ejecuta las fases 0 a 4: contexto, interpretación, preguntas mínimas, brief confirmado y estrategia.
2. En la fase 0, incluye el diagnóstico de conexiones MCP. Para pedidos que implican publicar o pautar, avisa qué conectores faltan.
3. Cierra con la tabla `Canal | Objetivo | Skills (en orden) | Piezas` y sugiere continuar con **"Producir piezas de la campaña"** (agente `productor-marketing`). Después vendrá **"Aprobar y publicar"** (agente `publicador-marketing`).

No publiques ni gastes presupuesto en este paso.
