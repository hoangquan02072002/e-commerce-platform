import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      rawBody: string; // Add rawBody property to the Request interface
    }
  }
}
