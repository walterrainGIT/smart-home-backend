import { defineMikroOrmConfig } from '@smart-home/libs/common/modules';
import { UserEntity } from 'user/entities';

export const entities = [ UserEntity ];

export const mikroOrmConfig = defineMikroOrmConfig({ entities, servicePath: 'users/user' });

export default mikroOrmConfig;
