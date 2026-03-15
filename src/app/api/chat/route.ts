import { streamText, tool } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { db } from '@/modules/database/db-client';
import { chatSessions, chatMessages } from '@/modules/database/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

// Configuración del proveedor OpenRouter
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const messages = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(chatMessages.createdAt);

    return new Response(JSON.stringify(messages), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch history' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req: Request) {
  try {
    const { messages, sessionId } = await req.json();
    let currentSessionId = sessionId;

    // Contexto del Agente (System Prompt V3 - El Cerebro Definitivo)
    const systemPrompt = `
# ROL Y LORE
Eres ChunGPT, agente de IA y "NPC de menú principal" del sitio web de tu creador (Abogado en Derecho Digital y Desarrollador Fullstack).
Tu tono equilibra la formalidad corporativa con el misticismo de un guardián de RPG. Usa sutilmente palabras como: viajero, pergaminos, forjar, misión, feudos. Eres proactivo en Tech, pero sumamente restrictivo en Legal.

# REGLA DE ORO
NUNCA superes las 3 líneas de texto por respuesta (salvo al listar el menú). Eres un menú ágil, ve directo al grano. Tienes estrictamente prohibido saludar con frases como "Saludos, viajero" o "¡Hola!", ya que la interfaz ya ha saludado al usuario. Responde directamente al estímulo inicial.

# MATRIZ DE COMPORTAMIENTO Y EJEMPLOS (DIALOGUE TREE)
Evalúa la intención del usuario y responde siguiendo el estilo de estos ejemplos exactos:

1. RUTA TECH / DEV (Código, IA, software):
- Postura: Curioso y proactivo. Haz una pregunta técnica para calificar el proyecto.
- Ejemplo: "¡Excelente iniciativa! Mi creador forja arquitecturas robustas a diario. ¿Qué base de datos o stack tecnológico tienes en mente para los cimientos de tu misión?"

2. RUTA LEGAL (Leyes, contratos, compliance):
- Postura: Muro defensivo. TIENES PROHIBIDO dar asesoría legal. Redirige a TuAvocado.ai.
- Ejemplo: "El terreno jurídico es traicionero y mis protocolos prohíben emitir dictámenes legales. Para blindar tu obra y actuar con certeza legal, debes acudir a los sabios de TuAvocado.ai."

3. FUERA DE CONTEXTO / COMPETENCIA (Recetas, clima, otras empresas):
- Postura: Evade sin romper el personaje.
- Ejemplo: "Mis pergaminos no contienen saberes de ese reino ni vigilan feudos ajenos. Mi sabiduría se limita a forjar código fuente, el derecho digital y la doctrina de TuAvocado.ai."

# INTERFAZ TÁCTIL (QUICK REPLIES)
Siempre que detectes que tu respuesta requiere opciones o sugerencias obvias para que el usuario navegue (ej: en el menú, o tras hacer tu pregunta técnica), DEBES añadir al final EXACTO de tu mensaje un bloque JSON oculto con 2 a 4 botones de acción.
DEBES usar este formato exacto (incluyendo los delimitadores de 3 dos puntos):

[Tu mensaje de 3 líneas aquí]

:::quick_replies
["Opción 1", "Opción 2", "Opción 3"]
:::

Ejemplo Menú de Servicios:
El arsenal de mi creador domina tres artes...
¿Deseas construir una tecnología o protegerla legalmente?

:::quick_replies
["¿Cómo cotizo un SaaS?", "Necesito blindaje legal", "Hablemos con el Humano"]
:::
`;

    // Limpiamos estrictamente el array de mensajes para evitar errores "Invalid request body" 
    // en proveedores estrictos detrás de OpenRouter (ej. Liquid) que no aceptan campos extras como 'id'.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cleanMessages = messages.map((m: any) => ({
      role: m.role,
      content: m.content
    }));

    // Pre-generar la Sesión si no existe ANTES de hacer el stream (para poder enviar el Header de inmediato)
    if (!currentSessionId) {
       const [newSession] = await db.insert(chatSessions).values({
         title: cleanMessages[0]?.content?.substring(0, 50) || 'Nueva Aventura',
       }).returning({ id: chatSessions.id });
       currentSessionId = newSession.id;

       // Guardar todo el historial temporal entrante (el usuario enviando su primer mensaje)
       for (const msg of cleanMessages) {
          await db.insert(chatMessages).values({
            sessionId: currentSessionId,
            role: msg.role,
            content: msg.content,
          });
       }
    } else {
       // Si ya existía, guardamos sólo el ÚLTIMO mensaje del usuario
       const lastUserMsg = cleanMessages[cleanMessages.length - 1];
       if (lastUserMsg && lastUserMsg.role === 'user') {
          await db.insert(chatMessages).values({
            sessionId: currentSessionId,
            role: 'user',
            content: lastUserMsg.content,
          });
       }
    }

    const result = streamText({
      model: openrouter('openrouter/free'), // Auto-route to a stable free model to avoid 404s and upstream 429s
      messages: [
        { role: 'system', content: systemPrompt },
        ...cleanMessages,
      ],
      temperature: 0.2,
      tools: {
        webSearch: tool({
          description: 'Search the web for up-to-date information, news, technology status, or definitions to avoid hallucinating.',
          parameters: z.object({
            query: z.string().describe('The search query to look up.'),
          }),
          // @ts-expect-error - type inference fails on this version of AI SDK
          execute: async ({ query }) => {
            // Simulated web search integration (Tavily or similar could be injected here)
            // For now, we simulate a response to demonstrate tool calling.
            console.log("Web search requested for:", query);
            return `Simulated Web Search result for "${query}": According to recent index, Nextjs is now on v15, React 19 is out, and Vercel AI SDK 3.x introduced streamText.`;
          },
        }),
      },
      onFinish: async ({ response }) => {
        try {
          // Guardar todos los mensajes generados por el LLM en este ciclo (incluyendo llamadas a herramientas)
          if (response.messages && response.messages.length > 0) {
             for (const genMsg of response.messages) {
               await db.insert(chatMessages).values({
                 sessionId: currentSessionId,
                 role: genMsg.role,
                 content: genMsg.content || '', // O JSON de la toolCall
               });
             }
          }
        } catch (dbErr) {
          console.error("Error saving chat memory:", dbErr);
        }
      }
    });

    return result.toTextStreamResponse({
      headers: {
        'x-chat-session-id': currentSessionId,
      }
    });
  } catch (error) {
    console.error('Error en /api/chat:', error);
    return new Response(JSON.stringify({ error: 'Falla en la invocación mágica del LLM' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
