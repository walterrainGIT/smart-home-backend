import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard, UserRoles } from "api/users/user/auth/jwt-auth-guard";
import { UserRoleEnum } from "@smart-home/libs/types/users/user";
import { AnalyticsService } from './analytics.service';
import {
  OrdersSummaryResponseDto,
  OrdersByPeriodResponseDto,
  PopularLotsResponseDto,
  TopCustomersResponseDto,
} from './dto';
import { GetAnalyticsRequestDto } from './dto/get-analytics.request.dto';
import { HttpStatus } from '@nestjs/common';

@Controller('market/analytics')
@ApiTags('market-analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('orders-summary')
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrdersSummaryResponseDto,
    description: 'Returns orders summary statistics',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  async getOrdersSummary(@Query() query: GetAnalyticsRequestDto): Promise<OrdersSummaryResponseDto> {
    const result = await this.analyticsService.getOrdersSummary(query.dateFrom, query.dateTo);
    return result;
  }

  @Get('orders-by-period')
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrdersByPeriodResponseDto,
    description: 'Returns orders by period',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  async getOrdersByPeriod(@Query() query: GetAnalyticsRequestDto): Promise<OrdersByPeriodResponseDto> {
    if (!query.dateFrom || !query.dateTo) {
      throw new Error('dateFrom and dateTo are required');
    }
    const result = await this.analyticsService.getOrdersByPeriod(query.dateFrom, query.dateTo, query.period);
    return { data: result };
  }

  @Get('popular-lots')
  @ApiResponse({
    status: HttpStatus.OK,
    type: PopularLotsResponseDto,
    description: 'Returns popular lots',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  async getPopularLots(@Query() query: GetAnalyticsRequestDto): Promise<PopularLotsResponseDto> {
    const result = await this.analyticsService.getPopularLots(query.limit, query.dateFrom, query.dateTo);
    return { lots: result };
  }

  @Get('top-customers')
  @ApiResponse({
    status: HttpStatus.OK,
    type: TopCustomersResponseDto,
    description: 'Returns top customers',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  async getTopCustomers(@Query() query: GetAnalyticsRequestDto): Promise<TopCustomersResponseDto> {
    const result = await this.analyticsService.getTopCustomers(query.limit, query.dateFrom, query.dateTo);
    return { customers: result };
  }
}

