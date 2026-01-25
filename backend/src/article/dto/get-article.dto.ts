import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class GetArticleDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  readonly id: string;
}
