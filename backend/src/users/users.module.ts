import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MfaOtpModule } from 'src/mfa-otp/mfa-otp.module';
import { MfaOtp } from '../mfa-otp/entities/mfa-otp.entity';
import { Module } from '@nestjs/common';
// import { MfaOtpModule } from '../mfa-otp/mfa-otp.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, MfaOtp]), MfaOtpModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
