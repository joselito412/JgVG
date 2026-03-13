'use server';

import { db } from './db-client';
import { users, services, classes, classModules, prompts } from './schema';
import { createClient } from './server';
import { desc, sql, eq } from 'drizzle-orm';

/**
 * Verifica si el usuario actual tiene sesión y rol de admin.
 * Lanza un error si no está autorizado.
 */
async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('No autorizado: Sin sesión');
  }

  const dbUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, user.id),
    columns: { role: true }
  });

  if (!dbUser || dbUser.role !== 'admin') {
    throw new Error('Acceso denegado: Privilegios insuficientes');
  }

  return user;
}

/**
 * Obtiene las estadísticas generales del sistema (Solo Admin)
 */
export async function getAdminStats() {
  await requireAdmin();

  // Obtener conteo total usando sql literal para mayor compatibilidad/velocidad en DBs grandes
  const result = await db.select({ count: sql<number>`count(*)` }).from(users);
  const totalUsers = result[0]?.count || 0;

  return {
    totalUsers,
    systemStatus: 'ONLINE',
    dbConnection: 'STABLE'
  };
}

/**
 * Obtiene la lista de visitantes recientes (Solo Admin)
 * @param limit Cantidad límite a devolver (Por defecto 50)
 */
export async function getRecentVisitors(limit: number = 50) {
  await requireAdmin();

  const visitors = await db.query.users.findMany({
    limit,
    orderBy: [desc(users.createdAt)],
    columns: {
      id: true,
      email: true, // El usuario pidió acceso completo a los datos
      fullName: true,
      role: true,
      occupation: true,
      interest: true,
      onboarded: true,
      createdAt: true,
    }
  });

  return visitors;
}

// ==========================================
// CMS ACTIONS (Phase 8 Prep)
// ==========================================

export async function createService(data: Omit<typeof services.$inferInsert, 'id' | 'createdAt'>) {
  await requireAdmin();
  const [newService] = await db.insert(services).values(data).returning();
  return newService;
}

export async function deleteService(id: string) {
  await requireAdmin();
  await db.delete(services).where(eq(services.id, id));
  return { success: true };
}

export async function createClassModule(data: Omit<typeof classModules.$inferInsert, 'id' | 'createdAt'>) {
  await requireAdmin();
  const [newModule] = await db.insert(classModules).values(data).returning();
  return newModule;
}

export async function createClass(data: Omit<typeof classes.$inferInsert, 'id' | 'createdAt'>) {
  await requireAdmin();
  const [newClass] = await db.insert(classes).values(data).returning();
  return newClass;
}

export async function deleteClass(id: string) {
  await requireAdmin();
  await db.delete(classes).where(eq(classes.id, id));
  return { success: true };
}

export async function createPrompt(data: Omit<typeof prompts.$inferInsert, 'id' | 'createdAt'>) {
  await requireAdmin();
  const [newPrompt] = await db.insert(prompts).values(data).returning();
  return newPrompt;
}

export async function deletePrompt(id: string) {
  await requireAdmin();
  await db.delete(prompts).where(eq(prompts.id, id));
  return { success: true };
}
