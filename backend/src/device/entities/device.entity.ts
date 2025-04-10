import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deviceType: string;

  @Column()
  browser: string;

  @Column()
  ipAddress: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastLoginAt: Date;

  @ManyToOne(() => User, (user) => user.devices)
  user: User;
}
