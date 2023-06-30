import { ProviderThirdpartySite } from './provider-thirdparty-site.entity';
import { LogUserThirdpartyMoney } from "src/log/entity/log-user-thirdparty-money.entity";
export declare class ProviderThirdparty {
    id: number;
    providerId: number;
    name: string;
    nameEn: string;
    code: string;
    type: number;
    isLobby: number;
    createdAt: Date;
    updatedAt: Date;
    providerThirdpartySite: ProviderThirdpartySite[];
    logUserThirdpartyMoney: LogUserThirdpartyMoney[];
}
