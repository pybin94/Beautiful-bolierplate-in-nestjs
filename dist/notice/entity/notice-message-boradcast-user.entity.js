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
exports.NoticeMessageBroadcastUser = void 0;
const site_entity_1 = require("../../site/entity/site.entity");
const user_entity_1 = require("../../user/entity/user.entity");
const typeorm_1 = require("typeorm");
const notice_message_user_entity_1 = require("./notice-message-user.entity");
let NoticeMessageBroadcastUser = class NoticeMessageBroadcastUser {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NoticeMessageBroadcastUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => site_entity_1.Site, site => site.id),
    (0, typeorm_1.JoinColumn)({ name: 'site_id' }),
    __metadata("design:type", Number)
], NoticeMessageBroadcastUser.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.User, user => user.id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], NoticeMessageBroadcastUser.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => notice_message_user_entity_1.NoticeMessageUser, noticeMessageUser => noticeMessageUser.id),
    (0, typeorm_1.JoinColumn)({ name: 'notice_message_user_id' }),
    __metadata("design:type", Number)
], NoticeMessageBroadcastUser.prototype, "NoticeMessageUserId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], NoticeMessageBroadcastUser.prototype, "createdAt", void 0);
NoticeMessageBroadcastUser = __decorate([
    (0, typeorm_1.Entity)({ name: 'notice_massage_breadcast_user' }),
    (0, typeorm_1.Unique)(['id'])
], NoticeMessageBroadcastUser);
exports.NoticeMessageBroadcastUser = NoticeMessageBroadcastUser;
//# sourceMappingURL=notice-message-boradcast-user.entity.js.map