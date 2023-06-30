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
exports.NoticePopup = void 0;
const site_entity_1 = require("../../site/entity/site.entity");
const typeorm_1 = require("typeorm");
let NoticePopup = class NoticePopup {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NoticePopup.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => site_entity_1.Site, site => site.id),
    (0, typeorm_1.JoinColumn)({ name: 'site_id' }),
    __metadata("design:type", Number)
], NoticePopup.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45 }),
    __metadata("design:type", String)
], NoticePopup.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'mediumtext' }),
    __metadata("design:type", String)
], NoticePopup.prototype, "contents", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'tinyint', }),
    __metadata("design:type", Number)
], NoticePopup.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_signed', type: 'tinyint', comment: '0: 로그인, 1: 전체' }),
    __metadata("design:type", Number)
], NoticePopup.prototype, "isSigned", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_auto', type: 'tinyint', comment: '0: 수동, 1: 자동' }),
    __metadata("design:type", Number)
], NoticePopup.prototype, "isAuto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'position_x', type: 'int' }),
    __metadata("design:type", Number)
], NoticePopup.prototype, "positionX", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'position_y', type: 'int' }),
    __metadata("design:type", Number)
], NoticePopup.prototype, "positionY", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'position_z', type: 'int' }),
    __metadata("design:type", Number)
], NoticePopup.prototype, "positionZ", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], NoticePopup.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], NoticePopup.prototype, "updatedAt", void 0);
NoticePopup = __decorate([
    (0, typeorm_1.Entity)({ name: 'notice_popup' }),
    (0, typeorm_1.Unique)(['id'])
], NoticePopup);
exports.NoticePopup = NoticePopup;
//# sourceMappingURL=notice-popup.entity.js.map