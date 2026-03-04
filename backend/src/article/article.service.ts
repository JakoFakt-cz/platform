import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Article } from './schema/article.schema';
import { Comment } from './schema/comment.schema';
import { CommentDto } from './dto/comment/comment.dto';
import { Vote } from './schema/vote.schema';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Vote.name) private voteModel: Model<Vote>,
  ) {}

  async createArticle(title: string, authorId: string, body: string): Promise<Article> {
    const created = new this.articleModel({
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

    const res = await this.articleModel.aggregate<Article>(pipeline).exec();
    const populatedArticles = await this.articleModel.populate(res as unknown as Document[], {
      path: 'header.author',
      select: 'displayName userName profilePictureUrl email',
    });

    return populatedArticles;
  }

  async getArticle(id: string): Promise<Article | null> {
    if (typeof id !== 'string') {
      return null;
    }

    const article = await this.articleModel
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
        {
          path: 'meta.comments.votes',
          populate: {
            path: 'user',
            select: 'displayName userName profilePictureUrl',
          },
        },
        {
          path: 'meta.votes',
          populate: {
            path: 'user',
            select: 'displayName userName profilePictureUrl',
          },
        },
      ])
      .lean()
      .exec();

    if (!article) return null;

    await this.articleModel.findByIdAndUpdate(article._id, { $inc: { 'meta.views': 1 } });
    article.meta.views += 1;

    return article;
  }

  async addCommentToArticle(
    articleId: string,
    commentDto: CommentDto,
  ): Promise<{ article: Article | null; newCommentId: string }> {
    // Ensure articleId is a safe literal value before using it in a query
    if (typeof articleId !== 'string' || !Types.ObjectId.isValid(articleId)) {
      return {
        article: null,
        newCommentId: '',
      };
    }

    const comment = new this.commentModel({
      user: commentDto.user,
      content: commentDto.content,
    });

    const article = await this.articleModel.findByIdAndUpdate(
      articleId,
      { $push: { 'meta.comments': comment } },
      { new: true },
    );

    return {
      article: article,
      newCommentId: comment._id.toString(),
    };
  }

  async addVoteToArticle(
    articleId: string,
    userId: string,
    positive: boolean,
  ): Promise<Article | null> {
    const article = await this.articleModel.findById(articleId);
    if (!article) return null;

    const existingVote = (article.meta.votes ?? []).find((vote) => vote.user.toString() === userId);
    if (existingVote != undefined && existingVote.positive == positive) return null;

    const vote = new this.voteModel({
      user: userId,
      positive,
    });

    if (existingVote != undefined) {
      await this.articleModel.findByIdAndUpdate(
        articleId,
        { $pull: { 'meta.votes': { user: userId } } },
        { new: true },
      );
    }

    await this.articleModel.findByIdAndUpdate(
      articleId,
      { $push: { 'meta.votes': vote } },
      { new: true },
    );

    return this.getArticle(articleId);
  }

  async addVoteToComment(
    articleId: string,
    userId: string,
    positive: boolean,
    commentId: string,
  ): Promise<Article | null> {
    const article = await this.articleModel.findById(articleId);
    if (!article) return null;
    if (article.meta.comments == undefined) return null;

    const comment = article.meta.comments.find(
      (comment) => (comment as never as { _id: Types.ObjectId })._id.toHexString() === commentId,
    );
    const existingVote = comment?.votes?.find((vote) => vote.user.toString() === userId);
    if (existingVote != undefined && existingVote.positive === positive) return null;

    const vote = new this.voteModel({
      user: userId,
      positive,
    });

    if (existingVote != undefined) {
      await this.articleModel.findByIdAndUpdate(
        articleId,
        { $pull: { 'meta.comments.$[comment].votes': { user: userId } } },
        { arrayFilters: [{ 'comment._id': commentId }] },
      );
    }

    await this.articleModel.findByIdAndUpdate(
      articleId,
      { $push: { 'meta.comments.$[comment].votes': vote } },
      { arrayFilters: [{ 'comment._id': commentId }] },
    );

    return this.getArticle(articleId);
  }
}
