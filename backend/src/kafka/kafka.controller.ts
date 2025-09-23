import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Logger,
  ValidationPipe,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { CreateKafkaDto } from './dto/create-kafka.dto';
import { UpdateKafkaDto } from './dto/update-kafka.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { TrackActivityDto } from './dto/user-activity.dto';

// Extend Request interface to include user from your auth system
interface ExtendedRequest extends Request {
  user?: {
    id: number;
    userId?: number;
    email: string;
    name: string;
    role?: string;
    [key: string]: any;
  };
  sessionID?: string;
  session?: any;
}

@Controller('kafka')
export class KafkaController {
  private readonly logger = new Logger(KafkaController.name);

  constructor(private readonly kafkaService: KafkaService) {}

  @Get('health')
  async healthCheck() {
    try {
      const health = await this.kafkaService.healthCheck();
      return {
        success: true,
        ...health,
      };
    } catch (error) {
      this.logger.error('Health check failed:', error);
      return {
        success: false,
        status: 'error',
        connected: false,
        timestamp: new Date().toISOString(),
        error: error.message,
      };
    }
  }

  // Track user activity endpoint
  @Post('track-activity')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async trackActivity(
    @Body() trackActivityDto: TrackActivityDto,
    @Req() req: ExtendedRequest,
  ) {
    try {
      this.logger.log('📊 Track activity endpoint called');

      // Log the incoming request for debugging
      console.log('📥 Incoming request:', {
        user: req.user,
        body: trackActivityDto,
        headers: {
          'content-type': req.headers['content-type'],
          authorization: req.headers.authorization ? 'Bearer ***' : 'missing',
        },
      });

      // Check authentication
      if (!req.user?.id) {
        this.logger.warn('⚠️ User not authenticated');
        throw new BadRequestException({
          success: false,
          message: 'User not authenticated',
          user: req.user,
        });
      }

      // Validate request body
      if (!trackActivityDto) {
        throw new BadRequestException({
          success: false,
          message: 'Request body is required',
        });
      }

      if (!trackActivityDto.activityType) {
        throw new BadRequestException({
          success: false,
          message: 'activityType is required',
          received: trackActivityDto,
        });
      }

      if (!trackActivityDto.data) {
        throw new BadRequestException({
          success: false,
          message: 'data field is required',
          received: trackActivityDto,
        });
      }

      // Validate activityType
      const validActivityTypes = [
        'VIEW_PRODUCT',
        'ADD_TO_CART',
        'REMOVE_FROM_CART',
        'VIEW_CATEGORY',
        'SEARCH',
        'LOGIN',
        'LOGOUT',
        'PURCHASE',
        'PAGE_VIEW',
      ] as const;

      if (!validActivityTypes.includes(trackActivityDto.activityType as any)) {
        throw new BadRequestException({
          success: false,
          message: `Invalid activity type: ${trackActivityDto.activityType}`,
          validTypes: validActivityTypes,
          received: trackActivityDto.activityType,
        });
      }

      // Create the activity object with user info and metadata
      const activity = {
        userId: req.user.id,
        sessionId: req.sessionID || `session-${req.user.id}-${Date.now()}`,
        activityType:
          trackActivityDto.activityType as (typeof validActivityTypes)[number],
        data: trackActivityDto.data,
        timestamp: new Date(trackActivityDto.timestamp || Date.now()),
        ipAddress: req.ip || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown',
        location: this.extractLocation(req),
      };

      this.logger.log('📤 Sending activity to Kafka service:', {
        userId: activity.userId,
        activityType: activity.activityType,
        dataKeys: Object.keys(activity.data),
      });

      // Send to Kafka
      await this.kafkaService.publishUserActivity(activity);

      this.logger.log('✅ Activity tracked successfully');

      return {
        success: true,
        message: 'Activity tracked successfully',
        activityType: trackActivityDto.activityType,
        userId: req.user.id,
        timestamp: activity.timestamp,
      };
    } catch (error) {
      this.logger.error('❌ Error tracking activity:', error);

      if (error instanceof BadRequestException) {
        throw error; // Re-throw validation errors
      }

      return {
        success: false,
        message: 'Failed to track activity',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      };
    }
  }

  // Get Kafka status
  @Get('status')
  async getStatus() {
    try {
      const isConnected = this.kafkaService.isKafkaConnected();
      return {
        success: true,
        connected: isConnected,
        status: isConnected ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error('Error getting status:', error);
      return {
        success: false,
        status: 'error',
        connected: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Helper method to extract location info
  private extractLocation(req: ExtendedRequest): string | undefined {
    const forwarded = req.headers['x-forwarded-for'] as string;
    const ip = forwarded ? forwarded.split(',')[0] : req.ip;
    return ip === '127.0.0.1' || ip === '::1' ? 'Local' : 'Unknown';
  }

  // Original CRUD methods
  @Post()
  create(@Body() createKafkaDto: CreateKafkaDto) {
    return {
      success: true,
      message: 'Kafka entity created',
      data: createKafkaDto,
    };
  }

  @Get()
  findAll() {
    return {
      success: true,
      message: 'All Kafka entities retrieved',
      data: [],
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return {
      success: true,
      message: `Kafka entity #${id} retrieved`,
      data: { id: +id },
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKafkaDto: UpdateKafkaDto) {
    return {
      success: true,
      message: `Kafka entity #${id} updated`,
      data: { id: +id, ...updateKafkaDto },
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return {
      success: true,
      message: `Kafka entity #${id} removed`,
    };
  }
}
