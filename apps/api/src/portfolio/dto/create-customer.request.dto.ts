import {ICreateCustomer} from "@smart-home/libs/types/portfolio";
import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";

export class CreateCustomerRequestDto implements ICreateCustomer {
    @ApiProperty({
        name: 'name',
        type: String,
        required: true,
        description: 'name',
        example: 'name',
    })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({
        name: 'description',
        type: String,
        required: true,
        description: 'description',
        example: 'description',
    })
    @IsString()
    @IsOptional()
    description: string;

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
