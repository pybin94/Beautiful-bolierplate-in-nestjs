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
exports.User = void 0;
const site_entity_1 = require("../../site/entity/site.entity");
const typeorm_1 = require("typeorm");
const admin_entity_1 = require("../../admin/entity/admin.entity");
const notice_message_user_entity_1 = require("../../notice/entity/notice-message-user.entity");
const notice_message_boradcast_user_entity_1 = require("../../notice/entity/notice-message-boradcast-user.entity");
const log_user_money_entity_1 = require("../../log/entity/log-user-money.entity");
const log_user_point_entity_1 = require("../../log/entity/log-user-point.entity");
const log_user_rolling_entity_1 = require("../../log/entity/log-user-rolling.entity");
const user_commission_rate_entity_1 = require("./user-commission-rate.entity");
const log_admin_money_entity_1 = require("../../log/entity/log-admin-money.entity");
const log_admin_point_entity_1 = require("../../log/entity/log-admin-point.entity");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => site_entity_1.Site, site => site.id),
    (0, typeorm_1.JoinColumn)({ name: "site_id" }),
    __metadata("design:type", Number)
], User.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => admin_entity_1.Admin, admin => admin.id),
    (0, typeorm_1.JoinColumn)({ name: "top_id" }),
    __metadata("design:type", Number)
], User.prototype, "topId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], User.prototype, "identity", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nick_name', length: 20 }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone_number' }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "memo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "point", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], User.prototype, "bank", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'account_number', type: 'bigint' }),
    __metadata("design:type", Number)
], User.prototype, "accountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'account_holder', length: 20 }),
    __metadata("design:type", String)
], User.prototype, "accountHolder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'recommender_id', length: 20, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "recommenderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bonus_level', type: 'tinyint', default: 1 }),
    __metadata("design:type", Number)
], User.prototype, "bonusLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'betting_limit_level', type: 'tinyint', default: 1 }),
    __metadata("design:type", Number)
], User.prototype, "bettingLimitLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'tinyint', default: 0, comment: '0: 가입 승인, 1: 가입 신청, 2: 가입 대기' }),
    __metadata("design:type", Number)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'join_ip', length: 45, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "joinIp", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'latest_ip', length: 45, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "latestIp", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signin_count', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "signinCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_referer', type: 'tinyint', width: 1, default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "isReferer", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', name: 'latest_at', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "latestAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'blocked_at', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "blockedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => user_commission_rate_entity_1.UserCommissionRate, userCommissionRate => userCommissionRate.userId),
    __metadata("design:type", user_commission_rate_entity_1.UserCommissionRate)
], User.prototype, "userCommissionRate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => notice_message_user_entity_1.NoticeMessageUser, noticeMessageUser => noticeMessageUser.userId),
    __metadata("design:type", Array)
], User.prototype, "noticeMessageUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => notice_message_boradcast_user_entity_1.NoticeMessageBroadcastUser, noticeMessageBroadcastUser => noticeMessageBroadcastUser.userId),
    __metadata("design:type", Array)
], User.prototype, "noticeMessageBroadcastUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_admin_money_entity_1.LogAdminMoney, logAdminMoney => logAdminMoney.toUserId),
    __metadata("design:type", Array)
], User.prototype, "logAdminMoney", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_admin_point_entity_1.LogAdminPoint, logAdminPoint => logAdminPoint.toAdminId),
    __metadata("design:type", Array)
], User.prototype, "logAdminPoint", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_user_money_entity_1.LogUserMoney, logUserMoney => logUserMoney.toId),
    __metadata("design:type", Array)
], User.prototype, "logUserMoney", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_user_point_entity_1.LogUserPoint, logUserPoint => logUserPoint.toId),
    __metadata("design:type", Array)
], User.prototype, "logUserPoint", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_user_rolling_entity_1.LogUserRolling, logUserRolling => logUserRolling.userId),
    __metadata("design:type", Array)
], User.prototype, "logUserRolling", void 0);
User = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['identity'])
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map