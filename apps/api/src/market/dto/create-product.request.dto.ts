import {ICreateProduct} from "@smart-home/libs/types/market";
import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";

export class CreateProductRequestDto implements ICreateProduct {
    @ApiProperty({
        name: 'firstName',
        type: String,
        required: true,
        description: 'firstName',
        example: 'firstName',
    })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({
        name: 'firstName',
        type: String,
        required: true,
        description: 'firstName',
        example: 'firstName',
    })
    @IsString()
    @IsOptional()
    shortDescription?: string;

    @ApiProperty({
        name: 'firstName',
        type: String,
        required: true,
        description: 'firstName',
        example: 'firstName',
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        name: 'firstName',
        type: String,
        required: true,
        description: 'firstName',
        example: 'firstName',
    })
    @IsString()
    @IsOptional()
    image?: string;
}
