import { Injectable, Inject } from '@nestjs/common';
import {ClientGrpc} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PORTFOLIO_BASE_SERVICE_NAME} from "@smart-home/libs/common/constants";
import { PinoLoggerService} from "@smart-home/libs/common/logger";
import {GrpcPortfolioService} from "@smart-home/libs/grpc/services";
import {
    CreateCustomerRequestDto,
    CreatePortfolioRequestDto, CustomerMetadataPaginationResponseDto, CustomerResponseDto, DeleteCustomerRequestDto,
    DeletePortfolioRequestDto, GetCustomersRequestDto,
    GetPortfoliosRequestDto, PortfolioMetadataPaginationResponseDto, PortfolioResponseDto, UpdateCustomerRequestDto,
    UpdatePortfolioRequestDto
} from "api/portfolio/dto";

@Injectable()
export class PortfolioService {
    private portfolioService: GrpcPortfolioService;
    private readonly logger = new PinoLoggerService()

    constructor(
        @Inject(`${PORTFOLIO_BASE_SERVICE_NAME}_PACKAGE`) private portfolioClient: ClientGrpc,
        ) {}

    onModuleInit() {
        this.portfolioService = this.portfolioClient.getService<GrpcPortfolioService>('PortfolioService');
    }

    async getCustomers(params: GetCustomersRequestDto): Promise<CustomerMetadataPaginationResponseDto> {
        const { page } = params;
        const { size, number } = page;

        return firstValueFrom(this.portfolioService.getCustomers({
            pagination: {
                limit: size,
                offset: (number - 1) * size,
            },
            ...params,
        }))
    }

    async createCustomer(params: CreateCustomerRequestDto): Promise<CustomerResponseDto> {
        return firstValueFrom(this.portfolioService.createCustomer(params));
    }

    async updateCustomer(params: UpdateCustomerRequestDto): Promise<CustomerResponseDto> {
        return firstValueFrom(this.portfolioService.updateCustomer(params));
    }

    async deleteCustomer(params: DeleteCustomerRequestDto): Promise<CustomerResponseDto> {
        return firstValueFrom(this.portfolioService.deleteCustomer(params));
    }

    async getPortfolios(params: GetPortfoliosRequestDto): Promise<PortfolioMetadataPaginationResponseDto> {
        const { page } = params;
        const { size, number } = page;

        return firstValueFrom(this.portfolioService.getPortfolios({
            pagination: {
                limit: size,
                offset: (number - 1) * size,
            },
            ...params,
        }))
    }

    async deletePortfolio(params: DeletePortfolioRequestDto): Promise<PortfolioResponseDto> {
        return firstValueFrom(this.portfolioService.deletePortfolio(params));
    }

    async createPortfolio(params: CreatePortfolioRequestDto): Promise<PortfolioResponseDto> {
        return firstValueFrom(this.portfolioService.createPortfolio(params));
    }

    async updatePortfolio(params: UpdatePortfolioRequestDto): Promise<PortfolioResponseDto> {
        return firstValueFrom(this.portfolioService.updatePortfolio(params));
    }
}
