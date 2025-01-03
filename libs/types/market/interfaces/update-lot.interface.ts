import { LotStatusEnum, LotTypeEnum} from "@smart-home/libs/types/market";

export interface IUpdateLot {
    id: number;
    type?: LotTypeEnum;
    name?: string;
    shortDescription?: string;
    description?: string;
    price?: number;
    image?: string;
    status?: LotStatusEnum;
    productsIds?: number[];
}
