import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger, OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { KafkaService } from '../kafka/kafka.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
})
export class WebsocketService
  implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(WebsocketService.name);

  // Map of socketId -> userId
  private connectedClients = new Map<string, number>();

  // Map of userId -> Set of socketIds (for multiple devices/tabs)
  private userSockets = new Map<number, Set<string>>();

  // Set of admin socket IDs
  private adminSockets = new Set<string>();

  constructor(private readonly kafkaService: KafkaService) {}

  onModuleInit() {
    // Set this gateway in KafkaService so it can send messages
    this.kafkaService.setWebSocketGateway(this);
    this.logger.log(
      '✅ WebSocket Gateway initialized and connected to Kafka service',
    );
  }

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    this.logger.log(
      `🔌 Client connected: ${client.id}${userId ? `, userId: ${userId}` : ''}`,
    );

    if (userId) {
      const userIdNum = parseInt(userId);

      // Store in the main map
      this.connectedClients.set(client.id, userIdNum);

      // Add to the user's set of sockets
      if (!this.userSockets.has(userIdNum)) {
        this.userSockets.set(userIdNum, new Set());
      }
      this.userSockets.get(userIdNum).add(client.id);

      this.logger.log(
        `👤 User ${userId} now has ${this.userSockets.get(userIdNum).size} active connections`,
      );
    }
  }

  handleDisconnect(client: Socket) {
    const userId = this.connectedClients.get(client.id);
    this.logger.log(`🔌 Client disconnected: ${client.id}`);

    if (userId) {
      // Remove from the user's set of sockets
      const userSockets = this.userSockets.get(userId);
      if (userSockets) {
        userSockets.delete(client.id);

        // If no more connections for this user, remove the user entry
        if (userSockets.size === 0) {
          this.userSockets.delete(userId);
        }
      }
    }

    // Remove from admin sockets if it was an admin
    this.adminSockets.delete(client.id);

    // Remove from the main map
    this.connectedClients.delete(client.id);
  }

  @SubscribeMessage('joinAdminRoom')
  handleJoinAdminRoom(@ConnectedSocket() client: Socket) {
    try {
      client.join('admin-room');
      client.join('admin-dashboard');
      this.adminSockets.add(client.id);

      this.logger.log(`👑 Admin joined: ${client.id}`);

      client.emit('joinedAdminRoom', {
        success: true,
        message: 'Successfully joined admin room',
        rooms: ['admin-room', 'admin-dashboard'],
        timestamp: new Date().toISOString(),
      });

      // Send current stats to the newly joined admin
      this.sendConnectionStats(client);
    } catch (error) {
      this.logger.error('❌ Error joining admin room:', error);
      client.emit('joinedAdminRoom', {
        success: false,
        message: 'Failed to join admin room',
        error: error.message,
      });
    }
  }

  @SubscribeMessage('leaveAdminRoom')
  handleLeaveAdminRoom(@ConnectedSocket() client: Socket) {
    try {
      client.leave('admin-room');
      client.leave('admin-dashboard');
      this.adminSockets.delete(client.id);

      this.logger.log(`👑 Admin left: ${client.id}`);

      client.emit('leftAdminRoom', {
        success: true,
        message: 'Successfully left admin room',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.logger.error('❌ Error leaving admin room:', error);
    }
  }

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket) {
    client.emit('pong', {
      timestamp: new Date().toISOString(),
      clientId: client.id,
      serverTime: Date.now(),
    });
  }

  // Method to send messages to specific rooms
  sendToRoom(room: string, event: string, data: any) {
    try {
      this.server.to(room).emit(event, data);
      this.logger.debug(`📤 Sent ${event} to room ${room}`);
    } catch (error) {
      this.logger.error(`❌ Error sending to room ${room}:`, error);
    }
  }

  // Method to send messages to all admin users
  sendToAdmins(event: string, data: any) {
    try {
      this.server.to('admin-room').emit(event, data);
      this.logger.debug(
        `📤 Sent ${event} to all admins (${this.adminSockets.size} connected)`,
      );
    } catch (error) {
      this.logger.error('❌ Error sending to admins:', error);
    }
  }

  // Method to send messages to specific user
  sendToUser(userId: number, event: string, data: any) {
    try {
      // Get all socket IDs for this user
      const socketIds = this.userSockets.get(userId);

      if (socketIds && socketIds.size > 0) {
        // Send to all of the user's connected clients
        socketIds.forEach((socketId) => {
          this.server.to(socketId).emit(event, data);
        });
        this.logger.debug(
          `📤 Sent ${event} to user ${userId} on ${socketIds.size} connections`,
        );
      } else {
        this.logger.debug(`⚠️ No active connections for user ${userId}`);
      }
    } catch (error) {
      this.logger.error(`❌ Error sending to user ${userId}:`, error);
    }
  }

  // Send notification to specific user (legacy method)
  sendNotificationToUser(userId: number, notification: any) {
    this.sendToUser(userId, 'notification', notification);
  }

  // Get current admin count
  getAdminCount(): number {
    return this.adminSockets.size;
  }

  // Get total connected users count
  getConnectedUsersCount(): number {
    return this.userSockets.size;
  }

  // Send broadcast message to all connected clients
  broadcast(event: string, data: any) {
    try {
      this.server.emit(event, data);
      this.logger.debug(`📤 Broadcasted ${event} to all clients`);
    } catch (error) {
      this.logger.error('❌ Error broadcasting:', error);
    }
  }

  // Handle user joining their personal room
  @SubscribeMessage('joinUserRoom')
  handleJoinUserRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { userId: number },
  ) {
    try {
      const userRoom = `user:${data.userId}`;
      client.join(userRoom);

      this.logger.log(`👤 User ${data.userId} joined personal room`);

      client.emit('joinedUserRoom', {
        success: true,
        message: `Joined user room: ${userRoom}`,
        room: userRoom,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.logger.error('❌ Error joining user room:', error);
      client.emit('joinedUserRoom', {
        success: false,
        message: 'Failed to join user room',
        error: error.message,
      });
    }
  }

  // Send connection stats to admin
  private sendConnectionStats(client: Socket) {
    const stats = {
      totalConnections: this.connectedClients.size,
      uniqueUsers: this.userSockets.size,
      adminConnections: this.adminSockets.size,
      timestamp: new Date().toISOString(),
    };

    client.emit('connectionStats', stats);
  }

  // Broadcast connection stats to all admins
  broadcastConnectionStats() {
    const stats = {
      totalConnections: this.connectedClients.size,
      uniqueUsers: this.userSockets.size,
      adminConnections: this.adminSockets.size,
      timestamp: new Date().toISOString(),
    };

    this.sendToAdmins('connectionStats', stats);
  }

  // Method to get all connected admin socket IDs
  getAdminSockets(): string[] {
    return Array.from(this.adminSockets);
  }

  // Method to check if a socket is an admin
  isAdminSocket(socketId: string): boolean {
    return this.adminSockets.has(socketId);
  }
}
