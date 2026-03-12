import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Source } from './source.schema';

@Schema()
export class BodyProps {
  @Prop({ required: true })
  content!: string;

  @Prop({
    type: [Source],
    default: [],
  })
  sources?: Source[];
}

export const BodyPropsSchema = SchemaFactory.createForClass(BodyProps);
