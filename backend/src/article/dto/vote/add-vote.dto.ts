import { IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';

export class AddVoteDto {
  @IsNotEmpty()
  @IsMongoId()
  userId!: string;

  @IsNotEmpty()
  @IsBoolean()
  positive!: boolean;

  @IsNotEmpty()
  @IsMongoId()
  articleId!: string;
}
