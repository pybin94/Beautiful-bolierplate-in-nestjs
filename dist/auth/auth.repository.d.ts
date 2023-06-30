import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { Repository } from "typeorm";
import { Admin } from '../admin/entity/admin.entity';
import { Request } from 'express';
export declare class AuthRepository {
    private readonly repository;
    constructor(repository: Repository<Admin>);
    checkAdmin(authCredentialsDto: AuthCredentialsDto, req: Request): Promise<Admin>;
}
