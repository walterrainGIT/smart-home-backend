import {IGetOrders} from "@smart-home/libs/types/market/interfaces/get-orders.interface";
import { OrderStatusEnum} from "@smart-home/libs/types/market";
import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsObject, IsOptional, ValidateNested} from "class-validator";
import {PageBodyRequestDto} from "@smart-home/libs/common/dtos";
import {Type} from "class-transformer";

export class GetOrdersRequestDto implements Omit<IGetOrders, 'pagination'> {
    @ApiProperty({
        name: 'ids',
        description: 'ids',
        isArray: true,
        example: [1, 2],
        required: false,
    })
    @IsArray()
    @IsOptional()
    ids?: number[];

    @ApiProperty({
        name: 'usersIds',
        description: 'usersIds',
        isArray: true,
        example: [1, 2],
        required: false,
    })
    @IsArray()
    @IsOptional()
    usersIds?: number[];

    @ApiProperty({
        name: 'statuses',
        description: 'Types, if empty - return all',
        isArray: true,
        enum: OrderStatusEnum,
        example: [
            OrderStatusEnum.CREATED,
            OrderStatusEnum.CANCELED,
            OrderStatusEnum.COMPLETED,
            OrderStatusEnum.PROGRESS,

        ],
        required: false,
    })
    @IsArray()
    @IsOptional()
    statuses?: OrderStatusEnum[];

    @ApiProperty({
        name: 'lotsIds',
        description: 'lotsIds',
        isArray: true,
        example: [1, 2],
        required: false,
    })
    @IsArray()
    @IsOptional()
    lotsIds?: number[];

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
