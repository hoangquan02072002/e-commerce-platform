/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
// import * as bcrypt from 'bcrypt';
// import { User } from 'src/users/entities/user.entity';
import { MfaOtpService } from './../mfa-otp/mfa-otp.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { randomBytes } from 'crypto';
import EmailService from 'src/utils/emailService';
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import axios from 'axios';
import { DeviceService } from '../device/device.service';
@Injectable()
export class AuthService {
  private readonly cachePrefix = 'user_';
  private readonly API_TOKEN = 'e32847469c11c53437f0baf18424c45b';
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mfaOtpService: MfaOtpService,
    private readonly deviceService: DeviceService,

    private emailService: EmailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // eslint-disable-next-line prettier/prettier
  async login(user: User): Promise<{
    access_token: string;
    // success: string;
    user: Partial<User>;
  }> {
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
      // success: 'login success',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async validateLogin(user: User, visitorId: string, req?: any) {
    const { known } = await this.deviceService.checkAndSaveDevice(
      user,
      visitorId,
      req,
    );

    if (!known) {
      await this.mfaOtpService.createMfaOtp(user.email);

      // Use DeviceService to extract all device information
      const deviceInfo = this.deviceService.extractDeviceInfo(req);

      const cacheDeviceInfo = {
        email: user.email,
        userId: user.id,
        visitorId: visitorId,
        ...deviceInfo, // This includes deviceType, browser, ipAddress, geoLocation, userAgent
      };

      console.log('Caching device info:', cacheDeviceInfo);

      await this.cacheManager.set(`device`, cacheDeviceInfo);
      await this.cacheManager.set(`nguyenle`, user.email);

      return {
        success: 'mfa success',
        message: 'MFA required due to new device login',
        requireMfa: true,
      };
    }

    // Device is known, proceed with login
    const payload = { email: user.email, sub: user.id, name: user.name };
    return {
      user_info: {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      success: 'login success',
    };
  }

  async registerSendMfaOtp(
    createUserDto: CreateUserDto,
    req: Request,
  ): Promise<{ status: string; message: string }> {
    try {
      const existingUser = await this.usersService.findByEmail(
        createUserDto.email,
      );
      if (existingUser) {
        throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
      }

      await this.mfaOtpService.createMfaOtp(createUserDto.email);

      const cacheKey = `${this.cachePrefix}${createUserDto.email}`;
      await this.cacheManager.set(cacheKey, createUserDto);
      await this.addCacheKey(cacheKey);

      // Save device information using DeviceService
      await this.deviceService.saveDeviceInfoToCache(req);

      return {
        status: 'success sent code to email',
        message: 'MFA code sent to your email',
      };
    } catch (error) {
      console.error('Error in registerSendMfaOtp:', error);
      throw new HttpException('Error registering user', HttpStatus.BAD_REQUEST);
    }
  }

  // Keep the extractBrowserInfo helper method
  private extractBrowserInfo(userAgent: string): string {
    if (!userAgent || userAgent === 'Unknown User Agent')
      return 'Unknown Browser';

    const ua = userAgent.toLowerCase();

    if (ua.includes('edg/')) return 'Microsoft Edge';
    if (ua.includes('chrome/') && !ua.includes('edg/')) return 'Google Chrome';
    if (ua.includes('firefox/')) return 'Mozilla Firefox';
    if (ua.includes('safari/') && !ua.includes('chrome/')) return 'Safari';
    if (ua.includes('opera/') || ua.includes('opr/')) return 'Opera';
    if (ua.includes('postman')) return 'Postman';
    if (ua.includes('msie') || ua.includes('trident/'))
      return 'Internet Explorer';

    return 'Unknown Browser';
  }
  // async validateLogin(
  //   user: User,
  //   visitorId: string,
  //   // deviceType: string,
  //   // userAgent: string,
  //   // req: Request,
  // ) {
  //   // const ipAddress =
  //   //   req['ipAddress'] || req.headers['x-forwarded-for'] || 'Unknown';
  //   // const geo = req['geo']
  //   //   ? `${req['geo'].city}, ${req['geo'].country}`
  //   //   : 'Unknown Location';

  //   // console.log('IP Address:', ipAddress);
  //   // console.log('Geo information:', req['geo']);

  //   const { known } = await this.deviceService.checkAndSaveDevice(
  //     user,
  //     visitorId,
  //     // userAgent,
  //     // ipAddress,
  //     // geo,
  //   );

  //   if (!known) {
  //     await this.mfaOtpService.createMfaOtp(user.email);
  //     const deviceInfo = {
  //       email: user.email,
  //       // deviceType: deviceType || 'Unknown Device',
  //       // browser: this.extractBrowserInfo(userAgent) || 'Unknown Browser',
  //       // ipAddress: ipAddress || 'Unknown IP',
  //       // // userAgent: userAgent || 'Unknown User Agent hihi',
  //       // geoLocation: geo || 'Unknown Location',
  //       userId: user.id,
  //       visitorId: visitorId,
  //     };
  //     await this.cacheManager.set(`device`, deviceInfo);
  //     await this.cacheManager.set(`nguyenle`, user.email);
  //     return {
  //       success: 'mfa success',
  //       message: 'MFA required due to new device login',
  //       requireMfa: true,
  //     };
  //   }
  //   // thiết bị đã biết → cấp token
  //   // const token = this.jwtService.sign({ sub: user.id });
  //   const payload = { email: user.email, sub: user.id, name: user.name };
  //   return {
  //     user_info: {
  //       access_token: this.jwtService.sign(payload),
  //       user: {
  //         id: user.id,
  //         name: user.name,
  //         email: user.email,
  //         role: user.role,
  //       },
  //     },
  //     success: 'login success',
  //     // access_token: this.jwtService.sign(payload),
  //     // success: 'login success',
  //     // user_info: {
  //     //   id: user.id,
  //     //   name: user.name,
  //     //   email: user.email,
  //     //   role: user.role,
  //     // },
  //   };
  // }
  // async registerSendMfaOtp(
  //   createUserDto: CreateUserDto,
  //   req: Request,
  // ): Promise<{ status: string; message: string }> {
  //   try {
  //     // Check if the email is already in use
  //     const existingUser = await this.usersService.findByEmail(
  //       createUserDto.email,
  //     );
  //     if (existingUser) {
  //       throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
  //     }

  //     // Send MFA OTP to the user's email
  //     await this.mfaOtpService.createMfaOtp(createUserDto.email);

  //     // Cache the user data for later verification
  //     const cacheKey = `${this.cachePrefix}${createUserDto.email}`;
  //     await this.cacheManager.set(cacheKey, createUserDto);
  //     await this.addCacheKey(cacheKey);

  //     // Extract device information from the request
  //     const userAgent = req.headers['user-agent'] || 'Unknown User Agent';
  //     const deviceType =
  //       req.headers['device-type'] ||
  //       this.deviceService.extractDeviceType(userAgent);
  //     const ipAddress =
  //       req['ipAddress'] || req.headers['x-forwarded-for'] || 'Unknown IP';
  //     const geoLocation = req['geo']?.city
  //       ? `${req['geo'].city}, ${req['geo'].region}, ${req['geo'].country}`
  //       : 'Unknown Location';

  //     // Save device information in the cache
  //     await this.deviceService.saveDeviceInfoToCache(
  //       deviceType,
  //       userAgent,
  //       ipAddress,
  //       geoLocation,
  //     );

  //     return {
  //       status: 'success sent code to email',
  //       message: 'MFA code sent to your email',
  //     };
  //   } catch (error) {
  //     console.error('Error in registerSendMfaOtp:', error);
  //     throw new HttpException('Error registering user', HttpStatus.BAD_REQUEST);
  //   }
  // }
  async verifyMfa(
    otp: string,
    visitorId: string,
  ): Promise<{ status: string; message: string; user: Partial<User> }> {
    try {
      const keys = await this.getCacheKeys();
      const email = keys.find(async (key) => {
        const userDto = await this.cacheManager.get<CreateUserDto>(key);
        return (
          userDto &&
          (await this.mfaOtpService.verifyMfaOtp(
            key.replace(this.cachePrefix, ''),
            otp,
          ))
        );
      });

      if (!email) {
        throw new HttpException(
          'Invalid or expired OTP',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const createUserDto = await this.cacheManager.get<CreateUserDto>(email);
      if (!createUserDto) {
        throw new HttpException('User data not found', HttpStatus.BAD_REQUEST);
      }

      const isValid = await this.mfaOtpService.verifyMfaOtp(
        email.replace(this.cachePrefix, ''),
        otp,
      );

      if (!isValid) {
        await this.usersService.incrementOtpAttempts(
          email.replace(this.cachePrefix, ''),
          otp,
        );
        throw new HttpException(
          'Invalid or expired OTP',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const { user } = await this.usersService.createUser(createUserDto);

      await this.usersService.activateUser(user.id);
      await this.usersService.markOtpAsVerified(
        email.replace(this.cachePrefix, ''),
        otp,
      );

      // Retrieve device info from cache
      const deviceInfo = await this.cacheManager.get<{
        deviceType: string;
        browser: string;
        ipAddress: string;
        geoLocation: string;
        userAgent: string;
      }>('device');

      if (!deviceInfo) {
        console.log('Device info not found in cache');
        throw new HttpException(
          'Device info not found',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Save device info in the database
      const newDevice = this.deviceService.createDevice({
        user,
        visitorId,
        deviceType: deviceInfo.deviceType,
        browser: deviceInfo.browser,
        ipAddress: deviceInfo.ipAddress,
        geoLocation: deviceInfo.geoLocation,
        userAgent: deviceInfo.userAgent,
      });

      await this.deviceService.saveDevice(newDevice);

      // Remove cached data
      await this.cacheManager.del(email);
      await this.cacheManager.del('device');
      await this.removeCacheKey(email);

      return {
        status: 'successfully',
        message: 'User created successfully',
        user,
      };
    } catch (error) {
      console.error('Error in verifyMfa:', error);
      throw new HttpException('Error verifying MFA', HttpStatus.BAD_REQUEST);
    }
  }
  // private extractBrowserInfo(userAgent: string): string {
  //   if (!userAgent) return 'Unknown Browser';

  //   if (userAgent.includes('Chrome')) return 'Chrome';
  //   if (userAgent.includes('Firefox')) return 'Firefox';
  //   if (userAgent.includes('Safari')) return 'Safari';
  //   if (userAgent.includes('Edge')) return 'Edge';
  //   if (userAgent.includes('Opera')) return 'Opera';
  //   if (userAgent.includes('Postman')) return 'Postman';
  //   if (userAgent.includes('MSIE') || userAgent.includes('Trident/'))
  //     return 'Internet Explorer';

  //   return 'Unknown Browser';
  // }

  private async getCacheKeys(): Promise<string[]> {
    const keys = await this.cacheManager.get<string[]>('cache_keys');
    return keys || [];
  }

  private async addCacheKey(key: string): Promise<void> {
    const keys = await this.getCacheKeys();
    keys.push(key);
    await this.cacheManager.set('cache_keys', keys);
  }

  private async removeCacheKey(key: string): Promise<void> {
    const keys = await this.getCacheKeys();
    const index = keys.indexOf(key);
    if (index > -1) {
      keys.splice(index, 1);
    }
    await this.cacheManager.set('cache_keys', keys);
  }
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const { email } = forgotPasswordDto;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const resetToken = randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 60000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;

    await this.userRepository.save(user);

    const token_reset = `${resetToken}`;

    await this.emailService.sendEmail(
      user.email,
      'Password Reset Request',
      `You requested a password reset. token: ${token_reset}`,
    );
  }

  async resetPassword(
    token: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<void> {
    if (newPassword !== confirmPassword) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: MoreThan(new Date()),
      },
    });

    if (!user) {
      throw new HttpException(
        'Invalid or expired token',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await this.userRepository.save(user);
  }
}
