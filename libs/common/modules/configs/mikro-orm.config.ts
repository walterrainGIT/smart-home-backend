import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from '@smart-home/libs/common/constants/database';
import * as assert from 'assert';
import { IDefineMikroOrmConfig } from '@smart-home/libs/common/modules';
import * as path from 'path';
import * as fs from 'fs';

export function defineMikroOrmConfig(
  params: IDefineMikroOrmConfig
): MikroOrmModuleOptions {
  const {
    dbName = DB_NAME,
    user = DB_USERNAME,
    password = DB_PASSWORD,
    host = DB_HOST,
    port = DB_PORT,
    entities,
    servicePath,
  } = params;

  assert.ok(host);
  assert.ok(port);
  assert.ok(user);
  assert.ok(dbName);

  // Determine if we're running from compiled code (dist) or source
  // Check if main module is in dist directory
  const mainModulePath = require.main?.filename || __filename;
  const isCompiled =
    mainModulePath.includes(path.join('dist', 'apps')) ||
    mainModulePath.includes('dist\\apps') ||
    __dirname.includes(path.join('dist', 'libs')) ||
    __dirname.includes('dist\\libs');

  // Try to use compiled migrations first, fallback to source if not found
  const compiledMigrationsPath = path.join(
    process.cwd(),
    'dist',
    'apps',
    servicePath,
    'src',
    'entities',
    'migrations'
  );
  const sourceMigrationsPath = path.join(
    process.cwd(),
    'apps',
    servicePath,
    'src',
    'entities',
    'migrations'
  );

  // Use compiled path if running from dist and it exists, otherwise use source path
  const compiledMigrationsExist = fs.existsSync(compiledMigrationsPath);
  const migrationsPath =
    isCompiled && compiledMigrationsExist
      ? compiledMigrationsPath
      : sourceMigrationsPath;

  // When compiled, only look for .js files if compiled migrations exist
  // Otherwise, look for both .js and .ts (ts-node should be registered in main.ts)
  const glob =
    isCompiled && compiledMigrationsExist ? '!(*.d).js' : '!(*.d).{js,ts}';

  return {
    driver: PostgreSqlDriver,
    dbName,
    user,
    password,
    host,
    port: +port,
    entities: entities.length > 0 ? entities : undefined,
    migrations: {
      tableName: 'mikro_orm_migrations',
      path: migrationsPath,
      glob,
      transactional: true,
    },
    seeder: {
      path: './seeds',
    },
    debug: process.env.NODE_ENV !== 'production',
  };
}
