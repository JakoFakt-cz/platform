import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup') //auth/signup
  async signUp(@Body() signupData: SignupDto) {
    return this.authService.signup(signupData);
  }

  @Post('login') //auth/login
  async login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }
}
