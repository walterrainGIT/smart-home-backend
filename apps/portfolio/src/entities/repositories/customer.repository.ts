import {
  SqlEntityRepository,
} from '@mikro-orm/postgresql';
import {RpcException} from "@nestjs/microservices";
import {CustomerEntity} from "../customer.entity";
import {
  ICreateCustomer,
  ICustomer, ICustomerMetadataPagination,
  IDeleteCustomer, IGetCustomerById,
  IGetCustomers,
  IUpdateCustomer
} from "@smart-home/libs/types/portfolio";

export class CustomerRepository extends SqlEntityRepository<CustomerEntity> {
  async getCustomerById(params: IGetCustomerById): Promise<ICustomer> {
    const { id } = params;

    const customer = await this.em.getRepository(CustomerEntity).findOne({ id });

    if(!customer) {
      throw new RpcException('ERRORS.PORTFOLIO.CUSTOMER_NOT_FOUND');
    }

    return customer;
  }

  async getCustomers(params: IGetCustomers): Promise<ICustomerMetadataPagination> {
    const { pagination } = params;
    const { limit, offset } = pagination;

    const qb = this.em.createQueryBuilder(CustomerEntity)
        .limit(limit, offset);

    const [customers, total] = await qb.getResultAndCount();

    return {
      customers,
      metadata: {
        total,
        limit,
        offset,
      }
    }
  }

  async createCustomer(params: ICreateCustomer): Promise<ICustomer> {
    const { name, description, logo } = params;

    const customer = new CustomerEntity();
    customer.name = name;
    customer.description = description;
    if(logo) customer.logo = logo;

    await this.em.persistAndFlush(customer);
    return customer;
  }

  async updateCustomer(params: IUpdateCustomer): Promise<ICustomer> {
    const { id, name, description, logo } = params;

    const customer = await this.getCustomerById({ id });

    if(name) customer.name = name;
    if(description) customer.description = description;
    if(logo) customer.logo = logo;

    await this.em.persistAndFlush(customer);
    return customer;
  }

  async deleteCustomer(params: IDeleteCustomer): Promise<ICustomer> {
    const { id } = params;

    const customer = await this.getCustomerById({ id });

    await this.em.removeAndFlush(customer);
    return customer;
  }
}
