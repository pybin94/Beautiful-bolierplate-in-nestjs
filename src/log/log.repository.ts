import { Injectable } from '@nestjs/common';
import { QueryRunner, Repository } from "typeorm";
import { LogAdminMoney } from './entity/log-admin-money.entity';
import { LogAdminPoint } from './entity/log-admin-point.entity';
import { LogUserMoney } from './entity/log-user-money.entity';
import { LogUserPoint } from './entity/log-user-point.entity';
import { LogAdminMoneyDescription, LogAdminPointMemo, LogUserPointMemo, LogUserMoneyDescription, PointLog, MoneyLog, UpdateMoneyLog, SiteMoneyLog, ThirdpartyLog } from './log.model';
import { InjectRepository } from '@nestjs/typeorm';
import { LogSiteMoney } from './entity/log-site-money.entity';
import { LogUserThirdpartyMoney } from './entity/log-user-thirdparty-money.entity';

@Injectable()export class LogRepository {
    constructor(
        @InjectRepository(LogUserMoney)
        private readonly LogUserMoneyRepository: Repository<LogUserMoney>,

        @InjectRepository(LogAdminMoney)
        private readonly LogAdminMoneyRepository: Repository<LogAdminMoney>,
    ) {};

    async adminMoneyLog(queryRunner: QueryRunner, logData: MoneyLog) {
        const logAdminMoney = new LogAdminMoney();

        logAdminMoney.siteId = parseInt(process.env.SITE_ID);
        logAdminMoney.fromId = logData.fromId;
        logAdminMoney.toAdminId = logData.toAdminId;
        logAdminMoney.toUserId = logData.toUserId;
        logAdminMoney.money = logData.money;
        logAdminMoney.postBalance = logData.postBalance; 
        logAdminMoney.status = logData.status;
        logAdminMoney.transactionType = logData.transactionType;
        logAdminMoney.description = LogAdminMoneyDescription[`${ logData.status}${logData.transactionType}`] 
        if(logData.memo) logAdminMoney.memo = logData.memo;

        if(logData.postBalance == null) {
            logAdminMoney.previousBalance = logData.postBalance
        } else {
            // status - 0: 취소, 1: 신청, 2: 대기, 3: 완료
            // transactionType - 1: 입금, 2: 출금, 3: 상위 에이전트 지급, 4: 상위 에이전트 회수, 5: 하위 에이전트 지급, 6: 하위 에이전트 회수, 7: 플레이어 지급, 8: 플레이어 회수, 9: 포인트 전환
            if(logData.transactionType == 2 || logData.transactionType == 4 || logData.transactionType == 5 || logData.transactionType == 7) {
                logAdminMoney.previousBalance = Number(logData.postBalance) + Number(logData.money); 
            } else if (logData.transactionType == 1){
                logAdminMoney.previousBalance = Number(logData.postBalance);
                logAdminMoney.postBalance =  Number(logData.postBalance) + Number(logData.money); 
            } else {
                logAdminMoney.previousBalance = Number(logData.postBalance) - Number(logData.money); 
            }
        }
        return await queryRunner.manager.save(logAdminMoney);
    }
    
    async adminMoneyLogUpdate(queryRunner: QueryRunner, updateMoneyLog: UpdateMoneyLog ) {
        let target = await this.LogAdminMoneyRepository.findOne(
            {where:{ id: updateMoneyLog.logId },
            relations: ['toAdminId']
        });

        target.status = updateMoneyLog.status

        if(updateMoneyLog.memo) {
            target.memo = updateMoneyLog.memo
        }
        return await queryRunner.manager.save(target);
    }

    async adminPointLog(queryRunner: QueryRunner, logData: PointLog) {
        const logAdminPoint = new LogAdminPoint();
        logAdminPoint.siteId = parseInt(process.env.SITE_ID);
        logAdminPoint.fromId = logData.fromId;
        logAdminPoint.toAdminId = logData.toAdminId;
        logAdminPoint.toUserId = logData.toUserId;
        logAdminPoint.point = logData.point;
        logAdminPoint.postPoint = logData.postPoint;
        logAdminPoint.type = logData.type;
        logAdminPoint.transactionType = logData.transactionType;
        logAdminPoint.description = LogAdminPointMemo[`${logData.type}${logData.transactionType}`];

        if(logData.memo) logAdminPoint.memo = logData.memo;

        // type - 1: 롤링, 2: 루징, 3: 기타
        // transactionType - 1: 상위 에이전트 지급, 2: 상위 에이전트 회수, 3: 하위 에이전트 지급, 4: 하위 에이전트 회수, 5: 플레이어 지급, 6: 플레이어 회수, 7: 포인트 전환
        if(logData.transactionType == 2 || logData.transactionType == 3 || logData.transactionType == 5 || logData.transactionType == 7) {
            logAdminPoint.previousPoint = Number(logData.postPoint) + Number(logData.point);
        } else {
            logAdminPoint.previousPoint = Number(logData.postPoint) - Number(logData.point);
        }
        return await queryRunner.manager.save(logAdminPoint);
    }

    async userMoneyLog(queryRunner: QueryRunner, logData: MoneyLog) {
        const logUserMoney = new LogUserMoney();

        logUserMoney.siteId = parseInt(process.env.SITE_ID);
        logUserMoney.fromId = logData.fromId;
        logUserMoney.toId = logData.toId;
        logUserMoney.money = logData.money;
        logUserMoney.postBalance = logData.postBalance; 
        logUserMoney.status = logData.status;
        logUserMoney.transactionType = logData.transactionType;
        logUserMoney.description = LogUserMoneyDescription[`${logData.status}${logData.transactionType}`]
        if(logData.memo) logUserMoney.memo = logData.memo;

        if(logData.postBalance == null) {
            logUserMoney.previousBalance = logData.postBalance
        } else {
            // status - 0: 취소, 1: 신청, 2: 대기, 3: 완료
            // transactionType - 1: 입금, 2: 출금, 3: 에이전트 지급, 4: 에이전트 회수, 5: 포인트 전환
            if(logData.transactionType == 2 || logData.transactionType == 4) {
                logUserMoney.previousBalance = Number(logData.postBalance) + Number(logData.money); 
            } else if (logData.transactionType == 1) {
                logUserMoney.previousBalance = Number(logData.postBalance); 
                logUserMoney.postBalance = Number(logData.postBalance) + Number(logData.money); 
            } else {
                logUserMoney.previousBalance = Number(logData.postBalance) - Number(logData.money); 
            }
        }
        return await queryRunner.manager.save(logUserMoney);
    }

    async userMoneyLogUpdate(queryRunner: QueryRunner, updateMoneyLog: UpdateMoneyLog ) {
        let target = await this.LogUserMoneyRepository.findOne(
            {where:{ id: updateMoneyLog.logId },
            relations: ['toId']
        });
        target.status = updateMoneyLog.status

        if(updateMoneyLog.memo) {
            target.memo = updateMoneyLog.memo
        }
        return await queryRunner.manager.save(target);
    }

    async userPointLog(queryRunner: QueryRunner, logData: PointLog) {
        const logUserPoint = new LogUserPoint();

        logUserPoint.siteId = parseInt(process.env.SITE_ID);
        logUserPoint.fromId = logData.fromId;
        logUserPoint.toId = logData.toId;
        logUserPoint.point = logData.point;
        logUserPoint.postPoint = logData.postPoint;
        logUserPoint.type = logData.type;
        logUserPoint.transactionType = logData.transactionType;
        logUserPoint.description = LogUserPointMemo[`${logData.type}${logData.transactionType}`];
        if(logData.memo) logUserPoint.memo = logData.memo;

        // type - 1: 롤링, 2: 루징, 3: 기타
        // transactionType - 1: 에이전트 지급, 2: 에이전트 회수, 3: 포인트 전환
        if(logData.transactionType == 2 || logData.transactionType == 3) {
            logUserPoint.previousPoint = Number(logData.postPoint) + Number(logData.point);
        } else {
            logUserPoint.previousPoint = Number(logData.postPoint) - Number(logData.point);
        }
        return await queryRunner.manager.save(logUserPoint);
    }

    async siteMoneyLog(queryRunner: QueryRunner, logData: SiteMoneyLog) {
        const logSiteMoney = new LogSiteMoney();
        logSiteMoney.siteId = parseInt(process.env.SITE_ID);
        logSiteMoney.money = logData.money;
        logSiteMoney.postBalance = logData.postBalance; 
        logSiteMoney.type = logData.type;
        logSiteMoney.transactionType = logData.transactionType;
        if(logData.memo) logSiteMoney.memo = logData.memo;
        // type - 1: 플레이어, 2: 에이전트, 3: 시스템
        if(logSiteMoney.type == 1) {
            logSiteMoney.toUserId = logData.toUserId;
            if (logData.code) {
                logSiteMoney.description = LogUserMoneyDescription[logData.code]
            } else {
                logData.transactionType == 1
                ? logSiteMoney.description = LogUserMoneyDescription[11]
                : logSiteMoney.description = LogUserMoneyDescription[12]
            }
        } else if (logSiteMoney.type == 2) {
            logSiteMoney.toAdminId = logData.toAdminId;
            if (logData.code) {
                logSiteMoney.description = LogAdminMoneyDescription[logData.code]
            } else {
                logData.transactionType == 1
                ? logSiteMoney.description = LogAdminMoneyDescription[11]
                : logSiteMoney.description = LogAdminMoneyDescription[12]
            }
        } else {
            logSiteMoney.description = "시스템 지급"
        }

        // transactionType - 1: 사이트 지급, 2: 사이트 회수,
        if(logData.transactionType == 2) {
            logSiteMoney.previousBalance = Number(logData.postBalance) + Number(logData.money); 
        } else {
            logSiteMoney.previousBalance = Number(logData.postBalance); 
            logSiteMoney.postBalance = Number(logData.postBalance) + Number(logData.money); 
        }
        return await queryRunner.manager.save(logSiteMoney);
    }

    async userThirdpartyLog(queryRunner: QueryRunner, logData: ThirdpartyLog) {
        try {
            const logUserThirdparty = new LogUserThirdpartyMoney();

            logUserThirdparty.siteId = parseInt(process.env.SITE_ID);
            logUserThirdparty.userId = logData.userId;
            logUserThirdparty.providerThirdpartyId = logData.type == 1 ? logData.providerThirdpartyId : null;
            logUserThirdparty.providerThirdpartyGameName = logData.providerThirdpartyGameName;
            logUserThirdparty.userBalance = logData.userBalance;
            logUserThirdparty.providerBalance = logData.providerBalance;
            logUserThirdparty.totalBalance = logData.totalBalance;
            logUserThirdparty.type = logData.type;
            
            return await queryRunner.manager.save(logUserThirdparty);
        } catch (error) {
            throw error
        }
    }
}