import {
  Cascade,
  Collection,
  Entity,
  EntityRepositoryType, OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import {Exclude, Expose, Transform} from 'class-transformer';
import { BaseEntity, NumberBigIntType } from '@smart-home/libs/common/database';
import { PlainGroupsEnum } from '@smart-home/libs/common/enums';
import {CustomerRepository} from "./repositories";
import {ICustomer, IPortfolio} from "@smart-home/libs/types/portfolio";
import {PortfolioEntity} from "./portfolio.entity";

@Entity({
  tableName: `portfolio.customers`,
  repository: () => CustomerRepository,
})
@Exclude()
export class CustomerEntity extends BaseEntity implements ICustomer {
  [EntityRepositoryType]: CustomerRepository;

  @PrimaryKey({ type: NumberBigIntType, autoincrement: true })
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  id: number;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  name: string;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  description: string;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  logo?: string;

  @OneToMany(
      () => PortfolioEntity,
      entity => entity.customer,
      { mappedBy: 'customer', cascade: [Cascade.ALL] },
  )
  @Transform(({ value }: { value: Collection<PortfolioEntity> }) =>
      (value && value.isInitialized() ? value.getItems() : []), { toPlainOnly: true })
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  portfolios? = new Collection<IPortfolio>(this);
}
