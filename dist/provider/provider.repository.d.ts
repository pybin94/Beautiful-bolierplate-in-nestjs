import { Repository } from "typeorm";
import { Provider } from './entity/provider.entity';
import { ProviderThirdparty } from './entity/provider-thirdparty.entity';
import { ProviderThirdpartySite } from './entity/provider-thirdparty-site.entity';
import { SiteProvider } from 'src/site/entity/site-provider.entity';
export declare class ProviderRepository {
    private readonly providerRepository;
    private readonly providerThirdpartyRepository;
    private readonly providerThirdpartySiteRepository;
    private readonly siteProviderRepository;
    constructor(providerRepository: Repository<Provider>, providerThirdpartyRepository: Repository<ProviderThirdparty>, providerThirdpartySiteRepository: Repository<ProviderThirdpartySite>, siteProviderRepository: Repository<SiteProvider>);
    providers(body: any): Promise<any>;
    getSiteProvider(): Promise<any>;
    upsertSiteProvider(body: any): Promise<any>;
    deleteSiteProvider(body: any): Promise<any>;
    thirdpartys(body: any): Promise<any>;
    getSiteThirdpartys(body: any): Promise<any>;
    upsertSiteThirdpartys(body: any): Promise<any>;
    deleteSiteThirdpartys(body: any): Promise<any>;
}
