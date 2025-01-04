import {Controller} from '@nestjs/common';
import {AuthService} from './auth.service';
import {GrpcMethod} from '@nestjs/microservices';
import {
  IGetUserById,
  IGetUsersByIds,
  ILoginUser,
  IRegisterUser,
  IUpdateUser,
  IUser
} from '@smart-home/libs/types/users/user';
import {PlainGroupsEnum} from '@smart-home/libs/common/enums';
import {UserService} from "user/user.service";
import {TransformWithGroup} from "@smart-home/libs/common/decorators";

@Controller('User')
export class UserController {
  constructor(private readonly authService: AuthService,
              private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'RegisterUser')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async registerUser(params: IRegisterUser): Promise<IUser> {
    return this.authService.registerUser(params);
  }

  @GrpcMethod('UserService', 'LoginUser')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async loginUser(params: ILoginUser): Promise<IUser> {
    return this.authService.loginUser(params);
  }

  @GrpcMethod('UserService', 'GetUserById')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC, PlainGroupsEnum.ADMIN])
  async getUserById(params: IGetUserById): Promise<IUser> {
    return this.userService.getUserById(params);
  }

  @GrpcMethod('UserService', 'UpdateUser')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC, PlainGroupsEnum.ADMIN])
  async updateUser(params: IUpdateUser): Promise<IUser> {
    return this.userService.updateUser(params);
  }

  @GrpcMethod('UserService', 'GetUsersByIds')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC, PlainGroupsEnum.ADMIN])
  async getUsersByIds(params: IGetUsersByIds): Promise<IUser[]> {
    return this.userService.getUsersByIds(params);
  }
}
