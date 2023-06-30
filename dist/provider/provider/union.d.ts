import { ApiRequest } from '../provider.model';
import { ProviderRepository } from '../provider.repository';
export declare class UnionService {
    private readonly providerRepository;
    private url;
    private headers;
    constructor(providerRepository: ProviderRepository);
    init(providerName: string): Promise<void>;
    createUser(body: any): Promise<object>;
    thirdParty(body: any, token: any): Promise<object>;
    gamelists(body: any, token: any): Promise<object>;
    partnerBalance(body: any): Promise<object>;
    userBalance(body: any): Promise<object>;
    withdrawAllBalance(body: any): Promise<object>;
    apiRequest(apiRequest: ApiRequest): Promise<object>;
}
