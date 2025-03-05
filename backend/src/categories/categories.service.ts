import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { SearchCategoryDto } from './dto/search-category.dto';
// import { CreateCategoryDto } from './dto/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async searchCategories(
    searchCategoryDto: SearchCategoryDto,
  ): Promise<Category[]> {
    const { search } = searchCategoryDto;

    const queryBuilder =
      this.categoriesRepository.createQueryBuilder('category');

    if (search) {
      queryBuilder.andWhere('(category.name LIKE :search )', {
        search: `%${search}%`,
      });
    }

    const categories = await queryBuilder.getMany();

    if (!categories.length) {
      throw new NotFoundException('No categories found');
    }

    return categories;
  }
}
