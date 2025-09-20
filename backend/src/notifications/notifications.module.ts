import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaModule } from '../kafka/kafka.module';
import { Notification } from './entities/notification.entity';
import { NotificationConsumerService } from './notification-consumer.service';
import { WebsocketModule } from '../websocket/websocket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    KafkaModule,
    WebsocketModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationConsumerService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
