import {
  Body,
  Controller,
  Delete,
  Get,
  // Post,
  // Body,
  // Patch,
  Param,
  Post,
  Query,
  UseGuards,
  ParseIntPipe,
  // Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { Roles } from 'src/auth/strategies/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { SearchProductDto } from './dto/search-product.dto';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('create')
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }
  // @Get()
  // async findAll() {
  //   return await this.productsService.findAll();
  // }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ): Promise<Product[]> {
    return this.productsService.findAll(page, limit);
  }
  @Get('search1')
  async find_search(
    @Query('category') category: string,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ): Promise<Product[]> {
    return this.productsService.search_category(category, page, limit);
  }
  // @Get('search')
  // async searchProducts(
  //   @Query() searchProductDto: SearchProductDto,
  // ): Promise<Product[]> {
  //   return this.productsService.searchProducts(searchProductDto);
  // }
  @Get('search')
  async searchProducts(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('price') price?: number,
    @Query('desc') desc?: string,
    @Query('page', ParseIntPipe) page: number = 1, // Use page instead of pageNum
    @Query('limit', ParseIntPipe) limit: number = 10, // Ensure limit is a positive number
  ): Promise<Product[]> {
    const searchProductDto = {
      search,
      category,
      price,
      desc,
      pageNum: page, // If you want to keep using pageNum in the DTO
      limit,
    };
    return this.productsService.searchProducts(searchProductDto);
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const productId = parseInt(id, 10); // Convert the ID to a number
    if (isNaN(productId)) {
      throw new Error('Invalid product ID'); // Handle invalid ID
    }
    return this.productsService.findOne(productId, ['category']);
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productsService.findOne(+id, ['category']);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
