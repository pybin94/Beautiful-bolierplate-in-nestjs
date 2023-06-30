import { QueryRunner, Repository, TreeRepository } from "typeorm";
import { Admin } from './entity/admin.entity';
import { AdminCommissionRate } from './entity/admin-commission-rate.entity';
import { LogAdminMoney } from 'src/log/entity/log-admin-money.entity';
import { Site } from 'src/site/entity/site.entity';
import { TransactionData } from './admin.model';
export declare class AdminRepository {
    private readonly adminRepository;
    private readonly siteRepository;
    private readonly adminTreeRepository;
    private readonly adminCommissionRateRepository;
    private readonly logAdminMoneyRepository;
    constructor(adminRepository: Repository<Admin>, siteRepository: Repository<Site>, adminTreeRepository: TreeRepository<Admin>, adminCommissionRateRepository: Repository<AdminCommissionRate>, logAdminMoneyRepository: Repository<LogAdminMoney>);
    private adminlist;
    private adminTopList;
    admin(body: any, token: any): Promise<object>;
    adminTree(body: any, token: any): Promise<object>;
    createTreeStructure(node: Admin, repository: any): Promise<Admin>;
    duplicateCheck(body: any, checkColumn: string): Promise<{
        count: number;
    }>;
    createAdmin(body: any, queryRunner: QueryRunner): Promise<object>;
    createAdminCommitionRate(body: any, queryRunner: QueryRunner): Promise<void>;
    admins(body: any, token: any): Promise<object>;
    adminStructure(node: any, repository: any): Promise<Admin[]>;
    updateAdmin(body: any): Promise<void>;
    updateAdminPassword(body: any, token: Admin): Promise<object>;
    deleteAdmin(body: any): Promise<object>;
    adminTop(body: any): Promise<object>;
    admiTopnStructure(id: number): Promise<object>;
    adminTransaction(queryRunner: QueryRunner, transactionData: TransactionData): Promise<object>;
    adminPayment(queryRunner: QueryRunner, paymentType: number, targetId: number, amount: number): Promise<object>;
}
