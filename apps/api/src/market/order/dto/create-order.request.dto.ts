import {ICreateOrder} from "@smart-home/libs/types/market";
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsNumber, IsOptional} from "class-validator";

export class CreateOrderRequestDto implements ICreateOrder {
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
        name: 'lotId',
        type: Number,
        required: true,
        description: 'lotId',
        example: 1,
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    lotId: number;
}
