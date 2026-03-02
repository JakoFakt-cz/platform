import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, ValidateNested } from 'class-validator';
import { CommentDto } from './comment.dto';

export class AddCommentDto {
  @ValidateNested()
  @Type(() => CommentDto)
  comment!: CommentDto;

  @IsNotEmpty()
  @IsMongoId()
  articleId!: string;
}
