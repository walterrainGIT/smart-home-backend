import {NestFactory,} from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { PortfolioModule } from './portfolio.module';
import { GRPC_PORTFOLIO_PORT,} from '@smart-home/libs/grpc';
import { PORTFOLIO_BASE_SERVICE_NAME,} from '@smart-home/libs/common/constants/services';
import { MikroORM } from '@mikro-orm/core';
import {getServerConfig} from "@smart-home/libs/common/modules/configs";
import {GrpcErrorInterceptor} from "@smart-home/libs/common/logger";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PortfolioModule, getServerConfig({
    serviceName: PORTFOLIO_BASE_SERVICE_NAME,
    port: GRPC_PORTFOLIO_PORT,
  }));
  app.useGlobalInterceptors(new GrpcErrorInterceptor());

  const orm = app.get(MikroORM);
  await orm.getMigrator().up();

  await app.listen();
}
bootstrap();
