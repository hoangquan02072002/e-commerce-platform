import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatappService } from '../chatapp/chatapp.service';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('ChatGateway');
  private connectedClients: Map<number, string[]> = new Map(); // userId -> socketIds

  constructor(
    private readonly chatService: ChatappService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      if (!token) {
        this.logger.warn(
          `Client ${client.id} attempted to connect without token`,
        );
        client.disconnect();
        return;
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'hoanguan',
      });

      const userId = payload.sub || payload.userId;
      const isAdmin = payload.role === 'admin';

      if (!userId) {
        this.logger.warn(`Token for client ${client.id} has no user ID`);
        client.disconnect();
        return;
      }

      client.data = { userId, isAdmin };
      this.connectedClients.set(userId, [client.id]);
      client.join(`user:${userId}`);

      // Track connected clients
      if (!this.connectedClients.has(userId)) {
        this.connectedClients.set(userId, []);
      }
      this.connectedClients.get(userId)!.push(client.id);

      // Join user to their personal room
      client.join(`user:${userId}`);

      this.logger.log(
        `Client ${client.id} connected. User ID: ${userId}, Admin: ${isAdmin}`,
      );
    } catch (error) {
      this.logger.error(`Connection error for client ${client.id}:`, error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data?.userId;
    if (userId) {
      const sockets = this.connectedClients.get(userId) || [];
      this.connectedClients.set(
        userId,
        sockets.filter((socketId) => socketId !== client.id),
      );

      if (this.connectedClients.get(userId)?.length === 0) {
        this.connectedClients.delete(userId);
      }

      this.logger.log(`Client ${client.id} disconnected. User ID: ${userId}`);
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      content: string;
      roomId: string;
      recipientId: number;
      senderId?: number;
    }, // senderId added,
  ) {
    const senderId = data.senderId || client.data.userId;
    if (!senderId) {
      client.emit('messageError', {
        success: false,
        error: 'Sender ID is missing',
      });
      return;
    }
    // const senderId = client.data.userId;
    const message = await this.chatService.create({
      content: data.content,
      roomId: data.roomId,
      senderId,
      recipientId: data.recipientId,
    });
    const messageWithSenderId = {
      id: message.id,
      content: message.content,
      roomId: message.roomId,
      senderId: message.senderId,
      recipientId: message.recipientId,
      createdAt: message.createdAt,
      isRead: message.isRead,
    };
    // Broadcast to the room
    this.server.to(data.roomId).emit('newMessage', messageWithSenderId);
    client.emit('messageSent', { success: true, message: messageWithSenderId });
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string },
  ) {
    client.join(data.roomId);
    const messages = await this.chatService.findMessagesByRoom(data.roomId);
    client.emit('previousMessages', messages);
  }
  @SubscribeMessage('typing')
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; recipientId: number },
  ): void {
    const userId = client.data?.userId;
    if (userId && data.recipientId) {
      // Broadcast to the room that the user is typing
      this.server.to(`user:${data.recipientId}`).emit('userTyping', { userId });
    }
  }
}
