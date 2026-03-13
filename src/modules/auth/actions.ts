'use server';

import { createClient } from '@/modules/database/server';
import { redirect } from 'next/navigation';

export async function signInWithGoogle() {
  const supabase = await createClient();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback?next=/profile`,
    },
  });

  if (error) {
    console.error('Error signing in with Google:', error.message);
    return redirect('/login?error=true');
  }

  if (data?.url) {
    redirect(data.url);
  }
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}

export async function signInWithEmail(email: string, password?: string) {
  const supabase = await createClient();

  if (!password) {
    return { error: 'Contraseña obligatoria en entorno local' };
  }

  // Try sign in first
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
     return { error: signInError.message };
  }

  // Get user session to inject into postgres map
  const { data: { user } } = await supabase.auth.getUser();
  let onboarded = false;
  if (user) {
    try {
      const { ensureUserRecord } = require('@/modules/database/user-actions');
      const record = await ensureUserRecord(user.id, user.email!, user.user_metadata || {});
      onboarded = record.onboarded;
    } catch (dbErr: any) {
      console.error("DB INSERT ERROR FROM ACTION:", dbErr);
      return { error: `DB Sync Error: ${dbErr.message || 'Unknown DB Error'}` };
    }
  }

  return { success: true, onboarded };
}

export async function signUpWithEmail(email: string, password?: string) {
  const supabase = await createClient();

  if (!password) {
    return { error: 'Contraseña obligatoria para registro local' };
  }

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
     email,
     password,
  });
  
  if (signUpError) {
     return { error: signUpError.message };
  }

  // Ensure user record is created immediately
  let onboarded = false;
  if (signUpData.user) {
     try {
       const { ensureUserRecord } = require('@/modules/database/user-actions');
       const record = await ensureUserRecord(signUpData.user.id, signUpData.user.email!, signUpData.user.user_metadata || {});
       onboarded = record.onboarded;
     } catch (dbErr: any) {
       console.error("DB INSERT ERROR FROM SIGNUP:", dbErr);
       return { error: `DB Sync Error: ${dbErr.message || 'Unknown DB Error'}` };
     }
  }

  return { success: true, onboarded };
}
