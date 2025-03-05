import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' }) // Example validation
  password: string;
  @IsOptional()
  @IsString()
  role?: string;
}
export class ChangePasswordDto {
  email: string;
  oldPassword: string;
  newPassword: string;
  otp: string;
}
