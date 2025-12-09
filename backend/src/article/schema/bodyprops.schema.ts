import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class BodyProps {
  @Prop({ required: true })
  content: string;
}

export const BodyPropsSchema = SchemaFactory.createForClass(BodyProps);
