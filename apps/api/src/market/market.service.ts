import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {MARKET_BASE_SERVICE_NAME} from "@smart-home/libs/common/constants";
import { PinoLoggerService} from "@smart-home/libs/common/logger";
import {GrpcMarketService} from "@smart-home/libs/grpc/services/grpc-market.service";
import {CreateProductRequestDto, ProductMetadataPaginationResponseDto, ProductResponseDto, CreateLotRequestDto, LotMetadataPaginationResponseDto, LotResponseDto, GetProductsRequestDto, GetLotsRequestDto} from "api/market/dto";

@Injectable()
export class MarketService {
    private marketService: GrpcMarketService;
    private readonly logger = new PinoLoggerService()

    constructor(
        @Inject(`${MARKET_BASE_SERVICE_NAME}_PACKAGE`) private marketClient: ClientGrpc,
        ) {}

    onModuleInit() {
        this.marketService = this.marketClient.getService<GrpcMarketService>('MarketService');
    }

    async createProduct(params: CreateProductRequestDto): Promise<ProductResponseDto> {
        return firstValueFrom(this.marketService.createProduct(params));
    }

    async createLot(params: CreateLotRequestDto): Promise<LotResponseDto> {
        return firstValueFrom(this.marketService.createLot(params));
    }

    async getProducts(params: GetProductsRequestDto): Promise<ProductMetadataPaginationResponseDto> {
        const { page } = params;
        const { size, number } = page;

        return firstValueFrom(this.marketService.getProducts({
            pagination: {
                limit: size,
                offset: (number - 1) * size,
            },
            ...params,
        }));
    }

    async getLots(params: GetLotsRequestDto): Promise<LotMetadataPaginationResponseDto> {
        const { page } = params;
        const { size, number } = page;

        return firstValueFrom(this.marketService.getLots({
            pagination: {
                limit: size,
                offset: (number - 1) * size,
            },
            ...params,
        }));
    }
}
