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
exports.bettingMinigame = void 0;
const typeorm_1 = require("typeorm");
const site_entity_1 = require("../site/entity/site.entity");
const user_entity_1 = require("../user/entity/user.entity");
let bettingMinigame = class bettingMinigame {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], bettingMinigame.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => site_entity_1.Site, site => site.id),
    (0, typeorm_1.JoinColumn)({ name: "site_id" }),
    __metadata("design:type", Number)
], bettingMinigame.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.User, user => user.id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], bettingMinigame.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'minigame_id' }),
    __metadata("design:type", String)
], bettingMinigame.prototype, "minigameId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'transaction_id', type: 'int' }),
    __metadata("design:type", Number)
], bettingMinigame.prototype, "round", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'day_round', type: 'int' }),
    __metadata("design:type", Number)
], bettingMinigame.prototype, "dayRound", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'selected_bet' }),
    __metadata("design:type", Number)
], bettingMinigame.prototype, "selectedBet", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bet_amount', type: 'int' }),
    __metadata("design:type", Number)
], bettingMinigame.prototype, "betAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'result_amount', type: 'int' }),
    __metadata("design:type", Number)
], bettingMinigame.prototype, "resultAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'valid_amount', type: 'int' }),
    __metadata("design:type", Number)
], bettingMinigame.prototype, "valid_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bet_result' }),
    __metadata("design:type", String)
], bettingMinigame.prototype, "betResult", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_calculated', type: 'tinyint', comment: '정산 여부 - 0: 미정산, 1: 정산완료, 2: 누락' }),
    __metadata("design:type", Number)
], bettingMinigame.prototype, "isCalculated", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'game_result' }),
    __metadata("design:type", String)
], bettingMinigame.prototype, "gameResult", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'betting_at' }),
    __metadata("design:type", String)
], bettingMinigame.prototype, "bettingAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'calculated_at' }),
    __metadata("design:type", String)
], bettingMinigame.prototype, "calculatedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], bettingMinigame.prototype, "createdAt", void 0);
bettingMinigame = __decorate([
    (0, typeorm_1.Entity)({ name: 'betting_minigame' }),
    (0, typeorm_1.Unique)(['id'])
], bettingMinigame);
exports.bettingMinigame = bettingMinigame;
//# sourceMappingURL=betting-minigame.entity.js.map