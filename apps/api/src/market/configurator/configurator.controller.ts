import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, User } from 'api/users/user/auth/jwt-auth-guard';
import { ConfiguratorService } from './configurator.service';
import { HttpStatus } from '@nestjs/common';

@Controller('market/configurator')
@ApiTags('market-configurator')
export class ConfiguratorController {
  constructor(private readonly configuratorService: ConfiguratorService) {}

  @Post('save')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Saves configuration',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async saveConfiguration(
    @User() userId: number,
    @Body() body: { rooms: any[]; name?: string }
  ) {
    return this.configuratorService.saveConfiguration(
      userId,
      body.rooms,
      body.name
    );
  }

  @Get('list')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns user configurations',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getConfigurations(@User() userId: number) {
    return this.configuratorService.getConfigurations(userId);
  }

  @Delete('delete')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Deletes configuration',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async deleteConfiguration(@User() userId: number, @Query('id') id: number) {
    return this.configuratorService.deleteConfiguration(id, userId);
  }
}
