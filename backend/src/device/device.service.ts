import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { MfaOtpService } from '../mfa-otp/mfa-otp.service';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import os from 'os';

@Injectable()
export class DeviceService {
  private readonly cachePrefix = 'device_';
  constructor(
    private readonly mfaOtpService: MfaOtpService,
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // async handleDeviceLogin(
  //   user: User,
  //   deviceType: string,
  //   browser: string,
  //   ipAddress: string,
  // ) {
  //   try {
  //     const existingDevice = await this.deviceRepository.findOne({
  //       where: { user, deviceType, browser },
  //     });

  //     if (existingDevice) {
  //       // New device detected, trigger MFA
  //       await this.mfaOtpService.createMfaOtp(user.email);
  //       // Store the email in the cache with the OTP as the key
  //       const otp = await this.mfaOtpService.createMfaOtp(user.email);
  //       const deviceInfo = {
  //         email: user.email,
  //         deviceType: deviceType || 'Unknown Device',
  //         browser: browser || 'Unknown Browser',
  //         ipAddress: ipAddress || 'Unknown IP',
  //         userId: user.id,
  //       };
  //       await this.cacheManager.set(`nguyenle`, user.email); // TTL of 5 minutes
  //       await this.cacheManager.set(`device`, deviceInfo);
  //       existingDevice.lastLoginAt = new Date();
  //       existingDevice.ipAddress = ipAddress;
  //       await this.deviceRepository.save(existingDevice);
  //       return {
  //         success: true,
  //         user: {
  //           id: user.id,
  //           name: user.name,
  //           email: user.email,
  //         },
  //       };
  //     }
  //   } catch (error) {
  //     throw new HttpException(
  //       'MFA required due to new device login asdasd',
  //       HttpStatus.UNAUTHORIZED,
  //     );
  //   }
  // }
  private getLocalIpAddress(): string | undefined {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
      const interfaces = networkInterfaces[interfaceName];
      if (interfaces) {
        for (const iface of interfaces) {
          // Check for IPv4 and ensure it's not an internal (i.e., 127.0.0.1) address
          if (iface.family === 'IPv4' && !iface.internal) {
            return iface.address;
          }
        }
      }
    }
    return undefined;
  }
  async handleDeviceLogin(
    user: User,
    deviceType: string,
    browser: string,
    ipAddress: string = this.getLocalIpAddress(),
  ) {
    try {
      // Check if this device exists for this user
      const existingDevice = await this.deviceRepository.findOne({
        where: { browser },
      });

      // If device already exists in database, allow login without MFA
      if (existingDevice) {
        // Update last login info
        existingDevice.lastLoginAt = new Date();
        existingDevice.ipAddress = ipAddress;
        await this.deviceRepository.save(existingDevice);

        // Return successful login without requiring MFA
        return {
          success: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        };
      }

      // Device doesn't exist, require MFA
      // Generate OTP - only call once to avoid duplication
      await this.mfaOtpService.createMfaOtp(user.email);

      // Store device info in cache using the OTP as key
      const deviceInfo = {
        email: user.email,
        deviceType: deviceType || 'Unknown Device',
        browser: browser || 'Unknown Browser',
        ipAddress: ipAddress || 'Unknown IP',
        userId: user.id,
      };

      // Store in cache for verification later
      await this.cacheManager.set(`device`, deviceInfo);
      await this.cacheManager.set(`nguyenle`, user.email);

      return {
        success: 'mfa success',
        message: 'MFA required due to new device login',
        requireMfa: true,
      };
    } catch (error) {
      // If it's our custom exception for MFA, rethrow it
      if (
        error instanceof HttpException &&
        error.getResponse() instanceof Object &&
        (error.getResponse() as any).message ===
          'MFA required due to new device login'
      ) {
        throw error;
      }

      // Otherwise log the error and throw a generic error
      console.error('Error in handleDeviceLogin:', error);
      throw new HttpException(
        'Error processing device login',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // async verifyMfa(
  //   otp: string,
  // ): Promise<{ message: string; user: Partial<User> }> {
  //   // Verify the OTP using the MFA service
  //   const deviceInfo = await this.cacheManager.get<{
  //     email: string;
  //     deviceType: string;
  //     browser: string;
  //     ipAddress: string;
  //     userId: number;
  //   }>(`device`);
  //   const email = await this.cacheManager.get<string>('nguyenle');
  //   if (!email) {
  //     throw new HttpException(
  //       'Invalid or expired OTP',
  //       HttpStatus.UNAUTHORIZED,
  //     );
  //   }
  //   const isValid = await this.mfaOtpService.verifyMfaOtp(email, otp);
  //   if (!isValid) {
  //     throw new HttpException(
  //       'Invalid or expired OTP',
  //       HttpStatus.UNAUTHORIZED,
  //     );
  //   }
  //   const user = await this.findUserByEmail(email);

  //   if (!user) {
  //     throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
  //   }

  //   // Create a new device record
  //   const newDevice = this.deviceRepository.create({
  //     user,
  //     deviceType: deviceInfo.deviceType, // You can retrieve this from the cache as well if needed
  //     browser: deviceInfo.browser, // Same as above
  //     ipAddress: deviceInfo.ipAddress, // Same as above
  //     lastLoginAt: new Date(),
  //   });

  //   await this.deviceRepository.save(newDevice);

  //   // Remove the OTP from the cache after successful verification
  //   await this.cacheManager.del(`nguyenle`);

  //   return {
  //     message: 'MFA verification successful',
  //     user: {
  //       id: user.id,
  //       name: user.name,
  //       email: user.email,
  //     },
  //   };
  // }
  async verifyMfa(
    otp: string,
  ): Promise<{ message: string; user: Partial<User> }> {
    // First get the email from cache
    const email = await this.cacheManager.get<string>('nguyenle');
    if (!email) {
      throw new HttpException(
        'Invalid or expired OTP session',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Verify the OTP using the MFA service
    const isValid = await this.mfaOtpService.verifyMfaOtp(email, otp);
    if (!isValid) {
      throw new HttpException(
        'Invalid or expired OTP',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Get the user
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // Try to get device info from cache
    const deviceInfo = await this.cacheManager.get<{
      email: string;
      deviceType: string;
      browser: string;
      ipAddress: string;
      userId: number;
      visitorId: string;
      userAgent: string;
      geoLocation?: string;
    }>(`device`);

    // Create a new device record with fallback values if cache is missing
    const newDevice = this.deviceRepository.create({
      user,
      deviceType: deviceInfo?.deviceType || 'Unknown Device',
      browser: deviceInfo?.browser || 'Unknown Browser',
      ipAddress: deviceInfo?.ipAddress || '0.0.0.0',
      visitorId: deviceInfo?.visitorId,
      geoLocation: deviceInfo?.geoLocation || 'Unknown Location',
      userAgent: deviceInfo?.userAgent || 'Unknown User Agent',
      lastLoginAt: new Date(),
    });

    await this.deviceRepository.save(newDevice);

    // Remove the OTP from the cache after successful verification
    await this.cacheManager.del(`nguyenle`);
    await this.cacheManager.del(`device`);

    return {
      message: 'MFA verification successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async checkAndSaveDevice(
    user: User,
    visitorId: string,
    userAgent: string,
    ipAddress: string,
    geoLocation: string,
  ) {
    const existing = await this.deviceRepository.findOne({
      where: {
        user: { id: user.id },
        visitorId,
        userAgent,
        ipAddress,
      },
    });

    if (existing) {
      existing.lastLoginAt = new Date();
      existing.ipAddress = ipAddress;
      existing.geoLocation = geoLocation;
      existing.userAgent = userAgent;
      await this.deviceRepository.save(existing);
      return { known: true };
    }

    // const newDevice = this.deviceRepository.create({
    //   user,
    //   visitorId,
    //   userAgent,
    //   ipAddress,
    //   geoLocation,
    //   browser,
    //   deviceType,
    //   lastLoginAt: new Date(),
    // });

    // await this.deviceRepository.save(newDevice);
    return { known: false };
  }
  async saveDeviceInfoToCache(
    email: string,
    deviceType: string,
    userAgent: string,
    ipAddress: string,
    geoLocation: any,
    userId: number,
    visitorId: string, // visitorId is FingerprintJS ID
  ) {
    await this.cacheManager.set(`device`, {
      email,
      deviceType,
      browser: userAgent, // Assuming userAgent contains browser info
      ipAddress,
      userId,
      visitorId, // Store FingerprintJS ID in cache
      userAgent,
      geoLocation,
    });
  }
  private extractBrowser(userAgent: string): string {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  private extractDeviceType(userAgent: string): string {
    if (/mobile/i.test(userAgent)) return 'Mobile';
    if (/tablet/i.test(userAgent)) return 'Tablet';
    return 'Desktop';
  }

  private async isNewDevice(
    user: User,
    deviceType: string,
    browser: string,
  ): Promise<boolean> {
    // Logic to determine if the device is new
    // This could involve checking a database or cache for existing device records
    // For simplicity, let's assume a function that checks the database
    const existingDevice = await this.deviceRepository.findOne({
      where: { user, deviceType, browser },
    });

    return !existingDevice;
  }
  private async findUserByEmail(email: string): Promise<User | null> {
    // This is a placeholder - implement this based on your actual User repository
    const userRepository = this.deviceRepository.manager.getRepository(User);
    return userRepository.findOne({ where: { email } });
  }
  private async updateDeviceInfo(
    user: User,
    deviceType: string,
    browser: string,
    ipAddress: string,
  ): Promise<void> {
    // Logic to update the device information in the database
    const existingDevice = await this.deviceRepository.findOne({
      where: { user, deviceType, browser },
    });

    if (existingDevice) {
      existingDevice.lastLoginAt = new Date();
      existingDevice.ipAddress = ipAddress;
      await this.deviceRepository.save(existingDevice);
    } else {
      // Create a new device record if it doesn't exist
      const newDevice = this.deviceRepository.create({
        user,
        deviceType,
        browser,
        ipAddress,
        lastLoginAt: new Date(),
      });
      await this.deviceRepository.save(newDevice);
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
}
