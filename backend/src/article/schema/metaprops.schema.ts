import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './comment.schema';

@Schema()
export class MetaProps {
  @Prop({ required: true })
  views: number;

  @Prop({ required: false })
  tags: string[];

  @Prop({
    type: [CommentSchema],
    default: [],
  })
  comments: Comment[];
}

export const MetaPropsSchema = SchemaFactory.createForClass(MetaProps);
