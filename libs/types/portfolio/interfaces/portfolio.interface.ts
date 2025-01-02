import {ICustomer} from "@smart-home/libs/types/portfolio/interfaces/customer.interface";
import {IMetadataPagination} from "@smart-home/libs/common/interfaces";

export interface IPortfolio {
    id: number;
    name: string;
    description: string;
    images?: string[];
    customer: ICustomer;
}

export interface IPortfolioMetadataPagination {
    portfolios: IPortfolio[];
    metadata: IMetadataPagination;
}
