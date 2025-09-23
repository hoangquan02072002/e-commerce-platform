/* eslint-disable @typescript-eslint/no-unused-vars */
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
