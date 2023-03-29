import { handleError } from './../config/log.tools.config';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const token = request.cookies['jwt'];

    if (!token) return false;

    try {
      const decoded = await this.jwtService.verifyAsync(token);
      console.log(decoded)
      request.user = decoded;
      return true;
      
    } catch (error) {
      handleError("canActivate", error)
      return false;
    }
  }
}