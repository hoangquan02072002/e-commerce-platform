import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { MfaOtpService } from 'src/mfa-otp/mfa-otp.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Cache } from 'cache-manager';
import {
  CreateChangePasswordDto,
  VerifyChangePasswordDto,
} from './dto/create-change-password.dto';

@Injectable()
export class ChangePasswordService {
  private readonly cachePrefix = 'change_password_';
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mfaOtpService: MfaOtpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async requestChangePassword(
    createChangePasswordDto: CreateChangePasswordDto,
  ) {
    const { email, oldPassword, newPassword } = createChangePasswordDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isOldPasswordValid = await this.usersService.validateUser(
      email,
      oldPassword,
    );
    if (!isOldPasswordValid) {
      throw new HttpException('Invalid old password', HttpStatus.UNAUTHORIZED);
    }

    await this.mfaOtpService.createMfaOtp(email);
    await this.cacheManager.set(`${this.cachePrefix}${email}`, {
      oldPassword,
      newPassword,
    });
    await this.addCacheKey(`${this.cachePrefix}${email}`);

    return { message: 'OTP sent to your email' };
  }

  async verifyChangePassword(verifyChangePasswordDto: VerifyChangePasswordDto) {
    const { otp } = verifyChangePasswordDto;

    const keys = await this.getCacheKeys();
    const email = await this.findEmailByOtp(keys, otp);
    console.log(email);

    if (!email) {
      throw new HttpException(
        'Invalid or expired OTP',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const cachedData = await this.cacheManager.get<{
      oldPassword: string;
      newPassword: string;
    }>(email);
    if (!cachedData) {
      throw new HttpException(
        'Password change request not found or expired',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isValidOtp = await this.mfaOtpService.verifyMfaOtp(
      email.replace(this.cachePrefix, ''),
      otp,
    );
    if (!isValidOtp) {
      await this.usersService.incrementOtpAttempts(
        email.replace(this.cachePrefix, ''),
        otp,
      );
      throw new HttpException(
        'Invalid or expired OTP',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.usersService.updatePassword(
      email.replace(this.cachePrefix, ''),
      cachedData.newPassword,
    );
    await this.usersService.markOtpAsVerified(
      email.replace(this.cachePrefix, ''),
      otp,
    );
    await this.cacheManager.del(email);
    await this.removeCacheKey(email);

    return { message: 'Password changed successfully' };
  }

  private async findEmailByOtp(
    keys: string[],
    otp: string,
  ): Promise<string | null> {
    for (const key of keys) {
      const email = key.replace(this.cachePrefix, '');
      const isValidOtp = await this.mfaOtpService.verifyMfaOtp(email, otp);
      if (isValidOtp) {
        return key;
      }
    }
    return null;
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
}
