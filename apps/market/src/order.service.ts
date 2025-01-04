import {Inject, Injectable} from '@nestjs/common';
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
import {ICancelOrder} from "@smart-home/libs/types/market/interfaces/cancel-order.interface";
import {GrpcUserService} from "@smart-home/libs/grpc";
import {USER_BASE_SERVICE_NAME} from "@smart-home/libs/common/constants";
import {ClientGrpc} from "@nestjs/microservices";
import {GetUserByIdRequestDto, UserResponseDto} from "api/users/user/dto";
import {firstValueFrom} from "rxjs";

@Injectable()
export class OrderService {
    private userService: GrpcUserService;

    constructor(
        private readonly em: EntityManager,
        private readonly marketService: MarketService,
        @Inject(`${USER_BASE_SERVICE_NAME}_PACKAGE`) private userClient: ClientGrpc,
    ) {}

    onModuleInit() {
        this.userService = this.userClient.getService<GrpcUserService>('UserService');
    }

    async getOrderById(params: IGetOrderById): Promise<IOrder> {
        return this.em.fork().getRepository(OrderEntity).getOrderById(params);
    }

    async getOrders(params: IGetOrders): Promise<IOrderMetadataPagination> {
        const orders = await this.em.fork().getRepository(OrderEntity).getOrders(params);

        const uniqueUserIds = [...new Set(orders.orders.map(order => order.userId))];

        const usersByIds = await firstValueFrom(this.userService.getUsersByIds({ ids: uniqueUserIds }));
        const userMap = new Map(usersByIds.users.map(user => [user.id, user]));

        orders.orders.forEach(order => {
            order.user = userMap.get(order.userId) || null;
        });

        return orders;
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

        await this.em.fork().persistAndFlush(order);
        return order;
    }

    async cancelOrder(params: ICancelOrder): Promise<IOrder> {
        return this.em.fork().getRepository(OrderEntity).cancelOrder(params);
    }
}
