import {ILot, OrderStatusEnum} from "@smart-home/libs/types/market";
import {IMetadataPagination} from "@smart-home/libs/common/interfaces";

export interface IOrder {
    id: number;
    userId: number;
    status: OrderStatusEnum;
    lot: ILot;
}

export interface IOrderMetadataPagination {
    orders: IOrder[];
    metadata: IMetadataPagination;
}
