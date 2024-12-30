import {
  SqlEntityRepository,
} from '@mikro-orm/postgresql';
import { UserEntity } from 'user/entities';
import {IGetUserByParams, IRegisterUser, IUser, UserRoleEnum} from "@smart-home/libs/types/users/user";
import * as bcrypt from 'bcrypt';
import {PASSWORD_SALT} from "user/constants";
import {RpcException} from "@nestjs/microservices";

export class UserRepository extends SqlEntityRepository<UserEntity> {
  async registerUser(params: IRegisterUser): Promise<IUser> {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      username,
      password,
    } = params;

    let user;

    try {
      user = await this.getUserByParams(params);
    } catch (e) {
      const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT);

      const user = new UserEntity();
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      if(phone) user.phone = phone;
      if(address) user.address = address;
      user.username = username;
      user.passwordHash = hashedPassword;
      user.role = UserRoleEnum.USER;

      await this.em.persistAndFlush(user);
      return user;
    }

    if(user) {
      throw new RpcException('ERRORS.USER.USER_ALREADY_EXIST');
    }
  }

  async getUserByParams(params: IGetUserByParams): Promise<IUser> {
    const { username, phone, email } = params;

    const qb = this.em.createQueryBuilder(UserEntity);
    if(username) qb.orWhere({
      username,
    });
    if(phone) qb.orWhere({
      username,
    });
    if(email) qb.orWhere({
      username,
    });

    const user = await qb.getSingleResult();

    if(!user) {
      throw new RpcException('ERRORS.USER.USER_NOT_FOUND');
    }

    return user;
  }
}
