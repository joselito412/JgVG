export const AREA_LEGAL_DATA = [
  {
    modulo: "Derecho Digital y Nuevas Tecnologías",
    clases: [
      { titulo: "Fundamentos del Derecho Digital en Latam", duracion: "15 min", recursos: ["PDF: Marco Normativo", "Link: Ley Modelo CNUDMI"] },
      { titulo: "Validez de la Firma Electrónica y Digital", duracion: "20 min", recursos: ["Plantilla: Acuerdo de Firma Electrónica"] }
    ]
  },
  {
    modulo: "Derecho de Propiedad Intelectual y Derechos de Autor",
    clases: [
      { titulo: "Protección de Software y Código Fuente", duracion: "22 min", recursos: ["Guía: Registro en la DNDA"] },
      { titulo: "Derechos de autor en obras creadas por IA", duracion: "25 min", recursos: ["PDF: Análisis Jurisprudencia"] }
    ]
  },
  {
    modulo: "Cumplimiento, Seguridad de la Información y Datos Personales",
    clases: [
      { titulo: "Checklist Ley 1581 (Habeas Data)", duracion: "18 min", recursos: ["Plantilla: Política de Privacidad"] },
      { titulo: "Respuesta a Incidentes de Ciberseguridad", duracion: "30 min", recursos: ["Checklist: Plan de Acción Legal"] },
      { titulo: "Privacidad desde el Diseño (Privacy by Design)", duracion: "20 min", recursos: ["Esquema mental: PbD"] }
    ]
  },
  {
    modulo: "Gobierno de la Inteligencia Artificial",
    clases: [
      { titulo: "Riesgos Legales en el uso de LLMs", duracion: "15 min", recursos: ["Guía: Términos de Uso de OpenAI (Legal)"] },
      { titulo: "Políticas Corporativas de uso de IA", duracion: "20 min", recursos: ["Plantilla: Política de IA para Empleados"] }
    ]
  },
  {
    modulo: "Derecho Privado y Derecho Comercial",
    clases: [
      { titulo: "Redacción moderna de Contratos Comerciales", duracion: "25 min", recursos: ["PDF: Legal Design Aplicado"] },
      { titulo: "Pactos de accionistas para Startups", duracion: "35 min", recursos: ["Plantilla: Shareholders Agreement Base"] }
    ]
  },
  {
    modulo: "Smart Contracts y Contratos Automáticos",
    clases: [
      { titulo: "Concepto jurídico del Smart Contract", duracion: "15 min", recursos: ["Lectura: Código vs. Ley"] },
      { titulo: "Ejecución automatizada y validez probatoria", duracion: "20 min", recursos: ["PDF: Análisis C.G.P."] }
    ]
  }
];

export const AREA_TECH_DATA = [
  {
    modulo: "¿Qué es una Inteligencia Artificial y LLMs?",
    clases: [
      { titulo: "Conceptos básicos: Machine Learning y Transformers", duracion: "20 min", recursos: ["PDF: Glosario de IA"] },
      { titulo: "Cómo funciona el razonamiento de un LLM", duracion: "15 min", recursos: ["Enlace: Visualizing Transformers"] }
    ]
  },
  {
    modulo: "Desarrolla tu primer Agente AI (Google/Microsoft)",
    clases: [
      { titulo: "Configuración de entorno y API Keys", duracion: "15 min", recursos: ["Guía: Obtención de API Keys"] },
      { titulo: "Tu primer script en Python para consumo de LLMs", duracion: "25 min", recursos: ["Código fuente: agent_v1.py"] }
    ]
  },
  {
    modulo: "Entrenamiento y Fine-Tuning (OpenAI, Gemini, Claude)",
    clases: [
      { titulo: "Prompt Engineering avanzado vs Fine-Tuning", duracion: "20 min", recursos: ["PDF: Matriz de decisión RAG vs FT"] },
      { titulo: "Preparando el Dataset de entrenamiento", duracion: "30 min", recursos: ["Plantilla: Dataset JSONL"] }
    ]
  },
  {
    modulo: "Desarrollo profesional de bots con Claude",
    clases: [
      { titulo: "Uso de Tool Calling (Funciones) con Anthropic", duracion: "25 min", recursos: ["Script: weather_tool_bot.py"] },
      { titulo: "Manejo de System Prompts dinámicos", duracion: "20 min", recursos: ["Guía: The Art of the System Prompt"] }
    ]
  },
  {
    modulo: "Desarrollo Full-Stack local (React + Supabase)",
    clases: [
      { titulo: "Arquitectura Next.js App Router", duracion: "25 min", recursos: ["Cheat Sheet: Server vs Client Components"] },
      { titulo: "Integrando Auth de Supabase a tu app", duracion: "30 min", recursos: ["Código fuente: auth_module.tsx"] },
      { titulo: "Operaciones CRUD y RLS en Postgres", duracion: "20 min", recursos: ["Script: init_schema.sql"] }
    ]
  },
  {
    modulo: "Patrones de diseño de Agentes de IA (LangGraph)",
    clases: [
      { titulo: "State Machines y Grafos cíclicos en LangChain", duracion: "25 min", recursos: ["Diagrama: React Agent Flow"] },
      { titulo: "Orquestador Central vs Nodos de Tarea", duracion: "30 min", recursos: ["Código fuente: graph_builder.py", "Ejemplo práctico"] }
    ]
  }
];

export const PROMPT_LIBRARY = [
  {
    tema: "Análisis de Contrato de Arrendamiento Comercial",
    herramienta: "Claude 3.5 Sonnet",
    proposito: "Identificar cláusulas abusivas de renuncia a requerimientos, calcular incrementos de IPC proyectados y validar garantías solidarias.",
    prompt: "Actúa como un abogado experto en derecho comercial colombiano. Analiza el siguiente borrador de contrato de arrendamiento comercial de local [...insertar texto...]. Paso 1: Identifica si el arrendatario está renunciando explícitamente a los requerimientos de constitución en mora de los artículos 2007 del Código Civil. Paso 2: Extrae la fórmula de incremento del canon y advierte si incluye interés adicional al IPC. Paso 3: Elabora una tabla de riesgos semaforizada (Rojo/Amarillo/Verde) de las cláusulas para el arrendatario.",
    tips: "Pide a la IA que construya la 'tabla semaforizada' explícitamente. Reemplaza siempre nombres, cédulas y valores reales por placeholders [ARRENDADOR], [ARRENDATARIO], [VALOR] antes de pasar el texto al modelo para proteger los datos personales."
  },
  {
    tema: "Asistente de Redacción Estilo 'Legal Design'",
    herramienta: "ChatGPT (GPT-4o)",
    proposito: "Tomar un memorando legal denso y tradicional, y convertirlo en un correo electrónico claro para el cliente final sin perder precisión jurídica.",
    prompt: "Actúa como un experto en Legal Design y Comunicación Clara. Tengo el siguiente concepto jurídico sobre protección de datos [...insertar concepto...]. Reescríbelo en formato de correo electrónico corporativo dirigido a un Gerente de Marketing (no abogado). Utiliza un tono profesional pero directo. Estructura el correo en 3 viñetas cortas: 1) El problema central. 2) La solución legal viable. 3) El próximo paso accionable. Mantén el lenguaje por debajo del nivel de lectura de 8vo grado sin comprometer la rigurosidad técnica de por qué no pueden recolectar datos biométricos libres.",
    tips: "Si el modelo omite el contexto legal importante al simplificar, regenera con el tip: 'Asegúrate de citar la Ley 1581 explícitamente pero en palabras simples'."
  }
];
