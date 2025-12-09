import { IsOptional, IsString, Matches } from 'class-validator';

export class GetArticleDto {
  @IsOptional()
  @IsString()
  @Matches(/^.{24}$/)
  readonly id: string;
}
