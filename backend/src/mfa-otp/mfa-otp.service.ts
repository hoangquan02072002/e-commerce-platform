/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { CreateMfaOtpDto } from './dto/create-mfa-otp.dto';
// import { UpdateMfaOtpDto } from './dto/update-mfa-otp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MfaOtp } from './entities/mfa-otp.entity';

import { randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import EmailService from '../utils/emailService';

@Injectable()
export class MfaOtpService {
  constructor(
    @InjectRepository(MfaOtp)
    private readonly mfaOtpRepository: Repository<MfaOtp>,
    private emailService: EmailService,
  ) {}
  async createMfaOtp(email: string): Promise<MfaOtp> {
    try {
      const otp = randomBytes(3).toString('hex'); // Generate a 6-character OTP
      const expires_at = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      const mfaOtp = this.mfaOtpRepository.create({
        email,
        otp,
        expires_at,
      });

      await this.mfaOtpRepository.save(mfaOtp);

      await this.emailService.sendEmail(
        email,
        'Your MFA Code',
        `Your MFA code is: ${otp}`,
      );

      return mfaOtp;
    } catch (error) {
      throw new HttpException(
        'Error creating MFA OTP',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyMfaOtp(email: string, otp: string): Promise<boolean> {
    try {
      const mfaOtp = await this.mfaOtpRepository.findOne({
        where: { email, otp },
        order: { created_at: 'DESC' },
      });

      if (!mfaOtp || new Date(mfaOtp.expires_at) < new Date()) {
        return false;
      }
      return true;
    } catch (error) {
      throw new HttpException(
        'Error verifying MFA OTP',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
