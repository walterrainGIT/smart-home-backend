import {IPagination} from "@smart-home/libs/common/interfaces";
import {LotStatusEnum, LotTypeEnum} from "@smart-home/libs/types/market";

export interface IGetLots {
    types?: LotTypeEnum[];
    statuses?: LotStatusEnum[];
    pagination: IPagination;
}
