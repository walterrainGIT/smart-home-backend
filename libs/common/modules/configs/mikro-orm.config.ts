import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from '@smart-home/libs/common/constants/database';
import * as assert from 'assert';
import { IDefineMikroOrmConfig } from '../modules/interfaces';

export function defineMikroOrmConfig(params: IDefineMikroOrmConfig): MikroOrmModuleOptions  {
  const { dbName = DB_NAME, user = DB_USERNAME, password = DB_PASSWORD, host = DB_HOST, port = DB_PORT, entities, servicePath } = params;

  assert.ok(host);
  assert.ok(port);
  assert.ok(user);
  assert.ok(dbName);

  return  {
    driver: PostgreSqlDriver,
    dbName,
    user,
    password,
    host,
    port: +port,
    entities: entities.length > 0 ? entities : undefined,
    migrations: {
      tableName: 'mikro_orm_migrations',
      path: `apps/${servicePath}/src/entities/migrations`,
      glob: '!(*.d).{js,ts}',
    },
    seeder: {
      path: './seeds',
    },
    debug: process.env.NODE_ENV !== 'production',
  };
}
