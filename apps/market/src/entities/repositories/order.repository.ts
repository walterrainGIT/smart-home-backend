import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { OrderEntity } from 'market/entities';
import {
  IGetOrderById,
  IOrder,
  IOrderMetadataPagination,
  OrderStatusEnum,
} from '@smart-home/libs/types/market';
import { IGetOrders } from '@smart-home/libs/types/market/interfaces/get-orders.interface';
import { RpcException } from '@nestjs/microservices';
import { SortDirectionEnum } from '@smart-home/libs/common/enums';
import { ICancelOrder } from '@smart-home/libs/types/market/interfaces/cancel-order.interface';

export class OrderRepository extends SqlEntityRepository<OrderEntity> {
  async getOrderById(params: IGetOrderById): Promise<IOrder> {
    const { id } = params;

    const order = await this.em.getRepository(OrderEntity).findOne({ id });

    if (!order) {
      throw new RpcException('ERRORS.MARKET.ORDER_NOT_FOUND');
    }

    return order;
  }

  async getOrders(params: IGetOrders): Promise<IOrderMetadataPagination> {
    const { ids, usersIds, statuses, lotsIds, pagination } = params;
    const { limit, offset } = pagination;

    const qb = this.em
      .createQueryBuilder(OrderEntity)
      .innerJoinAndSelect('lot', 'lot')
      .orderBy({ createdAt: SortDirectionEnum.DESC })
      .limit(limit, offset);

    if (ids)
      qb.andWhere({
        id: {
          $in: ids,
        },
      });
    if (usersIds)
      qb.andWhere({
        userId: {
          $in: usersIds,
        },
      });
    if (statuses)
      qb.andWhere({
        status: {
          $in: statuses,
        },
      });
    if (lotsIds)
      qb.andWhere({
        lot: {
          id: {
            $in: lotsIds,
          },
        },
      });

    const [orders, total] = await qb.getResultAndCount();

    return {
      orders,
      metadata: {
        total,
        limit,
        offset,
      },
    };
  }

  async cancelOrder(params: ICancelOrder): Promise<IOrder> {
    const { id, userId } = params;

    const order = await this.getOrderById({ id });

    if (order.userId !== userId) {
      throw new RpcException('ERRORS.MARKET.CANNOT_CANCELED_ORDER');
    }

    order.status = OrderStatusEnum.CANCELED;

    await this.em.persistAndFlush(order);
    return order;
  }

  async getOrdersSummary(dateFrom?: Date, dateTo?: Date): Promise<any> {
    let paramIndex = 1;
    let whereClause = '';
    const summaryParams: any[] = [
      OrderStatusEnum.CREATED,
      OrderStatusEnum.PROGRESS,
      OrderStatusEnum.COMPLETED,
      OrderStatusEnum.CANCELED,
    ];

    if (dateFrom) {
      whereClause += ` AND o.created_at >= $${paramIndex + 4}`;
      summaryParams.push(dateFrom);
      paramIndex++;
    }
    if (dateTo) {
      whereClause += ` AND o.created_at <= $${paramIndex + 4}`;
      summaryParams.push(dateTo);
    }

    const summaryQuery = `
      SELECT 
        COUNT(*) as "totalOrders",
        SUM(CASE WHEN o.status = $1 THEN 1 ELSE 0 END) as "createdCount",
        SUM(CASE WHEN o.status = $2 THEN 1 ELSE 0 END) as "progressCount",
        SUM(CASE WHEN o.status = $3 THEN 1 ELSE 0 END) as "completedCount",
        SUM(CASE WHEN o.status = $4 THEN 1 ELSE 0 END) as "canceledCount"
      FROM market.orders o
      WHERE 1=1 ${whereClause}
    `;

    const summary = await this.em
      .getConnection()
      .execute(summaryQuery, summaryParams);

    // Получаем общий доход (сумма цен завершенных заказов)
    let revenueParamIndex = 1;
    let revenueWhereClause = '';
    const revenueParams: any[] = [OrderStatusEnum.COMPLETED];

    if (dateFrom) {
      revenueWhereClause += ` AND o.created_at >= $${revenueParamIndex + 1}`;
      revenueParams.push(dateFrom);
      revenueParamIndex++;
    }
    if (dateTo) {
      revenueWhereClause += ` AND o.created_at <= $${revenueParamIndex + 1}`;
      revenueParams.push(dateTo);
    }

    const revenueQuery = `
      SELECT COALESCE(SUM(l.price), 0) as "totalRevenue"
      FROM market.orders o
      LEFT JOIN market.lots l ON o.lot_id = l.id
      WHERE o.status = $1 ${revenueWhereClause}
    `;
    const revenue = await this.em
      .getConnection()
      .execute(revenueQuery, revenueParams);

    // Средний чек
    const avgOrderQuery = `
      SELECT COALESCE(AVG(l.price), 0) as "averageOrderValue"
      FROM market.orders o
      LEFT JOIN market.lots l ON o.lot_id = l.id
      WHERE o.status = $1 ${revenueWhereClause}
    `;
    const avgOrder = await this.em
      .getConnection()
      .execute(avgOrderQuery, revenueParams);

    return {
      totalOrders: parseInt(summary[0]?.totalOrders) || 0,
      ordersByStatus: {
        created: parseInt(summary[0]?.createdCount) || 0,
        progress: parseInt(summary[0]?.progressCount) || 0,
        completed: parseInt(summary[0]?.completedCount) || 0,
        canceled: parseInt(summary[0]?.canceledCount) || 0,
      },
      totalRevenue: parseFloat(revenue[0]?.totalRevenue) || 0,
      averageOrderValue: parseFloat(avgOrder[0]?.averageOrderValue) || 0,
    };
  }

  async getOrdersByPeriod(
    dateFrom: Date,
    dateTo: Date,
    period: 'day' | 'week' | 'month' = 'day'
  ): Promise<any[]> {
    let dateFormat: string;
    switch (period) {
      case 'day':
        dateFormat = "TO_CHAR(o.created_at, 'YYYY-MM-DD')";
        break;
      case 'week':
        dateFormat = "TO_CHAR(DATE_TRUNC('week', o.created_at), 'YYYY-MM-DD')";
        break;
      case 'month':
        dateFormat = "TO_CHAR(o.created_at, 'YYYY-MM')";
        break;
      default:
        dateFormat = "TO_CHAR(o.created_at, 'YYYY-MM-DD')";
    }

    const query = `
      SELECT 
        ${dateFormat} as period,
        COUNT(*) as count,
        COALESCE(SUM(CASE WHEN o.status = $1 THEN l.price ELSE 0 END), 0) as revenue
      FROM market.orders o
      LEFT JOIN market.lots l ON o.lot_id = l.id
      WHERE o.created_at >= $2 AND o.created_at <= $3
      GROUP BY period
      ORDER BY period ASC
    `;

    const results = await this.em
      .getConnection()
      .execute(query, [OrderStatusEnum.COMPLETED, dateFrom, dateTo]);

    return results.map((r: any) => ({
      period: r.period,
      count: parseInt(r.count) || 0,
      revenue: parseFloat(r.revenue) || 0,
    }));
  }

  async getPopularLots(
    limit: number = 10,
    dateFrom?: Date,
    dateTo?: Date
  ): Promise<any[]> {
    let paramIndex = 1;
    let whereClause = '';
    const params: any[] = [OrderStatusEnum.COMPLETED];

    if (dateFrom) {
      whereClause += ` AND o.created_at >= $${paramIndex + 1}`;
      params.push(dateFrom);
      paramIndex++;
    }
    if (dateTo) {
      whereClause += ` AND o.created_at <= $${paramIndex + 1}`;
      params.push(dateTo);
      paramIndex++;
    }

    const query = `
      SELECT 
        l.id as "lotId",
        l.name as "lotName",
        COUNT(*) as "orderCount",
        COALESCE(SUM(CASE WHEN o.status = $1 THEN l.price ELSE 0 END), 0) as revenue
      FROM market.orders o
      LEFT JOIN market.lots l ON o.lot_id = l.id
      WHERE 1=1 ${whereClause}
      GROUP BY l.id, l.name
      ORDER BY "orderCount" DESC
      LIMIT $${paramIndex + 1}
    `;

    params.push(limit);
    const results = await this.em.getConnection().execute(query, params);

    // Получаем общее количество заказов для расчета конверсии
    let totalParamIndex = 1;
    let totalWhereClause = '';
    const totalParams: any[] = [];

    if (dateFrom) {
      totalWhereClause += ` AND o.created_at >= $${totalParamIndex}`;
      totalParams.push(dateFrom);
      totalParamIndex++;
    }
    if (dateTo) {
      totalWhereClause += ` AND o.created_at <= $${totalParamIndex}`;
      totalParams.push(dateTo);
    }

    const totalQuery = `SELECT COUNT(*) as total FROM market.orders o WHERE 1=1 ${totalWhereClause}`;
    const totalResult = await this.em
      .getConnection()
      .execute(totalQuery, totalParams);
    const totalOrders = parseInt(totalResult[0]?.total) || 1;

    return results.map((r: any) => ({
      lotId: parseInt(r.lotId),
      lotName: r.lotName,
      orderCount: parseInt(r.orderCount) || 0,
      revenue: parseFloat(r.revenue) || 0,
      conversionRate: (parseInt(r.orderCount) || 0) / totalOrders,
    }));
  }

  async getTopCustomers(
    limit: number = 10,
    dateFrom?: Date,
    dateTo?: Date
  ): Promise<any[]> {
    let paramIndex = 1;
    let whereClause = 'o.status = $1';
    const params: any[] = [OrderStatusEnum.COMPLETED];

    if (dateFrom) {
      whereClause += ` AND o.created_at >= $${paramIndex + 1}`;
      params.push(dateFrom);
      paramIndex++;
    }
    if (dateTo) {
      whereClause += ` AND o.created_at <= $${paramIndex + 1}`;
      params.push(dateTo);
      paramIndex++;
    }

    const query = `
      SELECT 
        o.user_id as "userId",
        COUNT(*) as "orderCount",
        COALESCE(SUM(l.price), 0) as "totalSpent"
      FROM market.orders o
      LEFT JOIN market.lots l ON o.lot_id = l.id
      WHERE ${whereClause}
      GROUP BY o.user_id
      ORDER BY "totalSpent" DESC
      LIMIT $${paramIndex + 1}
    `;

    params.push(limit);
    const results = await this.em.getConnection().execute(query, params);

    return results.map((r: any) => ({
      userId: parseInt(r.userId),
      orderCount: parseInt(r.orderCount) || 0,
      totalSpent: parseFloat(r.totalSpent) || 0,
    }));
  }
}
