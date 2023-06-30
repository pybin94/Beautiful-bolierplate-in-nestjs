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
exports.bettingCasino = void 0;
const provider_thirdparty_entity_1 = require("../provider/entity/provider-thirdparty.entity");
const typeorm_1 = require("typeorm");
const site_entity_1 = require("../site/entity/site.entity");
const user_entity_1 = require("../user/entity/user.entity");
let bettingCasino = class bettingCasino {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], bettingCasino.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => site_entity_1.Site, site => site.id),
    (0, typeorm_1.JoinColumn)({ name: "site_id" }),
    __metadata("design:type", Number)
], bettingCasino.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.User, user => user.id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], bettingCasino.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => provider_thirdparty_entity_1.ProviderThirdparty, providerThirdparty => providerThirdparty.id),
    (0, typeorm_1.JoinColumn)({ name: 'provider_thirdparty_id' }),
    __metadata("design:type", Number)
], bettingCasino.prototype, "providerThirdpartyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'transaction_id', comment: '1: bet+win 2: bet 3: win' }),
    __metadata("design:type", String)
], bettingCasino.prototype, "transationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'transaction_type' }),
    __metadata("design:type", String)
], bettingCasino.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'selected_bet', comment: '0: 정보없음, 1: 벵커, 2: 플레이어, 3: 타이' }),
    __metadata("design:type", Number)
], bettingCasino.prototype, "selectedBet", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bet_amount', type: 'int' }),
    __metadata("design:type", Number)
], bettingCasino.prototype, "betAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'result_amount', type: 'int' }),
    __metadata("design:type", Number)
], bettingCasino.prototype, "resultAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'valid_amount', type: 'int' }),
    __metadata("design:type", Number)
], bettingCasino.prototype, "validAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bet_result' }),
    __metadata("design:type", String)
], bettingCasino.prototype, "betResult", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_calculated', type: 'tinyint', comment: '정산 여부 - 0: 미정산, 1: 정산완료, 2: 누락' }),
    __metadata("design:type", Number)
], bettingCasino.prototype, "isCalculated", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'game_name' }),
    __metadata("design:type", String)
], bettingCasino.prototype, "gameName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'banker_card' }),
    __metadata("design:type", String)
], bettingCasino.prototype, "bankerCard", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'player_card' }),
    __metadata("design:type", String)
], bettingCasino.prototype, "playerCard", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'win_side' }),
    __metadata("design:type", String)
], bettingCasino.prototype, "winSide", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'betting_at' }),
    __metadata("design:type", String)
], bettingCasino.prototype, "bettingAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'calculated_at' }),
    __metadata("design:type", String)
], bettingCasino.prototype, "calculatedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], bettingCasino.prototype, "createdAt", void 0);
bettingCasino = __decorate([
    (0, typeorm_1.Entity)({ name: 'betting_casino' }),
    (0, typeorm_1.Unique)(['id'])
], bettingCasino);
exports.bettingCasino = bettingCasino;
//# sourceMappingURL=betting-casino.entity.js.map