/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    try {
      const review = this.reviewsRepository.create({
        userId: createReviewDto.userId,
        productId: createReviewDto.productId,
        rating: createReviewDto.rating,
        comment: createReviewDto.comment,
        title: createReviewDto.title,
      });
      return await this.reviewsRepository.save(review);
    } catch (error) {
      throw new BadRequestException(
        `Failed to create review: ${error.message}`,
      );
    }
  }

  async findAll(): Promise<Review[]> {
    try {
      return await this.reviewsRepository.find({
        relations: ['user', 'product'],
        order: { createdAt: 'DESC' },
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          user: {
            name: true,
          },
          product: {
            name: true,
          },
        },
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw new BadRequestException('Failed to fetch reviews');
    }
  }

  async findByProductId(productId: number): Promise<Review[]> {
    try {
      const reviews = await this.reviewsRepository.find({
        where: { productId },
        relations: ['user', 'product'],
        order: { createdAt: 'DESC' },
        select: {
          id: true,
          rating: true,
          comment: true,
          title: true,
          createdAt: true,
          user: {
            id: true,
            name: true,
          },
          product: {
            id: true,
            name: true,
          },
        },
      });

      return reviews;
    } catch (error) {
      throw new BadRequestException(
        `Failed to fetch reviews for product ${productId}`,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
