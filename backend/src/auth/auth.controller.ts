import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import type { Request, Response } from 'express';
import { Throttle } from '@nestjs/throttler';
import { AuthGuard as AuthPassportGuard } from '@nestjs/passport';
import { OAuthUserDto } from './dto/oauthUser.dto';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '../guard/auth.guard';
import { Types } from 'mongoose';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  private setAuthCookies(
    response: Response,
    accessToken: string,
    refreshToken: string,
    refreshTokenExpiry: Date,
  ) {
    const isProduction = this.configService.get<string>('app.env') === 'production';
    const cookieDomain = this.configService.get<string>('auth.cookieDomain');
    const accessTokenExpiration =
      this.configService.get<number>('auth.accessTokenExpiration') || 1800;

    response.cookie('jako_refresh_token', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      expires: refreshTokenExpiry,
      path: '/',
      ...(cookieDomain && { domain: cookieDomain }),
    });

    response.cookie('jako_access_token', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      expires: new Date(Date.now() + accessTokenExpiration * 1000),
      path: '/',
      ...(cookieDomain && { domain: cookieDomain }),
    });
  }

  @UseGuards(AuthGuard)
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @Get('me') //auth/me
  async getMe(@Req() request: Request) {
    const user = request.user as { userId: string };
    return this.authService.getMe(user.userId);
  }

  // EMAIL + PASSWORD AUTHENTICATION

  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @Get('check-username') //auth/check-username
  async checkUsername(@Query('username') username: string) {
    const isAvailable = await this.authService.isUsernameAvailable(username);
    return { isAvailable };
  }

  @Throttle({ default: { limit: 3, ttl: 3600000 } })
  @Post('signup') //auth/signup
  async signUp(@Body() signupData: SignupDto, @Res({ passthrough: true }) response: Response) {
    await this.authService.signup(signupData);

    const { accessToken, refreshToken, refreshTokenExpiry } = await this.authService.login({
      email: signupData.email,
      password: signupData.password,
    });

    this.setAuthCookies(response, accessToken, refreshToken, refreshTokenExpiry);
  }

  @Throttle({ default: { limit: 10, ttl: 900000 } })
  @Post('login') //auth/login
  async login(@Body() loginData: LoginDto, @Res({ passthrough: true }) response: Response) {
    const { accessToken, refreshToken, refreshTokenExpiry } =
      await this.authService.login(loginData);

    this.setAuthCookies(response, accessToken, refreshToken, refreshTokenExpiry);
  }

  // TOKEN REFRESHING

  @Throttle({ default: { limit: 10, ttl: 3600000 } })
  @Post('refresh') //auth/refresh
  async refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true })
    response: Response,
  ) {
    const existingToken = request.cookies['jako_refresh_token'] as string;

    const { accessToken, refreshToken, refreshTokenExpiry } =
      await this.authService.refreshTokens(existingToken);

    this.setAuthCookies(response, accessToken, refreshToken, refreshTokenExpiry);
  }

  @Throttle({ default: { limit: 10, ttl: 900000 } })
  @Post('logout') //auth/logout
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const existingToken = request.cookies['jako_refresh_token'] as string;
    if (existingToken) {
      await this.authService.logout(existingToken);
    }

    const isProduction = this.configService.get<string>('app.env') === 'production';
    const cookieDomain = this.configService.get<string>('auth.cookieDomain');
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax' as const,
      path: '/',
      ...(cookieDomain && { domain: cookieDomain }),
    };

    response.clearCookie('jako_access_token', cookieOptions);
    response.clearCookie('jako_refresh_token', cookieOptions);
  }

  // EMAIL VERIFICATION

  @UseGuards(AuthGuard)
  @Throttle({ default: { limit: 3, ttl: 3600000 } })
  @Post('send-verify-email') //auth/send-verify-email
  async sendVerifyEmail(@Req() request: Request) {
    const { userId } = request.user as { userId: string };
    const email = await this.authService.getUserEmail(userId);
    await this.authService.generateOTPCode(email);
  }

  @UseGuards(AuthGuard)
  @Throttle({ default: { limit: 10, ttl: 900000 } })
  @Post('verify-email') //auth/verify-email
  async verifyEmail(@Req() request: Request, @Body('code') code: string) {
    const { userId } = request.user as { userId: string };
    const email = await this.authService.getUserEmail(userId);
    await this.authService.verifyOTPCode(email, code);
  }

  // OAUTH AUTHENTICATION

  @Throttle({ default: { limit: 5, ttl: 900000 } })
  @Post('oauth/toggle-provider') //auth/oauth/toggle-provider
  @UseGuards(AuthGuard)
  async linkOAuthProvider(@Req() request: Request, @Body('provider') provider: string) {
    const user = request.user as { userId: string };
    const userId = new Types.ObjectId(user.userId);

    await this.authService.toggleOAuthProvider(userId, provider);
  }

  @Throttle({ default: { limit: 10, ttl: 900000 } })
  @Get('oauth/google') //auth/oauth/google
  @UseGuards(AuthPassportGuard('google'))
  async googleOAuth() {}

  @Throttle({ default: { limit: 10, ttl: 900000 } })
  @Get('oauth/google/callback') //auth/oauth/google/callback
  @UseGuards(AuthPassportGuard('google'))
  async googleOAuthCallback(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const frontendUrl =
      this.configService.get<string>('auth.frontendUrl') || 'http://localhost:3000';

    const user = request.user as OAuthUserDto;
    if (!user) {
      response.redirect(`${frontendUrl}/auth?error=oauth_no_data`);
      return;
    }

    try {
      const { accessToken, refreshToken, refreshTokenExpiry } =
        await this.authService.loginWithOAuth(user);

      this.setAuthCookies(response, accessToken, refreshToken, refreshTokenExpiry);
      response.redirect(`${frontendUrl}/dash`);
    } catch {
      response.redirect(`${frontendUrl}/auth?error=oauth_failed`);
    }
  }

  /* FACEBOOK TEMPORARILY DISABLED

  @Get('oauth/facebook') //auth/oauth/facebook
  @UseGuards(AuthPassportGuard('facebook'))
  async facebookOAuth() {}

  @Get('oauth/facebook/callback') //auth/oauth/facebook/callback
  @UseGuards(AuthPassportGuard('facebook'))
  async facebookOAuthCallback(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = request.user as OAuthUserDto;
    if (!user) {
      throw new BadRequestException('No user information from Facebook OAuth');
    }

    const { accessToken, refreshToken, refreshTokenExpiry } =
      await this.authService.loginWithOAuth(user);

    this.setAuthCookies(response, accessToken, refreshToken, refreshTokenExpiry);

    const redirectUrl =
      this.configService.get<string>('auth.oauthSuccessRedirectUrl') ||
      'http://localhost:3000';
    response.redirect(redirectUrl);
  }
  */
}
