import { Body, Controller, Get, Post } from '@nestjs/common';
import { Article } from './schema/article.schema';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { GetArticlesDto } from './dto/getArticles.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly service: ArticleService) {}

  @Get()
  async getArticles(@Body() dto: GetArticlesDto): Promise<Article[]> {
    return this.service.getArticles(dto.limit, dto.latest, dto.authorId);
  }

  @Post('create')
  async createNewArticle(@Body() dto: CreateArticleDto): Promise<void> {
    await this.service.createArticle(dto.title, dto.authorId, dto.body);
  }
}
