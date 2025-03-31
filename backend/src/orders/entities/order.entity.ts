import { User } from '../../users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { Paymentwithqrcode } from 'src/paymentwithqrcode/entities/paymentwithqrcode.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalAmount: string;

  @Column()
  status: string;

  @Column()
  paymentMethod: string;

  @Column({ default: false })
  isPaid: boolean;

  @Column({ nullable: true })
  paidAt: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];
  @OneToMany(
    () => Paymentwithqrcode,
    (paymentwithqrcode) => paymentwithqrcode.order,
  )
  paymentwithqrcodes: Paymentwithqrcode[];
}
