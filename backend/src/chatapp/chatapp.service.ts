import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from '../users/users.service';
import { ChatMessage } from './entities/chatapp.entity';
import { CreateChatDto } from './dto/create-chatapp.dto';

@Injectable()
export class ChatappService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatRepository: Repository<ChatMessage>,
    private readonly usersService: UsersService,
  ) {}

  async create(createChatDto: CreateChatDto): Promise<ChatMessage> {
    const { content, roomId, senderId, recipientId } = createChatDto;

    // Find the sender
    const sender = await this.usersService.findOne(senderId);
    if (!sender) {
      throw new NotFoundException(`User with ID ${senderId} not found`);
    }

    // Create new chat message
    const chatMessage = new ChatMessage();
    chatMessage.content = content;
    chatMessage.roomId = roomId;
    chatMessage.sender = sender;

    if (recipientId) {
      chatMessage.recipientId = recipientId;
    }

    return this.chatRepository.save(chatMessage);
  }

  async findMessagesByRoom(roomId: string): Promise<ChatMessage[]> {
    return this.chatRepository.find({
      where: { roomId },
      relations: ['sender'],
      order: { createdAt: 'ASC' },
    });
  }

  async markAsRead(id: number): Promise<ChatMessage> {
    const message = await this.chatRepository.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    message.isRead = true;
    return this.chatRepository.save(message);
  }

  async findUnreadMessagesForUser(userId: number): Promise<ChatMessage[]> {
    return this.chatRepository.find({
      where: { recipientId: userId, isRead: false },
      relations: ['sender'],
      order: { createdAt: 'ASC' },
    });
  }
}
