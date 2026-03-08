import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Types } from 'mongoose';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.cookies?.['jako_access_token'] as string | undefined;
    if (!token) throw new UnauthorizedException('Invalid token');

    try {
      const payload = await this.jwtService.verifyAsync<{ userId: Types.ObjectId }>(token);

      request.user = {
        userId: payload.userId.toString(),
      };
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }
}
