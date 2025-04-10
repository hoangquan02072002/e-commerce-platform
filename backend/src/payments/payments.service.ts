import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Stripe from 'stripe';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../orders/entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;
  private readonly logger = new Logger(PaymentsService.name);
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.stripe = new Stripe(
      'sk_test_51PsgZxJ7yblNqdVjMKWnmeXNHyvOtpeJl23RLUKbVr94OkKbqgpjnLgTEmbzOQLH8bSjdOq6q3qWCBSrH4zanzg300uyPVHCFG',
    );
  }
  async createCheckoutSession(
    amount: string,
    productIds: string[], // Array of product IDs
    quantities: number[], // Array of quantities corresponding to each product
    userId: number, // User ID for better data management
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    city: string,
    zipCode: string,
    phoneNumber: string,
    stateCountry: string,
    country: string,
  ): Promise<Stripe.Checkout.Session> {
    try {
      const numericAmount = parseFloat(amount);
      // Create line items based on the product IDs and quantities
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        await Promise.all(
          productIds.map(async (productId, index) => {
            const product = await this.productRepository.findOne({
              where: { id: parseInt(productId, 10) },
            });

            return {
              price_data: {
                currency: 'USD',
                product_data: {
                  name: product?.name || 'Unknown Product', // Use product name or a default
                },
                unit_amount: numericAmount * 100, // Amount is in cents
              },
              quantity: quantities[index], // Specify the quantity of the product
            };
          }),
        );

      const session = await this.stripe.checkout.sessions.create({
        line_items: lineItems, // Use the created line items
        mode: 'payment', // Set the mode to 'payment'
        success_url: `http://localhost:4242/success.html`, // Redirect URL on success
        cancel_url: `http://localhost:4242/cancel.html`, // Redirect URL on cancellation
        metadata: {
          productIds: productIds.join(','), // Add product IDs to metadata as a comma-separated string
          userId: userId, // Pass the user ID
          firstName: firstName,
          lastName: lastName,
          email: email,
          address: address,
          city: city,
          zipCode: zipCode,
          phoneNumber: phoneNumber,
          stateCountry: stateCountry,
          country: country,
        },
      });

      return session; // Return the created session
    } catch (error) {
      console.error('Error creating session:', error);
      throw new InternalServerErrorException(
        'Failed to create checkout session', // Handle errors gracefully
      );
    }
  }
  async handleWebhook(reqBody: string, sig: string) {
    const endpointSecret = process.env.WEB_HOOK_SECRET;

    try {
      // Verify the event using the signature
      const event = this.stripe.webhooks.constructEvent(
        reqBody,
        sig,
        endpointSecret,
      );

      // Log the event for debugging
      this.logger.log('Received event:', event);

      switch (event.type) {
        case 'checkout.session.completed':
          this.logger.log('Checkout session completed:', event.data.object);
          const session = event.data.object as Stripe.Checkout.Session;

          // Retrieve relevant information from the session object
          const { payment_status, customer, metadata } = session;

          // Validate and parse productId and userId
          const productIds = metadata.productIds.split(','); // Assuming productIds is a comma-separated string
          const userId = parseInt(metadata.userId, 10);
          const firstName = metadata.firstName;
          const lastName = metadata.lastName;
          const email = metadata.email;
          const address = metadata.address;
          const city = metadata.city;
          const zipCode = metadata.zipCode;
          const phoneNumber = metadata.phoneNumber;
          const stateCountry = metadata.stateCountry;
          const country = metadata.country;
          if (isNaN(userId)) {
            this.logger.error('Invalid userId in metadata');
            throw new InternalServerErrorException('Invalid userId');
          }

          if (payment_status === 'paid') {
            // Create or update the order record
            let order = await this.orderRepository.findOne({
              where: { id: parseInt(productIds[0], 10) }, // Use the first productId for the order
            });

            const user = await this.userRepository.findOne({
              where: { id: userId }, // Assuming userId is passed in metadata
            });

            if (!order) {
              // Create a new order if it doesn't exist
              order = this.orderRepository.create({
                totalAmount: (session.amount_total / 100).toString(), // Convert cents to dollars
                status: OrderStatus.PENDING, // Set the order status
                paymentMethod: 'stripe', // Assuming payment method is Stripe
                isPaid: true,
                paidAt: new Date(),
                user: user, // Set the user reference
                firstName: firstName,
                lastName: lastName,
                email: email,
                address: address,
                city: city,
                zipCode: zipCode,
                phoneNumber: phoneNumber,
                stateCountry: stateCountry,
                country: country,
              });
            } else {
              // Update existing order
              order.isPaid = true;
              order.paidAt = new Date();
              order.status = OrderStatus.PENDING;
              order.user = user; // Update user reference if necessary
              order.firstName = firstName;
              order.lastName = lastName;
              order.email = email;
              order.address = address;
              order.city = city;
              order.zipCode = zipCode;
              order.phoneNumber = phoneNumber;
              order.stateCountry = stateCountry;
              order.country = country;
            }

            await this.orderRepository.save(order); // Save the order record

            // Create a new payment record
            const payment = this.paymentRepository.create({
              amount: (session.amount_total / 100).toString(), // Convert cents to dollars
              paymentMethod: 'stripe', // Assuming payment method is Stripe
              status: payment_status,
              order: order, // Link the payment to the order
            });

            await this.paymentRepository.save(payment); // Save the payment record

            // Create order items based on the session line items
            const orderItems = await Promise.all(
              session.line_items.data.map(async (item) => {
                const productId = item.price.product; // Ensure this is the product ID
                const product = await this.productRepository.findOne({
                  where: { id: parseInt(productId as string, 10) }, // Convert productId to a number
                });

                return this.orderItemRepository.create({
                  quantity: item.quantity,
                  price: (item.price.unit_amount / 100).toString(), // Convert cents to dollars
                  order: order,
                  product: product,
                });
              }),
            );

            await this.orderItemRepository.save(orderItems); // Save the order items

            this.logger.log(`Payment was successful for customer: ${customer}`);
          } else {
            this.logger.warn(
              'Payment status is not successful:',
              payment_status,
            );
          }
          break;

        case 'checkout.session.expired':
          this.logger.log('Checkout session expired:', event.data.object);
          // Handle session expiration (e.g., notify the user or update the database)
          break;

        default:
          this.logger.warn(`Unhandled event type ${event.type}`);
          break;
      }
    } catch (err) {
      console.log('error', err);
      this.logger.error(`Webhook Error: ${err.message}`);
      throw new InternalServerErrorException('Webhook Error');
    }
  }
  // implement payments qrcode

  // async createCheckoutSession(
  //   amount: number,
  //   currency: string,
  //   productId: string, // Product ID can be used for better data management
  //   quantity: number,
  //   userId: number, // User ID can be used for better data management
  // ): Promise<Stripe.Checkout.Session> {
  //   try {
  //     const session = await this.stripe.checkout.sessions.create({
  //       line_items: [
  //         {
  //           price_data: {
  //             currency: currency,
  //             product_data: {
  //               name: `Test Product`, // You can customize the product name as needed
  //               // Additional product information can be added here
  //             },
  //             unit_amount: amount * 100, // Amount is in cents
  //           },
  //           quantity: quantity, // Specify the quantity of the product
  //         },
  //       ],
  //       mode: 'payment', // Set the mode to 'payment'
  //       success_url: `http://localhost:4242/success.html`, // Redirect URL on success
  //       cancel_url: `http://localhost:4242/cancel.html`, // Redirect URL on cancellation
  //       metadata: {
  //         // Pass any additional data here, such as user ID
  //         // or product ID for handling in webhooks
  //         productId: productId,
  //         userId: userId,
  //       },
  //     });

  //     return session; // Return the created session
  //   } catch (error) {
  //     console.error('Error creating session:', error);
  //     throw new InternalServerErrorException(
  //       'Failed to create checkout session', // Handle errors gracefully
  //     );
  //   }
  // }
  // async handleWebhook(reqBody: string, sig: string) {
  //   const endpointSecret = process.env.WEB_HOOK_SECRET;

  //   try {
  //     // Verify the event using the signature
  //     const event = this.stripe.webhooks.constructEvent(
  //       reqBody,
  //       sig,
  //       endpointSecret,
  //     );

  //     switch (event.type) {
  //       case 'checkout.session.completed':
  //         this.logger.log('Checkout session completed:', event.data.object);
  //         const session = event.data.object as Stripe.Checkout.Session;

  //         // Retrieve relevant information from the session object
  //         const { payment_status, customer, metadata } = session;

  //         if (payment_status === 'paid') {
  //           // Retrieve userId and productId from metadata
  //           const productId = parseInt(metadata.productId, 10);
  //           const userId = parseInt(metadata.userId, 10);

  //           // Find the user
  //           const user = await this.userRepository.findOne({
  //             where: { id: userId },
  //           });

  //           // Create or update the order record
  //           let order = await this.orderRepository.findOne({
  //             where: { id: productId },
  //           });

  //           if (!order) {
  //             // Create a new order if it doesn't exist
  //             order = this.orderRepository.create({
  //               totalAmount: session.amount_total / 100, // Convert cents to dollars
  //               status: 'completed', // Set the order status
  //               paymentMethod: 'stripe', // Assuming payment method is Stripe
  //               isPaid: true,
  //               paidAt: new Date(),
  //               user: user, // Set the user reference
  //             });
  //           } else {
  //             // Update existing order
  //             order.isPaid = true;
  //             order.paidAt = new Date();
  //             order.status = 'completed';
  //             order.user = user; // Update user reference if necessary
  //           }

  //           await this.orderRepository.save(order); // Save the order record

  //           // Create a new payment record
  //           const payment = this.paymentRepository.create({
  //             amount: session.amount_total / 100, // Convert cents to dollars
  //             paymentMethod: 'stripe', // Assuming payment method is Stripe
  //             status: payment_status,
  //             order: order, // Link the payment to the order
  //           });

  //           await this.paymentRepository.save(payment); // Save the payment record

  //           this.logger.log(`Payment was successful for customer: ${customer}`);
  //         } else {
  //           this.logger.warn(
  //             'Payment status is not successful:',
  //             payment_status,
  //           );
  //         }
  //         break;

  //       case 'checkout.session.expired':
  //         this.logger.log('Checkout session expired:', event.data.object);
  //         // Handle session expiration (e.g., notify the user or update the database)
  //         break;

  //       default:
  //         this.logger.warn(`Unhandled event type ${event.type}`);
  //         break;
  //     }
  //   } catch (err) {
  //     this.logger.error(`Webhook Error: ${err.message}`);
  //     throw new InternalServerErrorException('Webhook Error');
  //   }
  // }

  // async handleWebhook(reqBody: string, sig: string) {
  //   const endpointSecret = process.env.WEB_HOOK_SECRET;

  //   try {
  //     // Verify the event using the signature
  //     const event = this.stripe.webhooks.constructEvent(
  //       reqBody,
  //       sig,
  //       endpointSecret,
  //     );

  //     switch (event.type) {
  //       case 'checkout.session.completed':
  //         this.logger.log('Checkout session completed:', event.data.object);
  //         const session = event.data.object as Stripe.Checkout.Session;

  //         // Retrieve relevant information from the session object
  //         const { payment_status, customer, metadata } = session;

  //         if (payment_status === 'paid') {
  //           // Create or update the order record
  //           let order = await this.orderRepository.findOne({
  //             where: { id: parseInt(metadata.productId, 10) },
  //           });

  //           const user = await this.userRepository.findOne({
  //             where: { id: parseInt(metadata.userId, 10) }, // Assuming userId is passed in metadata
  //           });

  //           if (!order) {
  //             // Create a new order if it doesn't exist
  //             order = this.orderRepository.create({
  //               totalAmount: session.amount_total / 100, // Convert cents to dollars
  //               status: 'completed', // Set the order status
  //               paymentMethod: 'stripe', // Assuming payment method is Stripe
  //               isPaid: true,
  //               paidAt: new Date(),
  //               user: user, // Set the user reference
  //             });
  //           } else {
  //             // Update existing order
  //             order.isPaid = true;
  //             order.paidAt = new Date();
  //             order.status = 'completed';
  //             order.user = user; // Update user reference if necessary
  //           }

  //           await this.orderRepository.save(order); // Save the order record

  //           // Create a new payment record
  //           const payment = this.paymentRepository.create({
  //             amount: session.amount_total / 100, // Convert cents to dollars
  //             paymentMethod: 'stripe', // Assuming payment method is Stripe
  //             status: payment_status,
  //             order: order, // Link the payment to the order
  //           });

  //           await this.paymentRepository.save(payment); // Save the payment record

  //           // Create order items based on the session line items
  //           const orderItems = await Promise.all(
  //             session.line_items.data.map(async (item) => {
  //               const productId = item.price.product; // Ensure this is the product ID
  //               const product = await this.productRepository.findOne({
  //                 where: { id: parseInt(productId as string, 10) }, // Convert productId to a number
  //               });

  //               return this.orderItemRepository.create({
  //                 quantity: item.quantity,
  //                 price: item.price.unit_amount / 100, // Convert cents to dollars
  //                 order: order, // Link to the order
  //                 product: product, // Link to the product
  //               });
  //             }),
  //           );

  //           await this.orderItemRepository.save(orderItems); // Save the order items

  //           this.logger.log(`Payment was successful for customer: ${customer}`);
  //         } else {
  //           this.logger.warn(
  //             'Payment status is not successful:',
  //             payment_status,
  //           );
  //         }
  //         break;

  //       case 'checkout.session.expired':
  //         this.logger.log('Checkout session expired:', event.data.object);
  //         // Handle session expiration (e.g., notify the user or update the database)
  //         break;

  //       default:
  //         this.logger.warn(`Unhandled event type ${event.type}`);
  //         break;
  //     }
  //   } catch (err) {
  //     this.logger.error(`Webhook Error: ${err.message}`);
  //     throw new InternalServerErrorException('Webhook Error');
  //   }
  // }
}
