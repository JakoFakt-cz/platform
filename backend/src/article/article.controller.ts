import { Body, Controller, Get, Post, Query, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Throttle } from '@nestjs/throttler';
import { Article } from './schema/article.schema';
import { GetArticlesDto } from './dto/get-articles.dto';
import { GetArticleDto } from './dto/get-article.dto';
import { AuthGuard } from '../guard/auth.guard';

@Controller('articles')
export class ArticleController {
  constructor(private readonly service: ArticleService) {}

  @Get()
  @Throttle({ default: { limit: 50, ttl: 60 * 5 } })
  async getArticles(
    @Query(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
    dto: GetArticlesDto,
  ): Promise<Article[]> {
    return this.service.getArticles({
      search: dto.query,
      latest: dto.latest,
      authorId: dto.authorId,
      limit: dto.limit,
    });
  }

  @Post('create')
  @UseGuards(AuthGuard)
  @Throttle({ default: { limit: 50, ttl: 60 * 5 } })
  async createNewArticle(
    @Req() req: Request & { user: { userId: string } },
    @Body() dto: CreateArticleDto,
  ): Promise<void> {
    await this.service.createArticle(dto.title, req.user.userId, dto.body);
  }

  @Get('exact')
  @Throttle({ default: { limit: 50, ttl: 60 * 5 } })
  async getArticle(
    @Query(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
    dto: GetArticleDto,
  ): Promise<Article | null> {
    return this.service.getArticle(dto.id);
  }
}
