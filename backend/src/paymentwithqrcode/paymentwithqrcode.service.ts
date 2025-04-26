import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../orders/entities/order.entity';
import { Paymentwithqrcode } from './entities/paymentwithqrcode.entity';
import * as QRCode from 'qrcode';
import axios from 'axios';
import * as crypto from 'crypto';
import * as https from 'https';

@Injectable()
export class PaymentwithqrcodeService {
  private readonly MOMO_PARTNER_CODE = 'MOMO';
  private readonly MOMO_ACCESS_KEY = 'F8BBA842ECF85';
  private readonly MOMO_SECRET_KEY = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  private readonly MOMO_API_ENDPOINT =
    'https://test-payment.momo.vn/v2/gateway/api/create';
  private readonly axiosInstance;

  constructor(
    @InjectRepository(Paymentwithqrcode)
    private paymentRepository: Repository<Paymentwithqrcode>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {
    // Configure axios instance with proper SSL settings
    this.axiosInstance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false, // Only for testing, remove in production
        keepAlive: true,
        timeout: 10000, // 10 seconds timeout
      }),
      timeout: 10000,
      maxRedirects: 5,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  private generateSignature(data: string): string {
    return crypto
      .createHmac('sha256', this.MOMO_SECRET_KEY)
      .update(data)
      .digest('hex');
  }

  private async makeMomoRequest(
    url: string,
    data: any,
    maxRetries = 3,
  ): Promise<any> {
    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await this.axiosInstance.post(url, data);
        return response.data;
      } catch (error) {
        lastError = error;
        console.error(`Momo API attempt ${attempt} failed:`, error.message);
        if (attempt < maxRetries) {
          // Wait before retrying (exponential backoff)
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, attempt) * 1000),
          );
        }
      }
    }
    throw new BadRequestException(
      `Failed to connect to Momo API after ${maxRetries} attempts: ${lastError.message}`,
    );
  }

  async createOrderAndQRCode(
    amount: string,
    productIds: string[],
    quantities: number[],
    userId: number,
    userDetails: {
      firstName: string;
      lastName: string;
      email: string;
      address: string;
      city: string;
      zipCode: string;
      phoneNumber: string;
      stateCountry: string;
      country: string;
    },
  ): Promise<{
    qrCode: string;
    orderId: number;
    paymentId: number;
    momoPayUrl: string;
  }> {
    try {
      // Create order
      const order = this.orderRepository.create({
        totalAmount: amount,
        status: OrderStatus.PENDING,
        paymentMethod: 'momo_qrcode',
        isPaid: false,
        user: { id: userId },
        ...userDetails,
      });

      await this.orderRepository.save(order);

      // Create Momo payment request
      const requestId = Date.now().toString();
      const orderId = `MOMO_${Date.now()}`;
      const rawSignature = `accessKey=${this.MOMO_ACCESS_KEY}&amount=${amount}&extraData=&ipnUrl=${process.env.MOMO_IPN_URL}&orderId=${orderId}&orderInfo=Payment for order ${order.id}&partnerCode=${this.MOMO_PARTNER_CODE}&redirectUrl=${process.env.MOMO_REDIRECT_URL}&requestId=${requestId}&requestType=captureWallet`;

      const signature = this.generateSignature(rawSignature);

      const requestBody = {
        partnerCode: this.MOMO_PARTNER_CODE,
        partnerName: 'Test',
        storeId: 'MomoTestStore',
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: `Payment for order ${order.id}`,
        redirectUrl: process.env.MOMO_REDIRECT_URL,
        ipnUrl: process.env.MOMO_IPN_URL,
        lang: 'vi',
        requestType: 'captureWallet',
        extraData: '',
        signature: signature,
      };

      // Make Momo API request with retries
      const momoResponse = await this.makeMomoRequest(
        this.MOMO_API_ENDPOINT,
        requestBody,
      );

      // Create payment record
      const payment = this.paymentRepository.create({
        amount: amount,
        status: OrderStatus.PENDING,
        order: order,
        paymentMethod: 'momo_qrcode',
        momoOrderId: orderId,
        momoRequestId: requestId,
        momoPayUrl: momoResponse.payUrl,
        momoDeepLink: momoResponse.deeplink,
      });

      await this.paymentRepository.save(payment);

      // Generate QR code from Momo payUrl
      const qrCode = await QRCode.toDataURL(momoResponse.payUrl);

      payment.qrCode = qrCode;
      await this.paymentRepository.save(payment);

      return {
        qrCode,
        orderId: order.id,
        paymentId: payment.id,
        momoPayUrl: momoResponse.payUrl,
      };
    } catch (error) {
      console.error('Momo payment error:', error);
      throw new BadRequestException(
        `Failed to create Momo payment: ${error.message}`,
      );
    }
  }

  async verifyPayment(paymentId: number): Promise<any> {
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
      relations: ['order'],
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    try {
      const rawSignature = `accessKey=${this.MOMO_ACCESS_KEY}&orderId=${payment.momoOrderId}&partnerCode=${this.MOMO_PARTNER_CODE}&requestId=${payment.momoRequestId}`;
      const signature = this.generateSignature(rawSignature);

      const response = await this.makeMomoRequest(
        `${process.env.MOMO_API_ENDPOINT}/query`,
        {
          partnerCode: this.MOMO_PARTNER_CODE,
          requestId: payment.momoRequestId,
          orderId: payment.momoOrderId,
          lang: 'vi',
          signature: signature,
        },
      );

      const result = response.data;

      if (result.resultCode === 0) {
        // Payment successful
        payment.status = 'completed';
        payment.order.status = OrderStatus.PENDING;
        payment.order.isPaid = true;
        payment.order.paidAt = new Date();

        await this.orderRepository.save(payment.order);
        await this.paymentRepository.save(payment);
      }

      return result;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw new BadRequestException('Failed to verify payment');
    }
  }

  async handleMomoIPN(data: any): Promise<void> {
    const { orderId, resultCode } = data;

    const payment = await this.paymentRepository.findOne({
      where: { momoOrderId: orderId },
      relations: ['order'],
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (resultCode === 0) {
      // Payment successful
      payment.status = 'completed';
      payment.order.status = OrderStatus.PENDING;
      payment.order.isPaid = true;
      payment.order.paidAt = new Date();

      await this.orderRepository.save(payment.order);
      await this.paymentRepository.save(payment);
    }
  }
}
