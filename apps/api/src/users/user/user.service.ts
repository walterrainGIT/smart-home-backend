import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { GrpcUserService } from "@smart-home/libs/grpc";
import { UserResponseDto } from "api/users/user/dto";
import { USER_BASE_SERVICE_NAME} from "@smart-home/libs/common/constants";
import { PinoLoggerService} from "@smart-home/libs/common/logger";
import {IGetUserById} from "@smart-home/libs/types/users/user";

@Injectable()
export class UserService {
    private userService: GrpcUserService;
    private readonly logger = new PinoLoggerService()

    constructor(
        @Inject(`${USER_BASE_SERVICE_NAME}_PACKAGE`) private userClient: ClientGrpc,
        ) {}

    onModuleInit() {
        this.userService = this.userClient.getService<GrpcUserService>('UserService');
    }

    async getUserById(params: IGetUserById): Promise<UserResponseDto> {
        return firstValueFrom(this.userService.getUserById(params));
    }
}
