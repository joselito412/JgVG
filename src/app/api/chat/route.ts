import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { DEVELOPER_SKILLS, LAWYER_SKILLS } from '@/modules/identity/data/skills';
import { FEATURED_PROJECTS } from '@/modules/identity/data/projects';

export const maxDuration = 30;

// Only initialize Ratelimit if keys are present (to avoid crashing local dev before user sets them up)
const ratelimit =
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
    ? new Ratelimit({
        redis: new Redis({
          url: process.env.KV_REST_API_URL,
          token: process.env.KV_REST_API_TOKEN,
        }),
        // Limit to 5 AI requests per 10 seconds per IP address
        limiter: Ratelimit.slidingWindow(5, '10 s'),
      })
    : null;

export async function POST(req: Request) {
  try {
    // 1. RATE LIMITING (Upstash / Vercel KV)
    if (ratelimit) {
      // Fallback IP resolution for edge environments
      const ip =
        req.headers.get('x-forwarded-for') ??
        req.headers.get('x-real-ip') ??
        '127.0.0.1';

      const { success, limit, reset, remaining } = await ratelimit.limit(
        `ai_ratelimit_${ip}`
      );

      if (!success) {
        return NextResponse.json(
          {
            error: 'Too many requests.',
            message: 'Has excedido el límite de consultas a la IA. Inténtalo más tarde.',
          },
          {
            status: 429, // 429 Too Many Requests
            headers: {
              'X-RateLimit-Limit': limit.toString(),
              'X-RateLimit-Remaining': remaining.toString(),
              'X-RateLimit-Reset': reset.toString(),
            },
          }
        );
      }
    }

    // 2. PARSE REQUEST DATA
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid payload: messages array is required' },
        { status: 400 }
      );
    }

    // 3. VERCEL AI SDK INTEGRATION (Basic RAG)
    
    // Format the context data into a single readable string
    const techSkillsContext = DEVELOPER_SKILLS.map(s => `- ${s.name} (Nivel: ${s.level}/100)`).join('\n');
    const legalSkillsContext = LAWYER_SKILLS.map(s => `- ${s.name} (Nivel: ${s.level}/100)`).join('\n');
    const projectsContext = FEATURED_PROJECTS.map(p => `- Proyecto: ${p.name} | Rol: ${p.role}\n  Descripción: ${p.desc}\n  Tecnología: ${p.tech.join(', ')}`).join('\n\n');

    const systemMessage = {
      role: 'system',
      content: `Eres ChunGPT, el duende inmortal y familiar tecno-arcano de este reino. Tu maestro es José Guillermo, un Abogado e Ingeniero Legal (Legal-Tech Dev).
Hablas de forma fantástica, como un personaje de RPG o un duende antiguo, pero de forma concisa, directa y muy útil. No te extiendas demasiado. 

A continuación tienes el conocimiento arcano sobre tu Maestro (Contexto RAG Básico):

<Skills_Tecnologicas>
${techSkillsContext}
</Skills_Tecnologicas>

<Skills_Legales>
${legalSkillsContext}
</Skills_Legales>

<Proyectos_Destacados>
${projectsContext}
</Proyectos_Destacados>

Utiliza la información de los bloques anteriores para responder preguntas sobre las habilidades, tecnologías y el portafolio de tu Maestro José. Si el usuario desea contratarlo, invítalo amablemente a contactarlo. Manten siempre la personalidad de duende arcano. ¡Ji, ji, ji!`
    };

    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages: [systemMessage, ...messages],
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error in AI Chat API Proxy:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
