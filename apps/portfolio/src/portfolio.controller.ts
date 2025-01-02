import { Controller } from '@nestjs/common';
import {PortfolioService} from "./services/portfolio.service";
import {CustomerService} from "./services/customer.service";
import {
  ICreateCustomer,
  ICreatePortfolio, ICustomer, ICustomerMetadataPagination, IDeleteCustomer,
  IDeletePortfolio, IGetCustomerById, IGetCustomers,
  IGetPortfolioById,
  IGetPortfolios,
  IPortfolio,
  IPortfolioMetadataPagination, IUpdateCustomer, IUpdatePortfolio
} from "@smart-home/libs/types/portfolio";
import {GrpcMethod} from "@nestjs/microservices";
import {TransformWithGroup} from "@smart-home/libs/common/decorators";
import {PlainGroupsEnum} from "@smart-home/libs/common/enums";

@Controller('Portfolio')
export class PortfolioController {
  constructor(
      private readonly portfolioService: PortfolioService,
      private readonly customerService: CustomerService
  ) {}

  @GrpcMethod('PortfolioService', 'GetCustomerById')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async getCustomerById(params: IGetCustomerById): Promise<ICustomer> {
    return this.customerService.getCustomerById(params);
  }

  @GrpcMethod('PortfolioService', 'GetCustomers')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async getCustomers(params: IGetCustomers): Promise<ICustomerMetadataPagination> {
    return this.customerService.getCustomers(params);
  }

  @GrpcMethod('PortfolioService', 'CreateCustomer')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async createCustomer(params: ICreateCustomer): Promise<ICustomer> {
    return this.customerService.createCustomer(params);
  }

  @GrpcMethod('PortfolioService', 'UpdateCustomer')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async updateCustomer(params: IUpdateCustomer): Promise<ICustomer> {
    return this.customerService.updateCustomer(params);
  }

  @GrpcMethod('PortfolioService', 'DeleteCustomer')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async deleteCustomer(params: IDeleteCustomer): Promise<ICustomer> {
    return this.customerService.deleteCustomer(params);
  }

  @GrpcMethod('PortfolioService', 'GetPortfolioById')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async getPortfolioById(params: IGetPortfolioById): Promise<IPortfolio> {
    return this.portfolioService.getPortfolioById(params);
  }

  @GrpcMethod('PortfolioService', 'GetPortfolios')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async getPortfolios(params: IGetPortfolios): Promise<IPortfolioMetadataPagination> {
    return this.portfolioService.getPortfolios(params);
  }

  @GrpcMethod('PortfolioService', 'DeletePortfolio')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async deletePortfolio(params: IDeletePortfolio): Promise<IPortfolio> {
    return this.portfolioService.deletePortfolio(params);
  }

  @GrpcMethod('PortfolioService', 'CreatePortfolio')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async createPortfolio(params: ICreatePortfolio): Promise<IPortfolio> {
    return this.portfolioService.createPortfolio(params);
  }

  @GrpcMethod('PortfolioService', 'UpdatePortfolio')
  @TransformWithGroup([PlainGroupsEnum.PUBLIC])
  async updatePortfolio(params: IUpdatePortfolio): Promise<IPortfolio> {
    return this.portfolioService.updatePortfolio(params);
  }
}
