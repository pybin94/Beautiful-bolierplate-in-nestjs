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
exports.SiteProvider = void 0;
const typeorm_1 = require("typeorm");
const site_entity_1 = require("./site.entity");
const provider_entity_1 = require("../../provider/entity/provider.entity");
let SiteProvider = class SiteProvider {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SiteProvider.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => site_entity_1.Site, site => site.id),
    (0, typeorm_1.JoinColumn)({ name: 'site_id' }),
    __metadata("design:type", Number)
], SiteProvider.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => provider_entity_1.Provider, provider => provider.id),
    (0, typeorm_1.JoinColumn)({ name: 'provider_id' }),
    __metadata("design:type", Number)
], SiteProvider.prototype, "providerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], SiteProvider.prototype, "identity", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], SiteProvider.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], SiteProvider.prototype, "prefix", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SiteProvider.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], SiteProvider.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], SiteProvider.prototype, "updatedAt", void 0);
SiteProvider = __decorate([
    (0, typeorm_1.Entity)({ name: 'site_provider' }),
    (0, typeorm_1.Unique)(['id'])
], SiteProvider);
exports.SiteProvider = SiteProvider;
//# sourceMappingURL=site-provider.entity.js.map