import {IGetPortfolios} from "@smart-home/libs/types/portfolio";
import {PageBodyRequestDto} from "@smart-home/libs/common/dtos";
import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsObject, IsOptional, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class GetPortfoliosRequestDto implements Omit<IGetPortfolios, 'pagination'> {
    @ApiProperty({
        name: 'customersIds',
        description: 'customersIds',
        isArray: true,
        example: [1, 2],
        required: true,
    })
    @IsArray()
    @IsOptional()
    customersIds: number[];

    @ApiProperty({
        name: 'page',
        required: true,
        type: PageBodyRequestDto,
    })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => PageBodyRequestDto as any)
    page: PageBodyRequestDto;
}
