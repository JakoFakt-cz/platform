import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class HeaderProps {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  headline: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  author: Types.ObjectId;
}

export const HeaderPropsSchema = SchemaFactory.createForClass(HeaderProps);
