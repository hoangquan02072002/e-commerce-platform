import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  Req,
  Headers,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import EmailService from '../utils/emailService';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import Stripe from 'stripe';
import { Request } from 'express';
import * as QRCode from 'qrcode';

@Controller('payments')
export class PaymentsController {
  private tempStorage: Map<string, { email: string; paymentIntentId: string }> =
    new Map();
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly emailService: EmailService,
  ) {}
  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body()
    body: {
      amount: string;
      productId: string[];
      quantity: number[];
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
  ): Promise<Stripe.Checkout.Session> {
    const {
      amount,
      productId,
      quantity,
      userId,
      firstName,
      lastName,
      email,
      address,
      city,
      zipCode,
      phoneNumber,
      stateCountry,
      country,
    } = body; // Destructure the body to get the necessary parameters

    return this.paymentsService.createCheckoutSession(
      amount,
      productId,
      quantity,
      userId,
      firstName,
      lastName,
      email,
      address,
      city,
      zipCode,
      phoneNumber,
      stateCountry,
      country,
    );
  }
  @Post('webhook')
  async handleStripeWebhook(
    @Req() req: Request,
    @Headers('stripe-signature') sig: string,
  ) {
    try {
      await this.paymentsService.handleWebhook(req.rawBody, sig); // Pass rawBody to the service
      return { received: true }; // Respond to Stripe that the webhook was received
    } catch (error) {
      console.error('Webhook Error:', error);
      throw new HttpException('Webhook Error', HttpStatus.BAD_REQUEST); // Return an error response
    }
  }
  // @Post('webhook')
  // async handleStripeWebhook(
  //   @Req() req: Request,
  //   @Headers('stripe-signature') sig: string,
  // ) {
  //   const endpointSecret = process.env.WEB_HOOK_SECRET;
  //   let event: Stripe.Event;

  //   try {
  //     event = this.paymentsService['stripe'].webhooks.constructEvent(
  //       req.rawBody,
  //       sig,
  //       endpointSecret,
  //     );
  //   } catch (err) {
  //     return { error: `Webhook Error: ${err.message}` };
  //   }

  //   await this.paymentsService.handleWebhook(event);
  //   return { received: true };
  // }

  // implement payment qrcode
}
