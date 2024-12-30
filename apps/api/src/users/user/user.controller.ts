import {Body, Controller, Get, HttpStatus, Post, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import {LoginUserRequestDto, RegisterUserRequestDto, UserResponseDto} from "api/users/user/dto";
import {ApiBearerAuth, ApiResponse} from "@nestjs/swagger";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponseDto,
    description: 'Returns registered user',
  })
  @ApiBearerAuth()
  registerUser(
      @Body() body: RegisterUserRequestDto
  ): Promise<UserResponseDto> {
    return this.userService.registerUser(body);
  }

  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponseDto,
    description: 'Returns logged user',
  })
  @ApiBearerAuth()
  loginUser(
      @Body() body: LoginUserRequestDto
  ): Promise<UserResponseDto> {
    return this.userService.loginUser(body);
  }
}
