import {
  Controller,
  Post,
  Delete,
  Body,
  UseGuards,
  Req,
  Param,
  Get,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { ActivityTrackingService } from 'src/activity-tracking-service/activity-tracking-service.service';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    name: string;
  };
}

// export class AddToCartDto {
//   productId: number;
//   productName: string;
//   quantity: number;
//   price: number;
//   categoryName?: string;
//   image?: string;
// }

export class AddToCartDto {
  @IsNumber()
  productId: number;

  @IsString()
  productName: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsString()
  categoryName?: string;

  @IsOptional()
  @IsString()
  image?: string;
}

export class RemoveFromCartDto {
  @IsNumber()
  productId: number;

  @IsString()
  productName: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;
}

export class TrackViewDto {
  productId: number;
  productName: string;
  price: number;
  categoryName?: string;
}

@Controller('cart')
export class CartactivityController {
  constructor(
    private readonly activityTrackingService: ActivityTrackingService,
  ) {}

  @Post('add')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async addToCart(
    @Body() addToCartDto: AddToCartDto,
    @Req() req: AuthenticatedRequest,
  ) {
    try {
      console.log('🛒 Received add to cart request:', {
        body: addToCartDto,
        user: req.user?.id,
        userEmail: req.user?.email,
      });

      // Validate required fields
      if (
        !addToCartDto.productId ||
        !addToCartDto.productName ||
        !addToCartDto.quantity ||
        !addToCartDto.price
      ) {
        return {
          success: false,
          message:
            'Missing required fields: productId, productName, quantity, price',
          received: addToCartDto,
        };
      }

      // Track add to cart activity - this will send to Kafka and then to admin dashboard
      if (req.user && req.user.id) {
        await this.activityTrackingService.trackAddToCart(
          req.user.id,
          {
            id: addToCartDto.productId,
            name: addToCartDto.productName,
            quantity: addToCartDto.quantity,
            price: addToCartDto.price,
            category: addToCartDto.categoryName
              ? { name: addToCartDto.categoryName }
              : undefined,
            totalCartValue: addToCartDto.price * addToCartDto.quantity,
            cartItemCount: 1,
            userName: req.user.name,
            userEmail: req.user.email,
          },
          req,
        );
        console.log('📊 Add to cart activity tracked via Kafka');
      }

      return {
        success: true,
        message: 'Product added to cart and tracked via Kafka',
        productId: addToCartDto.productId,
        productName: addToCartDto.productName,
        quantity: addToCartDto.quantity,
        price: addToCartDto.price,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('❌ Error in addToCart controller:', error);
      return {
        success: false,
        message: 'Failed to add product to cart',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      };
    }
  }

  @Post('track-remove')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async trackRemoveFromCart(
    @Body() removeDto: RemoveFromCartDto,
    @Req() req: AuthenticatedRequest,
  ) {
    try {
      console.log('🗑️ Received remove from cart request:', {
        body: removeDto,
        user: req.user?.id,
        userEmail: req.user?.email,
      });

      // Enhanced validation with detailed error messages
      const missingFields = [];
      if (!removeDto.productId) missingFields.push('productId');
      if (!removeDto.productName) missingFields.push('productName');
      if (removeDto.quantity === undefined || removeDto.quantity === null)
        missingFields.push('quantity');
      if (removeDto.price === undefined || removeDto.price === null)
        missingFields.push('price');

      if (missingFields.length > 0) {
        return {
          success: false,
          message: `Missing required fields: ${missingFields.join(', ')}`,
          received: removeDto,
          missingFields,
        };
      }

      // Additional validation
      if (removeDto.quantity <= 0) {
        return {
          success: false,
          message: 'Quantity must be greater than 0',
          received: removeDto,
        };
      }

      if (removeDto.price < 0) {
        return {
          success: false,
          message: 'Price cannot be negative',
          received: removeDto,
        };
      }

      // Track remove from cart activity - this will send to Kafka and then to admin dashboard
      if (req.user && req.user.id) {
        await this.activityTrackingService.trackRemoveFromCart(
          req.user.id,
          {
            id: removeDto.productId,
            name: removeDto.productName,
            quantity: removeDto.quantity,
            price: removeDto.price,
            userName: req.user.name,
            userEmail: req.user.email,
          },
          req,
        );
        console.log('📊 Remove from cart activity tracked via Kafka');
      }

      return {
        success: true,
        message: 'Remove from cart tracked successfully via Kafka',
        productId: removeDto.productId,
        productName: removeDto.productName,
        quantity: removeDto.quantity,
        price: removeDto.price,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('❌ Error in trackRemoveFromCart controller:', error);
      return {
        success: false,
        message: 'Failed to track remove from cart',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      };
    }
  }

  @Get('health')
  async healthCheck() {
    return {
      success: true,
      message: 'Cart activity tracking service is healthy',
      timestamp: new Date().toISOString(),
    };
  }

  @Delete('remove/:productId')
  @UseGuards(JwtAuthGuard)
  async removeFromCart(
    @Param('productId') productId: string,
    @Body() removeDto: RemoveFromCartDto,
    @Req() req: AuthenticatedRequest,
  ) {
    try {
      console.log('Received remove from cart (DELETE) request:', {
        productId,
        body: removeDto,
        user: req.user?.id,
      });

      // Track remove from cart activity
      if (req.user && req.user.id) {
        await this.activityTrackingService.trackRemoveFromCart(
          req.user.id,
          {
            id: Number(productId),
            name: removeDto.productName,
            quantity: removeDto.quantity,
            price: removeDto.price,
          },
          req,
        );
      }

      return {
        success: true,
        message: 'Product removed from cart',
        productId: Number(productId),
      };
    } catch (error) {
      console.error('Error in removeFromCart controller:', error);
      return {
        success: false,
        message: 'Failed to remove product from cart',
        error: error.message,
      };
    }
  }
}
