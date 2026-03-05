import { IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly title!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly headline!: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly authorId!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(120)
  readonly content!: string;
}
