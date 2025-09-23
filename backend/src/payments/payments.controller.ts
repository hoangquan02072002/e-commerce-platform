/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Req,
  Headers,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import EmailService from '../utils/emailService';

import Stripe from 'stripe';
import { Request } from 'express';

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
}
