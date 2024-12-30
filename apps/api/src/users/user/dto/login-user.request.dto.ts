import {ILoginUser} from "@smart-home/libs/types/users/user";
import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";

export class LoginUserRequestDto implements ILoginUser {
    @ApiProperty({
        name: 'loginParam',
        type: String,
        required: true,
        description: 'loginParam',
        example: 'loginParam',
    })
    @IsString()
    @IsOptional()
    loginParam: string;

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
