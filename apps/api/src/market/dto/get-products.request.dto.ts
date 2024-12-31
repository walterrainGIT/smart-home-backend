import {IGetProducts} from "@smart-home/libs/types/market";
import {Type} from "class-transformer";
import {IsObject, IsOptional, ValidateNested} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {PageBodyRequestDto} from "@smart-home/libs/common/dtos";

export class GetProductsRequestDto implements Omit<IGetProducts, 'pagination'> {
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
