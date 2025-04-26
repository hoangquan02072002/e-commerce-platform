import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

@Injectable()
export class IpLocationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // Get IP address
      let ip =
        req.ip || (req.headers['x-forwarded-for'] as string) || '127.0.0.1';

      // Handle multiple IPs in x-forwarded-for
      if (ip.includes(',')) {
        ip = ip.split(',')[0].trim();
      }

      // Remove IPv6 prefix if present
      ip = ip.replace('::ffff:', '');

      // For Postman testing - check for a custom header
      const testIp = req.headers['x-test-ip'] as string;
      if (testIp) {
        console.log(`Using test IP: ${testIp}`);
        ip = testIp;
      }

      // Store the raw IP in the request for reference
      req['ipAddress'] = ip;

      // Skip geolocation for localhost/internal IPs unless we're using a test IP
      if (
        !testIp &&
        (ip === '127.0.0.1' ||
          ip === '::1' ||
          ip.startsWith('192.168.') ||
          ip.startsWith('10.'))
      ) {
        req['geo'] = {
          ip,
          city: 'Local',
          region: 'Local',
          country: 'Local',
          loc: '0,0',
          timezone: 'UTC',
        };
        req['userAgent'] = req.headers['user-agent'] || 'Unknown User Agent'; // Get user agent
        return next();
      }

      // Use ipinfo.io for geolocation (free tier allows 50,000 requests per month)
      console.log(`Fetching geolocation for IP: ${ip}`);
      const response = await axios.get(`https://ipinfo.io/${ip}/json`);
      req['geo'] = response.data;
      console.log(`Geolocation data:`, req['geo']);
      req['userAgent'] = req.headers['user-agent'] || 'Unknown User Agent'; // Get user agent
    } catch (error) {
      console.error('Error fetching geolocation:', error.message);
      // Provide fallback geo data
      req['geo'] = {
        ip: req.ip || 'unknown',
        city: 'Unknown',
        region: 'Unknown',
        country: 'Unknown',
        loc: '0,0',
        timezone: 'UTC',
      };
      req['userAgent'] = req.headers['user-agent'] || 'Unknown User Agent'; // Get user agent
    }

    next();
  }
}
