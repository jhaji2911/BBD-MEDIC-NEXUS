import { defineConfig, Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
// import { SeedManager } from '@mikro-orm/seeder';
import { Migrator } from '@mikro-orm/migrations';
import { existsSync, readFileSync } from 'node:fs';
import { entities } from './entities';

const options = {} as Options<PostgreSqlDriver>;

if (
  process.env.NODE_ENV === 'production' &&
  existsSync('./temp/metadata.json')
) {
  options.metadataCache = {
    enabled: true,
    // temp/metadata.json can be generated via `npx mikro-orm cache:generate --combine`
    options: {
      data: JSON.parse(
        readFileSync('./temp/metadata.json', { encoding: 'utf8' })
      )
    }
  };
}

export default defineConfig({
  driver: PostgreSqlDriver,
  dbName: process.env.DB_NAME || 'postgres', // replace with your database name
  user: process.env.DB_USER || 'nishantjha', // replace with your database user
  password: process.env.DB_PASSWORD || 'ninja@123', // replace with your database password
  host: process.env.DB_HOST || 'localhost', // replace with your database host
  port: 5432, // replace with your database port
  // folder based discovery setup, using common filename suffix
  entities,
  entitiesTs: ['src/**/*.entity.ts'],
  // enable debug mode to log SQL queries and discovery information
  debug: process.env.NODE_ENV !== 'production',
  // for vitest to get around `TypeError: Unknown file extension ".ts"` (ERR_UNKNOWN_FILE_EXTENSION)
  dynamicImportProvider: id => import(id),
  // for highlighting the SQL queries
  highlighter: new SqlHighlighter(),
  extensions: [Migrator],
  ...options
});
