import { IsEmail, IsNumberString } from 'class-validator';

export class VerifyEmailDto {
  @IsEmail()
  email: string;

  @IsNumberString()
  code: string;
}
