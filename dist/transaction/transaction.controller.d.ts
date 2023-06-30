import { TransactionService } from './transaction.service';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    userDeposit(body: any, token: any): Promise<object>;
    userWithdraw(body: any, token: any): Promise<object>;
    user(body: any, token: any): Promise<object>;
    adminDeposit(body: any, token: any): Promise<object>;
    adminDepositAlert(body: any, token: any): Promise<object>;
    adminWithdrawal(body: any, token: any): Promise<object>;
    adminWithdrawalAlert(body: any, token: any): Promise<object>;
    admin(body: any, token: any): Promise<object>;
}
