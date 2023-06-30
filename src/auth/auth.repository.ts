import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { Admin } from '../admin/entity/admin.entity';
import { Request } from 'express';

@Injectable()
export class AuthRepository {
    constructor(
        @InjectRepository(Admin)
        private readonly repository: Repository<Admin>,
    ) {};

    async checkAdmin(authCredentialsDto: AuthCredentialsDto, req: Request): Promise<Admin> {
        const { identity, password } = authCredentialsDto;
        const loginInfo = await this.repository.findOne({ where: { identity } });
        await this.repository.createQueryBuilder()
            .update({latestIp: req.ip})
            .where("id = :id", { id: loginInfo.id })
            .execute()

        return loginInfo;
    }
}