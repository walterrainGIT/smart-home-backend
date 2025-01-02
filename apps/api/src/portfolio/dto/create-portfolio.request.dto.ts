import {ICreatePortfolio} from "@smart-home/libs/types/portfolio";
import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNumber, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreatePortfolioRequestDto implements ICreatePortfolio {
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
        name: 'description',
        type: String,
        required: true,
        description: 'description',
        example: 'description',
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({
        name: 'customerId',
        type: Number,
        required: true,
        description: 'customerId',
        example: 1,
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    customerId: number;

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
