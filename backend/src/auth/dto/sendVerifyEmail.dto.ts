import { IsEmail } from 'class-validator';

export class SendVerifyEmailDto {
  @IsEmail()
  email: string;
}
