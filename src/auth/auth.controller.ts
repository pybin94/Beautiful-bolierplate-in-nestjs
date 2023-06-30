import { handleError} from '../config/log.tools.config';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { Body, Controller, Get, Post, UseGuards, Res, HttpStatus, Req, HttpCode, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller()
export class AuthController {
    constructor( 
        private readonly authService: AuthService
    ) {}

    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    async signIn(
        @Body() authCredentialsDto: AuthCredentialsDto, 
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request,
    ) {
        try {
            const signinResult = await this.authService.signIn(authCredentialsDto, res, req);
            if(authCredentialsDto.captcha == false) return handleError("Slide Me를 밀어주세요.", [])
            let returnStatus: object;
            signinResult
            ? returnStatus = { status: 1, data: signinResult, message: "Login successful" }
            : returnStatus = { status: 0, message: "Login fail" };
            
            return returnStatus;
        } catch ( error ){
            return handleError("/signin", error)
        }
    }

    @Get('/signout')
    @HttpCode(HttpStatus.OK)
    async signOut(@Res({ passthrough: true }) res: any) {
        try {
            await this.authService.signOut(res);
            return {ststue: 1, message: "Logout successful"}
        } catch (error) {
            return handleError("/signout", error)
        }
    }
}