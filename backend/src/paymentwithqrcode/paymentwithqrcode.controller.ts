// import { Controller, Post, Body, Get, Param } from '@nestjs/common';
// import { PaymentwithqrcodeService } from './paymentwithqrcode.service';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Paymentwithqrcode } from './entities/paymentwithqrcode.entity';

// @Controller('payment-qrcode')
// export class PaymentwithqrcodeController {
//   constructor(
//     private readonly paymentService: PaymentwithqrcodeService,
//     @InjectRepository(Paymentwithqrcode)
//     private paymentRepository: Repository<Paymentwithqrcode>,
//   ) {}

//   @Post('create')
//   async createOrderAndQRCode(
//     @Body()
//     body: {
//       amount: string;
//       productIds: string[];
//       quantities: number[];
//       userId: number;
//     },
//   ) {
//     return this.paymentService.createOrderAndQRCode(
//       body.amount,
//       body.productIds,
//       body.quantities,
//       body.userId,
//     );
//   }

//   @Post('verify/:paymentId')
//   async verifyPayment(@Param('paymentId') paymentId: number) {
//     return this.paymentService.verifyPayment(paymentId);
//   }
//   @Get('view/:paymentId')
//   async viewQRCode(@Param('paymentId') paymentId: number) {
//     const payment = await this.paymentRepository.findOne({
//       where: { id: paymentId },
//     });
//     return `
//       <html>
//         <head>
//           <title>Payment QR Code</title>
//           <style>
//             body {
//               display: flex;
//               flex-direction: column;
//               align-items: center;
//               justify-content: center;
//               height: 100vh;
//               margin: 0;
//               font-family: Arial, sans-serif;
//             }
//             img {
//               max-width: 300px;
//               margin: 20px;
//             }
//           </style>
//         </head>
//         <body>
//           <h2>Payment QR Code</h2>
//           <img src="${payment.qrCode}" alt="Payment QR Code">
//           <p>Amount: ${payment.amount}</p>
//           <p>Status: ${payment.status}</p>
//         </body>
//       </html>
//     `;
//   }
// }

// implement with stripe

import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentwithqrcodeService } from './paymentwithqrcode.service';
import { Repository } from 'typeorm';
import { Paymentwithqrcode } from './entities/paymentwithqrcode.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
    },
  ) {
    return this.paymentService.createOrderAndQRCode(
      body.amount,
      body.productIds,
      body.quantities,
      body.userId,
    );
  }

  @Post('verify/:paymentId')
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
          <title>Stripe Payment QR Code</title>
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
          </style>
        </head>
        <body>
          <h2>Stripe Payment QR Code</h2>
          <img src="${payment.qrCode}" alt="Payment QR Code">
          <p>Amount: ${payment.amount}</p>
          <p>Status: ${payment.status}</p>
        </body>
      </html>
    `;
  }
}
