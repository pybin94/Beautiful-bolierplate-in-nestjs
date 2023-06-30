import { UserRepository } from './user.repository';
import { DataSource } from 'typeorm';
import { AdminRepository } from 'src/admin/admin.repository';
import { LogRepository } from 'src/log/log.repository';
import { SiteRepository } from 'src/site/site.repository';
import { Request } from 'express';
import { ProviderService } from 'src/provider/provider.service';
export declare class UserService {
    private readonly userRepository;
    private readonly siteRepository;
    private readonly adminRepository;
    private readonly logRepository;
    private readonly providerService;
    private readonly datasource;
    constructor(userRepository: UserRepository, siteRepository: SiteRepository, adminRepository: AdminRepository, logRepository: LogRepository, providerService: ProviderService, datasource: DataSource);
    checkUserIdentity(body: any): Promise<object>;
    createUser(body: any, token: any, req: Request): Promise<object>;
    users(body: any, token: any): Promise<object>;
    updateUser(body: any, token: any): Promise<object>;
    updateUserPassword(body: any): Promise<object>;
    deleteUser(body: any): Promise<object>;
    userTransaction(body: any, token: any): Promise<object>;
    userPayment(body: any, token: any): Promise<object>;
    userRateValidator(body: any, token: any): Promise<void>;
}
