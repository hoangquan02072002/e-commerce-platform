import { Injectable, NotFoundException, Logger } from '@nestjs/common';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateOrderDto } from './dto/update-order.dto';
import { KafkaService } from '../kafka/kafka.service';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly kafkaService: KafkaService,
  ) {}
  // create(createOrderDto: CreateOrderDto) {
  //   return 'This action adds a new order';
  // }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findHistoryByUser(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async updateOrderStatus(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order & { previousStatus: string }> {
    try {
      // Validate input
      if (!id || id <= 0) {
        throw new NotFoundException('Invalid order ID');
      }

      if (!updateOrderDto.status) {
        throw new Error('Status is required');
      }

      // Find the existing order
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      // Store the previous status for the event payload and response
      const previousStatus = order.status;

      // Check if status is actually changing
      if (previousStatus === updateOrderDto.status) {
        this.logger.warn(
          `Order ${id} status update skipped - no change from ${previousStatus}`,
        );
        return { ...order, previousStatus };
      }

      // Update the order status
      order.status = updateOrderDto.status;
      const updatedOrder = await this.orderRepository.save(order);

      // Publish status change event to Kafka
      await this.publishOrderStatusUpdate(
        updatedOrder,
        previousStatus,
        updateOrderDto.status,
      );

      this.logger.log(
        `Order ${id} status updated from ${previousStatus} to ${updateOrderDto.status}`,
      );

      return { ...updatedOrder, previousStatus };
    } catch (error) {
      this.logger.error(`Error updating order status for order ${id}:`, error);
      throw error;
    }
  }

  private async publishOrderStatusUpdate(
    order: Order,
    previousStatus: string | null,
    newStatus: string,
  ): Promise<void> {
    try {
      // Validate required fields
      if (!order || !order.id) {
        this.logger.warn('Invalid order data for Kafka message');
        return;
      }

      const message = {
        orderId: order.id,
        userId: order.user?.id || null,
        previousStatus,
        newStatus,
        updatedAt: new Date().toISOString(),
        orderDetails: {
          id: order.id,
        },
      };

      // Check if Kafka is connected before sending
      if (this.kafkaService.isKafkaConnected()) {
        await this.kafkaService.sendMessage('order-status-updates', message);

        this.logger.log(
          `Order status update published to Kafka: Order ${order.id} changed from ${previousStatus} to ${newStatus}`,
        );
      } else {
        this.logger.warn(
          `Kafka not connected. Order status update not published for order ${order.id}`,
        );
      }
    } catch (error) {
      this.logger.error(
        'Error publishing order status update to Kafka:',
        error,
      );
      // Don't throw error to prevent breaking order operations
    }
  }
  // async updateOrderStatus(
  //   id: number,
  //   updateOrderDto: UpdateOrderDto,
  // ): Promise<Order & { previousStatus: string }> {
  //   const order = await this.orderRepository.findOne({
  //     where: { id },
  //     relations: ['user'],
  //   });

  //   if (!order) {
  //     throw new NotFoundException('Order not found');
  //   }

  //   // Store the previous status for the event payload
  //   const previousStatus = order.status;

  //   // Update the order status
  //   order.status = updateOrderDto.status;
  //   const updatedOrder = await this.orderRepository.save(order);

  //   // Prepare the event payload
  //   const statusChangeEvent = {
  //     orderId: order.id,
  //     userId: order.user.id,
  //     previousStatus,
  //     newStatus: order.status,
  //     updatedAt: new Date().toISOString(),
  //     orderDetails: {
  //       id: order.id,
  //     },
  //   };

  //   // Send the event to Kafka
  //   await this.kafkaService.sendMessage(
  //     'order-status-updates',
  //     statusChangeEvent,
  //   );

  //   return { ...updatedOrder, previousStatus };
  // }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
