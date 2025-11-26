import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MARKET_BASE_SERVICE_NAME } from "@smart-home/libs/common/constants";
import { GrpcMarketService } from "@smart-home/libs/grpc/services/grpc-market.service";

@Injectable()
export class AnalyticsService {
  private marketService: GrpcMarketService;

  constructor(
    @Inject(`${MARKET_BASE_SERVICE_NAME}_PACKAGE`) private marketClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.marketService = this.marketClient.getService<GrpcMarketService>('MarketService');
  }

  async getOrdersSummary(dateFrom?: string, dateTo?: string) {
    return firstValueFrom(this.marketService.getOrdersSummary({ dateFrom, dateTo }));
  }

  async getOrdersByPeriod(dateFrom: string, dateTo: string, period?: 'day' | 'week' | 'month') {
    return firstValueFrom(this.marketService.getOrdersByPeriod({ dateFrom, dateTo, period }));
  }

  async getPopularLots(limit?: number, dateFrom?: string, dateTo?: string) {
    return firstValueFrom(this.marketService.getPopularLots({ limit, dateFrom, dateTo }));
  }

  async getTopCustomers(limit?: number, dateFrom?: string, dateTo?: string) {
    return firstValueFrom(this.marketService.getTopCustomers({ limit, dateFrom, dateTo }));
  }
}

