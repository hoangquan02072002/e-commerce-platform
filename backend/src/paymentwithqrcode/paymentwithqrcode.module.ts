import { Module } from '@nestjs/common';
import { PaymentwithqrcodeService } from './paymentwithqrcode.service';
import { PaymentwithqrcodeController } from './paymentwithqrcode.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paymentwithqrcode } from './entities/paymentwithqrcode.entity';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { User } from '../users/entities/user.entity';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Paymentwithqrcode,
      Order,
      Product,
      OrderItem,
      User,
    ]),
    OrdersModule,
    ProductsModule,
    UsersModule,
  ],
  controllers: [PaymentwithqrcodeController],
  providers: [PaymentwithqrcodeService],
})
export class PaymentwithqrcodeModule {}
