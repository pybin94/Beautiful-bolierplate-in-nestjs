import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const token = request.cookies['adminJwt'];

    try {
      if (!token) throw Error; 

      const decoded = await this.jwtService.verifyAsync(token);
      request.token = decoded;
      return true;
      
    } catch (error) {
      const response = ctx.switchToHttp().getResponse();
      await response.cookie("adminJwt", null, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        domain: process.env.CLIENT_DOMAIN && "localhost",
        path: '/',
        maxAge: 0
      });
      await response.cookie("adminInfo", null,{
          sameSite: "none",
          secure: true,
          domain: process.env.CLIENT_DOMAIN && "localhost",
          path: '/',
          maxAge: 0
      });
      throw new UnauthorizedException('Unauthorized', '-2');
    }
  }
}