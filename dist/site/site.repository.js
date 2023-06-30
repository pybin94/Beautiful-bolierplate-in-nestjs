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
exports.SiteRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const site_entity_1 = require("./entity/site.entity");
const ip_blacklist_entity_1 = require("./entity/ip-blacklist.entity");
const ip_whitelist_entity_1 = require("./entity/ip-whitelist.entity");
const site_bonus_level_detail_entity_1 = require("./entity/site-bonus-level-detail.entity");
let SiteRepository = class SiteRepository {
    constructor(siteRepository, siteBonusLevelDetailRepository, blacklistRepository, whitelistRepository) {
        this.siteRepository = siteRepository;
        this.siteBonusLevelDetailRepository = siteBonusLevelDetailRepository;
        this.blacklistRepository = blacklistRepository;
        this.whitelistRepository = whitelistRepository;
    }
    ;
    async siteInfo(body) {
        const target = await this.siteRepository.findOne({ where: { id: parseInt(process.env.SITE_ID) } });
        return target;
    }
    async siteInfoUpdate(body) {
        await this.siteRepository.createQueryBuilder()
            .update(body)
            .where("id = :id", { id: parseInt(process.env.SITE_ID) })
            .execute();
    }
    async siteBonusLevel(body) {
        const target = await this.siteBonusLevelDetailRepository
            .createQueryBuilder("bonusLevelDetail")
            .where("bonusLevelDetail.siteId = :siteId", { siteId: parseInt(process.env.SITE_ID) })
            .orderBy('bonusLevelDetail.level', 'ASC')
            .getMany();
        return target;
    }
    async siteBonusLevelUpsert(body) {
        let foundbonusLevel = await this.siteBonusLevel(body);
        const siteBonusUpdate = this.siteBonusLevelDetailRepository;
        let bonusUserLevel = body["bonusUserLevel"];
        if (!foundbonusLevel[0]) {
            let value = [];
            bonusUserLevel.forEach(async (item, index) => {
                value = [...value, {
                        siteId: parseInt(process.env.SITE_ID),
                        level: index + 1,
                        dailyBonusLimit: item[0],
                        newDepositRate: item[1],
                        firstDepositRate: item[2],
                        everyDepositRate: item[3],
                        newBonusLimit: item[4],
                        firstBonusLimit: item[5],
                        everyBonusLimit: item[6],
                    }];
            });
            await siteBonusUpdate
                .createQueryBuilder()
                .insert()
                .into(site_bonus_level_detail_entity_1.SiteBonusLevelDetail)
                .values(value)
                .execute();
        }
        else {
            bonusUserLevel.forEach(async (item, index) => {
                await siteBonusUpdate
                    .createQueryBuilder()
                    .update(site_bonus_level_detail_entity_1.SiteBonusLevelDetail)
                    .set({
                    dailyBonusLimit: item[0],
                    newDepositRate: item[1],
                    firstDepositRate: item[2],
                    everyDepositRate: item[3],
                    newBonusLimit: item[4],
                    firstBonusLimit: item[5],
                    everyBonusLimit: item[6],
                })
                    .where("siteId = :siteId", { siteId: parseInt(process.env.SITE_ID) })
                    .andWhere("level = :level", { level: index + 1 })
                    .execute();
            });
        }
    }
    async sitePayment(queryRunner, paymentType, amount) {
        const target = await this.siteRepository.findOne({ where: { id: parseInt(process.env.SITE_ID) } });
        switch (paymentType) {
            case 0:
                target.balance = Number(target.balance) + amount;
                break;
            case 1:
                if (Number(target.balance) - amount < 0) {
                    throw "사이트 보유 금액이 부족합니다.";
                }
                target.balance = Number(target.balance) - amount;
                break;
        }
        return await queryRunner.manager.save(target);
    }
    async enabledWhitelist(body, token) {
        let { isEnabledWhitelist } = body;
        const enabledWhitelist = await this.siteRepository.findOne({ where: { id: parseInt(process.env.SITE_ID) } });
        enabledWhitelist.isEnabledWhitelist = isEnabledWhitelist;
        await this.siteRepository.save(enabledWhitelist);
        return;
    }
    async blacklist(body, token) {
        let { limit, offset } = body;
        const blacklist = await this.blacklistRepository.createQueryBuilder("blacklist")
            .where("blacklist.siteId = :siteId", { siteId: process.env.SITE_ID })
            .orderBy('blacklist.createdAt', 'DESC')
            .skip(offset)
            .take(limit)
            .getManyAndCount();
        return blacklist;
    }
    async blacklistInsert(body, token) {
        let { ip, memo } = body;
        const blacklistInsert = await this.blacklistRepository.createQueryBuilder()
            .insert()
            .values({
            siteId: parseInt(process.env.SITE_ID),
            ip,
            memo,
        })
            .execute();
        return blacklistInsert;
    }
    async blacklistDelete(body, token) {
        let { id } = body;
        const blacklistDelete = await this.blacklistRepository.createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute();
        return blacklistDelete;
    }
    async whitelist(body, token) {
        let { limit, offset } = body;
        const whitelist = await this.whitelistRepository.createQueryBuilder("whitelist")
            .where("whitelist.siteId = :siteId", { siteId: process.env.SITE_ID })
            .orderBy('whitelist.createdAt', 'DESC')
            .skip(offset)
            .take(limit)
            .getManyAndCount();
        return whitelist;
    }
    async whitelistInsert(body, token) {
        let { ip, memo } = body;
        const whitelistInsert = await this.whitelistRepository.createQueryBuilder()
            .insert()
            .values({
            siteId: parseInt(process.env.SITE_ID),
            ip,
            memo,
        })
            .execute();
        return whitelistInsert;
    }
    async whitelistDelete(body, token) {
        let { id } = body;
        const whitelistDelete = await this.whitelistRepository.createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute();
        return whitelistDelete;
    }
};
SiteRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(site_entity_1.Site)),
    __param(1, (0, typeorm_1.InjectRepository)(site_bonus_level_detail_entity_1.SiteBonusLevelDetail)),
    __param(2, (0, typeorm_1.InjectRepository)(ip_blacklist_entity_1.IpBlacklist)),
    __param(3, (0, typeorm_1.InjectRepository)(ip_whitelist_entity_1.IpWhitelist)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SiteRepository);
exports.SiteRepository = SiteRepository;
//# sourceMappingURL=site.repository.js.map