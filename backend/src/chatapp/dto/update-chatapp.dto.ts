import { PartialType } from '@nestjs/mapped-types';
import { CreateChatDto } from './create-chatapp.dto';

export class UpdateChatappDto extends PartialType(CreateChatDto) {}
