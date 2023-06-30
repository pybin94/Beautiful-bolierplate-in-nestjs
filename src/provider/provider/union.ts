import { Injectable } from '@nestjs/common';
import { handleError } from 'src/config/log.tools.config';
import * as qs from 'qs'
import got from 'got';
import { ApiRequest } from '../provider.model';
import { log } from 'console';
import { ProviderRepository } from '../provider.repository';

@Injectable()
export class UnionService {

    private url: string;
    private headers = {};

    constructor(
        private readonly providerRepository: ProviderRepository,
    ) {
        this.init("union");
        this.url = "https://api.uniongame.org";
    }

    async init (providerName: string): Promise<void> {
        try {
            const siteProviders = await this.providerRepository.getSiteProvider();
            let token: string;
            siteProviders.forEach((item: object)=>{
                if(item["providerId"]["name"] == providerName){
                    return token = item["token"];
                };
            });

            this.headers = {
                "k-username": "lastsupper",
                "k-secret": token,
                "User-agent": "Mozilla",
                "Content-Type": "application/x-www-form-urlencoded",
            };

        } catch (error) {
            handleError("[Union] init", error);
            throw error;
        }
    }

    async createUser(body: any): Promise<object> {
        return;
    };

    async thirdParty(body: any, token: any): Promise<object> {
        let { category } = body;
        try{
            const urlParams = "/vendors";
            const params = {
                categoryKey: category,
            };
            let response = await this.apiRequest({urlParams, params});
            response = response["vendors"]
            return response;
        } catch (error) {
            handleError("[Union] thirdParty", error);
            throw error;
        };
    };

    async gamelists(body: any, token: any): Promise<object> {
        let { thirdpartyCode } = body;
        try{
            const urlParams = "/games";
            const params = {
                vendorKey: thirdpartyCode,
            };
            const response = await this.apiRequest({urlParams, params});
            const gamelists = response["games"]
            return gamelists;
        } catch (error) {
            handleError("[Union] gamelists", error);
            throw error;
        };
    };

    async partnerBalance(body: any): Promise<object> {
        try{
            const urlParams = "/partner/balance";
            const params = {};
            const response = await this.apiRequest({urlParams, params});
            const partnerBalance = {union: response["balance"]}

            return partnerBalance;
        } catch (error) {
            handleError("[Union] partnerBalance", error);
            throw error;
        };
    };

    async userBalance(body: any): Promise<object> {
        let { identity } = body; 
        try{
            const urlParams = "/balance";
            const params = {
                username: identity,
            };
            const response = await this.apiRequest({urlParams, params});
            const userBalance = response["balance"];

            return userBalance;
        } catch (error) {
            handleError("[Union] userBalance", error);
            throw error;
        };
    };

    async withdrawAllBalance(body: any): Promise<object> {
        let { identity } = body;
        try{
            const urlParams = "/withdraw";
            const params = {
                username: identity,
                requestKey: Date.now(),
            };
            const response = await this.apiRequest({urlParams, params});
            const withdrawAllBalance = {union: response["amount"]};
            return withdrawAllBalance;
        } catch (error) {
            handleError("[Union] withdrawAllBalance", error);
            throw error;
        };
    };

    async apiRequest(apiRequest: ApiRequest): Promise<object> {
        try{
            const url = this.url + apiRequest.urlParams;
            const options = {
                headers: this.headers,
                body: qs.stringify(apiRequest.params),
                timeout: 5000,
            };
            console.log(url, options)
            const response = await got.post(url, options).json() as object;
            // log(`[UNION]`, (`[URL]: ${apiRequest.urlParams} | [OPTION]: ${JSON.stringify(options)} | [RESPONSE]: ${JSON.stringify(response)}`).substring(0, 250))
            if(response["code"] !== 0) {
                throw response["msg"];
            }
            return response;
        } catch (error) {
            throw error;
        };
    };
}
