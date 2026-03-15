# 🤖 Arquitectura del Agente IA y ChunGPT (AI_AGENT_ARCHITECTURE.md)

MyPersonalPage incorpora de forma nativa agentes LLM (Large Language Models) actuando como avatares interactivos y solucionadores de tareas para los visitantes.

---

## 1. El Agente Principal: ChunGPT
ChunGPT es el "duende tecno-arcano", un asistente AI con un System Prompt altamente curado que debe:
- Conocer exhaustivamente el CV, stack tecnológico y habilidades legales de José Guillermo Vásquez.
- Resguardar el tono RPG noventero del portal.
- Redirigir intenciones de compra o consultoría hacia el WhatsApp oficial o el embudo de ventas.

### Arquitectura de Frontend (`useChat`)
En `src/app/page.tsx`, el Agente se manifiesta a través de un botón flotante que despliega el Chat. 
Dependemos del hook `useChat` de `@ai-sdk/react` (v3.0.x). 
*Nota de compatibilidad:* En esta versión específica, el payload y el manejo del estado asincrónico deben coercer los tipos (Type Coercion `as any`) al alimentar `setMessages` temporalmente para igualar firmas estrictas contra el render reactivo.

## 2. El Backend Evaluador (`/api/chat`)
Las llamadas desde el cliente no exponen directamente las llaves de OpenAI (o el proveedor en turno). Todo input pasa a través del Endpoint Aislado Edge de Next.js (App Router API):

`src/app/api/chat/route.ts` *(o ubicación futura equivalente del endpoint)*.

1. Recibe el Array de mensajes.
2. Interviene inyectando un **System Prompt** inicial dinámico oculto del usuario (Instrucciones de Personalidad y Reglas de Respuesta).
3. Envía la validación mediante el adaptador oficial `@ai-sdk/openai`.
4. Retorna el resultado en forma de `Stream` (Streaming Text Response) para crear el efecto "maquina de escribir" en tiempo real sin bloquear el hilo principal (UX Fluida).

## 3. Seguridad y Límites (Rate Limiting)
Para evitar que Web Scrapers malignos o ataques DDoS generen costos astronómicos de API y colapsen la base de datos de Vercel/Supabase, las rutas `/api/chat` o componentes afines planean integrarse con:
- **Upstash (Redis Rate Limiting):** Para taponar IPs que envíen ráfagas de mensajes descontroladas al modelo, manteniendo la arquitectura free-tier localizable y segura de escalar.

## 4. Estado Actual del Desarrollo (Marzo 2026 - Sprint Fase 8)
Actualmente, el motor Core de ChunGPT ha superado con éxito la refactorización arquitectónica para integrar `Vercel AI SDK`. Los siguientes hitos están al **100% completados e integrados en la rama `develop`**:

1. **Abstracción UI y UX Híbrida (`ChatBotItem.tsx`):**
   - Transición fluida entre un Menú de "Acciones Rápidas" y un Chat Libre.
   - Tooltip proactivo ("Habla con mi asistente...") disparado automáticamente a los 3 segundos de carga.
   - Saludo RPG estático y permanente desvinculado de la generación del LLM para mantener inmersión.

2. **Cerebro Backend y Resiliencia (`/api/chat/route.ts`):**
   - Implementación del Vercel AI SDK Core (`streamText`).
   - Integración segura de **OpenRouter** para enrutamiento a modelos gratuitos competitivos.
   - **Depuración Estricta de Payload:** El SDK fue configurado para esterilizar el array de mensajes (enviando exclusivamente `role` y `content`). Esto previene Errores 400 (`Invalid request body`) al interactuar con proveedores hiper-estrictos como Liquid Llama.

### Próximos Pasos Arquitectónicos: Parte 2 (Pensamiento y Flujo)
La siguiente iteración tecnológica evolucionará la arquitectura hacia el paradigma moderno de "Agentes y Herramientas" del Vercel AI SDK, abarcando:
- **Agents & Tools:** Dotar al sistema de `toolCalling` (ej. Web Search) para fundamentar respuestas técnicas actuales sin alucinaciones.
- **Sessions & Memory Persistence:** Integrar Supra/Drizzle en el callback `onFinish()` para dar memoria a largo plazo al usuario.
- **Runners:** Control avanzado de la ejecución para exponer los "pasos de procesamiento" o pensamientos ("Thinking...") al usuario.
