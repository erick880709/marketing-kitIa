export const meta = {
  name: 'campana-desde-idea',
  description: 'Convierte un brief de marketing confirmado en estrategia, piezas por canal producidas en paralelo con las skills del kit, revisión de cumplimiento y paquete de campaña con tabla de aprobación (no publica nada)',
  whenToUse: 'Después de que el agente director-marketing haya confirmado el brief con el usuario (fases 0-3). Args: { brief: "<texto del brief o ruta a un .md>", proyecto: "<slug>", fecha: "AAAA-MM-DD" }',
  phases: [
    { title: 'Contexto', detail: 'contexto de producto, línea base y estado de conexiones MCP (solo lectura)' },
    { title: 'Estrategia', detail: 'mensaje central, ángulos, canales, KPIs y skills por canal' },
    { title: 'Produccion', detail: 'un agente por canal produce las piezas con sus skills especialistas' },
    { title: 'Revision', detail: 'copy-editing y cumplimiento por canal' },
    { title: 'Paquete', detail: 'paquete de campaña y tabla de aprobación en resources/campanas/<proyecto>/' },
  ],
}

// ---------- Entradas ----------
const brief = args && args.brief
const proyecto = (args && args.proyecto) || 'campana'
const fecha = (args && args.fecha) || 'FALTA'
if (!brief) {
  return {
    error: 'Falta args.brief. Primero confirma el brief con el agente director-marketing (fases 0-3) y vuelve a ejecutar con { brief, proyecto, fecha }.',
  }
}

const SKILLS_DIR = '.claude/skills'
const DIRECTOR = `${SKILLS_DIR}/marketing-director`
const REGLAS = `Reglas del kit que aplican a esta tarea:
- Carga cada skill con la herramienta Skill. Si no está disponible, lee ${SKILLS_DIR}/<skill>/SKILL.md y síguela.
- Nunca inventes datos (métricas, precios, testimonios, clientes, premios). Si falta, márcalo FALTA; si lo decides tú, ASUMIDO; si viene del brief o de una fuente, VERIFICADO.
- No publiques, programes, crees campañas ni envíes nada. Solo lectura en conectores MCP.
- Escribe en el idioma del brief (por defecto, español latinoamericano neutro).`

// ---------- Esquemas ----------
const PIEZA = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    tipo: { type: 'string', description: 'post, carrusel, anuncio, email, landing, guion, brief de imagen...' },
    plataforma: { type: 'string' },
    contenido: { type: 'string', description: 'texto completo listo para usar' },
    fecha_sugerida: { type: 'string' },
    cta: { type: 'string' },
    enlace_utm: { type: 'string' },
    faltantes: { type: 'array', items: { type: 'string' } },
  },
  required: ['id', 'tipo', 'plataforma', 'contenido'],
}

const CONTEXTO_SCHEMA = {
  type: 'object',
  properties: {
    contexto_producto: { type: 'string', description: 'resumen de .agents/product-marketing.md o "no existe"' },
    linea_base: { type: 'string', description: 'resumen de resources/linea-base/Linea_Base_<Proyecto>.md o "no existe"' },
    conexiones: {
      type: 'array',
      items: {
        type: 'object',
        properties: { canal: { type: 'string' }, conector: { type: 'string' }, estado: { type: 'string' } },
        required: ['canal', 'estado'],
      },
    },
  },
  required: ['contexto_producto', 'linea_base', 'conexiones'],
}

const ESTRATEGIA_SCHEMA = {
  type: 'object',
  properties: {
    tipo_solicitud: { type: 'string' },
    mensaje_central: { type: 'string' },
    angulos: { type: 'array', items: { type: 'string' } },
    prerequisitos: { type: 'array', items: { type: 'string' }, description: 'p. ej. tracking, landing; dependencias del mapa' },
    kpis: {
      type: 'array',
      items: {
        type: 'object',
        properties: { etapa: { type: 'string' }, kpi: { type: 'string' }, meta: { type: 'string' } },
        required: ['etapa', 'kpi'],
      },
    },
    calendario: { type: 'string' },
    presupuesto: { type: 'string' },
    canales: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          canal: { type: 'string' },
          objetivo: { type: 'string' },
          skills: { type: 'array', items: { type: 'string' } },
          piezas: { type: 'array', items: { type: 'string' } },
        },
        required: ['canal', 'skills', 'piezas'],
      },
    },
  },
  required: ['mensaje_central', 'angulos', 'canales', 'kpis'],
}

const PRODUCCION_SCHEMA = {
  type: 'object',
  properties: {
    canal: { type: 'string' },
    skills_usadas: { type: 'array', items: { type: 'string' } },
    ejecutado_sin_especialista: { type: 'array', items: { type: 'string' } },
    piezas: { type: 'array', items: PIEZA },
  },
  required: ['canal', 'skills_usadas', 'piezas'],
}

const REVISION_SCHEMA = {
  type: 'object',
  properties: {
    canal: { type: 'string' },
    piezas: { type: 'array', items: PIEZA },
    cambios: {
      type: 'array',
      items: {
        type: 'object',
        properties: { pieza_id: { type: 'string' }, problema: { type: 'string' }, correccion: { type: 'string' } },
        required: ['pieza_id', 'problema'],
      },
    },
    bloqueantes: { type: 'array', items: { type: 'string' }, description: 'lo que impide llevar la pieza al gate' },
  },
  required: ['canal', 'piezas', 'cambios', 'bloqueantes'],
}

const PAQUETE_SCHEMA = {
  type: 'object',
  properties: {
    ruta_paquete: { type: 'string' },
    tabla_aprobacion: { type: 'string', description: 'tabla markdown de acciones externas para el gate' },
    lo_que_no_pude_determinar: { type: 'array', items: { type: 'string' } },
  },
  required: ['ruta_paquete', 'tabla_aprobacion'],
}

// ---------- Fase 1: Contexto ----------
phase('Contexto')
const contexto = await agent(
  `Recoge el contexto de una campaña de marketing. ${REGLAS}

1. Lee .agents/product-marketing.md (o .claude/product-marketing.md) si existe y resúmelo.
2. Lee resources/linea-base/Linea_Base_*.md si existe y resúmelo.
3. Diagnostica conexiones MCP siguiendo el Paso 1 de ${DIRECTOR}/resources/setup-conexiones.md: revisa las herramientas mcp__* disponibles (usa ToolSearch para buscar post-bridge, meta, google ads, hubspot, composio, semrush, canva) y, si puedes, ejecuta "claude mcp list". Solo lectura. No intentes autenticar nada.

Brief de referencia:
${brief}`,
  { label: 'contexto', phase: 'Contexto', schema: CONTEXTO_SCHEMA, effort: 'low' },
)

// ---------- Fase 2: Estrategia ----------
phase('Estrategia')
const estrategia = await agent(
  `Eres el director de marketing. Diseña la estrategia (Fase 4 de ${DIRECTOR}/SKILL.md) para el brief confirmado. ${REGLAS}

Lee ${DIRECTOR}/resources/mapa-skills.md y decide, por canal, qué skills especialistas producen sus piezas, respetando las dependencias (medición antes de pauta, keywords antes de contenido SEO, mensaje central antes de piezas, landing antes de anuncios) y las reglas de solapamiento (sección 5). Usa solo nombres de skills que existan en ${SKILLS_DIR}. Agrupa como "canal" cada frente de producción independiente (p. ej. "LinkedIn orgánico", "Meta Ads", "Email nurturing", "Landing", "SEO/blog"). Ajusta la profundidad al tipo de solicitud: un post suelto no necesita cinco canales.

Brief confirmado:
${brief}

Contexto disponible:
${JSON.stringify(contexto)}`,
  { label: 'estrategia', phase: 'Estrategia', schema: ESTRATEGIA_SCHEMA },
)

if (!estrategia || !estrategia.canales || !estrategia.canales.length) {
  return { error: 'La estrategia no definió canales; revisa el brief.', contexto, estrategia }
}
log(`Estrategia lista: ${estrategia.canales.length} canales → ${estrategia.canales.map(c => c.canal).join(', ')}`)

// ---------- Fases 3 y 4: Producción y revisión por canal (pipeline, sin barrera) ----------
const base = `Mensaje central: ${estrategia.mensaje_central}
Ángulos: ${estrategia.angulos.join(' | ')}
Calendario: ${estrategia.calendario || 'ASUMIDO por ti'}
Brief:
${brief}`

const porCanal = await pipeline(
  estrategia.canales,
  (canal) =>
    agent(
      `Produce las piezas del canal "${canal.canal}" (Fase 6 del kit). ${REGLAS}

Objetivo del canal: ${canal.objetivo || 'ver brief'}
Piezas a producir: ${canal.piezas.join('; ')}
Skills a usar, en este orden: ${canal.skills.join(' → ')}

Carga cada skill y aplícala con el brief y el mensaje central; no vuelvas a preguntar lo que ya está resuelto. Respeta límites de caracteres y formatos de la plataforma. Incluye enlaces con UTM (utm_source, utm_medium, utm_campaign=${proyecto}). Si una skill no existe, haz la tarea tú y regístrala en ejecutado_sin_especialista.

${base}`,
      { label: `produce:${canal.canal}`, phase: 'Produccion', schema: PRODUCCION_SCHEMA, agentType: 'productor-marketing' },
    ),
  (produccion, canal) =>
    agent(
      `Revisa las piezas del canal "${canal.canal}" antes del gate de aprobación. ${REGLAS}

1. Aplica la skill copy-editing: elimina "frases de IA", ajusta tono y claridad sin cambiar el fondo.
2. Revisa contra ${DIRECTOR}/resources/cumplimiento.md (datos personales, publicidad engañosa, sectores regulados) y contra las políticas y límites de la plataforma.
3. Verifica que cada pieza cumpla el brief (objetivo, audiencia, CTA) y que no tenga datos inventados.
Devuelve las piezas corregidas, la lista de cambios y los bloqueantes.

Mensaje central: ${estrategia.mensaje_central}
Piezas producidas:
${JSON.stringify(produccion)}`,
      { label: `revisa:${canal.canal}`, phase: 'Revision', schema: REVISION_SCHEMA, agentType: 'productor-marketing' },
    ).then((rev) => ({ produccion, revision: rev })),
)

const canalesOk = porCanal.filter(Boolean)
const caidos = estrategia.canales.filter((_, i) => !porCanal[i]).map((c) => c.canal)
if (caidos.length) log(`Canales sin resultado (revisar a mano): ${caidos.join(', ')}`)

// ---------- Fase 5: Paquete ----------
phase('Paquete')
const paquete = await agent(
  `Arma el paquete de campaña. ${REGLAS}

1. Escribe el archivo resources/campanas/${proyecto}/paquete-campana.md con: resumen de la estrategia, KPIs, prerequisitos, estado de conexiones, y todas las piezas revisadas ordenadas por canal y fecha (texto completo, listo para pegar).
2. Construye la tabla de aprobación con el formato exacto de ${DIRECTOR}/resources/aprobacion-y-publicacion.md (una fila por acción externa: acción, cuenta/plataforma, contenido o cambio, cuándo, presupuesto, cómo se revierte). Las campañas de pauta van como "Crear campaña (pausada)". Inclúyela también en el archivo.
3. Para canales sin conector, añade el paquete manual de ${DIRECTOR}/resources/conexiones-mcp.md (sección 4).
4. Lista "Lo que no pude determinar": todos los FALTA, bloqueantes y canales caídos.
Fecha de la campaña: ${fecha}. No publiques nada.

Estrategia: ${JSON.stringify(estrategia)}
Conexiones: ${JSON.stringify(contexto && contexto.conexiones)}
Canales revisados: ${JSON.stringify(canalesOk.map((c) => c.revision || c.produccion))}
Skills usadas por canal: ${JSON.stringify(canalesOk.map((c) => ({ canal: c.produccion && c.produccion.canal, skills: c.produccion && c.produccion.skills_usadas, sin_especialista: c.produccion && c.produccion.ejecutado_sin_especialista })))}
Canales sin resultado: ${JSON.stringify(caidos)}`,
  { label: 'paquete', phase: 'Paquete', schema: PAQUETE_SCHEMA, agentType: 'productor-marketing' },
)

return {
  siguiente_paso: 'Fase 7: presenta la tabla de aprobación al usuario. Solo publica (Fase 8) lo que apruebe explícitamente fila por fila.',
  proyecto,
  mensaje_central: estrategia.mensaje_central,
  canales: estrategia.canales.map((c) => c.canal),
  canales_sin_resultado: caidos,
  ruta_paquete: paquete && paquete.ruta_paquete,
  tabla_aprobacion: paquete && paquete.tabla_aprobacion,
  lo_que_no_pude_determinar: paquete && paquete.lo_que_no_pude_determinar,
  conexiones: contexto && contexto.conexiones,
}
