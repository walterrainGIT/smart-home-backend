import {SqlEntityRepository,} from '@mikro-orm/postgresql';
import {OrderEntity} from "market/entities";
import {IGetOrderById, IOrder, IOrderMetadataPagination, OrderStatusEnum,} from "@smart-home/libs/types/market";
import {IGetOrders} from "@smart-home/libs/types/market/interfaces/get-orders.interface";
import {RpcException} from "@nestjs/microservices";
import {SortDirectionEnum} from "@smart-home/libs/common/enums";
import {ICancelOrder} from "@smart-home/libs/types/market/interfaces/cancel-order.interface";

export class OrderRepository extends SqlEntityRepository<OrderEntity> {
  async getOrderById(params: IGetOrderById): Promise<IOrder> {
    const { id } = params;

    const order = await this.em.getRepository(OrderEntity).findOne({ id });

    if(!order) {
      throw new RpcException('ERRORS.MARKET.ORDER_NOT_FOUND');
    }

    return order;
  }

  async getOrders(params: IGetOrders): Promise<IOrderMetadataPagination> {
    const { ids, usersIds, statuses, lotsIds, pagination } = params;
    const { limit, offset } = pagination;

    const qb = this.em.createQueryBuilder(OrderEntity)
        .innerJoinAndSelect('lot', 'lot')
        .orderBy({ createdAt: SortDirectionEnum.DESC })
        .limit(limit, offset);

    if(ids) qb.andWhere({
      id: {
        $in: ids,
      },
    })
    if(usersIds) qb.andWhere({
      userId: {
        $in: usersIds,
      },
    })
    if(statuses) qb.andWhere({
      status: {
        $in: statuses,
      },
    })
    if(lotsIds) qb.andWhere({
      lot: {
        id:  {
          $in: lotsIds,
        },
      },
    })

    const [orders, total] = await qb.getResultAndCount();

    return {
      orders,
      metadata: {
        total,
        limit,
        offset,
      }
    }
  }

  async cancelOrder(params: ICancelOrder): Promise<IOrder> {
    const { id, userId } = params;

    const order = await this.getOrderById({ id });

    if(order.userId !== userId) {
      throw new RpcException('ERRORS.MARKET.CANNOT_CANCELED_ORDER');
    }

    order.status = OrderStatusEnum.CANCELED;

    await this.em.persistAndFlush(order);
    return order;
  }
}
