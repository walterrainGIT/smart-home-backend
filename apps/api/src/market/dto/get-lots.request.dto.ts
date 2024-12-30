import {IGetLots} from "@smart-home/libs/types/market";
import {PageQueryRequestDto} from "@smart-home/libs/common/dtos/page-query.request.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsObject, IsOptional, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class GetLotsRequestDto implements Omit<IGetLots, 'pagination'> {
    @ApiProperty({
        name: 'page',
        required: true,
        type: PageQueryRequestDto,
    })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => PageQueryRequestDto as any)
    page: PageQueryRequestDto;
}
