"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogModule = void 0;
const common_1 = require("@nestjs/common");
const log_repository_1 = require("./log.repository");
const typeorm_1 = require("@nestjs/typeorm");
const log_site_money_entity_1 = require("./entity/log-site-money.entity");
const log_admin_money_entity_1 = require("./entity/log-admin-money.entity");
const log_admin_point_entity_1 = require("./entity/log-admin-point.entity");
const log_admin_rolling_entity_1 = require("./entity/log-admin-rolling.entity");
const log_admin_signin_entity_1 = require("./entity/log-admin-signin.entity");
const log_user_money_entity_1 = require("./entity/log-user-money.entity");
const log_user_point_entity_1 = require("./entity/log-user-point.entity");
const log_user_rolling_entity_1 = require("./entity/log-user-rolling.entity");
const log_user_signin_entity_1 = require("./entity/log-user-signin.entity");
const log_user_thirdparty_money_entity_1 = require("./entity/log-user-thirdparty-money.entity");
let LogModule = class LogModule {
};
LogModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                log_site_money_entity_1.LogSiteMoney,
                log_admin_money_entity_1.LogAdminMoney,
                log_admin_point_entity_1.LogAdminPoint,
                log_admin_rolling_entity_1.LogAdminRolling,
                log_admin_signin_entity_1.LogAdminSignin,
                log_user_money_entity_1.LogUserMoney,
                log_user_point_entity_1.LogUserPoint,
                log_user_rolling_entity_1.LogUserRolling,
                log_user_signin_entity_1.LogUserSignin,
                log_user_thirdparty_money_entity_1.LogUserThirdpartyMoney,
            ]),
        ],
        controllers: [],
        providers: [log_repository_1.LogRepository],
        exports: [log_repository_1.LogRepository],
    })
], LogModule);
exports.LogModule = LogModule;
//# sourceMappingURL=log.module.js.map