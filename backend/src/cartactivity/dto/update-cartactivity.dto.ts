import { PartialType } from '@nestjs/mapped-types';
import { CreateCartactivityDto } from './create-cartactivity.dto';

export class UpdateCartactivityDto extends PartialType(CreateCartactivityDto) {}
