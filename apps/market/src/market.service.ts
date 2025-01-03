import {Injectable} from '@nestjs/common';
import {Collection, EntityManager} from '@mikro-orm/core';
import {
    ICreateLot,
    ICreateProduct, IDeleteLot, IDeleteProduct, IGetLotById,
    IGetLots,
    IGetProducts,
    ILot,
    ILotMetadataPagination,
    IProduct,
    IProductMetadataPagination, IUpdateLot, IUpdateProduct,
    LotStatusEnum
} from "@smart-home/libs/types/market";
import {IGetProductsByIds} from "@smart-home/libs/types/market/interfaces/get-products-by-ids.interface";
import {LotEntity, ProductEntity} from "market/entities";

@Injectable()
export class MarketService {
    constructor(
        private readonly em: EntityManager,
    ) {}

    async getProducts(params: IGetProducts): Promise<IProductMetadataPagination> {
        return this.em.fork().getRepository(ProductEntity).getProducts(params);
    }

    async getLots(params: IGetLots): Promise<ILotMetadataPagination> {
        return this.em.fork().getRepository(LotEntity).getLots(params);
    }

    async getLotById(params: IGetLotById): Promise<ILot> {
        return this.em.fork().getRepository(LotEntity).getLotById(params);
    }

    async getProductsByIds(params: IGetProductsByIds): Promise<IProduct[]> {
       return this.em.fork().getRepository(ProductEntity).getProductsByIds(params);
    }

    async createProduct(params: ICreateProduct): Promise<IProduct> {
            const {name, shortDescription, description, image, price} = params;

            const product = new ProductEntity();
            product.name = name;
            if (shortDescription) product.shortDescription = shortDescription;
            if (description) product.description = description;
            if (image) product.image = image;
            product.price = price;

            await this.em.fork().persistAndFlush(product);
            return product;
    }

    async createLot(params: ICreateLot): Promise<ILot> {
            const {name, type, shortDescription, description, image, productsIds} = params;

            const products = await this.getProductsByIds({ids: productsIds});

            const lot = new LotEntity();
            lot.name = name;
            lot.type = type;
            if (shortDescription) lot.shortDescription = shortDescription;
            if (description) lot.description = description;
            if (image) lot.image = image;
            lot.products = new Collection<IProduct>(lot, products);
            lot.price = products.reduce((sum, product) => sum + product.price, 0);
            lot.status = LotStatusEnum.CREATED;

            await this.em.fork().persistAndFlush(lot);
            return lot;
    }

    async deleteLot(params: IDeleteLot): Promise<ILot> {
        return this.em.fork().getRepository(LotEntity).deleteLot(params);
    }

    async updateLot(params: IUpdateLot): Promise<ILot> {
        const { id, type, name, shortDescription, description, price, image, status, productsIds } = params;

        const lot = await this.getLotById({ id });
        if(type) lot.type = type;
        if(name) lot.name = name;
        if(shortDescription) lot.shortDescription = shortDescription;
        if(description) lot.description = description;
        if(price) lot.price = price;
        if(image) lot.image = image;
        if(status) lot.status = status;
        if(productsIds) lot.products = await this.getProductsByIds({ ids: productsIds });

        await this.em.fork().persistAndFlush(lot);
        return lot;
    }

    async deleteProduct(params: IDeleteProduct): Promise<IProduct> {
        return this.em.fork().getRepository(ProductEntity).deleteProduct(params);
    }

    async updateProduct(params: IUpdateProduct): Promise<IProduct> {
        return this.em.fork().getRepository(ProductEntity).updateProduct(params);
    }
}
