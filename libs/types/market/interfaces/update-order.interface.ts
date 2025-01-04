import { OrderStatusEnum} from "@smart-home/libs/types/market";

export interface IUpdateOrder {
    id: number;
    userId?: number;
    lotId?: number;
    status?: OrderStatusEnum;
}
