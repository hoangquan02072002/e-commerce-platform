import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { PaymentwithqrcodeService } from './paymentwithqrcode.service';
import { Repository } from 'typeorm';
import { Paymentwithqrcode } from './entities/paymentwithqrcode.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';

@Controller('payment-qrcode')
export class PaymentwithqrcodeController {
  constructor(
    private readonly paymentService: PaymentwithqrcodeService,
    @InjectRepository(Paymentwithqrcode)
    private paymentRepository: Repository<Paymentwithqrcode>,
  ) {}

  @Post('create')
  async createOrderAndQRCode(
    @Body()
    body: {
      amount: string;
      productIds: string[];
      quantities: number[];
      userId: number;
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
  ) {
    const { amount, productIds, quantities, userId, ...userDetails } = body;
    return this.paymentService.createOrderAndQRCode(
      amount,
      productIds,
      quantities,
      userId,
      userDetails,
    );
  }

  @Get('verify/:paymentId')
  async verifyPayment(@Param('paymentId') paymentId: number) {
    return this.paymentService.verifyPayment(paymentId);
  }

  @Get('view/:paymentId')
  async viewQRCode(@Param('paymentId') paymentId: number) {
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
    });
    return `
      <html>
        <head>
          <title>Momo Payment QR Code</title>
          <style>
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              font-family: Arial, sans-serif;
            }
            img {
              max-width: 300px;
              margin: 20px;
            }
            .instructions {
              text-align: center;
              margin: 20px;
              padding: 20px;
              background-color: #f5f5f5;
              border-radius: 8px;
            }
          </style>
        </head>
        <body>
          <h2>Momo Payment QR Code</h2>
          <img src="${payment.qrCode}" alt="Payment QR Code">
          <p>Amount: ${payment.amount}</p>
          <p>Status: ${payment.status}</p>
          <div class="instructions">
            <h3>How to pay:</h3>
            <ol>
              <li>Open Momo app on your phone</li>
              <li>Tap on "Scan QR"</li>
              <li>Scan the QR code above</li>
              <li>Confirm the payment details</li>
              <li>Complete the payment</li>
            </ol>
          </div>
        </body>
      </html>
    `;
  }

  @Post('momo-ipn')
  @HttpCode(HttpStatus.OK)
  async handleMomoIPN(@Body() data: any, @Res() res: Response) {
    try {
      await this.paymentService.handleMomoIPN(data);
      res.status(HttpStatus.OK).send({ received: true });
    } catch (error) {
      console.error('IPN error:', error);
      res.status(HttpStatus.BAD_REQUEST).send(`IPN Error: ${error.message}`);
    }
  }
}
