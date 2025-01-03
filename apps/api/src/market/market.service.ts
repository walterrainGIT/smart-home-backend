import { Injectable, Inject } from '@nestjs/common';
import {ClientGrpc, GrpcMethod} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {MARKET_BASE_SERVICE_NAME} from "@smart-home/libs/common/constants";
import { PinoLoggerService} from "@smart-home/libs/common/logger";
import {GrpcMarketService} from "@smart-home/libs/grpc/services/grpc-market.service";
import {
    CreateProductRequestDto,
    ProductMetadataPaginationResponseDto,
    ProductResponseDto,
    CreateLotRequestDto,
    LotMetadataPaginationResponseDto,
    LotResponseDto,
    GetProductsRequestDto,
    GetLotsRequestDto,
    DeleteLotRequestDto, UpdateLotRequestDto, DeleteProductRequestDto, UpdateProductRequestDto
} from "api/market/dto";
import {TransformWithGroup} from "@smart-home/libs/common/decorators";
import {PlainGroupsEnum} from "@smart-home/libs/common/enums";
import {IDeleteLot, IDeleteProduct, ILot, IProduct, IUpdateLot, IUpdateProduct} from "@smart-home/libs/types/market";

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

    async deleteLot(params: DeleteLotRequestDto): Promise<LotResponseDto> {
        return firstValueFrom(this.marketService.deleteLot(params));
    }

    async updateLot(params: UpdateLotRequestDto): Promise<LotResponseDto> {
        return firstValueFrom(this.marketService.updateLot(params));
    }

    async deleteProduct(params: DeleteProductRequestDto): Promise<ProductResponseDto> {
        return firstValueFrom(this.marketService.deleteProduct(params));
    }

    async updateProduct(params: UpdateProductRequestDto): Promise<ProductResponseDto> {
        return firstValueFrom(this.marketService.updateProduct(params));
    }
}
