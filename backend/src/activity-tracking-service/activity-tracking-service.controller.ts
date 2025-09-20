import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/strategies/roles.decorator';
import { ActivityTrackingService } from './activity-tracking-service.service';

@Controller('admin/activities')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminActivitiesController {
  constructor(
    private readonly activityTrackingService: ActivityTrackingService,
  ) {}

  @Get('recent')
  async getRecentActivities(@Query('limit') limit: number = 100) {
    return this.activityTrackingService.getRecentActivities(limit);
  }

  @Get('by-user')
  async getActivitiesByUser(
    @Query('userId') userId: number,
    @Query('limit') limit: number = 50,
  ) {
    return this.activityTrackingService.getActivitiesByUser(userId, limit);
  }

  @Get('by-type')
  async getActivitiesByType(
    @Query('type') activityType: string,
    @Query('limit') limit: number = 50,
  ) {
    return this.activityTrackingService.getActivitiesByType(
      activityType,
      limit,
    );
  }

  @Get('stats')
  async getActivityStats() {
    return this.activityTrackingService.getActivityStats();
  }
}
