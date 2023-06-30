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
exports.LogUserThirdpartyMoney = void 0;
const typeorm_1 = require("typeorm");
const site_entity_1 = require("../../site/entity/site.entity");
const user_entity_1 = require("../../user/entity/user.entity");
const provider_thirdparty_entity_1 = require("../../provider/entity/provider-thirdparty.entity");
let LogUserThirdpartyMoney = class LogUserThirdpartyMoney {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LogUserThirdpartyMoney.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => site_entity_1.Site, site => site.id),
    (0, typeorm_1.JoinColumn)({ name: "site_id" }),
    __metadata("design:type", Number)
], LogUserThirdpartyMoney.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.User, user => user.id),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", Number)
], LogUserThirdpartyMoney.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => provider_thirdparty_entity_1.ProviderThirdparty, providerThirdparty => providerThirdparty.id),
    (0, typeorm_1.JoinColumn)({ name: "provider_thirdparty_id" }),
    __metadata("design:type", String)
], LogUserThirdpartyMoney.prototype, "providerThirdpartyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "provider_thirdparty_game_name", nullable: true }),
    __metadata("design:type", String)
], LogUserThirdpartyMoney.prototype, "providerThirdpartyGameName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_balance", type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], LogUserThirdpartyMoney.prototype, "userBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "provider_balance", type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], LogUserThirdpartyMoney.prototype, "providerBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "total_Balance", type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], LogUserThirdpartyMoney.prototype, "totalBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', comment: '1: 플레이어->게임사, 2: 게임사->플레이어' }),
    __metadata("design:type", Number)
], LogUserThirdpartyMoney.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], LogUserThirdpartyMoney.prototype, "createdAt", void 0);
LogUserThirdpartyMoney = __decorate([
    (0, typeorm_1.Entity)({ name: 'log_user_thirdparty_money' }),
    (0, typeorm_1.Unique)(['id'])
], LogUserThirdpartyMoney);
exports.LogUserThirdpartyMoney = LogUserThirdpartyMoney;
//# sourceMappingURL=log-user-thirdparty-money.entity.js.map