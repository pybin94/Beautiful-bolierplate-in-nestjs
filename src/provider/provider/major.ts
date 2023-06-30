import { Injectable } from '@nestjs/common';
import { handleError } from 'src/config/log.tools.config';
import * as qs from 'qs'
import got from 'got';
import { ApiRequest } from '../provider.model';
import { ProviderRepository } from '../provider.repository';
import { log } from 'console';

@Injectable()
export class MajorService {

    private url: string;
    private headers = {};

    constructor(
        private readonly providerRepository: ProviderRepository,
    ) {
        this.init("major");
        this.url = "https://b01.major9999.com/api/gameboy";
    }

    async init (providerName: string): Promise<void> {
        try {
            let token: string;
            const siteProviders = await this.providerRepository.getSiteProvider()
            siteProviders.forEach((item: object)=>{
                if(item["providerId"]["name"] == providerName){
                    return token = item["token"];
                };
            });

            this.headers = {
                accept: "application/json",
                authToken: token,
            };

        } catch (error) {
            handleError("[Major] init", error);
            throw error;
        }
    }

    async createUser(body: any): Promise<object> {
        let { identity } = body;
        try{
            const urlParams = "/user/create";
            const params = {
                accountname: identity,
            };
            const response = await this.apiRequest({urlParams, params});
            return response;
        } catch (error) {
            handleError("[Major] createUser", error);
            throw error;
        };
    };

    async thirdParty(body: any, token: any): Promise<object> {
        let { category } = body;
        try{
            const urlParams = "/game/halls";
            const response = await this.apiRequest({urlParams}) as object;
            let gameList = []
            response["Halls"].forEach((item: object)=>{
                if(item["type"] == category) {
                    gameList = [...gameList, item]
                }
            })
            return gameList;
        } catch (error) {
            handleError("[Major] thirdParty", error); 
            throw error;
        };
    };

    async gamelists(body: any, token: any): Promise<object> {
        let { thirdpartyCode } = body;
        try{
            const urlParams = "/game/list";
            const params = {
                gamehall: thirdpartyCode,
            };
            const response = await this.apiRequest({urlParams, params});
            const gameList = response["Games"]
            
            return gameList;
        } catch (error) {
            handleError("[Major] gamelists", error);
            throw Error;
        };
    };

    async partnerBalance(): Promise<object> {
        try{
            const urlParams = "/operator/info";

            const response = await this.apiRequest({urlParams});
            const partnerBalance = {major: response["Balance"]}
            
            return partnerBalance;
        } catch (error) {
            handleError("[Major] partnerBalance", error);
            throw error;
        };
    };

    async userBalance(body: any): Promise<object> {
        let { targetIdentity } = body;
        try{
            await this.createUser(targetIdentity)
            const urlParams = "/user/balance";
            const params = {
                accountname: targetIdentity,
            };
            const response = await this.apiRequest({urlParams, params});
            const userBalance = response["Balance"];
            
            return userBalance;
        } catch (error) {
            handleError("[Major] userBalance", error);
            throw error;
        };
    };

    async depositBalance(body: any): Promise<void> {
        let { amount, identity } = body;
        try{
            await this.createUser(body)
            if(amount !== 0) {  // 머니가 0이면 권한에러를 뱉음
                let partnerBalance = await this.partnerBalance();
                if(amount > partnerBalance ) {
                    throw "게임사 머니가 부족합니다. 관리자에게 문의주세요."
                }

                const urlParams = "/user/charge";
                const params = {
                    accountname: identity,
                    amount: parseInt(amount),
                };
                await this.apiRequest({urlParams, params});
            }
        } catch (error) {
            handleError("[Major] depositBalance", error);
            throw error;
        };
    };

    async withdrawAllBalance(body: any): Promise<object> {
        let { identity } = body;
        try{
            await this.createUser(body)
            const urlParams = "/user/withdrawall";
            const params = {
                accountname: identity,
            };
            const response = await this.apiRequest({urlParams, params});
            const withdrawAllBalance = {major: response["Balance"]};
            return withdrawAllBalance;
        } catch (error) {
            handleError("[Major] withdrawAllBalance", error);
            throw error;
        };
    };

    async apiRequest(apiRequest: ApiRequest): Promise<object> {
        try{
            let url = this.url + apiRequest.urlParams;
            let options = {
                headers: this.headers,
                timeout: 5000,
            };
            if(apiRequest.params) {
                url = url+"?"+qs.stringify(apiRequest.params)
            }
            const response = await got.post(url, options).json() as object;
            // log(`[MAJOR]`, (`[URL]: ${apiRequest.urlParams} | [OPTION]: ${JSON.stringify(options)} | [RESPONSE]: ${JSON.stringify(response)}`).substring(0, 250))

            if(response["Error"] !== 0) {
                throw response["Description"];
            }
            return response;
        } catch (error) {
            throw error;
        };
    };
}
