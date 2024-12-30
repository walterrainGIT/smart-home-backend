import {Body, Controller, Get, HttpStatus, Patch, Post, Req, Res, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {LoginUserRequestDto, RegisterUserRequestDto, UserResponseDto} from "api/users/user/dto";
import {ApiBearerAuth, ApiResponse, ApiTags} from "@nestjs/swagger";
import { Response } from 'express';
import {JwtAuthGuard} from "api/users/user/auth/jwt-auth-guard";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

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
    response.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return { message: 'Logout successful' };
  }
}
