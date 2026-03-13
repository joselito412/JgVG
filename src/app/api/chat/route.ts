import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

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

    // 3. TODO: VERCEL AI SDK INTEGRATION
    // Here we will use `streamText` from 'ai' and the AI provider (OpenAI/Anthropic)
    // using Vercel AI Gateway URL configuration eventually.
    
    // Placeholder response for now to ensure endpoint is live
    return NextResponse.json({
      status: 'success',
      message: 'AI Endpoint proxy reachable.',
      receivedMessagesCount: messages.length,
    });
  } catch (error) {
    console.error('Error in AI Chat API Proxy:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
