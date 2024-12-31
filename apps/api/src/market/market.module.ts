import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';
import { ClientsModule } from '@nestjs/microservices';
import { getClientConfig } from '@smart-home/libs/common/modules';
import {MARKET_BASE_SERVICE_NAME, USER_BASE_SERVICE_NAME} from '@smart-home/libs/common/constants';
import {GRPC_MARKET_PORT, GRPC_USER_PORT} from '@smart-home/libs/grpc';

@Module({
  imports: [
    ClientsModule.register(getClientConfig({
      serviceName: MARKET_BASE_SERVICE_NAME,
      port: GRPC_MARKET_PORT,
    })),
  ],
  controllers: [MarketController],
  providers: [
    MarketService,
  ],
})
export class MarketModule {}
