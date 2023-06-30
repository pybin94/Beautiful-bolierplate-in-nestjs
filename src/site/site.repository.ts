import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { QueryRunner, Repository } from "typeorm";
import { Site } from './entity/site.entity';
import { IpBlacklist } from './entity/ip-blacklist.entity';
import { IpWhitelist } from './entity/ip-whitelist.entity';
import { SiteBonusLevelDetail } from './entity/site-bonus-level-detail.entity';

@Injectable()
export class SiteRepository {
    constructor(
        @InjectRepository(Site)
        private readonly siteRepository: Repository<Site>,

        @InjectRepository(SiteBonusLevelDetail)
        private readonly siteBonusLevelDetailRepository: Repository<SiteBonusLevelDetail>,

        @InjectRepository(IpBlacklist)
        private readonly blacklistRepository: Repository<IpBlacklist>,

        @InjectRepository(IpWhitelist)
        private readonly whitelistRepository: Repository<IpWhitelist>,
    ) {};

    async siteInfo(body: any): Promise<object> {
        const target = await this.siteRepository.findOne({where:{ id: parseInt(process.env.SITE_ID) }});
        return target;
    }

    async siteInfoUpdate(body: any): Promise<void> {
        await this.siteRepository.createQueryBuilder()
            .update(body)
            .where("id = :id", { id: parseInt(process.env.SITE_ID) })
            .execute()
    }

    async siteBonusLevel(body: any): Promise<object> {
        const target = await this.siteBonusLevelDetailRepository
            .createQueryBuilder("bonusLevelDetail")
            .where("bonusLevelDetail.siteId = :siteId",{siteId: parseInt(process.env.SITE_ID)})
            .orderBy('bonusLevelDetail.level', 'ASC')
            .getMany();

        return target;
    }

    async siteBonusLevelUpsert(body: any): Promise<void> {

        let foundbonusLevel = await this.siteBonusLevel(body);
        const siteBonusUpdate = this.siteBonusLevelDetailRepository
        let bonusUserLevel = body["bonusUserLevel"]
        if(!foundbonusLevel[0]) {
            let value = [];
            bonusUserLevel.forEach(async ( item: object, index: number) => {

                value = [ ...value, { 
                    siteId: parseInt(process.env.SITE_ID),
                    level: index+1,
                    dailyBonusLimit: item[0],
                    newDepositRate: item[1],
                    firstDepositRate: item[2],
                    everyDepositRate: item[3],
                    newBonusLimit: item[4],
                    firstBonusLimit: item[5],
                    everyBonusLimit: item[6],
                }];
            })
            await siteBonusUpdate
                .createQueryBuilder()
                .insert()
                .into(SiteBonusLevelDetail)
                .values(value)
                .execute();

        } else {

            bonusUserLevel.forEach(async ( item: object, index: number)=>{
                await siteBonusUpdate
                .createQueryBuilder()
                .update(SiteBonusLevelDetail)
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
                .andWhere("level = :level", { level: index+1 })
                .execute();
            })
        }
    }

    async sitePayment(queryRunner: QueryRunner, paymentType: number, amount: number): Promise<object> {
        const target = await this.siteRepository.findOne({where:{ id: parseInt(process.env.SITE_ID) }});
        switch (paymentType) {
            case 0: // 머니 증가
                target.balance = Number(target.balance) + amount
                break;
            case 1: // 머니 차감
                if (Number(target.balance) - amount < 0) {
                    throw "사이트 보유 금액이 부족합니다.";
                }
                target.balance = Number(target.balance) - amount
                break;
        }
        return await queryRunner.manager.save(target);
    }

    async enabledWhitelist(body: any, token: any): Promise<object> {
        let { isEnabledWhitelist } = body;
        const enabledWhitelist = await this.siteRepository.findOne({where: {id: parseInt(process.env.SITE_ID)}});
        enabledWhitelist.isEnabledWhitelist = isEnabledWhitelist;
        await this.siteRepository.save(enabledWhitelist);
        return;
    }

    async blacklist(body: any, token?: any): Promise<object> {
        let { limit, offset } = body;
        const blacklist = await this.blacklistRepository.createQueryBuilder("blacklist")
            .where("blacklist.siteId = :siteId", {siteId: process.env.SITE_ID})
            .orderBy('blacklist.createdAt', 'DESC')
            .skip(offset)
            .take(limit)
            .getManyAndCount();
        return blacklist;
    }
    
    async blacklistInsert(body: any, token: any): Promise<object> {
        let { ip, memo } = body;
        const blacklistInsert = await this.blacklistRepository.createQueryBuilder()
            .insert()
            .values({
                siteId: parseInt(process.env.SITE_ID),
                ip,
                memo,
            })
            .execute()
    
        return blacklistInsert;
    }
    
    async blacklistDelete(body: any, token: any): Promise<object> {

        let { id } = body;
        const blacklistDelete = await this.blacklistRepository.createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute()
    
        return blacklistDelete;
    }

    async whitelist(body: any, token?: any): Promise<object> {

        let { limit, offset } = body;
        const whitelist = await this.whitelistRepository.createQueryBuilder("whitelist")
            .where("whitelist.siteId = :siteId", {siteId: process.env.SITE_ID})
            .orderBy('whitelist.createdAt', 'DESC')
            .skip(offset)
            .take(limit)
            .getManyAndCount();

        return whitelist;
    }

    async whitelistInsert(body: any, token: any): Promise<object> {
        let { ip, memo } = body;
        const whitelistInsert = await this.whitelistRepository.createQueryBuilder()
            .insert()
            .values({
                siteId: parseInt(process.env.SITE_ID),
                ip,
                memo,
            })
            .execute()
    
        return whitelistInsert;
    }
    
    async whitelistDelete(body: any, token: any): Promise<object> {

        let { id } = body;
        const whitelistDelete = await this.whitelistRepository.createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute()
    
        return whitelistDelete;
    }
}