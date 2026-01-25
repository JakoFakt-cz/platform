import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Throttle } from '@nestjs/throttler';
import { Article } from './schema/article.schema';

@Controller('articles')
export class ArticleController {
  constructor(private readonly service: ArticleService) {}

  @Get()
  @Throttle({ default: { limit: 50, ttl: 60 * 5 } })
  async getArticles(
    @Query('limit') limit?: number,
    @Query('latest') latest?: boolean,
    @Query('query') query?: string,
    @Query('authorId') authorId?: string,
  ): Promise<Article[]> {
    return this.service.getArticles({ search: query, limit, latest, authorId });
  }

  @Post('create')
  @Throttle({ default: { limit: 50, ttl: 60 * 5 } })
  async createNewArticle(@Body() dto: CreateArticleDto): Promise<void> {
    await this.service.createArticle(dto.title, dto.authorId, dto.body);
  }

  @Get('exact')
  @Throttle({ default: { limit: 50, ttl: 60 * 5 } })
  async getArticle(@Query('id') id: string): Promise<Article | null> {
    return this.service.getArticle(id);
  }
}
