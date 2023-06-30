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
exports.SiteBonusLevelDetail = void 0;
const typeorm_1 = require("typeorm");
const site_entity_1 = require("./site.entity");
let SiteBonusLevelDetail = class SiteBonusLevelDetail {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SiteBonusLevelDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => site_entity_1.Site, site => site.id),
    (0, typeorm_1.JoinColumn)({ name: "site_id" }),
    __metadata("design:type", Number)
], SiteBonusLevelDetail.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "tinyint" }),
    __metadata("design:type", Number)
], SiteBonusLevelDetail.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "first_bonus_limit", type: "int", comment: "첫충 최대", default: 0 }),
    __metadata("design:type", Number)
], SiteBonusLevelDetail.prototype, "firstBonusLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "new_bonus_limit", type: "int", comment: "신규 최대", default: 0 }),
    __metadata("design:type", Number)
], SiteBonusLevelDetail.prototype, "newBonusLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "every_bonus_limit", type: "int", comment: "매충 최대", default: 0 }),
    __metadata("design:type", Number)
], SiteBonusLevelDetail.prototype, "everyBonusLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "daily_bonus_limit", type: "int", comment: "일일 최대", default: 0 }),
    __metadata("design:type", Number)
], SiteBonusLevelDetail.prototype, "dailyBonusLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "first_deposit_rate", type: "tinyint", comment: "첫충 %", default: 0 }),
    __metadata("design:type", Number)
], SiteBonusLevelDetail.prototype, "firstDepositRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "every_deposit_rate", type: "tinyint", comment: "매충 %", default: 0 }),
    __metadata("design:type", Number)
], SiteBonusLevelDetail.prototype, "everyDepositRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "new_deposit_rate", type: "tinyint", comment: "신규 %", default: 0 }),
    __metadata("design:type", Number)
], SiteBonusLevelDetail.prototype, "newDepositRate", void 0);
SiteBonusLevelDetail = __decorate([
    (0, typeorm_1.Entity)({ name: 'site_bonus_level_detail' }),
    (0, typeorm_1.Unique)(['id'])
], SiteBonusLevelDetail);
exports.SiteBonusLevelDetail = SiteBonusLevelDetail;
//# sourceMappingURL=site-bonus-level-detail.entity.js.map