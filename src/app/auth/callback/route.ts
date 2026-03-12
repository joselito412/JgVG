import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/profile';

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    // Enviar el código de vuelta a Supabase para obtener la sesión
    const res = await fetch(`${supabaseUrl}/auth/v1/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseAnonKey,
      },
      body: JSON.stringify({ auth_code: code }),
    });

    if (res.ok) {
       // Import missing functions
       const { createClient } = require('@/modules/database/server');
       const { ensureUserRecord } = require('@/modules/database/user-actions');
       
       const supabase = await createClient();
       const { data: { user } } = await supabase.auth.getUser();

       if (user) {
         const { onboarded } = await ensureUserRecord(user.id, user.email!, user.user_metadata);
         if (!onboarded) {
           return NextResponse.redirect(new URL('/onboarding', request.url));
         }
       }

       return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // Devolver al usuario a una ruta de error en caso de fallo
  return NextResponse.redirect(new URL('/login?error=auth', request.url));
}
