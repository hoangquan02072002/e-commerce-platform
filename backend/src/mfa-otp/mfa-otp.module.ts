import { Module } from '@nestjs/common';
import { MfaOtpService } from './mfa-otp.service';
import { MfaOtpController } from './mfa-otp.controller';
import { MfaOtp } from './entities/mfa-otp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [TypeOrmModule.forFeature([MfaOtp]), UtilsModule],
  controllers: [MfaOtpController],
  providers: [MfaOtpService],
  exports: [MfaOtpService],
})
export class MfaOtpModule {}
