import {ILot, ILotMetadataPagination} from "@smart-home/libs/types/market";
import {Collection} from "@mikro-orm/core";
import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNumber, IsObject, IsOptional, IsString, ValidateNested} from "class-validator";
import {MetadataPaginationResponseDto} from "@smart-home/libs/common/dtos/metadata-pagination.response.dto";
import {Type} from "class-transformer";
import {ProductResponseDto} from "api/market/dto/product.response.dto";

export class LotResponseDto implements ILot {
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
    products?: Collection<ProductResponseDto> | ProductResponseDto[];
}

export class LotMetadataPaginationResponseDto implements ILotMetadataPagination {
    @ApiProperty({
        name: 'lots',
        required: true,
        description: 'lots',
        type: [LotResponseDto],
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => LotResponseDto)
    lots: LotResponseDto[];

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
