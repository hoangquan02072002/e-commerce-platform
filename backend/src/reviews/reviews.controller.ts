import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return await this.reviewsService.create(createReviewDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Review[]> {
    return await this.reviewsService.findAll();
  }
  @Get('product/:productId')
  @HttpCode(HttpStatus.OK)
  async findByProductId(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<Review[]> {
    return await this.reviewsService.findByProductId(productId);
  }
}
