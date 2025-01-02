import {Injectable} from '@nestjs/common';
import {EntityManager} from '@mikro-orm/core';
import {
    ICreateCustomer,
    ICustomer, ICustomerMetadataPagination, IDeleteCustomer,
    IGetCustomerById, IGetCustomers,
    IUpdateCustomer,
} from "@smart-home/libs/types/portfolio";
import {CustomerEntity} from "../entities";

@Injectable()
export class CustomerService {
    constructor(
        private readonly em: EntityManager,
    ) {}

    async getCustomerById(params: IGetCustomerById): Promise<ICustomer> {
       return this.em.fork().getRepository(CustomerEntity).getCustomerById(params);
    }

    async getCustomers(params: IGetCustomers): Promise<ICustomerMetadataPagination> {
        return this.em.fork().getRepository(CustomerEntity).getCustomers(params);
    }

    async createCustomer(params: ICreateCustomer): Promise<ICustomer> {
        return this.em.fork().getRepository(CustomerEntity).createCustomer(params);
    }

    async updateCustomer(params: IUpdateCustomer): Promise<ICustomer> {
        return this.em.fork().getRepository(CustomerEntity).updateCustomer(params);
    }

    async deleteCustomer(params: IDeleteCustomer): Promise<ICustomer> {
        return this.em.fork().getRepository(CustomerEntity).deleteCustomer(params);
    }
}
