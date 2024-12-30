export interface ICreateLot {
    name: string;
    shortDescription?: string;
    description?: string;
    image?: string;
    productsIds: number[];
}
