import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class HeaderProps {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  headline: string;

  @Prop({ required: true })
  authorId: string;
}

export const HeaderPropsSchema = SchemaFactory.createForClass(HeaderProps);
