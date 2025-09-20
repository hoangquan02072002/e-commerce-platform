import {
  Controller,
  Post,
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { User } from '../users/entities/user.entity';
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
  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Request() request) {
  //   const user = request.user as User;
  //   const deviceType = request.headers['device-type'];
  //   const browser = request.headers['user-agent'];
  //   const ipAddress = request.ip;

  //   try {
  //     await this.deviceService.handleDeviceLogin(
  //       user,
  //       deviceType,
  //       browser,
  //       ipAddress,
  //     );
  //     return { message: 'Login successful' };
  //   } catch (error) {
  //     throw new HttpException(
  //       error.message,
  //       error.status || HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
}
