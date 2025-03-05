import { PartialType } from '@nestjs/mapped-types';
import { CreateMfaOtpDto } from './create-mfa-otp.dto';

export class UpdateMfaOtpDto extends PartialType(CreateMfaOtpDto) {}
