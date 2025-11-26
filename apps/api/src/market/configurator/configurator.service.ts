import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MARKET_BASE_SERVICE_NAME } from "@smart-home/libs/common/constants";
import { GrpcMarketService } from "@smart-home/libs/grpc/services/grpc-market.service";

@Injectable()
export class ConfiguratorService {
  private marketService: GrpcMarketService;

  constructor(
    @Inject(`${MARKET_BASE_SERVICE_NAME}_PACKAGE`) private marketClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.marketService = this.marketClient.getService<GrpcMarketService>('MarketService');
  }

  async saveConfiguration(userId: number, rooms: any[], name?: string) {
    return firstValueFrom(this.marketService.saveConfiguration({ userId, rooms, name }));
  }

  async getConfigurations(userId: number) {
    return firstValueFrom(this.marketService.getConfigurations({ userId }));
  }

  async deleteConfiguration(id: number, userId: number) {
    return firstValueFrom(this.marketService.deleteConfiguration({ id, userId }));
  }
}

