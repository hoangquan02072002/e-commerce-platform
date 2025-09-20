import { Module } from '@nestjs/common';
import { CartactivityService } from './cartactivity.service';
import { CartactivityController } from './cartactivity.controller';
import { KafkaModule } from 'src/kafka/kafka.module';
import { ActivityTrackingService } from 'src/activity-tracking-service/activity-tracking-service.service';

@Module({
  imports: [KafkaModule],
  controllers: [CartactivityController],
  providers: [CartactivityService, ActivityTrackingService],
})
export class CartactivityModule {}
