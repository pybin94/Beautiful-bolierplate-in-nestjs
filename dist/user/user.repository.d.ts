import { QueryRunner, Repository } from "typeorm";
import { User } from './entity/user.entity';
import { UserCommissionRate } from './entity/user-commission-rate.entity';
import { LogUserMoney } from 'src/log/entity/log-user-money.entity';
import { Site } from 'src/site/entity/site.entity';
import { AdminRepository } from 'src/admin/admin.repository';
import { TransactionData } from 'src/admin/admin.model';
export declare class UserRepository {
    private readonly userRepository;
    private readonly siteRepository;
    private readonly userCommissionRateRepository;
    private readonly logUserMoneyRepository;
    private readonly adminRepository;
    constructor(userRepository: Repository<User>, siteRepository: Repository<Site>, userCommissionRateRepository: Repository<UserCommissionRate>, logUserMoneyRepository: Repository<LogUserMoney>, adminRepository: AdminRepository);
    duplicateCheck(body: any, siteId: number, checkColumn: string): Promise<{
        count: number;
    }>;
    createUser(body: any, queryRunner: QueryRunner): Promise<object>;
    createUserCommitionRate(body: any, queryRunner: QueryRunner): Promise<void>;
    users(body: any, token: any): Promise<object>;
    updateUser(body: any): Promise<void>;
    updateUserPassword(body: any): Promise<object>;
    deleteUser(body: any): Promise<object>;
    userTransaction(queryRunner: QueryRunner, transactionData: TransactionData): Promise<object>;
    userPayment(queryRunner: QueryRunner, paymentType: number, targetId: number, amount: number): Promise<object>;
}
