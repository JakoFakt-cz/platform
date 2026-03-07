import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class GetCommentsByAuthorDto {
  @IsNotEmpty()
  @IsMongoId()
  authorId!: string;

  @IsOptional()
  @IsNumber()
  @Max(1000)
  @Min(1)
  @Type(() => Number)
  limit?: number;
}
