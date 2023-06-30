import { HistoryRepository } from './history.repository';
export declare class HistoryService {
    private readonly historyRepository;
    constructor(historyRepository: HistoryRepository);
    userMoneyTransaction(body: any, token: any): Promise<object>;
    userPointTransaction(body: any, token: any): Promise<object>;
    adminMoneyTransaction(body: any, token: any): Promise<object>;
    adminPointTransaction(body: any, token: any): Promise<object>;
    siteMoneyTransaction(body: any): Promise<object>;
    userThirdpartyTransaction(body: any): Promise<object>;
}
