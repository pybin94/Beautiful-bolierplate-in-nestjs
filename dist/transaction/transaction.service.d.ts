import { TransactionRepository } from './transaction.repository';
export declare class TransactionService {
    private readonly transactionRepository;
    constructor(transactionRepository: TransactionRepository);
    userDeposit(body: any): Promise<object>;
    userWithdrawal(body: any): Promise<object>;
    userHistory(body: any): Promise<object>;
    adminDeposit(body: any): Promise<object>;
    adminWithdrawal(body: any): Promise<object>;
    adminHistory(body: any): Promise<object>;
    userDepositAlert(body: any): Promise<object>;
    userWithdrawalAlert(body: any): Promise<object>;
    adminDepositAlert(body: any): Promise<object>;
    adminWithdrawalAlert(body: any): Promise<object>;
}
