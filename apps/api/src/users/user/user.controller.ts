import { Controller, Get, Req, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import {JwtAuthGuard} from "api/users/user/auth/jwt-auth-guard";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getUserById(@Req() req) {
    return this.userService.getUserById({ id: req.user.userId });
  }
}
