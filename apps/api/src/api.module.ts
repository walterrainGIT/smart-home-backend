import {MiddlewareConsumer, Module} from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ClientsModule } from '@nestjs/microservices';
import { GRPC_USER_PORT } from '@smart-home/libs/grpc';
import { UserModule } from 'api/users/user/user.module';
import { USER_BASE_SERVICE_NAME } from '@smart-home/libs/common/constants';
import { getClientConfig } from '@smart-home/libs/common/modules';
import { PinoLoggerService } from '@smart-home/libs/common/logger';
import {GrpcErrorInterceptor} from "@smart-home/libs/common/logger/grpc-error-interceptor";

@Module({
  imports: [
    ClientsModule.register(getClientConfig({
      serviceName: USER_BASE_SERVICE_NAME,
      port: GRPC_USER_PORT,
    })),
    UserModule,
  ],
  controllers: [ApiController],
  providers: [
    PinoLoggerService,
    ApiService,
  ],
})
export class ApiModule {}
