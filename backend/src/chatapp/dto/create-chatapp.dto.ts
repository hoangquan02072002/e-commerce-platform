import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  roomId: string;

  @IsNotEmpty()
  @IsNumber()
  senderId: number;

  @IsOptional()
  @IsNumber()
  recipientId?: number;
}
