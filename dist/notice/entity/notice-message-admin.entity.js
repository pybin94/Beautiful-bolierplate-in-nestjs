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
exports.NoticeMessageAdmin = void 0;
const admin_entity_1 = require("../../admin/entity/admin.entity");
const site_entity_1 = require("../../site/entity/site.entity");
const typeorm_1 = require("typeorm");
const notice_message_boradcast_admin_entity_1 = require("./notice-message-boradcast-admin.entity");
let NoticeMessageAdmin = class NoticeMessageAdmin {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NoticeMessageAdmin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => site_entity_1.Site, site => site.id),
    (0, typeorm_1.JoinColumn)({ name: 'site_id' }),
    __metadata("design:type", Number)
], NoticeMessageAdmin.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => admin_entity_1.Admin, admin => admin.id),
    (0, typeorm_1.JoinColumn)({ name: 'send_id' }),
    __metadata("design:type", Number)
], NoticeMessageAdmin.prototype, "sendId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => admin_entity_1.Admin, admin => admin.id),
    (0, typeorm_1.JoinColumn)({ name: 'receive_id' }),
    __metadata("design:type", Number)
], NoticeMessageAdmin.prototype, "receiveId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45 }),
    __metadata("design:type", String)
], NoticeMessageAdmin.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'mediumtext' }),
    __metadata("design:type", String)
], NoticeMessageAdmin.prototype, "contents", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'mediumtext', nullable: true }),
    __metadata("design:type", String)
], NoticeMessageAdmin.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', comment: '0: 메시지전송, 1: 메시지확인, 2: 답변전송, 3: 답변확인' }),
    __metadata("design:type", Number)
], NoticeMessageAdmin.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_broadcast', type: 'tinyint', default: 0 }),
    __metadata("design:type", Number)
], NoticeMessageAdmin.prototype, "isBroadcast", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], NoticeMessageAdmin.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], NoticeMessageAdmin.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => notice_message_boradcast_admin_entity_1.NoticeMessageBroadcastAdmin, noticeMessageBroadcastAdmin => noticeMessageBroadcastAdmin.NoticeMessageAdminId),
    __metadata("design:type", Array)
], NoticeMessageAdmin.prototype, "noticeMessageBroadcastAdmin", void 0);
NoticeMessageAdmin = __decorate([
    (0, typeorm_1.Entity)({ name: 'notice_message_admin' }),
    (0, typeorm_1.Unique)(['id'])
], NoticeMessageAdmin);
exports.NoticeMessageAdmin = NoticeMessageAdmin;
//# sourceMappingURL=notice-message-admin.entity.js.map