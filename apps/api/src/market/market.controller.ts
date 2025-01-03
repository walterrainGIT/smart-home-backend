import {Body, Controller, Delete, HttpStatus, Patch, Post, Query, Req, Res, UseGuards} from '@nestjs/common';
import { MarketService } from './market.service';
import {ApiBearerAuth, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard, UserRoles} from "api/users/user/auth/jwt-auth-guard";
import {
  CreateProductRequestDto,
  ProductMetadataPaginationResponseDto,
  ProductResponseDto,
  CreateLotRequestDto,
  LotMetadataPaginationResponseDto,
  LotResponseDto,
  GetProductsRequestDto,
  GetLotsRequestDto,
  DeleteLotRequestDto, DeleteProductRequestDto, UpdateProductRequestDto, UpdateLotRequestDto
} from "api/market/dto";
import {UserRoleEnum} from "@smart-home/libs/types/users/user";
import {Response} from "express";

@Controller('market')
@ApiTags('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Post('product/create')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductResponseDto,
    description: 'Returns created product',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  createProduct(
      @Body() body: CreateProductRequestDto,
  ): Promise<ProductResponseDto> {
    return this.marketService.createProduct(body);
  }

  @Post('lot/create')
  @ApiResponse({
    status: HttpStatus.OK,
    type: LotResponseDto,
    description: 'Returns created lot',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  createLot(
      @Body() body: CreateLotRequestDto
  ): Promise<LotResponseDto> {
    return this.marketService.createLot(body);
  }

  @Delete('lot')
  @ApiResponse({
    status: HttpStatus.OK,
    type: LotMetadataPaginationResponseDto,
    description: 'Returns deleted lot',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  deleteLot(
      @Query() query: DeleteLotRequestDto
  ): Promise<LotResponseDto> {
    return this.marketService.deleteLot(query);
  }

  @Patch('lot/update')
  @ApiResponse({
    status: HttpStatus.OK,
    type: LotResponseDto,
    description: 'Returns updated lot',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  updateLot(
      @Body() body: UpdateLotRequestDto
  ): Promise<LotResponseDto> {
    return this.marketService.updateLot(body);
  }

  @Delete('product')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductResponseDto,
    description: 'Returns deleted product',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  deleteProduct(
      @Query() query: DeleteProductRequestDto
  ): Promise<ProductResponseDto> {
    return this.marketService.deleteProduct(query);
  }

  @Patch('products/update')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductResponseDto,
    description: 'Returns updated product',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  updateProduct(
      @Body() body: UpdateProductRequestDto
  ): Promise<ProductResponseDto> {
    return this.marketService.updateProduct(body);
  }


  @Post('product/get')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductMetadataPaginationResponseDto,
    description: 'Returns products',
  })
  getProducts(
      @Body() body: GetProductsRequestDto
  ): Promise<ProductMetadataPaginationResponseDto> {
    return this.marketService.getProducts(body);
  }

  @Post('lot/get')
  @ApiResponse({
    status: HttpStatus.OK,
    type: LotMetadataPaginationResponseDto,
    description: 'Returns lots',
  })
  getLots(
      @Body() body: GetLotsRequestDto
  ): Promise<LotMetadataPaginationResponseDto> {
    return this.marketService.getLots(body);
  }
}
