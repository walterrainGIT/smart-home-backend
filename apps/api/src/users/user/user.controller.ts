import { Controller, Get,  Patch, Req, Res, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import {JwtAuthGuard} from "api/users/user/auth/jwt-auth-guard";
import {ApiTags} from "@nestjs/swagger";

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUserById(@Req() req) {
    return this.userService.getUserById({ id: req.user.userId });
  }
}
