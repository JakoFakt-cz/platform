import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleController } from './article/article.controller';
import { Article, ArticleSchema } from './article/scheme/article.schema';
import { ArticleService } from './article/article.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING ?? ''),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  controllers: [AppController, ArticleController, ArticleController],
  providers: [AppService, ArticleService],
})
export class AppModule {}
