import { handleError } from './../config/log.tools.config';
import { JwtAuthGuard } from '../gaurds/jwt-auth.gaurd';
import { UserService } from './../user/user.service';
import { Controller, UseGuards, Req, Post, Body, Get, Res } from '@nestjs/common';
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
    ): Promise<object> {
        try {
            const createUserResult = await this.userService.createUser(userSignInDto);
            return createUserResult;
        } catch (error) {
            return handleError("createUser", error)
        }
    }

    @Post('/users')
    async users(@Body() body: any): Promise<object> {
        const usersResult = await this.userService.users(body);
        return usersResult;
    }
}