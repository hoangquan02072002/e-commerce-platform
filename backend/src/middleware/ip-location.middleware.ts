// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import axios from 'axios';
// import * as os from 'os';

// @Injectable()
// export class IpLocationMiddleware implements NestMiddleware {
//   async use(req: Request, res: Response, next: NextFunction) {
//     try {
//       // Get IP address from request
//       let ip =
//         req.ip || (req.headers['x-forwarded-for'] as string) || '127.0.0.1';

//       // Handle multiple IPs in x-forwarded-for
//       if (ip.includes(',')) {
//         ip = ip.split(',')[0].trim();
//       }

//       // Remove IPv6 prefix if present
//       ip = ip.replace('::ffff:', '');

//       // For Postman testing - check for a custom header
//       const testIp = req.headers['x-test-ip'] as string;
//       if (testIp) {
//         console.log(`Using test IP: ${testIp}`);
//         ip = testIp;
//       }

//       // Replace local IPs with the server's public IP if necessary
//       if (
//         !testIp &&
//         (ip === '127.0.0.1' ||
//           ip === '::1' ||
//           ip.startsWith('192.168.') ||
//           ip.startsWith('10.'))
//       ) {
//         console.log(
//           `Local IP detected (${ip}), replacing with server's public IP.`,
//         );
//         ip = await this.getPublicIpAddress(); // Get the server's public IP address
//       }

//       // Store the raw IP in the request for reference
//       req['ipAddress'] = ip;

//       // Fetch geolocation data using ipinfo.io
//       console.log(`Fetching geolocation for IP: ${ip}`);
//       const response = await axios.get(
//         `https://ipinfo.io/${ip}/json?token=a806501d96cd7a`, // Replace YOUR_API_KEY with your ipinfo.io API key
//       );
//       req['geo'] = response.data;
//       console.log(`Geolocation data:`, req['geo']);

//       // Store user agent in the request
//       req['userAgent'] = req.headers['user-agent'] || 'Unknown User Agent';
//     } catch (error) {
//       console.error('Error fetching geolocation:', error.message);

//       // Provide fallback geo data
//       req['geo'] = {
//         ip: req['ipAddress'] || 'unknown',
//         city: 'Unknown',
//         region: 'Unknown',
//         country: 'Unknown',
//         loc: '0,0',
//         timezone: 'UTC',
//       };

//       // Store user agent in the request
//       req['userAgent'] = req.headers['user-agent'] || 'Unknown User Agent';
//     }

//     next();
//   }

//   // Helper method to get the server's public IP address
//   private async getPublicIpAddress(): Promise<string> {
//     try {
//       const response = await axios.get('https://api.ipify.org?format=json');
//       return response.data.ip;
//     } catch (error) {
//       console.error('Error fetching public IP address:', error.message);
//       return '127.0.0.1'; // Fallback to localhost if public IP cannot be determined
//     }
//   }
// }

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

@Injectable()
export class IpLocationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('=== IP Location Middleware ===');
      console.log('Headers:', req.headers);

      // Get IP address from request with multiple fallbacks
      let ip = this.extractRealIp(req);

      console.log('Extracted IP:', ip);

      // Store the IP in the request
      req['ipAddress'] = ip;

      // Store user agent
      const userAgent = req.headers['user-agent'] || 'Unknown User Agent';
      req['userAgent'] = userAgent;
      console.log('User Agent:', userAgent);

      // Handle local/private IPs
      if (this.isPrivateIP(ip)) {
        console.log(
          `Private/Local IP detected (${ip}), trying to get public IP...`,
        );

        // Try to get public IP
        try {
          const publicIpResponse = await axios.get(
            'https://api.ipify.org?format=json',
            {
              timeout: 3000,
            },
          );

          if (publicIpResponse.data && publicIpResponse.data.ip) {
            console.log('Public IP found:', publicIpResponse.data.ip);
            ip = publicIpResponse.data.ip;
            req['ipAddress'] = ip;
          }
        } catch (publicIpError) {
          console.log('Could not get public IP, using local fallback');
        }
      }

      // Get geolocation
      if (this.isPrivateIP(ip)) {
        console.log('Using local network fallback for geo data');
        req['geo'] = {
          ip,
          city: 'Local',
          region: 'Local',
          country: 'Local',
          loc: '0,0',
          timezone: 'UTC',
        };
      } else {
        // Fetch geolocation data using ipinfo.io
        console.log(`Fetching geolocation for IP: ${ip}`);
        try {
          const response = await axios.get(
            `https://ipinfo.io/${ip}/json?token=a806501d96cd7a`,
            { timeout: 5000 },
          );

          req['geo'] = response.data;
          console.log(`Geolocation data:`, req['geo']);
        } catch (geoError) {
          console.error('Geolocation API error:', geoError.message);
          // Fallback for geo API errors
          req['geo'] = {
            ip,
            city: 'Unknown',
            region: 'Unknown',
            country: 'Unknown',
            loc: '0,0',
            timezone: 'UTC',
          };
        }
      }

      console.log('Final middleware data:', {
        ipAddress: req['ipAddress'],
        userAgent: req['userAgent'],
        geo: req['geo'],
      });
    } catch (error) {
      console.error('Error in IP location middleware:', error.message);

      // Provide complete fallback data
      req['ipAddress'] = req.ip || '127.0.0.1';
      req['geo'] = {
        ip: req['ipAddress'],
        city: 'Unknown',
        region: 'Unknown',
        country: 'Unknown',
        loc: '0,0',
        timezone: 'UTC',
      };
      req['userAgent'] = req.headers['user-agent'] || 'Unknown User Agent';
    }

    next();
  }

  private extractRealIp(req: Request): string {
    // Try different headers in order of preference
    const headers = [
      'cf-connecting-ip', // Cloudflare
      'x-real-ip', // Nginx
      'x-forwarded-for', // Standard proxy header
      'x-client-ip', // Alternative
      'x-forwarded', // Alternative
      'forwarded-for', // Alternative
      'forwarded', // RFC 7239
    ];

    for (const header of headers) {
      const value = req.headers[header] as string;
      if (value) {
        // Handle comma-separated IPs (take the first one)
        const ip = value.split(',')[0].trim();
        // Remove IPv6 prefix if present
        const cleanIp = ip.replace('::ffff:', '');
        if (this.isValidIP(cleanIp)) {
          return cleanIp;
        }
      }
    }

    // Fallback to req.ip or connection info
    const fallbackIp =
      req.ip ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      '127.0.0.1';

    return fallbackIp.replace('::ffff:', '');
  }

  private isValidIP(ip: string): boolean {
    // Basic IP validation
    const ipv4Regex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
  }

  private isPrivateIP(ip: string): boolean {
    if (!ip || ip === '127.0.0.1' || ip === '::1' || ip === 'localhost') {
      return true;
    }

    // Check for private IP ranges
    const privateRanges = [
      /^10\./, // 10.0.0.0/8
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./, // 172.16.0.0/12
      /^192\.168\./, // 192.168.0.0/16
      /^169\.254\./, // 169.254.0.0/16 (link-local)
    ];

    return privateRanges.some((range) => range.test(ip));
  }
}
