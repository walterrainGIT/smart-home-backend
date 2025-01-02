import {IUpdateUser} from "@smart-home/libs/types/users/user";
import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";

export class UpdateUserRequestDto implements Omit<IUpdateUser, 'userId'> {
    @ApiProperty({
        name: 'firstName',
        type: String,
        required: false,
        description: 'firstName',
        example: 'firstName',
    })
    @IsString()
    @IsOptional()
    firstName?: string;

    @ApiProperty({
        name: 'lastName',
        type: String,
        required: false,
        description: 'lastName',
        example: 'lastName',
    })
    @IsString()
    @IsOptional()
    lastName?: string;

    @ApiProperty({
        name: 'phone',
        type: String,
        required: false,
        description: 'phone',
        example: 'phone',
    })
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiProperty({
        name: 'address',
        type: String,
        required: false,
        description: 'address',
        example: 'address',
    })
    @IsString()
    @IsOptional()
    address?: string;

    @ApiProperty({
        name: 'username',
        type: String,
        required: false,
        description: 'username',
        example: 'username',
    })
    @IsString()
    @IsOptional()
    username?: string;
}
