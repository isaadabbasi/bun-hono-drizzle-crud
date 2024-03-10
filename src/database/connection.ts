import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import * as schema from './schema'

const dbConfig = {
  db: "app",
  username: "app",
  password: "password",
  hostname: "localhost",
  port: 5432,
}

const migrationClient = postgres({ ...dbConfig, max: 1 });
migrate(
  drizzle(migrationClient),
  {
    migrationsFolder: [process.cwd(), 'src', 'database', 'migrations'].join('/')
  }
)


const queryClient = postgres(dbConfig);
export const db = drizzle(queryClient, { schema });
