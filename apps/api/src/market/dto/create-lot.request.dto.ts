import {ICreateLot} from "@smart-home/libs/types/market";
import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsOptional, IsString} from "class-validator";

export class CreateLotRequestDto implements ICreateLot {
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
        name: 'productsIds',
        description: 'productsIds',
        isArray: true,
        example: [1, 2],
        required: false,
    })
    @IsArray()
    @IsOptional()
    productsIds: number[];
}
