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
    type: number;               // 1: 플레이어, 2: 에이전트, 3: 시스템
    transactionType: number;    // 1: 사이트 지급, 2: 사이트 회수,
    memo?: string;
}

export interface ThirdpartyLog {
    userId: number;
    providerThirdpartyId?: string | null;
    providerThirdpartyGameName?: string | null,
    userBalance: number;
    providerBalance: number;
    totalBalance: number;
    type: number;               // 1: 플레이어->게임사, 2: 게임사->플레이어
}

// status - 0: 취소, 1: 신청, 2: 대기, 3: 완료
// transactionType - 1: 입금, 2: 출금, 3: 상위 에이전트 지급, 4: 상위 에이전트 회수, 5: 하위 에이전트 지급, 6: 하위 에이전트 회수, 7: 플레이어 지급, 8: 플레이어 회수, 9: 포인트 전환
export const LogAdminMoneyDescription = {
    11: "에이전트 입금 신청",
    12: "에이전트 출금 신청",
    33: "상위 에이전트 지급",
    34: "상위 에이전트 회수",
    35: "하위 에이전트 지급",
    36: "하위 에이전트 회수",
    37: "플레이어 지급",
    38: "플레이어 회수",
    39: "에이전트 포인트 전환",
}

// type - 1: 롤링, 2: 루징, 3: 기타
// transactionType - 1: 상위 에이전트 지급, 2: 상위 에이전트 회수, 3: 하위 에이전트 지급, 4: 하위 에이전트 회수, 5: 플레이어 지급, 6: 플레이어 회수, 7: 포인트 전환
export const LogAdminPointMemo = {
    11: "상위 에이전트 롤링 포인트 지급",
    21: "상위 에이전트 루징 포인트 지급",
    31: "상위 에이전트 기타 포인트 지급",
    32: "상위 에이전트 포인트 회수",
    13: "하위 에이전트 롤링 포인트 지급",
    23: "하위 에이전트 루징 포인트 지급",
    33: "하위 에이전트 기타 포인트 지급",
    34: "하위 에이전트 포인트 회수",
    15: "플레이어 롤링 포인트 지급",
    25: "플레이어 루징 포인트 지급",
    35: "플레이어 기타 포인트 지급",
    36: "플레이어 포인트 회수",
    37: "에이전트 포인트 전환",
}

// status - 0: 취소, 1: 신청, 2: 대기, 3: 완료
// transactionType - 1: 입금, 2: 출금, 3: 에이전트 지급, 4: 에이전트 회수, 5: 포인트 전환
export const LogUserMoneyDescription = {
    11: "플레이어 입금 신청",
    12: "플레이어 출금 신청",
    33: "에이전트 지급",
    34: "에이전트 회수",
    37: "플레이어 지급",
    38: "플레이어 회수",
}

// type - 1: 롤링, 2: 루징, 3: 기타, 4: 신규첫충, 5: 당일첫충, 6: 매충
// transactionType - 1: 에이전트 지급, 2: 에이전트 회수, 3: 포인트 전환
export const LogUserPointMemo = {
    11: "에이전트 롤링 포인트 지급",
    21: "에이전트 루징 포인트 지급",
    31: "에이전트 기타 포인트 지급",
    41: "신규 첫충",
    51: "당일 첫충",
    61: "매충",
    32: "에이전트 포인트 회수",
    33: "포인트 전환",
}