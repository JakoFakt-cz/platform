import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schema/user.schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schema/refreshToken.schema';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { OTP } from './schema/otp.schema';
import { MailService } from '../mail/mail.service';
import { OAuthUserDto } from './dto/oauthUser.dto';
import * as uuid from 'uuid';

@Injectable()
export class AuthService {
  private readonly dummyPassword: string;

  constructor(
    @InjectModel(User.name)
    private UserModel: Model<User>,

    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshToken>,

    @InjectModel(OTP.name)
    private OTPModel: Model<OTP>,

    private mailService: MailService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    const saltRoundsFromConf = this.configService.get<number>('auth.hashSaltRounds');
    const saltRounds = saltRoundsFromConf ? Number(saltRoundsFromConf) : 12;
    this.dummyPassword = bcrypt.hashSync('Bezplatné Peníze', saltRounds);
  }

  async signup(signupData: SignupDto) {
    const { email, password, username, displayName } = signupData;

    // Check if email is already in use
    const emailInUse = await this.UserModel.findOne({
      email,
    });

    // Hash the password
    const saltRounds = this.configService.get<number>('auth.hashSaltRounds') || 12;
    const hashedPassword = await bcrypt.hash(password, Number(saltRounds));

    if (emailInUse) return;

    // Create a new user
    await this.UserModel.create({
      username,
      displayName,
      email: email.toLowerCase(),
      passwordHash: hashedPassword,
    });
  }

  async login(credentials: LoginDto) {
    const { email, password } = credentials;

    // Find the user by email
    const user: User | null = await this.UserModel.findOne({
      email: email.toLowerCase(),
    });

    const correctPassword = user?.passwordHash || this.dummyPassword;

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

  async isUsernameAvailable(username: string): Promise<boolean> {
    if (!username) {
      return false;
    }

    if (username.length < 2 || username.length > 32) {
      return false;
    }

    const exists = await this.UserModel.findOne({ username }).select('_id').lean().exec();
    return !exists;
  }

  async generateOTPCode(email: string): Promise<void> {
    const code = crypto.randomInt(100000, 999999);

    const saltRounds = this.configService.get<number>('auth.hashSaltRounds') || 12;
    const hashedCode = await bcrypt.hash(code.toString(), Number(saltRounds));

    await this.OTPModel.deleteMany({
      email,
    });

    await this.OTPModel.create({
      email,
      code: hashedCode,
    });

    await this.mailService.sendVerifyEmail(email, code.toString());
  }

  async verifyOTPCode(email: string, code: string): Promise<void> {
    const emailOTP = await this.OTPModel.findOne({
      email,
    });

    if (!emailOTP) {
      throw new BadRequestException('Invalid or expired OTP code');
    }
    const isCodeValid = await bcrypt.compare(code.toString(), emailOTP.code);

    if (isCodeValid) {
      await this.OTPModel.deleteMany({ email });
      await this.UserModel.findOneAndUpdate({ email }, { isEmailVerified: true });
    } else {
      throw new UnauthorizedException('Invalid or expired OTP code');
    }
  }

  async toggleOAuthProvider(userId: Types.ObjectId, provider: string) {
    const user = await this.UserModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.authProvider.includes(provider)) {
      user.updateOne({ authProvider: user.authProvider.filter((p) => p !== provider) });
      await user.save();
    } else {
      user.authProvider.push(provider);
      await user.save();
    }
  }

  async loginWithOAuth(oauthUser: OAuthUserDto) {
    if (!oauthUser.email) {
      throw new BadRequestException('OAuth provider did not return an email');
    }
    if (!oauthUser.name) {
      throw new BadRequestException('OAuth provider did not return a name');
    }

    let user = await this.UserModel.findOne({ email: oauthUser.email.toLowerCase() });

    if (!user) {
      const uniqueUsername = await this.generateUniqueUsername(oauthUser.name);
      user = await this.UserModel.create({
        username: uniqueUsername,
        displayName: oauthUser.name,
        email: oauthUser.email.toLowerCase(),
        emailVerified: true,
        profilePictureUrl: oauthUser.picture || '',
        authProvider: [oauthUser.provider],
      });
    } else if (!user.authProvider.includes(oauthUser.provider)) {
      throw new UnauthorizedException(
        'Please link your OAuth provider in account settings before logging in with it.',
      );
    }

    return this.generateUserTokens(user._id as Types.ObjectId);
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
      token: refreshTokenHash,
      userId: userId.toString(),
      expiryDate,
    });

    return {
      accessToken,
      refreshToken,
      refreshTokenExpiry: expiryDate,
    };
  }

  private async generateUniqueUsername(baseName: string): Promise<string> {
    baseName = baseName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9_.]+/g, '_')
      .replace(/^_+|_+$/g, '')
      .slice(0, 32);

    const available = await this.isUsernameAvailable(baseName);

    if (available) {
      return baseName;
    }

    for (let i = 0; i < 5; i++) {
      const randomSuffix = uuid.v4().split('-')[0];
      const newUsername = `${baseName}-${randomSuffix}`;

      if (await this.isUsernameAvailable(newUsername)) {
        return newUsername;
      }
    }

    throw new ServiceUnavailableException('Could not generate a unique username');
  }
}
