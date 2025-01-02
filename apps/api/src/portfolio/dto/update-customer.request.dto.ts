import {IUpdateCustomer} from "@smart-home/libs/types/portfolio";
import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";

export class UpdateCustomerRequestDto implements IUpdateCustomer {
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
        name: 'name',
        type: String,
        required: false,
        description: 'name',
        example: 'name',
    })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({
        name: 'description',
        type: String,
        required: false,
        description: 'description',
        example: 'description',
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        name: 'logo',
        type: String,
        required: false,
        description: 'logo',
        example: 'logo',
    })
    @IsString()
    @IsOptional()
    logo?: string;
}
