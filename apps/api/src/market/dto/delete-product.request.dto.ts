import {IDeleteProduct} from "@smart-home/libs/types/market";
import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNumber, IsOptional} from "class-validator";
import {Type} from "class-transformer";

export class DeleteProductRequestDto implements IDeleteProduct {
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
