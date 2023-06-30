import { Injectable } from '@nestjs/common';
import { HistoryRepository } from './history.repository';
import { handleError, handleSend } from 'src/config/log.tools.config';

@Injectable()
export class HistoryService {
    constructor(
        private readonly historyRepository: HistoryRepository,
    ) {}

    async userMoneyTransaction(body: any, token: any): Promise<object> {
        try {
            let userMoneyTransactionList = await this.historyRepository.userMoneyTransaction(body, token)
            const [list, total] = Object.values(userMoneyTransactionList);
            
            return handleSend({list, total});
        } catch (error) {
            handleError("[Servie] userMoneyTransaction", error)
        }          
    }

    async userPointTransaction(body: any, token: any): Promise<object> {
        try {
            let userPointTransactionList = await this.historyRepository.userPointTransaction(body, token)
            const [list, total] = Object.values(userPointTransactionList);

            return handleSend({list, total});
        } catch (error) {
            handleError("[Servie] userPointTransaction", error)
        }
    }

    async adminMoneyTransaction(body: any, token: any): Promise<object> {
        try {
            let adminMoneyTransactionList = await this.historyRepository.adminMoneyTransaction(body, token)
            const [list, total] = Object.values(adminMoneyTransactionList);

            return handleSend({list, total});
        } catch (error) {
            handleError("[Servie] adminMoneyTransaction", error)
        }
    }

    async adminPointTransaction(body: any, token: any): Promise<object> {
        try {
            let AdminPointTransactionList = await this.historyRepository.adminPointTransaction(body, token)
            const [list, total] = Object.values(AdminPointTransactionList);

            return handleSend({list, total});
        } catch (error) {
            handleError("[Servie] adminPointTransaction", error)
        }
    }

    async siteMoneyTransaction(body: any): Promise<object> {
        try {
            let siteMoneyTransactionList = await this.historyRepository.siteMoneyTransaction(body)
            const [list, total] = Object.values(siteMoneyTransactionList);

            return handleSend({list, total});
        } catch (error) {
            handleError("[Servie] siteMoneyTransaction", error)
        }
    }

    async userThirdpartyTransaction(body: any): Promise<object> {
        try {
            let userThirdpartyTransactionList = await this.historyRepository.userThirdpartyTransaction(body)
            const [list, total] = Object.values(userThirdpartyTransactionList);

            return handleSend({list, total});
        } catch (error) {
            handleError("[Servie] userThirdpartyTransaction", error)
        }
    }
}