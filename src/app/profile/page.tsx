import { createClient } from '@/modules/database/server';
import { db } from '@/modules/database/db-client';
import { users } from '@/modules/database/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { VisitorProfile } from '@/modules/profile/components/VisitorProfile';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { user } = session;

  // Cargar datos extendidos desde nuestra base de datos
  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, user.id)
  });

  if (!dbUser) {
    // Si por alguna razón el usuario está en Supabase Auth pero no en nuestra DB, mandarlo a onboarding
    redirect('/onboarding');
  }

  // --- LÓGICA DE ENRUTAMIENTO MULTI-ROL ---
  if (dbUser.role === 'admin') {
    // El dueño legal-tech no ve el perfil público, va directo a la central de mando
    redirect('/admin/terminal');
  }

  // Si es un visitante mortal, le mostramos su carnet minimalista
  return (
    <VisitorProfile dbUser={dbUser} />
  );
}
