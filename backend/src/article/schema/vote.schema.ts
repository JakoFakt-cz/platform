import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type VoteDocument = HydratedDocument<Vote>;

@Schema({ timestamps: true })
export class Vote {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user!: Types.ObjectId;

  @Prop({ required: true })
  content!: string;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
