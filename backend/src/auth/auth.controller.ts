import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
// import { User } from '../users/entities/user.entity';
// import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './strategies/roles.decorator';
import { EmailService } from './../utils/emailService';
import { MfaOtpService } from './../mfa-otp/mfa-otp.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly mfaOtpService: MfaOtpService,
    private emailService: EmailService,
  ) {}
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerSendMfaOtp(createUserDto);
  }
  @Post('verify-mfa')
  async verifyMfaOtp(
    @Body()
    verifyMfaDto: {
      otp: string;
    },
  ) {
    return this.authService.verifyMfa(verifyMfaDto.otp);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() request: ExpressRequest) {
    const user = request.user as User;
    return this.authService.login(user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('/admin')
  getAdminData(@Request() req) {
    return { message: 'This is admin data', user: req.user };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    try {
      await this.authService.forgotPassword(forgotPasswordDto);
      return {
        status: 'token sent to email successfully',
        message: 'Password reset link sent to your email',
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error processing request',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('reset-password')
  async resetPassword(
    @Body()
    body: {
      token: string;
      newPassword: string;
      confirmPassword: string;
    },
  ) {
    try {
      await this.authService.resetPassword(
        body.token,
        body.newPassword,
        body.confirmPassword,
      );
      return {
        status: 'Password reset successfully',
        message: 'Password reset successfully',
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error processing request',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
