import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class GetAnalyticsRequestDto {
  @ApiProperty({ required: false, example: "2024-01-01" })
  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @ApiProperty({ required: false, example: "2024-12-31" })
  @IsOptional()
  @IsDateString()
  dateTo?: string;

  @ApiProperty({ required: false, example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @ApiProperty({ required: false, enum: ['day', 'week', 'month'], example: 'day' })
  @IsOptional()
  @IsEnum(['day', 'week', 'month'])
  period?: 'day' | 'week' | 'month';
}

