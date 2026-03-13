import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';

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
