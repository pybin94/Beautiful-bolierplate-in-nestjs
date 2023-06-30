import { LogAdminMoney } from 'src/log/entity/log-admin-money.entity';
import { LogUserMoney } from 'src/log/entity/log-user-money.entity';
import { Repository } from 'typeorm';
export declare class TransactionRepository {
    private readonly logUserMoneyRepository;
    private readonly logAdminMoneyRepository;
    constructor(logUserMoneyRepository: Repository<LogUserMoney>, logAdminMoneyRepository: Repository<LogAdminMoney>);
    userTransaction(body: any, transactionType: number): Promise<object>;
    userTransactionHistory(body: any): Promise<object>;
    adminTransaction(body: any, transactionType: number): Promise<object>;
    adminTransactionHistory(body: any): Promise<object>;
    userTransactionAlert(body: any, transactionType: number): Promise<object>;
    adminTransactionAlert(body: any, transactionType: number): Promise<object>;
}
