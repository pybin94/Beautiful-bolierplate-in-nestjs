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
var Admin_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const site_entity_1 = require("../../site/entity/site.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entity/user.entity");
const notice_message_admin_entity_1 = require("../../notice/entity/notice-message-admin.entity");
const notice_message_boradcast_admin_entity_1 = require("../../notice/entity/notice-message-boradcast-admin.entity");
const log_user_money_entity_1 = require("../../log/entity/log-user-money.entity");
const log_admin_rolling_entity_1 = require("../../log/entity/log-admin-rolling.entity");
const log_admin_point_entity_1 = require("../../log/entity/log-admin-point.entity");
const log_admin_signin_entity_1 = require("../../log/entity/log-admin-signin.entity");
const admin_commission_rate_entity_1 = require("./admin-commission-rate.entity");
const log_user_point_entity_1 = require("../../log/entity/log-user-point.entity");
const log_admin_money_entity_1 = require("../../log/entity/log-admin-money.entity");
let Admin = Admin_1 = class Admin {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Admin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => site_entity_1.Site, site => site.id),
    (0, typeorm_1.JoinColumn)({ name: "site_id" }),
    __metadata("design:type", Number)
], Admin.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], Admin.prototype, "identity", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], Admin.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nick_name', length: 20 }),
    __metadata("design:type", String)
], Admin.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone_number' }),
    __metadata("design:type", String)
], Admin.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Admin.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'point', type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Admin.prototype, "point", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Admin.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], Admin.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Admin_1, admin => admin.id),
    (0, typeorm_1.JoinColumn)({ name: "top_id" }),
    __metadata("design:type", Number)
], Admin.prototype, "topId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], Admin.prototype, "bank", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'account_number', type: 'bigint' }),
    __metadata("design:type", Number)
], Admin.prototype, "accountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'account_holder', length: 20 }),
    __metadata("design:type", String)
], Admin.prototype, "accountHolder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'join_ip', length: 45, nullable: true }),
    __metadata("design:type", String)
], Admin.prototype, "joinIp", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'latest_ip', length: 45, nullable: true }),
    __metadata("design:type", String)
], Admin.prototype, "latestIp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Admin.prototype, "memo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Admin.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'latest_at', nullable: true }),
    __metadata("design:type", String)
], Admin.prototype, "latestAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'blocked_at', nullable: true }),
    __metadata("design:type", String)
], Admin.prototype, "blockedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => admin_commission_rate_entity_1.AdminCommissionRate, adminCommissionRate => adminCommissionRate.adminId),
    __metadata("design:type", admin_commission_rate_entity_1.AdminCommissionRate)
], Admin.prototype, "adminCommissionRate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => user_entity_1.User, user => user.topId),
    __metadata("design:type", Array)
], Admin.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => notice_message_admin_entity_1.NoticeMessageAdmin, noticeMessageAdmin => { noticeMessageAdmin.sendId, noticeMessageAdmin.receiveId; }),
    __metadata("design:type", Array)
], Admin.prototype, "noticeMessageAdmin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => notice_message_boradcast_admin_entity_1.NoticeMessageBroadcastAdmin, noticeMessageBroadcastAdmin => noticeMessageBroadcastAdmin.adminId),
    __metadata("design:type", Array)
], Admin.prototype, "noticeMessageBroadcastAdmin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_admin_money_entity_1.LogAdminMoney, logAdminMoney => logAdminMoney.toAdminId),
    __metadata("design:type", Array)
], Admin.prototype, "logAdminMoney", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_admin_point_entity_1.LogAdminPoint, logAdminPoint => logAdminPoint.fromId),
    __metadata("design:type", Array)
], Admin.prototype, "logAdminPoint", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_admin_point_entity_1.LogAdminPoint, logToAdminPoint => logToAdminPoint.toAdminId),
    __metadata("design:type", Array)
], Admin.prototype, "logToAdminPoint", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_admin_rolling_entity_1.LogAdminRolling, logAdminRolling => logAdminRolling.adminId),
    __metadata("design:type", Array)
], Admin.prototype, "logAdminRolling", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_admin_signin_entity_1.LogAdminSignin, logAdminSignin => logAdminSignin.adminId),
    __metadata("design:type", Array)
], Admin.prototype, "logAdminSignin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_user_money_entity_1.LogUserMoney, logUserMoney => logUserMoney.fromId),
    __metadata("design:type", Array)
], Admin.prototype, "logUserMoney", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_user_point_entity_1.LogUserPoint, logUserPoint => logUserPoint.fromId),
    __metadata("design:type", Array)
], Admin.prototype, "logUserPoint", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => Admin_1, admin => admin.topId),
    __metadata("design:type", Array)
], Admin.prototype, "children", void 0);
Admin = Admin_1 = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['id'])
], Admin);
exports.Admin = Admin;
//# sourceMappingURL=admin.entity.js.map