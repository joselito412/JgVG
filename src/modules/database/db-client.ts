import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.NEXT_PUBLIC_SUPABASE_URL 
  ? process.env.NEXT_PUBLIC_SUPABASE_URL.replace('http://', 'postgresql://postgres:postgres@').replace(/:\d+$/, ':54322/postgres')
  : 'postgresql://postgres:postgres@127.0.0.1:54322/postgres';

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
