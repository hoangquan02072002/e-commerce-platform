import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { DeviceService } from './device.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}
  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  async getMyDevices(@Param('userId') userId: number): Promise<any> {
    // req.user is populated by the JwtAuthGuard with the user from the token
    return await this.deviceService.getAllUserDevices(userId);
  }
}
