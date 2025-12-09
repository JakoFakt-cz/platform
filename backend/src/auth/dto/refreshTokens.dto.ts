import { IsString } from 'class-validator';

export class RefreshTokensDto {
  @IsString()
  token: string;
}
