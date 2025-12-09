import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, default: false })
  emailVerified: boolean;

  @Prop({ required: false })
  passwordHash: string;

  @Prop({ required: false, default: '' })
  profilePictureUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
