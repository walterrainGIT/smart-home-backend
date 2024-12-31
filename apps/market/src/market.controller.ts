import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PlainGroupsEnum } from '@smart-home/libs/common/enums';
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
import {TransformWithGroup} from "@smart-home/libs/common/decorators";

@Controller('User')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @GrpcMethod('MarketService', 'CreateProduct')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async createProduct(params: ICreateProduct): Promise<IProduct> {
    return this.marketService.createProduct(params);
  }

  @GrpcMethod('MarketService', 'CreateLot')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async createLot(params: ICreateLot): Promise<ILot> {
    return this.marketService.createLot(params);
  }

  @GrpcMethod('MarketService', 'GetProducts')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async getProducts(params: IGetProducts): Promise<IProductMetadataPagination> {
    return this.marketService.getProducts(params);
  }

  @GrpcMethod('MarketService', 'GetLots')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async getLots(params: IGetLots): Promise<ILotMetadataPagination> {
    return this.marketService.getLots(params);
  }
}
