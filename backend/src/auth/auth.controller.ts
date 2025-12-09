import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import type { Request, Response } from 'express';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @Get('check-username') //auth/check-username
  async checkUsername(@Query('username') username: string) {
    const isAvailable = await this.authService.isUsernameAvailable(username);
    return { isAvailable };
  }
}
