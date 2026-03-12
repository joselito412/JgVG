import { redirect } from 'next/navigation';
import { createClient } from '@/modules/database/server';
import { db } from '@/modules/database/db-client';
import { users } from '@/modules/database/schema';
import { eq } from 'drizzle-orm';

interface AuthGuardProps {
  children: React.ReactNode;
  requireOnboarding?: boolean; // false para ruta /onboarding, true para /profile
}

export async function AuthGuard({ children, requireOnboarding = true }: AuthGuardProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 1. Basic Auth Check
  if (!user) {
    redirect('/login');
  }

  // 2. DB Sync Check (Fallback for Edge cases where SignUp failed to insert)
  let dbUser = await db.query.users.findFirst({
    where: eq(users.id, user.id)
  });

  if (!dbUser) {
    const { ensureUserRecord } = await import('@/modules/database/user-actions');
    const { onboarded } = await ensureUserRecord(user.id, user.email!, user.user_metadata || {});
    dbUser = { ...user, onboarded } as any; // mock structure to pass logic
  }

  // 3. Onboarding Flow Logic
  // Un admin siempre se considera onboarded
  const isOnboarded = dbUser?.role === 'admin' ? true : (dbUser?.onboarded || false);

  // Si requiere onboarding (ej: /profile) pero no lo tiene -> lo mandamos a fuerzas a llenarlo
  if (requireOnboarding && !isOnboarded) {
    redirect('/onboarding');
  }

  // Si NO requiere onboarding (está en la pag /onboarding) pero YA lo llenó -> sácarlo de ahi
  if (!requireOnboarding && isOnboarded) {
    // Si es admin, mandarlo a su terminal. Si no, al home.
    redirect(dbUser?.role === 'admin' ? '/admin/terminal' : '/');
  }

  return <>{children}</>;
}
