import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const notification = this.notificationRepository.create(
      createNotificationDto,
    );
    return this.notificationRepository.save(notification);
  }

  async findAll() {
    return this.notificationRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: number) {
    return this.notificationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    return this.notificationRepository.findOne({ where: { id } });
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    await this.notificationRepository.update(id, updateNotificationDto);
    return this.findOne(id);
  }

  async markAsRead(id: number) {
    await this.notificationRepository.update(id, { Read: true });
    return this.findOne(id);
  }

  async remove(id: number) {
    const notification = await this.findOne(id);
    return this.notificationRepository.remove(notification);
  }
}
