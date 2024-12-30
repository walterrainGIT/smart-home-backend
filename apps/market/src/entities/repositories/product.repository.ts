import {
  SqlEntityRepository,
} from '@mikro-orm/postgresql';
import {RpcException} from "@nestjs/microservices";
import { ProductEntity} from "market/entities";
import {IGetProductsByIds} from "@smart-home/libs/types/market/interfaces/get-products-by-ids.interface";
import {IGetProducts, IProduct, IProductMetadataPagination} from "@smart-home/libs/types/market";

export class ProductRepository extends SqlEntityRepository<ProductEntity> {
  async getProducts(params: IGetProducts): Promise<IProductMetadataPagination> {
    const { pagination } = params;
    const { limit, offset } = pagination;

    const qb = this.em.createQueryBuilder(ProductEntity)
        .limit(limit, offset);

    const [products, total] = await qb.getResultAndCount();

    return {
      products,
      metadata: {
        total,
        limit,
        offset,
      }
    }
  }

  async getProductsByIds(params: IGetProductsByIds): Promise<IProduct[]> {
    const { ids } = params;

    const products = await this.em.getRepository(ProductEntity).find({
      id: {
        $in: ids,
      }
    });

    if(!products.length) {
      throw new RpcException('ERRORS.MARKET.PRODUCT_NOT_FOUND');
    }

    return products;
  }
}
