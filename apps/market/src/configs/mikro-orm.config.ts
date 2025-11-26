import { defineMikroOrmConfig } from '@smart-home/libs/common/modules/configs';
import { LotEntity, OrderEntity, ProductEntity } from '../entities';
import { ConfiguratorEntity } from '../entities/configurator.entity';

export const entities = [
  LotEntity,
  ProductEntity,
  OrderEntity,
  ConfiguratorEntity,
];

export const mikroOrmConfig = defineMikroOrmConfig({
  entities,
  servicePath: 'market',
});

export default mikroOrmConfig;
