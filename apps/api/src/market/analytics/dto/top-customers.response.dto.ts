import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class TopCustomerDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  orderCount: number;

  @ApiProperty({ example: 1000000 })
  @IsNumber()
  totalSpent: number;
}

export class TopCustomersResponseDto {
  @ApiProperty({ type: [TopCustomerDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TopCustomerDto)
  customers: TopCustomerDto[];
}

