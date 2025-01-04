import { IOrder, IOrderMetadataPagination, OrderStatusEnum} from "@smart-home/libs/types/market";
import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsEnum, IsNumber, IsObject, IsOptional, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {MetadataPaginationResponseDto} from "@smart-home/libs/common/dtos";
import {LotResponseDto} from "api/market/dto";

export class OrderResponseDto implements IOrder {
    @ApiProperty({
        name: 'id',
        type: Number,
        required: true,
        description: 'id',
        example: 1,
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    id: number;

    @ApiProperty({
        name: 'userId',
        type: Number,
        required: true,
        description: 'userId',
        example: 1,
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    userId: number;

    @ApiProperty({
        name: 'status',
        enum: OrderStatusEnum,
        required: true,
        description: 'status',
    })
    @IsEnum(OrderStatusEnum)
    @IsOptional()
    status: OrderStatusEnum;

    @ApiProperty({
        name: 'lots',
        required: true,
        description: 'lots',
        type: [LotResponseDto],
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => LotResponseDto)
    lot: LotResponseDto;
}

export class OrderMetadataPagination implements IOrderMetadataPagination {
    @ApiProperty({
        name: 'orders',
        required: true,
        description: 'orders',
        type: [OrderResponseDto],
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderResponseDto)
    orders: OrderResponseDto[];

    @ApiProperty({
        name: 'metadata',
        required: true,
        description: 'metadata',
    })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => MetadataPaginationResponseDto as any)
    metadata: MetadataPaginationResponseDto;
}
