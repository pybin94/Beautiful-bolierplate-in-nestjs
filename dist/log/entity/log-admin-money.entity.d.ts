export declare class LogAdminMoney {
    id: number;
    siteId: number;
    fromId: number;
    toAdminId: number;
    toUserId: number;
    money: number;
    previousBalance: number;
    postBalance: number;
    transactionType: number;
    status: number;
    description: string;
    memo: string;
    createdAt: Date;
    updatedAt: Date;
}
