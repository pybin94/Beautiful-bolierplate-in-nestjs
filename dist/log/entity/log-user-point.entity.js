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
exports.LogUserPoint = void 0;
const typeorm_1 = require("typeorm");
const site_entity_1 = require("../../site/entity/site.entity");
const user_entity_1 = require("../../user/entity/user.entity");
const admin_entity_1 = require("../../admin/entity/admin.entity");
let LogUserPoint = class LogUserPoint {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LogUserPoint.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => site_entity_1.Site, site => site.id),
    (0, typeorm_1.JoinColumn)({ name: "site_id" }),
    __metadata("design:type", Number)
], LogUserPoint.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => admin_entity_1.Admin, admin => admin.id),
    (0, typeorm_1.JoinColumn)({ name: 'from_id' }),
    __metadata("design:type", Number)
], LogUserPoint.prototype, "fromId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.User, user => user.id),
    (0, typeorm_1.JoinColumn)({ name: 'to_id' }),
    __metadata("design:type", Number)
], LogUserPoint.prototype, "toId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], LogUserPoint.prototype, "point", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'previous_point', type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], LogUserPoint.prototype, "previousPoint", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'post_point', type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], LogUserPoint.prototype, "postPoint", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', comment: '1: 롤링, 2: 루징, 3: 기타, 4: 신규첫충, 5: 당일첫충, 6: 매충' }),
    __metadata("design:type", Number)
], LogUserPoint.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'transaction_type', type: 'tinyint', comment: '1: 에이전트 지급, 2: 에이전트 회수, 3: 포인트 전환' }),
    __metadata("design:type", Number)
], LogUserPoint.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45 }),
    __metadata("design:type", String)
], LogUserPoint.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LogUserPoint.prototype, "memo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], LogUserPoint.prototype, "createdAt", void 0);
LogUserPoint = __decorate([
    (0, typeorm_1.Entity)({ name: 'log_user_point' }),
    (0, typeorm_1.Unique)(['id'])
], LogUserPoint);
exports.LogUserPoint = LogUserPoint;
//# sourceMappingURL=log-user-point.entity.js.map