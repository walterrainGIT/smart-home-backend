import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
  ManyToOne,
} from '@mikro-orm/core';
import { Exclude, Expose } from 'class-transformer';
import { BaseEntity, NumberBigIntType } from '@smart-home/libs/common/database';
import { PlainGroupsEnum } from '@smart-home/libs/common/enums';

@Entity({
  tableName: `market.configurator`,
})
@Exclude()
export class ConfiguratorEntity extends BaseEntity {
  [EntityRepositoryType]: any;

  @PrimaryKey({ type: NumberBigIntType, autoincrement: true })
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  id: number;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  userId: number;

  @Property({ type: 'jsonb' })
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  rooms: any[];

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  totalPrice: number;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  name?: string;
}

