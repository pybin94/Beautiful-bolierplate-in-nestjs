import { log , handleError} from './../config/log.tools';
import { JwtAuthGuard } from '../gaurds/jwt-auth.gaurd';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { Body, Controller, Get, Post, UseGuards, Res, HttpStatus, Req, HttpCode, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { config } from 'dotenv'
config()

@Controller()
export class AuthController {
    constructor( 
        private readonly authService: AuthService
    ) {}

    @Get('/qwe')
    @UseGuards(JwtAuthGuard) 
    async asd(@Req() req: any) {
        const authToken = req.user;
        console.log(authToken)
        return "12344"
    }

    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    async signIn(
        @Body() authCredentialsDto: AuthCredentialsDto, 
        @Res({ passthrough: true }) res: Response,
    ) {
        try {
            const signinResult = await this.authService.signIn(authCredentialsDto, res);

            let returnStatus: object;
            signinResult === true
            ? returnStatus = { status: 1, message: "Login successful" }
            : returnStatus = { status: 0, message: "Login fail" };

            return returnStatus;
        } catch ( error ){
            handleError("/signin", error)
        }
    }

    @Get('/signout')
    @HttpCode(HttpStatus.OK)
    async signOut(@Res({ passthrough: true }) res: any) {
        try {
            await this.authService.signOut(res);
            return {ststue: 1, message: "Logout successful"}
        } catch (error) {
            handleError("/signout", error)
        }
    }
}