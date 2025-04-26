import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chatapp.dto';
// import { UpdateChatappDto } from './dto/update-chatapp.dto';
import { ChatappService } from '../chatapp/chatapp.service';

@Controller('chatapp')
export class ChatappController {
  constructor(private readonly chatappService: ChatappService) {}

  @Post()
  create(@Body() createChatappDto: CreateChatDto) {
    return this.chatappService.create(createChatappDto);
  }

  // @Get()
  // findAll() {
  //   return this.chatService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.chatappService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateChatappDto: UpdateChatappDto) {
  //   return this.chatappService.update(+id, updateChatappDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.chatappService.remove(+id);
  // }
}
