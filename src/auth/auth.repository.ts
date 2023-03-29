import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { Admin } from '../admin/admin.entity';

@Injectable()
export class AuthRepository {
    constructor(
        @InjectRepository(Admin)
        private readonly repository: Repository<Admin>,
    ) {};

    async checkAdmin(authCredentialsDto: AuthCredentialsDto): Promise<Admin> {
        const { identity, password } = authCredentialsDto;
        return await this.repository.findOne({ where: { identity } });
    }
}