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
exports.NoticeMessageBroadcastAdmin = void 0;
const notice_message_admin_entity_1 = require("./notice-message-admin.entity");
const admin_entity_1 = require("../../admin/entity/admin.entity");
const site_entity_1 = require("../../site/entity/site.entity");
const typeorm_1 = require("typeorm");
let NoticeMessageBroadcastAdmin = class NoticeMessageBroadcastAdmin {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NoticeMessageBroadcastAdmin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => site_entity_1.Site, site => site.id),
    (0, typeorm_1.JoinColumn)({ name: 'site_id' }),
    __metadata("design:type", Number)
], NoticeMessageBroadcastAdmin.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => admin_entity_1.Admin, admin => admin.id),
    (0, typeorm_1.JoinColumn)({ name: 'admin_id' }),
    __metadata("design:type", Number)
], NoticeMessageBroadcastAdmin.prototype, "adminId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => notice_message_admin_entity_1.NoticeMessageAdmin, noticeMessageAdmin => noticeMessageAdmin.id),
    (0, typeorm_1.JoinColumn)({ name: 'notice_message_admin_id' }),
    __metadata("design:type", Number)
], NoticeMessageBroadcastAdmin.prototype, "NoticeMessageAdminId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], NoticeMessageBroadcastAdmin.prototype, "createdAt", void 0);
NoticeMessageBroadcastAdmin = __decorate([
    (0, typeorm_1.Entity)({ name: 'notice_massage_breadcast_admin' }),
    (0, typeorm_1.Unique)(['id'])
], NoticeMessageBroadcastAdmin);
exports.NoticeMessageBroadcastAdmin = NoticeMessageBroadcastAdmin;
//# sourceMappingURL=notice-message-boradcast-admin.entity.js.map