import {IMetadataPagination} from "@smart-home/libs/common/interfaces";

export interface IProduct {
    id: number;
    name: string;
    shortDescription?: string;
    description?: string;
    price?: number;
    image?: string;
}

export interface IProductMetadataPagination {
    products: IProduct[];
    metadata: IMetadataPagination;
}
