"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MajorService = void 0;
const common_1 = require("@nestjs/common");
const log_tools_config_1 = require("../../config/log.tools.config");
const qs = require("qs");
const got_1 = require("got");
const provider_repository_1 = require("../provider.repository");
let MajorService = class MajorService {
    constructor(providerRepository) {
        this.providerRepository = providerRepository;
        this.headers = {};
        this.init("major");
        this.url = "https://b01.major9999.com/api/gameboy";
    }
    async init(providerName) {
        try {
            let token;
            const siteProviders = await this.providerRepository.getSiteProvider();
            siteProviders.forEach((item) => {
                if (item["providerId"]["name"] == providerName) {
                    return token = item["token"];
                }
                ;
            });
            this.headers = {
                accept: "application/json",
                authToken: token,
            };
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Major] init", error);
            throw error;
        }
    }
    async createUser(body) {
        let { identity } = body;
        try {
            const urlParams = "/user/create";
            const params = {
                accountname: identity,
            };
            const response = await this.apiRequest({ urlParams, params });
            return response;
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Major] createUser", error);
            throw error;
        }
        ;
    }
    ;
    async thirdParty(body, token) {
        let { category } = body;
        try {
            const urlParams = "/game/halls";
            const response = await this.apiRequest({ urlParams });
            let gameList = [];
            response["Halls"].forEach((item) => {
                if (item["type"] == category) {
                    gameList = [...gameList, item];
                }
            });
            return gameList;
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Major] thirdParty", error);
            throw error;
        }
        ;
    }
    ;
    async gamelists(body, token) {
        let { thirdpartyCode } = body;
        try {
            const urlParams = "/game/list";
            const params = {
                gamehall: thirdpartyCode,
            };
            const response = await this.apiRequest({ urlParams, params });
            const gameList = response["Games"];
            return gameList;
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Major] gamelists", error);
            throw Error;
        }
        ;
    }
    ;
    async partnerBalance() {
        try {
            const urlParams = "/operator/info";
            const response = await this.apiRequest({ urlParams });
            const partnerBalance = { major: response["Balance"] };
            return partnerBalance;
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Major] partnerBalance", error);
            throw error;
        }
        ;
    }
    ;
    async userBalance(body) {
        let { targetIdentity } = body;
        try {
            await this.createUser(targetIdentity);
            const urlParams = "/user/balance";
            const params = {
                accountname: targetIdentity,
            };
            const response = await this.apiRequest({ urlParams, params });
            const userBalance = response["Balance"];
            return userBalance;
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Major] userBalance", error);
            throw error;
        }
        ;
    }
    ;
    async depositBalance(body) {
        let { amount, identity } = body;
        try {
            await this.createUser(body);
            if (amount !== 0) {
                let partnerBalance = await this.partnerBalance();
                if (amount > partnerBalance) {
                    throw "게임사 머니가 부족합니다. 관리자에게 문의주세요.";
                }
                const urlParams = "/user/charge";
                const params = {
                    accountname: identity,
                    amount: parseInt(amount),
                };
                await this.apiRequest({ urlParams, params });
            }
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Major] depositBalance", error);
            throw error;
        }
        ;
    }
    ;
    async withdrawAllBalance(body) {
        let { identity } = body;
        try {
            await this.createUser(body);
            const urlParams = "/user/withdrawall";
            const params = {
                accountname: identity,
            };
            const response = await this.apiRequest({ urlParams, params });
            const withdrawAllBalance = { major: response["Balance"] };
            return withdrawAllBalance;
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Major] withdrawAllBalance", error);
            throw error;
        }
        ;
    }
    ;
    async apiRequest(apiRequest) {
        try {
            let url = this.url + apiRequest.urlParams;
            let options = {
                headers: this.headers,
                timeout: 5000,
            };
            if (apiRequest.params) {
                url = url + "?" + qs.stringify(apiRequest.params);
            }
            const response = await got_1.default.post(url, options).json();
            if (response["Error"] !== 0) {
                throw response["Description"];
            }
            return response;
        }
        catch (error) {
            throw error;
        }
        ;
    }
    ;
};
MajorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [provider_repository_1.ProviderRepository])
], MajorService);
exports.MajorService = MajorService;
//# sourceMappingURL=major.js.map