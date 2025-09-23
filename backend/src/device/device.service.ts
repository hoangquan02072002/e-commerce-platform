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
