import {IGetLots} from "@smart-home/libs/types/market";
import {ApiProperty} from "@nestjs/swagger";
import {IsObject, IsOptional, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {PageBodyRequestDto} from "@smart-home/libs/common/dtos";

export class GetLotsRequestDto implements Omit<IGetLots, 'pagination'> {
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
