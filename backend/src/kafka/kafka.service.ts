// import {
//   Injectable,
//   Inject,
//   OnModuleInit,
//   OnModuleDestroy,
//   Logger,
// } from '@nestjs/common';
// import { ClientKafka } from '@nestjs/microservices';

// export interface UserActivity {
//   userId: number;
//   sessionId?: string;
//   activityType:
//     | 'VIEW_PRODUCT'
//     | 'ADD_TO_CART'
//     | 'REMOVE_FROM_CART'
//     | 'VIEW_CATEGORY'
//     | 'SEARCH'
//     | 'LOGIN'
//     | 'LOGOUT'
//     | 'PURCHASE'
//     | 'PAGE_VIEW';
//   data: {
//     productId?: number;
//     categoryId?: number;
//     searchQuery?: string;
//     quantity?: number;
//     price?: number;
//     page?: string;
//     orderId?: number;
//     totalAmount?: number;
//     items?: any[];
//     resultsCount?: number;
//     [key: string]: any;
//   };
//   timestamp: Date;
//   ipAddress?: string;
//   userAgent?: string;
//   location?: string;
// }

// @Injectable()
// export class KafkaService implements OnModuleInit, OnModuleDestroy {
//   private readonly logger = new Logger(KafkaService.name);
//   private isConnected = false;

//   constructor(
//     @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
//   ) {}

//   async onModuleInit() {
//     try {
//       // Subscribe to topics - including new user activity topics
//       const topics = [
//         'order-status-updates',
//         'user-activities',
//         'user-activity-analytics',
//       ];

//       topics.forEach((topic) => {
//         this.kafkaClient.subscribeToResponseOf(topic);
//       });

//       // Wait for connection with timeout
//       await Promise.race([
//         this.kafkaClient.connect(),
//         new Promise((_, reject) =>
//           setTimeout(
//             () => reject(new Error('Kafka connection timeout')),
//             15000,
//           ),
//         ),
//       ]);

//       this.isConnected = true;
//       this.logger.log('Successfully connected to Kafka');
//     } catch (error) {
//       this.logger.error('Failed to connect to Kafka:', error);
//       this.isConnected = false;
//       // Don't throw error to prevent application from crashing
//     }
//   }

//   async onModuleDestroy() {
//     try {
//       if (this.isConnected) {
//         await this.kafkaClient.close();
//         this.logger.log('Kafka connection closed');
//         this.isConnected = false;
//       }
//     } catch (error) {
//       this.logger.error('Error closing Kafka connection:', error);
//     }
//   }

//   async sendMessage(topic: string, message: any) {
//     try {
//       if (!this.isConnected) {
//         this.logger.warn(
//           `Kafka not connected. Message to topic ${topic} will be skipped.`,
//         );
//         return null;
//       }

//       const result = this.kafkaClient.emit(topic, {
//         key: String(Date.now()),
//         value: typeof message === 'string' ? message : JSON.stringify(message),
//       });

//       this.logger.log(`Message sent to topic ${topic}`);
//       return result;
//     } catch (error) {
//       this.logger.error(
//         `Error sending message to Kafka topic ${topic}:`,
//         error,
//       );
//       // Don't throw error, just log it to prevent breaking the application
//       return null;
//     }
//   }

//   // Enhanced method for user activity tracking
//   async publishUserActivity(activity: UserActivity): Promise<void> {
//     try {
//       if (!this.isConnected) {
//         this.logger.warn('Kafka not connected. User activity will be skipped.');
//         return;
//       }

//       // Validate required fields
//       if (!activity.userId || activity.userId <= 0) {
//         this.logger.warn('Invalid userId in activity. Skipping.');
//         return;
//       }

//       const message = {
//         key: `user-${activity.userId}-${Date.now()}`,
//         value: {
//           ...activity,
//           timestamp: activity.timestamp.toISOString(),
//         },
//         headers: {
//           'activity-type': activity.activityType,
//           'user-id': activity.userId.toString(),
//           timestamp: activity.timestamp.toISOString(),
//         },
//       };

//       this.kafkaClient.emit('user-activities', message);

//       this.logger.debug(
//         `User activity published: ${activity.activityType} by user ${activity.userId}`,
//       );
//     } catch (error) {
//       this.logger.error('Error publishing user activity:', error);
//       // Don't throw error to prevent breaking user experience
//     }
//   }

//   // Batch publish for high-volume activities
//   async publishUserActivitiesBatch(activities: UserActivity[]): Promise<void> {
//     try {
//       if (!this.isConnected) {
//         this.logger.warn(
//           'Kafka not connected. Batch user activities will be skipped.',
//         );
//         return;
//       }

//       // Filter out invalid activities
//       const validActivities = activities.filter(
//         (activity) => activity.userId && activity.userId > 0,
//       );

//       if (validActivities.length === 0) {
//         this.logger.warn('No valid activities in batch. Skipping.');
//         return;
//       }

//       const promises = validActivities.map((activity) =>
//         this.publishUserActivity(activity),
//       );

//       await Promise.allSettled(promises);

//       this.logger.log(
//         `Published batch of ${validActivities.length} user activities`,
//       );
//     } catch (error) {
//       this.logger.error('Error publishing user activities batch:', error);
//     }
//   }

//   // Method to send analytics data
//   async sendAnalyticsData(analyticsType: string, data: any): Promise<void> {
//     try {
//       if (!this.isConnected) {
//         this.logger.warn(
//           'Kafka not connected. Analytics data will be skipped.',
//         );
//         return;
//       }

//       const message = {
//         key: `analytics-${analyticsType}-${Date.now()}`,
//         value: {
//           type: analyticsType,
//           data,
//           timestamp: new Date().toISOString(),
//         },
//       };

//       await this.sendMessage('user-activity-analytics', message);
//       this.logger.debug(`Analytics data sent: ${analyticsType}`);
//     } catch (error) {
//       this.logger.error('Error sending analytics data:', error);
//     }
//   }

//   // Check if Kafka is connected
//   isKafkaConnected(): boolean {
//     return this.isConnected;
//   }

//   // Health check method
//   async healthCheck(): Promise<{
//     status: string;
//     connected: boolean;
//     timestamp: string;
//   }> {
//     return {
//       status: this.isConnected ? 'healthy' : 'disconnected',
//       connected: this.isConnected,
//       timestamp: new Date().toISOString(),
//     };
//   }

//   // Retry connection method
//   async retryConnection(): Promise<void> {
//     if (!this.isConnected) {
//       this.logger.log('Attempting to reconnect to Kafka...');
//       await this.onModuleInit();
//     } else {
//       this.logger.log('Kafka is already connected');
//     }
//   }

//   // Add this getter to expose kafkaClient for backward compatibility
//   public getKafkaClient(): ClientKafka {
//     return this.kafkaClient;
//   }

//   // Method to create activity tracking helper
//   createActivityHelper(userId: number, req?: any) {
//     return {
//       trackProductView: (productId: number) =>
//         this.publishUserActivity({
//           userId,
//           activityType: 'VIEW_PRODUCT',
//           data: { productId },
//           timestamp: new Date(),
//           sessionId: req?.sessionID || `session-${userId}-${Date.now()}`,
//           ipAddress: req?.['ipAddress'] || req?.ip,
//           userAgent: req?.['userAgent'] || req?.headers?.['user-agent'],
//           location: this.formatLocation(req?.['geo']),
//         }),

//       trackAddToCart: (productId: number, quantity: number, price: number) =>
//         this.publishUserActivity({
//           userId,
//           activityType: 'ADD_TO_CART',
//           data: { productId, quantity, price },
//           timestamp: new Date(),
//           sessionId: req?.sessionID || `session-${userId}-${Date.now()}`,
//           ipAddress: req?.['ipAddress'] || req?.ip,
//           userAgent: req?.['userAgent'] || req?.headers?.['user-agent'],
//           location: this.formatLocation(req?.['geo']),
//         }),

//       trackPageView: (page: string) =>
//         this.publishUserActivity({
//           userId,
//           activityType: 'PAGE_VIEW',
//           data: { page },
//           timestamp: new Date(),
//           sessionId: req?.sessionID || `session-${userId}-${Date.now()}`,
//           ipAddress: req?.['ipAddress'] || req?.ip,
//           userAgent: req?.['userAgent'] || req?.headers?.['user-agent'],
//           location: this.formatLocation(req?.['geo']),
//         }),
//     };
//   }

//   private formatLocation(geo: any): string {
//     if (!geo) return null;

//     if (
//       geo.city === 'Local' &&
//       geo.region === 'Local' &&
//       geo.country === 'Local'
//     ) {
//       return 'Local Network';
//     }

//     const parts = [geo.city, geo.region, geo.country].filter(Boolean);
//     return parts.join(', ') || null;
//   }
// }

import {
  Injectable,
  Inject,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

export interface UserActivity {
  userId: number;
  userName?: string;
  userEmail?: string;
  sessionId?: string;
  activityType:
    | 'VIEW_PRODUCT'
    | 'ADD_TO_CART'
    | 'REMOVE_FROM_CART'
    | 'VIEW_CATEGORY'
    | 'SEARCH'
    | 'LOGIN'
    | 'LOGOUT'
    | 'PURCHASE'
    | 'PAGE_VIEW';
  data: {
    productId?: number;
    productName?: string;
    categoryId?: number;
    searchQuery?: string;
    quantity?: number;
    price?: number;
    page?: string;
    orderId?: number;
    totalAmount?: number;
    items?: any[];
    resultsCount?: number;
    loginMethod?: string;
    deviceType?: string;
    loginTime?: string;
    logoutTime?: string;
    sessionDuration?: number;
    [key: string]: any;
  };
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
}

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);
  private isConnected = false;
  private websocketGateway: any; // Will be injected

  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    try {
      // Subscribe to topics - including new user activity topics
      const topics = [
        'order-status-updates',
        'user-activities',
        'user-activity-analytics',
      ];

      topics.forEach((topic) => {
        this.kafkaClient.subscribeToResponseOf(topic);
      });

      // Wait for connection with timeout
      await Promise.race([
        this.kafkaClient.connect(),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error('Kafka connection timeout')),
            15000,
          ),
        ),
      ]);

      this.isConnected = true;
      this.logger.log('✅ Successfully connected to Kafka');
    } catch (error) {
      this.logger.error('❌ Failed to connect to Kafka:', error);
      this.isConnected = false;
      // Don't throw error to prevent application from crashing
    }
  }

  async onModuleDestroy() {
    try {
      if (this.isConnected) {
        await this.kafkaClient.close();
        this.logger.log('✅ Kafka connection closed');
        this.isConnected = false;
      }
    } catch (error) {
      this.logger.error('❌ Error closing Kafka connection:', error);
    }
  }

  // Set WebSocket gateway for sending real-time updates to admin
  setWebSocketGateway(gateway: any) {
    this.websocketGateway = gateway;
    this.logger.log('✅ WebSocket gateway connected to Kafka service');
  }

  async sendMessage(topic: string, message: any) {
    try {
      if (!this.isConnected) {
        this.logger.warn(
          `⚠️ Kafka not connected. Message to topic ${topic} will be skipped.`,
        );
        return null;
      }

      const result = this.kafkaClient.emit(topic, {
        key: String(Date.now()),
        value: typeof message === 'string' ? message : JSON.stringify(message),
      });

      this.logger.debug(`📤 Message sent to topic ${topic}`);
      return result;
    } catch (error) {
      this.logger.error(
        `❌ Error sending message to Kafka topic ${topic}:`,
        error,
      );
      // Don't throw error, just log it to prevent breaking the application
      return null;
    }
  }

  // Enhanced method for user activity tracking with WebSocket integration
  async publishUserActivity(activity: UserActivity): Promise<void> {
    try {
      // Validate required fields
      if (!activity.userId || activity.userId <= 0) {
        this.logger.warn('⚠️ Invalid userId in activity. Skipping.');
        return;
      }

      this.logger.debug(
        `📊 Publishing user activity: ${activity.activityType} for user ${activity.userId}`,
      );

      // Send to Kafka if connected
      if (this.isConnected) {
        const message = {
          key: `user-${activity.userId}-${Date.now()}`,
          value: {
            ...activity,
            timestamp: activity.timestamp.toISOString(),
          },
          headers: {
            'activity-type': activity.activityType,
            'user-id': activity.userId.toString(),
            timestamp: activity.timestamp.toISOString(),
          },
        };

        this.kafkaClient.emit('user-activities', message);
        this.logger.debug(
          `📤 Activity sent to Kafka: ${activity.activityType}`,
        );
      }

      // Send to WebSocket (admin dashboard) in real-time
      if (this.websocketGateway) {
        const activityForAdmin = {
          id: Date.now(),
          userId: activity.userId,
          userName: activity.userName,
          userEmail: activity.userEmail,
          activityType: activity.activityType,
          data: activity.data,
          timestamp: activity.timestamp.toISOString(),
          ipAddress: activity.ipAddress,
          userAgent: activity.userAgent,
          location: activity.location,
          sessionId: activity.sessionId,
        };

        // Send to all admins via WebSocket
        this.websocketGateway.sendToAdmins(
          'kafkaUserActivity',
          activityForAdmin,
        );

        // Also send to admin dashboard room
        // this.websocketGateway.sendToRoom(
        //   'admin-dashboard',
        //   'kafkaUserActivity',
        //   activityForAdmin,
        // );

        this.logger.debug(
          `📡 Activity sent to admin dashboard via WebSocket: ${activity.activityType}`,
        );
      } else {
        this.logger.warn(
          '⚠️ WebSocket gateway not available for real-time admin updates',
        );
      }

      this.logger.debug(
        `✅ User activity published successfully: ${activity.activityType} by user ${activity.userId}`,
      );
    } catch (error) {
      this.logger.error('❌ Error publishing user activity:', error);
      // Don't throw error to prevent breaking user experience
    }
  }

  // Batch publish for high-volume activities
  async publishUserActivitiesBatch(activities: UserActivity[]): Promise<void> {
    try {
      if (!this.isConnected && !this.websocketGateway) {
        this.logger.warn(
          '⚠️ Neither Kafka nor WebSocket available. Batch user activities will be skipped.',
        );
        return;
      }

      // Filter out invalid activities
      const validActivities = activities.filter(
        (activity) => activity.userId && activity.userId > 0,
      );

      if (validActivities.length === 0) {
        this.logger.warn('⚠️ No valid activities in batch. Skipping.');
        return;
      }

      const promises = validActivities.map((activity) =>
        this.publishUserActivity(activity),
      );

      await Promise.allSettled(promises);

      this.logger.log(
        `📊 Published batch of ${validActivities.length} user activities`,
      );
    } catch (error) {
      this.logger.error('❌ Error publishing user activities batch:', error);
    }
  }

  // Method to send analytics data
  async sendAnalyticsData(analyticsType: string, data: any): Promise<void> {
    try {
      if (!this.isConnected) {
        this.logger.warn(
          '⚠️ Kafka not connected. Analytics data will be skipped.',
        );
        return;
      }

      const message = {
        key: `analytics-${analyticsType}-${Date.now()}`,
        value: {
          type: analyticsType,
          data,
          timestamp: new Date().toISOString(),
        },
      };

      await this.sendMessage('user-activity-analytics', message);
      this.logger.debug(`📈 Analytics data sent: ${analyticsType}`);
    } catch (error) {
      this.logger.error('❌ Error sending analytics data:', error);
    }
  }

  // Check if Kafka is connected
  isKafkaConnected(): boolean {
    return this.isConnected;
  }

  // Health check method
  async healthCheck(): Promise<{
    status: string;
    connected: boolean;
    timestamp: string;
    websocketConnected: boolean;
  }> {
    return {
      status: this.isConnected ? 'healthy' : 'disconnected',
      connected: this.isConnected,
      websocketConnected: !!this.websocketGateway,
      timestamp: new Date().toISOString(),
    };
  }

  // Retry connection method
  async retryConnection(): Promise<void> {
    if (!this.isConnected) {
      this.logger.log('🔄 Attempting to reconnect to Kafka...');
      await this.onModuleInit();
    } else {
      this.logger.log('✅ Kafka is already connected');
    }
  }

  // Add this getter to expose kafkaClient for backward compatibility
  public getKafkaClient(): ClientKafka {
    return this.kafkaClient;
  }

  // Method to create activity tracking helper
  createActivityHelper(userId: number, req?: any) {
    return {
      trackProductView: (productId: number) =>
        this.publishUserActivity({
          userId,
          activityType: 'VIEW_PRODUCT',
          data: { productId },
          timestamp: new Date(),
          sessionId: req?.sessionID || `session-${userId}-${Date.now()}`,
          ipAddress: req?.['ipAddress'] || req?.ip,
          userAgent: req?.['userAgent'] || req?.headers?.['user-agent'],
          location: this.formatLocation(req?.['geo']),
        }),

      trackAddToCart: (productId: number, quantity: number, price: number) =>
        this.publishUserActivity({
          userId,
          activityType: 'ADD_TO_CART',
          data: { productId, quantity, price },
          timestamp: new Date(),
          sessionId: req?.sessionID || `session-${userId}-${Date.now()}`,
          ipAddress: req?.['ipAddress'] || req?.ip,
          userAgent: req?.['userAgent'] || req?.headers?.['user-agent'],
          location: this.formatLocation(req?.['geo']),
        }),

      trackPageView: (page: string) =>
        this.publishUserActivity({
          userId,
          activityType: 'PAGE_VIEW',
          data: { page },
          timestamp: new Date(),
          sessionId: req?.sessionID || `session-${userId}-${Date.now()}`,
          ipAddress: req?.['ipAddress'] || req?.ip,
          userAgent: req?.['userAgent'] || req?.headers?.['user-agent'],
          location: this.formatLocation(req?.['geo']),
        }),
    };
  }

  private formatLocation(geo: any): string {
    if (!geo) return 'Unknown';

    if (
      geo.city === 'Local' &&
      geo.region === 'Local' &&
      geo.country === 'Local'
    ) {
      return 'Local Network';
    }

    const parts = [geo.city, geo.region, geo.country].filter(Boolean);
    return parts.join(', ') || 'Unknown';
  }
}
