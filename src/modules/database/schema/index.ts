import { pgTable, text, timestamp, uuid, boolean, jsonb, customType } from 'drizzle-orm/pg-core';

// Vector Custom Type para PGVector
const vector = customType<{ data: number[] }>({
  dataType() {
    return 'vector(1536)';
  },
  toDriver(value: number[]) {
    return JSON.stringify(value);
  },
  fromDriver(value: unknown): number[] {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value) as number[];
      } catch (e) {
        return [];
      }
    }
    return value as number[];
  },
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey().notNull(), // This will reference auth.users.id from Supabase
  email: text('email').notNull().unique(),
  fullName: text('full_name'),
  username: text('username'),
  occupation: text('occupation'),
  interest: text('interest'),
  phone: text('phone'),
  company: text('company'),
  acceptedPolicies: boolean('accepted_policies').default(false).notNull(),
  acceptedTerms: boolean('accepted_terms').default(false).notNull(),
  role: text('role', { enum: ['admin', 'visitor'] }).default('visitor').notNull(),
  onboarded: boolean('onboarded').default(false).notNull(),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url'),
  link: text('link'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Phase 6 - CMS Tables
export const services = pgTable('services', {
  id: uuid('id').defaultRandom().primaryKey(),
  icon: text('icon').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: text('category', { enum: ['Legal', 'Tech', 'Legal-Tech'] }).notNull(),
  color: text('color').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const classModules = pgTable('class_modules', {
  id: uuid('id').defaultRandom().primaryKey(),
  area: text('area', { enum: ['Legal', 'Tech'] }).notNull(),
  title: text('title').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const classes = pgTable('classes', {
  id: uuid('id').defaultRandom().primaryKey(),
  moduleId: uuid('module_id').references(() => classModules.id).notNull(),
  title: text('title').notNull(),
  duration: text('duration').notNull(),
  // Storing resources as a JSONB array of strings
  resources: text('resources').array().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const prompts = pgTable('prompts', {
  id: uuid('id').defaultRandom().primaryKey(),
  topic: text('topic').notNull(),
  tool: text('tool').notNull(),
  purpose: text('purpose').notNull(),
  promptText: text('prompt_text').notNull(),
  tips: text('tips'),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// Phase 7 - AI Integration (Vercel AI SDK Memory & Persistance)
export const chatSessions = pgTable('chat_sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  title: text('title'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const chatMessages = pgTable('chat_messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionId: uuid('session_id').references(() => chatSessions.id).notNull(),
  role: text('role', { enum: ['user', 'assistant', 'system', 'tool'] }).notNull(),
  content: jsonb('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const documentEmbeddings = pgTable('document_embeddings', {
  id: uuid('id').defaultRandom().primaryKey(),
  content: text('content').notNull(),
  metadata: jsonb('metadata'), // Ex. { servicioId: 'xxx', category: 'Legal' }
  embedding: vector('embedding'), // PGVector (Vector dimension 1536 by default for text-embedding-ada-002)
});
