"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const admin_repository_1 = require("./admin.repository");
const common_1 = require("@nestjs/common");
const admin_controller_1 = require("./admin.controller");
const admin_service_1 = require("./admin.service");
const admin_entity_1 = require("./entity/admin.entity");
const admin_commission_rate_entity_1 = require("./entity/admin-commission-rate.entity");
const log_module_1 = require("../log/log.module");
const site_module_1 = require("../site/site.module");
const log_admin_money_entity_1 = require("../log/entity/log-admin-money.entity");
const site_entity_1 = require("../site/entity/site.entity");
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            site_module_1.SiteModule,
            log_module_1.LogModule,
            typeorm_1.TypeOrmModule.forFeature([admin_entity_1.Admin, site_entity_1.Site, log_admin_money_entity_1.LogAdminMoney, admin_commission_rate_entity_1.AdminCommissionRate]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET_KEY,
                signOptions: {
                    expiresIn: parseInt(process.env.JWT_EXPIRES),
                }
            }),
        ],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService, admin_repository_1.AdminRepository],
        exports: [admin_repository_1.AdminRepository],
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map