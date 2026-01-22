import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import type { Request, Response } from 'express';
import { Throttle } from '@nestjs/throttler';
import { SendVerifyEmailDto } from './dto/sendVerifyEmail.dto';
import { VerifyEmailDto } from './dto/verifyEmail.dto';
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

    response.cookie('jako_refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: refreshTokenExpiry,
      path: '/auth/refresh',
    });

    return {
      accessToken,
    };
  }

  @Throttle({ default: { limit: 10, ttl: 900000 } })
  @Post('login') //auth/login
  async login(@Body() loginData: LoginDto, @Res({ passthrough: true }) response: Response) {
    const { accessToken, refreshToken, refreshTokenExpiry } =
      await this.authService.login(loginData);

    response.cookie('jako_refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: refreshTokenExpiry,
      path: '/auth/refresh',
    });

    return {
      accessToken,
    };
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

    const { accessToken, refreshToken } = await this.authService.refreshTokens(existingToken);

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 14);

    response.cookie('jako_refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: expiryDate,
      path: '/auth/refresh',
    });

    return {
      accessToken,
    };
  }

  // EMAIL VERIFICATION

  @Post('send-verify-email') //auth/send-verify-email
  async sendVerifyEmail(@Body() emailData: SendVerifyEmailDto) {
    await this.authService.generateOTPCode(emailData.email.toLowerCase());
  }

  @Post('verify-email') //auth/send-verify-email
  async verifyEmail(@Body() verifyData: VerifyEmailDto) {
    await this.authService.verifyOTPCode(verifyData.email.toLowerCase(), verifyData.code);
  }

  // OAUTH AUTHENTICATION

  @Get('oauth/toggle-provider/:provider') //auth/oauth/toggle-provider/:provider
  @UseGuards(AuthGuard)
  async linkOAuthProvider(@Req() request: Request) {
    const user = request.user as { userId: string };
    const userId = new Types.ObjectId(user.userId);
    const provider = request.params.provider;

    await this.authService.toggleOAuthProvider(userId, provider);
  }

  @Get('oauth/google') //auth/oauth/google
  @UseGuards(AuthPassportGuard('google'))
  async googleOAuth() {}

  @Get('oauth/google/callback') //auth/oauth/google/callback
  @UseGuards(AuthPassportGuard('google'))
  async googleOAuthCallback(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = request.user as OAuthUserDto;
    if (!user) {
      throw new BadRequestException('No user information from Google OAuth');
    }

    const { refreshToken, refreshTokenExpiry } = await this.authService.loginWithOAuth(user);

    response.cookie('jako_refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: refreshTokenExpiry,
      path: '/auth/refresh',
    });

    const redirectUrl =
      this.configService.get<string>('auth.oauthSuccessRedirectUrl') ||
      'http://localhost:3000/oauth-success';
    response.redirect(redirectUrl);
  }

  /* FACEBOOK TEMPOARILY DISABLED

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

    const { refreshToken, refreshTokenExpiry } = await this.authService.loginWithOAuth(user);

    response.cookie('jako_refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: refreshTokenExpiry,
      path: '/auth/refresh',
    });

    const redirectUrl =
      this.configService.get<string>('auth.oauthSuccessRedirectUrl') ||
      'http://localhost:3000/oauth-success';
    response.redirect(redirectUrl);
  }
  */
}
