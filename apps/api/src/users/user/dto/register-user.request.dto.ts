import {IRegisterUser} from "@smart-home/libs/types/users/user";
import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from 'class-validator';

export class RegisterUserRequestDto implements IRegisterUser {
    @ApiProperty({
        name: 'firstName',
        type: String,
        required: true,
        description: 'firstName',
        example: 'firstName',
    })
    @IsString()
    @IsOptional()
    firstName: string;

    @ApiProperty({
        name: 'lastName',
        type: String,
        required: true,
        description: 'lastName',
        example: 'lastName',
    })
    @IsString()
    @IsOptional()
    lastName: string;

    @ApiProperty({
        name: 'email',
        type: String,
        required: true,
        description: 'email',
        example: 'email',
    })
    @IsString()
    @IsOptional()
    email: string;

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
        required: true,
        description: 'username',
        example: 'username',
    })
    @IsString()
    @IsOptional()
    username: string;

    @ApiProperty({
        name: 'password',
        type: String,
        required: true,
        description: 'password',
        example: 'password',
    })
    @IsString()
    @IsOptional()
    password: string;
}
