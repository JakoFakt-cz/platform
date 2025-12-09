import { IsEmail, IsNumber } from 'class-validator';

export class VerifyEmailDto {
  @IsEmail()
  email: string;

  @IsNumber()
  code: string;
}
