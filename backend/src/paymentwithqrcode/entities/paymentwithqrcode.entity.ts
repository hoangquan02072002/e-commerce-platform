import { Order } from 'src/orders/entities/order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Paymentwithqrcode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: string;

  @Column()
  paymentMethod: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  qrCode: string;

  @Column({ nullable: true })
  transactionId: string;

  @Column({ nullable: true })
  momoOrderId: string;

  @Column({ nullable: true })
  momoRequestId: string;

  @Column({ nullable: true })
  momoPayUrl: string;

  @Column({ nullable: true })
  momoDeepLink: string;

  @ManyToOne(() => Order, (order) => order.paymentwithqrcodes)
  order: Order;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
