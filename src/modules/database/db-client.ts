import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Require DATABASE_URL for standard production connections
// Otherwise, fallback to local development defaults
const connectionString = process.env.DATABASE_URL || (
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL.includes('127.0.0.1')
    ? process.env.NEXT_PUBLIC_SUPABASE_URL.replace('http://', 'postgresql://postgres:postgres@').replace(/:\d+$/, ':54332/postgres')
    : 'postgresql://postgres:postgres@127.0.0.1:54332/postgres'
);

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
