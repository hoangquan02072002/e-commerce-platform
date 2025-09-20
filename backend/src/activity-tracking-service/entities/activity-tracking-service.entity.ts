import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('user_activities')
@Index(['userId', 'activityType'])
@Index(['timestamp'])
export class ActivityTrackingServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  userId: number;

  @Column({ nullable: true })
  userName: string;

  @Column({ nullable: true })
  userEmail: string;

  @Column({ nullable: true })
  sessionId: string;

  @Column()
  activityType: string;

  @Column('json')
  data: any;

  @CreateDateColumn()
  @Index()
  timestamp: Date;

  @Column({ nullable: true })
  ipAddress: string;

  @Column({ type: 'text', nullable: true })
  userAgent: string;

  @Column({ nullable: true })
  location: string;
}
