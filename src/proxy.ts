import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Apply Security Headers (HSTS, XSS Protection, Clickjacking prevention)
  const securityHeaders = {
    'X-DNS-Prefetch-Control': 'on',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };

  Object.entries(securityHeaders).forEach(([key, value]) => {
    supabaseResponse.headers.set(key, value);
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANTE: NO eliminar. refresh() evalúa el token JWT guardado.
  // Sin esto, una sesión falsificada podría mantenerse.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect routes like /profile
  if (!user && request.nextUrl.pathname.startsWith('/profile')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Protect /admin routes
  if (!user && request.nextUrl.pathname.startsWith('/admin')) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // Basic redirection from login to profile if already authenticated
  // Detailed onboarding checks are now handled by Server Components (e.g. AuthGuard)
  if (user && request.nextUrl.pathname === '/login') {
     const url = request.nextUrl.clone()
     url.pathname = '/profile'
     return NextResponse.redirect(url)
  }

  // Strict CORS policies for API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Only allow specific origins in production, or localhost in development
    const allowedOrigin = process.env.NODE_ENV === 'production' 
      ? 'https://joseguillermovg.com' 
      : 'http://localhost:3000';
    
    supabaseResponse.headers.set('Access-Control-Allow-Origin', allowedOrigin);
    supabaseResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    supabaseResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
