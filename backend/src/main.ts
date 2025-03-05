import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { rateLimiterMiddleware } from './middleware/rateLimiter';
import * as bodyParser from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    bodyParser.json({
      verify: (req: any, res, buf) => {
        req.rawBody = buf;
      },
    }),
  );
  // app.use(rateLimiterMiddleware);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
