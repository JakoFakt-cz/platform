import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schema/refreshToken.schema';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  private readonly dummyPassword: string;

  constructor(
    @InjectModel(User.name)
    private UserModel: Model<User>,

    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshToken>,

    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    const saltRoundsFromConf = this.configService.get<number>('auth.hashSaltRounds');
    const saltRounds = saltRoundsFromConf ? Number(saltRoundsFromConf) : 12;
    this.dummyPassword = bcrypt.hashSync('Bezplatné Peníze', saltRounds);
  }

  async signup(signupData: SignupDto) {
    const { email, password, name } = signupData;

    // Check if email is already in use
    const emailInUse = await this.UserModel.findOne({
      email,
    });

    // Hash the password
    const saltRounds = this.configService.get<number>('auth.hashSaltRounds') || 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (emailInUse) {
      throw new BadRequestException('Email already exists');
      // TODO: Neodesílat informaci zda existuje email nebo ne
      // Místo toho poslat vždy zprávů, že registrace proběhla úspěšně a čeká se na potvrzení emailu
      // Pak se odešle buď potvrzovací mail, nebo upozornění, že se na mail někdo pokoušel registrovat.
    }

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

    const correctPassword = user?.password || this.dummyPassword;

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, correctPassword);
    if (!user || !passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    // Generate JWT token
    return this.generateUserTokens(user._id as Types.ObjectId);
  }

  async refreshTokens(refreshToken: string) {
    const lookUpHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    const storedToken = await this.RefreshTokenModel.findOneAndDelete({
      token: lookUpHash,
      expiryDate: { $gte: new Date() },
    });
    if (!storedToken) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    return this.generateUserTokens(storedToken.userId);
  }

  private async generateUserTokens(userId: Types.ObjectId) {
    const accessTokenExpiration =
      this.configService.get<number>('auth.accessTokenExpiration') || 30 * 60;
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: accessTokenExpiration });

    const refreshToken = crypto.randomBytes(32).toString('hex');

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    const expiryDate = new Date();
    const expirationDays =
      this.configService.get<number>('auth.refreshTokenExpiration') || 14 * 24 * 60 * 60;
    expiryDate.setDate(expiryDate.getDate() + expirationDays / (24 * 60 * 60));

    await this.RefreshTokenModel.create({
      refreshToken: refreshTokenHash,
      userId: userId.toString(),
      expiryDate,
    });

    return {
      accessToken,
      refreshToken,
      refreshTokenExpiry: expiryDate,
    };
  }
}
