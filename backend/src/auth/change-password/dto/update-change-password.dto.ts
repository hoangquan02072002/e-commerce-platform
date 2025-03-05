import { PartialType } from '@nestjs/mapped-types';
import { CreateChangePasswordDto } from './create-change-password.dto';

export class UpdateChangePasswordDto extends PartialType(
  CreateChangePasswordDto,
) {}
