import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { ClientsModule, } from '@nestjs/microservices';
import {GRPC_MARKET_PORT, GRPC_USER_PORT} from '@smart-home/libs/grpc';
import {MARKET_BASE_SERVICE_NAME, USER_BASE_SERVICE_NAME} from '@smart-home/libs/common/constants';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {getClientConfig} from "@smart-home/libs/common/modules/configs";
import {MarketService} from "./market.service";
import {mikroOrmConfig, entities} from "./configs/mikro-orm.config";
import {OrderService} from "market/order.service";

@Module({
  imports: [
    ClientsModule.register(getClientConfig({
      serviceName: MARKET_BASE_SERVICE_NAME,
      port: GRPC_MARKET_PORT,
    })),
    MikroOrmModule.forRoot(mikroOrmConfig),
    MikroOrmModule.forFeature({ entities }),
  ],
  controllers: [MarketController],
  providers: [MarketService, OrderService],
})
export class MarketModule {}
