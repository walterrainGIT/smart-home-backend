import {ICustomer, ICustomerMetadataPagination, IPortfolio} from "@smart-home/libs/types/portfolio";
import {Collection} from "@mikro-orm/core";
import {MetadataPaginationResponseDto} from "@smart-home/libs/common/dtos";
import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNumber, IsObject, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {PortfolioResponseDto} from "api/portfolio/dto/portfolio.response.dto";

export class CustomerResponseDto implements ICustomer {
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
        name: 'logo',
        type: String,
        required: false,
        description: 'logo',
        example: 'logo',
    })
    @IsString()
    @IsOptional()
    logo?: string;

    @ApiProperty({
        name: 'portfolios',
        required: false,
        description: 'portfolios',
        type: [PortfolioResponseDto],
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PortfolioResponseDto)
    portfolios?: Collection<PortfolioResponseDto> | PortfolioResponseDto[];
}

export class CustomerMetadataPaginationResponseDto implements ICustomerMetadataPagination {
    @ApiProperty({
        name: 'customers',
        required: true,
        description: 'customers',
        type: [CustomerResponseDto],
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CustomerResponseDto)
    customers: CustomerResponseDto[];

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
