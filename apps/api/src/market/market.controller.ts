import { Controller, Get,  Patch, Req, Res, UseGuards} from '@nestjs/common';
import { MarketService } from './market.service';
import { Response } from 'express';
import {JwtAuthGuard} from "api/users/user/auth/jwt-auth-guard";
import {ApiTags} from "@nestjs/swagger";

@Controller('market')
@ApiTags('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get('me')
  getUserById(@Req() req) {
    return this.userService.getUserById({ id: req.user.userId });
  }
}
