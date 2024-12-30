import { Module} from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ClientsModule } from '@nestjs/microservices';
import {GRPC_MARKET_PORT, GRPC_USER_PORT} from '@smart-home/libs/grpc';
import { UserModule } from 'api/users/user/user.module';
import {
  JWT_SECRET_KEY,
  JWT_TTL,
  MARKET_BASE_SERVICE_NAME,
  USER_BASE_SERVICE_NAME
} from '@smart-home/libs/common/constants';
import { getClientConfig } from '@smart-home/libs/common/modules';
import { PinoLoggerService} from '@smart-home/libs/common/logger';
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "api/users/user/auth/jwt-strategy";

@Module({
  imports: [
    ClientsModule.register(getClientConfig({
      serviceName: USER_BASE_SERVICE_NAME,
      port: GRPC_USER_PORT,
    })),
    ClientsModule.register(getClientConfig({
      serviceName: MARKET_BASE_SERVICE_NAME,
      port: GRPC_MARKET_PORT,
    })),
    UserModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: JWT_TTL },
    }),
  ],
  controllers: [ApiController],
  providers: [
    PinoLoggerService,
    ApiService,
    JwtStrategy,
  ],
})
export class ApiModule {}
