import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { ClientsModule } from '@nestjs/microservices';
import { getClientConfig } from '@smart-home/libs/common/modules';
import {
  PORTFOLIO_BASE_SERVICE_NAME,
} from '@smart-home/libs/common/constants';
import { GRPC_PORTFOLIO_PORT} from '@smart-home/libs/grpc';

@Module({
  imports: [
    ClientsModule.register(getClientConfig({
      serviceName: PORTFOLIO_BASE_SERVICE_NAME,
      port: GRPC_PORTFOLIO_PORT,
    })),
  ],
  controllers: [PortfolioController],
  providers: [
    PortfolioService,
  ],
})
export class PortfolioModule {}
