import { Injectable } from '@nestjs/common';
import {IGetUserById, IUpdateUser, IUser} from "@smart-home/libs/types/users/user";
import {UserEntity} from "user/entities";
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class UserService {
  constructor(
      private readonly em: EntityManager,
  ) {}

  async getUserById(params: IGetUserById): Promise<IUser> {
    return this.em.fork().getRepository(UserEntity).getUserById(params);
  }

  async updateUser(params: IUpdateUser): Promise<IUser> {
    return this.em.fork().getRepository(UserEntity).updateUser(params);
  }
}
