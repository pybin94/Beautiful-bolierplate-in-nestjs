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
exports.Site = void 0;
const ip_whitelist_entity_1 = require("./ip-whitelist.entity");
const ip_blacklist_entity_1 = require("./ip-blacklist.entity");
const user_entity_1 = require("../../user/entity/user.entity");
const typeorm_1 = require("typeorm");
const admin_entity_1 = require("../../admin/entity/admin.entity");
const site_provider_entity_1 = require("./site-provider.entity");
const notice_popup_entity_1 = require("../../notice/entity/notice-popup.entity");
const notice_admin_entity_1 = require("../../notice/entity/notice-admin.entity");
const notice_user_entity_1 = require("../../notice/entity/notice-user.entity");
const notice_message_user_entity_1 = require("../../notice/entity/notice-message-user.entity");
const notice_message_admin_entity_1 = require("../../notice/entity/notice-message-admin.entity");
const notice_message_boradcast_admin_entity_1 = require("../../notice/entity/notice-message-boradcast-admin.entity");
const notice_message_boradcast_user_entity_1 = require("../../notice/entity/notice-message-boradcast-user.entity");
const provider_thirdparty_site_entity_1 = require("../../provider/entity/provider-thirdparty-site.entity");
const log_admin_money_entity_1 = require("../../log/entity/log-admin-money.entity");
const log_admin_point_entity_1 = require("../../log/entity/log-admin-point.entity");
const log_site_money_entity_1 = require("../../log/entity/log-site-money.entity");
const log_admin_rolling_entity_1 = require("../../log/entity/log-admin-rolling.entity");
const log_user_money_entity_1 = require("../../log/entity/log-user-money.entity");
const log_user_point_entity_1 = require("../../log/entity/log-user-point.entity");
const log_user_rolling_entity_1 = require("../../log/entity/log-user-rolling.entity");
const log_user_signin_entity_1 = require("../../log/entity/log-user-signin.entity");
const log_admin_signin_entity_1 = require("../../log/entity/log-admin-signin.entity");
const site_bonus_level_detail_entity_1 = require("./site-bonus-level-detail.entity");
const notice_message_template_admin_entity_1 = require("../../notice/entity/notice-message-template-admin.entity");
const notice_message_template_user_entity_1 = require("../../notice/entity/notice-message-template-user.entity");
let Site = class Site {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Site.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], Site.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'balance' }),
    __metadata("design:type", Number)
], Site.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "casino_rolling_rate_max", type: 'decimal', precision: 3, scale: 1, default: 10 }),
    __metadata("design:type", Number)
], Site.prototype, "casinoRollingRateMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "casino_losing_rate_max", type: 'decimal', precision: 3, scale: 1, default: 10 }),
    __metadata("design:type", Number)
], Site.prototype, "casinoLosingRateMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "casino_omitting_rate_max", type: 'decimal', precision: 3, scale: 1, default: 10 }),
    __metadata("design:type", Number)
], Site.prototype, "casinoOmittingRateMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "slot_rolling_rate_max", type: 'decimal', precision: 3, scale: 1, default: 10 }),
    __metadata("design:type", Number)
], Site.prototype, "slotRollingRateMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "slot_losing_rate_max", type: 'decimal', precision: 3, scale: 1, default: 10 }),
    __metadata("design:type", Number)
], Site.prototype, "slotLosingRateMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "slot_omitting_rate_max", type: 'decimal', precision: 3, scale: 1, default: 10 }),
    __metadata("design:type", Number)
], Site.prototype, "slotOmittingRateMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "minigame_rolling_rate_max", type: 'decimal', precision: 3, scale: 1, default: 10 }),
    __metadata("design:type", Number)
], Site.prototype, "minigameRollingRateMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "minigame_losing_rate_max", type: 'decimal', precision: 3, scale: 1, default: 10 }),
    __metadata("design:type", Number)
], Site.prototype, "minigameLosingRateMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "minigame_omitting_rate_max", type: 'decimal', precision: 3, scale: 1, default: 10 }),
    __metadata("design:type", Number)
], Site.prototype, "minigameOmittingRateMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "first_bonus_limit", type: "int", default: 0, comment: "첫충 최대" }),
    __metadata("design:type", Number)
], Site.prototype, "firstBonusLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "new_bonus_limit", type: "int", default: 0, comment: "신규 최대" }),
    __metadata("design:type", Number)
], Site.prototype, "newBonusLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "every_bonus_limit", type: "int", default: 0, comment: "매충 최대" }),
    __metadata("design:type", Number)
], Site.prototype, "everyBonusLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "daily_bonus_limit", type: "int", default: 0, comment: "일일 최대" }),
    __metadata("design:type", Number)
], Site.prototype, "dailyBonusLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "first_deposit_rate", type: "tinyint", default: 0, comment: "첫충 %" }),
    __metadata("design:type", Number)
], Site.prototype, "firstDepositRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "every_deposit_rate", type: "tinyint", default: 0, comment: "매충 %" }),
    __metadata("design:type", Number)
], Site.prototype, "everyDepositRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "new_deposit_rate", type: "tinyint", default: 0, comment: "신규 %" }),
    __metadata("design:type", Number)
], Site.prototype, "newDepositRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_enabled_casino", type: 'tinyint', default: 1, comment: '0: 비활성화, 1: 활성화' }),
    __metadata("design:type", Number)
], Site.prototype, "isEnabledCasino", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_enabled_slot", type: 'tinyint', default: 1, comment: '0: 비활성화, 1: 활성화' }),
    __metadata("design:type", Number)
], Site.prototype, "isEnabledSlot", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_enabled_minigame", type: 'tinyint', default: 1, comment: '0: 비활성화, 1: 활성화' }),
    __metadata("design:type", Number)
], Site.prototype, "isEnabledMinigame", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_enabled_whitelist", type: 'tinyint', default: 0, comment: '0: 비활성화, 1: 활성화' }),
    __metadata("design:type", Number)
], Site.prototype, "isEnabledWhitelist", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_enabled_bonus_level", type: 'tinyint', default: 1, comment: '0: 비활성화, 1: 활성화, 2: 레벨 사용' }),
    __metadata("design:type", Number)
], Site.prototype, "isEnabledBonusLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_enabled_telegram", type: 'tinyint', default: 1, comment: '0: 비활성화, 1: 활성화' }),
    __metadata("design:type", Number)
], Site.prototype, "isEnabledTelegram", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "telegram_id", nullable: true }),
    __metadata("design:type", String)
], Site.prototype, "telegramId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_enabled_inspection", type: 'tinyint', default: 0, comment: '0: 비활성화, 1: 활성화' }),
    __metadata("design:type", Number)
], Site.prototype, "isEnabledInspection", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "inspection_message", nullable: true, comment: '점검 문구' }),
    __metadata("design:type", String)
], Site.prototype, "inspectionMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Site.prototype, "memo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Site.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Site.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => user_entity_1.User, user => user.siteId),
    __metadata("design:type", Array)
], Site.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => admin_entity_1.Admin, admin => admin.siteId),
    __metadata("design:type", Array)
], Site.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => site_provider_entity_1.SiteProvider, siteProvider => siteProvider.siteId),
    __metadata("design:type", Array)
], Site.prototype, "siteProvider", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => site_bonus_level_detail_entity_1.SiteBonusLevelDetail, siteBonusLevelDetail => siteBonusLevelDetail.siteId),
    __metadata("design:type", Array)
], Site.prototype, "siteBonusLevelDetail", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => provider_thirdparty_site_entity_1.ProviderThirdpartySite, providerThirdpartySite => providerThirdpartySite.siteId),
    __metadata("design:type", Array)
], Site.prototype, "providerThirdpartySite", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => ip_blacklist_entity_1.IpBlacklist, ipBlacklist => ipBlacklist.siteId),
    __metadata("design:type", Array)
], Site.prototype, "ipBlacklist", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => ip_whitelist_entity_1.IpWhitelist, ipWhitelist => ipWhitelist.siteId),
    __metadata("design:type", Array)
], Site.prototype, "ipWhitelist", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => notice_popup_entity_1.NoticePopup, noticePopup => noticePopup.siteId),
    __metadata("design:type", Array)
], Site.prototype, "noticePopup", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => notice_admin_entity_1.NoticeAdmin, noticeAdmin => noticeAdmin.siteId),
    __metadata("design:type", Array)
], Site.prototype, "noticeAdmin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => notice_user_entity_1.NoticeUser, noticeUser => noticeUser.siteId),
    __metadata("design:type", Array)
], Site.prototype, "noticeUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => notice_message_user_entity_1.NoticeMessageUser, noticeMessageUser => noticeMessageUser.siteId),
    __metadata("design:type", Array)
], Site.prototype, "noticeMessageUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => notice_message_admin_entity_1.NoticeMessageAdmin, noticeMessageUser => noticeMessageUser.siteId),
    __metadata("design:type", Array)
], Site.prototype, "noticeMessageAdmin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => notice_message_template_user_entity_1.NoticeMessageTemplateUser, noticeMessageTemplateUser => noticeMessageTemplateUser.siteId),
    __metadata("design:type", Array)
], Site.prototype, "noticeMessageTemplateUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => notice_message_template_admin_entity_1.NoticeMessageTemplateAdmin, noticeMessageTemplateAdmin => noticeMessageTemplateAdmin.siteId),
    __metadata("design:type", Array)
], Site.prototype, "noticeMessageTemplateAdmin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => notice_message_boradcast_user_entity_1.NoticeMessageBroadcastUser, noticeMessageBroadcastUser => noticeMessageBroadcastUser.siteId),
    __metadata("design:type", Array)
], Site.prototype, "noticeMessageBroadcastUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => notice_message_boradcast_admin_entity_1.NoticeMessageBroadcastAdmin, noticeMessageBroadcastAdmin => noticeMessageBroadcastAdmin.siteId),
    __metadata("design:type", Array)
], Site.prototype, "noticeMessageBroadcastAdmin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_admin_money_entity_1.LogAdminMoney, logAdminMoney => logAdminMoney.siteId),
    __metadata("design:type", Array)
], Site.prototype, "logAdminMoney", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_admin_point_entity_1.LogAdminPoint, logAdminPoint => logAdminPoint.siteId),
    __metadata("design:type", Array)
], Site.prototype, "logAdminPoint", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_admin_rolling_entity_1.LogAdminRolling, logAdminRolling => logAdminRolling.siteId),
    __metadata("design:type", Array)
], Site.prototype, "logAdminRolling", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_user_money_entity_1.LogUserMoney, logUserMoney => logUserMoney.siteId),
    __metadata("design:type", Array)
], Site.prototype, "logUserMoney", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_user_point_entity_1.LogUserPoint, logUserPoint => logUserPoint.siteId),
    __metadata("design:type", Array)
], Site.prototype, "logUserPoint", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_user_rolling_entity_1.LogUserRolling, logUserRolling => logUserRolling.siteId),
    __metadata("design:type", Array)
], Site.prototype, "logUserRolling", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_site_money_entity_1.LogSiteMoney, logSiteMoney => logSiteMoney.siteId),
    __metadata("design:type", Array)
], Site.prototype, "logSiteMoney", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_admin_signin_entity_1.LogAdminSignin, logAdminSignin => logAdminSignin.siteId),
    __metadata("design:type", Array)
], Site.prototype, "logAdminSignin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => log_user_signin_entity_1.LogUserSignin, logUserSignin => logUserSignin.siteId),
    __metadata("design:type", Array)
], Site.prototype, "logUserSignin", void 0);
Site = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['id'])
], Site);
exports.Site = Site;
//# sourceMappingURL=site.entity.js.map