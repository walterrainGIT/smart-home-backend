import {ICancelOrder} from "@smart-home/libs/types/market/interfaces/cancel-order.interface";
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsNumber, IsOptional} from "class-validator";

export class CancelOrderRequestDto implements Omit<ICancelOrder, 'userId'> {
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
}
