import { AdminDashboard } from '@/modules/profile/components/AdminDashboard';
import { createClient } from '@/modules/database/server';
import { db } from '@/modules/database/db-client';
import { users } from '@/modules/database/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export default async function AdminTerminalPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { user } = session;

  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, user.id)
  });

  // Doble seguridad: Si el usuario fuerza la URL /admin/terminal pero no es admin, lo pateamos
  if (!dbUser || dbUser.role !== 'admin') {
    redirect('/profile'); // Lo mandamos de vuelta a su perfil de visitante
  }

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4">
       <AdminDashboard />
    </div>
  );
}
