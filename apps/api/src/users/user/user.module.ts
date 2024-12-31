import {Global, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule } from '@nestjs/microservices';
import { getClientConfig } from '@smart-home/libs/common/modules';
import { USER_BASE_SERVICE_NAME} from '@smart-home/libs/common/constants';
import { GRPC_USER_PORT } from '@smart-home/libs/grpc';
import { JwtService} from "@nestjs/jwt";
import {AuthController} from "api/users/user/auth/auth.controller";
import {AuthService} from "api/users/user/auth/auth.service";

@Global()
@Module({
  imports: [
    ClientsModule.register(getClientConfig({
      serviceName: USER_BASE_SERVICE_NAME,
      port: GRPC_USER_PORT,
    })),
  ],
  exports: [UserService],
  controllers: [UserController, AuthController],
  providers: [
    UserService,
    AuthService,
    JwtService,
  ],
})
export class UserModule {}
