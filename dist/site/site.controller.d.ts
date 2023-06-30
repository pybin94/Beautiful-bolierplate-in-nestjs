import { SiteService } from './site.service';
export declare class SiteController {
    private readonly siteService;
    constructor(siteService: SiteService);
    siteInfo(body: any, token: any): Promise<object>;
    siteInfoUpdate(body: any, token: any): Promise<object>;
    siteBonusLevel(body: any, token: any): Promise<object>;
    siteBonusLevelUpsert(body: any, token: any): Promise<object>;
    enabledWhitelist(body: any, token: any): Promise<object>;
    blacklist(body: any, token: any): Promise<object>;
    blacklistInsert(body: any, token: any): Promise<object>;
    blacklistDelete(body: any, token: any): Promise<object>;
    whitelist(body: any, token: any): Promise<object>;
    whitelistInsert(body: any, token: any): Promise<object>;
    whitelistDelete(body: any, token: any): Promise<object>;
}
