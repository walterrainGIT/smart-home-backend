import {defineMikroOrmConfig} from "@smart-home/libs/common/modules/configs";
import {LotEntity, ProductEntity} from "../entities";

export const entities = [ LotEntity, ProductEntity ];

export const mikroOrmConfig = defineMikroOrmConfig({ entities, servicePath: 'market' });

export default mikroOrmConfig;
