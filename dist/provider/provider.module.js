"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderModule = void 0;
const user_module_1 = require("../user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const provider_controller_1 = require("./provider.controller");
const provider_entity_1 = require("./entity/provider.entity");
const provider_service_1 = require("./provider.service");
const provider_repository_1 = require("./provider.repository");
const provider_thirdparty_entity_1 = require("./entity/provider-thirdparty.entity");
const union_1 = require("./provider/union");
const major_1 = require("./provider/major");
const provider_thirdparty_site_entity_1 = require("./entity/provider-thirdparty-site.entity");
const log_module_1 = require("../log/log.module");
const site_provider_entity_1 = require("../site/entity/site-provider.entity");
let ProviderModule = class ProviderModule {
};
ProviderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            log_module_1.LogModule,
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt', session: false }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET_KEY,
                signOptions: {
                    expiresIn: parseInt(process.env.JWT_EXPIRES),
                }
            }),
            typeorm_1.TypeOrmModule.forFeature([provider_entity_1.Provider, provider_thirdparty_entity_1.ProviderThirdparty, provider_thirdparty_site_entity_1.ProviderThirdpartySite, site_provider_entity_1.SiteProvider]),
        ],
        controllers: [provider_controller_1.ProviderController],
        providers: [
            provider_service_1.ProviderService,
            provider_repository_1.ProviderRepository,
            union_1.UnionService,
            major_1.MajorService,
        ],
        exports: [provider_service_1.ProviderService]
    })
], ProviderModule);
exports.ProviderModule = ProviderModule;
//# sourceMappingURL=provider.module.js.map