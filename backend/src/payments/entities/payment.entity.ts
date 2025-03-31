// src/payments/entities/payment.entity.ts
import { Order } from '../../orders/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: string;

  @Column()
  paymentMethod: string; // credit_card, paypal, etc.

  @Column()
  status: string; // pending, completed, failed

  @ManyToOne(() => Order, (order) => order.payments)
  order: Order;
}
