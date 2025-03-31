// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Order } from '../orders/entities/order.entity';
// import { OrderItem } from '../orders/entities/order-item.entity';
// import { Product } from '../products/entities/product.entity';
// import * as QRCode from 'qrcode';
// import { Paymentwithqrcode } from './entities/paymentwithqrcode.entity';

// @Injectable()
// export class PaymentwithqrcodeService {
//   constructor(
//     @InjectRepository(Paymentwithqrcode)
//     private paymentRepository: Repository<Paymentwithqrcode>,
//     @InjectRepository(Order)
//     private orderRepository: Repository<Order>,
//     @InjectRepository(OrderItem)
//     private orderItemRepository: Repository<OrderItem>,
//     @InjectRepository(Product)
//     private productRepository: Repository<Product>,
//   ) {}

// async createOrderAndQRCode(
//   amount: string,
//   productIds: string[],
//   quantities: number[],
//   userId: number,
// ): Promise<{ qrCode: string; orderId: number; paymentId: number }> {
//   // Create order
//   const order = this.orderRepository.create({
//     totalAmount: amount,
//     status: 'pending',
//     paymentMethod: 'qrcode',
//     isPaid: false,
//     user: { id: userId },
//   });

//   await this.orderRepository.save(order);

//   // Create order items
//   const orderItems = await Promise.all(
//     productIds.map(async (productId, index) => {
//       const product = await this.productRepository.findOne({
//         where: { id: parseInt(productId, 10) },
//       });

//       return this.orderItemRepository.create({
//         quantity: quantities[index],
//         price: parseFloat(amount) / quantities[index],
//         order: order,
//         product: product,
//       });
//     }),
//   );

//   await this.orderItemRepository.save(orderItems);

//   // Create payment record
//   const payment = this.paymentRepository.create({
//     amount: amount,
//     status: 'pending',
//     order: order,
//     paymentMethod: 'qrcode',
//   });

//   await this.paymentRepository.save(payment);

//   // Generate QR code
//   const paymentData = {
//     paymentId: payment.id,
//     orderId: order.id,
//     amount: amount,
//   };

//   const qrCode = await QRCode.toDataURL(JSON.stringify(paymentData));
//   payment.qrCode = qrCode;
//   await this.paymentRepository.save(payment);

//   return {
//     qrCode,
//     orderId: order.id,
//     paymentId: payment.id,
//   };
// }

// async verifyPayment(paymentId: number): Promise<Paymentwithqrcode> {
//   const payment = await this.paymentRepository.findOne({
//     where: { id: paymentId },
//     relations: ['order'],
//   });

//   if (!payment) {
//     throw new NotFoundException('Payment not found');
//   }

//   // Update payment status
//   payment.status = 'completed';
//   payment.transactionId = `QR_${Date.now()}`;

//   // Update order status
//   payment.order.status = 'completed';
//   payment.order.isPaid = true;
//   payment.order.paidAt = new Date();

//   await this.orderRepository.save(payment.order);
//   await this.paymentRepository.save(payment);

//   return payment;
// }
// implement with stripe
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
import * as QRCode from 'qrcode';
import { Paymentwithqrcode } from './entities/paymentwithqrcode.entity';
import Stripe from 'stripe';

@Injectable()
export class PaymentwithqrcodeService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Paymentwithqrcode)
    private paymentRepository: Repository<Paymentwithqrcode>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {
    this.stripe = new Stripe(
      'sk_test_51PsgZxJ7yblNqdVjMKWnmeXNHyvOtpeJl23RLUKbVr94OkKbqgpjnLgTEmbzOQLH8bSjdOq6q3qWCBSrH4zanzg300uyPVHCFG',
    );
  }

  async createOrderAndQRCode(
    amount: string,
    productIds: string[],
    quantities: number[],
    userId: number,
  ): Promise<{ qrCode: string; orderId: number; paymentId: number }> {
    // Create order
    const order = this.orderRepository.create({
      totalAmount: amount,
      status: 'pending',
      paymentMethod: 'stripe_qrcode',
      isPaid: false,
      user: { id: userId },
    });

    await this.orderRepository.save(order);

    // Create order items
    const orderItems = await Promise.all(
      productIds.map(async (productId, index) => {
        const product = await this.productRepository.findOne({
          where: { id: parseInt(productId, 10) },
        });

        return this.orderItemRepository.create({
          quantity: quantities[index],
          price: parseFloat(amount) / quantities[index],
          order: order,
          product: product,
        });
      }),
    );

    await this.orderItemRepository.save(orderItems);

    // Create Stripe payment intent
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(parseFloat(amount) * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        orderId: order.id,
        userId: userId,
      },
    });

    // Create payment record
    const payment = this.paymentRepository.create({
      amount: amount,
      status: 'pending',
      order: order,
      paymentMethod: 'stripe_qrcode',
      transactionId: paymentIntent.id,
    });

    await this.paymentRepository.save(payment);

    // Generate QR code with Stripe payment intent client secret
    const paymentData = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      amount: amount,
      orderId: order.id,
    };

    const qrCode = await QRCode.toDataURL(JSON.stringify(paymentData));
    payment.qrCode = qrCode;
    await this.paymentRepository.save(payment);

    return {
      qrCode,
      orderId: order.id,
      paymentId: payment.id,
    };
  }

  async verifyPayment(paymentId: number): Promise<Paymentwithqrcode> {
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
      relations: ['order'],
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    // Verify payment with Stripe
    const paymentIntent = await this.stripe.paymentIntents.retrieve(
      payment.transactionId,
    );

    if (paymentIntent.status === 'succeeded') {
      // Update payment status
      payment.status = 'completed';
      payment.transactionId = paymentIntent.id;

      // Update order status
      payment.order.status = 'completed';
      payment.order.isPaid = true;
      payment.order.paidAt = new Date();

      await this.orderRepository.save(payment.order);
      await this.paymentRepository.save(payment);
    }

    return payment;
  }
}
