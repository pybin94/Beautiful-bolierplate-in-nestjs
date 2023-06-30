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
exports.AdminRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const admin_entity_1 = require("./entity/admin.entity");
const admin_commission_rate_entity_1 = require("./entity/admin-commission-rate.entity");
const log_admin_money_entity_1 = require("../log/entity/log-admin-money.entity");
const site_entity_1 = require("../site/entity/site.entity");
const tools_config_1 = require("../config/tools.config");
let AdminRepository = class AdminRepository {
    constructor(adminRepository, siteRepository, adminTreeRepository, adminCommissionRateRepository, logAdminMoneyRepository) {
        this.adminRepository = adminRepository;
        this.siteRepository = siteRepository;
        this.adminTreeRepository = adminTreeRepository;
        this.adminCommissionRateRepository = adminCommissionRateRepository;
        this.logAdminMoneyRepository = logAdminMoneyRepository;
        this.adminlist = [];
        this.adminTopList = [];
    }
    ;
    async admin(body, token) {
        const admins = await this.adminRepository.createQueryBuilder("admin")
            .leftJoinAndSelect('admin.adminCommissionRate', 'admin_commission_rate', 'admin.id = admin_commission_rate.adminId')
            .where({ siteId: parseInt(process.env.SITE_ID) })
            .andWhere({ id: body.id ? body.id : token.id })
            .getOne();
        return admins;
    }
    ;
    async adminTree(body, token) {
        const treeRepository = this.adminTreeRepository;
        const rootNode = await treeRepository.createQueryBuilder("admin")
            .leftJoinAndSelect('admin.adminCommissionRate', 'admin_commission_rate', 'admin.id = admin_commission_rate.adminId')
            .where("admin.id = :id", { id: token.id })
            .getOne();
        const tree = await this.createTreeStructure(rootNode, treeRepository);
        return tree;
    }
    ;
    async createTreeStructure(node, repository) {
        const children = await repository.createQueryBuilder("admin")
            .leftJoinAndSelect('admin.adminCommissionRate', 'admin_commission_rate', 'admin.id = admin_commission_rate.adminId')
            .leftJoinAndSelect('admin.topId', "adminTop")
            .leftJoinAndSelect('adminTop.adminCommissionRate', 'adminTop_commission_rate', 'adminTop.id = adminTop_commission_rate.adminId')
            .where("admin.topId = :id", { id: node.id })
            .getMany();
        if (children.length === 0) {
            return node;
        }
        ;
        const childNodes = await Promise.all(children.map((child) => this.createTreeStructure(child, repository)));
        node.children = childNodes;
        return node;
    }
    ;
    async duplicateCheck(body, checkColumn) {
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
        const duplicateCheck = await this.adminRepository.createQueryBuilder()
            .select('COUNT(*)', 'count')
            .where('admin.site_id = :siteId', { siteId: parseInt(process.env.SITE_ID) })
            .andWhere(setWhere)
            .getRawOne();
        return duplicateCheck;
    }
    ;
    async createAdmin(body, queryRunner) {
        const admin = this.adminRepository.create(body);
        const adminSave = await queryRunner.manager.save(admin);
        return adminSave;
    }
    ;
    async createAdminCommitionRate(body, queryRunner) {
        const adminCommissionRate = this.adminCommissionRateRepository.create(body);
        await queryRunner.manager.save(adminCommissionRate);
    }
    ;
    async admins(body, token) {
        let { limit, offset, searchValue, level } = body;
        const max = limit * (offset / limit + 1);
        const min = (limit * (offset / limit + 1)) - limit;
        const treeRepository = this.adminRepository;
        const rootNode = await treeRepository.findOne({ where: { id: token.id } });
        this.adminlist = [];
        let admins = await this.adminStructure(rootNode, treeRepository);
        let adminArray = admins.sort((0, tools_config_1.arrayOrder)("createdAt"));
        let adminLength;
        if (searchValue) {
            adminArray.forEach((item, index) => {
                if (index == 0)
                    adminArray = [];
                if (item.topId.identity.indexOf(searchValue) > -1) {
                    adminArray = [...adminArray, item];
                }
                ;
                if (item.identity.indexOf(searchValue) > -1) {
                    adminArray = [...adminArray, item];
                }
                ;
                if (item.nickname.indexOf(searchValue) > -1) {
                    adminArray = [...adminArray, item];
                }
                ;
            });
        }
        if (level) {
            admins.forEach((item, index) => {
                if (index == 0)
                    adminArray = [];
                if (item["level"] == level) {
                    adminArray = [...adminArray, item];
                }
                ;
            });
        }
        if (limit) {
            adminLength = adminArray.length;
            adminArray.forEach((item, index) => {
                if (index == 0)
                    adminArray = [];
                if (index >= min && index < max) {
                    adminArray = [...adminArray, item];
                }
                ;
            });
        }
        ;
        admins = [adminArray, adminLength];
        return admins;
    }
    ;
    async adminStructure(node, repository) {
        const children = await repository.createQueryBuilder("admin")
            .leftJoinAndSelect('admin.adminCommissionRate', 'admin_commission_rate', 'admin.id = admin_commission_rate.adminId')
            .leftJoinAndSelect('admin.topId', "adminTop")
            .leftJoinAndSelect('adminTop.adminCommissionRate', 'adminTop_commission_rate', 'adminTop.id = adminTop_commission_rate.adminId')
            .where("admin.topId = :id", { id: node.id })
            .getMany();
        if (children.length === 0) {
            return this.adminlist;
        }
        await Promise.all(children.map((child) => this.adminStructure(child, repository)));
        this.adminlist = [...this.adminlist, ...children];
        return this.adminlist;
    }
    ;
    async updateAdmin(body) {
        let { id, bank, accountHolder, accountNumber, phoneNumber, memo, casinoRollingRate, casinoLosingRate, casinoOmittingRate, slotRollingRate, slotLosingRate, slotOmittingRate, minigameRollingRate, minigameLosingRate, minigameOmittingRate } = body;
        await this.adminRepository.createQueryBuilder("user")
            .update()
            .set({ bank, accountHolder, accountNumber, phoneNumber, memo })
            .where({ id })
            .execute();
        await this.adminCommissionRateRepository.createQueryBuilder()
            .update()
            .set({ casinoRollingRate, casinoLosingRate, casinoOmittingRate, slotRollingRate, slotLosingRate, slotOmittingRate, minigameRollingRate, minigameLosingRate, minigameOmittingRate })
            .where({ adminId: id })
            .execute();
    }
    ;
    async updateAdminPassword(body, token) {
        let { id, password, passwordConfirm } = body;
        if (password !== passwordConfirm)
            throw "비밀번호가 일치하지 않습니다.";
        if (!id)
            id = token.id;
        const updateAdmin = await this.adminRepository.createQueryBuilder("user")
            .update()
            .set({ password })
            .where("id = :id", { id })
            .execute();
        return updateAdmin;
    }
    ;
    async deleteAdmin(body) {
        let { id } = body;
        const deleteAdmin = await this.adminRepository.createQueryBuilder("user")
            .softDelete()
            .where("id = :id", { id })
            .execute();
        return deleteAdmin;
    }
    ;
    async adminTop(body) {
        let { id } = body;
        this.adminTopList = [];
        const adminTop = await this.admiTopnStructure(id);
        return adminTop;
    }
    async admiTopnStructure(id) {
        const topNode = await this.adminRepository.createQueryBuilder("admin")
            .leftJoinAndSelect('admin.topId', "adminTop")
            .where("admin.id = :id", { id })
            .getOne();
        if (topNode.topId) {
            this.adminTopList = [...this.adminTopList, topNode];
            return this.admiTopnStructure(topNode["topId"]["id"]);
        }
        return this.adminTopList;
    }
    async adminTransaction(queryRunner, transactionData) {
        let target;
        switch (transactionData.status) {
            case 0:
                if (transactionData.paymentType == 1) {
                    target = await this.logAdminMoneyRepository.findOne({ where: { id: transactionData.logId } });
                    target.status = transactionData.status;
                }
                else if (transactionData.paymentType == 2) {
                    target = await this.adminRepository.findOne({ where: { id: transactionData.targetId } });
                    target.balance = Number(target.balance) + Number(transactionData["amount"]);
                }
                break;
            case 1:
                target = await this.adminRepository.findOne({ where: { id: transactionData.targetId } });
                if (transactionData.paymentType == 2) {
                    target = await this.adminRepository.findOne({ where: { id: transactionData.targetId } });
                    if (Number(target.balance) - Number(transactionData.amount) < 0) {
                        throw "보유 금액이 부족합니다.";
                    }
                    target.balance = Number(target.balance) - Number(transactionData.amount);
                }
                break;
            case 2:
                target = await this.logAdminMoneyRepository.findOne({ where: { id: transactionData.logId } });
                target.status = transactionData.status;
                break;
            case 3:
                if (transactionData.paymentType == 1) {
                    target = await this.adminRepository.findOne({ where: { id: transactionData.targetId } });
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
    async adminPayment(queryRunner, paymentType, targetId, amount) {
        const target = await this.adminRepository.findOne({ where: { id: targetId } });
        switch (paymentType) {
            case 0:
                target.balance = Number(target.balance) + Number(amount);
                break;
            case 1:
                if (Number(target.balance) - Number(amount) < 0) {
                    throw "지급 또는 회수할 금액이 부족합니다.";
                }
                target.balance = Number(target.balance) - Number(amount);
                break;
            case 2:
                target.point = Number(target.point) + Number(amount);
                break;
            case 3:
                if (Number(target.point) - Number(amount) < 0) {
                    throw "지급 또는 회수할 포인트가 부족합니다.";
                }
                target.point = Number(target.point) - Number(amount);
                break;
            case 4:
                if (Number(target.point) - Number(amount) < 0) {
                    throw "전환할 포인트가 부족합니다.";
                }
                target.balance = Number(target.balance) + Number(amount);
                target.point = Number(target.point) - Number(amount);
                break;
        }
        return await queryRunner.manager.save(target);
    }
};
AdminRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __param(1, (0, typeorm_1.InjectRepository)(site_entity_1.Site)),
    __param(2, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __param(3, (0, typeorm_1.InjectRepository)(admin_commission_rate_entity_1.AdminCommissionRate)),
    __param(4, (0, typeorm_1.InjectRepository)(log_admin_money_entity_1.LogAdminMoney)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.TreeRepository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminRepository);
exports.AdminRepository = AdminRepository;
//# sourceMappingURL=admin.repository.js.map