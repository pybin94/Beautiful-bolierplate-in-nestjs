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
exports.ProviderThirdparty = void 0;
const typeorm_1 = require("typeorm");
const provider_entity_1 = require("./provider.entity");
const provider_thirdparty_site_entity_1 = require("./provider-thirdparty-site.entity");
const log_user_thirdparty_money_entity_1 = require("../../log/entity/log-user-thirdparty-money.entity");
let ProviderThirdparty = class ProviderThirdparty {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProviderThirdparty.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => provider_entity_1.Provider, provider => provider.id),
    (0, typeorm_1.JoinColumn)({ name: "provider_id" }),
    __metadata("design:type", Number)
], ProviderThirdparty.prototype, "providerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45 }),
    __metadata("design:type", String)
], ProviderThirdparty.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name_en', length: 45 }),
    __metadata("design:type", String)
], ProviderThirdparty.prototype, "nameEn", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '게임사 게임 접속 코드(CODE) 또는 키(KEY)' }),
    __metadata("design:type", String)
], ProviderThirdparty.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', comment: '1: 카지노, 2: 슬롯, 3: 호텔 카지노' }),
    __metadata("design:type", Number)
], ProviderThirdparty.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_lobby', type: 'int', comment: '게임사 로비 사용 여부 - 0: 미사용, 1: 사용' }),
    __metadata("design:type", Number)
], ProviderThirdparty.prototype, "isLobby", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ProviderThirdparty.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ProviderThirdparty.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => provider_thirdparty_site_entity_1.ProviderThirdpartySite, providerThirdpartySite => providerThirdpartySite.providerThirdpartyId),
    __metadata("design:type", Array)
], ProviderThirdparty.prototype, "providerThirdpartySite", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_user_thirdparty_money_entity_1.LogUserThirdpartyMoney, logUserThirdpartyMoney => logUserThirdpartyMoney.providerThirdpartyId),
    __metadata("design:type", Array)
], ProviderThirdparty.prototype, "logUserThirdpartyMoney", void 0);
ProviderThirdparty = __decorate([
    (0, typeorm_1.Entity)({ name: 'provider_thirdparty' }),
    (0, typeorm_1.Unique)(['id'])
], ProviderThirdparty);
exports.ProviderThirdparty = ProviderThirdparty;
//# sourceMappingURL=provider-thirdparty.entity.js.map