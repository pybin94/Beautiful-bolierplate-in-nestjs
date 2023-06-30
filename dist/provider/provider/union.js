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
exports.UnionService = void 0;
const common_1 = require("@nestjs/common");
const log_tools_config_1 = require("../../config/log.tools.config");
const qs = require("qs");
const got_1 = require("got");
const provider_repository_1 = require("../provider.repository");
let UnionService = class UnionService {
    constructor(providerRepository) {
        this.providerRepository = providerRepository;
        this.headers = {};
        this.init("union");
        this.url = "https://api.uniongame.org";
    }
    async init(providerName) {
        try {
            const siteProviders = await this.providerRepository.getSiteProvider();
            let token;
            siteProviders.forEach((item) => {
                if (item["providerId"]["name"] == providerName) {
                    return token = item["token"];
                }
                ;
            });
            this.headers = {
                "k-username": "lastsupper",
                "k-secret": token,
                "User-agent": "Mozilla",
                "Content-Type": "application/x-www-form-urlencoded",
            };
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Union] init", error);
            throw error;
        }
    }
    async createUser(body) {
        return;
    }
    ;
    async thirdParty(body, token) {
        let { category } = body;
        try {
            const urlParams = "/vendors";
            const params = {
                categoryKey: category,
            };
            let response = await this.apiRequest({ urlParams, params });
            response = response["vendors"];
            return response;
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Union] thirdParty", error);
            throw error;
        }
        ;
    }
    ;
    async gamelists(body, token) {
        let { thirdpartyCode } = body;
        try {
            const urlParams = "/games";
            const params = {
                vendorKey: thirdpartyCode,
            };
            const response = await this.apiRequest({ urlParams, params });
            const gamelists = response["games"];
            return gamelists;
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Union] gamelists", error);
            throw error;
        }
        ;
    }
    ;
    async partnerBalance(body) {
        try {
            const urlParams = "/partner/balance";
            const params = {};
            const response = await this.apiRequest({ urlParams, params });
            const partnerBalance = { union: response["balance"] };
            return partnerBalance;
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Union] partnerBalance", error);
            throw error;
        }
        ;
    }
    ;
    async userBalance(body) {
        let { identity } = body;
        try {
            const urlParams = "/balance";
            const params = {
                username: identity,
            };
            const response = await this.apiRequest({ urlParams, params });
            const userBalance = response["balance"];
            return userBalance;
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Union] userBalance", error);
            throw error;
        }
        ;
    }
    ;
    async withdrawAllBalance(body) {
        let { identity } = body;
        try {
            const urlParams = "/withdraw";
            const params = {
                username: identity,
                requestKey: Date.now(),
            };
            const response = await this.apiRequest({ urlParams, params });
            const withdrawAllBalance = { union: response["amount"] };
            return withdrawAllBalance;
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Union] withdrawAllBalance", error);
            throw error;
        }
        ;
    }
    ;
    async apiRequest(apiRequest) {
        try {
            const url = this.url + apiRequest.urlParams;
            const options = {
                headers: this.headers,
                body: qs.stringify(apiRequest.params),
                timeout: 5000,
            };
            console.log(url, options);
            const response = await got_1.default.post(url, options).json();
            if (response["code"] !== 0) {
                throw response["msg"];
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
UnionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [provider_repository_1.ProviderRepository])
], UnionService);
exports.UnionService = UnionService;
//# sourceMappingURL=union.js.map