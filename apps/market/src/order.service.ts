import {Injectable} from '@nestjs/common';
import {EntityManager} from '@mikro-orm/core';
import {
    ICreateOrder,
    IGetOrderById,
    IOrder,
    IOrderMetadataPagination,
    IUpdateOrder,
    OrderStatusEnum,
} from "@smart-home/libs/types/market";
import {OrderEntity} from "market/entities";
import {MarketService} from "market/market.service";
import {IGetOrders} from "@smart-home/libs/types/market/interfaces/get-orders.interface";

@Injectable()
export class OrderService {
    constructor(
        private readonly em: EntityManager,
        private readonly marketService: MarketService,
    ) {}

    async getOrderById(params: IGetOrderById): Promise<IOrder> {
        return this.em.fork().getRepository(OrderEntity).getOrderById(params);
    }

    async getOrders(params: IGetOrders): Promise<IOrderMetadataPagination> {
        return this.em.fork().getRepository(OrderEntity).getOrders(params);
    }

    async createOrder(params: ICreateOrder): Promise<IOrder> {
        const { userId, lotId } = params;

        const order = new OrderEntity();
        order.userId = userId;
        order.lot = await this.marketService.getLotById({ id: lotId });
        order.status = OrderStatusEnum.CREATED;

        await this.em.fork().persistAndFlush(order);
        return order;
    }

    async updateOrder(params: IUpdateOrder): Promise<IOrder> {
        const { id, userId, lotId, status } = params;

        const order = await this.getOrderById({ id });
        if(userId) order.userId = userId;
        if(lotId) order.lot = await this.marketService.getLotById({ id: lotId });
        if(status) order.status = status;

        await this.em.persistAndFlush(order);
        return order;
    }
}
