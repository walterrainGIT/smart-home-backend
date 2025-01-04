import {IPagination} from "@smart-home/libs/common/interfaces";
import {OrderStatusEnum} from "@smart-home/libs/types/market";

export interface IGetOrders {
    ids?: number[];
    usersIds?: number[];
    statuses?: OrderStatusEnum[];
    lotsIds?: number[];
    pagination: IPagination;
}
