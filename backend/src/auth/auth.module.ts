import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
// import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { UtilsModule } from '../utils/utils.module';
import { MfaOtpModule } from '../mfa-otp/mfa-otp.module';
import { MfaOtp } from '../mfa-otp/entities/mfa-otp.entity';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ChangePasswordModule } from './change-password/change-password.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, MfaOtp]),
    CacheModule.register({
      ttl: 300000, // default time to live for all cache entries
    }),
    UsersModule,
    PassportModule,
    UtilsModule,
    MfaOtpModule,
    JwtModule.register({
      secret: 'hoanguan',
      signOptions: { expiresIn: '1h' },
    }),
    ChangePasswordModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}
