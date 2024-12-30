import { Injectable } from '@nestjs/common';
import {IGetUserById, ILoginUser, IRegisterUser, IUser} from "@smart-home/libs/types/users/user";
import {UserEntity} from "user/entities";
import { EntityManager } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import {RpcException} from "@nestjs/microservices";

@Injectable()
export class MarketService {
    constructor(
        private readonly em: EntityManager,
    ) {}

    async getUserById(params: IGetUserById): Promise<IUser> {
        return this.em.fork().getRepository(UserEntity).getUserById(params);
    }

    async registerUser(params: IRegisterUser): Promise<IUser> {
        return this.em.fork().getRepository(UserEntity).registerUser(params);
    }

    async loginUser(params: ILoginUser): Promise<IUser> {
        const {loginParam, password} = params;

        const user = await this.em.fork().getRepository(UserEntity).getUserByParams({
            username: loginParam,
            email: loginParam,
            phone: loginParam
        });

        if (!await bcrypt.compare(password, user.passwordHash)) {
            throw new RpcException('ERRORS.USER.USER_AUTH_DATA_NOT_VALID');
        }

        return user;
    }
}
