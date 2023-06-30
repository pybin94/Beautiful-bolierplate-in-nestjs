"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("./entity/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("./user.repository");
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const user_commission_rate_entity_1 = require("./entity/user-commission-rate.entity");
const admin_module_1 = require("../admin/admin.module");
const log_module_1 = require("../log/log.module");
const site_module_1 = require("../site/site.module");
const site_entity_1 = require("../site/entity/site.entity");
const log_user_money_entity_1 = require("../log/entity/log-user-money.entity");
const provider_module_1 = require("../provider/provider.module");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            site_module_1.SiteModule,
            admin_module_1.AdminModule,
            log_module_1.LogModule,
            (0, common_1.forwardRef)(() => provider_module_1.ProviderModule),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, user_commission_rate_entity_1.UserCommissionRate, site_entity_1.Site, log_user_money_entity_1.LogUserMoney]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET_KEY,
                signOptions: {
                    expiresIn: parseInt(process.env.JWT_EXPIRES),
                }
            }),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, user_repository_1.UserRepository],
        exports: [user_repository_1.UserRepository],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map