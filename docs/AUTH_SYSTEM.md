# 🔐 Sistema de Autenticación y Onboarding (AUTH_SYSTEM.md)

El sistema de roles y accesos está construido sobre **Supabase `@supabase/ssr`** cruzado con componentes Server-Rendered de Next.js para maximizar la seguridad sin parpadear (Flickering) pantallas.

## 1. El Motor de Auth-SSR (Cookies Server)
No usamos `localStorage`. Las sesiones se almacenan pasivamente en Cookies ultra-seguras y se desencriptan en la capa de servidor usando la utilidad de `src/lib/supabase/server.ts` antes de devolver ni un solo bit de HTML al cliente.

## 2. Journey del Usuario

### A. Pantalla de Acceso (Login/Sign-up)
La ruta `/login` utiliza segregación estética. 
- Muestra una sección "Iniciar Sesión" (Para recuperar sesión de un JWT anterior).
- Muestra "Crear Cuenta" (Sign-up, inscribe al core auth inmutable de Supabase).

*Bypass de Dev:* En modo local/Docker, existe un usuario con llaves duras (`AMIG0S:fELICES`) preconfigurado en las pruebas unitarias para evadir el setup de tokens OAUTH2 (ej. Google Login).

### B. El Redirecionador (Middleware)
`middleware.ts` fue despojado de lógica invasiva (para evitar crasheos Next.js).
Su única función: Prevenir que alguien que NO tiene cookie válida entre a ramas protegidas. Si entran a `/profile` y no están registrados, se redirigen de inmediato al Authwall.

### C. Onboarding Limpio (Inscritos a Medias)
Un usuario con el JWT de Supabase NO ESTÁ COMPLETO. En TuAvocado manejamos el estado vital de inscripción completa.
1. Al Iniciar Sesión por primera vez, se crea el Identity en `auth.users`.
2. Una rutina lo empuja a `/onboarding` a entregar su Identidad Real y Cargo.
3. Se escribe el Drizzle Record dentro de nuestra tabla pública ligada `users`, marcando el campo virtual `onboarded = true`.

Solamente los que cruzan el Onboarding pueden acceder al panel final.

## 3. Seguridad de Roles (Role Based Access Control - RBAC)
El Row Level Security (RLS) en Postgres bloqueará la mayoría de lecturas destructivas, pero a nivel de Framework React intermedio verificamos un campo `role` de base de datos.

Sólo si tu email posee el nivel `admin` el layout te dejará ver y consumir los componentes situados en el área `/admin` (los tableros de control y modificación CMS) de las Skills, Trabajos o del Agente IA.
