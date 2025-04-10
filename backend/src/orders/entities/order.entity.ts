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

export enum OrderStatus {
  PENDING = 'PENDING', // Đang xử lý
  SHIPPED = 'SHIPPED', // Đã vận chuyển
  DELIVERED = 'DELIVERED', // Giao hàng thành công
  CANCELED = 'CANCELED', // Đã hủy
}
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalAmount: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column()
  paymentMethod: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  zipCode: string;

  @Column()
  phoneNumber: string;

  @Column()
  stateCountry: string;

  @Column()
  country: string;

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
