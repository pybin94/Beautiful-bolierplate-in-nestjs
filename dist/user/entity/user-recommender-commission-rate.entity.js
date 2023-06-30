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
exports.UserRecommenderCommissionRate = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UserRecommenderCommissionRate = class UserRecommenderCommissionRate {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserRecommenderCommissionRate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.User, user => user.id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], UserRecommenderCommissionRate.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'casino_rolling_rate', type: 'decimal', precision: 3, scale: 1 }),
    __metadata("design:type", Number)
], UserRecommenderCommissionRate.prototype, "casinoRollingRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'casino_losing_rate', type: 'decimal', precision: 3, scale: 1 }),
    __metadata("design:type", Number)
], UserRecommenderCommissionRate.prototype, "casinoLosingRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'slot_rolling_rate', type: 'decimal', precision: 3, scale: 1 }),
    __metadata("design:type", Number)
], UserRecommenderCommissionRate.prototype, "slotRollingRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'slot_losing_rate', type: 'decimal', precision: 3, scale: 1 }),
    __metadata("design:type", Number)
], UserRecommenderCommissionRate.prototype, "slotLosingRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'minigame_rolling_rate', type: 'decimal', precision: 3, scale: 1 }),
    __metadata("design:type", Number)
], UserRecommenderCommissionRate.prototype, "minigameRollingRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'minigame_losing_rate', type: 'decimal', precision: 3, scale: 1 }),
    __metadata("design:type", Number)
], UserRecommenderCommissionRate.prototype, "minigameLosingRate", void 0);
UserRecommenderCommissionRate = __decorate([
    (0, typeorm_1.Entity)({ name: 'user_recommender_commission_rate' }),
    (0, typeorm_1.Unique)(['id'])
], UserRecommenderCommissionRate);
exports.UserRecommenderCommissionRate = UserRecommenderCommissionRate;
//# sourceMappingURL=user-recommender-commission-rate.entity.js.map