import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Request,
  UnauthorizedException,
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
import { DeviceService } from '../device/device.service';
import { LoginDto } from './dto/login.dto';
import { ActivityTrackingService } from 'src/activity-tracking-service/activity-tracking-service.service';

interface AuthenticatedRequest extends ExpressRequest {
  user?: User;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly mfaOtpService: MfaOtpService,
    private readonly deviceService: DeviceService,
    private readonly activityTrackingService: ActivityTrackingService,
    private emailService: EmailService,
  ) {}
  // @Post('register')
  // async register(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
  //   return this.authService.registerSendMfaOtp(createUserDto, req);
  // }
  // @Post('verify-mfa')
  // async verifyMfaOtp(
  //   @Body()
  //   verifyMfaDto: {
  //     otp: string;
  //   },
  // ) {
  //   return this.authService.verifyMfa(verifyMfaDto.otp);
  // }

  // implement with register improvemented
  @Post('verify-mfa')
  async verifyMfaOtp(
    @Body()
    verifyMfaDto: {
      otp: string;
      visitorId: string;
    },
  ) {
    return this.authService.verifyMfa(verifyMfaDto.otp, verifyMfaDto.visitorId);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: LoginDto, @Req() req: AuthenticatedRequest) {
    try {
      const { email, password, visitorId } = body;
      const user = await this.usersService.validateUser(email, password);

      if (!user) throw new UnauthorizedException();

      console.log('🔐 Login request received:', {
        userId: user.id,
        email: user.email,
        ipAddress: req['ipAddress'] || req.ip,
        userAgent: req['userAgent'] || req.headers['user-agent'],
        geo: req['geo'],
      });

      const loginResult = await this.authService.validateLogin(
        user,
        visitorId,
        req,
      );

      // Track login activity regardless of result - but only if successful
      if (loginResult.success === 'login success') {
        console.log('✅ Login successful, tracking activity...');

        try {
          await this.activityTrackingService.trackUserLogin(
            user.id,
            {
              name: user.name,
              email: user.email,
              loginMethod: 'email',
              deviceType: this.detectDeviceType(
                req.headers['user-agent'] || '',
              ),
            },
            req,
          );
          console.log('📊 Login activity tracked successfully');
        } catch (trackingError) {
          console.error('❌ Error tracking login activity:', trackingError);
          // Don't fail the login if tracking fails
        }
      }

      return loginResult;
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Body() body: LoginDto, @Req() req: Request) {
  //   const { email, password, visitorId } = body;
  //   const user = await this.usersService.validateUser(email, password);

  //   if (!user) throw new UnauthorizedException();

  //   console.log('Login request received with middleware data:', {
  //     ipAddress: req['ipAddress'],
  //     userAgent: req['userAgent'],
  //     geo: req['geo'],
  //   });

  //   const loginResult = await this.authService.validateLogin(
  //     user,
  //     visitorId,
  //     req,
  //   );

  //   if (loginResult.success === 'login success') {
  //     await this.activityTrackingService.trackUserLogin(user.id, req);
  //   }
  //   return loginResult;
  // }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    console.log('Register request received with middleware data:', {
      ipAddress: req['ipAddress'],
      userAgent: req['userAgent'],
      geo: req['geo'],
    });

    return this.authService.registerSendMfaOtp(createUserDto, req);
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Body() body: LoginDto, @Req() req: Request) {
  //   const { email, password, visitorId } = body;
  //   const user = await this.usersService.validateUser(email, password);

  //   if (!user) throw new UnauthorizedException();

  //   // const userAgent = req.headers['user-agent'] || '';
  //   // const deviceType =
  //   //   req.headers['device-type'] || this.detectDeviceType(userAgent);
  //   const loginResult = await this.authService.validateLogin(
  //     user,
  //     visitorId,
  //     // deviceType,
  //     // userAgent,
  //     // req,
  //   );
  //   return loginResult;
  // }

  private detectDeviceType(userAgent: string): string {
    if (!userAgent) return 'Unknown';

    if (/mobile/i.test(userAgent)) return 'Mobile';
    if (/tablet/i.test(userAgent)) return 'Tablet';
    if (/ipad/i.test(userAgent)) return 'Tablet';
    if (userAgent.includes('Postman')) return 'API Testing Tool';

    return 'Desktop';
  }
  @Post('verify-mfa-device')
  async verifyMfa(@Request() request, @Body() body: { otp: string }) {
    try {
      // Get the visitorId from the request body or generate a fallback
      // Pass the visitorId to the verifyMfa method
      const { user } = await this.deviceService.verifyMfa(body.otp);
      const user_info = await this.authService.login(user as User);

      return {
        user_info,
        success: 'login success',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @Post('verify-mfa-device')
  // async verifyMfa(@Request() request, @Body() body: { otp: string }) {
  //   try {
  //     const { user } = await this.deviceService.verifyMfa(body.otp);
  //     const user_info = await this.authService.login(user as User);
  //     return {
  //       user_info,
  //       success: 'login success',
  //     };
  //   } catch (error) {
  //     throw new HttpException(
  //       error.message,
  //       error.status || HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  // implement fake ip and vpn for login
  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Request() request: ExpressRequest) {
  //   const user = request.user as User;
  //   const ip = this.getClientIp(request); // Get the user's IP address
  //   const userAgent = request.headers['user-agent']; // Get the user's device and browser info
  //   return this.authService.login(user, ip, userAgent); // Pass the IP and user agent to the login method
  // }

  // private getClientIp(request: ExpressRequest): string {
  //   // Try to get the IP from various headers
  //   const forwardedFor = request.headers['x-forwarded-for'];
  //   if (forwardedFor) {
  //     // X-Forwarded-For can contain multiple IPs, the first one is the client
  //     return forwardedFor.toString().split(',')[0].trim();
  //   }

  //   const realIp = request.headers['x-real-ip'];
  //   if (realIp) {
  //     return realIp.toString();
  //   }

  //   // Fallback to connection remote address
  //   const remoteAddress = request.connection.remoteAddress;
  //   if (remoteAddress) {
  //     // Remove IPv6 prefix if present
  //     return remoteAddress.replace('::ffff:', '');
  //   }

  //   // If we're in development and can't get a real IP, use a test IP
  //   if (process.env.NODE_ENV === 'development') {
  //     return '8.8.8.8'; // Use Google's DNS as a fallback for testing
  //   }

  //   // Default fallback
  //   return '127.0.0.1';
  // }
  // @UseGuards(JwtAuthGuard)
  // @Post('verify-mfa-ip')
  // async verifyMfaOtpIp(
  //   @Body() body: { otp: string },
  //   @Request() request: ExpressRequest,
  // ) {
  //   const user = request.user as User; // Get the authenticated user
  //   return this.authService.verifyMfaIp(user.email, body.otp); // Pass the email and OTP to the service
  // }
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
