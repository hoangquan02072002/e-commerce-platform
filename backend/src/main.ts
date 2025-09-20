import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { rateLimiterMiddleware } from './middleware/rateLimiter';
import * as bodyParser from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { IpLocationMiddleware } from './middleware/ip-location.middleware';

// import { RawBodyMiddleware } from './middleware/raw-body.middleware';
async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  });
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       brokers: ['localhost:29092'],
  //     },
  //     consumer: {
  //       groupId: 'order-consumer-group',
  //     },
  //   },
  // });
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads to DTO instances
      whitelist: true, // Strip properties that do not have decorators
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
    }),
  );
  app.use(
    bodyParser.json({
      verify: (req: any, res, buf) => {
        req.rawBody = buf;
      },
    }),
  );
  // app.use(new RawBodyMiddleware().use);
  // app.use(rateLimiterMiddleware);
  await app.startAllMicroservices();
  app.use(new IpLocationMiddleware().use.bind(new IpLocationMiddleware()));
  await app.listen(process.env.PORT ?? 3000);
  // const port = process.env.PORT ?? 5000;
  // await app.listen(port);
  // console.log(`Application is running on: http://localhost:${port}`);
  // console.log(`WebSocket server is running on: ws: http://localhost::${port}`);
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// // import { rateLimiterMiddleware } from './middleware/rateLimiter';
// import * as bodyParser from 'body-parser';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { IoAdapter } from '@nestjs/platform-socket.io';

// class CustomIoAdapter extends IoAdapter {
//   createIOServer(port: number, options?: any): any {
//     const server = super.createIOServer(port, {
//       ...options,
//       cors: {
//         origin: ['http://localhost:3000'],
//         methods: ['GET', 'POST'],
//         credentials: true,
//       },
//       allowEIO3: true,
//       transports: ['websocket', 'polling'],
//     });
//     return server;
//   }
// }

// // import { RawBodyMiddleware } from './middleware/raw-body.middleware';
// async function bootstrap() {
//   // const app = await NestFactory.create(AppModule);
//   const app = await NestFactory.create<NestExpressApplication>(AppModule, {
//     rawBody: true,
//     cors: {
//       origin: 'http://localhost:3000',
//       credentials: true,
//       methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//       allowedHeaders: ['Content-Type', 'Authorization'],
//     },
//   });

//   // Use custom IoAdapter for Socket.IO
//   app.useWebSocketAdapter(new CustomIoAdapter(app));

//   app.enableCors({
//     origin: 'http://localhost:3000', // Allow requests from this origin
//     credentials: true,
//   });
//   app.useGlobalPipes(
//     new ValidationPipe({
//       transform: true, // Automatically transform payloads to DTO instances
//       whitelist: true, // Strip properties that do not have decorators
//       forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
//     }),
//   );
//   // app.use(rateLimiterMiddleware); // Add rate limiting

//   // For parsing application/json
//   app.use(bodyParser.json({ limit: '10mb' }));
//   // For parsing application/x-www-form-urlencoded
//   app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

//   const port = process.env.PORT || 5000;
//   await app.listen(port);
//   console.log(`Application is running on: ${await app.getUrl()}`);
// }
// bootstrap();
