import {Body, Controller, Delete, HttpStatus, Patch, Post, Query, UseGuards} from '@nestjs/common';
import { OrderService } from './order.service';
import {ApiBearerAuth, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard, User, UserRoles} from "api/users/user/auth/jwt-auth-guard";
import {UserRoleEnum} from "@smart-home/libs/types/users/user";
import {
  CancelOrderRequestDto,
  CreateOrderRequestDto,
  GetOrdersRequestDto,
  OrderMetadataPagination,
  OrderResponseDto, UpdateOrderRequestDto
} from "api/market/order/dto";

@Controller('market/order')
@ApiTags('market/order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrderResponseDto,
    description: 'Returns created orders',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  createOrder(
      @Body() body: CreateOrderRequestDto,
      @User() userId: number,
  ): Promise<OrderResponseDto> {
    return this.orderService.createOrder(userId, body);
  }

  @Patch()
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrderResponseDto,
    description: 'Returns updated order',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  async updateOrder(
      @Body() body: UpdateOrderRequestDto
  ): Promise<OrderResponseDto> {
    return this.orderService.updateOrder(body);
  }

  @Delete()
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrderResponseDto,
    description: 'Returns updated order',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async cancelOrder(
      @Query() query: CancelOrderRequestDto,
      @User() userId: number,
  ): Promise<OrderResponseDto> {
    return this.orderService.cancelOrder(userId, query);
  }

  @Post('get')
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrderMetadataPagination,
    description: 'Returns orders',
  })
  getOrders(
      @Body() body: GetOrdersRequestDto
  ): Promise<OrderMetadataPagination> {
    return this.orderService.getOrders(body);
  }
}
