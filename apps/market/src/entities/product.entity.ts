import {
    Collection,
    Entity,
    EntityRepositoryType, ManyToMany,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import {Exclude, Expose} from 'class-transformer';
import { BaseEntity, NumberBigIntType } from '@smart-home/libs/common/database';
import { PlainGroupsEnum } from '@smart-home/libs/common/enums';
import {ProductRepository} from "./repositories";
import {ILot, IProduct} from "@smart-home/libs/types/market";
import {LotEntity} from "market/entities/lot.entity";

@Entity({
    tableName: `market.products`,
    repository: () => ProductRepository,
})
@Exclude()
export class ProductEntity extends BaseEntity implements IProduct {
    [EntityRepositoryType]: ProductRepository;

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

    @ManyToMany(() => LotEntity, 'products', {
        owner: true,
        joinColumn: 'product_id',
        inverseJoinColumn: 'lot_id',
    })
    lots = new Collection<ILot>(this);
}
