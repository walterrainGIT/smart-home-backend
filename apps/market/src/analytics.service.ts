import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { OrderRepository } from 'market/entities';
import { OrderEntity } from './entities';

@Injectable()
export class AnalyticsService {
  constructor(private readonly em: EntityManager) {}

  async getOrdersSummary(dateFrom?: Date, dateTo?: Date) {
    const orderRepo = this.em.fork().getRepository(OrderEntity) as OrderRepository;
    return orderRepo.getOrdersSummary(dateFrom, dateTo);
  }

  async getOrdersByPeriod(dateFrom: Date, dateTo: Date, period: 'day' | 'week' | 'month' = 'day') {
    const orderRepo = this.em.fork().getRepository(OrderEntity) as OrderRepository;
    return orderRepo.getOrdersByPeriod(dateFrom, dateTo, period);
  }

  async getPopularLots(limit: number = 10, dateFrom?: Date, dateTo?: Date) {
    const orderRepo = this.em.fork().getRepository(OrderEntity) as OrderRepository;
    return orderRepo.getPopularLots(limit, dateFrom, dateTo);
  }

  async getTopCustomers(limit: number = 10, dateFrom?: Date, dateTo?: Date) {
    const orderRepo = this.em.fork().getRepository(OrderEntity) as OrderRepository;
    return orderRepo.getTopCustomers(limit, dateFrom, dateTo);
  }
}

