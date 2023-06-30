"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const log_admin_money_entity_1 = require("./entity/log-admin-money.entity");
const log_admin_point_entity_1 = require("./entity/log-admin-point.entity");
const log_user_money_entity_1 = require("./entity/log-user-money.entity");
const log_user_point_entity_1 = require("./entity/log-user-point.entity");
const log_model_1 = require("./log.model");
const typeorm_2 = require("@nestjs/typeorm");
const log_site_money_entity_1 = require("./entity/log-site-money.entity");
const log_user_thirdparty_money_entity_1 = require("./entity/log-user-thirdparty-money.entity");
let LogRepository = class LogRepository {
    constructor(LogUserMoneyRepository, LogAdminMoneyRepository) {
        this.LogUserMoneyRepository = LogUserMoneyRepository;
        this.LogAdminMoneyRepository = LogAdminMoneyRepository;
    }
    ;
    async adminMoneyLog(queryRunner, logData) {
        const logAdminMoney = new log_admin_money_entity_1.LogAdminMoney();
        logAdminMoney.siteId = parseInt(process.env.SITE_ID);
        logAdminMoney.fromId = logData.fromId;
        logAdminMoney.toAdminId = logData.toAdminId;
        logAdminMoney.toUserId = logData.toUserId;
        logAdminMoney.money = logData.money;
        logAdminMoney.postBalance = logData.postBalance;
        logAdminMoney.status = logData.status;
        logAdminMoney.transactionType = logData.transactionType;
        logAdminMoney.description = log_model_1.LogAdminMoneyDescription[`${logData.status}${logData.transactionType}`];
        if (logData.memo)
            logAdminMoney.memo = logData.memo;
        if (logData.postBalance == null) {
            logAdminMoney.previousBalance = logData.postBalance;
        }
        else {
            if (logData.transactionType == 2 || logData.transactionType == 4 || logData.transactionType == 5 || logData.transactionType == 7) {
                logAdminMoney.previousBalance = Number(logData.postBalance) + Number(logData.money);
            }
            else if (logData.transactionType == 1) {
                logAdminMoney.previousBalance = Number(logData.postBalance);
                logAdminMoney.postBalance = Number(logData.postBalance) + Number(logData.money);
            }
            else {
                logAdminMoney.previousBalance = Number(logData.postBalance) - Number(logData.money);
            }
        }
        return await queryRunner.manager.save(logAdminMoney);
    }
    async adminMoneyLogUpdate(queryRunner, updateMoneyLog) {
        let target = await this.LogAdminMoneyRepository.findOne({ where: { id: updateMoneyLog.logId },
            relations: ['toAdminId']
        });
        target.status = updateMoneyLog.status;
        if (updateMoneyLog.memo) {
            target.memo = updateMoneyLog.memo;
        }
        return await queryRunner.manager.save(target);
    }
    async adminPointLog(queryRunner, logData) {
        const logAdminPoint = new log_admin_point_entity_1.LogAdminPoint();
        logAdminPoint.siteId = parseInt(process.env.SITE_ID);
        logAdminPoint.fromId = logData.fromId;
        logAdminPoint.toAdminId = logData.toAdminId;
        logAdminPoint.toUserId = logData.toUserId;
        logAdminPoint.point = logData.point;
        logAdminPoint.postPoint = logData.postPoint;
        logAdminPoint.type = logData.type;
        logAdminPoint.transactionType = logData.transactionType;
        logAdminPoint.description = log_model_1.LogAdminPointMemo[`${logData.type}${logData.transactionType}`];
        if (logData.memo)
            logAdminPoint.memo = logData.memo;
        if (logData.transactionType == 2 || logData.transactionType == 3 || logData.transactionType == 5 || logData.transactionType == 7) {
            logAdminPoint.previousPoint = Number(logData.postPoint) + Number(logData.point);
        }
        else {
            logAdminPoint.previousPoint = Number(logData.postPoint) - Number(logData.point);
        }
        return await queryRunner.manager.save(logAdminPoint);
    }
    async userMoneyLog(queryRunner, logData) {
        const logUserMoney = new log_user_money_entity_1.LogUserMoney();
        logUserMoney.siteId = parseInt(process.env.SITE_ID);
        logUserMoney.fromId = logData.fromId;
        logUserMoney.toId = logData.toId;
        logUserMoney.money = logData.money;
        logUserMoney.postBalance = logData.postBalance;
        logUserMoney.status = logData.status;
        logUserMoney.transactionType = logData.transactionType;
        logUserMoney.description = log_model_1.LogUserMoneyDescription[`${logData.status}${logData.transactionType}`];
        if (logData.memo)
            logUserMoney.memo = logData.memo;
        if (logData.postBalance == null) {
            logUserMoney.previousBalance = logData.postBalance;
        }
        else {
            if (logData.transactionType == 2 || logData.transactionType == 4) {
                logUserMoney.previousBalance = Number(logData.postBalance) + Number(logData.money);
            }
            else if (logData.transactionType == 1) {
                logUserMoney.previousBalance = Number(logData.postBalance);
                logUserMoney.postBalance = Number(logData.postBalance) + Number(logData.money);
            }
            else {
                logUserMoney.previousBalance = Number(logData.postBalance) - Number(logData.money);
            }
        }
        return await queryRunner.manager.save(logUserMoney);
    }
    async userMoneyLogUpdate(queryRunner, updateMoneyLog) {
        let target = await this.LogUserMoneyRepository.findOne({ where: { id: updateMoneyLog.logId },
            relations: ['toId']
        });
        target.status = updateMoneyLog.status;
        if (updateMoneyLog.memo) {
            target.memo = updateMoneyLog.memo;
        }
        return await queryRunner.manager.save(target);
    }
    async userPointLog(queryRunner, logData) {
        const logUserPoint = new log_user_point_entity_1.LogUserPoint();
        logUserPoint.siteId = parseInt(process.env.SITE_ID);
        logUserPoint.fromId = logData.fromId;
        logUserPoint.toId = logData.toId;
        logUserPoint.point = logData.point;
        logUserPoint.postPoint = logData.postPoint;
        logUserPoint.type = logData.type;
        logUserPoint.transactionType = logData.transactionType;
        logUserPoint.description = log_model_1.LogUserPointMemo[`${logData.type}${logData.transactionType}`];
        if (logData.memo)
            logUserPoint.memo = logData.memo;
        if (logData.transactionType == 2 || logData.transactionType == 3) {
            logUserPoint.previousPoint = Number(logData.postPoint) + Number(logData.point);
        }
        else {
            logUserPoint.previousPoint = Number(logData.postPoint) - Number(logData.point);
        }
        return await queryRunner.manager.save(logUserPoint);
    }
    async siteMoneyLog(queryRunner, logData) {
        const logSiteMoney = new log_site_money_entity_1.LogSiteMoney();
        logSiteMoney.siteId = parseInt(process.env.SITE_ID);
        logSiteMoney.money = logData.money;
        logSiteMoney.postBalance = logData.postBalance;
        logSiteMoney.type = logData.type;
        logSiteMoney.transactionType = logData.transactionType;
        if (logData.memo)
            logSiteMoney.memo = logData.memo;
        if (logSiteMoney.type == 1) {
            logSiteMoney.toUserId = logData.toUserId;
            if (logData.code) {
                logSiteMoney.description = log_model_1.LogUserMoneyDescription[logData.code];
            }
            else {
                logData.transactionType == 1
                    ? logSiteMoney.description = log_model_1.LogUserMoneyDescription[11]
                    : logSiteMoney.description = log_model_1.LogUserMoneyDescription[12];
            }
        }
        else if (logSiteMoney.type == 2) {
            logSiteMoney.toAdminId = logData.toAdminId;
            if (logData.code) {
                logSiteMoney.description = log_model_1.LogAdminMoneyDescription[logData.code];
            }
            else {
                logData.transactionType == 1
                    ? logSiteMoney.description = log_model_1.LogAdminMoneyDescription[11]
                    : logSiteMoney.description = log_model_1.LogAdminMoneyDescription[12];
            }
        }
        else {
            logSiteMoney.description = "시스템 지급";
        }
        if (logData.transactionType == 2) {
            logSiteMoney.previousBalance = Number(logData.postBalance) + Number(logData.money);
        }
        else {
            logSiteMoney.previousBalance = Number(logData.postBalance);
            logSiteMoney.postBalance = Number(logData.postBalance) + Number(logData.money);
        }
        return await queryRunner.manager.save(logSiteMoney);
    }
    async userThirdpartyLog(queryRunner, logData) {
        try {
            const logUserThirdparty = new log_user_thirdparty_money_entity_1.LogUserThirdpartyMoney();
            logUserThirdparty.siteId = parseInt(process.env.SITE_ID);
            logUserThirdparty.userId = logData.userId;
            logUserThirdparty.providerThirdpartyId = logData.type == 1 ? logData.providerThirdpartyId : null;
            logUserThirdparty.providerThirdpartyGameName = logData.providerThirdpartyGameName;
            logUserThirdparty.userBalance = logData.userBalance;
            logUserThirdparty.providerBalance = logData.providerBalance;
            logUserThirdparty.totalBalance = logData.totalBalance;
            logUserThirdparty.type = logData.type;
            return await queryRunner.manager.save(logUserThirdparty);
        }
        catch (error) {
            throw error;
        }
    }
};
LogRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(log_user_money_entity_1.LogUserMoney)),
    __param(1, (0, typeorm_2.InjectRepository)(log_admin_money_entity_1.LogAdminMoney)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], LogRepository);
exports.LogRepository = LogRepository;
//# sourceMappingURL=log.repository.js.map