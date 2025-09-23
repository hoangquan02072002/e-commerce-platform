import { Controller } from '@nestjs/common';
import { MfaOtpService } from './mfa-otp.service';

@Controller('mfa-otp')
export class MfaOtpController {
  constructor(private readonly mfaOtpService: MfaOtpService) {}
}
