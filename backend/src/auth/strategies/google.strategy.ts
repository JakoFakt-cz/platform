import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { OAuthUserDto } from '../dto/oauthUser.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('auth.google.clientId') || '',
      clientSecret: configService.get<string>('auth.google.clientSecret') || '',
      callbackURL:
        configService.get<string>('auth.google.callbackUrl') ||
        'http://localhost:4000/auth/oauth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  validate(_accessToken: string, _refreshToken: string, profile: Profile, done: VerifyCallback) {
    const { displayName, emails, photos } = profile;
    const user: OAuthUserDto = {
      name: displayName,
      email: emails ? emails[0].value : null,
      picture: photos ? photos[0].value : null,
      provider: 'google',
    };

    done(null, user);
  }
}
