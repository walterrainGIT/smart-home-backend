import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { GrpcUserService } from "@smart-home/libs/grpc";
import { RegisterUserRequestDto, LoginUserRequestDto, UserResponseDto } from "api/users/user/dto";
import { USER_BASE_SERVICE_NAME } from "@smart-home/libs/common/constants";
import {PinoLoggerService} from "@smart-home/libs/common/logger";

@Injectable()
export class UserService {
    private userService: GrpcUserService;
    private readonly logger = new PinoLoggerService()

    constructor(@Inject(`${USER_BASE_SERVICE_NAME}_PACKAGE`) private userClient: ClientGrpc) {}

    onModuleInit() {
        this.userService = this.userClient.getService<GrpcUserService>('UserService');
    }

    async registerUser(params: RegisterUserRequestDto): Promise<UserResponseDto> {
      return firstValueFrom(this.userService.registerUser(params));
    }

    async loginUser(params: LoginUserRequestDto): Promise<UserResponseDto> {
      return firstValueFrom(this.userService.loginUser(params));
    }
}
