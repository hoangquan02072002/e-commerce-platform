import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ChangePasswordService } from './change-password.service';
import {
  CreateChangePasswordDto,
  VerifyChangePasswordDto,
} from './dto/create-change-password.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('change-password')
export class ChangePasswordController {
  constructor(private readonly changePasswordService: ChangePasswordService) {}
  @UseGuards(JwtAuthGuard)
  @Post('request-change-password')
  async requestChangePassword(
    @Body() createChangePasswordDto: CreateChangePasswordDto,
  ) {
    return this.changePasswordService.requestChangePassword(
      createChangePasswordDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify-change-password')
  async verifyChangePassword(
    @Body() verifyChangePasswordDto: VerifyChangePasswordDto,
  ) {
    return this.changePasswordService.verifyChangePassword(
      verifyChangePasswordDto,
    );
  }
}
