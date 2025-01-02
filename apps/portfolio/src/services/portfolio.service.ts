import {Injectable} from '@nestjs/common';
import {EntityManager} from '@mikro-orm/core';
import {
    ICreatePortfolio, IDeletePortfolio,
    IGetPortfolioById,
    IGetPortfolios,
    IPortfolio, IPortfolioMetadataPagination,
    IUpdatePortfolio
} from "@smart-home/libs/types/portfolio";
import {PortfolioEntity} from "../entities";
import {CustomerService} from "./customer.service";

@Injectable()
export class PortfolioService {
    constructor(
        private readonly em: EntityManager,
        private readonly customerService: CustomerService,
    ) {}

    async getPortfolioById(params: IGetPortfolioById): Promise<IPortfolio> {
        return this.em.fork().getRepository(PortfolioEntity).getPortfolioById(params);
    }

    async getPortfolios(params: IGetPortfolios): Promise<IPortfolioMetadataPagination> {
        return this.em.fork().getRepository(PortfolioEntity).getPortfolios(params);
    }

    async deletePortfolio(params: IDeletePortfolio): Promise<IPortfolio> {
        return this.em.fork().getRepository(PortfolioEntity).deletePortfolio(params);
    }

    async createPortfolio(params: ICreatePortfolio): Promise<IPortfolio> {
        const { name, description, customerId, images } = params;

        const portfolio = new PortfolioEntity();
        portfolio.name = name;
        portfolio.description = description;
        portfolio.customer = await this.customerService.getCustomerById({ id: customerId });
        if(images) portfolio.images = images;

        await this.em.fork().persistAndFlush(portfolio);
        return portfolio;
    }

    async updatePortfolio(params: IUpdatePortfolio): Promise<IPortfolio> {
        const { id, name, description, customerId, images } = params;

        const portfolio = await this.getPortfolioById({ id });

        if(name) portfolio.name = name;
        if(description) portfolio.description = description;
        if(customerId) portfolio.customer = await this.customerService.getCustomerById({ id: customerId });
        if(images) portfolio.images = images;

        await this.em.fork().persistAndFlush(portfolio);
        return portfolio;
    }
}
