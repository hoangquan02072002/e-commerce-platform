import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { PaymentsModule } from './payments/payments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { Category } from './categories/entities/category.entity';
import { Notification } from './notifications/entities/notification.entity';
import { Order } from './orders/entities/order.entity';
import { Payment } from './payments/entities/payment.entity';
import { Product } from './products/entities/product.entity';
import { User } from './users/entities/user.entity';
import { Review } from './reviews/entities/review.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { MfaOtpModule } from './mfa-otp/mfa-otp.module';
import { MfaOtp } from './mfa-otp/entities/mfa-otp.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load environment variables
    CacheModule.register(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          Category,
          Notification,
          Order,
          Payment,
          Product,
          User,
          Review,
          OrderItem,
          MfaOtp,
          // ... other entities ...
        ],
        synchronize: true, // Disable in production
      }),
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // Must be true for port 465
        tls: {
          rejectUnauthorized: false, // Ignore certificate validation errors
        },
        // service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // Your email address
          pass: process.env.EMAIL_PASS, // Your email password
        },
      },
    }),
    TypeOrmModule.forFeature([Category]), // Ensure this is outside the forRootAsync
    DatabaseModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    PaymentsModule,
    ReviewsModule,
    NotificationsModule,
    UsersModule,
    MfaOtpModule,
    // ... other modules ...
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
