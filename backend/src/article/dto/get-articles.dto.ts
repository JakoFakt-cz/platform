import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class GetArticlesDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
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
  @Type(() => Boolean)
  readonly latest?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly query?: string;
}
