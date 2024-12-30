import {defineMikroOrmConfig} from "@smart-home/libs/common/modules/configs";
import {LotEntity} from "../entities";
import {ProductEntity} from "../entities/product.entity";

export const entities = [ LotEntity, ProductEntity ];

export const mikroOrmConfig = defineMikroOrmConfig({ entities, servicePath: 'users/user' });

export default mikroOrmConfig;
