import { AdminSignInDto } from './dto/admin-sign-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, UnauthorizedException, InternalServerErrorException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from "typeorm";
import { Admin } from './admin.entity';

@Injectable()
export class AdminRepository {
    constructor(
        @InjectRepository(Admin)
        private readonly repository: Repository<Admin>,
    ) {};
    
    async createAdmin(adminSignInDto: AdminSignInDto): Promise<[]> {
        const { identity, password } = adminSignInDto;
        const admin = this.repository.create({ identity, password });
        try {
            await this.repository.save(admin);
            return 
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException('Existing');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}