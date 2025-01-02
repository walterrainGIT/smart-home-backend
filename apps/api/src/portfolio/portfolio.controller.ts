import {Body, Controller, Delete, HttpStatus, Patch, Post, Query, UseGuards} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import {ApiBearerAuth, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard, UserRoles} from "api/users/user/auth/jwt-auth-guard";
import {UserRoleEnum} from "@smart-home/libs/types/users/user";
import {
  CreateCustomerRequestDto,
  CreatePortfolioRequestDto,
  CustomerMetadataPaginationResponseDto,
  CustomerResponseDto,
  DeleteCustomerRequestDto, DeletePortfolioRequestDto,
  GetCustomersRequestDto,
  GetPortfoliosRequestDto,
  PortfolioMetadataPaginationResponseDto,
  PortfolioResponseDto,
  UpdateCustomerRequestDto, UpdatePortfolioRequestDto
} from "api/portfolio/dto";

@Controller('portfolio')
@ApiTags('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post('portfolio/customer/get')
  @ApiResponse({
    status: HttpStatus.OK,
    type: CustomerMetadataPaginationResponseDto,
    description: 'Returns customers',
  })
  getCustomers(
      @Body() body: GetCustomersRequestDto,
  ): Promise<CustomerMetadataPaginationResponseDto> {
    return this.portfolioService.getCustomers(body);
  }

  @Post('portfolio/customer/create')
  @ApiResponse({
    status: HttpStatus.OK,
    type: CustomerResponseDto,
    description: 'Returns created customers',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  createCustomer(
      @Body() body: CreateCustomerRequestDto,
  ): Promise<CustomerResponseDto> {
    return this.portfolioService.createCustomer(body);
  }

  @Patch('portfolio/customer/update')
  @ApiResponse({
    status: HttpStatus.OK,
    type: CustomerResponseDto,
    description: 'Returns updated customers',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  updateCustomer(
      @Body() body: UpdateCustomerRequestDto,
  ): Promise<CustomerResponseDto> {
    return this.portfolioService.updateCustomer(body);
  }

  @Delete('portfolio/customer')
  @ApiResponse({
    status: HttpStatus.OK,
    type: CustomerResponseDto,
    description: 'Returns deleted customer',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  deleteCustomer(
      @Query() query: DeleteCustomerRequestDto,
  ): Promise<CustomerResponseDto> {
    return this.portfolioService.deleteCustomer(query);
  }

  @Post('portfolio/get')
  @ApiResponse({
    status: HttpStatus.OK,
    type: PortfolioMetadataPaginationResponseDto,
    description: 'Returns portfolios',
  })
  getPortfolios(
      @Body() body: GetPortfoliosRequestDto,
  ): Promise<PortfolioMetadataPaginationResponseDto> {
    return this.portfolioService.getPortfolios(body);
  }

  @Post('portfolio/create')
  @ApiResponse({
    status: HttpStatus.OK,
    type: PortfolioResponseDto,
    description: 'Returns created portfolio',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  createPortfolio(
      @Body() body: CreatePortfolioRequestDto,
  ): Promise<PortfolioResponseDto> {
    return this.portfolioService.createPortfolio(body);
  }

  @Patch('portfolio')
  @ApiResponse({
    status: HttpStatus.OK,
    type: PortfolioResponseDto,
    description: 'Returns updated portfolio',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  updatePortfolio(
      @Body() body: UpdatePortfolioRequestDto,
  ): Promise<PortfolioResponseDto> {
    return this.portfolioService.updatePortfolio(body);
  }

  @Delete('portfolio')
  @ApiResponse({
    status: HttpStatus.OK,
    type: PortfolioResponseDto,
    description: 'Returns deleted portfolio',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  deletePortfolio(
      @Query() query: DeletePortfolioRequestDto,
  ): Promise<PortfolioResponseDto> {
    return this.portfolioService.deletePortfolio(query);
  }
}
