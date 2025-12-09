import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MetaProps {
  @Prop({ required: true })
  views: number;

  @Prop({ required: false })
  tags: string[];
}

export const MetaPropsSchema = SchemaFactory.createForClass(MetaProps);
