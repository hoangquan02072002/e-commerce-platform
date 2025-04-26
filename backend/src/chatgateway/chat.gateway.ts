// import { Logger } from '@nestjs/common';
// import {
//   WebSocketGateway,
//   SubscribeMessage,
//   MessageBody,
//   WebSocketServer,
//   ConnectedSocket,
//   OnGatewayConnection,
//   OnGatewayInit,
//   OnGatewayDisconnect,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { ChatappService } from 'src/chatapp/chatapp.service';
// import { CreateChatDto } from 'src/chatapp/dto/create-chatapp.dto';
// import { JoinRoomDto } from 'src/chatapp/dto/join-room.dto';
// import { JwtService } from '@nestjs/jwt';

// interface ConnectedClient {
//   userId: number;
//   socketId: string;
//   isAdmin: boolean;
// }

// @WebSocketGateway({
//   cors: {
//     origin: ['http://localhost:3000'],
//     credentials: true,
//   },
//   path: '/socket.io',
//   namespace: '/',
//   transports: ['websocket', 'polling'],
// })
// export class ChatGateway
//   implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
// {
//   @WebSocketServer()
//   server: Server;

//   private logger = new Logger('ChatGateway');
//   private connectedClients: Map<number, ConnectedClient> = new Map();

//   constructor(
//     private readonly chatService: ChatappService,
//     private readonly jwtService: JwtService,
//   ) {}

//   afterInit() {
//     this.logger.log('Socket.IO server initialized');
//   }

//   async handleConnection(client: Socket) {
//     try {
//       // Verify authentication token
//       const token = client.handshake.auth.token;
//       if (!token) {
//         this.logger.warn(
//           `Client ${client.id} attempted to connect without token`,
//         );
//         client.disconnect();
//         return;
//       }

//       // Verify token
//       try {
//         const payload = await this.jwtService.verifyAsync(token);
//         const userId = payload.sub;
//         const isAdmin = payload.role === 'admin'; // Assuming your JWT has a role field

//         // Store user information
//         client.data.userId = userId;
//         client.data.isAdmin = isAdmin;

//         // Add to connected clients
//         this.connectedClients.set(userId, {
//           userId,
//           socketId: client.id,
//           isAdmin,
//         });

//         // Join user to their personal room
//         client.join(`user:${userId}`);

//         // If admin, join admin room
//         if (isAdmin) {
//           client.join('admins');
//         }

//         this.logger.log(
//           `Client ${client.id} connected successfully. User ID: ${userId}, Admin: ${isAdmin}`,
//         );
//       } catch {
//         this.logger.warn(`Invalid token for client ${client.id}`);
//         client.disconnect();
//         return;
//       }
//     } catch (error) {
//       this.logger.error(`Connection error for client ${client.id}:`, error);
//       client.disconnect();
//     }
//   }

//   handleDisconnect(client: Socket) {
//     try {
//       const userId = client.data.userId;
//       if (userId) {
//         this.connectedClients.delete(userId);
//         this.logger.log(
//           `Client ${client.id} (User ID: ${userId}) disconnected`,
//         );
//       } else {
//         this.logger.log(`Client ${client.id} disconnected`);
//       }
//     } catch (error) {
//       this.logger.error(`Error during disconnect:`, error);
//     }
//   }

//   @SubscribeMessage('joinRoom')
//   async handleJoinRoom(
//     @MessageBody() joinRoomDto: JoinRoomDto,
//     @ConnectedSocket() client: Socket,
//   ) {
//     const { roomId } = joinRoomDto;

//     // Join the room
//     client.join(roomId);

//     // Get previous messages for this room
//     const messages = await this.chatService.findMessagesByRoom(roomId);

//     // Send previous messages to the client
//     client.emit('previousMessages', messages);

//     return { success: true, roomId };
//   }

//   @SubscribeMessage('leaveRoom')
//   handleLeaveRoom(
//     @MessageBody() { roomId }: { roomId: string },
//     @ConnectedSocket() client: Socket,
//   ) {
//     client.leave(roomId);
//     return { success: true };
//   }

//   @SubscribeMessage('sendMessage')
//   async handleSendMessage(
//     @MessageBody() createChatDto: CreateChatDto,
//     @ConnectedSocket() client: Socket,
//   ) {
//     try {
//       const senderId = client.data.userId;
//       const { content, roomId, recipientId } = createChatDto;

//       // Create message with sender ID from authenticated client
//       const messageData = {
//         content,
//         roomId,
//         senderId,
//         recipientId,
//       };

//       // Save message to database
//       const message = await this.chatService.create(messageData);

//       // Broadcast to everyone in the room
//       this.server.to(roomId).emit('newMessage', message);

//       // Also notify recipient directly
//       if (recipientId) {
//         this.server.to(`user:${recipientId}`).emit('newMessage', message);
//       }

//       return { success: true, message };
//     } catch (error) {
//       client.emit('error', { message: 'Failed to send message' });
//       return { success: false, error: error.message };
//     }
//   }

//   @SubscribeMessage('getAdminSupport')
//   async handleGetAdminSupport(@ConnectedSocket() client: Socket) {
//     try {
//       const userId = client.data.userId;
//       if (!userId) {
//         return { success: false, error: 'User not authenticated' };
//       }

//       // Create a unique room ID for user-admin chat
//       const roomId = `support:${userId}`;

//       // Join the room
//       client.join(roomId);

//       // Notify admins
//       this.server.to('admins').emit('supportRequest', {
//         userId,
//         roomId,
//         timestamp: new Date(),
//       });

//       return { success: true, roomId };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   }

//   @SubscribeMessage('adminJoinSupportRoom')
//   async handleAdminJoinSupport(
//     @MessageBody() { roomId, userId }: { roomId: string; userId: number },
//     @ConnectedSocket() client: Socket,
//   ) {
//     try {
//       const adminId = client.data.userId;
//       const isAdmin = client.data.isAdmin;

//       if (!isAdmin) {
//         return { success: false, error: 'Unauthorized' };
//       }

//       // Join the support room
//       client.join(roomId);

//       // Notify the user that admin joined
//       this.server.to(`user:${userId}`).emit('adminJoined', {
//         adminId,
//         roomId,
//         timestamp: new Date(),
//       });

//       // Get previous messages
//       const messages = await this.chatService.findMessagesByRoom(roomId);

//       return { success: true, messages };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   }

//   @SubscribeMessage('markAsRead')
//   async handleMarkAsRead(@MessageBody() { messageId }: { messageId: number }) {
//     try {
//       const message = await this.chatService.markAsRead(messageId);

//       // Notify sender that message was read
//       if (message.sender && message.sender.id) {
//         this.server.to(`user:${message.sender.id}`).emit('messageRead', {
//           messageId,
//           readAt: new Date(),
//         });
//       }

//       return { success: true, message };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   }

//   @SubscribeMessage('getUnreadMessages')
//   async handleGetUnreadMessages(@ConnectedSocket() client: Socket) {
//     try {
//       const userId = client.data.userId;
//       if (!userId) {
//         return { success: false, error: 'User not authenticated' };
//       }

//       const messages = await this.chatService.findUnreadMessagesForUser(userId);
//       return { success: true, messages };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   }
// }
