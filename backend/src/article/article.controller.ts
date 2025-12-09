import { Body, Controller, Get, Post } from '@nestjs/common';
import { Article } from './schema/article.schema';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { QueryArticlesDto } from './dto/query-articles.dto';
import { Throttle } from '@nestjs/throttler';
import { GetArticleDto } from './dto/get-article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly service: ArticleService) {}

  @Get()
  @Throttle({ default: { limit: 50, ttl: 60 * 5 } })
  async getArticles(@Body() dto: QueryArticlesDto): Promise<Article[]> {
    if (dto == null) return this.service.getArticles(5, false, '');
    return this.service.getArticles(dto.limit, dto.latest, dto.authorId);
  }

  @Post('create')
  @Throttle({ default: { limit: 50, ttl: 60 * 5 } })
  async createNewArticle(@Body() dto: CreateArticleDto): Promise<void> {
    await this.service.createArticle(dto.title, dto.authorId, dto.body);
  }

  @Get('exact')
  @Throttle({ default: { limit: 50, ttl: 60 * 5 } })
  async getArticle(@Body() dto: GetArticleDto): Promise<Article | null> {
    return this.service.getArticle(dto.id);
  }
}
