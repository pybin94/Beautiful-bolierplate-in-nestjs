"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModule = void 0;
const common_1 = require("@nestjs/common");
const transaction_controller_1 = require("./transaction.controller");
const transaction_service_1 = require("./transaction.service");
const transaction_repository_1 = require("./transaction.repository");
const log_module_1 = require("../log/log.module");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const log_admin_money_entity_1 = require("../log/entity/log-admin-money.entity");
const log_user_money_entity_1 = require("../log/entity/log-user-money.entity");
let TransactionModule = class TransactionModule {
};
TransactionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            log_module_1.LogModule,
            typeorm_1.TypeOrmModule.forFeature([log_admin_money_entity_1.LogAdminMoney, log_user_money_entity_1.LogUserMoney]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET_KEY,
                signOptions: {
                    expiresIn: parseInt(process.env.JWT_EXPIRES),
                }
            }),
        ],
        controllers: [transaction_controller_1.TransactionController],
        providers: [transaction_service_1.TransactionService, transaction_repository_1.TransactionRepository]
    })
], TransactionModule);
exports.TransactionModule = TransactionModule;
//# sourceMappingURL=transaction.module.js.map