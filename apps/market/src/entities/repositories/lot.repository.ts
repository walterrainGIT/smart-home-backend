import {
  SqlEntityRepository,
} from '@mikro-orm/postgresql';
import {LotEntity} from "../lot.entity";
import {
  IDeleteLot,
  IGetLotById,
  IGetLots,
  ILot,
  ILotMetadataPagination,
  IUpdateLot
} from "@smart-home/libs/types/market";
import {RpcException} from "@nestjs/microservices";

export class LotRepository extends SqlEntityRepository<LotEntity> {
  async getLots(params: IGetLots): Promise<ILotMetadataPagination> {
    const {pagination, types, statuses} = params;
    const {limit, offset} = pagination;

    const qb = this.em.createQueryBuilder(LotEntity)
        .innerJoinAndSelect('products', 'products')
        .limit(limit, offset);

    if (types) qb.andWhere({
      type: {
        $in: types,
      }
    })
    if (statuses) qb.andWhere({
      status: {
        $in: statuses,
      }
    })

    const [lots, total] = await qb.getResultAndCount();

    return {
      lots,
      metadata: {
        total,
        limit,
        offset,
      }
    }
  }

  async getLotById(params: IGetLotById): Promise<ILot> {
    const { id } = params;

    const lot = await this.em.getRepository(LotEntity).findOne({ id });

    if(!lot) {
      throw new RpcException('ERRORS.MARKET.LOT_NOT_FOUND');
    }

    return lot;
  }

  async deleteLot(params: IDeleteLot): Promise<ILot> {
    const { id } = params;

    const lot = await this.getLotById({ id });

    await this.em.removeAndFlush(lot);
    return lot;
  }
}
