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
exports.UserRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const user_commission_rate_entity_1 = require("./entity/user-commission-rate.entity");
const log_user_money_entity_1 = require("../log/entity/log-user-money.entity");
const site_entity_1 = require("../site/entity/site.entity");
const admin_repository_1 = require("../admin/admin.repository");
let UserRepository = class UserRepository {
    constructor(userRepository, siteRepository, userCommissionRateRepository, logUserMoneyRepository, adminRepository) {
        this.userRepository = userRepository;
        this.siteRepository = siteRepository;
        this.userCommissionRateRepository = userCommissionRateRepository;
        this.logUserMoneyRepository = logUserMoneyRepository;
        this.adminRepository = adminRepository;
    }
    ;
    async duplicateCheck(body, siteId, checkColumn) {
        let setWhere;
        if (checkColumn == "identity" && body[checkColumn]) {
            setWhere = { identity: body[checkColumn] };
        }
        else if (checkColumn == "code" && body[checkColumn]) {
            setWhere = { code: body[checkColumn] };
        }
        else {
            return { count: 1 };
        }
        const duplicateCheck = await this.userRepository.createQueryBuilder()
            .select('COUNT(*)', 'count')
            .where('user.site_id = :siteId', { siteId })
            .andWhere(setWhere)
            .getRawOne();
        return duplicateCheck;
    }
    async createUser(body, queryRunner) {
        const user = this.userRepository.create(body);
        const userSave = await queryRunner.manager.save(user);
        return userSave;
    }
    async createUserCommitionRate(body, queryRunner) {
        const userCommissionRate = this.userCommissionRateRepository.create(body);
        await queryRunner.manager.save(userCommissionRate);
    }
    async users(body, token) {
        let { limit, offset, searchValue, status } = body;
        let users;
        let topIds = [];
        const admins = await this.adminRepository.admins({}, token);
        admins[0].forEach((item, index) => {
            topIds = [...topIds, item["id"]];
        });
        if (!limit) {
            limit = 0;
            offset = 0;
        }
        const queryBuilder = this.userRepository.createQueryBuilder("user")
            .leftJoinAndSelect('user.topId', "admin")
            .leftJoinAndSelect('user.userCommissionRate', 'user_commission_rate', 'user.id = user_commission_rate.userId')
            .leftJoinAndSelect('admin.adminCommissionRate', 'admin_commission_rate', 'admin.id = admin_commission_rate.adminId')
            .where('user.top_id IN (:...ids)', { ids: [token.id, ...topIds] })
            .orderBy('user.createdAt', 'DESC')
            .skip(offset)
            .take(limit);
        if (status == true) {
            queryBuilder.andWhere('user.status <> 0');
        }
        else if (!status) {
            queryBuilder.andWhere('user.status = 0');
        }
        else {
            queryBuilder.andWhere('user.status = :status', { status });
        }
        if (searchValue) {
            queryBuilder.andWhere(new typeorm_2.Brackets(qb => {
                qb.where("user.identity LIKE :identity", { identity: `%${searchValue}%` })
                    .orWhere("user.nickname LIKE :nickname", { nickname: `%${searchValue}%` })
                    .orWhere("admin.identity LIKE :identity", { identity: `%${searchValue}%` });
            }));
        }
        users = await queryBuilder.getManyAndCount();
        return users;
    }
    async updateUser(body) {
        let { id, bank, accountHolder, accountNumber, phoneNumber, bonusLevel, bettingLimitLevel, status, memo, casinoRollingRate, casinoLosingRate, slotRollingRate, slotLosingRate, minigameRollingRate, minigameLosingRate } = body;
        const queryBuilder = this.userRepository.createQueryBuilder("user")
            .update()
            .set({ bank, accountHolder, accountNumber, phoneNumber, bonusLevel, bettingLimitLevel, memo })
            .where("user.id = :id", { id });
        if (status !== undefined) {
            queryBuilder.set({ status });
        }
        await queryBuilder.execute();
        await this.userCommissionRateRepository.createQueryBuilder()
            .update()
            .set({ casinoRollingRate, casinoLosingRate, slotRollingRate, slotLosingRate, minigameRollingRate, minigameLosingRate })
            .where({ userId: id })
            .execute();
    }
    async updateUserPassword(body) {
        let { id, password, passwordConfirm } = body;
        if (password !== passwordConfirm) {
            throw "비밀번호가 일치하지 않습니다.";
        }
        const updateUser = await this.userRepository.createQueryBuilder("user")
            .update()
            .set({ password })
            .where("id = :id", { id })
            .execute();
        return updateUser;
    }
    async deleteUser(body) {
        let { id } = body;
        const deleteUser = await this.userRepository.createQueryBuilder("user")
            .softDelete()
            .where("id = :id", { id })
            .execute();
        return deleteUser;
    }
    async userTransaction(queryRunner, transactionData) {
        let target;
        switch (transactionData.status) {
            case 0:
                if (transactionData.paymentType == 1) {
                    target = await this.logUserMoneyRepository.findOne({ where: { id: transactionData.logId } });
                    target.status = transactionData.status;
                }
                else if (transactionData.paymentType == 2) {
                    target = await this.userRepository.findOne({ where: { id: transactionData.targetId } });
                    target.balance = Number(target.balance) + Number(transactionData["amount"]);
                }
                break;
            case 1:
                if (transactionData.paymentType == 2) {
                    target = await this.userRepository.findOne({ where: { id: transactionData.targetId } });
                    if (Number(target.balance) - Number(transactionData.amount) < 0) {
                        throw "보유 금액이 부족합니다.";
                    }
                    target.balance = Number(target.balance) - Number(transactionData.amount);
                }
                break;
            case 2:
                target = await this.logUserMoneyRepository.findOne({ where: { id: transactionData.logId } });
                target.status = transactionData.status;
                break;
            case 3:
                if (transactionData.paymentType == 1) {
                    target = await this.userRepository.findOne({ where: { id: transactionData.targetId } });
                    target.balance = Number(target.balance) + Number(transactionData["amount"]);
                }
                else if (transactionData.paymentType == 2) {
                    target = await this.siteRepository.findOne({ where: { id: parseInt(process.env.SITE_ID) } });
                    target.balance = Number(target.balance) + Number(transactionData["amount"]);
                }
                break;
        }
        if (target) {
            return await queryRunner.manager.save(target);
        }
        else {
            return [];
        }
    }
    async userPayment(queryRunner, paymentType, targetId, amount) {
        const target = await this.userRepository.findOne({ where: { id: targetId }, relations: ['topId'] });
        let beforeBalance = target["balance"];
        switch (paymentType) {
            case 0:
                target.balance = Number(target.balance) + amount;
                break;
            case 1:
                if (Number(target.balance) - amount < 0) {
                    throw "지급 또는 회수할 금액이 부족합니다.";
                }
                target.balance = Number(target.balance) - amount;
                break;
            case 2:
                target.point = Number(target.point) + amount;
                break;
            case 3:
                if (Number(target.point) - amount < 0) {
                    throw "지급 또는 회수할 포인트가 부족합니다.";
                }
                target.point = Number(target.point) - amount;
                break;
        }
        let user = await queryRunner.manager.save(target);
        return { user, beforeBalance };
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(site_entity_1.Site)),
    __param(2, (0, typeorm_1.InjectRepository)(user_commission_rate_entity_1.UserCommissionRate)),
    __param(3, (0, typeorm_1.InjectRepository)(log_user_money_entity_1.LogUserMoney)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        admin_repository_1.AdminRepository])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map