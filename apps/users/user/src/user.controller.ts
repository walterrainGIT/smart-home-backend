import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import {IGetUserById, ILoginUser, IRegisterUser, IUser} from '@smart-home/libs/types/users/user';
import { PlainGroupsEnum } from '@smart-home/libs/common/enums';
import { instanceToPlain } from 'class-transformer';

@Controller('User')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'RegisterUser')
  async registerUser(params: IRegisterUser): Promise<IUser> {
    const user = await this.authService.registerUser(params);

    return instanceToPlain(user, { groups: [PlainGroupsEnum.PUBLIC], enableCircularCheck: true }) as IUser;
  }

  @GrpcMethod('AuthService', 'LoginUser')
  async loginUser(params: ILoginUser): Promise<IUser> {
    const user = await this.authService.loginUser(params);

    return instanceToPlain(user, { groups: [PlainGroupsEnum.PUBLIC], enableCircularCheck: true }) as IUser;
  }

  @GrpcMethod('AuthService', 'GetUserById')
  async getUserById(params: IGetUserById): Promise<IUser> {
    const user = await this.authService.getUserById(params);

    return instanceToPlain(user, { groups: [PlainGroupsEnum.PUBLIC], enableCircularCheck: true }) as IUser;
  }
}
