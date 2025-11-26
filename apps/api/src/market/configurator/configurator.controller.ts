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
import {
  SaveConfigurationRequestDto,
  SaveConfigurationResponseDto,
  GetConfigurationsResponseDto,
  DeleteConfigurationRequestDto,
} from './dto';

@Controller('market/configurator')
@ApiTags('market-configurator')
export class ConfiguratorController {
  constructor(private readonly configuratorService: ConfiguratorService) {}

  @Post('save')
  @ApiResponse({
    status: HttpStatus.OK,
    type: SaveConfigurationResponseDto,
    description: 'Saves configuration',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async saveConfiguration(
    @User() userId: number,
    @Body() body: SaveConfigurationRequestDto
  ): Promise<SaveConfigurationResponseDto> {
    return this.configuratorService.saveConfiguration(
      userId,
      body.rooms,
      body.name
    );
  }

  @Get('list')
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetConfigurationsResponseDto,
    description: 'Returns user configurations',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getConfigurations(
    @User() userId: number
  ): Promise<GetConfigurationsResponseDto> {
    return this.configuratorService.getConfigurations(userId);
  }

  @Delete('delete')
  @ApiResponse({
    status: HttpStatus.OK,
    type: SaveConfigurationResponseDto,
    description: 'Deletes configuration',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async deleteConfiguration(
    @User() userId: number,
    @Query() query: DeleteConfigurationRequestDto
  ): Promise<SaveConfigurationResponseDto> {
    return this.configuratorService.deleteConfiguration(query.id, userId);
  }
}
