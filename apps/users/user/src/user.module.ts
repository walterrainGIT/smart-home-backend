import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthService } from './auth.service';
import { ClientsModule, } from '@nestjs/microservices';
import { GRPC_USER_PORT } from '@smart-home/libs/grpc';
import {USER_BASE_SERVICE_NAME} from '@smart-home/libs/common/constants';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { mikroOrmConfig, entities } from 'user/configs/mikro-orm.config';
import {getClientConfig} from "@smart-home/libs/common/modules/configs";
import {UserService} from "user/user.service";

@Module({
  imports: [
    ClientsModule.register(getClientConfig({
      serviceName: USER_BASE_SERVICE_NAME,
      port: GRPC_USER_PORT,
    })),
    MikroOrmModule.forRoot(mikroOrmConfig),
    MikroOrmModule.forFeature({ entities }),
  ],
  controllers: [UserController],
  providers: [
      AuthService,
    UserService,
  ],
})
export class UserModule {}
