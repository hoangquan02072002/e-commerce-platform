// import { Module } from '@nestjs/common';
// import { ChatGateway } from './chat.gateway';
// import { ChatappModule } from '../chatapp/chatapp.module';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
//     ChatappModule,
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         secret: configService.get<string>('JWT_SECRET'),
//         signOptions: { expiresIn: '1d' },
//       }),
//     }),
//   ],
//   providers: [ChatGateway],
//   exports: [ChatGateway],
// })
// export class ChatModule {}
