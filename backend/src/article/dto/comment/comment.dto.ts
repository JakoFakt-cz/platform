import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CommentDto {
  @IsMongoId()
  user: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
