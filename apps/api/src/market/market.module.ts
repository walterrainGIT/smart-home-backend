import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';
import { ClientsModule } from '@nestjs/microservices';
import { getClientConfig } from '@smart-home/libs/common/modules';
import {
  MARKET_BASE_SERVICE_NAME,
} from '@smart-home/libs/common/constants';
import { GRPC_MARKET_PORT } from '@smart-home/libs/grpc';
import { OrderController } from 'api/market/order/order.controller';
import { OrderService } from 'api/market/order/order.service';
import { AnalyticsController } from 'api/market/analytics/analytics.controller';
import { AnalyticsService } from 'api/market/analytics/analytics.service';
import { ConfiguratorController } from 'api/market/configurator/configurator.controller';
import { ConfiguratorService } from 'api/market/configurator/configurator.service';

@Module({
  imports: [
    ClientsModule.register(
      getClientConfig({
        serviceName: MARKET_BASE_SERVICE_NAME,
        port: GRPC_MARKET_PORT,
      })
    ),
  ],
  controllers: [
    MarketController,
    OrderController,
    AnalyticsController,
    ConfiguratorController,
  ],
  providers: [
    MarketService,
    OrderService,
    AnalyticsService,
    ConfiguratorService,
  ],
})
export class MarketModule {}
