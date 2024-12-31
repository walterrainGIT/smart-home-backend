import { LotTypeEnum} from "@smart-home/libs/types/market";

export interface ICreateLot {
    name: string;
    type: LotTypeEnum;
    shortDescription?: string;
    description?: string;
    image?: string;
    productsIds: number[];
}
