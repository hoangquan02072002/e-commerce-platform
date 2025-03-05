export class CreateChangePasswordDto {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export class VerifyChangePasswordDto {
  otp: string;
}
