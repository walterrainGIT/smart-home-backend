import {
  Entity,
  EntityRepositoryType, ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import {Exclude, Expose, } from 'class-transformer';
import { BaseEntity, NumberBigIntType } from '@smart-home/libs/common/database';
import { PlainGroupsEnum } from '@smart-home/libs/common/enums';
import {PortfolioRepository} from "./repositories";
import {ICustomer, IPortfolio} from "@smart-home/libs/types/portfolio";

@Entity({
  tableName: `portfolio.portfolios`,
  repository: () => PortfolioRepository,
})
@Exclude()
export class PortfolioEntity extends BaseEntity implements IPortfolio {
  [EntityRepositoryType]: PortfolioRepository;

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
  images?: string[];

  @ManyToOne('CustomerEntity')
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  customer: ICustomer;
}
