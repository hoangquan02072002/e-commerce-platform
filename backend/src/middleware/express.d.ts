/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      rawBody: string; // Add rawBody property to the Request interface
    }
  }
}
