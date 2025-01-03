import {IUpdateProduct} from "@smart-home/libs/types/market";
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateProductRequestDto implements IUpdateProduct {
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
        name: 'name',
        type: String,
        required: false,
        description: 'name',
        example: 'name',
    })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({
        name: 'shortDescription',
        type: String,
        required: false,
        description: 'shortDescription',
        example: 'shortDescription',
    })
    @IsString()
    @IsOptional()
    shortDescription?: string;

    @ApiProperty({
        name: 'description',
        type: String,
        required: false,
        description: 'description',
        example: 'description',
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        name: 'price',
        type: Number,
        required: false,
        description: 'price',
        example: 1,
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    price?: number;

    @ApiProperty({
        name: 'image',
        type: String,
        required: false,
        description: 'image',
        example: 'image',
    })
    @IsString()
    @IsOptional()
    image?: string;
}
