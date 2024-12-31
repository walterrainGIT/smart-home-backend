import {ICreateProduct} from "@smart-home/libs/types/market";
import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreateProductRequestDto implements ICreateProduct {
    @ApiProperty({
        name: 'name',
        type: String,
        required: true,
        description: 'name',
        example: 'name',
    })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({
        name: 'shortDescription',
        type: String,
        required: true,
        description: 'shortDescription',
        example: 'shortDescription',
    })
    @IsString()
    @IsOptional()
    shortDescription?: string;

    @ApiProperty({
        name: 'description',
        type: String,
        required: true,
        description: 'description',
        example: 'description',
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        name: 'image',
        type: String,
        required: true,
        description: 'image',
        example: 'image',
    })
    @IsString()
    @IsOptional()
    image?: string;

    @ApiProperty({
        name: 'price',
        type: Number,
        required: true,
        description: 'price',
        example: 1,
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    price: number;
}
