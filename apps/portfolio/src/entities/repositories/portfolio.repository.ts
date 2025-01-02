import {
  SqlEntityRepository,
} from '@mikro-orm/postgresql';
import {RpcException} from "@nestjs/microservices";
import {PortfolioEntity} from "../portfolio.entity";
import {IDeletePortfolio,
  IGetPortfolioById,
  IGetPortfolios,
  IPortfolio,
  IPortfolioMetadataPagination,
} from "@smart-home/libs/types/portfolio";

export class PortfolioRepository extends SqlEntityRepository<PortfolioEntity> {
  async getPortfolioById(params: IGetPortfolioById): Promise<IPortfolio> {
    const { id } = params;

    const portfolio = await this.em.getRepository(PortfolioEntity).findOne({ id });

    if(!portfolio) {
      throw new RpcException('ERRORS.PORTFOLIO.PORTFOLIO_NOT_FOUND');
    }

    return portfolio;
  }

  async getPortfolios(params: IGetPortfolios): Promise<IPortfolioMetadataPagination> {
    const { pagination } = params;
    const { limit, offset } = pagination;

    const qb = this.em.createQueryBuilder(PortfolioEntity)
        .limit(limit, offset);

    const [portfolios, total] = await qb.getResultAndCount();

    return {
      portfolios,
      metadata: {
        total,
        limit,
        offset,
      }
    }
  }

  async deletePortfolio(params: IDeletePortfolio): Promise<IPortfolio> {
    const { id } = params;

    const portfolio = await this.getPortfolioById({ id });

    await this.em.removeAndFlush(portfolio);
    return portfolio;
  }
}
