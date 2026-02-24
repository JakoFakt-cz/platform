import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  async getUserById({ id }: { id: string }) {
    return await this.model
      .findOne({ _id: { $eq: id } })
      .select('username displayName profilePictureUrl')
      .lean()
      .exec();
  }
}
