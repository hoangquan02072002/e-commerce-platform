import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class JoinRoomDto {
  @IsNotEmpty()
  @IsString()
  roomId: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
