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
@Injectable()
export class AuthService {
  private readonly cachePrefix = 'user_';
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mfaOtpService: MfaOtpService,
    private emailService: EmailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // eslint-disable-next-line prettier/prettier
  async login(user: User): Promise<{
    access_token: string;
    success: string;
    user: Partial<User>;
  }> {
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
      success: 'login success',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async registerSendMfaOtp(createUserDto: CreateUserDto) {
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

      return {
        status: 'success sent code to email',
        message: 'MFA code sent to your email',
      };
    } catch (error) {
      throw new HttpException('Error registering user', HttpStatus.BAD_REQUEST);
    }
  }
  async verifyMfa(otp: string) {
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

      await this.cacheManager.del(email);
      await this.removeCacheKey(email);

      return {
        status: 'successfully',
        message: 'User created successfully',
        user,
      };
    } catch (error) {
      throw new HttpException('Error verifying MFA', HttpStatus.BAD_REQUEST);
    }
  }
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
