import { Injectable, Inject } from '@nestjs/common';
import {ClientGrpc} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {MARKET_BASE_SERVICE_NAME} from "@smart-home/libs/common/constants";
import { PinoLoggerService} from "@smart-home/libs/common/logger";
import {GrpcMarketService} from "@smart-home/libs/grpc/services/grpc-market.service";
import {
    CreateOrderRequestDto,
    GetOrdersRequestDto,
    OrderMetadataPagination,
    OrderResponseDto, UpdateOrderRequestDto
} from "api/market/order/dto";

@Injectable()
export class OrderService {
    private marketService: GrpcMarketService;
    private readonly logger = new PinoLoggerService()

    constructor(
        @Inject(`${MARKET_BASE_SERVICE_NAME}_PACKAGE`) private marketClient: ClientGrpc,
        ) {}

    onModuleInit() {
        this.marketService = this.marketClient.getService<GrpcMarketService>('MarketService');
    }

    async getOrders(params: GetOrdersRequestDto): Promise<OrderMetadataPagination> {
        const { page } = params;
        const { size, number } = page;

        return firstValueFrom(this.marketService.getOrders({
            pagination: {
                limit: size,
                offset: (number - 1) * size,
            },
            ...params,
        }));
    }

    async createOrder(params: CreateOrderRequestDto): Promise<OrderResponseDto> {
        return firstValueFrom(this.marketService.createOrder(params));
    }

    async updateOrder(params: UpdateOrderRequestDto): Promise<OrderResponseDto> {
        return firstValueFrom(this.marketService.updateOrder(params));
    }
}
