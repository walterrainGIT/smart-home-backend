import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { ClientsModule, } from '@nestjs/microservices';
import { GRPC_PORTFOLIO_PORT} from '@smart-home/libs/grpc';
import {
  PORTFOLIO_BASE_SERVICE_NAME,
} from '@smart-home/libs/common/constants';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {getClientConfig} from "@smart-home/libs/common/modules/configs";
import {PortfolioService} from "./services/portfolio.service";
import {mikroOrmConfig, entities} from "./configs/mikro-orm.config";
import {CustomerService} from "./services/customer.service";

@Module({
  imports: [
    ClientsModule.register(getClientConfig({
      serviceName: PORTFOLIO_BASE_SERVICE_NAME,
      port: GRPC_PORTFOLIO_PORT,
    })),
    MikroOrmModule.forRoot(mikroOrmConfig),
    MikroOrmModule.forFeature({ entities }),
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService, CustomerService],
})
export class PortfolioModule {}
