import { log } from '../config/log.tools';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['jwt'];

    if (!token) return false;

    try {
      const decoded = await this.jwtService.verifyAsync(token);
      request.user = decoded;
      return true;
      
    } catch (error) {
      log("canActivate", error)
      return false;
    }
  }
}