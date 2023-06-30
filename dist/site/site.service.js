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
exports.SiteService = void 0;
const common_1 = require("@nestjs/common");
const log_tools_config_1 = require("../config/log.tools.config");
const site_repository_1 = require("./site.repository");
let SiteService = class SiteService {
    constructor(siteRepository) {
        this.siteRepository = siteRepository;
    }
    async siteInfo(body) {
        try {
            let siteInfo = await this.siteRepository.siteInfo(body);
            return (0, log_tools_config_1.handleSend)(siteInfo);
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] siteInfo", error, "사이트 정보를 가져오는 중 에러가 발생했습니다.");
        }
    }
    async siteInfoUpdate(body) {
        try {
            let siteInfoUpdate = await this.siteRepository.siteInfoUpdate(body);
            return (0, log_tools_config_1.handleSend)(siteInfoUpdate, "저장이 완료됐습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] siteInfoUpdate", error, "사이트 정보를 저장하는 중 에러가 발생했습니다.");
        }
    }
    async siteBonusLevel(body) {
        try {
            let siteBonus = await this.siteRepository.siteBonusLevel(body);
            return (0, log_tools_config_1.handleSend)(siteBonus);
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] siteBonus", error, "사이트 정보를 가져오는 중 에러가 발생했습니다.");
        }
    }
    async siteBonusLevelUpsert(body) {
        try {
            let siteBonusUpsert = await this.siteRepository.siteBonusLevelUpsert(body);
            return (0, log_tools_config_1.handleSend)(siteBonusUpsert);
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] siteBonusUpsert", error, "사이트 정보를 저장하는 중 에러가 발생했습니다.");
        }
    }
    async enabledWhitelist(body, token) {
        try {
            let enabledWhitelist = await this.siteRepository.enabledWhitelist(body, token);
            return (0, log_tools_config_1.handleSend)(enabledWhitelist, "사이트 접근 상태를 변경했습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] enabledWhitelist", error, "화이트 리스트 상태 수정중 에러가 발생했습니다.");
        }
    }
    async blacklist(body, token) {
        try {
            let blacklist = await this.siteRepository.blacklist(body, token);
            const [list, total] = Object.values(blacklist);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] blacklist", error, "블랙 리스트를 가져오는 중 에러가 발생했습니다.");
        }
    }
    async blacklistInsert(body, token) {
        try {
            let blacklistInsert = await this.siteRepository.blacklistInsert(body, token);
            return (0, log_tools_config_1.handleSend)(blacklistInsert, "블랙 아이피를 등록했습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] blacklistInsert", error, "블랙 리스트 등록 중 에러가 발생했습니다.");
        }
    }
    async blacklistDelete(body, token) {
        try {
            let blacklistDelete = await this.siteRepository.blacklistDelete(body, token);
            return (0, log_tools_config_1.handleSend)(blacklistDelete, "블랙 아이피를 삭제했습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] blacklistDelete", error, "블랙 리스트 삭제 중 에러가 발생했습니다.");
        }
    }
    async whitelist(body, token) {
        try {
            let whitelist = await this.siteRepository.whitelist(body, token);
            const [list, total] = Object.values(whitelist);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] whitelist", error, "화이트 리스트를 가져오는 중 에러가 발생했습니다.");
        }
    }
    async whitelistInsert(body, token) {
        try {
            let whitelistInsert = await this.siteRepository.whitelistInsert(body, token);
            return (0, log_tools_config_1.handleSend)(whitelistInsert, "화이트 아이피를 등록했습니다");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] whitelistInsert", error, "화이트 리스트 등록 중 에러가 발생했습니다.");
        }
    }
    async whitelistDelete(body, token) {
        try {
            let whitelistDelete = await this.siteRepository.whitelistDelete(body, token);
            return (0, log_tools_config_1.handleSend)(whitelistDelete, "화이트 아이피를 삭제했습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] whitelistDelete", error, "화이트 리스트 삭제 중 에러가 발생했습니다.");
        }
    }
};
SiteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [site_repository_1.SiteRepository])
], SiteService);
exports.SiteService = SiteService;
//# sourceMappingURL=site.service.js.map