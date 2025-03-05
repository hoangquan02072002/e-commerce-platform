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
      amount: number;
      currency: string;
      productId: string;
      quantity: number;
    },
  ): Promise<Stripe.Checkout.Session> {
    const { amount, currency, productId, quantity } = body; // Destructure the body to get the necessary parameters

    return this.paymentsService.createCheckoutSession(
      amount,
      currency,
      productId,
      quantity,
    ); // Call the service method to create the session
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
}
