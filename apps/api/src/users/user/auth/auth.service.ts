import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { GrpcUserService } from "@smart-home/libs/grpc";
import { RegisterUserRequestDto, LoginUserRequestDto, UserResponseDto } from "api/users/user/dto";
import {JWT_SECRET_KEY, JWT_TTL, USER_BASE_SERVICE_NAME} from "@smart-home/libs/common/constants";
import { PinoLoggerService} from "@smart-home/libs/common/logger";
import {IGetUserById} from "@smart-home/libs/types/users/user";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    private userService: GrpcUserService;
    private readonly logger = new PinoLoggerService()

    constructor(
        @Inject(`${USER_BASE_SERVICE_NAME}_PACKAGE`) private userClient: ClientGrpc,
        private readonly jwtService: JwtService,
        ) {}

    onModuleInit() {
        this.userService = this.userClient.getService<GrpcUserService>('UserService');
    }

    async registerUser(params: RegisterUserRequestDto): Promise<UserResponseDto> {
      return firstValueFrom(this.userService.registerUser(params));
    }

    async generateToken(params: UserResponseDto) {
      const { id, username, email } = params;

      return this.jwtService.sign({ id, username, email }, {
          secret: JWT_SECRET_KEY,
          expiresIn: JWT_TTL,
      });
    }

    async loginUser(params: LoginUserRequestDto): Promise<UserResponseDto> {
      return firstValueFrom(this.userService.loginUser(params));
    }
}
