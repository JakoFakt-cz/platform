import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';
import { OAuthUserDto } from '../dto/oauthUser.dto';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('auth.facebook.clientId') || '',
      clientSecret: configService.get<string>('auth.facebook.clientSecret') || '',
      callbackURL:
        configService.get<string>('auth.facebook.callbackUrl') ||
        'http://localhost:4000/auth/oauth/facebook/callback',
      scope: 'email',
      profileFields: ['emails', 'name', 'photos'],
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ) {
    const { name, emails, photos } = profile;

    const displayName = profile.displayName || (name ? `${name.givenName} ${name.familyName}` : '');

    const user: OAuthUserDto = {
      name: displayName,
      email: emails ? emails[0].value : null,
      picture: photos ? photos[0].value : null,
      provider: 'facebook',
    };

    done(null, user);
  }
}
