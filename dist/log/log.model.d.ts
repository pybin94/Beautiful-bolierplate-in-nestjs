export interface MoneyLog {
    fromId: number;
    toId?: number;
    toAdminId?: number;
    toUserId?: number;
    money: number;
    postBalance: number;
    status: number;
    transactionType: number;
    memo?: string;
}
export interface UpdateMoneyLog {
    status: number;
    logId: number;
    memo?: string;
}
export interface PointLog {
    fromId: number;
    toId?: number;
    toAdminId?: number;
    toUserId?: number;
    postPoint: number;
    point: number;
    type: number;
    transactionType: number;
    memo?: string;
}
export interface SiteMoneyLog {
    toAdminId?: number;
    toUserId?: number;
    money: number;
    postBalance: number;
    code?: number;
    type: number;
    transactionType: number;
    memo?: string;
}
export interface ThirdpartyLog {
    userId: number;
    providerThirdpartyId?: string | null;
    providerThirdpartyGameName?: string | null;
    userBalance: number;
    providerBalance: number;
    totalBalance: number;
    type: number;
}
export declare const LogAdminMoneyDescription: {
    11: string;
    12: string;
    33: string;
    34: string;
    35: string;
    36: string;
    37: string;
    38: string;
    39: string;
};
export declare const LogAdminPointMemo: {
    11: string;
    21: string;
    31: string;
    32: string;
    13: string;
    23: string;
    33: string;
    34: string;
    15: string;
    25: string;
    35: string;
    36: string;
    37: string;
};
export declare const LogUserMoneyDescription: {
    11: string;
    12: string;
    33: string;
    34: string;
    37: string;
    38: string;
};
export declare const LogUserPointMemo: {
    11: string;
    21: string;
    31: string;
    41: string;
    51: string;
    61: string;
    32: string;
    33: string;
};
