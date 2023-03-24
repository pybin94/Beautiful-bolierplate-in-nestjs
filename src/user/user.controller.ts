import { handleError } from './../config/log.tools.config';
import { createUser } from './../../../client/src/services/userCreate';
import { JwtAuthGuard } from './../gaurds/jwt-auth.gaurd';
import { UserService } from './../user/user.service';
import { Controller, UseGuards, Req, Res, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor( 
        private readonly userService: UserService
    ) {}

    @Post('/create')
    @UseGuards(JwtAuthGuard)
    async createUser(@Res({ passthrough: true }) res: any) {
        try {
            const createUserResult = await this.userService.createUser(res);
            console.log(createUserResult)
            return {ststue: 1, message: "create user successful"}
        } catch (error) {
            handleError("/signout", error)
        }
    }
}
