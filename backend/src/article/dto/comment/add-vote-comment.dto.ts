import { IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';

export class AddCommentVoteDto {
  @IsNotEmpty()
  @IsMongoId()
  userId!: string;

  @IsNotEmpty()
  @IsBoolean()
  positive!: boolean;

  @IsNotEmpty()
  @IsMongoId()
  articleId!: string;

  @IsNotEmpty()
  @IsMongoId()
  commentId!: string;
}
