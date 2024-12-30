import { IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {PAGINATION_PAGE_NUMBER_START, PAGINATION_PAGE_SIZE_MAX} from "@smart-home/libs/common/constants/api";
import {IPageQuery} from "@smart-home/libs/common/interfaces";

export class PageQueryRequestDto implements IPageQuery {
    @ApiProperty({
        name: 'page[size]',
        type: Number,
        description: `0 to ${PAGINATION_PAGE_SIZE_MAX}`,
        required: false,
    })
    @Max(PAGINATION_PAGE_SIZE_MAX)
    @Min(0)
    @IsNumber()
    @Transform(value => Number(value))
    @Type(() => Number)
    size: number = PAGINATION_PAGE_SIZE_MAX;

    @ApiProperty({
        name: 'page[number]',
        type: Number,
        description: `Starting from ${PAGINATION_PAGE_NUMBER_START}`,
        required: false,
    })
    @Min(PAGINATION_PAGE_NUMBER_START)
    @IsNumber()
    @Transform(value => Number(value))
    @Type(() => Number)
    number: number = PAGINATION_PAGE_NUMBER_START;
}
