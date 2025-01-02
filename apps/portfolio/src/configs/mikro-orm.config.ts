import {defineMikroOrmConfig} from "@smart-home/libs/common/modules/configs";
import {CustomerEntity, PortfolioEntity} from "../entities";

export const entities = [ PortfolioEntity, CustomerEntity ];

export const mikroOrmConfig = defineMikroOrmConfig({ entities, servicePath: 'portfolio' });

export default mikroOrmConfig;
