import { Module } from '@nestjs/common';
import { ChangePasswordService } from './change-password.service';
import { ChangePasswordController } from './change-password.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersModule } from 'src/users/users.module';
import { MfaOtpModule } from 'src/mfa-otp/mfa-otp.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    MfaOtpModule,
    JwtModule.register({
      secret: 'hoanguan',
      signOptions: { expiresIn: '1h' },
    }),
    CacheModule.register({
      ttl: 300000, // default time to live for all cache entries
    }),
  ],
  controllers: [ChangePasswordController],
  providers: [ChangePasswordService],
})
export class ChangePasswordModule {}
