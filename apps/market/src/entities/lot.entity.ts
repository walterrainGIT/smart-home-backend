import {
  Collection,
  Entity,
  EntityRepositoryType, ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import {Exclude, Expose, Transform, TransformFnParams} from 'class-transformer';
import { BaseEntity, NumberBigIntType } from '@smart-home/libs/common/database';
import { PlainGroupsEnum } from '@smart-home/libs/common/enums';
import {LotRepository} from "./repositories";
import {ILot, IProduct} from "@smart-home/libs/types/market";
import {ProductEntity} from "market/entities/product.entity";

@Entity({
  tableName: `market.lots`,
  repository: () => LotRepository,
})
@Exclude()
export class LotEntity extends BaseEntity implements ILot {
  [EntityRepositoryType]: LotRepository;

  @PrimaryKey({ type: NumberBigIntType, autoincrement: true })
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  id: number;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  name: string;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  shortDescription?: string;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  description?: string;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  price?: number;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  image?: string;

  @ManyToMany(() => ProductEntity, 'lots', {
    joinColumn: 'product_id',
    inverseJoinColumn: 'lot_id',
  })
  @Transform(
      ({ value }: TransformFnParams) => {
        return value && value.isInitialized() ? value.getItems() : [];
      },
      { toPlainOnly: true }
  )
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  products = new Collection<IProduct>(this);
}
