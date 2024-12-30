import {NestFactory, Reflector} from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { UserModule } from './user.module';
import { GRPC_USER_PORT } from '@smart-home/libs/grpc';
import { USER_BASE_SERVICE_NAME } from '@smart-home/libs/common/constants/services';
import { MikroORM } from '@mikro-orm/core';
import {getServerConfig} from "@smart-home/libs/common/modules/configs";
import {GrpcErrorInterceptor} from "@smart-home/libs/common/logger";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, getServerConfig({
    serviceName: USER_BASE_SERVICE_NAME,
    port: GRPC_USER_PORT,
  }));
  app.useGlobalInterceptors(new GrpcErrorInterceptor());

  const orm = app.get(MikroORM);
  await orm.getMigrator().up();

  await app.listen();
}
bootstrap();
