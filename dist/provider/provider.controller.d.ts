import { ProviderService } from './provider.service';
export declare class ProviderController {
    private readonly providerService;
    constructor(providerService: ProviderService);
    providers(body: any, token: any): Promise<object>;
    thirdpartys(body: any, token: any): Promise<object>;
    getSiteProvider(body: any, token: any): Promise<object>;
    upsertSiteProvider(body: any, token: any): Promise<object>;
    deleteSiteProvider(body: any, token: any): Promise<object>;
    getSiteThirdpartys(body: any, token: any): Promise<object>;
    upsertSiteThirdpartys(body: any, token: any): Promise<object>;
    deleteSiteThirdpartys(body: any, token: any): Promise<object>;
    createUser(body: any, token: any): Promise<object>;
    gamelists(body: any, token: any): Promise<object>;
    partnerBalance(body: any, token: any): Promise<object>;
    userBalance(body: any, token: any): Promise<object>;
    withdrawAllBalance(body: any, token: any): Promise<object>;
}
