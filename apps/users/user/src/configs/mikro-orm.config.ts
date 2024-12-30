import { UserEntity } from 'user/entities';
import {defineMikroOrmConfig} from "@smart-home/libs/common/modules/configs";

export const entities = [ UserEntity ];

export const mikroOrmConfig = defineMikroOrmConfig({ entities, servicePath: 'users/user' });

export default mikroOrmConfig;
