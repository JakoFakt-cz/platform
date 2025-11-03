import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async signup(signupData: SignupDto) {
    const { email, password, name } = signupData;

    // Check if email is already in use
    const emailInUse = await this.UserModel.findOne({
      email,
    });
    if (emailInUse) {
      throw new BadRequestException('Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await this.UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
  }

  async login(credentials: LoginDto) {
    const { email, password } = credentials;

    // Find the user by email
    const user = await this.UserModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    return 'Successfully logged in';
  }
}
