import { ChatappModule } from './../chatapp/chatapp.module';
import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ChatappModule,
    JwtModule.register({
      secret: 'hoanguan',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class ChatModule {}
