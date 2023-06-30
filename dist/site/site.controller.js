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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteController = void 0;
const common_1 = require("@nestjs/common");
const site_service_1 = require("./site.service");
const user_decorator_1 = require("../user/user.decorator");
const jwt_auth_gaurd_1 = require("../gaurds/jwt-auth.gaurd");
let SiteController = class SiteController {
    constructor(siteService) {
        this.siteService = siteService;
    }
    async siteInfo(body, token) {
        const siteInfoResult = await this.siteService.siteInfo(body);
        return siteInfoResult;
    }
    async siteInfoUpdate(body, token) {
        const siteInfoUpdateResult = await this.siteService.siteInfoUpdate(body);
        return siteInfoUpdateResult;
    }
    async siteBonusLevel(body, token) {
        const siteBonusResult = await this.siteService.siteBonusLevel(body);
        return siteBonusResult;
    }
    async siteBonusLevelUpsert(body, token) {
        const siteBonusUpsertResult = await this.siteService.siteBonusLevelUpsert(body);
        return siteBonusUpsertResult;
    }
    async enabledWhitelist(body, token) {
        const enabledWhitelistResult = await this.siteService.enabledWhitelist(body, token);
        return enabledWhitelistResult;
    }
    async blacklist(body, token) {
        const blacklistResult = await this.siteService.blacklist(body, token);
        return blacklistResult;
    }
    async blacklistInsert(body, token) {
        const blacklistInsertResult = await this.siteService.blacklistInsert(body, token);
        return blacklistInsertResult;
    }
    async blacklistDelete(body, token) {
        const blacklistDeleteResult = await this.siteService.blacklistDelete(body, token);
        return blacklistDeleteResult;
    }
    async whitelist(body, token) {
        const whitelistResult = await this.siteService.whitelist(body, token);
        return whitelistResult;
    }
    async whitelistInsert(body, token) {
        const whitelistInsertResult = await this.siteService.whitelistInsert(body, token);
        return whitelistInsertResult;
    }
    async whitelistDelete(body, token) {
        const whitelistDeleteResult = await this.siteService.whitelistDelete(body, token);
        return whitelistDeleteResult;
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "siteInfo", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "siteInfoUpdate", null);
__decorate([
    (0, common_1.Get)("/bonus"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "siteBonusLevel", null);
__decorate([
    (0, common_1.Patch)("/bonus"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "siteBonusLevelUpsert", null);
__decorate([
    (0, common_1.Patch)("enabled-whitelist"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "enabledWhitelist", null);
__decorate([
    (0, common_1.Post)("blacklist"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "blacklist", null);
__decorate([
    (0, common_1.Patch)("blacklist"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "blacklistInsert", null);
__decorate([
    (0, common_1.Delete)("blacklist"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "blacklistDelete", null);
__decorate([
    (0, common_1.Post)("whitelist"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "whitelist", null);
__decorate([
    (0, common_1.Patch)("whitelist"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "whitelistInsert", null);
__decorate([
    (0, common_1.Delete)("whitelist"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "whitelistDelete", null);
SiteController = __decorate([
    (0, common_1.Controller)('site'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    __metadata("design:paramtypes", [site_service_1.SiteService])
], SiteController);
exports.SiteController = SiteController;
//# sourceMappingURL=site.controller.js.map