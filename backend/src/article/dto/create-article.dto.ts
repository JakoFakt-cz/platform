import { ArrayMinSize, IsArray, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly title!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly headline!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(120)
  readonly content!: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  readonly sources!: string[];
}
