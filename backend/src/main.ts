import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { rateLimiterMiddleware } from './middleware/rateLimiter';
import * as bodyParser from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { RawBodyMiddleware } from './middleware/raw-body.middleware';
async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

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
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
