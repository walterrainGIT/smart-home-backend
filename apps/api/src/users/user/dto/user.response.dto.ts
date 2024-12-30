import {IUser, UserRoleEnum} from "@smart-home/libs/types/users/user";
import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsNumber, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";

export class UserResponseDto implements IUser {
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
        name: 'passwordHash',
        type: String,
        required: true,
        description: 'passwordHash',
        example: 'passwordHash',
    })
    @IsString()
    @IsOptional()
    passwordHash: string;

    @ApiProperty({
        name: 'role',
        enum: UserRoleEnum,
        required: true,
        description: 'role',
    })
    @IsEnum(UserRoleEnum)
    @IsOptional()
    role: UserRoleEnum;
}
