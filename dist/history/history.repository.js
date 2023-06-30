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
exports.HistoryRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_repository_1 = require("../admin/admin.repository");
const log_tools_config_1 = require("../config/log.tools.config");
const log_admin_money_entity_1 = require("../log/entity/log-admin-money.entity");
const log_admin_point_entity_1 = require("../log/entity/log-admin-point.entity");
const log_site_money_entity_1 = require("../log/entity/log-site-money.entity");
const log_user_money_entity_1 = require("../log/entity/log-user-money.entity");
const log_user_point_entity_1 = require("../log/entity/log-user-point.entity");
const log_user_thirdparty_money_entity_1 = require("../log/entity/log-user-thirdparty-money.entity");
const user_repository_1 = require("../user/user.repository");
const typeorm_2 = require("typeorm");
let HistoryRepository = class HistoryRepository {
    constructor(logUserMoneyRepository, logUserPointRepository, logAdminMoneyRepository, logAdminPointRepository, logSiteMoneyRepository, logUserThirdpartyMoney, adminRepository, userRepository) {
        this.logUserMoneyRepository = logUserMoneyRepository;
        this.logUserPointRepository = logUserPointRepository;
        this.logAdminMoneyRepository = logAdminMoneyRepository;
        this.logAdminPointRepository = logAdminPointRepository;
        this.logSiteMoneyRepository = logSiteMoneyRepository;
        this.logUserThirdpartyMoney = logUserThirdpartyMoney;
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
    }
    async userMoneyTransaction(body, token) {
        let { limit, offset, searchValue, startDate, endDate } = body;
        let underIds = [];
        let userIds = [];
        startDate = (0, log_tools_config_1.dateFormat)(startDate);
        endDate = (0, log_tools_config_1.dateFormat)(endDate);
        const admins = await this.adminRepository.admins({}, token);
        admins[0].forEach((item, index) => {
            underIds = [...underIds, item["id"]];
        });
        const users = await this.userRepository.users({}, token);
        users[0].forEach((item, index) => {
            userIds = [...userIds, item["id"]];
        });
        const queryBuilder = this.logUserMoneyRepository.createQueryBuilder("logUserMoney")
            .leftJoinAndSelect('logUserMoney.fromId', "admin")
            .leftJoinAndSelect("logUserMoney.toId", "user")
            .where({ siteId: process.env.SITE_ID })
            .andWhere('logUserMoney.updatedAt BETWEEN :startDate AND :endDate', {
            startDate,
            endDate,
        })
            .orderBy('logUserMoney.updatedAt', 'DESC')
            .skip(offset)
            .take(limit);
        if (token.level > 1) {
            queryBuilder.andWhere(new typeorm_2.Brackets(qb => {
                qb.where('logUserMoney.fromId IN (:...underIds)', { underIds: [token.id, ...underIds] })
                    .orWhere('logUserMoney.toId IN (:...userIds)', { userIds: [...userIds] });
            }));
        }
        ;
        if (searchValue) {
            queryBuilder.andWhere(new typeorm_2.Brackets(qb => {
                qb.where("admin.identity LIKE :adminIdentity", { adminIdentity: `%${searchValue}%` })
                    .orWhere("user.nickname LIKE :nickname", { nickname: `%${searchValue}%` })
                    .orWhere("user.identity LIKE :userIdentity", { userIdentity: `%${searchValue}%` });
            }));
        }
        ;
        const userMoneyTransactionList = await queryBuilder.getManyAndCount();
        return userMoneyTransactionList;
    }
    async userPointTransaction(body, token) {
        let { limit, offset, searchValue, startDate, endDate } = body;
        let underIds = [];
        let userIds = [];
        startDate = (0, log_tools_config_1.dateFormat)(startDate);
        endDate = (0, log_tools_config_1.dateFormat)(endDate);
        const admins = await this.adminRepository.admins({}, token);
        admins[0].forEach((item, index) => {
            underIds = [...underIds, item["id"]];
        });
        const users = await this.userRepository.users({}, token);
        users[0].forEach((item, index) => {
            userIds = [...userIds, item["id"]];
        });
        const queryBuilder = this.logUserPointRepository.createQueryBuilder("logUserPoint")
            .leftJoinAndSelect('logUserPoint.fromId', "admin")
            .leftJoinAndSelect("logUserPoint.toId", "user")
            .where({ siteId: process.env.SITE_ID })
            .andWhere('logUserPoint.createdAt BETWEEN :startDate AND :endDate', {
            startDate,
            endDate,
        })
            .orderBy('logUserPoint.createdAt', 'DESC')
            .skip(offset)
            .take(limit);
        if (token.level > 1) {
            queryBuilder.andWhere(new typeorm_2.Brackets(qb => {
                qb.where('logUserPoint.fromId IN (:...underIds)', { underIds: [token.id, ...underIds] })
                    .orWhere('logUserPoint.toId IN (:...userIds)', { userIds: [...userIds] });
            }));
        }
        if (searchValue) {
            queryBuilder.andWhere(new typeorm_2.Brackets(qb => {
                qb.where("admin.identity LIKE :adminIdentity", { adminIdentity: `%${searchValue}%` })
                    .orWhere("user.nickname LIKE :nickname", { nickname: `%${searchValue}%` })
                    .orWhere("user.identity LIKE :userIdentity", { userIdentity: `%${searchValue}%` });
            }));
        }
        const userPointTransactionList = await queryBuilder.getManyAndCount();
        return userPointTransactionList;
    }
    async adminMoneyTransaction(body, token) {
        let { limit, offset, searchValue, startDate, endDate } = body;
        let underIds = [];
        let userIds = [];
        startDate = (0, log_tools_config_1.dateFormat)(startDate);
        endDate = (0, log_tools_config_1.dateFormat)(endDate);
        const admins = await this.adminRepository.admins({}, token);
        admins[0].forEach((item, index) => {
            underIds = [...underIds, item["id"]];
        });
        const users = await this.userRepository.users({}, token);
        users[0].forEach((item, index) => {
            userIds = [...userIds, item["id"]];
        });
        const queryBuilder = this.logAdminMoneyRepository.createQueryBuilder("logAdminMoney")
            .leftJoinAndSelect('logAdminMoney.fromId', "admin")
            .leftJoinAndSelect("logAdminMoney.toAdminId", "toAdmin")
            .leftJoinAndSelect("logAdminMoney.toUserId", "toUser")
            .where({ siteId: process.env.SITE_ID })
            .andWhere('logAdminMoney.createdAt BETWEEN :startDate AND :endDate', {
            startDate,
            endDate,
        })
            .orderBy('logAdminMoney.updatedAt', 'DESC')
            .skip(offset)
            .take(limit);
        if (token.level > 1) {
            queryBuilder.andWhere(new typeorm_2.Brackets(qb => {
                qb.where('logAdminMoney.fromId IN (:...fromId)', { fromId: [token.id, ...underIds] })
                    .orWhere('logAdminMoney.toAdminId IN (:...toAdminId)', { toAdminId: [token.id, ...underIds] })
                    .orWhere('logAdminMoney.toUserId IN (:...toUserId)', { toUserId: [...userIds] });
            }));
        }
        if (searchValue) {
            queryBuilder.andWhere(new typeorm_2.Brackets(qb => {
                qb.where("admin.identity LIKE :adminIdentity", { adminIdentity: `%${searchValue}%` })
                    .orWhere("toAdmin.identity LIKE :toIdentity", { toIdentity: `%${searchValue}%` })
                    .orWhere("toUser.identity LIKE :fromIdentity", { fromIdentity: `%${searchValue}%` });
            }));
        }
        const adminMoneyTransactionList = await queryBuilder.getManyAndCount();
        return adminMoneyTransactionList;
    }
    async adminPointTransaction(body, token) {
        let { limit, offset, searchValue, startDate, endDate } = body;
        let underIds = [];
        let userIds = [];
        startDate = (0, log_tools_config_1.dateFormat)(startDate);
        endDate = (0, log_tools_config_1.dateFormat)(endDate);
        const admins = await this.adminRepository.admins({}, token);
        admins[0].forEach((item, index) => {
            underIds = [...underIds, item["id"]];
        });
        const users = await this.userRepository.users({}, token);
        users[0].forEach((item, index) => {
            userIds = [...userIds, item["id"]];
        });
        const queryBuilder = this.logAdminPointRepository.createQueryBuilder("logAdminPoint")
            .leftJoinAndSelect('logAdminPoint.fromId', "admin")
            .leftJoinAndSelect("logAdminPoint.toAdminId", "toAdmin")
            .leftJoinAndSelect("logAdminPoint.toUserId", "toUser")
            .where({ siteId: process.env.SITE_ID })
            .andWhere('logAdminPoint.createdAt BETWEEN :startDate AND :endDate', {
            startDate,
            endDate,
        })
            .orderBy('logAdminPoint.createdAt', 'DESC')
            .skip(offset)
            .take(limit);
        if (token.level > 1) {
            queryBuilder.andWhere(new typeorm_2.Brackets(qb => {
                qb.where('logAdminPoint.fromId IN (:...fromId)', { fromId: [token.id, ...underIds] })
                    .orWhere('logAdminPoint.toAdminId IN (:...toAdminId)', { toAdminId: [token.id, ...underIds] })
                    .orWhere('logAdminPoint.toUserId IN (:...toUserId)', { toUserId: [...userIds] });
            }));
        }
        if (searchValue) {
            queryBuilder.andWhere(new typeorm_2.Brackets(qb => {
                qb.where("admin.identity LIKE :identity", { identity: `%${searchValue}%` })
                    .orWhere("toAdmin.identity LIKE :identity", { identity: `%${searchValue}%` })
                    .orWhere("toUser.identity LIKE :identity", { identity: `%${searchValue}%` });
            }));
        }
        const adminPointTransactionList = await queryBuilder.getManyAndCount();
        return adminPointTransactionList;
    }
    async siteMoneyTransaction(body) {
        let { limit, offset, searchValue, startDate, endDate } = body;
        startDate = (0, log_tools_config_1.dateFormat)(startDate);
        endDate = (0, log_tools_config_1.dateFormat)(endDate);
        const queryBuilder = this.logSiteMoneyRepository.createQueryBuilder("log_site_money")
            .leftJoinAndSelect("log_site_money.toAdminId", "admin")
            .leftJoinAndSelect("log_site_money.toUserId", "user")
            .where({ siteId: process.env.SITE_ID })
            .andWhere('log_site_money.createdAt BETWEEN :startDate AND :endDate', {
            startDate,
            endDate,
        })
            .orderBy('log_site_money.createdAt', 'DESC')
            .skip(offset)
            .take(limit);
        if (searchValue) {
            queryBuilder.andWhere(new typeorm_2.Brackets(qb => {
                qb.where("admin.identity LIKE :identity", { identity: `%${searchValue}%` })
                    .orWhere("user.identity LIKE :identity", { identity: `%${searchValue}%` });
            }));
        }
        const siteMoneyTransactionList = await queryBuilder.getManyAndCount();
        return siteMoneyTransactionList;
    }
    async userThirdpartyTransaction(body) {
        let { limit, offset, searchValue, startDate, endDate } = body;
        startDate = (0, log_tools_config_1.dateFormat)(startDate);
        endDate = (0, log_tools_config_1.dateFormat)(endDate);
        const queryBuilder = this.logUserThirdpartyMoney.createQueryBuilder("log_site_money")
            .leftJoinAndSelect("log_site_money.userId", "user")
            .leftJoinAndSelect("log_site_money.providerThirdpartyId", "provider")
            .where({ siteId: process.env.SITE_ID })
            .andWhere('log_site_money.createdAt BETWEEN :startDate AND :endDate', {
            startDate,
            endDate,
        })
            .orderBy('log_site_money.createdAt', 'DESC')
            .skip(offset)
            .take(limit);
        if (searchValue) {
            queryBuilder.andWhere(new typeorm_2.Brackets(qb => {
                qb.where("user.identity LIKE :identity", { identity: `%${searchValue}%` })
                    .orWhere("user.nickname LIKE :nickname", { nickname: `%${searchValue}%` })
                    .orWhere("provider.name LIKE :name", { name: `%${searchValue}%` });
            }));
        }
        const userThirdpartyList = await queryBuilder.getManyAndCount();
        return userThirdpartyList;
    }
};
HistoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(log_user_money_entity_1.LogUserMoney)),
    __param(1, (0, typeorm_1.InjectRepository)(log_user_point_entity_1.LogUserPoint)),
    __param(2, (0, typeorm_1.InjectRepository)(log_admin_money_entity_1.LogAdminMoney)),
    __param(3, (0, typeorm_1.InjectRepository)(log_admin_point_entity_1.LogAdminPoint)),
    __param(4, (0, typeorm_1.InjectRepository)(log_site_money_entity_1.LogSiteMoney)),
    __param(5, (0, typeorm_1.InjectRepository)(log_user_thirdparty_money_entity_1.LogUserThirdpartyMoney)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        admin_repository_1.AdminRepository,
        user_repository_1.UserRepository])
], HistoryRepository);
exports.HistoryRepository = HistoryRepository;
//# sourceMappingURL=history.repository.js.map