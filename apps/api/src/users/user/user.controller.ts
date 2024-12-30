import {Body, Controller, Get, HttpStatus, Patch, Post, Req, Res, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import {LoginUserRequestDto, RegisterUserRequestDto, UserResponseDto} from "api/users/user/dto";
import {ApiBearerAuth, ApiResponse} from "@nestjs/swagger";
import { Response } from 'express';
import {JwtAuthGuard} from "api/users/user/jwt-auth-guard";

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
  async registerUser(
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
  async loginUser(
      @Body() body: LoginUserRequestDto,
      @Res({ passthrough: true }) response: Response,
  ): Promise<UserResponseDto> {
    const user = await this.userService.loginUser(body);

    response.cookie('token', await this.userService.generateToken(user), {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token');

    return { message: 'Logout successful' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req) {
    return this.userService.getUserById({ id: req.user.id });
  }
}
