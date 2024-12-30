import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Exclude, Expose } from 'class-transformer';
import { BaseEntity, NumberBigIntType } from '@smart-home/libs/common/database';
import { UserRoleEnum } from '@smart-home/libs/types/users/user';
import { PlainGroupsEnum } from '@smart-home/libs/common/enums';
import {LotRepository} from "./repositories";
import {ILot} from "@smart-home/libs/types/market";

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
  firstName: string;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  lastName: string;

  @Property({ unique: true })
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  email: string;

  @Property({ unique: true })
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  phone?: string;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  address?: string;

  @Property({ unique: true })
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  username: string;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.ADMIN] })
  passwordHash: string;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  role: UserRoleEnum;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  lastLogin: Date;
}
