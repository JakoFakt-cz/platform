import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MetaProps, MetaPropsSchema } from './metaprops.schema';
import { HeaderProps, HeaderPropsSchema } from './headerprops.schema';
import { BodyProps, BodyPropsSchema } from './bodyprops.schema';

export type ArticleDocument = HydratedDocument<Article>;

/*
  Article is consisting of three key elements:
  - header (title, headline, ...)
  - body (content, ...)
  - meta (tags, view count, things for algorithms)
 */
@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true, type: HeaderPropsSchema })
  header: HeaderProps;

  @Prop({ required: true, type: BodyPropsSchema })
  body: BodyProps;

  @Prop({ required: true, type: MetaPropsSchema })
  meta: MetaProps;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
