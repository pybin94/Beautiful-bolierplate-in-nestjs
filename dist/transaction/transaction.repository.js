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
exports.TransactionRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const log_tools_config_1 = require("../config/log.tools.config");
const log_admin_money_entity_1 = require("../log/entity/log-admin-money.entity");
const log_user_money_entity_1 = require("../log/entity/log-user-money.entity");
const typeorm_2 = require("typeorm");
let TransactionRepository = class TransactionRepository {
    constructor(logUserMoneyRepository, logAdminMoneyRepository) {
        this.logUserMoneyRepository = logUserMoneyRepository;
        this.logAdminMoneyRepository = logAdminMoneyRepository;
    }
    ;
    async userTransaction(body, transactionType) {
        let { limit, offset } = body;
        const selectAdminTransaction = await this.logUserMoneyRepository.createQueryBuilder("logUserMoney")
            .leftJoinAndSelect("logUserMoney.toId", "user")
            .leftJoinAndSelect("user.topId", "topId")
            .where({ siteId: process.env.SITE_ID })
            .andWhere(new typeorm_2.Brackets(qb => {
            qb.where("logUserMoney.status = :status1", { status1: 1 })
                .orWhere("logUserMoney.status = :status2", { status2: 2 });
        }))
            .andWhere({ transactionType })
            .orderBy('logUserMoney.id', 'DESC')
            .skip(offset)
            .take(limit)
            .getManyAndCount();
        return selectAdminTransaction;
    }
    async userTransactionHistory(body) {
        let { limit, offset, searchValue, startDate, endDate } = body;
        startDate = (0, log_tools_config_1.dateFormat)(startDate);
        endDate = (0, log_tools_config_1.dateFormat)(endDate);
        const queryBuilder = this.logUserMoneyRepository.createQueryBuilder("logUserMoney")
            .leftJoinAndSelect("logUserMoney.toId", "user")
            .leftJoinAndSelect("user.topId", "topId")
            .where({ siteId: process.env.SITE_ID })
            .andWhere('logUserMoney.updatedAt BETWEEN :startDate AND :endDate', {
            startDate,
            endDate,
        })
            .andWhere(new typeorm_2.Brackets(qb => {
            qb.where("logUserMoney.status = :status1", { status1: 0 })
                .orWhere("logUserMoney.status = :status2", { status2: 3 });
        }))
            .andWhere(new typeorm_2.Brackets(qb => {
            qb.where("logUserMoney.transactionType = :transactionType1", { transactionType1: 1 })
                .orWhere("logUserMoney.transactionType = :transactionType2", { transactionType2: 2 });
        }))
            .orderBy('logUserMoney.updatedAt', 'DESC')
            .skip(offset)
            .take(limit);
        if (searchValue) {
            queryBuilder.andWhere(new typeorm_2.Brackets(qb => {
                qb.where("user.identity LIKE :identity", { identity: `%${searchValue}%` })
                    .orWhere("user.nickname LIKE :nickname", { nickname: `%${searchValue}%` });
            }));
        }
        const selectAdminTransactionHistory = await queryBuilder.getManyAndCount();
        return selectAdminTransactionHistory;
    }
    async adminTransaction(body, transactionType) {
        let { limit, offset } = body;
        const selectAdminTransaction = await this.logAdminMoneyRepository.createQueryBuilder("logAdminMoney")
            .leftJoinAndSelect('logAdminMoney.fromId', "admin")
            .leftJoinAndSelect("admin.topId", "topId")
            .where({ siteId: process.env.SITE_ID })
            .andWhere(new typeorm_2.Brackets(qb => {
            qb.where("logAdminMoney.status = :status1", { status1: 1 })
                .orWhere("logAdminMoney.status = :status2", { status2: 2 });
        }))
            .andWhere({ transactionType })
            .orderBy('logAdminMoney.id', 'DESC')
            .skip(offset)
            .take(limit)
            .getManyAndCount();
        return selectAdminTransaction;
    }
    async adminTransactionHistory(body) {
        let { limit, offset, searchValue, startDate, endDate } = body;
        startDate = (0, log_tools_config_1.dateFormat)(startDate);
        endDate = (0, log_tools_config_1.dateFormat)(endDate);
        const queryBuilder = this.logAdminMoneyRepository.createQueryBuilder("logAdminMoney")
            .leftJoinAndSelect('logAdminMoney.fromId', "admin")
            .leftJoinAndSelect("admin.topId", "topId")
            .where({ siteId: process.env.SITE_ID })
            .andWhere('logAdminMoney.updatedAt BETWEEN :startDate AND :endDate', {
            startDate,
            endDate,
        })
            .andWhere(new typeorm_2.Brackets(qb => {
            qb.where("logAdminMoney.status = :status1", { status1: 0 })
                .orWhere("logAdminMoney.status = :status2", { status2: 3 });
        }))
            .andWhere(new typeorm_2.Brackets(qb => {
            qb.where("logAdminMoney.transactionType = :transactionType1", { transactionType1: 1 })
                .orWhere("logAdminMoney.transactionType = :transactionType2", { transactionType2: 2 });
        }))
            .orderBy('logAdminMoney.updatedAt', 'DESC')
            .skip(offset)
            .take(limit);
        if (searchValue) {
            queryBuilder.andWhere(new typeorm_2.Brackets(qb => {
                qb.where("admin.identity LIKE :identity", { identity: `%${searchValue}%` })
                    .orWhere("admin.nickname LIKE :nickname", { nickname: `%${searchValue}%` });
            }));
        }
        const selectAdminTransactionHistory = await queryBuilder.getManyAndCount();
        return selectAdminTransactionHistory;
    }
    async userTransactionAlert(body, transactionType) {
        const selectAdminTransactionAlert = await this.logUserMoneyRepository.createQueryBuilder("logUserMoney")
            .leftJoinAndSelect('logUserMoney.fromId', "admin")
            .leftJoinAndSelect("logUserMoney.toId", "user")
            .where({ siteId: process.env.SITE_ID })
            .andWhere({ status: 1 })
            .andWhere({ transactionType })
            .getOne();
        return selectAdminTransactionAlert;
    }
    async adminTransactionAlert(body, transactionType) {
        const selectAdminTransactionAlert = await this.logAdminMoneyRepository.createQueryBuilder("logAdminMoney")
            .leftJoinAndSelect('logAdminMoney.fromId', "admin")
            .leftJoinAndSelect("logAdminMoney.toAdminId", "toAdmin")
            .leftJoinAndSelect("logAdminMoney.toUserId", "toUser")
            .where({ siteId: process.env.SITE_ID })
            .andWhere({ status: 1 })
            .andWhere({ transactionType })
            .getOne();
        return selectAdminTransactionAlert;
    }
};
TransactionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(log_user_money_entity_1.LogUserMoney)),
    __param(1, (0, typeorm_1.InjectRepository)(log_admin_money_entity_1.LogAdminMoney)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TransactionRepository);
exports.TransactionRepository = TransactionRepository;
//# sourceMappingURL=transaction.repository.js.map