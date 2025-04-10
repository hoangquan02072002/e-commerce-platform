import {
  Controller,
  Post,
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { User } from '../users/entities/user.entity';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

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
