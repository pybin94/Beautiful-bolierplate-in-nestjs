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
exports.Provider = void 0;
const site_provider_entity_1 = require("../../site/entity/site-provider.entity");
const typeorm_1 = require("typeorm");
const provider_thirdparty_entity_1 = require("./provider-thirdparty.entity");
let Provider = class Provider {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Provider.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45 }),
    __metadata("design:type", String)
], Provider.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({}),
    __metadata("design:type", String)
], Provider.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint' }),
    __metadata("design:type", Number)
], Provider.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Provider.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Provider.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => site_provider_entity_1.SiteProvider, siteProvider => siteProvider.providerId),
    __metadata("design:type", Array)
], Provider.prototype, "siteProvider", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => provider_thirdparty_entity_1.ProviderThirdparty, providerThirdparty => providerThirdparty.providerId),
    __metadata("design:type", Array)
], Provider.prototype, "providerThirdparty", void 0);
Provider = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['id'])
], Provider);
exports.Provider = Provider;
//# sourceMappingURL=provider.entity.js.map