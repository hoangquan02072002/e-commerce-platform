/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, Param } from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductDto } from './dto/search-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private ProductsRepository: Repository<Product>,
    @InjectRepository(Category)
    private CategoryRepository: Repository<Category>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const category = new Category();
    category.id = createProductDto.categoryId;
    const product = new Product();
    product.description = createProductDto.description;
    product.image = createProductDto.image;
    product.name = createProductDto.name;
    product.price = createProductDto.price;
    product.stock = createProductDto.stock;
    product.category = category;
    return this.ProductsRepository.save(product);
  }

  async findAll(page: number, limit: number): Promise<Product[]> {
    try {
      const [products, total] = await this.ProductsRepository.findAndCount({
        relations: ['category'],
        order: {
          category: { id: 'ASC' },
          id: 'ASC',
        },
        skip: (page - 1) * limit,
        take: limit,
      });

      if (!products.length) {
        throw new NotFoundException('No products found');
      }

      return products;
    } catch (error) {
      console.log('Error finding products', error);
      throw new NotFoundException();
    }
  }

  async findOne(id: number, relations: string[]): Promise<Product> {
    try {
      const product = await this.ProductsRepository.findOne({
        where: { id },
        relations,
      });
      if (!product) {
        throw new NotFoundException();
      }
      return product;
    } catch (error) {
      console.log('Error finding product', error);
      throw new NotFoundException();
    }
  }

  async remove(@Param('id') id: number) {
    try {
      const product = await this.ProductsRepository.findOne({
        where: { id },
      });
      if (!product) {
        throw new NotFoundException();
      }
      return this.ProductsRepository.remove(product);
    } catch (error) {
      console.log('Error removing product', error);
      throw new NotFoundException();
    }
  }

  async searchProducts(searchProductDto: SearchProductDto): Promise<Product[]> {
    try {
      const {
        search,
        category,
        price,
        desc,
        pageNum = 1,
        limit,
      } = searchProductDto;
      const queryBuilder =
        this.ProductsRepository.createQueryBuilder('product');

      // Join the category table to access its fields
      queryBuilder.leftJoinAndSelect('product.category', 'category');

      // Filter by category if provided
      if (category) {
        queryBuilder.andWhere('category.name = :category', { category });
      }
      if (desc) {
        queryBuilder.andWhere('desc.name = :desc', { desc });
      }

      // Filter by search term if provided
      if (search) {
        queryBuilder.andWhere(
          '(product.name ILIKE :search OR product.description ILIKE :search)',
          { search: `%${search}%` },
        );
      }

      // Filter by price if provided
      if (price) {
        queryBuilder.andWhere('product.price <= :price', { price });
      }

      // Pagination
      queryBuilder.skip((pageNum - 1) * limit).take(limit);

      const [products] = await queryBuilder.getManyAndCount();

      if (!products.length) {
        throw new NotFoundException('No products found');
      }

      return products;
    } catch (error) {
      console.log('Error searching products', error);
      throw new NotFoundException();
    }
  }

  async search_category(
    category: string,
    page: number,
    limit: number,
  ): Promise<Product[]> {
    try {
      const [products, total] = await this.ProductsRepository.findAndCount({
        relations: ['category'],
        where: { category: { name: category } },
        order: {
          category: { id: 'ASC' },
          id: 'ASC',
        },
        skip: (page - 1) * limit,
        take: limit,
      });

      if (!products.length) {
        throw new NotFoundException('No products found');
      }

      return products;
    } catch (error) {
      console.log('Error finding products', error);
      throw new NotFoundException();
    }
  }
}
