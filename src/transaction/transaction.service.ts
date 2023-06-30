import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { handleError, handleSend } from 'src/config/log.tools.config';

@Injectable()
export class TransactionService {
    constructor(
        private readonly transactionRepository: TransactionRepository,
    ) {}

    async userDeposit(body: any): Promise<object> {
        try {
            const userDeposit = await this.transactionRepository.userTransaction(body, 1)
            const [list, total] = Object.values(userDeposit);
            return handleSend({list, total});

        } catch (error) {
            return handleError("[Service] userDeposit", error, "데이터를 가져오던중 문제가 생겼습니다.");
        }
    }

    async userWithdrawal(body: any): Promise<object> {
        try {
            const userWithdrawal = await this.transactionRepository.userTransaction(body, 2)
            const [list, total] = Object.values(userWithdrawal);
            return handleSend({list, total});
        } catch (error) {
            return handleError("[Service] userDeposit", error, "데이터를 가져오던중 문제가 생겼습니다.");
        }
    }

    async userHistory(body: any): Promise<object> {
        try {
            const userHistory = await this.transactionRepository.userTransactionHistory(body)
            const [list, total] = Object.values(userHistory);
            return handleSend({list, total});

        } catch (error) {
            return handleError("[Service] userHistory", error, "데이터를 가져오던중 문제가 생겼습니다.");
        }
    }

    async adminDeposit(body: any): Promise<object> {
        try {
            const adminDeposit = await this.transactionRepository.adminTransaction(body, 1)
            const [list, total] = Object.values(adminDeposit);
            return handleSend({list, total});

        } catch (error) {
            return handleError("[Service] userDeposit", error, "데이터를 가져오던중 문제가 생겼습니다.");
        }
    }

    async adminWithdrawal(body: any): Promise<object> {
        try {
            const adminWithdrawal = await this.transactionRepository.adminTransaction(body, 2)
            const [list, total] = Object.values(adminWithdrawal);
            return handleSend({list, total});

        } catch (error) {
            return handleError("[Service] adminWithdrawal", error, "데이터를 가져오던중 문제가 생겼습니다.");
        }
    }

    async adminHistory(body: any): Promise<object> {
        try {
            const adminHistory = await this.transactionRepository.adminTransactionHistory(body)
            const [list, total] = Object.values(adminHistory);
            return handleSend({list, total});

        } catch (error) {
            return handleError("[Service] adminHistory", error, "데이터를 가져오던중 문제가 생겼습니다.");
        }
    }

    async userDepositAlert(body: any): Promise<object> {
        try {
            const adminDepositAlert = await this.transactionRepository.adminTransactionAlert(body, 1)
            const [list, total] = Object.values(adminDepositAlert);
            return handleSend({list, total});

        } catch (error) {
            return handleError("[Service] adminDepositAlert", error, "데이터를 가져오던중 문제가 생겼습니다.");
        }
    }

    async userWithdrawalAlert(body: any): Promise<object> {
        try {
            const adminWithdrawalAlert = await this.transactionRepository.adminTransactionAlert(body, 2)
            const [list, total] = Object.values(adminWithdrawalAlert);
            return handleSend({list, total});

        } catch (error) {
            return handleError("[Service] adminWithdrawalAlert", error, "데이터를 가져오던중 문제가 생겼습니다.");
        }
    }

    async adminDepositAlert(body: any): Promise<object> {
        try {
            const adminDepositAlert = await this.transactionRepository.adminTransactionAlert(body, 1)
            const [list, total] = Object.values(adminDepositAlert);
            return handleSend({list, total});

        } catch (error) {
            return handleError("[Service] adminDepositAlert", error, "데이터를 가져오던중 문제가 생겼습니다.");
        }
    }

    async adminWithdrawalAlert(body: any): Promise<object> {
        try {
            const adminWithdrawalAlert = await this.transactionRepository.adminTransactionAlert(body, 2)
            const [list, total] = Object.values(adminWithdrawalAlert);
            return handleSend({list, total});

        } catch (error) {
            return handleError("[Service] adminWithdrawalAlert", error, "데이터를 가져오던중 문제가 생겼습니다.");
        }
    }
}
