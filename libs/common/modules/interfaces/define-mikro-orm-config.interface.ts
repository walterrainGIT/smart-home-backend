import {
  AnyEntity,
  EntityClass,
} from '@mikro-orm/core/typings';


export interface IDefineMikroOrmConfig {
  dbName?: string;
  user?: string;
  password?: string;
  host?: string;
  port?: number;
  entities?: EntityClass<AnyEntity>[];
  servicePath: string;
}
