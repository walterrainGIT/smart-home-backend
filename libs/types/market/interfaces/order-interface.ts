import {ILot, OrderStatusEnum} from "@smart-home/libs/types/market";
import {IMetadataPagination} from "@smart-home/libs/common/interfaces";
import {IUser} from "@smart-home/libs/types/users/user";

export interface IOrder {
    id: number;
    userId: number;
    user: IUser;
    status: OrderStatusEnum;
    lot: ILot;
    createdAt: Date;
}

export interface IOrderMetadataPagination {
    orders: IOrder[];
    metadata: IMetadataPagination;
}
