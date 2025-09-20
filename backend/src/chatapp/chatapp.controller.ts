import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chatapp.dto';
// import { UpdateChatappDto } from './dto/update-chatapp.dto';
import { ChatappService } from '../chatapp/chatapp.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/strategies/roles.decorator';

@Controller('chatapp')
export class ChatappController {
  constructor(private readonly chatappService: ChatappService) {}

  // @Post()
  // create(@Body() createChatappDto: CreateChatDto) {
  //   return this.chatappService.create(createChatappDto);
  // }
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createChatappDto: CreateChatDto) {
    // Add the senderId from the authenticated user
    // createChatappDto.senderId = req.user.id;
    return this.chatappService.create(createChatappDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('room/:roomId')
  findMessagesByRoom(@Param('roomId') roomId: string) {
    return this.chatappService.findMessagesByRoom(roomId);
  }

  @Get('messages-by-room')
  async getMessagesByRoomId(@Query('roomId') roomId: string) {
    return this.chatappService.getMessagesByRoomId(roomId);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') // Ensure only admins can access this endpoint
  @Get('users-who-chatted')
  async findUsersWhoChattedWithAdmin(@Request() req) {
    const adminId = req.user.id; // Extract admin ID from the authenticated user
    return this.chatappService.findUsersWhoChattedWithAdmin(adminId);
  }
  @UseGuards(JwtAuthGuard)
  @Get('admins')
  async getAllAdminsWithChats() {
    return this.chatappService.getAdminsWhoReceivedFromUsers();
  }
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Get('users')
  async getAllUsersWithChats() {
    return this.chatappService.getUsersWhoMessagedAdmins();
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('unread')
  // findUnreadMessages(@Request() req) {
  //   return this.chatappService.findUnreadMessagesForUser(req.user.id);
  // }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  // @Get('users')
  // async getChatUsers() {
  //   return this.chatappService.findUsersWithChats();
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('admins')
  // async getAdminUsers() {
  //   return this.chatappService.findAdminUsers();
  // }
}
