import { QueryRunner, Repository } from "typeorm";
import { Site } from './entity/site.entity';
import { IpBlacklist } from './entity/ip-blacklist.entity';
import { IpWhitelist } from './entity/ip-whitelist.entity';
import { SiteBonusLevelDetail } from './entity/site-bonus-level-detail.entity';
export declare class SiteRepository {
    private readonly siteRepository;
    private readonly siteBonusLevelDetailRepository;
    private readonly blacklistRepository;
    private readonly whitelistRepository;
    constructor(siteRepository: Repository<Site>, siteBonusLevelDetailRepository: Repository<SiteBonusLevelDetail>, blacklistRepository: Repository<IpBlacklist>, whitelistRepository: Repository<IpWhitelist>);
    siteInfo(body: any): Promise<object>;
    siteInfoUpdate(body: any): Promise<void>;
    siteBonusLevel(body: any): Promise<object>;
    siteBonusLevelUpsert(body: any): Promise<void>;
    sitePayment(queryRunner: QueryRunner, paymentType: number, amount: number): Promise<object>;
    enabledWhitelist(body: any, token: any): Promise<object>;
    blacklist(body: any, token?: any): Promise<object>;
    blacklistInsert(body: any, token: any): Promise<object>;
    blacklistDelete(body: any, token: any): Promise<object>;
    whitelist(body: any, token?: any): Promise<object>;
    whitelistInsert(body: any, token: any): Promise<object>;
    whitelistDelete(body: any, token: any): Promise<object>;
}
