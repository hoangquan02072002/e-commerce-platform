// import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
// import { MfaOtpService } from '../mfa-otp/mfa-otp.service';
// import { User } from '../users/entities/user.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Device } from './entities/device.entity';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import { Cache } from 'cache-manager';
// import os from 'os';

// @Injectable()
// export class DeviceService {
//   private readonly cachePrefix = 'device_';
//   constructor(
//     private readonly mfaOtpService: MfaOtpService,
//     @InjectRepository(Device)
//     private readonly deviceRepository: Repository<Device>,
//     @Inject(CACHE_MANAGER) private cacheManager: Cache,
//   ) {}
//   async getAllUserDevices(userId: number): Promise<Device[]> {
//     try {
//       const devices = await this.deviceRepository.find({
//         where: { user: { id: userId } },
//         relations: ['user'],
//       });

//       return devices;
//     } catch (error) {
//       console.error('Error fetching user devices:', error);
//       throw new HttpException(
//         'Failed to retrieve user devices',
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }
//   private getLocalIpAddress(): string | undefined {
//     const networkInterfaces = os.networkInterfaces();
//     for (const interfaceName in networkInterfaces) {
//       const interfaces = networkInterfaces[interfaceName];
//       if (interfaces) {
//         for (const iface of interfaces) {
//           // Check for IPv4 and ensure it's not an internal (i.e., 127.0.0.1) address
//           if (iface.family === 'IPv4' && !iface.internal) {
//             return iface.address;
//           }
//         }
//       }
//     }
//     return undefined;
//   }
//   async handleDeviceLogin(
//     user: User,
//     deviceType: string,
//     browser: string,
//     ipAddress: string = this.getLocalIpAddress(),
//   ) {
//     try {
//       // Check if this device exists for this user
//       const existingDevice = await this.deviceRepository.findOne({
//         where: { browser },
//       });

//       // If device already exists in database, allow login without MFA
//       if (existingDevice) {
//         // Update last login info
//         existingDevice.lastLoginAt = new Date();
//         existingDevice.ipAddress = ipAddress;
//         await this.deviceRepository.save(existingDevice);

//         // Return successful login without requiring MFA
//         return {
//           success: true,
//           user: {
//             id: user.id,
//             name: user.name,
//             email: user.email,
//           },
//         };
//       }

//       // Device doesn't exist, require MFA
//       // Generate OTP - only call once to avoid duplication
//       await this.mfaOtpService.createMfaOtp(user.email);

//       // Store device info in cache using the OTP as key
//       const deviceInfo = {
//         email: user.email,
//         deviceType: deviceType || 'Unknown Device',
//         browser: browser || 'Unknown Browser',
//         ipAddress: ipAddress || 'Unknown IP',
//         userId: user.id,
//       };

//       // Store in cache for verification later
//       await this.cacheManager.set(`device`, deviceInfo);
//       await this.cacheManager.set(`nguyenle`, user.email);

//       return {
//         success: 'mfa success',
//         message: 'MFA required due to new device login',
//         requireMfa: true,
//       };
//     } catch (error) {
//       // If it's our custom exception for MFA, rethrow it
//       if (
//         error instanceof HttpException &&
//         error.getResponse() instanceof Object &&
//         (error.getResponse() as any).message ===
//           'MFA required due to new device login'
//       ) {
//         throw error;
//       }

//       // Otherwise log the error and throw a generic error
//       console.error('Error in handleDeviceLogin:', error);
//       throw new HttpException(
//         'Error processing device login',
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }

//   createDevice(deviceData: {
//     user: User;
//     visitorId: string;
//     deviceType: string;
//     browser: string;
//     ipAddress: string;
//     geoLocation: string;
//     userAgent: string;
//   }): Device {
//     return this.deviceRepository.create({
//       user: deviceData.user,
//       visitorId: deviceData.visitorId,
//       deviceType: deviceData.deviceType,
//       browser: deviceData.browser,
//       ipAddress: deviceData.ipAddress,
//       geoLocation: deviceData.geoLocation,
//       userAgent: deviceData.userAgent,
//       lastLoginAt: new Date(),
//     });
//   }
//   async saveDevice(device: Device): Promise<Device> {
//     return this.deviceRepository.save(device);
//   }
//   // async verifyMfa(
//   //   otp: string,
//   // ): Promise<{ message: string; user: Partial<User> }> {
//   //   // Verify the OTP using the MFA service
//   //   const deviceInfo = await this.cacheManager.get<{
//   //     email: string;
//   //     deviceType: string;
//   //     browser: string;
//   //     ipAddress: string;
//   //     userId: number;
//   //   }>(`device`);
//   //   const email = await this.cacheManager.get<string>('nguyenle');
//   //   if (!email) {
//   //     throw new HttpException(
//   //       'Invalid or expired OTP',
//   //       HttpStatus.UNAUTHORIZED,
//   //     );
//   //   }
//   //   const isValid = await this.mfaOtpService.verifyMfaOtp(email, otp);
//   //   if (!isValid) {
//   //     throw new HttpException(
//   //       'Invalid or expired OTP',
//   //       HttpStatus.UNAUTHORIZED,
//   //     );
//   //   }
//   //   const user = await this.findUserByEmail(email);

//   //   if (!user) {
//   //     throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
//   //   }

//   //   // Create a new device record
//   //   const newDevice = this.deviceRepository.create({
//   //     user,
//   //     deviceType: deviceInfo.deviceType, // You can retrieve this from the cache as well if needed
//   //     browser: deviceInfo.browser, // Same as above
//   //     ipAddress: deviceInfo.ipAddress, // Same as above
//   //     lastLoginAt: new Date(),
//   //   });

//   //   await this.deviceRepository.save(newDevice);

//   //   // Remove the OTP from the cache after successful verification
//   //   await this.cacheManager.del(`nguyenle`);

//   //   return {
//   //     message: 'MFA verification successful',
//   //     user: {
//   //       id: user.id,
//   //       name: user.name,
//   //       email: user.email,
//   //     },
//   //   };
//   // }
//   async verifyMfa(
//     otp: string,
//   ): Promise<{ message: string; user: Partial<User> }> {
//     // First get the email from cache
//     const email = await this.cacheManager.get<string>('nguyenle');
//     if (!email) {
//       throw new HttpException(
//         'Invalid or expired OTP session',
//         HttpStatus.UNAUTHORIZED,
//       );
//     }

//     // Verify the OTP using the MFA service
//     const isValid = await this.mfaOtpService.verifyMfaOtp(email, otp);
//     if (!isValid) {
//       throw new HttpException(
//         'Invalid or expired OTP',
//         HttpStatus.UNAUTHORIZED,
//       );
//     }

//     // Get the user
//     const user = await this.findUserByEmail(email);
//     if (!user) {
//       throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
//     }

//     // Try to get device info from cache
//     const deviceInfo = await this.cacheManager.get<{
//       email: string;
//       deviceType: string;
//       browser: string;
//       ipAddress: string;
//       userId: number;
//       visitorId: string;
//       userAgent: string;
//       geoLocation?: string;
//     }>(`device`);

//     // Create a new device record with fallback values if cache is missing
//     const newDevice = this.deviceRepository.create({
//       user,
//       deviceType: deviceInfo?.deviceType || 'Unknown Device',
//       browser: deviceInfo?.browser || 'Unknown Browser',
//       ipAddress: deviceInfo?.ipAddress || '0.0.0.0',
//       visitorId: deviceInfo?.visitorId,
//       geoLocation: deviceInfo?.geoLocation || 'Unknown Location',
//       userAgent: deviceInfo?.userAgent || 'Unknown User Agent',
//       lastLoginAt: new Date(),
//     });

//     await this.deviceRepository.save(newDevice);

//     // Remove the OTP from the cache after successful verification
//     await this.cacheManager.del(`nguyenle`);
//     await this.cacheManager.del(`device`);

//     return {
//       message: 'MFA verification successful',
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     };
//   }

//   async checkAndSaveDevice(
//     user: User,
//     visitorId: string,
//     // userAgent: string,
//     // ipAddress: string,
//     // geoLocation: string,
//   ) {
//     const existing = await this.deviceRepository.findOne({
//       where: {
//         user: { id: user.id },
//         visitorId,
//         // userAgent,
//         // ipAddress,
//       },
//     });

//     if (existing) {
//       existing.lastLoginAt = new Date();
//       // existing.ipAddress = ipAddress;
//       // existing.geoLocation = geoLocation;
//       // existing.userAgent = userAgent;
//       await this.deviceRepository.save(existing);
//       return { known: true };
//     }

//     // const newDevice = this.deviceRepository.create({
//     //   user,
//     //   visitorId,
//     //   userAgent,
//     //   ipAddress,
//     //   geoLocation,
//     //   browser,
//     //   deviceType,
//     //   lastLoginAt: new Date(),
//     // });

//     // await this.deviceRepository.save(newDevice);
//     return { known: false };
//   }
//   async saveDeviceInfoToCache(
//     deviceType: string,
//     userAgent: string,
//     ipAddress: string,
//     geoLocation: string,
//   ): Promise<void> {
//     const browser = this.extractBrowser(userAgent);
//     const deviceInfo = {
//       deviceType: deviceType || 'Unknown Device',
//       browser: browser || 'Unknown Browser',
//       ipAddress: ipAddress || 'Unknown IP',
//       geoLocation: geoLocation || 'Unknown Location',
//       userAgent: userAgent || 'Unknown User Agent',
//     };
//     await this.cacheManager.set('device', deviceInfo);
//   }

//   private extractBrowser(userAgent: string): string {
//     if (userAgent.includes('Chrome')) return 'Chrome';
//     if (userAgent.includes('Firefox')) return 'Firefox';
//     if (userAgent.includes('Safari')) return 'Safari';
//     if (userAgent.includes('Edge')) return 'Edge';
//     return 'Unknown';
//   }

//   public extractDeviceType(userAgent: string): string {
//     if (/mobile/i.test(userAgent)) return 'Mobile';
//     if (/tablet/i.test(userAgent)) return 'Tablet';
//     return 'Desktop';
//   }

//   private async isNewDevice(
//     user: User,
//     deviceType: string,
//     browser: string,
//   ): Promise<boolean> {
//     // Logic to determine if the device is new
//     // This could involve checking a database or cache for existing device records
//     // For simplicity, let's assume a function that checks the database
//     const existingDevice = await this.deviceRepository.findOne({
//       where: { user, deviceType, browser },
//     });

//     return !existingDevice;
//   }
//   private async findUserByEmail(email: string): Promise<User | null> {
//     // This is a placeholder - implement this based on your actual User repository
//     const userRepository = this.deviceRepository.manager.getRepository(User);
//     return userRepository.findOne({ where: { email } });
//   }
//   private async updateDeviceInfo(
//     user: User,
//     deviceType: string,
//     browser: string,
//     ipAddress: string,
//   ): Promise<void> {
//     // Logic to update the device information in the database
//     const existingDevice = await this.deviceRepository.findOne({
//       where: { user, deviceType, browser },
//     });

//     if (existingDevice) {
//       existingDevice.lastLoginAt = new Date();
//       existingDevice.ipAddress = ipAddress;
//       await this.deviceRepository.save(existingDevice);
//     } else {
//       // Create a new device record if it doesn't exist
//       const newDevice = this.deviceRepository.create({
//         user,
//         deviceType,
//         browser,
//         ipAddress,
//         lastLoginAt: new Date(),
//       });
//       await this.deviceRepository.save(newDevice);
//     }
//   }
//   private async getCacheKeys(): Promise<string[]> {
//     const keys = await this.cacheManager.get<string[]>('cache_keys');
//     return keys || [];
//   }
//   private async addCacheKey(key: string): Promise<void> {
//     const keys = await this.getCacheKeys();
//     keys.push(key);
//     await this.cacheManager.set('cache_keys', keys);
//   }
// }

import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { MfaOtpService } from '../mfa-otp/mfa-otp.service';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class DeviceService {
  private readonly cachePrefix = 'device_';

  constructor(
    private readonly mfaOtpService: MfaOtpService,
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // Make this method public
  public extractDeviceType(userAgent: string): string {
    if (!userAgent || userAgent === 'Unknown User Agent')
      return 'Desktop Computer';

    const ua = userAgent.toLowerCase();

    // Mobile devices
    if (ua.includes('iphone')) return 'iPhone';
    if (ua.includes('ipad')) return 'iPad';
    if (ua.includes('android') && ua.includes('mobile')) return 'Android Phone';
    if (ua.includes('android')) return 'Android Tablet';
    if (ua.includes('windows phone')) return 'Windows Phone';

    // Desktop/Laptop
    if (ua.includes('windows')) return 'Windows Desktop';
    if (ua.includes('macintosh') || ua.includes('mac os x'))
      return 'Mac Desktop';
    if (ua.includes('linux')) return 'Linux Desktop';

    // General categories
    if (ua.includes('mobile')) return 'Mobile Device';
    if (ua.includes('tablet')) return 'Tablet';

    return 'Desktop Computer';
  }

  // Enhanced browser detection
  public extractBrowser(userAgent: string): string {
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

  // Extract device information from request (with middleware data)
  public extractDeviceInfo(req: any) {
    // Get data from middleware
    const geo = req['geo'] || {};
    const userAgent =
      req['userAgent'] || req.headers?.['user-agent'] || 'Unknown User Agent';
    const ipAddress = req['ipAddress'] || this.getRealIpAddress(req);

    console.log('Raw request data:', {
      geo,
      userAgent,
      ipAddress,
      headers: req.headers,
    });

    // Extract device info
    const deviceType = this.extractDeviceType(userAgent);
    const browser = this.extractBrowser(userAgent);

    // Format location from geo data
    let geoLocation = 'Unknown Location';
    if (geo && typeof geo === 'object') {
      if (geo.city && geo.region && geo.country) {
        if (
          geo.city === 'Local' &&
          geo.region === 'Local' &&
          geo.country === 'Local'
        ) {
          geoLocation = 'Local Network';
        } else {
          geoLocation = `${geo.city}, ${geo.region}, ${geo.country}`;
        }
      } else if (geo.city || geo.region || geo.country) {
        const parts = [geo.city, geo.region, geo.country].filter(Boolean);
        geoLocation = parts.join(', ') || 'Unknown Location';
      }
    }

    const result = {
      deviceType,
      browser,
      ipAddress,
      geoLocation,
      userAgent,
    };

    console.log('Extracted device info:', result);
    return result;
  }

  // Get real IP address from request headers
  private getRealIpAddress(req: any): string {
    // Try different headers in order of preference
    const forwarded = req.headers?.['x-forwarded-for'];
    const realIp = req.headers?.['x-real-ip'];
    const cfConnectingIp = req.headers?.['cf-connecting-ip'];

    if (forwarded) {
      // x-forwarded-for can contain multiple IPs, take the first one
      const ip = forwarded.split(',')[0].trim();
      return ip.replace('::ffff:', ''); // Remove IPv6 prefix
    }

    if (realIp) return realIp.replace('::ffff:', '');
    if (cfConnectingIp) return cfConnectingIp.replace('::ffff:', '');

    // Fallback to connection remote address
    const fallbackIp =
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      req.ip ||
      '127.0.0.1';

    return fallbackIp.replace('::ffff:', '');
  }

  async getAllUserDevices(userId: number): Promise<Device[]> {
    try {
      const devices = await this.deviceRepository.find({
        where: { user: { id: userId } },
        relations: ['user'],
        order: { lastLoginAt: 'DESC' },
      });

      return devices;
    } catch (error) {
      console.error('Error fetching user devices:', error);
      throw new HttpException(
        'Failed to retrieve user devices',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async checkAndSaveDevice(user: User, visitorId: string, req?: any) {
    let deviceInfo = {
      deviceType: 'Desktop Computer',
      browser: 'Unknown Browser',
      ipAddress: '127.0.0.1',
      geoLocation: 'Local Network',
      userAgent: 'Unknown User Agent',
    };

    if (req) {
      deviceInfo = this.extractDeviceInfo(req);
    }

    console.log('Checking device with info:', deviceInfo);

    const existing = await this.deviceRepository.findOne({
      where: {
        user: { id: user.id },
        visitorId,
      },
    });

    if (existing) {
      // Update existing device with latest info
      existing.lastLoginAt = new Date();
      existing.ipAddress = deviceInfo.ipAddress;
      existing.geoLocation = deviceInfo.geoLocation;
      existing.userAgent = deviceInfo.userAgent;
      existing.deviceType = deviceInfo.deviceType;
      existing.browser = deviceInfo.browser;
      await this.deviceRepository.save(existing);
      console.log('Updated existing device');
      return { known: true };
    }

    console.log('New device detected');
    return { known: false };
  }

  async verifyMfa(
    otp: string,
  ): Promise<{ message: string; user: Partial<User> }> {
    const email = await this.cacheManager.get<string>('nguyenle');
    if (!email) {
      throw new HttpException(
        'Invalid or expired OTP session',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isValid = await this.mfaOtpService.verifyMfaOtp(email, otp);
    if (!isValid) {
      throw new HttpException(
        'Invalid or expired OTP',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // Get device info from cache
    const deviceInfo = await this.cacheManager.get<{
      email: string;
      deviceType: string;
      browser: string;
      ipAddress: string;
      geoLocation: string;
      userAgent: string;
      userId: number;
      visitorId?: string;
    }>(`device`);

    console.log('Retrieved device info from cache:', deviceInfo);

    // Create new device record with proper data
    const newDevice = this.deviceRepository.create({
      user,
      deviceType: deviceInfo?.deviceType || 'Desktop Computer',
      browser: deviceInfo?.browser || 'Unknown Browser',
      ipAddress: deviceInfo?.ipAddress || '127.0.0.1',
      geoLocation: deviceInfo?.geoLocation || 'Local Network',
      userAgent: deviceInfo?.userAgent || 'Unknown User Agent',
      visitorId: deviceInfo?.visitorId,
      lastLoginAt: new Date(),
    });

    await this.deviceRepository.save(newDevice);

    // Clean up cache
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

  createDevice(deviceData: {
    user: User;
    visitorId: string;
    deviceType: string;
    browser: string;
    ipAddress: string;
    geoLocation: string;
    userAgent: string;
  }): Device {
    return this.deviceRepository.create({
      user: deviceData.user,
      visitorId: deviceData.visitorId,
      deviceType: deviceData.deviceType,
      browser: deviceData.browser,
      ipAddress: deviceData.ipAddress,
      geoLocation: deviceData.geoLocation,
      userAgent: deviceData.userAgent,
      lastLoginAt: new Date(),
    });
  }

  async saveDevice(device: Device): Promise<Device> {
    return this.deviceRepository.save(device);
  }

  async saveDeviceInfoToCache(req: any): Promise<void> {
    const deviceInfo = this.extractDeviceInfo(req);

    console.log('Saving device info to cache:', deviceInfo);
    await this.cacheManager.set('device', deviceInfo);
  }

  private async findUserByEmail(email: string): Promise<User | null> {
    const userRepository = this.deviceRepository.manager.getRepository(User);
    return userRepository.findOne({ where: { email } });
  }
}
