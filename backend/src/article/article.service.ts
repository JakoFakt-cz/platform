import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schema/article.schema';
import { Model } from 'mongoose';

@Injectable()
export class ArticleService {
  constructor(@InjectModel(Article.name) private model: Model<Article>) {}

  async createArticle(title: string, authorId: string, body: string): Promise<Article> {
    const created = new this.model({
      header: {
        title: title,
        headline: 'test',
        authorId: authorId,
      },
      body: {
        content: body,
      },
      meta: {
        views: 0,
        tags: ['none'],
      },
    });
    return created.save();
  }

  // TODO: add a way to query by an array of words
  async getArticles(limit?: number, latest?: boolean, authorId?: string): Promise<Article[]> {
    const filter: Record<string, any> = {};

    if (authorId) {
      filter['header.authorId'] = authorId;
    }

    const query = this.model.find(filter);

    if (latest) {
      query.sort({ createdAt: -1 });
    }

    query.limit(limit ?? 500);

    return query.exec();
  }

  async getArticle(id: string): Promise<Article | null> {
    const query = this.model.find({
      _id: id,
    });

    if (query == null) {
      return null;
    }

    const result = await query.exec();
    const article = result[0];

    article.meta.views = article.meta.views + 1;
    await this.model.findByIdAndUpdate(article._id, { $set: article }, { new: true }).exec();

    return article;
  }
}
