import { handleError } from './../config/log.tools.config';
import { JwtAuthGuard } from '../gaurds/jwt-auth.gaurd';
import { UserService } from './../user/user.service';
import { Controller, UseGuards, Req, Res, Post, Body } from '@nestjs/common';
import { UserSignInDto } from './dto/user-sign-in.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor( 
        private readonly userService: UserService
    ) {}

    @Post('/create')
    async createUser(
        @Body() userSignInDto: UserSignInDto, 
        @Res({ passthrough: true }) res: any,
    ): Promise<object> {
        try {
            const createUserResult = await this.userService.createUser(userSignInDto, res);
            console.log(createUserResult)
            return {ststue: 1, message: "create user successful"}
        } catch (error) {
            handleError("/signout", error)
        }
    }
}