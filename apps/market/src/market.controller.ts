import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PlainGroupsEnum } from '@smart-home/libs/common/enums';
import {
  ICreateLot, ICreateOrder,
  ICreateProduct, IDeleteLot, IDeleteProduct,
  IGetLots, IGetOrderById,
  IGetProducts,
  ILot, ILotMetadataPagination, IOrder, IOrderMetadataPagination,
  IProduct,
  IProductMetadataPagination, IUpdateLot, IUpdateOrder, IUpdateProduct
} from "@smart-home/libs/types/market";
import {MarketService} from "market/market.service";
import {TransformWithGroup} from "@smart-home/libs/common/decorators";
import {IGetOrders} from "@smart-home/libs/types/market/interfaces/get-orders.interface";
import {OrderService} from "market/order.service";
import {ICancelOrder} from "@smart-home/libs/types/market/interfaces/cancel-order.interface";

@Controller('User')
export class MarketController {
  constructor(
      private readonly marketService: MarketService,
      private readonly orderService: OrderService
  ) {}

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

  @GrpcMethod('MarketService', 'GetOrders')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async getOrders(params: IGetOrders): Promise<IOrderMetadataPagination> {
    return this.orderService.getOrders(params);
  }

  @GrpcMethod('MarketService', 'CreateOrder')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async createOrder(params: ICreateOrder): Promise<IOrder> {
    return this.orderService.createOrder(params);
  }

  @GrpcMethod('MarketService', 'UpdateOrder')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async updateOrder(params: IUpdateOrder): Promise<IOrder> {
    return this.orderService.updateOrder(params);
  }

  @GrpcMethod('MarketService', 'CancelOrder')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async cancelOrder(params: ICancelOrder): Promise<IOrder> {
    return this.orderService.cancelOrder(params);
  }
}
