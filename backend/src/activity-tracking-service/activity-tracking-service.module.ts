import { ActivityTrackingService } from './activity-tracking-service.service';
import { Module } from '@nestjs/common';

import { AdminActivitiesController } from './activity-tracking-service.controller';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [AdminActivitiesController],
  providers: [ActivityTrackingService],
  exports: [ActivityTrackingService],
})
export class ActivityTrackingServiceModule {}
