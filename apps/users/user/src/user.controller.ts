import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { ILoginUser, IRegisterUser, IUser } from '@smart-home/libs/types/users/user';
import { PlainGroupsEnum } from '@smart-home/libs/common/enums';
import { instanceToPlain } from 'class-transformer';

@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'RegisterUser')
  async registerUser(params: IRegisterUser): Promise<IUser> {
    const user = await this.userService.registerUser(params);

    return instanceToPlain(user, { groups: [PlainGroupsEnum.PUBLIC], enableCircularCheck: true }) as IUser;
  }

  @GrpcMethod('UserService', 'LoginUser')
  async loginUser(params: ILoginUser): Promise<IUser> {
    const user = await this.userService.loginUser(params);

    return instanceToPlain(user, { groups: [PlainGroupsEnum.PUBLIC], enableCircularCheck: true }) as IUser;
  }
}
