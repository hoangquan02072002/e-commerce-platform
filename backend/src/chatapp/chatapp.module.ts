import { Module } from '@nestjs/common';
import { ChatappService } from './chatapp.service';
import { ChatappController } from './chatapp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './entities/chatapp.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage]), UsersModule],
  controllers: [ChatappController],
  providers: [ChatappService],
  exports: [ChatappService],
})
export class ChatappModule {}
