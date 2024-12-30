import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Exclude, Expose } from 'class-transformer';
import { UserRepository } from 'user/entities';
import { BaseEntity, NumberBigIntType } from '@smart-home/libs/common/database';
import { IUser, UserRoleEnum } from '@smart-home/libs/types/users/user';
import { PlainGroupsEnum } from '@smart-home/libs/common/enums';

@Entity({
  tableName: `users.user`,
  repository: () => UserRepository,
})
@Exclude()
export class UserEntity extends BaseEntity implements IUser {
  [EntityRepositoryType]: UserRepository;

  @PrimaryKey({ type: NumberBigIntType })
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  id: number;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  firstName: string;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  lastName: string;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  email: string;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  phone?: string;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  address?: string;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  username: string;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  passwordHash: string;

  @Property()
  @Expose({ groups: [PlainGroupsEnum.PUBLIC] })
  role: UserRoleEnum;
}
