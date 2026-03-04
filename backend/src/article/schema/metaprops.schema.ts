import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './comment.schema';
import { Vote, VoteSchema } from './vote.schema';

@Schema()
export class MetaProps {
  @Prop({ required: true })
  views!: number;

  @Prop({ required: false })
  tags!: string[];

  @Prop({
    type: [CommentSchema],
    default: [],
  })
  comments?: Comment[];

  @Prop({
    type: [VoteSchema],
    default: [],
  })
  votes?: Vote[];
}

export const MetaPropsSchema = SchemaFactory.createForClass(MetaProps);
