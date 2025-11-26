import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class PopularLotDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  lotId: number;

  @ApiProperty({ example: "Умный дом премиум" })
  @IsString()
  lotName: string;

  @ApiProperty({ example: 25 })
  @IsNumber()
  orderCount: number;

  @ApiProperty({ example: 3750000 })
  @IsNumber()
  revenue: number;

  @ApiProperty({ example: 0.15 })
  @IsNumber()
  conversionRate: number;
}

export class PopularLotsResponseDto {
  @ApiProperty({ type: [PopularLotDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PopularLotDto)
  lots: PopularLotDto[];
}

