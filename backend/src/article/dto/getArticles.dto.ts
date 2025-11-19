import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class GetArticlesDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(500)
  readonly limit?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(40)
  @Matches(/^\d+$/)
  readonly authorId?: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  readonly latest?: boolean;
}
