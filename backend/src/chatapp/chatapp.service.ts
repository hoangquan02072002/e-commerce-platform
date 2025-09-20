// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// import { UsersService } from '../users/users.service';
// import { ChatMessage } from './entities/chatapp.entity';
// import { CreateChatDto } from './dto/create-chatapp.dto';

// @Injectable()
// export class ChatappService {
//   constructor(
//     @InjectRepository(ChatMessage)
//     private readonly chatRepository: Repository<ChatMessage>,
//     private readonly usersService: UsersService,
//   ) {}

//   async create(createChatDto: CreateChatDto): Promise<ChatMessage> {
//     const { content, roomId, senderId, recipientId } = createChatDto;

//     // Find the sender
//     const sender = await this.usersService.findOne(senderId);
//     if (!sender) {
//       throw new NotFoundException(`User with ID ${senderId} not found`);
//     }

//     // Create new chat message
//     const chatMessage = new ChatMessage();
//     chatMessage.content = content;
//     chatMessage.roomId = roomId;
//     chatMessage.sender = sender;

//     if (recipientId) {
//       chatMessage.recipientId = recipientId;
//     }

//     return this.chatRepository.save(chatMessage);
//   }

//   async findMessagesByRoom(roomId: string): Promise<ChatMessage[]> {
//     return this.chatRepository.find({
//       where: { roomId },
//       relations: ['sender'],
//       order: { createdAt: 'ASC' },
//     });
//   }

//   async markAsRead(id: number): Promise<ChatMessage> {
//     const message = await this.chatRepository.findOne({ where: { id } });
//     if (!message) {
//       throw new NotFoundException(`Message with ID ${id} not found`);
//     }

//     message.isRead = true;
//     return this.chatRepository.save(message);
//   }

//   async findUnreadMessagesForUser(userId: number): Promise<ChatMessage[]> {
//     return this.chatRepository.find({
//       where: { recipientId: userId, isRead: false },
//       relations: ['sender'],
//       order: { createdAt: 'ASC' },
//     });
//   }
//   async findUsersWithChats(): Promise<any[]> {
//     const users = await this.usersService.findUsersWithChats();
//     return users;
//   }

//   async findAdminUsers(): Promise<any[]> {
//     // Return users with admin role
//     const admins = await this.usersService.findAdminUsers();
//     return admins;
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './entities/chatapp.entity';
import { CreateChatDto } from './dto/create-chatapp.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ChatappService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatRepository: Repository<ChatMessage>,
  ) {}

  // async create(createChatDto: CreateChatDto): Promise<ChatMessage> {
  //   const { senderId, ...rest } = createChatDto;

  //   // Fetch the sender entity
  //   const sender = await this.chatRepository.manager.findOne('User', {
  //     where: { id: senderId },
  //   });
  //   if (!sender) {
  //     throw new Error(`Sender with ID ${senderId} not found`);
  //   }

  //   const message = this.chatRepository.create({ ...rest, sender });
  //   return this.chatRepository.save(message);
  // }
  async create(createChatDto: CreateChatDto): Promise<ChatMessage> {
    const { senderId, recipientId, ...rest } = createChatDto;

    // Fetch the sender entity
    const sender = await this.chatRepository.manager.findOne(User, {
      where: { id: senderId },
    });
    if (!sender) {
      throw new Error(`Sender with ID ${senderId} not found`);
    }

    // Fetch the recipient entity
    const recipient = await this.chatRepository.manager.findOne(User, {
      where: { id: recipientId },
    });
    if (!recipient) {
      throw new Error(`Recipient with ID ${recipientId} not found`);
    }

    // Create the message with the sender and recipient relationships
    const message = this.chatRepository.create({ ...rest, sender, recipient });
    return this.chatRepository.save(message);
  }

  // async findMessagesByRoom(roomId: string): Promise<ChatMessage[]> {
  //   return this.chatRepository.find({
  //     where: { roomId },
  //     relations: ['sender'],
  //     order: { createdAt: 'ASC' },
  //   });
  // }

  async getMessagesByRoomId(roomId: string): Promise<ChatMessage[]> {
    return this.chatRepository.find({
      where: { roomId },
      relations: ['sender', 'recipient'],
      order: { createdAt: 'ASC' },
    });
  }
  async findMessagesByRoom(roomId: string): Promise<any[]> {
    const messages = await this.chatRepository.find({
      where: { roomId },
      relations: ['sender', 'recipient'],
      order: { createdAt: 'ASC' },
    });

    return messages.map((message) => ({
      id: message.id,
      content: message.content,
      roomId: message.roomId,
      senderId: message.sender.id,
      senderName: message.sender.name,
      recipientId: message.recipient.id,
      recipientName: message.recipient.name,
      createdAt: message.createdAt,
      isRead: message.isRead,
    }));
  }
  async findUsersWhoChattedWithAdmin(adminId: number): Promise<User[]> {
    const messages = await this.chatRepository.find({
      where: { recipientId: adminId },
      relations: ['sender'],
    });

    // Extract unique users from the messages
    const uniqueUsers = new Map<number, User>();
    messages.forEach((message) => {
      if (message.sender) {
        uniqueUsers.set(message.sender.id, message.sender);
      }
    });

    return Array.from(uniqueUsers.values());
  }

  // Add these methods to your ChatappService class

  async getUsersWhoMessagedAdmins(): Promise<User[]> {
    const messages = await this.chatRepository.find({
      relations: ['sender'],
      where: {
        sender: { role: 'user' },
        recipient: { role: 'admin' },
      },
    });

    const users = new Map<number, User>();
    messages.forEach((message) => {
      if (message.sender) {
        users.set(message.sender.id, message.sender);
      }
    });

    return Array.from(users.values());
  }

  async getAdminsWhoReceivedFromUsers(): Promise<User[]> {
    const messages = await this.chatRepository.find({
      relations: ['recipient'],
      where: {
        sender: { role: 'user' },
        recipient: { role: 'admin' },
      },
    });

    const admins = new Map<number, User>();
    messages.forEach((message) => {
      if (message.recipient) {
        admins.set(message.recipient.id, message.recipient);
      }
    });

    return Array.from(admins.values());
  }
  async getAllUsersWithChats(): Promise<User[]> {
    // Get all chat messages with sender and recipient relations
    const allMessages = await this.chatRepository.find({
      relations: ['sender', 'recipient'],
      where: {
        sender: { role: 'user' },
        recipient: { role: 'admin' },
      },
    });

    // Use a Map to store unique users and avoid duplicates
    const allUsers = new Map<number, User>();

    // Extract all unique users from senders and recipients
    allMessages.forEach((message) => {
      // Add sender if exists
      if (message.sender) {
        allUsers.set(message.sender.id, message.sender);
      }

      // Add recipient if exists
      if (message.recipient) {
        allUsers.set(message.recipient.id, message.recipient);
      }
    });

    return Array.from(allUsers.values());
  }

  async getAllUsersWithChatDetails(): Promise<any[]> {
    // Get users with their last message and unread count
    const users = await this.getAllUsersWithChats();

    const usersWithDetails = await Promise.all(
      users.map(async (user) => {
        // Get last message for this user
        const lastMessage = await this.chatRepository.findOne({
          where: [{ senderId: user.id }, { recipientId: user.id }],
          relations: ['sender', 'recipient'],
          order: { createdAt: 'DESC' },
        });

        // Count unread messages for this user
        const unreadCount = await this.chatRepository.count({
          where: { recipientId: user.id, isRead: false },
        });

        // Count total messages for this user
        const totalMessages = await this.chatRepository.count({
          where: [{ senderId: user.id }, { recipientId: user.id }],
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,

          lastMessage: lastMessage
            ? {
                content: lastMessage.content,
                createdAt: lastMessage.createdAt,
                isRead: lastMessage.isRead,
                senderName: lastMessage.sender?.name,
                recipientName: lastMessage.recipient?.name,
              }
            : null,
          unreadCount,
          totalMessages,
          isOnline: false, // You can implement online status logic here
        };
      }),
    );

    return usersWithDetails.sort((a, b) => {
      // Sort by last message date, most recent first
      if (a.lastMessage && b.lastMessage) {
        return (
          new Date(b.lastMessage.createdAt).getTime() -
          new Date(a.lastMessage.createdAt).getTime()
        );
      }
      if (a.lastMessage) return -1;
      if (b.lastMessage) return 1;
      return 0;
    });
  }

  async getUsersWithRecentChats(limit: number = 20): Promise<any[]> {
    // Get users who have had recent chat activity
    const recentMessages = await this.chatRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.recipient', 'recipient')
      .orderBy('message.createdAt', 'DESC')
      .limit(limit * 2) // Get more to account for duplicates
      .getMany();

    const usersMap = new Map<number, any>();

    recentMessages.forEach((message) => {
      // Add sender
      if (message.sender && !usersMap.has(message.sender.id)) {
        usersMap.set(message.sender.id, {
          id: message.sender.id,
          name: message.sender.name,
          email: message.sender.email,

          lastActivity: message.createdAt,
        });
      }

      // Add recipient
      if (message.recipient && !usersMap.has(message.recipient.id)) {
        usersMap.set(message.recipient.id, {
          id: message.recipient.id,
          name: message.recipient.name,
          email: message.recipient.email,

          lastActivity: message.createdAt,
        });
      }
    });

    return Array.from(usersMap.values())
      .sort(
        (a, b) =>
          new Date(b.lastActivity).getTime() -
          new Date(a.lastActivity).getTime(),
      )
      .slice(0, limit);
  }

  async getChatParticipantsByRoom(roomId: string): Promise<User[]> {
    // Get all unique users who participated in a specific room
    const messages = await this.chatRepository.find({
      where: { roomId },
      relations: ['sender', 'recipient'],
    });

    const participants = new Map<number, User>();

    messages.forEach((message) => {
      if (message.sender) {
        participants.set(message.sender.id, message.sender);
      }
      if (message.recipient) {
        participants.set(message.recipient.id, message.recipient);
      }
    });

    return Array.from(participants.values());
  }
}
