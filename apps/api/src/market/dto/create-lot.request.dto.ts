import {ICreateLot} from "@smart-home/libs/types/market";
import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsOptional, IsString} from "class-validator";

export class CreateLotRequestDto implements ICreateLot {
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

    @ApiProperty({
        name: 'ids',
        description: 'ids',
        isArray: true,
        example: [1, 2],
        required: false,
    })
    @IsArray()
    @IsOptional()
    productsIds: number[];
}
