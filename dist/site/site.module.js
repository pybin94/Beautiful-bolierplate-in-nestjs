"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteModule = void 0;
const common_1 = require("@nestjs/common");
const site_controller_1 = require("./site.controller");
const site_service_1 = require("./site.service");
const site_repository_1 = require("./site.repository");
const site_entity_1 = require("./entity/site.entity");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const site_provider_entity_1 = require("./entity/site-provider.entity");
const ip_blacklist_entity_1 = require("./entity/ip-blacklist.entity");
const ip_whitelist_entity_1 = require("./entity/ip-whitelist.entity");
const site_bonus_level_detail_entity_1 = require("./entity/site-bonus-level-detail.entity");
let SiteModule = class SiteModule {
};
SiteModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt', session: false }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET_KEY,
                signOptions: {
                    expiresIn: parseInt(process.env.JWT_EXPIRES),
                }
            }),
            typeorm_1.TypeOrmModule.forFeature([site_entity_1.Site, site_provider_entity_1.SiteProvider, ip_blacklist_entity_1.IpBlacklist, ip_whitelist_entity_1.IpWhitelist, site_bonus_level_detail_entity_1.SiteBonusLevelDetail]),
        ],
        controllers: [site_controller_1.SiteController],
        providers: [site_service_1.SiteService, site_repository_1.SiteRepository],
        exports: [site_repository_1.SiteRepository],
    })
], SiteModule);
exports.SiteModule = SiteModule;
//# sourceMappingURL=site.module.js.map