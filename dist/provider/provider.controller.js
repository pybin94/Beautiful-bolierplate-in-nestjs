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
exports.ProviderController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_gaurd_1 = require("../gaurds/jwt-auth.gaurd");
const provider_service_1 = require("./provider.service");
const user_decorator_1 = require("../user/user.decorator");
let ProviderController = class ProviderController {
    constructor(providerService) {
        this.providerService = providerService;
    }
    async providers(body, token) {
        const provider = await this.providerService.providers(body, token);
        return provider;
    }
    async thirdpartys(body, token) {
        const thirdParty = await this.providerService.thirdParty(body, token);
        return thirdParty;
    }
    async getSiteProvider(body, token) {
        const provider = await this.providerService.getSiteProvider(body, token);
        return provider;
    }
    async upsertSiteProvider(body, token) {
        const provider = await this.providerService.upsertSiteProvider(body, token);
        return provider;
    }
    async deleteSiteProvider(body, token) {
        const provider = await this.providerService.deleteSiteProvider(body, token);
        return provider;
    }
    async getSiteThirdpartys(body, token) {
        const thirdParty = await this.providerService.getSiteThirdpartys(body, token);
        return thirdParty;
    }
    async upsertSiteThirdpartys(body, token) {
        const thirdParty = await this.providerService.upsertSiteThirdpartys(body, token);
        return thirdParty;
    }
    async deleteSiteThirdpartys(body, token) {
        const thirdParty = await this.providerService.deleteSiteThirdpartys(body, token);
        return thirdParty;
    }
    async createUser(body, token) {
        const thirdParty = await this.providerService.createUser(body);
        return thirdParty;
    }
    async gamelists(body, token) {
        const gamelists = await this.providerService.gamelists(body, token);
        return gamelists;
    }
    async partnerBalance(body, token) {
        const gamelists = await this.providerService.partnerBalance();
        return gamelists;
    }
    async userBalance(body, token) {
        const gamelists = await this.providerService.userBalance(token);
        return gamelists;
    }
    async withdrawAllBalance(body, token) {
        const gamelists = await this.providerService.withdrawAllBalance(body);
        return gamelists;
    }
};
__decorate([
    (0, common_1.Get)('/providers'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(0)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "providers", null);
__decorate([
    (0, common_1.Post)('/thirdpartys'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(0)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "thirdpartys", null);
__decorate([
    (0, common_1.Get)('/site'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(0)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "getSiteProvider", null);
__decorate([
    (0, common_1.Patch)('/site'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(0)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "upsertSiteProvider", null);
__decorate([
    (0, common_1.Delete)('/site'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(0)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "deleteSiteProvider", null);
__decorate([
    (0, common_1.Post)('/site/thirdpartys'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "getSiteThirdpartys", null);
__decorate([
    (0, common_1.Patch)('/site/thirdpartys'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "upsertSiteThirdpartys", null);
__decorate([
    (0, common_1.Delete)('/site/thirdpartys'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(0)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "deleteSiteThirdpartys", null);
__decorate([
    (0, common_1.Get)('/user/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('/gamelists'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "gamelists", null);
__decorate([
    (0, common_1.Get)('/balance/partner'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "partnerBalance", null);
__decorate([
    (0, common_1.Get)('/balance/user'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "userBalance", null);
__decorate([
    (0, common_1.Get)('/balance/withdraw'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "withdrawAllBalance", null);
ProviderController = __decorate([
    (0, common_1.Controller)('provider'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    __metadata("design:paramtypes", [provider_service_1.ProviderService])
], ProviderController);
exports.ProviderController = ProviderController;
//# sourceMappingURL=provider.controller.js.map