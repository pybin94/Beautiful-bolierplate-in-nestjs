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
exports.LogAdminMoney = void 0;
const typeorm_1 = require("typeorm");
const site_entity_1 = require("../../site/entity/site.entity");
const admin_entity_1 = require("../../admin/entity/admin.entity");
const user_entity_1 = require("../../user/entity/user.entity");
let LogAdminMoney = class LogAdminMoney {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LogAdminMoney.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => site_entity_1.Site, site => site.id),
    (0, typeorm_1.JoinColumn)({ name: "site_id" }),
    __metadata("design:type", Number)
], LogAdminMoney.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => admin_entity_1.Admin, admin => admin.id),
    (0, typeorm_1.JoinColumn)({ name: 'from_id' }),
    __metadata("design:type", Number)
], LogAdminMoney.prototype, "fromId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => admin_entity_1.Admin, admin => admin.id),
    (0, typeorm_1.JoinColumn)({ name: 'to_admin_id' }),
    __metadata("design:type", Number)
], LogAdminMoney.prototype, "toAdminId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.User, toUser => toUser.id),
    (0, typeorm_1.JoinColumn)({ name: 'to_user_id' }),
    __metadata("design:type", Number)
], LogAdminMoney.prototype, "toUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], LogAdminMoney.prototype, "money", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'previous_balance', type: 'decimal', precision: 12, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], LogAdminMoney.prototype, "previousBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'post_balance', type: 'decimal', precision: 12, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], LogAdminMoney.prototype, "postBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'transaction_type', type: 'tinyint', comment: '1: 입금, 2: 출금, 3: 상위 에이전트 지급, 4: 상위 에이전트 회수, 5: 하위 에이전트 지급, 6: 하위 에이전트 회수, 7: 플레이어 지급, 8: 플레이어 회수, 9: 포인트 전환' }),
    __metadata("design:type", Number)
], LogAdminMoney.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', comment: '0: 취소, 1: 신청, 2: 대기, 3: 완료' }),
    __metadata("design:type", Number)
], LogAdminMoney.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45 }),
    __metadata("design:type", String)
], LogAdminMoney.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LogAdminMoney.prototype, "memo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], LogAdminMoney.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], LogAdminMoney.prototype, "updatedAt", void 0);
LogAdminMoney = __decorate([
    (0, typeorm_1.Entity)({ name: 'log_admin_money' }),
    (0, typeorm_1.Unique)(['id'])
], LogAdminMoney);
exports.LogAdminMoney = LogAdminMoney;
//# sourceMappingURL=log-admin-money.entity.js.map