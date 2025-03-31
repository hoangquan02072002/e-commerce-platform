import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentwithqrcodeDto } from './create-paymentwithqrcode.dto';

export class UpdatePaymentwithqrcodeDto extends PartialType(
  CreatePaymentwithqrcodeDto,
) {}
