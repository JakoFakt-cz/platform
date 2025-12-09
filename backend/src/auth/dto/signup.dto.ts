import { IsEmail, IsString, Matches, MinLength, MaxLength, IsLowercase } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsLowercase()
  @MinLength(2)
  @MaxLength(32)
  @Matches(/^[a-z0-9_.]+$/, {
    message: 'Username can only contain lowercase letters, numbers, underscores, and periods.',
  })
  username: string;

  @IsString()
  @MinLength(2)
  displayName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  password: string;
}
