import {IPortfolio} from "@smart-home/libs/types/portfolio";
import {Collection} from "@mikro-orm/core";
import {IMetadataPagination} from "@smart-home/libs/common/interfaces";

export interface ICustomer {
    id: number;
    name: string;
    description: string;
    logo?: string;
    portfolios?: Collection<IPortfolio> | IPortfolio[];
}

export interface ICustomerMetadataPagination {
    customers: ICustomer[];
    metadata: IMetadataPagination;
}
