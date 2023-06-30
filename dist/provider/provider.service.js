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
exports.ProviderService = void 0;
const common_1 = require("@nestjs/common");
const provider_repository_1 = require("./provider.repository");
const log_tools_config_1 = require("../config/log.tools.config");
const union_1 = require("./provider/union");
const major_1 = require("./provider/major");
let ProviderService = class ProviderService {
    constructor(providerRepository, major, union) {
        this.providerRepository = providerRepository;
        this.major = major;
        this.union = union;
        this.provoder = {};
        this.provoder = {
            1: major,
            2: union,
        };
        this.providerCount = Object.keys(this.provoder).length;
    }
    async providers(body, token) {
        try {
            const response = await this.providerRepository.providers(body);
            return (0, log_tools_config_1.handleSend)(response);
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] providers", error, error);
        }
        ;
    }
    ;
    async getSiteProvider(body, token) {
        try {
            const response = await this.providerRepository.getSiteProvider();
            return (0, log_tools_config_1.handleSend)(response);
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] getSiteProvider", error, error);
        }
        ;
    }
    ;
    async upsertSiteProvider(body, token) {
        try {
            await this.providerRepository.upsertSiteProvider(body);
            return (0, log_tools_config_1.handleSend)([], "저장됐습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] upsertSiteProvider", error, error);
        }
        ;
    }
    ;
    async deleteSiteProvider(body, token) {
        try {
            await this.providerRepository.deleteSiteProvider(body);
            return (0, log_tools_config_1.handleSend)([], "삭제됐습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] deleteSiteProvider", error, error);
        }
        ;
    }
    ;
    async thirdParty(body, token) {
        try {
            const response = await this.providerRepository.thirdpartys(body);
            return (0, log_tools_config_1.handleSend)(response);
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] thirdParty", error, error);
        }
        ;
    }
    ;
    async getSiteThirdpartys(body, token) {
        try {
            const response = await this.providerRepository.getSiteThirdpartys(body);
            return (0, log_tools_config_1.handleSend)(response);
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] getSiteThirdpartys", error, error);
        }
        ;
    }
    ;
    async upsertSiteThirdpartys(body, token) {
        try {
            let discription = "게임사 등록이 완료됐습니다.";
            if (body["thirdpartyStatus"])
                discription = "설정이 변경되었습니다.";
            await this.providerRepository.upsertSiteThirdpartys(body);
            return (0, log_tools_config_1.handleSend)([], discription);
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] upsertSiteThirdpartys", error, error);
        }
        ;
    }
    ;
    async deleteSiteThirdpartys(body, token) {
        try {
            await this.providerRepository.deleteSiteThirdpartys(body);
            return (0, log_tools_config_1.handleSend)([], "삭제됐습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] deleteSiteThirdpartys", error, error);
        }
        ;
    }
    ;
    async createUser(body) {
        const { providerId } = body;
        try {
            let response = await this.provoder[providerId].createUser(body);
            return (0, log_tools_config_1.handleSend)(response);
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] createUser", error, error);
        }
        ;
    }
    ;
    async gamelists(body, token) {
        const { providerId } = body;
        try {
            const response = await this.provoder[providerId].gamelists(body, token);
            return (0, log_tools_config_1.handleSend)(response);
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] gamelists", error, error);
        }
        ;
    }
    ;
    async partnerBalance() {
        try {
            let balance = [];
            let totalBalance = 0;
            let getBalance;
            for (let i = 1; i <= this.providerCount; i++) {
                getBalance = await this.provoder[i].partnerBalance();
                balance = [...balance, getBalance];
                totalBalance += getBalance[Object.keys(getBalance)[0]];
            }
            balance = [...balance, { totalBalance: totalBalance }];
            return (0, log_tools_config_1.handleSend)(balance);
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] partnerBalance", error, error);
        }
        ;
    }
    ;
    async userBalance(token) {
        try {
            let totalBalance = 0;
            for (let i = 1; i <= this.providerCount; i++) {
                totalBalance += await this.provoder[i].userBalance(token);
            }
            return (0, log_tools_config_1.handleSend)(totalBalance);
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] userBalance", error, error);
        }
        ;
    }
    ;
    async withdrawAllBalance(body) {
        try {
            let balance = {};
            let totalBalance = 0;
            let getBalance;
            for (let i = 1; i <= this.providerCount; i++) {
                getBalance = await this.provoder[i].withdrawAllBalance(body);
                balance = Object.assign(Object.assign({}, balance), getBalance);
                totalBalance += getBalance[Object.keys(getBalance)[0]];
            }
            balance = Object.assign(Object.assign({}, balance), { totalBalance: totalBalance });
            return (0, log_tools_config_1.handleSend)(balance);
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] withdrawAllBalance", error, error);
        }
        ;
    }
    ;
};
ProviderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [provider_repository_1.ProviderRepository,
        major_1.MajorService,
        union_1.UnionService])
], ProviderService);
exports.ProviderService = ProviderService;
//# sourceMappingURL=provider.service.js.map