import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { baseFields } from './base'

export const users = pgTable('users', {
  ...baseFields,
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  phone: varchar('phone', { length: 256 }).unique(),
});

export type UserSchema = typeof users.$inferSelect