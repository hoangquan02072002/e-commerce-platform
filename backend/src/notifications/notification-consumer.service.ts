// implement kafka with websocket
import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { WebsocketService } from '../websocket/websocket.service';

@Injectable()
export class NotificationConsumerService implements OnModuleInit {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly websocketGateway: WebsocketService,
  ) {}

  onModuleInit() {
    console.log('NotificationConsumerService initialized');
  }

  @EventPattern('order-status-updates')
  async consumeOrderStatusUpdates(data: any) {
    try {
      if (!data || !data.value) return;

      const message = JSON.parse(data.value.toString());
      const { orderId, userId, previousStatus, newStatus } = message;

      // Create a user-friendly notification message
      const notificationMessage = this.createStatusUpdateMessage(
        orderId,
        previousStatus,
        newStatus,
      );

      // Create a notification for the user
      const notificationDto: CreateNotificationDto = {
        message: notificationMessage,
        type: 'ORDER_STATUS_UPDATE',
        userId: userId,
      };

      const notification =
        await this.notificationsService.create(notificationDto);

      // Send real-time notification via WebSocket
      this.websocketGateway.sendNotificationToUser(userId, {
        id: notification.id,
        message: notificationMessage,
        type: 'ORDER_STATUS_UPDATE',
        createdAt: notification.createdAt,
      });

      console.log(`Created notification for order ${orderId} status change`);
    } catch (error) {
      console.error('Error processing order status update:', error);
    }
  }

  private createStatusUpdateMessage(
    orderId: number,
    previousStatus: string,
    newStatus: string,
  ): string {
    return `Your order #${orderId} status has changed from ${previousStatus} to ${newStatus}.`;
  }
}
