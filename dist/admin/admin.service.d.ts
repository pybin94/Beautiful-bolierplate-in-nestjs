import { SiteRepository } from './../site/site.repository';
import { Admin } from './entity/admin.entity';
import { AdminRepository } from './admin.repository';
import { DataSource } from 'typeorm';
import { LogRepository } from 'src/log/log.repository';
import { Request } from 'express';
export declare class AdminService {
    private readonly adminRepository;
    private readonly siteRepository;
    private readonly logRepository;
    private readonly datasource;
    constructor(adminRepository: AdminRepository, siteRepository: SiteRepository, logRepository: LogRepository, datasource: DataSource);
    admin(body: any, token: any): Promise<object>;
    adminTree(body: any, token: any): Promise<object>;
    checkAdminIdentity(body: any): Promise<object>;
    checkAdminCode(body: any): Promise<object>;
    createAdmin(body: any, token: any, req: Request): Promise<object>;
    admins(body: any, token: any): Promise<object>;
    updateAdmin(body: any, token: any): Promise<object>;
    updateAdminPassword(body: any, token: Admin): Promise<object>;
    deleteAdmin(body: any): Promise<object>;
    adminTop(body: any, token: any): Promise<object>;
    adminTransaction(body: any, token: any): Promise<object>;
    adminPayment(body: any, token: any): Promise<object>;
    adminRateValidator(body: any, token: any): Promise<void>;
}
