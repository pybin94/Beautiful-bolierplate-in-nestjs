import { JwtAuthGuard } from './../gaurds/jwt-auth.gaurd';
import { AdminService } from './admin.service';
import { Controller, Get, Post, Body, UseGuards, Patch } from '@nestjs/common';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
    constructor(
        private readonly adminService: AdminService
    ) {}

    @Post('/create')
    async createAdmin(@Body() body:any): Promise<object> {
        const createAdminResult = await this.adminService.createAdmin(body);
        return createAdminResult;
    }

    @Post('/admins')
    async admins(@Body() body: any): Promise<object> {
        const adminsResult = await this.adminService.admins(body);
        return adminsResult;
    }

    @Patch('/update')
    async updateAdmin(@Body() body: any): Promise<object> {
        const updateAdminResult = await this.adminService.updateAdmin(body);
        return updateAdminResult;
    }

}
