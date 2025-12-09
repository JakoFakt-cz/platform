import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/)
  readonly authorId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(120)
  readonly body: string;
}
