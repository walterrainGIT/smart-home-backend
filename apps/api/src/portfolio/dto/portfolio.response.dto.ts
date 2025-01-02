import {IPortfolio, IPortfolioMetadataPagination} from "@smart-home/libs/types/portfolio";
import {MetadataPaginationResponseDto} from "@smart-home/libs/common/dtos";
import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNumber, IsObject, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {CustomerResponseDto} from "api/portfolio/dto/customer.response.dto";

export class PortfolioResponseDto implements IPortfolio {
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
        name: 'images',
        description: 'images',
        isArray: true,
        example: ['link', 'link'],
        required: false,
    })
    @IsArray()
    @IsOptional()
    images?: string[];

    @ApiProperty({
        name: 'customer',
        required: true,
        description: 'customer',
        type: [CustomerResponseDto],
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CustomerResponseDto)
    customer: CustomerResponseDto;
}

export class PortfolioMetadataPaginationResponseDto implements IPortfolioMetadataPagination {
    @ApiProperty({
        name: 'portfolios',
        required: true,
        description: 'portfolios',
        type: [PortfolioResponseDto],
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PortfolioResponseDto)
    portfolios: PortfolioResponseDto[];

    @ApiProperty({
        name: 'metadata',
        required: true,
        description: 'metadata',
    })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => MetadataPaginationResponseDto as any)
    metadata: MetadataPaginationResponseDto;
}
