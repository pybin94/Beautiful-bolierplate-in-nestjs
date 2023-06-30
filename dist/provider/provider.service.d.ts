import { ProviderRepository } from './provider.repository';
import { UnionService } from './provider/union';
import { MajorService } from './provider/major';
export declare class ProviderService {
    private readonly providerRepository;
    private readonly major;
    private readonly union;
    provoder: {};
    providerCount: number;
    constructor(providerRepository: ProviderRepository, major: MajorService, union: UnionService);
    providers(body: any, token: any): Promise<object>;
    getSiteProvider(body: any, token: any): Promise<object>;
    upsertSiteProvider(body: any, token: any): Promise<object>;
    deleteSiteProvider(body: any, token: any): Promise<object>;
    thirdParty(body: any, token: any): Promise<object>;
    getSiteThirdpartys(body: any, token: any): Promise<object>;
    upsertSiteThirdpartys(body: any, token: any): Promise<object>;
    deleteSiteThirdpartys(body: any, token: any): Promise<object>;
    createUser(body: any): Promise<object>;
    gamelists(body: any, token: any): Promise<object>;
    partnerBalance(): Promise<object>;
    userBalance(token: any): Promise<object>;
    withdrawAllBalance(body: any): Promise<object>;
}
