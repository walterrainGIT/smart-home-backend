import {
  SqlEntityRepository,
} from '@mikro-orm/postgresql';
import {RpcException} from "@nestjs/microservices";
import { ProductEntity} from "market/entities";
import {IGetProductsByIds} from "@smart-home/libs/types/market/interfaces/get-products-by-ids.interface";
import {
  IDeleteProduct,
  IGetProducts,
  IProduct,
  IProductMetadataPagination,
  IUpdateProduct
} from "@smart-home/libs/types/market";

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

  async deleteProduct(params: IDeleteProduct): Promise<IProduct> {
    const { id } = params;

    const [product] = await this.getProductsByIds({ ids: [ id ] });

    await this.em.removeAndFlush(product);
    return product;
  }

  async updateProduct(params: IUpdateProduct): Promise<IProduct> {
    const { id, name, shortDescription, description, price, image } = params;

    const [product] = await this.getProductsByIds({ ids: [ id ] });
    if(name) product.name = name;
    if(shortDescription) product.shortDescription = shortDescription;
    if(description) product.description = description;
    if(price) product.price = price;
    if(image) product.image = image;

    await this.em.persistAndFlush(product);
    return product;
  }
}
