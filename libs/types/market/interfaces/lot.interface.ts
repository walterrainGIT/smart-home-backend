import {IProduct, LotStatusEnum, LotTypeEnum} from "@smart-home/libs/types/market";
import {Collection} from "@mikro-orm/core";
import {IMetadataPagination} from "@smart-home/libs/common/interfaces";

export interface ILot {
    id: number;
    type: LotTypeEnum;
    name: string;
    shortDescription?: string;
    description?: string;
    price?: number;
    image?: string;
    status: LotStatusEnum;
    products?: Collection<IProduct> | IProduct[];
}

export interface ILotMetadataPagination {
    lots: ILot[];
    metadata: IMetadataPagination;
}
