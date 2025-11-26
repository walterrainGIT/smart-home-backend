import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class OrderPeriodDataDto {
  @ApiProperty({ example: "2024-01-01" })
  @IsString()
  period: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  count: number;

  @ApiProperty({ example: 500000 })
  @IsNumber()
  revenue: number;
}

export class OrdersByPeriodResponseDto {
  @ApiProperty({ type: [OrderPeriodDataDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderPeriodDataDto)
  data: OrderPeriodDataDto[];
}

