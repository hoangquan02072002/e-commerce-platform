import { Controller } from '@nestjs/common';
import { WebsocketService } from './websocket.service';

@Controller('websocket')
export class WebsocketController {
  constructor(private readonly websocketService: WebsocketService) {}
}
