import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  authorId: string;

  @Prop({ required: true })
  body: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
