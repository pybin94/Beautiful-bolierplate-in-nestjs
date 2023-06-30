import { HistoryService } from './history.service';
export declare class HistoryController {
    private readonly historyService;
    constructor(historyService: HistoryService);
    userMoneyTransaction(body: any, token: any): Promise<object>;
    userPointTransaction(body: any, token: any): Promise<object>;
    adminMoneyTransaction(body: any, token: any): Promise<object>;
    adminPointTransaction(body: any, token: any): Promise<object>;
    siteMoneyTransaction(body: any, token: any): Promise<object>;
    userThirdpartyTransaction(body: any, token: any): Promise<object>;
}
