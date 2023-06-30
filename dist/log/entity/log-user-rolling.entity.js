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
exports.LogUserRolling = void 0;
const typeorm_1 = require("typeorm");
const site_entity_1 = require("../../site/entity/site.entity");
const user_entity_1 = require("../../user/entity/user.entity");
let LogUserRolling = class LogUserRolling {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LogUserRolling.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => site_entity_1.Site, site => site.id),
    (0, typeorm_1.JoinColumn)({ name: "site_id" }),
    __metadata("design:type", Number)
], LogUserRolling.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.User, user => user.id),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", Number)
], LogUserRolling.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], LogUserRolling.prototype, "point", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'previous_point', type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], LogUserRolling.prototype, "previousPoint", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'post_point', type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], LogUserRolling.prototype, "postPoint", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'betting_id', type: 'tinyint', comment: '1: 입금, 2: 출금, 3: 지급, 4: 회수, 5: 롤링전환, 6: 루징전환' }),
    __metadata("design:type", Number)
], LogUserRolling.prototype, "bettingId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], LogUserRolling.prototype, "createdAt", void 0);
LogUserRolling = __decorate([
    (0, typeorm_1.Entity)({ name: 'log_user_rolling' }),
    (0, typeorm_1.Unique)(['id'])
], LogUserRolling);
exports.LogUserRolling = LogUserRolling;
//# sourceMappingURL=log-user-rolling.entity.js.map