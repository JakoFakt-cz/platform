import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Throttle } from '@nestjs/throttler';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Throttle({ default: { limit: 50, ttl: 60 * 5 } })
  @Get('id')
  getById(@Query('id') id: string) {
    return this.userService.getUserById({ id });
  }
}
