import {IPagination} from "@smart-home/libs/common/interfaces";

export interface IGetPortfolios {
    customersIds: number[];
    pagination: IPagination;
}
