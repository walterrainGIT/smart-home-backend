import {IGetLots, LotStatusEnum, LotTypeEnum} from "@smart-home/libs/types/market";
import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsObject, IsOptional, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {PageBodyRequestDto} from "@smart-home/libs/common/dtos";

export class GetLotsRequestDto implements Omit<IGetLots, 'pagination'> {
    @ApiProperty({
        name: 'types',
        description: 'Types, if empty - return all',
        isArray: true,
        enum: LotTypeEnum,
        example: [
            LotTypeEnum.PRODUCT,
            LotTypeEnum.SERVICE,
        ],
        required: false,
    })
    @IsArray()
    @IsOptional()
    types?: LotTypeEnum[];

    @ApiProperty({
        name: 'statuses',
        description: 'Statuses, if empty - return all',
        isArray: true,
        enum: LotStatusEnum,
        example: [
            LotStatusEnum.CREATED,
        ],
        required: false,
    })
    @IsArray()
    @IsOptional()
    statuses?: LotStatusEnum[];

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
