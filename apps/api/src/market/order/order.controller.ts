import {Body, Controller, HttpStatus, Patch, Post, UseGuards} from '@nestjs/common';
import { OrderService } from './order.service';
import {ApiBearerAuth, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard, UserRoles} from "api/users/user/auth/jwt-auth-guard";
import {UserRoleEnum} from "@smart-home/libs/types/users/user";
import {
  CreateOrderRequestDto,
  GetOrdersRequestDto,
  OrderMetadataPagination,
  OrderResponseDto, UpdateOrderRequestDto
} from "api/market/order/dto";

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrderResponseDto,
    description: 'Returns created orders',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  createOrder(
      @Body() body: CreateOrderRequestDto,
  ): Promise<OrderResponseDto> {
    return this.orderService.createOrder(body);
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
  updateOrder(
      @Body() body: UpdateOrderRequestDto
  ): Promise<OrderResponseDto> {
    return this.orderService.updateOrder(body);
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
