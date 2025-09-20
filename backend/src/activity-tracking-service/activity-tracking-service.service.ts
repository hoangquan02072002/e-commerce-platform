/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class ActivityTrackingService {
  private readonly logger = new Logger(ActivityTrackingService.name);

  constructor(private readonly kafkaService: KafkaService) {}

  private generateSessionId(userId: number, req?: any): string {
    return req?.sessionID || `session-${userId}-${Date.now()}`;
  }

  private extractMetadata(req?: any) {
    return {
      ipAddress:
        req?.['ipAddress'] ||
        req?.ip ||
        req?.connection?.remoteAddress ||
        'unknown',
      userAgent:
        req?.['userAgent'] || req?.headers?.['user-agent'] || 'unknown',
      location: this.formatLocation(req?.['geo']) || 'Unknown',
      referrer: req?.headers?.referer || req?.headers?.referrer,
    };
  }

  private formatLocation(geo: any): string | undefined {
    if (!geo) return 'Unknown';
    if (
      geo.city === 'Local' &&
      geo.region === 'Local' &&
      geo.country === 'Local'
    ) {
      return 'Local Network';
    }
    const parts = [geo.city, geo.region, geo.country].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'Unknown';
  }

  // Track user login
  async trackUserLogin(userId: number, userInfo: any, req?: any) {
    try {
      const metadata = this.extractMetadata(req);
      const activity = {
        userId,
        userName: userInfo.name,
        userEmail: userInfo.email,
        sessionId: this.generateSessionId(userId, req),
        activityType: 'LOGIN' as const,
        data: {
          loginMethod: userInfo.loginMethod || 'email',
          deviceType: userInfo.deviceType || 'unknown',
          loginTime: new Date().toISOString(),
        },
        timestamp: new Date(),
        ...metadata,
      };

      await this.kafkaService.publishUserActivity(activity);
      this.logger.debug(`🔐 User login tracked: ${userId} (${userInfo.email})`);
      return activity;
    } catch (error) {
      this.logger.error('❌ Error tracking user login:', error);
      throw error;
    }
  }

  // Track user logout
  async trackUserLogout(userId: number, userInfo: any, req?: any) {
    try {
      const metadata = this.extractMetadata(req);
      const activity = {
        userId,
        userName: userInfo.name,
        userEmail: userInfo.email,
        sessionId: this.generateSessionId(userId, req),
        activityType: 'LOGOUT' as const,
        data: {
          logoutTime: new Date().toISOString(),
          sessionDuration: userInfo.sessionDuration || 0,
        },
        timestamp: new Date(),
        ...metadata,
      };

      await this.kafkaService.publishUserActivity(activity);
      this.logger.debug(
        `🚪 User logout tracked: ${userId} (${userInfo.email})`,
      );
      return activity;
    } catch (error) {
      this.logger.error('❌ Error tracking user logout:', error);
      throw error;
    }
  }

  // Track product view
  async trackProductView(userId: number, productData: any, req?: any) {
    try {
      const metadata = this.extractMetadata(req);
      const activity = {
        userId,
        userName: productData.userName,
        userEmail: productData.userEmail,
        sessionId: this.generateSessionId(userId, req),
        activityType: 'VIEW_PRODUCT' as const,
        data: {
          productId: productData.id || productData.productId,
          productName: productData.name || productData.productName,
          categoryName: productData.category?.name || productData.categoryName,
          price: productData.price,
          viewDuration: productData.viewDuration || 0,
        },
        timestamp: new Date(),
        ...metadata,
      };

      await this.kafkaService.publishUserActivity(activity);
      this.logger.debug(
        `👁️ Product view tracked: User ${userId} viewed product ${activity.data.productId}`,
      );
      return activity;
    } catch (error) {
      this.logger.error('❌ Error tracking product view:', error);
      throw error;
    }
  }

  // Track add to cart
  async trackAddToCart(userId: number, cartData: any, req?: any) {
    try {
      const metadata = this.extractMetadata(req);
      const activity = {
        userId,
        userName: cartData.userName,
        userEmail: cartData.userEmail,
        sessionId: this.generateSessionId(userId, req),
        activityType: 'ADD_TO_CART' as const,
        data: {
          productId: cartData.id || cartData.productId,
          productName: cartData.name || cartData.productName,
          quantity: cartData.quantity,
          price: cartData.price,
          totalCartValue:
            cartData.totalCartValue || cartData.price * cartData.quantity,
          cartItemCount: cartData.cartItemCount || 1,
          categoryName: cartData.category?.name || cartData.categoryName,
        },
        timestamp: new Date(),
        ...metadata,
      };

      await this.kafkaService.publishUserActivity(activity);
      this.logger.debug(
        `🛒 Add to cart tracked: User ${userId} added product ${activity.data.productId} (${activity.data.quantity}x)`,
      );
      return activity;
    } catch (error) {
      this.logger.error('❌ Error tracking add to cart:', error);
      throw error;
    }
  }

  // Track remove from cart
  async trackRemoveFromCart(userId: number, cartData: any, req?: any) {
    try {
      const metadata = this.extractMetadata(req);
      const activity = {
        userId,
        userName: cartData.userName,
        userEmail: cartData.userEmail,
        sessionId: this.generateSessionId(userId, req),
        activityType: 'REMOVE_FROM_CART' as const,
        data: {
          productId: cartData.id || cartData.productId,
          productName: cartData.name || cartData.productName,
          quantity: cartData.quantity,
          price: cartData.price,
          totalCartValue: cartData.totalCartValue,
          cartItemCount: cartData.cartItemCount,
        },
        timestamp: new Date(),
        ...metadata,
      };

      await this.kafkaService.publishUserActivity(activity);
      this.logger.debug(
        `🗑️ Remove from cart tracked: User ${userId} removed product ${activity.data.productId} (${activity.data.quantity}x)`,
      );
      return activity;
    } catch (error) {
      this.logger.error('❌ Error tracking remove from cart:', error);
      throw error;
    }
  }

  // Track search
  async trackSearch(userId: number, searchData: any, req?: any) {
    try {
      const metadata = this.extractMetadata(req);
      const activity = {
        userId,
        userName: searchData.userName,
        userEmail: searchData.userEmail,
        sessionId: this.generateSessionId(userId, req),
        activityType: 'SEARCH' as const,
        data: {
          searchQuery: searchData.searchQuery,
          resultsCount: searchData.resultsCount,
          categoryFilter: searchData.categoryFilter,
        },
        timestamp: new Date(),
        ...metadata,
      };

      await this.kafkaService.publishUserActivity(activity);
      this.logger.debug(
        `🔍 Search tracked: User ${userId} searched for "${searchData.searchQuery}"`,
      );
      return activity;
    } catch (error) {
      this.logger.error('❌ Error tracking search:', error);
      throw error;
    }
  }

  // Track purchase
  async trackPurchase(userId: number, orderData: any, req?: any) {
    try {
      const metadata = this.extractMetadata(req);
      const activity = {
        userId,
        userName: orderData.userName,
        userEmail: orderData.userEmail,
        sessionId: this.generateSessionId(userId, req),
        activityType: 'PURCHASE' as const,
        data: {
          orderId: orderData.orderId,
          totalAmount: orderData.totalAmount,
          items: orderData.items,
          paymentMethod: orderData.paymentMethod,
        },
        timestamp: new Date(),
        ...metadata,
      };

      await this.kafkaService.publishUserActivity(activity);
      this.logger.debug(
        `💰 Purchase tracked: User ${userId} made purchase ${orderData.orderId} for $${orderData.totalAmount}`,
      );
      return activity;
    } catch (error) {
      this.logger.error('❌ Error tracking purchase:', error);
      throw error;
    }
  }

  // Generic activity tracking method
  async trackActivity(
    userId: number,
    activityType: string,
    data: any,
    userInfo?: any,
    req?: any,
  ) {
    try {
      const metadata = this.extractMetadata(req);
      const activity = {
        userId,
        userName: userInfo?.name,
        userEmail: userInfo?.email,
        sessionId: this.generateSessionId(userId, req),
        activityType: activityType as any,
        data,
        timestamp: new Date(),
        ...metadata,
      };

      await this.kafkaService.publishUserActivity(activity);
      this.logger.debug(
        `📊 Activity tracked: ${activityType} for user ${userId}`,
      );
      return activity;
    } catch (error) {
      this.logger.error(`❌ Error tracking activity ${activityType}:`, error);
      throw error;
    }
  }

  // Get recent activities (for admin dashboard)
  async getRecentActivities(limit: number = 100): Promise<any[]> {
    // This would typically fetch from your database
    // For now, return empty array - you should implement database storage
    return [];
  }

  async getActivitiesByUser(
    userId: number,
    limit: number = 50,
  ): Promise<any[]> {
    // Implementation to fetch user-specific activities
    return [];
  }

  async getActivitiesByType(
    activityType: string,
    limit: number = 50,
  ): Promise<any[]> {
    // Implementation to fetch activities by type
    return [];
  }

  async getActivityStats(): Promise<any> {
    return {
      totalActivities: 0,
      activeUsers: 0,
      todayActivities: 0,
      recentLogins: 0,
    };
  }
}
