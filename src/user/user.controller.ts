import { JwtAuthGuard } from '../gaurds/jwt-auth.gaurd';
import { UserService } from './user.service';
import { Controller, UseGuards, Post, Body, Patch, Delete, Req } from '@nestjs/common';
import { Token } from './user.decorator';
import { Request } from 'express';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor( 
        private readonly userService: UserService 
    ) {}

    @Post('/check/identity')
    async checkAdminIdentity(@Body() body: any): Promise<object> {
        const checkAdminIdentityResult = await this.userService.checkUserIdentity(body);
        return checkAdminIdentityResult;
    }

    @Post('/create')
    async createUser(@Body() body: any, @Token() token: any, @Req() req: Request): Promise<object> {
            const createUserResult = await this.userService.createUser(body, token, req);
            return createUserResult;
    }

    @Post('/users')
    async users(@Body() body: any, @Token() token: any): Promise<object> {
        const usersResult = await this.userService.users(body, token);
        return usersResult;
    }

    @Patch('/update')
    async updateUser(@Body() body: any, @Token() token: any): Promise<object> {
        const updateResult = await this.userService.updateUser(body, token);
        return updateResult;
    }

    @Patch('/update/password')
    async updateUserPassword(@Body() body: any): Promise<object> {
        const updateResult = await this.userService.updateUserPassword(body);
        return updateResult;
    }

    @Delete('/delete')
    async deleteUser(@Body() body: any): Promise<object> {
        const deleteResult = await this.userService.deleteUser(body);
        return deleteResult;
    }
}