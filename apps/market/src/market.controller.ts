import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PlainGroupsEnum } from '@smart-home/libs/common/enums';
import {
  ICreateLot,
  ICreateProduct, IDeleteLot, IDeleteProduct,
  IGetLots,
  IGetProducts,
  ILot, ILotMetadataPagination,
  IProduct,
  IProductMetadataPagination, IUpdateLot, IUpdateProduct
} from "@smart-home/libs/types/market";
import {MarketService} from "market/market.service";
import {TransformWithGroup} from "@smart-home/libs/common/decorators";
import {LotEntity, ProductEntity} from "market/entities";
import {classToPlain} from "class-transformer";

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

  @GrpcMethod('MarketService', 'DeleteLot')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async deleteLot(params: IDeleteLot): Promise<ILot> {
    return this.marketService.deleteLot(params);
  }

  @GrpcMethod('MarketService', 'UpdateLot')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async updateLot(params: IUpdateLot): Promise<ILot> {
    return this.marketService.updateLot(params);
  }

  @GrpcMethod('MarketService', 'DeleteProduct')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async deleteProduct(params: IDeleteProduct): Promise<IProduct> {
    return this.marketService.deleteProduct(params);
  }

  @GrpcMethod('MarketService', 'UpdateProduct')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async updateProduct(params: IUpdateProduct): Promise<IProduct> {
    return this.marketService.updateProduct(params);
  }
}
