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
exports.ProviderThirdpartySite = void 0;
const typeorm_1 = require("typeorm");
const provider_thirdparty_entity_1 = require("./provider-thirdparty.entity");
const site_entity_1 = require("../../site/entity/site.entity");
let ProviderThirdpartySite = class ProviderThirdpartySite {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProviderThirdpartySite.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => site_entity_1.Site, site => site.id),
    (0, typeorm_1.JoinColumn)({ name: "site_id" }),
    __metadata("design:type", Number)
], ProviderThirdpartySite.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => provider_thirdparty_entity_1.ProviderThirdparty, providerThirdparty => providerThirdparty.id),
    (0, typeorm_1.JoinColumn)({ name: "provider_thirdparty_id" }),
    __metadata("design:type", Number)
], ProviderThirdpartySite.prototype, "providerThirdpartyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', comment: '0: 비활성화, 1: 활성화', default: 1 }),
    __metadata("design:type", Number)
], ProviderThirdpartySite.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ProviderThirdpartySite.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'datetime',
        name: 'updated_at',
        nullable: true,
    }),
    __metadata("design:type", Date)
], ProviderThirdpartySite.prototype, "updatedAt", void 0);
ProviderThirdpartySite = __decorate([
    (0, typeorm_1.Entity)({ name: 'provider_thirdparty_site' }),
    (0, typeorm_1.Unique)(['id'])
], ProviderThirdpartySite);
exports.ProviderThirdpartySite = ProviderThirdpartySite;
//# sourceMappingURL=provider-thirdparty-site.entity.js.map