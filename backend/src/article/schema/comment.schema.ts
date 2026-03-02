import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Vote, VoteSchema } from './vote.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user!: Types.ObjectId;

  @Prop({ required: true })
  content!: string;

  @Prop({
    type: [VoteSchema],
    default: [],
  })
  votes?: Vote[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
