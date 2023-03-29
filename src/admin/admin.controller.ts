import { AdminService } from './admin.service';
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService
    ) {}

    @Post('/create')
    async createAdmin(@Body() body:any): Promise<object> {
        const createAdminResult = await this.adminService.createAdmin(body);
        console.log(createAdminResult)
        return createAdminResult
    }

    @Post('/admins')
    async admins(@Body() body: any): Promise<object> {
        const usersResult = await this.adminService.admins(body);
        return usersResult;
    }

}
