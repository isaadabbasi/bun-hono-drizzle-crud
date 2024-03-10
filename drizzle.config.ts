import type { Config } from 'drizzle-kit'

export default {
  schema: './src/database/schema/user.ts',
  out: './src/database/migrations',
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: "localhost",
    database: "app",
    user: "app",
    password: "password",
  },
} satisfies Config
