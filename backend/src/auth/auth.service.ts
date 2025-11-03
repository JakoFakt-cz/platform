import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './refreshToken.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<User>,

    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshToken>,

    private jwtService: JwtService,
  ) {}

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
    const user: User | null = await this.UserModel.findOne({
      email,
    });
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    // Generate JWT token
    return this.generateUserTokens(user._id as Types.ObjectId);
  }

  async refreshTokens(refreshToken: string) {
    const storedToken = await this.RefreshTokenModel.findOneAndDelete({
      token: refreshToken,
      expiryDate: { $gte: new Date() },
    });
    if (!storedToken) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    return this.generateUserTokens(storedToken.userId);
  }

  private async generateUserTokens(userId: Types.ObjectId) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });
    const refreshToken = uuidv4();

    await this.storeRefreshToken(refreshToken, userId);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async storeRefreshToken(token: string, userId: Types.ObjectId) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    await this.RefreshTokenModel.create({
      token,
      userId: userId.toString(),
    });
  }
}
