import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './scheme/article.schema';
import { Model } from 'mongoose';

@Injectable()
export class ArticleService {
  constructor(@InjectModel(Article.name) private model: Model<Article>) {}

  async createArticle(
    title: string,
    authorId: string,
    body: string,
  ): Promise<Article> {
    const created = new this.model({ title, authorId, body });
    return created.save();
  }

  async getArticles(
    limit?: number,
    latest?: boolean,
    authorId?: string,
  ): Promise<Article[]> {
    const filter: Record<string, any> = {};

    if (authorId) {
      filter.authorId = authorId;
    }

    const query = this.model.find(filter);

    if (latest) {
      query.sort({ createdAt: -1 });
    }

    query.limit(limit ?? 500);

    return query.exec();
  }
}
