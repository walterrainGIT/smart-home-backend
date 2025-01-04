import {
  Entity,
  EntityRepositoryType, ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import {Exclude, Expose, } from 'class-transformer';
import { BaseEntity, NumberBigIntType } from '@smart-home/libs/common/database';
import { PlainGroupsEnum } from '@smart-home/libs/common/enums';
import { OrderRepository} from "./repositories";
import {ILot, IOrder, OrderStatusEnum} from "@smart-home/libs/types/market";
import {IUser} from "@smart-home/libs/types/users/user";

@Entity({
  tableName: `market.orders`,
  repository: () => OrderRepository,
})
@Exclude()
export class OrderEntity extends BaseEntity implements IOrder {
  [EntityRepositoryType]: OrderRepository;

  @PrimaryKey({ type: NumberBigIntType, autoincrement: true })
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  id: number;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  userId: number;

  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  user: IUser;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  status: OrderStatusEnum;

  @ManyToOne('LotEntity')
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  lot: ILot;

  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  createdAt: Date;
}
