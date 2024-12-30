import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import {IGetUserById, ILoginUser, IRegisterUser, IUser} from '@smart-home/libs/types/users/user';
import { PlainGroupsEnum } from '@smart-home/libs/common/enums';
import { instanceToPlain } from 'class-transformer';

@Controller('User')
export class MarketController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('MarketService', 'RegisterUser')
  async registerUser(params: IRegisterUser): Promise<IUser> {
    const user = await this.authService.registerUser(params);

    return instanceToPlain(user, { groups: [PlainGroupsEnum.PUBLIC], enableCircularCheck: true }) as IUser;
  }
}
