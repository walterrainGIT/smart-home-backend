import {IGetCustomers} from "@smart-home/libs/types/portfolio";
import {PageBodyRequestDto} from "@smart-home/libs/common/dtos";
import {ApiProperty} from "@nestjs/swagger";
import {IsObject, IsOptional, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class GetCustomersRequestDto implements Omit<IGetCustomers, 'pagination'> {
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
