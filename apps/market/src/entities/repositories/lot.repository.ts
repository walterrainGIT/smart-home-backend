import {
  SqlEntityRepository,
} from '@mikro-orm/postgresql';
import { UserEntity } from 'user/entities';
import {IGetUserById, IGetUserByParams, IRegisterUser, IUser, UserRoleEnum} from "@smart-home/libs/types/users/user";
import * as bcrypt from 'bcrypt';
import {PASSWORD_SALT} from "user/constants";
import {RpcException} from "@nestjs/microservices";
import moment from 'moment';
import {LotEntity} from "../lot.entity";
import {IGetLots, ILot, ILotMetadataPagination} from "@smart-home/libs/types/market";

export class LotRepository extends SqlEntityRepository<LotEntity> {
  async getLots(params: IGetLots): Promise<ILotMetadataPagination> {
    const { pagination } = params;
    const { limit, offset } = pagination;

    const qb = this.em.createQueryBuilder(LotEntity)
        .limit(limit, offset);

    const [lots, total] = await qb.getResultAndCount();

    return {
      lots,
      metadata: {
        total,
        limit,
        offset,
      }
    }
  }

  async getUserById(params: IGetUserById): Promise<IUser> {
    const { id } = params;

    const user = await this.em.getRepository(UserEntity).findOne({ id });

    if(!user) {
      throw new RpcException('ERRORS.USER.USER_NOT_FOUND');
    }

    return user;
  }

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
      user.lastLogin = moment().toDate();

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
      phone,
    });
    if(email) qb.orWhere({
      email,
    });

    const user = await qb.getSingleResult();

    if(!user) {
      throw new RpcException('ERRORS.USER.USER_NOT_FOUND');
    }

    return user;
  }
}
