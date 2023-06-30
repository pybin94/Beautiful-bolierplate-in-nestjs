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
exports.AppModule = void 0;
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_config_1 = require("./config/typeorm.config");
const auth_module_1 = require("./auth/auth.module");
const admin_module_1 = require("./admin/admin.module");
const user_module_1 = require("./user/user.module");
const site_module_1 = require("./site/site.module");
const notice_module_1 = require("./notice/notice.module");
const log_module_1 = require("./log/log.module");
const transaction_module_1 = require("./transaction/transaction.module");
const IP_block_middleware_1 = require("./middleware/IP-block.middleware");
const history_module_1 = require("./history/history.module");
const provider_module_1 = require("./provider/provider.module");
let AppModule = class AppModule {
    constructor(ipBlockMiddleware) {
        this.ipBlockMiddleware = ipBlockMiddleware;
    }
    configure(consumer) {
        consumer.apply(this.ipBlockMiddleware.use.bind(this.ipBlockMiddleware)).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET_KEY,
                signOptions: {
                    expiresIn: parseInt(process.env.JWT_EXPIRES),
                }
            }),
            typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.typeORMConfig),
            auth_module_1.AuthModule,
            history_module_1.HistoryModule,
            admin_module_1.AdminModule,
            user_module_1.UserModule,
            site_module_1.SiteModule,
            provider_module_1.ProviderModule,
            notice_module_1.NoticeModule,
            log_module_1.LogModule,
            transaction_module_1.TransactionModule,
        ],
        providers: [IP_block_middleware_1.IPBlockMiddleware],
    }),
    __metadata("design:paramtypes", [IP_block_middleware_1.IPBlockMiddleware])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map