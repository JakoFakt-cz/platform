import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './schema/article.schema';
import { Comment, CommentSchema } from './schema/comment.schema';
import { Vote, VoteSchema } from './schema/vote.schema';
import { Source, SourceSchema } from './schema/source.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: Vote.name, schema: VoteSchema },
      { name: Source.name, schema: SourceSchema },
    ]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
