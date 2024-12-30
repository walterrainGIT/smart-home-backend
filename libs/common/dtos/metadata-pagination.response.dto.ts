import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import {IMetadataPagination} from "@smart-home/libs/common/interfaces";

export class MetadataPaginationResponseDto implements IMetadataPagination {
    @ApiProperty({
        name: 'total',
        type: Number,
        required: false,
        description: 'total',
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    total: number;

    @ApiProperty({
        name: 'limit',
        type: Number,
        required: false,
        description: 'limit',
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    limit: number;

    @ApiProperty({
        name: 'offset',
        type: Number,
        required: false,
        description: 'offset',
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    offset: number;
}
