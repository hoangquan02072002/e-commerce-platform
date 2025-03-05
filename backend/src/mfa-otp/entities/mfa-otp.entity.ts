import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity()
export class MfaOtp {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: false })
  email: string;

  @Column()
  otp: string;

  @Column({ type: 'timestamp' })
  expires_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @Column({ default: 0 })
  attempts: number;

  @Column({ default: false })
  is_verified: boolean;

  @ManyToOne(() => User, (user) => user.mfaOtps)
  user: User;
  @Column({ nullable: true })
  userId: number;
}
