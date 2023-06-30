import { SiteRepository } from './site.repository';
export declare class SiteService {
    private readonly siteRepository;
    constructor(siteRepository: SiteRepository);
    siteInfo(body: any): Promise<object>;
    siteInfoUpdate(body: any): Promise<object>;
    siteBonusLevel(body: any): Promise<object>;
    siteBonusLevelUpsert(body: any): Promise<object>;
    enabledWhitelist(body: any, token: any): Promise<object>;
    blacklist(body: any, token: any): Promise<object>;
    blacklistInsert(body: any, token: any): Promise<object>;
    blacklistDelete(body: any, token: any): Promise<object>;
    whitelist(body: any, token: any): Promise<object>;
    whitelistInsert(body: any, token: any): Promise<object>;
    whitelistDelete(body: any, token: any): Promise<object>;
}
