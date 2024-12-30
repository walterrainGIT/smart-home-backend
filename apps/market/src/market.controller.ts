import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PlainGroupsEnum } from '@smart-home/libs/common/enums';
import { instanceToPlain } from 'class-transformer';
import {
  ICreateLot,
  ICreateProduct,
  IGetLots,
  IGetProducts,
  ILot, ILotMetadataPagination,
  IProduct,
  IProductMetadataPagination
} from "@smart-home/libs/types/market";
import {MarketService} from "market/market.service";

@Controller('User')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @GrpcMethod('MarketService', 'CreateProduct')
  async createProduct(params: ICreateProduct): Promise<IProduct> {
    const product = await this.marketService.createProduct(params);

    return instanceToPlain(product, { groups: [PlainGroupsEnum.PUBLIC], enableCircularCheck: true }) as IProduct;
  }

  @GrpcMethod('MarketService', 'CreateLot')
  async createLot(params: ICreateLot): Promise<ILot> {
    const lot = await this.marketService.createLot(params);

    return instanceToPlain(lot, { groups: [PlainGroupsEnum.PUBLIC], enableCircularCheck: true }) as ILot;
  }

  @GrpcMethod('MarketService', 'GetProducts')
  async getProducts(params: IGetProducts): Promise<IProductMetadataPagination> {
    const products = await this.marketService.getProducts(params);

    return instanceToPlain(products, { groups: [PlainGroupsEnum.PUBLIC], enableCircularCheck: true }) as IProductMetadataPagination;
  }

  @GrpcMethod('MarketService', 'GetLots')
  async getLots(params: IGetLots): Promise<ILotMetadataPagination> {
    const lots = await this.marketService.getLots(params);

    return instanceToPlain(lots, { groups: [PlainGroupsEnum.PUBLIC], enableCircularCheck: true }) as ILotMetadataPagination;
  }
}
