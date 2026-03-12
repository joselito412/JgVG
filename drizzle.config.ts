import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

export default defineConfig({
  schema: './src/modules/database/schema/index.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL 
      ? process.env.NEXT_PUBLIC_SUPABASE_URL.replace('http://', 'postgresql://postgres:postgres@').replace(/:\d+$/, ':54322/postgres')
      : 'postgresql://postgres:postgres@127.0.0.1:54322/postgres',
  },
});
