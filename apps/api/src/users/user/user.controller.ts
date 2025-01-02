import {Body, Controller, Get, HttpStatus, Patch, Req, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import {JwtAuthGuard, User} from "api/users/user/auth/jwt-auth-guard";
import {ApiBearerAuth, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UpdateUserRequestDto, UserResponseDto} from "api/users/user/dto";

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

  @Patch()
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponseDto,
    description: 'Returns updated user',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  updateUser(
      @Body() body: UpdateUserRequestDto,
      @User() userId: number,
  ): Promise<UserResponseDto> {
    return this.userService.updateUser(userId, body);
  }
}
