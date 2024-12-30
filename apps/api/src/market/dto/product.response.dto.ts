import {IProduct, IProductMetadataPagination} from "@smart-home/libs/types/market";
import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNumber, IsObject, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {MetadataPaginationResponseDto} from "@smart-home/libs/common/dtos/metadata-pagination.response.dto";

export class ProductResponseDto implements IProduct {
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
        name: 'id',
        type: Number,
        required: true,
        description: 'id',
        example: 1,
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    price?: number;

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

export class ProductMetadataPaginationResponseDto implements IProductMetadataPagination {
    @ApiProperty({
        name: 'products',
        required: true,
        description: 'products',
        type: [ProductResponseDto],
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductResponseDto)
    products: ProductResponseDto[];

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
