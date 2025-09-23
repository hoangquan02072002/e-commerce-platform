/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
// import { CreateCategoryDto } from './dto/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';
import { SearchCategoryDto } from './dto/search-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('search')
  async searchCategories(
    @Query() searchCategoryDto: SearchCategoryDto,
  ): Promise<Category[]> {
    return this.categoriesService.searchCategories(searchCategoryDto);
  }
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }
}
