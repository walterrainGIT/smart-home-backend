import {Body, Controller, HttpStatus, Post, UseGuards} from '@nestjs/common';
import { MarketService } from './market.service';
import {ApiBearerAuth, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "api/users/user/auth/jwt-auth-guard";
import {CreateProductRequestDto, ProductMetadataPaginationResponseDto, ProductResponseDto, CreateLotRequestDto, LotMetadataPaginationResponseDto, LotResponseDto, GetProductsRequestDto, GetLotsRequestDto} from "api/market/dto";

@Controller('market')
@ApiTags('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductResponseDto,
    description: 'Returns created product',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  createProduct(
      @Body() body: CreateProductRequestDto
  ): Promise<ProductResponseDto> {
    return this.marketService.createProduct(body);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    type: LotResponseDto,
    description: 'Returns created lot',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  createLot(
      @Body() body: CreateLotRequestDto
  ): Promise<LotResponseDto> {
    return this.marketService.createLot(body);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductMetadataPaginationResponseDto,
    description: 'Returns products',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getProducts(
      @Body() body: GetProductsRequestDto
  ): Promise<ProductMetadataPaginationResponseDto> {
    return this.marketService.getProducts(body);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    type: LotMetadataPaginationResponseDto,
    description: 'Returns lots',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getLots(
      @Body() body: GetLotsRequestDto
  ): Promise<LotMetadataPaginationResponseDto> {
    return this.marketService.getLots(body);
  }
}
