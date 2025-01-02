import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { GrpcUserService } from "@smart-home/libs/grpc";
import {GetUserByIdRequestDto, UpdateUserRequestDto, UserResponseDto} from "api/users/user/dto";
import { USER_BASE_SERVICE_NAME} from "@smart-home/libs/common/constants";
import { PinoLoggerService} from "@smart-home/libs/common/logger";
import {IGetUserById, IUpdateUser, IUser} from "@smart-home/libs/types/users/user";

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

    async getUserById(params: GetUserByIdRequestDto): Promise<UserResponseDto> {
        return firstValueFrom(this.userService.getUserById(params));
    }

    async updateUser(userId: number, params: UpdateUserRequestDto): Promise<UserResponseDto> {
        return firstValueFrom(this.userService.updateUser({ userId, ...params }));
    }
}
