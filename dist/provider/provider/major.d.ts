import { ApiRequest } from '../provider.model';
import { ProviderRepository } from '../provider.repository';
export declare class MajorService {
    private readonly providerRepository;
    private url;
    private headers;
    constructor(providerRepository: ProviderRepository);
    init(providerName: string): Promise<void>;
    createUser(body: any): Promise<object>;
    thirdParty(body: any, token: any): Promise<object>;
    gamelists(body: any, token: any): Promise<object>;
    partnerBalance(): Promise<object>;
    userBalance(body: any): Promise<object>;
    depositBalance(body: any): Promise<void>;
    withdrawAllBalance(body: any): Promise<object>;
    apiRequest(apiRequest: ApiRequest): Promise<object>;
}
