import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketController } from './websocket.controller';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [WebsocketController],
  providers: [WebsocketService],
  exports: [WebsocketService],
})
export class WebsocketModule {}
