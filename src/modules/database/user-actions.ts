'use server';

import { eq } from 'drizzle-orm';
import { db } from './db-client';
import { users } from './schema';

export async function ensureUserRecord(
  userId: string,
  email: string,
  userMetadata: any
) {
  // Check if user exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!existingUser) {
    const isOwner = email === 'jguiller412@gmail.com';
    
    // Create new user record
    await db.insert(users).values({
      id: userId,
      email: email,
      fullName: isOwner ? 'José Guillermo (Admin)' : (userMetadata?.full_name || ''),
      avatarUrl: userMetadata?.avatar_url || '',
      role: isOwner ? 'admin' : 'visitor',
      occupation: isOwner ? 'Superhéroe Legal-Tech' : null,
      interest: isOwner ? 'all' : null,
      onboarded: isOwner, // El dueño empieza con el onboarding completado
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { isNewUser: true, onboarded: isOwner };
  }

  return { isNewUser: false, onboarded: existingUser.onboarded };
}

export async function updateUserOnboarding(
  userId: string,
  data: { 
    occupation: string; 
    interest: string; 
    username: string;
    phone: string;
    company?: string;
    acceptedPolicies: boolean;
    acceptedTerms: boolean;
  }
) {
  await db
    .update(users)
    .set({
      ...data,
      onboarded: true,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));
}
