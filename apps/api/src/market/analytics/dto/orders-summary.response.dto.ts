import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsObject } from "class-validator";

export class OrdersByStatusDto {
  @ApiProperty({ example: 45 })
  @IsNumber()
  created: number;

  @ApiProperty({ example: 30 })
  @IsNumber()
  progress: number;

  @ApiProperty({ example: 60 })
  @IsNumber()
  completed: number;

  @ApiProperty({ example: 15 })
  @IsNumber()
  canceled: number;
}

export class OrdersSummaryResponseDto {
  @ApiProperty({ example: 150 })
  @IsNumber()
  totalOrders: number;

  @ApiProperty({ type: OrdersByStatusDto })
  @IsObject()
  ordersByStatus: OrdersByStatusDto;

  @ApiProperty({ example: 15000000 })
  @IsNumber()
  totalRevenue: number;

  @ApiProperty({ example: 100000 })
  @IsNumber()
  averageOrderValue: number;
}

