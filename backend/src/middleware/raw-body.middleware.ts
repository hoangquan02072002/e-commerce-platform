import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.rawBody = ''; // Initialize rawBody
    req.on('data', (chunk) => {
      req.rawBody += chunk; // Append data chunks to rawBody
    });
    req.on('end', () => {
      next(); // Call the next middleware
    });
  }
}
