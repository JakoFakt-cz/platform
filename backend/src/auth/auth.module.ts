import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';
import { RefreshToken, RefreshTokenSchema } from './schema/refreshToken.schema';
import { MailModule } from '../mail/mail.module';
import { OTP, OTPSchema } from './schema/otp.schema';
import { GoogleStrategy } from './oauthStrategies/google.strategy';
import { FacebookStrategy } from './oauthStrategies/facebook.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
      { name: OTP.name, schema: OTPSchema },
    ]),

    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, FacebookStrategy],
})
export class AuthModule {}
