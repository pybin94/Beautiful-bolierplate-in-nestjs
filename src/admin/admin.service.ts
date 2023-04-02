import { Admin } from './admin.entity';
import { AdminRepository } from './admin.repository';
import { AdminSignInDto } from './dto/admin-sign-in.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
    constructor(
        private readonly adminRepository: AdminRepository,
    ) {}

    async createAdmin(adminSignInDto: AdminSignInDto): Promise<object> {
        return await this.adminRepository.createAdmin(adminSignInDto);
    }

    async admins(body: any): Promise<object> {
        return await this.adminRepository.admins(body);
    }

    async updateAdmin(body: any): Promise<object> {
        return await this.adminRepository.updateAdmin(body);
    }

    async updateAdminPassword(body: any, token: Admin): Promise<object> {
        return await this.adminRepository.updateAdminPassword(body, token);
    }

    async deleteAdmin(body: any): Promise<object> {
        return await this.adminRepository.deleteAdmin(body);
    }
}
