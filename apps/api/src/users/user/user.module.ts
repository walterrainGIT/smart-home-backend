import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule } from '@nestjs/microservices';
import { getClientConfig } from '@smart-home/libs/common/modules';
import {JWT_SECRET_KEY, JWT_TTL, USER_BASE_SERVICE_NAME} from '@smart-home/libs/common/constants';
import { GRPC_USER_PORT } from '@smart-home/libs/grpc';
import {JwtModule, JwtService} from "@nestjs/jwt";
import {AuthController} from "api/users/user/auth/auth.controller";
import {AuthService} from "api/users/user/auth/auth.service";

@Module({
  imports: [
    ClientsModule.register(getClientConfig({
      serviceName: USER_BASE_SERVICE_NAME,
      port: GRPC_USER_PORT,
    })),
  ],
  controllers: [UserController, AuthController],
  providers: [
    UserService,
      AuthService,
    JwtService,
  ],
})
export class UserModule {}
