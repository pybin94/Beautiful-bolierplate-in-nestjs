"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryModule = void 0;
const common_1 = require("@nestjs/common");
const history_controller_1 = require("./history.controller");
const history_service_1 = require("./history.service");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const history_repository_1 = require("./history.repository");
const log_user_money_entity_1 = require("../log/entity/log-user-money.entity");
const log_user_point_entity_1 = require("../log/entity/log-user-point.entity");
const log_admin_money_entity_1 = require("../log/entity/log-admin-money.entity");
const log_admin_point_entity_1 = require("../log/entity/log-admin-point.entity");
const log_site_money_entity_1 = require("../log/entity/log-site-money.entity");
const admin_module_1 = require("../admin/admin.module");
const user_module_1 = require("../user/user.module");
const log_user_thirdparty_money_entity_1 = require("../log/entity/log-user-thirdparty-money.entity");
let HistoryModule = class HistoryModule {
};
HistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            admin_module_1.AdminModule,
            user_module_1.UserModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt', session: false }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET_KEY,
                signOptions: {
                    expiresIn: parseInt(process.env.JWT_EXPIRES),
                }
            }),
            typeorm_1.TypeOrmModule.forFeature([log_user_money_entity_1.LogUserMoney, log_user_point_entity_1.LogUserPoint, log_admin_money_entity_1.LogAdminMoney, log_admin_point_entity_1.LogAdminPoint, log_site_money_entity_1.LogSiteMoney, log_user_thirdparty_money_entity_1.LogUserThirdpartyMoney]),
        ],
        controllers: [history_controller_1.HistoryController],
        providers: [history_service_1.HistoryService, history_repository_1.HistoryRepository]
    })
], HistoryModule);
exports.HistoryModule = HistoryModule;
//# sourceMappingURL=history.module.js.map