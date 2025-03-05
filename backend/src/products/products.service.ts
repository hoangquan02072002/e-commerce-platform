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

  async findAll(): Promise<Product[]> {
    try {
      const productCategories = await this.ProductsRepository.find({
        relations: ['category'],
        order: {
          category: { id: 'ASC' },
          id: 'ASC',
        },
      });
      if (!productCategories) {
        throw new NotFoundException();
      }
      return productCategories;
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

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

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
  // async searchProducts(searchProductDto: SearchProductDto): Promise<Product[]> {
  //   const {
  //     search,
  //     price,
  //     rating,
  //     category,
  //     attrs,
  //     pageNum = 1,
  //     sort,
  //   } = searchProductDto;

  //   const queryBuilder = this.ProductsRepository.createQueryBuilder('product');

  //   if (search) {
  //     queryBuilder.andWhere(
  //       '(product.name LIKE :search OR product.description LIKE :search)',
  //       { search: `%${name}%` },
  //     );
  //   }

  //   if (price) {
  //     queryBuilder.andWhere('product.price <= :price', { price });
  //   }

  //   if (rating && rating.length > 0) {
  //     queryBuilder.andWhere('product.rating IN (:...rating)', { rating });
  //   }

  //   if (category) {
  //     queryBuilder.andWhere('product.category = :category', { category });
  //   }

  //   if (attrs && attrs.length > 0) {
  //     attrs.forEach((attr) => {
  //       const [key, ...values] = attr.split('-');
  //       queryBuilder.andWhere(
  //         `EXISTS (SELECT 1 FROM jsonb_array_elements(product.attrs) attr WHERE attr->>'key' = :key AND attr->>'value' IN (:...values))`,
  //         { key, values },
  //       );
  //     });
  //   }

  //   if (sort) {
  //     const [sortField, sortOrder] = sort.split('_');
  //     queryBuilder.orderBy(
  //       `product.${sortField}`,
  //       sortOrder.toUpperCase() as 'ASC' | 'DESC',
  //     );
  //   }

  //   queryBuilder.skip((pageNum - 1) * 10).take(10);

  //   const products = await queryBuilder.getMany();

  //   if (!products.length) {
  //     throw new NotFoundException('No products found');
  //   }

  //   return products;
  // }
  async searchProducts(searchProductDto: SearchProductDto): Promise<Product[]> {
    try {
      const { search, price, attrs, pageNum, sort } = searchProductDto;

      const queryBuilder =
        this.ProductsRepository.createQueryBuilder('product');

      if (search) {
        queryBuilder.andWhere(
          '(product.name ILIKE :search OR product.description ILIKE :search)',
          { search: `%${search}%` },
        );
      }

      if (price) {
        queryBuilder.andWhere('product.price <= :price', { price });
      }

      if (attrs && attrs.length > 0) {
        attrs.forEach((attr) => {
          const [key, ...values] = attr.split('-');
          queryBuilder.andWhere(
            `EXISTS (SELECT 1 FROM jsonb_array_elements(product.attrs) attr WHERE attr->>'key' = :key AND attr->>'value' IN (:...values))`,
            { key, values },
          );
        });
      }

      if (sort) {
        const [sortField, sortOrder] = sort.split('_');
        queryBuilder.orderBy(
          `product.${sortField}`,
          sortOrder.toUpperCase() as 'ASC' | 'DESC',
        );
      }

      if (pageNum) {
        queryBuilder.skip((pageNum - 1) * 10).take(10); // Pagination
      }

      return await queryBuilder.getMany();
    } catch (error) {
      console.log('Error searching products', error);
      throw new NotFoundException();
    }
  }
}
