/* eslint-disable no-console */
import { Database } from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

async function runMigrations() {
  console.log('Iniciando migrações...');
  migrate(db, { migrationsFolder: './drizzle' });

  console.log('[✓] Migrações concluídas com sucesso!');
  process.exit(0);
}

runMigrations().catch((err) => {
  console.error('Erro durante as migrações:', err);
  process.exit(1);
});
