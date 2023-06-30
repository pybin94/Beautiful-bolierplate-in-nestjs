import { Injectable } from '@nestjs/common';
import { ProviderRepository } from './provider.repository';
import { handleError, handleSend } from 'src/config/log.tools.config';
import { UnionService } from './provider/union';
import { MajorService } from './provider/major';

@Injectable()
export class ProviderService {
    provoder = {};
    providerCount: number;

    constructor(
        private readonly providerRepository: ProviderRepository,
        private readonly major: MajorService,
        private readonly union: UnionService,
    ) {
        this.provoder = {
            1: major,
            2: union,
        }
        this.providerCount = Object.keys(this.provoder).length;
    }

    // Entity Api

    async providers(body: any, token: any): Promise<object> {
        try {
            const response = await this.providerRepository.providers(body);
            return handleSend(response);
        } catch (error) {
            return handleError("[Service] providers", error, error);
        };
    };

    async getSiteProvider(body: any, token: any): Promise<object> {
        try {
            const response = await this.providerRepository.getSiteProvider();
            return handleSend(response);
        } catch (error) {
            return handleError("[Service] getSiteProvider", error, error);
        };
    };

    async upsertSiteProvider(body: any, token: any): Promise<object> {
        try {
            await this.providerRepository.upsertSiteProvider(body);
            return handleSend([], "저장됐습니다.");
        } catch (error) {
            return handleError("[Service] upsertSiteProvider", error, error);
        };
    };

    async deleteSiteProvider(body: any, token: any): Promise<object> {
        try {
            await this.providerRepository.deleteSiteProvider(body);
            return handleSend([], "삭제됐습니다.");
        } catch (error) {
            return handleError("[Service] deleteSiteProvider", error, error);
        };
    };

    async thirdParty(body: any, token: any): Promise<object> {
        try {
            const response = await this.providerRepository.thirdpartys(body);
            return handleSend(response);
        } catch (error) {
            return handleError("[Service] thirdParty", error, error);
        };
    };

    async getSiteThirdpartys(body: any, token: any): Promise<object> {
        try {
            const response = await this.providerRepository.getSiteThirdpartys(body);
            return handleSend(response);
        } catch (error) {
            return handleError("[Service] getSiteThirdpartys", error, error);
        };
    };

    async upsertSiteThirdpartys(body: any, token: any): Promise<object> {
        
        try {
            let discription = "게임사 등록이 완료됐습니다.";
            if(body["thirdpartyStatus"]) discription = "설정이 변경되었습니다.";

            await this.providerRepository.upsertSiteThirdpartys(body);

            return handleSend([], discription);
        } catch (error) {
            return handleError("[Service] upsertSiteThirdpartys", error, error);
        };
    };

    async deleteSiteThirdpartys(body: any, token: any): Promise<object> {
        try {
            await this.providerRepository.deleteSiteThirdpartys(body);
            return handleSend([], "삭제됐습니다.");
        } catch (error) {
            return handleError("[Service] deleteSiteThirdpartys", error, error);
        };
    };

    // Provider Api

    async createUser(body: any): Promise<object> {
        const { providerId } = body
        try {
            let response = await this.provoder[providerId].createUser(body) as Array<object>;
            return handleSend(response);
        } catch (error) {
            return handleError("[Service] createUser", error, error);
        };
    };

    async gamelists(body: any, token: any): Promise<object> {
        const { providerId } = body
        try {
            const response = await this.provoder[providerId].gamelists(body, token)
            return handleSend(response);
        } catch (error) {
            return handleError("[Service] gamelists", error, error);
        };
    };

    async partnerBalance(): Promise<object> {
        try{
            let balance = []; 
            let totalBalance: number = 0;
            let getBalance: object;

            for(let i = 1; i <= this.providerCount; i++) {
                getBalance = await this.provoder[i].partnerBalance();
                balance = [...balance, getBalance];
                totalBalance += getBalance[Object.keys(getBalance)[0]];
            }

            balance = [...balance, {totalBalance: totalBalance}];
            return handleSend(balance);
        } catch (error) {
            return handleError("[Service] partnerBalance", error, error);
        };
    };

    async userBalance(token: any): Promise<object> {
        try{
            let totalBalance: number = 0;
            for(let i = 1; i <= this.providerCount; i++) {
                totalBalance += await this.provoder[i].userBalance(token);
            }
            return handleSend(totalBalance);
        } catch (error) {
            return handleError("[Service] userBalance", error, error);
        };
    };

    async withdrawAllBalance(body: any): Promise<object> {
        try{
            let balance = {}; 
            let totalBalance: number = 0;
            let getBalance: object;

            for(let i = 1; i <= this.providerCount; i++) {
                getBalance = await this.provoder[i].withdrawAllBalance(body);
                balance = {...balance, ...getBalance};
                totalBalance += getBalance[Object.keys(getBalance)[0]];
            }

            balance = {...balance, totalBalance: totalBalance};
            return handleSend(balance);
        } catch (error) {
            return handleError("[Service] withdrawAllBalance", error, error);
        };
    };
}
