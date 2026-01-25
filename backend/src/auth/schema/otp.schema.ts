import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class OTP {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  code: string;

  @Prop({
    type: Date,
    default: Date.now,
    expires: 900,
  })
  createdAt: Date;
}

export const OTPSchema = SchemaFactory.createForClass(OTP);
