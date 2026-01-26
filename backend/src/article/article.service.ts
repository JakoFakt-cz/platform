import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Article } from './schema/article.schema';

@Injectable()
export class ArticleService {
  constructor(@InjectModel(Article.name) private model: Model<Article>) {}

  async createArticle(title: string, authorId: string, body: string): Promise<Article> {
    const created = new this.model({
      header: {
        title: title,
        headline: 'test',
        author: authorId,
      },
      body: {
        content: body,
      },
      meta: {
        views: 0,
        tags: ['none'],
        comments: [
          {
            content: 'Nesnasim madanrinky',
            user: new Types.ObjectId('69492bc1e2b63e716b2dd9ca'),
          },
        ],
      },
    });
    return created.save();
  }

  async getArticles({
    search,
    limit = 50,
    latest,
    authorId,
  }: {
    search?: string;
    limit?: number;
    latest?: boolean;
    authorId?: string;
  }): Promise<Article[]> {
    const pipeline: any[] = [];
    if (search) {
      pipeline.push({
        $search: {
          index: 'default',
          compound: {
            should: [
              {
                text: {
                  query: search,
                  path: 'header.title',
                  score: { boost: { value: 5 } },
                },
              },
              {
                text: {
                  query: search,
                  path: 'header.headline',
                  score: { boost: { value: 3 } },
                },
              },
              {
                text: {
                  query: search,
                  path: 'body.content',
                },
              },
            ],
          },
        },
      });
    }

    if (authorId) {
      pipeline.push({
        $match: { 'header.author': authorId },
      });
    }

    if (!search && latest) {
      pipeline.push({
        $sort: { createdAt: -1 },
      });
    }

    pipeline.push({ $limit: Number(limit) || 50 });

    pipeline.push({
      $project: {
        header: 1,
        body: 1,
        meta: 1,
        createdAt: 1,
        score: search ? { $meta: 'searchScore' } : undefined,
      },
    });

    const res = await this.model.aggregate<Article>(pipeline).exec();
    const populatedArticles = await this.model.populate(res as unknown as Document[], {
      path: 'header.author',
      select: 'displayName userName profilePictureUrl email',
    });

    return populatedArticles;
  }

  async getArticle(id: string): Promise<Article | null> {
    if (typeof id !== 'string') {
      return null;
    }

    const article = await this.model
      .findOne({ _id: { $eq: id } })
      .populate([
        {
          path: 'header.author',
          select: 'displayName userName profilePictureUrl',
        },
        {
          path: 'meta.comments',
          populate: {
            path: 'user',
            select: 'displayName userName profilePictureUrl',
          },
        },
      ])
      .lean()
      .exec();

    if (!article) return null;

    await this.model.findByIdAndUpdate(article._id, { $inc: { 'meta.views': 1 } });
    article.meta.views += 1;

    return article;
  }
}
