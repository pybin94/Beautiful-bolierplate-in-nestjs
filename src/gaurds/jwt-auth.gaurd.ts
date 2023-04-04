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
      request.token = decoded;
      return true;
      
    } catch (error) {
      const response = ctx.switchToHttp().getResponse();
      await response.cookie("jwt", null, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        domain: process.env.CLIENT_DOMAIN && "localhost",
        path: '/',
        maxAge: 0
    });
    await response.cookie("user", null,{
        sameSite: "none",
        secure: true,
        domain: process.env.CLIENT_DOMAIN && "localhost",
        path: '/',
        maxAge: 0
    });
      handleError("canActivate", error)
      return false;
    }
  }
}