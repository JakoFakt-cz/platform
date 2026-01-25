import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class GetArticlesDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  readonly limit?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  readonly authorId?: string;

  @IsBoolean()
  @IsOptional()
  readonly latest?: boolean;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly query?: string;
}
