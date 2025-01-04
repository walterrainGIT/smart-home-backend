import {IUpdateOrder, OrderStatusEnum} from "@smart-home/libs/types/market";
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsEnum, IsNumber, IsOptional} from "class-validator";

export class UpdateOrderRequestDto implements IUpdateOrder {
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
        required: false,
        description: 'userId',
        example: 1,
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    userId?: number;

    @ApiProperty({
        name: 'lotId',
        type: Number,
        required: false,
        description: 'lotId',
        example: 1,
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    lotId?: number;

    @ApiProperty({
        name: 'status',
        enum: OrderStatusEnum,
        required: false,
        description: 'status',
    })
    @IsEnum(OrderStatusEnum)
    @IsOptional()
    status?: OrderStatusEnum;
}
