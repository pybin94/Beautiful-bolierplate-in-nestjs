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
exports.AdminCommissionRate = void 0;
const typeorm_1 = require("typeorm");
const admin_entity_1 = require("./admin.entity");
let AdminCommissionRate = class AdminCommissionRate {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AdminCommissionRate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => admin_entity_1.Admin, admin => admin.id),
    (0, typeorm_1.JoinColumn)({ name: "admin_id" }),
    __metadata("design:type", Number)
], AdminCommissionRate.prototype, "adminId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'casino_rolling_rate', type: 'decimal', precision: 3, scale: 1, default: 0 }),
    __metadata("design:type", Number)
], AdminCommissionRate.prototype, "casinoRollingRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'casino_losing_rate', type: 'decimal', precision: 3, scale: 1, default: 0 }),
    __metadata("design:type", Number)
], AdminCommissionRate.prototype, "casinoLosingRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'casino_ommitting_rate', type: 'decimal', precision: 3, scale: 1, default: 0 }),
    __metadata("design:type", Number)
], AdminCommissionRate.prototype, "casinoOmittingRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'slot_rolling_rate', type: 'decimal', precision: 3, scale: 1, default: 0 }),
    __metadata("design:type", Number)
], AdminCommissionRate.prototype, "slotRollingRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'slot_losing_rate', type: 'decimal', precision: 3, scale: 1, default: 0 }),
    __metadata("design:type", Number)
], AdminCommissionRate.prototype, "slotLosingRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'slot_ommitting_rate', type: 'decimal', precision: 3, scale: 1, default: 0 }),
    __metadata("design:type", Number)
], AdminCommissionRate.prototype, "slotOmittingRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'minigame_rolling_rate', type: 'decimal', precision: 3, scale: 1, default: 0 }),
    __metadata("design:type", Number)
], AdminCommissionRate.prototype, "minigameRollingRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'minigame_losing_rate', type: 'decimal', precision: 3, scale: 1, default: 0 }),
    __metadata("design:type", Number)
], AdminCommissionRate.prototype, "minigameLosingRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'minigame_ommitting_rate', type: 'decimal', precision: 3, scale: 1, default: 0 }),
    __metadata("design:type", Number)
], AdminCommissionRate.prototype, "minigameOmittingRate", void 0);
AdminCommissionRate = __decorate([
    (0, typeorm_1.Entity)({ name: 'admin_commission_rate' }),
    (0, typeorm_1.Unique)(['id'])
], AdminCommissionRate);
exports.AdminCommissionRate = AdminCommissionRate;
//# sourceMappingURL=admin-commission-rate.entity.js.map