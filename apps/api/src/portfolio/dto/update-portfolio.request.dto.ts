import {IUpdatePortfolio} from "@smart-home/libs/types/portfolio";
import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNumber, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";

export class UpdatePortfolioRequestDto implements IUpdatePortfolio {
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
        name: 'customerId',
        type: Number,
        required: false,
        description: 'customerId',
        example: 1,
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    customerId?: number;

    @ApiProperty({
        name: 'images',
        description: 'images',
        isArray: true,
        example: ['link', 'link'],
        required: false,
    })
    @IsArray()
    @IsOptional()
    images?: string[];
}
