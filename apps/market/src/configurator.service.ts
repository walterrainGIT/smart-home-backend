import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { ConfiguratorEntity } from './entities/configurator.entity';
import { MarketService } from './market.service';

@Injectable()
export class ConfiguratorService {
  constructor(
    private readonly em: EntityManager,
    private readonly marketService: MarketService,
  ) {}

  async saveConfiguration(userId: number, rooms: any[], name?: string) {
    // Рассчитываем общую стоимость
    let totalPrice = 0;
    const productIds: number[] = [];

    for (const room of rooms) {
      if (room.products && Array.isArray(room.products)) {
        for (const productId of room.products) {
          if (!productIds.includes(productId)) {
            productIds.push(productId);
          }
        }
      }
    }

    if (productIds.length > 0) {
      const products = await this.marketService.getProductsByIds({ ids: productIds });
      totalPrice = products.reduce((sum, product) => sum + (product.price || 0), 0);
    }

    const config = new ConfiguratorEntity();
    config.userId = userId;
    config.rooms = rooms;
    config.totalPrice = totalPrice;
    config.name = name;

    await this.em.fork().persistAndFlush(config);
    return config;
  }

  async getConfigurations(userId: number) {
    const configs = await this.em.fork().getRepository(ConfiguratorEntity).find({
      userId,
    }, {
      orderBy: { createdAt: 'DESC' },
    });

    return configs;
  }

  async getConfigurationById(id: number, userId: number) {
    const config = await this.em.fork().getRepository(ConfiguratorEntity).findOne({
      id,
      userId,
    });

    if (!config) {
      throw new Error('Configuration not found');
    }

    return config;
  }

  async deleteConfiguration(id: number, userId: number) {
    const config = await this.getConfigurationById(id, userId);
    await this.em.fork().removeAndFlush(config);
    return config;
  }

  async createOrderFromConfiguration(configId: number, userId: number, lotId?: number) {
    const config = await this.getConfigurationById(configId, userId);

    // Если передан lotId, создаем заказ на этот лот
    // Иначе создаем временный лот из конфигурации
    if (lotId) {
      // Используем существующий лот
      const orderService = this.em.fork().getRepository(require('./entities').OrderEntity);
      // Здесь нужно использовать OrderService, но для простоты вернем конфигурацию
      return config;
    }

    // В реальности здесь нужно создать лот из конфигурации
    // Пока возвращаем конфигурацию
    return config;
  }
}

