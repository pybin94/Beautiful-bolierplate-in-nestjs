import { SiteProvider } from 'src/site/entity/site-provider.entity';
import { ProviderThirdparty } from './provider-thirdparty.entity';
export declare class Provider {
    id: number;
    name: string;
    url: string;
    status: number;
    createdAt: Date;
    updated_at: Date;
    siteProvider: SiteProvider[];
    providerThirdparty: ProviderThirdparty[];
}
