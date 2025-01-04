import {defineMikroOrmConfig} from "@smart-home/libs/common/modules/configs";
import {LotEntity, OrderEntity, ProductEntity} from "../entities";

export const entities = [ LotEntity, ProductEntity, OrderEntity ];

export const mikroOrmConfig = defineMikroOrmConfig({ entities, servicePath: 'market' });

export default mikroOrmConfig;
